import express, {Response, Request, NextFunction} from 'express';
import 'reflect-metadata';

import { router } from "./src/api.router";
import { config } from "./config/config";
import {ApiError, NotFound} from "./errors/api-errors";
import {createConnection} from "typeorm";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/v1', router);
app.use('*', _notFoundError);
app.use(mainErrorHandler);

// app.listen(config.PORT, async () => {
//   console.log(`PORT: ${ config.PORT }`);
// });

app.listen(config.PORT, async () => {
  console.log(`PORT: ${config.PORT}`);

  try {
    const connection = await createConnection();
    if (connection) {
      console.log('DB connected');
    }
  } catch (err) {
    if (err) console.log(err);
  }
});

function _notFoundError(req: Request, res: Response, next: NextFunction) {
  next(new NotFound('Route not found'));
}

function mainErrorHandler(err: ApiError, req: Request, res: Response, _: any) {
  console.log(err);
  res
    .status(err.status || 500)
    .json({
      message: err.message || 'Unknown error'
    });
}
