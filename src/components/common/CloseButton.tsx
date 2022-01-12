import React, { MouseEventHandler } from 'react'
import { MdClose } from 'react-icons/md';
import styles from '../../styles/components/closeButton.module.scss';

type Props = {
  onClick: MouseEventHandler;
}

const CloseButton: React.FC<Props> = ({ onClick }) => {
  return (
    <button 
      className={styles.closeButton} 
      onClick={onClick}
    >
      <MdClose />
    </button> 
  )
}

export default CloseButton
