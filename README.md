# picapica-web-client

[![Actions Status](https://github.com/picapica-org/picapica-web-client/workflows/CI/badge.svg)](https://github.com/picapica-org/picapica-web-client/actions)

Web Frontend for the Picapica API

## Getting started

Before you can start developing make sure you have a recent-ish version of [Node.js](https://nodejs.org) and npm (included as part of Node.js) installed. ([Linux](https://nodejs.org/en/download/package-manager)/[Windows](https://nodejs.org/en/download/))

Then, install the dependencies:

```bash
cd path/to/repo
npm ci
```

And now, you should be ready to rock. As for IDEs, I recommend [VS Code](https://code.visualstudio.com/) together with the [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint) extensions.

Use the `npm start` command to open a local server with a live preview of the website. The page will automatically update as source files change.

### gRPC Proxy

Since browsers currently don't support gRPC as is, we need to proxy to translate gRPC (server) to gRPC-web (website). We use `grpcwebproxy` to do this. Download the executable CLI [here](https://github.com/improbable-eng/grpc-web/releases).

For local testing, use this command to proxy a backend gRPC server of your choosing. The proxy will start a gRPC-web server available at port `8080`; this is the port the website will by default.

Windows:
```powershell
.\grpcwebproxy-v0.14.0-win64.exe --allow_all_origins --backend_addr=<backend domain>:<port> --backend_tls=false --run_tls_server=false
```

Linux:
```bash
./grpcwebproxy-v0.14.0-linux-x86_64 --allow_all_origins --backend_addr=<backend domain>:<port> --backend_tls=false --run_tls_server=false
```

## Build

The `npm run build` command will build a static version of the website.

Note: Builds are incremental. Run `npm run clean` before the build command to get a clean build.

## Developer notes

Gatsby will render each page as a [static HTML page](https://www.gatsbyjs.com/docs/glossary/static-site-generator/) that will be [hydrated](https://www.gatsbyjs.com/docs/react-hydration/) on the client.

This basically means that each page will be rendered on the developers computer to create a static HTML page and then on each client again.
The advantage of this approach is that static parts of a page can be packed into the HTML page instead of being a part of the (compiled) JS library resulting in faster load times for users.
However, this static generation is a problem for us because we don't have any static content.
All content on the website is localized.

To work around this, the `dynamic` function is used.
This function be used to create on empty page for the static site generator that will only be run on the client.
This means that all client-only variables (e.g. `window`, `location`, ...) will be accessible.
It's a bit hacky and has some [limitations](https://stackoverflow.com/a/63814668/7595472) but works perfectly for our use case.

---

## Contributors

[Michael Schmidt](mailto:mitchi5000.ms@googlemail.com) (2021 - 2022)
