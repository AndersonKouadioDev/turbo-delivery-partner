import { z } from 'zod';

// Login
export const loginSchema = z.object({
    username: z.string(),
    password: z.string(),
});
export type _loginSchema = z.infer<typeof loginSchema>;

// Register 1
export const register1Schema = z.object({
    email: z.string().email(),
});
export type _register1Schema = z.infer<typeof register1Schema>;

// Register 2
export const register2Schema = z.object({
    code: z.string(),
});
export type _register2Schema = z.infer<typeof register2Schema>;

// Register 3
export const register3Schema = z.object({
    email: z.string().email(),
    firstName: z.string(),
    lastName: z.string(),
    telephone: z.string(),
    username: z.string(),
});
export type _register3Schema = z.infer<typeof register3Schema>;

// Change Password
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

export const changePasswordSchema = z
    .object({
        username: z.string(),
        oldPassword: z.string(),
        newPassword: z.string().regex(passwordRegex, 'Le mot de passe doit contenir au moins 8 caractères, une lettre majuscule, un symbole et un chiffre.'),
        confirm_password: z.string(),
    });

export type _changePasswordSchema = z.infer<typeof changePasswordSchema>;

// New Password
export const newPasswordSchema = z.object({
    token: z.string(),
    newPassword: z.string(),
    confirm_password: z.string(),
});
export type _newPasswordSchema = z.infer<typeof newPasswordSchema>;
