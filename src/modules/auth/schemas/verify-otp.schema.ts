import { z } from 'zod';

export const verifyOtpSchema = z.object({
  otp: z.string().min(6, 'OTP is required').max(6, 'OTP must be 6 digits').regex(/^\d{6}$/, 'OTP must contain exactly 6 digits'),
});

export type VerifyOtpFormValues = z.infer<typeof verifyOtpSchema>;
