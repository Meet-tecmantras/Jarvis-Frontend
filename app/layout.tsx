export const metadata = {
  title: 'Jarvis Frontend',
  description: 'Next.js scaffold for Jarvis Frontend',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
