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

### Connecting to a server

Since this project is just the web frontend of a server, it doesn't do much without connecting to one.
By default, it will connect to the main Picapica server, but you can let it connect to whatever server you want.
To change the server, go into `src/lib/session/client.ts` and change the `serverAddress` constant.

### Mock client

There is also a simple mock client that will do some basic tasks in memory.
This is useful for testing the website when no server is available.
Very bad connections (high/variable latency, connection issues) can also be simulated with the mock client.

### gRPC Proxy

This section is only relevant if you want to connect to a server that only has gRPC endpoint and no gRPC-web endpoint. The main Picapica server has a gRPC-web endpoint.

<details>

Since browsers currently don't support gRPC as is, we need to proxy to translate gRPC (server) to gRPC-web (website). We use `grpcwebproxy` to do this. Download the executable CLI [here](https://github.com/improbable-eng/grpc-web/releases).

For local testing, use this command to proxy a backend gRPC server of your choosing. The proxy will start a gRPC-web server available at port `8080`; this is the port the website will by default.

Windows:

```powershell
.\grpcwebproxy-v0.14.0-win64.exe --allow_all_origins --backend_addr=<backend domain>:<port> --backend_tls=false --run_tls_server=false --backend_max_call_recv_msg_size=20971520
```

Linux:

```bash
./grpcwebproxy-v0.14.0-linux-x86_64 --allow_all_origins --backend_addr=<backend domain>:<port> --backend_tls=false --run_tls_server=false--backend_max_call_recv_msg_size=20971520
```

</details>

## Deployment

The website is currently deployed via GitHub pages.
We have a GitHub actions task that will deploy the current version of the web client in the main branch of this repository for you.

Go to [picapica-org/picapica-org.github.io](https://github.com/picapica-org/picapica-org.github.io), click the _Actions_ tab, select the _Publish_ action, and click _Run workflow_.
It will then ask you for a commit message, so input something like "Publish feature X" or "Publish version 2.0".
Click _Run workflow_ and it will start.
Give it ~2 minutes and should see the latest version of the web client on https://picapica.org.

### Troubleshooting

If deployment fails, see the job log to see what went wrong.
It's most likely that the build failed.
This happens when TypeScript has compiler errors or when dependencies are misconfigured.
Run `npm run build` locally to see any build errors on your machine.

## Developer notes

Gatsby will render each page as a [static HTML page](https://www.gatsbyjs.com/docs/glossary/static-site-generator/) that will be [hydrated](https://www.gatsbyjs.com/docs/react-hydration/) on the client.

This basically means that each page will be rendered on the developers computer to create a static HTML page and then on each client again.
The advantage of this approach is that static parts of a page can be packed into the HTML page instead of being a part of the (compiled) JS library resulting in faster load times for users.
However, this static generation is a problem for us because we don't have any static content.
All content on the website is localized.

To work around this, the `dynamic`/`dynamicComponent` function is used.
This function be used to create on empty page for the static site generator that will only be run on the client.
This means that all client-only variables (e.g. `window`, `location`, ...) will be accessible.
It's a bit hacky and has some [limitations](https://stackoverflow.com/a/63814668/7595472) but works perfectly for our use case.

### Tech stack

The whole website is written in TypeScript with strong typing throughout the entire code base.
We further use ESLint and StyleLint to detect problems and enforce a consistent coding style.
Jest is used for testing, although there aren't many tests yet.

### Project layout

-   `/.github` <br>
    This folder contains all GitHub-specific configurations like the workflow for our CI pipeline.
-   `/.vscode` <br>
    This folder contains all VSCode-specific configurations like the plugin recommendations and settings to get new devs started quickly.
-   `/assets` <br>
    This folder contains all static resources (e.g. images, fonts, videos) used by the website.
-   `/src`
    -   `/src/context` <br>
        This contains all React contexts.
    -   `/src/elements` <br>
        This contains all React elements and their SCSS style files.
    -   `/src/lib` <br>
        This contains logic/model code of the project.
        -   `/src/lib/generated` <br>
            The code generated by the protobuf compiler.
        -   `/src/lib/session` <br>
            The code specific to sessions and the backend client.
    -   `/src/pages` <br>
        All pages and their styles.
    -   `/src/colors.scss` <br>
        This file defines the color pallet of the website.
-   `/test` <br>
    This folder contains all tests and their snapshots.

### Styling

Styling is done via SCSS files.
We do not use any CSS-in-JS libraries as those a not recommended by the React dev themselves.

To change the styles of a component, go into its SCSS file and change the appropriate rules.
Saving a style sheet will automatically update the website.

### Localization

We use our own simple localization methods.
The basic idea is that each React component defines its localizations in the file that it is defined.
There are no big translation files.
All translations are in code.

This has the advantage that localizations can be type checked.
It is impossible to use a text that isn't translated and all supported languages are guaranteed to be present.

#### Example

[Here](https://github.com/picapica-org/picapica-web-client/blob/e4bd5c80056aaa8189a97c0200624ded1d7c4500/src/elements/footer.tsx#L93)'s the localization for the footer of the website (simplified):

```ts
const locales: Locales<Record<"help" | "contact", string>> = {
	en: {
		help: "Help",
		contact: "Contact",
	},
	de: {
		help: "Hilfe",
		contact: "Kontakt",
	},
};
```

The `Locales<T>` defines that the localization for each language has type `T`.
In this case, each localization just defines a text for `help` and `contact`.
To add a new entry, e.g. `aboutUs`, add it to the type and define its translations:

```ts
const locales: Locales<Record<"help" | "contact" | "aboutUs", string>> = {
	en: {
		help: "Help",
		contact: "Contact",
		aboutUs: "About us",
	},
	de: {
		help: "Hilfe",
		contact: "Kontakt",
		aboutUs: "Über uns",
	},
};
```

#### Complex logic

Localizations can also include more complex logic.
E.g. here's how to do localized date formatting:

```ts
const locales: Locales<{ lastSeen: (date: Date) => string }> = {
	en: {
		lastSeen: date => `Last seen ${new Intl.DateTimeFormat("en-US").format(date)}.`,
	},
	de: {
		lastSeen: date => `Zuletzt gesehen ${new Intl.DateTimeFormat("de").format(date)}.`,
	},
};
```

#### Use localization

To use localization, use the `useLocalization` hook.

```tsx
const l = useLocalization(locales);
return (
	<p>
		<span>{l.aboutUs}</span>
		<span>{l.lastSeen(Date.now())}</span>
	</p>
);
```

---

## Contributors

[Michael Schmidt](mailto:mitchi5000.ms@googlemail.com) (2021 - 2022)
