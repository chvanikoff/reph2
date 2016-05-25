# RePh 2

## [Demo](https://reph2.herokuapp.com/)
(The demo is available 18h a day due to Heroku free nodes limitations, if you see `Application Error` message - this is the case)

React + Redux + Phoenix simple application

This application is evolution of [RePh](https://github.com/chvanikoff/reph/) and now it provides authorization and different frontend bundles for landing page and application: styles, JS and images are all different.

Authorization/registration is done via websockets and one-time JWT is used to get user authorized on server side (this is required for server-side rendering where app can use user's data)

Tech. stack:

  * Phoenix
  * Webpack
  * React
  * Redux
  * JWT

Batteries included:

  * Authorization
  * Different bundles for landing page and app itself
  * Server-side rendering
  * Bootstrap
  * LESS (to ease integration of Bootstrap 3)
  * [Redux Devtools for Chrome extension](https://github.com/zalmoxisus/redux-devtools-extension)

To start your Phoenix app:

  * Install dependencies with `mix deps.get`
  * Create and migrate your database with `mix ecto.setup`
  * Install Node.js dependencies with `npm install`
  * Start Phoenix endpoint with `mix phoenix.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

Ready to run in production? Please [check our deployment guides](http://www.phoenixframework.org/docs/deployment).

## Learn more

  * Official website: http://www.phoenixframework.org/
  * Guides: http://phoenixframework.org/docs/overview
  * Docs: http://hexdocs.pm/phoenix
  * Mailing list: http://groups.google.com/group/phoenix-talk
  * Source: https://github.com/phoenixframework/phoenix