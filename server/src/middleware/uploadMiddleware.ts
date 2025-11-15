import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, "./src/uploads");
  },
  filename(req, file, callback) {
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);
    callback(null, name + "-" + Date.now() + ext);
  },
});

const fileFilter = (
  req: any,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Not an mage! Please upload only images."));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 },
});

export { upload };
