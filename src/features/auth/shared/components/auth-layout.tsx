interface AuthLayoutProps {
  left: React.ReactNode;
  right: React.ReactNode;
}

export function AuthLayout({ left, right }: AuthLayoutProps) {
  return (
    <section
      id="auth-layout"
      className="grid grid-cols-1 lg:grid-cols-2 min-h-screen w-full overflow-hidden"
    >
      <div className="w-full min-h-screen hidden lg:block">{left}</div>
      <div className="flex flex-col items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-lg">{right}</div>
      </div>
    </section>
  );
}
