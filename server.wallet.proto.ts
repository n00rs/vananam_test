import {
  Server,
  ServerCredentials,
  ServerUnaryCall,
  ServerWritableStream,
  loadPackageDefinition,
  sendUnaryData,
} from "@grpc/grpc-js";
import { loadSync } from "@grpc/proto-loader";
import { TobjBalanceRes } from "./libs/wallet/wallet.model";
import { TobjTopup } from "./routes/index.router";
import { getBalanceUsecase, handleBalanceUsecase } from "./libs/wallet/usecase";
import { createPgConnection } from "./libs/config/postgres.config";
// loading proto file
const objPackageDef = loadSync("wallet.proto", { keepCase: true });
const objConnection =  createPgConnection(); 
// creating package definition
const objWalletGrpc = loadPackageDefinition(objPackageDef);

const objWalletPackage: any = objWalletGrpc.walletPackage;

const WALLET_PORT = process.env.WALLET_PORT ?? 4001;
const server = new Server();
// adding service
server.addService(objWalletPackage.WalletService.service, {
  Topup,
  Deduct,
  GetBalance,
});

server.bindAsync(
  "0.0.0.0:" + WALLET_PORT,
  ServerCredentials.createInsecure(),
  (err, port) => {
    if (err) process.exit(0);
    console.log(`wallet service running at port :${port} `);
  }
);

async function Topup(
  call: ServerUnaryCall<TobjTopup, TobjBalanceRes> &
    ServerWritableStream<TobjTopup, TobjBalanceRes>,
  callback: sendUnaryData<TobjBalanceRes>
) {
  try {
console.time('TobjTopup');

    const { amount, user_id } = call.request;
    const objTransactionData = await handleBalanceUsecase({
      objBody: {
        dblAmount: Number(amount),
        strMethod: "TOPUP",
        strUserId: user_id,
      },
      objConnection
    });
console.timeEnd('TobjTopup');

    callback(null, objTransactionData);
    // call.write(objTransactionData);
    // call.end();
  } catch (err) {
    callback(err);
  }
}
async function Deduct(
  call: ServerUnaryCall<TobjTopup, TobjBalanceRes> &
    ServerWritableStream<TobjTopup, TobjBalanceRes>,
  callback: sendUnaryData<TobjBalanceRes>
) {
  try {
    
    const { amount, user_id } = call.request;
    const objTransactionData = await handleBalanceUsecase({
      objBody: {
        dblAmount: Number(amount),
        strMethod: "DEDUCT",
        strUserId: user_id,
      },
      objConnection
    });
     callback(null, objTransactionData);
    // call.write(objTransactionData);
    // call.end();
  } catch (err) {
    callback(err);
  }
}
async function GetBalance(
  call: ServerUnaryCall<Pick<TobjTopup, "user_id">, { balance: number }> &
    ServerWritableStream<Pick<TobjTopup, "user_id">, { balance: number }>,
  callback: sendUnaryData<{ balance: number }>
) {
  try {
    
    const { user_id } = call.request;
    const objBalance = await getBalanceUsecase({
      objBody: { strUserId: user_id },
      objConnection
    });
    callback(null, objBalance);
    // call.write(objBalance);
    // call.end();
  } catch (err) {
    callback(err);
  }
}
