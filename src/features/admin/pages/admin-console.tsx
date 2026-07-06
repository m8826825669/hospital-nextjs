"use client";

import { useState } from "react";
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
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { AppShell } from "@/shared/components/layout/app-shell";
import {
  EntityTabsList,
  type EntityTabItem,
} from "@/shared/components/enterprise";
import {
  EnterpriseHeaderBadge,
  EnterprisePage,
  EnterprisePageBody,
  EnterprisePageHeader,
  EnterpriseTabBar,
} from "@/shared/layout";
import { BedsTab } from "../components/beds-tab";
import { DepartmentsTab } from "../components/departments-tab";
import { DoctorsTab } from "../components/doctors-tab";
import { EmployeesTab } from "../components/employees-tab";
import { PermissionsTab } from "../components/permissions-tab";
import { RolesTab } from "../components/roles-tab";
import { SettingsTab } from "../components/settings-tab";
import { UsersTab } from "../components/users-tab";
import { WardsTab } from "../components/wards-tab";

const adminTabs: EntityTabItem[] = [
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
      <EnterprisePage>
        <EnterprisePageHeader
          title="Administration"
          description="Manage hospital settings, departments, wards, beds, staff, access control, and master data from a single enterprise console."
          actions={
            <>
              <EnterpriseHeaderBadge>
                <Clock3 className="h-4 w-4 text-slate-500" />
                <span>Last updated: just now</span>
              </EnterpriseHeaderBadge>
              <Badge className="h-9 rounded-full border-emerald-200 bg-emerald-50 px-4 text-emerald-700 hover:bg-emerald-50">
                <span className="mr-2 h-2 w-2 rounded-full bg-emerald-500" />
                Active
              </Badge>
            </>
          }
        />

        <EnterprisePageBody>
          <Tabs defaultValue="settings" className="space-y-5">
            <EnterpriseTabBar>
              <EntityTabsList tabs={adminTabs} />
            </EnterpriseTabBar>

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
        </EnterprisePageBody>
      </EnterprisePage>
    </AppShell>
  );
}
