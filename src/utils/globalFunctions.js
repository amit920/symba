import moment from "moment";
// import sanitize from "sanitize-filename";

export function formatDateTime(datetime) {
  return moment(datetime).format("MMMM DD, YYYY");
}

// export function getBase64(file) {

//     if (file) {
//         var reader = new FileReaderSync();
//         reader.readAsDataURL(file);
//         reader.onload = function () {
//             console.log(reader.result)
//             return reader.result;
//         };
//         reader.onerror = function (error) {
//             console.log(error)
//             return '';
//         };
//     }
// }

// export function getFileName(fileName) {
//     const dateTime = Date.now();
//     const timestamp = Math.floor(dateTime / 1000);
//     return sanitize(timestamp+fileName)
// }
