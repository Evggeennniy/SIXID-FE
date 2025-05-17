import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "@routes";
import { AppNav } from "@widgets/AppNav";

import "./tailstyle.css";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="container h-[100vh] p-[10px] lg:p-[30px] text-center">
        <div className="relative h-[100%] flex gap-[10px]">
          <AppNav />
          <AppRoutes />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
