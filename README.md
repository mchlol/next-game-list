This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# GameList

I wanted to learn Next.js so this is a recreation of my final project for General Assembly JavaScript Development. The original was built using React Router.

## The App

The basic idea is to create a list of the video games I want to play as well as old favourites. I didn't know that RAWG.io existed and only came across it while looking for an API to use! RAWG.io is like IMDB for games. Mine is... much more simple.

I planned to have just a few pages:

- A home/search page, with a search bar. Users can type in a game title and will be redirected to...
- a search results page showing all the matches for the users search query. Users can click on a game and be taken to...
- a game details page with some basic info, description, and screenshots. From this page the user can add the game to a wishlist, or a list of favourites.
- in the navbar will be the app title and a button to go to the search page again or to the users lists page
- on the list page will be two sections, one for the wishlist at the top and then the favourites underneath.

## Design

Below are the original wireframes for the layout. It has not changed too much but let's just say I made some interesting UX choices.

Search results:  
<img src="./screenshots/searchresults_wireframe.png" width="300">

View game:  
<img src="./screenshots/viewgame_wireframe.png" width="300">

A mini-tour in gif form:  
<img src="./screenshots/ViewGame.gif" width="300">  
It turned out the recommendations endpoint only returned games with similar names so I left it out for now, I'll try working on something using the tags.

## Backend

This app doesn't have a dedicated backend, lists are saved to the browsers local storage. This means not signing in to yet another app in the world.

## Routing

The original app did use React Router. In using Next.js this time it means I could make use of the page router. Any file in the `pages` folder becomes a route. To create a dynamic route e.g. to the search results page, I created the file `/search/index.js` and when the user searches the route will include a URL query passed through the router object.

Within the form submit handler:

```
  router.push( {
      pathname: '/search',
      query: {searchQuery},
    })
```

Performing a search takes the user to `/search?searchQuery=game`.

For viewing a game, I have the file `[slug].js` which is routed to from the view button on a game on the search results page (or the lists page).

Within the `map` through the game objects:

```
<Link href={ {
    pathname: "/" + game.slug
} }>
    <Button className="btn btn-sm btn-primary">
        <FaEye /> View
    </Button>
</Link>
```

So if the user clicks on the game 'Prey' they are taken to '/prey'.

# WIP

## Hurdles

This was built with Next 14 but I had to downgrade to Next 13. Some issue with the update meant that any page using `getServerSideProps` and `next/head` would result in an internal server error. Guess who just refactored their search page to use `getServerSideProps`?  
More context on this issue is on [this Netlify support forum post](https://answers.netlify.com/t/next-js-14-upgrade-results-in-500-status-code/105786/1), not sure when it will be fixed.

TBC:

- query undefined in direct path
- using `getStaticProps` and `getStaticPaths` when using dynamic routing (for game details pages)

## Future Features

- sorting and filtering
- show on the game details page if it's already in a list
- optimise images?
- truncate long lists
- handle blank searches
- add an on-theme favicon
- allow custom lists
- allow user to add notes to a game saved in their list

## Resources

- http://www.figma.com
- https://api.rawg.io/docs
- https://rawgthedocs.orels.sh/api
- https://corsproxy.io/
- https://daisyui.com/docs/
- https://react.daisyui.com
