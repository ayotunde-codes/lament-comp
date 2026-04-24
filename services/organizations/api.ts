import apiClient from "@/services/api-client";
import type {
  Organization,
  CreateOrganizationDto,
  ListOrganizationsParams,
  PaginatedOrganizations,
} from "./types";

export function fetchOrganizations(
  params?: ListOrganizationsParams
): Promise<PaginatedOrganizations> {
  return apiClient.get("/organizations", { params }) as unknown as Promise<PaginatedOrganizations>;
}

export function fetchOrganizationById(id: string): Promise<Organization> {
  return apiClient.get(`/organizations/${id}`) as unknown as Promise<Organization>;
}

export function fetchTopOrganizations(): Promise<Organization[]> {
  return apiClient.get("/organizations/top") as unknown as Promise<Organization[]>;
}

export function createOrganization(dto: CreateOrganizationDto): Promise<Organization> {
  return apiClient.post("/organizations", dto) as unknown as Promise<Organization>;
}
