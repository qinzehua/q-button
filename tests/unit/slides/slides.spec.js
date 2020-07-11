import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
chai.use(sinonChai);

import Slides from '@/slides/slides';
import { mount } from '@vue/test-utils';

describe('Slides', () => {
  it('Slides 存在', () => {
    expect(Slides).to.exist;
  });
});
