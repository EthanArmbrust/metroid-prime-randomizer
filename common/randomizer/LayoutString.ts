import * as bigInt from 'big-integer';
import {ItemCollection} from './collection/ItemCollection';
import {BigInteger} from 'big-integer';

export class LayoutString {
  protected readonly TABLE: string = 'ABCDEFGHIJKLMNOPQRSTUWVXYZabcdefghijklmnopqrstuwvxyz0123456789-_';
  REV_TABLE: Map<string, number> = new Map<string, number>();

  constructor() {
    for (let i = 0; i < this.TABLE.length; i++) {
      this.REV_TABLE.set(this.TABLE[i], i);
    }
  }

  public encode_pickup_layout(layout: Array<number>) {
    let num = bigInt(0);
    layout.forEach(function (item_type) {
      num = num.times(36).plus(item_type);
    });

    const checksum = this.compute_checksum(num);
    num = num.plus(bigInt(checksum).shiftLeft(517));

    const even_bits = [];
    const odd_bits = [];
    let all_bits: any = num.toString(2);
    for (let i = 0; i < all_bits.length; i++) {
      if (i % 2) {
        odd_bits.push(all_bits[i]);
      } else {
        even_bits.push(all_bits[i]);
      }
    }

    odd_bits.reverse();
    all_bits = [];
    for (let i = 0; i < even_bits.length; i++) {
      all_bits.push(even_bits[i]);
      all_bits.push(odd_bits[i]);
    }
    num = bigInt(all_bits.join(''), 2);

    let s = '';
    for (let i = 0; i < 87; i++) {
      const divmod: any = num.divmod(64);
      num = divmod.quotient;

      s = s + this.TABLE[divmod.remainder];
    }

    return s;
  }


  public compute_checksum(layout_number: BigInteger) {
    let s = bigInt(0);
    while (layout_number.greater(0)) {
      const divmod = layout_number.divmod(32);
      s = s.add(divmod.remainder).mod(32);
      layout_number = divmod.quotient;
    }
    return s;
  }
}
