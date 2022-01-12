import { Dispatch, SetStateAction, useReducer } from 'react';
import { MdOutlineAdd, MdClose } from 'react-icons/md';
import usePlanningTypes from '../../../../../lib/swr/usePlanningTypes';
import { CreateTrainingForm } from '../CreateTrainingForm/CreateTrainingForm';
import styles from './CreateTrainingPlanningForm.module.scss';
import trainingsReducer, { addTrainingAction, initialState } from './CreateTrainingPlanningFormReducer';

type Props = {
  setShouldShowForm: Dispatch<SetStateAction<boolean>>
}

const CreateTrainingPlanningForm: React.FC<Props> = ({ setShouldShowForm }) => {
  const [state, dispatch] = useReducer(trainingsReducer, initialState);
  const { planningTypes } = usePlanningTypes();

  return (
    <div className={styles.formWrapper}>
      <button 
        className={styles.closeForm} 
        onClick={() => setShouldShowForm(false)}
      >
        <MdClose />
      </button>
      {
        planningTypes && (
          <div className={styles.planningTypesWrapper}>
            <h3>Tipo de Planejamento</h3>
            {planningTypes.map(({ id, name }) => (
              <>
                <input type="radio" id={`planningTypeRadio-${id}`} name="planningType" value={id} />
                <label key={id} htmlFor={`planningTypeRadio-${id}`}>
                  {name}
                </label>
              </>
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