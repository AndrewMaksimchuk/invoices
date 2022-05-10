run:
	clear
	deno run --allow-read --allow-net --allow-run server.ts

compile-linux:
	deno compile --allow-read --allow-net --allow-run --target x86_64-unknown-linux-gnu -o invoices server.ts

compile-win:
	deno compile --allow-read --allow-net --allow-run --target x86_64-pc-windows-msvc -o invoices server.ts