import {
  loadPackageDefinition,
  Server,
  ServerCredentials,
} from "@grpc/grpc-js";
import { loadSync } from "@grpc/proto-loader";
const arrTodos: { id: number; text: string }[] = [];
const packageDef = loadSync("todo.proto", {});
const objGrpc = loadPackageDefinition(packageDef);
const todoPackage: any = objGrpc.todoPackage;
// console.log(todoPackage);

const server = new Server();
const PROTO_PORT = process.env.PROTO_PORT || 5000;
server.addService(todoPackage.Todo.service, {
  createTodo: createTodo,
  readTodos: readTodos,
  readTodosStream
});

server.bindAsync(
  `0.0.0.0:${PROTO_PORT}`,
  ServerCredentials.createInsecure(),
  (err, port) => console.log({ err, port })
);

async function readTodos(call, callback) {
  try {
    console.log(call.request);
    
    callback(null,{items:arrTodos})

  } catch (err) {
    callback(err, null);
  }
}

async function createTodo(call, callback) {
  try {
    const todo = {id:arrTodos.length,text:call.request.text}
    arrTodos.push(todo);
    console.log(call.request);
    console.log({arrTodos});
    
    callback(null,todo)
  } catch (err) {
    callback(err, null);
  }
}

async function readTodosStream(call,callback) {
    try {
        arrTodos.forEach(objTodo=>call.write(objTodo))
        call.end()
    } catch (err) {
        callback(err)
    }
}
