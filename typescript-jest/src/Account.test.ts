import { Account } from './Account'
import { Balance } from './Balance';
import { Formatter } from './Formatter';

describe('Account', () => {
  
  it('my new account can deposit and returns my date, amount and balance', () => {
    const account = new Account(new Balance(), new Formatter())
    account.deposit(500);
    let result = account.printStatement();

    let expectedResult = 
      'Date        Amount  Balance\n' +
      '2022-01-21   +500      500 \n'
    expect(result).toBe(expectedResult)
  })

  it('my new account can withdraw and returns my date, amount and balance', () => {
    const account = new Account(new Balance(), new Formatter())
    account.deposit(500);
    account.withdraw(200)
    let result = account.printStatement();

    let expectedResult = 
      'Date        Amount  Balance\n' +
      '2022-01-21   +500      500 \n' +
      '2022-01-21   -200      300 \n'
    expect(result).toBe(expectedResult)
  })
})
