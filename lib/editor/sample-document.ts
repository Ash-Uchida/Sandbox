import type { Contract } from "@prisma/client";

export type SampleDocument = {
  heading: string;
  sections: Array<{ title: string; paragraphs: string[]; highlightIndex?: number }>;
};

const LEASE_SAMPLE: SampleDocument = {
  heading: "Commercial Lease Agreement",
  sections: [
    {
      title: "SECTION 4. RENT AND OTHER PAYMENTS",
      paragraphs: [
        "4.1 Tenant shall pay to Landlord as Base Rent for the Premises the sum of Five Thousand Dollars ($5,000.00) per month, payable in advance on the first day of each calendar month during the Term.",
        "4.2 LIMITATION OF LIABILITY. Neither Landlord nor Tenant shall be liable for any consequential, indirect, special, punitive, or exemplary damages, or for loss of profits, whether or not such party has been advised of the possibility of such damages. In no event shall Landlord's liability under this Lease exceed the total amount of rent paid by Tenant during the preceding twelve (12) month period.",
        "4.3 Late Charges. If any installment of Rent is not received by Landlord within five (5) days after the date when due, Tenant shall pay a late charge equal to five percent (5%) of such overdue amount.",
      ],
      highlightIndex: 1,
    },
    {
      title: "SECTION 5. USE OF PREMISES",
      paragraphs: [
        "5.1 Permitted Use. The Premises shall be used and occupied by Tenant solely for general office purposes and for no other purpose without the prior written consent of Landlord.",
        "5.2 Compliance with Laws. Tenant shall, at its sole cost and expense, comply with all laws, ordinances, orders, rules and regulations having jurisdiction over the Premises.",
      ],
    },
  ],
};

const MSA_SAMPLE: SampleDocument = {
  heading: "Master Service Agreement",
  sections: [
    {
      title: "SECTION 4. FEES AND PAYMENT",
      paragraphs: [
        "4.1 Client shall pay Provider the fees set forth in each Statement of Work within thirty (30) days of invoice date.",
        "4.2 LIMITATION OF LIABILITY. Except for breaches of confidentiality or indemnification obligations, each party's aggregate liability under this Agreement shall not exceed the fees paid by Client in the twelve (12) months preceding the claim.",
        "4.3 Taxes. Fees are exclusive of applicable taxes unless otherwise stated in writing.",
      ],
      highlightIndex: 1,
    },
    {
      title: "SECTION 5. CONFIDENTIALITY",
      paragraphs: [
        "5.1 Each party shall protect the other's Confidential Information using at least the same degree of care it uses for its own information.",
        "5.2 Confidential Information excludes information that becomes public through no fault of the receiving party.",
      ],
    },
  ],
};

const NDA_SAMPLE: SampleDocument = {
  heading: "Mutual Non-Disclosure Agreement",
  sections: [
    {
      title: "SECTION 2. DEFINITION OF CONFIDENTIAL INFORMATION",
      paragraphs: [
        "2.1 Confidential Information means non-public business, technical, or financial information disclosed by either party.",
        "2.2 Exclusions. Information that is publicly available, independently developed, or rightfully received from a third party is not Confidential Information.",
      ],
    },
    {
      title: "SECTION 3. OBLIGATIONS",
      paragraphs: [
        "3.1 The receiving party shall use Confidential Information only to evaluate a potential business relationship.",
        "3.2 Each party's liability for unauthorized disclosure shall be limited to direct damages and shall not exceed one hundred thousand dollars ($100,000), except in cases of willful misconduct.",
      ],
      highlightIndex: 1,
    },
  ],
};

const GENERIC_SAMPLE: SampleDocument = {
  heading: "Contract Draft",
  sections: [
    {
      title: "SECTION 1. OVERVIEW",
      paragraphs: [
        "1.1 This agreement sets forth the terms governing the relationship between the parties identified in the order form.",
        "1.2 LIMITATION OF LIABILITY. Neither party shall be liable for indirect or consequential damages. Direct liability is capped at amounts paid under this agreement in the prior twelve (12) months.",
      ],
      highlightIndex: 1,
    },
  ],
};

function pickTemplate(name: string): SampleDocument {
  const lower = name.toLowerCase();
  if (lower.includes("lease") || lower.includes("addendum")) {
    return LEASE_SAMPLE;
  }
  if (lower.includes("nda") || lower.includes("non-disclosure")) {
    return NDA_SAMPLE;
  }
  if (
    lower.includes("service agreement") ||
    lower.includes("msa") ||
    lower.includes("master")
  ) {
    return MSA_SAMPLE;
  }
  return GENERIC_SAMPLE;
}

export function getSampleDocument(contract: Contract): SampleDocument {
  const template = pickTemplate(contract.name);
  return {
    ...template,
    heading: contract.name,
  };
}
