// Full curriculum content for LearnSphere's networking track.
// Every lesson is text + diagrams (no video), paginated, and gated by a quiz.
import { Course, Lesson, LessonPage, LessonQuiz, QuizQuestion, Section } from './types';

function page(id: string, heading: string, body: string[], opts: Partial<LessonPage> = {}): LessonPage {
  return { id, heading, body, ...opts };
}

function q(id: string, prompt: string, options: string[], correctAnswer: string, explanation: string): QuizQuestion {
  return { id, prompt, options, correctAnswer, explanation };
}

function quiz(id: string, title: string, questions: QuizQuestion[]): LessonQuiz {
  return { id, title, passingScore: 70, questions };
}

function lesson(id: string, title: string, pages: LessonPage[], quizObj: LessonQuiz, isPreview = false): Lesson {
  return { id, title, type: 'reading', estimatedMinutes: pages.length * 3, isPreview, pages, quiz: quizObj };
}

const COVER = {
  net: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&q=80',
  models: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80',
  switching: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80',
  routing: 'https://images.unsplash.com/photo-1523726491678-bf852e717f6a?w=800&q=80',
  security: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&q=80',
};

/* ───────────────────────── Course 1 — Networking Fundamentals ───────────────────────── */

const l1_1 = lesson(
  'nf-l1',
  'What Is a Network?',
  [
    page('p1', 'Why We Network Computers', [
      'A computer network is simply two or more devices connected so they can share resources and exchange information. Before networks, moving a file from one computer to another meant copying it to a disk and walking it over — a process engineers still jokingly call "sneakernet."',
      'Modern networks let people share files, printers, and internet connections; run centralized applications; and communicate in real time over chat, voice, and video. Every one of those conveniences depends on the same underlying idea: devices agreeing on a common way to send and receive data.',
    ], { callout: { label: 'Key idea', text: 'A network exists to let devices share resources and communicate — everything else is implementation detail.' } }),
    page('p2', 'Clients, Servers, and Peers', [
      'Most networks are built around a client-server model. A server is a device that offers a resource or service — files, web pages, email, authentication — and a client is a device that requests it. Your laptop is a client when it loads a web page; the machine hosting that page is the server.',
      'Some networks instead use a peer-to-peer model, where every device can act as both client and server with no central authority. Peer-to-peer works well for small, informal setups — like sharing a printer between two home computers — but doesn\'t scale to the centralized control, security, and backup that organizations need.',
    ], { bullets: ['Client — requests a resource or service', 'Server — provides a resource or service', 'Peer-to-peer — every device is both'] }),
    page('p3', 'LANs and WANs at a Glance', [
      'Networks are also classified by geographic scope. A Local Area Network (LAN) covers a limited area — a single office, floor, or building — and is typically owned and managed by one organization. A Wide Area Network (WAN) spans multiple sites, often across cities or countries, and usually relies on a service provider\'s infrastructure to link them together.',
      'The internet itself is essentially a WAN of WANs: millions of individually-owned networks agreeing to exchange traffic through common protocols. Understanding the LAN/WAN split matters because the equipment, speeds, and costs involved are very different at each scale.',
    ], { diagram: 'lan-wan', diagramCaption: 'Two site LANs connected across a WAN link by routers.' }),
    page('p4', 'How Data Actually Travels', [
      'When you send data across a network, it isn\'t transmitted as one unbroken stream. It\'s broken into small chunks, each wrapped with addressing information, sent independently — sometimes over different paths — and reassembled at the destination. This chunking is what allows many devices to share the same physical wiring fairly and recover gracefully from a lost chunk without resending everything.',
      'You\'ll see this idea again and again throughout this course under different names — frames, packets, segments — depending on which layer of the network is doing the wrapping. For now, the important takeaway is simply that data travels in pieces, not as a single blob.',
    ]),
    page('p5', 'Key Terms Recap', [
      'You now have the vocabulary to describe what a network is for and how it\'s structured at a high level. The next lesson builds on this by looking at the physical shapes — topologies — that networks are wired into, and the hardware that makes them work.',
    ], { callout: { label: 'Recap', text: 'Network = shared resources + communication. Client/server vs peer-to-peer. LAN = one site, WAN = many sites linked together.' } }),
  ],
  quiz('nf-l1-quiz', 'What Is a Network? — Knowledge Check', [
    q('q1', 'What is the primary purpose of connecting computers into a network?', ['To make computers run faster', 'To share resources and communicate', 'To reduce the number of computers needed', 'To avoid using the internet'], 'To share resources and communicate', 'Networking exists so devices can share resources like files and printers, and communicate with each other.'),
    q('q2', 'In the client-server model, what is a server?', ['A device that only sends emails', 'A device that requests a resource', 'A device that provides a resource or service to others', 'A type of cable'], 'A device that provides a resource or service to others', 'Servers provide resources or services; clients request them.'),
    q('q3', 'Which best describes a LAN?', ['A network spanning multiple countries', 'A network confined to a single site, like an office or building', 'A backup power system', 'The public internet'], 'A network confined to a single site, like an office or building', 'LAN stands for Local Area Network — a network within one limited location.'),
    q('q4', 'What best describes a WAN?', ['A network limited to one room', 'A network that connects multiple sites over long distances', 'A type of network cable', 'A wireless-only network'], 'A network that connects multiple sites over long distances', 'A WAN links separate LANs across cities, countries, or continents.'),
    q('q5', 'Why is data broken into smaller chunks before being sent across a network?', ['To make it harder to intercept', 'So it fits on a single cable only', 'To share bandwidth fairly and recover from loss without resending everything', 'Because computers can only store small files'], 'To share bandwidth fairly and recover from loss without resending everything', 'Chunking data lets many devices share a link fairly and allows lost pieces to be retransmitted individually.'),
  ]),
);

const l1_2 = lesson(
  'nf-l2',
  'Network Types & Topologies',
  [
    page('p1', 'Classifying Networks by Size', [
      'Beyond LAN and WAN, you\'ll sometimes hear other scope-based terms: a MAN (Metropolitan Area Network) spans a city, and a PAN (Personal Area Network) covers just a few meters around a single person — think Bluetooth earbuds paired to a phone. These distinctions matter less day-to-day than LAN vs. WAN, but they show up in certification exams and vendor documentation.',
      'Separately from scope, a network also has a topology — the physical or logical arrangement of its connections. Topology affects cost, reliability, and how failures behave, so choosing one is a real design decision, not just wiring convenience.',
    ]),
    page('p2', 'Star Topology', [
      'In a star topology, every device connects individually to a central point — almost always a switch today. This is by far the most common LAN topology in modern buildings because it\'s easy to install, easy to troubleshoot (a bad cable only affects one device), and easy to expand by adding more switch ports.',
      'The tradeoff is that the central device becomes a single point of failure: if the switch goes down, every device connected to it loses connectivity, even though the individual cables are all fine.',
    ], { diagram: 'topology-star', diagramCaption: 'Every device cables directly back to a central switch.' }),
    page('p3', 'Mesh Topology', [
      'In a full mesh topology, every device has a direct connection to every other device. This gives excellent redundancy — there\'s no single point of failure, and traffic can reroute around any broken link — but the cabling cost grows very quickly as devices are added.',
      'Full mesh is rarely used for end-user LANs because of that cost, but it\'s common in the core of large ISP or data-center networks, where a handful of high-value routers justify the extra links for reliability.',
    ], { diagram: 'topology-mesh', diagramCaption: 'Five routers, each directly linked to every other router.' }),
    page('p4', 'Bus & Legacy Topologies', [
      'Older Ethernet networks used a bus topology: every device tapped into one shared backbone cable. It was cheap to install but fragile — a single break anywhere on the cable could take down the entire segment, and only one device could transmit at a time without collisions.',
      'A ring topology, used by older technologies like Token Ring, connects devices in a closed loop where data passes from neighbor to neighbor. Both bus and ring topologies have largely been replaced by switched star topologies in modern networks, but you\'ll still encounter the terms in networking literature and certification material.',
    ], { diagram: 'topology-bus', diagramCaption: 'A shared backbone cable that every device taps into.' }),
    page('p5', 'Choosing a Topology', [
      'For almost any modern LAN you\'ll design or troubleshoot, the answer is star topology built around switches, sometimes with redundant links between switches for resilience. Understanding mesh and bus topologies is still valuable — it explains why switched networks were such an improvement, and it prepares you for topics like Spanning Tree Protocol later in this course, which exists specifically to manage redundant links safely.',
    ], { callout: { label: 'Recap', text: 'Star = standard for modern LANs. Mesh = maximum redundancy at high cost. Bus/ring = legacy, mostly retired.' } }),
  ],
  quiz('nf-l2-quiz', 'Network Types & Topologies — Knowledge Check', [
    q('q1', 'What network scope term describes a network that spans an entire city?', ['LAN', 'PAN', 'MAN', 'WAN'], 'MAN', 'MAN (Metropolitan Area Network) describes a network spanning a city.'),
    q('q2', 'In a star topology, what happens if the central switch fails?', ['Nothing — devices keep talking directly to each other', 'Only the two nearest devices lose connectivity', 'All connected devices lose connectivity', 'The network automatically switches to a mesh topology'], 'All connected devices lose connectivity', 'The central device in a star topology is a single point of failure for everything connected to it.'),
    q('q3', 'What is the main advantage of a full mesh topology?', ['It is the cheapest to cable', 'It has no single point of failure and offers strong redundancy', 'It requires the fewest devices', 'It only works wirelessly'], 'It has no single point of failure and offers strong redundancy', 'Because every device connects to every other device, mesh topologies can route around failed links.'),
    q('q4', 'Why did bus topology networks fall out of favor?', ['They were too fast for older computers', 'A single cable break could take down the whole segment, and only one device could transmit at a time', 'They required wireless access points', 'They could not connect more than two devices'], 'A single cable break could take down the whole segment, and only one device could transmit at a time', 'Bus topologies share one backbone cable, making them fragile and collision-prone.'),
    q('q5', 'What topology is standard for modern LANs?', ['Bus', 'Ring', 'Star (built around switches)', 'Full mesh of every end-user device'], 'Star (built around switches)', 'Star topology, built around switches, is the standard for modern LANs due to ease of installation and troubleshooting.'),
  ]),
);

