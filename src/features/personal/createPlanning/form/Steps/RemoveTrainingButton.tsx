import { MdDelete } from "react-icons/md";
import IconButtonWithText from "../../../../../components/common/IconButtonWithText";
import { useAppDispatch } from "../../../../../store/hooks";
import { removeTrainingAction } from "../slice";

type Props = {
  index: number
}

const RemoveTrainingButton: React.FC<Props> = ({ index }) => {
  const dispatch = useAppDispatch();

  return (
    <IconButtonWithText
      text='Treino'
      onClick={() => {
        dispatch(removeTrainingAction(index))
      }}
      Icon={MdDelete}
    />
  )
}

export default RemoveTrainingButton;