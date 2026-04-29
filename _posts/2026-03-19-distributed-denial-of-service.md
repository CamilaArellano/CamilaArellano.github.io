---
title: "DDoS"
date: 2926-03-19
---
# Distributed Denial of Service Analsys

## Denial of service attacks
A Denial of Service (DoS) is a type of cyberattack that aims to disrupt the normal functioning of a network, service, or server by overwhelming it with a flood of internet traffic. The primary goal isn't to gain unauthorized access or to steal data but <mark style="background: #CE97FB;">to make a machine or network resource unavailable to its intended users.</mark>

>[!NOTE] DoS vs DDoS
>A DoS is characterized as using a single computer to send attack traffic to a victim. However, in a Distributed Denial of Service (DDoS) attack, the traffic comes from multiple distributed sources. This is often in the form of a botnet where computers infected with malicious software are utilized to perform the DoS.

![A DDoS attack performed with a botnet. The top layer displays a single attacker who is in control of a series of computers in the second layer (the botnet). And the final layer shows a 'target' where a large number of network requests are being sent.](https://il-labforge-assets.origin.immersivelabs.team/uploads/s2XvVyFyHZyZkZuGE498LUHI2PB3Qmw-PJSpGdPlf2E.png)

An example DDoS attack performed with a botnet

### Types of DDoS attacks

There are many different types of DDoS attacks, all of which fall under the following three categories:

- **Volume-based attacks**: The most common type, these attacks<mark style="background: #67EBFA;"> aim to consume all the bandwidth between the target and the wider internet</mark>. For example, UDP Flood attacks take advantage of the characteristics of the User Datagram Protocol (UDP), which sends data packets without waiting for a reply. Using this, an attacker can overwhelm a host that's listening to its ports for genuine UDP traffic.
- **Protocol attacks**: <mark style="background: #CE97FB;">These attacks consume all the processing capacity of web servers or network equipment, such as firewalls, by exploiting weaknesses in the network protocols</mark>. For example, SYN flood attacks exploit a known weakness in the Transmission Control Protocol (TCP) connection sequence (the "three-way handshake"), causing the targeted server to consume resources waiting for the acknowledgment of connections that are never completed, which can eventually lead to denial of service. Another example is the **Ping of Death** attack.
- **Application layer attacks**: <mark style="background: #F6A5EB;">These attacks target specific applications on the target system and are often more subtle and difficult to detect than the other types. </mark>For example, computationally heavy processes, such as proceeding to checkout, can be abused by sending many concurrent requests being sent to overwhelm the program's limits or host computer resources, known as HTTP Flood attacks.

While DDoS attacks can generally be divided into the three categories outlined above, those classifications contain dozens of [individual DDoS attack types](https://kb.mazebolt.com/kbe_taxonomy/ddos-general/). Below and throughout this collection, we cover more of them in greater depth.

#### Example: Amplification attacks
Amplification attacks are a type of DDoS attack where a small request is used to trigger a large response. This is done to overwhelm the target with traffic. Examples of amplification attacks include DNS Amplification, NTP Amplification, SSDP Amplification, and Memcached Amplification.
### Real-world example
In 2018, GitHub was hit with a Memcached DDoS attack, which is a type of amplification attack.
### Cause
The attackers identified unsecured memcached servers that were accessible over the internet. These servers are designed to send back large amounts of data quickly and aren't meant to be left open to the internet, as they can be used to amplify traffic in a DDoS attack. The attackers sent spoofed requests to these servers, which then flooded the servers of their target GitHub.
### Impact
Using this technique, the attackers could amplify their attack by a [magnitude of about 50,000x](https://www.cloudflare.com/en-gb/learning/ddos/famous-ddos-attacks/). The attack peaked at 1.35 terabits per second, making it one of the most significant DDoS attacks ever recorded. All in all, the attack lasted for about 20 minutes. This affected developers around the world who rely on GitHub for code hosting and collaboration.
### Example: Botnets and IoT devices in DDoS attacks
Botnets are networks of compromised devices controlled by an attacker, and they play a crucial role in DDoS attacks. They provide a command and control infrastructure for the attacker, amplify the traffic volume in the attack, and disguise the source of the attack. IoT devices are often targeted as part of a botnet due to their inherent security vulnerabilities.
### Real-world example
The 2016 Dyn attack was orchestrated using a botnet called Mirai, which primarily comprised Internet of Things (IoT) devices.
### Cause
The Mirai botnet is a type of malware that turns networked devices running Linux into remotely controlled "bots" that can be used as part of a botnet in large-scale network attacks.
### Impact
The attack targeted the DNS provider Dyn, causing major internet platforms and services unavailable for users in North America and Europe. This included many popular websites such as Airbnb, Netflix, PayPal, Visa, Amazon, Reddit, and GitHub.
### Mitigation and detection strategies
Mitigation strategies for DDoS attacks include <mark style="background: #FF5582A6;">rate limiting, IP address filtering, anomaly detection, and application front-end hardware</mark>. It's important to have a well-defined incident response plan in place. This should include identifying the attack, mitigating the damage, and recovering normal operations.

Aside from the obvious detection strategies, such as a surge in network traffic, slowness, or unavailability of online services, detection differs slightly depending on the type of DDoS attack used. Throughout this collection, you'll get to identify the key characteristics of several DDoS attacks within a practical lab environment containing network packet captures. These labs will give you the skills needed to reliably distinguish between normal network traffic and traffic where a DDoS attack has occurred.
## Ping of Death
The Ping of Death (PoD) is a type of Denial of Service (DoS) attack that gained notoriety in the late 1990s. It's a method used by cybercriminals that takes advantage of how the Internet Control Message Protocol (ICMP) works to disrupt, slow down, or crash a targeted machine or network, rendering it unavailable to its intended users.
## Packet-level mechanics of a Ping of Death attack

### What is a ping?
The term **ping** refers to a network utility that checks the availability of a host on an Internet Protocol (IP) network. When a system needs to verify whether another system is online, it sends a small packet of data called an ICMP echo request to that specific machine's IP address and waits for an ICMP echo reply.

ICMP is a protocol network devices use to send error messages and operational information about network conditions. The ICMP echo request and echo reply messages are part of the ICMP protocol.

The ICMP echo request is sent by the source (usually a computer or network device) to the destination device. It asks the destination device to send an ICMP echo reply to the source device. The echo request and reply messages are used to measure the round-trip time (RTT) between the source and destination devices. This helps determine the network latency or the time it takes for data to travel between the devices.

The main difference between an ICMP echo request and an echo reply is that the source device initiates the echo request to check if the destination device is reachable and to measure the RTT. The destination device sends the echo reply in response to the echo request, indicating that it's reachable and providing the RTT information.

### IP packet size
ICMP messages are carried within IP packets, the fundamental data transmission units in IP networks. The IP packet size in relation to ICMP refers to the size of the IP packet that carries the ICMP message. The size can vary depending on factors such as the network's maximum transmission unit (MTU) and the size of the ICMP message itself.

### How does the attack work?
The **Ping of Death** takes advantage of this seemingly innocuous tool by sending pings that exceed the maximum allowable size of an IP packet.

<mark style="background: #F6A5EB;">An IP packet, the basic unit of information in network transmission, has a maximum size of 65,535 bytes.</mark> However, the Ping of Death attack involves sending an IP packet larger than this maximum limit, typically fragmenting the packet and then reassembling it on the receiving end. This oversized packet can cause a buffer overflow at the recipient's end, leading to a system crash or other unpredictable behavior.

In the early days of the internet, many systems were vulnerable to the Ping of Death, including Windows, Linux, routers, and printers. The attack was simple to execute, requiring only a basic understanding of the IP protocol and access to a command line. This made it a popular choice among novice hackers looking to cause disruption.

However, the Ping of Death is largely a relic of the past today. Most modern operating systems and network devices have been patched to gracefully handle oversized packets by either rejecting them completely or properly reassembling them. This has significantly reduced the effectiveness of the Ping of Death as a DoS attack method.

## Historical instances of Ping of Death attacks

### 1996 Ping of Death attack

### Cause
In 1996, a security researcher named Michelle Olsen discovered a vulnerability in some Windows 95 and Windows NT versions that could be exploited using oversized ICMP packets. This vulnerability became known as the **Ping of Death**.

### Impact
When these oversized packets were sent to a vulnerable system, it would cause that system to crash or freeze.

## Technical analysis

To identify Ping of Death attack packets, you can filter for ICMP packets with a considerable size. The maximum size for an ICMP packet is typically limited to 65,535 bytes, but Ping of Death packets often exceed this limit.

To filter for Ping of Death packets, you can use the following filter expression in **Wireshark**:

```plaintext
icmp && ip.reassembled.length > 65535
```

Once you've captured the Ping of Death packets, you can analyze their content and structure to understand the specific payload and exploit being used.

When analyzing the PCAP file, you may ask why many fragmented IP protocol packets were captured. A Ping of Death attack works by splitting up the IP data packet into fragments to exploit vulnerabilities in the target system's IP stack, which struggled to handle these malformed fragments correctly. By deliberately creating an oversized packet and relying on the fragmentation process, attackers could bypass security measures and wreak havoc on vulnerable systems.

While the Ping of Death attack was a real threat in the past, it's not a significant concern in modern networks, as vendors have fixed the vulnerabilities that allowed it to occur. However, it serves as a historical example of how vulnerabilities in network protocols can be exploited to disrupt systems and networks. In today's cybersecurity landscape, attackers use more sophisticated methods and techniques to launch DoS and DDoS attacks.

## What is a SYN Flood DDoS attack?
<mark style="background: #F6A5EB;">SYN Flood is a form of Distributed Denial of Service (DDoS) attack that exploits the vulnerabilities of the TCP/IP protocol. </mark>The primary aim is to flood a target system with <mark style="background: #F6A5EB;">SYN (synchronize) packets</mark>, causing disruption or complete unavailability of services. This article delves into the packet-level mechanics of SYN Flood attacks and provides examples of notable instances where they've been used.
### Packet-level mechanics of SYN Flood
To properly understand the attack, it's important to understand how Transmission Control Protocol (TCP) works. In a typical TCP/IP connection, a three-way handshake process is used to establish a connection between the client and the server. The client sends a SYN packet to the server, the server responds with a SYN-ACK (synchronize-acknowledge) packet, and the client responds with an ACK (acknowledge) packet.

In a SYN Flood attack, the attacker sends a large number of SYN packets to the target server from spoofed IP addresses. The server responds with SYN-ACK packets and waits for the corresponding ACK packets. However, because the IP addresses are spoofed, the ACK packets never arrive.

This causes the server to use up resources waiting for responses that'll never come, eventually leading to a denial of service as legitimate requests can't be processed.

![A SYN Flood DDoS attack is displayed where an attacker sends a spoofed SYN packet to a target, which then sends SYN-ACK messages back to an unknown location.](https://il-labforge-assets.origin.immersivelabs.team/uploads/2Dw-pRN4lMbGLG2A4yGqhZovNMxvTpMi8ff9btO4Aio.png)

An example of a SYN Flood DDoS attack

### Historical instances of SYN Flood attacks
SYN Flood attacks have been used in numerous significant DDoS attacks throughout history.
#### Cause
One of the earliest instances of a SYN Flood attack was against the internet service provider Panix in 1996. Due to SYN Flood being a novel attack technique at the time, attackers were able to exploit part of the normal TCP three-way handshake to consume resources on the targeted server and render it unresponsive.
#### Impact
The attack caused significant disruption to Panix, who were taken offline for several days. This was one of the first major instances of a DDoS attack, and it highlighted the vulnerability existing within TCP/IP to this type of attack.

#### Technical analysis
The tell-tale sign of a SYN Flood DDoS attack is a large number of TCP connection request (SYN) packets being sent to a single target who is unable to respond to any of them. To identify this in **Wireshark**, you can use the filter:

```plaintext
tcp.flags.syn == 1 and tcp.flags.ack == 0
```

In the above filter, you can also set the second part of it as `tcp.flags.ack == 1` to look for acknowledgment packets from the victim, which, in a SYN Flood attack, are significantly smaller than the number of SYN packets being sent.

After narrowing your search, look for other indicators that show a SYN Flood DDoS attack has occurred. This could be a high volume of packets with very little time variation between them, each SYN packet having an identical length or window size. Additionally, Wireshark statistics can be used to view these indicators, such as an unusually high number of TCP packets using the protocol hierarchy statistic.

Although within this lab, you'll be using Wireshark to analyze network data, and the analysis tips are presented with this context in mind, the same logic applies and can be used in alternative packet analysis tools to achieve the same results.

## Mitigation strategies
Mitigating SYN Flood attacks involves several strategies. On the server level, it's possible to adjust the timeout value for SYN-ACK packets or to limit the number of SYN-ACK packets that can be sent before receiving an ACK packet.

On the network level, implementing rate limiting can restrict the amount of traffic sent to a particular IP address, helping to mitigate the impact of an attack. Additionally, using intrusion detection systems (IDS) and intrusion prevention systems (IPS) can help identify and block malicious traffic.

SYN Flood attacks are a powerful tool in a cyber criminal's arsenal, capable of causing significant disruption. Understanding their mechanics and history is crucial for developing effective mitigation strategies and safeguarding network resources.
## UDP Flood
User Datagram Protocol (UDP) Flood is a type of Distributed Denial of Service (DDoS) attack that overwhelms a target system with UDP packets. The aim is to saturate the target's network resources, rendering them inaccessible. This lab will explain the packet-level mechanics of UDP Flood attacks, providing notable examples where they have been used and the best mitigation strategies. You'll also get to analyze a sample of network traffic to test your knowledge.

### Packet-level mechanics of UDP Flood
In a UDP Flood attack, the attacker sends a large number of UDP packets to random ports on the victim's system. The victim's system processes incoming packets by looking for the application listening at the specified port. When it finds no application, it sends back an ICMP **Destination Unreachable** packet.

![The attacker send several UDP packets to the Target to overwhelm it. This then impacts legitimate traffic received by Clients.](https://il-labforge-assets.origin.immersivelabs.team/uploads/5yAQEFqWb7o6TE-zfkCgkmYhaIJkSjyWvSQMYqmajy4.png)

Handling these numerous 'false' requests consumes the system's resources, eventually leading to denial of service. The attacker can further amplify the attack by spoofing the IP address, making it difficult for the victim to identify and block the malicious traffic.

### Historical instances of UDP Flood attacks
UDP Flood attacks have been used in several significant DDoS attacks. Here are a few notable examples:
### Dyn attack (2016): A DDoS attack targets DNS provider Dyn.
#### Cause
In 2016, a major DNS provider called Dyn experienced a significant Distributed Denial of Service (DDoS) attack. The attackers utilized a combination of methods, including UDP Flood, to carry out the assault.
#### Impact
The massive DDoS attack on Dyn in 2016 resulted in the disruption of numerous well-known websites. By employing a combination of methods, including UDP Flood, the attackers were able to overwhelm Dyn's infrastructure, causing significant downtime and impacting the availability of online services for a wide range of users.

### GitHub attack (2018): A record-breaking DDoS attack hits GitHub.
#### Cause
In 2018, the popular code hosting platform GitHub became the target of a massive Distributed Denial of Service (DDoS) attack. This attack reached a peak traffic volume of 1.35 TB/s, making it one of the most significant DDoS attacks ever recorded. The attackers employed a combination of methods, primarily utilizing a Memcached amplification attack, but also incorporating UDP Flood to increase the volume of malicious traffic.

#### Impact
The DDoS attack on GitHub in 2018 had a significant impact, both in terms of its scale and the disruption it caused. With a peak traffic volume of 1.35 TB/s, this attack overwhelmed GitHub's infrastructure, resulting in service disruptions and downtime for users.

### Technical analysis

To filter UDP flood traffic, you can use the following filter expression:

```plaintext
udp
```

In large PCAP files, you may see several different protocols listed when using this filter. For example, the BJNP and SSDP protocols.

BJNP stands for **Bidirectional Network Protocol**. It's a custom LAN (Local Area Network) service discovery protocol specifically designed for Canon printers and scanners. SSDP stands for **Simple Service Discovery Protocol**. It's a network protocol used for service discovery within a local network.

SSDP allows devices to discover and advertise their services, such as printers, media servers, or other network-enabled devices. This protocol is commonly used in home networks to facilitate the automatic discovery and configuration of devices, making it easier for users to connect and interact with various network services.

To determine whether the packet you're looking at uses the UDP protocol, you can apply a new column to the Wireshark view. To do this, select a packet, right-click on the **User Datagram Protocol** header, and then select **Apply as Column**. The image below shows the new column that's then created, which allows you to quickly verify if the packet is using UDP.

![Following the provided steps to create a new column in Wireshark allows users to quickly determine whether the packet you're looking at is using the UDP protocol.](https://il-labforge-assets.origin.immersivelabs.team/uploads/TKdDSArjORACb6siphoCUomxGY3EoFTRhrZn3EeeDpo.png)

## Mitigation strategies
Mitigating UDP Flood attacks involves several strategies. On the server level, it's possible to configure firewalls to limit the rate of UDP traffic or to drop UDP packets from suspicious IP addresses.
On the network level, implementing rate limiting can restrict the amount of traffic sent to a particular IP address, helping to mitigate the impact of an attack. Additionally, intrusion detection systems (IDS) and intrusion prevention systems (IPS) can help identify and block malicious traffic.
In conclusion, UDP Flood attacks are a potent tool in a cyber criminal's arsenal, capable of causing significant disruption. Understanding their mechanics and history is crucial for developing effective mitigation strategies and safeguarding network resources.
