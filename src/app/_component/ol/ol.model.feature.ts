export class TurfVM {
    constructor(
        public features: FeatureVM[]
    ) { }
   
}

export class FeatureVM {
    constructor(
        public turfId: number,
        public name: string,
        public type: number,  // address, turf etc.
        public polygonWKT: string,
        public polygonGeoJson: string
    ) { }
}