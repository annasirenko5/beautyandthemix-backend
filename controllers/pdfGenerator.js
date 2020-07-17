const fs = require('fs');
const PDFDocument = require('pdfkit');
const Moment = require('moment');

function generateHeader(doc){
    doc
        .image("logo.png", 50, 45, { width: 50 })
        .fillColor("#444444")
        .fontSize(20)
        .text("Beauty&TheMix", 110, 57)
        .fontSize(10)
        .text("Leopoldstr. 25", 200, 65, { align: "right" })
        .text("81245 Munich", 200, 80, { align: "right" })
        .text("Germany", 200, 95, { align: "right" })
        .moveDown();
}

function generateFooter(doc) {
    doc
        .fontSize(10)
        .text(
            "Payment is due within 15 days. Thank you for your business.",
            50,
            730,
            { align: "center", width: 500 }
        );
}

function generatePayInfo(doc, user) {
    const address = user.address;
    let total = calcTotal(user.monthly_pay);

    doc
        .fillColor("#444444")
        .fontSize(20)
        .text("Invoice", 50, 160);

    generateHr(doc, 185);

    doc
        .fontSize(10)
        .text(`Invoice Number: 1`, 50, 200)
        .text(`Invoice Date: ${Moment(new Date()).format('LL')}`, 50, 215)
        .text(`Total: ${total} €`, 50, 230)

        .text(`${user.firstName}, ${user.lastName}`, 320, 200)
        .text(`${address.street}, ${address.streetnumber}`, 320, 215)
        .text(`${address.city}, ${address.zipcode}, ${address.country}`, 320, 230)
        .moveDown();

    generateHr(doc, 252);
}

function generateTableRow(doc, y, c1, c2) {
    doc
        .fontSize(10)
        .text(c1, 50, y)
        .text(c2, 50, y, { align: "right" });
}

function calcTotal(mntPay){
    let total = 0;
    for(let i = 0; i < mntPay.length; i++){
        total += Number.parseFloat(mntPay[i].price);
    }
    return total;
}

function generateInvoiceTable(doc, user) {
    let i,
        invoiceTableTop = 330;
    let total = calcTotal(user.monthly_pay);

    doc.font("Helvetica-Bold");

    generateTableRow(
        doc,
        invoiceTableTop,
        "Name",
        "Price",
    );

    generateHr(doc, invoiceTableTop + 20);
    doc.font("Helvetica");

    for (i = 0; i < user.monthly_pay.length; i++) {
        const mntPay = user.monthly_pay [i];
        const position = invoiceTableTop + (i + 1) * 30;
        generateTableRow(
            doc,
            position,
            mntPay.name,
        `${mntPay.price} €`
    );
    generateHr(doc, position + 20);
}

    const subtotalPosition = invoiceTableTop + (i + 1) * 30;
    doc.font("Helvetica-Bold");
    generateTableRow(
        doc,
        subtotalPosition,
        "Subtotal",
        `${total} €`
    );

}

function generateHr(doc, y) {
    doc
        .strokeColor("#aaaaaa")
        .lineWidth(1)
        .moveTo(50, y)
        .lineTo(550, y)
        .stroke();
}

function createInvoice(req, res) {
    let doc = new PDFDocument({ margin: 50 });
    let user = req.body;

    generateHeader(doc);
    generatePayInfo(doc, user);
    generateInvoiceTable(doc, user);
    generateFooter(doc);

    doc.pipe(res);
    doc.end();
}

module.exports ={
    createInvoice,
}