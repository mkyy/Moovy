import { CustomizationContextType, Props } from '@custom-types/context';
import { useState } from 'react';
import { createContext } from 'react';

export const CustomizationContext = createContext<CustomizationContextType | null>(null);

export const CustomizationProvider: React.FC<Props> = ({ children }) => {
  // dark/light string used to toggle theme
  const [themeStyle, setThemeStyle] = useState('light');

  return (
    <CustomizationContext.Provider
      value={{
        themeStyle,
        setThemeStyle
      }}
    >
      {children}
    </CustomizationContext.Provider>
  );
};
