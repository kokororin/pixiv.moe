import { createBrowserHistory } from 'history';
import { combineProviders } from 'react-combine-provider';
import { AuthProvider } from './AuthStore';
import { GalleryProvider } from './GalleryStore';
import { IllustProvider } from './IllustStore';
import { LocaleProvider } from './LocaleStore';
import { SiteProvider } from './SiteStore';

// Create a history of your choosing (we're using a browser history in this case)
export const history = createBrowserHistory();

export const StoreProvider = combineProviders([
  AuthProvider,
  GalleryProvider,
  IllustProvider,
  LocaleProvider,
  SiteProvider
]);
