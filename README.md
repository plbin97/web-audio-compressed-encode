# web-audio-compressed-encode

#### An audio compressor/encoder for web voice chat

#### it is also a well developed SDK for developing web audio compressor/encoder development

You can develop and test your compressor here

## Scripts

##### `npm start`

###### start the sdk environment. 
###### Your browser would be automatically opened. 

## Instruction
* Run `npm install` first, then run `npm start`. 
* Your Compressor source code should be located in `/compressorSrc/` directory. 
* In `/compressorSrc/index.js`, you suppose to export a encoder and a decoder function. 
    * For more details, just look at that file. 

* After you start the SDK
    * I recommend you to use the latest version of Chrome or Firefox to run this page. 
    
    * Your source code would be auto compile once you save; in the meantime the page would be auto-refresh. 
   
    * An compressor test would automatically be execute after the page refreshed. 
    
    * Gear up your earphone/headphone and your microphone first, then click Start button to start. You would hear the voice from your microphone.
     
    * By clicking on the white button `Compressor disabled`, the compressor would be applied. 
    
    * The sound would go through: `Your microphone` -> `Your Encoder` -> `Your decoder` -> `Your Sound device`. 
    
    * By Comparing your original voice with the compressed voice, you can tangle the compressor button. 
    
    * Basic PCM Oscilloscope is available. 
    
    * You can using the `Wave Amplifier` at the right top of the page to control the wave on the graph. 