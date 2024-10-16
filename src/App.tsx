import { Bounce, ToastContainer } from "react-toastify";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import AppRouter from "./router/AppRouter/AppRouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import 'react-toastify/dist/ReactToastify.css';
import { CustomConfirmDialog } from "./shared/components/ui/CustomConfirmDialog";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'



function App() {
  
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>

      <RouterProvider router={AppRouter} />

      <CustomConfirmDialog />

      <ReactQueryDevtools initialIsOpen={false} />


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
