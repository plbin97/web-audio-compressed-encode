import {encoder, decoder} from "../../compressor";
import Timer from "../timer";
import setAlert from "../setAlert";
import sampleAudioBufferGenerator from "./sampleAudioBufferGenerator";

let compressorTesting = async () => {
    let sampleAudioBuffer = sampleAudioBufferGenerator();
    let compressedAudioBuffer;
    let timer = new Timer();
    let timerResult;
    try {
        timer.start();
        let compressedBlob = await encoder(sampleAudioBuffer);
        if (compressedBlob.constructor.name !== "Blob") {
            throw "Error: Your encoder should return a blob";
        }
        compressedAudioBuffer = await decoder(compressedBlob);
        if (compressedAudioBuffer.constructor.name !== "AudioBuffer") {
            throw "Error: Your decoder should return an audioBuffer";
        }
        timerResult = timer.stop();
    }catch (e) {
        setAlert(3, "Some error happened in your compressor, please take a look at web console for more detail");
        console.log(e);
        return false;
    }
    if (timerResult > 1000) {
        console.log("Warning, the encoder and decoder spend more than 1 second to finish 1 second sample audio; it may cause some delay problems")
    }
    setAlert(1, "Compressor testing passed, it takes " + timerResult + " ms to finished the encode and decode test for 1 second sample; Your are ready to start");
    return true;

};


export default compressorTesting;