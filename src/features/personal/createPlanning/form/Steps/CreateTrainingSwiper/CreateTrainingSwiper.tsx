import { Navigation, Pagination } from "swiper";
import {Swiper} from "swiper/react";
import { useSwiperContext } from "../SwiperContext";
import styles from '../styles.module.scss';

const CreateTrainingSwiper: React.FC = ({ children }) => {
  const { setSwiper } = useSwiperContext();

  return <Swiper
    spaceBetween={50}
    slidesPerView={1}
    modules={[ Navigation, Pagination ]}
    allowTouchMove={false}
    pagination={{
      clickable: true
    }}
    onSwiper={(thisSwiper) => {
      setSwiper(thisSwiper)
    }}
    className={styles.swiper}
    onDestroy={() => setSwiper(null)}
  >
    {children}
  </Swiper>
}

export default CreateTrainingSwiper;