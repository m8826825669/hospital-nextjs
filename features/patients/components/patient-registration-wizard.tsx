"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, Loader2, Save } from "lucide-react";
import { useForm } from "react-hook-form";

import { PageHeader } from "@/components/common/page-header";
import { FormActions } from "@/components/forms/form-actions";
import { FormGrid } from "@/components/forms/form-grid";
import { FormSection } from "@/components/forms/form-section";
import { InputField } from "@/components/forms/input-field";
import { SelectField } from "@/components/forms/select-field";
import { WizardStepper } from "@/components/wizard/wizard-stepper";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { getApiErrorMessages } from "@/lib/api-error";

import {
  patientRegistrationSchema,
  type PatientRegistrationFormValues,
} from "../schemas/patient-registration.schema";
import { useCreatePatient } from "../hooks/use-patients";
import { patientRegistrationSteps } from "./patient-registration-steps";

export function PatientRegistrationWizard() {
  const [step, setStep] = useState(1);
  const createPatient = useCreatePatient();

  const form = useForm<PatientRegistrationFormValues>({
    resolver: zodResolver(patientRegistrationSchema),
    defaultValues: {
      first_name: "",
      middle_name: "",
      last_name: "",
      dob: "",
      gender: "",
      blood_group: "",

      mobile: "",
      alternate_mobile: "",
      email: "",

      aadhaar_number: "",
      pan_number: "",
      passport_number: "",

      address: {
        address_line1: "",
        address_line2: "",
        city: "",
        state: "",
        country: "INDIA",
        pincode: "",
      },

      emergency_contact: {
        name: "",
        relation: "",
        phone: "",
      },
    },
  });

  const isLastStep = step === patientRegistrationSteps.length;

  const apiErrors = createPatient.error
    ? getApiErrorMessages(createPatient.error)
    : [];

  function nextStep() {
    setStep((value) => Math.min(value + 1, patientRegistrationSteps.length));
  }

  function previousStep() {
    setStep((value) => Math.max(value - 1, 1));
  }

  async function onSubmit(values: PatientRegistrationFormValues) {
    await createPatient.mutateAsync({
      first_name: values.first_name,
      middle_name: values.middle_name || "",
      last_name: values.last_name,
      dob: values.dob,
      gender: values.gender,
      blood_group: values.blood_group || "",
      mobile: values.mobile,
      alternate_mobile: values.alternate_mobile || "",
      email: values.email || "",
      aadhaar_number: values.aadhaar_number || "",
      pan_number: values.pan_number || "",
      passport_number: values.passport_number || "",
      address: {
        address_line1: values.address.address_line1,
        address_line2: values.address.address_line2 || "",
        city: values.address.city,
        state: values.address.state,
        country: values.address.country,
        pincode: values.address.pincode,
      },
      emergency_contact: {
        name: values.emergency_contact.name,
        relation: values.emergency_contact.relation,
        phone: values.emergency_contact.phone,
      },
    });
  }

  return (
    <div className="space-y-6">
      {apiErrors.length > 0 && (
        <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          <p className="font-medium">Failed to register patient</p>

          <ul className="mt-2 list-inside list-disc space-y-1">
            {apiErrors.map((message) => (
              <li key={message}>{message}</li>
            ))}
          </ul>
        </div>
      )}

      <WizardStepper steps={patientRegistrationSteps} currentStep={step} />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {step === 1 && (
            <FormSection
              title="Personal Information"
              description="Core patient identity information."
            >
              <FormGrid columns={3}>
                <InputField
                  control={form.control}
                  name="first_name"
                  label="First Name"
                  placeholder="Enter first name"
                  required
                />

                <InputField
                  control={form.control}
                  name="middle_name"
                  label="Middle Name"
                  placeholder="Enter middle name"
                />

                <InputField
                  control={form.control}
                  name="last_name"
                  label="Last Name"
                  placeholder="Enter last name"
                  required
                />

                <InputField
                  control={form.control}
                  name="dob"
                  label="Date of Birth"
                  type="date"
                  required
                />

                <SelectField
                  control={form.control}
                  name="gender"
                  label="Gender"
                  placeholder="Select gender"
                  required
                  options={[
                    { label: "Male", value: "Male" },
                    { label: "Female", value: "Female" },
                    { label: "Other", value: "Other" },
                  ]}
                />

                <SelectField
                  control={form.control}
                  name="blood_group"
                  label="Blood Group"
                  placeholder="Select blood group"
                  options={[
                    { label: "A+", value: "A+" },
                    { label: "A-", value: "A-" },
                    { label: "B+", value: "B+" },
                    { label: "B-", value: "B-" },
                    { label: "O+", value: "O+" },
                    { label: "O-", value: "O-" },
                    { label: "AB+", value: "AB+" },
                    { label: "AB-", value: "AB-" },
                  ]}
                />
              </FormGrid>
            </FormSection>
          )}

          {step === 2 && (
            <FormSection
              title="Contact Information"
              description="Mobile, alternate mobile, and email details."
            >
              <FormGrid columns={2}>
                <InputField
                  control={form.control}
                  name="mobile"
                  label="Mobile"
                  placeholder="Enter mobile number"
                  required
                />

                <InputField
                  control={form.control}
                  name="alternate_mobile"
                  label="Alternate Mobile"
                  placeholder="Enter alternate mobile"
                />

                <InputField
                  control={form.control}
                  name="email"
                  label="Email"
                  placeholder="patient@example.com"
                  type="email"
                />
              </FormGrid>
            </FormSection>
          )}

          {step === 3 && (
            <FormSection
              title="Address"
              description="Patient residential address."
            >
              <FormGrid columns={2}>
                <InputField
                  control={form.control}
                  name="address.address_line1"
                  label="Address Line 1"
                  placeholder="House / street / area"
                  required
                />

                <InputField
                  control={form.control}
                  name="address.address_line2"
                  label="Address Line 2"
                  placeholder="Landmark / locality"
                />

                <InputField
                  control={form.control}
                  name="address.city"
                  label="City"
                  placeholder="Enter city"
                  required
                />

                <InputField
                  control={form.control}
                  name="address.state"
                  label="State"
                  placeholder="Enter state"
                  required
                />

                <InputField
                  control={form.control}
                  name="address.country"
                  label="Country"
                  placeholder="Enter country"
                  required
                />

                <InputField
                  control={form.control}
                  name="address.pincode"
                  label="Pincode"
                  placeholder="Enter pincode"
                  required
                />
              </FormGrid>
            </FormSection>
          )}

          {step === 4 && (
            <FormSection
              title="Identity Documents"
              description="Optional government identity references."
            >
              <FormGrid columns={3}>
                <InputField
                  control={form.control}
                  name="aadhaar_number"
                  label="Aadhaar Number"
                  placeholder="Enter Aadhaar number"
                />

                <InputField
                  control={form.control}
                  name="pan_number"
                  label="PAN Number"
                  placeholder="Enter PAN number"
                />

                <InputField
                  control={form.control}
                  name="passport_number"
                  label="Passport Number"
                  placeholder="Enter passport number"
                />
              </FormGrid>
            </FormSection>
          )}

          {step === 5 && (
            <FormSection
              title="Emergency Contact"
              description="Person to contact in emergency situations."
            >
              <FormGrid columns={3}>
                <InputField
                  control={form.control}
                  name="emergency_contact.name"
                  label="Name"
                  placeholder="Enter contact name"
                  required
                />

                <InputField
                  control={form.control}
                  name="emergency_contact.relation"
                  label="Relation"
                  placeholder="Father, Spouse, Brother..."
                  required
                />

                <InputField
                  control={form.control}
                  name="emergency_contact.phone"
                  label="Phone"
                  placeholder="Enter contact phone"
                  required
                />
              </FormGrid>
            </FormSection>
          )}

          {step === 6 && (
            <FormSection
              title="Review & Confirm"
              description="Review the patient details before submitting."
            >
              <pre className="overflow-auto rounded-lg bg-muted p-4 text-xs">
                {JSON.stringify(form.getValues(), null, 2)}
              </pre>
            </FormSection>
          )}

          <FormActions align="between">
            <Button
              type="button"
              variant="outline"
              disabled={step === 1}
              onClick={previousStep}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>

            {!isLastStep ? (
              <Button type="button" onClick={nextStep}>
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button type="submit" disabled={createPatient.isPending}>
                {createPatient.isPending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Save className="mr-2 h-4 w-4" />
                )}
                Register Patient
              </Button>
            )}
          </FormActions>
        </form>
      </Form>
    </div>
  );
}