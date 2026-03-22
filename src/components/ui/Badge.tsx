type BadgeStatus =
  | "new"
  | "updated"
  | "available"
  | "nuevo"
  | "actualizado"
  | "disponible"
  | "para_ti"
  | "un_mes";

interface BadgeProps {
  status: BadgeStatus;
  children: React.ReactNode;
}

const STATUS_STYLES: Record<
  BadgeStatus,
  { bg: string; color: string }
> = {
  new: { bg: "var(--color-accent-subtle)", color: "var(--color-accent)" },
  updated: { bg: "var(--color-accent-subtle)", color: "var(--color-accent)" },
  available: { bg: "rgba(74,222,128,0.10)", color: "var(--color-success)" },
  nuevo: { bg: "var(--color-accent-subtle)", color: "var(--color-accent)" },
  actualizado: { bg: "var(--color-accent-subtle)", color: "var(--color-accent)" },
  disponible: { bg: "rgba(74,222,128,0.10)", color: "var(--color-success)" },
  para_ti: { bg: "rgba(74,222,128,0.10)", color: "var(--color-success)" },
  un_mes: { bg: "rgba(251,191,36,0.10)", color: "#FBBF24" },
};

export default function Badge({ status, children }: BadgeProps) {
  const styles = STATUS_STYLES[status] ?? STATUS_STYLES.new;

  return (
    <span
      style={{
        display: "inline-block",
        backgroundColor: styles.bg,
        color: styles.color,
        borderRadius: "var(--radius-pill)",
        padding: "4px 12px",
        fontFamily: "var(--font-inter-tight)",
        fontSize: "var(--text-caption)",
        fontWeight: 500,
        textTransform: "uppercase",
        letterSpacing: "0.05em",
      }}
      data-status={status}
    >
      {children}
    </span>
  );
}
