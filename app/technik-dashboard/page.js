export const dynamic = 'force-static';

export default function TechnikDashboardPage() {
  return (
    <main style={{ padding: 24, fontFamily: 'system-ui' }}>
      <h1 style={{ fontSize: 20, fontWeight: 600 }}>Technik-Dashboard</h1>
      <p style={{ marginTop: 10 }}>
        Öffnen:
        {' '}
        <a href="/technik-dashboard/index.html" style={{ textDecoration: 'underline' }}>
          /technik-dashboard/index.html
        </a>
      </p>
    </main>
  );
}
