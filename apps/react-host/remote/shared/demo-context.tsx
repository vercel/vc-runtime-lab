import { createContext, type ReactNode, useContext } from 'react';

export type DemoContextValue = {
  account: string;
  theme: string;
};

const DemoContext = createContext<DemoContextValue>({
  account: 'remote fallback',
  theme: 'remote fallback',
});

export function DemoContextProvider({
  children,
  value,
}: {
  children: ReactNode;
  value: DemoContextValue;
}) {
  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}

export function useDemoContext() {
  return useContext(DemoContext);
}
