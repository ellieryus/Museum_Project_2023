import "./Button.scss";
import React from "react";

function Button(props: any) {
  return (
    <button
      onClick={props.handleClick}
      className={["Button", props.position, props.type, props.mobile].join(" ")}
    >
      <p className="--Text">{props.title}</p>
    </button>
  );
}

export default Button;