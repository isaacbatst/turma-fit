import { TrainingPlanningType } from "@prisma/client";
import { ChangeEventHandler } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../../store/hooks";
import { addTrainingAction, setPlanningTypeAction } from "../../slice";
import { useSwiperContext } from "../contexts/SwiperContext";

type Props = {
  planningType: TrainingPlanningType
}

export const PlanningTypeRadio: React.FC<Props> = ({ planningType }) => {
  const dispatch = useAppDispatch();
  const trainingsLength = useAppSelector(state => state.personal.createPlanning.form.trainings.length)
  const { setShouldMoveToNext } = useSwiperContext();

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    if(event.target.checked) {
      dispatch(setPlanningTypeAction(planningType))

      if(trainingsLength === 0){
        dispatch(addTrainingAction());
      }

      setShouldMoveToNext(true);
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
