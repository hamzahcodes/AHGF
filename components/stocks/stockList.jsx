import React from "react";

const StockList = ({ stockData }) => {
  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    marginBottom: "20px",
  };

  const tableHeaderStyle = {
    color: "white",
    padding: "12px",
    textAlign: "left",
  };

  const tableCellStyle = {
    borderBottom: "1px solid #ddd",
    padding: "12px",
  };
  return (
    <div>
      {stockData?.map((data, key) => (
        <>
          <div
            className="w-[90%] mx-auto my-4 flex justify-center items-center"
            key={key}
          >
            <table style={tableStyle} className="w-full">
              <thead>
                <tr>
                  <th style={tableHeaderStyle} className="bg-secondary">
                    Name: {data.supplierName}
                  </th>
                  <th style={tableHeaderStyle} className="bg-secondary">
                    Quantity
                  </th>
                  <th style={tableHeaderStyle} className="bg-secondary">
                    Price
                  </th>
                </tr>
              </thead>

              <tbody className="py-8">
                {data.stockDetails.length > 0 &&
                  data.stockDetails.map((data1, key) => (
                    <tr>
                      <td style={tableCellStyle}>
                        {data1.name ? data1.name : "stock"}
                      </td>
                      <td style={tableCellStyle}>
                        {data1.quantity ? data1.quantity : "8"} units
                      </td>
                      <td style={tableCellStyle}>
                        ₹{data1.price ? data1.price : "900"}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </>
      ))}
    </div>
  );
};

export default StockList;
