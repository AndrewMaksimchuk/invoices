run:
	clear
	deno run --allow-read --allow-net --allow-run server.ts

clear:
	# rm invoices
	rm invoices.exe
	cd ui && rm -rf dist/

compile-linux:
	deno compile --allow-read --allow-net --allow-run --target x86_64-unknown-linux-gnu -o invoices server.ts

compile-win:
	deno compile --allow-read --allow-net --allow-run --target x86_64-pc-windows-msvc -o invoices server.ts

build-frontend:
	cd ui && npm run build

archive:
	zip invoices invoices.exe ui/dist/** ui/dist/**/*

build: build-frontend compile-win archive
	@echo "Build success!"