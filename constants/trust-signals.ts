export const TENURE_OPTIONS = [
  { value: 'LT_1Y',           label: '< 1 year' },
  { value: 'ONE_TO_TWO_Y',    label: '1–2 years' },
  { value: 'THREE_TO_FIVE_Y', label: '3–5 years' },
  { value: 'FIVE_PLUS_Y',     label: '5+ years' },
  { value: 'INTERVIEW',       label: 'Interview only' },
] as const

export type TenureValue = typeof TENURE_OPTIONS[number]['value']

export const ROLE_OPTIONS = [
  { value: 'ENGINEERING',       label: 'Engineering' },
  { value: 'DESIGN',            label: 'Design' },
  { value: 'PRODUCT',           label: 'Product' },
  { value: 'SALES',             label: 'Sales' },
  { value: 'MARKETING',         label: 'Marketing' },
  { value: 'OPS',               label: 'Operations' },
  { value: 'HR',                label: 'HR' },
  { value: 'FINANCE',           label: 'Finance' },
  { value: 'CUSTOMER_SUPPORT',  label: 'Support' },
  { value: 'OTHER',             label: 'Other' },
] as const

export type RoleValue = typeof ROLE_OPTIONS[number]['value']

export const STATUS_OPTIONS = [
  { value: 'CURRENT',    label: 'Current' },
  { value: 'FORMER',     label: 'Former' },
  { value: 'INTERVIEWED', label: 'Interviewed' },
] as const

export type StatusValue = typeof STATUS_OPTIONS[number]['value']

/** Human-readable labels for display in cards */
export const TENURE_LABEL: Record<TenureValue, string> = {
  LT_1Y:           '< 1y',
  ONE_TO_TWO_Y:    '1–2y',
  THREE_TO_FIVE_Y: '3–5y',
  FIVE_PLUS_Y:     '5+y',
  INTERVIEW:       'Interview',
}

export const ROLE_LABEL: Record<RoleValue, string> = {
  ENGINEERING:      'Engineering',
  DESIGN:           'Design',
  PRODUCT:          'Product',
  SALES:            'Sales',
  MARKETING:        'Marketing',
  OPS:              'Operations',
  HR:               'HR',
  FINANCE:          'Finance',
  CUSTOMER_SUPPORT: 'Support',
  OTHER:            'Other',
}

export const STATUS_LABEL: Record<StatusValue, string> = {
  CURRENT:    'Current',
  FORMER:     'Former',
  INTERVIEWED: 'Interviewed',
}
