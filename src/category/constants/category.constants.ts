export const CATEGORY_ERRORS = {
  NOT_FOUND: 'Category not found',
  ALREADY_EXISTS: 'Category already exists',
  INVALID_DATA: 'Invalid category data',
  UNAUTHORIZED: 'Unauthorized to perform this action',
} as const;

export const CATEGORY_MESSAGES = {
  CREATED: 'Category created successfully',
  UPDATED: 'Category updated successfully',
  DELETED: 'Category deleted successfully',
  RETRIEVED: 'Category retrieved successfully',
} as const;

export const CATEGORY_DEFAULTS = {
  PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
  SORT_ORDER: 'desc',
} as const; 