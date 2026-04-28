---
Estado: Listo
Fecha de incio: 2024-07-31
Tema: Ciberseguridad
Tipo: Curso online
Fecha de finalización: 2026-04-26
tags:
  - SOCAnalyst
  - Vulnerabilities
Archivos:
---
> [!important]  Related Notes 
> [[Analyzing Security Threats]]
> [[]]
> [[]]  
> 

#### OWASP

The **O**pen **W**eb **A**pplication **S**ecurity **P**roject (OWASP) is a non-profit organization with the goal of providing security information to improve the security of software. [They have developed a list of the 10 most common application vulnerabilities to raise security awareness(opens in a new tab)](https://owasp.org/www-project-top-ten/).

### Top 10:2025 List

1. [A01:2025 - Broken Access Control](https://owasp.org/Top10/2025/A01_2025-Broken_Access_Control/)
Restrictions on what authenticated users are allowed to do are often not properly enforced. Attackers can exploit these flaws to access unauthorized functionality and/or data. Attackers could access other users' accounts, view sensitive files, modify other users’ data, change access rights, and more.
2. [A02:2025 - Security Misconfiguration](https://owasp.org/Top10/2025/A02_2025-Security_Misconfiguration/)
Security misconfiguration is the most commonly seen issue. This is commonly a result of insecure default configurations, incomplete or ad hoc configurations, open cloud storage, misconfigured HTTP headers, and verbose error messages containing sensitive information. Not only must all operating systems, frameworks, libraries, and applications be securely configured, but they must be patched and upgraded in a timely fashion
3. [A03:2025 - Software Supply Chain Failures](https://owasp.org/Top10/2025/A03_2025-Software_Supply_Chain_Failures/)
4. [A04:2025 - Cryptographic Failures](https://owasp.org/Top10/2025/A04_2025-Cryptographic_Failures/)
5. [A05:2025 - Injection](https://owasp.org/Top10/2025/A05_2025-Injection/)
6. [A06:2025 - Insecure Design](https://owasp.org/Top10/2025/A06_2025-Insecure_Design/)
Insecure design is a broad category representing weaknesses, expressed as "missing or ineffective control design". A perfect implementation cannot fix an insecure design, as needed security controls were never created to defend against specific attacks. One of the factors that contribute to insecure design is the lack of business risk profiling inherent in the software or system being developed, and thus the failure to determine what level of security design is required.
7. [A07:2025 - Authentication Failures](https://owasp.org/Top10/2025/A07_2025-Authentication_Failures/)
8. [A08:2025 - Software or Data Integrity Failures](https://owasp.org/Top10/2025/A08_2025-Software_or_Data_Integrity_Failures/)
Software and data integrity failures are caused by code and infrastructure that do not protect against integrity violations. Examples include applications relying on plugins, libraries, or modules from untrusted sources. Insecure CI/CD pipelines can introduce the potential for unauthorized access, malicious code, or system compromise. Many applications now include auto-update functionality, where updates are downloaded without sufficient integrity verification and applied to the previously trusted application.
9. [A09:2025 - Security Logging and Alerting Failures](https://owasp.org/Top10/2025/A09_2025-Security_Logging_and_Alerting_Failures/)
10. [A10:2025 - Mishandling of Exceptional Conditions](https://owasp.org/Top10/2025/A10_2025-Mishandling_of_Exceptional_Conditions/)