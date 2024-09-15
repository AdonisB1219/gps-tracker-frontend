import { Bounce, ToastContainer } from "react-toastify";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import AppRouter from "./router/AppRouter/AppRouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>

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
    </QueryClientProvider>
  );
}

export default App;
