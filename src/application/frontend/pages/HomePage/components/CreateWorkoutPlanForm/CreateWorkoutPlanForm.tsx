import { useAppSelector } from '@application/frontend/store/hooks'
import { selectUnauthenticatedCreateWorkoutPlanError } from '@application/frontend/store/slices/UnauthenticatedWorkoutPlan'
import React from 'react'
import { Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import { Swiper, SwiperSlide } from 'swiper/react'
import CreateWorkoutPlanFormContextProvider from './CreateWorkoutPlanFormContextProvider'
import PlanTypeRadios from './PlanTypeRadios'
import WorkoutsList from './WorkoutsList'

interface Props {
  isAuthenticated?: boolean
}

const CreateWorkoutPlanForm: React.FC<Props> = ({ isAuthenticated = false }) => {

  return (
    <CreateWorkoutPlanFormContextProvider isAuthenticated={isAuthenticated}>
      <form className='text-center'>
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          modules={[Pagination]}
          noSwipingClass='swiper-wrapper'
          pagination={{
            clickable: true,
            dynamicBullets: true
          }}
          autoHeight={true}
        >
          <SwiperSlide>
            <section className='bg-blue-900 pt-5 pb-5 px-2 '>
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