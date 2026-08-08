import { Router } from "express";
import { getTransactions } from "../services/transactionService";
import { Transaction } from "../models/transactions";
import { addNewTransaction } from "../services/transactionService";

const router = Router();

/**
 * @openapi
 * /get-transactions:
 *   get:
 *     summary: Get all transactions
 *     responses:
 *       200:
 *         description: A list of transactions
 */

router.get("/get-transactions", async (req, res) => {
    const transactions = await getTransactions();
    res.json(transactions);
});

/**
 * @openapi
 * /add-new-transaction:
 *   post:
 *     summary: Add a new transaction
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               transactionDate:
 *                 type: string
 *               accountNumber:
 *                 type: string
 *               accountHolder:
 *                 type: string
 *               amount:
 *                 type: number
 *               status:
 *                 type: string
 *                 enum: [Pending, Settled, Failed]
 *             required:
 *               - accountNumber
 *               - accountHolder
 *               - amount
 *               - status
 *     responses:
 *       201:
 *         description: Transaction added
 */

router.post("/add-new-transaction", async (req, res) => {
    const today = new Date().toISOString().split("T")[0]; 
   const transaction = {
    ...req.body,
    transactionDate: today
   } as Transaction;
   

   if (!transaction.transactionDate ||!transaction.accountNumber ||!transaction.accountHolder || transaction.amount === undefined || !transaction.status) {
        return res.status(400).json({ error: "Missing required transaction fields" });
    }

    const addedNewTransaction = await addNewTransaction(transaction);
    res.status(201).json(addedNewTransaction);
});

export default router;