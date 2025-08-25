import React from "react";

interface TicketProp {
  date?: string | null;
  month?: string | null;
  time?: string | null;
  code?: string | null;
}

export const ComponentToPrint = React.forwardRef<HTMLInputElement>(({date, month, time, code} : TicketProp, ref) : JSX.Element => {
  return (
    <div ref={ref} className="booking-ticket">
      <img src="/UI/ticket-layout.png" alt="" />
      <img id="ticket-img" src="/UI/statue-halftone.png" alt="" />
      <div className="ticket-component">
        <div className="head-component">
          <div className="booking-ticket-info">
            <p className="--Text">{date}</p>
            <p className="--Text">Entry</p>
          </div>
          <div className="-line"></div>
          <div className="booking-ticket-info">
            <p className="--Text">{month}</p>
            <p className="--Text">{time}</p>
          </div>
        </div>
        <div className="bottom-component">
          <div className="cir-ticket">
            <div className="cir"></div>
            <p className="--Text">TICKET</p>
          </div>
          <p id="-detail">concept design of the Rijksmuseum website</p>
          <p id="-barcode">{code}</p>
        </div>
      </div>
    </div>
  );
});