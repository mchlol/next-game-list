import { Button } from "react-daisyui";
import { useRouter } from "next/router";
import { PaginationContext } from "./PaginateSearch";
import { useContext } from "react";

export default function PaginateSearchButton({setLoading, page, text}) {

    const router = useRouter();
    const {currentPage, totalPages, searchQuery} = useContext(PaginationContext);

    let disabled = false;

    if (text.toLowerCase() === 'first' || text.toLowerCase() === 'previous') {
        disabled = currentPage === 1;
    } else if (text.toLowerCase() === 'next' || text.toLowerCase() === 'last') {
        disabled = currentPage === totalPages;
    }

    let displayText = text;

    if (text.toLowerCase() === 'previous') {
        displayText = "←"
    } else if (text.toLowerCase() === 'next') {
        displayText = "→"
    }

    return (
        <Button
        color="primary"
        className="join-item"
        disabled={disabled}
        onClick={() => {
            setLoading(true);
            router.push( {
            pathname: '/search/results',
            query: { searchQuery, page: page}
        });
        setTimeout( () => setLoading(false), 500)
        }
        }
        >
            { displayText }
        </Button>
    )
}