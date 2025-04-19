import dayjs from 'dayjs';

export const formatTime = (date: string | Date, format = 'YYYY-MM-DD HH:mm:ss') => {
  return dayjs(date).format(format);
};

export const formatRelativeTime = (date: string | Date): string => {
  const now = dayjs();
  const target = dayjs(date);

  const diffSeconds = now.diff(target, 'second');
  if (diffSeconds < 60) return 'just now';

  const diffMinutes = now.diff(target, 'minute');
  if (diffMinutes < 60) return `${diffMinutes}m ago`;

  const diffHours = now.diff(target, 'hour');
  if (diffHours < 24) return `${diffHours}h ago`;

  const diffDays = now.diff(target, 'day');
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.ceil(diffDays / 7)}w ago`;

  const diffMonths = now.diff(target, 'month');
  if (diffMonths < 12) return `${diffMonths} month ago`;

  const diffYears = now.diff(target, 'year');
  return `${diffYears}y ago`;
};
