
import { useAuthStore } from './auth.store';


export type LoginData = {
  username_or_email: string;
  password: string;
};

export const useLogin = (data: { username_or_email: any; password: any; }) => {
  const setAuth = useAuthStore(s => s.setAuth);
  // const logOutWithoutToken = useAuthStore(s => s.logOutWithoutToken);
  const user = localStorage.getItem('userData');
  const userJson = JSON.parse(user!);

  const {email, password} = {
    email: data.username_or_email,
    password: data.password,
  }

  if(email == userJson?.user && password == userJson.password) return setAuth("token");


};
