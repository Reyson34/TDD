import { Account } from './Account'

describe('Account', () => {
  it('my new account prints date, amount and balance', () => {
    const account = new Account()
    let result = account.printStatement();

    expect(result).toBe('Date\tAmount\tBalance')
  })

  it('my new account can deposit and returns my date, amount and balance', () => {
    const account = new Account()
    account.deposit(500);
    let result = account.printStatement();

    expect(result).toBe('Date\tAmount\tBalance')
  })
})
