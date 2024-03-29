# allenxandria-gif-api

Internal API for requesting Library of Allenxandria gifs for use with the [Discord bot](https://github.com/kaizacorp/robot-allen). Plans to make it external/public for ease of use with a [frontend](https://github.com/kaizacorp/allenbot) in the works.

Gifs are stored in a database in the format of:

```
{ 
  url: <gif url>,
  tags: <tags for gif>,
  date: <date last accessed by request on /search route>,
  points: <score to track popularity on /search and /random routes>,
}
```

format for following routes + params:


**/route** - params: `{required}` `[optional,params]`


# GET Routes:

/search - params: `{tags}`
--

returns url to gif with best match to given `tags`. Will return empty object `{}` if no match found.


/tags - params: `{url}`
--

returns all tags associated with given `url` (must match exactly).


/random - params: `{access_key}` `[count]`
--

returns url to a random gif. If `count` provided, will return that many random gifs as an array of objects.

/count - params: none
--

returns the total number of gifs currently in the database.

/all - params: `{access_key}` `[recent, top, random]` 
--

returns the full array of all gifs as an array of objects. 

Default order is oldest first.
`recent=true` returns them in newest first order. 
`top=true` returns them in order of most points to least.
`random=true` returns them in random order.

Only one of the optional params is to be specified.

# POST Routes:

/new - params: `{update_key}`
--

For adding new gif urls + tags to the database in the form of an object:
```
{
  url: <gif url>,
  tags: <tags for gif>,
}
```

## TODO:

- implement fuzzy search on /search route -> with npm package?
- add pagination for /all routes

- make API public: 
    + account creation
    + key generation
    + rate limiting
