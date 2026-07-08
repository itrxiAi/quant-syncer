export declare const Asset: {
    readonly ashare: "ashare";
    readonly crypto: "crypto";
};
export type Asset = (typeof Asset)[keyof typeof Asset];
export declare const Freq: {
    readonly d1: "d1";
    readonly m5: "m5";
    readonly m15: "m15";
    readonly h1: "h1";
    readonly h4: "h4";
};
export type Freq = (typeof Freq)[keyof typeof Freq];
