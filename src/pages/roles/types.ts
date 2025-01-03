export interface Role {
  id?: string;
  name: string;
  description?: string;
}

export interface RoleLookup {
  id: string;
  name: string;
}

export type UpdateRole = {
  id: string;
  name: string;
  description?: string;
};

export type CreateRole = {
  name: string;
  description?: string;
};  
