export interface VideoEntry {
  title: string;
  uid?: string;
  product?: string;
  poster?: string;
  source?: string;
}

export const cloudflareCustomer = 'customer-ewodpx21kb45d42t';

// Import UID values from the existing WordPress network option `pcam_cf_uid_map`
// and static basename map. The layout already renders the real Cloudflare Stream
// player as soon as a UID is present.
export const videos: VideoEntry[] = [
  { title: 'Integrated automation overview', product: 'Automation', source: 'https://en.pcam.com/robotic-systems/' },
  { title: 'PCamMES production execution', product: 'PCamMES', source: 'https://en.pcam.com/portfolio/pcammes/' },
  { title: 'PCamRoboCube cell automation', product: 'PCamRoboCube', source: 'https://en.pcam.com/portfolio/pcamrobocube/' },
  { title: 'PCamGantry multi-machine automation', product: 'PCamGantry', source: 'https://en.pcam.com/portfolio/pcamgantry/' },
  { title: 'PCamFMC flexible manufacturing cell', product: 'PCamFMC', source: 'https://en.pcam.com/portfolio/pcamfmc/' },
  { title: 'PCamFMC2 automation system', product: 'PCamFMC2', source: 'https://en.pcam.com/portfolio/pcamfmc2/' },
  { title: 'PCamWire EDM programming', product: 'PCamWire', source: 'https://en.pcam.com/portfolio/pcamwire/' },
  { title: 'PCamMMS measurement workflow', product: 'PCamMMS', source: 'https://en.pcam.com/portfolio/pcammms/' }
];

export const streamIframe = (uid: string) => `https://${cloudflareCustomer}.cloudflarestream.com/${uid}/iframe`;
