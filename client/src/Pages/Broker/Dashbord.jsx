import React, { useState } from "react";
import "./Dashbord.css";
import DasbordHome from "./DasbordHome.jsx";
import DashHeader from "./DashHeader.jsx";
import DashSlider from "./DashSlider.jsx";

export default function dashbord() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <div className="grid-container">
      <DashHeader OpenSidebar={OpenSidebar} />
      <DashSlider
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
      <DasbordHome />
    </div>
  );
}
