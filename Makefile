default: help

help: ## List available make commands
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//' -e 's/:.*#/: #/' | column -t -s '##'

up: ## Start services defined in the docker-compose file
	docker-compose up -d

down: ## Stop services defined in the docker-compose file
	docker-compose down

psql: ## Open development db console
	@docker-compose exec db psql -U postgres -d postgres

docker-build: ## Build image from Dockerfile
	docker build -t spotify-playlist-recommender .

docker-run: ## Run image from Dockerfile
	docker run -dp 7777:7777 spotify-playlist-recommender
