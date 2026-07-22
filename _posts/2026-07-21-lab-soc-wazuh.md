---
layout: post
title: "Laboratorio SOC con Wazuh"
date: 2026-07-21
author: Eira Camila Arellano Peraza
categories: [ciberseguridad, malware, SOC, threat-intelligence]
---

## Objetivo del laboratorio
Este laboratorio implementa un entorno aislado para simular un pequeño Security Operations Center (SOC) utilizando Wazuh como plataforma SIEM/XDR.

El objetivo es generar actividad de seguridad controlada desde una máquina atacante, observar los eventos producidos y analizar las alertas desde Wazuh.

## Arquitectura del Laboratorio
![Arquitectura del laboratorio](/assets/images/Arquitectura%20Laboratorio.png)


```
[ HOST]
│
├── VM 1: Wazuh Server (SIEM)
│        Ubuntu Server 22.04 LTS
│        IP: 192.168.100.10
│        RAM: 6 GB / CPU: 2 cores / Disco: 50 GB
│
├── VM 2: Windows 10 (Víctima)
│        IP: 192.168.100.20
│        RAM: 4 GB / CPU: 2 cores / Disco: 60 GB
│        Sysmon + Agente Wazuh instalados
│
└── VM 3: Kali Linux (Atacante)
         IP: 192.168.100.30
         RAM: 3 GB / CPU: 2 cores
         Herramientas: nmap, metasploit, hydra

RED: lab-interno (192.168.100.0/24) — todas aisladas entre sí
```



## Red Virtual (lab-interno)

> **Nota**: Las máquinas virtuales pueden comunicarse entre sí a través de la red virtual privada. El acceso a Internet se habilita únicamente cuando es necesario, por ejemplo, durante la instalación de paquetes y herramientas.
### Archivo de configuración
La red se define mediante un archivo XML compatible con Libvirt.

- `<network>`: Es el elemento raíz que contiene toda la configuración de la red virtual.
- `<bridge>`: Define el bridge virtual que actuará como un switch virtual. Las máquinas virtuales se conectan a este bridge para poder comunicarse entre ellas.
- `<ip>`: La dirección `192.168.100.1` puede utilizarse como puerta de enlace para las máquinas virtuales.
- `<dhcp>`: Define el rango de direcciones que el servicio DHCP puede asignar automáticamente.

```xml
<network>
  <name>lab-interno</name>
  <bridge name="virbr1"/>
  <ip address="192.168.100.1" netmask="255.255.255.0">
    <dhcp>
      <range start="192.168.100.10" end="192.168.100.50"/>
    </dhcp>
  </ip>
</network>
```

### Activación de la red

```bash
#Definir la red
sudo virsh net-define ~/lab-network.xml

#Activa la red y crea el bridge virtual configurado.
sudo virsh net-start lab-interno

#Hace que la red se inicie automáticamente cuando se inicia el servicio de Libvirt
sudo virsh net-autostart lab-interno

#Lista las redes activas/inactivas
sudo virsh net-list --all 
```


## Reglas de iptables (NAT para acceso a internet)

Las reglas permiten que las VMs tengan acceso a internet a través del host durante la instalación.

### Crear y aplicar reglas

```bash
sudo iptables -I FORWARD -i virbr0 -j ACCEPT
sudo iptables -I FORWARD -o virbr0 -j ACCEPT
sudo iptables -t nat -I POSTROUTING -s 192.168.122.0/24 -j MASQUERADE
```

### Hacer las reglas permanentes (CachyOS/Arch)

```bash
sudo sh -c 'iptables-save > /etc/iptables/iptables.rules'
sudo systemctl enable --now iptables
```

> **Nota:** En CachyOS no existe `iptables-persistent`. Se usa `iptables-save` directamente.



## VM Wazuh Server (Ubuntu 22.04 LTS)

### Configuración de red estática

Editar el archivo de Netplan:

```bash
sudo nano /etc/netplan/00-installer-config.yaml
```

Contenido:

```yaml
network:
  version: 2
  ethernets:
    enp1s0:
      addresses:
        - 192.168.100.10/24
      routes:
        - to: default
          via: 192.168.100.1
      nameservers:
        addresses:
          - 1.1.1.1
```

Aplicar permisos adecuados y la configuración:

```bash
sudo chmod 600 /etc/netplan/00-installer-config.yaml
sudo netplan apply
```

### Instalación de Wazuh (All-in-One)

