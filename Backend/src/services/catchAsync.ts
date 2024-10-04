import { Request, Response, NextFunction } from "express";

const errorHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) =>
    fn(req, res, next).catch((err: Error) => {
      return res.status(500).json({
        message: "Internal error",
        errorMessage: err.message,
      });
    });
};
export default errorHandler;
