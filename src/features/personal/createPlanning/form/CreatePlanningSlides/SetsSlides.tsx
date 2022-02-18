import React from 'react'
import { SwiperSlide } from 'swiper/react'
import trainings from '../../../../../pages/trainings'
import { TrainingBeingCreated } from '../types'
import SetSlide from './SetSlide/SetSlide'
import { SetSlideContextProvider } from './SetSlide/SetSlideContext'

type Props = {
  training: TrainingBeingCreated,
  trainingIndex: number
}

const SetsSlides: React.FC<Props> = ({ training, trainingIndex }) => {
  return (
    <>
      {
        training.sets.map((set, setIndex) => (
          <SwiperSlide key={set.id}>
            <SetSlideContextProvider value={{
              setIndex,
              training,
              trainingIndex,
              lastSetIndex: training.sets.length - 1,
              lastTrainingIndex: trainings.length - 1,
            }}>
              <SetSlide />
            </SetSlideContextProvider>
          </SwiperSlide>
        ))
      }
    </>
  )
}

export default SetsSlides