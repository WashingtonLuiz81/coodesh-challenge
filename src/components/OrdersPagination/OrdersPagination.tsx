import styles from "./OrdersPagination.module.css";

type OrdersPaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function OrdersPagination({
  currentPage,
  totalPages,
  onPageChange,
}: OrdersPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className={styles.wrapper}>
      <span className={styles.summary}>
        Página <strong>{currentPage}</strong> de <strong>{totalPages}</strong>
      </span>

      <div className={styles.controls}>
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={styles.navButton}
        >
          Anterior
        </button>

        <div className={styles.pages}>
          {pages.map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              className={`${styles.pageButton} ${
                currentPage === page ? styles.active : ""
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={styles.navButton}
        >
          Próxima
        </button>
      </div>
    </div>
  );
}