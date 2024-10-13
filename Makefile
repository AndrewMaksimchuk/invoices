run: ui/dist/index.html
	clear
	deno run --allow-read --allow-net --allow-run --allow-import server.ts

clear:
	rm invoices.exe
	cd ui && rm -rf dist/

compile-linux:
	deno compile --allow-read --allow-net --allow-run --allow-import --target x86_64-unknown-linux-gnu -o invoices server.ts

compile-win:
	deno compile --allow-read --allow-net --allow-run --allow-import --target x86_64-pc-windows-msvc -o invoices server.ts

build-frontend:
	cd ui && npm run build

archive:
	zip -r invoices invoices.exe start.bat ui/dist/** ui/dist/**/*

build: build-frontend compile-win archive
	@echo "Build success!"

ui/dist/index.html:
	make build-frontend
