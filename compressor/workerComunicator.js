import EncoderWorker from './encoder.worker.js';
import DecoderWorker from './decoder.worker.js';


let encoderWorker = new EncoderWorker();
let decoderWorker = new DecoderWorker();


export let audioEncode = (floatArray) => {
    return new Promise((resolve) => {
        encoderWorker.postMessage(floatArray);
        encoderWorker.onmessage = (event) => {
            resolve(event.data);
        };
    })
}

export let audioDecode = (blob) => {
    return new Promise((resolve) => {
        decoderWorker.postMessage(blob);
        decoderWorker.onmessage = (event) => {
            resolve(event.data);
        }
    })
}