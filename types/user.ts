export type UserRole = "player" | "coach" | "creator" | "admin";

export type UserStatus = "active" | "suspended" | "pending";

export type FortnitePlatform = "epic" | "playstation" | "xbox" | "nintendo";

export type ConnectedAccount = {
  id: string;
  platform: FortnitePlatform;
  displayName: string;
  accountId: string;
  connectedAt: string;
  lastSyncedAt?: string;
  isConnected: boolean;
};

export type UserProfile = {
  id: string;
  username: string;
  displayName: string;
  email: string;
  avatarUrl?: string;

  role: UserRole;
  status: UserStatus;

  region?: string;
  country?: string;

  createdAt: string;
  updatedAt: string;

  connectedAccounts: ConnectedAccount[];

  subscriptionId?: string;
};
