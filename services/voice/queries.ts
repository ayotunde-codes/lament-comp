import { useMutation } from "@tanstack/react-query";
import { uploadVoiceNote } from "./api";
import type { VoiceUploadResponse } from "./types";
import type { ApiError } from "@/services/api-client";

export function useUploadVoiceNote() {
  return useMutation<VoiceUploadResponse, ApiError, Blob>({
    mutationFn: (file: Blob) => uploadVoiceNote(file),
  });
}
