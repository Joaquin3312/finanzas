export const Pagination = ({ transaccionesPorPagina, paginaActual, setPaginaActual, totalTransacciones }) => {
  const pageNumbers = [];
  // Calcular el número total de páginas:
  for (let i = 1; i <= Math.ceil(totalTransacciones / transaccionesPorPagina); i++) {
    pageNumbers.push(i);
  }

  const onPreviusPage = () => {
    if (paginaActual > 1) {
      setPaginaActual(paginaActual - 1);
    }
  };

  const onNextPage = () => {
    if (paginaActual < pageNumbers.length) {
      setPaginaActual(paginaActual + 1);
    }
  };

  const onSpecificPage = (n) => {
    setPaginaActual(n);
  };

  return (
    <>
      <nav className="pagination is-centered" role="navigation" aria-label="pagination">
        <button
          className={`pagination-previous has-text-black ${paginaActual === 1 ? 'is-disabled' : ''}`}
          onClick={onPreviusPage}
          disabled={paginaActual === 1}
        >
          Anterior
        </button>
        <button
          className={`pagination-next has-text-black ${paginaActual >= pageNumbers.length ? 'is-disabled' : ''}`}
          onClick={onNextPage}
          disabled={paginaActual >= pageNumbers.length}
        >
          Siguiente
        </button>
        <ul className="pagination-list">
          {pageNumbers.map((noPage) => (
            <li key={noPage}>
              <button
                className={`pagination-link button is-primary ${noPage === paginaActual ? 'is-current' : ''}`}
                onClick={() => onSpecificPage(noPage)}
              >
                {noPage}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};
