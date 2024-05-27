import { Global, css } from "@emotion/react";
import React from "react";

const GlobalStyles: React.FC = () => {
  return (
    <Global
      styles={css`
        * {
          margin: 0;
          padding: 0;
        }

        :root {
          --background-color: #00ccff;
          --second-background-color: #333;
          --primary-color: #222;
          --secondary-color: #244e82;
          --tertiary-color: #aaa;
          --accent-color: #006eff;
          --text-color: #e7eef6;
          --green-primary: #00ff00;
          --red-primary: #ff0000;
          --text-color-secondary: #ccc;
          --app-layout-color: #494949;
          --app-layout-color-hover: #949494;
        }

        body {
          font-family: Arial, Helvetica, sans-serif;
        }
      `}
    />
  );
};

export default GlobalStyles;
