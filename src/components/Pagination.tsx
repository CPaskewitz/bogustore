type PaginationProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    return (
        <div className="mt-8 flex justify-center">
            {Array.from({ length: totalPages }, (_, index) => (
                <button
                    key={index}
                    onClick={() => onPageChange(index + 1)}
                    className={`px-4 py-2 mx-1 ${currentPage === index + 1 ? 'bg-green-500 text-white' : 'bg-gray-300'}`}
                >
                    {index + 1}
                </button>
            ))}
        </div>
    );
}