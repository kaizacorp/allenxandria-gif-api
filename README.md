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

# GET Routes:

/search - params: `tags` (required)
--

returns url to gif with best match to given tags (will return 'boosh' gif url if no good match found.


/tags - params: `url` (required)
--

returns all tags associated with given url (must match exactly).


/random - params: `count` (optional), `key` (required)
--

returns url to a random gif. If count provided, will return that many random gifs as an array of objects. Key required for acceess.

/count - params: none
--

returns the total number of gifs currently in the database.

/all - params: `recent` (optional), `top` (optional), `random` (optional), `key` (required)
--

returns the full array of all gifs as an array of objects. Default order is oldest first. 
If `recent=true`, returns them in newest first order. 
If `top=true`, returns them in order of most points to least.
If `random=true`, returns them in random order.

# POST Routes:

/new - params: `key` (required)
--

For adding new gif urls +  tags to the database in the form of an object:
```
{
  url: <gif url>,
  tags: <tags for gif>,
}
```


## TODO:


- add pagination for /all routes
- examples in README
- make API public -> account creation, key generation, rate limiting
