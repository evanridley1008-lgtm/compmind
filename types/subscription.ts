export type SubscriptionPlan =
  | "free"
  | "pro"
  | "team"
  | "enterprise";

export type SubscriptionStatus =
  | "active"
  | "trialing"
  | "past_due"
  | "cancelled"
  | "expired";

export type Subscription = {
  id: string;

  userId: string;

  plan: SubscriptionPlan;

  status: SubscriptionStatus;

  startedAt: string;

  currentPeriodStart: string;
  currentPeriodEnd: string;

  cancelAtPeriodEnd: boolean;

  creatorCode?: string;

  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
};
