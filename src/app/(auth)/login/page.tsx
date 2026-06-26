import { LoginForm } from '@/modules/auth/components/LoginForm';

export default function LoginPage() {
  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="auth-copy">
          <p className="auth-kicker">Welcome back</p>
          <h1>Sign in to Jarvis</h1>
          <p>Access your dashboard, projects, and workspace securely.</p>
        </div>
        <LoginForm />
      </section>
    </main>
  );
}
