export type Priority = 'HIGH' | 'MEDIUM' | 'LOW';

export const PRIORITY_COLORS: Record<Priority, string> = {
  HIGH: 'red',
  MEDIUM: 'orange',
  LOW: 'yellow',
};

export type Status = 'pending' | 'in_progress' | 'resolved';

export const STATUS_OPTIONS: Status[] = ['pending', 'in_progress', 'resolved'];
