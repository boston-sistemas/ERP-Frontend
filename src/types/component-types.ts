import { ReactNode } from 'react';
import { FormEvent } from 'react';

export type RootLayoutProps = {
  children: ReactNode;
};

export type FormSubmitEvent = FormEvent<HTMLFormElement>;