const l1_3 = lesson(
  'nf-l3',
  'Network Hardware',
  [
    page('p1', 'NICs and Cabling Basics', [
      'Every networked device needs a Network Interface Card (NIC) — the hardware that physically connects it to the network and gives it a unique hardware address (its MAC address, covered in a later lesson). Most modern NICs are built directly into a device\'s motherboard rather than added as a separate card.',
      'The NIC connects to the network using either a cable (copper or fiber) or a wireless radio. That physical connection is what everything else in networking rides on top of — no matter how clever the software, data still has to move across a real medium.',
    ]),
    page('p2', 'Hubs vs. Switches vs. Routers', [
      'A hub is the simplest — and now largely obsolete — connectivity device. It just repeats every incoming signal out every other port, with no intelligence at all, which means every device on a hub shares the same collision domain.',
      'A switch is smarter: it examines each incoming frame\'s destination MAC address and forwards it only out the port where that device actually lives, dramatically cutting down unnecessary traffic. A router operates one level up, forwarding traffic between different networks based on IP address rather than MAC address — it\'s what lets your home network reach the internet at all.',
    ], { diagram: 'network-devices', diagramCaption: 'Hub, switch, router, and access point compared.' }),
    page('p3', 'Access Points and Wireless Devices', [
      'A wireless access point (AP) bridges wireless clients into a wired network, translating between the Wi-Fi radio protocol and standard Ethernet. Consumer "routers" sold for home use are usually a combo device — router, switch, and access point bundled into one box — which is convenient but can blur these concepts for newcomers.',
      'In enterprise networks, these roles are almost always split into dedicated hardware: a router at the edge, switches distributing wired ports, and multiple access points spread through the building for wireless coverage.',
    ]),
    page('p4', 'Where Each Device Sits in the Network', [
      'A useful mental model is to think in layers of scope. Hubs and switches operate within a single LAN, connecting devices that are "local" to each other. Routers sit at the boundary between networks, making the decision about how traffic gets from one LAN to another — including out to the internet.',
      'When you troubleshoot connectivity problems later in your networking career, this hierarchy is often the first thing to check: is the issue local (switch/cabling) or is it about reaching another network entirely (routing)?',
    ]),
    page('p5', 'Cisco Device Naming Conventions', [
      'Cisco equipment — the most widely deployed enterprise networking hardware — labels physical interfaces in a predictable pattern, such as GigabitEthernet0/1 (often shortened to Gi0/1) or FastEthernet0/0. The number after the slash typically identifies the physical port on that module.',
      'You\'ll see this naming convention throughout the rest of this course whenever routing tables or interface examples come up. Getting comfortable reading it now will make later lessons, and real device configuration, much easier to follow.',
    ], { callout: { label: 'Recap', text: 'NIC connects a device physically. Hubs repeat blindly, switches forward by MAC, routers forward by IP between networks.' } }),
  ],
  quiz('nf-l3-quiz', 'Network Hardware — Knowledge Check', [
    q('q1', 'What does a NIC provide to a device?', ['A software firewall', 'The physical connection to the network and a unique hardware address', 'An IP address automatically', 'Wireless internet access only'], 'The physical connection to the network and a unique hardware address', 'A Network Interface Card gives a device its physical connection and MAC address.'),
    q('q2', 'How does a hub handle incoming traffic?', ['It forwards frames only to the correct destination port', 'It repeats every signal out every other port with no intelligence', 'It blocks all traffic by default', 'It routes traffic between networks'], 'It repeats every signal out every other port with no intelligence', 'Hubs have no addressing intelligence — they simply repeat signals to all ports.'),
    q('q3', 'A switch forwards traffic based on which address?', ['IP address', 'MAC address', 'Port number only', 'Domain name'], 'MAC address', 'Switches build a table of MAC addresses to forward frames only to the correct port.'),
    q('q4', 'What is the primary job of a router?', ['Repeating signals within one LAN', 'Forwarding traffic between different networks based on IP address', 'Assigning MAC addresses to devices', 'Encrypting all wireless traffic'], 'Forwarding traffic between different networks based on IP address', 'Routers connect and forward traffic between separate networks using IP addressing.'),
    q('q5', 'In Cisco interface naming, what does "Gi0/1" typically refer to?', ['A wireless SSID', 'A GigabitEthernet interface, module 0, port 1', 'A type of network cable', 'A VLAN number'], 'A GigabitEthernet interface, module 0, port 1', 'Cisco names physical interfaces by type and position, e.g., GigabitEthernet0/1.'),
  ]),
);

const l1_4 = lesson(
  'nf-l4',
  'Transmission Media & Signals',
  [
    page('p1', 'Copper Cabling', [
      'The most common LAN cabling is unshielded twisted pair (UTP) copper cable, categorized by performance — Cat5e supports gigabit speeds up to 100 meters, Cat6 and Cat6a push higher speeds and better noise resistance over the same distance limit. Twisting the pairs of wires together is what reduces electromagnetic interference between them.',
      'Copper is cheap, easy to terminate, and good enough for the vast majority of desk-to-switch connections, but it is vulnerable to electrical interference and has a hard distance ceiling of about 100 meters per run before signal quality degrades.',
    ]),
    page('p2', 'Fiber Optic Cabling', [
      'Fiber optic cable transmits data as pulses of light rather than electrical signals, which makes it immune to electromagnetic interference and capable of running much farther — kilometers rather than meters — without a repeater. Single-mode fiber uses a narrow core and a laser light source for the longest distances; multi-mode fiber uses a wider core and LED light source for shorter, cheaper runs within a building or campus.',
      'Fiber costs more per port than copper and requires more careful handling, which is why it\'s typically reserved for backbone links between switches or buildings rather than every individual desk connection.',
    ]),
    page('p3', 'Wireless Signals', [
      'Wireless networking (Wi-Fi) transmits data as radio waves, typically in the 2.4 GHz or 5 GHz bands, with newer standards also using 6 GHz. Lower frequencies (2.4 GHz) travel farther and penetrate walls better but offer less bandwidth and more interference from other devices like microwaves and cordless phones; higher frequencies (5/6 GHz) offer more bandwidth over shorter range.',
      'Because wireless is a shared, broadcast medium, it\'s inherently more exposed to eavesdropping and interference than a physical cable — a theme that becomes important later in the security lessons.',
    ]),
    page('p4', 'Comparing the Media', [
      'Choosing a transmission medium is a tradeoff between cost, distance, bandwidth, and physical practicality. Most real networks use all three: fiber for long backbone runs between switches or sites, copper for short desk and device connections, and wireless for mobility and hard-to-cable areas.',
    ], { diagram: 'cabling-types', diagramCaption: 'Copper, fiber, coaxial, and wireless compared at a glance.' }),
    page('p5', 'Recap and Media Selection', [
      'When you\'re asked to choose a medium for a given scenario, ask three questions: How far does the signal need to travel? How much bandwidth is required? And does the device need to move (making wireless the only real option)? Working through those questions in order gets you to the right answer almost every time.',
    ], { callout: { label: 'Recap', text: 'Copper = cheap, short runs. Fiber = long distance, immune to interference, higher cost. Wireless = mobility, shared and exposed medium.' } }),
  ],
  quiz('nf-l4-quiz', 'Transmission Media & Signals — Knowledge Check', [
    q('q1', 'What is the maximum practical run length for standard UTP copper cabling before signal quality degrades?', ['10 meters', 'About 100 meters', '1 kilometer', 'There is no limit'], 'About 100 meters', 'Standard UTP copper cabling has a practical distance limit of about 100 meters.'),
    q('q2', 'Why is fiber optic cable immune to electromagnetic interference?', ['It uses thicker copper wire', 'It transmits data as light rather than electrical signals', 'It is always buried underground', 'It uses a lower frequency than copper'], 'It transmits data as light rather than electrical signals', 'Fiber carries light pulses instead of electrical signals, so electromagnetic interference does not affect it.'),
    q('q3', 'Which fiber type is best suited for the longest-distance links?', ['Multi-mode fiber', 'Single-mode fiber', 'Coaxial fiber', 'Twisted-pair fiber'], 'Single-mode fiber', 'Single-mode fiber uses a laser and narrow core, supporting the longest distances.'),
    q('q4', 'Compared to 5 GHz Wi-Fi, what is a key advantage of the 2.4 GHz band?', ['Much higher bandwidth', 'Better range and wall penetration', 'Complete immunity to interference', 'It cannot be intercepted'], 'Better range and wall penetration', '2.4 GHz signals travel farther and pass through obstacles more effectively than 5 GHz, at the cost of bandwidth.'),
    q('q5', 'Why is wireless traffic generally considered more exposed than wired traffic?', ['It travels through a shared, broadcast medium anyone nearby can listen to', 'It uses weaker encryption by law', 'It cannot use passwords', 'It only works over short distances'], 'It travels through a shared, broadcast medium anyone nearby can listen to', 'Because radio waves broadcast outward, nearby devices can potentially intercept wireless traffic, unlike a physical cable.'),
  ]),
);

const course1: Course = {
  _id: '1',
  slug: 'networking-fundamentals',
  title: 'Networking Fundamentals',
  subtitle: 'The building blocks every network engineer starts with',
  description:
    'Start from zero: what a network is, how it\'s shaped, and what hardware makes it work. This course lays the foundation for everything else in the networking track, covering LANs and WANs, topologies, core hardware, and transmission media.',
  category: 'Networking',
  difficulty: 'beginner',
  priceCents: 0,
  coverImageUrl: COVER.net,
  iconTint: 'brand',
  curriculum: [{ id: 's1', title: 'Foundations of Networking', lessons: [l1_1, l1_2, l1_3, l1_4] } as unknown as Section],
  averageRating: 4.9,
  reviewCount: 512,
  enrollmentCount: 8410,
  instructor: { fullName: 'Chinedu Obi' },
};

/* ───────────────────────── Course 2 — OSI & TCP/IP Models ───────────────────────── */

const l2_1 = lesson(
  'osi-l1',
  'Why Models Matter',
  [
    page('p1', 'The Problem Layering Solves', [
      'Networking involves an enormous range of concerns at once: electrical signaling, addressing, routing, error recovery, application data formatting, and more. Trying to design or troubleshoot all of that as one giant tangled system would be unmanageable — and it would mean every vendor had to solve every problem from scratch.',
      'The solution the industry settled on is layering: breaking the overall job of networking into a stack of independent layers, each responsible for one narrow piece of the problem, and each communicating only with the layers directly above and below it.',
    ]),
    page('p2', 'Protocols and Standards', [
      'A protocol is simply an agreed-upon set of rules for how two systems communicate — much like a shared language. For devices from different manufacturers to talk to each other at all, they need to follow the same protocols and standards, defined by organizations like the IEEE, IETF, and ISO.',
      'Layered models don\'t just organize protocols conceptually; they let a protocol at one layer be swapped out without breaking the layers around it. You can run the exact same web browsing session over Ethernet, Wi-Fi, or a cellular connection because those differences are contained entirely within the lower layers.',
    ]),
    page('p3', 'Peer-to-Peer Communication Between Layers', [
      'A useful way to think about layering is that each layer on the sending device is having a conceptual conversation with the same layer on the receiving device — the Transport layer on your laptop "talks to" the Transport layer on the web server, even though the actual bits physically travel down through every layer, across the wire, and back up through every layer on the other end.',
      'This is why you\'ll often see layered diagrams drawn with horizontal arrows between matching layers on two stacked towers — it represents that logical peer relationship, not the physical path the data takes.',
    ]),
    page('p4', 'Where OSI and TCP/IP Come From', [
      'The OSI (Open Systems Interconnection) model was developed by the ISO in the early 1980s as a comprehensive, vendor-neutral reference model with seven layers. The TCP/IP model, meanwhile, grew organically out of the actual protocols developed for ARPANET and became the practical foundation of the modern internet, with four layers.',
      'OSI never saw full real-world adoption exactly as designed, but it remains the standard teaching and troubleshooting reference because its seven layers separate concerns more precisely. TCP/IP is what\'s actually running underneath the internet today. You need to know both.',
    ]),
    page('p5', 'Recap', [
      'Layering exists to manage complexity and let pieces of the network evolve independently. The next two lessons walk through OSI\'s seven layers and TCP/IP\'s four layers in detail, then map real protocols onto them.',
    ], { callout: { label: 'Recap', text: 'Models exist to divide networking into independent, swappable layers. OSI = 7-layer teaching reference. TCP/IP = 4-layer real-world implementation.' } }),
  ],
  quiz('osi-l1-quiz', 'Why Models Matter — Knowledge Check', [
    q('q1', 'What problem does layering solve in network design?', ['It makes cables cheaper', 'It breaks a complex problem into independent, manageable pieces', 'It removes the need for addressing', 'It eliminates the need for standards'], 'It breaks a complex problem into independent, manageable pieces', 'Layering divides networking into independent layers, each handling one concern.'),
    q('q2', 'What is a protocol?', ['A type of cable', 'An agreed-upon set of rules for communication between systems', 'A brand of networking hardware', 'A physical network topology'], 'An agreed-upon set of rules for communication between systems', 'A protocol is a shared set of communication rules that devices agree to follow.'),
    q('q3', 'What does it mean for layers to communicate "peer to peer"?', ['Only end-user devices can communicate', 'A layer on the sender logically corresponds to the same layer on the receiver', 'Layers must be on the same physical cable', 'Every layer must use the same protocol'], 'A layer on the sender logically corresponds to the same layer on the receiver', 'Each layer has a logical peer relationship with the same layer on the other device, even though data physically travels down and up the stack.'),
    q('q4', 'How many layers does the OSI model have?', ['4', '5', '7', '9'], '7', 'The OSI model has seven layers.'),
    q('q5', 'Which model actually underlies the modern internet\'s real-world implementation?', ['OSI', 'TCP/IP', 'Both equally in practice', 'Neither — the internet uses a proprietary model'], 'TCP/IP', 'TCP/IP grew out of ARPANET\'s actual protocols and is what runs the internet today, while OSI remains primarily a teaching/reference model.'),
  ]),
);

