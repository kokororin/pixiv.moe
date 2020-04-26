import { createBrowserHistory } from 'history';
import React from 'react';

import { AuthProvider } from '@/stores/AuthStore';
import { GalleryProvider } from '@/stores/GalleryStore';
import { IllustProvider } from '@/stores/IllustStore';
import { LocaleProvider } from '@/stores/LocaleStore';
import { SiteProvider } from '@/stores/SiteStore';

// Create a history of your choosing (we're using a browser history in this case)
export const history = createBrowserHistory();

export const StoreProvider: React.FunctionComponent<{}> = props => {
  return (
    <>
      <SiteProvider>
        <LocaleProvider>
          <AuthProvider>
            <GalleryProvider>
              <IllustProvider>{props.children}</IllustProvider>
            </GalleryProvider>
          </AuthProvider>
        </LocaleProvider>
      </SiteProvider>
    </>
  );
};
