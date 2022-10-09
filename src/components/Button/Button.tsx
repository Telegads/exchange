import React, { FC } from "react";
import style from "./Button.module.scss";

type ButtonTypes = "primary" | "ghost";
type Size = "S" | "M" | "L";

type ButtonProps = {
  type: ButtonTypes;
  rounded?: boolean;
  size?: Size;
  onClick: () => void;
};

export const Button: FC<ButtonProps> = ({
  type,
  children,
  rounded,
  onClick,
  size = "M",
}) => {
  return (
    <button
      className={`${style[type]} ${rounded ?? style.rounded} ${style[size]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
