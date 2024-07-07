// import { createPgConnection } from "../../config/postgres.config";
import { objQueries } from "../persistance";
import { TobjBalanceQueryRes, TobjGetBalanceUsecaseParams } from "../wallet.model";

export async function getBalanceUsecase({
  objBody: { strUserId },  objConnection
}: TobjGetBalanceUsecaseParams): Promise<{ balance: number }> {
  // const objConnection = await createPgConnection();
  try {
    if (!strUserId) throw new Error("USER_ID_MISSING");

    const { rows }: TobjBalanceQueryRes = await objConnection.query(
      objQueries["objget"]["strGetBalanceBYUserId"],
      [strUserId]
    );
    if (!rows.length) throw new Error("INVALID_USER_ID");

    return { balance: rows[0]["balance"] };
  } catch (error) {
    throw new Error(error);
  } finally {
    //  objConnection.release();
  }
}
