import React from 'react';
import usePlanningTypes from '../../../../../lib/swr/usePlanningTypes';
import styles from '../styles.module.scss';
import { PlanningTypeRadio } from './PlanningTypeRadio';

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
