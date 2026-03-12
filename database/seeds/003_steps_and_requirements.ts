import { Knex } from 'knex';

// ─── Service IDs ──────────────────────────────────────────────────────────────
const NBI_SERVICE = '00000000-0000-4000-b000-000000000001';
const DFA_SERVICE = '00000000-0000-4000-b000-000000000002';
const PH_SERVICE  = '00000000-0000-4000-b000-000000000003';

// ─── Step IDs (NBI) ───────────────────────────────────────────────────────────
const NBI_STEP_1 = '00000000-0000-4000-c001-000000000001';
const NBI_STEP_2 = '00000000-0000-4000-c001-000000000002';
const NBI_STEP_3 = '00000000-0000-4000-c001-000000000003';
const NBI_STEP_4 = '00000000-0000-4000-c001-000000000004';
const NBI_STEP_5 = '00000000-0000-4000-c001-000000000005';
const NBI_STEP_6 = '00000000-0000-4000-c001-000000000006';

// ─── Step IDs (DFA) ───────────────────────────────────────────────────────────
const DFA_STEP_1 = '00000000-0000-4000-c002-000000000001';
const DFA_STEP_2 = '00000000-0000-4000-c002-000000000002';
const DFA_STEP_3 = '00000000-0000-4000-c002-000000000003';
const DFA_STEP_4 = '00000000-0000-4000-c002-000000000004';
const DFA_STEP_5 = '00000000-0000-4000-c002-000000000005';
const DFA_STEP_6 = '00000000-0000-4000-c002-000000000006';

// ─── Step IDs (PhilHealth) ────────────────────────────────────────────────────
const PH_STEP_1 = '00000000-0000-4000-c003-000000000001';
const PH_STEP_2 = '00000000-0000-4000-c003-000000000002';
const PH_STEP_3 = '00000000-0000-4000-c003-000000000003';
const PH_STEP_4 = '00000000-0000-4000-c003-000000000004';
const PH_STEP_5 = '00000000-0000-4000-c003-000000000005';

const now = new Date();

