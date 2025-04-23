
import { User, Group, Expense, Settlement, Balance, ExpenseCategory, SplitType } from './types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: 'user1',
    name: 'Alex Johnson',
    email: 'alex@example.com',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
  },
  {
    id: 'user2',
    name: 'Jamie Smith',
    email: 'jamie@example.com',
    avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
  },
  {
    id: 'user3',
    name: 'Taylor Brown',
    email: 'taylor@example.com',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
  },
  {
    id: 'user4',
    name: 'Morgan Wilson',
    email: 'morgan@example.com',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
  }
];

// Current logged-in user
export const currentUser = mockUsers[0];

// Mock Groups
export const mockGroups: Group[] = [
  {
    id: 'group1',
    name: 'Apartment 304',
    description: 'Roommates sharing apartment expenses',
    avatarUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    members: [mockUsers[0], mockUsers[1], mockUsers[2]],
    createdAt: new Date('2023-01-15'),
    expenses: [],
  },
  {
    id: 'group2',
    name: 'Summer Trip 2023',
    description: 'Beach vacation expenses',
    avatarUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    members: [mockUsers[0], mockUsers[2], mockUsers[3]],
    createdAt: new Date('2023-05-20'),
    expenses: [],
  },
  {
    id: 'group3',
    name: 'Weekly Dinners',
    description: 'Thursday night dinner club',
    avatarUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    members: [mockUsers[0], mockUsers[1], mockUsers[3]],
    createdAt: new Date('2023-02-10'),
    expenses: [],
  }
];

// Mock Expenses
export const mockExpenses: Expense[] = [
  {
    id: 'expense1',
    title: 'Grocery Shopping',
    description: 'Weekly groceries',
    amount: 85.50,
    category: 'Food',
    paidBy: mockUsers[0],
    paidFor: [
      { userId: 'user1', amount: 28.50, paid: true },
      { userId: 'user2', amount: 28.50, paid: false },
      { userId: 'user3', amount: 28.50, paid: false },
    ],
    groupId: 'group1',
    date: new Date('2023-11-05'),
    splitType: 'equal',
    createdAt: new Date('2023-11-05'),
  },
  {
    id: 'expense2',
    title: 'Utilities - October',
    description: 'Water, electricity, and internet',
    amount: 120.00,
    category: 'Utilities',
    paidBy: mockUsers[1],
    paidFor: [
      { userId: 'user1', amount: 40.00, paid: false },
      { userId: 'user2', amount: 40.00, paid: true },
      { userId: 'user3', amount: 40.00, paid: false },
    ],
    groupId: 'group1',
    date: new Date('2023-11-02'),
    splitType: 'equal',
    createdAt: new Date('2023-11-02'),
  },
  {
    id: 'expense3',
    title: 'Beach House Rental',
    description: 'Summer trip accommodation',
    amount: 450.00,
    category: 'Travel',
    paidBy: mockUsers[0],
    paidFor: [
      { userId: 'user1', amount: 150.00, paid: true },
      { userId: 'user3', amount: 150.00, paid: true },
      { userId: 'user4', amount: 150.00, paid: false },
    ],
    groupId: 'group2',
    date: new Date('2023-08-15'),
    splitType: 'equal',
    createdAt: new Date('2023-08-10'),
  },
  {
    id: 'expense4',
    title: 'Dinner at Luigi\'s',
    description: 'Italian restaurant',
    amount: 108.75,
    category: 'Food',
    paidBy: mockUsers[3],
    paidFor: [
      { userId: 'user1', amount: 36.25, paid: false },
      { userId: 'user2', amount: 36.25, paid: false },
      { userId: 'user4', amount: 36.25, paid: true },
    ],
    groupId: 'group3',
    date: new Date('2023-10-26'),
    splitType: 'equal',
    createdAt: new Date('2023-10-26'),
  },
  {
    id: 'expense5',
    title: 'Movie Night',
    description: 'Tickets and snacks',
    amount: 60.00,
    category: 'Entertainment',
    paidBy: mockUsers[1],
    paidFor: [
      { userId: 'user1', amount: 20.00, paid: false },
      { userId: 'user2', amount: 20.00, paid: true },
      { userId: 'user4', amount: 20.00, paid: false },
    ],
    groupId: 'group3',
    date: new Date('2023-10-13'),
    splitType: 'equal',
    createdAt: new Date('2023-10-13'),
  },
];

