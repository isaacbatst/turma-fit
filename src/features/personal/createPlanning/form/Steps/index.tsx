import { SwiperSlide } from "swiper/react";
import { useAppSelector } from "../../../../../store/hooks";
import { SeriesSlideContextProvider } from "./contexts/ExercisesSeriesSlideContext";
import { SwiperContextProvider } from "./contexts/SwiperContext";
import { AerobicInput } from "./AerobicInput/AerobicInput";
import CreateTrainingSwiper from "./CreateTrainingSwiper/CreateTrainingSwiper";
import ExercisesSeriesSlide from "./ExercisesSeriesSlide/ExercisesSeriesSlide";
import PlanningTypesRadios from "./PlanningTypeRadios/PlanningTypesRadios";

const Steps: React.FC = () => {
  const trainings = useAppSelector(state => state.personal.createPlanning.form.trainings);

  return (
    <CreateTrainingSwiper>
      <SwiperSlide><PlanningTypesRadios /></SwiperSlide>
      {
        trainings.map((training, trainingIndex) => (
          training.exercisesSeries.map((exercisesSeries, exercisesSeriesIndex) => (
            <>
              {/* <SwiperSlide>
                <AerobicInput training={training} />
                Botão salvar e passar
                pegar estilos
              </SwiperSlide> */}
              <SwiperSlide key={training.id}>
                <SeriesSlideContextProvider value={{
                  exercisesSeries,
                  exercisesSeriesIndex,
                  training,
                  trainingIndex,
                  lastExerciseSeriesIndex: training.exercisesSeries.length - 1,
                  lastTrainingIndex: trainings.length - 1,
                }}>
                  <ExercisesSeriesSlide />
                </SeriesSlideContextProvider>
              </SwiperSlide>
            </>
          ))
        ))
      }
    </CreateTrainingSwiper>
  )
} 

const CreatePlanningSteps: React.FC = () => (
  <SwiperContextProvider>
    <div>
      <Steps />
    </div>
  </SwiperContextProvider>
)

export default CreatePlanningSteps