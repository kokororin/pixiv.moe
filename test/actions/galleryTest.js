import honoka from 'honoka';
import mockStore from '../helpers/mockStoreHelper';

import config from '@/config';
import * as GalleryActions from '@/actions/gallery';

describe('GalleryActions', () => {
  beforeEach(() => {
    honoka.defaults.baseURL = config.apiBaseURL;
  });

  it('fire SET_FETCH_ERROR when fetching sources has been done', done => {
    const expectedActions = [
      {
        type: GalleryActions.types.SET_FETCH_ERROR,
        payload: {
          isError: false
        }
      }
    ];
    const store = mockStore(
      {
        gallery: {}
      },
      expectedActions,
      done
    );
    store.dispatch(GalleryActions.fetchSourceIfNeeded());
  });
});
