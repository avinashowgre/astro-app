import React, { useEffect, useState } from "react";

export function useAsyncQuery(apiPath, params) {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    let active = true;
    let response = undefined;

    (async () => {
      setIsLoading(true);

      try {
        response = await fetch(apiPath).then((data) => data.json());
      } catch (e) {
        setError(e);
      } finally {
        setIsLoading(false);
      }

      if (active) {
        setData(response);
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  return {
    data,
    error,
    isLoading,
  };
}
