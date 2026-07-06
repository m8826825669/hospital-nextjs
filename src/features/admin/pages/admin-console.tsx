"use client";

import { ComponentType, useState } from "react";
import {
  Bed,
  Building2,
  CalendarDays,
  Clock3,
  KeyRound,
  Settings,
  ShieldCheck,
  Stethoscope,
  Users,
  UserRoundCog,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/shared/components/enterprise";
import { AppShell } from "@/shared/components/layout/app-shell";
import { BedsTab } from "../components/beds-tab";
import { DepartmentsTab } from "../components/departments-tab";
import { SettingsTab } from "../components/settings-tab";
import { WardsTab } from "../components/wards-tab";
import { EmployeesTab } from "../components/employees-tab";
import { DoctorsTab } from "../components/doctors-tab";
import { UsersTab } from "../components/users-tab";
import { RolesTab } from "../components/roles-tab";
import { PermissionsTab } from "../components/permissions-tab";

const adminTabs: { value: string; label: string; icon: ComponentType<{ className?: string }>; disabled?: boolean }[] = [
  { value: "settings", label: "Settings", icon: Settings },
  { value: "departments", label: "Departments", icon: Building2 },
  { value: "wards", label: "Wards", icon: CalendarDays },
  { value: "beds", label: "Beds", icon: Bed },
  { value: "doctors", label: "Doctors", icon: Stethoscope },
  { value: "employees", label: "Employees", icon: Users },
  { value: "users", label: "Users", icon: UserRoundCog },
  { value: "roles", label: "Roles", icon: ShieldCheck },
  { value: "permissions", label: "Permissions", icon: KeyRound },
];

export function AdminConsole() {
  const [search, setSearch] = useState("");

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 border-b border-slate-200 pb-5 lg:flex-row lg:items-end lg:justify-between">
          <PageHeader
            title="Administration"
            description="Manage hospital settings, departments, wards, beds, and master data."
          />

          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 shadow-sm">
              <Clock3 className="h-4 w-4 text-slate-500" />
              <span>Last updated: just now</span>
            </div>
            <Badge className="h-8 rounded-full border-emerald-200 bg-emerald-50 px-3 text-emerald-700 hover:bg-emerald-50">
              <span className="mr-1.5 h-2 w-2 rounded-full bg-emerald-500" />
              Active
            </Badge>
          </div>
        </div>

        <Tabs defaultValue="settings" className="space-y-5">
          <div className="rounded-2xl border border-slate-200 bg-white/80 p-3 shadow-sm backdrop-blur">
            <TabsList className="flex h-auto w-full flex-wrap justify-start gap-2 bg-transparent p-0">
              {adminTabs.map((tab) => {
                const Icon = tab.icon;

                return (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    disabled={tab.disabled}
                    className="h-11 gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm transition-all hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 data-[state=active]:border-blue-200 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:shadow data-[state=active]:ring-1 data-[state=active]:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <Icon className="h-4 w-4" />
                    {tab.label}
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </div>

          <TabsContent value="settings" className="mt-0">
            <SettingsTab />
          </TabsContent>

          <TabsContent value="departments" className="mt-0">
            <DepartmentsTab search={search} onSearchChange={setSearch} />
          </TabsContent>

          <TabsContent value="wards" className="mt-0">
            <WardsTab search={search} onSearchChange={setSearch} />
          </TabsContent>

          <TabsContent value="beds" className="mt-0">
            <BedsTab search={search} onSearchChange={setSearch} />
          </TabsContent>

          <TabsContent value="employees" className="mt-0">
            <EmployeesTab search={search} onSearchChange={setSearch} />
          </TabsContent>

          <TabsContent value="doctors" className="mt-0">
            <DoctorsTab search={search} onSearchChange={setSearch} />
          </TabsContent>

          <TabsContent value="users" className="mt-0">
            <UsersTab search={search} onSearchChange={setSearch} />
          </TabsContent>

          <TabsContent value="roles" className="mt-0">
            <RolesTab search={search} onSearchChange={setSearch} />
          </TabsContent>

          <TabsContent value="permissions" className="mt-0">
            <PermissionsTab search={search} onSearchChange={setSearch} />
          </TabsContent>
        </Tabs>
      </div>
    </AppShell>
  );
}
