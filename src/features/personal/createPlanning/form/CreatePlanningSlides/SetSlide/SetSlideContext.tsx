import { createContext, useContext } from "react";

type SetSlideContextType = {
  trainingIndex: number,
  setIndex: number
}

const SetSlideContext = createContext<SetSlideContextType | undefined>(undefined);

export const useSetSlideContext = () => {
  const context = useContext(SetSlideContext);

  if(context === undefined){
    throw new Error("useSetSlideContext must be within SetsSlideProvider")
  }

  return context;
}

type Props = {
  value: SetSlideContextType
}

export const SetSlideContextProvider: React.FC<Props> = ({ children, value }) => {

  return <SetSlideContext.Provider value={{
    ...value,
  }}>
    {children}
  </SetSlideContext.Provider>
}