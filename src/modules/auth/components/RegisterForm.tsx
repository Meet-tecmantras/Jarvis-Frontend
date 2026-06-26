"use client";

import { useMemo, useState } from 'react';
import { registerSchema, type RegisterFormValues } from '../schemas/register.schema';

const initialValues: RegisterFormValues = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
  acceptTerms: false,
};

export function RegisterForm() {
  const [values, setValues] = useState<RegisterFormValues>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof RegisterFormValues, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  const canSubmit = useMemo(
    () => values.fullName && values.email && values.password && values.confirmPassword && values.acceptTerms,
    [values]
  );

  const handleChange = (field: keyof RegisterFormValues) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = field === 'acceptTerms' ? event.target.checked : event.target.value;
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = registerSchema.safeParse(values);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof RegisterFormValues, string>> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof RegisterFormValues | undefined;
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
    <form className="login-form" onSubmit={handleSubmit} noValidate>
      <label>
        <span>Full name</span>
        <input value={values.fullName} onChange={handleChange('fullName')} placeholder="Your name" />
        {errors.fullName ? <small>{errors.fullName}</small> : null}
      </label>

      <label>
        <span>Email</span>
        <input type="email" value={values.email} onChange={handleChange('email')} placeholder="you@example.com" />
        {errors.email ? <small>{errors.email}</small> : null}
      </label>

      <label>
        <span>Password</span>
        <input type="password" value={values.password} onChange={handleChange('password')} placeholder="Create a strong password" />
        {errors.password ? <small>{errors.password}</small> : null}
      </label>

      <label>
        <span>Confirm password</span>
        <input type="password" value={values.confirmPassword} onChange={handleChange('confirmPassword')} placeholder="Repeat password" />
        {errors.confirmPassword ? <small>{errors.confirmPassword}</small> : null}
      </label>

      <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <input type="checkbox" checked={values.acceptTerms} onChange={handleChange('acceptTerms')} />
        <span>I accept the terms and conditions</span>
      </label>
      {errors.acceptTerms ? <small>{errors.acceptTerms}</small> : null}

      <button type="submit" disabled={!canSubmit}>Create account</button>
      {submitted ? <p className="success-message">Registration form validated successfully.</p> : null}
    </form>
  );
}