const l2_2 = lesson(
  'osi-l2',
  'The OSI 7-Layer Model',
  [
    page('p1', 'Layers 7–5: Application, Presentation, Session', [
      'The top three OSI layers deal with how applications interact. Layer 7, Application, is closest to the user — it\'s where protocols like HTTP, DNS, and SMTP live, and it represents the network service an application actually wants (loading a page, sending an email). Layer 6, Presentation, handles formatting and translation — think character encoding, compression, and encryption — ensuring data sent by one system is readable by another.',
      'Layer 5, Session, manages the setup, coordination, and teardown of a communication session between two devices, keeping track of which exchanges belong to the same conversation.',
    ], { diagram: 'osi-model', diagramCaption: 'All seven OSI layers, top to bottom.' }),
    page('p2', 'Layer 4: Transport', [
      'The Transport layer is where reliable, end-to-end delivery gets handled. This is where TCP (Transmission Control Protocol) and UDP (User Datagram Protocol) live. TCP guarantees delivery and correct ordering through acknowledgments and retransmission — ideal for things like file transfers and web pages, where every byte matters. UDP skips that overhead for speed, accepting some loss — ideal for live video or voice calls, where a late retransmitted packet is worse than a dropped one.',
      'This layer also introduces port numbers, which let a single IP address run many simultaneous conversations — port 443 for HTTPS, port 53 for DNS, and so on.',
    ]),
    page('p3', 'Layer 3: Network', [
      'The Network layer is responsible for logical addressing and routing — getting a piece of data from its source network to its destination network, potentially through many intermediate routers. IP (Internet Protocol) is the defining protocol here, and this is the layer where the addressing scheme you\'ll study in depth later in this course (IPv4 addresses, subnetting) actually lives.',
      'Routers operate primarily at this layer, making forwarding decisions based on destination IP address rather than the physical MAC address used one layer below.',
    ]),
    page('p4', 'Layers 2–1: Data Link and Physical', [
      'The Data Link layer handles node-to-node delivery across a single physical link, using MAC addresses to identify devices on the same local segment. This is the layer switches operate at, and it\'s also where error detection for a single hop (not end-to-end) happens, via a frame check sequence.',
      'The Physical layer is the bottom of the stack — the actual electrical signals, light pulses, or radio waves, along with the cabling, connectors, and hardware standards that define them. Everything above this layer is, ultimately, just an agreement about how to interpret physical signals.',
    ]),
    page('p5', 'Remembering the Layers', [
      'A classic mnemonic for remembering the layers top to bottom (7→1) is "All People Seem To Need Data Processing" — Application, Presentation, Session, Transport, Network, Data Link, Physical. You don\'t need to memorize OSI for its own sake, but fluently mapping a problem to a layer is one of the fastest ways to narrow down where a network fault actually lives.',
    ], { callout: { label: 'Recap', text: '7 Application · 6 Presentation · 5 Session · 4 Transport · 3 Network · 2 Data Link · 1 Physical' } }),
  ],
  quiz('osi-l2-quiz', 'The OSI 7-Layer Model — Knowledge Check', [
    q('q1', 'Which OSI layer is closest to the end user and hosts protocols like HTTP and DNS?', ['Physical', 'Transport', 'Application', 'Data Link'], 'Application', 'Layer 7, Application, is where user-facing protocols like HTTP and DNS operate.'),
    q('q2', 'Which layer introduces port numbers and protocols like TCP and UDP?', ['Network', 'Transport', 'Session', 'Physical'], 'Transport', 'The Transport layer (Layer 4) handles TCP/UDP and port numbers for end-to-end delivery.'),
    q('q3', 'Which OSI layer is responsible for logical (IP) addressing and routing between networks?', ['Data Link', 'Network', 'Presentation', 'Physical'], 'Network', 'The Network layer (Layer 3) handles IP addressing and routing decisions.'),
    q('q4', 'What kind of address does the Data Link layer use to identify devices on a local segment?', ['IP address', 'MAC address', 'Port number', 'Domain name'], 'MAC address', 'The Data Link layer (Layer 2) uses MAC addresses for node-to-node delivery on a local link.'),
    q('q5', 'Which layer represents the actual electrical signals, light, or radio waves on the wire?', ['Application', 'Session', 'Physical', 'Transport'], 'Physical', 'The Physical layer (Layer 1) is the actual transmission medium and signaling.'),
  ]),
);

const l2_3 = lesson(
  'osi-l3',
  'The TCP/IP Model & Encapsulation',
  [
    page('p1', 'The Four-Layer TCP/IP Model', [
      'TCP/IP condenses OSI\'s seven layers into four practical layers: Application (combining OSI\'s Application, Presentation, and Session), Transport, Internet (equivalent to OSI\'s Network layer), and Network Access (combining OSI\'s Data Link and Physical). This is the model that actually describes how the real internet is built and configured.',
      'You\'ll see TCP/IP referenced constantly in real device configuration and troubleshooting, while OSI is used more as a shared vocabulary for discussing where in the stack a problem lives.',
    ], { diagram: 'tcp-ip-stack', diagramCaption: 'The four-layer TCP/IP model.' }),
    page('p2', 'Mapping OSI to TCP/IP', [
      'Because TCP/IP\'s layers combine several OSI layers, it helps to keep a mental mapping: TCP/IP Application ≈ OSI layers 7-5, TCP/IP Transport ≈ OSI layer 4, TCP/IP Internet ≈ OSI layer 3, and TCP/IP Network Access ≈ OSI layers 2-1.',
      'When someone says "that\'s a Layer 3 problem," they\'re almost always using OSI numbering even in a TCP/IP-based conversation — the OSI numbers have simply become the industry\'s shorthand for describing where in the stack an issue sits.',
    ]),
    page('p3', 'The Encapsulation Concept', [
      'As data moves down the stack for transmission, each layer wraps the data it receives from the layer above with its own header (and sometimes trailer) information — a process called encapsulation. Application data becomes a Transport-layer segment once a TCP or UDP header is added; the segment becomes a Network-layer packet once an IP header is added; and the packet becomes a Data Link-layer frame once Ethernet header and trailer information is added.',
      'Each header carries exactly the information that layer needs to do its job — port numbers at Transport, IP addresses at Network, MAC addresses at Data Link — without needing to understand anything about the layers above or below it.',
    ], { diagram: 'encapsulation', diagramCaption: 'Data → Segment → Packet → Frame, gaining a header at each layer.' }),
    page('p4', 'De-encapsulation on the Receiving End', [
      'When the frame arrives at its destination, the process runs in reverse: de-encapsulation. Each layer strips off its own header, reads what it needs, and passes the remainder up to the next layer — the Data Link layer reads and removes the Ethernet header, the Network layer reads and removes the IP header, and so on, until the original application data is delivered.',
      'Intermediate devices only unwrap as far as they need to. A switch reads the frame header and re-forwards without touching the IP packet inside; a router unwraps far enough to read the IP header, decides where to forward it, and re-wraps it in a new frame for the next hop.',
    ]),
    page('p5', 'Recap', [
      'Encapsulation and de-encapsulation are the mechanical process that makes layering actually work on real hardware. Every diagram, troubleshooting step, and protocol discussion for the rest of this course builds on this concept, so it\'s worth being genuinely comfortable with it before moving on.',
    ], { callout: { label: 'Recap', text: 'Data → Segment (+Transport header) → Packet (+IP header) → Frame (+Ethernet header/trailer). Reversed on arrival.' } }),
  ],
  quiz('osi-l3-quiz', 'TCP/IP Model & Encapsulation — Knowledge Check', [
    q('q1', 'How many layers does the TCP/IP model have?', ['3', '4', '5', '7'], '4', 'The TCP/IP model has four layers: Application, Transport, Internet, and Network Access.'),
    q('q2', 'Which TCP/IP layer combines OSI\'s Application, Presentation, and Session layers?', ['Network Access', 'Internet', 'Transport', 'Application'], 'Application', 'TCP/IP\'s Application layer covers the functions of OSI Layers 5-7.'),
    q('q3', 'What is encapsulation?', ['Deleting unnecessary data before sending it', 'Each layer adding its own header as data moves down the stack', 'Compressing data to save bandwidth', 'Converting IP addresses to MAC addresses'], 'Each layer adding its own header as data moves down the stack', 'Encapsulation is the process of wrapping data with a header at each layer on the way down the stack.'),
    q('q4', 'What is a Network-layer PDU (protocol data unit) called once an IP header is added?', ['Frame', 'Segment', 'Packet', 'Bit'], 'Packet', 'Once an IP header is added at the Network layer, the unit is called a packet.'),
    q('q5', 'What does a router typically unwrap a frame down to before making a forwarding decision?', ['Only the Physical layer signal', 'The IP header (Network layer)', 'The application data itself', 'It never unwraps anything'], 'The IP header (Network layer)', 'Routers read the IP header to make forwarding decisions, then re-encapsulate in a new frame.'),
  ]),
);

const l2_4 = lesson(
  'osi-l4',
  'Common Protocols Mapped to Layers',
  [
    page('p1', 'Application Layer Protocols', [
      'HTTP and HTTPS handle web browsing, with HTTPS adding TLS encryption on top. DNS translates human-friendly domain names into IP addresses, functioning almost like the internet\'s phone book. SMTP handles outgoing email, while protocols like IMAP and POP3 handle retrieving it. FTP transfers files between systems.',
      'Every one of these protocols assumes a working Transport and Network layer beneath it — they define what to say, not how the data physically gets there.',
    ]),
    page('p2', 'Transport Layer: TCP vs. UDP', [
      'TCP is connection-oriented: before any data is sent, the two devices perform a three-way handshake to establish the connection, and TCP then tracks acknowledgments, retransmits lost segments, and puts everything back in order on arrival. This reliability makes TCP the right choice for web pages, email, and file transfers, where missing or scrambled data is unacceptable.',
      'UDP is connectionless: it sends data without any handshake, acknowledgment, or reordering. That statelessness makes UDP fast and low-overhead, which is exactly what real-time voice, video calls, and online gaming need — a slightly dropped video frame is far less disruptive than the delay caused by waiting for a retransmission.',
    ]),
    page('p3', 'Network Layer: IP and ICMP', [
      'IP (Internet Protocol) is the addressing and routing workhorse of the Network layer, and the address format itself — IPv4 and IPv6 — is what makes global routing possible. ICMP (Internet Control Message Protocol) runs alongside IP to report errors and diagnostic information; it\'s the protocol behind the ping and traceroute tools every network engineer uses constantly.',
      'Note that ICMP doesn\'t carry application data at all — its entire job is network diagnostics and error reporting.',
    ]),
    page('p4', 'Data Link and Physical Layer: Ethernet', [
      'Ethernet is the dominant Data Link and Physical layer standard for wired LANs, defining everything from the electrical signaling to the frame format that carries MAC addresses. Wi-Fi (the 802.11 family of standards) plays the equivalent role for wireless connections.',
      'Because these lower layers are largely invisible to applications, most people never think about them directly — but a bad cable, a failing switch port, or wireless interference at this layer will break everything running above it, no matter how well-configured the higher-layer protocols are.',
    ]),
    page('p5', 'Putting It All Together', [
      'A single web page load touches every layer at once: DNS (Application) resolves the domain, TCP (Transport) establishes a reliable connection on port 443, IP (Network) routes the packets across potentially dozens of networks, and Ethernet or Wi-Fi (Data Link/Physical) carries the actual frames on each hop along the way. Recognizing which protocol operates at which layer is one of the most practical skills in networking — it\'s the fastest way to know where to start troubleshooting.',
    ], { callout: { label: 'Recap', text: 'App: HTTP/DNS/SMTP · Transport: TCP/UDP · Network: IP/ICMP · Data Link/Physical: Ethernet/Wi-Fi' } }),
  ],
  quiz('osi-l4-quiz', 'Common Protocols Mapped to Layers — Knowledge Check', [
    q('q1', 'What does DNS do?', ['Encrypts web traffic', 'Translates domain names into IP addresses', 'Transfers files between systems', 'Assigns MAC addresses'], 'Translates domain names into IP addresses', 'DNS resolves human-readable domain names into the IP addresses computers use to route traffic.'),
    q('q2', 'Which protocol is best suited for a live video call, and why?', ['TCP, because it guarantees delivery', 'UDP, because low latency matters more than retransmitting lost data', 'ICMP, because it is designed for real-time media', 'FTP, because it transfers data quickly'], 'UDP, because low latency matters more than retransmitting lost data', 'UDP\'s lack of retransmission overhead makes it better suited to real-time media than TCP.'),
    q('q3', 'What does TCP perform before sending any application data, to establish a reliable connection?', ['A four-way handshake', 'A three-way handshake', 'DNS resolution', 'MAC address learning'], 'A three-way handshake', 'TCP uses a three-way handshake (SYN, SYN-ACK, ACK) to establish a connection before sending data.'),
    q('q4', 'Which protocol is the basis for tools like ping and traceroute?', ['HTTP', 'ICMP', 'FTP', 'DNS'], 'ICMP', 'ICMP carries the diagnostic messages that ping and traceroute rely on.'),
    q('q5', 'Ethernet primarily operates at which layer(s)?', ['Application only', 'Transport only', 'Data Link and Physical', 'Network only'], 'Data Link and Physical', 'Ethernet defines both the frame format (Data Link) and the electrical signaling standards (Physical).'),
  ]),
);

