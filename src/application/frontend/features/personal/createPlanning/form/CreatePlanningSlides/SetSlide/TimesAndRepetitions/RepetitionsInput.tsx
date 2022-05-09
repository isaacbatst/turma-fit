import React from 'react';
import { useAppDispatch } from '../../../../../../../../../store/hooks';
import { setRepetitionsAction } from '../../../slice';

type Props = {
  getId: (inputName: string, tag: string) => string,
  repetitions: string,
  setIndex: number,
  trainingIndex: number
}

const RepetitionsInput: React.FC<Props> = ({ getId, setIndex, repetitions, trainingIndex }) => {
  const dispatch = useAppDispatch();

  return (
    <label htmlFor={getId('repetitions', 'label')}>
      Repetições
      <input type="text" name="" value={repetitions} id={getId('repetitions', 'input')}
        onChange={(event) => dispatch(setRepetitionsAction({
          repetitions: event.target.value,
          setIndex,
          trainingIndex
        }))}
      />
    </label>
  )
}

export default RepetitionsInput