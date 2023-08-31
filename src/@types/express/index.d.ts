import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      commandUser: {
        id: string;
      };
    }
  }
}
