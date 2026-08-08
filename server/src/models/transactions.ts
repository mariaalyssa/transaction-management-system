export type transactionStatus = "Pending" | "Settled" | "Failed";

export interface Transaction {
    transactionDate: string;
    accountNumber: string;
    accountHolder: string;
    amount: number;
    status: transactionStatus;
}