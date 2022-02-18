import { TrainingPlanningType } from "@prisma/client";
import { ChangeEventHandler } from "react";
import { useSwiper } from "swiper/react";
import { useAppDispatch } from "../../../../../../store/hooks";
import { setPlanningTypeAction } from "../../slice";

type Props = {
  planningType: TrainingPlanningType
}

export const PlanningTypeRadio: React.FC<Props> = ({ planningType }) => {
  const dispatch = useAppDispatch();
  const swiper = useSwiper();

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    if(event.target.checked) {
      dispatch(setPlanningTypeAction(planningType))
      swiper.slideNext();
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
