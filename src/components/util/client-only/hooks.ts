import { useSyncExternalStore } from "react";

const noop = (): void => undefined;

const emptySubscribe = () => noop;
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export const useIsClient = () =>
  useSyncExternalStore(emptySubscribe, getSnapshot, getServerSnapshot);
