onmessage = async (event) => {
    let floatArr = event.data;
    let arrLen = floatArr.length / 2;
    let newIntArr = new Int16Array(arrLen);
    for (let i = 0;i < arrLen; i++) {
        newIntArr[i] = floatArr[i * 2] * 32767;
    }
    let newBlob = new Blob([newIntArr]);
    // You have to return a blob object in the encoder
    postMessage(newBlob);
}