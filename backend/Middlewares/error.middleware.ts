import { NextApiRequest, NextApiResponse } from "next";
import { HttpException } from '../Utils';

const ErrorMiddleware = (err: Error, _req: NextApiRequest, res: NextApiResponse, _next: () => void) => {
  const { status, message } = err as HttpException;
  res.status(status || 500).json({ message });
};

export default ErrorMiddleware;
