import Icon from "../../icon";
import type { IconProps } from "../../types";

export const ChevronRightIcon = (props: IconProps) => (
  <Icon {...props}>
    <svg
      className="lucide lucide-chevron-right-icon lucide-chevron-right"
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
      <title>Chevron right</title>
      <path d="m9 18 6-6-6-6" />
    </svg>
  </Icon>
);

ChevronRightIcon.displayName = "ChevronRightIcon";
