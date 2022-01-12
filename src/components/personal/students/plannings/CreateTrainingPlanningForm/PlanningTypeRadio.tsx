import { TrainingPlanningType } from "@prisma/client";
import { ChangeEventHandler, useEffect } from "react";
import { addTrainingAction, setPlanningTypeAction } from "./store/form/actions";
import { useCreatePlanningFormContext } from "./store/form/context";
import { useCreatePlanningStepsContext } from "./store/steps/context";

type Props = {
  planningType: TrainingPlanningType
}

export const PlanningTypeRadio: React.FC<Props> = ({ planningType }) => {
  const [state] = useCreatePlanningStepsContext();
  const [formState, dispatch] = useCreatePlanningFormContext();

  useEffect(() => {
    console.log(formState.trainings.length)
  }, [formState.trainings.length])

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    if(event.target.checked) {
      dispatch(setPlanningTypeAction(planningType))
      dispatch(addTrainingAction());
    }
  }

  const { id, name } = planningType;

  return (
    <>
      <input type="radio" id={`planningTypeRadio-${id}`} name="planningType" value={id} onChange={handleChange} />
      <label htmlFor={`planningTypeRadio-${id}`}>
        {name}
      </label>
    </>
  )
}
