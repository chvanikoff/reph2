defmodule Reph.AuthChannel do
  use Reph.Web, :channel

  alias Reph.User

  def join("auth", _params, socket) do
    {:ok, socket}
  end

  def handle_in("login", params, socket) do
    response = case User.signin(params) do
      {:ok, user} ->
        {:ok, %{"token" => get_sl_token(user)}}
      {:error, error} ->
        {:error, %{"error" => error}}
    end
    {:reply, response, socket}
  end
  def handle_in("signup", params, socket) do
    response = case User.signup(params) do
      {:ok, user} ->
        {:ok, %{"token" => get_sl_token(user)}}
      {:error, changeset} ->
        errors = Enum.reduce(changeset.errors, %{}, fn {field, detail}, acc ->
          Map.put(acc, field, render_detail(field, detail))
        end)
        {:error, %{"errors" => errors}}
    end
    {:reply, response, socket}
  end

  defp render_detail(_field, {message, values}) do
    Enum.reduce(values, message, fn({k, v}, acc) ->
      String.replace(acc, "%{#{k}}", to_string(v))
    end)
  end
  defp render_detail(field, "can't be blank" = message), do: "#{field} - #{message}"
  defp render_detail(_field, message), do: message

  defp get_sl_token(user) do
    ttl = {10, :seconds}
    {:ok, jwt, _full_claims} = Guardian.encode_and_sign(user, :disposable, %{"ttl" => ttl})
    jwt
  end
end