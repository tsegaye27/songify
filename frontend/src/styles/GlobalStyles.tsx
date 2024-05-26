import { Global, css } from "@emotion/react";
import React from "react";

// background color #080f17
// primary color #9ab9e0
// text color #e7eef6
// secondary color #244e82
// accent color #568fd4

const GlobalStyles: React.FC = () => {
  return (
    <Global
      styles={css`
        * {
          margin: 0;
          padding: 0;
        }

        :root {
          --background-color: #44b2b2;
          --second-background-color: #0b1c1ce8;
          --primary-color: #5e6772;
          --secondary-color: #244e82;
          --accent-color: #161a1f;
          --text-color: #e7eef6;
        }

        body {
          font-family: Arial, Helvetica, sans-serif;
        }
      `}
    />
  );
};

export default GlobalStyles;
