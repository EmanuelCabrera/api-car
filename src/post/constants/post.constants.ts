export const POST_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  DELETED: 'deleted',
} as const;

export const POST_ERROR = {
  POST_NOT_FOUND: 'Post not found',
  POST_ALREADY_EXISTS: 'Post already exists',
  POST_NOT_ACTIVE: 'Post is not active',
  POST_NOT_DELETED: 'Post is not deleted',
} as const;

