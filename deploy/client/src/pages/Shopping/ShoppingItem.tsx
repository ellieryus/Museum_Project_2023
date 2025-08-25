import "./Shopping.scss";
import React from "react";

function ShoppingItem(props: any) {
  return (
    <div
      className={`item ${props.inAnimate}`}
      key={props.id}
      onClick={props.handleClick}
    >
      <img src={`http://20.169.254.228/inventory/${props.GID}.png`} />
      <div className="item-info">
        <div className="-line"></div>
        <p className="--header">{props.name}</p>
        <p className="--SmallText">{"€" + props.price}</p>
      </div>
      <div className="item-overlay">
        <i className="material-symbols-outlined" style={{ color: "white" }}>
          shopping_cart
        </i>
      </div>
    </div>
  );
}
export default ShoppingItem;
