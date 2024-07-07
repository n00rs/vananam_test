import { objQueries } from "../persistance";
import {
  TobjBalanceRes,
  TobjHandleBalanceParams,
  TobjTransactionRes,
} from "../wallet.model";
const crypto = require("crypto");




export async function handleBalanceUsecase({
  objBody: { dblAmount, strMethod, strUserId },
  objConnection
}: TobjHandleBalanceParams): Promise<TobjBalanceRes> {
  console.time('client');
  
  // const objConnection = await createPgConnection();
  console.timeEnd('client');

  try {
    
    if (!strUserId) throw new Error("USER_ID_MISSING");
    if (!Number(dblAmount)) throw new Error("AMOUNT_MISSING_OR_AMOUNT_ZERO");

    const strQuerySelector =
      strMethod === "TOPUP" ? "strTopupBalance" : "strDeductBalance";

    // await objConnection.query("BEGIN");
    console.time('TobjTransactionRes')
    const { rows }: TobjTransactionRes = await objConnection.query(
      objQueries["objUpdate"][strQuerySelector],
      [ strUserId,Number(dblAmount),crypto.randomUUID()]
    );
    console.timeEnd('TobjTransactionRes')



    if (strMethod === "DEDUCT" && !rows.length)
      throw new Error("INSUFFICIENT_BALANCE_TO_DEDUCT");

    // await objConnection.query("COMMIT");

    return {
      status: true,
      new_balance: rows[0]["balance"],
      transaction_id: rows[0]["transaction_id"],
    };
  } catch (err) {
    // await objConnection.query("ROLLBACK");
    throw new Error(err);
  } finally {
    //  objConnection.release();
  }
}
