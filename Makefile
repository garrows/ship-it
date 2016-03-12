build:
	@webpack-dev-server --progress --colors --inline

clean:
	@rm -rf node_modules

.PHONY: build clean
