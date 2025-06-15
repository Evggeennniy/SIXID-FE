import { BrowserRouter, useLocation } from "react-router-dom";
import { AppRoutes } from "@routes";
import { SideNav } from "@widgets/SideNav";

import "./tailstyle.css";
import "./App.css";

import React from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store/store";

// Layout component to handle routing and conditional SideNav
function Layout() {
  const location = useLocation();
  const hideSideNav = location.pathname.startsWith("/auth");

  return (
    <div className="container min-h-screen p-[10px] xl:p-[30px] text-center">
      <div className="h-full flex items-stretch gap-[20px] relative">
        {!hideSideNav && <SideNav />}
        <AppRoutes />
      </div>
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
