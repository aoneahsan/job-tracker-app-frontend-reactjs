import { _frbStorage } from "@/configs/firebase";
import { type UploadResult, ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { getZUniqueKey, reportCustomError } from "@/utils/helpers";
import { ZFBStorageBucketFoldersEnum } from "@/types/firebase";

/**
 * Uploads a file to Firebase storage.
 * @param file - The file to be uploaded.
 * @param fileName - The name of the file.
 * @param folderName - The name of the folder to upload the file to.
 * @returns A promise that resolves to the upload result if successful, or null if there was an error.
 */
export const uploadZFirebaseFile = async ({ file, fileName = getZUniqueKey(), folderName = ZFBStorageBucketFoldersEnum.uploadedFiles }: { file: File, fileName?: string, folderName?: string }): Promise<{ url: string; name: string } | null> => {
    try {
        const storageRef = ref(_frbStorage, `${folderName}/${fileName}`);
        await uploadBytes(storageRef, file);
        const _ref = ref(_frbStorage, `${folderName}/${fileName}`);
        const _res = await getDownloadURL(_ref);
        return { url: _res, name: fileName };
    } catch (error) {
        reportCustomError(error);
        return null;
    }
};

/**
 * Gets the download URL of a file from Firebase storage.
 * @param fileName - The name of the file.
 * @param folderName - The name of the folder to get the file from.
 * @returns A promise that resolves to the download URL if successful, or null if there was an error.
 */
export const getZFirebaseFileUrl = async (fileName: string, folderName: string): Promise<string | null> => {
    try {
        const _ref = ref(_frbStorage, `${folderName}/${fileName}`);
        const _res = await getDownloadURL(_ref);
        return _res;
    } catch (error) {
        reportCustomError(error);
        return null;
    }
};

/**
 * Lists all files in a Firebase storage folder.
 * @param folderName - The name of the folder to list the files from.
 * @returns A promise that resolves to an array of file URLs if successful, or null if there was an error.
 */
export const listZFirebaseFiles = async (folderName: string): Promise<Array<{ url: string; name: string }> | null> => {
    try {
        const _res = await listAll(ref(_frbStorage, `${folderName}/`));

        const list: Array<{ url: string; name: string }> = [];

        _res.items.forEach(async (itemRef) => {
            const fileUrl = await getDownloadURL(itemRef);
            list.push({ url: fileUrl, name: itemRef.name });
        });

        return list;
    } catch (error) {
        reportCustomError(error);
        return null;
    }
}