// Update group expenses
mockGroups.forEach(group => {
  group.expenses = mockExpenses.filter(expense => expense.groupId === group.id);
});

// Mock Settlements
export const mockSettlements: Settlement[] = [
  {
    id: 'settlement1',
    fromUser: mockUsers[2],
    toUser: mockUsers[0],
    amount: 28.50,
    date: new Date('2023-11-10'),
    groupId: 'group1',
    expenseId: 'expense1',
    note: 'Paid in cash',
    completed: true,
  },
  {
    id: 'settlement2',
    fromUser: mockUsers[3],
    toUser: mockUsers[0],
    amount: 150.00,
    date: new Date('2023-08-20'),
    groupId: 'group2',
    expenseId: 'expense3',
    note: 'Bank transfer',
    completed: true,
  },
];

// Calculate mock balances
export const calculateBalances = (): { [userId: string]: Balance } => {
  const balances: { [userId: string]: Balance } = {};

  // Initialize balance objects for each user
  mockUsers.forEach(user => {
    balances[user.id] = {
      userId: user.id,
      owes: {},
      owed: {},
      total: 0
    };
  });

  // Process all expenses
  mockExpenses.forEach(expense => {
    const payerId = expense.paidBy.id;

    expense.paidFor.forEach(split => {
      if (split.userId !== payerId && !split.paid) {
        // User owes payer
        if (!balances[split.userId].owes[payerId]) {
          balances[split.userId].owes[payerId] = 0;
        }
        balances[split.userId].owes[payerId] += split.amount;

        // Payer is owed by user
        if (!balances[payerId].owed[split.userId]) {
          balances[payerId].owed[split.userId] = 0;
        }
        balances[payerId].owed[split.userId] += split.amount;
      }
    });
  });

  // Process settlements
  mockSettlements.forEach(settlement => {
    const fromUserId = settlement.fromUser.id;
    const toUserId = settlement.toUser.id;

    if (settlement.completed) {
      // Reduce what fromUser owes toUser
      if (balances[fromUserId].owes[toUserId]) {
        balances[fromUserId].owes[toUserId] = Math.max(0, balances[fromUserId].owes[toUserId] - settlement.amount);
      }

      // Reduce what toUser is owed by fromUser
      if (balances[toUserId].owed[fromUserId]) {
        balances[toUserId].owed[fromUserId] = Math.max(0, balances[toUserId].owed[fromUserId] - settlement.amount);
      }
    }
  });

  // Calculate totals
  for (const userId in balances) {
    let totalOwed = 0;
    let totalOwes = 0;

    for (const targetId in balances[userId].owed) {
      totalOwed += balances[userId].owed[targetId];
    }

    for (const targetId in balances[userId].owes) {
      totalOwes += balances[userId].owes[targetId];
    }

    balances[userId].total = totalOwed - totalOwes;
  }

  return balances;
};

// Export calculated balances
export const mockBalances = calculateBalances();

// Categories with icons
export const expenseCategories: {name: ExpenseCategory, icon: string}[] = [
  { name: 'Food', icon: '🍽️' },
  { name: 'Rent', icon: '🏠' },
  { name: 'Transportation', icon: '🚗' },
  { name: 'Utilities', icon: '💡' },
  { name: 'Entertainment', icon: '🎭' },
  { name: 'Shopping', icon: '🛍️' },
  { name: 'Travel', icon: '✈️' },
  { name: 'Other', icon: '📦' },
];

// Split types with labels
export const splitTypes: {type: SplitType, label: string}[] = [
  { type: 'equal', label: 'Split Equally' },
  { type: 'percentage', label: 'Split by Percentage' },
  { type: 'exact', label: 'Split by Exact Amount' },
];
