import multer from "multer";
import { Request } from "express";

const storage = multer.diskStorage({
  destination: function (req: Request, file: Express.Multer.File, cb: any) {
    const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowedFileTypes.includes(file.mimetype)) {
      cb(new Error("The filetype must be .jpeg, .jpg or .png"));
      return;
    }
    cb(null, "./src/uploads");
  },

  filename: function (req: Request, file: Express.Multer.File, cb: any) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

export { multer, storage };
