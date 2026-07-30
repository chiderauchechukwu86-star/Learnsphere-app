import { DiagramId } from '@/lib/types';

const COLORS = {
  brand: '#4B3FE4',
  brandLight: '#EDEBFC',
  brandDark: '#3A2FC0',
  sage: '#2F9E6E',
  sageLight: '#DFF3E9',
  sageDark: '#237A55',
  amber: '#F2A93B',
  amberLight: '#FCEED2',
  amberDark: '#C9821F',
  ink: '#171821',
  line: '#E4E2DA',
  muted: '#767389',
  paper: '#FAF9F6',
};

function Box({
  x, y, w, h, label, sublabel, fill = COLORS.brandLight, stroke = COLORS.brand, textColor = COLORS.ink, rx = 10,
}: {
  x: number; y: number; w: number; h: number; label: string; sublabel?: string;
  fill?: string; stroke?: string; textColor?: string; rx?: number;
}) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={rx} fill={fill} stroke={stroke} strokeWidth={1.5} />
      <text x={x + w / 2} y={y + h / 2 + (sublabel ? -4 : 5)} textAnchor="middle" fontSize={13} fontWeight={600} fill={textColor}>
        {label}
      </text>
      {sublabel && (
        <text x={x + w / 2} y={y + h / 2 + 14} textAnchor="middle" fontSize={10.5} fill={COLORS.muted}>
          {sublabel}
        </text>
      )}
    </g>
  );
}

function Arrow({ x1, y1, x2, y2, color = COLORS.muted, dashed = false }: { x1: number; y1: number; x2: number; y2: number; color?: string; dashed?: boolean }) {
  return (
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={2} markerEnd="url(#arrowhead)" strokeDasharray={dashed ? '5 4' : undefined} />
  );
}

function Frame({ children, viewBox = '0 0 600 300' }: { children: React.ReactNode; viewBox?: string }) {
  return (
    <svg viewBox={viewBox} xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
      <defs>
        <marker id="arrowhead" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={COLORS.muted} />
        </marker>
      </defs>
      <rect x="0" y="0" width="600" height="300" fill={COLORS.paper} />
      {children}
    </svg>
  );
}

const LAYER_COLORS = [COLORS.brandLight, COLORS.sageLight, COLORS.amberLight];

function osiModel() {
  const layers = [
    ['7', 'Application', 'HTTP, DNS, SMTP'],
    ['6', 'Presentation', 'Encryption, formatting'],
    ['5', 'Session', 'Manages conversations'],
    ['4', 'Transport', 'TCP, UDP — segments'],
    ['3', 'Network', 'IP — packets, routing'],
    ['2', 'Data Link', 'MAC — frames, switches'],
    ['1', 'Physical', 'Cables, signals, bits'],
  ];
  const h = 32, gap = 6, top = 20;
  return (
    <Frame viewBox="0 0 600 300">
      {layers.map((l, i) => {
        const y = top + i * (h + gap);
        const fill = i < 3 ? COLORS.brandLight : i === 3 ? COLORS.amberLight : COLORS.sageLight;
        const stroke = i < 3 ? COLORS.brand : i === 3 ? COLORS.amber : COLORS.sage;
        return (
          <g key={l[0]}>
            <rect x={130} y={y} width={70} height={h} rx={6} fill={fill} stroke={stroke} />
            <text x={165} y={y + h / 2 + 5} textAnchor="middle" fontSize={15} fontWeight={700} fill={COLORS.ink}>{l[0]}</text>
            <rect x={210} y={y} width={160} height={h} rx={6} fill="#fff" stroke={COLORS.line} />
            <text x={290} y={y + h / 2 + 5} textAnchor="middle" fontSize={12.5} fontWeight={600} fill={COLORS.ink}>{l[1]}</text>
            <text x={385} y={y + h / 2 + 5} fontSize={11} fill={COLORS.muted}>{l[2]}</text>
          </g>
        );
      })}
    </Frame>
  );
}

function tcpIpStack() {
  const rows = [
    ['Application', 'HTTP, DNS, FTP, SMTP', COLORS.brandLight, COLORS.brand],
    ['Transport', 'TCP / UDP', COLORS.amberLight, COLORS.amber],
    ['Internet', 'IP, ICMP', COLORS.sageLight, COLORS.sage],
    ['Network Access', 'Ethernet, Wi-Fi', '#fff', COLORS.line],
  ];
  const h = 50;
  return (
    <Frame viewBox="0 0 600 260">
      {rows.map((r, i) => (
        <g key={r[0]}>
          <rect x={130} y={20 + i * (h + 10)} width={340} height={h} rx={8} fill={r[2] as string} stroke={r[3] as string} strokeWidth={1.5} />
          <text x={300} y={20 + i * (h + 10) + 22} textAnchor="middle" fontSize={14} fontWeight={700} fill={COLORS.ink}>{r[0]}</text>
          <text x={300} y={20 + i * (h + 10) + 40} textAnchor="middle" fontSize={11} fill={COLORS.muted}>{r[1]}</text>
        </g>
      ))}
    </Frame>
  );
}

