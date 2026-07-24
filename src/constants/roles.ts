export type RoleCode = 'APL' | 'ACS' | 'SUP' | 'ADM' | 'MGR' | 'ADTUK'

export const PAGE_ROLES: Record<string, RoleCode[]> = {
  '/dashboard': ['APL', 'ACS', 'ADM', 'SUP'],
  '/schema': ['ACS', 'ADM', 'SUP'],
  '/scheme-submission': ['APL'],
  '/applicant-appeal': ['APL'],
  '/requirement': ['ACS', 'ADM'],
}
