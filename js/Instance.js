window.LinkSystem = {};
window.LinkSystemModule({ //EXPORT_NAME en el comando. 
    noInitialRun: false 
})
.then(module => {
    window.LinkSystem.LinkSystemModule =  module;
});
window.LinkSystem.GetHeader = function()
{
    return window.LinkSystem.LinkSystemModule.ccall("C_GetHeader", "string", [], []);
};
window.LinkSystem.GetIP = async function () {
    var url = `https://api.ipify.org?format=json`;
    var options = {
        method: "GET",
        mode: "cors",
        cache: "default"
    };
    try {
        var response = await fetch(new Request(url), options);
        if (response.ok) {
            var json = await response.json();
            return json.ip;
        }
        throw "ERROR";
    } catch (error) {
        return "";
    }
};
 
window.LinkSystem.GetCStr = function (str) {
    var lengthBytes = window.LinkSystem.LinkSystemModule.lengthBytesUTF8(str) + 1;
    var result = window.LinkSystem.LinkSystemModule._malloc(lengthBytes);
    window.LinkSystem.LinkSystemModule.stringToUTF8(str, result, lengthBytes);
    return result;
};

window.blazorExtensions = {

    GetFileData: async function (id) {
        var target = document.getElementById(id);
        var filesArray = Array.prototype.slice.call(target.files);
        return Promise.all(filesArray.map(window.blazorExtensions.fileToDataURL));
    },

    fileToDataURL: async function (file) {
        var reader = new FileReader();
        return new Promise(function (resolve, reject) {
            reader.onerror = function () {
                reader.abort();
                reject(new DOMException('Error occurred reading file ' + file));
            };
            reader.onload = function (event) {
                resolve(reader.result);
                console.log('resolved');
            };
            reader.readAsDataURL(file);
            console.log('returned');
        })
    },

    InvokeClick: function (id) {
        var elem = document.getElementById(id);
        if (typeof elem.onclick == "function") {
            elem.onclick.apply(elem);
        }
        elem.click();
    },
}