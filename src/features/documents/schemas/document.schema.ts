import { z } from "zod";

export const documentFormSchema = z.object({
  module: z.string().min(1, "Module is required"),
  title: z.string().min(1, "Title is required"),
  document_type: z.string().min(1, "Document type is required"),
  file_name: z.string().min(1, "File name is required"),
  mime_type: z.string().min(1, "MIME type is required"),
  file_size: z.coerce.number().min(0),
  storage_path: z.string().min(1, "Storage path is required"),
  visibility: z.string().default("internal"),
  description: z.string().optional(),
});

export type DocumentFormInput = z.input<typeof documentFormSchema>;
export type DocumentFormValues = z.output<typeof documentFormSchema>;
