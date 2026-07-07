export type AcceptanceStatus = "ready" | "review" | "blocked";

export type AcceptanceStep = {
  id: string;
  title: string;
  owner: string;
  module: string;
  expectedResult: string;
  route?: string;
  status: AcceptanceStatus;
};

export type AcceptanceScenario = {
  id: string;
  title: string;
  description: string;
  priority: "Critical" | "High" | "Medium";
  outcome: string;
  steps: AcceptanceStep[];
};

export type AcceptanceMetric = {
  label: string;
  value: string;
  helper: string;
};
