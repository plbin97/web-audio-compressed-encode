import {bufferSize} from "../config";
let audioContext = new (window.AudioContext || window.webkitAudioContext);
let createAudioBufferByArrayBuffer = (arrayBuffer, sampleRate) => {
    let audioBuffer = audioContext.createBuffer(1, bufferSize, sampleRate);
    audioBuffer.copyToChannel(arrayBuffer, 0,0);
    return audioBuffer;
};

export default createAudioBufferByArrayBuffer;