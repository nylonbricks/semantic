import { useSyncExternalStore } from "react";

const noop = (): void => undefined;

const emptySubscribe = () => noop;
const getSnapshot = (): boolean => true;
const getServerSnapshot = (): boolean => false;

export const useIsClient = () =>
  useSyncExternalStore(emptySubscribe, getSnapshot, getServerSnapshot);
