use Mix.Config

webpack = fn(name) ->
  {"node", [
    "node_modules/webpack/bin/webpack.js",
    "--watch-stdin",
    "--colors",
    "--config",
    "webpack.#{name}.config.js"
  ]}
end

config :reph, Reph.Endpoint,
  http: [port: 4000],
  debug_errors: true,
  code_reloader: true,
  check_origin: false,
  watchers: ["landing", "landing.server", "app", "app.server"] |> Enum.map(&(webpack.(&1)))

config :reph, Reph.Endpoint,
  live_reload: [
    patterns: [
      ~r{priv/static/.*(js|css|png|jpeg|jpg|gif|svg)$},
      ~r{priv/gettext/.*(po)$},
      ~r{web/views/.*(ex)$},
      ~r{web/templates/.*(eex)$}
    ]
  ]

config :logger, :console, format: "[$level] $message\n"

config :phoenix, :stacktrace_depth, 20

config :reph, Reph.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "postgres",
  password: "postgres",
  database: "reph_dev",
  hostname: "localhost",
  pool_size: 10