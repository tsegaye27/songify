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
          --background-color: #1a1a2e; /* Darker primary background */
          --second-background-color: #0f0f1a; /* Darker secondary background */
          --primary-color: #4a90e2; /* Smooth blue primary color */
          --secondary-color: #5cdb95; /* Subtle green for balance */
          --tertiary-color: #ff6f61; /* Muted coral for emphasis */
          --accent-color: #a8e6cf; /* Light green accent color */
          --text-color: #e0e0e0; /* Light text color */
          --green-primary: #32ff7e; /* Smooth green */
          --red-primary: #ff4e50; /* Smooth red */
          --text-color-secondary: #a0a0a0; /* Softer secondary text color */
          --app-layout-color: #222; /* Dark layout color */
          --app-layout-color-hover: #333; /* Slightly lighter on hover */
        }

        body {
          font-family: Arial, Helvetica, sans-serif;
          background-color: var(--background-color);
          color: var(--text-color);
        }
      `}
    />
  );
};

export default GlobalStyles;
