const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
        Header, Footer, AlignmentType, PageNumber, BorderStyle, WidthType,
        ShadingType, VerticalAlign, HeadingLevel, LevelFormat } = require('docx');
const fs = require('fs');

// Get current date
const today = new Date();
const effectiveDate = today.toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
});

const border = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
const borders = { top: border, bottom: border, left: border, right: border };

const doc = new Document({
  styles: {
    default: {
      document: {
        run: { font: "Arial", size: 24 }, // 12pt
        paragraph: { spacing: { line: 360, lineRule: "auto" } }
      }
    },
    paragraphStyles: [
      {
        id: "Heading1",
        name: "Heading 1",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: { size: 32, bold: true, font: "Arial" }, // 16pt
        paragraph: {
          spacing: { before: 240, after: 120, line: 360, lineRule: "auto" },
          outlineLevel: 0
        }
      },
      {
        id: "Heading2",
        name: "Heading 2",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: { size: 28, bold: true, font: "Arial" }, // 14pt
        paragraph: {
          spacing: { before: 200, after: 100, line: 360, lineRule: "auto" },
          outlineLevel: 1
        }
      }
    ]
  },
  numbering: {
    config: [
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
  sections: [{
    properties: {
      page: {
        size: {
          width: 12240,  // US Letter: 8.5 inches in DXA
          height: 15840  // US Letter: 11 inches in DXA
        },
        margin: {
          top: 1440,     // 1 inch
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
            children: [
              new TextRun({
                text: "EzoraAI — Privacy Policy",
                bold: false,
                size: 22
              })
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 100 }
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
              new TextRun({
                children: [PageNumber.CURRENT]
              })
            ],
            alignment: AlignmentType.CENTER,
            spacing: { before: 100 }
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `Effective Date: ${effectiveDate}`,
                size: 20
              })
            ],
            alignment: AlignmentType.CENTER,
            spacing: { before: 40 }
          })
        ]
      })
    },
    children: [
      // DRAFT Notice
      new Paragraph({
        children: [
          new TextRun({
            text: "DRAFT — FOR LEGAL REVIEW",
            bold: true,
            size: 28,
            color: "D00000"
          })
        ],
        alignment: AlignmentType.CENTER,
        spacing: { after: 240 }
      }),

      // Title
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [
          new TextRun({
            text: "Privacy Policy",
            bold: true
          })
        ],
        alignment: AlignmentType.CENTER,
        spacing: { after: 120 }
      }),

      new Paragraph({
        children: [
          new TextRun({
            text: `Last Updated: ${effectiveDate}`
          })
        ],
        alignment: AlignmentType.CENTER,
        spacing: { after: 240 }
      }),

      // Section 1: Introduction
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("Introduction")]
      }),

      new Paragraph({
        children: [
          new TextRun("EzoraAI (&#x201C;we,&#x201D; &#x201C;us,&#x201D; &#x201C;our,&#x201D; or &#x201C;Company&#x201D;) operates the website and platform located at ")
        ],
        spacing: { after: 120 }
      }),

      new Paragraph({
        children: [
          new TextRun("https://ezora.ai"),
          new TextRun(" (the &#x201C;Platform&#x201D;) and related services. We are committed to protecting your privacy and ensuring you have a positive experience on our Platform.")
        ],
        spacing: { after: 120 }
      }),

      new Paragraph({
        children: [
          new TextRun("This Privacy Policy (&#x201C;Policy&#x201D;) explains:")
        ],
        spacing: { after: 100 }
      }),

      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("What information we collect")]
      }),

      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("How we use and process that information")]
      }),

      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("How we share your information with third parties")]
      }),

      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Your rights regarding your data")]
      }),

      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("How we protect your information")],
        spacing: { after: 200 }
      }),

      new Paragraph({
        children: [
          new TextRun("By accessing or using EzoraAI, you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy. If you do not agree with our practices, please do not use the Platform.")
        ],
        spacing: { after: 240 }
      }),

      // Section 2: Information We Collect
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("Information We Collect")]
      }),

      new Paragraph({
        children: [
          new TextRun("We collect information in various ways, including information you provide directly and information collected automatically through your use of the Platform.")
        ],
        spacing: { after: 120 }
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun({
          text: "2.1 Account and Registration Information",
          bold: true
        })],
        spacing: { after: 100 }
      }),

      new Paragraph({
        children: [
          new TextRun("When you create an account, we collect:")
        ],
        spacing: { after: 80 }
      }),

      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Full name")]
      }),

      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Email address")]
      }),

      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Account type/role selection (learner, business, or expert)")]
      }),

      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Password (hashed and encrypted, never stored in plain text)")],
        spacing: { after: 120 }
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun({
          text: "2.2 Profile and Professional Information",
          bold: true
        })],
        spacing: { after: 100 }
      }),

      new Paragraph({
        children: [
          new TextRun("For expert and business users, we collect additional information:")
        ],
        spacing: { after: 80 }
      }),

      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Professional biography and background")]
      }),

      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Skills and expertise areas")]
      }),

      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Portfolio items, case studies, and project examples")]
      }),

      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Profile photo or avatar")]
      }),

      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Certifications, credentials, and qualifications")]
      }),

      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Hourly rates or pricing information")],
        spacing: { after: 120 }
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun({
          text: "2.3 Payment Information",
          bold: true
        })],
        spacing: { after: 100 }
      }),

      new Paragraph({
        children: [
          new TextRun("We partner with Stripe for secure payment processing. When you make a subscription payment or complete a transaction, we collect:")
        ],
        spacing: { after: 80 }
      }),

      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Billing name and address")]
      }),

      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Payment method (credit card, bank account, etc.)")]
      }),

      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Transaction history")]
      }),

      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Subscription plan details")]
      }),

      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun({
          text: "We do NOT store complete credit card numbers. Payment card data is encrypted by Stripe and compliant with PCI-DSS standards.",
          italics: true
        })],
        spacing: { after: 120 }
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun({
          text: "2.4 Usage and Activity Data",
          bold: true
        })],
        spacing: { after: 100 }
      }),

      new Paragraph({
        children: [
          new TextRun("We automatically collect information about your interactions with the Platform:")
        ],
        spacing: { after: 80 }
      }),

      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Session history and duration")]
      }),

      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Pages and features accessed")]
      }),

      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Search queries")]
      }),

      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Clicks and interactions")]
      }),

      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Coaching sessions or project engagements accessed")],
        spacing: { after: 120 }
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun({
          text: "2.5 Device and Technical Data",
          bold: true
        })],
        spacing: { after: 100 }
      }),

      new Paragraph({
        children: [
          new TextRun("We collect technical information about your device and connection:")
        ],
        spacing: { after: 80 }
      }),

      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("IP address")]
      }),

      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Browser type and version")]
      }),

      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Operating system")]
      }),

      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Device type (mobile, desktop, tablet)")]
      }),

      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Approximate geographic location (city-level, derived from IP)")],
        spacing: { after: 120 }
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun({
          text: "2.6 Communications",
          bold: true
        })],
        spacing: { after: 100 }
      }),

      new Paragraph({
        children: [
          new TextRun("We collect and retain:")
        ],
        spacing: { after: 80 }
      }),

      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Support inquiries and tickets")]
      }),

      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("In-session chat logs between users and experts")]
      }),

      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Messages, emails, and feedback")]
      }),

      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Complaints or dispute records")],
        spacing: { after: 240 }
      }),

      // Section 3: How We Use Your Information
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("How We Use Your Information")]
      }),

      new Paragraph({
        children: [
          new TextRun("We use your information for the following purposes:")
        ],
        spacing: { after: 100 }
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun({
          text: "3.1 Service Delivery",
          bold: true
        })],
        spacing: { after: 80 }
      }),

      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Create and manage your account")]
      }),

      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Enable matchmaking between learners, businesses, and experts")]
      }),

      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Facilitate coaching sessions, projects, and transactions")]
      }),

      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Provide customer support and technical assistance")],
        spacing: { after: 120 }
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun({
          text: "3.2 Payments and Billing",
          bold: true
        })],
        spacing: { after: 80 }
      }),

      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Process subscription payments and transaction fees")]
      }),

      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Issue invoices and receipts")]
      }),

      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Send payment reminders and billing notifications")],
        spacing: { after: 120 }
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun({
          text: "3.3 Platform Analytics and Improvement",
          bold: true
        })],
        spacing: { after: 80 }
      }),

      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Analyze usage patterns and platform performance")]
      }),

      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Improve features, user experience, and functionality")]
      }),

      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Conduct research and develop new services")],
        spacing: { after: 120 }
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun({
          text: "3.4 Marketing Communications",
          bold: true
        })],
        spacing: { after: 80 }
      }),

      new Paragraph({
        children: [
          new TextRun("We may use your email address to send:")
        ],
        spacing: { after: 80 }
      }),

      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Platform updates and service announcements")]
      }),

      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Promotional offers and feature highlights")]
      }),

      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Educational content and industry news")]
      }),

      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun({
          text: "You may opt out of marketing communications at any time by clicking &#x201C;Unsubscribe&#x201D; in any email or updating your notification preferences.",
          italics: true
        })],
        spacing: { after: 120 }
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun({
          text: "3.5 Fraud Prevention and Security",
          bold: true
        })],
        spacing: { after: 80 }
      }),

      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Detect and prevent fraudulent transactions")]
      }),

      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Investigate unauthorized access or abuse")]
      }),

      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Enforce our Terms of Service and other agreements")],
        spacing: { after: 120 }
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun({
          text: "3.6 Blockchain Credential Recording",
          bold: true
        })],
        spacing: { after: 80 }
      }),

      new Paragraph({
        children: [
          new TextRun("EzoraAI uses blockchain technology to create immutable, publicly verifiable records of expert credentials and verified achievements. See Section 5 (Blockchain Data) for details on what information is recorded on-chain.")
        ],
        spacing: { after: 240 }
      }),

      // Section 4: How We Share Your Information
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("How We Share Your Information")]
      }),

      new Paragraph({
        children: [
          new TextRun("We may share your information with third parties in the following circumstances:")
        ],
        spacing: { after: 100 }
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun({
          text: "4.1 Service Providers",
          bold: true
        })],
        spacing: { after: 80 }
      }),

      new Paragraph({
        children: [
          new TextRun("We share necessary information with third-party service providers who assist us in operating the Platform:")
        ],
        spacing: { after: 80 }
      }),

      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun({
          text: "Stripe: ",
          bold: true
        }), new TextRun("Payment processing, subscription management, and payout distribution. Stripe maintains PCI-DSS compliance.")]
      }),

      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun({
          text: "Analytics Providers: ",
          bold: true
        }), new TextRun("Usage analytics and performance monitoring (e.g., Google Analytics). We may anonymize or aggregate data.")]
      }),

      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun({
          text: "Cloud Infrastructure: ",
          bold: true
        }), new TextRun("Hosting, storage, and backup services.")]
      }),

      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun({
          text: "Communication Platforms: ",
          bold: true
        }), new TextRun("Email delivery, support chat (Circle.io for community), and messaging systems.")],
        spacing: { after: 120 }
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun({
          text: "4.2 Between Platform Users",
          bold: true
        })],
        spacing: { after: 80 }
      }),

      new Paragraph({
        children: [
          new TextRun("To facilitate marketplace transactions, we share relevant information between users:")
        ],
        spacing: { after: 80 }
      }),

      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Learners and Businesses see expert profiles (name, bio, skills, ratings, verified credentials)")]
      }),

      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Experts see limited learner/business profiles necessary for session context")]
      }),

      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("In-session communications are shared only with active session participants")]
      }),

      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Transaction and engagement history may be visible to matched parties")],
        spacing: { after: 120 }
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun({
          text: "4.3 Legal and Compliance",
          bold: true
        })],
        spacing: { after: 80 }
      }),

      new Paragraph({
        children: [
          new TextRun("We may disclose information when required by law or to:")
        ],
        spacing: { after: 80 }
      }),

      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Comply with legal processes, court orders, or government requests")]
      }),

      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Protect EzoraAI against legal liability")]
      }),

      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Enforce our Terms of Service or other agreements")]
      }),

      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Protect the safety, security, or rights of our users")],
        spacing: { after: 120 }
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun({
          text: "4.4 Blockchain (Public Records)",
          bold: true
        })],
        spacing: { after: 80 }
      }),

      new Paragraph({
        children: [
          new TextRun("Expert credentials and verified achievements are recorded on a public blockchain. See Section 5 for full details on what data is and is not publicly visible.")
        ],
        spacing: { after: 120 }
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun({
          text: "4.5 Business Transfers",
          bold: true
        })],
        spacing: { after: 80 }
      }),

      new Paragraph({
        children: [
          new TextRun("If EzoraAI is involved in a merger, acquisition, bankruptcy, or asset sale, your information may be transferred as part of that transaction. We will provide notice before your data becomes subject to a different privacy policy.")
        ],
        spacing: { after: 240 }
      }),

      // Section 5: Blockchain Data
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("Blockchain Data")]
      }),

      new Paragraph({
        children: [
          new TextRun("A core differentiator of EzoraAI is the use of blockchain technology to create immutable, on-chain records of verified expert credentials. This section explains what data is recorded and what remains private.")
        ],
        spacing: { after: 120 }
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun({
          text: "5.1 What Gets Recorded On-Chain (Public)",
          bold: true
        })],
        spacing: { after: 80 }
      }),

      new Paragraph({
        children: [
          new TextRun("The following information ")
        ],
        spacing: { after: 80 }
      }),

      new Paragraph({
        children: [
          new TextRun({
            text: "may",
            italics: true
          }),
          new TextRun(" be recorded on a public blockchain:")
        ],
        spacing: { after: 80 }
      }),

      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Expert wallet address or pseudonymous identifier")]
      }),

      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Name or professional pseudonym")]
      }),

      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Verified certifications and credentials")]
      }),

      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Number of completed sessions/projects (anonymized count)")]
      }),

      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Aggregate ratings or performance metrics")]
      }),

      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Proof-of-work metadata (transaction hash, timestamp)")],
        spacing: { after: 120 }
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun({
          text: "5.2 What Remains Private (Not On-Chain)",
          bold: true
        })],
        spacing: { after: 80 }
      }),

      new Paragraph({
        children: [
          new TextRun("The following sensitive information is ")
        ],
        spacing: { after: 80 }
      }),

      new Paragraph({
        children: [
          new TextRun({
            text: "NOT",
            bold: true
          }),
          new TextRun(" recorded on the public blockchain:")
        ],
        spacing: { after: 80 }
      }),

      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Email addresses and contact information")]
      }),

      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Payment information or banking details")]
      }),

      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Session chat logs or conversations")]
      }),

      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Portfolio items or detailed project descriptions")]
      }),

      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("IP addresses or device identifiers")]
      }),

      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Geographic location or personal identifiers")],
        spacing: { after: 120 }
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun({
          text: "5.3 Immutability and Permanence",
          bold: true
        })],
        spacing: { after: 80 }
      }),

      new Paragraph({
        children: [
          new TextRun("Once credential records are written to the blockchain, they are ")
        ],
        spacing: { after: 80 }
      }),

      new Paragraph({
        children: [
          new TextRun({
            text: "immutable and cannot be deleted or modified.",
            bold: true
          })
        ],
        spacing: { after: 120 }
      }),

      new Paragraph({
        children: [
          new TextRun("This is by design—it ensures the integrity and trust of verified expert credentials. If you have concerns about what information is being recorded on-chain, please contact us at privacy@ezora.ai before it is recorded.")
        ],
        spacing: { after: 240 }
      }),

      // Section 6: Data Retention
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("Data Retention")]
      }),

      new Paragraph({
        children: [
          new TextRun("We retain your information for as long as necessary to provide services, comply with legal obligations, resolve disputes, and enforce agreements:")
        ],
        spacing: { after: 100 }
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun({
          text: "6.1 Active Account Data",
          bold: true
        })],
        spacing: { after: 80 }
      }),

      new Paragraph({
        children: [
          new TextRun("Account, profile, and payment information is retained while your account is active and for 7 years after termination (to satisfy tax and financial audit requirements).")
        ],
        spacing: { after: 120 }
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun({
          text: "6.2 Session and Communication Logs",
          bold: true
        })],
        spacing: { after: 80 }
      }),

      new Paragraph({
        children: [
          new TextRun("In-session chat logs and communications are retained for 3 years after session completion for dispute resolution and quality assurance.")
        ],
        spacing: { after: 120 }
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun({
          text: "6.3 Technical and Usage Data",
          bold: true
        })],
        spacing: { after: 80 }
      }),

      new Paragraph({
        children: [
          new TextRun("Log files, analytics data, and technical information are typically retained for 12 months.")
        ],
        spacing: { after: 120 }
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun({
          text: "6.4 Account Deletion",
          bold: true
        })],
        spacing: { after: 80 }
      }),

      new Paragraph({
        children: [
          new TextRun("If you delete your account, we will remove or anonymize your personal data from our active systems within 30 days, except where required to maintain records for legal, tax, or contractual purposes. Blockchain records cannot be deleted and will remain immutable.")
        ],
        spacing: { after: 240 }
      }),

      // Section 7: Your Rights
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("Your Rights")]
      }),

      new Paragraph({
        children: [
          new TextRun("Depending on your location, you may have certain rights regarding your personal information:")
        ],
        spacing: { after: 100 }
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun({
          text: "7.1 Right to Access",
          bold: true
        })],
        spacing: { after: 80 }
      }),

      new Paragraph({
        children: [
          new TextRun("You have the right to request a copy of the personal information we hold about you. To submit a request, email privacy@ezora.ai with &#x201C;Data Access Request&#x201D; in the subject line.")
        ],
        spacing: { after: 120 }
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun({
          text: "7.2 Right to Correction",
          bold: true
        })],
        spacing: { after: 80 }
      }),

      new Paragraph({
        children: [
          new TextRun("You may correct inaccurate or incomplete information by logging into your account or contacting us.")
        ],
        spacing: { after: 120 }
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun({
          text: "7.3 Right to Deletion (Right to be Forgotten)",
          bold: true
        })],
        spacing: { after: 80 }
      }),

      new Paragraph({
        children: [
          new TextRun("You may request deletion of your personal data, subject to legal retention requirements. We will process requests within 30 days. However, deletion requests do not extend to blockchain records, which are immutable.")
        ],
        spacing: { after: 120 }
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun({
          text: "7.4 Right to Data Portability",
          bold: true
        })],
        spacing: { after: 80 }
      }),

      new Paragraph({
        children: [
          new TextRun("You may request a structured, machine-readable copy of your personal data. We will provide this in a common format (e.g., CSV or JSON) within 30 days.")
        ],
        spacing: { after: 120 }
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun({
          text: "7.5 Right to Opt-Out of Marketing",
          bold: true
        })],
        spacing: { after: 80 }
      }),

      new Paragraph({
        children: [
          new TextRun("You may unsubscribe from promotional emails at any time by clicking &#x201C;Unsubscribe&#x201D; or updating your preferences in your account settings.")
        ],
        spacing: { after: 120 }
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun({
          text: "7.6 GDPR Rights (EU/EEA Users)",
          bold: true
        })],
        spacing: { after: 80 }
      }),

      new Paragraph({
        children: [
          new TextRun("If you are in the European Union, you also have the right to lodge a complaint with your local Data Protection Authority.")
        ],
        spacing: { after: 120 }
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun({
          text: "7.7 CCPA Rights (California Residents)",
          bold: true
        })],
        spacing: { after: 80 }
      }),

      new Paragraph({
        children: [
          new TextRun("California residents have additional rights under the California Consumer Privacy Act (CCPA), including the right to know, delete, and opt-out of the sale of personal information (though we do not sell personal information).")
        ],
        spacing: { after: 240 }
      }),

      // Section 8: Cookies and Tracking
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("Cookies and Tracking")]
      }),

      new Paragraph({
        children: [
          new TextRun("We use cookies and similar tracking technologies to enhance your experience:")
        ],
        spacing: { after: 100 }
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun({
          text: "8.1 Types of Cookies",
          bold: true
        })],
        spacing: { after: 80 }
      }),

      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun({
          text: "Essential Cookies: ",
          bold: true
        }), new TextRun("Required for login, session management, and security.")]
      }),

      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun({
          text: "Performance Cookies: ",
          bold: true
        }), new TextRun("Collect information about how you use the Platform (via Google Analytics).")]
      }),

      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun({
          text: "Preference Cookies: ",
          bold: true
        }), new TextRun("Remember your settings and preferences.")],
        spacing: { after: 120 }
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun({
          text: "8.2 Managing Cookies",
          bold: true
        })],
        spacing: { after: 80 }
      }),

      new Paragraph({
        children: [
          new TextRun("Most web browsers allow you to refuse cookies or alert you when cookies are being sent. You can also opt out of Google Analytics tracking through the Google Analytics opt-out browser extension.")
        ],
        spacing: { after: 240 }
      }),

      // Section 9: Third-Party Services
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("Third-Party Services")]
      }),

      new Paragraph({
        children: [
          new TextRun("Our Platform integrates with the following third-party services. Their privacy practices are governed by their own privacy policies:")
        ],
        spacing: { after: 100 }
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun({
          text: "9.1 Stripe",
          bold: true
        })],
        spacing: { after: 80 }
      }),

      new Paragraph({
        children: [
          new TextRun("Payment processing and subscription management. See Stripe&#x2019;s Privacy Policy at https://stripe.com/privacy.")
        ],
        spacing: { after: 120 }
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun({
          text: "9.2 Google Analytics",
          bold: true
        })],
        spacing: { after: 80 }
      }),

      new Paragraph({
        children: [
          new TextRun("Platform usage analytics and performance metrics. See Google&#x2019;s Privacy Policy at https://policies.google.com/privacy.")
        ],
        spacing: { after: 120 }
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun({
          text: "9.3 Circle.io",
          bold: true
        })],
        spacing: { after: 80 }
      }),

      new Paragraph({
        children: [
          new TextRun("Community platform and messaging. See Circle.io&#x2019;s Privacy Policy at https://circle.so/privacy.")
        ],
        spacing: { after: 240 }
      }),

      // Section 10: Children's Privacy
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("Children&#x2019;s Privacy")]
      }),

      new Paragraph({
        children: [
          new TextRun("EzoraAI is not intended for individuals under 18 years of age. We do not knowingly collect personal information from children under 18. If we become aware that we have collected information from a minor, we will delete it promptly. If you believe we have collected information from a child, please contact us at privacy@ezora.ai.")
        ],
        spacing: { after: 240 }
      }),

      // Section 11: Security Measures
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("Security Measures")]
      }),

      new Paragraph({
        children: [
          new TextRun("We implement industry-standard technical and organizational security measures to protect your data:")
        ],
        spacing: { after: 100 }
      }),

      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("End-to-end encryption for payment data")]
      }),

      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("TLS/SSL encryption for data in transit")]
      }),

      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Encrypted storage for sensitive data at rest")]
      }),

      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Secure password hashing and salting")]
      }),

      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Regular security audits and penetration testing")]
      }),

      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Stripe&#x2019;s PCI-DSS Level 1 compliance for payment data")]
      }),

      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Two-factor authentication (2FA) available for account protection")],
        spacing: { after: 120 }
      }),

      new Paragraph({
        children: [
          new TextRun({
            text: "No method of internet transmission or storage is 100% secure. While we implement strong security measures, we cannot guarantee absolute security of your data.",
            italics: true
          })
        ],
        spacing: { after: 240 }
      }),

      // Section 12: International Data Transfers
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("International Data Transfers")]
      }),

      new Paragraph({
        children: [
          new TextRun("EzoraAI is based in the United States. If you are accessing our Platform from outside the US, please be aware that:")
        ],
        spacing: { after: 100 }
      }),

      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Your information will be transferred to and processed in the United States")]
      }),

      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("US data protection laws may differ from your home country")]
      }),

      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("By using EzoraAI, you consent to the transfer of your information to the US")]
      }),

      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("For EU/EEA users, we rely on Standard Contractual Clauses (SCCs) to facilitate lawful data transfers.")],
        spacing: { after: 240 }
      }),

      // Section 13: Changes to This Policy
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("Changes to This Policy")]
      }),

      new Paragraph({
        children: [
          new TextRun("We may update this Privacy Policy from time to time to reflect changes in our practices, technology, or legal requirements. Material changes will be communicated to you via email or a prominent notice on the Platform at least 30 days before taking effect.")
        ],
        spacing: { after: 120 }
      }),

      new Paragraph({
        children: [
          new TextRun("Your continued use of the Platform after such notice constitutes your acceptance of the updated Privacy Policy.")
        ],
        spacing: { after: 240 }
      }),

      // Section 14: Contact Information
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("Contact Information")]
      }),

      new Paragraph({
        children: [
          new TextRun("If you have questions, concerns, or wish to exercise any of your rights under this Privacy Policy, please contact us:")
        ],
        spacing: { after: 100 }
      }),

      new Paragraph({
        children: [
          new TextRun({
            text: "Email: ",
            bold: true
          }),
          new TextRun("privacy@ezora.ai")
        ],
        spacing: { after: 80 }
      }),

      new Paragraph({
        children: [
          new TextRun({
            text: "Address: ",
            bold: true
          }),
          new TextRun("EzoraAI, Inc.")
        ],
        spacing: { after: 80 }
      }),

      new Paragraph({
        children: [
          new TextRun("We will respond to requests within 30 business days.")
        ],
        spacing: { after: 240 }
      }),

      new Paragraph({
        children: [
          new TextRun({
            text: "———",
            italics: true
          })
        ],
        alignment: AlignmentType.CENTER,
        spacing: { before: 240, after: 120 }
      }),

      new Paragraph({
        children: [
          new TextRun({
            text: `This Privacy Policy is effective as of ${effectiveDate}.`,
            italics: true
          })
        ],
        alignment: AlignmentType.CENTER,
        spacing: { after: 0 }
      })
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync(
    "/sessions/keen-epic-bardeen/mnt/EzoraAI-Ops/EzoraAI/Legal/EzoraAI_Privacy_Policy.docx",
    buffer
  );
  console.log("Privacy Policy document created successfully!");
});
