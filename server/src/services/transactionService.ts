import fs from "fs";
import path from "path";
import { Transaction, transactionStatus } from "../models/transactions";

const transactionsPath = path.join(__dirname, "../../data/transactions.csv"); // initialize csv file path


export async function getTransactions(): Promise<Transaction[]> {
  const fileContents = await fs.promises.readFile(transactionsPath, "utf-8"); // reads csv file
  const lines = fileContents.split("\n").slice(1); // formats csv file into array of lines, excluding header
  const transactions: Transaction[] = lines.map((line) => { // maps each line to a Transaction object
    const [transactionDate, accountNumber, accountHolder, amount, status] =
      line.split(",").map((field) => field.trim());
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
export async function addNewTransaction(
  transaction: Transaction
): Promise<Transaction> {
  const fileContents = await fs.promises.readFile(
    transactionsPath,
    "utf-8"
  );

  const lines = fileContents
    .trim()
    .split(/\r?\n/)
    .filter((line) => line.trim() !== "");

  const newTransactionLine = [
    transaction.transactionDate,
    transaction.accountNumber,
    transaction.accountHolder,
    transaction.amount,
    transaction.status,
  ].join(", ");

  lines.push(newTransactionLine);


  const updatedContents = lines.join("\n");

  await fs.promises.writeFile(
    transactionsPath,
    updatedContents,
    "utf-8"
  );

  return transaction;
}