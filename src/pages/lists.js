import { useEffect, useState } from 'react';
import ListDisplay from '@/components/ListDisplay';
import { Button } from 'react-daisyui';

export default function Lists() {

    const [activeTab, setActiveTab] = useState('wishlist');

    return (
        <div className="lists-wrap flex flex-col min-h-screen">

            <div className="flex flex-wrap justify-center items-center gap-2 m-4 mt-8">
                <p>Select view:</p>
                <Button className={`btn btn-sm ${activeTab === 'wishlist' ? 'btn-success' : 'opacity-50'}`}
                onClick={() => {
                    setActiveTab(() => 'wishlist')
                    }
                }
                >
                    Wishlist
                </Button>
                <Button className={`btn btn-sm ${activeTab === 'favourites' ? 'btn-success' : 'opacity-50'}`}
                onClick={() => {
                    setActiveTab(() => 'favourites')
                    }
                }
                    >
                    Favourites
                </Button>
            </div>

            { 
                <ListDisplay listName={activeTab} />
            }
            
        </div>
    )
}
