import { Router } from "express";
import { getTransactions, addNewTransaction, getTransactionByStatus, searchTransactionByAccountHolder } from "../services/transactionService";
import { Transaction, transactionStatus } from "../models/transactions";
import { normalizeDateInput } from "../utils/dateUtils";

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
 * /get-transactions/pending:
 *   get:
 *     summary: Get all transactions if filter is pending
 *     responses:
 *       200:
 *         description: A list of transactions
 */

router.get("/get-transactions/pending", async (_req, res) => {
  const transactions = await getTransactionByStatus("Pending");
  res.json(transactions);
});

/**
 * @openapi
 * /get-transactions/settled:
 *   get:
 *     summary: Get all transactions if filter is settled
 *     responses:
 *       200:
 *         description: A list of transactions
 */

router.get("/get-transactions/settled", async (_req, res) => {
  const transactions = await getTransactionByStatus("Settled");
  res.json(transactions);
});

/**
 * @openapi
 * /get-transactions/failed:
 *   get:
 *     summary: Get all transactions if filter is failed
 *     responses:
 *       200:
 *         description: A list of transactions
 */

router.get("/get-transactions/failed", async (_req, res) => {
  const transactions = await getTransactionByStatus("Failed");
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
  const normalizedTransactionDate = normalizeDateInput(req.body?.transactionDate);

  const transaction = {
    ...req.body,
    transactionDate: normalizedTransactionDate,
  } as Transaction;

  if (
    !transaction.transactionDate ||
    !transaction.accountNumber ||
    !transaction.accountHolder ||
    transaction.amount === undefined ||
    !transaction.status
  ) {
    return res.status(400).json({ error: "Missing required transaction fields" });
  }

  const addedNewTransaction = await addNewTransaction(transaction);
  res.status(201).json(addedNewTransaction);
});

/**
 * @openapi
 /get-transactions/search:
 *   get:
 *     summary: Search transactions by account holder
 *     parameters:
 *       - in: query
 *         name: accountHolder
 *         required: true
 *         schema:
 *           type: string
 *         description: Partial or full account holder name
 *     responses:
 *       200:
 *         description: A list of matching transactions
 *       400:
 *         description: accountHolder query param is required
 */


router.get("/get-transactions/search", async (req, res) => {
  const accountHolder = String(req.query.accountHolder ?? "").trim();

  if (!accountHolder) {
    return res
      .status(400)
      .json({ error: "accountHolder query param is required" });
  }

  const results = await searchTransactionByAccountHolder(accountHolder);
  res.json(results);
});
export default router;


