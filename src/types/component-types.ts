import { ReactNode } from 'react';
import { FormEvent } from 'react';

export type RootLayoutProps = {
  children: ReactNode;
};

export type FormSubmitEvent = FormEvent<HTMLFormElement>;

export type SidebardProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activePage?:string;
};