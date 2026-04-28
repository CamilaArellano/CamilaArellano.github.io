---
Estado: En curso
Fecha de incio: 2024-07-31
Tema: Ciberseguridad
Tipo: Curso online
Fecha de finalización:
tags:
  - SOCAnalyst
Archivos:
---
> [!important]  Related Notes 
> [[Distributed Denial of Service (DDoS) Analysis]]
> [[OWASP]]
> [[]]  
> 

NIST Defines a Threat as:
>[!NOTE]
>Any circumstance or event with the potential to adversely impact organizational operations (including mission, functions, image, or reputation), organizational assets, or individuals through an information system via unauthorized access, destruction, disclosure, modification of information, and/or denial of service. Also, the potential for a threat-source to successfully exploit a particular information system vulnerability.

### Types of threats

| Threat type           | Description                                                                                                                                         |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Unintentional threats | These are the threats to an organization that don't have intent behind them and can be classified as accidental, human error, or computer failures. |
| Intentional Threats   | These are threats to an organization that have intent behind them and seek to cause disruption or personal financial gain.                          |
| Internal Threats      | Any threat to an organization originating from within the company.                                                                                  |
| External Threats      | Any threat to an organization originating from outside.                                                                                             |
| Natural Threats       | Any threat to an organization originating from natural disasters such as hurricanes, earthquakes, floods, tornadoes, etc.                           |
### Internal Threats
#### Common Unintentional Internal Threats

##### Human Error

- This encompasses a lot of internal threats that organizations see.
- Employees generally show poor decision-making and succumb to a phish/scam.
- Accidental data leakage through improper configurations.

##### Poor security culture

- Lack of cybersecurity training and support.
- There isn't a strong security-oriented culture.
- Lack of proper security policies such as a strong password policy or implementing access controls.
#### Common Intentional Internal Threats

##### Disgruntled employees

==Disgruntled employees have the motive to cause harm to an organization.== They can have access to sensitive information that they might look to leak or expose and sabotage the company.

##### Insider-aided threats

An insider-aided threat is when an internal employee has help from another individual outside the company to access sensitive information. They can be working with the outside entity for a financial reward.

##### Former employees

These are employees that have been let go or left the organization, and their access hasn't been revoked. They can have ill intent and look to cause damage by leaking sensitive information.
### External Threats
These are threats that have **ill intent behind them to gain access to your organization's data**.
#### DoS/DDoS
Denial of Service is an attack that simply overwhelms a system's resources. A Distributed Denial of Service is the same attack from multiple machines that the attackers control. The common attacks are HTTP flood, ICMP flood, TCP SYN flood attack, teardrop attack, smurf attack, ping-of-death attack, and botnets.
#### MitM
**M**an **i**n **t**he **M**iddle is an attack where a hacker places themselves between a user and a server in order to read/edit/mess with the communications between the two. Common attacks include IP spoofing and session hijacking.
#### Phishing and Spear Phishing
Emails that try to obtain personal information or get users to do something (download and run a file, click a link, etc) by appearing to be from a trusted source. ==Spear phishing refers to extremely targeted phish that comes from social engineering where perpetrators can falsify email headers to make them more believable to the victim==.
#### Botnets
Botnets are a network of computers that have been infected by malware and are controlled by a **C**ommand a**n**d **C**ontrol server (CnC). The infected machines are referred to as bots or zombies, and they await instructions to perform attacks such a DDoS attack.
#### Adware
Type of malware that delivers advertisements. Adware can be found on websites as pop-up ads and is sometimes bundled with free software. Adware is generally not dangerous but is sometimes bundled with spyware.

#### Spyware
Type of malware that infects your machine with the goal of gathering information about you. It can gather some of the following information: activity monitoring, keystrokes, and user information. It runs quietly in the background while it enumerates as much information as it can on the infected victim.

#### Worms
Type of malware that copies itself from computer to computer. A worm self replicates itself autonomously without user interaction, and, in it's simplest form, a worm will continuously self replicate and deplete a system of all its resources. 
#### Ransomware
Type of malware that requires users to pay a ransom before accessing their files. The most sophisticated forms of ransomware currently encrypt all of a user's files and will only decrypt them once payment has been delivered.

#### Trojans
Type of malware that hides as something else to gain access to your system. Once inside, the Trojan executes itself to install further malicious malware or steal sensitive information. Social engineering plays a role in how Trojans are delivered, and by gathering information on a victim, a Trojan can be concealed and delivered to the victim without them ever knowing.

