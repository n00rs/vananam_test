# Wallet Application

This project implements a wallet system with functionalities to top-up and deduct balances using both HTTP and gRPC APIs.

## Prerequisites

- Node.js (v20 or later)
- PostgreSQL

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/n00rs/vananam_test.git
    cd vananam_test
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory with the following content:

    ```env
    PORT=4000
    POSTGRESS_USER=user_name
    POSTGRESS_PASSWORD=password
    POSTGRESS_HOST=host
    POSTGRESS_PORT=5432
    POSTGRESS_DATABASE_NAME=wallet_db
    WALLET_PORT=4001
    ```

4. Set up the PostgreSQL database:

    ```sql
    CREATE DATABASE wallet_db;
    \c wallet_db
   CREATE TABLE tbl_user (
    pk_bint_user_id SMALLSERIAL PRIMARY KEY,
    ft_balance FLOAT DEFAULT 0
   );

   INSERT INTO tbl_user(ft_balance) VALUES (0),(0),(0),(0),(0),(0),(0),(0),(0),(0),(0),(0),(0),(0),(0),(0),(0),(0),(0),(0),(0),(0),(0),(0),(0),(0),(0),(0),(0),(0),(0),(0),(0),(0),(0),(0),(0),(0),(0),(0),(0),(0),(0),(0),(0),(0),(0),(0),(0),(0),(0),(0),(0),(0),(0),(0),(0),(0),(0),(0),(0),(0),(0),(0),(0),(0),(0),(0),(0),(0),(0),(0),(0),(0),(0),(0),(0),(0),(0),(0),(0),(0),(0),(0),(0),(0),(0),(0),(0),(0),(0),(0),(0),(0),(0),(0),(0),(0),(0),(0);
    ```

## Running the HTTP Server

The HTTP server runs on port `4000`.

### Development

To run the HTTP server in development mode with hot reloading:

    ```bash
    npm run start
    ```

### Production

To build and run the HTTP server for production:

    ```bash
    npm run build
    ```

## Running the gRPC Server

The gRPC server runs on port `4001`.

### Development

To run the gRPC server in development mode with hot reloading:

    ```bash
    npm run dev-walletRpc
    ```

### Production

To build and run the gRPC server for production:

    ```bash
    npm run build-walletRpc
    ```

## Running the gRPC Client

To interact with the gRPC server, you can use the provided client.

### Development

To run the gRPC client in development mode with hot reloading:

    ```bash
    npm run dev-clientWalletRpc
    ```

### Production

To build and run the gRPC client for production:

    ```bash
    npm run build-clientWalletRpc
    ```

## API Endpoints

### HTTP API

- **Top-up Balance**

    ```http
    POST /topup
    ```

    **Request Body:**

    ```json
    {
      "user_id": "string",
      "amount": "number"
    }
    ```

    **Response:**

    ```json
    {
      "status": "boolean",
      "new_balance": "number",
      "transaction_id": "string"
    }
    ```

- **Deduct Balance**

    ```http
    POST /deduct
    ```

    **Request Body:**

    ```json
    {
      "user_id": "string",
      "amount": "number"
    }
    ```

    **Response:**

    ```json
    {
      "status": "boolean",
      "new_balance": "number",
      "transaction_id": "string"
    }
    ```

- **Get Balance**

    ```http
    POST /balance
    ```

    **Request Body:**

    ```json
    {
      "user_id": "string"
    }
    ```

    **Response:**

    ```json
    {
      "balance": "number"
    }
    ```

### gRPC API

- **Top-up Balance**

    ```proto
    rpc Topup (TopupRequest) returns (BalanceResponse);
    ```

    **Request Message:**

    ```proto
    message TopupRequest {
      string user_id = 1;
      float amount = 2;
    }
    ```

    **Response Message:**

    ```proto
    message BalanceResponse {
      bool status = 1;
      float new_balance = 2;
      string transaction_id = 3;
    }
    ```

- **Deduct Balance**

    ```proto
    rpc Deduct (DeductRequest) returns (BalanceResponse);
    ```

    **Request Message:**

    ```proto
    message DeductRequest {
      string user_id = 1;
      float amount = 2;
    }
    ```

    **Response Message:**

    ```proto
    message BalanceResponse {
      bool status = 1;
      float new_balance = 2;
      string transaction_id = 3;
    }
    ```

- **Get Balance**

    ```proto
    rpc GetBalance (BalanceRequest) returns (BalanceResponse);
    ```

    **Request Message:**

    ```proto
    message BalanceRequest {
      string user_id = 1;
    }
    ```

    **Response Message:**

    ```proto
    message BalanceResponse {
      bool status = 1;
      float new_balance = 2;
      string transaction_id = 3;
    }
    ```

