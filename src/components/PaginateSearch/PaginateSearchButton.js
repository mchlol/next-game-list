import { Button } from "react-daisyui";
import { useRouter } from "next/router";

export default function PaginateSearchButton({currentPage, totalPages, searchQuery, setLoading, page, text}) {

    const router = useRouter();

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