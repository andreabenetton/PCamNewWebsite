export type ProductCategory = 'automation' | 'digital-production' | 'monitoring' | 'tool-management' | 'edm-cam' | 'measurement';

export interface Product {
  slug: string;
  name: string;
  eyebrow: string;
  category: ProductCategory;
  summary: string;
  buyerProblem: string;
  bestFor: string[];
  capabilities: string[];
  outcomes: string[];
  specs?: { label: string; value: string }[];
  integration?: string[];
  source: string;
}

export const products: Product[] = [
  {
    slug: 'pcammes', name: 'PCamMES', eyebrow: 'Manufacturing execution', category: 'digital-production',
    summary: 'A manufacturing execution environment for tool, mould and precision engineering companies that connects production orders, resources, machines and shop-floor information.',
    buyerProblem: 'Production data is fragmented across ERP, spreadsheets, machines and people, making planning, traceability and execution difficult to control in real time.',
    bestFor: ['Tool and mould shops', 'Precision engineering', 'Injection moulding', 'Blanking and extrusion tooling'],
    capabilities: ['Real-time production overview', 'Direct machine connectivity', 'ERP data exchange', 'Resource and information management', 'Production scheduling', 'Digital warehouse and magazine management', 'Work-process and file management'],
    outcomes: ['More reliable order planning', 'Higher machine availability', 'Less searching for tools, parts and files', 'Greater process traceability', 'Lower setup and coordination overhead'],
    integration: ['ERP', 'CNC machines', 'PCamCell', 'PCamMonitor', 'PCamToolManager', 'Simulation systems'],
    source: 'https://en.pcam.com/portfolio/pcammes/'
  },
  {
    slug: 'pcampps', name: 'PCamPPS', eyebrow: 'Production planning', category: 'digital-production',
    summary: 'Production and process planning for single parts, products and small series, designed for mould shops and toolmakers.',
    buyerProblem: 'Priorities, deadlines and resource availability change continuously, while planners need one coherent view of what can run, where and when.',
    bestFor: ['Mould shops', 'Toolmakers', 'High-mix / low-volume production'],
    capabilities: ['Order and process planning', 'Resource availability planning', 'Manufacturing status visibility', 'Integration with CNC execution', 'Single-point production overview'],
    outcomes: ['More predictable delivery', 'Faster replanning', 'Clearer workload visibility', 'Better resource utilization'],
    source: 'https://en.pcam.com/portfolio/pcampps/'
  },
  {
    slug: 'pcammonitor', name: 'PCamMonitor', eyebrow: 'Machine data collection & OEE', category: 'monitoring',
    summary: 'Real-time supervision of connected CNC machines with machine state, program, cycle, downtime, setup, maintenance and OEE information.',
    buyerProblem: 'Machine utilization and downtime are discussed from perception rather than measured from live machine data.',
    bestFor: ['Mixed CNC fleets', 'Production managers', 'Continuous improvement teams'],
    capabilities: ['Real-time machine state', 'Program and processing time visibility', 'Downtime and setup tracking', 'OEE and machine effectiveness', 'Maintenance events', 'Cycle-time statistics', 'User notifications'],
    outcomes: ['Expose hidden downtime', 'Create a shared production truth', 'Measure OEE and utilization', 'React faster to machine events'],
    integration: ['Windows', 'Android', 'iOS', 'SQL-based client/server environment'],
    source: 'https://en.pcam.com/portfolio/pcammonitor/'
  },
  {
    slug: 'pcamiot', name: 'PCamIoT', eyebrow: 'Machine & process data', category: 'monitoring',
    summary: 'IoT modules for collecting and presenting production-device data, including machine variables, energy use and environmental/process signals.',
    buyerProblem: 'Useful production signals exist inside controls and sensors, but are not consolidated into actionable shop-floor information.',
    bestFor: ['Connected workshops', 'Energy monitoring', 'Retrofit data collection'],
    capabilities: ['Web production dashboard', 'Machine-status and CNC variable acquisition', 'Temperature and energy monitoring', 'IFTTT-style event integration', 'RFID/location-oriented modules'],
    outcomes: ['Better operational visibility', 'Energy and process insight', 'Data-driven decisions', 'Faster identification of bottlenecks'],
    source: 'https://en.pcam.com/portfolio/pcamiot/'
  },
  {
    slug: 'pcamtoolmanager', name: 'PCamToolManager', eyebrow: 'Digital tool management', category: 'tool-management',
    summary: 'A tool-management system for identifying, locating, presetting and tracing holders and cutting tools across the workshop.',
    buyerProblem: 'Tool data, offsets, stock and physical location are disconnected, creating search time, setup risk and unnecessary inventory.',
    bestFor: ['Central tool rooms', 'Automated cells', 'Multi-machine workshops', 'Presetter-driven workflows'],
    capabilities: ['DMC/RFID identification', 'Physical tool location', 'Preset data exchange', 'Tool wear and usage tracking', 'Automatic warehouse connections', 'ISO 13399-oriented data', '3D tool models', 'Machine offset transfer'],
    outcomes: ['Less tool search time', 'Safer setup', 'Transparent stock and wear', 'Faster preset-to-machine workflow', 'Reduced purchasing overhead'],
    integration: ['Zoller', 'Speroni', 'Elbo', 'Nikken', 'Haimer', 'Fanuc', 'Siemens', 'Heidenhain', 'CAD/CAM tool databases'],
    source: 'https://en.pcam.com/portfolio/pcamtoolmanager/'
  },
  {
    slug: 'pcamcell', name: 'PCamCell', eyebrow: 'Cell orchestration', category: 'automation',
    summary: 'Software for integrating multiple CNC machines and process resources into a coordinated automated cell.',
    buyerProblem: 'A robot can move parts, but true unattended production requires jobs, machines, pallets, tools and process constraints to be orchestrated together.',
    bestFor: ['Automated cells', 'Mixed machine processes', 'Unattended production'],
    capabilities: ['Multi-machine process coordination', 'Job sequencing', 'Resource-aware execution', 'Part/tool identification', 'Connection of automation peripherals'],
    outcomes: ['Longer unattended production', 'Higher machine utilization', 'Consistent process routing', 'Reduced manual coordination'],
    source: 'https://en.pcam.com/portfolio/pcamcell/'
  },
  {
    slug: 'pcamjobmanager', name: 'PCamJobManager', eyebrow: 'CNC job management', category: 'automation',
    summary: 'Job-management software for individual or connected CNC machines, supporting flexible routing, priorities, identification and process sequencing.',
    buyerProblem: 'Small-batch production changes frequently and needs routing flexibility without losing control of programs, pallets, tools or execution order.',
    bestFor: ['High-mix production', 'Flexible manufacturing cells', 'Individual automated CNC machines'],
    capabilities: ['Remote CNC functionality', 'Bidirectional CNC communication', 'Priorities and constraints', 'RFID / 1D / 2D identification', 'Processing-time and zero-point exchange', 'Tool/pallet change optimization', 'Multi-machine routing'],
    outcomes: ['More flexible scheduling', 'Fewer manual interventions', 'Better small-batch automation', 'Controlled routing changes'],
    source: 'https://en.pcam.com/portfolio/pcamjobmanager/'
  },
  {
    slug: 'pcamwsm', name: 'PCamWSM', eyebrow: 'Workshop management', category: 'digital-production',
    summary: 'Workshop-management functions designed to simplify administrative work and improve visibility around production activities.',
    buyerProblem: 'Shop-floor administrative tasks and status information are spread across disconnected workflows.',
    bestFor: ['Toolrooms', 'Production administration', 'Digital shop-floor initiatives'],
    capabilities: ['Customer and supplier management', 'Project and BOM management', 'Purchase and sales order workflows', 'CAD/CAM workflow integration', 'MRP/ERP data exchange', 'Import/export through web services, SQL tables, text files and CSV'],
    outcomes: ['Less administrative friction', 'Clearer workshop coordination', 'More consistent exchange between business and production systems'],
    integration: ['SAP', 'Navision', 'Primavera', 'Erowa-Certa', '3R', 'ZK', 'CSV', 'Web services', 'SQL tables'],
    source: 'https://en.pcam.com/portfolio/pcamwsm/'
  },
  {
    slug: 'pcamrobocube', name: 'PCamRoboCube', eyebrow: 'Compact robotic automation', category: 'automation',
    summary: 'An enclosed automated handler for pallets and tools serving one to three CNC machines across milling, EDM, turning, grinding and measuring processes.',
    buyerProblem: 'A small group of machines needs autonomous loading with a compact footprint and enough storage for both pallets and tools.',
    bestFor: ['1–3 CNC machines', 'Mixed process cells', 'Pallet and tool automation'],
    capabilities: ['Pallet and tool handling', 'DMC/RFID identification', 'Master/serial/TCP-IP machine interconnection', 'Support for milling, wire/sink EDM, turning, grinding and CMM'],
    outcomes: ['Higher spindle hours', 'Night/weekend production', 'Compact automation footprint', 'Repeatable material handling'],
    specs: [
      { label: 'Envelope', value: '2.5 × 2.2 × 2.7 m' }, { label: 'System weight', value: '2,300 kg' },
      { label: 'Max wrist load', value: '150 kg' }, { label: 'Max pallet', value: '320 × 320 × 230 mm' },
      { label: 'Pallet positions', value: 'Up to 30' }, { label: 'Tool positions', value: 'Up to 200' }
    ],
    source: 'https://en.pcam.com/portfolio/pcamrobocube/'
  },
  {
    slug: 'pcamfmc', name: 'PCamFMC', eyebrow: 'Flexible manufacturing cell', category: 'automation',
    summary: 'A flexible cell built around a 6-axis anthropomorphic robot for loading machines, magazines, washing/drying stations, load/unload positions and measuring machines.',
    buyerProblem: 'Several process resources need one flexible handling system that can be configured around the workshop rather than forcing a fixed layout.',
    bestFor: ['Multi-process cells', 'Heavy pallets', 'Flexible machine layouts'],
    capabilities: ['6-axis robot handling', 'Machine and magazine loading', 'Wash/dry station handling', 'CMM handling', 'Configurable pallet/electrode storage'],
    outcomes: ['Flexible cell layout', 'Automated inter-process flow', 'Reduced operator handling'],
    specs: [{ label: 'Axes', value: '6' }, { label: 'Maximum load', value: '220 kg (pallet + blank)' }, { label: 'Reported repeatability', value: '±0.3 mm' }],
    source: 'https://en.pcam.com/portfolio/pcamfmc/'
  },
  {
    slug: 'pcamfmc2', name: 'PCamFMC2', eyebrow: 'Twin-cell automation', category: 'automation',
    summary: 'A six-axis anthropomorphic robot solution designed to serve double machining cells and extend flexible automation across larger production layouts.',
    buyerProblem: 'One compact cell is not enough to cover the required machine count, process range or production layout.',
    bestFor: ['Double machining cells', 'Larger automation layouts', 'Multi-machine production'],
    capabilities: ['Six-axis anthropomorphic handling', 'Double-cell machine serving', 'Flexible machine feeding', 'Integrated production flow'],
    outcomes: ['More automation coverage', 'Flexible capacity expansion', 'Reduced manual transfer between machining resources'],
    source: 'https://en.pcam.com/portfolio/pcamfmc2/'
  },
  {
    slug: 'pcamlinear', name: 'PCamLinear', eyebrow: 'Robot on linear axis', category: 'automation',
    summary: 'Linear automation architecture for integrating four or more CNC machines and associated resources along a production line.',
    buyerProblem: 'A central fixed robot cannot efficiently reach a long row of machines or a growing number of process stations.',
    bestFor: ['4+ CNC machines', 'Long machine rows', 'Expandable automation'],
    capabilities: ['Six-axis robot on an extremely stable linear rail', 'Seventh-axis horizontal travel', 'Multi-machine feeding', 'Scalable station layout'],
    outcomes: ['Reach more machines with one automation concept', 'Scale cell length as production evolves'],
    source: 'https://en.pcam.com/portfolio/pcamlinear/'
  },
  {
    slug: 'pcamgantry', name: 'PCamGantry', eyebrow: 'Gantry / 7th-axis automation', category: 'automation',
    summary: 'A stable gantry that adds a horizontal seventh axis to the robot, allowing high-dynamic movement across large machine layouts.',
    buyerProblem: 'Large multi-machine installations need robot reach without sacrificing payload, accessibility or layout freedom.',
    bestFor: ['Large machine layouts', 'High-payload handling', 'Centralized automation'],
    capabilities: ['Robot carriage on gantry', '7th-axis control from robot environment', 'Configurable machine, magazine and gripper layout', 'Standardized modular mechanical concept'],
    outcomes: ['Large working envelope', 'Fast layout adaptation', 'High-payload automation'],
    source: 'https://en.pcam.com/portfolio/pcamgantry/'
  },
  {
    slug: 'pcamheavy', name: 'PCamHeavy', eyebrow: 'Heavy-duty automation', category: 'automation',
    summary: 'A pallet and tool handling concept for automated machining of large, heavy workpieces where compact cell payloads are not sufficient.',
    buyerProblem: 'Large mould components or fixtures exceed the practical payload and resource capacity of compact automation systems.',
    bestFor: ['Heavy workpieces', 'Large mould components', 'High-payload cells'],
    capabilities: ['Load transport reported up to 8 t', 'Integrated machine feeding', 'Optional multiple load/unload stations', 'PCamCell / JobManager orchestration', 'Bidirectional ERP and PPS interfaces', 'Large centralized tool capacity'],
    outcomes: ['Automate heavy handling', 'Extend unattended production to large workpieces', 'Reduce manual/crane intervention between operations'],
    specs: [{ label: 'Load transport', value: 'Up to 8 t (current PCam page)' }, { label: 'Tool capacity', value: 'Up to 3,000 HSK or ISO tools (current PCam page)' }],
    source: 'https://en.pcam.com/portfolio/pcamheavy/'
  },
  {
    slug: 'pcamcobot', name: 'PCamCobot', eyebrow: 'Collaborative robot', category: 'automation',
    summary: 'A collaborative 6-axis robot option for flexible CNC-related tasks, designed around repeatability, compact deployment and process inspection needs.',
    buyerProblem: 'Automation must fit in constrained spaces and support flexible tasks without building a traditional large cell around every process.',
    bestFor: ['Flexible automation tasks', 'Constrained footprints', 'Inspection and quality workflows'],
    capabilities: ['6-axis collaborative handling', 'Integrated electrical/pneumatic wrist connections', 'LED condition indication', 'Process inspection support'],
    outcomes: ['Smaller automation footprint', 'Flexible deployment', 'Simplified inspection workflows'],
    source: 'https://en.pcam.com/portfolio/pcamcobot/'
  },
  {
    slug: 'pcamagv', name: 'PCamAGV', eyebrow: 'Autonomous material movement', category: 'automation',
    summary: 'An automated guided vehicle concept for extending material movement beyond fixed machine cells.',
    buyerProblem: 'Parts and pallets must move between separated production areas without relying on continuous manual transport.',
    bestFor: ['Distributed workshops', 'Inter-cell logistics', 'Material flow automation'],
    capabilities: ['Automated material transport', 'Connection between production areas'],
    outcomes: ['Less manual transport', 'More continuous production flow'],
    source: 'https://en.pcam.com/portfolio/pcamagv/'
  },
  {
    slug: 'pcamcube', name: 'PCamCube', eyebrow: 'Compact cell automation', category: 'automation',
    summary: 'Compact handling automation for workpieces and electrodes serving one to two machines in milling, EDM, grinding, washing and measuring workflows.',
    buyerProblem: 'A small machine group needs unattended loading, but floor space and investment must remain controlled.',
    bestFor: ['1–2 machines', 'Electrode automation', 'Compact toolrooms'],
    capabilities: ['Workpiece/electrode handling', 'DMC/chip/RFID identification', 'Machine connection over master/slave/serial/TCP-IP'],
    outcomes: ['Entry point to unattended production', 'Compact use of floor space'],
    specs: [{ label: 'Envelope', value: '1.7 × 2.45 × 2.5 m' }, { label: 'Weight', value: '1,500 kg' }, { label: 'Maximum extension', value: '1,200 mm' }, { label: 'Maximum pallet weight', value: '40 kg at J6' }, { label: 'Pallet positions', value: 'Up to 10' }, { label: 'Electrode positions', value: 'Up to 192' }],
    source: 'https://en.pcam.com/portfolio/pcamminicube/'
  },
  {
    slug: 'pcamwire', name: 'PCamWire', eyebrow: 'Wire EDM CAD/CAM', category: 'edm-cam',
    summary: 'CAD/CAM programming for wire EDM, from CAD geometry through cutting strategies, machine post-processing and solid simulation.',
    buyerProblem: 'Complex wire EDM geometry and machine-specific programming create manual preparation, postprocessor and verification overhead.',
    bestFor: ['Wire EDM departments', 'Tool and die manufacturing', 'Complex tapered geometry'],
    capabilities: ['3D CAD import', 'Roughing/finishing strategies', 'Conical and ruled-surface strategies', 'Machine postprocessors', 'Online program upload', 'Feature recognition', 'Solid 3D simulation', 'Gear and advanced geometry modules'],
    outcomes: ['Faster programming', 'Machine-independent workflow', 'More reliable complex geometry'],
    integration: ['AGIE/Charmilles', 'Mitsubishi', 'Sodick', 'Fanuc', 'Makino', 'Exeron and other machine families via postprocessors'],
    source: 'https://en.pcam.com/portfolio/pcamwire/'
  },
  {
    slug: 'pcamdiesink', name: 'PCamDieSink', eyebrow: 'Sinking EDM CAD/CAM', category: 'edm-cam',
    summary: 'CAD/CAM for die-sinking EDM, focused on turning extracted electrode geometry into controlled machine programming and automated EDM workflows.',
    buyerProblem: 'Electrode definition, setup and sink-EDM programming are disconnected steps that can introduce time loss and errors.',
    bestFor: ['Sink EDM departments', 'Mould manufacturing', 'Electrode-driven automation'],
    capabilities: ['Electrode-oriented CAD/CAM workflow', 'Direct machine programming', 'Automation integration'],
    outcomes: ['Shorter EDM programming cycle', 'More repeatable electrode workflow', 'Better integration with automated cells'],
    source: 'https://en.pcam.com/portfolio/pcamdiesink/'
  },
  {
    slug: 'pcammms', name: 'PCamMMS', eyebrow: 'CMM programming & measurement', category: 'measurement',
    summary: 'CAM-oriented programming for CNC coordinate measuring machines, reducing measurement preparation to defining required points and features on the solid model.',
    buyerProblem: 'Measurement programming can become a bottleneck in high-mix precision production, especially when batches are small and geometry changes often.',
    bestFor: ['CMM departments', 'Tool and mould quality control', 'Automated electrode/workpiece inspection'],
    capabilities: ['STEP solid import', 'Visual CAD programming of measurement cycles', 'Geometry and surface measurement', 'Graphical error reporting', 'Electrode/workpiece preset and quality-control modules'],
    outcomes: ['Faster CMM programming', 'More automated inspection', 'Reduced measurement bottleneck'],
    integration: ['Zeiss', 'Mitutoyo', 'Leitz', 'Wenzel', 'Coord3', 'Hexagon', 'Renishaw', 'PC-DMIS-related environments'],
    source: 'https://en.pcam.com/portfolio/pcammms/'
  }
];

export const productBySlug = Object.fromEntries(products.map((product) => [product.slug, product])) as Record<string, Product>;
