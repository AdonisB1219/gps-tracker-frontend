import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Nullable } from '../../shared/interfaces/global';
import { User } from '../../shared/interfaces/app/user.interface';


export type UserLogin = Nullable<User>;

interface AuthStore {
  ///* state
  token: string;
  user: UserLogin;
  isAuth: boolean;
  isLoading: boolean;

  ///* actions
  setAuth: (token: string) => void;
  logout: () => Promise<void>;
  logOutWithoutToken: () => void;
  setisLoading: (loading: boolean) => void;
  setUser: (user: UserLogin) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    set => ({
      token: '',
      user: null,
      isAuth: false,
      isLoading: false,

      ///* actions
      setAuth: token => {
        set({ token, isAuth: !!token });
      },

      logout: async () => {

        set({ token: '', user: null, isAuth: false });

        localStorage.removeItem('auth');

        // window.location.reload();
      },

      logOutWithoutToken: () => {
        set({ token: '', user: null, isAuth: false });
      },

      setisLoading: loading => {
        set({ isLoading: loading });
      },

      setUser: user => {
        set({ user });
      },
    }),

    // localStorage
    {
      name: 'auth',
    }
  )
);
