import Icon from "../../icon";
import type { IconProps } from "../../types";

export const ChevronLeftIcon = (props: IconProps) => (
  <Icon {...props}>
    <svg
      className="lucide lucide-chevron-left-icon lucide-chevron-left"
      fill="none"
      height="24"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Chevron left</title>
      <path d="m15 18-6-6 6-6" />
    </svg>
  </Icon>
);

ChevronLeftIcon.displayName = "ChevronLeftIcon";
