import { TrainingPlanningType } from "@prisma/client"
import { ChangeEventHandler } from "react";
import { useCreatePlanningStepsContext } from "./store/steps/context"

type Props = {
  planningType: TrainingPlanningType
}

export const PlanningTypeRadio: React.FC<Props> = ({ planningType: { id, name } }) => {
  const [state] = useCreatePlanningStepsContext();

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    if(event.target.checked) {
      console.log(state.swiper)
      state.swiper?.slideNext()
    }
  }

  return (
    <>
      <input type="radio" id={`planningTypeRadio-${id}`} name="planningType" value={id} onChange={handleChange} />
      <label htmlFor={`planningTypeRadio-${id}`}>
        {name}
      </label>
    </>
  )
}
