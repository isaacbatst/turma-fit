import { TrainingPlanningType } from "@prisma/client";
import { ChangeEventHandler } from "react";
import { useAppDispatch } from "../../../../../store/hooks";
import { addTrainingAction, setPlanningTypeAction } from "../slice";
import { useSwiperContext } from "../SwiperContext";

type Props = {
  planningType: TrainingPlanningType
}

export const PlanningTypeRadio: React.FC<Props> = ({ planningType }) => {
  const dispatch = useAppDispatch();
  const { setShouldMoveToNext } = useSwiperContext();

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    if(event.target.checked) {
      dispatch(setPlanningTypeAction(planningType))
      dispatch(addTrainingAction());
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
