import { Knex } from 'knex';

/**
 * Steps and requirements for services 4–10 (added in Prompt 5 seed expansion).
 * Service IDs b000-000000000001..003 are handled in 003_steps_and_requirements.ts
 */
export async function seed(knex: Knex): Promise<void> {
  const serviceIds = [
    '00000000-0000-4000-b000-000000000004', // SSS
    '00000000-0000-4000-b000-000000000005', // Pag-IBIG
    '00000000-0000-4000-b000-000000000006', // BIR TIN
    '00000000-0000-4000-b000-000000000007', // LTO New
    '00000000-0000-4000-b000-000000000008', // LTO Renewal
    '00000000-0000-4000-b000-000000000009', // COMELEC
    '00000000-0000-4000-b000-000000000010', // PSA
  ];

  // Remove any prior data for these services
  await knex('requirements').whereIn('service_id', serviceIds).del();
  await knex('steps').whereIn('service_id', serviceIds).del();

  // ── SSS Registration ──────────────────────────────────────────────────────
  await knex('steps').insert([
    { id: '00000000-0000-4000-c000-000000000401', service_id: '00000000-0000-4000-b000-000000000004', title: 'Prepare required documents', description: 'Gather all documents needed for SSS registration.', order: 1, created_at: new Date(), updated_at: new Date() },
    { id: '00000000-0000-4000-c000-000000000402', service_id: '00000000-0000-4000-b000-000000000004', title: 'Fill out the SSS Form E-1 or register online', description: 'Complete the Personal Record form (E-1) at an SSS branch, or register via My.SSS online portal.', order: 2, created_at: new Date(), updated_at: new Date() },
    { id: '00000000-0000-4000-c000-000000000403', service_id: '00000000-0000-4000-b000-000000000004', title: 'Submit documents and capture biometrics', description: 'Submit your accomplished form along with supporting documents. Biometric capture (photo and fingerprints) may be required.', order: 3, created_at: new Date(), updated_at: new Date() },
    { id: '00000000-0000-4000-c000-000000000404', service_id: '00000000-0000-4000-b000-000000000004', title: 'Receive SS Number and ID', description: 'Your SS Number will be issued immediately. The SSS UMID card is processed and released separately.', order: 4, created_at: new Date(), updated_at: new Date() },
  ]);
  await knex('requirements').insert([
    { id: '00000000-0000-4000-d000-000004010001', step_id: '00000000-0000-4000-c000-000000000401', service_id: '00000000-0000-4000-b000-000000000004', name: 'Birth Certificate (PSA-authenticated)', description: null, is_optional: false, created_at: new Date(), updated_at: new Date() },
    { id: '00000000-0000-4000-d000-000004010002', step_id: '00000000-0000-4000-c000-000000000401', service_id: '00000000-0000-4000-b000-000000000004', name: 'Valid government-issued ID', description: 'Passport, Driver\'s License, or any primary ID.', is_optional: false, created_at: new Date(), updated_at: new Date() },
    { id: '00000000-0000-4000-d000-000004020001', step_id: '00000000-0000-4000-c000-000000000402', service_id: '00000000-0000-4000-b000-000000000004', name: 'Accomplished SSS Form E-1', description: 'Available at SSS branches or downloadable from the SSS website.', is_optional: false, created_at: new Date(), updated_at: new Date() },
  ]);

  // ── Pag-IBIG Registration ─────────────────────────────────────────────────
  await knex('steps').insert([
    { id: '00000000-0000-4000-c000-000000000501', service_id: '00000000-0000-4000-b000-000000000005', title: 'Prepare required documents', description: null, order: 1, created_at: new Date(), updated_at: new Date() },
    { id: '00000000-0000-4000-c000-000000000502', service_id: '00000000-0000-4000-b000-000000000005', title: 'Fill out the Pag-IBIG Membership Registration Form (MDF)', description: 'Complete the Membership Data Form. Available at any Pag-IBIG branch or at pagibigfund.gov.ph.', order: 2, created_at: new Date(), updated_at: new Date() },
    { id: '00000000-0000-4000-c000-000000000503', service_id: '00000000-0000-4000-b000-000000000005', title: 'Submit form and pay first contribution', description: 'Submit your MDF at a Pag-IBIG branch together with your employer or as a voluntary member.', order: 3, created_at: new Date(), updated_at: new Date() },
    { id: '00000000-0000-4000-c000-000000000504', service_id: '00000000-0000-4000-b000-000000000005', title: 'Receive Pag-IBIG MID Number', description: 'Your unique Pag-IBIG MID Number is issued upon registration.', order: 4, created_at: new Date(), updated_at: new Date() },
  ]);
  await knex('requirements').insert([
    { id: '00000000-0000-4000-d000-000005010001', step_id: '00000000-0000-4000-c000-000000000501', service_id: '00000000-0000-4000-b000-000000000005', name: 'Valid government-issued ID', description: null, is_optional: false, created_at: new Date(), updated_at: new Date() },
    { id: '00000000-0000-4000-d000-000005020001', step_id: '00000000-0000-4000-c000-000000000502', service_id: '00000000-0000-4000-b000-000000000005', name: 'Accomplished Membership Data Form (MDF)', description: null, is_optional: false, created_at: new Date(), updated_at: new Date() },
    { id: '00000000-0000-4000-d000-000005030001', step_id: '00000000-0000-4000-c000-000000000503', service_id: '00000000-0000-4000-b000-000000000005', name: 'First monthly contribution payment', description: 'At least PHP 100.00 for voluntary members.', is_optional: false, created_at: new Date(), updated_at: new Date() },
  ]);

  // ── BIR TIN Application ───────────────────────────────────────────────────
  await knex('steps').insert([
    { id: '00000000-0000-4000-c000-000000000601', service_id: '00000000-0000-4000-b000-000000000006', title: 'Determine applicable BIR form', description: 'Use BIR Form 1901 for self-employed individuals; Form 1902 for employees; Form 1904 for one-time transactions.', order: 1, created_at: new Date(), updated_at: new Date() },
    { id: '00000000-0000-4000-c000-000000000602', service_id: '00000000-0000-4000-b000-000000000006', title: 'Prepare and accomplish the BIR form', description: 'Fill out the appropriate BIR registration form completely and accurately.', order: 2, created_at: new Date(), updated_at: new Date() },
    { id: '00000000-0000-4000-c000-000000000603', service_id: '00000000-0000-4000-b000-000000000006', title: 'Submit to the Revenue District Office (RDO)', description: 'Submit the accomplished form with supporting documents to the RDO with jurisdiction over your place of residence or business.', order: 3, created_at: new Date(), updated_at: new Date() },
    { id: '00000000-0000-4000-c000-000000000604', service_id: '00000000-0000-4000-b000-000000000006', title: 'Receive TIN and Certificate of Registration', description: 'Your TIN is issued at the RDO. For business registrants, a Certificate of Registration (BIR Form 2303) is also issued.', order: 4, created_at: new Date(), updated_at: new Date() },
  ]);
  await knex('requirements').insert([
    { id: '00000000-0000-4000-d000-000006010001', step_id: '00000000-0000-4000-c000-000000000602', service_id: '00000000-0000-4000-b000-000000000006', name: 'Birth Certificate (PSA-authenticated)', description: null, is_optional: false, created_at: new Date(), updated_at: new Date() },
    { id: '00000000-0000-4000-d000-000006010002', step_id: '00000000-0000-4000-c000-000000000602', service_id: '00000000-0000-4000-b000-000000000006', name: 'Valid government-issued ID', description: null, is_optional: false, created_at: new Date(), updated_at: new Date() },
    { id: '00000000-0000-4000-d000-000006020001', step_id: '00000000-0000-4000-c000-000000000603', service_id: '00000000-0000-4000-b000-000000000006', name: 'Proof of address', description: 'Utility bill, barangay certificate, or lease agreement.', is_optional: false, created_at: new Date(), updated_at: new Date() },
    { id: '00000000-0000-4000-d000-000006020002', step_id: '00000000-0000-4000-c000-000000000603', service_id: '00000000-0000-4000-b000-000000000006', name: 'DTI Certificate of Business Name', description: 'Required for sole proprietors.', is_optional: true, created_at: new Date(), updated_at: new Date() },
  ]);

  // ── LTO Driver's License — New Application ────────────────────────────────
  await knex('steps').insert([
    { id: '00000000-0000-4000-c000-000000000701', service_id: '00000000-0000-4000-b000-000000000007', title: 'Enroll in an accredited driving school', description: 'Complete the required driving lessons and theoretical driving course (TDC) at an LTO-accredited driving school.', order: 1, created_at: new Date(), updated_at: new Date() },
    { id: '00000000-0000-4000-c000-000000000702', service_id: '00000000-0000-4000-b000-000000000007', title: 'Apply for a Student Permit', description: 'Visit any LTO licensing center to apply for a Student Permit. Present your TDC certificate and required documents.', order: 2, created_at: new Date(), updated_at: new Date() },
    { id: '00000000-0000-4000-c000-000000000703', service_id: '00000000-0000-4000-b000-000000000007', title: 'Practice driving for at least one month', description: 'The Student Permit is valid for one year. You must hold it for at least one month before applying for a non-professional license.', order: 3, created_at: new Date(), updated_at: new Date() },
    { id: '00000000-0000-4000-c000-000000000704', service_id: '00000000-0000-4000-b000-000000000007', title: 'Apply for a Non-Professional or Professional Driver\'s License', description: 'Return to the LTO licensing center, pass the written exam and practical driving test, and pay the required fees.', order: 4, created_at: new Date(), updated_at: new Date() },
    { id: '00000000-0000-4000-c000-000000000705', service_id: '00000000-0000-4000-b000-000000000007', title: 'Receive your Driver\'s License card', description: 'Your physical license card is released on the same day in most LTO centers.', order: 5, created_at: new Date(), updated_at: new Date() },
  ]);
  await knex('requirements').insert([
    { id: '00000000-0000-4000-d000-000007020001', step_id: '00000000-0000-4000-c000-000000000702', service_id: '00000000-0000-4000-b000-000000000007', name: 'TDC Certificate from accredited driving school', description: null, is_optional: false, created_at: new Date(), updated_at: new Date() },
    { id: '00000000-0000-4000-d000-000007020002', step_id: '00000000-0000-4000-c000-000000000702', service_id: '00000000-0000-4000-b000-000000000007', name: 'Valid government-issued ID', description: null, is_optional: false, created_at: new Date(), updated_at: new Date() },
    { id: '00000000-0000-4000-d000-000007020003', step_id: '00000000-0000-4000-c000-000000000702', service_id: '00000000-0000-4000-b000-000000000007', name: 'Medical certificate', description: 'Issued by an LTO-accredited medical clinic.', is_optional: false, created_at: new Date(), updated_at: new Date() },
    { id: '00000000-0000-4000-d000-000007040001', step_id: '00000000-0000-4000-c000-000000000704', service_id: '00000000-0000-4000-b000-000000000007', name: 'Student Permit (at least 1 month old)', description: null, is_optional: false, created_at: new Date(), updated_at: new Date() },
    { id: '00000000-0000-4000-d000-000007040002', step_id: '00000000-0000-4000-c000-000000000704', service_id: '00000000-0000-4000-b000-000000000007', name: 'Accomplished LTO Application Form', description: null, is_optional: false, created_at: new Date(), updated_at: new Date() },
  ]);

  // ── LTO Driver's License — Renewal ────────────────────────────────────────
  await knex('steps').insert([
    { id: '00000000-0000-4000-c000-000000000801', service_id: '00000000-0000-4000-b000-000000000008', title: 'Get a medical certificate', description: 'Obtain a medical certificate from an LTO-accredited medical clinic prior to your renewal appointment.', order: 1, created_at: new Date(), updated_at: new Date() },
    { id: '00000000-0000-4000-c000-000000000802', service_id: '00000000-0000-4000-b000-000000000008', title: 'Visit the LTO licensing center', description: 'Go to any LTO licensing center. Bring your expiring/expired license, medical certificate, and required fees.', order: 2, created_at: new Date(), updated_at: new Date() },
    { id: '00000000-0000-4000-c000-000000000803', service_id: '00000000-0000-4000-b000-000000000008', title: 'Complete evaluation and biometrics', description: 'The LTO officer will verify your records. Biometric capture (photo and digital signature) will be taken.', order: 3, created_at: new Date(), updated_at: new Date() },
    { id: '00000000-0000-4000-c000-000000000804', service_id: '00000000-0000-4000-b000-000000000008', title: 'Pay renewal fees', description: 'Pay the applicable renewal fee at the cashier.', order: 4, created_at: new Date(), updated_at: new Date() },
    { id: '00000000-0000-4000-c000-000000000805', service_id: '00000000-0000-4000-b000-000000000008', title: 'Receive renewed Driver\'s License', description: 'Your new license card is printed and released on the same day.', order: 5, created_at: new Date(), updated_at: new Date() },
  ]);
  await knex('requirements').insert([
    { id: '00000000-0000-4000-d000-000008010001', step_id: '00000000-0000-4000-c000-000000000801', service_id: '00000000-0000-4000-b000-000000000008', name: 'Medical certificate from LTO-accredited clinic', description: null, is_optional: false, created_at: new Date(), updated_at: new Date() },
    { id: '00000000-0000-4000-d000-000008020001', step_id: '00000000-0000-4000-c000-000000000802', service_id: '00000000-0000-4000-b000-000000000008', name: 'Original Driver\'s License (expiring or expired)', description: null, is_optional: false, created_at: new Date(), updated_at: new Date() },
    { id: '00000000-0000-4000-d000-000008020002', step_id: '00000000-0000-4000-c000-000000000802', service_id: '00000000-0000-4000-b000-000000000008', name: 'Accomplished Application for Driver\'s License form', description: null, is_optional: false, created_at: new Date(), updated_at: new Date() },
  ]);

  // ── COMELEC Voter's Registration ──────────────────────────────────────────
  await knex('steps').insert([
    { id: '00000000-0000-4000-c000-000000000901', service_id: '00000000-0000-4000-b000-000000000009', title: 'Check eligibility and registration schedule', description: "Verify that you meet the requirements (18 years old, Filipino citizen, resident for at least 6 months). Check COMELEC's official calendar for active registration periods.", order: 1, created_at: new Date(), updated_at: new Date() },
    { id: '00000000-0000-4000-c000-000000000902', service_id: '00000000-0000-4000-b000-000000000009', title: 'Visit the COMELEC Office', description: 'Go to the COMELEC office in your city or municipality during the registration period.', order: 2, created_at: new Date(), updated_at: new Date() },
    { id: '00000000-0000-4000-c000-000000000903', service_id: '00000000-0000-4000-b000-000000000009', title: 'Fill out the Voter Registration Form (CEF-1)', description: 'Accomplish the Voter Registration Form. COMELEC staff can assist you if needed.', order: 3, created_at: new Date(), updated_at: new Date() },
    { id: '00000000-0000-4000-c000-000000000904', service_id: '00000000-0000-4000-b000-000000000009', title: 'Biometrics capture', description: 'Your photo, fingerprints, and signature will be captured by COMELEC personnel.', order: 4, created_at: new Date(), updated_at: new Date() },
    { id: '00000000-0000-4000-c000-000000000905', service_id: '00000000-0000-4000-b000-000000000009', title: 'Receive acknowledgment receipt', description: 'Keep your acknowledgment receipt. Your application will be approved and you will be included in the voters list after verification.', order: 5, created_at: new Date(), updated_at: new Date() },
  ]);
  await knex('requirements').insert([
    { id: '00000000-0000-4000-d000-000009020001', step_id: '00000000-0000-4000-c000-000000000902', service_id: '00000000-0000-4000-b000-000000000009', name: 'Valid government-issued ID', description: 'Passport, SSS ID, Driver\'s License, or any photo-bearing ID.', is_optional: false, created_at: new Date(), updated_at: new Date() },
    { id: '00000000-0000-4000-d000-000009020002', step_id: '00000000-0000-4000-c000-000000000902', service_id: '00000000-0000-4000-b000-000000000009', name: 'Proof of residence', description: 'Utility bill, barangay certificate, or any document showing your address.', is_optional: false, created_at: new Date(), updated_at: new Date() },
    { id: '00000000-0000-4000-d000-000009030001', step_id: '00000000-0000-4000-c000-000000000903', service_id: '00000000-0000-4000-b000-000000000009', name: 'Accomplished Voter Registration Form (CEF-1)', description: null, is_optional: false, created_at: new Date(), updated_at: new Date() },
  ]);

  // ── PSA Birth Certificate Request ─────────────────────────────────────────
  await knex('steps').insert([
    { id: '00000000-0000-4000-c000-000000001001', service_id: '00000000-0000-4000-b000-000000000010', title: 'Choose a request channel', description: 'You may request online via PSAHelpline.ph or PSASerbilis.com.ph, or walk-in at a PSA Civil Registration Office or SM/Robinsons partner outlet.', order: 1, created_at: new Date(), updated_at: new Date() },
    { id: '00000000-0000-4000-c000-000000001002', service_id: '00000000-0000-4000-b000-000000000010', title: 'Fill out the request form', description: 'Provide complete details: full name as registered, date of birth, place of birth, parents\' names, and purpose of the request.', order: 2, created_at: new Date(), updated_at: new Date() },
    { id: '00000000-0000-4000-c000-000000001003', service_id: '00000000-0000-4000-b000-000000000010', title: 'Pay the processing fee', description: 'Standard fee is PHP 155 per copy for online requests with delivery. Walk-in fees may vary.', order: 3, created_at: new Date(), updated_at: new Date() },
    { id: '00000000-0000-4000-c000-000000001004', service_id: '00000000-0000-4000-b000-000000000010', title: 'Receive the certificate', description: 'Online orders are delivered to your address within 3–5 working days. Walk-in requests may be released the same day.', order: 4, created_at: new Date(), updated_at: new Date() },
  ]);
  await knex('requirements').insert([
    { id: '00000000-0000-4000-d000-000010020001', step_id: '00000000-0000-4000-c000-000000001002', service_id: '00000000-0000-4000-b000-000000000010', name: 'Full name as it appears on the birth record', description: null, is_optional: false, created_at: new Date(), updated_at: new Date() },
    { id: '00000000-0000-4000-d000-000010020002', step_id: '00000000-0000-4000-c000-000000001002', service_id: '00000000-0000-4000-b000-000000000010', name: 'Date and place of birth', description: null, is_optional: false, created_at: new Date(), updated_at: new Date() },
    { id: '00000000-0000-4000-d000-000010020003', step_id: '00000000-0000-4000-c000-000000001002', service_id: '00000000-0000-4000-b000-000000000010', name: "Parents' complete names", description: null, is_optional: false, created_at: new Date(), updated_at: new Date() },
    { id: '00000000-0000-4000-d000-000010020004', step_id: '00000000-0000-4000-c000-000000001002', service_id: '00000000-0000-4000-b000-000000000010', name: 'Valid government-issued ID of requester', description: null, is_optional: false, created_at: new Date(), updated_at: new Date() },
    { id: '00000000-0000-4000-d000-000010020005', step_id: '00000000-0000-4000-c000-000000001002', service_id: '00000000-0000-4000-b000-000000000010', name: 'Authorization letter with ID of owner', description: 'Required if the requester is not the owner of the document.', is_optional: true, created_at: new Date(), updated_at: new Date() },
    { id: '00000000-0000-4000-d000-000010030001', step_id: '00000000-0000-4000-c000-000000001003', service_id: '00000000-0000-4000-b000-000000000010', name: 'Processing fee of PHP 155 per copy', description: 'Accepted via online payment or cash at partner outlets.', is_optional: false, created_at: new Date(), updated_at: new Date() },
  ]);
}
