import { PageHeader } from "@/components/common/page-header";
import { PatientRegistrationWizard } from "@/features/patients/components/patient-registration-wizard";

export default function PatientRegisterPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Register Patient"
        description="Create a new patient record using the guided registration workflow."
      />

      <PatientRegistrationWizard />
    </div>
  );
}