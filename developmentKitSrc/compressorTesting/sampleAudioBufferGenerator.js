/**
 * Generate a random 1 second audioBuffer
 * @returns {AudioBuffer}
 */
let sampleAudioBufferGenerator = () => {
    let audioContext = new (window.AudioContext || window.webkitAudioContext);
    let sampleRate = audioContext.sampleRate;
    let sampleAudioBuffer = audioContext.createBuffer(1, sampleRate, sampleRate);

    let channelData = sampleAudioBuffer.getChannelData(0);

    for (let i = 0; i < sampleRate; i ++) {
        channelData[i] = Math.random() * 2 - 1;
    }

    return sampleAudioBuffer;

};

export default sampleAudioBufferGenerator;