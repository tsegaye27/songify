import { Global, css } from "@emotion/react";
import React from "react";

const GlobalStyles: React.FC = () => {
  return (
    <Global
      styles={css`
        /* Reset */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        /* CSS Variables */
        :root {
          /* Colors */
          --background-color: #0a0a0a;
          --second-background-color: #121212;
          --primary-color: #1db954;
          --secondary-color: #1ed760;
          --accent-color: #282828;
          --text-color: #ffffff;
          --text-color-secondary: #b3b3b3;
          --red-primary: #e22134;
          --green-primary: #1db954;

          /* Gradients */
          --gradient-primary: linear-gradient(
            135deg,
            var(--primary-color),
            var(--secondary-color)
          );

          /* Shadows */
          --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
          --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);

          /* Transitions */
          --transition-fast: 150ms ease-in-out;
          --transition-base: 300ms ease-in-out;
          --transition-slow: 500ms ease-in-out;

          /* Border Radius */
          --radius-sm: 4px;
          --radius-md: 8px;
          --radius-lg: 12px;
          --radius-xl: 16px;
          --radius-full: 50%;

          /* Spacing */
          --space-xs: 0.25rem;
          --space-sm: 0.5rem;
          --space-md: 1rem;
          --space-lg: 1.5rem;
          --space-xl: 2rem;
          --space-2xl: 3rem;
        }

        /* Base Styles */
        html {
          font-size: 16px;
          line-height: 1.5;
        }

        body {
          font-family:
            -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
            "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
            sans-serif;
          background-color: var(--background-color);
          color: var(--text-color);
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          overflow-x: hidden;
        }

        /* Typography */
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          font-weight: 600;
          line-height: 1.25;
          color: var(--text-color);
        }

        p {
          color: var(--text-color-secondary);
          line-height: 1.6;
        }

        /* Links */
        a {
          color: var(--primary-color);
          text-decoration: none;
          transition: var(--transition-fast);

          &:hover {
            color: var(--secondary-color);
          }
        }

        /* Focus Styles */
        *:focus {
          outline: 2px solid var(--primary-color);
          outline-offset: 2px;
        }

        /* Selection */
        ::selection {
          background-color: var(--primary-color);
          color: white;
        }

        /* Scrollbar Styles */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        ::-webkit-scrollbar-track {
          background: var(--background-color);
        }

        ::-webkit-scrollbar-thumb {
          background: var(--accent-color);
          border-radius: var(--radius-sm);
        }

        ::-webkit-scrollbar-thumb:hover {
          background: var(--primary-color);
        }

        /* Firefox Scrollbar */
        * {
          scrollbar-width: thin;
          scrollbar-color: var(--accent-color) var(--background-color);
        }

        /* Utility Classes */
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }

        .text-center {
          text-align: center;
        }

        .text-left {
          text-align: left;
        }

        .text-right {
          text-align: right;
        }

        /* Animation Classes */
        .fade-in {
          animation: fadeIn 0.3s ease-in-out;
        }

        .slide-up {
          animation: slideUp 0.3s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            transform: translateY(10px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          :root {
            font-size: 14px;
          }
        }

        @media (max-width: 480px) {
          :root {
            font-size: 12px;
          }
        }
      `}
    />
  );
};

export default GlobalStyles;