function encapsulation() {
  const units = [
    { label: 'Data', w: 140, fill: COLORS.brandLight },
    { label: 'Segment', w: 200, fill: COLORS.amberLight, tag: 'TCP/UDP hdr' },
    { label: 'Packet', w: 260, fill: COLORS.sageLight, tag: 'IP hdr' },
    { label: 'Frame', w: 320, fill: '#fff', tag: 'Ethernet hdr + trailer' },
  ];
  return (
    <Frame viewBox="0 0 600 260">
      {units.map((u, i) => {
        const y = 25 + i * 55;
        const x = 300 - u.w / 2;
        return (
          <g key={u.label}>
            <rect x={x} y={y} width={u.w} height={38} rx={8} fill={u.fill} stroke={COLORS.brand} strokeWidth={1.2} />
            <text x={300} y={y + 24} textAnchor="middle" fontSize={13} fontWeight={700} fill={COLORS.ink}>{u.label}</text>
            {u.tag && <text x={x - 8} y={y + 24} textAnchor="end" fontSize={10} fill={COLORS.muted}>{u.tag}</text>}
          </g>
        );
      })}
      <text x={300} y={250} textAnchor="middle" fontSize={11} fill={COLORS.muted}>Each layer adds its own header as data moves down the stack</text>
    </Frame>
  );
}

function topologyStar() {
  const nodes = [[300, 60], [140, 160], [460, 160], [220, 250], [380, 250]];
  return (
    <Frame viewBox="0 0 600 300">
      <rect x={260} y={130} width={80} height={44} rx={8} fill={COLORS.brandLight} stroke={COLORS.brand} />
      <text x={300} y={157} textAnchor="middle" fontSize={12} fontWeight={700} fill={COLORS.ink}>Switch</text>
      {nodes.map(([x, y], i) => (
        <g key={i}>
          <line x1={300} y1={152} x2={x} y2={y} stroke={COLORS.line} strokeWidth={2} />
          <circle cx={x} cy={y} r={20} fill="#fff" stroke={COLORS.sage} strokeWidth={1.5} />
          <text x={x} y={y + 4} textAnchor="middle" fontSize={10} fill={COLORS.ink}>PC{i + 1}</text>
        </g>
      ))}
    </Frame>
  );
}

function topologyMesh() {
  const nodes = [[150, 70], [450, 70], [150, 230], [450, 230], [300, 150]];
  const pairs: [number, number][] = [[0,1],[0,2],[0,3],[0,4],[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]];
  return (
    <Frame viewBox="0 0 600 300">
      {pairs.map(([a, b], i) => (
        <line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} stroke={COLORS.line} strokeWidth={1.5} />
      ))}
      {nodes.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={22} fill={COLORS.sageLight} stroke={COLORS.sage} strokeWidth={1.5} />
          <text x={x} y={y + 4} textAnchor="middle" fontSize={11} fontWeight={600} fill={COLORS.ink}>R{i + 1}</text>
        </g>
      ))}
    </Frame>
  );
}

function topologyBus() {
  return (
    <Frame viewBox="0 0 600 300">
      <line x1={80} y1={150} x2={520} y2={150} stroke={COLORS.ink} strokeWidth={3} />
      {[130, 230, 330, 430].map((x, i) => (
        <g key={i}>
          <line x1={x} y1={150} x2={x} y2={100} stroke={COLORS.line} strokeWidth={2} />
          <rect x={x - 30} y={60} width={60} height={40} rx={8} fill={COLORS.brandLight} stroke={COLORS.brand} />
          <text x={x} y={84} textAnchor="middle" fontSize={11} fontWeight={600} fill={COLORS.ink}>PC{i + 1}</text>
        </g>
      ))}
      <text x={300} y={200} textAnchor="middle" fontSize={11} fill={COLORS.muted}>Shared backbone cable — a break anywhere can take the whole segment down</text>
    </Frame>
  );
}

