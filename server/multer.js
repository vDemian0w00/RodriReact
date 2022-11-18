import { join, dirname } from "path";
import { fileURLToPath } from "url";
import multer from "multer";

const __dirname = dirname(fileURLToPath(import.meta.url));
const __public = join(__dirname, "../client/dist/public");

const storage = multer.diskStorage({
  destination: join(__public, "uploads"),
  filename: (req, file, cb) => {
    cb(
      null,
      `${Date.now()}-${file.fieldname}.${file.originalname.split(".").at(-1)}`
    );
  },
});

export default multer({
  dest: join(__public, "uploads"),
  storage,
}).single("avatarFile");
