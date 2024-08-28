import { ReactNode, FC } from 'react';

// eslint-disable-next-line @typescript-eslint/ban-types
export type PageComponent<P = {}> = FC<P> & {
  getLayout?: (page: ReactNode) => ReactNode;
};
