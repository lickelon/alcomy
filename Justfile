install:
	pnpm install
	uv sync

run target="":
	#!/usr/bin/env sh
	if [ "{{target}}" = "client" ]; then
		pnpm dev
	elif [ "{{target}}" = "server" ]; then
		uv run uvicorn app.main:app --reload
	elif [ "{{target}}" = "db" ]; then
		docker compose up -d db
		trap 'docker compose stop db; exit 0' INT TERM
		docker compose logs -f db
		docker compose stop db
		trap - INT TERM
	elif [ "{{target}}" = "db-down" ]; then
		docker compose down
	elif [ "{{target}}" = "db-logs" ]; then
		docker compose logs -f db
	elif [ "{{target}}" = "" ]; then
		pnpm concurrently --kill-others-on-fail \
			--names "db,server,client" \
			"just run db" \
			"just run server" \
			"just run client"
	else
		echo "unknown target '{{target}}'" >&2
		exit 1
	fi

docker action='up' service='db':
	#!/usr/bin/env sh
	if [ "{{action}}" = "up" ]; then
		docker compose up -d {{service}}
	elif [ "{{action}}" = "down" ]; then
		docker compose down
	elif [ "{{action}}" = "logs" ]; then
		docker compose logs -f {{service}}
	elif [ "{{action}}" = "ps" ]; then
		docker compose ps
	elif [ "{{action}}" = "stop" ]; then
		docker compose stop {{service}}
	elif [ "{{action}}" = "start" ]; then
		docker compose start {{service}}
	else
		echo "unknown action '{{action}}'" >&2
		exit 1
	fi
