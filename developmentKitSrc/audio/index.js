import {bufferSize} from "../../config";

class Audio {

    constructor() {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext);
    }

    /**
     * Get media stream
     * @returns {Promise<boolean>}
     * return true if we get media stream without error
     */
    async webAudioRecordInitialize() {
        let mediaStream = await window.navigator.mediaDevices.getUserMedia({
            audio: {
                noiseSuppression: true,
                echoCancellation: true,
                autoGainControl: true
            }
        }).catch(err => {
            console.log(err);
        });
        if (mediaStream === undefined) {
            return false;
        }
        this.mediaStream = mediaStream;
        return true;
    }

    async PCMRecordHandler(functionForPCMHandler) {
        this.mediaNode = this.audioContext.createMediaStreamSource(this.mediaStream);
        let jsNodeCreater = this.audioContext.createScriptProcessor.bind(this.audioContext);
        this.jsNode = jsNodeCreater(bufferSize, 1, 1);
        this.jsNode.connect(this.audioContext.destination);
        this.mediaNode.connect(this.jsNode);
        this.jsNode.onaudioprocess = (event) => {
            functionForPCMHandler(event.inputBuffer);
        };
    }

    async recordPause() {
        let tracks = this.mediaStream.getTracks();
        tracks.forEach((track) => {
            track.stop();
        });
        this.jsNode.disconnect();
        this.mediaNode.disconnect();
    }

    async playPCM(audioBuffer) {
        let source = this.audioContext.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(this.audioContext.destination);
        source.start()
    }

}

export default Audio;