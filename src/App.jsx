import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "@routes";
import { SideNav } from "@widgets/SideNav";

import "./tailstyle.css";
import "./App.css";
import { Provider } from "react-redux";
import store from "./redux/store/store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter basename='/SIXID-FE'>
        <div className='container h-[100vh] p-[10px] lg:p-[30px] text-center'>
          <div className='relative h-[100%] flex gap-[10px]'>
            <SideNav />
            <AppRoutes />
          </div>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
