// import logo from "./logo.svg";
// import "./App.css";
import { ToastContainer } from "react-toastify";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { Fragment } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoute from "./routes/AppRoute";
const App = () => {
  return (
    <Fragment>
      <Provider store={store}>
        <BrowserRouter>
          <AppRoute />
          <ToastContainer />
        </BrowserRouter>
      </Provider>
    </Fragment>
  );
};

export default App;
