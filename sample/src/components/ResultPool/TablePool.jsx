import Image from 'next/image'
import { useState, useEffect, useMemo } from 'react';
import Search from './Search';
import styles from "./table.module.css"
import TableHead from './TableHead';
import TablePaginate from './TablePaginate';
import Link from 'next/link';
import api from '../../../helper/axiosconfig';



function TablePool() {

    const heading = [

        {title: "S/N"},
        {title: "Category"},
        {title: "Round"},
        {title: "Winner"},
        {title: "Winner's Score"},
        {title: "Loser"},
        {title: "Loser's Score"},
        {title: "Updated"},
    ]


    //TablePool Data
    const [players, setPlayers] = useState(null);

    //Search and Sorting through the table
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [selectedDivision, setSelectedDivision] = useState("All");
    
    //Modal state
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    //Pagination
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsOffset, setItemsOffset] = useState({
        initialOffset: 0,
        totalOffset: 0,
    });


    const itemsPerPage = 20;

    const convertDate = (date) => {
        const originalDate = new Date(date);
        const formattedDate = originalDate.toISOString().replace('T', ' @ ').replace(/\.\d{3}Z$/, '');
        return formattedDate
    }

    // Export to CSV function
    const exportToCSV = () => {
        if (!players || players.length === 0) {
            setModalMessage('No data to export');
            setShowModal(true);
            return;
        }

        // Filter data based on search and division
        let dataToExport = players;
        
        if (selectedDivision !== "All") {
            dataToExport = dataToExport.filter(
                player => player.category.toLowerCase().includes(selectedDivision.toLowerCase())
            );
        }

        if (search) {
            dataToExport = dataToExport.filter(
                player => 
                    player.category.toLowerCase().includes(search.toLowerCase()) ||
                    player.round.toLowerCase().includes(search.toLowerCase()) ||
                    player.winner.toLowerCase().includes(search.toLowerCase()) ||
                    player.loser.toLowerCase().includes(search.toLowerCase())
            );
        }

        // Create CSV headers
        const headers = ['S/N', 'Category', 'Round', 'Winner', "Winner's Score", 'Loser', "Loser's Score", 'Updated'];
        
        // Create CSV rows
        const csvRows = [
            headers.join(','),
            ...dataToExport.map((player, index) => [
                index + 1,
                `"${player.category}"`,
                `"${player.round}"`,
                `"${player.winner}"`,
                player.winner_score,
                `"${player.loser}"`,
                player.loser_score,
                `"${convertDate(player.updatedAt)}"`
            ].join(','))
        ];

        // Create CSV content
        const csvContent = csvRows.join('\n');
        
        // Create blob and download
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `results_${selectedDivision !== "All" ? selectedDivision : "all"}_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    //Get the data
    useEffect(() => {

        const getResults = async () => {

            //fetch the results
            setLoading(true);
            try {
                const response = await api.get("/result/all");
                setPlayers(response.data);
            } catch(err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
            
        }

        getResults();
    }, []);

    

    



    //Return New Set of Players
    const playerData = useMemo(() => {

        let computedPlayers = players;

        //Filter by division
        if(selectedDivision !== "All"){
            computedPlayers = computedPlayers?.filter(
                player => player.category.toLowerCase().includes(selectedDivision.toLowerCase())
            );
        }

        //Filter the table data based on user search.
        if(search){
            computedPlayers = computedPlayers?.filter(
                player => 
                    player.category.toLowerCase().includes(search.toLowerCase()) ||
                    player.round.toLowerCase().includes(search.toLowerCase()) ||
                    player.winner.toLowerCase().includes(search.toLowerCase()) ||
                    player.loser.toLowerCase().includes(search.toLowerCase()) 
                )
        }
        
        
        setTotalItems(computedPlayers?.length);
        setItemsOffset(prevData => {
            return {
                    ...prevData,
                initialOffset: (currentPage - 1) * itemsPerPage + 1, 
                totalOffset: (currentPage - 1) * itemsPerPage + itemsPerPage
            }
        });

        return computedPlayers?.slice(
                (currentPage - 1) * itemsPerPage, 
                (currentPage - 1) * itemsPerPage + itemsPerPage
            );
    }, [players, currentPage, search, selectedDivision]);

    

      const searchStyle = {
        container: "justify-end items-end",
        inputContainer: "",
        inputBox: "w-80 rounded-lg",
        placeholder: "Search for results",
    };

 


    return (
            <>
                {/* Modern Confirmation Modal */}
                {showModal && (
                    <div 
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm transition-opacity duration-300"
                        onClick={() => setShowModal(false)}
                    >
                        <div 
                            className="bg-black border-2 border-secondary rounded-2xl shadow-2xl shadow-secondary/50 p-6 sm:p-8 max-w-md w-full mx-4 transform transition-all duration-300 scale-100"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex flex-col items-center">
                                {/* Icon */}
                                <div className="mb-4 w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center">
                                    <i className="ri-information-line text-secondary text-3xl"></i>
                                </div>
                                
                                {/* Message */}
                                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 text-center">
                                    Information
                                </h3>
                                <p className="text-gray-300 text-center mb-6 text-sm sm:text-base">
                                    {modalMessage}
                                </p>
                                
                                {/* Close Button */}
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="w-full sm:w-auto px-6 py-3 bg-secondary text-primary rounded-lg font-semibold hover:bg-secondary/90 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-secondary/50 transform hover:scale-105"
                                >
                                    OK
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {
                    loading ? 

                    <div className="flex justify-center items-center flex-col my-40">
                        <div className="w-8 h-8 border-2 border-[#817f7fe7] p-8 animate-spin rounded-full"></div>
                        <p className="text-white text-sm font-medium my-5">Loading...</p>
                    </div>

                    :

                    <div className="flex flex-col items-center">
                        <div className="flex flex-col items-center">
                            <h3 className="text-xl lg:text-3xl text-white font-bold mb-6">Result Submission Pool</h3>
                            
                            {/* Division Tabs */}
                            <div className="flex flex-wrap justify-center gap-2 mb-6 w-full px-4 bg-black/50 rounded-full py-2 border-2 border-secondary/30">
                                {["All", "Division A", "Division B", "Division C"].map((division) => (
                                    <button
                                        key={division}
                                        onClick={() => {
                                            setSelectedDivision(division);
                                            setCurrentPage(1);
                                        }}
                                        className={`
                                            px-4 py-2 sm:px-6 sm:py-3 rounded-full font-semibold text-sm sm:text-base
                                            transition-all duration-300 ease-in-out transform hover:scale-105
                                            ${
                                                selectedDivision === division
                                                    ? "bg-secondary text-primary shadow-lg shadow-secondary/50 border-2 border-secondary"
                                                    : "bg-black/50 text-white border-2 border-secondary/30 hover:border-secondary/60 hover:bg-black/70"
                                            }
                                        `}
                                    >
                                        {division}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className={`bg-black border-2 border-solid border-secondary p-6 my-10 w-full lg:max-w-[80%] lg:mx-auto overflow-x-auto relative shadow-lg shadow-secondary sm:rounded-lg`}>
                            
                            {/* Search and Export Button Container */}
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                                <div className="w-full sm:w-auto">
                                    <Search 
                                        handleSearch={
                                            (value) => {
                                                setSearch(value);
                                                setCurrentPage(1);
                                            }
                                        }
                                        searchStyle={searchStyle}
                                    />
                                </div>
                                
                                {/* Export CSV Button */}
                                <button
                                    onClick={exportToCSV}
                                    className="flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-secondary text-primary rounded-lg font-semibold text-sm sm:text-base hover:bg-secondary/90 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-secondary/50 transform hover:scale-105 whitespace-nowrap"
                                    title="Export to CSV"
                                >
                                    <i className="ri-download-line text-lg"></i>
                                    <span>Export CSV</span>
                                </button>
                            </div>

                            {playerData ?

                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    <TableHead heads={heading}/>
                                        <tbody>
                                            
                                            { playerData.map((player, i) => (
                                                <tr key={i} className={`${i % 2 === 0 ? styles.table_body_even : styles.table_body_odd } `}>
                                                    <td className="py-6 px-4 text-primary text-center">
                                                        {player.id}.
                                                    </td>
                                                   
                                                    <td className="py-6 px-4 text-primary text-center">
                                                        {player.category}
                                                    </td>

                                                    <td className="py-6 px-4 text-primary text-center">
                                                        {player.round}
                                                    </td>

                                                    <td className="py-6 px-4 text-primary flex items-center gap-2">
                                                        <i className="ri-check-line bg-[rgba(0,255,0,0.8)] text-primary py-.5 px-1 mx-2 text-sm font-bold rounded-full"></i>
                                                        <span className="text-primary">{player.winner}</span>
                                                    </td>

                                                    <td className="py-6 px-4 text-primary text-center">
                                                        {player.winner_score}
                                                    </td>

                                                    <td className="py-6 px-4 text-primary flex items-center gap-2">
                                                        <i className="ri-close-line bg-[rgb(255,78,78)] text-primary py-.5 px-1 mx-2 text-sm font-bold rounded-full"></i>
                                                        <span className="text-primary">{player.loser}</span>
                                                    </td>


                                                    <td className="py-6 px-4 text-primary text-center">
                                                        {player.loser_score}
                                                    </td>

                                                    <td className="py-6 px-4 text-primary text-center">
                                                        {convertDate(player.updatedAt)}
                                                    </td>
                                                   
                                                </tr>
                                            ))
                                            }
                                            
                                        </tbody>
                                </table>

                            :
                                            
                                    playerData?.length == 0 &&
                                    <div className=" flex justify-center items-center w-full bg-white p-6">
                                            <span className="w-full text-[#e24949] font-semibold text-center text-lg lg:text-xl">No Player Found!</span>
                                    </div>

                            }

                            {/* Pagination */}
                            <nav className="flex justify-start lg:flex-row flex-col lg:justify-between items-start lg:items-center py-6 px-4 text-white bg-siteblue shadow-md shadow-deep" aria-label="TablePool navigation">
                                
                                <span className="text-sm font-normal text-lightash">Showing <span className="font-semibold text-gray-900 dark:text-white">{itemsOffset.initialOffset} - {itemsOffset.totalOffset > totalItems ? totalItems : itemsOffset.totalOffset}</span> of <span className="font-semibold text-gray-900 dark:text-white">{totalItems}</span></span>


                                <TablePaginate
                                    total={totalItems}
                                    itemsPerPage={itemsPerPage}
                                    currentPage={currentPage}
                                    onPageChange={page => setCurrentPage(page)}
                                />
                            


                            </nav>
                        </div>

                    </div>

                }
            </>

        )

}

export default TablePool