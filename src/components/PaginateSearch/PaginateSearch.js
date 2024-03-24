import { Pagination, Button, Loading } from "react-daisyui";
import { useState, createContext } from "react";
import { useRouter } from "next/router";

const PaginationContext = createContext();
export { PaginationContext };

export default function PaginateSearch({currentPage, searchQuery, totalPages}) {
    
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    return (
        <PaginationContext.Provider value={ {currentPage, searchQuery, totalPages, setLoading} }>
            <div className="p-4 flex justify-center relative">
                {
                    loading && <Loading color="primary" className="absolute"/>
                }
                <Pagination>

                    <PaginateSearch.Button setLoading={setLoading} page={1} text="First" />
                    <PaginateSearch.Button setLoading={setLoading} page={currentPage - 1} text="Previous" />

                    
                    {/* // * current page */}
                    <Button color="secondary" className="join-item">
                        Page {currentPage} of {totalPages}
                    </Button>

                    <PaginateSearch.Button setLoading={setLoading} page={currentPage + 1} text="Next" />
                    <PaginateSearch.Button setLoading={setLoading} page={totalPages} text="Last" />


                </Pagination>
            </div>
        </PaginationContext.Provider>
    )
}