const course2: Course = {
  _id: '2',
  slug: 'osi-and-tcp-ip-models',
  title: 'OSI & TCP/IP Models',
  subtitle: 'The layered thinking behind every protocol you\'ll ever troubleshoot',
  description:
    'Understand the OSI seven-layer model and the four-layer TCP/IP model that actually runs the internet, how encapsulation moves data through them, and which real-world protocols live at each layer.',
  category: 'Networking',
  difficulty: 'beginner',
  priceCents: 0,
  coverImageUrl: COVER.models,
  iconTint: 'sage',
  curriculum: [{ id: 's1', title: 'Layered Networking Models', lessons: [l2_1, l2_2, l2_3, l2_4] } as unknown as Section],
  averageRating: 4.8,
  reviewCount: 388,
  enrollmentCount: 6120,
  instructor: { fullName: 'Amara Chukwu' },
};

/* ───────────────────────── Course 3 — Switching & VLANs ───────────────────────── */

const l3_1 = lesson(
  'sw-l1',
  'How Switches Work',
  [
    page('p1', 'Frame Forwarding Basics', [
      'A switch\'s core job is deciding, for every incoming frame, exactly which port to send it out of. It does this by examining the frame\'s destination MAC address and comparing it against a table the switch builds automatically — no manual configuration required for basic forwarding.',
      'This is a dramatic improvement over a hub\'s "repeat to everyone" approach: traffic between two devices on a switch stays contained to just the two relevant ports, instead of being broadcast to every device on the segment.',
    ]),
    page('p2', 'Learning MAC Addresses', [
      'A switch builds its MAC address table dynamically by watching the source MAC address of every frame that arrives on each port. The very first time it sees a frame from a given device, it records "this MAC address lives on this port" — and from then on, it knows exactly where to send return traffic.',
      'This learning process is continuous and automatic; if a device moves to a different port (or a laptop is unplugged and reconnected elsewhere), the switch simply relearns the new port the next time that device transmits.',
    ], { diagram: 'switch-mac-table', diagramCaption: 'The switch learns each device\'s MAC address from incoming frames.' }),
    page('p3', 'Flooding, Forwarding, and Filtering', [
      'If a switch receives a frame destined for a MAC address it hasn\'t learned yet, it floods the frame out every port except the one it arrived on — essentially falling back to hub-like behavior just for that one frame, until it learns where that address actually lives from a reply.',
      'Once the destination is known, the switch forwards intelligently to just that port. And if the destination MAC happens to be on the same port the frame arrived on, the switch simply filters — drops — the frame, since there\'s no need to send it back out the way it came.',
    ]),
    page('p4', 'Full vs. Half Duplex', [
      'Full-duplex links can send and receive simultaneously, like a two-lane road — this is standard on virtually all modern switch-to-device connections and eliminates collisions entirely on that link. Half-duplex, common on old hub-based networks, could only send or receive at any one moment, like a single-lane bridge with traffic lights at both ends, which is what made collisions possible in the first place.',
      'A duplex mismatch — where one end of a link is set to full and the other to half — is a classic real-world troubleshooting scenario that causes slow, error-prone connections without ever fully failing, which is exactly why it\'s so easy to overlook.',
    ]),
    page('p5', 'Recap', [
      'Switches learn, forward, flood, and filter — all automatically, based purely on MAC addresses observed in traffic. This dynamic, self-learning behavior is what makes switched networks both fast and largely maintenance-free at the basic connectivity level.',
    ], { callout: { label: 'Recap', text: 'Switches learn source MACs, forward known destinations directly, flood unknown ones, and filter same-port traffic.' } }),
  ],
  quiz('sw-l1-quiz', 'How Switches Work — Knowledge Check', [
    q('q1', 'What address does a switch use to decide where to forward a frame?', ['Source IP address', 'Destination MAC address', 'Destination port number', 'VLAN ID only'], 'Destination MAC address', 'Switches forward frames based on the destination MAC address.'),
    q('q2', 'How does a switch learn which MAC addresses live on which ports?', ['An administrator manually enters every address', 'It examines the source MAC address of incoming frames', 'It queries a DNS server', 'It broadcasts a request to every device'], 'It examines the source MAC address of incoming frames', 'Switches build their MAC address table automatically by observing the source address of each incoming frame.'),
    q('q3', 'What does a switch do with a frame whose destination MAC address it hasn\'t learned yet?', ['Drops the frame immediately', 'Floods it out every port except the one it arrived on', 'Sends it only back out the source port', 'Converts it to a broadcast IP packet'], 'Floods it out every port except the one it arrived on', 'Unknown destinations are flooded to all ports (except the source) until the switch learns where the address lives.'),
    q('q4', 'What does full-duplex mean for a switch port?', ['It can only receive data', 'It can send and receive simultaneously', 'It doubles the port\'s MAC address table size', 'It disables the port\'s collision detection permanently by removing the cable'], 'It can send and receive simultaneously', 'Full-duplex links can transmit and receive at the same time, eliminating collisions on that link.'),
    q('q5', 'What is a "duplex mismatch"?', ['A cable of the wrong category', 'Two ends of a link set to different duplex modes, causing slow and error-prone performance', 'A switch with too many MAC addresses learned', 'Two devices with the same MAC address'], 'Two ends of a link set to different duplex modes, causing slow and error-prone performance', 'A duplex mismatch occurs when one end is full-duplex and the other half-duplex, degrading performance without fully failing.'),
  ]),
);

const l3_2 = lesson(
  'sw-l2',
  'Collision & Broadcast Domains',
  [
    page('p1', 'What Is a Collision Domain?', [
      'A collision domain is the set of devices where two frames sent at the same time could collide and corrupt each other. On old hub-based (half-duplex, shared-medium) networks, every device connected to the same hub was in one collision domain — the more devices, the more likely two would transmit at once.',
      'Every full-duplex switch port is its own separate collision domain, which is the main reason switches replaced hubs so completely: collisions on a modern switched network are, for practical purposes, a non-issue.',
    ]),
    page('p2', 'What Is a Broadcast Domain?', [
      'A broadcast domain is the set of devices that receive a given broadcast frame — one addressed to "everyone" rather than a specific MAC address. Unlike collisions, switches do not contain broadcasts: a broadcast frame arriving on a switch is flooded out every port, just like an unknown-destination frame, and switches connected together simply pass broadcasts along.',
      'This means an entire switched LAN, however large, is normally one single broadcast domain — until you introduce a router, or a VLAN, which is exactly what the next lesson covers.',
    ], { diagram: 'collision-broadcast-domain', diagramCaption: 'Switches isolate collision domains per port, but broadcasts still reach everyone.' }),
    page('p3', 'How Switches and Routers Affect Each Domain', [
      'To summarize the two concepts side by side: switches break up collision domains (each port is isolated) but do not break up broadcast domains (broadcasts pass through freely). Routers do the opposite — they don\'t forward broadcasts between networks at all, so a router boundary is also a broadcast domain boundary.',
      'This distinction is one of the most frequently tested ideas in entry-level networking certifications, precisely because it\'s counter-intuitive the first time you encounter it.',
    ]),
    page('p4', 'Why This Matters for Performance', [
      'A very large broadcast domain means every device has to process every broadcast frame sent by anyone else on the LAN — ARP requests, DHCP discovery messages, and other control-plane chatter — even though the vast majority of that traffic is irrelevant to any individual device. At enough scale, this "broadcast noise" measurably degrades performance, which is one of the practical motivations for VLANs: dividing one large broadcast domain into several smaller ones.',
    ]),
    page('p5', 'Recap', [
      'Collision domains are about who might collide when transmitting at the same instant; broadcast domains are about who receives broadcast traffic. Switches shrink collision domains to almost nothing but leave broadcast domains untouched — setting up exactly the problem VLANs are designed to solve.',
    ], { callout: { label: 'Recap', text: 'Switches isolate collision domains per port. Only routers (or VLANs) isolate broadcast domains.' } }),
  ],
  quiz('sw-l2-quiz', 'Collision & Broadcast Domains — Knowledge Check', [
    q('q1', 'What is a collision domain?', ['The set of devices that receive broadcast traffic', 'The set of devices where two simultaneous transmissions could collide', 'A group of VLANs on one switch', 'A physical cable type'], 'The set of devices where two simultaneous transmissions could collide', 'A collision domain is the group of devices that could interfere with each other by transmitting at the same time.'),
    q('q2', 'On a fully switched, full-duplex network, how many devices are typically in each collision domain?', ['All devices on the LAN', 'One — each switch port is its own collision domain', 'Exactly two', 'It depends on the number of VLANs'], 'One — each switch port is its own collision domain', 'Each full-duplex switch port forms its own isolated collision domain.'),
    q('q3', 'Do switches break up broadcast domains by default?', ['Yes, every switch port is a separate broadcast domain', 'No, broadcasts are flooded through switches to the entire LAN', 'Only if Spanning Tree is enabled', 'Only on wireless networks'], 'No, broadcasts are flooded through switches to the entire LAN', 'Switches forward broadcast frames out every port, so they do not isolate broadcast domains on their own.'),
    q('q4', 'What device is required to break up a broadcast domain?', ['A hub', 'A switch', 'A router (or VLANs, which act similarly)', 'A longer cable'], 'A router (or VLANs, which act similarly)', 'Routers (and VLANs) create separate broadcast domain boundaries; plain switches do not.'),
    q('q5', 'Why can a very large broadcast domain hurt performance?', ['It increases collision risk on every port', 'Every device must process broadcast traffic from every other device, even if irrelevant to it', 'It disables full-duplex mode', 'It prevents devices from getting IP addresses'], 'Every device must process broadcast traffic from every other device, even if irrelevant to it', 'A large broadcast domain generates broadcast "noise" that every connected device must process, degrading performance at scale.'),
  ]),
);

