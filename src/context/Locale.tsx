import { TFunction } from "i18next";
import { createContext, FC, PropsWithChildren, useState } from "react";

import { SupportedLocale } from "../constants";

const defaultValue: [TFunction, SupportedLocale, (lng: SupportedLocale) => void] = 
[(value: string) => value, SupportedLocale.UA, () => {}]

export const LocaleContext = createContext(defaultValue);

export const LocaleProvider: FC<PropsWithChildren<{ t: TFunction, lng?: SupportedLocale }>> = ({ children, t, lng }) => {
    const [ language, setLanguage ] = useState(lng || SupportedLocale.UA);

    return <LocaleContext.Provider value={[ t, language, setLanguage ]}>
        {children}
      </LocaleContext.Provider>
};
