import { CustomizationContextType, Props } from '@custom-types/context';
import { useState } from 'react';
import { createContext } from 'react';

export const CustomizationContext = createContext<CustomizationContextType | null>(null);

export const CustomizationProvider: React.FC<Props> = ({ children }) => {
  // dark/light string used to toggle theme
  const [themeStyle, setThemeStyle] = useState('light');
  // alert opened state
  const [open, setOpen] = useState(false);
  // alert style
  const [isAdd, setIsAdd] = useState(true);
  // alert movie title to show on message
  const [alertTitle, setAlertTitle] = useState<string | null>(null);

  const handleAlert = (wasAdded: boolean, title: string) => {
    if (wasAdded) {
      setIsAdd(true);
    } else {
      setIsAdd(false);
    }

    setAlertTitle(title);
    setOpen(true);
    //timeout
    setTimeout(() => {
      setOpen(false);
    }, 5000);
  };

  return (
    <CustomizationContext.Provider
      value={{
        themeStyle,
        setThemeStyle,
        open,
        setOpen,
        isAdd,
        alertTitle,
        handleAlert
      }}
    >
      {children}
    </CustomizationContext.Provider>
  );
};
