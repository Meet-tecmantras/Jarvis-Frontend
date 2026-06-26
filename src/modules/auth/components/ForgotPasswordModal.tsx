"use client";

import { useState } from 'react';
import { forgotPasswordSchema, type ForgotPasswordFormValues } from '../schemas/forgot-password.schema';

const initialValues: ForgotPasswordFormValues = { email: '' };

export function ForgotPasswordModal() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof ForgotPasswordFormValues, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = forgotPasswordSchema.safeParse(values);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ForgotPasswordFormValues, string>> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof ForgotPasswordFormValues | undefined;
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
        <h2>Forgot password</h2>
        <p>Enter your email and we will send a reset link.</p>
        <form className="login-form" onSubmit={handleSubmit} noValidate>
          <label>
            <span>Email</span>
            <input type="email" value={values.email} onChange={(e) => setValues({ email: e.target.value })} placeholder="you@example.com" />
            {errors.email ? <small>{errors.email}</small> : null}
          </label>
          <button type="submit">Send reset link</button>
          {submitted ? <p className="success-message">Reset link request validated successfully.</p> : null}
        </form>
      </div>
    </div>
  );
}
