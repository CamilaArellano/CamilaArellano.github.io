---
title: "Packet analysis"
date: 2026-03-21
---

## Network traffic

### Analyzing network traffic
Upon receiving an alert of suspicious activity you must first identify the host machine associated with the activity before you can look for IOCs. Having identified the affected devices, here are the first things you should always look out for:

- **Device information of infected host(s)** – IPs, MAC addresses, and host names to see if there are any further infected hosts (beyond the initial alert).
- **Malicious files transferred** – to see if a machine has been compromised by a malicious executable/payload. There are some giveaways, like magic bytes or dialogue in the TCP stream, such as '`This program can't be run in DOS mode`,' which is a good indicator that an executable has been downloaded, as well as revealing mismatched file extensions.
- **IP/domains of infected sites** – to see where malicious files originate. Destination IPs are also useful to review data going out (e.g., command and control servers).
- **Protocols** – what protocol are we dealing with? This will help focus the investigation and could provide useful info. For example, low domain name service (DNS) time to live (TTL) or the use of non-standard/archaic protocols might be an indication of malicious intent (e.g., botnet traffic).
- **Statistics** – when using Wireshark, this feature gives you interesting pieces of traffic to focus on. 
### Identifying device information
##### Hostnames and user accounts
Hostnames and user accounts are crucial pieces of information that analysts need to identify when analysing network captures taken from infected hosts. These pieces of information often serve as key IOCs, which can point to the origin of a particular incident taking place.

There are a few different ways that different pieces of information can be retrieved. Any host within a network will have three identifiers:

- A MAC address
- An IP address
- A hostname

Alerts generated within a SOC will most likely be based upon IP addresses. It is then possible to correlate corresponding MAC addresses and hostnames if a packet capture taken of the internal network is available.

So how do we find this information in Wireshark? The first two methods include filtering traffic by protocols; these are Dynamic Host Configuration Protocol (DHCP) and NetBIOS Name Service (NBNS).
##### Host information from DHCP traffic
DHCP is a client/server protocol used to dynamically assign IP addresses and other things to a DHCP client. The following filter can be used in Wireshark to view this traffic:

`bootp`
When filtering for DHCP traffic you can see hostnames by selecting a packet labeled as ‘DHCP Request’, then in the details section expanding the line ‘Bootstrap Protocol (Request)'. Here you will be able to expand two further lines, ‘Client Identifier’ and ‘Host Name’. This will now reveal the MAC address and hostname of a user.
##### Host information from NetBIOS Name Service (NBNS) traffic
You may not always find DHCP traffic in the packet capture you're analyzing. If this is the case you need another way to identify hosts. Luckily, you can use NBNS traffic to identify hostnames for computers that run Microsoft Windows or Apple MacOS.
NBNS serves much the same purpose as DNS does; it translates human-readable names to IP addresses (e.g. www.example.com to 92.230.266.290). The following filter can be used in Wireshark to view this traffic:
`nbns`
When filtering for NBNS you will quickly be able to view hostnames which can then be correlated with IP and MAC addresses. You can dig into the frame details further through ‘Additional records’, where you can view the IP address assigned to the specific hostname.
#### Windows account names in an AD environment from Kerberos traffic
When analyzing traffic from Windows hosts in an Active Directory (AD) environment, it's possible to locate hostnames and user account names within Kerberos traffic.
Kerberos is a service that provides mutual authentication between users and services in a network. It's popular in both Unix and Windows AD environments. The following filter can be used in Wireshark to view this traffic:
`kerberos.CNameString`
When filtering for Kerberos traffic you can see Windows User Account names by selecting a packet and then digging down into ‘as-req’, ‘req-body’, ‘cname’, then ‘cname-string’.
If you would like to only view Windows user account names rather than hostnames, you can achieve this by filtering out the $ sign which is always present at the end of hostnames, but not present in Windows user account names.

`kerberos.CNameString and !(kerberos.CNameString contains $)`

### OS and device models
#### Device info from HTTP traffic
Device information about hosts can also be discovered when analyzing packet captures. This is important and can be found in ‘User-Agent’ strings within the header of HTTP traffic.

`http.request and !(ssdp)`

The above command will locate HTTP requests. In Wireshark, you can then follow the TCP stream of packets by right-clicking, going down to ‘Follow’, and then selecting ‘TCP Stream’. Request headers can then be viewed which will contain the ‘User-Agent’ string.

This ‘User-Agent’ string will differ depending on the browser and operating system the user is accessing the server from, as well as other factors. Take the following string as an example:

`Mozilla/5.0 (**iPad; U; CPU OS 3_2_1 like Mac OS X; en-us**) AppleWebKit/531.21.10 (KHTML, like Gecko) Mobile/7B405`

The bold and underlined section details the system information in which the browser is running.

However, not all HTTP activity is web browsing traffic. In this case, the above header will not be produced. This means that you may have to search through multiple packets before you can find this information.

## Malware
#### Web-based traffic
Malware is frequently distributed on the web, meaning that it often generates web traffic. Not only can the distribution of malware be captured, but also data exfiltration and interaction with suspicious servers. This means that web-based traffic is as good a place as any to start an investigation when looking for IOCs relating to a malware infection.

Two extremely useful filters are as follows:
`http.request` filters for all HTTP-based traffic, revealing URLs.
`ssl.handshake.type == 1` filters for HTTPS-based traffic, where you can review domain names.

The two of them can even be combined using an `or` logical expression in your filter.

Another tip is to filter out SSDP traffic with `!(ssdp)` or `!(udp.port eq 1900)`. This traffic is generated by the Simple Service Discovery Protocol, and is not representative of normal web traffic. It therefore just adds to the noise of packet captures.

Filtering for packets that show unsuccessful attempts to connect to external servers can indicate malicious intent. This can be achieved by including the filter `tcp.flags eq 0x0002`. This shows TCP SYN segments from packets that receive no response from a server, meaning a connection has been unsuccessful.
#### C2 (command and control servers)

But what if post-infection traffic isn't web based? In some cases, a malware sample won't generate the web-based traffic (HTTP/HTTPS) discussed above – instead it will contact a command and control server (C2). There are various ways these servers can be hosted. Each produces a different kind of traffic, for example, servers hosted on IP addresses or a server using a domain name.

This is why we must expand our filter to include other types of traffic. Firstly, we want to see DNS traffic, as this will help identify any active servers communicating within the traffic capture. The `dns` filter can be used to achieve this.

Combining the filters mentioned thus far, you end up with the following filter: (http.request or ssl.handshake.type == 1 or tcp.flags eq 0x0002 or dns) and !(udp.port eq 1900)

#### Data exfiltration
Next, you can consider whether a piece of malware has transferred any files to the host. This is one method that malware could use to execute further malicious code on infected machines after a foothold has been established. Files can be transferred in a number of ways, one of which is through the use of the File Transfer Protocol (FTP). This can be inspected with the `ftp` filter.

#### Spambots
The last protocol we will be looking at is Simple Mail Transfer Protocol (SMTP). Some malware may turn hosts into spambots, designed to send out hundreds of emails as part of phishing campaigns. In this scenario, multiple DNS requests will be made to mail servers, accompanied by SMTP traffic on TCP ports associated with email traffic (25, 465, 587, etc.).

If the email traffic has not been encrypted, you can even search for common email headers using the Wireshark display filter `contains`. This allows you to search for strings that are present in the traffic and can point towards important evidence such as origin email addresses or subject lines, which in turn could help inform an investigation.

`smtp contains “From: ”`

#### HTTP GET requests

GET requests are used to retrieve information from a given server using a URI. GET is one of the most common HTTP methods and should only be used to retrieve information while having no other effect on the data.

Responses to HTTP request traffic can be inspected for information such as status codes, which indicate whether a request has been successful or not, along with information about why a request may or may not have been successful.

HTTP data can be zeroed down on using the `http` Wireshark Display Filter.

**TCP streams**

TCP streams are blocks of data sent from an application to TCP. In Wireshark, you are able to view these streams in the way that the application layer sees it. This can be extremely useful when analysing and understanding traffic within Wireshark because it allows you to read and extract crucial pieces of data/information easily.

In order to filter by a specific TCP stream in Wireshark, you can use the following filter:

`tcp.stream eq 1`

## Private Key Decryption
Wireshark supports TLS decryption as long as appropriate secrets are provided. There are two applicable methods to achieve this:

- Key log file using per session secrets (keys)
- Decryption using an RSA private key

In this lab, we are going to focus on the second of the two. We do have a lab on the first method called Wireshark TLS, and this is linked above.
#### Decryption steps

Decrypting Wireshark traffic with a private key involves a few steps.

The key pieces of information you need to decrypt traffic using an RSA private key are:

- **IP address:** the IP address of the host which holds the private key used to decrypt the data, and serves the certificate.
- **Port:** the destination port used to communicate with the host that holds the private key.
- **Protocol:** the upper-level protocol being encrypted by SSL/TLS, for example, the protocol being encrypted over an HTTPS connection is HTTP.
- **Key file:** location of the corresponding key file.
- **Password:** the passphrase used to protect the private key file.

To decrypt Wireshark traffic using an RSA private key, you need to edit some preference settings in Wireshark. This can be achieved by navigating to _Edit_ > _Preferences_ > _Protocols_ > _TLS_ > _RSA keys_ list.

When the additional dialogue box pops up, fill in the relevant details, set the key file field to the file location of any known TLS keys, and then hit ‘OK’.

![](https://il-labforge-assets.origin.immersivelabs.team/uploads/THeeRx2j4Uj_zf0vWEUoELQ23lOVjXB6eIq6WwwSnBA.png)

### ngrep

`ngrep` is useful for quick network analyses. It's a flexible tool that allows users to search and match different types of strings (HEX, ASCII words and phrases) as well as read several different protocols such as TCP, UDP, ICMP, FTP, SMTP and HTTP. `ngrep` is designed to read packets directly from the interface or from a tcpdump-compatible packet capture file. To read packets from a file with `ngrep` you can use the `-I` option.

**Syntax:** `ngrep -I [pcapfile]`

**Pattern matching**

In the same way that `grep` can search for patterns in a binary file, `ngrep` can search for patterns in a PCAP file that is correctly parsed, rather than just looking at the raw file. The syntax is, in this way, similar to `grep`.

**Syntax:** `ngrep -I ngrep.pcap "POST"`

**Modifiers**

Another similarity between `grep` and `ngrep` is their ability to use regular expressions, as well as apply and inverse matching options to the results. This way, only packets that don't match are displayed.

**#**

You'll see the `#` character (hash sign [UK]/pound sign [USA]) a lot when using `ngrep`. This character denotes the number of packets that are associated with a Berkeley Packet Filter syntax (BPF) match. You can disable this using the `-q` option.

