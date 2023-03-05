export function formatter (str, splitStr) {
    console.log('func formatter:' + str);

    const textArray = str.split(/\r\n/);
    console.log('text length:' + textArray.length);

    let filePathTxt = '';
    let outputTxt = [];
    let j = 0;

    for(let i = 0; i <= textArray.length; i++) {
        if(/^\r\n/.test(textArray[i])) {
            continue;
        }else if(/^\s/.test(textArray[i])) {
            let formatedTxt = {};
            formatedTxt.filePath = filePathTxt;
            formatedTxt.split = splitStr;
            formatedTxt.str = textArray[i];
            outputTxt[j] = formatedTxt;
            j++;
        }else{
            filePathTxt = textArray[i];
        }
    }

    let outputStr = '';
    for(let i = 0; i < outputTxt.length; i++) {
        outputStr += outputTxt[i].filePath + outputTxt[i].split + outputTxt[i].str + '\r\n';
    }

    return outputStr;
};
