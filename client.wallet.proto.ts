import { credentials, loadPackageDefinition } from "@grpc/grpc-js";
import { loadSync } from "@grpc/proto-loader";

// loading proto file
const objPackageDef = loadSync("wallet.proto", { keepCase: true });

// creating package definition
const objWalletGrpc = loadPackageDefinition(objPackageDef);

const objWalletPackage: any = objWalletGrpc.walletPackage;

const WALLET_PORT = process.env.WALLET_PORT ?? 4001;

const client = new objWalletPackage.WalletService(
  `localhost:${WALLET_PORT}`,
  credentials.createInsecure()
);
const errFunc = (err) => console.error(`Error: ${err?.message}`);


  client.Topup({ user_id: "1", amount: 10 }, (err, res) => {
    console.log(err);

    console.log(`dataFrom Server : ${JSON.stringify(res)}`);
  });
  client.Deduct({ user_id: "1", amount: 5 }, (err, res) => {
    console.log(err);

    console.log(`dataFrom Server : ${JSON.stringify(res)}`);
  });
  client.GetBalance({ user_id: 1 }, (err, res) => {
    console.log(err);

    console.log(`dataFrom Server : ${JSON.stringify(res)}`);
  });


// stream expample
// for (let i = 0; i < 100; i++) {
//   const topup = client.Topup({ user_id: "1", amount: 10 });
//   topup.on("data", (objTopUpData) => {
//     console.log(`dataFrom Server topUp: ${JSON.stringify(objTopUpData)}`);
//   });
//   topup.on("error", errFunc);
//   // topup.on("status", (status) => console.log(status));
// }

// for (let i = 0; i < 100; i++) {
//   const deduct = client.Deduct({ user_id: "1", amount: 5 });
//   deduct.on("data", (objDeductData) =>
//     console.log(`dataFrom Server topUp: ${JSON.stringify(objDeductData)}`)
//   );
//   deduct.on("error", errFunc);
//   // deduct.on("status", (status) => console.log(status));
// }

// for (let i = 0; i < 100; i++) {
//   const getBalance = client.GetBalance({ user_id: "1", amount: 5 });
//   getBalance.on("data", (objBalance) =>
//     console.log(`dataFrom Server topUp: ${JSON.stringify(objBalance)}`)
//   );
//   getBalance.on("error", errFunc);
//   // getBalance.on("status", (status) => console.log({status}));
// }
