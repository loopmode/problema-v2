# content pages

## conventions

- Each content page should have a separate folder inside `/pages`, named by its route and id, e.g. 'home'
- The page folder should contain an `index.html` and a `content.html` template file
- The `index.html` file should present the entire page, including html header and footer, while the `content.html` file should present only the bare contents of the page.
	- Initial hits will load the entire page via `index.html`, while further navigation will be handled via AJAX, loading only `content.html` and replacing the contents on the client.

## data

If a page needs additional data for rendering, a `data.json` file should be placed within the page folder. It will be provided to the h2o template automatically.

# libraries

## php

- http://www.h2o-template.org
- https://github.com/oyejorge/less.php

## javascript

- https://github.com/wagerfield/parallax
