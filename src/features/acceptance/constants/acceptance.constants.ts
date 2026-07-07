import type { AcceptanceMetric, AcceptanceScenario } from "../types/acceptance.types";

export const acceptanceMetrics: AcceptanceMetric[] = [
  {
    label: "Foundation modules",
    value: "9",
    helper: "Settings, departments, wards, beds, employees, doctors, users, roles, permissions",
  },
  {
    label: "Validation mode",
    value: "GUI only",
    helper: "No Swagger, Postman, or direct database edits during acceptance testing",
  },
  {
    label: "Target routes",
    value: "34+",
    helper: "Existing application routes remain stable after the frontend platform work",
  },
  {
    label: "Release gate",
    value: "npm validate",
    helper: "ESLint, TypeScript, and production build must all pass",
  },
];

export const acceptanceScenarios: AcceptanceScenario[] = [
  {
    id: "admin-foundation",
    title: "Hospital administration foundation",
    description:
      "Validate that a hospital administrator can configure the operational master data required before patient workflows begin.",
    priority: "Critical",
    outcome: "Hospital master data is ready for reception, clinical, billing, and bed-management workflows.",
    steps: [
      {
        id: "settings",
        title: "Update hospital settings",
        owner: "Hospital Administrator",
        module: "Settings",
        expectedResult: "Hospital name, code, active status, and core settings save successfully.",
        route: "/admin",
        status: "ready",
      },
      {
        id: "departments",
        title: "Create clinical and non-clinical departments",
        owner: "Hospital Administrator",
        module: "Departments",
        expectedResult: "Departments are searchable, editable, and available for downstream assignment.",
        route: "/admin",
        status: "ready",
      },
      {
        id: "wards",
        title: "Create wards",
        owner: "Hospital Administrator",
        module: "Wards",
        expectedResult: "Wards save with name, ward type, floor, and active status.",
        route: "/admin",
        status: "ready",
      },
      {
        id: "beds",
        title: "Create beds linked to wards",
        owner: "Hospital Administrator",
        module: "Beds",
        expectedResult: "Beds use a ward dropdown, valid bed type, status, and active flag.",
        route: "/admin",
        status: "ready",
      },
    ],
  },
  {
    id: "workforce-access",
    title: "Workforce and access foundation",
    description:
      "Validate that workforce records and access controls can be created entirely from the Administration console.",
    priority: "Critical",
    outcome: "Users, employees, doctors, roles, and permissions are ready for authenticated workflows.",
    steps: [
      {
        id: "employees",
        title: "Create employee records",
        owner: "HR Manager",
        module: "Employees",
        expectedResult: "Employee records are created, listed, searched, edited, and deactivated from the GUI.",
        route: "/admin",
        status: "ready",
      },
      {
        id: "doctors",
        title: "Create doctor profiles",
        owner: "Medical Administration",
        module: "Doctors",
        expectedResult: "Doctors are available for appointment and OPD workflows.",
        route: "/admin",
        status: "ready",
      },
      {
        id: "users",
        title: "Create user accounts",
        owner: "System Administrator",
        module: "Users",
        expectedResult: "Users can be created and prepared for role assignment without Swagger.",
        route: "/admin",
        status: "ready",
      },
      {
        id: "roles-permissions",
        title: "Review roles and permissions",
        owner: "System Administrator",
        module: "Roles & Permissions",
        expectedResult: "Role and permission data is visible, searchable, and ready for authorization workflows.",
        route: "/admin",
        status: "ready",
      },
    ],
  },
  {
    id: "patient-journey-readiness",
    title: "Patient journey readiness",
    description:
      "Validate that the foundation supports the next phase: reception, patient registration, appointments, OPD, billing, diagnostics, pharmacy, and IPD.",
    priority: "High",
    outcome: "Phase B can start without returning to foundational master-data gaps.",
    steps: [
      {
        id: "receptionist-ready",
        title: "Receptionist user readiness",
        owner: "System Administrator",
        module: "Users",
        expectedResult: "A receptionist user and role exist for patient registration testing.",
        route: "/admin",
        status: "review",
      },
      {
        id: "doctor-ready",
        title: "Doctor availability readiness",
        owner: "Medical Administration",
        module: "Doctors",
        expectedResult: "At least one active doctor exists for appointments and OPD testing.",
        route: "/admin",
        status: "review",
      },
      {
        id: "bed-ready",
        title: "Bed allocation readiness",
        owner: "Hospital Administrator",
        module: "Beds",
        expectedResult: "At least one active available bed exists for admission testing.",
        route: "/admin",
        status: "review",
      },
      {
        id: "build-gate",
        title: "Frontend validation gate",
        owner: "Engineering",
        module: "Platform",
        expectedResult: "npm run validate passes before Phase B starts.",
        status: "ready",
      },
    ],
  },
];
