import { Balance } from "./Balance";
import { Formatter } from "./Formatter";
import { Transaction } from "./Transaction"

export class Account {
  balance: Balance;
  formatter: Formatter;
  list: Array<Transaction>;

  constructor(balance: Balance, formatter: Formatter) {
    this.balance = balance;
    this.formatter =  formatter;
    this.list = new Array
  }

  formatTab = (list) => {
    const initialTab = [
      ['Date'],
      ['Amount'],
      ['Balance']
    ]
    for (var i = 0; i < list.length; i++) {
      initialTab[0].push(list[i].date.toISOString().split('T')[0])
      initialTab[1].push('+' + list[i].value)
      initialTab[2].push(this.balance.calculate(list.slice(0, i + 1)).toString())
    }
    return initialTab
  }

  printStatement(): string {
    // needs to be in separated class

    const tranformTab = this.formatTab(this.list)

    return this.formatter.format(tranformTab)
  }

  deposit(amount): void {
    this.list.push(new Transaction(new Date(), amount))
  }

}
