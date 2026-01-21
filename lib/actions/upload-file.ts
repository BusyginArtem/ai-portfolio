"use server";

import { z } from "zod";

import { uploadDocument } from "@/lib/actions/process-file";

import type { FileUploadInitialState } from "@/shared/types";

const ACCEPTED_IMAGE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const fileSchema = z.object({
  file: z
    .instanceof(File)
    .refine(
      (file) =>
        !file || file.type === "" || ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only .pdf, .doc and .docx formats are supported",
    ),
});

export const handleFileUpload = async (
  _initialState: FileUploadInitialState,
  formData: FormData,
): Promise<FileUploadInitialState> => {
  const file = formData.get("file");

  if (!file) {
    return {
      message: "File is not uploaded!",
      type: "error",
    };
  }

  const validatedFields = fileSchema.safeParse({
    file,
  });

  if (!validatedFields.success) {
    return {
      message:
        z
          .treeifyError(validatedFields.error)
          .properties?.file?.errors.join(", ") || "Invalid file",
      type: "error",
    };
  }

  try {
    const result = await uploadDocument(validatedFields.data.file);

    if (result.success) {
      return {
        message: result.message || "Document processed successfully",
        type: "success",
      };
    } else {
      return {
        message: result.message || "Failed to process document",
        type: "error",
      };
    }
  } catch (err) {
    return {
      message: "An error occurred while processing the document",
      type: "error",
    };
  }
};
