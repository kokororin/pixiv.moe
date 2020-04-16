import * as AuthActions from '@/actions/auth';
import { IAuthAction } from '@/actions/auth';
import * as api from '@/utils/api';

const types = AuthActions.types;

export interface IAuthState {
  authData: any;
}

export default function auth(
  state: IAuthState = {
    authData: api.getAuth()
  },
  action: IAuthAction
): IAuthState {
  switch (action.type) {
    case types.SET_AUTH:
      return {
        ...state,
        authData: action.payload
      };

    default:
      return state;
  }
}
