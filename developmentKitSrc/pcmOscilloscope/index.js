import loudnessCalculator from "./loudnessCalculator";
class PcmOscilloscope {
    constructor(oscilloscopeElement) {
        this.oscilloscopeElement = oscilloscopeElement;
        this.elementLoudness = [];
        this.waveAmplified = 1;
        this.numberOfOscillationElement = 0;
    }

    addSoundElement(channelArr) {
        if (this.numberOfOscillationElement === 100) {
            this.elementLoudness.pop();
            this.numberOfOscillationElement --;
        }
        this.elementLoudness.unshift(loudnessCalculator(channelArr));
        this.numberOfOscillationElement ++;
    }

    renderToElement(){
        let frag = document.createDocumentFragment();
        let right = 0;
        this.elementLoudness.forEach((loud) => {
            let newOscillationBox = document.createElement("div");
            newOscillationBox.className = "pcmOscilloscopeBox";
            let height = loud * 100 * this.waveAmplified;
            newOscillationBox.style.height = height + "%";
            newOscillationBox.style.right = right + "%";
            newOscillationBox.style.bottom = ((100 - height) / 2) + "%";
            frag.appendChild(newOscillationBox);
            right++
        });
        this.oscilloscopeElement.innerHTML = "";
        this.oscilloscopeElement.append(frag);
    }
    clean() {
        this.elementLoudness = [];
        this.numberOfOscillationElement = 0;
    }
    changeAmplifier(value) {
        this.waveAmplified = value;
    }
}

export default PcmOscilloscope;