const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, Header, Footer,
        AlignmentType, BorderStyle, WidthType, ShadingType, VerticalAlign, HeadingLevel, PageNumber, PageBreak } = require('docx');
const fs = require('fs');

// Define borders for tables
const border = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
const borders = { top: border, bottom: border, left: border, right: border };

const doc = new Document({
  styles: {
    default: {
      document: {
        run: { font: "Arial", size: 24 }, // 12pt
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
        run: { size: 28, bold: true, font: "Arial", color: "131D3B" }, // 14pt, dark blue
        paragraph: { spacing: { before: 180, after: 100 }, outlineLevel: 1 }
      },
    ]
  },
  sections: [{
    properties: {
      page: {
        size: {
          width: 12240,   // 8.5 inches (US Letter)
          height: 15840   // 11 inches (US Letter)
        },
        margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } // 1 inch margins
      }
    },
    headers: {
      default: new Header({
        children: [
          new Paragraph({
            children: [new TextRun({ text: "EzoraAI — Acceptable Use Policy", bold: true, size: 20 })],
            alignment: AlignmentType.LEFT,
            spacing: { after: 120 },
            border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: "00C9A7", space: 1 } }
          })
        ]
      })
    },
    footers: {
      default: new Footer({
        children: [
          new Paragraph({
            children: [
              new TextRun({ text: "Page ", size: 20 }),
              new TextRun({ children: [PageNumber.CURRENT], size: 20 })
            ],
            alignment: AlignmentType.CENTER
          })
        ]
      })
    },
    children: [
      // DRAFT banner
      new Paragraph({
        children: [new TextRun({ text: "DRAFT — FOR LEGAL REVIEW", bold: true, color: "FF0000", size: 22 })],
        alignment: AlignmentType.CENTER,
        spacing: { after: 240 },
        border: { top: { style: BorderStyle.SINGLE, size: 12, color: "FF0000", space: 1 },
                  bottom: { style: BorderStyle.SINGLE, size: 12, color: "FF0000", space: 1 } }
      }),

      // Title
      new Paragraph({
        children: [new TextRun({ text: "EzoraAI Acceptable Use Policy", bold: true, size: 32, color: "0B1224" })],
        alignment: AlignmentType.CENTER,
        spacing: { after: 120 }
      }),

      // Date and effective
      new Paragraph({
        children: [new TextRun({ text: "Effective Date: March 29, 2026", italic: true, size: 20 })],
        alignment: AlignmentType.CENTER,
        spacing: { after: 360 }
      }),

      // 1. Purpose
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("1. Purpose")]
      }),

      new Paragraph({
        children: [new TextRun("This Acceptable Use Policy (\"Policy\") establishes standards for acceptable behavior and conduct on the EzoraAI platform. EzoraAI is a dual-sided marketplace connecting AI experts with individuals and businesses seeking AI expertise through coaching sessions, project work, and community engagement. This Policy applies to all users, including learners, businesses, experts, and community members. By accessing and using EzoraAI, you agree to abide by these standards and contribute to a respectful, professional, and trustworthy community.")],
        spacing: { after: 240 }
      }),

      // 2. General Conduct
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("2. General Conduct Standards")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("2.1 Respect and Professionalism")]
      }),

      new Paragraph({
        children: [new TextRun("All users must treat other platform members with respect, professionalism, and courtesy. This includes:")],
        spacing: { after: 120 }
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Using appropriate and professional language in all communications")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Responding to inquiries and messages in a timely and courteous manner")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Providing constructive feedback and avoiding insulting or derogatory comments")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Recognizing that all members contribute valuable perspectives")]
        , spacing: { after: 240 }
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("2.2 Non-Discrimination")]
      }),

      new Paragraph({
        children: [new TextRun("EzoraAI is committed to creating an inclusive platform free from discrimination. Users must not:")],
        spacing: { after: 120 }
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Discriminate against any person based on protected characteristics including race, color, ethnicity, national origin, religion, caste, gender, gender identity or expression, sexual orientation, age, disability, or veteran status")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Deny services, opportunities, or access to users based on these protected characteristics")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Engage in any form of exclusionary or biased behavior")]
        , spacing: { after: 240 }
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("2.3 No Harassment or Threats")]
      }),

      new Paragraph({
        children: [new TextRun("Harassment, bullying, intimidation, and threats of any kind are strictly prohibited. This includes:")],
        spacing: { after: 120 }
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Repeated unwanted communication after being asked to stop")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Hostile, abusive, or threatening language, tone, or behavior")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Stalking, doxxing, or sharing another user's personal information without consent")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Threatening legal action, violence, or harm")]
        , spacing: { after: 240 }
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("2.4 Honesty and Accuracy")]
      }),

      new Paragraph({
        children: [new TextRun("All information you provide on EzoraAI must be honest, accurate, and truthful. Users must not:")],
        spacing: { after: 120 }
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Provide false or misleading information in profiles, descriptions, or communications")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Misrepresent qualifications, credentials, experience, or achievements")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Engage in deliberate deception to gain trust or advantage")]
        , spacing: { after: 240 }
      }),

      // 3. Session Conduct
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("3. Session Conduct")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("3.1 Punctuality and Attendance")]
      }),

      new Paragraph({
        children: [new TextRun("All parties agree to honor scheduled session times. Users and experts should:")],
        spacing: { after: 120 }
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Arrive on time for scheduled sessions")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Provide advance notice if unable to attend, with reasonable cancellation windows per the session booking terms")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Ensure proper technical setup (audio, video, stable internet connection) before the session begins")]
        , spacing: { after: 240 }
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("3.2 Recording and Consent")]
      }),

      new Paragraph({
        children: [new TextRun("Recording sessions without explicit written consent from all participants is prohibited. Specifically:")]
        , spacing: { after: 120 }
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("You must obtain prior written consent before recording any session (audio, video, or screen capture)")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("All parties must be informed of recording and its intended use")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Failure to disclose recording constitutes a violation of trust and privacy")]
        , spacing: { after: 240 }
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("3.3 Content Sharing Restrictions")]
      }),

      new Paragraph({
        children: [new TextRun("Session materials and discussions must be handled with confidentiality:")]
        , spacing: { after: 120 }
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Do not share session content, recordings, or materials with third parties without explicit permission")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Respect intellectual property and confidential business information shared during sessions")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Sharing without permission may result in legal liability in addition to account suspension")]
        , spacing: { after: 240 }
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("3.4 Professional Communication Standards")]
      }),

      new Paragraph({
        children: [new TextRun("All session communication must remain professional and appropriate:")]
        , spacing: { after: 120 }
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Avoid inappropriate sexual content, solicitation, or personal advances")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Sessions are not a venue for personal relationships or romantic pursuit")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Keep discussions focused on stated session objectives")]
        , spacing: { after: 240 }
      }),

      // 4. Content Standards
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("4. Content Standards")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("4.1 Prohibited Content")]
      }),

      new Paragraph({
        children: [new TextRun("Users must not create, post, or share the following types of content on EzoraAI:")],
        spacing: { after: 120 }
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Illegal content (content that violates applicable law)")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Hateful content targeting individuals or groups based on protected characteristics")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Graphic violence, gore, or exploitative imagery")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Sexual or sexually explicit content")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Child exploitation or abuse material (CSAM)")]
        , spacing: { after: 240 }
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("4.2 Spam and Unsolicited Promotion")]
      }),

      new Paragraph({
        children: [new TextRun("Promotional content and marketing must follow these rules:")]
        , spacing: { after: 120 }
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("No unsolicited advertising or commercial solicitation in messages or community discussions")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Promotional content is only permitted in designated areas (e.g., expert profiles, designated marketing channels)")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("No spam, phishing, or mass messaging campaigns")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Links to external sites must be relevant and not for commercial manipulation")]
        , spacing: { after: 240 }
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("4.3 Misleading Claims and False Credentials")]
      }),

      new Paragraph({
        children: [new TextRun("Content in profiles and marketing materials must be truthful:")]
        , spacing: { after: 120 }
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("No false claims about qualifications, certifications, or expertise")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("No misleading statements about results, success rates, or guarantees")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Testimonials and reviews must be genuine and not fabricated")]
        , spacing: { after: 240 }
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("4.4 Plagiarism and Intellectual Property")]
      }),

      new Paragraph({
        children: [new TextRun("All content shared must respect intellectual property rights:")]
        , spacing: { after: 120 }
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Do not plagiarize or present others' work as your own")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Properly attribute and license any third-party content you share")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Respect copyrights, patents, trademarks, and trade secrets")]
        , spacing: { after: 240 }
      }),

      // 5. Prohibited Activities
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("5. Prohibited Activities")]
      }),

      new Paragraph({
        children: [new TextRun("In addition to content standards, the following activities are strictly prohibited:")]
        , spacing: { after: 120 }
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("5.1 Fee Circumvention")]
      }),

      new Paragraph({
        children: [new TextRun("You must not circumvent EzoraAI's payment system or fee structure. Prohibited actions include:")]
        , spacing: { after: 120 }
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Directing users to conduct business outside the platform to avoid paying platform fees")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Sharing contact information or payment details during sessions to facilitate off-platform transactions")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Offering significant discounts or alternative arrangements that unfairly compete with platform economics")]
        , spacing: { after: 240 }
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("5.2 Fake Accounts and Identity Misrepresentation")]
      }),

      new Paragraph({
        children: [new TextRun("Accounts must represent real individuals and organizations accurately:")]
        , spacing: { after: 120 }
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("One account per person or organization (accounts for multiple identities are prohibited)")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("You may not impersonate real people, organizations, or public figures")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Bot accounts and automated personas without disclosure are prohibited")]
        , spacing: { after: 240 }
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("5.3 Review and Rating Manipulation")]
      }),

      new Paragraph({
        children: [new TextRun("Reviews and ratings must be authentic and unmanipulated:")]
        , spacing: { after: 120 }
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("You may not post fake reviews or ratings for yourself or competitors")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("No paying or incentivizing others to leave positive reviews")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("No retaliatory negative reviews based on personal disputes")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Reviews must reflect genuine experience on the platform")]
        , spacing: { after: 240 }
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("5.4 Data Scraping and Automated Access")]
      }),

      new Paragraph({
        children: [new TextRun("Unauthorized data collection and platform manipulation are prohibited:")]
        , spacing: { after: 120 }
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("No scraping, crawling, or bulk downloading of platform data or member information")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("No automated tools to bypass platform features or user interactions")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("No reverse engineering or attempting to access platform infrastructure")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("You must comply with robots.txt and our Terms of Service regarding API access")]
        , spacing: { after: 240 }
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("5.5 Malware and Malicious Code")]
      }),

      new Paragraph({
        children: [new TextRun("You must not distribute malicious software or code:")]
        , spacing: { after: 120 }
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("No viruses, trojans, worms, ransomware, or other malware")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("No phishing attempts or social engineering attacks")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("No keystroke loggers or password theft tools")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("If you discover platform vulnerabilities, report them to security@ezora.ai")]
        , spacing: { after: 240 }
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("5.6 Fraudulent Financial Activity")]
      }),

      new Paragraph({
        children: [new TextRun("All financial transactions must be legitimate:")]
        , spacing: { after: 120 }
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("No credit card fraud, chargeback fraud, or payment disputes without legitimate grounds")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("No money laundering or using EzoraAI for illegal financial purposes")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("All payments must reflect genuine services or sessions")]
        , spacing: { after: 240 }
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("5.7 Privacy Violations")]
      }),

      new Paragraph({
        children: [new TextRun("You must protect the privacy of other users:")]
        , spacing: { after: 120 }
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Do not share, publish, or disclose other users' personal information without consent")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Do not collect or aggregate personally identifiable information")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Violations may result in legal liability beyond platform enforcement")]
        , spacing: { after: 240 }
      }),

      // 6. AI-Specific Rules
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("6. AI-Specific Rules and Responsible AI")]
      }),

      new Paragraph({
        children: [new TextRun("EzoraAI is an AI-native platform. All parties must adhere to responsible AI principles:")]
        , spacing: { after: 120 }
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("6.1 Harmful or Deceptive AI Tools")]
      }),

      new Paragraph({
        children: [new TextRun("Experts must not develop or sell AI tools, agents, or services that are:")]
        , spacing: { after: 120 }
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Designed to deceive, defraud, or manipulate users")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Used for harassment, surveillance, or privacy invasion")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Designed to violate laws or harm public safety")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Used for creating non-consensual deepfakes or synthetic media")]
        , spacing: { after: 240 }
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("6.2 AI-Generated Content Disclosure")]
      }),

      new Paragraph({
        children: [new TextRun("When sharing AI-generated content, experts and users must:")]
        , spacing: { after: 120 }
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Clearly disclose when content has been generated by AI systems")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Provide appropriate context about AI limitations and potential inaccuracies")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Not present AI-generated work as human-created without disclosure")]
        , spacing: { after: 240 }
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("6.3 Prohibited AI Development")]
      }),

      new Paragraph({
        children: [new TextRun("Using EzoraAI to develop, test, or commercialize the following is prohibited:")]
        , spacing: { after: 120 }
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("AI systems for weapons, military, or surveillance purposes")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("AI designed to circumvent human consent or autonomy")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Autonomous systems capable of causing physical or financial harm")]
        , spacing: { after: 240 }
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("6.4 Responsible AI Principles")]
      }),

      new Paragraph({
        children: [new TextRun("All work on EzoraAI must adhere to responsible AI principles:")],
        spacing: { after: 120 }
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Transparency — Be clear about AI capabilities and limitations")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Fairness — Avoid bias and discriminatory outcomes")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Accountability — Take responsibility for AI system impacts")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Safety — Prioritize user safety and security")]
        , spacing: { after: 240 }
      }),

      // 7. Community Guidelines
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("7. Community Guidelines (Circle.io Community)")]
      }),

      new Paragraph({
        children: [new TextRun("EzoraAI maintains an optional community space (powered by Circle.io) for members to engage, share, and collaborate. Community members must follow these guidelines:")]
        , spacing: { after: 120 }
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("7.1 Constructive Engagement")]
      }),

      new Paragraph({
        children: [new TextRun("Community discussions must remain constructive and respectful:")]
        , spacing: { after: 120 }
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Share knowledge, ask questions, and help others learn")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("No flame wars, personal attacks, or hostile arguments")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Disagree respectfully and focus on ideas, not people")]
        , spacing: { after: 240 }
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("7.2 Self-Promotion Limits")]
      }),

      new Paragraph({
        children: [new TextRun("Self-promotion and marketing in community discussions are restricted:")]
        , spacing: { after: 120 }
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Self-promotion is only permitted in designated areas (e.g., introductions, marketing channels)")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Do not spam discussions with promotional links or offers")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Focus discussions on sharing value, not selling")]
        , spacing: { after: 240 }
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("7.3 Confidentiality and Privacy")]
      }),

      new Paragraph({
        children: [new TextRun("Community members must respect confidentiality:")]
        , spacing: { after: 120 }
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Do not share other members' personal information, business details, or confidential disclosures")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("What members share in the community should remain within the community")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Screenshots or recordings of community discussions are not permitted without explicit consent")]
        , spacing: { after: 240 }
      }),

      // 8. Reporting Violations
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("8. Reporting Violations")]
      }),

      new Paragraph({
        children: [new TextRun("If you witness or experience a violation of this Policy, please report it immediately:")]
        , spacing: { after: 120 }
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("8.1 How to Report")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Email: compliance@ezora.ai")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Use the in-app reporting tool on any user profile or content")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Include specific details: user name, date, time, and description of the violation")]
        , spacing: { after: 240 }
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("8.2 Investigation and Response")]
      }),

      new Paragraph({
        children: [new TextRun("Upon receiving a report, EzoraAI will:")]
        , spacing: { after: 120 }
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Acknowledge receipt of the report within 48 hours")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Conduct a prompt investigation")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Maintain the privacy of the reporter whenever possible")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Notify the reporter of actions taken (when appropriate)")]
        , spacing: { after: 240 }
      }),

      // 9. Enforcement
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("9. Enforcement and Account Discipline")]
      }),

      new Paragraph({
        children: [new TextRun("EzoraAI enforces this Policy through a structured approach based on the severity and frequency of violations:")]
        , spacing: { after: 240 }
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("9.1 Warning")]
      }),

      new Paragraph({
        children: [new TextRun("For first-time or minor violations, the user receives a written warning that:")]
        , spacing: { after: 120 }
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Describes the specific violation")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Explains the Policy requirement")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Allows a reasonable opportunity to correct the behavior")]
        , spacing: { after: 240 }
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("9.2 Temporary Suspension")]
      }),

      new Paragraph({
        children: [new TextRun("For repeated violations, severe first offenses, or failure to respond to warnings, EzoraAI may suspend the account for a specified period (typically 7–30 days). During suspension:")]
        , spacing: { after: 120 }
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("The user cannot access the platform or conduct business")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Existing sessions and scheduled bookings may be paused")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("The user will receive written notice of the reason and duration")]
        , spacing: { after: 240 }
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("9.3 Permanent Termination")]
      }),

      new Paragraph({
        children: [new TextRun("Accounts may be permanently terminated for:")]
        , spacing: { after: 120 }
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Egregious violations (fraud, harassment, illegal activity, malware)")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Repeated violations after temporary suspension")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Actions that pose imminent risk to the platform or other users")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Violation of law")]
        , spacing: { after: 240 }
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("9.4 Concurrent Legal Action")]
      }),

      new Paragraph({
        children: [new TextRun("Account suspension or termination does not preclude legal action. EzoraAI reserves the right to pursue civil or criminal remedies for violations that constitute fraud, harassment, IP infringement, or other illegal conduct.")]
        , spacing: { after: 240 }
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("9.5 Appeals Process")]
      }),

      new Paragraph({
        children: [new TextRun("If your account is suspended or terminated, you may appeal by:")]
        , spacing: { after: 120 }
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Emailing compliance@ezora.ai within 30 days of the action")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Providing detailed information addressing the violations cited")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("EzoraAI will review the appeal and respond within 14 days")]
      }),

      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun("Appeals decisions are final")]
        , spacing: { after: 240 }
      }),

      // 10. Contact Information
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("10. Contact and Support")]
      }),

      new Paragraph({
        children: [new TextRun("For questions about this Policy, to report violations, or to appeal enforcement actions, contact:")]
        , spacing: { after: 120 }
      }),

      new Paragraph({
        children: [new TextRun({ text: "Email: ", bold: true }), new TextRun("compliance@ezora.ai")]
        , spacing: { after: 60 }
      }),

      new Paragraph({
        children: [new TextRun({ text: "Website: ", bold: true }), new TextRun("https://ezora.ai")]
        , spacing: { after: 240 }
      }),

      // Closing
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("11. Policy Updates")]
      }),

      new Paragraph({
        children: [new TextRun("EzoraAI may update this Policy periodically to reflect platform evolution, legal requirements, or community feedback. We will provide notice of material changes via email or platform notification. Continued use of EzoraAI after policy updates constitutes acceptance of the updated terms.")]
        , spacing: { after: 360 }
      }),

      // Footer note
      new Paragraph({
        children: [new TextRun({ text: "Last Updated: March 29, 2026", italic: true, size: 20 })],
        alignment: AlignmentType.CENTER
      })
    ]
  }],
  numbering: {
    config: [
      {
        reference: "bullets",
        levels: [
          {
            level: 0,
            format: "bullet",
            text: "•",
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
  }
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("/sessions/keen-epic-bardeen/mnt/EzoraAI-Ops/EzoraAI/Legal/EzoraAI_Acceptable_Use_Policy.docx", buffer);
  console.log("Document created successfully!");
});
