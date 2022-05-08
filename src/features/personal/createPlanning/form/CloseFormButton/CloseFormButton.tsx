import React, { Dispatch, SetStateAction } from 'react'
import { MdClose } from 'react-icons/md';
import IconButton from '../../../../../application/frontend/components/common/IconButton';
import { useAppDispatch } from '../../../../../store/hooks';
import { resetPlanningAction } from '../slice';
import styles from '../styles.module.scss'

type Props = {
  setShouldShowForm: Dispatch<SetStateAction<boolean>>
}

const CloseFormButton: React.FC<Props> = ({ setShouldShowForm }) => {
  const dispatch = useAppDispatch();

  return (
    <IconButton 
      onClick={() => {
        setShouldShowForm(false)
        dispatch(resetPlanningAction());
      }} 
      Icon={MdClose}
      styles={styles.closeForm}
    />
  )
}

export default CloseFormButton
