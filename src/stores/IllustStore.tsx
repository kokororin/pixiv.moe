import React, { createContext } from 'react';
import { observable } from 'mobx';
import { useLocalStore } from 'mobx-react-lite';
import * as api from '../utils/api';
import getImagesFromZip from '../utils/getImagesFromZip';

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
    errorMsg: '',

    async fetchItem(illustId: string) {
      store.isFetching = true;
      store.isError = false;

      try {
        const data = await api.illust(illustId);
        if (data?.response?.illust?.type === 'manga') {
          try {
            const ugoiraData = await api.illustUgoira(illustId);
            let zipURL = ugoiraData.response.src;
            zipURL = api.proxyImage(zipURL);
            const images = await getImagesFromZip(zipURL);
            data.response.illust.zip_images = images;
            store.items[illustId] = data.response.illust;
            store.isFetching = false;
          } catch (err) {
            store.items[illustId] = data.response.illust;
            store.isFetching = false;
          }
        } else {
          store.items[illustId] = data.response.illust;
          store.isFetching = false;
        }
      } catch (err) {
        if (err instanceof api.APIError) {
          store.errorMsg = err.message;
        } else {
          store.errorMsg = '';
        }
        store.isFetching = false;
        store.isError = true;
      } finally {
      }
    },

    async fetchComments(illustId: string) {
      store.isFetchingComments = true;
      // store.isCommentsError = false;
      try {
        const data = await api.illustComments(illustId, {
          page: store.page
        });
        if (data.response.comments) {
          if (data.response.next) {
            store.page = store.page + 1;
          } else {
            store.isCommentsEnd = true;
          }
          store.comments = [...store.comments, ...data.response.comments];
        }
        store.isFetchingComments = false;
      } catch (err) {
        store.isFetchingComments = false;
        // store.isCommentsError = true;
        store.comments = [];
        store.isCommentsEnd = true;
      }
    },

    clearComments() {
      store.comments = [];
      store.page = 1;
      store.isCommentsEnd = false;
    }
  });
  return store;
};

type IllustStore = ReturnType<typeof createStore>;

export const IllustContext = createContext<IllustStore>({} as IllustStore);

export const IllustProvider: React.FC<{}> = props => {
  const store = useLocalStore(createStore);

  return (
    <IllustContext.Provider value={store}>
      {props.children}
    </IllustContext.Provider>
  );
};
