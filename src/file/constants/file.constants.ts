export const UPLOAD_PATH = 'uploads' as const;
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/gif'];
export const FILE_NAME_REGEX = /^(?:[a-zA-Z0-9_-]+)\.(jpg|jpeg|png|gif)$/;

export const FILE_ERRORS = {
    NO_FILE: 'No file provided',
    INVALID_FILE_TYPE: 'Invalid file type',
    FILE_TOO_LARGE: 'File is too large',
    INVALID_FILE_NAME: 'Invalid file name',
    FILE_CREATION_ERROR: 'Error creating file',
    FILE_NOT_FOUND: 'File not found',
} as const;