const l3_3 = lesson(
  'sw-l3',
  'VLANs & Trunking',
  [
    page('p1', 'Why Segment a Network', [
      'A Virtual LAN (VLAN) lets you divide a single physical switch (or group of switches) into multiple logically separate networks, each with its own broadcast domain, even though the devices might be plugged into the very same physical switch. This is enormously useful: you can put Sales, Engineering, and Guest Wi-Fi on completely isolated logical networks without running separate physical cabling and switches for each.',
      'Beyond the performance benefit of smaller broadcast domains, VLANs are a fundamental security tool — devices on separate VLANs simply cannot exchange traffic directly, no matter how the physical cabling is laid out, unless a router or Layer-3 switch is explicitly configured to allow it.',
    ], { diagram: 'vlan-segmentation', diagramCaption: 'One switch, two logically isolated VLANs.' }),
    page('p2', 'VLAN IDs and Access Ports', [
      'Every VLAN is identified by a numeric VLAN ID, typically from 1 to 4094. A switch port configured as an access port is assigned to exactly one VLAN, and any device plugged into that port becomes a member of that VLAN — completely unaware that VLANs even exist, since the tagging happens entirely inside the switching infrastructure.',
      'VLAN 1 is the default VLAN on most switches out of the box; in real deployments, best practice is to avoid leaving production devices on VLAN 1 and instead assign purposeful VLAN IDs (like 10 for Sales, 20 for Engineering) for clarity and easier troubleshooting.',
    ]),
    page('p3', 'Trunk Ports and 802.1Q Tagging', [
      'When VLAN traffic needs to travel between two switches, a single cable would normally only be able to carry one VLAN\'s worth of untagged traffic. A trunk port solves this by carrying traffic for multiple VLANs over one physical link, using the 802.1Q standard to insert a small VLAN tag into each frame\'s header as it crosses the trunk.',
      'The receiving switch reads that tag to know which VLAN the frame belongs to, then strips the tag again before delivering the frame to an access port — end devices never see or understand VLAN tags directly.',
    ], { diagram: 'trunk-link', diagramCaption: 'A trunk link tags frames so one cable can carry many VLANs.' }),
    page('p4', 'Inter-VLAN Routing', [
      'Because devices on different VLANs are, by design, on different logical networks, something has to route between them if they need to communicate — just like routing between any two separate networks. This is called inter-VLAN routing, and it\'s typically handled either by a traditional router with a trunk connection back to the switch, or more commonly today, by a Layer-3 switch that combines switching and routing capability in one device.',
      'You\'ll cover routing in depth in the next course, but it\'s worth knowing now that VLANs alone only isolate — a router (in some form) is what selectively reconnects them.',
    ]),
    page('p5', 'Recap', [
      'VLANs let one physical switch behave like several logically separate networks, improving both performance and security. Access ports assign a single device to a single VLAN; trunk ports, using 802.1Q tagging, carry many VLANs across one link between switches.',
    ], { callout: { label: 'Recap', text: 'Access port = one device, one VLAN. Trunk port = many VLANs, tagged with 802.1Q, across one switch-to-switch link.' } }),
  ],
  quiz('sw-l3-quiz', 'VLANs & Trunking — Knowledge Check', [
    q('q1', 'What is the main purpose of a VLAN?', ['To increase cable length limits', 'To divide a physical switch into multiple logically separate networks', 'To replace the need for IP addresses', 'To speed up fiber optic cabling'], 'To divide a physical switch into multiple logically separate networks', 'VLANs logically segment a switch into separate broadcast domains without needing separate physical hardware.'),
    q('q2', 'What is a switch port assigned to a single VLAN called?', ['A trunk port', 'An access port', 'A routing port', 'A mirrored port'], 'An access port', 'An access port belongs to exactly one VLAN and connects end devices.'),
    q('q3', 'What standard is used to tag frames for multiple VLANs across a trunk link?', ['802.1Q', '802.11', 'OSPF', 'ICMP'], '802.1Q', '802.1Q is the IEEE standard for VLAN tagging on trunk links.'),
    q('q4', 'Can two devices on different VLANs communicate directly without any additional device?', ['Yes, always, since they share the same switch', 'No — something must route between them, such as a router or Layer-3 switch', 'Only if both use the same MAC address', 'Only on wireless networks'], 'No — something must route between them, such as a router or Layer-3 switch', 'Devices on separate VLANs are isolated by design and require routing to communicate.'),
    q('q5', 'What is inter-VLAN routing?', ['Assigning multiple VLAN IDs to one access port', 'The process of routing traffic between different VLANs', 'A method for disabling broadcast traffic entirely', 'A type of trunk cable'], 'The process of routing traffic between different VLANs', 'Inter-VLAN routing allows traffic to move between otherwise isolated VLANs, typically via a router or Layer-3 switch.'),
  ]),
);

const l3_4 = lesson(
  'sw-l4',
  'Spanning Tree & Redundancy',
  [
    page('p1', 'Why Redundant Links Cause Loops', [
      'Adding a second, backup cable between two switches sounds like an obvious way to improve reliability — if one link fails, the other takes over. But without any additional protection, that redundant link creates a physical loop, and because switches flood unknown-destination and broadcast frames out every port, a loop can cause the exact same frame to circulate endlessly, multiplying with every pass. This is called a broadcast storm, and it can bring an entire switched network to a halt within seconds.',
    ]),
    page('p2', 'How STP Elects a Root Bridge', [
      'The Spanning Tree Protocol (STP) solves this by having switches communicate and agree on a loop-free logical topology, even when the physical topology has loops built in. The process starts with an election: every switch broadcasts its Bridge ID, and the switch with the lowest Bridge ID becomes the root bridge — the reference point the rest of the topology is calculated from.',
      'Every other switch then calculates the shortest path back to the root bridge and designates the port on that path as its active, forwarding link toward the root.',
    ], { diagram: 'spanning-tree', diagramCaption: 'STP blocks one redundant link to prevent a loop, keeping it ready as a backup.' }),
    page('p3', 'Port States', [
      'STP moves each port through a sequence of states rather than jumping straight to forwarding, to avoid loops forming during the transition itself. A port starts in Blocking (not forwarding user data, but listening for STP messages), moves to Listening and then Learning (building its MAC table without forwarding yet), and finally reaches Forwarding, where it actively carries traffic.',
      'A port that STP has determined is redundant stays in the Blocking state indefinitely — not disabled, just held in reserve — until a topology change (like the primary link failing) causes STP to recalculate and bring it into service.',
    ]),
    page('p4', 'Modern Improvements: RSTP', [
      'Classic STP\'s convergence — the time it takes to recalculate and restore connectivity after a failure — can take up to 30-50 seconds, which is a long outage for a modern network. Rapid Spanning Tree Protocol (RSTP, IEEE 802.1w) redesigned the state machine and added new mechanisms to cut convergence down to just a few seconds in most cases, and it has effectively replaced classic STP in current deployments.',
      'The underlying goal — a loop-free logical topology that still keeps redundant physical links ready as backups — is identical between STP and RSTP; RSTP is simply a much faster implementation of the same idea.',
    ]),
    page('p5', 'Recap', [
      'Spanning Tree Protocol lets network designers safely add redundant links for reliability without risking the broadcast storms that would otherwise result from physical loops, by electing a root bridge and selectively blocking redundant paths until they\'re actually needed.',
    ], { callout: { label: 'Recap', text: 'STP elects a root bridge, calculates a loop-free path to it, and blocks redundant links — ready to activate if the primary fails.' } }),
  ],
  quiz('sw-l4-quiz', 'Spanning Tree & Redundancy — Knowledge Check', [
    q('q1', 'What problem does a physical loop between switches cause without any protection?', ['Slower cable speeds only', 'A broadcast storm, as frames circulate endlessly', 'Automatic VLAN creation', 'Permanent MAC address conflicts'], 'A broadcast storm, as frames circulate endlessly', 'Without loop prevention, flooded frames can circulate a physical loop indefinitely, overwhelming the network.'),
    q('q2', 'What does Spanning Tree Protocol (STP) do?', ['Physically disconnects redundant cables', 'Calculates a loop-free logical topology while keeping redundant links as backup', 'Assigns IP addresses to switches', 'Encrypts traffic between switches'], 'Calculates a loop-free logical topology while keeping redundant links as backup', 'STP creates a loop-free logical path while preserving redundant physical links for failover.'),
    q('q3', 'How is the root bridge chosen in STP?', ['Randomly by each switch', 'The switch with the lowest Bridge ID', 'The switch with the most ports', 'The first switch powered on'], 'The switch with the lowest Bridge ID', 'STP elects the switch with the lowest Bridge ID as the root bridge.'),
    q('q4', 'What state does a redundant port remain in until it is needed?', ['Forwarding', 'Blocking', 'Disabled permanently', 'Trunking'], 'Blocking', 'A redundant port is held in the Blocking state, ready to activate if the primary path fails.'),
    q('q5', 'What is the main advantage of RSTP over classic STP?', ['It eliminates the need for a root bridge', 'It converges (recovers from a topology change) much faster', 'It removes the need for redundant links entirely', 'It only works on wireless networks'], 'It converges (recovers from a topology change) much faster', 'RSTP dramatically reduces convergence time compared to classic STP, from tens of seconds to just a few.'),
  ]),
);

const course3: Course = {
  _id: '3',
  slug: 'switching-and-vlans',
  title: 'Switching & VLANs',
  subtitle: 'How switches forward traffic — and how to segment it on purpose',
  description:
    'Go inside the switch: MAC learning, collision and broadcast domains, VLAN segmentation, 802.1Q trunking, and Spanning Tree Protocol\'s loop prevention. The core skill set for anyone managing a real switched LAN.',
  category: 'Networking',
  difficulty: 'intermediate',
  priceCents: 0,
  coverImageUrl: COVER.switching,
  iconTint: 'amber',
  curriculum: [{ id: 's1', title: 'Switching Fundamentals', lessons: [l3_1, l3_2, l3_3, l3_4] } as unknown as Section],
  averageRating: 4.9,
  reviewCount: 276,
  enrollmentCount: 4310,
  instructor: { fullName: 'Daniel Okafor' },
};

/* ───────────────────────── Course 4 — Routing Fundamentals ───────────────────────── */

