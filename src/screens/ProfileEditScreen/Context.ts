import * as React from 'react'

interface ControllerContextProps {
  setHandleSubmit: React.Dispatch<React.SetStateAction<(...args: any[]) => any>>
  handleConfirm: () => void
}

const defaultValues: ControllerContextProps = {
  setHandleSubmit: () => {},
  handleConfirm: () => {},
}

const ControllerContext = React.createContext<ControllerContextProps>(defaultValues)

export default ControllerContext