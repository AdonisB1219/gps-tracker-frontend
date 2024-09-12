import { Bounce, ToastContainer } from "react-toastify";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import AppRouter from "./router/AppRouter/AppRouter";
import { useEffect } from "react";
import { users } from "./shared/__mocks__/users";

function App() {
  useEffect(() => {
    const initialData = {
      user: 'admin@admin.com',
      role: 'admin',
      password: 'password'
    };
    localStorage.setItem('userData', JSON.stringify(initialData));
    localStorage.setItem('mockedUsers', JSON.stringify(users))
    

    console.log('Datos iniciales seteados en localStorage');
  }, []);

  return (
    <>
      <RouterProvider router={AppRouter} />

      <ToastContainer
        position="top-right"
        autoClose={5000}
        limit={3}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
}

export default App;