const l4_1 = lesson(
  'rt-l1',
  'IP Addressing & Subnetting Basics',
  [
    page('p1', 'IPv4 Address Anatomy', [
      'An IPv4 address is a 32-bit number, almost always written as four decimal numbers separated by dots (dotted-decimal notation) — for example, 192.168.1.10 — with each of the four numbers, or octets, representing 8 bits and ranging from 0 to 255.',
      'Every IPv4 address is split conceptually into a network portion and a host portion. The network portion identifies which network the address belongs to; the host portion identifies a specific device on that network. Where that split happens is determined by the subnet mask, covered on the next page.',
    ], { diagram: 'ip-address-anatomy', diagramCaption: 'Four octets, each 8 bits, forming a 32-bit IPv4 address.' }),
    page('p2', 'Private Address Ranges', [
      'Certain address ranges are reserved for private, internal use and are never routed on the public internet: 10.0.0.0/8, 172.16.0.0/12, and 192.168.0.0/16. Almost every home and office network uses addresses from one of these ranges internally, which is exactly why NAT (covered later in this course) is needed to let those private devices reach the public internet.',
      'Outside of these reserved private ranges, virtually every other IPv4 address is potentially publicly routable, assigned by regional internet registries to ISPs and organizations.',
    ]),
    page('p3', 'Subnet Masks and CIDR Notation', [
      'A subnet mask indicates, bit by bit, which portion of an IP address is the network part and which is the host part. A mask like 255.255.255.0 means the first 24 bits are network bits and the remaining 8 are host bits. CIDR (Classless Inter-Domain Routing) notation expresses that same information more compactly as a slash and a number — 192.168.1.10/24 — meaning "24 network bits."',
      'CIDR notation has almost entirely replaced writing out the full subnet mask in modern practice because it\'s faster to read, write, and communicate verbally.',
    ], { diagram: 'subnet-mask', diagramCaption: 'A /24 mask splits the address into 24 network bits and 8 host bits.' }),
    page('p4', 'Why We Subnet', [
      'Subnetting is the practice of dividing one larger network into multiple smaller networks. It exists for three main reasons: to reduce the size of broadcast domains, to allow addresses to be allocated efficiently rather than wasting a huge block on a small group of devices, and to apply security or routing policy differently to different groups of devices.',
      'A department of 20 people, for example, doesn\'t need a subnet sized for 65,000 hosts — a smaller subnet keeps addressing tidy and broadcast traffic contained.',
    ]),
    page('p5', 'A Quick Worked Example', [
      'Take 192.168.1.0/24. This gives 256 total addresses (192.168.1.0 through 192.168.1.255). Two of those are reserved — .0 is the network address (identifies the subnet itself) and .255 is the broadcast address (reaches every host on that subnet) — leaving 254 addresses actually usable for host devices, from .1 to .254.',
    ], { callout: { label: 'Recap', text: 'A /24 network gives 256 addresses, 254 of them usable — the first (.0) and last (.255) are reserved.' } }),
  ],
  quiz('rt-l1-quiz', 'IP Addressing & Subnetting Basics — Knowledge Check', [
    q('q1', 'How many bits make up an IPv4 address?', ['16', '24', '32', '64'], '32', 'An IPv4 address is a 32-bit number, typically written as four 8-bit octets.'),
    q('q2', 'Which of the following is a reserved private IPv4 address range?', ['8.8.8.0/24', '192.168.0.0/16', '203.0.113.0/24', '1.1.1.0/24'], '192.168.0.0/16', '192.168.0.0/16 is one of the ranges reserved for private, non-internet-routable use.'),
    q('q3', 'What does a /24 in CIDR notation mean?', ['24 usable host addresses', 'The first 24 bits of the address are the network portion', '24 subnets are available', 'The address uses 24-bit encryption'], 'The first 24 bits of the address are the network portion', 'CIDR notation states how many bits, from the left, form the network portion of the address.'),
    q('q4', 'Why do network engineers subnet a larger network into smaller ones?', ['To make IP addresses longer', 'To reduce broadcast domain size and allocate addresses efficiently', 'To disable routing between networks entirely', 'Because IPv4 requires it by law'], 'To reduce broadcast domain size and allocate addresses efficiently', 'Subnetting shrinks broadcast domains and allows more efficient, purposeful address allocation.'),
    q('q5', 'In the network 192.168.1.0/24, how many addresses are usable by hosts?', ['256', '255', '254', '128'], '254', 'A /24 network has 256 total addresses, minus the network address and broadcast address, leaving 254 usable.'),
  ]),
);

const l4_2 = lesson(
  'rt-l2',
  'How Routers Work',
  [
    page('p1', 'What Routers Do', [
      'A router\'s job is to forward packets between different networks, choosing the best available path based on the destination IP address. Unlike a switch, which mostly operates with automatic, self-learned forwarding, a router relies on a routing table that it either builds through direct knowledge of its own connections, learns from other routers, or has manually configured by an administrator.',
      'Every time a router receives a packet, it performs the same basic decision: look at the destination IP address, compare it against the routing table, and forward the packet out the interface associated with the best matching route.',
    ]),
    page('p2', 'Reading a Routing Table', [
      'A routing table entry generally includes a destination network, a next hop (the IP address of the next router to send the packet to, if any), the outgoing interface, and a metric (a number representing the "cost" or preference of that route, used to pick between multiple possible paths).',
      'When more than one route could match a destination, routers use the longest prefix match rule — the most specific matching route (the one with the largest CIDR number, like /32 over /24) wins, even if a less specific route also technically matches.',
    ], { diagram: 'router-table', diagramCaption: 'A router chooses the most specific matching route for each packet.' }),
    page('p3', 'Directly Connected vs. Learned Routes', [
      'A directly connected route is a network the router has an interface physically attached to — it knows about this automatically the moment the interface comes up with an IP address configured, no extra configuration needed. A learned (or configured) route is a network the router only knows how to reach through another router, either because an administrator typed it in manually (a static route) or because a routing protocol told it (a dynamic route) — both covered in the next lesson.',
    ]),
    page('p4', 'The Default Gateway Concept', [
      'From an end device\'s point of view, the default gateway is simply the router it sends traffic to whenever the destination isn\'t on its own local network. Your laptop doesn\'t need to know how to reach every network on the internet — it just needs to know its default gateway\'s address, and lets that router (and the routers beyond it) figure out the rest of the path.',
      'A device with no default gateway configured can typically talk to other devices on its own local subnet just fine, but has no way to reach anything beyond it — a very common real-world misconfiguration to check for.',
    ]),
    page('p5', 'Recap', [
      'Routers forward based on destination IP address, using a routing table built from directly connected interfaces, static entries, and dynamic protocols. The default gateway is simply the concept of "send it here if you don\'t know where else to send it," applied from the perspective of an end device.',
    ], { callout: { label: 'Recap', text: 'Routers pick the most specific matching route for the destination IP; end devices rely on a default gateway for anything off-subnet.' } }),
  ],
  quiz('rt-l2-quiz', 'How Routers Work — Knowledge Check', [
    q('q1', 'What address does a router primarily use to make forwarding decisions?', ['Source MAC address', 'Destination IP address', 'Destination MAC address', 'VLAN ID'], 'Destination IP address', 'Routers forward packets based on the destination IP address, using the routing table.'),
    q('q2', 'What is a "next hop" in a routing table entry?', ['The final destination device', 'The IP address of the next router the packet should be sent to', 'The number of hops already taken', 'A backup interface'], 'The IP address of the next router the packet should be sent to', 'The next hop indicates where the packet should go next on its way to the destination.'),
    q('q3', 'When multiple routes could match a destination, which one does a router prefer?', ['The oldest route in the table', 'The route with the lowest metric only, regardless of specificity', 'The most specific matching route (longest prefix match)', 'A route chosen at random'], 'The most specific matching route (longest prefix match)', 'Routers use longest prefix match — the most specific matching route wins.'),
    q('q4', 'What is a directly connected route?', ['A route learned from another router', 'A network the router has a physical interface attached to', 'A manually typed static route only', 'Any route to the internet'], 'A network the router has a physical interface attached to', 'Directly connected routes are automatically known because the router has an interface on that network.'),
    q('q5', 'What is a default gateway, from an end device\'s perspective?', ['The device\'s own IP address', 'The router to send traffic to when the destination isn\'t on the local network', 'A backup DNS server', 'The switch the device is plugged into'], 'The router to send traffic to when the destination isn\'t on the local network', 'The default gateway is where an end device sends traffic destined for networks beyond its own subnet.'),
  ]),
);

const l4_3 = lesson(
  'rt-l3',
  'Static vs. Dynamic Routing',
  [
    page('p1', 'Static Routing', [
      'A static route is a routing table entry an administrator manually types into the router\'s configuration. Static routing is predictable, uses no extra CPU or bandwidth for route calculation, and is easy to reason about — which makes it a great fit for small networks or specific fixed paths, like a single default route pointing to an ISP.',
      'The downside is that static routes don\'t adapt: if the path they describe goes down, the router has no way to automatically discover an alternative, and traffic simply fails until someone notices and manually fixes the configuration.',
    ], { diagram: 'static-vs-dynamic', diagramCaption: 'Static routing vs. dynamic routing, side by side.' }),
    page('p2', 'Dynamic Routing Protocols', [
      'A dynamic routing protocol lets routers automatically exchange information about the networks they know how to reach, building and updating routing tables without manual intervention. Common examples include RIP (Routing Information Protocol, an older and simpler protocol), OSPF (Open Shortest Path First, widely used in enterprise networks), and EIGRP (a Cisco-originated protocol also common in enterprise environments).',
      'Dynamic routing shines in larger or frequently-changing networks, since it can detect a failed link and automatically reroute traffic around it — often within seconds — without any human intervention.',
    ]),
    page('p3', 'Distance-Vector vs. Link-State', [
      'Dynamic routing protocols generally fall into two families. Distance-vector protocols, like RIP, work by each router telling its direct neighbors "here\'s what I can reach, and how far it is" — information that gradually propagates through the network, hop by hop, like a rumor spreading.',
      'Link-state protocols, like OSPF, instead have every router build a complete map of the entire network\'s topology by exchanging detailed link information, then independently calculate the best path using that full picture. Link-state protocols generally converge faster and scale better, at the cost of higher complexity and resource use.',
    ]),
    page('p4', 'Choosing an Approach', [
      'In practice, most real networks use a mix: static routes for simple, stable, or default paths, and a dynamic protocol for the parts of the network that genuinely need automatic failover and scale. A small branch office with a single internet connection might run entirely on static routes; a large enterprise campus with multiple redundant paths almost certainly needs a dynamic protocol to take advantage of that redundancy automatically.',
    ]),
    page('p5', 'Recap', [
      'Static routing is simple, predictable, and manual; dynamic routing is adaptive, automatic, and more complex. Neither is universally "better" — the right choice depends on the size, stability, and redundancy of the network you\'re working with.',
    ], { callout: { label: 'Recap', text: 'Static = manual, predictable, no auto-failover. Dynamic (RIP/OSPF/EIGRP) = automatic, adaptive, more overhead.' } }),
  ],
  quiz('rt-l3-quiz', 'Static vs. Dynamic Routing — Knowledge Check', [
    q('q1', 'What is a static route?', ['A route automatically discovered by a routing protocol', 'A route manually entered into a router\'s configuration by an administrator', 'A route that changes every few seconds', 'A route only used for wireless networks'], 'A route manually entered into a router\'s configuration by an administrator', 'Static routes are manually configured and do not change unless someone edits them.'),
    q('q2', 'What is the main drawback of static routing?', ['It uses too much CPU', 'It cannot automatically adapt if the configured path fails', 'It requires special hardware', 'It only works with IPv6'], 'It cannot automatically adapt if the configured path fails', 'Static routes stay fixed even if the path fails, requiring manual intervention to fix.'),
    q('q3', 'What do dynamic routing protocols allow routers to do?', ['Manually configure every route by hand', 'Automatically exchange routing information and adapt to network changes', 'Disable all broadcast traffic', 'Replace the need for IP addressing'], 'Automatically exchange routing information and adapt to network changes', 'Dynamic routing protocols let routers share and update route information automatically.'),
    q('q4', 'Which best describes a link-state routing protocol like OSPF?', ['Each router only knows what its direct neighbors tell it', 'Each router builds a full map of the network topology and calculates the best path itself', 'It requires no configuration at all', 'It only works within a single VLAN'], 'Each router builds a full map of the network topology and calculates the best path itself', 'Link-state protocols like OSPF give every router a complete topology map to calculate paths from.'),
    q('q5', 'Which is a Cisco-originated dynamic routing protocol commonly used in enterprise networks?', ['HTTP', 'EIGRP', 'DNS', 'VLAN'], 'EIGRP', 'EIGRP (Enhanced Interior Gateway Routing Protocol) originated at Cisco and is common in enterprise networks.'),
  ]),
);

