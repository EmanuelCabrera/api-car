export const CAR_ERRORS = {
  NOT_FOUND: 'Car not found',
  ALREADY_EXISTS: 'Car already exists',
  INVALID_DATA: 'Invalid car data',
  UNAUTHORIZED: 'Unauthorized to perform this action',
} as const;

export const CAR_MESSAGES = {
  CREATED: 'Car created successfully',
  UPDATED: 'Car updated successfully',
  DELETED: 'Car deleted successfully',
  RETRIEVED: 'Car retrieved successfully',
} as const;

export const CAR_DEFAULTS = {
  PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
  SORT_ORDER: 'desc',
} as const; 