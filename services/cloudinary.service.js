import axios from "axios";
export const cloudinaryService = { uploadImg };

const CLOUD_NAME = "avivyaari";
const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
const UPLOAD_PRESET = "k9e87w7t";

async function uploadImg(img) {
  const formData = new FormData();
  formData.append("file", img);
  formData.append("upload_preset", UPLOAD_PRESET);
  try {
    const res = await axios.post(UPLOAD_URL, formData);
    const { secure_url } = res.data;
    return secure_url;
  } catch (err) {
    console.error("error in cloudinary upload", err);
    throw err;
  }
}
