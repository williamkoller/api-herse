export interface FindUserByRoleRepository {
  findUserByRole: (userId: number) => Promise<string[]>;
}
