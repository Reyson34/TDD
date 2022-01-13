import { Account } from './Account'
import { Balance } from './Balance';

describe('Account', () => {
  it('my new account prints date, amount and balance', () => {
    const account = new Account(new Balance())
    let result = account.printStatement();

    expect(result).toBe('Date\tAmount\tBalance')
  })

  it('my new account can deposit and returns my date, amount and balance', () => {
    const account = new Account(new Balance())
    account.deposit(500);
    let result = account.printStatement();

    let expectedResult = 
      'Date        Amount  Balance\n' +
      '2021-12-02   +500      500 \n'
    expect(result).toBe(expectedResult)
  })
})
