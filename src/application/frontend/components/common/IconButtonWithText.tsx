import React, { MouseEventHandler } from 'react'
import { IconType } from 'react-icons';
import defaultStyles from '../../styles/components/iconButtonWithText.module.scss';

type Props = {
  text: string,
  onClick: MouseEventHandler,
  Icon: IconType,
  styles?: string
}

const IconButtonWithText: React.FC<Props> = ({ text, onClick, Icon, styles = defaultStyles.iconButtonWithText }) => {
  return (
    <button 
      className={styles}
      onClick={onClick}
    >
      <Icon /><span>{text}</span>
    </button>
  )
}

export default IconButtonWithText
