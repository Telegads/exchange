import Link from 'next/link';
import React, { FC, useMemo } from 'react';
import { Button as BootstrapButton, ButtonProps as BootstrapButtonProps } from 'react-bootstrap';

import style from './Button.module.scss';

type Size = 'lg' | 'sm';
type BorderRadius = 'square' | 'rounded' | 'standard';

type ButtonProps = {
  size?: Size;
  onClick?: () => void;
  rounded?: BorderRadius;
  loading?: boolean;
  disabled?: boolean;
  fillHeight?: boolean;
  className?: string;
  href?: string;
} & BootstrapButtonProps;

export const Button: FC<ButtonProps> = ({
  variant,
  size = 'sm',
  rounded,
  onClick,
  loading,
  disabled,
  children,
  fillHeight,
  className,
  href,
  ...restButtonProps
}) => {
  const button = useMemo(
    () => (
      <BootstrapButton
        {...restButtonProps}
        variant={variant}
        size={size}
        href={href}
        onClick={onClick}
        disabled={disabled}
        className={`${className} ${style.btn} ${style[size]} ${rounded && style[rounded]} ${loading && style.loading} 
    ${fillHeight && style.fillHeight}
    `}
      >
        {loading ? 'Загрузка...' : children}
      </BootstrapButton>
    ),
    [children, className, disabled, fillHeight, href, loading, onClick, restButtonProps, rounded, size, variant],
  );

  return href ? <Link href={href}>{button}</Link> : button;
};
