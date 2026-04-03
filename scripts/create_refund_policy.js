const { Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell, VerticalAlign, BorderStyle, AlignmentType, convertInchesToTwip } = require('docx');
const fs = require('fs');
const path = require('path');

// Create the document
const doc = new Document({
  sections: [
    {
      properties: {
        page: {
          margins: {
            top: convertInchesToTwip(1),
            right: convertInchesToTwip(1),
            bottom: convertInchesToTwip(1),
            left: convertInchesToTwip(1),
          },
        },
      },
      headers: {
        default: new Paragraph({
          text: "EzoraAI — Refund & Cancellation Policy",
          alignment: AlignmentType.CENTER,
          style: "Header",
          border: {
            bottom: {
              color: "000000",
              space: 1,
              style: BorderStyle.SINGLE,
              size: 6,
            },
          },
        }),
      },
      footers: {
        default: new Paragraph({
          text: "Page",
          alignment: AlignmentType.CENTER,
          style: "Footer",
        }),
      },
      children: [
        // Draft notice
        new Paragraph({
          text: "DRAFT — FOR LEGAL REVIEW",
          bold: true,
          alignment: AlignmentType.CENTER,
          spacing: { after: 400 },
          run: new TextRun({ fontFamily: "Arial", size: 24 }),
        }),

        // Title
        new Paragraph({
          text: "Refund & Cancellation Policy",
          bold: true,
          alignment: AlignmentType.CENTER,
          spacing: { after: 100, line: 400 },
          run: new TextRun({ fontFamily: "Arial", size: 32 }),
        }),

        new Paragraph({
          text: "Effective: March 29, 2026",
          alignment: AlignmentType.CENTER,
          spacing: { after: 400 },
          run: new TextRun({ fontFamily: "Arial", size: 24, italics: true }),
        }),

        // 1. Overview
        new Paragraph({
          text: "1. Overview",
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 200, after: 100 },
          bold: true,
          run: new TextRun({ fontFamily: "Arial", size: 28 }),
        }),

        new Paragraph({
          text: "This Refund & Cancellation Policy outlines the terms and conditions under which users, experts, and businesses may cancel sessions, request refunds, or dispute the quality of services provided on the EzoraAI platform. EzoraAI is a marketplace where users book one-on-one sessions with verified AI experts. All sessions are subject to the payment terms outlined below.",
          spacing: { after: 200, line: 360 },
          run: new TextRun({ fontFamily: "Arial", size: 24 }),
        }),

        new Paragraph({
          text: "Policy applies to:",
          spacing: { after: 100 },
          run: new TextRun({ fontFamily: "Arial", size: 24 }),
        }),

        new Paragraph({
          text: "Expert-led sessions (user-initiated bookings, $40–$100 per session)",
          spacing: { after: 50, before: 50 },
          indent: { left: 720 },
          run: new TextRun({ fontFamily: "Arial", size: 24 }),
        }),

        new Paragraph({
          text: "Premium membership subscriptions ($24.99/month)",
          spacing: { after: 50 },
          indent: { left: 720 },
          run: new TextRun({ fontFamily: "Arial", size: 24 }),
        }),

        new Paragraph({
          text: "Refund processing via Stripe",
          spacing: { after: 200 },
          indent: { left: 720 },
          run: new TextRun({ fontFamily: "Arial", size: 24 }),
        }),

        // 2. Session Cancellation by User
        new Paragraph({
          text: "2. Session Cancellation by User",
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 200, after: 100 },
          bold: true,
          run: new TextRun({ fontFamily: "Arial", size: 28 }),
        }),

        new Paragraph({
          text: "Users may cancel scheduled sessions with the following refund terms:",
          spacing: { after: 200, line: 360 },
          run: new TextRun({ fontFamily: "Arial", size: 24 }),
        }),

        // Cancellation table
        new Table({
          rows: [
            new TableRow({
              children: [
                new TableCell({
                  children: [new Paragraph({ text: "Cancellation Timing", bold: true, run: new TextRun({ fontFamily: "Arial", size: 24 }) })],
                  shading: { fill: "131D3B", color: "auto" },
                  verticalAlign: VerticalAlign.CENTER,
                }),
                new TableCell({
                  children: [new Paragraph({ text: "Refund to User", bold: true, run: new TextRun({ fontFamily: "Arial", size: 24 }) })],
                  shading: { fill: "131D3B", color: "auto" },
                  verticalAlign: VerticalAlign.CENTER,
                }),
                new TableCell({
                  children: [new Paragraph({ text: "Expert Payout", bold: true, run: new TextRun({ fontFamily: "Arial", size: 24 }) })],
                  shading: { fill: "131D3B", color: "auto" },
                  verticalAlign: VerticalAlign.CENTER,
                }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({
                  children: [new Paragraph({ text: "24+ hours before session", run: new TextRun({ fontFamily: "Arial", size: 24 }) })],
                  shading: { fill: "FFFFFF" },
                  verticalAlign: VerticalAlign.CENTER,
                }),
                new TableCell({
                  children: [new Paragraph({ text: "Full refund (100%)", run: new TextRun({ fontFamily: "Arial", size: 24, bold: true }) })],
                  shading: { fill: "FFFFFF" },
                  verticalAlign: VerticalAlign.CENTER,
                }),
                new TableCell({
                  children: [new Paragraph({ text: "No payout", run: new TextRun({ fontFamily: "Arial", size: 24 }) })],
                  shading: { fill: "FFFFFF" },
                  verticalAlign: VerticalAlign.CENTER,
                }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({
                  children: [new Paragraph({ text: "12–24 hours before session", run: new TextRun({ fontFamily: "Arial", size: 24 }) })],
                  shading: { fill: "F4F6FA" },
                  verticalAlign: VerticalAlign.CENTER,
                }),
                new TableCell({
                  children: [new Paragraph({ text: "50% refund (platform fee retained)", run: new TextRun({ fontFamily: "Arial", size: 24, bold: true }) })],
                  shading: { fill: "F4F6FA" },
                  verticalAlign: VerticalAlign.CENTER,
                }),
                new TableCell({
                  children: [new Paragraph({ text: "50% of session fee", run: new TextRun({ fontFamily: "Arial", size: 24 }) })],
                  shading: { fill: "F4F6FA" },
                  verticalAlign: VerticalAlign.CENTER,
                }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({
                  children: [new Paragraph({ text: "Under 12 hours / no-show", run: new TextRun({ fontFamily: "Arial", size: 24 }) })],
                  shading: { fill: "FFFFFF" },
                  verticalAlign: VerticalAlign.CENTER,
                }),
                new TableCell({
                  children: [new Paragraph({ text: "No refund (forfeited)", run: new TextRun({ fontFamily: "Arial", size: 24, bold: true }) })],
                  shading: { fill: "FFFFFF" },
                  verticalAlign: VerticalAlign.CENTER,
                }),
                new TableCell({
                  children: [new Paragraph({ text: "Full payout", run: new TextRun({ fontFamily: "Arial", size: 24 }) })],
                  shading: { fill: "FFFFFF" },
                  verticalAlign: VerticalAlign.CENTER,
                }),
              ],
            }),
          ],
          width: { size: 100, type: "auto" },
        }),

        new Paragraph({
          text: "Cancellation must be initiated through the EzoraAI platform dashboard. Refund eligibility is determined by the timestamp of the cancellation request, not the cancellation completion.",
          spacing: { before: 200, after: 200, line: 360 },
          run: new TextRun({ fontFamily: "Arial", size: 24, italics: true }),
        }),

        // 3. Session Cancellation by Expert
        new Paragraph({
          text: "3. Session Cancellation by Expert",
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 200, after: 100 },
          bold: true,
          run: new TextRun({ fontFamily: "Arial", size: 28 }),
        }),

        new Paragraph({
          text: "When an expert cancels a confirmed session, the user receives an automatic full refund, regardless of cancellation timing. EzoraAI recognizes that expert cancellations are disruptive to users and applies no refund penalties in these cases.",
          spacing: { after: 200, line: 360 },
          run: new TextRun({ fontFamily: "Arial", size: 24 }),
        }),

        new Paragraph({
          text: "Repeated Expert Cancellations",
          bold: true,
          spacing: { after: 100 },
          run: new TextRun({ fontFamily: "Arial", size: 24 }),
        }),

        new Paragraph({
          text: "If an expert cancels 3 or more sessions within a 30-day period, EzoraAI reserves the right to:",
          spacing: { after: 100 },
          run: new TextRun({ fontFamily: "Arial", size: 24 }),
        }),

        new Paragraph({
          text: "Conduct a review of the cancellation pattern",
          spacing: { after: 50, before: 50 },
          indent: { left: 720 },
          run: new TextRun({ fontFamily: "Arial", size: 24 }),
        }),

        new Paragraph({
          text: "Require the expert to provide written explanation",
          spacing: { after: 50 },
          indent: { left: 720 },
          run: new TextRun({ fontFamily: "Arial", size: 24 }),
        }),

        new Paragraph({
          text: "Temporarily restrict scheduling until compliance is demonstrated",
          spacing: { after: 50 },
          indent: { left: 720 },
          run: new TextRun({ fontFamily: "Arial", size: 24 }),
        }),

        new Paragraph({
          text: "Suspend the expert account for chronic violations",
          spacing: { after: 200 },
          indent: { left: 720 },
          run: new TextRun({ fontFamily: "Arial", size: 24 }),
        }),

        // 4. Session Quality Disputes
        new Paragraph({
          text: "4. Session Quality Disputes",
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 200, after: 100 },
          bold: true,
          run: new TextRun({ fontFamily: "Arial", size: 28 }),
        }),

        new Paragraph({
          text: "Dispute Filing Window",
          bold: true,
          spacing: { after: 100 },
          run: new TextRun({ fontFamily: "Arial", size: 24 }),
        }),

        new Paragraph({
          text: "Users may file a dispute regarding session quality, content delivery, or expert conduct within 48 hours of session completion. Disputes filed outside this window will not be reviewed.",
          spacing: { after: 200, line: 360 },
          run: new TextRun({ fontFamily: "Arial", size: 24 }),
        }),

        new Paragraph({
          text: "EzoraAI Mediation Process",
          bold: true,
          spacing: { after: 100 },
          run: new TextRun({ fontFamily: "Arial", size: 24 }),
        }),

        new Paragraph({
          text: "Upon dispute filing, EzoraAI will:",
          spacing: { after: 100 },
          run: new TextRun({ fontFamily: "Arial", size: 24 }),
        }),

        new Paragraph({
          text: "Review the user's written claim and supporting evidence",
          spacing: { after: 50, before: 50 },
          indent: { left: 720 },
          run: new TextRun({ fontFamily: "Arial", size: 24 }),
        }),

        new Paragraph({
          text: "Access session metadata (duration, recorded feedback, platform notes)",
          spacing: { after: 50 },
          indent: { left: 720 },
          run: new TextRun({ fontFamily: "Arial", size: 24 }),
        }),

        new Paragraph({
          text: "Notify the expert and request a written response within 3 business days",
          spacing: { after: 50 },
          indent: { left: 720 },
          run: new TextRun({ fontFamily: "Arial", size: 24 }),
        }),

        new Paragraph({
          text: "Evaluate both perspectives objectively",
          spacing: { after: 200 },
          indent: { left: 720 },
          run: new TextRun({ fontFamily: "Arial", size: 24 }),
        }),

        new Paragraph({
          text: "Possible Outcomes",
          bold: true,
          spacing: { after: 100 },
          run: new TextRun({ fontFamily: "Arial", size: 24 }),
        }),

        new Paragraph({
          text: "Full Refund: If evidence substantiates that the expert failed to deliver promised services or violated the Platform Community Guidelines.",
          spacing: { after: 50, before: 50 },
          indent: { left: 720 },
          run: new TextRun({ fontFamily: "Arial", size: 24 }),
        }),

        new Paragraph({
          text: "Partial Refund (25–75%): If the session partially met expectations or was abbreviated due to technical issues.",
          spacing: { after: 50 },
          indent: { left: 720 },
          run: new TextRun({ fontFamily: "Arial", size: 24 }),
        }),

        new Paragraph({
          text: "No Refund: If the evidence does not support the user's claim or the session met the promised scope.",
          spacing: { after: 200 },
          indent: { left: 720 },
          run: new TextRun({ fontFamily: "Arial", size: 24 }),
        }),

        new Paragraph({
          text: "Decisions are final and issued within 5–7 business days of the dispute filing. Both parties will be notified of the outcome via email.",
          spacing: { after: 200, line: 360 },
          run: new TextRun({ fontFamily: "Arial", size: 24 }),
        }),

        // 5. Refund Processing
        new Paragraph({
          text: "5. Refund Processing",
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 200, after: 100 },
          bold: true,
          run: new TextRun({ fontFamily: "Arial", size: 28 }),
        }),

        new Paragraph({
          text: "Payment Method",
          bold: true,
          spacing: { after: 100 },
          run: new TextRun({ fontFamily: "Arial", size: 24 }),
        }),

        new Paragraph({
          text: "All refunds are processed via Stripe to the original payment method used at booking. Refunds cannot be issued as account credits or alternative payment methods.",
          spacing: { after: 200, line: 360 },
          run: new TextRun({ fontFamily: "Arial", size: 24 }),
        }),

        new Paragraph({
          text: "Processing Timeline",
          bold: true,
          spacing: { after: 100 },
          run: new TextRun({ fontFamily: "Arial", size: 24 }),
        }),

        new Paragraph({
          text: "Refunds initiated by EzoraAI are processed within 1–3 business days. However, depending on your bank or credit card issuer, the funds may take 5–10 business days to appear in your account. EzoraAI is not responsible for delays caused by financial institutions.",
          spacing: { after: 200, line: 360 },
          run: new TextRun({ fontFamily: "Arial", size: 24 }),
        }),

        new Paragraph({
          text: "Platform Fee Handling",
          bold: true,
          spacing: { after: 100 },
          run: new TextRun({ fontFamily: "Arial", size: 24 }),
        }),

        new Paragraph({
          text: "Full Refunds: The platform fee (15–20% of session fee) is refunded to the user.",
          spacing: { after: 50, before: 50 },
          indent: { left: 720 },
          run: new TextRun({ fontFamily: "Arial", size: 24 }),
        }),

        new Paragraph({
          text: "Partial Refunds: The platform fee is not refunded; only the disputed portion of the session fee is refunded to the user.",
          spacing: { after: 200 },
          indent: { left: 720 },
          run: new TextRun({ fontFamily: "Arial", size: 24 }),
        }),

        // 6. Premium Membership Cancellation
        new Paragraph({
          text: "6. Premium Membership Cancellation",
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 200, after: 100 },
          bold: true,
          run: new TextRun({ fontFamily: "Arial", size: 28 }),
        }),

        new Paragraph({
          text: "Cancel Anytime Policy",
          bold: true,
          spacing: { after: 100 },
          run: new TextRun({ fontFamily: "Arial", size: 24 }),
        }),

        new Paragraph({
          text: "Users may cancel their premium membership at any time through the account settings dashboard. Cancellation takes effect immediately, but access to premium features continues through the end of the current billing period (no prorated refunds).",
          spacing: { after: 200, line: 360 },
          run: new TextRun({ fontFamily: "Arial", size: 24 }),
        }),

        new Paragraph({
          text: "7-Day Money-Back Guarantee",
          bold: true,
          spacing: { after: 100 },
          run: new TextRun({ fontFamily: "Arial", size: 24 }),
        }),

        new Paragraph({
          text: "First-time premium subscribers are eligible for a full refund within 7 days of the initial subscription purchase. To request a refund, users must contact support@ezora.ai with proof of purchase. After 7 days, the subscription charge is final.",
          spacing: { after: 200, line: 360 },
          run: new TextRun({ fontFamily: "Arial", size: 24 }),
        }),

        // 7. Expert Payout Adjustments
        new Paragraph({
          text: "7. Expert Payout Adjustments",
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 200, after: 100 },
          bold: true,
          run: new TextRun({ fontFamily: "Arial", size: 28 }),
        }),

        new Paragraph({
          text: "Refunds and Payouts",
          bold: true,
          spacing: { after: 100 },
          run: new TextRun({ fontFamily: "Arial", size: 24 }),
        }),

        new Paragraph({
          text: "When a user receives a refund, the expert's payout is adjusted accordingly:",
          spacing: { after: 100 },
          run: new TextRun({ fontFamily: "Arial", size: 24 }),
        }),

        new Paragraph({
          text: "Full Refund to User: Expert receives no payout for that session.",
          spacing: { after: 50, before: 50 },
          indent: { left: 720 },
          run: new TextRun({ fontFamily: "Arial", size: 24 }),
        }),

        new Paragraph({
          text: "Partial Refund to User: Expert's payout is reduced proportionally.",
          spacing: { after: 200 },
          indent: { left: 720 },
          run: new TextRun({ fontFamily: "Arial", size: 24 }),
        }),

        new Paragraph({
          text: "Dispute Hold Period",
          bold: true,
          spacing: { after: 100 },
          run: new TextRun({ fontFamily: "Arial", size: 24 }),
        }),

        new Paragraph({
          text: "When a dispute is filed, the expert's payout for that session is placed on hold until the dispute is resolved. EzoraAI will not release the expert's payout until a mediation decision is made. This hold period typically lasts 5–7 business days.",
          spacing: { after: 200, line: 360 },
          run: new TextRun({ fontFamily: "Arial", size: 24 }),
        }),

        // 8. Prohibited Abuse
        new Paragraph({
          text: "8. Prohibited Abuse",
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 200, after: 100 },
          bold: true,
          run: new TextRun({ fontFamily: "Arial", size: 28 }),
        }),

        new Paragraph({
          text: "EzoraAI takes a zero-tolerance approach to refund abuse. Users or experts who engage in the following behaviors risk immediate account suspension or termination:",
          spacing: { after: 200, line: 360 },
          run: new TextRun({ fontFamily: "Arial", size: 24 }),
        }),

        new Paragraph({
          text: "Filing disputes for the same session multiple times",
          spacing: { after: 50, before: 50 },
          indent: { left: 720 },
          run: new TextRun({ fontFamily: "Arial", size: 24 }),
        }),

        new Paragraph({
          text: "Serial dispute filing across multiple sessions with the same expert (more than 2 in 30 days without substantiation)",
          spacing: { after: 50 },
          indent: { left: 720 },
          run: new TextRun({ fontFamily: "Arial", size: 24 }),
        }),

        new Paragraph({
          text: "Filing disputes with false, misleading, or unsupported claims",
          spacing: { after: 50 },
          indent: { left: 720 },
          run: new TextRun({ fontFamily: "Arial", size: 24 }),
        }),

        new Paragraph({
          text: "Attempting to game the refund window (e.g., canceling consistently at the last minute without cause)",
          spacing: { after: 50 },
          indent: { left: 720 },
          run: new TextRun({ fontFamily: "Arial", size: 24 }),
        }),

        new Paragraph({
          text: "Threatening or coercing experts to refund payments outside the formal dispute process",
          spacing: { after: 200 },
          indent: { left: 720 },
          run: new TextRun({ fontFamily: "Arial", size: 24 }),
        }),

        new Paragraph({
          text: "Upon detection of abuse, EzoraAI will issue a formal warning. A second violation will result in a temporary account suspension (7–30 days). A third violation will result in permanent termination of the account.",
          spacing: { after: 200, line: 360, before: 100 },
          run: new TextRun({ fontFamily: "Arial", size: 24, italics: true }),
        }),

        // 9. Contact
        new Paragraph({
          text: "9. Contact & Support",
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 200, after: 100 },
          bold: true,
          run: new TextRun({ fontFamily: "Arial", size: 28 }),
        }),

        new Paragraph({
          text: "For questions about this policy, refund requests, or dispute filing, contact:",
          spacing: { after: 100, line: 360 },
          run: new TextRun({ fontFamily: "Arial", size: 24 }),
        }),

        new Paragraph({
          text: "Email: support@ezora.ai",
          spacing: { after: 50 },
          indent: { left: 720 },
          run: new TextRun({ fontFamily: "Arial", size: 24, bold: true }),
        }),

        new Paragraph({
          text: "Response time: Within 24 business hours",
          spacing: { after: 200 },
          indent: { left: 720 },
          run: new TextRun({ fontFamily: "Arial", size: 24 }),
        }),

        // Closing
        new Paragraph({
          text: "Policy Version: 1.0 | Last Updated: March 29, 2026",
          spacing: { before: 400, after: 100 },
          alignment: AlignmentType.CENTER,
          run: new TextRun({ fontFamily: "Arial", size: 20, italics: true }),
        }),

        new Paragraph({
          text: "This policy is subject to change at EzoraAI's discretion. Changes will be posted on our website and communicated to users via email. Continued use of the EzoraAI platform constitutes acceptance of the updated policy.",
          spacing: { after: 200, line: 360 },
          alignment: AlignmentType.CENTER,
          run: new TextRun({ fontFamily: "Arial", size: 20, italics: true }),
        }),
      ],
    },
  ],
});

// Generate the document
Packer.toBuffer(doc).then((buffer) => {
  const outputPath = "/sessions/keen-epic-bardeen/mnt/EzoraAI-Ops/EzoraAI/Legal/EzoraAI_Refund_Cancellation_Policy.docx";
  fs.writeFileSync(outputPath, buffer);
  console.log(`Document created successfully at: ${outputPath}`);
  console.log(`File size: ${buffer.length} bytes`);
});
