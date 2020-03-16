import {encoder, decoder} from "../compressorSrc";

onmessage = async (event) => {
    let blob = await encoder(event.data);
    let newArrayBuffer = await decoder(blob);
    postMessage(newArrayBuffer);
};