import React from 'react'
import { Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import { Swiper, SwiperSlide } from 'swiper/react'
import CreateWorkoutPlanFormContextProvider from './CreateWorkoutPlanFormContextProvider'
import PlanTypeRadios from './PlanTypeRadios'
import WorkoutsList from './WorkoutsList'

const CreateWorkoutPlanForm: React.FC = () => {
  return (
    <CreateWorkoutPlanFormContextProvider>
      <form action="">
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          noSwiping
          noSwipingClass='swiper-wrapper'
          modules={[Pagination]}
          pagination={{
            clickable: true,
            dynamicBullets: true
          }}
          autoHeight={true}
        >
          <SwiperSlide>
            <section className='bg-blue-900 py-5 px-2 '>
              <PlanTypeRadios />
            </section>
          </SwiperSlide>
          <WorkoutsList />
        </Swiper>
      </form>
    </CreateWorkoutPlanFormContextProvider>
  )
}

export default CreateWorkoutPlanForm