```bash
# Actualizar el sistema
sudo apt update && sudo apt upgrade -y

# Descargar script de instalación
curl -sO https://packages.wazuh.com/4.9/wazuh-install.sh

# Ejecutar instalación
sudo bash wazuh-install.sh -a
```

### Obtener credenciales

```bash
#Extraer los archivos generados:
sudo tar -xvf wazuh-install-files.tar

#Consultar las credenciales:
cat wazuh-install-files/wazuh-passwords.txt
```

### Acceso al dashboard

Desde un navegador acceder a: 
```
https://192.168.100.10:443
```

> Aceptar el certificado autofirmado al entrar por primera vez.



## VM Windows 10 (Víctima)

### Configuración de red estática

Panel de control → Centro de redes → Cambiar configuración del adaptador → Propiedades → IPv4:

|Campo|Valor|
|---|---|
|IP|192.168.100.20|
|Máscara|255.255.255.0|
|Gateway|192.168.100.1|
|DNS|192.168.100.10|

### Instalación de Sysmon
Sysmon permite registrar eventos detallados relacionados con la actividad del sistema Windows.

Desde CMD como administrador (Win + R → cmd → Ctrl+Shift+Enter):

```cmd
C:\Sysmon\Sysmon64.exe -accepteula -i C:\Sysmon\sysmonconfig.xml
```

Verificar:

```cmd
sc query Sysmon64
```

### Instalar agente Wazuh

Descargar desde el host CachyOS y transferir al servidor Wazuh:

```bash
# En el host
wget https://packages.wazuh.com/4.x/windows/wazuh-agent-4.9.2-1.msi -P ~/Downloads/
scp ~/Downloads/wazuh-agent-4.9.2-1.msi camila@192.168.100.10:/home/camila/
```

Servir desde el servidor Wazuh:

```bash
cd /home/camila
python3 -m http.server 8080
```

Descargar en Windows desde Edge: `http://192.168.100.10:8080`

>**Nota de seguridad:** el servidor HTTP de Python es apropiado para una transferencia temporal dentro del laboratorio. No debe exponerse innecesariamente.

### Registrar agente en Wazuh

En el servidor Wazuh:

```bash
sudo /var/ossec/bin/manage_agents
```

- Seleccionar **A** → Agregar agente
- Nombre: `windows-victima`
- IP: `192.168.100.20`
- Seleccionar **E** → Extraer clave → ID `001`

En Windows, abrir la GUI del agente Wazuh:

- Manager IP: `192.168.100.10`
- Pegar la clave de autenticación
- Guardar e iniciar el servicio

```cmd
net start WazuhSvc
```



## VM Kali Linux (Atacante)

### Herramientas instaladas

```bash
sudo apt install -y nmap metasploit-framework hydra
```

### Activar SSH

```bash
sudo systemctl enable --now ssh
```



## Casos de ataque ejecutados

### Caso 1: Fuerza Bruta SSH
Simular múltiples intentos fallidos de autenticación contra un servicio SSH dentro del entorno de laboratorio.

**Ataque desde Kali:**

```bash
hydra -l camila -P /usr/share/wordlists/rockyou.txt -t 4 ssh://192.168.100.10
```

**Detección en Wazuh:**
La actividad puede generar alertas relacionadas con múltiples intentos de autenticación fallidos.

- Regla disparada: `5758` — Maximum authentication attempts exceeded
- Técnica MITRE: `T1110` — Brute Force
- Táctica: Credential Access
- IP atacante: `192.168.100.30`
- Nivel de alerta: `8`

**Query en dashboard:**

```
data.srcip: 192.168.100.30
```

**Regla personalizada en Wazuh:**

```bash
sudo nano /var/ossec/etc/rules/local_rules.xml
```

```xml
<group name="brute_force,">
  <rule id="100001" level="10" frequency="5" timeframe="60">
    <if_matched_sid>5760</if_matched_sid>
    <description>Posible ataque de fuerza bruta SSH detectado</description>
    <group>authentication_failures,</group>
  </rule>
</group>
```

```bash
sudo systemctl restart wazuh-manager
```

### Caso 2: Escaneo de Red
El objetivo es identificar puertos TCP accesibles en la máquina Windows.

**Ataque desde Kali:**

```bash
nmap -sS 192.168.100.20
```

**Resultado:** Puerto `5357/tcp` (wsdapi) abierto en Windows.

