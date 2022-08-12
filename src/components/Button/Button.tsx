import React from "react";
import "./Button.scss";

export interface ButtonProps {
  label: string;
}

const Button = (props: ButtonProps) => {
  return (
    <>
      <div>bonjour</div>
      <p className="text-primary">primary</p>
    </>
  );
};

export default Button;
