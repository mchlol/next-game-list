import ListDisplay from '@/components/ListDisplay';
export default function Lists() {

    return (
        <div className="lists-wrap">

            <ListDisplay listName="wishlist" />

            <ListDisplay listName="favourites" />
            
        </div>
    )
}
