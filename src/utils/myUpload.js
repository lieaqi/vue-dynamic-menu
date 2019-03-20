import { getData } from "@/utils/request";
let fs, request;
if (window.nw) {
    request = window.nw.require("request");
    fs = window.nw.require("fs");
}
export function setPhoto(file) {
    let otherdata = getData("", "/ProductTemplates/PhotoBank/upload");
    otherdata.file = fs.createReadStream(file);
    return new Promise(function (resolve, reject) {
        request.post(
            {
                url: "http://productphp.0577site.com/ProductTemplates/PhotoBank/upload",
                formData: otherdata
            },
            function (err, httpResponse, body) {
                if (err) {
                    reject(err);
                }
                resolve(body)
            }
        );
    })
}
