import { Dispatch, SetStateAction, useReducer } from 'react';
import { MdOutlineAdd, MdClose } from 'react-icons/md';
import usePlanningTypes from '../../../../../lib/swr/usePlanningTypes';
import { CreateTrainingForm } from '../CreateTrainingForm/CreateTrainingForm';
import { PlanningTypeRadio } from './PlanningTypeRadio';
import styles from './CreateTrainingPlanningForm.module.scss';
import trainingsReducer, { addTrainingAction, initialState } from './CreateTrainingPlanningFormReducer';
import CloseButton from '../../../../common/CloseButton';

type Props = {
  setShouldShowForm: Dispatch<SetStateAction<boolean>>
}

const CreateTrainingPlanningForm: React.FC<Props> = ({ setShouldShowForm }) => {
  const [state, dispatch] = useReducer(trainingsReducer, initialState);
  const { planningTypes } = usePlanningTypes();

  return (
    <div className={styles.formWrapper}>
      <CloseButton onClick={() => setShouldShowForm(false)} />
      {
        planningTypes && (
          <div className={styles.planningTypesWrapper}>
            <h3>Tipo de Planejamento</h3>
            {planningTypes.map((planningType) => (
              <PlanningTypeRadio key={planningType.id} planningType={planningType} />
            ))}  
          </div>
        )
      }
      <button 
        className={styles.addTraining}
        onClick={() => dispatch(addTrainingAction())}
      >
        <MdOutlineAdd /> Treino
      </button>
      <div className={styles.trainings}>
        {
          state.trainings.map((training, index) => (
            <CreateTrainingForm key={training.id} training={training} index={index} dispatch={dispatch} />
          ))
        }
      </div>
    </div>
  )
}

export default CreateTrainingPlanningForm;