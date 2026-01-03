
export enum AppView {
  DASHBOARD = 'DASHBOARD',
  TASKS = 'TASKS',
  WITHDRAW = 'WITHDRAW',
  HISTORY = 'HISTORY',
  PROFILE = 'PROFILE'
}

export interface Task {
  id: string;
  title: string;
  description: string;
  reward: number;
  timeEstimate: string;
  category: 'Review' | 'Analysis' | 'Data Entry';
}

export interface UserStats {
  balance: number;
  totalEarned: number;
  tasksCompleted: number;
  hourlyRate: number;
}

export interface WithdrawalRequest {
  id: string;
  amount: number;
  address: string;
  network: string;
  status: 'Pending' | 'Completed' | 'Failed';
  timestamp: Date;
}
