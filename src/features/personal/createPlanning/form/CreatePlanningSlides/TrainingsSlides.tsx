import React from 'react'
import { SwiperSlide } from 'swiper/react'
import { useAppSelector } from '../../../../../store/hooks'
import SetsSlides from './SetsSlides'
import TrainingCheckout from './TrainingCheckout/TrainingCheckout'
import { TrainingCheckoutContextProvider } from './TrainingCheckout/TrainingCheckoutContext'

const TrainingsSlides: React.FC = () => {
  const trainings = useAppSelector(state => state.personal.createPlanning.form.trainings);
  
  return (
    <>
      {
        trainings.map((training, trainingIndex) => (
          <React.Fragment key={training.id}>
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

export default TrainingsSlides