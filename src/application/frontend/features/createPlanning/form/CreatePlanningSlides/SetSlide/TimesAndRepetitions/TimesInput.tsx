import React from 'react'
import { useAppSelector, useAppDispatch } from '../../../../../../store/hooks';
import { setTimesAction } from '../../../slice';
import { useSetSlideContext } from '../SetSlideContext'

type Props = {
  getId: (inputName: string, tag: string) => string,
  times: number,
  setIndex: number,
  trainingIndex: number
}

const TimesInput: React.FC<Props> = ({ getId, setIndex, times, trainingIndex }) => {
  const dispatch = useAppDispatch();

  return (
    <label htmlFor={getId('times', 'label')}>
      Séries
      <input type="text" name="" value={times} id={getId('times', 'input')}
        onChange={(event) => dispatch(setTimesAction({
          times: Number(event.target.value),
          setIndex,
          trainingIndex
        }))}
      />
    </label>
  )
}

export default TimesInput