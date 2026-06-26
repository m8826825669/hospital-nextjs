"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { FormActions } from "@/components/forms/form-actions";
import { FormErrorSummary } from "@/components/forms/form-error-summary";
import { FormGrid } from "@/components/forms/form-grid";
import { FormSection } from "@/components/forms/form-section";
import { InputField } from "@/components/forms/input-field";
import { SelectField } from "@/components/forms/select-field";
import { TextareaField } from "@/components/forms/textarea-field";

import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

const demoFormSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  gender: z.string().min(1, "Gender is required"),
  phone: z.string().min(10, "Phone must be at least 10 digits"),
  email: z.string().email("Enter a valid email").optional().or(z.literal("")),
  address: z.string().optional(),
});

type DemoFormValues = z.infer<typeof demoFormSchema>;

export default function FormSystemPage() {
  const form = useForm<DemoFormValues>({
    resolver: zodResolver(demoFormSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      gender: "",
      phone: "",
      email: "",
      address: "",
    },
  });

  const errors = Object.values(form.formState.errors)
    .map((error) => error.message)
    .filter(Boolean) as string[];

  function onSubmit(values: DemoFormValues) {
    console.log("FORM VALUES", values);
    alert("Form submitted successfully. Check console.");
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Enterprise Form System"
        description="Reusable form sections, grids, validation, and field components."
      />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormErrorSummary errors={errors} />

          <FormSection
            title="Patient Basic Information"
            description="Reusable structure for HMS forms."
          >
            <FormGrid columns={2}>
              <InputField
                control={form.control}
                name="first_name"
                label="First Name"
                placeholder="Enter first name"
                required
              />

              <InputField
                control={form.control}
                name="last_name"
                label="Last Name"
                placeholder="Enter last name"
                required
              />

              <SelectField
                control={form.control}
                name="gender"
                label="Gender"
                placeholder="Select gender"
                required
                options={[
                  { label: "Male", value: "male" },
                  { label: "Female", value: "female" },
                  { label: "Other", value: "other" },
                ]}
              />

              <InputField
                control={form.control}
                name="phone"
                label="Phone"
                placeholder="Enter phone number"
                required
              />

              <InputField
                control={form.control}
                name="email"
                label="Email"
                placeholder="patient@example.com"
                type="email"
              />

              <TextareaField
                control={form.control}
                name="address"
                label="Address"
                placeholder="Enter address"
              />
            </FormGrid>
          </FormSection>

          <FormActions>
            <Button type="button" variant="outline">
              Cancel
            </Button>

            <Button type="submit">
              <Save className="mr-2 h-4 w-4" />
              Save
            </Button>
          </FormActions>
        </form>
      </Form>
    </div>
  );
}