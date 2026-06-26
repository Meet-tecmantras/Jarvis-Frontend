"use client";

import { useState } from 'react';
import { verifyOtpSchema, type VerifyOtpFormValues } from '../schemas/verify-otp.schema';

const initialValues: VerifyOtpFormValues = { otp: '' };

export function VerifyOtpModal() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof VerifyOtpFormValues, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = verifyOtpSchema.safeParse(values);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof VerifyOtpFormValues, string>> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof VerifyOtpFormValues | undefined;
        if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      setSubmitted(false);
      return;
    }

    setErrors({});
    setSubmitted(true);
  };

  return (
    <div className="auth-modal">
      <div className="auth-modal__content">
        <h2>Verify OTP</h2>
        <p>Enter the 6-digit code sent to your email.</p>
        <form className="login-form" onSubmit={handleSubmit} noValidate>
          <label>
            <span>OTP</span>
            <input inputMode="numeric" maxLength={6} value={values.otp} onChange={(e) => setValues({ otp: e.target.value })} placeholder="123456" />
            {errors.otp ? <small>{errors.otp}</small> : null}
          </label>
          <button type="submit">Verify code</button>
          {submitted ? <p className="success-message">OTP validated successfully.</p> : null}
        </form>
      </div>
    </div>
  );
}
