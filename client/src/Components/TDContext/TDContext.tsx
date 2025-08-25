import { useState, createContext, useRef} from "react";
import React from "react";

const TDContext = createContext<any>(0);

//provides 3d context globaly
function TDProvider(props: any) {
    const elementRef = useRef<HTMLDivElement>(null);

  const rotateElement = (e: React.MouseEvent<HTMLDivElement>, ref: React.RefObject<HTMLDivElement>) => {
    // get mouse position
    const x = e.clientX;
    const y = e.clientY;
    // console.log(x, y)
  
    // find the middle
    const middleX = window.innerWidth / 2;
    const middleY = window.innerHeight / 2;
    // console.log(middleX, middleY)
  
    // get offset from middle as a percentage
    // and tone it down a little
    const offsetX = ((x - middleX) / middleX) * 45;
    const offsetY = ((y - middleY) / middleY) * 45;
    // console.log(offsetX, offsetY);
  
    // set rotation
    ref.current?.style.setProperty("--rotateX", offsetX + "deg");
    ref.current?.style.setProperty("--rotateY", -1 * offsetY + "deg");
  };
  
  //export 3d value for global usage
  const value = {
    elementRef,
    rotateElement,
  };
  return (
    <TDContext.Provider value={value}>{props.children}</TDContext.Provider>
  );
}

export { TDContext, TDProvider };
