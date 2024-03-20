import ListDisplay from '@/components/ListDisplay';
import { Divider } from 'react-daisyui';
import { FaHeart } from 'react-icons/fa6';
export default function Lists() {

    return (
        <div className="lists-wrap flex flex-col min-h-screen">

            <ListDisplay listName="wishlist" />

            <Divider color="primary">
                <FaHeart className="text-3xl" />
            </Divider>

            <ListDisplay listName="favourites" />
            
        </div>
    )
}
