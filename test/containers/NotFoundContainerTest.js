import createComponent from '../helpers/shallowRenderHelper';

import { NotFoundContainer } from '@/containers';

describe('NotFoundContainer', () => {
  let notFoundContainer;

  beforeEach(() => {
    notFoundContainer = createComponent(NotFoundContainer);
  });

  it('NotFoundContainer has a correct message', () => {
    expect(notFoundContainer.props.text).to.equal(
      'エラーが発生しました。URLを確認するか、しばらく時間を置いて再度アクセスしてください。'
    );
  });
});
