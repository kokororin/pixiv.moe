import React from 'react';
import { observable } from 'mobx';
import { useLocalStore } from 'mobx-react-lite';
import * as api from '@/utils/api';
import getImagesFromZip from '@/utils/getImagesFromZip';

const createStore = () => {
  const store = observable({
    items: {} as any,
    comments: [] as any[],
    page: 1,
    isCommentsEnd: false,
    isFetching: true,
    isError: false,
    isFetchingComments: true,
    isCommentsError: false,

    fetchItem(illustId: string) {
      store.isFetching = true;
      store.isError = false;
      return api
        .illust(illustId)
        .then(data => {
          if (data?.response?.illust?.type === 'manga') {
            api.illustUgoira(illustId).then(ugoiraData => {
              let zipURL = ugoiraData.response.src;
              zipURL = api.proxyImage(zipURL);
              getImagesFromZip(zipURL)
                .then(images => {
                  data.response.illust.zip_images = images;
                  store.items[illustId] = data.response.illust;
                })
                .then(() => {
                  store.isFetching = false;
                });
            });
          } else {
            store.items[illustId] = data.response.illust;
            store.isFetching = false;
          }
        })
        .catch(() => {
          store.isFetching = false;
          store.isError = true;
        });
    },

    fetchComments(illustId: string) {
      store.isFetchingComments = true;
      store.isCommentsError = false;
      return api
        .illustComments(illustId, {
          page: store.page
        })
        .then(data => {
          if (data.response.comments) {
            if (data.response.next) {
              store.page = store.page + 1;
            } else {
              store.isCommentsEnd = true;
            }
            store.comments = [...store.comments, ...data.response.comments];
          }
        })
        .then(() => {
          store.isFetchingComments = false;
        })
        .catch(() => {
          store.isFetchingComments = false;
          store.isCommentsError = true;
        });
    },

    clearComments() {
      store.comments = [];
      store.page = 1;
      store.isCommentsEnd = false;
    }
  });
  return store;
};

type TIllustStore = ReturnType<typeof createStore>;

export const IllustContext = React.createContext<TIllustStore | null>(null);

export const IllustProvider: React.FC<{}> = props => {
  const store = useLocalStore(createStore);

  return (
    <IllustContext.Provider value={store}>
      {props.children}
    </IllustContext.Provider>
  );
};
