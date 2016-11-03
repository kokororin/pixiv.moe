'use strict';
import createComponent from 'helpers/shallowRenderHelper';

import { MainContainer } from 'containers';

describe('MainContainer', () => {
  let mainContainer;

  beforeEach(() => {
    mainContainer = createComponent(MainContainer);
  });

  it('MainerContainer\'s mdl Layout has a scroll listener', () => {
    expect(mainContainer.props.onScroll.name).to.equal('scrollListener');
  });
});