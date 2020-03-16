/**
 * For calculate the loudness of channelData in an audioBuffer.
 * @param channelData {array}
 * @returns {number}
 *      Range between 0 to 1
 */
let loudnessCalculator = (channelData) => {
    let sumLoudness = 0;
    let numOfLoudnessCounted = 0;
    let lengthOfChannelData = channelData.length;
    let isInclining = channelData[0] < channelData[1];

    let previousTurningPoint = channelData[0];
    let flag = 1;
    let notEnd = () => {
        return flag < lengthOfChannelData;
    };
    while (notEnd()) {
        let isPositiveSlop = () => {
            return channelData[flag] < channelData[flag + 1];
        };
        while ((isPositiveSlop() === isInclining) && notEnd()) {
            flag++;
        }
        if (notEnd()) {
            sumLoudness += Math.abs(channelData[flag] - previousTurningPoint);
            numOfLoudnessCounted ++;
            previousTurningPoint = channelData[flag];
            flag ++;
            isInclining = !isInclining;
        }
    }

    return (sumLoudness / numOfLoudnessCounted) / 2;

};

export default loudnessCalculator;