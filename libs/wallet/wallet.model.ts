import { Pool } from "pg";

export type TobjBalanceRes = {
  status: boolean;
  new_balance: number;
  transaction_id: string;
}

export type TobjHandleBalanceParams = {
  objBody: {
    strUserId: string;
    dblAmount: number;
    strMethod: "DEDUCT" | "TOPUP";
  };
  objConnection:Pool
};

export type TobjGetBalanceUsecaseParams = {
  objBody: {
    strUserId: string;
  };
  objConnection:Pool
};

export type TobjQueries = {
  objget: {
    strGetBalanceBYUserId: string;
  };
  objCreate: {
    strCreateNewUser: string;
  };
  objUpdate: {
    strTopupBalance: string;
    strDeductBalance: string;
  };
};

export type TobjBalanceQueryRes = { rows: { balance: number }[] };
export type TobjTransactionRes = {
  rows: { balance: number; transaction_id: string }[];
};
