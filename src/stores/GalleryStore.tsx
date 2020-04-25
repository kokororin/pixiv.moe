import React from 'react';
import { observable } from 'mobx';
import { useLocalStore } from 'mobx-react-lite';
import * as api from '@/utils/api';

const createStore = () => {
  const store = observable({
    page: 1,
    isFetching: false,
    isError: false,
    errorTimes: 0,
    items: [] as any[],
    images: [] as string[],
    isFetchingTags: false,
    tags: [] as any[],
    word: 'ranking',
    fromIllust: false,

    fetchSource() {
      if (store.isFetching) {
        return;
      }
      store.isError = false;
      store.isFetching = true;
      if (store.word === 'ranking') {
        return api
          .ranking(store.page)
          .then(data => {
            if (data.response.illusts && data.response.illusts.length > 0) {
              data.response.illusts.forEach((elem: any) => {
                store.items = [...store.items, ...[elem]];
              });
            } else {
              store.isError = true;
              store.errorTimes = store.errorTimes + 1;
            }
          })
          .then(() => {
            store.isFetching = false;
            store.page = store.page + 1;
          })
          .catch(() => {
            store.isFetching = false;
            store.isError = true;
          });
      }

      return api
        .search({
          word: store.word,
          page: store.page
        })
        .then(data => {
          if (data.response.illusts && data.response.illusts.length > 0) {
            data.response.illusts.forEach((elem: any) => {
              store.items = [...store.items, ...[elem]];
            });
          } else {
            store.isError = true;
            store.errorTimes = store.errorTimes + 1;
          }
        })
        .then(() => {
          store.isFetching = false;
          store.page = store.page + 1;
        })
        .catch(() => {
          store.isFetching = false;
          store.isError = true;
        });
    },

    fetchTags() {
      store.isFetchingTags = true;
      return api
        .tags()
        .then(data => {
          if (data.response.tags) {
            store.tags = data.response.tags;
          }
        })
        .finally(() => {
          store.isFetchingTags = false;
        });
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

type TGalleryStore = ReturnType<typeof createStore>;

export const GalleryContext = React.createContext<TGalleryStore | null>(null);

export const GalleryProvider: React.FunctionComponent<{}> = props => {
  const store = useLocalStore(createStore);

  return (
    <GalleryContext.Provider value={store}>
      {props.children}
    </GalleryContext.Provider>
  );
};
