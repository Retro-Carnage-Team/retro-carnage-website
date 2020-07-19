import { Directions } from "./engine/Directions";
import Rectangle from "./engine/Rectangle";

import {
  MUSIC_BACKGROUND_1,
  MUSIC_BACKGROUND_10,
  MUSIC_BACKGROUND_11,
  MUSIC_BACKGROUND_12,
  MUSIC_BACKGROUND_2,
  MUSIC_BACKGROUND_3,
  MUSIC_BACKGROUND_4,
  MUSIC_BACKGROUND_5,
  MUSIC_BACKGROUND_6,
  MUSIC_BACKGROUND_7,
  MUSIC_BACKGROUND_8,
  MUSIC_BACKGROUND_9,
} from "./SoundBoard";

export interface Location {
  latitude: number;
  longitude: number;
}

export interface Segment {
  backgrounds: string[];
  direction: Directions;
  enemies: any[];
  goal: Rectangle | null;
  obstacles: any[];
}

export interface Mission {
  briefing: string;
  client: string;
  location: Location;
  music: string;
  name: string;
  reward: number;
  segments: Segment[];
}

const Missions: Mission[] = [
  {
    briefing:
      "I am Berlin's hottest influencer. 30.000 followers on Insta alone - and that's not even counting Youtube and Twitter. My biggest competitor is envious and spreads the rumour that I am not vegan. Take out my competitor - for $10.000.",
    client: "images/tiles/clients/angry-beard-blur-close-up.jpg",
    location: {
      latitude: 165,
      longitude: 677,
    },
    music: MUSIC_BACKGROUND_1,
    name: "Berlin",
    reward: 10000,
    segments: [
      {
        backgrounds: [
          "bg-dummy-1.jpg",
          "bg-dummy-2.jpg",
          "bg-dummy-3.jpg",
          "bg-dummy-1.jpg",
          "bg-dummy-2.jpg",
        ],
        direction: Directions.Up,
        enemies: [],
        goal: null,
        obstacles: [],
      },
      {
        backgrounds: [
          "bg-dummy-2.jpg",
          "bg-dummy-3.jpg",
          "bg-dummy-1.jpg",
          "bg-dummy-2.jpg",
          "bg-dummy-3.jpg",
        ],
        direction: Directions.Left,
        enemies: [],
        goal: new Rectangle(-5800, 200, 200, 200),
        obstacles: [],
      },
    ],
  },
  {
    briefing:
      "My name is Dr. Valentin Pillmann. I have spent most of my life in the ... Zone ... and risked a lot to get hold of a valuable artifact called Nightstar. Bandits robbed me and stole it from me. Get the artifact back and you'll get $8,000.",
    client: "images/tiles/clients/adult-aged-black-and-white-close-up.jpg",
    location: {
      latitude: 158,
      longitude: 713,
    },
    music: MUSIC_BACKGROUND_2,
    name: "Minsk",
    reward: 8000,
    segments: [],
  },
  {
    briefing:
      "The government has arrested my brother, who worked as a reporter for a foreign news agency. They accuse him of aiding and abetting terrorists. Free my brother from the government prison and get him out of the country safely and you'll get $8,000.",
    client: "images/tiles/clients/woman-wearing-black-long-sleeved-shirt.jpg",
    location: {
      latitude: 213,
      longitude: 734,
    },
    music: MUSIC_BACKGROUND_3,
    name: "Istanbul",
    reward: 8000,
    segments: [],
  },
  {
    briefing:
      "The leader of a local rebel organization bought missiles from me to enforce his legitimate interests. During the handover, special forces of an international military alliance appeared and confiscated the weapons. Return the missiles to my client to restore my reputation. I'll pay you $12,000.",
    client:
      "images/tiles/clients/bald-man-with-a-serious-facial-expression.jpg",
    location: {
      latitude: 249,
      longitude: 684,
    },
    music: MUSIC_BACKGROUND_4,
    name: "Tripolis",
    reward: 12000,
    segments: [],
  },
  {
    briefing:
      "The situation in the city is dramatic. Terrorists, mercenaries and military of different nations are fighting a bloody battle for every square foot. The few remaining civilians are living through hell. You must put an end to this! Become the righteous hand of God and solve the conflict in you own way. We pay $15,000.",
    client: "images/tiles/clients/close-up-photo-of-man-s-face.jpg",
    location: {
      latitude: 384,
      longitude: 800,
    },
    music: MUSIC_BACKGROUND_5,
    name: "Mogadischu",
    reward: 15000,
    segments: [],
  },
  {
    briefing:
      "Corrupt policemen have been confiscating all the medicines I need to treat my patients for months. We can buy the drugs from them at ten times the price. Many families cannot afford this and we have many deaths to mourn. Put an end to this unholy activity! I'll pay $11,000.",
    client: "images/tiles/clients/man-sitting-near-purple-wall.jpg",
    location: {
      latitude: 311,
      longitude: 895,
    },
    music: MUSIC_BACKGROUND_6,
    name: "Mumbai",
    reward: 11000,
    segments: [],
  },
  {
    briefing:
      "The terrorists in the south of the country were always good customers of mine and bought my latest weapons. But now they are becoming a pain in the ass: bad payment practices, threats, no manners. Show them that such behaviour will not be tolerated by killing the leader's son. I pay $10,000.",
    client:
      "images/tiles/clients/man-in-brown-coat-and-gray-button-up-shirt.jpg",
    location: {
      latitude: 199,
      longitude: 871,
    },
    music: MUSIC_BACKGROUND_7,
    name: "Bischkek",
    reward: 5000,
    segments: [],
  },
  {
    briefing:
      "I am a preacher for a christian community in Colorado. We help our fellow believers, the Karen people of Myanmar, with Bibles and medicine. Unfortunately, we also need your help to protect the Karen against the local military. My community will pay you $10,000 for your services.",
    client: "images/tiles/clients/man-in-black-shirt.jpg",
    location: {
      latitude: 312,
      longitude: 973,
    },
    music: MUSIC_BACKGROUND_8,
    name: "Myanmar",
    reward: 10000,
    segments: [],
  },
  {
    briefing:
      "A clan of criminals has taken control of the underworld of Ho Chi Minh City in a bloody conflict. The clan members will stop at nothing to extort money from the little people. We need your help! You must finish off the head of the clan. For that, you'll get $8,000.",
    client: "images/tiles/clients/adult-aged-beard-elder.jpg",
    location: {
      latitude: 338,
      longitude: 1018,
    },
    music: MUSIC_BACKGROUND_9,
    name: "Ho-Chi-Minh City",
    reward: 8000,
    segments: [],
  },
  {
    briefing:
      "My father worked as a professor at the University of Mexico City. Last year he and his students were kidnapped, murdered and buried in the desert by the Sinaloa Cartel. Since that incident, my family has had no rest. Avenge my father by eliminating the leader of the cartel. We will pay you $12,000.",
    client: "images/tiles/clients/photo-of-girl-wearing-brown-shirt.jpg",
    location: {
      latitude: 299,
      longitude: 295,
    },
    music: MUSIC_BACKGROUND_10,
    name: "Mexico City",
    reward: 12000,
    segments: [],
  },
  {
    briefing:
      "An unscrupulous investment swindler has cheated hundreds of people out of their savings. People are desperate. The con man escaped to Texas, where he hid out on a ranch under the protection of a private army. Take out the impostor and his henchmen. We'll pay you a bounty of $9,000.",
    client: "images/tiles/clients/man-wearing-blue-crew-neck-t-shirt.jpg",
    location: {
      latitude: 257,
      longitude: 309,
    },
    music: MUSIC_BACKGROUND_11,
    name: "San Antonio",
    reward: 9000,
    segments: [],
  },
  {
    briefing:
      "I was once a successful .com entrepreneur and retired to the Amazon jungle many years ago I. Actually everything is really cool here. But the last few months, another hermit named Bruce Banner has been bugging me. Solve this problem for me and I'll pay you $10,000.",
    client:
      "images/tiles/clients/man-wearing-black-sunglasses-and-black-beanie.jpg",
    location: {
      latitude: 398,
      longitude: 412,
    },
    music: MUSIC_BACKGROUND_12,
    name: "Amazonas",
    reward: 5000,
    segments: [],
  },
];

export default Missions;
