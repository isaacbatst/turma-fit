import React from 'react';
import Loading from '../../../../../../application/frontend/components/common/Loading';
import { useGetPlanningTypesQuery } from '../../../api';
import styles from '../../styles.module.scss';
import radio from '../../../../../../styles/components/radio.module.scss';
import { PlanningTypeRadio } from './PlanningTypeRadio';

type Props = {
}

const PlanningTypesRadios: React.FC<Props> = ({ }) => {
  const { data: planningTypes, isLoading } = useGetPlanningTypesQuery();
  return (
    <div className={styles.planningTypesWrapper}>
      
      <h3>Tipo de Planejamento</h3>
      {isLoading && <Loading />}
      {planningTypes && (
        <div className={styles.radioWrapper}>
          {
            planningTypes.map((planningType) => (
              <PlanningTypeRadio key={planningType.id} planningType={planningType} />
            ))
          }
        </div>
      )}  
    </div>
  )
}

export default PlanningTypesRadios
