import { createPgConnection } from "../../config/postgres.config";
import { objQueries } from "../persistance";
import {
  TobjBalanceRes,
  TobjHandleBalanceParams,
  TobjTransactionRes,
} from "../wallet.model";

export async function handleBalanceUsecase({
  objBody: { dblAmount, strMethod, strUserId },
}: TobjHandleBalanceParams): Promise<TobjBalanceRes> {
  const objConnection = await createPgConnection();
  try {
    console.log({ dblAmount, strMethod, strUserId });
    if (!strUserId) throw new Error("USER_ID_MISSING");
    if (!Number(dblAmount)) throw new Error("AMOUNT_MISSING_OR_AMOUNT_ZERO");

    const strQuerySelector =
      strMethod === "TOPUP" ? "strTopupBalance" : "strDeductBalance";

    await objConnection.query("BEGIN");
    const { rows }: TobjTransactionRes = await objConnection.query(
      objQueries["objUpdate"][strQuerySelector],
      [ strUserId,Number(dblAmount)]
    );
    console.log(rows);

    if (strMethod === "DEDUCT" && !rows.length)
      throw new Error("INSUFFICIENT_BALANCE_TO_DEDUCT");

    await objConnection.query("COMMIT");

    return {
      new_balance: rows[0]["balance"],
      status: true,
      transaction_id: rows[0]["transaction_id"],
    };
  } catch (err) {
    await objConnection.query("ROLLBACK");
    throw new Error(err);
  } finally {
    await objConnection.end();
  }
}
