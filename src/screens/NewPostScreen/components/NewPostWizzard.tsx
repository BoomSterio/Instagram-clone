import { FormikValues } from 'formik'
import { FunctionComponent, useCallback, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { NavigationProps } from 'config'
import { View } from 'react-native'
import { Header } from './Header'
import Context from './Context'
import { FileSelection } from './FileSelection'

export interface TabPanelProps {
  value: string | number
  index: string | number
}

export const enum TabsName {
  fileSelection = 'fileSelection',
  form = 'form',
  publish = 'publish',
}

export const tabsOrder: TabsName[] = [TabsName.fileSelection, TabsName.form, TabsName.publish]

export const TabPanel: FunctionComponent<TabPanelProps> = ({ value, index, children }) => {
  return value === index ? (
    <>
      {children}
    </>
  ) : null
}

export const NewPostWizzard = () => {
  const [value, setValue] = useState<TabsName>(TabsName.fileSelection)
  const [formState, setFormState] = useState<FormikValues>({})
  const [handleSubmit, setHandleSubmit] = useState<(...args: any[]) => any>()

  const navigation = useNavigation<NavigationProps>()

  const handleBack = useCallback(() => {
    const index = Math.max(0, tabsOrder.findIndex((val) => val === value) - 1)

    if (index === 0) {
      navigation.goBack()
    }

    setValue(tabsOrder[index])
  }, [value])

  const handleNext = () => {
    const index = tabsOrder.findIndex((val) => val === value)

    if (index < 2) {
      setValue(tabsOrder[index + 1])
    }

    if (handleSubmit) {
      handleSubmit();
    }
  }

  return (
    <Context.Provider value={{ currentTab: value, formState, setFormState, setHandleSubmit }}>
      <Header handleNext={handleNext} handleBack={handleBack} />
      <TabPanel value={value} index={'fileSelection'}>
        <FileSelection />
      </TabPanel>
    </Context.Provider>
  )
}
