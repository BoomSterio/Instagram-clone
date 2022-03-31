import messages_en from './en'

export interface RawLocalesList {
  [key: string]: string | RawLocalesList
}

export interface LocalesList {
  [key: string]: string
}

export enum localesLanguages {
  en = 'en',
}

const parseLocalesList = (object: RawLocalesList, parentKey?: string): LocalesList => {
  const keys = Object.keys(object)

  return keys.reduce<LocalesList>((acc, key) => {
    const value = object[key]
    const objectKey = parentKey ? `${parentKey}.${key}` : key

    if (typeof value === 'string') {
      return {
        ...acc,
        [objectKey]: value,
      }
    }

    return {
      ...acc,
      ...parseLocalesList(value, objectKey),
    }
  }, {})
}

const locales: Record<localesLanguages, LocalesList> = {
  en: parseLocalesList(messages_en),
}

export const defaultLocale = localesLanguages.en

export default locales
