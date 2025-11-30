// src/app/upload/page.tsx
"use client";

import { useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import { uploadDocument } from "@/lib/actions/process-file";

export default function PDFUpload() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "error" | "success";
    text: string;
  } | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setMessage(null);

    try {
      const formData = new FormData();
      formData.append("document", file);

      const result = await uploadDocument(formData);

      if (result.success) {
        setMessage({
          type: "success",
          text: result.message || "Document processed successfully",
        });
        e.target.value = "";
      } else {
        setMessage({
          type: "error",
          text: result.message || "Failed to process document",
        });
      }
    } catch (err) {
      setMessage({
        type: "error",
        text: "An error occurred while processing the document",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-dvh bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Document Upload
        </h1>
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="pdf-upload">Upload Document</Label>
                <Input
                  id="pdf-upload"
                  type="file"
                  accept=".pdf, .doc, .docx"
                  onChange={handleFileUpload}
                  disabled={isLoading}
                  className="mt-2"
                />
              </div>

              {isLoading && (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span className="text-muted-foreground">
                    Processing document...
                  </span>
                </div>
              )}

              {message && (
                <Alert
                  variant={message.type === "error" ? "destructive" : "default"}
                >
                  <AlertTitle>
                    {message.type === "error" ? "Error!" : "Success!"}
                  </AlertTitle>
                  <AlertDescription>{message.text}</AlertDescription>
                </Alert>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
