import { Transaction } from "./Transaction";

describe('Transaction', () => {
    it('New transaction', () => {
        let expectedDate = new Date();
        let transaction = new Transaction(expectedDate, 200)

        expect(transaction.date.toTimeString()).toBe(expectedDate.toTimeString())
        expect(transaction.value).toBe(200)
    })
})