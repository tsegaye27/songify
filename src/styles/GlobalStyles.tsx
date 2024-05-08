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

        body {
          font-family: Arial, Helvetica, sans-serif;
        }

        .nav-links {
          /* margin: 1rem; */
          padding: 1rem;
          text-decoration: none;
          color: white;
          border: none;
          transition: all 0.3s ease-in;
        }

        .nav-links:hover {
          box-shadow: 1px 2px lightgreen;
          /* color: #7e7e7e; */
        }
      `}
    />
  );
};

export default GlobalStyles;
