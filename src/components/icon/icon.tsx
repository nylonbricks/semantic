import { cloneElement } from 'react';

import Child from './child';
import { IconProps } from './types';

const DEFAULT_ICON_SIZE: number = 16;

const Icon = ({ children, width, height, size = DEFAULT_ICON_SIZE, ...props }: IconProps) => {
  return cloneElement(<Child>{children}</Child>, {
    width: width ?? size,
    height: height ?? size,
    ...props,
  });
};

export default Icon;