function lanWan() {
  return (
    <Frame viewBox="0 0 600 300">
      <rect x={40} y={70} width={200} height={140} rx={12} fill={COLORS.sageLight} stroke={COLORS.sage} />
      <text x={140} y={95} textAnchor="middle" fontSize={13} fontWeight={700} fill={COLORS.ink}>Site A — LAN</text>
      <circle cx={100} cy={150} r={16} fill="#fff" stroke={COLORS.sage} /><text x={100} y={154} textAnchor="middle" fontSize={9}>PC</text>
      <circle cx={180} cy={150} r={16} fill="#fff" stroke={COLORS.sage} /><text x={180} y={154} textAnchor="middle" fontSize={9}>PC</text>
      <rect x={110} y={180} width={60} height={24} rx={5} fill="#fff" stroke={COLORS.sage} /><text x={140} y={196} textAnchor="middle" fontSize={9}>Switch</text>

      <rect x={360} y={70} width={200} height={140} rx={12} fill={COLORS.sageLight} stroke={COLORS.sage} />
      <text x={460} y={95} textAnchor="middle" fontSize={13} fontWeight={700} fill={COLORS.ink}>Site B — LAN</text>
      <circle cx={420} cy={150} r={16} fill="#fff" stroke={COLORS.sage} /><text x={420} y={154} textAnchor="middle" fontSize={9}>PC</text>
      <circle cx={500} cy={150} r={16} fill="#fff" stroke={COLORS.sage} /><text x={500} y={154} textAnchor="middle" fontSize={9}>PC</text>
      <rect x={430} y={180} width={60} height={24} rx={5} fill="#fff" stroke={COLORS.sage} /><text x={460} y={196} textAnchor="middle" fontSize={9}>Switch</text>

      <rect x={260} y={125} width={80} height={40} rx={8} fill={COLORS.brandLight} stroke={COLORS.brand} />
      <text x={300} y={149} textAnchor="middle" fontSize={11} fontWeight={700} fill={COLORS.ink}>Router</text>
      <Arrow x1={240} y1={145} x2={260} y2={145} />
      <Arrow x1={340} y1={145} x2={360} y2={145} />
      <text x={300} y={250} textAnchor="middle" fontSize={11} fill={COLORS.muted}>The WAN link between routers connects two geographically separate LANs</text>
    </Frame>
  );
}

function networkDevices() {
  const items: [string, string, string][] = [
    ['Hub', 'Repeats to all ports — no intelligence', COLORS.muted],
    ['Switch', 'Forwards by MAC address, per port', COLORS.sage],
    ['Router', 'Forwards by IP address, between networks', COLORS.brand],
    ['Access Point', 'Bridges wireless clients to the wired LAN', COLORS.amber],
  ];
  return (
    <Frame viewBox="0 0 600 300">
      {items.map(([label, desc, color], i) => {
        const x = 40 + (i % 2) * 290;
        const y = 30 + Math.floor(i / 2) * 130;
        return (
          <g key={label}>
            <rect x={x} y={y} width={260} height={100} rx={10} fill="#fff" stroke={color} strokeWidth={1.5} />
            <rect x={x} y={y} width={8} height={100} fill={color} />
            <text x={x + 24} y={y + 32} fontSize={14} fontWeight={700} fill={COLORS.ink}>{label}</text>
            <text x={x + 24} y={y + 58} fontSize={11} fill={COLORS.muted}>
              <tspan x={x + 24} dy="0">{desc.slice(0, 30)}</tspan>
              <tspan x={x + 24} dy="16">{desc.slice(30)}</tspan>
            </text>
          </g>
        );
      })}
    </Frame>
  );
}

function cablingTypes() {
  const items: [string, string][] = [
    ['UTP Copper', 'Cat5e/6 — up to 100m, cheap, common LAN cabling'],
    ['Fiber Optic', 'Light pulses — long distance, immune to EMI'],
    ['Coaxial', 'Legacy cable/broadband, still used for some ISPs'],
    ['Wireless (RF)', 'Radio waves — 802.11 Wi-Fi standards'],
  ];
  return (
    <Frame viewBox="0 0 600 300">
      {items.map(([label, desc], i) => (
        <g key={label} transform={`translate(30, ${30 + i * 62})`}>
          <rect x={0} y={0} width={540} height={48} rx={8} fill={i % 2 === 0 ? COLORS.brandLight : COLORS.sageLight} stroke={i % 2 === 0 ? COLORS.brand : COLORS.sage} />
          <text x={16} y={20} fontSize={13} fontWeight={700} fill={COLORS.ink}>{label}</text>
          <text x={16} y={38} fontSize={10.5} fill={COLORS.muted}>{desc}</text>
        </g>
      ))}
    </Frame>
  );
}

