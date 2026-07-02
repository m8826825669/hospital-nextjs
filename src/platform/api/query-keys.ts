// src/platform/api/query-keys.ts

  export const queryKeys = {
  doctors: {
    all: ["doctors"] as const,
    list: (params: unknown) => ["doctors", "list", params] as const,
    detail: (id: string) => ["doctors", "detail", id] as const,
    departments: (id: string) => ["doctors", id, "departments"] as const,
    schedules: (id: string) => ["doctors", id, "schedules"] as const,
    slots: (id: string, params: unknown) =>
      ["doctors", id, "available-slots", params] as const,
  },

  patients: {
    all: ["patients"] as const,
    list: (params: unknown) => ["patients", "list", params] as const,
    detail: (id: string) => ["patients", "detail", id] as const,
    timeline: (id: string) => ["patients", id, "timeline"] as const,
    documents: (id: string) => ["patients", id, "documents"] as const,
  },
  // src/platform/api/query-keys.ts

  appointments: {
    all: ["appointments"] as const,
    list: (params: unknown) => ["appointments", "list", params] as const,
    detail: (id: string) => ["appointments", "detail", id] as const,
    slots: (params: unknown) => ["appointments", "slots", params] as const,
  },
  opd: {
  all: ["opd"] as const,
  list: (params: unknown) => ["opd", "list", params] as const,
  detail: (id: string) => ["opd", "detail", id] as const,
  prescriptions: (id: string) => ["opd", id, "prescriptions"] as const,
  labOrders: (id: string) => ["opd", id, "lab-orders"] as const,
  timeline: (id: string) => ["opd", id, "timeline"] as const,
},
pharmacy: {
  all: ["pharmacy"] as const,
  medicines: {
    all: ["pharmacy", "medicines"] as const,
    list: (params: unknown) => ["pharmacy", "medicines", "list", params] as const,
    detail: (id: string) => ["pharmacy", "medicines", "detail", id] as const,
    batches: (id: string) => ["pharmacy", "medicines", id, "batches"] as const,
    transactions: (id: string) =>
      ["pharmacy", "medicines", id, "transactions"] as const,
  },
  invoices: {
    all: ["pharmacy", "invoices"] as const,
    list: (params: unknown) => ["pharmacy", "invoices", "list", params] as const,
    detail: (id: string) => ["pharmacy", "invoices", "detail", id] as const,
  },
},
billing: {
  all: ["billing"] as const,
  invoices: {
    all: ["billing", "invoices"] as const,
    list: (params: unknown) => ["billing", "invoices", "list", params] as const,
    detail: (id: string) => ["billing", "invoices", "detail", id] as const,
    items: (id: string) => ["billing", "invoices", id, "items"] as const,
    payments: (id: string) => ["billing", "invoices", id, "payments"] as const,
  },
},
ipd: {
  all: ["ipd"] as const,
  list: (params: unknown) => ["ipd", "list", params] as const,
  detail: (id: string) => ["ipd", "detail", id] as const,
  bedAllocations: (id: string) => ["ipd", id, "bed-allocations"] as const,
  statusHistory: (id: string) => ["ipd", id, "status-history"] as const,
},
ot: {
  all: ["ot"] as const,
  surgeries: {
    all: ["ot", "surgeries"] as const,
    list: (params: unknown) => ["ot", "surgeries", "list", params] as const,
    detail: (id: string) => ["ot", "surgeries", "detail", id] as const,
    timeline: (id: string) => ["ot", "surgeries", id, "timeline"] as const,
  },
  theatres: {
    all: ["ot", "theatres"] as const,
    list: (params: unknown) => ["ot", "theatres", "list", params] as const,
  },
},
lis: {
  all: ["lis"] as const,
  samples: {
    all: ["lis", "samples"] as const,
    list: (params: unknown) => ["lis", "samples", "list", params] as const,
    detail: (id: string) => ["lis", "samples", "detail", id] as const,
    results: (id: string) => ["lis", "samples", id, "results"] as const,
    timeline: (id: string) => ["lis", "samples", id, "timeline"] as const,
  },
  tests: {
    all: ["lis", "tests"] as const,
    list: (params: unknown) => ["lis", "tests", "list", params] as const,
  },
},
 insurance: {
  all: ["insurance"] as const,
  claims: {
    all: ["insurance", "claims"] as const,
    list: (params: unknown) =>
      ["insurance", "claims", "list", params] as const,
    detail: (id: string) =>
      ["insurance", "claims", "detail", id] as const,
    settlements: (id: string) =>
      ["insurance", "claims", id, "settlements"] as const,
    timeline: (id: string) =>
      ["insurance", "claims", id, "timeline"] as const,
  },
},
dashboard: {
  all: ["dashboard"] as const,
  kpis: ["dashboard", "kpis"] as const,
  revenueTrend: ["dashboard", "revenue-trend"] as const,
  appointmentTrend: ["dashboard", "appointment-trend"] as const,
  activity: ["dashboard", "activity"] as const,
},
   notifications: {
    all: ["notifications"],
    list: (filters?: unknown) => ["notifications", "list", filters],
    unreadCount: ["notifications", "unread-count"],
    activities: (filters?: unknown) => ["notifications", "activities", filters],
    tasks: (filters?: unknown) => ["notifications", "tasks", filters],
  },
  activityCenter: {
  all: ["activity-center"] as const,
  notifications: {
    all: ["activity-center", "notifications"] as const,
    list: (params: unknown) =>
      ["activity-center", "notifications", "list", params] as const,
    unreadCount: ["activity-center", "notifications", "unread-count"] as const,
  },
  tasks: {
    all: ["activity-center", "tasks"] as const,
    list: (params: unknown) =>
      ["activity-center", "tasks", "list", params] as const,
  },
  audit: {
    all: ["activity-center", "audit"] as const,
    list: (params: unknown) =>
      ["activity-center", "audit", "list", params] as const,
  },
},
reports: {
  all: ["reports"] as const,
  definitions: {
    all: ["reports", "definitions"] as const,
    list: (params: unknown) =>
      ["reports", "definitions", "list", params] as const,
  },
  runs: {
    all: ["reports", "runs"] as const,
    list: (params: unknown) => ["reports", "runs", "list", params] as const,
  },
  preview: (params: unknown) => ["reports", "preview", params] as const,
},
admin: {
  all: ["admin"] as const,
  departments: {
    all: ["admin", "departments"] as const,
    list: (params: unknown) =>
      ["admin", "departments", "list", params] as const,
  },
  wards: {
    all: ["admin", "wards"] as const,
    list: (params: unknown) =>
      ["admin", "wards", "list", params] as const,
  },
  beds: {
    all: ["admin", "beds"] as const,
    list: (params: unknown) =>
      ["admin", "beds", "list", params] as const,
  },
  settings: ["admin", "settings"] as const,
},
hr: {
  all: ["hr"] as const,
  employees: {
    all: ["hr", "employees"] as const,
    list: (params: unknown) => ["hr", "employees", "list", params] as const,
  },
  attendance: {
    all: ["hr", "attendance"] as const,
    list: (params: unknown) => ["hr", "attendance", "list", params] as const,
  },
  leaves: {
    all: ["hr", "leaves"] as const,
    list: (params: unknown) => ["hr", "leaves", "list", params] as const,
  },
},
inventory: {
  all: ["inventory"] as const,
  vendors: {
    all: ["inventory", "vendors"] as const,
    list: (params: unknown) => ["inventory", "vendors", "list", params] as const,
  },
  warehouses: {
    all: ["inventory", "warehouses"] as const,
    list: (params: unknown) => ["inventory", "warehouses", "list", params] as const,
  },
  purchaseOrders: {
    all: ["inventory", "purchase-orders"] as const,
    list: (params: unknown) =>
      ["inventory", "purchase-orders", "list", params] as const,
  },
  grns: {
    all: ["inventory", "grns"] as const,
    list: (params: unknown) => ["inventory", "grns", "list", params] as const,
  },
  adjustments: {
    all: ["inventory", "adjustments"] as const,
    list: (params: unknown) =>
      ["inventory", "adjustments", "list", params] as const,
  },
},
finance: {
  all: ["finance"] as const,
  accounts: {
    all: ["finance", "accounts"] as const,
    list: (params: unknown) =>
      ["finance", "accounts", "list", params] as const,
  },
  vouchers: {
    all: ["finance", "vouchers"] as const,
    list: (params: unknown) =>
      ["finance", "vouchers", "list", params] as const,
  },
  ledger: {
    all: ["finance", "ledger"] as const,
    list: (params: unknown) =>
      ["finance", "ledger", "list", params] as const,
  },
},
radiology: {
  all: ["radiology"] as const,
  orders: {
    all: ["radiology", "orders"] as const,
    list: (params: unknown) =>
      ["radiology", "orders", "list", params] as const,
    detail: (id: string) => ["radiology", "orders", "detail", id] as const,
    attachments: (id: string) =>
      ["radiology", "orders", id, "attachments"] as const,
    timeline: (id: string) =>
      ["radiology", "orders", id, "timeline"] as const,
  },
},
security: {
  all: ["security"] as const,
  users: {
    all: ["security", "users"] as const,
    list: (params: unknown) => ["security", "users", "list", params] as const,
  },
  roles: {
    all: ["security", "roles"] as const,
    list: (params: unknown) => ["security", "roles", "list", params] as const,
  },
  permissions: {
    all: ["security", "permissions"] as const,
    list: (params: unknown) =>
      ["security", "permissions", "list", params] as const,
    roleMatrix: (roleId: string) =>
      ["security", "permissions", "role-matrix", roleId] as const,
  },
  sessions: {
    all: ["security", "sessions"] as const,
    list: (params: unknown) =>
      ["security", "sessions", "list", params] as const,
  },
  audit: {
    all: ["security", "audit"] as const,
    list: (params: unknown) => ["security", "audit", "list", params] as const,
  },
  passwordPolicy: ["security", "password-policy"] as const,
},
patientPortal: {
  all: ["patient-portal"] as const,
  kpis: ["patient-portal", "kpis"] as const,
  profile: ["patient-portal", "profile"] as const,
  appointments: {
    all: ["patient-portal", "appointments"] as const,
    list: (params: unknown) =>
      ["patient-portal", "appointments", "list", params] as const,
  },
  prescriptions: {
    all: ["patient-portal", "prescriptions"] as const,
    list: (params: unknown) =>
      ["patient-portal", "prescriptions", "list", params] as const,
  },
  labReports: {
    all: ["patient-portal", "lab-reports"] as const,
    list: (params: unknown) =>
      ["patient-portal", "lab-reports", "list", params] as const,
  },
  radiologyReports: {
    all: ["patient-portal", "radiology-reports"] as const,
    list: (params: unknown) =>
      ["patient-portal", "radiology-reports", "list", params] as const,
  },
  bills: {
    all: ["patient-portal", "bills"] as const,
    list: (params: unknown) =>
      ["patient-portal", "bills", "list", params] as const,
  },
  claims: {
    all: ["patient-portal", "claims"] as const,
    list: (params: unknown) =>
      ["patient-portal", "claims", "list", params] as const,
  },
},
nursing: {
  all: ["nursing"] as const,
  patients: {
    all: ["nursing", "patients"] as const,
    list: (params: unknown) =>
      ["nursing", "patients", "list", params] as const,
  },
  vitals: {
    all: ["nursing", "vitals"] as const,
    list: (params: unknown) =>
      ["nursing", "vitals", "list", params] as const,
  },
  medications: {
    all: ["nursing", "medications"] as const,
    list: (params: unknown) =>
      ["nursing", "medications", "list", params] as const,
  },
  notes: {
    all: ["nursing", "notes"] as const,
    list: (params: unknown) =>
      ["nursing", "notes", "list", params] as const,
  },
  tasks: {
    all: ["nursing", "tasks"] as const,
    list: (params: unknown) =>
      ["nursing", "tasks", "list", params] as const,
  },
},
emergency: {
  all: ["emergency"] as const,
  encounters: {
    all: ["emergency", "encounters"] as const,
    list: (params: unknown) =>
      ["emergency", "encounters", "list", params] as const,
    detail: (id: string) =>
      ["emergency", "encounters", "detail", id] as const,
    timeline: (id: string) =>
      ["emergency", "encounters", id, "timeline"] as const,
  },
  orders: {
    all: ["emergency", "orders"] as const,
    list: (params: unknown) =>
      ["emergency", "orders", "list", params] as const,
  },
},
clinicalWorkflow: {
  all: ["clinical-workflow"] as const,
  patientContext: (patientId: string) =>
    ["clinical-workflow", "patient-context", patientId] as const,
  timeline: (params: unknown) =>
    ["clinical-workflow", "timeline", params] as const,
},

};



