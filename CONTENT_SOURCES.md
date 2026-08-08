# PCam redesign — content provenance

This prototype uses the current English PCam website as factual source material, but **does not reproduce the old information architecture**. Copy has been rewritten around buyer problems, engineering architecture, evidence and customer tasks.

## Primary public sources

- Home / positioning: https://en.pcam.com/
- Industry 4.0: https://en.pcam.com/industry-4-0/
- MES hub: https://en.pcam.com/mes/
- Robotic systems: https://en.pcam.com/robotic-systems/
- CAD/CAM hub: https://en.pcam.com/cad-cam/
- About: https://en.pcam.com/about-us/
- Company history: https://en.pcam.com/our-story/
- Partners: https://en.pcam.com/pcam-partner/
- Partner resources: https://en.pcam.com/partners-resources/
- Support: https://en.pcam.com/support/

## Product sources

Each product record in `src/data/products.ts` contains its current source URL. Main sources include:

- PCamMES: https://en.pcam.com/portfolio/pcammes/
- PCamPPS: https://en.pcam.com/portfolio/pcampps/
- PCamMonitor: https://en.pcam.com/portfolio/pcammonitor/
- PCamIoT: https://en.pcam.com/portfolio/pcamiot/
- PCamToolManager: https://en.pcam.com/portfolio/pcamtoolmanager/
- PCamCell: https://en.pcam.com/portfolio/pcamcell/
- PCamJobManager: https://en.pcam.com/portfolio/pcamjobmanager/
- PCamWSM: https://en.pcam.com/portfolio/pcamwsm/
- PCamRoboCube: https://en.pcam.com/portfolio/pcamrobocube/
- PCamFMC: https://en.pcam.com/portfolio/pcamfmc/
- PCamFMC2: https://en.pcam.com/portfolio/pcamfmc2/
- PCamLinear: https://en.pcam.com/portfolio/pcamlinear/
- PCamGantry: https://en.pcam.com/portfolio/pcamgantry/
- PCamHeavy: https://en.pcam.com/portfolio/pcamheavy/
- PCamCobot: https://en.pcam.com/portfolio/pcamcobot/
- PCamAGV: https://en.pcam.com/portfolio/pcamagv/
- PCamCube / MiniCube: https://en.pcam.com/portfolio/pcamminicube/
- PCamWire: https://en.pcam.com/portfolio/pcamwire/
- PCamDieSink: https://en.pcam.com/portfolio/pcamdiesink/
- PCamMMS: https://en.pcam.com/portfolio/pcammms/

## Customer evidence

The current PCam reference pages supply the customer names, quotations and reported outcomes represented in `src/data/stories.ts`. Important sources include:

- PCamGantry references: https://en.pcam.com/portfolio/pcamgantry-references/
- PCamMES references: https://en.pcam.com/portfolio/pcammes-references/
- PCamMonitor references: https://en.pcam.com/portfolio/pcammonitor-references/
- PCamDieSink references: https://en.pcam.com/portfolio/pcamdiesink-references/
- PCamCell references: https://en.pcam.com/portfolio/pcamcell-references/
- PCamWire references: https://en.pcam.com/portfolio/pcamwire-references/
- PCamToolManager references: https://en.pcam.com/portfolio/pcamtoolmanager-references/

Customer-result pages in this prototype intentionally distinguish reported evidence from missing implementation detail. Do not fill the missing details from assumption.

## Media provenance

- Official logo: current PCam WordPress upload, bundled in `public/brand/`.
- Company bear visual: current PCam WordPress upload, bundled in `public/media/company/`.
- PCamFMC2 project rendering: current PCam WordPress upload, bundled in `public/media/products/pcamfmc2.webp`.
- Protected product images: mapped in `src/data/media.json` from the current `https://en.pcam.com/images/Module...` routes. Run `npm run media:sync` locally to retrieve them with read-only GET requests.
- Video delivery: current site uses Cloudflare Stream. Existing UIDs should be imported rather than re-encoding/re-uploading video by default.

## Editorial policy for the redesign

The following are redesign/editorial framing, not quotations from the legacy site:

- organization by Solutions and Applications;
- emphasis on productive/unattended hours as the commercial outcome;
- separation of prospective-customer navigation from customer support;
- engineering knowledge articles;
- structured case-study model;
- Partner Area and customer-service UI mockups.

These are design decisions intended to make the existing PCam knowledge and evidence easier to understand and act on.
