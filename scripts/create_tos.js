const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, Header, Footer,
        AlignmentType, HeadingLevel, BorderStyle, WidthType, ShadingType, VerticalAlign, PageNumber } = require('docx');
const fs = require('fs');
const path = require('path');

// Current date
const effectiveDate = "March 29, 2026";

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
        run: { size: 32, bold: true, font: "Arial", color: "0B1224" }, // 16pt, navy
        paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 0 }
      },
      {
        id: "Heading2",
        name: "Heading 2",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: { size: 28, bold: true, font: "Arial", color: "0B1224" }, // 14pt, navy
        paragraph: { spacing: { before: 180, after: 100 }, outlineLevel: 1 }
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
            format: "decimal",
            text: "%1.",
            alignment: "left",
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
          width: 12240,   // 8.5 inches
          height: 15840   // 11 inches
        },
        margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } // 1 inch margins
      }
    },
    headers: {
      default: new Header({
        children: [
          new Paragraph({
            children: [new TextRun("EzoraAI &#x2014; Terms of Service")],
            spacing: { after: 200 }
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
              new TextRun({ children: [PageNumber.CURRENT] }),
              new TextRun("\t\tEffective Date: " + effectiveDate)
            ],
            tabStops: [{ type: "right", position: 9360 }]
          })
        ]
      })
    },
    children: [
      // Watermark text
      new Paragraph({
        children: [new TextRun({
          text: "DRAFT &#x2014; FOR LEGAL REVIEW",
          italic: true,
          color: "CC0000"
        })],
        spacing: { after: 240 }
      }),

      // Title
      new Paragraph({
        children: [new TextRun({
          text: "TERMS OF SERVICE",
          size: 32,
          bold: true,
          font: "Arial",
          color: "0B1224"
        })],
        alignment: "center",
        spacing: { after: 120 }
      }),

      new Paragraph({
        children: [new TextRun({
          text: "EzoraAI",
          size: 28,
          bold: true,
          font: "Arial",
          color: "0B1224"
        })],
        alignment: "center",
        spacing: { after: 240 }
      }),

      // Intro paragraph
      new Paragraph({
        children: [new TextRun("These Terms of Service (&#x201C;Terms&#x201D;) govern your use of the EzoraAI platform (the &#x201C;Platform&#x201D;), including the website at ezora.ai and all associated services, features, and content. By accessing or using the Platform, you agree to be bound by these Terms. If you do not agree to all of these Terms, do not use the Platform.")],
        spacing: { after: 240 }
      }),

      // Section 1: Acceptance of Terms
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("1. Acceptance of Terms")]
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("By clicking &#x201C;I Agree&#x201D; or by accessing and using the Platform, you acknowledge that you have read, understood, and agree to be bound by these Terms, as well as our Privacy Policy and any other policies posted on the Platform.")]
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("These Terms apply to all users, including Experts (service providers), Users (individuals and businesses seeking services), and any other party accessing the Platform for any reason.")]
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("We may update these Terms from time to time. Material changes will require 30 days&#x2019; notice to you. Your continued use after such changes indicates your acceptance of the modified Terms.")],
        spacing: { after: 240 }
      }),

      // Section 2: Description of Service
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("2. Description of Service")]
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("EzoraAI operates a dual-sided marketplace connecting AI Experts with Users and businesses seeking AI expertise and services. The Platform facilitates introductions, session bookings, and payments between users and experts.")]
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("EzoraAI is not an employer, employment agency, recruiter, or broker. We do not provide employment, and Experts are independent contractors who set their own rates, availability, and service offerings.")]
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("We are not party to, and have no liability for, contracts, disputes, or transactions between Users and Experts conducted outside the Platform or through the Platform.")]
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("The Platform includes blockchain-based proof-of-work credentials to verify expert backgrounds. See Section 11 for details on limitations.")],
        spacing: { after: 240 }
      }),

      // Section 3: Account Registration
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("3. Account Registration")]
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("To use the Platform, you must be at least 18 years old and capable of entering into a binding contract.")]
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("You must provide accurate, current, and complete information when registering. You are solely responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.")]
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("You agree to notify us immediately of any unauthorized access or use of your account. We are not liable for losses incurred due to unauthorized use of your credentials.")]
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("You may not use the Platform to impersonate another person, create a false identity, or misrepresent your affiliation with any person or entity.")]
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("We reserve the right to verify the identity and eligibility of all users.")],
        spacing: { after: 240 }
      }),

      // Section 4: User Roles
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("4. User Roles")]
      }),
      new Paragraph({
        children: [new TextRun({
          text: "Users:",
          bold: true
        })]
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Individuals and businesses seeking AI expertise, training, coaching, or consultation. Users browse expert profiles, book sessions, and pay for services through the Platform.")]
      }),
      new Paragraph({
        children: [new TextRun({
          text: "Experts:",
          bold: true
        })],
        spacing: { before: 100 }
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Independent contractors offering AI expertise, services, courses, tools, or consulting. Experts set their own rates (ranging from $40 to $100 per session or as specified), availability, and terms. Experts are solely responsible for payment of taxes, insurance, and other legal obligations.")],
        spacing: { after: 240 }
      }),

      // Section 5: Session Booking and Payments
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("5. Session Booking and Payments")]
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Users can book sessions with Experts through the Platform. The Expert sets the session rate ($40&#x2013;$100 per session or as otherwise specified). The User agrees to pay the session rate at the time of booking.")]
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("All payments are processed through Stripe Connect, our third-party payment processor. By completing a payment, you authorize the payment processor to charge your payment method.")]
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("EzoraAI retains 15&#x2013;20% of each session payment as a platform fee. Founding Experts may receive a reduced rate of 10%. The Expert receives the remaining balance minus payment processing fees.")]
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Payments are settled to the Expert&#x2019;s designated bank account on a regular schedule (typically within 5&#x2013;7 business days after the session). Payment timing is determined by Stripe Connect and may vary.")]
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("By using the Platform, you acknowledge that you have reviewed and accept Stripe Connect&#x2019;s terms of service.")]
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("EzoraAI is not responsible for payment delays, failed transactions, or disputes with Stripe or your payment provider. Contact Stripe directly for payment issues.")]
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("You agree that all transactions are final and non-refundable, except as expressly provided in our Refund Policy (Section 7).")]
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("EzoraAI may adjust platform fees with 30 days&#x2019; notice to you.")],
        spacing: { after: 240 }
      }),

      // Section 6: Fees and Pricing
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("6. Fees and Pricing")]
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Platform Fee: EzoraAI charges 15&#x2013;20% of each session payment (10% for Founding Experts). This is the only mandatory fee for session-based transactions.")]
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Premium Membership (Optional): Users and Experts may subscribe to premium features for $24.99 per month. Premium memberships provide enhanced visibility, analytics, and priority support. Subscriptions renew automatically until canceled.")]
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Additional Premium Services: We may offer advanced tools, featured listings, credential verification badges, and other premium services at published prices.")]
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("No Hidden Fees: All fees are disclosed in advance. You will see a complete fee breakdown before confirming any payment.")]
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Price Changes: We reserve the right to modify our fees with 30 days&#x2019; prior written notice. Continued use after the notice period constitutes acceptance of new fees.")]
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Payment processing fees charged by Stripe are the responsibility of the payer (in most cases, the User or Expert).")]
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Taxes: Users and Experts are responsible for calculating and paying all applicable federal, state, and local taxes on their transactions.")]
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("EzoraAI will issue 1099 forms (or equivalent) to Experts earning over $600 annually through the Platform, as required by U.S. law.")],
        spacing: { after: 240 }
      }),

      // Section 7: Cancellation and Refunds
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("7. Cancellation and Refunds")]
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Session Cancellations: Users may cancel sessions with at least 24 hours&#x2019; notice for a full refund. Sessions canceled with less than 24 hours&#x2019; notice are non-refundable unless otherwise agreed by the Expert. Experts may also cancel with appropriate notice to the User.")]
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Premium Membership Cancellation: Premium memberships may be canceled at any time through your account settings. Cancellations take effect at the end of the current billing cycle. No prorated refunds are offered.")]
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Refund Disputes: For detailed refund policies and dispute procedures, see our separate Refund Policy. All refund requests must be submitted within 7 days of the transaction.")]
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Processing Time: Approved refunds are typically processed within 5&#x2013;10 business days to your original payment method.")]
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("EzoraAI Discretion: We may issue partial or full refunds at our sole discretion in cases of service failure, platform error, or other exceptional circumstances.")],
        spacing: { after: 240 }
      }),

      // Section 8: Expert Obligations
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("8. Expert Obligations")]
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Accurate Representation: You agree to accurately represent your skills, experience, qualifications, certifications, and availability. Misrepresentation is grounds for immediate account termination.")]
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Professional Conduct: You agree to conduct all sessions professionally, on time, and in accordance with any agreed-upon terms. You will not engage in harassment, discrimination, or unlawful conduct.")]
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Independent Contractor Status: You acknowledge that you are an independent contractor, not an employee of EzoraAI. You are solely responsible for all taxes, insurance, licenses, and legal compliance related to your services.")]
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Intellectual Property: Your services may include tools, materials, training content, or other intellectual property that you own or have licensed. You warrant that you have the right to provide these materials and that they do not infringe third-party rights.")]
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Compliance with Laws: You agree to comply with all applicable federal, state, and local laws, including tax and employment regulations. You will not offer services that are illegal or violate regulatory requirements.")]
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Confidentiality: You agree to maintain the confidentiality of any proprietary information shared by Users during sessions, except as required by law.")],
        spacing: { after: 240 }
      }),

      // Section 9: User Obligations
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("9. User Obligations")]
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Respectful Conduct: You agree to treat all Experts with respect and professionalism. You will not engage in harassment, discrimination, intimidation, or offensive behavior.")]
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Honest Reviews: You agree to leave honest and accurate reviews of Experts and sessions. False, defamatory, or fraudulent reviews are prohibited and may result in account termination.")]
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("No Solicitation: You agree not to solicit or contact Experts directly to conduct business outside of the Platform or to circumvent Platform fees. This includes requesting payment outside the Platform or sharing contact information for off-platform transactions.")]
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Payment Responsibility: You agree that all payments are your responsibility and that you have authorized the payment method used at the time of booking.")]
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Lawful Use: You agree to use the Platform only for lawful purposes and in compliance with all applicable laws and regulations.")],
        spacing: { after: 240 }
      }),

      // Section 10: Intellectual Property
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("10. Intellectual Property")]
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("EzoraAI Ownership: EzoraAI owns all intellectual property in the Platform, including the website, software, design, logos, trademarks, and content (unless otherwise attributed). You may not reproduce, distribute, or use Platform materials without our permission.")]
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Expert Content: Experts retain ownership of their own content, materials, courses, tools, and intellectual property. By providing services through the Platform, Experts grant EzoraAI a limited, non-exclusive license to display their profile, descriptions, and promotional materials on the Platform.")]
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("User License: Your right to use the Platform is limited to a personal, non-transferable, revocable license for lawful purposes only. You may not sell, license, lease, or otherwise exploit the Platform or any part of it.")]
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("No Scraping or Data Mining: You agree not to scrape, crawl, data-mine, or use any automated tools to extract data from the Platform or reproduce Expert listings, profiles, or content.")],
        spacing: { after: 240 }
      }),

      // Section 11: Blockchain Verification
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("11. Blockchain Verification")]
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Credentials: EzoraAI uses blockchain-based proof-of-work technology to record and verify Expert credentials, ratings, and transaction history. These records are immutable and publicly verifiable.")]
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Verification Scope: Blockchain credentials verify only the transactions and ratings recorded on the EzoraAI Platform. They do not guarantee the accuracy of an Expert&#x2019;s claimed skills, background, or qualifications outside of what is verifiable through Platform activity.")]
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("User Responsibility: Users are responsible for conducting their own due diligence before booking with an Expert. Read profiles, reviews, credentials, and interview the Expert if needed. EzoraAI is not responsible for misrepresentations by Experts.")]
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("No Guarantee: While blockchain records are immutable, they do not guarantee service quality, Expert competence, or satisfaction. Blockchain verification is an additional trust mechanism, not a guarantee.")]
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Legal Compliance: EzoraAI complies with applicable data protection and privacy laws in storing and publishing blockchain credentials.")],
        spacing: { after: 240 }
      }),

      // Section 12: Prohibited Conduct
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("12. Prohibited Conduct")]
      }),
      new Paragraph({
        children: [new TextRun("You agree not to use the Platform to:")]
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Commit fraud, impersonation, or identity theft")]
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Engage in harassment, threats, bullying, or defamation")]
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Violate intellectual property rights or copyright")]
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Circumvent Platform fees by conducting off-platform transactions")]
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Scrape, crawl, or data-mine Platform data")]
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Transmit viruses, malware, or harmful code")]
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Engage in illegal activity or violation of laws")]
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Engage in discriminatory conduct or hate speech")]
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Manipulate ratings, reviews, or use bot accounts")]
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Spam, advertise other services, or solicit off-platform business")],
        spacing: { after: 240 }
      }),

      // Section 13: Limitation of Liability
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("13. Limitation of Liability")]
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Disclaimer: EzoraAI provides the Platform &#x201C;as is&#x201D; and &#x201C;as available.&#x201D; We make no warranties, express or implied, regarding the Platform&#x2019;s fitness for any particular purpose, merchantability, or non-infringement.")]
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Expert Services: EzoraAI is not responsible for the quality, legality, accuracy, or completeness of services provided by Experts. You use Expert services at your own risk. EzoraAI is not a party to, and disclaims liability for, Expert-User disputes.")]
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("No Warranty: We do not warrant that the Platform will be uninterrupted, error-free, or secure. We are not liable for downtime, data loss, or technical failures.")]
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Limitation: EzoraAI&#x2019;s total liability arising from or relating to these Terms, the Platform, or your use thereof shall not exceed the total amount you paid to EzoraAI in the 12 months preceding the claim, or $100, whichever is greater.")]
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Exclusion: In no event shall EzoraAI be liable for indirect, incidental, special, consequential, or punitive damages, including lost profits, even if advised of the possibility of such damages.")]
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Some jurisdictions do not allow the limitation or exclusion of liability, so some of the above limitations may not apply to you.")],
        spacing: { after: 240 }
      }),

      // Section 14: Dispute Resolution
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("14. Dispute Resolution")]
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Expert-User Disputes: Disputes between Users and Experts regarding service quality, cancellations, or payment should be resolved directly between the parties. If necessary, EzoraAI may mediate disputes at our discretion. Either party may submit a dispute claim through the Platform.")]
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("EzoraAI Disputes: Any dispute between you and EzoraAI arising from or relating to these Terms or the Platform shall first proceed to mediation. If mediation fails, disputes shall be resolved in arbitration in accordance with the American Arbitration Association (AAA) Commercial Arbitration Rules.")]
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Arbitration: You agree that any arbitration shall be conducted on an individual basis, not as a class action or collective proceeding. You waive the right to a jury trial.")]
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Venue: Arbitration shall take place in Delaware, or by mutual agreement of the parties.")]
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Relief: You may also pursue claims in small claims court instead of arbitration if your claim qualifies and you follow applicable procedures.")],
        spacing: { after: 240 }
      }),

      // Section 15: Privacy
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("15. Privacy")]
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Your privacy is important to us. Please see our separate Privacy Policy for information about how we collect, use, and protect your personal data.")]
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("By using the Platform, you consent to our collection and use of information as described in the Privacy Policy. We comply with applicable data protection laws, including the California Consumer Privacy Act (CCPA) and the General Data Protection Regulation (GDPR).")]
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("EzoraAI will not sell your personal data to third parties without your explicit consent, except as required by law or as necessary to operate the Platform.")],
        spacing: { after: 240 }
      }),

      // Section 16: Modifications to Terms
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("16. Modifications to Terms")]
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("EzoraAI may modify these Terms at any time. Material changes will be posted on the Platform and will not be effective for at least 30 days from the date of posting.")]
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Your continued use of the Platform following notice of any change constitutes your acceptance of the modified Terms. If you do not agree to any changes, you must stop using the Platform.")]
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("We encourage you to review these Terms periodically to stay informed of any updates.")],
        spacing: { after: 240 }
      }),

      // Section 17: Termination
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("17. Termination")]
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Account Suspension and Termination: EzoraAI may suspend or terminate your account at any time, with or without cause, upon notice to you.")]
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Grounds for Termination include: (a) violation of these Terms; (b) fraudulent, illegal, or harmful conduct; (c) breach of Expert or User obligations; (d) multiple complaints from other users; (e) failure to pay fees; and (f) non-compliance with applicable laws.")]
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("Effect of Termination: Upon termination, your right to access the Platform immediately ceases. All unpaid fees remain due. Sections that by their nature are intended to survive termination will remain in effect.")]
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("EzoraAI may retain your data and account information as required by law or for legitimate business purposes.")],
        spacing: { after: 240 }
      }),

      // Section 18: Governing Law
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("18. Governing Law")]
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("These Terms shall be governed by and construed in accordance with the laws of the State of Delaware, without regard to its conflict of law principles.")]
      }),
      new Paragraph({
        numbering: { reference: "numbers", level: 0 },
        children: [new TextRun("All disputes shall be subject to the jurisdiction of the courts of Delaware, except as provided in Section 14 (Dispute Resolution).")],
        spacing: { after: 240 }
      }),

      // Section 19: Contact Information
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("19. Contact Information")]
      }),
      new Paragraph({
        children: [new TextRun("For questions about these Terms of Service, please contact us at:")]
      }),
      new Paragraph({
        children: [new TextRun("EzoraAI")],
        spacing: { before: 100 }
      }),
      new Paragraph({
        children: [new TextRun("Email: legal@ezora.ai")]
      }),
      new Paragraph({
        children: [new TextRun("Website: ezora.ai")]
      }),
      new Paragraph({
        children: [new TextRun("We will respond to legal inquiries within 30 days of receipt.")],
        spacing: { after: 240 }
      }),

      // Closing paragraph
      new Paragraph({
        children: [new TextRun({
          text: "Last Updated: " + effectiveDate,
          italic: true
        })],
        spacing: { before: 240, after: 100 }
      })
    ]
  }]
});

// Write document to file
const outputPath = "/sessions/keen-epic-bardeen/mnt/EzoraAI-Ops/EzoraAI/Legal/EzoraAI_Terms_of_Service.docx";

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync(outputPath, buffer);
  console.log("Document created successfully at: " + outputPath);
});
