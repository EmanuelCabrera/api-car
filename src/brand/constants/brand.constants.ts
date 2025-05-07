export const BRAND_ERRORS = {
  NOT_FOUND: 'Brand not found',
  ALREADY_EXISTS: 'Brand already exists',
  INVALID_DATA: 'Invalid brand data',
  UNAUTHORIZED: 'Unauthorized to perform this action',
} as const;

export const BRAND_MESSAGES = {
  CREATED: 'Brand created successfully',
  UPDATED: 'Brand updated successfully',
  DELETED: 'Brand deleted successfully',
  RETRIEVED: 'Brand retrieved successfully',
} as const;

export const BRAND_DEFAULTS = {
  PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
  SORT_ORDER: 'desc',
} as const;



