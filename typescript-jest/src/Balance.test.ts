import { Balance } from './Balance';
import { Transaction } from './Transaction';

describe('Balance', () => {
    it('Balance should calculate it from the transactions', () => {
        let balance = new Balance()
        let transactions = [new Transaction(
            new Date(), 200
        ), new Transaction(
            new Date(), -100
        )]

        let result = balance.calculate(transactions);
        
        expect(result).toBe(100)
    })
})