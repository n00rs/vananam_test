import { TobjQueries } from "../wallet.model";

export const objQueries:TobjQueries = {
  objget: {
    strGetBalanceBYUserId: ` SELECT tu.ft_balance AS "balance" FROM tbl_user tu WHERE tu.pk_bint_user_id = $1`,
  },
  objCreate: {
    strCreateNewUser: ` INSERT INTO tbl_user(ft_balance) VALUES (0) RETURNING *; `,
  },
  objUpdate: {
    strTopupBalance: ` 
    UPDATE tbl_user tu 
    SET ft_balance = ft_balance + $2,
    vchr_transaction_id = $3
    WHERE pk_bint_user_id = $1 RETURNING ft_balance AS "balance", vchr_transaction_id AS "transaction_id"; `,
    strDeductBalance: ` 
    UPDATE tbl_user tu 
    SET ft_balance = ft_balance - $2,
    vchr_transaction_id = $3
    WHERE pk_bint_user_id = $1 AND ft_balance >= $2 
    RETURNING ft_balance AS "balance", vchr_transaction_id AS "transaction_id";
    `,
  },
};
