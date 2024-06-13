const axios = require("axios");

// Function to upload file to Google Drive
const uploadFile = async (preData) => {
  try {
    const Data = {
      name: preData.name,
      data: preData.data,
      type: preData.type
    };
    const response = await axios.post(process.env.API, Data);
    return response.data;
  } catch (error) {
    throw new Error("File upload failed");
  }
};

module.exports = uploadFile;