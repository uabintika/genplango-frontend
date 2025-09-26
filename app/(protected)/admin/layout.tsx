export default function AdminLayout({ children }: Children) {
  return (
    <div className="admin-section">
      <main>{children}</main>
    </div>
  );
}
