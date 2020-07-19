const PDFDocument = require('pdfkit');
const Moment = require('moment');
const User = require('../models/user');

function generateHeader(doc){
    //generate Header with company data
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

function generatePayInfo(doc, user, mntPay) {
    // generate part with user information for payment
    const address = user.address;
    let total = calcTotal(mntPay.items);

    doc
        .fillColor("#444444")
        .fontSize(20)
        .text("Invoice", 50, 160);

    generateHr(doc, 185);

    doc
        .fontSize(10)
        .text(`Invoice Number: ${mntPay._id}`, 50, 200)
        .text(`Invoice Date: ${Moment(new Date(mntPay.month)).format('LL')}`, 50, 215)
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

function calcTotal(mntPayItems){
    let total = 0;
    for(let i = 0; i < mntPayItems.length; i++){
        total += Number.parseFloat(mntPayItems[i].price);
    }
    return total;
}

function generateInvoiceTable(doc, user, mntPay) {
    // declare i here for subtotal position
    let i,
        invoiceTableTop = 330;
    let total = calcTotal(mntPay.items);

    doc.font("Helvetica-Bold");

    generateTableRow(
        doc,
        invoiceTableTop,
        "Name",
        "Price",
    );

    generateHr(doc, invoiceTableTop + 20);
    doc.font("Helvetica");

    // adding new row for each element in payment
    for (i = 0; i < mntPay.items.length; i++) {
        const mntPayItem = mntPay.items[i];
        const position = invoiceTableTop + (i + 1) * 30;
        generateTableRow(
            doc,
            position,
            mntPayItem.name,
        `${mntPayItem.price} €`
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
// horizontal line for better visualization
function generateHr(doc, y) {
    doc
        .strokeColor("#aaaaaa")
        .lineWidth(1)
        .moveTo(50, y)
        .lineTo(550, y)
        .stroke();
}

//iterating through monthly_pay of user to get the month specified in request
function getPayByMonth(user, monthYear){
    for (let i = 0; i < user.monthly_pay.length; i++){
        let userMntPay = user.monthly_pay[i].month;
        if(monthYear.getMonth() === userMntPay.getMonth() && monthYear.getFullYear() === userMntPay.getFullYear()){
            return user.monthly_pay[i]
        }
    }
    return null;
}


function createInvoice(req, res) {
    let doc = new PDFDocument({ margin: 50 });
    let monthYear = new Date();
    monthYear.setMonth(req.params.month - 1);
    monthYear.setFullYear(req.params.year);
    User.findById(req.params.id)
        .populate('address')
        .then((user) => {
            let userMntPay = getPayByMonth(user, monthYear);
            generateHeader(doc);
            generatePayInfo(doc, user, userMntPay);
            generateInvoiceTable(doc, user, userMntPay);
            generateFooter(doc);
            doc.pipe(res); // sending the document in the response
            doc.end();
    })
}

module.exports = {
    createInvoice
}