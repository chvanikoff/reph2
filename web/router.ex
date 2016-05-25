defmodule Reph.Router do
  use Reph.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :app do
    plug Guardian.Plug.VerifySession
    plug Guardian.Plug.LoadResource
  end

  scope "/app", Reph do
    pipe_through [:browser, :app]
    
    get "/logout", AppController, :logout
    get "/*path", AppController, :index
  end

  scope "/", Reph do
    pipe_through :browser # Use the default browser stack
    get "/*path", PageController, :index
  end
end