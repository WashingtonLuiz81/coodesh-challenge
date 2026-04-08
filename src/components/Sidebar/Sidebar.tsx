import styles from "./Sidebar.module.css";

const menuItems = [
  { label: "Dashboard", isActive: false },
  { label: "Ordens", isActive: true },
  { label: "Execuções", isActive: false },
  { label: "Histórico", isActive: false },
  { label: "Configurações", isActive: false },
];

export function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
        {menuItems.map((item) => (
          <button
            key={item.label}
            type="button"
            className={`${styles.menuItem} ${
              item.isActive ? styles.active : ""
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}