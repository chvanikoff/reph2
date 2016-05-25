defmodule Reph.User do
  use Reph.Web, :model
  
  alias Reph.Repo

  schema "users" do
    field :email, :string
    field :password, :string
    field :password_plain, :string, virtual: true
    field :terms_confirmed, :boolean, virtual: true

    timestamps
  end

  @required_fields ~w(email password_plain terms_confirmed)
  @optional_fields ~w(password)

  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, @optional_fields)
    |> validate_format(:email, ~r/@/, message: "Email format is not valid")
    |> validate_length(:password_plain, min: 5, message: "Password should be 5 or more characters long")
    |> validate_confirmation(:password_plain, message: "Password confirmation doesn’t match")
    |> unique_constraint(:email, message: "This email is already taken")
    |> validate_change(:terms_confirmed, fn
      _, true -> []
      _, _ -> [terms_confirmed: "Please confirm terms and conditions"]
    end)
    |> cs_encrypt_password()
  end

  def signup(params) do
    %__MODULE__{}
    |> changeset(params)
    |> Repo.insert()
  end

  def signin(params) do
    email = Map.get(params, "email", "")
    password = Map.get(params, "password", "")
    __MODULE__
    |> Repo.get_by(email: String.downcase(email))
    |> check_password(password)
  end

  defp cs_encrypt_password(%Ecto.Changeset{valid?: true, changes: %{password_plain: pwd}} = cs) do
    put_change(cs, :password, Comeonin.Bcrypt.hashpwsalt(pwd))
  end
  defp cs_encrypt_password(cs), do: cs

  defp check_password(%__MODULE__{password: hash} = user, password) do
    case Comeonin.Bcrypt.checkpw(password, hash) do
      true -> {:ok, user}
      false -> {:error, "Invalid email or password"}
    end
  end
  defp check_password(nil, _password) do
    if Mix.env == :prod do
      Comeonin.Bcrypt.dummy_checkpw()
    end
    {:error, "Invalid email or password"}
  end
end