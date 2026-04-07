const { Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell, VerticalAlign, BorderStyle, AlignmentType, WidthType, ShadingType, PageBreak, Header, Footer, PageNumber } = require('docx');
const fs = require('fs');

const doc = new Document({
  styles: {
    default: {
      document: {
        run: { fontFamily: "Arial", size: 24 }
      }
    },
    paragraphStyles: [
      {
        id: "Heading1",
        name: "Heading 1",
        basedOn: "Normal",
        next: "Normal",
        run: { size: 28, bold: true, fontFamily: "Arial" },
        paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 0 }
      },
      {
        id: "Heading2",
        name: "Heading 2",
        basedOn: "Normal",
        next: "Normal",
        run: { size: 26, bold: true, fontFamily: "Arial" },
        paragraph: { spacing: { before: 200, after: 100 }, outlineLevel: 1 }
      }
    ]
  },
  sections: [{
    properties: {
      page: {
        size: {
          width: 12240,
          height: 15840
        },
        margin: {
          top: 1440,
          right: 1440,
          bottom: 1440,
          left: 1440
        }
      }
    },
    headers: {
      default: new Header({
        children: [
          new Paragraph({
            text: "EzoraAI — Refund & Cancellation Policy",
            alignment: AlignmentType.CENTER,
            border: {
              bottom: {
                color: "000000",
                space: 1,
                style: BorderStyle.SINGLE,
                size: 6
              }
            }
          })
        ]
      })
    },
    footers: {
      default: new Footer({
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun("Page "),
              new TextRun({ children: [PageNumber.CURRENT] })
            ]
          })
        ]
      })
    },
    children: [
      new Paragraph({
        text: "DRAFT — FOR LEGAL REVIEW",
        bold: true,
        alignment: AlignmentType.CENTER,
        spacing: { after: 400 }
      }),
      new Paragraph({
        text: "Refund & Cancellation Policy",
        heading: HeadingLevel.HEADING_1,
        alignment: AlignmentType.CENTER,
        spacing: { after: 100 }
      }),
      new Paragraph({
        text: "Effective: March 29, 2026",
        alignment: AlignmentType.CENTER,
        spacing: { after: 400 },
        italics: true
      }),
      new Paragraph({
        text: "1. Overview",
        heading: HeadingLevel.HEADING_1
      }),
      new Paragraph({
        text: "This Refund & Cancellation Policy outlines the terms and conditions under which users, experts, and businesses may cancel sessions, request refunds, or dispute the quality of services provided on the EzoraAI platform. EzoraAI is a marketplace where users book one-on-one sessions with verified AI experts. All sessions are subject to the payment terms outlined below.",
        spacing: { after: 200, line: 360 }
      }),
      new Paragraph({
        text: "Policy applies to:",
        spacing: { after: 100 }
      }),
      new Paragraph({
        text: "Expert-led sessions (user-initiated bookings, $40–$100 per session)",
        spacing: { after: 50 },
        indent: { left: 720 }
      }),
      new Paragraph({
        text: "Optional premium features and tools (pay-per-use)",
        spacing: { after: 50 },
        indent: { left: 720 }
      }),
      new Paragraph({
        text: "Refund processing via Stripe",
        spacing: { after: 200 },
        indent: { left: 720 }
      }),
      new Paragraph({
        text: "2. Session Cancellation by User",
        heading: HeadingLevel.HEADING_1
      }),
      new Paragraph({
        text: "Users may cancel scheduled sessions with the following refund terms:",
        spacing: { after: 200, line: 360 }
      }),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [3000, 3180, 3180],
        rows: [
          new TableRow({
            children: [
              new TableCell({
                children: [new Paragraph({ text: "Cancellation Timing", bold: true })],
                shading: { fill: "131D3B", type: ShadingType.CLEAR },
                verticalAlign: VerticalAlign.CENTER,
                margins: { top: 80, bottom: 80, left: 120, right: 120 }
              }),
              new TableCell({
                children: [new Paragraph({ text: "Refund to User", bold: true })],
                shading: { fill: "131D3B", type: ShadingType.CLEAR },
                verticalAlign: VerticalAlign.CENTER,
                margins: { top: 80, bottom: 80, left: 120, right: 120 }
              }),
              new TableCell({
                children: [new Paragraph({ text: "Expert Payout", bold: true })],
                shading: { fill: "131D3B", type: ShadingType.CLEAR },
                verticalAlign: VerticalAlign.CENTER,
                margins: { top: 80, bottom: 80, left: 120, right: 120 }
              })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({
                children: [new Paragraph({ text: "24+ hours before session" })],
                shading: { fill: "FFFFFF", type: ShadingType.CLEAR },
                verticalAlign: VerticalAlign.CENTER,
                margins: { top: 80, bottom: 80, left: 120, right: 120 }
              }),
              new TableCell({
                children: [new Paragraph({ text: "Full refund (100%)", bold: true })],
                shading: { fill: "FFFFFF", type: ShadingType.CLEAR },
                verticalAlign: VerticalAlign.CENTER,
                margins: { top: 80, bottom: 80, left: 120, right: 120 }
              }),
              new TableCell({
                children: [new Paragraph({ text: "No payout" })],
                shading: { fill: "FFFFFF", type: ShadingType.CLEAR },
                verticalAlign: VerticalAlign.CENTER,
                margins: { top: 80, bottom: 80, left: 120, right: 120 }
              })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({
                children: [new Paragraph({ text: "12–24 hours before session" })],
                shading: { fill: "F4F6FA", type: ShadingType.CLEAR },
                verticalAlign: VerticalAlign.CENTER,
                margins: { top: 80, bottom: 80, left: 120, right: 120 }
              }),
              new TableCell({
                children: [new Paragraph({ text: "50% refund (platform fee retained)", bold: true })],
                shading: { fill: "F4F6FA", type: ShadingType.CLEAR },
                verticalAlign: VerticalAlign.CENTER,
                margins: { top: 80, bottom: 80, left: 120, right: 120 }
              }),
              new TableCell({
                children: [new Paragraph({ text: "50% of session fee" })],
                shading: { fill: "F4F6FA", type: ShadingType.CLEAR },
                verticalAlign: VerticalAlign.CENTER,
                margins: { top: 80, bottom: 80, left: 120, right: 120 }
              })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({
                children: [new Paragraph({ text: "Under 12 hours / no-show" })],
                shading: { fill: "FFFFFF", type: ShadingType.CLEAR },
                verticalAlign: VerticalAlign.CENTER,
                margins: { top: 80, bottom: 80, left: 120, right: 120 }
              }),
              new TableCell({
                children: [new Paragraph({ text: "No refund (forfeited)", bold: true })],
                shading: { fill: "FFFFFF", type: ShadingType.CLEAR },
                verticalAlign: VerticalAlign.CENTER,
                margins: { top: 80, bottom: 80, left: 120, right: 120 }
              }),
              new TableCell({
                children: [new Paragraph({ text: "Full payout" })],
                shading: { fill: "FFFFFF", type: ShadingType.CLEAR },
                verticalAlign: VerticalAlign.CENTER,
                margins: { top: 80, bottom: 80, left: 120, right: 120 }
              })
            ]
          })
        ]
      }),
      new Paragraph({
        text: "Cancellation must be initiated through the EzoraAI platform dashboard. Refund eligibility is determined by the timestamp of the cancellation request, not the cancellation completion.",
        spacing: { before: 200, after: 200, line: 360 },
        italics: true
      }),
      new Paragraph({
        text: "3. Session Cancellation by Expert",
        heading: HeadingLevel.HEADING_1
      }),
      new Paragraph({
        text: "When an expert cancels a confirmed session, the user receives an automatic full refund, regardless of cancellation timing. EzoraAI recognizes that expert cancellations are disruptive to users and applies no refund penalties in these cases.",
        spacing: { after: 200, line: 360 }
      }),
      new Paragraph({
        text: "Repeated Expert Cancellations",
        heading: HeadingLevel.HEADING_2
      }),
      new Paragraph({
        text: "If an expert cancels 3 or more sessions within a 30-day period, EzoraAI reserves the right to:",
        spacing: { after: 100 }
      }),
      new Paragraph({
        text: "Conduct a review of the cancellation pattern",
        spacing: { after: 50 },
        indent: { left: 720 }
      }),
      new Paragraph({
        text: "Require the expert to provide written explanation",
        spacing: { after: 50 },
        indent: { left: 720 }
      }),
      new Paragraph({
        text: "Temporarily restrict scheduling until compliance is demonstrated",
        spacing: { after: 50 },
        indent: { left: 720 }
      }),
      new Paragraph({
        text: "Suspend the expert account for chronic violations",
        spacing: { after: 200 },
        indent: { left: 720 }
      }),
      new Paragraph({
        text: "4. Session Quality Disputes",
        heading: HeadingLevel.HEADING_1
      }),
      new Paragraph({
        text: "Dispute Filing Window",
        heading: HeadingLevel.HEADING_2
      }),
      new Paragraph({
        text: "Users may file a dispute regarding session quality, content delivery, or expert conduct within 48 hours of session completion. Disputes filed outside this window will not be reviewed.",
        spacing: { after: 200, line: 360 }
      }),
      new Paragraph({
        text: "EzoraAI Mediation Process",
        heading: HeadingLevel.HEADING_2
      }),
      new Paragraph({
        text: "Upon dispute filing, EzoraAI will:",
        spacing: { after: 100 }
      }),
      new Paragraph({
        text: "Review the user's written claim and supporting evidence",
        spacing: { after: 50 },
        indent: { left: 720 }
      }),
      new Paragraph({
        text: "Access session metadata (duration, recorded feedback, platform notes)",
        spacing: { after: 50 },
        indent: { left: 720 }
      }),
      new Paragraph({
        text: "Notify the expert and request a written response within 3 business days",
        spacing: { after: 50 },
        indent: { left: 720 }
      }),
      new Paragraph({
        text: "Evaluate both perspectives objectively",
        spacing: { after: 200 },
        indent: { left: 720 }
      }),
      new Paragraph({
        text: "Possible Outcomes",
        heading: HeadingLevel.HEADING_2
      }),
      new Paragraph({
        text: "Full Refund: If evidence substantiates that the expert failed to deliver promised services or violated the Platform Community Guidelines.",
        spacing: { after: 50 },
        indent: { left: 720 }
      }),
      new Paragraph({
        text: "Partial Refund (25–75%): If the session partially met expectations or was abbreviated due to technical issues.",
        spacing: { after: 50 },
        indent: { left: 720 }
      }),
      new Paragraph({
        text: "No Refund: If the evidence does not support the user's claim or the session met the promised scope.",
        spacing: { after: 200 },
        indent: { left: 720 }
      }),
      new Paragraph({
        text: "Decisions are final and issued within 5–7 business days of the dispute filing. Both parties will be notified of the outcome via email.",
        spacing: { after: 200, line: 360 }
      }),
      new Paragraph({
        text: "5. Refund Processing",
        heading: HeadingLevel.HEADING_1
      }),
      new Paragraph({
        text: "Payment Method",
        heading: HeadingLevel.HEADING_2
      }),
      new Paragraph({
        text: "All refunds are processed via Stripe to the original payment method used at booking. Refunds cannot be issued as account credits or alternative payment methods.",
        spacing: { after: 200, line: 360 }
      }),
      new Paragraph({
        text: "Processing Timeline",
        heading: HeadingLevel.HEADING_2
      }),
      new Paragraph({
        text: "Refunds initiated by EzoraAI are processed within 1–3 business days. However, depending on your bank or credit card issuer, the funds may take 5–10 business days to appear in your account. EzoraAI is not responsible for delays caused by financial institutions.",
        spacing: { after: 200, line: 360 }
      }),
      new Paragraph({
        text: "Platform Fee Handling",
        heading: HeadingLevel.HEADING_2
      }),
      new Paragraph({
        text: "Full Refunds: The platform fee (15–20% of session fee) is refunded to the user.",
        spacing: { after: 50 },
        indent: { left: 720 }
      }),
      new Paragraph({
        text: "Partial Refunds: The platform fee is not refunded; only the disputed portion of the session fee is refunded to the user.",
        spacing: { after: 200 },
        indent: { left: 720 }
      }),
      new Paragraph({
        text: "6. Premium Service Cancellation",
        heading: HeadingLevel.HEADING_1
      }),
      new Paragraph({
        text: "Cancel Anytime Policy",
        heading: HeadingLevel.HEADING_2
      }),
      new Paragraph({
        text: "Users may cancel optional premium services at any time through the account settings dashboard. Cancellation takes effect immediately.",
        spacing: { after: 200, line: 360 }
      }),
      new Paragraph({
        text: "7-Day Satisfaction Guarantee",
        heading: HeadingLevel.HEADING_2
      }),
      new Paragraph({
        text: "Users are eligible for a full refund within 7 days of a session or premium service purchase if they are not satisfied. To request a refund, users must contact support@ezora.ai with proof of purchase. After 7 days, the charge is final.",
        spacing: { after: 200, line: 360 }
      }),
      new Paragraph({
        text: "7. Expert Payout Adjustments",
        heading: HeadingLevel.HEADING_1
      }),
      new Paragraph({
        text: "Refunds and Payouts",
        heading: HeadingLevel.HEADING_2
      }),
      new Paragraph({
        text: "When a user receives a refund, the expert's payout is adjusted accordingly:",
        spacing: { after: 100 }
      }),
      new Paragraph({
        text: "Full Refund to User: Expert receives no payout for that session.",
        spacing: { after: 50 },
        indent: { left: 720 }
      }),
      new Paragraph({
        text: "Partial Refund to User: Expert's payout is reduced proportionally.",
        spacing: { after: 200 },
        indent: { left: 720 }
      }),
      new Paragraph({
        text: "Dispute Hold Period",
        heading: HeadingLevel.HEADING_2
      }),
      new Paragraph({
        text: "When a dispute is filed, the expert's payout for that session is placed on hold until the dispute is resolved. EzoraAI will not release the expert's payout until a mediation decision is made. This hold period typically lasts 5–7 business days.",
        spacing: { after: 200, line: 360 }
      }),
      new Paragraph({
        text: "8. Prohibited Abuse",
        heading: HeadingLevel.HEADING_1
      }),
      new Paragraph({
        text: "EzoraAI takes a zero-tolerance approach to refund abuse. Users or experts who engage in the following behaviors risk immediate account suspension or termination:",
        spacing: { after: 200, line: 360 }
      }),
      new Paragraph({
        text: "Filing disputes for the same session multiple times",
        spacing: { after: 50 },
        indent: { left: 720 }
      }),
      new Paragraph({
        text: "Serial dispute filing across multiple sessions with the same expert (more than 2 in 30 days without substantiation)",
        spacing: { after: 50 },
        indent: { left: 720 }
      }),
      new Paragraph({
        text: "Filing disputes with false, misleading, or unsupported claims",
        spacing: { after: 50 },
        indent: { left: 720 }
      }),
      new Paragraph({
        text: "Attempting to game the refund window (e.g., canceling consistently at the last minute without cause)",
        spacing: { after: 50 },
        indent: { left: 720 }
      }),
      new Paragraph({
        text: "Threatening or coercing experts to refund payments outside the formal dispute process",
        spacing: { after: 200 },
        indent: { left: 720 }
      }),
      new Paragraph({
        text: "Upon detection of abuse, EzoraAI will issue a formal warning. A second violation will result in a temporary account suspension (7–30 days). A third violation will result in permanent termination of the account.",
        spacing: { before: 100, after: 200, line: 360 },
        italics: true
      }),
      new Paragraph({
        text: "9. Contact & Support",
        heading: HeadingLevel.HEADING_1
      }),
      new Paragraph({
        text: "For questions about this policy, refund requests, or dispute filing, contact:",
        spacing: { after: 100, line: 360 }
      }),
      new Paragraph({
        text: "Email: support@ezora.ai",
        spacing: { after: 50 },
        indent: { left: 720 },
        bold: true
      }),
      new Paragraph({
        text: "Response time: Within 24 business hours",
        spacing: { after: 200 },
        indent: { left: 720 }
      }),
      new Paragraph({
        text: "Policy Version: 1.0 | Last Updated: March 29, 2026",
        spacing: { before: 400, after: 100 },
        alignment: AlignmentType.CENTER,
        italics: true,
        size: 20
      }),
      new Paragraph({
        text: "This policy is subject to change at EzoraAI's discretion. Changes will be posted on our website and communicated to users via email. Continued use of the EzoraAI platform constitutes acceptance of the updated policy.",
        spacing: { after: 200, line: 360 },
        alignment: AlignmentType.CENTER,
        italics: true,
        size: 20
      })
    ]
  }]
});

Packer.toBuffer(doc).then((buffer) => {
  const outputPath = "/sessions/keen-epic-bardeen/mnt/EzoraAI-Ops/EzoraAI/Legal/EzoraAI_Refund_Cancellation_Policy.docx";
  fs.writeFileSync(outputPath, buffer);
  console.log(`Document created successfully at: ${outputPath}`);
  console.log(`File size: ${buffer.length} bytes`);
});
