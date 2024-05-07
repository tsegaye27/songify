import React from "react";
import SideNav from "./SideNav";
import { Outlet } from "react-router-dom";

const AppLayout: React.FC = () => {
  return (
    <div>
      <header>Header</header>
      <SideNav />
      <main>
        <Outlet />
      </main>
      <footer>Footer</footer>
    </div>
  );
};

export default AppLayout;
