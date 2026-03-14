import { Knex } from 'knex';

const SERVICE_ID = '00000000-0000-4000-b000-000000000011';

const STEP_1 = '00000000-0000-4000-c000-000000001101';
const STEP_2 = '00000000-0000-4000-c000-000000001102';
const STEP_3 = '00000000-0000-4000-c000-000000001103';
const STEP_4 = '00000000-0000-4000-c000-000000001104';
const STEP_5 = '00000000-0000-4000-c000-000000001105';

const now = new Date();

export async function seed(knex: Knex): Promise<void> {
  // Clean existing data for this service only (non-destructive to other seeds)
  await knex('requirements').where({ service_id: SERVICE_ID }).del();
  await knex('steps').where({ service_id: SERVICE_ID }).del();

  // ─── Steps ────────────────────────────────────────────────────────────────

  await knex('steps').insert([
    {
      id: STEP_1,
      service_id: SERVICE_ID,
      order: 1,
      title: 'Visit your barangay hall',
      description:
        'Go to the Office of the Barangay Captain in your barangay of residence during office hours (typically Monday–Friday, 8:00 AM–5:00 PM). Some barangays accept walk-ins; others may require filling out a form first.',
      is_optional: false,
      created_at: now,
      updated_at: now,
    },
    {
      id: STEP_2,
      service_id: SERVICE_ID,
      order: 2,
      title: 'Fill out the clearance request form',
      description:
        'Accomplish the Barangay Clearance request form provided by the barangay secretary. Indicate the purpose of the clearance (e.g., employment, business permit, loan, etc.).',
      is_optional: false,
      created_at: now,
      updated_at: now,
    },
    {
      id: STEP_3,
      service_id: SERVICE_ID,
      order: 3,
      title: 'Present required documents',
      description:
        'Submit the request form along with your valid government-issued ID and proof of residency to the barangay secretary for verification.',
      is_optional: false,
      created_at: now,
      updated_at: now,
    },
    {
      id: STEP_4,
      service_id: SERVICE_ID,
      order: 4,
      title: 'Pay the processing fee',
      description:
        'Pay the clearance fee at the barangay treasurer\'s window. Fees vary per barangay — typically ₱50–₱200 for residents.',
      is_optional: false,
      created_at: now,
      updated_at: now,
    },
    {
      id: STEP_5,
      service_id: SERVICE_ID,
      order: 5,
      title: 'Receive your Barangay Clearance',
      description:
        'The clearance is printed and signed by the Barangay Captain (or authorized representative) and released to you the same day. The document is typically valid for 6 months from the date of issue.',
      is_optional: false,
      created_at: now,
      updated_at: now,
    },
  ]);

  // ─── Requirements ─────────────────────────────────────────────────────────

  await knex('requirements').insert([
    // Step 2 – Fill out request form
    {
      id: '00000000-0000-4000-d000-000011020001',
      step_id: STEP_2,
      service_id: SERVICE_ID,
      name: 'Purpose of clearance',
      description:
        'You must state the specific reason for requesting the clearance (e.g., employment, business permit, loan application, travel abroad). Different purposes may require the Barangay Captain\'s personal signature.',
      is_optional: false,
      notes: null,
      created_at: now,
      updated_at: now,
    },

    // Step 3 – Present documents
    {
      id: '00000000-0000-4000-d000-000011030001',
      step_id: STEP_3,
      service_id: SERVICE_ID,
      name: 'Valid government-issued ID (original + photocopy)',
      description:
        'Any one of: Passport, Driver\'s License, SSS/GSIS ID, PhilSys National ID, Voter\'s ID, Postal ID, or PRC ID. The ID must bear your photo, signature, and current address.',
      is_optional: false,
      notes: 'Some barangays accept school IDs or company IDs for students and employees.',
      created_at: now,
      updated_at: now,
    },
    {
      id: '00000000-0000-4000-d000-000011030002',
      step_id: STEP_3,
      service_id: SERVICE_ID,
      name: 'Proof of residency',
      description:
        'Document confirming that you are a current resident of the barangay. Accepted documents include a utility bill (electricity, water, or internet) or barangay ID, typically not older than 3 months.',
      is_optional: false,
      notes: 'If your government ID shows the barangay address, a separate proof of residency may not be required.',
      created_at: now,
      updated_at: now,
    },
    {
      id: '00000000-0000-4000-d000-000011030003',
      step_id: STEP_3,
      service_id: SERVICE_ID,
      name: 'Certificate of Residency (for new residents)',
      description:
        'If you have resided in the barangay for less than 6 months, some barangays require a Certificate of Residency signed by a known neighbor or landlord.',
      is_optional: true,
      notes: 'Check with your barangay office if this is required for your case.',
      created_at: now,
      updated_at: now,
    },

    // Step 4 – Pay fee
    {
      id: '00000000-0000-4000-d000-000011040001',
      step_id: STEP_4,
      service_id: SERVICE_ID,
      name: 'Processing fee (₱50–₱200 depending on barangay and purpose)',
      description:
        'Fees are set by each barangay and may vary by purpose — clearances for employment or business permits sometimes carry a higher fee than those for personal use.',
      is_optional: false,
      notes: 'Indigent residents may be eligible for a fee waiver. Ask the barangay secretary.',
      created_at: now,
      updated_at: now,
    },
    {
      id: '00000000-0000-4000-d000-000011040002',
      step_id: STEP_4,
      service_id: SERVICE_ID,
      name: '1x1 or 2x2 ID photo (for some barangays)',
      description:
        'Some barangays affix the applicant\'s photo to the clearance document. Bring one or two recent ID photos just in case.',
      is_optional: true,
      notes: null,
      created_at: now,
      updated_at: now,
    },
  ]);
}