function switchMacTable() {
  return (
    <Frame viewBox="0 0 600 300">
      <rect x={230} y={30} width={140} height={50} rx={8} fill={COLORS.brandLight} stroke={COLORS.brand} />
      <text x={300} y={60} textAnchor="middle" fontSize={13} fontWeight={700} fill={COLORS.ink}>Switch</text>
      {[
        [110, 'PC-A', 'AA:11'],
        [230, 'PC-B', 'BB:22'],
        [370, 'PC-C', 'CC:33'],
        [490, 'PC-D', 'DD:44'],
      ].map(([x, name, mac], i) => (
        <g key={i}>
          <line x1={300} y1={80} x2={x as number} y2={140} stroke={COLORS.line} strokeWidth={2} />
          <circle cx={x as number} cy={155} r={18} fill="#fff" stroke={COLORS.sage} />
          <text x={x as number} y={159} textAnchor="middle" fontSize={9} fill={COLORS.ink}>{name}</text>
        </g>
      ))}
      <rect x={110} y={200} width={380} height={80} rx={8} fill="#fff" stroke={COLORS.line} />
      <text x={130} y={220} fontSize={11} fontWeight={700} fill={COLORS.ink}>MAC Address Table</text>
      <text x={130} y={240} fontSize={10} fontFamily="monospace" fill={COLORS.muted}>Port 1 → AA:11    Port 3 → CC:33</text>
      <text x={130} y={256} fontSize={10} fontFamily="monospace" fill={COLORS.muted}>Port 2 → BB:22    Port 4 → DD:44</text>
      <text x={130} y={272} fontSize={9.5} fill={COLORS.muted}>Learned from the source MAC of every incoming frame</text>
    </Frame>
  );
}

function collisionBroadcastDomain() {
  return (
    <Frame viewBox="0 0 600 300">
      <text x={150} y={30} textAnchor="middle" fontSize={12} fontWeight={700} fill={COLORS.ink}>Hub — 1 collision domain</text>
      <circle cx={150} cy={80} r={30} fill={COLORS.amberLight} stroke={COLORS.amber} strokeWidth={2} strokeDasharray="4 3" />
      {[[100,120],[200,120],[100,40],[200,40]].map(([x,y],i)=>(
        <circle key={i} cx={x} cy={y} r={12} fill="#fff" stroke={COLORS.amber} />
      ))}
      <text x={450} y={30} textAnchor="middle" fontSize={12} fontWeight={700} fill={COLORS.ink}>Switch — 4 collision domains</text>
      {[[400,60],[500,60],[400,100],[500,100]].map(([x,y],i)=>(
        <g key={i}>
          <circle cx={x} cy={y} r={22} fill={COLORS.sageLight} stroke={COLORS.sage} strokeWidth={1.5} strokeDasharray="4 3" />
          <circle cx={x} cy={y} r={10} fill="#fff" stroke={COLORS.sage} />
        </g>
      ))}
      <line x1={40} y1={200} x2={560} y2={200} stroke={COLORS.brand} strokeWidth={2} strokeDasharray="6 4" />
      <text x={300} y={190} textAnchor="middle" fontSize={11} fontWeight={700} fill={COLORS.brand}>One broadcast domain (until a router divides it)</text>
      <text x={300} y={270} textAnchor="middle" fontSize={10.5} fill={COLORS.muted}>Switches stop collisions per port, but broadcasts still reach every device</text>
    </Frame>
  );
}

function vlanSegmentation() {
  return (
    <Frame viewBox="0 0 600 300">
      <rect x={40} y={40} width={520} height={220} rx={12} fill="#fff" stroke={COLORS.line} />
      <text x={300} y={30} textAnchor="middle" fontSize={12} fontWeight={700} fill={COLORS.ink}>One physical switch, two logical networks</text>
      <rect x={70} y={70} width={220} height={80} rx={8} fill={COLORS.sageLight} stroke={COLORS.sage} />
      <text x={180} y={95} textAnchor="middle" fontSize={12} fontWeight={700} fill={COLORS.sageDark}>VLAN 10 — Sales</text>
      {[110,180,250].map((x,i)=>(<circle key={i} cx={x} cy={125} r={14} fill="#fff" stroke={COLORS.sage} />))}
      <rect x={310} y={70} width={220} height={80} rx={8} fill={COLORS.brandLight} stroke={COLORS.brand} />
      <text x={420} y={95} textAnchor="middle" fontSize={12} fontWeight={700} fill={COLORS.brandDark}>VLAN 20 — Engineering</text>
      {[350,420,490].map((x,i)=>(<circle key={i} cx={x} cy={125} r={14} fill="#fff" stroke={COLORS.brand} />))}
      <text x={300} y={190} textAnchor="middle" fontSize={11} fill={COLORS.muted}>Ports in different VLANs can't talk directly — even on the same switch —</text>
      <text x={300} y={208} textAnchor="middle" fontSize={11} fill={COLORS.muted}>until a router or Layer-3 switch routes between them.</text>
      <text x={300} y={240} textAnchor="middle" fontSize={10} fill={COLORS.muted}>Broadcasts sent on VLAN 10 stay inside VLAN 10 only</text>
    </Frame>
  );
}

