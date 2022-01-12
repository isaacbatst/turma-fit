import React, { MouseEventHandler } from 'react'
import { MdOutlineAdd } from 'react-icons/md'
import styles from '../../styles/components/addButton.module.scss';

type Props = {
  text: string,
  onClick: MouseEventHandler
}

const AddButton: React.FC<Props> = ({ text, onClick }) => {
  return (
    <button 
      className={styles.addButton}
      onClick={onClick}
    >
      <MdOutlineAdd /> {text}
    </button>
  )
}

export default AddButton
