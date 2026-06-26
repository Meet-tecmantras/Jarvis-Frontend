"use client";

import { useMemo, useState } from 'react';
import { loginSchema, type LoginFormValues } from '../schemas/login.schema';

const initialValues: LoginFormValues = {
  email: '',
  password: '',
};

export function LoginForm() {
  const [values, setValues] = useState<LoginFormValues>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof LoginFormValues, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  const canSubmit = useMemo(() => values.email.length > 0 && values.password.length > 0, [values]);

  const handleChange = (field: keyof LoginFormValues) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, [field]: event.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = loginSchema.safeParse(values);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof LoginFormValues, string>> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof LoginFormValues | undefined;
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
        <span>Email</span>
        <input type="email" value={values.email} onChange={handleChange('email')} placeholder="you@example.com" />
        {errors.email ? <small>{errors.email}</small> : null}
      </label>

      <label>
        <span>Password</span>
        <input type="password" value={values.password} onChange={handleChange('password')} placeholder="Enter your password" />
        {errors.password ? <small>{errors.password}</small> : null}
      </label>

      <button type="submit" disabled={!canSubmit}>Sign in</button>
      {submitted ? <p className="success-message">Login form validated successfully.</p> : null}
    </form>
  );
}
