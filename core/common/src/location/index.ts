export interface Point {
  latitude: number;
  longitude: number;
}

export interface Location extends Point {
  address: string;
}

export interface PointOfInterest extends Location {
  name: string;
  description?: string;
}
