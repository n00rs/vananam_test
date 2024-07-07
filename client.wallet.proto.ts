import {
  credentials,
  loadPackageDefinition,
  
} from "@grpc/grpc-js";
import { loadSync } from "@grpc/proto-loader";

// loading proto file
const objPackageDef = loadSync("wallet.proto", {keepCase:true});

// creating package definition
const objWalletGrpc = loadPackageDefinition(objPackageDef);

const objWalletPackage: any = objWalletGrpc.walletPackage;

const WALLET_PORT = process.env.WALLET_PORT ?? 4001;

const client = new objWalletPackage.WalletService(
  `localhost:${WALLET_PORT}`,
  credentials.createInsecure()
);

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