function trunkLink() {
  return (
    <Frame viewBox="0 0 600 300">
      <rect x={60} y={100} width={140} height={60} rx={8} fill={COLORS.brandLight} stroke={COLORS.brand} />
      <text x={130} y={135} textAnchor="middle" fontSize={12} fontWeight={700} fill={COLORS.ink}>Switch A</text>
      <rect x={400} y={100} width={140} height={60} rx={8} fill={COLORS.brandLight} stroke={COLORS.brand} />
      <text x={470} y={135} textAnchor="middle" fontSize={12} fontWeight={700} fill={COLORS.ink}>Switch B</text>
      <line x1={200} y1={130} x2={400} y2={130} stroke={COLORS.sage} strokeWidth={4} />
      <rect x={250} y={105} width={100} height={26} rx={6} fill={COLORS.sageLight} stroke={COLORS.sage} />
      <text x={300} y={122} textAnchor="middle" fontSize={10} fontWeight={700} fill={COLORS.sageDark}>802.1Q Trunk</text>
      <text x={300} y={200} textAnchor="middle" fontSize={11} fill={COLORS.muted}>A trunk carries traffic for many VLANs over one link,</text>
      <text x={300} y={218} textAnchor="middle" fontSize={11} fill={COLORS.muted}>tagging each frame with its VLAN ID so the far switch knows where it belongs.</text>
    </Frame>
  );
}

function spanningTree() {
  return (
    <Frame viewBox="0 0 600 300">
      <rect x={260} y={30} width={80} height={40} rx={8} fill={COLORS.brandLight} stroke={COLORS.brand} />
      <text x={300} y={55} textAnchor="middle" fontSize={11} fontWeight={700} fill={COLORS.ink}>Root Bridge</text>
      <rect x={120} y={140} width={80} height={40} rx={8} fill={COLORS.sageLight} stroke={COLORS.sage} />
      <text x={160} y={165} textAnchor="middle" fontSize={11} fontWeight={700} fill={COLORS.ink}>Switch B</text>
      <rect x={420} y={140} width={80} height={40} rx={8} fill={COLORS.sageLight} stroke={COLORS.sage} />
      <text x={460} y={165} textAnchor="middle" fontSize={11} fontWeight={700} fill={COLORS.ink}>Switch C</text>
      <line x1={280} y1={70} x2={165} y2={140} stroke={COLORS.sage} strokeWidth={3} />
      <line x1={320} y1={70} x2={455} y2={140} stroke={COLORS.sage} strokeWidth={3} />
      <line x1={200} y1={160} x2={420} y2={160} stroke={COLORS.amber} strokeWidth={3} strokeDasharray="6 4" />
      <text x={300} y={195} textAnchor="middle" fontSize={10} fontWeight={700} fill={COLORS.amberDark}>Blocked (loop prevention)</text>
      <text x={300} y={250} textAnchor="middle" fontSize={11} fill={COLORS.muted}>STP elects a root bridge, then blocks the redundant link —</text>
      <text x={300} y={268} textAnchor="middle" fontSize={11} fill={COLORS.muted}>it re-activates automatically only if the primary path fails.</text>
    </Frame>
  );
}

function ipAddressAnatomy() {
  const octets = ['192', '168', '1', '10'];
  return (
    <Frame viewBox="0 0 600 300">
      <text x={300} y={40} textAnchor="middle" fontSize={13} fontWeight={700} fill={COLORS.ink}>IPv4 address — four 8-bit octets</text>
      {octets.map((o, i) => (
        <g key={i} transform={`translate(${90 + i * 110}, 70)`}>
          <rect width={90} height={60} rx={8} fill={i < 3 ? COLORS.brandLight : COLORS.sageLight} stroke={i < 3 ? COLORS.brand : COLORS.sage} />
          <text x={45} y={30} textAnchor="middle" fontSize={20} fontWeight={700} fill={COLORS.ink}>{o}</text>
          <text x={45} y={48} textAnchor="middle" fontSize={9} fill={COLORS.muted}>{i < 3 ? 'Network' : 'Host'}</text>
        </g>
      ))}
      <text x={300} y={170} textAnchor="middle" fontSize={11} fill={COLORS.muted}>192.168.1.10 — the first three octets identify the network,</text>
      <text x={300} y={188} textAnchor="middle" fontSize={11} fill={COLORS.muted}>the last octet identifies this specific host on that network.</text>
      <text x={300} y={230} textAnchor="middle" fontSize={11} fontFamily="monospace" fill={COLORS.ink}>Binary: 11000000.10101000.00000001.00001010</text>
    </Frame>
  );
}

