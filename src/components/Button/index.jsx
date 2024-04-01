/* eslint-disable react/prop-types */
import "./Button.css";

export default function Button({ children, tipo }) {
  return (
    <button className="botao" type={tipo}>
      {children}
    </button>
  );
}
