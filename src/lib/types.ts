
export type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
};

export type Group = {
  id: string;
  name: string;
  description?: string;
  avatarUrl?: string;
  members: User[];
  createdAt: Date;
  expenses: Expense[];
};

export type ExpenseCategory = 
  | 'Food'
  | 'Rent'
  | 'Transportation'
  | 'Utilities'
  | 'Entertainment'
  | 'Shopping'
  | 'Travel'
  | 'Other';

export type SplitType = 'equal' | 'percentage' | 'exact';

export type ExpenseSplit = {
  userId: string;
  amount: number;
  percentage?: number;
  paid: boolean;
};

export type Expense = {
  id: string;
  title: string;
  description?: string;
  amount: number;
  category: ExpenseCategory;
  paidBy: User;
  paidFor: ExpenseSplit[];
  groupId?: string;
  date: Date;
  receiptUrl?: string;
  splitType: SplitType;
  createdAt: Date;
};

export type Settlement = {
  id: string;
  fromUser: User;
  toUser: User;
  amount: number;
  date: Date;
  groupId?: string;
  expenseId?: string;
  note?: string;
  completed: boolean;
};

export type Balance = {
  userId: string;
  owes: { [userId: string]: number };
  owed: { [userId: string]: number };
  total: number;
};
