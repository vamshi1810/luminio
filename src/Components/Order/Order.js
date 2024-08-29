import React, { useEffect, useState } from "react";
import "../Order/Order.css";
import jsPDF from "jspdf";

const Order = () => {
  const [items, setItems] = useState([]);
  const [selectedAddressInfo, setSelectedAddress] = useState();

  useEffect(() => {
    const savedItems = localStorage.getItem("orderItems");
    if (savedItems) {
      setItems(JSON.parse(savedItems));
      const selectedAddressesDetails = JSON.parse(
        localStorage.getItem("selected-address")
      );
      setSelectedAddress(selectedAddressesDetails);
    }
  }, []);

  const viewBill = (info) => {
    console.log(info);
    let date = new Date();
    let formattedDate = date.toLocaleDateString("en-GB").split("/").join("-");

    const doc = new jsPDF();
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    const billText = "bill to";

    doc.text(billText.toUpperCase(), 10, 20);
    doc.text(selectedAddressInfo.name, 10, 26);
    doc.setFont("helvetica", "normal");

    doc.text(
      selectedAddressInfo.houseNo + " " + selectedAddressInfo.area,
      10,
      32
    );
    doc.text("Telangana" + " " + selectedAddressInfo.pinCode, 10, 38);
    doc.text(selectedAddressInfo.contact, 10, 44);
    doc.text("Place of Supply : 36 Telangana", 10, 50);

    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("Tax Invoice.", 200, 30, "right");
    doc.text("Original For Recipient.", 200, 36, "right");
    doc.setFont("helvetica", "normal");

    doc.text("Order Number", 85, 65);
    doc.setFont("helvetica", "bold");

    doc.text(info.orderNumber, 85, 71);
    doc.setFont("helvetica", "normal");
    doc.text("Invoice Number", 200, 65, "right");
    doc.setFont("helvetica", "bold");
    doc.text(info.invoiceNumber, 200, 71, "right");

    doc.setFontSize(10);

    doc.setFont("helvetica", "bold");

    doc.text("ship to", 10, 86);
    doc.text(selectedAddressInfo.name, 10, 92);
    doc.setFont("helvetica", "normal");

    doc.text(
      selectedAddressInfo.houseNo + " " + selectedAddressInfo.area,
      10,
      98
    );
    doc.text(selectedAddressInfo.contact, 10, 104);
    doc.text("Telangana" + " " + selectedAddressInfo.pinCode, 10, 110);

    doc.setFont("helvetica", "normal");
    doc.text("Order Date", 105, 86, "right");
    doc.setFont("helvetica", "bold");
    doc.text(info.formattedDate, 115, 92, "right");
    doc.setFont("helvetica", "normal");
    doc.text("Invoice Date", 200, 86, "right");
    doc.setFont("helvetica", "bold");
    doc.text(info.formattedDate, 200, 92, "right");

    doc.setFont("helvetica", "bold");
    doc.rect(10, 136, 15, 10);
    doc.text("S.No", 13, 142);

    doc.rect(25, 136, 50, 10);

    doc.text("Description", 28, 142);

    doc.rect(75, 136, 25, 10);
    doc.text("HSN", 78, 142);

    doc.rect(100, 136, 15, 10);
    doc.text("Qty", 103, 142);

    doc.rect(115, 136, 25, 10);
    doc.text("Gs Amt", 118, 142);

    doc.rect(140, 136, 30, 10);
    doc.text("Dis", 143, 142);

    doc.rect(170, 136, 35, 10);
    doc.text("Total", 183, 142);

    doc.setFont("helvetica", "normal");
    doc.rect(10, 146, 15, 10);
    doc.text("1", 13, 152);

    doc.rect(25, 146, 50, 10);
    const title = info.title.length>=25?`${info.title.substring(0, 25)+".."}`:info.title;

    doc.text(title, 28, 152);

    doc.rect(75, 146, 25, 10);
    doc.text(info.randomHSN, 78, 152);

    doc.rect(100, 146, 15, 10);
    doc.text("1", 103, 152);

    doc.rect(115, 146, 25, 10);
    doc.text(info.price.toString(), 118, 152);

    doc.rect(140, 146, 30, 10);
    doc.text(info.discountAmount.toString(), 143, 152);

    doc.rect(170, 146, 35, 10);

    // doc.rect(155, 146, 25, 10);

    doc.text(info.finalPrice.toFixed(2).toString(), 183, 152);

    doc.setFont("helvetica", "normal");
    doc.rect(10, 156, 15, 10);
    doc.text("2", 13, 162);

    doc.rect(25, 156, 50, 10);

    doc.text("OTHER CHARGES", 28, 162);

    doc.rect(75, 156, 25, 10);
    doc.text(info.randomHSN, 78, 162);

    doc.rect(100, 156, 15, 10);
    doc.text("NA", 103, 162);

    doc.rect(115, 156, 25, 10);
    doc.text(info.otherCharges.toString(), 125, 162);

    doc.rect(140, 156, 30, 10);
    doc.text("0", 143, 162);

    doc.rect(170, 156, 35, 10);
    doc.text(info.otherCharges.toString(), 183, 162);

    doc.rect(10, 166, 160, 10);
    doc.text("Total", 13, 172);

    doc.rect(170, 166, 35, 10);
    doc.text(info.totalPrice.toString(), 173, 173);

    doc.setFont("helvetica", "bold");

    doc.text("Terms & Conditions:", 10, 193);
    doc.setFont("helvetica", "normal");
    doc.text("Tax is not payable on reverse charge basis", 10, 199);
    doc.text(
      "This is a computer generated invoice and does not require signature",
      10,
      205
    );
    doc.text(
      "Other charges are charges that are applicable to your order and include charges for logistics fee (where applicable)",
      10,
      211
    );
    doc.text(
      "Includes discounts for your city, limited returns and/or for online payments (as applicable)",
      10,
      217
    );

    doc.save(`${info.orderNumber} ${formattedDate}.pdf`);
  };

  return (
    <>
      {items.length > 0 ? (
        <div className="cart-main-container">
          <div className="cart-left-side-container">
            <h6 className="cart-title">Product Details</h6>
            {items.map((item) => (
              <div className="cart-container" key={item.id}>
                <div className="cart-img-container">
                  <img
                    src={require(`../../${item.img}`)}
                    className="cart-img"
                    alt="product"
                  />
                  <div className="left-side-cart-content">
                    <div className="cart-img-title">{item.title}</div>
                    <div className="cart-img-title">Size: {item.size}</div>
                    <div className="cart-item-delete-container">
                      <button
                        className="off-btn"
                        onClick={() => viewBill(item)}
                      >
                        View Bill
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>Loading</div>
      )}
    </>
  );
};

export default Order;
