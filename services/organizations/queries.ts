import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchOrganizations,
  fetchOrganizationById,
  fetchTopOrganizations,
  createOrganization,
} from "./api";
import type { ListOrganizationsParams, CreateOrganizationDto } from "./types";

export const orgKeys = {
  all: ["organizations"] as const,
  list: (params: ListOrganizationsParams) =>
    [...orgKeys.all, "list", params] as const,
  detail: (id: string) => [...orgKeys.all, "detail", id] as const,
  top: () => [...orgKeys.all, "top"] as const,
};

export function useOrganizations(params?: ListOrganizationsParams) {
  return useQuery({
    queryKey: orgKeys.list(params ?? {}),
    queryFn: () => fetchOrganizations(params),
  });
}

export function useOrganization(id: string) {
  return useQuery({
    queryKey: orgKeys.detail(id),
    queryFn: () => fetchOrganizationById(id),
    enabled: !!id,
  });
}

export function useTopOrganizations() {
  return useQuery({
    queryKey: orgKeys.top(),
    queryFn: fetchTopOrganizations,
  });
}

export function useCreateOrganization() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateOrganizationDto) => createOrganization(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: orgKeys.all });
    },
  });
}
