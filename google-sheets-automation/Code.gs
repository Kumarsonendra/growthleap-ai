/**
 * GrowthLeap AI - Instant Lead Capture & Notification Script
 * -------------------------------------------------------------
 * This script runs inside Google Sheets as a Web App.
 * Every time a visitor on your website submits an Audit, Books a Strategy Call,
 * sends a Contact Message, or chats with the AI, this script:
 * 1. Appends a structured row to your Google Sheet.
 * 2. Sends an instant notification email to your Gmail with a 1-click WhatsApp/Call button.
 *
 * HOW TO INSTALL:
 * 1. Create a new Google Sheet (e.g. named "GrowthLeap AI - Client Leads").
 * 2. In Row 1, add these exact column headers:
 *    A: Timestamp (IST)
 *    B: Reference ID
 *    C: Client Name
 *    D: Email
 *    E: Mobile Number
 *    F: Company
 *    G: Service / Inquiry
 *    H: Lead Source
 *    I: Audit Score
 *    J: Operational Bottleneck
 * 3. In the top menu, go to: Extensions > Apps Script.
 * 4. Replace everything in Code.gs with this script.
 * 5. Update YOUR_NOTIFICATION_EMAIL below with your Gmail address.
 * 6. Click Deploy > New deployment > Select type "Web app":
 *    - Description: "GrowthLeap Lead Webhook"
 *    - Execute as: "Me"
 *    - Who has access: "Anyone"
 * 7. Click "Deploy", copy the Web App URL, and paste it into your .env file as:
 *    GOOGLE_SHEETS_WEBHOOK_URL="https://script.google.com/macros/s/.../exec"
 */

// >>> CONFIGURE YOUR NOTIFICATION EMAIL HERE <<<
const NOTIFICATION_EMAIL = "sonendrakumar@gmail.com"; // Change to your primary Gmail

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);

    const istTimestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    const referenceId = data.referenceId || "GLA-" + Date.now().toString(36).toUpperCase();
    const clientName = data.name || "Website Lead";
    const email = data.email || "Not Provided";
    const phone = data.phone || "Not Provided";
    const company = data.company || "Not Specified";
    const inquiry = data.inquiry || "General Business Inquiry";
    const source = data.source || "website";
    const auditScore = data.auditScore || "-";
    const bottleneck = data.bottleneck || "-";

    // 1. Append record to Google Sheet
    sheet.appendRow([
      istTimestamp,
      referenceId,
      clientName,
      email,
      phone,
      company,
      inquiry,
      source,
      auditScore,
      bottleneck
    ]);

    // 2. Format row style
    const lastRow = sheet.getLastRow();
    sheet.getRange(lastRow, 1, 1, 10).setFontFamily("Inter");

    // 3. Send instant email notification to founder
    if (NOTIFICATION_EMAIL && NOTIFICATION_EMAIL.indexOf("@") !== -1) {
      const cleanPhone = phone.replace(/[^0-9]/g, "");
      const whatsappLink = cleanPhone ? "https://wa.me/" + (cleanPhone.length === 10 ? "91" + cleanPhone : cleanPhone) : "";

      const emailSubject = "🔥 New GrowthLeap Lead: " + clientName + " (" + (company || "Business Owner") + ")";
      
      const emailBody = [
        "GrowthLeap AI - Inbound Lead Alert",
        "=======================================",
        "A prospective client has taken action on growthleapai.com!",
        "",
        "Lead Details:",
        "• Name: " + clientName,
        "• Company: " + company,
        "• Phone / WhatsApp: " + phone,
        "• Email: " + email,
        "• Lead Source: " + source.toUpperCase(),
        "• Inquiry / Request: " + inquiry,
        (auditScore !== "-" ? "• AI Efficiency Score: " + auditScore + "/100" : ""),
        (bottleneck !== "-" ? "• Key Operational Bottleneck: " + bottleneck : ""),
        "",
        "Instant Actions:",
        whatsappLink ? "• Chat on WhatsApp: " + whatsappLink : "",
        "• Direct Call: tel:" + phone,
        "",
        "Time (IST): " + istTimestamp,
        "Reference ID: " + referenceId,
        "======================================="
      ].filter(Boolean).join("\n");

      MailApp.sendEmail({
        to: NOTIFICATION_EMAIL,
        subject: emailSubject,
        body: emailBody
      });
    }

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      referenceId: referenceId,
      message: "Lead recorded and notification dispatched successfully"
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
