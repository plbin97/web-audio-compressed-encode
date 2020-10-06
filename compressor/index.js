import createAudioBufferByArrayBuffer from "../lib/createAudioBufferByArrayBuffer";
import {audioEncode, audioDecode} from "./workerComunicator";
/**
 * There is a library you can use: createAudioBufferByArrayBuffer
 */


/**
 * Compressor encoder
 * @param audioBuffer
 * @returns {Promise<Blob>}
 */
let encoder = async (audioBuffer) => {
    let arrayBuffer = audioBuffer.getChannelData(0);
    let newBlob = await audioEncode(arrayBuffer);
    return newBlob;
};

/**
 * Compressor Decoder
 * @param blob
 * @returns {Promise<AudioBuffer>}
 */
let decoder = async (blob) => {

    let floatArr = await audioDecode(blob);

    let audioBuffer = createAudioBufferByArrayBuffer(floatArr, 22050);
    // You have to return an audioBuffer object in the decoder
    return audioBuffer;
};

export {encoder,decoder};