import React, { FC } from "react";
import style from "./Button.module.scss";
import { Button as BootstrapButton } from "react-bootstrap";

type ButtonTypes = "primary" | "ghost";
type Size = "lg" | "sm";

type ButtonProps = {
  type: ButtonTypes;
  size?: Size;
  onClick: () => void;
  rounded?: boolean;
  loading?: boolean;
  disabled?: boolean;
};

export const Button: FC<ButtonProps> = ({
  type,
  size = "sm",
  rounded,
  onClick,
  loading,
  disabled,
  children,
}) => {
  return (
    <BootstrapButton
      variant={type}
      size={size}
      onClick={onClick}
      disabled={disabled}
      className={`${style.btn} ${style[type]} ${style[size]} ${
        rounded ? style.rounded : ""
      } ${loading ? style.loading : ""}`}
    >
      {loading ? "Загрузка..." : children}
    </BootstrapButton>
  );
};
