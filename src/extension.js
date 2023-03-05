// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

    console.log('start');

    context.subscriptions.push(
        vscode.commands.registerCommand('grepFormat', async function () {

            console.log('test');

            const editor = vscode.window.activeTextEditor;
            if (!editor) {
                return; // No open text editor
            }
            
            const selection = editor.selection;
            const text = editor.document.getText(selection);

            const output = formatter(text, '\t');

            vscode.env.clipboard.writeText(output);
        })
    );
}

function formatter(str, splitStr) {
    const textArray = str.split(/\r\n/);

    let filePathTxt;
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
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
    activate,
    deactivate
}
