import React, { useEffect } from 'react'
import { SwiperSlide, useSwiper } from 'swiper/react'
import { useAppSelector } from '../../../../../store/hooks'
import SetSlide from './SetSlide/SetSlide'
import { SetSlideContextProvider } from './SetSlide/SetSlideContext'
import SetsSlides from './SetsSlides'
import TrainingCheckout from './TrainingCheckout/TrainingCheckout'
import { TrainingCheckoutContextProvider } from './TrainingCheckout/TrainingCheckoutContext'

const TrainingsSlides: React.FC = () => {
  const trainings = useAppSelector(state => state.personal.createPlanning.form.trainings);
  const swiper = useSwiper();

  useEffect(() => {
    swiper.updateSlides();
  }, [trainings, swiper])

  return (
    <>
      {
        trainings.map((training, trainingIndex) => (
          <React.Fragment  key={training.id}>
            <SetsSlides training={training} trainingIndex={trainingIndex} />
            <SwiperSlide>
              <TrainingCheckoutContextProvider value={{ training }}>
                <TrainingCheckout />
              </TrainingCheckoutContextProvider>
            </SwiperSlide>
          </React.Fragment>
        ))
      }
    </>
  )
}

TrainingsSlides.displayName = 'SwiperSlide';

// Used while Swiper needs direct SwiperSlides Children
// https://github.com/nolimits4web/swiper/issues/4413

export default TrainingsSlides