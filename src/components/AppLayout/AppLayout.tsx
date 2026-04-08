import { useState, type ReactNode } from "react";
import { AppHeader } from "@/components/AppHeader/AppHeader";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import styles from "./AppLayout.module.css";

type AppLayoutProps = {
  children: ReactNode;
};

export function AppLayout({ children }: AppLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleToggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleCloseMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className={styles.container}>
      <AppHeader
        isMobileMenuOpen={isMobileMenuOpen}
        onToggleMobileMenu={handleToggleMobileMenu}
      />

      <div className={styles.contentWrapper}>
        {isMobileMenuOpen && (
          <button
            type="button"
            className={styles.overlay}
            onClick={handleCloseMobileMenu}
            aria-label="Fechar menu lateral"
          />
        )}

        <aside
          className={`${styles.sidebarWrapper} ${
            isMobileMenuOpen ? styles.sidebarOpen : ""
          }`}
        >
          <Sidebar />
        </aside>

        <main className={styles.mainContent}>{children}</main>
      </div>
    </div>
  );
}