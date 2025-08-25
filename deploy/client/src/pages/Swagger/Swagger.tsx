import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Swagger.scss";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import swagger from "./swagger.json"
import { host } from "../../config/host";

export default function Swagger() {
  useEffect(() => {
    axios
      .get("http://" + host + "/api-docs")
        .then((res) => {
            
        })
  }, [])

  return(    
  <div className="Swagger">
    <SwaggerUI spec={swagger} />
  </div>
    
  )
}