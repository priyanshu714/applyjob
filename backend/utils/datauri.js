import DataUriParser from "datauri/parser.js";
import path from "path";

const getDataUri = (file) => {
    if (!file || !file.originalname || !file.buffer) {
        throw new Error("Invalid file object");
    }

    const parser = new DataUriParser();
    const extName = path.extname(file.originalname).toString();

    // Optional: Validate file extension if needed
    const validExtensions = ['.jpg', '.jpeg', '.png', '.pdf'];  // You can add more allowed extensions
    if (!validExtensions.includes(extName)) {
        throw new Error("Invalid file type");
    }

    return parser.format(extName, file.buffer);
};

export default getDataUri;
