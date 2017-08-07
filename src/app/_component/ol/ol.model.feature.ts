export class TurfVM {
    constructor(
        public features: FeatureVM[]
    ) { }
   
}

export class FeatureVM {
    constructor(
        public turfId: number,
        public name: string,
        public polygon: string
    ) { }
}