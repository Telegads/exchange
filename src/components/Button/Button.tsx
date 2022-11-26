import React, { FC } from 'react';
import { Button as BootstrapButton } from 'react-bootstrap';

import style from './Button.module.scss';

type ButtonTypes = 'primary' | 'ghost' | 'inverted';
type Size = 'lg' | 'sm';
type BorderRadius = 'square' | 'rounded' | 'standard';

type ButtonProps = {
  type: ButtonTypes;
  size?: Size;
  onClick: () => void;
  rounded?: BorderRadius;
  loading?: boolean;
  disabled?: boolean;
  fillHeight?: boolean;
  className?: string;
};

export const Button: FC<ButtonProps> = ({
  type,
  size = 'sm',
  rounded,
  onClick,
  loading,
  disabled,
  children,
  fillHeight,
  className,
}) => {
  return (
    <BootstrapButton
      variant={type}
      size={size}
      onClick={onClick}
      disabled={disabled}
      className={`${className} ${style.btn} ${style[type]} ${style[size]} ${rounded && style[rounded]} ${
        loading && style.loading
      } 
      ${fillHeight && style.fillHeight}
      `}
    >
      {loading ? 'Загрузка...' : children}
    </BootstrapButton>
  );
};
