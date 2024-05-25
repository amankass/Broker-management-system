import React from "react";
//import { FaSun, FaMoon } from "react-icons/fa"; // Import icons from react-icons
import "./DarkMode.css";

const DarkMode = () => {
  const setDarkMode = () => {
    document.querySelector("body").setAttribute("data-theme", "dark");
  };
  const setLightMode = () => {
    document.querySelector("body").setAttribute("data-theme", "light");
  };
  const toggleTheme = (e) => {
    if (e.target.checked) setDarkMode();
    else setLightMode();
  };

  return (
    <div className="dark_mode">
      <input
        className="dark_mode_input"
        type="checkbox"
        id="darkmode-toggle"
        onChange={toggleTheme}
      />
      <label className="dark_mode_label top-5" htmlFor="darkmode-toggle">
        {/* <FaSun /> 
        <FaMoon />  */}
      </label>
    </div>
  );
};

export default DarkMode;
