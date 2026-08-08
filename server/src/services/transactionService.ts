import fs from "fs";
import path from "path";
import { Transaction, transactionStatus } from "../models/transactions";

const transactionsPath = path.join(__dirname, "../../data/transactions.csv"); // initialize csv file path

export async function getTransactions(): Promise<Transaction[]> {
  const fileContents = await fs.promises.readFile(transactionsPath, "utf-8"); // reads csv file
  const lines = fileContents.split("\n").slice(1); // formats csv file into array of lines, excluding header
  const transactions: Transaction[] = lines.map((line) => { // maps each line to a Transaction object
    const [transactionDate, accountNumber, accountHolder, amount, status] = line.split(",");
    return {
      transactionDate,
      accountNumber,
      accountHolder,
      amount: parseFloat(amount),
      status: status as transactionStatus
    };
  });
  return transactions;
}

export async function addNewTransaction(transaction: Transaction): Promise<Transaction>{
    const newTransactionLine = `${transaction.transactionDate}, ${transaction.accountNumber}, ${transaction.accountHolder}, ${transaction.amount}, ${transaction.status}\n`;
    await fs.promises.appendFile(transactionsPath, newTransactionLine); // appends new transaction to csv file
    return transaction;
}