**Empty packets**

Use the `-e` flag to display empty packets with `ngrep`.

**Syntax**: `ngrep -I ngrep.pcap -e`

**Packet filters**

`ngrep` understands BPF syntax, which can be applied alongside the pattern match. For example, you can use a BPF to restrict the pattern match to a specific host or port.

**Syntax:** `ngrep -I ngrep.pcap "POST" host 'IP_ADDRESS'`

There are many other options that can be used to filter the input and output of packets and results. The following [link](https://linux.die.net/man/8/ngrep) contains detailed information on many of these.

## Tcpdump
Knowing how to analyze a network is an essential skill for System Administrators and Network Security Analysts, as it enables them to understand what is happening in the network. When Wireshark is not an option, `tcpdump` can come into play.

`tcpdump` is a command line packet analysis tool. `tcpdump` and Wireshark perform similar functions, though Wireshark has a GUI, whereas `tcpdump` does not. With `tcpdump`, you can use `-r` to read into a PCAP file. This will display the entire list of packets from the file, unfiltered.

```plaintext
tcpdump -r [filename.pcapng]
```

Running `tcpdump --help` will display the main options that can be given to the tool.

‘Capture’ files can contain lots of information, making them noisy during analysis phases. To counter this, you can use BPF syntax (just as you would with Wireshark) and specify options such as source hosts/IP destinations, etc. The below example will display all packets transferred to and from a specified IP address.


```plaintext
tcpdump -r [filename.pcapng] host [IPADDRESS]
```

Having the packet information in an organized format can be an aid during analysis. `tcpdump` allows you to output your results into a specified file type such as **csv** or **txt**. To do this, you can specify the `-w` option:


```plaintext
tcpdump -r [filename.pcapng] -w [filename]
```

Specifying the `-nn` option for `tcpdump` will prevent the tool from converting packets and DNS resolution. Using this will speed up the tool's execution on this machine.

```plaintext
tcpdump -nn -r [filename.pcapng] -w [filename]
```

## What is BPF Syntax?
The Berkeley Packet Filter (BPF) is a technology designed to filter out unwanted packet copies from entering user space on BSD Unix Systems. Its purpose was to filter unwanted packets as early as possible when capturing live traffic from the wire.

BPF is used as a capture filter in packet analyzers such as Wireshark. It can also be used in a Linux terminal through command line tools such as `tcpdump`.

**The difference between capture filters and display filters:** having spoken about ‘capture’ and ‘display’ filters so much in this skill line, it is important to distinguish and understand the difference between them.

Capture filters are set before a packet capture has begun and cannot be modified during a capture. Capture filters reduce the raw size of a packet capture, only capturing the packets that have not been filtered as per the user's instructions. Display filters, on the other hand, are used to analyze packets from a packet list post capture.

Both filter types are useful because any packet capture can log many packets, and it is often necessary to filter the important stuff from the noise to focus an investigation.

## Usages and examples
An expression is used to filter through the packets and can consist of multiple primitives. These primitives are broken down into 'IDs' preceded by one or multiple 'qualifiers'. There are three kinds of qualifier:

- **Type:** these qualifiers say what the ID or number refers to. Possible type qualifiers are _host_, _net_, _port_ and _portrange_. For example, `host iml` or `port 20`.
- **Dir:** these qualifiers specify a transfer direction to and/or from the ID. Possible dir qualifiers are _src_, _dst_, _src or dst_, and _src and dst_. For example, `src iml` or `dst net 138.4`.
- **Proto:** these qualifiers restrict the match to a particular protocol. Possible proto qualifiers are _ether_, _wlan_, _ip_, _ip6_, _fddi_, _tr_, _arp_, _rarp_, _decnet_, _tcp_, and _udp_. For example, `tcp port 20` or `arp net 128.5`.

Operators such as ‘and’, ‘or’ and ‘not’ can be used to combine primitives and create complex filters. This concept will be covered in more depth in later episodes.
All of this information can be summarised as below:

```
<<qualifier>> <<qualifier>> <<id>>  }  a single primitive
```

An expression is used to filter packets. Take, for instance, the following:

`src host 192.168.0.1 and tcp port 80`

This expression is used to capture packets from only a particular source IP address on TCP port 80.

See below for further detail on what each primitive means.

`src host 192.168.0.1` – This defines the origin of the packet (`src`) and the qualifier to filter by (`host`). In this case, this primitive means that you are looking for the source IP address (_192.168.0.1_).

`&& tcp port 80` – By using the ‘`&&`’ operator, you will add an additional primitive which, in this case, filters packets for TCP port 80.

A BPF style syntax cheat sheet can be found [here](https://biot.com/capstats/bpf.html).
