---
layout: post
title: "Análisis de Vulnerabilidades en Redes WiFi"
---

## Introducción

En este reporte se analiza la exposición a ataques:

- MITM
- Deauth
- WPA2 downgrade

## Metodología

Se utilizó:

```bash
airmon-ng start wlan0
airodump-ng wlan0mon