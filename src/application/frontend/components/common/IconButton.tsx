import React, { MouseEventHandler } from 'react'
import { IconType } from 'react-icons';
import defaultStyles from '@styles/components/iconButton.module.scss';

type Props = {
  onClick: MouseEventHandler;
  styles?: string
  Icon: IconType
}

const IconButton: React.FC<Props> = ({ onClick, Icon, styles = defaultStyles.iconButton }) => {
  return (
    <button 
      className={styles} 
      onClick={onClick}
    >
      <Icon />
    </button> 
  )
}

export default IconButton
