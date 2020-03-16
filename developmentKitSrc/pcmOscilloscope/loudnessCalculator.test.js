import loudnessCalculator from "./loudnessCalculator";
let testChannelData = [0.1,0.3,0.5,0.7,0.2,-0.4,-0.5,-0.2,0.4,0.5,0.2,-0.3,0.5,-0.5,-0.6];
let testChannelDataLoudness = 0.44;

test("loudnessCalculator test", () => {
    expect(Number(loudnessCalculator(testChannelData).toPrecision(2))).toBe(testChannelDataLoudness);
});