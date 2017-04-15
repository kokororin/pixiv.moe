'use strict';
import createComponent from '../helpers/shallowRenderHelper';

import { GalleryContainerWithoutStore } from '@/containers';

describe('GalleryContainer', () => {
  let galleryContainer;

  beforeEach(() => {
    galleryContainer = createComponent(GalleryContainerWithoutStore, {
      gallery: []
    });
  });

  it('GalleryContainer\'s mdl Layout has a scroll listener', () => {
    expect(typeof(galleryContainer.props.onScroll)).to.equal('function');
  });
});
