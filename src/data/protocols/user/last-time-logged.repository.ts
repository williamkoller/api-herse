export interface LastTimeLoggedRepository {
  lastTimeLogged: (userId: number, lastLogged: Date) => Promise<void>;
}
