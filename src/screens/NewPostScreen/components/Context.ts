import * as React from 'react'
import { FormikValues } from 'formik'

interface ControllerContextProps {
  formState: FormikValues
  setFormState: React.Dispatch<React.SetStateAction<FormikValues>>
  setHandleSubmit: React.Dispatch<React.SetStateAction<(...args: any[]) => any>>
  handleConfirmStep: () => void
  handleBack: () => void
  currentTab: any
}

const defaultValues: ControllerContextProps = {
  formState: {},
  setFormState: () => {},
  setHandleSubmit: () => {},
  handleConfirmStep: () => {},
  handleBack: () => {},
  currentTab: 'fileSelection',
}

const ControllerContext = React.createContext<ControllerContextProps>(defaultValues)

export default ControllerContext
