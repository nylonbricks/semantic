"use client";

import { MDXProvider } from "@mdx-js/react";
import type { ReactNode } from "react";

import { components } from "./mdx-component";

interface MdxProviderProps {
  children: ReactNode;
}

export const MdxProvider = ({ children }: MdxProviderProps) => {
  return <MDXProvider components={components}>{children}</MDXProvider>;
};
