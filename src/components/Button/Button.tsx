import React from "react";
// import { Button as ElButton } from "@spectral-labs/burgui";

interface ButtonProps {
  label: string;
}

const Button: React.FC<ButtonProps> = ({ label = "Button" }) => (
  // <ElButton label={label} />
  <button>{label}</button>
);

export default Button;
