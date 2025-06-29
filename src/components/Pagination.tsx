
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
}

export default function PaginationFooter({ currentPage, totalPages, onPrev, onNext } : PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <footer className='flex justify-between items-center mt-4 pt-2 border-t'>
      <button
        onClick={onPrev}
        disabled={currentPage === 1}
        className='px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded shadow-md disabled:bg-gray-400'
      >
        Anterior
      </button>
      <span className='text-white'>
        Página {currentPage} de {totalPages}
      </span>
      <button
        onClick={onNext}
        disabled={currentPage === totalPages}
        className='px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded shadow-md disabled:bg-gray-400'
      >
        Siguiente
      </button>
    </footer>
  );
}