function subnetMask() {
  return (
    <Frame viewBox="0 0 600 300">
      <text x={300} y={30} textAnchor="middle" fontSize={12} fontWeight={700} fill={COLORS.ink}>Address vs. mask — /24 example</text>
      <text x={100} y={80} fontSize={13} fontFamily="monospace" fill={COLORS.ink}>IP:    192.168.1.10</text>
      <text x={100} y={105} fontSize={13} fontFamily="monospace" fill={COLORS.ink}>Mask:  255.255.255.0</text>
      <text x={100} y={130} fontSize={13} fontFamily="monospace" fill={COLORS.brand}>CIDR:  /24</text>
      <rect x={80} y={160} width={300} height={30} fill={COLORS.brandLight} stroke={COLORS.brand} />
      <text x={230} y={180} textAnchor="middle" fontSize={11} fontWeight={700} fill={COLORS.brandDark}>Network bits (fixed) — 24 bits</text>
      <rect x={380} y={160} width={100} height={30} fill={COLORS.sageLight} stroke={COLORS.sage} />
      <text x={430} y={180} textAnchor="middle" fontSize={11} fontWeight={700} fill={COLORS.sageDark}>Host — 8 bits</text>
      <text x={300} y={230} textAnchor="middle" fontSize={11} fill={COLORS.muted}>A /24 mask leaves 8 host bits → 256 addresses (254 usable),</text>
      <text x={300} y={248} textAnchor="middle" fontSize={11} fill={COLORS.muted}>network address .0 and broadcast address .255 aren't assignable to hosts.</text>
    </Frame>
  );
}

function routerTable() {
  return (
    <Frame viewBox="0 0 600 300">
      <rect x={230} y={30} width={140} height={44} rx={8} fill={COLORS.brandLight} stroke={COLORS.brand} />
      <text x={300} y={57} textAnchor="middle" fontSize={12} fontWeight={700} fill={COLORS.ink}>Router</text>
      <rect x={60} y={110} width={480} height={150} rx={8} fill="#fff" stroke={COLORS.line} />
      <text x={80} y={132} fontSize={11} fontWeight={700} fill={COLORS.ink}>Routing Table</text>
      <text x={80} y={150} fontSize={10} fontFamily="monospace" fill={COLORS.muted}>Destination        Next Hop        Interface   Metric</text>
      <text x={80} y={168} fontSize={10} fontFamily="monospace" fill={COLORS.ink}>10.0.1.0/24          directly conn.   Gi0/0        0</text>
      <text x={80} y={186} fontSize={10} fontFamily="monospace" fill={COLORS.ink}>10.0.2.0/24          192.168.1.2     Gi0/1        2</text>
      <text x={80} y={204} fontSize={10} fontFamily="monospace" fill={COLORS.ink}>0.0.0.0/0 (default)  192.168.1.1     Gi0/1        1</text>
      <text x={80} y={230} fontSize={10} fill={COLORS.muted}>The router matches the destination IP to the most specific</text>
      <text x={80} y={246} fontSize={10} fill={COLORS.muted}>route ("longest prefix match") and forwards out that interface.</text>
    </Frame>
  );
}

function staticVsDynamic() {
  return (
    <Frame viewBox="0 0 600 300">
      <rect x={40} y={40} width={250} height={210} rx={10} fill={COLORS.brandLight} stroke={COLORS.brand} />
      <text x={165} y={65} textAnchor="middle" fontSize={13} fontWeight={700} fill={COLORS.ink}>Static Routing</text>
      <text x={60} y={95} fontSize={10.5} fill={COLORS.muted}>• Admin enters routes by hand</text>
      <text x={60} y={115} fontSize={10.5} fill={COLORS.muted}>• Predictable, no CPU overhead</text>
      <text x={60} y={135} fontSize={10.5} fill={COLORS.muted}>• Doesn't adapt to link failure</text>
      <text x={60} y={155} fontSize={10.5} fill={COLORS.muted}>• Fine for small, stable networks</text>

      <rect x={310} y={40} width={250} height={210} rx={10} fill={COLORS.sageLight} stroke={COLORS.sage} />
      <text x={435} y={65} textAnchor="middle" fontSize={13} fontWeight={700} fill={COLORS.ink}>Dynamic Routing</text>
      <text x={330} y={95} fontSize={10.5} fill={COLORS.muted}>• Routers exchange routes (OSPF, RIP)</text>
      <text x={330} y={115} fontSize={10.5} fill={COLORS.muted}>• Automatically reroutes on failure</text>
      <text x={330} y={135} fontSize={10.5} fill={COLORS.muted}>• Scales to large, changing networks</text>
      <text x={330} y={155} fontSize={10.5} fill={COLORS.muted}>• More CPU & config complexity</text>
    </Frame>
  );
}

