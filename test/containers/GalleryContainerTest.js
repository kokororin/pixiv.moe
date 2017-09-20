import createComponent from '../helpers/shallowRenderHelper';

import { GalleryContainerWithoutStore } from '@/containers';
import config from '@/config';

describe('GalleryContainer', () => {
  let galleryContainer;

  beforeEach(() => {
    galleryContainer = createComponent(GalleryContainerWithoutStore, {
      gallery: []
    });
  });

  it('GalleryContainerの has a title', () => {
    expect(galleryContainer.props.title).to.equal(config.siteTitle);
  });
});
