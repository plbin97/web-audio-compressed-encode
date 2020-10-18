import loadStuffsToWindowWhileClickingStart from "./loadStuffsToWindowWhileClickingStart";
import Audio from "./audio";
import setAlert from "./setAlert";
import PcmOscilloscope from "./pcmOscilloscope";
import {encoder, decoder} from "../compressor";
import {bufferSize, oscilloscopeDisplayDefault} from "../config";


import compressorTesting from "./compressorTesting";

let refreshButton = document.getElementById("refreshButton");
let compressorSwitch = document.getElementById("compressorSwitch");
let testSwitch = document.getElementById("testingSwitch");
let waveAmplifierRange = document.getElementById("waveAmplifierRange");
let oscilloscopeDisplaySwitch = document.getElementById("oscilloscopeDisplaySwitch");
let compressionRateDisplay = document.getElementById("compressionRateNumber");

let compressorTestingFinished = false;
let testStarted = false;
let compressorEnabled = false;
let pcmDisplaySwitch = oscilloscopeDisplayDefault;
let audio;
let pcmOscilloscopeOrigin;
let pcmOscilloscopeCompressor;
let compressionRate = 0;

/**
 * Run after the page loaded
 * @returns {Promise<void>}
 */
let page = async () => {
    refreshButton.onclick = () => {
        window.location.reload();
    };
    testSwitch.onclick = testSwitchOnclick;
    compressorSwitch.onclick = compressorSwitchOnClick;
    setAlert(3,"Testing your compressor's code, please wait");
    oscilloscopeDisplaySwitch.onclick = oscilloscopeSwitchOnclick;
    pcmOscilloscopeCompressor = new PcmOscilloscope(document.getElementById("pcmOscilloscopeCompressor"));
    pcmOscilloscopeOrigin = new PcmOscilloscope(document.getElementById("pcmOscilloscopeOrigin"));
    waveAmplifierRange.onmousemove = waveAmplifierRangeMove;

    setInterval(() => {
        compressionRateDisplay.innerText = (Math.round(compressionRate * 10000000) / 10000000).toString();
    },1000)

    setTimeout(() => {
        // Testing Time out
        if (!compressorTestingFinished) {
            setAlert(3,"Testing your compressor's code timeout. Please review your code")
        }
    },2000);
    if (await compressorTesting()) {
        testSwitch.disabled = false;
    }

    compressorTestingFinished = true;
};

/**
 * Event when changing the wave amplifier
 */
let waveAmplifierRangeMove = () => {
    pcmOscilloscopeOrigin.changeAmplifier(Number(waveAmplifierRange.value));
    pcmOscilloscopeCompressor.changeAmplifier(Number(waveAmplifierRange.value));
};

/**
 * Event when clicking the Oscilloscope Display switch
 */
let oscilloscopeSwitchOnclick = () => {
    pcmDisplaySwitch = !pcmDisplaySwitch;
    pcmOscilloscopeOrigin.clean();
    pcmOscilloscopeOrigin.renderToElement();
    pcmOscilloscopeCompressor.clean();
    pcmOscilloscopeCompressor.renderToElement();
}

/**
 * Event After clicking on compressor switch
 */
let compressorSwitchOnClick = () => {
    if (compressorEnabled) {
        compressorSwitch.innerText = "Compressor disabled";
    }else {
        compressorSwitch.innerText = "Compressor enabled";
    }
    compressorEnabled = !compressorEnabled;
};

/**
 * Event on clicking the Start switch
 * @returns {Promise<void>}
 */
let testSwitchOnclick = async () => {
    if (testStarted) {
        await audio.recordPause();
        pcmOscilloscopeOrigin.clean();
        pcmOscilloscopeCompressor.clean();
        testSwitch.innerText = "Start";
        testStarted = false;
    } else {
        audio = new Audio();
        setAlert(2, "Please allow this website to use your microphone");
        await loadStuffsToWindowWhileClickingStart();
        if (!await audio.webAudioRecordInitialize()) {
            setAlert(3, "Error while initializing audio record, please take a look at console");
            return;
        }
        setAlert(1, "You are good to make some voice");


        await audio.PCMRecordHandler(onPcmHandler);
        testSwitch.innerText = "Stop";
        testStarted = true;
    }
};

let playing = false;

let onPcmHandler = async (audioBuffer) => {
    if (pcmDisplaySwitch) {
        pcmOscilloscopeOrigin.addSoundElement(audioBuffer.getChannelData(0));
        pcmOscilloscopeOrigin.renderToElement();
    }
    if (compressorEnabled) {
        let blob = await encoder(audioBuffer);
        let newAudioBuffer = await decoder(blob);
        let blobSize = blob.size;
        compressionRate = blobSize / (bufferSize * 4);
        if (pcmDisplaySwitch) {
            pcmOscilloscopeCompressor.addSoundElement(newAudioBuffer.getChannelData(0));
            pcmOscilloscopeCompressor.renderToElement();
        }

        await audio.playPCM(newAudioBuffer);
    } else {
        if (playing) {
            console.log("playing");
        }
        playing = true;
        await audio.playPCM(audioBuffer);
        playing = false;
    }
};

export default page;