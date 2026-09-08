import { cloneElement } from "react";

import Child from "./child";
import type { IconProps } from "./types";

const DEFAULT_ICON_SIZE: number = 16;

const Icon = ({
  children,
  width,
  height,
  size = DEFAULT_ICON_SIZE,
  ...props
}: IconProps) =>
  cloneElement(<Child>{children}</Child>, {
    height: height ?? size,
    width: width ?? size,
    ...props,
  });

export default Icon;