const l4_4 = lesson(
  'rt-l4',
  'NAT & Default Gateways',
  [
    page('p1', 'Private vs. Public Addressing, Revisited', [
      'As covered earlier, the vast majority of devices on home and office networks use private IP addresses, which aren\'t routable on the public internet. Yet those devices clearly do reach the internet every day — the mechanism that makes this possible is Network Address Translation (NAT), typically running on the router at the edge of the network.',
    ]),
    page('p2', 'How NAT Works', [
      'When a device with a private address sends traffic out to the internet, the NAT-enabled router rewrites the packet\'s source address, swapping the private address for one of its own public addresses, and keeps a table tracking that translation. When the reply comes back addressed to the public address, the router looks up its NAT table, rewrites the destination back to the correct private address, and forwards it to the original device.',
      'From the internet\'s perspective, all traffic appears to come from the router\'s public address — the internal private addressing is completely invisible outside the local network.',
    ], { diagram: 'nat', diagramCaption: 'NAT swaps a private source address for a public one at the network edge.' }),
    page('p3', 'PAT (NAT Overload)', [
      'Most home and small-office routers actually use a specific variant called PAT (Port Address Translation), sometimes called "NAT overload," which allows many internal devices to share a single public IP address simultaneously. It does this by also rewriting the source port number for each connection, so the router can tell dozens or hundreds of simultaneous internal connections apart even though they all share the same public IP.',
      'PAT is why a home network with a dozen devices — laptops, phones, smart TVs — can all be online at once using just the single public IP address the ISP assigned.',
    ]),
    page('p4', 'Default Gateway, Revisited', [
      'Now that NAT has been introduced, the default gateway concept from the previous lesson makes even more sense: the default gateway isn\'t just "the way out of the local network" in the abstract — for most home and small-office setups, it\'s literally the same device performing NAT on the way out. That single router is both the routing decision-maker and the address-translation point in one box.',
    ]),
    page('p5', 'Recap', [
      'NAT (and its common variant PAT) is the mechanism that lets private, non-routable addresses reach the public internet by translating them at the network edge. It solved a genuine IPv4 address shortage problem, and it remains deeply embedded in how most networks — from homes to large enterprises — connect outward today.',
    ], { callout: { label: 'Recap', text: 'NAT translates private addresses to public ones at the edge; PAT lets many devices share one public IP by also tracking port numbers.' } }),
  ],
  quiz('rt-l4-quiz', 'NAT & Default Gateways — Knowledge Check', [
    q('q1', 'What problem does NAT solve?', ['It speeds up wireless connections', 'It lets devices with private, non-routable addresses reach the public internet', 'It replaces the need for a default gateway', 'It encrypts all outbound traffic'], 'It lets devices with private, non-routable addresses reach the public internet', 'NAT translates private addresses to a public one so internal devices can communicate on the internet.'),
    q('q2', 'What does a NAT-enabled router do to an outbound packet\'s source address?', ['Deletes it entirely', 'Rewrites it from a private address to a public address', 'Converts it into a MAC address', 'Encrypts it using a VPN'], 'Rewrites it from a private address to a public address', 'NAT rewrites the source IP address from private to public as traffic leaves the local network.'),
    q('q3', 'What is PAT, also known as NAT overload?', ['A faster version of static routing', 'A NAT variant that lets many devices share one public IP by tracking port numbers', 'A type of VLAN tagging', 'A wireless encryption standard'], 'A NAT variant that lets many devices share one public IP by tracking port numbers', 'PAT allows multiple internal devices to share a single public IP by also translating port numbers.'),
    q('q4', 'For most home networks, which device typically performs both routing and NAT?', ['The internet service provider\'s core router only', 'The home router / gateway device', 'Each individual laptop', 'The switch'], 'The home router / gateway device', 'The home router typically acts as both the default gateway and the NAT device.'),
    q('q5', 'What does NAT keep track of to correctly route return traffic back to the originating device?', ['A MAC address table', 'A NAT translation table mapping internal addresses/ports to external ones', 'A VLAN database', 'A DNS cache'], 'A NAT translation table mapping internal addresses/ports to external ones', 'NAT maintains a translation table so replies can be correctly mapped back to the originating internal device.'),
  ]),
);

const course4: Course = {
  _id: '4',
  slug: 'routing-fundamentals',
  title: 'Routing Fundamentals',
  subtitle: 'IP addressing, subnetting, and how routers find the way',
  description:
    'Learn how IP addressing and subnetting actually work, how routers build and use routing tables, the tradeoffs between static and dynamic routing, and how NAT lets private networks reach the public internet.',
  category: 'Networking',
  difficulty: 'intermediate',
  priceCents: 0,
  coverImageUrl: COVER.routing,
  iconTint: 'brand',
  curriculum: [{ id: 's1', title: 'Routing & Addressing', lessons: [l4_1, l4_2, l4_3, l4_4] } as unknown as Section],
  averageRating: 4.9,
  reviewCount: 301,
  enrollmentCount: 3980,
  instructor: { fullName: 'Chinedu Obi' },
};

/* ───────────────────────── Course 5 — Network Security Basics ───────────────────────── */

const l5_1 = lesson(
  'sec-l1',
  'The CIA Triad & Common Threats',
  [
    page('p1', 'Confidentiality, Integrity, Availability', [
      'Nearly every security decision in networking traces back to three goals, known together as the CIA triad. Confidentiality means only authorized people or systems can read the data — achieved through things like encryption and access control. Integrity means the data hasn\'t been altered, accidentally or maliciously, in transit or storage — achieved through checksums, hashing, and digital signatures.',
      'Availability means authorized users can actually access the system and data when they need to — achieved through redundancy, capacity planning, and defenses against denial-of-service attacks. Every security control you\'ll encounter exists to support one or more of these three goals.',
    ], { diagram: 'cia-triad', diagramCaption: 'Confidentiality, Integrity, and Availability — the three pillars of security.' }),
    page('p2', 'Common Threat Types', [
      'Malware is malicious software — viruses, worms, ransomware, spyware — designed to damage, steal from, or take control of a system. Phishing uses deceptive emails or messages, impersonating a trusted source, to trick people into revealing credentials or installing malware.',
      'A denial-of-service (DoS) attack floods a system or network with traffic or requests until it can no longer serve legitimate users — a distributed denial-of-service (DDoS) attack does the same thing using many compromised machines at once, making it much harder to block by simply filtering one source.',
    ]),
    page('p3', 'Social Engineering', [
      'Not every attack targets a technical weakness. Social engineering manipulates people directly — impersonating IT support to get someone to reveal a password, or tailgating into a secure building behind someone with legitimate access. It works because it exploits trust and normal human helpfulness rather than a flaw in software or hardware.',
      'Because social engineering bypasses technical defenses entirely, security awareness training for employees is just as important a control as any firewall or encryption standard.',
    ]),
    page('p4', 'Defense in Depth', [
      'No single security control is perfect, which is why real security strategy relies on defense in depth — layering multiple, different types of protections so that if one fails, others still stand between an attacker and the target. A typical layered approach might include a firewall at the perimeter, network segmentation internally, endpoint antivirus on individual devices, and user training — all working together rather than relying on any one of them alone.',
    ]),
    page('p5', 'Recap', [
      'The CIA triad frames what security is trying to protect; understanding common threat types and social engineering explains what it\'s protecting against; and defense in depth describes the overall strategy for doing it well. The rest of this course covers specific tools — firewalls, encryption, VPNs, and wireless security — that put these ideas into practice.',
    ], { callout: { label: 'Recap', text: 'CIA = Confidentiality, Integrity, Availability. Defense in depth layers multiple controls so no single failure is catastrophic.' } }),
  ],
  quiz('sec-l1-quiz', 'CIA Triad & Common Threats — Knowledge Check', [
    q('q1', 'What does the "C" in the CIA triad stand for?', ['Compliance', 'Confidentiality', 'Cryptography', 'Connectivity'], 'Confidentiality', 'Confidentiality means only authorized parties can access or read the data.'),
    q('q2', 'What security goal is achieved through checksums, hashing, and digital signatures?', ['Confidentiality', 'Availability', 'Integrity', 'Anonymity'], 'Integrity', 'Integrity ensures data has not been altered, and hashing/signatures are common tools to verify that.'),
    q('q3', 'What is a distributed denial-of-service (DDoS) attack?', ['An attack that steals passwords via email', 'An attack that floods a target using many compromised machines at once', 'A method of encrypting stolen data', 'A type of VLAN misconfiguration'], 'An attack that floods a target using many compromised machines at once', 'DDoS attacks use many distributed sources to overwhelm a target, making them harder to block.'),
    q('q4', 'What is social engineering?', ['A technical exploit against firewall software', 'Manipulating people directly to bypass security, such as impersonating IT support', 'A method of encrypting network traffic', 'A type of routing protocol'], 'Manipulating people directly to bypass security, such as impersonating IT support', 'Social engineering targets human trust and behavior rather than a technical flaw.'),
    q('q5', 'What is "defense in depth"?', ['Relying on one very strong firewall alone', 'Layering multiple different security controls so no single failure is catastrophic', 'Using only antivirus software', 'A type of encryption algorithm'], 'Layering multiple different security controls so no single failure is catastrophic', 'Defense in depth combines multiple layers of security so that one failure does not compromise the whole system.'),
  ]),
);

const l5_2 = lesson(
  'sec-l2',
  'Firewalls & ACLs',
  [
    page('p1', 'What a Firewall Does', [
      'A firewall inspects network traffic and decides, based on a configured set of rules, whether to allow or block it. Firewalls can run as dedicated hardware appliances at the edge of a network, as software on an individual host, or as a feature built into a router — but the fundamental job is the same: enforce a policy about what traffic is allowed to pass.',
    ]),
    page('p2', 'Access Control Lists', [
      'An Access Control List (ACL) is an ordered list of rules a firewall (or router) evaluates against each packet — matching on criteria like source address, destination address, protocol, and port number. The firewall checks the rules top to bottom and applies the first one that matches; if nothing matches, an implicit "deny all" at the end typically blocks the traffic by default.',
      'Because ACLs are evaluated in order, rule order genuinely matters: a broad "permit" rule placed above a more specific "deny" rule will let traffic through that the deny rule was intended to block, since the first match wins.',
    ], { diagram: 'firewall-acl', diagramCaption: 'A firewall evaluates ACL rules in order, permitting or denying traffic.' }),
    page('p3', 'Stateful vs. Stateless Filtering', [
      'A stateless firewall evaluates each packet in isolation, purely against the rule list, with no memory of previous packets. A stateful firewall, by contrast, tracks the state of active connections — once it sees an outbound connection get permitted, it automatically allows the corresponding return traffic without needing an explicit separate rule for it.',
      'Stateful inspection is standard in virtually all modern firewalls because it\'s both more secure (return traffic is only allowed if it matches a connection that was actually initiated) and far simpler to configure than writing separate rules for every direction of every conversation.',
    ]),
    page('p4', 'Where Firewalls Sit in the Network', [
      'A perimeter firewall sits at the boundary between an internal network and the internet, filtering traffic entering or leaving. Many organizations also deploy a DMZ (demilitarized zone) — a separate, more tightly controlled network segment for servers that need to be reachable from the internet, like a public web server — isolated from the fully internal, trusted network in case that public-facing server is ever compromised.',
      'Internal firewalls, placed between segments of the internal network itself, add another layer of defense in depth, limiting how far an attacker could move even after getting past the perimeter.',
    ]),
    page('p5', 'Recap', [
      'Firewalls enforce policy using ordered ACL rules, almost always with stateful tracking of connections in modern deployments, and are positioned strategically — at the perimeter, around a DMZ, and sometimes internally — as part of a broader defense-in-depth strategy.',
    ], { callout: { label: 'Recap', text: 'ACL rules are evaluated top to bottom, first match wins. Stateful firewalls track connections; a DMZ isolates public-facing servers.' } }),
  ],
  quiz('sec-l2-quiz', 'Firewalls & ACLs — Knowledge Check', [
    q('q1', 'What is the core function of a firewall?', ['To speed up network traffic', 'To inspect traffic and allow or block it based on configured rules', 'To assign IP addresses automatically', 'To physically connect two switches'], 'To inspect traffic and allow or block it based on configured rules', 'A firewall enforces a security policy by allowing or blocking traffic based on rules.'),
    q('q2', 'In an ACL, how are rules typically evaluated?', ['Randomly', 'All at once, with the strictest rule always winning', 'In order, top to bottom, with the first match applied', 'From bottom to top only'], 'In order, top to bottom, with the first match applied', 'ACLs are evaluated in order, and the first matching rule is the one applied.'),
    q('q3', 'What does a stateful firewall track that a stateless firewall does not?', ['The physical cable type', 'The state of active connections, to automatically permit related return traffic', 'The VLAN ID of every packet', 'The MAC address table'], 'The state of active connections, to automatically permit related return traffic', 'Stateful firewalls track connection state, simplifying rules for return traffic.'),
    q('q4', 'What is a DMZ used for?', ['Blocking all outbound traffic', 'Hosting public-facing servers in an isolated segment, separate from the trusted internal network', 'Encrypting wireless traffic', 'Assigning VLAN IDs automatically'], 'Hosting public-facing servers in an isolated segment, separate from the trusted internal network', 'A DMZ isolates internet-facing servers from the fully trusted internal network.'),
    q('q5', 'What typically happens to traffic that matches no rule in an ACL?', ['It is always permitted by default', 'It is blocked by an implicit deny-all at the end', 'It is sent back to the source for review', 'It is automatically logged and ignored'], 'It is blocked by an implicit deny-all at the end', 'Most ACLs end with an implicit deny that blocks any traffic not explicitly permitted.'),
  ]),
);

