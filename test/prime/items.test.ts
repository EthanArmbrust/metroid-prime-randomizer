import { Item } from '../../src/common/models/item';
import { primeItems } from '../../src/common/models/prime/items';
import { expect } from 'chai';
import 'mocha';

describe('Prime Items', () => {
  it('should contain 36 entries', () => {
    const numEntries = 36;
    expect(Object.keys(primeItems).length).to.equal(numEntries);
  });
});
