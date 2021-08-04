import Signature from "./Signature";
import Policy from "./Policy";
import { xAmzDate, dateYMD } from "./Date";
import { throwError } from './ErrorThrower';
/* eslint-disable */

class S3FileUpload {
    static async uploadFile(file, config) {

        // Error Thrower :x:
        throwError(config, file);

        const fd = new FormData();
        const key = `${config.dirName ? config.dirName + "/" : ""}${file.name}`;
        const url = `https://${config.bucketName}.s3.amazonaws.com/`;
        fd.append("key", key);
        fd.append("acl", "public-read");
        fd.append("Content-Type", file.type);
        fd.append("x-amz-meta-uuid", "14365123651274");
        fd.append("x-amz-server-side-encryption", "AES256");
        fd.append("X-Amz-Credential", `${config.accessKeyId}/${dateYMD}/${config.region}/s3/aws4_request`);
        fd.append("X-Amz-Algorithm", "AWS4-HMAC-SHA256");
        fd.append("X-Amz-Date", xAmzDate);
        fd.append("x-amz-meta-tag", "");
        fd.append("Policy", Policy.getPolicy(config));
        fd.append("X-Amz-Signature", Signature.getSignature(config, dateYMD, Policy.getPolicy(config)));
        fd.append("file", file);

        const params = {
            method: "post",
            headers: {
                fd
            },
            body: fd
        };

        const data = await fetch(url, params);
        if (!data.ok) return Promise.reject(data);
        return Promise.resolve({
            bucket: config.bucketName,
            key: `${config.dirName ? config.dirName + "/" : ""}${file.name}`,
            location: `${url}${config.dirName ? config.dirName + "/" : ""}${file.name}`,
            result: data
        });
    }
    static async uploadCroppingFile(file, type,  config) {   
    
        throwError(config, file, type,);
        const fd = new FormData();      
        //----------- Start convert base64 image to file------------------//
        const byteString = atob(file.split(',')[1]);
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
    
        for (let i = 0; i < byteString.length; i += 1) {
          ia[i] = byteString.charCodeAt(i);
         
        }
        const newBlob = new Blob([ab], {type: 'image/jpeg', });
        // newBlob.name = 'ProfileImg.png'+'('+ new Date() +')';
        newBlob.name = 'ProfileImg.png'+'('+ new Date().toLocaleString() +')';

       //----------- End convert base64 image to file------------------//  
        const url = `https://${config.bucketName}.s3.amazonaws.com/`;       
           const key = `${config.dirName ? config.dirName + "/" : ""}${newBlob.name}`;
            fd.append("key", key);
            fd.append("acl", "public-read");
            fd.append("Content-Type", type);
            // fd.append("Content-Encoding", "base64");
            fd.append("x-amz-meta-uuid", "14365123651274");
            fd.append("x-amz-server-side-encryption", "AES256");
            fd.append("X-Amz-Credential", `${config.accessKeyId}/${dateYMD}/${config.region}/s3/aws4_request`);
            fd.append("X-Amz-Algorithm", "AWS4-HMAC-SHA256");
            fd.append("X-Amz-Date", xAmzDate);
            fd.append("x-amz-meta-tag", "");
            fd.append("Policy", Policy.getPolicy(config));
            fd.append("X-Amz-Signature", Signature.getSignature(config, dateYMD, Policy.getPolicy(config)));          
            fd.append("file",newBlob);

        const params = {
            method: "post",
            headers: {
                fd
            },
            body: fd
        };
       
        const data = await fetch(url, params);
        if (!data.ok) return Promise.reject(data);
        return Promise.resolve({
            bucket: config.bucketName,
            key: `${config.dirName ? config.dirName + "/" : ""}${newBlob.name}`,
            location: `${url}${config.dirName ? config.dirName + "/" : ""}${newBlob.name}`,
            result: data
        });
    }

    static async deleteFile(fileName, config) {
        const fd = new FormData();
        const url = `https://${config.bucketName}.s3-${config.region}.amazonaws.com/${config.dirName ? config.dirName + "/" : ""}${fileName}`;
        fd.append("Date", xAmzDate);
        fd.append("X-Amz-Date", xAmzDate);
        fd.append("Authorization", Signature.getSignature(config, dateYMD, Policy.getPolicy(config)));
        fd.append("Content-Type", "text/plain");

        const params = {
            method: "delete",
            headers: {
                fd
            }
        };

        const deleteResult = await fetch(url, params);
        if (!deleteResult.ok) return Promise.reject(deleteResult);
        return Promise.resolve({
            ok: deleteResult.ok,
            status: deleteResult.status,
            message: "File Deleted",
            fileName: fileName
        });
    }
}
const { uploadFile,uploadCroppingFile, deleteFile } = S3FileUpload;
export { uploadFile,uploadCroppingFile, deleteFile };
export default S3FileUpload;