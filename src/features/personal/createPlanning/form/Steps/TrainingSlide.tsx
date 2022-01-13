import { SwiperSlide } from "swiper/react"
import { TrainingBeingCreated } from "../types"
import AddTrainingButton from "./AddTrainingButton"
import { CreateTrainingForm } from "./CreateTrainingForm/CreateTrainingForm"
import RemoveTrainingButton from "./RemoveTrainingButton"
import styles from './styles.module.scss'

type Props = {
  training: TrainingBeingCreated,
  index: number,
  lastTrainingIndex: number
}

const TrainingSlide: React.FC<Props> = ({ training, index, lastTrainingIndex }) => (
  <div className={styles.trainingSlide}>
    <CreateTrainingForm training={training} index={index} />
    <div className={styles.buttonsWrapper}>
      { index === lastTrainingIndex && <AddTrainingButton /> }
      <RemoveTrainingButton index={index} />
    </div>
  </div>
)

export default TrainingSlide;