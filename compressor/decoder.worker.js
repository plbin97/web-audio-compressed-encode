// onmessage = async (event) => {
//     let blob = event.data;
//     let array = await blob.arrayBuffer();
//     let intArray = new Int16Array(array);
//     let arrLen = intArray.length * 2;
//     let floatArr = new Float32Array(arrLen);
//     for (let i = 0;i < arrLen; i ++) {
//         if (i % 2 === 0) {
//             floatArr[i] = intArray[i / 2] / 32767;
//         } else {
//             let intValue = intArray[(i / 2) - 0.5];
//             floatArr[i] = intValue / 32767;
//         }
//     }
//     postMessage(floatArr);
// }

onmessage = async (event) => {
    let blob = event.data;
    let array = await blob.arrayBuffer();
    let intArray = new Int16Array(array);
    let arrLen = intArray.length;
    let floatArr = new Float32Array(arrLen);
    for (let i = 0;i < arrLen; i ++) {
        floatArr[i] = intArray[i] / 32767;
    }
    postMessage(floatArr);
}
