import { TFunction } from "i18next"
import { useCallback, useContext } from "react"
import { LocaleContext } from "../context"

export const useTranslation: () => TFunction = () => {
    const [t, lng] = useContext(LocaleContext)

    return useCallback((text: string, options = {}) => t(text, { lng, ...(options as any) }) as TFunction, [t, lng])
}