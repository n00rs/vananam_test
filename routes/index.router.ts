import { Router } from "express";
import {
  handleBalanceUsecase,
  getBalanceUsecase,
} from "../libs/wallet/usecase";

 const routes: Router = Router();

routes.post("/topup", async ({ body }, res, next) => {
  try {
    const { user_id, amount }: TobjTopup = body;
    const objTopupResponse = await handleBalanceUsecase({
      objBody: { strUserId: user_id, dblAmount: amount, strMethod: "TOPUP" },
    });
    res.status(200).json(objTopupResponse);
  } catch (err) {
    next(err);
  }
});

routes.post("/deduct", async ({ body }, res, next) => {
  try {
    const { user_id, amount }: TobjTopup = body;
    const objDeductResponse = await handleBalanceUsecase({
      objBody: { strUserId: user_id, dblAmount: amount, strMethod: "DEDUCT" },
    });

    res.status(200).json(objDeductResponse);
  } catch (err) {
    next(err);
  }
});

routes.get("/balance", async ({ body }, res, next): Promise<void> => {
  try {
    const { user_id }: Pick<TobjTopup, "user_id"> = body;
    const objBalance = await getBalanceUsecase({
      objBody: { strUserId: user_id },
    });
    res.status(200).json(objBalance);
  } catch (err) {
    next(err);
  }
});

module.exports= routes
export type TobjTopup = { user_id: string; amount: number };
