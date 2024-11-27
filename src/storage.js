import { storage } from "./firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const rootLocation = "images";

export const upload = async (file, fileName) => {
  try {
    const storageRef = ref(storage, `${rootLocation}/${fileName}`);
    const snapshot = await uploadBytes(storageRef, file);
    return await getDownloadURL(snapshot.ref);
  } catch (error) {
    console.error("Error uploading file:", error);
  }
};
