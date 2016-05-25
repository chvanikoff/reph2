defmodule Reph.PageController do
  use Reph.Web, :controller

  def index(conn, %{"token" => token}) do
    case Guardian.decode_and_verify(token) do
      { :ok, claims } ->
        Guardian.revoke!(token)
        {:ok, user} = Guardian.serializer.from_token(claims["sub"])
        conn
        |> Guardian.Plug.sign_in(user)
        |> redirect(to: "/app")
      _ ->
        redirect(conn, to: "/")
    end
  end
  def index(conn, _params) do
    visitors = Reph.Visitors.state()
    initial_state = %{"visitors" => visitors}
    props = %{
      "location" => conn.request_path,
      "initial_state" => initial_state
    }

    result = Reph.ReactIO.json_call!(%{
      component: "./priv/static/server/js/landing.js",
      props: props,
    })

    conn
    |> put_layout("landing.html")
    |> render("index.html", html: result["html"], props: initial_state)
  end
end