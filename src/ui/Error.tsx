import React from "react";
import { useNavigate } from "react-router-dom";

const Error: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>404 Not Found</h1>
      <p>The page you're looking for does not exist.</p>
      <button onClick={() => navigate(-1)}>Go back</button>
    </div>
  );
};

export default Error;
