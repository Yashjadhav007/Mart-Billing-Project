import React, { useState } from "react";
import proData from "./ProductData.json";
import Header from "./Header";
import CustomerDetail from "./CustomerDetail";

const Product = () => {
  const [prodData] = useState(proData);
  const [newProData, setNewProData] = useState([]);
  const [qtyList, setQtyList] = useState([1, 1, 1]);
  const [totals, setTotals] = useState({
    totalQty: 0,
    totalMRP: 0,
    totalSale: 0,
    totalBill: 0,
  });

  const ADD = (index) => {
    const total = prodData[index].Price * qtyList[index]; //for total calculation of each index

    setNewProData((prevProData) => [
      //to add new data into prev data
      ...prevProData,
      { ...prodData[index], total },
    ]);
    // console.log(newProData)
    updateTotals(total, prodData[index].Price, prodData[index].sale); // used calculating totals
  };

  const handleAddQty = (index) => {
    const newQtyList = [...qtyList];
    // console.log(newQtyList)
    newQtyList[index] = newQtyList[index] + 1;
    setQtyList(newQtyList);
    updateTotal(index, newQtyList[index], prodData[index].sale);
    // console.log(updateTotal)
  };

  const handleSubQty = (index) => {
    if (qtyList[index] > 1) {
      const newQtyList = [...qtyList];
      newQtyList[index] -= 1;
      setQtyList(newQtyList);
      updateTotal(index, newQtyList[index], prodData[index].sale);
    } else {
      alert("Please Add Quantity");
    }
  };

  const updateTotal = (index, newQty, sale) => {
    const newProDataCopy = [...newProData];
    newProDataCopy[index].total = prodData[index].Price * newQty;
    setNewProData(newProDataCopy);
    updateTotals(
      newProDataCopy[index].total - prodData[index].Price * (newQty - 1),
      prodData[index].Price,
      sale
    );
  };

  const updateTotals = (total, mrp, sale) => {
    setTotals((prevTotals) => ({
      totalQty: prevTotals.totalQty + 1,
      totalMRP: prevTotals.totalMRP + mrp,
      totalSale: prevTotals.totalSale + sale,
      totalDiscount: 0,
      totalBill: prevTotals.totalBill + total,
    }));
  };

  const getCurrentDate = () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString(); // You can customize the date format as needed
    return formattedDate;
  };

  return (
    <>
      <div className="col-8">
        <div className="mt-3">
          <select
            id="ooo"
            onChange={(e) => ADD(e.target.value)}
            className="form-select form-select-lg mb-3"
            aria-label="Large select example"
          >
            <option selected>search product by name</option>
            {prodData.map((item, index) => (
              <option value={index}>{item.name}</option>
            ))}
          </select>

          {/* <select name="" id="" onChange={}>
            <option value="1" >sakha</option>
            <option value="2">shas</option>
          </select> */}
        </div>

        <div>
          <table border="1">
            <thead>
              <tr>
                <th className="ps-4 pe-4">No.</th>
                <th className="ps-4 pe-4">Item Name</th>
                <th className="ps-4 pe-4">Qty</th>
                <th className="ps-4 pe-4">MRP</th>
                <th className="ps-4 pe-4">Sale Price</th>
                <th className="ps-4 pe-4">Total</th>
                <th className="ps-4 pe-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {newProData.map((data, index) => (
                <tr>
                  <td className="ps-4 pe-4">{Number(index) + 1}</td>
                  <td className="ps-4 pe-4">{data.name}</td>
                  <td className="ps-4 pe-4">
                    <button onClick={() => handleAddQty(index)}>+</button>
                    {qtyList[index]}
                    <button onClick={() => handleSubQty(index)}>-</button>
                  </td>
                  <td className="ps-3 pe-3">{data.Price}</td>
                  <td className="ps-4 pe-4">{data.sale}</td>

                  <td className="ps-4 pe-4">{data.total}</td>
                  <td className="ps-4 pe-4">
                    <button className="bg-danger">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="billPrint ">
            <div className="row ">
              <div className="col-6 billPrint_1 mt-4">
                <h3 className="text-center">Sai Mart</h3>
                <h6 className="text-center">
                  Vanve Lawns, old kacheri, baramati - 413102
                </h6>
                <h5 className="text-center">Mob No: 9999999999</h5>
                <hr />
                <div className="row">
                  <div className="col-6">
                    {" "}
                    <span> Bill No: 101</span>{" "}
                  </div>
                  <div className="col-6">
                    <span> Date: {getCurrentDate()}</span>
                  </div>
                </div>
                <div className="DispBillTable">
                  <table border="1">
                    <thead>
                      <tr className="text-center">
                        <th className="ps-4">Sr No.</th>
                        <th className="ps-4">Product Name</th>
                        <th className="ps-4">Qty</th>
                        <th className="ps-4">Rate</th>
                        <th className="ps-4">Sale</th>
                        <th>Total</th>
                      </tr>
                    </thead>

                    <tbody>
                      {newProData.map((data, index) => (
                        <tr>
                          <td className="ps-4 pe-4">{Number(index) + 1}</td>
                          <td className="ps-4 pe-4">{data.name}</td>
                          <td className="ps-4 pe-4">{qtyList[index]}</td>
                          <td className="ps-3 pe-3">{data.Price}</td>
                          <td className="ps-4 pe-4">{data.sale}</td>
                          <td className="ps-4 pe-4">{data.total}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <hr />
                <span className="tbillQty">
                  Total Qty: {totals.totalQty}
                </span>{" "}
                <span className="tbill_bill">
                  Total Bill: {totals.totalBill}
                </span>
                <hr />
                <span className="savedMoney">
                  Saved Money: {totals.totalMRP - totals.totalSale}
                </span>
                <h6 className="bill_thanku">Thank You Visit Again</h6>
                <hr />
                <div>
                <button type="button" class="btn btn-primary BillPrintButton">Print</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CustomerDetail totals={totals} />
      <Header totals={totals} />
    </>
  );
};

export default Product;
