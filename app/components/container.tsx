export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen w-full flex-col items-center">
      <div className="flex w-full max-w-7xl">{children}</div>
    </main>
  );
}
