import type { Organization } from "@/types";
import type { Industry } from "@/types";

export type { Organization };

export interface CreateOrganizationDto {
  name: string;
  industry: Industry;
  logo?: string;
}

export interface ListOrganizationsParams {
  search?: string;
  industry?: Industry;
  page?: number;
  limit?: number;
}

export interface PaginatedOrganizations {
  data: Organization[];
  total: number;
  page: number;
  limit: number;
}
