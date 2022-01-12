import { TrainingPlanningType } from '@prisma/client'
import React from 'react'
import { PlanningTypeRadio } from './PlanningTypeRadio'
import styles from './CreateTrainingPlanningForm.module.scss';
import usePlanningTypes from '../../../../../lib/swr/usePlanningTypes';

type Props = {
}

const PlanningTypesRadios: React.FC<Props> = ({ }) => {
  const { planningTypes } = usePlanningTypes();

  return (
    <div className={styles.planningTypesWrapper}>
      <h3>Tipo de Planejamento</h3>
      {planningTypes && planningTypes.map((planningType) => (
        <PlanningTypeRadio key={planningType.id} planningType={planningType} />
      ))}  
    </div>
  )
}

export default PlanningTypesRadios
