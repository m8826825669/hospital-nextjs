import { Activity } from "lucide-react";
import { LoginForm } from "@/features/auth/components/login-form";

export default function LoginPage() {
  return (
    <main className="grid min-h-screen bg-muted/30 lg:grid-cols-2">
      <section className="hidden flex-col justify-between bg-slate-950 p-10 text-white lg:flex">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
            <Activity className="h-5 w-5" />
          </div>

          <div>
            <h1 className="text-lg font-semibold">HMS SaaS</h1>
            <p className="text-sm text-slate-400">
              Enterprise Healthcare Platform
            </p>
          </div>
        </div>

        <div className="max-w-xl">
          <h2 className="text-4xl font-bold tracking-tight">
            Run your hospital operations from one intelligent workspace.
          </h2>

          <p className="mt-4 text-slate-400">
            Patients, OPD, pharmacy, billing, IPD, surgery, insurance and
            laboratory workflows in a secure multi-tenant platform.
          </p>
        </div>

        <p className="text-sm text-slate-500">
          Secure. Auditable. Role-based. Production-grade.
        </p>
      </section>

      <section className="flex items-center justify-center p-6">
        <LoginForm />
      </section>
    </main>
  );
}