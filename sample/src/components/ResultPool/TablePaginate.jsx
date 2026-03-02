
import { useState, useEffect, useMemo } from "react"


function TablePaginate({ total = 0, itemsPerPage=10, currentPage = 1, onPageChange}){

    const [totalPages, setTotalPages] = useState(0);
    const [jumpToPage, setJumpToPage] = useState("");
    const [showJumpInput, setShowJumpInput] = useState(false);
    

    //Setting the Total Pages
    useEffect(() => {
        if(total > 0 & itemsPerPage > 0){
            setTotalPages(Math.ceil(total / itemsPerPage))
        }

    }, [total, itemsPerPage]);

    // Generate smart page numbers with ellipsis
    const getPageNumbers = useMemo(() => {
        const pages = [];
        const maxVisible = 5; // Maximum visible page numbers
        
        if (totalPages <= maxVisible) {
            // Show all pages if total is small
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Always show first page
            pages.push(1);
            
            if (currentPage <= 3) {
                // Near the start
                for (let i = 2; i <= 4; i++) {
                    pages.push(i);
                }
                pages.push('ellipsis-end');
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                // Near the end
                pages.push('ellipsis-start');
                for (let i = totalPages - 3; i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                // In the middle
                pages.push('ellipsis-start');
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pages.push(i);
                }
                pages.push('ellipsis-end');
                pages.push(totalPages);
            }
        }
        
        return pages;
    }, [totalPages, currentPage]);

    const handleJumpToPage = (e) => {
        e.preventDefault();
        const page = parseInt(jumpToPage);
        if (page >= 1 && page <= totalPages) {
            onPageChange(page);
            setJumpToPage("");
            setShowJumpInput(false);
        }
    };

    if(totalPages === 0) return null;
   

    return (
        <div className="flex flex-col sm:flex-row items-center gap-3">
            {/* Pagination Controls */}
            <ul className="inline-flex items-center -space-x-px lg:m-0 my-3">
                {/* Previous Button */}
                <li className={`${currentPage === 1 ? "cursor-not-allowed opacity-50" : "cursor-pointer"} `}>
                    <button 
                        disabled={currentPage === 1} 
                        onClick={() => onPageChange(currentPage - 1)}  
                        className="block py-2 px-3 ml-0 leading-tight rounded-l-lg border-2 border-secondary/30 bg-black/50 text-white hover:bg-secondary hover:text-primary transition-all duration-300 disabled:hover:bg-black/50 disabled:hover:text-white"
                    >
                        <span className="sr-only">Previous</span>
                        <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path>
                        </svg>
                    </button>
                </li>

                {/* Page Numbers */}
                {getPageNumbers.map((page, index) => {
                    if (page === 'ellipsis-start' || page === 'ellipsis-end') {
                        return (
                            <li key={`ellipsis-${index}`} className="cursor-default">
                                <span className="block py-2 px-3 leading-tight text-white bg-black/50 border-2 border-secondary/30">
                                    <span className="text-secondary">...</span>
                                </span>
                            </li>
                        );
                    }
                    
                    return (
                        <li key={page} className="cursor-pointer">
                            <button
                                onClick={() => onPageChange(page)}
                                className={`
                                    py-2 px-3 sm:px-4 leading-tight font-semibold border-2 transition-all duration-300
                                    ${page === currentPage 
                                        ? "bg-secondary text-primary border-secondary shadow-lg shadow-secondary/50" 
                                        : "bg-black/50 text-white border-secondary/30 hover:bg-secondary/20 hover:border-secondary/60"
                                    }
                                `}
                            >
                                {page}
                            </button>
                        </li>
                    );
                })}

                {/* Next Button */}
                <li className={`${currentPage === totalPages ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}>
                    <button 
                        disabled={currentPage === totalPages}
                        onClick={() => onPageChange(currentPage + 1)} 
                        className="block py-2 px-3 leading-tight text-white bg-black/50 rounded-r-lg border-2 border-secondary/30 hover:bg-secondary hover:text-primary transition-all duration-300 disabled:hover:bg-black/50 disabled:hover:text-white"
                    >
                        <span className="sr-only">Next</span>
                        <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                        </svg>
                    </button>
                </li>
            </ul>

            {/* Jump to Page Input */}
            <div className="flex items-center gap-2">
                {!showJumpInput ? (
                    <button
                        onClick={() => setShowJumpInput(true)}
                        className="px-3 py-2 text-sm bg-black/50 text-white border-2 border-secondary/30 rounded-lg hover:bg-secondary/20 hover:border-secondary/60 transition-all duration-300"
                        title="Jump to page"
                    >
                        <i className="ri-arrow-right-up-line"></i>
                    </button>
                ) : (
                    <form onSubmit={handleJumpToPage} className="flex items-center gap-2">
                        <input
                            type="number"
                            min="1"
                            max={totalPages}
                            value={jumpToPage}
                            onChange={(e) => setJumpToPage(e.target.value)}
                            placeholder={`1-${totalPages}`}
                            className="w-20 px-3 py-2 text-sm bg-black/50 text-white border-2 border-secondary/30 rounded-lg focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/50"
                            autoFocus
                        />
                        <button
                            type="submit"
                            className="px-3 py-2 text-sm bg-secondary text-primary rounded-lg hover:bg-secondary/90 transition-all duration-300 font-semibold"
                        >
                            Go
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setShowJumpInput(false);
                                setJumpToPage("");
                            }}
                            className="px-3 py-2 text-sm bg-black/50 text-white border-2 border-secondary/30 rounded-lg hover:bg-secondary/20 transition-all duration-300"
                        >
                            <i className="ri-close-line"></i>
                        </button>
                    </form>
                )}
            </div>
        </div>
    )
}

export default TablePaginate