function nat() {
  return (
    <Frame viewBox="0 0 600 300">
      <rect x={40} y={110} width={160} height={60} rx={8} fill={COLORS.sageLight} stroke={COLORS.sage} />
      <text x={120} y={135} textAnchor="middle" fontSize={11} fontWeight={700} fill={COLORS.ink}>PC — 192.168.1.10</text>
      <text x={120} y={152} textAnchor="middle" fontSize={9} fill={COLORS.muted}>Private address</text>

      <rect x={250} y={100} width={100} height={80} rx={8} fill={COLORS.brandLight} stroke={COLORS.brand} />
      <text x={300} y={135} textAnchor="middle" fontSize={11} fontWeight={700} fill={COLORS.ink}>Router</text>
      <text x={300} y={150} textAnchor="middle" fontSize={9} fill={COLORS.muted}>NAT table</text>

      <rect x={400} y={110} width={160} height={60} rx={8} fill={COLORS.amberLight} stroke={COLORS.amber} />
      <text x={480} y={135} textAnchor="middle" fontSize={11} fontWeight={700} fill={COLORS.ink}>Internet — 203.0.113.5</text>
      <text x={480} y={152} textAnchor="middle" fontSize={9} fill={COLORS.muted}>Public address</text>

      <Arrow x1={200} y1={140} x2={250} y2={140} />
      <Arrow x1={350} y1={140} x2={400} y2={140} />
      <text x={300} y={220} textAnchor="middle" fontSize={11} fill={COLORS.muted}>NAT swaps the private source address for a shared public one</text>
      <text x={300} y={238} textAnchor="middle" fontSize={11} fill={COLORS.muted}>so many internal hosts can share a single internet-routable IP.</text>
    </Frame>
  );
}

function ciaTriad() {
  const pts = [[300, 40], [180, 230], [420, 230]];
  const labels: [number, number, string, string][] = [
    [300, 30, 'Confidentiality', 'Only authorized users see the data'],
    [150, 260, 'Integrity', 'Data isn\'t altered in transit'],
    [450, 260, 'Availability', 'Systems stay up when needed'],
  ];
  return (
    <Frame viewBox="0 0 600 300">
      <polygon points={pts.map((p) => p.join(',')).join(' ')} fill={COLORS.brandLight} stroke={COLORS.brand} strokeWidth={2} />
      {labels.map(([x, y, label, desc], i) => (
        <g key={i}>
          <text x={x} y={y} textAnchor="middle" fontSize={13} fontWeight={700} fill={COLORS.ink}>{label}</text>
          <text x={x} y={y + 16} textAnchor="middle" fontSize={9.5} fill={COLORS.muted}>{desc}</text>
        </g>
      ))}
    </Frame>
  );
}

function firewallAcl() {
  return (
    <Frame viewBox="0 0 600 300">
      <rect x={40} y={110} width={120} height={50} rx={8} fill={COLORS.sageLight} stroke={COLORS.sage} />
      <text x={100} y={140} textAnchor="middle" fontSize={11} fontWeight={700} fill={COLORS.ink}>Internal LAN</text>

      <rect x={230} y={90} width={140} height={90} rx={8} fill={COLORS.brandLight} stroke={COLORS.brand} strokeWidth={2} />
      <text x={300} y={120} textAnchor="middle" fontSize={12} fontWeight={700} fill={COLORS.ink}>Firewall</text>
      <text x={300} y={140} textAnchor="middle" fontSize={9} fontFamily="monospace" fill={COLORS.sageDark}>Permit TCP 443 ✓</text>
      <text x={300} y={155} textAnchor="middle" fontSize={9} fontFamily="monospace" fill="#B4423A">Deny TCP 23 ✕</text>

      <rect x={440} y={110} width={120} height={50} rx={8} fill={COLORS.amberLight} stroke={COLORS.amber} />
      <text x={500} y={140} textAnchor="middle" fontSize={11} fontWeight={700} fill={COLORS.ink}>Internet</text>

      <Arrow x1={160} y1={135} x2={230} y2={135} />
      <Arrow x1={370} y1={135} x2={440} y2={135} />
      <text x={300} y={220} textAnchor="middle" fontSize={11} fill={COLORS.muted}>An ACL is an ordered list of rules; the firewall checks each</text>
      <text x={300} y={238} textAnchor="middle" fontSize={11} fill={COLORS.muted}>packet top-to-bottom and applies the first rule that matches.</text>
    </Frame>
  );
}

