import React from 'react';

export type CustomizationContextType = {
  themeStyle: string | null;
  setThemeStyle: (theme: string) => void;
};

export interface Props {
  children: React.ReactNode;
}
