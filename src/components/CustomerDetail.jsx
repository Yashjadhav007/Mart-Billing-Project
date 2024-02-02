import React, { useState } from 'react';
import custData from './CustomerData.json';

const CustomerDetail = (props) => {
    const [customerData, setCustomerData] = useState(custData);
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    const handleSelectChange = (selectedIndex) => {
        setSelectedCustomer(customerData[selectedIndex]);
    };

    const getCurrentDate = () => {
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString(); // You can customize the date format as needed
        return formattedDate;
    };

    return (
        <div className="col-4">
            <div className="mt-3 ms-4">
                <div className="CutomerDetails p-3">
                    <h4>Customer details</h4>

                    <select
                        onChange={(e) => handleSelectChange(e.target.value)}
                        className="form-select form-select-sm"
                        aria-label="Small select example"
                    >
                        <option selected>Customer Name</option>
                        {customerData.map((item, index) => (
                            <option key={index} value={index}>
                                {item.name}
                            </option>
                        ))}
                    </select>

                    <div className="custDetails_1 mt-3">
                        <h6>Customer Name: {selectedCustomer?.name}</h6>
                        <h6>Customer Mobile: {selectedCustomer?.mob}</h6>
                        <h6>Customer Address: {selectedCustomer?.address}</h6>
                    </div>

                    <div className="custDate mt-4">
                        <h6>
                            Bill Date <br />
                            <input type="text" name="" id="" value={getCurrentDate()} readOnly />
                        </h6>
                    </div>
                </div>

                <div className="PaymentDetails p-3 mt-3 mb-2">
                    <h4>Payment details</h4>

                    <select
                        className="form-select form-select-sm"
                        aria-label="Small select example"
                    >
                        <option selected>Cash</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>

                    <span className="ms-2"></span>
                    <span className="remainAmnt">Remaining amnt:</span>
                </div>

                <div className="PaymentDetails p-3 mt-3 mb-2">
                    <h4>Bill details</h4>
                    <div className="billDetail pt-2 pb-2 ps-2">
                        <span className="text-light totalAmns">Total amount:</span>
                        <span className="text-light amnt">{props.totals.totalBill}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerDetail;
