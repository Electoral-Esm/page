function getRandomKey(size) {
    const array = new Int8Array(size);
    return self.crypto.getRandomValues(array).toString();
}
function getPageId() {
    return "";
}
function getBaseColor() {
    return '';
}
const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

function eventClick(id) {
    document.getElementById(id).click();
}

function onClick(element) {
    element.click();
}

function writeNewTab(e) {
    var newWindow = window.open();
    newWindow.document.write(e);
}
function openNewTab(url) {
    window.open(url, '_blank').focus();
}
async function confirmation(title, text, msgButtonConfirm, msgButtonCancel) {
    return await Swal.fire({
        title: title,
        text: text,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: msgButtonConfirm,
        cancelButtonText: msgButtonCancel
    });
}
async function inputMail(title, text, placeholder, inputValue, confirmButtonText, showCancelButton) {
    return await Swal.fire({
        title: title,
        input: 'email',
        inputLabel: text,
        inputPlaceholder: placeholder,
        inputValue: inputValue,
        confirmButtonText: confirmButtonText,
        showCancelButton: showCancelButton
    });
}
async function inputText(title, text, placeholder, inputValue, confirmButtonText, showCancelButton) {
    return await Swal.fire({
        title: title,
        input: 'text',
        inputLabel: text,
        inputPlaceholder: placeholder,
        inputValue: inputValue,
        confirmButtonText: confirmButtonText,
        showCancelButton: showCancelButton
    });
}
async function inputPassword(title, text, placeholder, maxLength, confirmButtonText, showCancelButton) {
    return await Swal.fire({
        title: title,
        input: 'password',
        inputLabel: text,
        inputPlaceholder: placeholder,
        confirmButtonText: confirmButtonText,
        showCancelButton: showCancelButton,
        inputAttributes: {
            maxlength: maxLength,
            autocapitalize: 'off',
            autocorrect: 'off'
        }
    });
}
function setClass(key, value) {
    var obj = document.getElementById(key);
    obj.className = value;
}

function setValue(key, value) {
    var obj = document.getElementById(key);
    obj.innerText = value;
}

function saveAs(filename, contentType, content) {
    // Blazor marshall byte[] to a base64 string, so we first need to convert the string (content) to a Uint8Array to create the File
    const data = base64DecToArr(content);

    // Create the URL
    const file = new File([data], filename, { type: contentType });
    const exportUrl = URL.createObjectURL(file);

    // Create the <a> element and click on it
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.href = exportUrl;
    a.download = filename;
    a.target = "_self";
    a.click();

    // We don't need to keep the url, let's release the memory
    URL.revokeObjectURL(exportUrl);
}
function b64ToUint6(nChr) {
    return nChr > 64 && nChr < 91 ? nChr - 65 : nChr > 96 && nChr < 123 ? nChr - 71 : nChr > 47 && nChr < 58 ? nChr + 4 : nChr === 43 ? 62 : nChr === 47 ? 63 : 0;
}

function base64DecToArr(sBase64, nBlocksSize) {
    var
        sB64Enc = sBase64.replace(/[^A-Za-z0-9\+\/]/g, ""),
        nInLen = sB64Enc.length,
        nOutLen = nBlocksSize ? Math.ceil((nInLen * 3 + 1 >> 2) / nBlocksSize) * nBlocksSize : nInLen * 3 + 1 >> 2,
        taBytes = new Uint8Array(nOutLen);

    for (var nMod3, nMod4, nUint24 = 0, nOutIdx = 0, nInIdx = 0; nInIdx < nInLen; nInIdx++) {
        nMod4 = nInIdx & 3;
        nUint24 |= b64ToUint6(sB64Enc.charCodeAt(nInIdx)) << 18 - 6 * nMod4;
        if (nMod4 === 3 || nInLen - nInIdx === 1) {
            for (nMod3 = 0; nMod3 < 3 && nOutIdx < nOutLen; nMod3++, nOutIdx++) {
                taBytes[nOutIdx] = nUint24 >>> (16 >>> nMod3 & 24) & 255;
            }
            nUint24 = 0;
        }
    }
    return taBytes;
}

function GetScreenSize() {
    return {
        Width: window.innerWidth,
        Height: window.innerHeight
    };
};

function GetUserAgent() {
    return window.navigator.userAgent;
}
