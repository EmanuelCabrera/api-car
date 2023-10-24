export const jwtConstants = {
    secret: process.env.JWT_SECRET_KEY,
    expiresIn: '1h', // Token expiration time
};