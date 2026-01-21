"use client";

import { useActionState } from "react";
import { Loader2 } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { handleFileUpload } from "@/lib/actions/upload-file";
import type { FileUploadInitialState } from "@/shared/types";
import { cn } from "@/lib/utils";

const initialState: FileUploadInitialState = { message: "", type: "idle" };

export default function FileUpload() {
  const [state, formAction, pending] = useActionState<
    FileUploadInitialState,
    FormData
  >(handleFileUpload, initialState);

  const hasError = state.type === "error";

  return (
    <div className="min-h-dvh bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Document Upload
        </h1>
        <Card className="mb-6">
          <CardContent className="pt-6">
            <form className="space-y-4" action={formAction}>
              <Label htmlFor="pdf-upload">Upload Document</Label>
              <Input
                id="pdf-upload"
                name="file"
                type="file"
                accept=".pdf, .doc, .docx"
                disabled={pending}
                className={cn("cursor-pointer mt-2", {
                  "opacity-50 cursor-not-allowed": pending,
                  "border-destructive/50 dark:border-destructive": hasError,
                })}
              />

              {pending && (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span className="text-muted-foreground">
                    Processing document...
                  </span>
                </div>
              )}

              {state.message && (
                <Alert variant={hasError ? "destructive" : "success"}>
                  <AlertTitle>{hasError ? "Error!" : "Success!"}</AlertTitle>
                  <AlertDescription>{state.message}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" disabled={pending}>
                Upload
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
