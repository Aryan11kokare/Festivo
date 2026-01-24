import Ticket from "../models/ticket.js";
import Event from "../models/event.js";
import PDFDocument from "pdfkit";
import crypto from "crypto";
import fs from "fs";
import QRCode from "qrcode";

const convertTicketTOPDF = async (ticket) => {
  const eventDate = new Date(ticket.eventId.date);
  const doc = new PDFDocument({ size: "A4", margin: 0 });
  const outputPath = crypto.randomBytes(32).toString("hex") + ".pdf";
  const stream = fs.createWriteStream("uploads/" + outputPath);

  doc.pipe(stream);

  /* ================= BACKGROUND ================= */
  doc.rect(0, 0, 595, 842).fill("#f8fafc");

  /* ================= TICKET CARD ================= */
  doc.roundedRect(40, 40, 515, 760, 20).fill("#ffffff").stroke("#0f766e");

  /* ================= HEADER ================= */
  doc.rect(40, 40, 515, 120).fill("#0f766e");

  doc
    .fillColor("#ffffff")
    .font("Helvetica-Bold")
    .fontSize(26)
    .text(ticket.eventId.title, 60, 65);

  doc
    .fontSize(14)
    .font("Helvetica")
    .text(ticket.eventId.category || "Live Event", 60, 100);

  /* ================= PRICE TAG ================= */
  doc.roundedRect(420, 70, 100, 35, 10).fill("#ffffff");

  doc
    .fillColor("#0f766e")
    .font("Helvetica-Bold")
    .fontSize(14)
    .text(`${ticket.eventId.price}`, 420, 80, {
      width: 100,
      align: "center",
    });

  /* ================= EVENT INFO ================= */
  doc.fillColor("#000");
  doc.fontSize(14).font("Helvetica");

  doc.text("Date", 60, 190);
  doc.font("Helvetica-Bold").text(
    eventDate.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }) || "TBA",
    60,
    210,
  );

  doc.font("Helvetica").text("Time", 300, 190);
  doc.font("Helvetica-Bold").text(
    eventDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    }) || "TBA",
    300,
    210,
  );

  /* ================= DIVIDER ================= */
  doc.moveTo(60, 250).lineTo(535, 250).lineWidth(1).stroke("#e5e7eb");

  /* ================= TICKET DETAILS ================= */
  doc.fontSize(14).font("Helvetica");

  doc.text("Ticket ID", 60, 280);
  doc.font("Helvetica-Bold").text(ticket._id, 60, 300);

  doc.font("Helvetica").text("Tickets", 60, 340);
  doc.font("Helvetica-Bold").text(ticket.numberOfTickets, 60, 360);

  doc.font("Helvetica").text("Total Amount", 60, 400);
  doc.font("Helvetica-Bold").text(`${ticket.totalAmount}`, 60, 420);

  /* ================= VENUE ================= */
  doc.font("Helvetica").text("Venue", 60, 470);
  doc.font("Helvetica-Bold").text(
    `${ticket.eventId.location.address}
${ticket.eventId.location.city}, ${ticket.eventId.location.state}
${ticket.eventId.location.country}`,
    60,
    490,
  );

  /* ================= QR CODE ================= */
  const qrData = `
Event: ${ticket.eventId.title}
Ticket ID: ${ticket._id}
Tickets: ${ticket.numberOfTickets}
Amount: ${ticket.totalAmount}
`;

  const qrImage = await QRCode.toDataURL(qrData);

  doc.roundedRect(380, 300, 140, 180, 15).fill("#f1f5f9");

  doc
    .fillColor("#0f766e")
    .font("Helvetica-Bold")
    .fontSize(12)
    .text("SCAN AT ENTRY", 380, 315, {
      width: 140,
      align: "center",
    });

  doc.image(qrImage, 395, 340, {
    width: 110,
    height: 110,
  });

  /* ================= FOOTER ================= */
  doc
    .fontSize(10)
    .fillColor("#6b7280")
    .text(
      "This ticket is valid for one-time entry only. Please keep it safe.",
      40,
      780,
      { align: "center", width: 515 },
    );

  doc.end();
  return outputPath;
};

export const createTicket = async (req, res) => {
  try {
    const user = req.user;
    const { eventId, numberOfTickets, totalAmount } = req.body;
    const event = await Event.findById(eventId);
    event.sellTickets = event.sellTickets + numberOfTickets;

    const newTicket = new Ticket({
      numberOfTickets: numberOfTickets,
      eventId: eventId,
      totalAmount: totalAmount,
      owner: user._id,
    });
    await event.save();
    await newTicket.save();
    res.status(200).json("Ticket Genrated Successfully");
  } catch (e) {
    console.log(e);
  }
};

export const getAllTickets = async (req, res) => {
  try {
    const user = req.user;
    const allTickets = await Ticket.find({ owner: user._id }).populate(
      "eventId",
      "title , location , price , date , media",
    );
    res.status(200).json(allTickets);
  } catch (e) {
    console.log(e);
  }
};

export const downloadTicket = async (req, res) => {
  try {
    const ticketId = req.query.id;
    const ticket = await Ticket.findById(ticketId).populate(
      "eventId",
      "title , location , price , date",
    );
    let outputPath = await convertTicketTOPDF(ticket);
    return res.status(200).json({ message: outputPath });
  } catch (e) {
    console.log(e.message);
  }
};
