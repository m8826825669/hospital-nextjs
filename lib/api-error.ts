import axios from "axios";

type FastApiValidationError = {
  loc?: (string | number)[];
  msg?: string;
  type?: string;
};

export function getApiErrorMessages(error: unknown): string[] {
  if (!axios.isAxiosError(error)) {
    return ["Something went wrong. Please try again."];
  }

  const detail = error.response?.data?.detail;

  if (Array.isArray(detail)) {
    return detail.map((item: FastApiValidationError) => {
      const field = item.loc?.slice(1).join(".") || "field";
      return `${field}: ${item.msg || "Invalid value"}`;
    });
  }

  if (typeof detail === "string") {
    return [detail];
  }

  return ["Request failed. Please check your input and try again."];
}