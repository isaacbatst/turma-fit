import { MdOutlineAdd } from "react-icons/md";
import IconButtonWithText from "../../../../../../components/common/IconButtonWithText";
import { useAppDispatch } from "../../../../../../store/hooks";
import { addTrainingAction } from "../../slice";
import { useSwiperContext } from "../contexts/SwiperContext";

const AddTrainingButton: React.FC = () => {
  const dispatch = useAppDispatch();
  const { setShouldMoveToNext } = useSwiperContext();

  return (
    <IconButtonWithText
      text='Treino'
      onClick={() => {
        dispatch(addTrainingAction())
        setShouldMoveToNext(true);
      }}
      Icon={MdOutlineAdd}
    />
  )
}

export default AddTrainingButton;