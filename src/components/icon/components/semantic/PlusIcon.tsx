import Icon from "../../icon";
import type { IconProps } from "../../types";

export const PlusIcon = (props: IconProps) => (
  <Icon {...props}>
    <svg
      className="lucide lucide-plus-icon lucide-plus"
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
      <title>Plus</title>
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  </Icon>
);

PlusIcon.displayName = "PlusIcon";
