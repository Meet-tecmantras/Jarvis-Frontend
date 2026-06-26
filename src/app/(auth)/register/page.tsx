import { RegisterForm } from '@/modules/auth/components/RegisterForm';

export default function RegisterPage() {
  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="auth-copy">
          <p className="auth-kicker">Get started</p>
          <h1>Create your Jarvis account</h1>
          <p>Register to manage your workspace, projects, and team access.</p>
        </div>
        <RegisterForm />
      </section>
    </main>
  );
}
