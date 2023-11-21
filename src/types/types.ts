

export enum PlayerType {
   First,
   Second
}

export interface Results {
   winner: PlayerType,
   totalListedCities: number,
   lastCity: string
}