export const EDITOR_DOCUMENT_EXCERPT = `
COMMERCIAL LEASE AGREEMENT — SECTION 4. RENT AND OTHER PAYMENTS

4.1 Tenant shall pay to Landlord as Base Rent for the Premises the sum of Five Thousand Dollars ($5,000.00) per month.

4.2 LIMITATION OF LIABILITY. Neither Landlord nor Tenant shall be liable for any consequential, indirect, special, punitive, or exemplary damages. In no event shall Landlord's liability under this Lease exceed the total amount of rent paid by Tenant during the preceding twelve (12) month period.
`.trim();

export function editorFallbackReply(message: string): string {
  const q = message.toLowerCase();
  if (q.includes("4.2") || q.includes("liability") || q.includes("limitation")) {
    return "Section 4.2 caps Landlord liability at rent paid in the prior 12 months and excludes consequential damages. Consider negotiating mutual caps and carve-outs for confidentiality or gross negligence.";
  }
  if (q.includes("landlord") || q.includes("tenant")) {
    return "The current draft favors the Landlord on liability. A balanced revision often uses mutual caps tied to fees paid in the trailing 12 months.";
  }
  return "I can help analyze clauses in this lease draft. Ask about Section 4.2 limitation of liability, indemnity, or suggested redlines.";
}
