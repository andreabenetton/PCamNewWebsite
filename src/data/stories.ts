export interface Story {
  slug: string;
  company: string;
  metric: string;
  headline: string;
  quote?: string;
  context: string;
  products: string[];
  source: string;
}

export const stories: Story[] = [
  {
    slug: 'toolcraft-spindle-hours', company: 'Toolcraft AG', metric: '7,200+',
    headline: 'Annual spindle hours per machine in a compact automated layout',
    quote: 'Each machine is producing over 7200 spindle hours annually.',
    context: 'PCam reports an installation automating two Hermle C32 machines in 90 m² with 300 centralized HSK 63 tools.',
    products: ['PCamGantry', 'PCamFMC', 'PCamCell'],
    source: 'https://en.pcam.com/portfolio/pcamgantry-references/'
  },
  {
    slug: 'vetimec-utilization', company: 'Vetimec Soc. Coop.', metric: '25% → 65%',
    headline: 'Spindle utilization improvement reported during Industry 4.0 transition',
    quote: 'From 25% of spindle use ... to 65% ... in automatic.',
    context: 'The customer describes moving from three machines at low utilization to ten machines operating automatically with two people on one shift.',
    products: ['PCamMES', 'PCamMonitor', 'PCamCell'],
    source: 'https://en.pcam.com/portfolio/pcammes-references/'
  },
  {
    slug: 'braunform-diesink', company: 'Braunform GmbH', metric: '+30%',
    headline: 'Productivity increase reported for automatic die-sink programming',
    quote: 'Increase the productivity of the department by 30%.',
    context: 'The reference links automatic die-sink machine programming to a reported productivity improvement in the department.',
    products: ['PCamDieSink', 'PCamCell'],
    source: 'https://en.pcam.com/portfolio/pcamdiesink-references/'
  },
  {
    slug: 'sfs-monitoring', company: 'SFS Group Schweiz AG', metric: '40 CNC',
    headline: 'One monitoring environment across 40 erosion machines',
    quote: 'We can monitor 40 CNC erosion machines and keep our production under control.',
    context: 'A useful proof point for heterogeneous machine monitoring and centralized operational visibility.',
    products: ['PCamMonitor', 'PCamMMS'],
    source: 'https://en.pcam.com/portfolio/pcammonitor-references/'
  },
  {
    slug: 'radar-machine-hours', company: 'Radar Leather Division S.r.l.', metric: '2×',
    headline: 'Machine hours doubled',
    quote: 'Doubled the machine hours.',
    context: 'A concise customer outcome associated with PCam digital-production and automation solutions.',
    products: ['PCamMES', 'PCamMonitor', 'PCamRoboCube'],
    source: 'https://en.pcam.com/portfolio/pcammes-references/'
  },
  {
    slug: 'gewo-erp-automation', company: 'GEWO Feinmechanik GmbH & Co. KG', metric: 'ERP → automation',
    headline: 'Automated production initiated from the ERP workflow',
    quote: 'Produce automatically starting from our ERP system.',
    context: 'The reference illustrates vertical integration from business planning into automated shop-floor execution.',
    products: ['PCamPPS', 'PCamMES', 'PCamFMC2'],
    source: 'https://en.pcam.com/portfolio/pcamfmc2-references/'
  }
];
