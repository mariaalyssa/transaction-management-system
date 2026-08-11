# Transaction Management System

A simple transaction management system with:
- A Node.js/Express backend that stores transactions in a CSV file
- A React/Vite frontend for viewing and adding transactions
- Random status assignment on new transactions

## Features
- View all transactions in a table
- Filter/search transactions
- Add transaction through add transaction modal
- Store data in CSV format
- Status colors for Pending, Settled, and Failed
- Random selection of status
- Mobile view of application

## Project Structure
- `server/` - Express API and CSV storage
- `client/` - React frontend

## Prerequisites
- Node.js: version 20.x or later
- npm: version 10.x or later

## Installation
### Backend
1. Open a terminal in the `server` folder.
2. Run `npm install`.

### Frontend
1. Open a terminal in the `client` folder.
2. Run `npm install`.

## Configuration
No environment variables are required.
The backend runs on `http://localhost:8080`.

## Running the Application
### Start the backend
1. Open a terminal in `server`.
2. Run `npm run build`.
3. Run `npm start`.


### Start the frontend
1. Open a terminal in `client`.
2. Run `npm run dev`.

## API Documentation
### GET /transactions
Returns all transactions.

Example response:
[
  {
    "transactionDate": "2025-03-01",
    "accountNumber": "7289-3445-1121",
    "accountHolder": "Maria Johnson",
    "amount": 150,
    "status": "Settled"
  }
]

### POST /transactions
Creates a new transaction.

Example request body:
{
  "transactionDate": "2026-08-11",
  "accountNumber": "1234-5678-9100",
  "accountHolder": "Test User",
  "amount": 100.5,
  "status": "Pending"
}

Example response:
{
  "transactionDate": "2026-08-11",
  "accountNumber": "1234-5678-9100",
  "accountHolder": "Test User",
  "amount": 100.5,
  "status": "Pending"
}

### GET /get-transactions-pending
Gets all pending transactions.

Example response:
{
    "transactionDate": "2025-03-02",
    "accountNumber": "1122-3456-7890",
    "accountHolder": "John Smith",
    "amount": 75.5,
    "status": "Pending"
},

### GET /get-transactions-settled
Gets all settled transactions.

Example response:
{
    "transactionDate": "2025-03-03",
    "accountNumber": "3344-5566-7788",
    "accountHolder": "Robert Chen",
    "amount": 220.25,
    "status": "Settled"
},

### GET /get-transactions-failed
Gets all failed transactions.

Example response:
{
    "transactionDate": "2025-03-04",
    "accountNumber": "8899-0011-2233",
    "accountHolder": "Sarah Williams",
    "amount": 310.75,
    "status": "Failed"
},

### GET /get-transactions-search
Search transactions by name (partial or full).

Example request body:
{
 accountHolder: Sarah Williams/Sarah
}

Example response:
{
    "transactionDate": "2025-03-04",
    "accountNumber": "8899-0011-2233",
    "accountHolder": "Sarah Williams",
    "amount": 310.75,
    "status": "Failed"
},


## Testing
1. Open the frontend in your browser.
2. Confirm the transaction table loads data from the API.
3. Use the Add Transaction modal to submit a new record.
4. Verify the new record appears in the table.
5. Check the CSV file in `server/data/transactions.csv` to confirm persistence.

