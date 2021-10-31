import axios from "axios";
export const mindeeService = { getOCR };

async function getOCR(imgUrl) {
  const UPLOAD_URL = "https://api.mindee.net/v1/products/Aviv-Yaari/image/v1/predict";
  const formData = new FormData();
  formData.append("document", imgUrl);
  try {
    const res = await axios.post(UPLOAD_URL, formData, {
      headers: {
        Authorization: "Token a1265fc36fc49f879003e1368ca73e47",
        "Content-Type": "multipart/form-data",
      },
    });
    const { prediction } = res.data.document.inference;
    const map = {};
    for (const field in prediction) {
      let text = "";
      prediction[field].values.forEach((value) => (text += value.content + " "));
      map[field] = text.trim();
    }
    return map;
  } catch (err) {
    console.error("error in mindee upload", err);
    throw err;
  }
}
