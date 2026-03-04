const ROWS = [
  { id: "001", name: "Alice Chen",   role: "Designer",  status: "Active", joined: "Jan 2024" },
  { id: "002", name: "Bob Martin",   role: "Engineer",  status: "Active", joined: "Mar 2024" },
  { id: "003", name: "Carol White",  role: "PM",        status: "Away",   joined: "Jun 2024" },
  { id: "004", name: "David Lee",    role: "Engineer",  status: "Active", joined: "Aug 2024" },
];

export function DataTableSection() {
  return (
    <div
      className="overflow-hidden rounded-lg border text-xs"
      style={{ borderColor: "var(--p-border)" }}
    >
      {/* Header row */}
      <div
        className="grid grid-cols-5 px-4 py-2.5 font-semibold uppercase tracking-wider text-[10px]"
        style={{ backgroundColor: "var(--p-surface-2)", color: "var(--p-text-2)" }}
      >
        <span>ID</span>
        <span>Name</span>
        <span>Role</span>
        <span>Status</span>
        <span>Joined</span>
      </div>

      {/* Data rows */}
      {ROWS.map((row, i) => (
        <div
          key={row.id}
          className="grid grid-cols-5 px-4 py-2.5 border-t"
          style={{
            backgroundColor: i % 2 === 0 ? "var(--p-surface-1)" : "transparent",
            borderColor: "var(--p-border)",
            color: "var(--p-text-1)",
          }}
        >
          <span className="font-mono" style={{ color: "var(--p-text-2)" }}>
            #{row.id}
          </span>
          <span className="font-medium">{row.name}</span>
          <span style={{ color: "var(--p-text-2)" }}>{row.role}</span>
          <span>
            <span
              className="px-2 py-0.5 rounded-full text-[10px] font-medium"
              style={{
                backgroundColor: "var(--p-badge)",
                color: "var(--p-badge-text)",
              }}
            >
              {row.status}
            </span>
          </span>
          <span style={{ color: "var(--p-text-2)" }}>{row.joined}</span>
        </div>
      ))}
    </div>
  );
}
