import { TrainingPlanningType } from "@prisma/client"

type Props = {
  planningType: TrainingPlanningType
}

export const PlanningTypeRadio: React.FC<Props> = ({ planningType: { id, name } }) => {
  return (
    <>
      <input type="radio" id={`planningTypeRadio-${id}`} name="planningType" value={id} />
      <label htmlFor={`planningTypeRadio-${id}`}>
        {name}
      </label>
    </>
  )
}
