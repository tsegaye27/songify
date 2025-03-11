import { useState, useEffect } from "react";
import { url } from "../api/config";

const useBackendCheck = () => {
  const [isBackendReady, setIsBackendReady] = useState(false);

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const response = await fetch(`${url}/health`);
        if (response.ok) {
          setIsBackendReady(true);
        }
      } catch (error) {
        console.error("Backend not ready, retrying...", error);
      }
    };

    const intervalId = setInterval(checkBackend, 2000);
    return () => clearInterval(intervalId);
  }, []);

  return isBackendReady;
};

export default useBackendCheck;
