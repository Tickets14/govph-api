import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('agencies').del();

  await knex('agencies').insert([
    {
      id: '00000000-0000-4000-a000-000000000001',
      name: 'National Bureau of Investigation',
      slug: 'nbi',
      website_url: 'https://clearance.nbi.gov.ph',
      logo_url: null,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: '00000000-0000-4000-a000-000000000002',
      name: 'Department of Foreign Affairs',
      slug: 'dfa',
      website_url: 'https://passport.gov.ph',
      logo_url: null,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: '00000000-0000-4000-a000-000000000003',
      name: 'Philippine Health Insurance Corporation',
      slug: 'philhealth',
      website_url: 'https://www.philhealth.gov.ph',
      logo_url: null,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: '00000000-0000-4000-a000-000000000004',
      name: 'Social Security System',
      slug: 'sss',
      website_url: 'https://www.sss.gov.ph',
      logo_url: null,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: '00000000-0000-4000-a000-000000000005',
      name: 'Home Development Mutual Fund',
      slug: 'pagibig',
      website_url: 'https://www.pagibigfund.gov.ph',
      logo_url: null,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: '00000000-0000-4000-a000-000000000006',
      name: 'Bureau of Internal Revenue',
      slug: 'bir',
      website_url: 'https://www.bir.gov.ph',
      logo_url: null,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: '00000000-0000-4000-a000-000000000007',
      name: 'Land Transportation Office',
      slug: 'lto',
      website_url: 'https://lto.gov.ph',
      logo_url: null,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: '00000000-0000-4000-a000-000000000008',
      name: 'Commission on Elections',
      slug: 'comelec',
      website_url: 'https://www.comelec.gov.ph',
      logo_url: null,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: '00000000-0000-4000-a000-000000000009',
      name: 'Philippine Statistics Authority',
      slug: 'psa',
      website_url: 'https://psa.gov.ph',
      logo_url: null,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);
}