#### Rootkits
Type of malware that looks to stay hidden on the infected system and provides admin access to the attacker. Rootkits are difficult to locate and can go for long periods of time without ever being discovered. Rootkits are often delivered through phishing emails and drive-by downloads.

### Injection & XSS
Two of the most popular and known threats facing organizations come from Injection and XSS attacks. They both have the same goal of stealing information, but one is geared towards attacking databases whereas the other is focused on attacking end-users.
#### Cross-Site Scripting (XSS)

XSS flaws occur when an application includes untrusted data in a new web page without proper validation or escaping, or updates an existing web page with user-supplied data using a browser API that can create HTML or JavaScript. XSS allows attackers to execute scripts in the victim’s browser which can hijack user sessions, deface web sites, or redirect the user to malicious sites.

![This is an image showing Cross Site Scripting](https://video.udacity-data.com/topher/2020/August/5f467dc7_img-1180/img-1180.png)

#### Injection

Injection flaws, such as SQL, NoSQL, OS, and LDAP injection, occur when untrusted data is sent to an interpreter as part of a command or query. The attacker’s hostile data can trick the interpreter into executing unintended commands or accessing data without proper authorization.
![[Pasted image 20260426125915.png]]
## Threat Actors
A **threat actor** is **an entity that is responsible for a security incident**. Threat actors can be both internal and external.
### Organized Crime
Cyber criminals whose primary motive is money. They are looking for sensitive information, money, and anything of value. 
Their TTP is to contact large amounts of people and gain money either through ransomware or crypto jacking. This usually starts with mass phishing with an associated file that is the ransomware or a crypto miner.
### State-Sponsored attacks
These attacks refer to when a threat actor is acting on, and funded by, a government body.
They are extremely proficient threat actors with dedicated resources at their disposal. Their target is usually intellectual property or espionage in order to gain information on the target.
### Script Kiddies
Amateur cyber criminals with unclear motivations. They can be actual teenagers using scripts made by other individuals or working engineers who have decided to hack into a site. They commonly employ phishing techniques to start, and they use prebuilt tools to complete their hack.
Similar to an insider threat, it’s hard to define their overall tactics since there usually isn’t a large cohesive bigger picture. They use well-known open-source prebuilt tools.

### Hacktivists
Similar to APT Groups but with less stealth! Since they are a group with no intention to be hidden, they often use DDoS to get their point across and cause disruption. They also can deface websites/leak sensitive information (often emails).
They want to make a statement about a site or deface an individual's image. Their most common attack is DDoS in order to crash a site.

### Insider Threat
While a malignant employee can be devastating, negligence and unintentional errors can be just as damaging. These types of threats are hard to detect and prevent since they are legitimate users with valid credentials. They can commit sabotage, espionage, theft, and fraud.
Vandalism and data breaches are the most common techniques that occur from insider threats.

### **A**dvanced **P**ersistent **T**hreat (APT) Groups
This refers to industrial spies and governmental agencies that partake in cyber warfare. They are extremely elusive and hard to keep track of as they are organized and secretive. They usually focus on attacking other nations, but businesses and finances often get affected, especially if the company handles sensitive information for a nation.
They generally want to infiltrate specific companies and governmental agencies to gather information. They utilize multiple points of attack in order to "get their foot in the door: and then enable other attacks.
## Tactics, Techniques, and Procedures (TTP)
### Tactics
The big picture considerations as to what should be done and how it should be done.
### Techniques
Actions that can be executed to achieve some goal without giving specific details on how to complete the action.
### Procedures
The specific details for each technique and how to actually complete a certain action
## TTP Sources
### Open Source Intelligence (OSINT)
Massive databases on the different TTPs threat actors can use. These are most often automatically generated by scraping data rather than human-designed since there is a huge amount of information to go through.
### Darknets
Completely useless sections of your network that are self-contained and have nothing useful. When these are accessed and used, it serves as an indicator that something is going wrong since they normally aren't. Darknets are a reactive form of protection.
### Telemetry
Telemetry refers to the data that is collected through your network when interacting with users. This can be the ports that are open, download/upload attempts, traffic, connection attempts, and more. “Internal telemetry” refers to data collected within your own network. “Vendor aggregated” telemetry helps train individuals to understand the difference between genuine network data and malicious traffic. Similar to Darknets, telemetry is more reactive and helps identify when a problem is occurring rather than stopping the problem entirely.
### Malware Processing/Sandbox Analysis
Collecting and activating malware in a safe environment (sandbox analysis) in order to improve security protocols and understand what went wrong and what could have gone wrong.
### Zero-Day Threats
A **zero-day threat** is a threat that exploits an unknown vulnerability, and there is no patch or fix in place.