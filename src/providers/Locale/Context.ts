import React from 'react';
import { localesLanguages } from 'config/locales';

type LocaleContextType = {
  locale: localesLanguages;
  setLocale: React.Dispatch<React.SetStateAction<localesLanguages>>;
};

const defaultValues: LocaleContextType = {
  locale: localesLanguages.en,
  setLocale: () => {},
};

export const Context = React.createContext<LocaleContextType>(defaultValues);

export default Context;
