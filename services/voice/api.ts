import apiClient from "@/services/api-client";
import type { VoiceUploadResponse } from "./types";

export function uploadVoiceNote(file: Blob): Promise<VoiceUploadResponse> {
  const form = new FormData();
  form.append("file", file);
  return apiClient.post("/voice", form, {
    headers: { "Content-Type": "multipart/form-data" },
  }) as unknown as Promise<VoiceUploadResponse>;
}
