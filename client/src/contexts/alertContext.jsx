/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

const AlertContext = createContext();

const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState(null);
  const [transition, setTransition] = useState("")

  const showAlert = (type, text) => {
    setAlert({ type, text });
    setTimeout(() => {
      setTransition("show")
    }, 100)
    setTimeout(() => {
      setTransition("")
    }, 2700)
    setTimeout(() => {
      setAlert(null)
    }, 3000);
  };

  return (
    <AlertContext.Provider value={{ alert, showAlert }}>
      {children}
      {alert && (
        <div className={`alert alert-${alert.type} ${transition}`} >
          {alert.text}
        </div>
      )}
    </AlertContext.Provider>
  );
}

export {
  AlertProvider,
  AlertContext
}