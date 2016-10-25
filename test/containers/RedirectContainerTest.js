'use strict';
import createComponent from 'helpers/shallowRenderHelper';

import { RedirectContainer } from '../../src/containers';

describe('RedirectContainer', () => {
  let redirectContainer;

  beforeEach(() => {
    redirectContainer = createComponent(RedirectContainer, '45944782');
  });

  it('RedirectContainer has a correct message', () => {
    expect(redirectContainer.props.children.props.text).to.equal('あなたはpixiv.netへリダイレクトしています');
  });
});