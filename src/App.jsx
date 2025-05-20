import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "@routes";
import { SideNav } from "@widgets/SideNav";

import "./tailstyle.css";
import "./App.css";

function App() {
  return (
    <BrowserRouter basename="/SIXID-FE">
      <div className="container h-[100vh] p-[10px] lg:p-[30px] text-center">
        <div className="relative h-[100%] flex gap-[10px]">
          <SideNav />
          <AppRoutes />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
