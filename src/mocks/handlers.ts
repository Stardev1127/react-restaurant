// src/mocks/handlers.js
import { rest } from "msw";
import { MutableRefObject } from "react";
import * as mockFoods from "./mockFoods";
import { WorkerConfig } from "./useWorker";

export function getHandlers(config: MutableRefObject<WorkerConfig>) {
  return [
    rest.get("http://localhost:3001/foods", (req, res, ctx) => {
      // 500 Internal Server Error
      // Slowly
      // Insufficient rights
      return res(
        ctx.status(200),
        ctx.json(
          config.current.foodResponse === "Diner"
            ? mockFoods.mockDiner
            : mockFoods.mockIceCreamShop
        )
      );
    }),
  ];
}
