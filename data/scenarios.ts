// 10 hardcoded scenarios with initial bag composition and mid-round shock
export interface Scenario {
  id: string;
  initialRed: number;
  initialBlue: number;
  capital: number;
  shockRound: number; // which round the shock happens (0 = no shock)
  shockText: string;
  shockNewRed?: number;
  shockNewBlue?: number;
}

export const scenarios: Scenario[] = [
  {
    id: 'S1',
    initialRed: 3,
    initialBlue: 2,
    capital: 100000,
    shockRound: 0,
    shockText: '',
  },
  {
    id: 'S2',
    initialRed: 4,
    initialBlue: 1,
    capital: 100000,
    shockRound: 0,
    shockText: '',
  },
  {
    id: 'S3',
    initialRed: 2,
    initialBlue: 3,
    capital: 100000,
    shockRound: 3,
    shockText: 'I drew a Red ball and discarded it.',
    shockNewRed: 1,
    shockNewBlue: 3,
  },
  {
    id: 'S4',
    initialRed: 5,
    initialBlue: 0,
    capital: 100000,
    shockRound: 0,
    shockText: '',
  },
  {
    id: 'S5',
    initialRed: 0,
    initialBlue: 5,
    capital: 100000,
    shockRound: 0,
    shockText: '',
  },
  {
    id: 'S6',
    initialRed: 3,
    initialBlue: 3,
    capital: 100000,
    shockRound: 3,
    shockText: 'I added 1 Red ball to the bag.',
    shockNewRed: 4,
    shockNewBlue: 3,
  },
  {
    id: 'S7',
    initialRed: 2,
    initialBlue: 4,
    capital: 100000,
    shockRound: 0,
    shockText: '',
  },
  {
    id: 'S8',
    initialRed: 4,
    initialBlue: 2,
    capital: 100000,
    shockRound: 3,
    shockText: 'I drew a Blue ball and discarded it.',
    shockNewRed: 4,
    shockNewBlue: 1,
  },
  {
    id: 'S9',
    initialRed: 1,
    initialBlue: 4,
    capital: 100000,
    shockRound: 0,
    shockText: '',
  },
  {
    id: 'S10',
    initialRed: 3,
    initialBlue: 4,
    capital: 100000,
    shockRound: 3,
    shockText: 'I added 1 Blue ball to the bag.',
    shockNewRed: 3,
    shockNewBlue: 5,
  },
];

/**
 * Get a random scenario for a session.
 */
export function getRandomScenario(): Scenario {
  return scenarios[Math.floor(Math.random() * scenarios.length)];
}

/**
 * Get scenario by ID.
 */
export function getScenarioById(id: string): Scenario | undefined {
  return scenarios.find((s) => s.id === id);
}

/**
 * Calculate true probability (frequentist).
 */
export function calculateTrueProb(red: number, blue: number): number {
  if (red + blue === 0) return 50;
  return Math.round((red / (red + blue)) * 100);
}
