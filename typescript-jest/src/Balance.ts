import { Transaction } from "./Transaction";

export class Balance {
    calculate(transactions: Array<Transaction>): Number {
        return transactions
        .map((transaction) => transaction.value)
        .reduce((acc, val) => +acc + +val, 0)
    }
}
