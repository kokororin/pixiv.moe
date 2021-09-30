import React, { createContext } from 'react';
import { observable } from 'mobx';
import { useLocalStore } from 'mobx-react-lite';
import * as api from '../utils/api';
import Storage from '../utils/Storage';

export const createStore = () => {
  const store = observable({
    page: 1,
    xRestrict: false,
    isFetching: false,
    isError: false,
    errorMsg: '',
    errorTimes: 0,
    items: [] as any[],
    images: [] as string[],
    isFetchingTags: false,
    tags: [] as any[],
    word: 'ranking',
    fromIllust: false,

    async fetchSource() {
      if (store.isFetching) {
        return;
      }
      store.isError = false;
      store.isFetching = true;
      try {
        const data =
          store.word === 'ranking'
            ? await api.ranking(store.page)
            : await api.search({
                word: store.word,
                page: store.page
                // x_restrict: store.xRestrict ? 1 : 0
              });
        if (data.response.illusts && data.response.illusts.length > 0) {
          data.response.illusts.forEach((elem: any) => {
            store.items = [...store.items, ...[elem]];
          });
        } else {
          store.isError = true;
          store.errorTimes = store.errorTimes + 1;
        }
        store.page = store.page + 1;
      } catch (err) {
        if (err instanceof api.APIError) {
          store.errorMsg = err.message;
        }
        store.isError = true;
      } finally {
        store.isFetching = false;
      }
    },

    async fetchTags() {
      store.isFetchingTags = true;
      try {
        const data = await api.tags({
          lang: Storage.get('lang')
        });
        if (data.response.tags) {
          store.tags = data.response.tags;
        }
      } finally {
        store.isFetchingTags = false;
      }
    },

    clearErrorTimes() {
      store.errorTimes = 0;
    },

    clearSource() {
      store.items = [];
      store.images = [];
    },

    setWord(word: string) {
      store.word = word;
    },

    setFromIllust(fromIllust: boolean) {
      store.fromIllust = fromIllust;
    }
  });
  return store;
};

type GalleryStore = ReturnType<typeof createStore>;

export const GalleryContext = createContext<GalleryStore>({} as GalleryStore);

export const GalleryProvider: React.FC<{}> = props => {
  const store = useLocalStore(createStore);

  return (
    <GalleryContext.Provider value={store}>
      {props.children}
    </GalleryContext.Provider>
  );
};
