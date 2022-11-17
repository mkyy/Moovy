import React from 'react';

export type CustomizationContextType = {
  themeStyle: string | null;
  setThemeStyle: (theme: string) => void;
  isAdd: boolean;
  open: boolean;
  setOpen: (state: boolean) => void;
  alertTitle: string | null;
  handleAlert: (wasAdded: boolean, title: string) => void;
};

export interface Props {
  children: React.ReactNode;
}