const l5_3 = lesson(
  'sec-l3',
  'VPNs & Encryption Basics',
  [
    page('p1', 'Why Encrypt Traffic', [
      'Any traffic that crosses a network you don\'t fully control — most obviously the public internet — can potentially be intercepted by someone in between. Encryption scrambles data so that even if it\'s intercepted, it\'s unreadable without the correct key, protecting confidentiality even over untrusted networks.',
    ]),
    page('p2', 'Symmetric vs. Asymmetric Encryption', [
      'Symmetric encryption uses the same single key to both encrypt and decrypt data — it\'s fast and efficient, but both parties need a way to securely share that key beforehand, which is a real challenge on its own. Asymmetric encryption uses a mathematically linked key pair: a public key (freely shared) encrypts data that only the matching private key (kept secret) can decrypt.',
      'In practice, most real systems use both together: asymmetric encryption to securely exchange a temporary symmetric key, then fast symmetric encryption for the actual bulk data — this hybrid approach is exactly how HTTPS/TLS works under the hood.',
    ]),
    page('p3', 'VPN Tunnels', [
      'A Virtual Private Network (VPN) creates an encrypted tunnel across an untrusted network — typically the internet — so that traffic inside the tunnel is protected from anyone observing the underlying public network. From the perspective of the two endpoints, it behaves much like a private, direct connection, even though it\'s physically traveling across shared, public infrastructure.',
      'Common VPN protocols include IPsec, often used for site-to-site connections, and SSL/TLS-based VPNs, commonly used for individual remote-access connections from a laptop or phone.',
    ], { diagram: 'vpn-tunnel', diagramCaption: 'A VPN wraps traffic in an encrypted tunnel across the public internet.' }),
    page('p4', 'Site-to-Site vs. Remote Access VPN', [
      'A site-to-site VPN permanently connects two networks — say, a branch office and headquarters — as if they were on the same internal network, with the VPN tunnel running between the two routers or firewalls rather than individual devices. A remote-access VPN instead connects a single device, like an employee\'s laptop working from home, into the corporate network on demand.',
      'The encryption principles are identical either way; the difference is simply the scope of what\'s being connected — whole networks together, or one device into a network.',
    ]),
    page('p5', 'Recap', [
      'Encryption protects confidentiality on untrusted networks; VPNs apply that encryption to create secure tunnels, either connecting whole sites together or letting individual remote users reach an internal network safely. This is one of the most directly practical security concepts you\'ll use, whether configuring a corporate remote-access solution or simply understanding why "the VPN" on your own laptop matters.',
    ], { callout: { label: 'Recap', text: 'Symmetric = one shared key, fast. Asymmetric = public/private key pair, used to exchange keys. VPNs use both to build encrypted tunnels.' } }),
  ],
  quiz('sec-l3-quiz', 'VPNs & Encryption Basics — Knowledge Check', [
    q('q1', 'What is the main purpose of encryption on network traffic?', ['To make data transfer faster', 'To make data unreadable to anyone without the correct key, protecting confidentiality', 'To compress data for storage', 'To assign IP addresses'], 'To make data unreadable to anyone without the correct key, protecting confidentiality', 'Encryption scrambles data so only someone with the correct key can read it, even if intercepted.'),
    q('q2', 'What is a key characteristic of symmetric encryption?', ['It uses two different keys, one public and one private', 'It uses a single shared key for both encryption and decryption', 'It never requires a key at all', 'It only works over wireless networks'], 'It uses a single shared key for both encryption and decryption', 'Symmetric encryption uses one key for both encrypting and decrypting data.'),
    q('q3', 'In asymmetric encryption, what can decrypt data encrypted with someone\'s public key?', ['Any public key', 'Only the matching private key', 'A shared symmetric key', 'No key is needed'], 'Only the matching private key', 'Asymmetric encryption pairs a public key with a matching private key; only the private key can decrypt what the public key encrypted.'),
    q('q4', 'What does a VPN create across an untrusted network like the internet?', ['A faster, unencrypted shortcut', 'An encrypted tunnel that protects the traffic inside it', 'A new public IP address for every device', 'A wireless-only connection'], 'An encrypted tunnel that protects the traffic inside it', 'A VPN establishes an encrypted tunnel so traffic is protected even over an untrusted public network.'),
    q('q5', 'What distinguishes a site-to-site VPN from a remote-access VPN?', ['Site-to-site connects two whole networks; remote-access connects a single device into a network', 'Remote-access VPNs do not use encryption', 'Site-to-site VPNs only work over Wi-Fi', 'There is no meaningful difference'], 'Site-to-site connects two whole networks; remote-access connects a single device into a network', 'The difference is scope: site-to-site links two networks, while remote-access links a single device into a network.'),
  ]),
);

const l5_4 = lesson(
  'sec-l4',
  'Wireless Security & Best Practices',
  [
    page('p1', 'Wireless Threats', [
      'Because Wi-Fi transmits over open radio waves, anyone within physical range can potentially receive the signal — there\'s no cable to physically tap. This makes wireless networks especially exposed to eavesdropping, and also to rogue access points, where an attacker sets up a fake network with a familiar-sounding name to trick devices into connecting and exposing their traffic.',
    ]),
    page('p2', 'WEP, WPA, WPA2, WPA3', [
      'Wireless security has gone through several generations. WEP (Wired Equivalent Privacy) was the original standard and is now considered badly broken — its encryption can be cracked in minutes with widely available tools, and it should never be used. WPA (Wi-Fi Protected Access) improved on WEP but has also since been superseded.',
      'WPA2 became the long-standing industry standard, using strong AES encryption, and remains acceptable today if properly configured with a strong passphrase. WPA3, the current generation, adds further protections — including better defense against offline password-guessing attacks — and should be preferred wherever supported hardware allows.',
    ], { diagram: 'wireless-security', diagramCaption: 'Wireless security standards, from weakest to strongest.' }),
    page('p3', 'Strong Authentication and Segmentation', [
      'Beyond choosing a strong encryption standard, a genuinely strong, unique passphrase for the wireless network matters enormously — a weak or reused password undermines even WPA3\'s protections. Enterprise networks often go further, using 802.1X authentication, which requires each user to authenticate with individual credentials against a central server, rather than everyone sharing one static passphrase.',
      'Segmenting guest Wi-Fi onto its own VLAN, isolated from the internal corporate network, is another essential practice — visitors get internet access without any path into sensitive internal systems.',
    ]),
    page('p4', 'General Security Best Practices', [
      'Zooming out from wireless specifically, a handful of practices show up repeatedly across every area of network security: keep software and firmware patched, since many attacks exploit known vulnerabilities that already have fixes available; follow the principle of least privilege, giving users and systems only the access they actually need; and maintain logging and monitoring, since you can\'t respond to what you can\'t see.',
    ], { bullets: ['Keep firmware and software patched', 'Apply least privilege for access', 'Segment networks (VLANs, guest Wi-Fi)', 'Use strong, unique passphrases and WPA2/WPA3', 'Log and monitor for unusual activity'] }),
    page('p5', 'Course Wrap-Up', [
      'This lesson closes out the security fundamentals, and with it, the full five-course networking track — from what a network even is, through the layered models, switching and VLANs, routing and IP addressing, and finally the security principles that protect all of it. The concepts build on each other deliberately: routing depends on addressing, VLANs depend on switching fundamentals, and security depends on understanding the whole path traffic takes across every layer.',
    ], { callout: { label: 'Recap', text: 'Prefer WPA2/WPA3 with strong passphrases, segment guest traffic, patch systems, apply least privilege, and monitor actively.' } }),
  ],
  quiz('sec-l4-quiz', 'Wireless Security & Best Practices — Knowledge Check', [
    q('q1', 'Why are wireless networks especially exposed to eavesdropping compared to wired networks?', ['Wireless signals are always encrypted by default', 'Radio waves can be received by anyone within physical range, with no cable to tap', 'Wireless networks cannot use passwords', 'Wireless routers have no firewall capability'], 'Radio waves can be received by anyone within physical range, with no cable to tap', 'Because Wi-Fi is broadcast over open radio waves, anyone in range can potentially intercept it.'),
    q('q2', 'Which wireless security standard is considered badly broken and should never be used?', ['WPA3', 'WPA2', 'WEP', '802.1X'], 'WEP', 'WEP\'s encryption can be cracked quickly with widely available tools and should never be used.'),
    q('q3', 'What does WPA3 improve on compared to WPA2?', ['It removes the need for a passphrase entirely', 'It adds better defenses against offline password-guessing attacks', 'It disables encryption for faster speeds', 'It only works with wired connections'], 'It adds better defenses against offline password-guessing attacks', 'WPA3 strengthens protection against offline password-guessing compared to WPA2.'),
    q('q4', 'What is a rogue access point?', ['A legitimate access point with extra encryption', 'A fake access point set up by an attacker to trick devices into connecting', 'A backup access point used for redundancy', 'An access point that only supports WPA3'], 'A fake access point set up by an attacker to trick devices into connecting', 'A rogue access point impersonates a legitimate network to intercept traffic from unsuspecting devices.'),
    q('q5', 'Why is segmenting guest Wi-Fi onto its own VLAN a recommended best practice?', ['It makes the guest network faster than the main network', 'It gives visitors internet access without a path into internal systems', 'It eliminates the need for a password on guest Wi-Fi', 'It automatically encrypts all guest traffic with WPA3'], 'It gives visitors internet access without a path into internal systems', 'Segmenting guest traffic isolates visitors from sensitive internal systems while still providing internet access.'),
  ]),
);

const course5: Course = {
  _id: '5',
  slug: 'network-security-basics',
  title: 'Network Security Basics',
  subtitle: 'Protecting the network you just learned to build',
  description:
    'Cover the CIA triad and common threats, firewalls and ACLs, encryption and VPNs, and wireless security — the essential security layer for any network engineer, capping off the full networking fundamentals track.',
  category: 'Networking',
  difficulty: 'intermediate',
  priceCents: 0,
  coverImageUrl: COVER.security,
  iconTint: 'sage',
  curriculum: [{ id: 's1', title: 'Security Fundamentals', lessons: [l5_1, l5_2, l5_3, l5_4] } as unknown as Section],
  averageRating: 4.9,
  reviewCount: 244,
  enrollmentCount: 3510,
  instructor: { fullName: 'Priya Menon' },
};

export const networkingCourses: Course[] = [course1, course2, course3, course4, course5];

export function findCourseBySlug(slug: string): Course | undefined {
  return networkingCourses.find((c) => c.slug === slug);
}

export function allLessonsOf(course: Course): Lesson[] {
  return (course.curriculum as unknown as { lessons: Lesson[] }[]).flatMap((s) => s.lessons);
}