function vpnTunnel() {
  return (
    <Frame viewBox="0 0 600 300">
      <rect x={40} y={110} width={120} height={60} rx={8} fill={COLORS.sageLight} stroke={COLORS.sage} />
      <text x={100} y={145} textAnchor="middle" fontSize={11} fontWeight={700} fill={COLORS.ink}>Remote user</text>

      <rect x={440} y={110} width={120} height={60} rx={8} fill={COLORS.sageLight} stroke={COLORS.sage} />
      <text x={500} y={145} textAnchor="middle" fontSize={11} fontWeight={700} fill={COLORS.ink}>Office network</text>

      <rect x={190} y={125} width={220} height={30} rx={15} fill={COLORS.brandLight} stroke={COLORS.brand} strokeWidth={2} />
      <text x={300} y={145} textAnchor="middle" fontSize={10} fontWeight={700} fill={COLORS.brandDark}>Encrypted tunnel (over the public internet)</text>

      <Arrow x1={160} y1={140} x2={190} y2={140} />
      <Arrow x1={410} y1={140} x2={440} y2={140} />
      <text x={300} y={210} textAnchor="middle" fontSize={11} fill={COLORS.muted}>A VPN encrypts traffic end-to-end, so anyone intercepting</text>
      <text x={300} y={228} textAnchor="middle" fontSize={11} fill={COLORS.muted}>packets in transit sees only unreadable ciphertext.</text>
    </Frame>
  );
}

function wirelessSecurity() {
  return (
    <Frame viewBox="0 0 600 300">
      <rect x={250} y={40} width={100} height={50} rx={8} fill={COLORS.brandLight} stroke={COLORS.brand} />
      <text x={300} y={70} textAnchor="middle" fontSize={11} fontWeight={700} fill={COLORS.ink}>Access Point</text>
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={300} cy={65} r={40 + i * 30} fill="none" stroke={COLORS.brand} strokeOpacity={0.25} strokeWidth={1.5} />
      ))}
      {[120, 480].map((x, i) => (
        <g key={i}>
          <circle cx={x} cy={190} r={20} fill={COLORS.sageLight} stroke={COLORS.sage} />
          <text x={x} y={195} textAnchor="middle" fontSize={9} fill={COLORS.ink}>{i === 0 ? 'Laptop' : 'Phone'}</text>
        </g>
      ))}
      <rect x={190} y={230} width={220} height={50} rx={8} fill="#fff" stroke={COLORS.line} />
      <text x={300} y={250} textAnchor="middle" fontSize={10} fontWeight={700} fill={COLORS.ink}>WPA3 &gt; WPA2 &gt; WEP (weak, avoid)</text>
      <text x={300} y={266} textAnchor="middle" fontSize={9.5} fill={COLORS.muted}>Strong encryption + a unique passphrase for every AP</text>
    </Frame>
  );
}

const RENDERERS: Record<DiagramId, () => JSX.Element> = {
  'osi-model': osiModel,
  'tcp-ip-stack': tcpIpStack,
  'encapsulation': encapsulation,
  'topology-star': topologyStar,
  'topology-mesh': topologyMesh,
  'topology-bus': topologyBus,
  'lan-wan': lanWan,
  'network-devices': networkDevices,
  'cabling-types': cablingTypes,
  'switch-mac-table': switchMacTable,
  'collision-broadcast-domain': collisionBroadcastDomain,
  'vlan-segmentation': vlanSegmentation,
  'trunk-link': trunkLink,
  'spanning-tree': spanningTree,
  'ip-address-anatomy': ipAddressAnatomy,
  'subnet-mask': subnetMask,
  'router-table': routerTable,
  'static-vs-dynamic': staticVsDynamic,
  'nat': nat,
  'cia-triad': ciaTriad,
  'firewall-acl': firewallAcl,
  'vpn-tunnel': vpnTunnel,
  'wireless-security': wirelessSecurity,
};

export default function NetworkDiagram({ id, caption }: { id: DiagramId; caption?: string }) {
  const render = RENDERERS[id];
  return (
    <figure className="overflow-hidden rounded-xl2 border border-line bg-paper">
      <div className="aspect-[2/1] w-full">{render ? render() : null}</div>
      {caption && (
        <figcaption className="border-t border-line bg-white px-4 py-2 text-center text-xs text-muted">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
