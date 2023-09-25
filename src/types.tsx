export interface SelectedType {
  id: string;
  user_group_name: string;
  user_group_email: string[];
}

export interface AuthValues {
  password: string;
  email: string;
}

export interface BalanceSummary {
  userString: string;
  userNumber: number;
}

export interface UserGroup {
  id: string;
  user_group_id: string;
  user_group_name: string;
  user_expense_description: string;
  user_expense_amount: number;
  user_expense_name: string;
  settled_up: boolean;
  created_at: {
    nanoseconds: number;
    seconds: number;
  };
}

export type UserGroups = UserGroup[];

export interface Values { 
    userName: string;
    userEmail: string;
}