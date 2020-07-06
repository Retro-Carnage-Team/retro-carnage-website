export interface Grenade {
  description: string;
  explosive: string;
  image: string;
  imageRotated: string;
  maxCount: number;
  name: string;
  packageSize: number;
  price: number;
  radius: number;
  range: number;
  speed: number;
  weight: string;
}

export const Grenades: Grenade[] = [{
  description: 'The DM41 is a fragmentation hand grenade and based on the US-American M26A2 hand grenade with fuse M215. The M26 entered service around 1952 and was used in combat during the Korean War. Its distinct lemon shape led it to being nicknamed the "lemon grenade" (compare the Russian F1 grenade and American Mk 2 "pineapple" grenade, with similar nicknames). Fragmentation is enhanced by a special pre-notched fragmentation coil that lies along the inside of the grenade\'s body. This coil had a circular cross-section in the M26 grenade and an improved square cross-section in the M26A1 and later designs.',
  explosive: '150 g',
  image: 'images/tiles/weapons/DM41.png',
  imageRotated: 'images/tiles/weapons/DM41-r.png',
  maxCount: 100,
  name: 'DM41',
  packageSize: 5,
  price: 500,
  radius: 0,
  range: 550,
  speed: 0.85,
  weight: '0.450 kg'
}, {
  description: 'The Stielhandgranate (German for "stick hand grenade") was a German hand grenade of unique design. It was the standard issue of the German Empire during World War I, and became the widespread issue of Nazi Germany\'s Wehrmacht during World War II. The very distinctive appearance led to it being called a "stick grenade", or "potato masher" in British Army slang, and is today one of the most easily recognized infantry weapons of the 20th century.',
  explosive: '170 g',
  image: 'images/tiles/weapons/M24.png',
  imageRotated: 'images/tiles/weapons/M24-r.png',
  maxCount: 100,
  name: 'Stielhandgranate 24',
  packageSize: 5,
  price: 600,
  radius: 0,
  range: 650,
  speed: 0.95,
  weight: '0.595 kg'
}];
