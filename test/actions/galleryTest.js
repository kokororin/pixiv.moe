'use strict';
import nock from 'nock';
import mockStore from '../helpers/mockStoreHelper';

import config from '@/config';
import { GalleryActions } from '@/actions';

describe('GalleryActions', () => {
  afterEach(() => {
    nock.cleanAll()
  });

  it('fire SET_FETCH_ERROR when fetching sources has been done', (done) => {
    nock(config.baseURL)
      .get(`${config.galleryURI}/nico/1`)
      .reply(200);

    const expectedActions = [
      {
        type: GalleryActions.SET_FETCH_ERROR,
        payload: {
          isError: false
        }
      }
    ];
    const store = mockStore({
      gallery: {}
    }, expectedActions, done)
    store.dispatch(GalleryActions.fetchSourceIfNeeded());
  });
});
