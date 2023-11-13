import { useState } from "react";
import { Button, Input } from "react-daisyui";

export default function Home() {

  const [query, setQuery] = useState('');

  function handleSubmit(ev) {
    ev.preventDefault();
    console.log('query: ',query);
  }


  return (
    <div className="search-form p-4 flex flex-col justify-center align-middle">
      
      <div className="p-2">
                <h2 className="text-l">For cross-platform gamers!</h2>
                <p>Save games from any and all platforms, even indie games on Steam and Itch.io.</p>
                <br />
                <p>Browse an extensive list of games and save for later reference.</p>
                <br />
            </div>
            
            <form className="join" id="searchForm" onSubmit={handleSubmit}>
                <Input bordered type="text" placeholder="Search games" className="join-item" onChange={ev => setQuery(ev.target.value)} /> 
                <Button className="btn btn-secondary join-item">Search</Button>
            </form>

            <div className="p-4"></div>
            <h3 className="text-xl">Happy gaming!</h3>

    </div>
  )
}
