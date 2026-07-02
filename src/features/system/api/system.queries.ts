// src/features/system/api/system.queries.ts

import { useQuery } from "@tanstack/react-query";
import { systemService } from "./system.service";

export function useBackendHealth() {
  return useQuery({
    queryKey: ["system", "health"],
    queryFn: systemService.health,
    retry: false,
  });
}