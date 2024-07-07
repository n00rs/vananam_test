import {
  credentials,
  loadPackageDefinition,
} from "@grpc/grpc-js";
import { loadSync } from "@grpc/proto-loader";

const packageDef = loadSync("todo.proto", {});
const objGrpc = loadPackageDefinition(packageDef);
const todoPackage: any = objGrpc.todoPackage;

const client = new todoPackage.Todo(
  `localhost:5000`,
  credentials.createInsecure()
);

client.createTodo({ id: 1, text: "Starre" }, (err, res) => {
  console.log(err);

  console.log(`Received from server ${JSON.stringify(res)}`);
});

client.readTodos({}, (err, res) => {
  console.log(err);

  console.log(`readTodos from server ${JSON.stringify(res)}`);
});

const dataStream = client.readTodosStream();

dataStream.on("data", (objItem) => console.log(`data stream ${JSON.stringify(objItem)}`));
dataStream.on("end",e=>console.log(`stream ended`))
dataStream.on("error",err=>console.log(`stream err : ${err}`))
