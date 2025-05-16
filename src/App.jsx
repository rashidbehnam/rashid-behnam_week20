import React from "react";
import { ToastContainer } from "react-toastify";
import Router from "./routes/router";
import { ModalProvider } from "./Context/ModalContext";
import { ConfirmProvider } from "./Context/ConfirmContext";

import Modal from "./components/Modal";

function App() {
  return (
    <>
      <ModalProvider>
        <ConfirmProvider>
          <Router />
          <Modal />
          <ToastContainer
            position="top-center"
            autoClose={3000}
            pauseOnHover
            theme="light"
          />
        </ConfirmProvider>
      </ModalProvider>
    </>
  );
}

export default App;
