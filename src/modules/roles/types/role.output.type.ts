export type RoleOutputType = {
  id: number;
  userId: number;
  name: string;
  description: string;
  permissions: string[];
  createdAt: Date | string;
  updatedAt: Date | string;
};
