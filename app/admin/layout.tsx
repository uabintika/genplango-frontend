import ProtectedLayout from "./ProtectedLayout";

export default function AdminLayout({ children }: Children) {
  return (
    <div className="admin-section">
      <main>
        <ProtectedLayout>{children}</ProtectedLayout>
      </main>
    </div>
  );
}
