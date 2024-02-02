// Header.js

import React from "react";

const Header = (props) => {
  return (
    <div>
      <div className="footDisp row">
        <div className="col-3 pt-3 pb-3 text-light  bg-primary">
          Total Qty: <span className="footFont">{props.totals.totalQty}</span> 
        </div>
        <div className="col-3 pt-3 pb-3 text-light bg-warning">
          Total MRP: <span className="footFont">{props.totals.totalMRP}</span> 
        </div>
        <div className="col-3 pt-3 pb-3 text-light bg-info">
          Total Discount: <span className="footFont">{props.totals.totalMRP-props.totals.totalSale}</span>
        </div>
        <div className="col-3 pt-3 pb-3 text-light bg-danger">
          Total Bill: <span className="footFont">{props.totals.totalBill}</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