export async function seed(knex: Knex): Promise<void> {
  await knex('requirements').del();
  await knex('steps').del();

  // ─── STEPS ────────────────────────────────────────────────────────────────

  await knex('steps').insert([
    // NBI Clearance
    {
      id: NBI_STEP_1,
      service_id: NBI_SERVICE,
      order: 1,
      title: 'Online Registration',
      description: 'Create an account and fill out your personal information on the NBI Clearance Online Portal at clearance.nbi.gov.ph.',
      is_optional: false,
      created_at: now, updated_at: now,
    },
    {
      id: NBI_STEP_2,
      service_id: NBI_SERVICE,
      order: 2,
      title: 'Choose Appointment Slot',
      description: 'Select your preferred NBI branch, date, and time for your personal appearance.',
      is_optional: false,
      created_at: now, updated_at: now,
    },
    {
      id: NBI_STEP_3,
      service_id: NBI_SERVICE,
      order: 3,
      title: 'Pay the Clearance Fee',
      description: 'Pay the NBI Clearance fee (₱130 for e-clearance + ₱25 processing fee). Payment can be done via GCash, PayMaya, over-the-counter at partner banks, or 7-Eleven.',
      is_optional: false,
      created_at: now, updated_at: now,
    },
    {
      id: NBI_STEP_4,
      service_id: NBI_SERVICE,
      order: 4,
      title: 'Visit the NBI Office',
      description: 'Appear personally at your chosen NBI branch on your scheduled appointment date. Bring all required documents.',
      is_optional: false,
      created_at: now, updated_at: now,
    },
    {
      id: NBI_STEP_5,
      service_id: NBI_SERVICE,
      order: 5,
      title: 'Biometrics Capture',
      description: 'Have your fingerprints scanned and photo taken by NBI personnel.',
      is_optional: false,
      created_at: now, updated_at: now,
    },
    {
      id: NBI_STEP_6,
      service_id: NBI_SERVICE,
      order: 6,
      title: 'Release of Clearance',
      description: 'For clean records, the clearance is released the same day. For records that need verification (HIT), it may take 1–2 weeks.',
      is_optional: false,
      created_at: now, updated_at: now,
    },

    // DFA Passport Application
    {
      id: DFA_STEP_1,
      service_id: DFA_SERVICE,
      order: 1,
      title: 'Book an Online Appointment',
      description: 'Go to passport.gov.ph and schedule an appointment at your preferred DFA consular office or satellite office.',
      is_optional: false,
      created_at: now, updated_at: now,
    },
    {
      id: DFA_STEP_2,
      service_id: DFA_SERVICE,
      order: 2,
      title: 'Prepare Your Documents',
      description: 'Gather all required original documents and their photocopies before your appointment date.',
      is_optional: false,
      created_at: now, updated_at: now,
    },
    {
      id: DFA_STEP_3,
      service_id: DFA_SERVICE,
      order: 3,
      title: 'Appear at the DFA Office',
      description: 'Arrive at your scheduled DFA office at least 30 minutes before your appointment. Wear appropriate attire (no sleeveless shirts).',
      is_optional: false,
      created_at: now, updated_at: now,
    },
    {
      id: DFA_STEP_4,
      service_id: DFA_SERVICE,
      order: 4,
      title: 'Document Evaluation & Encoding',
      description: 'DFA evaluating officer reviews your documents, encodes your personal information into the system, and asks you to verify the details.',
      is_optional: false,
      created_at: now, updated_at: now,
    },
    {
      id: DFA_STEP_5,
      service_id: DFA_SERVICE,
      order: 5,
      title: 'Photo Capture, Biometrics & Signature',
      description: 'Your photo is taken, fingerprints are scanned, and digital signature is captured.',
      is_optional: false,
      created_at: now, updated_at: now,
    },
    {
      id: DFA_STEP_6,
      service_id: DFA_SERVICE,
      order: 6,
      title: 'Pay Processing Fee & Claim Passport',
      description: 'Pay the processing fee (₱950 regular / ₱1,200 expedite). You will receive a claim stub indicating when your passport will be available for pick-up or delivery.',
      is_optional: false,
      created_at: now, updated_at: now,
    },

    // PhilHealth Registration
    {
      id: PH_STEP_1,
      service_id: PH_SERVICE,
      order: 1,
      title: 'Determine Your Membership Type',
      description: 'Identify which membership category applies to you: Employed (registered by employer), Self-Earning/Freelancer, Overseas Filipino Worker (OFW), or Indirect Contributor (senior citizen, PWD, indigent).',
      is_optional: false,
      created_at: now, updated_at: now,
    },
    {
      id: PH_STEP_2,
      service_id: PH_SERVICE,
      order: 2,
      title: 'Fill Out the PhilHealth Member Registration Form (PMRF)',
      description: 'Download and accomplish PhilHealth Form No. 1 (PMRF) from the PhilHealth website, or get a copy at the nearest PhilHealth office.',
      is_optional: false,
      created_at: now, updated_at: now,
    },
    {
      id: PH_STEP_3,
      service_id: PH_SERVICE,
      order: 3,
      title: 'Submit Documents to PhilHealth Office',
      description: 'Submit the accomplished PMRF and supporting documents to the nearest PhilHealth Local Health Insurance Office (LHIO) or Satellite Office.',
      is_optional: false,
      created_at: now, updated_at: now,
    },
    {
      id: PH_STEP_4,
      service_id: PH_SERVICE,
      order: 4,
      title: 'Receive Your PhilHealth Identification Number (PIN)',
      description: 'After evaluation, you will be assigned a permanent PhilHealth Identification Number (PIN) which serves as your lifetime membership number.',
      is_optional: false,
      created_at: now, updated_at: now,
    },
    {
      id: PH_STEP_5,
      service_id: PH_SERVICE,
      order: 5,
      title: 'Apply for PhilHealth ID Card',
      description: 'Submit your photo and other requirements to get your physical PhilHealth ID card. You may also use the Member Data Record (MDR) as proof of membership while waiting.',
      is_optional: true,
      created_at: now, updated_at: now,
    },
  ]);

  // ─── REQUIREMENTS ─────────────────────────────────────────────────────────

  await knex('requirements').insert([
    // NBI Step 1 – Online Registration
    {
      id: '00000000-0000-4000-d001-000000000001',
      step_id: NBI_STEP_1, service_id: NBI_SERVICE,
      name: 'Valid email address',
      description: 'An active email address is required to create your NBI Online account and receive your appointment confirmation.',
      is_optional: false, notes: null, created_at: now, updated_at: now,
    },
    {
      id: '00000000-0000-4000-d001-000000000002',
      step_id: NBI_STEP_1, service_id: NBI_SERVICE,
      name: 'Personal information',
      description: 'Full legal name, date of birth, civil status, and address as reflected on your primary government-issued ID.',
      is_optional: false, notes: null, created_at: now, updated_at: now,
    },

    // NBI Step 4 – Visit NBI Office
    {
      id: '00000000-0000-4000-d001-000000000003',
      step_id: NBI_STEP_4, service_id: NBI_SERVICE,
      name: 'Primary government-issued ID (original + photocopy)',
      description: 'Any one of: Passport, Driver\'s License, SSS/GSIS ID, Postal ID, Voter\'s ID, PRC ID, or PhilSys National ID.',
      is_optional: false,
      notes: 'ID must be valid (not expired) and bear your photo and signature.',
      created_at: now, updated_at: now,
    },
    {
      id: '00000000-0000-4000-d001-000000000004',
      step_id: NBI_STEP_4, service_id: NBI_SERVICE,
      name: 'Printed appointment confirmation / reference number',
      description: 'The appointment reference number received via email after booking your slot.',
      is_optional: false, notes: 'A screenshot on your phone is accepted.', created_at: now, updated_at: now,
    },
    {
      id: '00000000-0000-4000-d001-000000000005',
      step_id: NBI_STEP_4, service_id: NBI_SERVICE,
      name: 'Proof of payment',
      description: 'Receipt or transaction reference from your chosen payment channel.',
      is_optional: false, notes: null, created_at: now, updated_at: now,
    },
    {
      id: '00000000-0000-4000-d001-000000000006',
      step_id: NBI_STEP_4, service_id: NBI_SERVICE,
      name: 'Birth Certificate (PSA-issued)',
      description: 'Required for first-time applicants whose name may be flagged (HIT) or for those with common names.',
      is_optional: true,
      notes: 'Bring this as a precaution if your name is common or if you have a prior HIT record.',
      created_at: now, updated_at: now,
    },

    // DFA Step 2 – Prepare Documents (New Passport)
    {
      id: '00000000-0000-4000-d002-000000000001',
      step_id: DFA_STEP_2, service_id: DFA_SERVICE,
      name: 'PSA-issued Birth Certificate (original + photocopy)',
      description: 'Philippine Statistics Authority (PSA) authenticated birth certificate. For minors, the PSA birth certificate is mandatory.',
      is_optional: false,
      notes: 'Must be the security paper copy from PSA, not the Local Civil Registry copy.',
      created_at: now, updated_at: now,
    },
    {
      id: '00000000-0000-4000-d002-000000000002',
      step_id: DFA_STEP_2, service_id: DFA_SERVICE,
      name: 'Valid government-issued ID (original + photocopy)',
      description: 'Any one of the following: Voter\'s ID, Driver\'s License, SSS/GSIS ID, Postal ID, PhilSys National ID, PRC ID.',
      is_optional: false, notes: null, created_at: now, updated_at: now,
    },
    {
      id: '00000000-0000-4000-d002-000000000003',
      step_id: DFA_STEP_2, service_id: DFA_SERVICE,
      name: 'Old/expired passport (for renewal)',
      description: 'Present your old passport as supporting document for renewal applications.',
      is_optional: true,
      notes: 'Required only for passport renewal. For lost passports, submit an Affidavit of Loss.',
      created_at: now, updated_at: now,
    },
    {
      id: '00000000-0000-4000-d002-000000000004',
      step_id: DFA_STEP_2, service_id: DFA_SERVICE,
      name: 'PSA Marriage Certificate (for married women, original + photocopy)',
      description: 'Required if the applicant\'s name on the birth certificate differs from the name being used (e.g., married surname).',
      is_optional: true,
      notes: 'If the name on the ID matches the birth certificate, this may not be required.',
      created_at: now, updated_at: now,
    },
    {
      id: '00000000-0000-4000-d002-000000000005',
      step_id: DFA_STEP_2, service_id: DFA_SERVICE,
      name: 'Printed appointment confirmation',
      description: 'Proof of your scheduled appointment from passport.gov.ph.',
      is_optional: false, notes: null, created_at: now, updated_at: now,
    },

    // DFA Step 6 – Pay & Claim
    {
      id: '00000000-0000-4000-d002-000000000006',
      step_id: DFA_STEP_6, service_id: DFA_SERVICE,
      name: 'Payment (₱950 regular / ₱1,200 expedite)',
      description: 'Processing fee paid at the DFA cashier. Expedite processing takes 7 working days; regular takes 15 working days.',
      is_optional: false,
      notes: 'Cash only at most DFA offices. Check your office for card payment availability.',
      created_at: now, updated_at: now,
    },
    {
      id: '00000000-0000-4000-d002-000000000007',
      step_id: DFA_STEP_6, service_id: DFA_SERVICE,
      name: 'Claim stub',
      description: 'The claim stub is issued after payment and indicates the passport release date.',
      is_optional: false,
      notes: 'Keep the claim stub safe — it is required when picking up your passport.',
      created_at: now, updated_at: now,
    },

    // PhilHealth Step 2 – Fill Out PMRF
    {
      id: '00000000-0000-4000-d003-000000000001',
      step_id: PH_STEP_2, service_id: PH_SERVICE,
      name: 'Accomplished PhilHealth Member Registration Form (PMRF / PhilHealth Form 1)',
      description: 'The PMRF must be completely and accurately filled out. Include your full name, date of birth, civil status, and dependents.',
      is_optional: false,
      notes: 'Available for download at philhealth.gov.ph or at any PhilHealth office.',
      created_at: now, updated_at: now,
    },

    // PhilHealth Step 3 – Submit Documents
    {
      id: '00000000-0000-4000-d003-000000000002',
      step_id: PH_STEP_3, service_id: PH_SERVICE,
      name: 'PSA Birth Certificate or any valid government-issued ID',
      description: 'Primary document to verify your identity and date of birth.',
      is_optional: false,
      notes: 'Bring the original and one photocopy.',
      created_at: now, updated_at: now,
    },
    {
      id: '00000000-0000-4000-d003-000000000003',
      step_id: PH_STEP_3, service_id: PH_SERVICE,
      name: 'Certificate of Employment (for employed members)',
      description: 'Document from your employer confirming your employment status and monthly salary.',
      is_optional: true,
      notes: 'Required only for employed members registering directly. Your employer typically handles this.',
      created_at: now, updated_at: now,
    },
    {
      id: '00000000-0000-4000-d003-000000000004',
      step_id: PH_STEP_3, service_id: PH_SERVICE,
      name: 'Business registration documents (for self-employed/freelancers)',
      description: 'DTI or SEC registration, Mayor\'s Permit, or any proof of business for self-earning individuals.',
      is_optional: true,
      notes: 'Required only for self-employed members.',
      created_at: now, updated_at: now,
    },

    // PhilHealth Step 5 – Apply for ID
    {
      id: '00000000-0000-4000-d003-000000000005',
      step_id: PH_STEP_5, service_id: PH_SERVICE,
      name: '2 recent 1x1 ID photos',
      description: 'Recent passport-size (1x1 inch) photographs with white background.',
      is_optional: false,
      notes: 'Only required when applying for the physical PhilHealth ID card.',
      created_at: now, updated_at: now,
    },
    {
      id: '00000000-0000-4000-d003-000000000006',
      step_id: PH_STEP_5, service_id: PH_SERVICE,
      name: 'Valid government-issued ID',
      description: 'One valid ID for identity verification when claiming your PhilHealth ID.',
      is_optional: false,
      notes: null,
      created_at: now, updated_at: now,
    },
  ]);
}
