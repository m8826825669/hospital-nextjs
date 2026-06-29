"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";

import {
  CheckboxField,
  FormActions,
  SelectField,
  TextareaField,
  TextField,
} from "@/shared/components/enterprise";

import {
  bloodGroupOptions,
  maritalStatusOptions,
  patientGenderOptions,
} from "../constants/patient.constants";

import {
  patientFormSchema,
  type PatientFormInput,
  type PatientFormValues,
} from "../schemas/patient.schema";

interface PatientFormProps {
  defaultValues?: Partial<PatientFormInput>;
  isSubmitting?: boolean;
  onSubmit: (values: PatientFormValues) => void | Promise<void>;
  onCancel?: () => void;
}

export function PatientForm({
  defaultValues,
  isSubmitting,
  onSubmit,
  onCancel,
}: PatientFormProps) {
  const form = useForm<PatientFormInput>({
    resolver: zodResolver(patientFormSchema),
    defaultValues: {
      uhid: "",
      mrn: "",

      title: "",
      first_name: "",
      middle_name: "",
      last_name: "",

      gender: "unknown",
      date_of_birth: "",
      age: undefined,
      blood_group: "",
      marital_status: "",

      email: "",
      phone: "",
      alternate_phone: "",

      emergency_contact_name: "",
      emergency_contact_phone: "",
      emergency_contact_relationship: "",

      address_line1: "",
      address_line2: "",
      city: "",
      state: "",
      country: "",
      postal_code: "",

      nationality: "",
      religion: "",
      occupation: "",

      national_id: "",
      passport_number: "",

      primary_doctor_id: "",
      department_id: "",

      insurance_provider_id: "",
      insurance_policy_number: "",

      remarks: "",
      is_active: true,

      ...defaultValues,
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) =>
          onSubmit(patientFormSchema.parse(values))
        )}
        className="space-y-8"
      >
        <FormSection
          title="Basic Information"
          description="Core patient identity and hospital registration information."
        >
          <div className="grid gap-4 md:grid-cols-2">
            <TextField form={form} name="uhid" label="UHID" placeholder="UHID" />

            <TextField form={form} name="mrn" label="MRN" placeholder="MRN" />
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            <TextField
              form={form}
              name="title"
              label="Title"
              placeholder="Mr / Ms / Dr"
            />

            <TextField
              form={form}
              name="first_name"
              label="First Name"
              placeholder="First name"
            />

            <TextField
              form={form}
              name="middle_name"
              label="Middle Name"
              placeholder="Middle name"
            />

            <TextField
              form={form}
              name="last_name"
              label="Last Name"
              placeholder="Last name"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            <SelectField
              form={form}
              name="gender"
              label="Gender"
              options={patientGenderOptions}
            />

            <TextField
              form={form}
              name="date_of_birth"
              label="Date of Birth"
              type="date"
            />

            <TextField form={form} name="age" label="Age" type="number" />

            <SelectField
              form={form}
              name="blood_group"
              label="Blood Group"
              placeholder="Select blood group"
              options={bloodGroupOptions}
            />
          </div>

          <SelectField
            form={form}
            name="marital_status"
            label="Marital Status"
            placeholder="Select marital status"
            options={maritalStatusOptions}
          />
        </FormSection>

        <FormSection
          title="Contact Information"
          description="Patient contact numbers and email address."
        >
          <div className="grid gap-4 md:grid-cols-3">
            <TextField
              form={form}
              name="phone"
              label="Phone"
              placeholder="Mobile number"
            />

            <TextField
              form={form}
              name="alternate_phone"
              label="Alternate Phone"
              placeholder="Alternate phone"
            />

            <TextField
              form={form}
              name="email"
              label="Email"
              type="email"
              placeholder="patient@example.com"
            />
          </div>
        </FormSection>

        <FormSection
          title="Emergency Contact"
          description="Emergency contact person details."
        >
          <div className="grid gap-4 md:grid-cols-3">
            <TextField
              form={form}
              name="emergency_contact_name"
              label="Emergency Contact Name"
              placeholder="Contact person"
            />

            <TextField
              form={form}
              name="emergency_contact_phone"
              label="Emergency Contact Phone"
              placeholder="Phone number"
            />

            <TextField
              form={form}
              name="emergency_contact_relationship"
              label="Relationship"
              placeholder="Father / Mother / Spouse"
            />
          </div>
        </FormSection>

        <FormSection
          title="Address"
          description="Residential and mailing address."
        >
          <TextField
            form={form}
            name="address_line1"
            label="Address Line 1"
            placeholder="House / Street / Area"
          />

          <TextField
            form={form}
            name="address_line2"
            label="Address Line 2"
            placeholder="Landmark / Locality"
          />

          <div className="grid gap-4 md:grid-cols-4">
            <TextField form={form} name="city" label="City" />

            <TextField form={form} name="state" label="State" />

            <TextField form={form} name="country" label="Country" />

            <TextField form={form} name="postal_code" label="Postal Code" />
          </div>
        </FormSection>

        <FormSection
          title="Additional Demographics"
          description="Optional demographic and identity information."
        >
          <div className="grid gap-4 md:grid-cols-3">
            <TextField form={form} name="nationality" label="Nationality" />

            <TextField form={form} name="religion" label="Religion" />

            <TextField form={form} name="occupation" label="Occupation" />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <TextField
              form={form}
              name="national_id"
              label="National ID"
              placeholder="Aadhaar / National ID"
            />

            <TextField
              form={form}
              name="passport_number"
              label="Passport Number"
            />
          </div>
        </FormSection>

        <FormSection
          title="Care Assignment"
          description="Primary department and doctor assignment."
        >
          <div className="grid gap-4 md:grid-cols-2">
            <TextField
              form={form}
              name="department_id"
              label="Department ID"
              placeholder="Temporary department UUID"
            />

            <TextField
              form={form}
              name="primary_doctor_id"
              label="Primary Doctor ID"
              placeholder="Temporary doctor UUID"
            />
          </div>
        </FormSection>

        <FormSection
          title="Insurance"
          description="Insurance provider and policy reference."
        >
          <div className="grid gap-4 md:grid-cols-2">
            <TextField
              form={form}
              name="insurance_provider_id"
              label="Insurance Provider ID"
              placeholder="Temporary insurance provider UUID"
            />

            <TextField
              form={form}
              name="insurance_policy_number"
              label="Policy Number"
            />
          </div>
        </FormSection>

        <FormSection title="Remarks" description="Internal registration notes.">
          <TextareaField
            form={form}
            name="remarks"
            label="Remarks"
            placeholder="Any notes about this patient..."
          />

          <CheckboxField
            form={form}
            name="is_active"
            label="Patient is active"
          />
        </FormSection>

        <FormActions
          submitText="Save Patient"
          isSubmitting={isSubmitting}
          onCancel={onCancel}
        />
      </form>
    </Form>
  );
}

function FormSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4 rounded-xl border bg-card p-4">
      <div>
        <h3 className="font-medium">{title}</h3>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>

      <div className="space-y-4">{children}</div>
    </section>
  );
}