import { useState, useEffect, FunctionComponent } from 'react'
import { IntlProvider } from 'react-intl'
import type { OnErrorFn } from '@formatjs/intl'
import locales, { defaultLocale, localesLanguages } from 'config/locales'

import Context from './Context'
import { AsyncStorage } from 'react-native'

interface Props {
  persistKey?: string
}

const isDevelopment = process?.env?.NODE_ENV === 'development'

const Provider: FunctionComponent<Props> = ({ children, persistKey = 'locale' }) => {
  const [locale, setLocale] = useState<localesLanguages>(localesLanguages.en)

  useEffect(() => {
    const getLocale = async () => {
      const value = await AsyncStorage.getItem(persistKey)
      setLocale((value && value in localesLanguages && (value as localesLanguages)) || defaultLocale)
    }
    getLocale()
  }, [])

  const handleIntlProviderError: OnErrorFn = (err) => {
    if (isDevelopment) {
      console.log('IntlProvider Error: >', err)
    }
  }

  useEffect(() => {
    const saveLocale = async () => {
      try {
        await AsyncStorage.setItem(persistKey, locale)
      } catch (error) {
        console.warn(error)
      }
    }
    saveLocale()
  }, [locale, persistKey])

  return (
    <Context.Provider value={{ locale, setLocale }}>
      <IntlProvider
        locale={locale}
        defaultLocale={defaultLocale}
        messages={locales[locale]}
        onError={handleIntlProviderError}
      >
        {children}
      </IntlProvider>
    </Context.Provider>
  )
}

export default Provider
