import {Balance} from "./Balance";

export class Account {
  balance: Balance;

  constructor(balance: Balance) {
    this.balance = balance;
  }

  printStatement(): string {
    // needs to be in separated class
    return 'Date\tAmount\tBalance';
  }

  deposit(amount): void {
    const balance = new Balance;
    balance.deposit(amount);
  }


}
