import dayjs from 'dayjs';

export const formatTime = (date: string | Date, format = 'YYYY-MM-DD HH:mm:ss') => {
  return dayjs(date).format(format);
};