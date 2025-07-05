import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import store from "./redux/store/store.ts";
import { checkAuthStart } from "./redux/slices/authSlice.ts";
import { BrowserRouter as Router } from "react-router-dom";

store.dispatch(checkAuthStart());

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
);
