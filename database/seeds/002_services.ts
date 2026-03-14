import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('services').del();

  await knex('services').insert([
    // ── NBI ───────────────────────────────────────────────────────────────────
    {
      id: '00000000-0000-4000-b000-000000000001',
      agency_id: '00000000-0000-4000-a000-000000000001',
      name: 'NBI Clearance',
      slug: 'nbi-clearance',
      description:
        'The NBI Clearance is an official document issued by the National Bureau of Investigation certifying that the bearer has no derogatory record on file. It is commonly required for employment, travel, and government transactions.',
      estimated_time: '1–3 hours (same-day release for clean records)',
      appointment_url: 'https://clearance.nbi.gov.ph',
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },

    // ── DFA ───────────────────────────────────────────────────────────────────
    {
      id: '00000000-0000-4000-b000-000000000002',
      agency_id: '00000000-0000-4000-a000-000000000002',
      name: 'Passport Application',
      slug: 'dfa-passport-application',
      description:
        'The Philippine Passport is the primary travel document for Filipino citizens. Applications cover new applications and renewals for both adult and minor passports at DFA consular offices.',
      estimated_time: '15 working days (regular) or 7 working days (expedite)',
      appointment_url: 'https://passport.gov.ph',
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },

    // ── PhilHealth ────────────────────────────────────────────────────────────
    {
      id: '00000000-0000-4000-b000-000000000003',
      agency_id: '00000000-0000-4000-a000-000000000003',
      name: 'PhilHealth Membership Registration',
      slug: 'philhealth-registration',
      description:
        'PhilHealth membership provides Filipinos with access to subsidized health care services. Members can register as employed, self-employed, or indirect contributors (senior citizens, indigents, etc.).',
      estimated_time: '30–60 minutes for walk-in registration',
      appointment_url: null,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },

    // ── SSS ───────────────────────────────────────────────────────────────────
    {
      id: '00000000-0000-4000-b000-000000000004',
      agency_id: '00000000-0000-4000-a000-000000000004',
      name: 'SSS Membership Registration',
      slug: 'sss-registration',
      description:
        'The Social Security System (SSS) provides social insurance protection to workers in the private sector. Registration gives members access to sickness, maternity, disability, retirement, and death benefits.',
      estimated_time: '30–60 minutes for walk-in; same day for online registration',
      appointment_url: 'https://www.sss.gov.ph',
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },

    // ── Pag-IBIG ──────────────────────────────────────────────────────────────
    {
      id: '00000000-0000-4000-b000-000000000005',
      agency_id: '00000000-0000-4000-a000-000000000005',
      name: 'Pag-IBIG Fund Membership Registration',
      slug: 'pagibig-registration',
      description:
        "The Home Development Mutual Fund (Pag-IBIG Fund) provides its members with housing loan programs, multi-purpose loans, and provident savings. Membership is mandatory for all employees covered by the SSS and GSIS, as well as for self-employed individuals.",
      estimated_time: '30 minutes for walk-in; same day online',
      appointment_url: 'https://www.pagibigfund.gov.ph',
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },

    // ── BIR ───────────────────────────────────────────────────────────────────
    {
      id: '00000000-0000-4000-b000-000000000006',
      agency_id: '00000000-0000-4000-a000-000000000006',
      name: 'TIN Application (BIR Registration)',
      slug: 'bir-tin-application',
      description:
        'The Tax Identification Number (TIN) is issued by the Bureau of Internal Revenue to individuals and entities for tax purposes. It is required for employment, business transactions, and opening bank accounts.',
      estimated_time: '1–2 hours for walk-in; 3–5 days for online processing',
      appointment_url: null,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },

    // ── LTO ───────────────────────────────────────────────────────────────────
    {
      id: '00000000-0000-4000-b000-000000000007',
      agency_id: '00000000-0000-4000-a000-000000000007',
      name: "Driver's License Application",
      slug: 'lto-drivers-license-new',
      description:
        "A Philippine Driver's License issued by the Land Transportation Office authorizes the holder to operate motor vehicles. New applicants must pass a written exam and practical driving test.",
      estimated_time: '1–2 days (including student permit validity period)',
      appointment_url: 'https://lto.gov.ph',
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: '00000000-0000-4000-b000-000000000008',
      agency_id: '00000000-0000-4000-a000-000000000007',
      name: "Driver's License Renewal",
      slug: 'lto-drivers-license-renewal',
      description:
        "Renew an expiring or expired Philippine Driver's License at any LTO licensing center. Renewal requires a medical certificate and payment of applicable fees.",
      estimated_time: '2–4 hours',
      appointment_url: 'https://lto.gov.ph',
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },

    // ── COMELEC ───────────────────────────────────────────────────────────────
    {
      id: '00000000-0000-4000-b000-000000000009',
      agency_id: '00000000-0000-4000-a000-000000000008',
      name: "Voter's Registration",
      slug: 'comelec-voters-registration',
      description:
        "Register as a voter with the Commission on Elections (COMELEC) to participate in Philippine national and local elections. Registration is open to Filipino citizens aged 18 and above.",
      estimated_time: '30–60 minutes per visit (biometrics capture required)',
      appointment_url: 'https://voterregistration.comelec.gov.ph',
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },

    // ── PSA ───────────────────────────────────────────────────────────────────
    {
      id: '00000000-0000-4000-b000-000000000010',
      agency_id: '00000000-0000-4000-a000-000000000009',
      name: 'PSA Birth Certificate Request',
      slug: 'psa-birth-certificate',
      description:
        'Request a PSA-authenticated copy of a birth certificate from the Philippine Statistics Authority. Required for passport applications, school enrollment, marriage, and other civil transactions.',
      estimated_time: '3–5 working days (online delivery) or same day (walk-in)',
      appointment_url: 'https://www.psaserbilis.com.ph',
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },

    // ── Barangay ──────────────────────────────────────────────────────────────
    {
      id: '00000000-0000-4000-b000-000000000011',
      agency_id: '00000000-0000-4000-a000-000000000010',
      name: 'Barangay Clearance',
      slug: 'barangay-clearance',
      description:
        'A Barangay Clearance is an official document issued by the Office of the Barangay Captain certifying that the bearer is a resident in good standing with no derogatory record in the barangay. It is commonly required for employment, business permits, loans, and other local transactions.',
      estimated_time: '30 minutes to 1 hour (walk-in, same day)',
      appointment_url: null,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);
}
