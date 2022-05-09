import { createContext, useContext } from "react";
import { TrainingBeingCreated } from "../../types";

type TrainingCheckoutContextType = {
  training: TrainingBeingCreated,
}

const TrainingCheckoutContext = createContext<TrainingCheckoutContextType | undefined>(undefined);

export const useTrainingCheckoutContext = () => {
  const context = useContext(TrainingCheckoutContext);

  if(context === undefined){
    throw new Error("useTrainingCheckoutContext must be within TrainingCheckoutProvider")
  }

  return context;
}

type Props = {
  value: TrainingCheckoutContextType
}

export const TrainingCheckoutContextProvider: React.FC<Props> = ({ children, value }) => {
  return <TrainingCheckoutContext.Provider value={value}>
    {children}
  </TrainingCheckoutContext.Provider>
}
