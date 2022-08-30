import React from "react";
import { Direction } from "types";

type Props = {
  disabled: boolean;
  onClick: () => void;
  direction: "prev" | "next";
  buttonProps?: JSX.IntrinsicElements["button"];
};

const ArrowContent: Record<Direction, React.ReactNode> = {
  prev: "PREVIOUS",
  next: "NEXT",
};

function ArrowButton({ direction, onClick, disabled, buttonProps }: Props) {
  return (
    <button
      {...buttonProps}
      aria-label={
        direction === "prev" ? "Move to previous list" : "Move to next list"
      }
      disabled={disabled}
      onClick={onClick}
    >
      {ArrowContent[direction]}
    </button>
  );
}

export { ArrowButton };
