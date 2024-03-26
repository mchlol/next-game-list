import { Pagination, Button, Loading } from "react-daisyui";
import { useState, createContext } from "react";
import { useRouter } from "next/router";

const PaginationContext = createContext();
export { PaginationContext };

export default function PaginateSearch({currentPage, title, totalPages}) {
    
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    // On page 1: 1 2 3 -> 19 
    // On page 2: 1 2 3 ... 19

    return (
        <PaginationContext.Provider value={ {currentPage, title, totalPages, setLoading} }>
            <div className="p-4 flex justify-center relative">
                {
                    loading && <Loading color="primary" className="absolute"/>
                }
                <Pagination>

                    <PaginateSearch.Button setLoading={setLoading} page={1} text="First" />
                    <PaginateSearch.Button setLoading={setLoading} page={currentPage - 1} text="Previous" />

                    
                    {/* // * current page */}
                    <Button size="sm" color="secondary" className="join-item">
                        Page {currentPage}
                    </Button>

                    <PaginateSearch.Button setLoading={setLoading} page={currentPage + 1} text="Next" />
                    <PaginateSearch.Button setLoading={setLoading} page={totalPages} text="Last" />


                </Pagination>
            </div>
        </PaginationContext.Provider>
    )
}