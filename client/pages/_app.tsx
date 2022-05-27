import "../styles/globals.css";
import MainLayout from "../layouts/main-layout";
import "bootstrap/dist/css/bootstrap.css";
import { Provider } from "react-redux";
import { createStore } from "../store/createStore";
const store = createStore();
function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </Provider>
  );
}

export default MyApp;
