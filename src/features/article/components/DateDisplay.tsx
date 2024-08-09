'use client';

import { useMemo } from 'react';
import { FaRegCalendarCheck } from 'react-icons/fa6';

interface DateDisplayProps
  extends Omit<React.ComponentPropsWithoutRef<'time'>, 'datetime'> {
  date: Date;
}

export default function DateDisplay({ date, ...props }: DateDisplayProps) {
  const dateString = useMemo(() => date.toLocaleDateString(), [date]);

  return (
    <time
      {...props}
      dateTime={dateString}
      className={`flex items-center gap-x-2 opacity-normal ${props.className ?? ''}`}
    >
      <FaRegCalendarCheck />
      {dateString}
    </time>
  );
}
