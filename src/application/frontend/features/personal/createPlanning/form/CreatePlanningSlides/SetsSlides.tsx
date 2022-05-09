import React from 'react'
import { SwiperSlide } from 'swiper/react'
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
              trainingIndex,
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