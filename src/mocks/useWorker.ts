import { setupWorker, SetupWorkerApi } from "msw";
import { useEffect, useRef, useState } from "react";
import { FoodResponse } from "./DevTools";
import { getHandlers } from "./handlers";

export type WorkerConfig = {
  foodResponse: FoodResponse;
};

export function useWorker(config: WorkerConfig) {
  const [isReady, setIsReady] = useState(false);
  const configRef = useRef(config);

  // Store the config in a ref so the useEffect below that starts
  // worker runs only once, yet reads the latest config values
  // as they change in the devtools.
  useEffect(() => {
    configRef.current = config;
  }, [config]);

  useEffect(() => {
    const worker = setupWorker(...getHandlers(configRef));

    const startWorker = async (worker: SetupWorkerApi) => {
      await worker.start();
      setIsReady(true);
    };

    startWorker(worker);
  }, []);

  return isReady;
}
