export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateRoleRequest {
  name: string;
  description: string;
  permissions: string[];
}

export interface UpdateRoleRequest extends Partial<CreateRoleRequest> {
  isActive?: boolean;
}

export interface RoleFilter {
  search?: string;
  isActive?: boolean;
  page?: number;
  limit?: number;
}
