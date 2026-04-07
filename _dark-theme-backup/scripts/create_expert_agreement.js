#!/usr/bin/env node

const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
        Header, Footer, AlignmentType, PageNumber, PageBreak, HeadingLevel,
        BorderStyle, WidthType, ShadingType, VerticalAlign, LevelFormat } = require('docx');
const fs = require('fs');

const doc = new Document({
  styles: {
    default: {
      document: {
        run: { font: "Arial", size: 24 } // 12pt
      }
    },
    paragraphStyles: [
      {
        id: "Heading1",
        name: "Heading 1",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: { size: 32, bold: true, font: "Arial", color: "000000" }, // 16pt
        paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 0 }
      },
      {
        id: "Heading2",
        name: "Heading 2",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: { size: 28, bold: true, font: "Arial", color: "000000" }, // 14pt
        paragraph: { spacing: { before: 180, after: 100 }, outlineLevel: 1 }
      }
    ]
  },
  numbering: {
    config: [
      {
        reference: "bullets",
        levels: [
          {
            level: 0,
            format: LevelFormat.BULLET,
            text: "•",
            alignment: AlignmentType.LEFT,
            style: {
              paragraph: {
                indent: { left: 720, hanging: 360 }
              }
            }
          }
        ]
      },
      {
        reference: "numbers",
        levels: [
          {
            level: 0,
            format: LevelFormat.DECIMAL,
            text: "%1.",
            alignment: AlignmentType.LEFT,
            style: {
              paragraph: {
                indent: { left: 720, hanging: 360 }
              }
            }
          }
        ]
      }
    ]
  },
  sections: [
    {
      properties: {
        page: {
          size: {
            width: 12240,  // 8.5 inches
            height: 15840  // 11 inches
          },
          margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } // 1 inch
        }
      },
      headers: {
        default: new Header({
          children: [
            new Paragraph({
              children: [new TextRun("EzoraAI — Expert Agreement")]
            })
          ]
        })
      },
      footers: {
        default: new Footer({
          children: [
            new Paragraph({
              children: [
                new TextRun("Page "),
                new TextRun({ children: [PageNumber.CURRENT] })
              ]
            })
          ]
        })
      },
      children: [
        // Draft notice
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({
              text: "DRAFT — FOR LEGAL REVIEW",
              bold: true,
              color: "CC0000"
            })
          ],
          spacing: { after: 240 }
        }),

        // Title
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          alignment: AlignmentType.CENTER,
          children: [new TextRun("EXPERT AGREEMENT & INDEPENDENT CONTRACTOR TERMS")],
          spacing: { after: 120 }
        }),

        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun("EzoraAI Inc.")],
          spacing: { after: 360 }
        }),

        // Introduction
        new Paragraph({
          children: [
            new TextRun("This Expert Agreement (&#x201C;")
          ]
        }),

        // Section 1
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun("1. PARTIES")],
          spacing: { before: 240, after: 120 }
        }),

        new Paragraph({
          children: [
            new TextRun("This Agreement is entered into between "),
            new TextRun({ text: "EzoraAI Inc.", bold: true }),
            new TextRun(", a Delaware corporation (&#x201C;")
          ]
        }),

        new Paragraph({
          children: [new TextRun("Platform&#x201D; or &#x201C;Company&#x201D;), and the undersigned expert (&#x201C;Expert&#x201D;).")]
        }),

        new Paragraph({
          spacing: { after: 240 }
        }),

        // Section 2
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun("2. INDEPENDENT CONTRACTOR STATUS")],
          spacing: { before: 240, after: 120 }
        }),

        new Paragraph({
          children: [new TextRun("Expert is an independent contractor, NOT an employee, partner, joint venturer, or agent of the Company. Specifically:")]
        }),

        new Paragraph({
          numbering: { reference: "bullets", level: 0 },
          children: [new TextRun("Expert is solely responsible for all payroll taxes, Social Security, Medicare, unemployment insurance, and workers&#x2019; compensation insurance")]
        }),

        new Paragraph({
          numbering: { reference: "bullets", level: 0 },
          children: [new TextRun("Expert receives no employee benefits: no health insurance, retirement plans, paid time off, or other benefits")]
        }),

        new Paragraph({
          numbering: { reference: "bullets", level: 0 },
          children: [new TextRun("Expert controls the methods, schedule, location, and manner of work delivery")]
        }),

        new Paragraph({
          numbering: { reference: "bullets", level: 0 },
          children: [new TextRun("Expert sets their own rates (within Platform guidelines) and controls availability")]
        }),

        new Paragraph({
          numbering: { reference: "bullets", level: 0 },
          children: [new TextRun("For US-based Experts: Company will issue Form 1099-NEC at year-end for tax reporting")]
        }),

        new Paragraph({
          numbering: { reference: "bullets", level: 0 },
          children: [new TextRun("Expert is responsible for maintaining professional liability insurance, if desired")]
        }),

        new Paragraph({
          spacing: { after: 240 }
        }),

        // Section 3
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun("3. EXPERT OBLIGATIONS")],
          spacing: { before: 240, after: 120 }
        }),

        new Paragraph({
          children: [new TextRun("Expert agrees to:")]
        }),

        new Paragraph({
          numbering: { reference: "numbers", level: 0 },
          children: [
            new TextRun({ text: "Accurate Representation", bold: true }),
            new TextRun(": Truthfully represent qualifications, experience, certifications, and skills on profile. Misrepresentation may result in account suspension or termination.")
          ]
        }),

        new Paragraph({
          numbering: { reference: "numbers", level: 0 },
          children: [
            new TextRun({ text: "Professional Conduct", bold: true }),
            new TextRun(": Maintain professional demeanor in all sessions, communications, and interactions. No harassment, discrimination, or abusive behavior.")
          ]
        }),

        new Paragraph({
          numbering: { reference: "numbers", level: 0 },
          children: [
            new TextRun({ text: "Quality Standards", bold: true }),
            new TextRun(": Deliver high-quality expertise, meet client expectations, and provide value during all sessions.")
          ]
        }),

        new Paragraph({
          numbering: { reference: "numbers", level: 0 },
          children: [
            new TextRun({ text: "Timely Responses", bold: true }),
            new TextRun(": Respond to booking requests and client inquiries within 48 hours.")
          ]
        }),

        new Paragraph({
          numbering: { reference: "numbers", level: 0 },
          children: [
            new TextRun({ text: "Project Delivery", bold: true }),
            new TextRun(": Complete agreed projects or deliverables by the mutually agreed deadline. Extensions require prior written approval.")
          ]
        }),

        new Paragraph({
          numbering: { reference: "numbers", level: 0 },
          children: [
            new TextRun({ text: "Compliance", bold: true }),
            new TextRun(": Comply with all Platform policies, including content guidelines, acceptable use policies, and code of conduct.")
          ]
        }),

        new Paragraph({
          spacing: { after: 240 }
        }),

        // Section 4
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun("4. PLATFORM FEES & TAKE RATE")],
          spacing: { before: 240, after: 120 }
        }),

        new Paragraph({
          children: [new TextRun("4.1 "),
            new TextRun({ text: "Standard Take Rate", bold: true }),
            new TextRun(": Company retains 15&#x2013;20% of session fees and project revenue as its platform fee. Expert receives the remaining 80&#x2013;85%.")
          ]
        }),

        new Paragraph({
          spacing: { after: 120 }
        }),

        new Paragraph({
          children: [new TextRun("4.2 "),
            new TextRun({ text: "Founding Expert Rate", bold: true }),
            new TextRun(": Experts who reach &#x201C;Founding Expert&#x201D; status (to be defined by Company) qualify for a reduced 10% take rate for 12 months from qualification date.")
          ]
        }),

        new Paragraph({
          spacing: { after: 120 }
        }),

        new Paragraph({
          children: [new TextRun("4.3 "),
            new TextRun({ text: "Rate Changes", bold: true }),
            new TextRun(": Company may adjust the take rate with 60 days&#x2019; prior written notice. Expert may accept the new rate or terminate this Agreement.")
          ]
        }),

        new Paragraph({
          spacing: { after: 120 }
        }),

        new Paragraph({
          children: [new TextRun("4.4 "),
            new TextRun({ text: "Premium Features", bold: true }),
            new TextRun(": Company may offer optional premium features (featured listings, advanced analytics, certified badges) at additional cost. These are separate from session fees.")
          ]
        }),

        new Paragraph({
          spacing: { after: 240 }
        }),

        // Section 5
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun("5. PAYMENT TERMS")],
          spacing: { before: 240, after: 120 }
        }),

        new Paragraph({
          children: [new TextRun("5.1 "),
            new TextRun({ text: "Payment Method", bold: true }),
            new TextRun(": All payments are processed via Stripe Connect. Expert must maintain an active Stripe account and valid payment method on file.")
          ]
        }),

        new Paragraph({
          spacing: { after: 120 }
        }),

        new Paragraph({
          children: [new TextRun("5.2 "),
            new TextRun({ text: "Payout Schedule", bold: true }),
            new TextRun(": Payouts occur weekly (Mondays) for sessions completed 7+ days prior. A 7-day hold is maintained on all transactions to address disputes and chargebacks.")
          ]
        }),

        new Paragraph({
          spacing: { after: 120 }
        }),

        new Paragraph({
          children: [new TextRun("5.3 "),
            new TextRun({ text: "Currency & International", bold: true }),
            new TextRun(": Payments are in USD. International Experts are responsible for currency conversion and international payment fees charged by their bank or Stripe.")
          ]
        }),

        new Paragraph({
          spacing: { after: 120 }
        }),

        new Paragraph({
          children: [new TextRun("5.4 "),
            new TextRun({ text: "Stripe Account Setup", bold: true }),
            new TextRun(": Expert is responsible for establishing and maintaining Stripe Connect account. Company is not liable for payment delays due to Expert&#x2019;s account issues, verification failures, or compliance violations.")
          ]
        }),

        new Paragraph({
          spacing: { after: 240 }
        }),

        // Section 6
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun("6. RATE SETTING & PRICING")],
          spacing: { before: 240, after: 120 }
        }),

        new Paragraph({
          children: [new TextRun("6.1 "),
            new TextRun({ text: "Expert-Controlled Pricing", bold: true }),
            new TextRun(": Expert sets their own session rates within Company guidelines. At launch, the guideline range is $40&#x2013;$100 per session.")
          ]
        }),

        new Paragraph({
          spacing: { after: 120 }
        }),

        new Paragraph({
          children: [new TextRun("6.2 "),
            new TextRun({ text: "Rate Adjustments", bold: true }),
            new TextRun(": Expert may adjust rates at any time. Changes take effect for new bookings within 24 hours of submission.")
          ]
        }),

        new Paragraph({
          spacing: { after: 120 }
        }),

        new Paragraph({
          children: [new TextRun("6.3 "),
            new TextRun({ text: "Platform Rate Range Changes", bold: true }),
            new TextRun(": Company may adjust the acceptable rate range ($40&#x2013;$100) with 30 days&#x2019; notice. Experts whose rates fall outside the new range will be notified and may adjust or request exception approval.")
          ]
        }),

        new Paragraph({
          spacing: { after: 120 }
        }),

        new Paragraph({
          children: [new TextRun("6.4 "),
            new TextRun({ text: "No Price Fixing", bold: true }),
            new TextRun(": Expert agrees not to collude with other Experts to set prices, undercut competitors, or engage in anti-competitive practices.")]
        }),

        new Paragraph({
          spacing: { after: 240 }
        }),

        // Section 7
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun("7. INTELLECTUAL PROPERTY")],
          spacing: { before: 240, after: 120 }
        }),

        new Paragraph({
          children: [new TextRun("7.1 "),
            new TextRun({ text: "Expert Content Ownership", bold: true }),
            new TextRun(": Expert retains all intellectual property rights to their own materials, tools, frameworks, templates, and content created prior to or outside the Platform.")]
        }),

        new Paragraph({
          spacing: { after: 120 }
        }),

        new Paragraph({
          children: [new TextRun("7.2 "),
            new TextRun({ text: "Platform License", bold: true }),
            new TextRun(": Expert grants Company a non-exclusive, royalty-free license to display Expert&#x2019;s profile, qualifications, credentials, ratings, reviews, and work samples on the Platform.")
          ]
        }),

        new Paragraph({
          spacing: { after: 120 }
        }),

        new Paragraph({
          children: [new TextRun("7.3 "),
            new TextRun({ text: "AI Agents & Tools", bold: true }),
            new TextRun(": If Expert sells AI agents, custom tools, or software through the Platform, Expert retains ownership and grants Company a distribution license. Company takes its standard fee on sales.")]
        }),

        new Paragraph({
          spacing: { after: 120 }
        }),

        new Paragraph({
          children: [new TextRun("7.4 "),
            new TextRun({ text: "Session Recordings", bold: true }),
            new TextRun(": Unless otherwise agreed in writing, Expert consents to recording sessions for quality assurance and record-keeping purposes. Recordings are confidential and not shared with third parties without consent.")]
        }),

        new Paragraph({
          spacing: { after: 240 }
        }),

        // Section 8
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun("8. BLOCKCHAIN CREDENTIALS & ON-CHAIN VERIFICATION")],
          spacing: { before: 240, after: 120 }
        }),

        new Paragraph({
          children: [new TextRun("8.1 "),
            new TextRun({ text: "Consent to On-Chain Recording", bold: true }),
            new TextRun(": Expert consents to Company recording verified credentials and work history on a blockchain ledger. This creates an immutable proof-of-work record of expertise.")]
        }),

        new Paragraph({
          spacing: { after: 120 }
        }),

        new Paragraph({
          children: [new TextRun("8.2 "),
            new TextRun({ text: "What Goes On-Chain", bold: true }),
            new TextRun(": Records may include: (a) Expert profile verification date, (b) Session completion dates and client ratings, (c) Skill certifications and badges, (d) Total sessions completed, (e) Average client ratings.")]
        }),

        new Paragraph({
          spacing: { after: 120 }
        }),

        new Paragraph({
          children: [new TextRun("8.3 "),
            new TextRun({ text: "Immutability", bold: true }),
            new TextRun(": Expert acknowledges that blockchain records cannot be deleted, modified, or revoked once recorded. Records are permanently available and publicly verifiable on the blockchain.")]
        }),

        new Paragraph({
          spacing: { after: 120 }
        }),

        new Paragraph({
          children: [new TextRun("8.4 "),
            new TextRun({ text: "Privacy", bold: true }),
            new TextRun(": Blockchain records do not include sensitive client information (names, payment details, session content). Only Expert profile data and anonymized session metadata are recorded.")]
        }),

        new Paragraph({
          spacing: { after: 240 }
        }),

        // Section 9
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun("9. NON-CIRCUMVENTION")],
          spacing: { before: 240, after: 120 }
        }),

        new Paragraph({
          children: [new TextRun("Expert agrees not to solicit, book, or conduct business with any Platform client outside the Platform for 12 months after the Expert&#x2019;s last session with that client. This protects the Platform&#x2019;s investment in marketing and client acquisition.")]
        }),

        new Paragraph({
          spacing: { after: 120 }
        }),

        new Paragraph({
          children: [new TextRun({ text: "Exception", bold: true }),
            new TextRun(": This restriction does not apply to pre-existing client relationships that existed before the Expert joined the Platform, provided Expert discloses this relationship in writing at onboarding.")]
        }),

        new Paragraph({
          spacing: { after: 120 }
        }),

        new Paragraph({
          children: [new TextRun("Violation of this clause may result in immediate account suspension, reversal of pending payments, and Platform referral to legal enforcement.")]
        }),

        new Paragraph({
          spacing: { after: 240 }
        }),

        // Section 10
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun("10. CONFIDENTIALITY")],
          spacing: { before: 240, after: 120 }
        }),

        new Paragraph({
          children: [new TextRun("10.1 "),
            new TextRun({ text: "Client Information", bold: true }),
            new TextRun(": Expert will not disclose client names, contact details, session content, or project information to third parties without prior written consent from the client.")]
        }),

        new Paragraph({
          spacing: { after: 120 }
        }),

        new Paragraph({
          children: [new TextRun("10.2 "),
            new TextRun({ text: "Platform Data", bold: true }),
            new TextRun(": Expert will not share Platform proprietary information, algorithms, fee structures, client lists, or internal data with competitors or the public.")]
        }),

        new Paragraph({
          spacing: { after: 120 }
        }),

        new Paragraph({
          children: [new TextRun("10.3 "),
            new TextRun({ text: "Duration", bold: true }),
            new TextRun(": These confidentiality obligations survive termination of this Agreement indefinitely.")]
        }),

        new Paragraph({
          spacing: { after: 240 }
        }),

        // Section 11
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun("11. TERMINATION")],
          spacing: { before: 240, after: 120 }
        }),

        new Paragraph({
          children: [new TextRun("11.1 "),
            new TextRun({ text: "Termination Without Cause", bold: true }),
            new TextRun(": Either party may terminate this Agreement by providing 14 days&#x2019; written notice. Expert will stop accepting new bookings upon notice and fulfill existing commitments.")]
        }),

        new Paragraph({
          spacing: { after: 120 }
        }),

        new Paragraph({
          children: [new TextRun("11.2 "),
            new TextRun({ text: "Immediate Termination", bold: true }),
            new TextRun(": Company may immediately suspend or terminate Expert&#x2019;s account for: (a) policy violations, (b) harmful conduct, (c) fraudulent activity, (d) repeated complaints or poor ratings, (e) breach of this Agreement.")]
        }),

        new Paragraph({
          spacing: { after: 120 }
        }),

        new Paragraph({
          children: [new TextRun("11.3 "),
            new TextRun({ text: "Outstanding Payments", bold: true }),
            new TextRun(": Company will process all earned payments within 30 days of termination, minus any refunds due to disputes or chargebacks.")]
        }),

        new Paragraph({
          spacing: { after: 120 }
        }),

        new Paragraph({
          children: [new TextRun("11.4 "),
            new TextRun({ text: "Surviving Clauses", bold: true }),
            new TextRun(": Sections 7 (IP), 8 (Blockchain), 9 (Non-Circumvention), 10 (Confidentiality), 12 (Limitation of Liability), and 13 (Dispute Resolution) survive termination.")]
        }),

        new Paragraph({
          spacing: { after: 240 }
        }),

        // Section 12
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun("12. LIMITATION OF LIABILITY")],
          spacing: { before: 240, after: 120 }
        }),

        new Paragraph({
          children: [new TextRun("TO THE MAXIMUM EXTENT PERMITTED BY LAW, NEITHER PARTY SHALL BE LIABLE FOR INDIRECT, INCIDENTAL, CONSEQUENTIAL, SPECIAL, OR PUNITIVE DAMAGES, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. COMPANY&#x2019;S TOTAL LIABILITY UNDER THIS AGREEMENT SHALL NOT EXCEED THE FEES PAID BY THE EXPERT IN THE 12 MONTHS PRECEDING THE CLAIM.")]
        }),

        new Paragraph({
          spacing: { after: 240 }
        }),

        // Section 13
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun("13. DISPUTE RESOLUTION")],
          spacing: { before: 240, after: 120 }
        }),

        new Paragraph({
          children: [new TextRun("13.1 "),
            new TextRun({ text: "Mediation", bold: true }),
            new TextRun(": Before litigation or arbitration, the parties agree to attempt good-faith mediation. Either party may initiate mediation by submitting a written request to the other party.")]
        }),

        new Paragraph({
          spacing: { after: 120 }
        }),

        new Paragraph({
          children: [new TextRun("13.2 "),
            new TextRun({ text: "Arbitration", bold: true }),
            new TextRun(": If mediation fails, any dispute shall be resolved by binding arbitration administered by JAMS (Judicial Arbitration and Mediation Services) or similar, in Delaware, under JAMS Rules. Arbitration is confidential and final.")]
        }),

        new Paragraph({
          spacing: { after: 120 }
        }),

        new Paragraph({
          children: [new TextRun("13.3 "),
            new TextRun({ text: "No Class Action", bold: true }),
            new TextRun(": Expert waives the right to bring class action claims. All disputes are resolved individually.")]
        }),

        new Paragraph({
          spacing: { after: 240 }
        }),

        // Section 14
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun("14. GOVERNING LAW")],
          spacing: { before: 240, after: 120 }
        }),

        new Paragraph({
          children: [new TextRun("This Agreement is governed by and construed in accordance with the laws of the State of Delaware, without regard to conflicts of law principles.")]
        }),

        new Paragraph({
          spacing: { after: 360 }
        }),

        // Signature section
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun("SIGNATURE BLOCK")],
          spacing: { before: 240, after: 240 }
        }),

        new Paragraph({
          children: [new TextRun("By signing below, both parties agree to the terms of this Expert Agreement.")]
        }),

        new Paragraph({
          spacing: { after: 240 }
        }),

        // For Company
        new Paragraph({
          children: [new TextRun({ text: "FOR EZORAIINC.", bold: true })]
        }),

        new Paragraph({
          spacing: { after: 60 }
        }),

        new Paragraph({
          children: [new TextRun("Authorized Representative (Print Name):")]
        }),

        new Paragraph({
          children: [
            new TextRun("_".repeat(50))
          ]
        }),

        new Paragraph({
          spacing: { after: 60 }
        }),

        new Paragraph({
          children: [new TextRun("Signature:")]
        }),

        new Paragraph({
          children: [
            new TextRun("_".repeat(50))
          ]
        }),

        new Paragraph({
          spacing: { after: 60 }
        }),

        new Paragraph({
          children: [new TextRun("Title:")]
        }),

        new Paragraph({
          children: [
            new TextRun("_".repeat(50))
          ]
        }),

        new Paragraph({
          spacing: { after: 60 }
        }),

        new Paragraph({
          children: [new TextRun("Date:")]
        }),

        new Paragraph({
          children: [
            new TextRun("_".repeat(50))
          ]
        }),

        new Paragraph({
          spacing: { after: 240 }
        }),

        // For Expert
        new Paragraph({
          children: [new TextRun({ text: "FOR EXPERT", bold: true })]
        }),

        new Paragraph({
          spacing: { after: 60 }
        }),

        new Paragraph({
          children: [new TextRun("Expert Name (Print):")]
        }),

        new Paragraph({
          children: [
            new TextRun("_".repeat(50))
          ]
        }),

        new Paragraph({
          spacing: { after: 60 }
        }),

        new Paragraph({
          children: [new TextRun("Signature:")]
        }),

        new Paragraph({
          children: [
            new TextRun("_".repeat(50))
          ]
        }),

        new Paragraph({
          spacing: { after: 60 }
        }),

        new Paragraph({
          children: [new TextRun("Date:")]
        }),

        new Paragraph({
          children: [
            new TextRun("_".repeat(50))
          ]
        }),

        new Paragraph({
          spacing: { after: 60 }
        }),

        new Paragraph({
          children: [new TextRun("Email:")]
        }),

        new Paragraph({
          children: [
            new TextRun("_".repeat(50))
          ]
        })
      ]
    }
  ]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("/sessions/keen-epic-bardeen/mnt/EzoraAI-Ops/EzoraAI/Legal/EzoraAI_Expert_Agreement.docx", buffer);
  console.log("✓ Expert Agreement created successfully");
  process.exit(0);
}).catch(err => {
  console.error("Error:", err);
  process.exit(1);
});
