import React, { useState } from 'react';
import { MdCheck } from 'react-icons/md';
import { useSwiper } from 'swiper/react';
import IconButtonWithText from '../../../../../../components/common/IconButtonWithText';
import { useAppSelector } from '../../../../../../store/hooks';
import { useSetSlideContext } from '../SetSlide/SetSlideContext';
import { validateSet } from './goToTrainingCheckoutValidation';
import alertStyles from './alertStyles.module.scss';
import iconButtonStyles from '@styles/components/iconButtonWithText.module.scss';

const GoToTrainingCheckoutButton: React.FC = () => {
  const { trainingIndex, setIndex } = useSetSlideContext()
  const training = useAppSelector((state) => state.personal.createPlanning.form.trainings[trainingIndex]);
  const swiper = useSwiper();
  const [showError, setShowError] = useState(false);

  const validation = validateSet(training.sets[setIndex]);

  return (
    <>
    <IconButtonWithText
      Icon={MdCheck}
      styles={validation.error ? undefined : iconButtonStyles.success}
      text="Treino"
      onClick={() => {
        if(validation.error){
          return setShowError(true)
        }

        swiper.slideNext();
      }}
    />
    {validation.error && showError && (
      <p className={alertStyles.error} onClick={() => setShowError(false)}>{validation.error}</p>
    )}
    
    </>
  )
}

export default GoToTrainingCheckoutButton
