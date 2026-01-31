"use client";

import { ClientOnly } from "@semantic/components/util/client-only";
import { formatRelativeTime } from "@semantic/utils/date-util";
import type { ComponentProps } from "react";

type RelativeTimeProps = ComponentProps<"time"> & {
  time: string | Date;
};

export const RelativeTime = ({ time, ...props }: RelativeTimeProps) => {
  return (
    <ClientOnly>
      <time {...props}>{formatRelativeTime(time)}</time>
    </ClientOnly>
  );
};
