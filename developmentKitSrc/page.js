import loadStuffsToWindowWhileClickingStart from "./loadStuffsToWindowWhileClickingStart";
import Audio from "./audio";
import setAlert from "./setAlert";
import PcmOscilloscope from "./pcmOscilloscope";
import {encoder, decoder} from "../compressorSrc";
import Worker from './compressor.worker.js';

import compressorTesting from "./compressorTesting";

let refreshButton = document.getElementById("refreshButton");
let compressorSwitch = document.getElementById("compressorSwitch");
let testSwitch = document.getElementById("testingSwitch");
let waveAmplifierRange = document.getElementById("waveAmplifierRange");

let compressorTestingFinished = false;
let testStarted = false;
let compressorEnabled = false;
let audio;
let pcmOscilloscopeOrigin;
let pcmOscilloscopeCompressor;

let compressorWorker;

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
    pcmOscilloscopeCompressor = new PcmOscilloscope(document.getElementById("pcmOscilloscopeCompressor"));
    pcmOscilloscopeOrigin = new PcmOscilloscope(document.getElementById("pcmOscilloscopeOrigin"));
    waveAmplifierRange.onmousemove = waveAmplifierRangeMove;
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
        compressorWorker = new Worker();
        setAlert(2, "Please allow this website to use your microphone");
        await loadStuffsToWindowWhileClickingStart();
        if (!await audio.webAudioRecordInitialize()) {
            setAlert(3, "Error while initializing audio record, please take a look at console");
            return;
        }
        setAlert(1, "You are good to make some voice");

        compressorWorker.onmessage = async (event) => {
            pcmOscilloscopeCompressor.addSoundElement(newAudioBuffer.getChannelData(0));
            pcmOscilloscopeCompressor.renderToElement();
            await audio.playPCM(event.data);
        };

        await audio.PCMRecordHandler(onPcmHandler);
        testSwitch.innerText = "Stop";
        testStarted = true;
    }
};

let onPcmHandler = async (audioBuffer) => {
    pcmOscilloscopeOrigin.addSoundElement(audioBuffer.getChannelData(0));
    pcmOscilloscopeOrigin.renderToElement();
    if (compressorEnabled) {
        compressorWorker.postMessage(audioBuffer);
        // let blob = await encoder(audioBuffer);
        // let newAudioBuffer = await decoder(blob);
        // pcmOscilloscopeCompressor.addSoundElement(newAudioBuffer.getChannelData(0));
        // pcmOscilloscopeCompressor.renderToElement();
        // await audio.playPCM(newAudioBuffer);
    } else {
        await audio.playPCM(audioBuffer);
    }
};

export default page;