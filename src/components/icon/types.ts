import { SVGAttributes } from 'react';

export type IconProps = {
  size?: number;
  width?: number | string;
  height?: number | string;
} & SVGAttributes<SVGElement>;
