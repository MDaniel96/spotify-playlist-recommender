import { use } from 'chai';
import * as deepEqualInAnyOrder from 'deep-equal-in-any-order';
import * as chaiSubset from 'chai-subset';
import * as sinonChai from 'sinon-chai';

use(deepEqualInAnyOrder);
use(chaiSubset);
use(sinonChai);
