import { use } from 'chai';
import * as deepEqualInAnyOrder from 'deep-equal-in-any-order';
import * as chaiSubset from 'chai-subset';
import * as chaiAsPromised from 'chai-as-promised';
import * as sinonChai from 'sinon-chai';
import { dbDataSource } from '../src/config/db-data-source';
import { restore } from 'sinon';

use(deepEqualInAnyOrder);
use(chaiSubset);
use(chaiAsPromised);
use(sinonChai);

before(async () => {
  try {
    await dbDataSource.initialize();
  } catch (e) {
    await dbDataSource.initialize();
  }
});

afterEach(async () => {
  restore();
});

after(async () => {
  await dbDataSource.destroy();
});
