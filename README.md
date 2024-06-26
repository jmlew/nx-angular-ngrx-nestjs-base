# Angular + NestJS Boilerplate Web App

A Base [Angular](https://angular.io) web app and [NestJS](https://docs.nestjs.com/) mock backend API server.

Organised as a [Nx](https://nx.dev) monorepo and composed using Domain Driven Design (DDD)
principles to provides a best-practice starting point for developing modular and scaleable
Angular apps.

## Architecture

The architectural approach implemented here is documented under my [Scaleable Frontend Architectures guidelines](https://bit.ly/scaleable-apps)

The state management approach implemented here is documented under my [Scalable Frontend App State Management guidelines](https://bit.ly/scaleable-apps-state)

The codebase combines a number of separate 'applications' (apps) which are simple shells containing several 'libraries' (libs) to provide the real functionality, all within the same workspace in a [NX Monorepo](https://nx.dev). There are only two applications:

1. Web-app

   > The main client application (Angular) as a simplified app with all functionality linked to in libs.

2. Mock-api
   > The Mock API server application (NestJS) which mocks interaction with teh real server during offline development.

## Features

### NestJS Mock API app

The 'mock-api' app contains a NestJS application which replicates the APIs requested to ensure development can continue in parallel to that of the Backend. This mock API can be enabled as the source of all HTTP requests within the web-app when serving in dev mode and when the environments property `useMockInDev` is set to `true` (located in `src/environments/environment.ts`).

#### Serving the mock API

The app serves on the port defined in a variable in the .env file
(`process.env.NX_MOCK_API_PORT`) and this matches the port number defined in the web-app's
proxy file (`proxy.conf.json`), which is used to ensure all API calls within the app are
redirected to the mock API.

### Mock API testing

The codebase includes a Thunder Tests directory which contains configs for testing both
the NestJS APIs as well as some sample fake data APIs.
This uses the [Thunder
Client](https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client)
vscode extension listed in .vscode/extensions.json.

## Code Structure

Use the below convenience methods to generate boilerplate code structure of the apps and libs.

### Generate a domain (DDD schematics)

`nx g @angular-architects/ddd:domain <some-domain> --directory <some-parent-directory> --type=internal --dry-run`

Adds a domain folder, creates a sample model (entities), creates a sample data service (infrastructure), sets up a sample facade (application) which interacts with the sample data service.

_Example: `nx g @angular-architects/ddd:domain users --type=internal`_

> NB: uses the [DDD plugin schematics](https://github.com/angular-architects/nx-ddd-plugin/blob/master/libs/ddd/README.md). Always choose to not 'add an associated application' for this project.

### Generate a feature within a domain (DDD schematics)

`nx g @angular-architects/ddd:feature <some-feature> --domain <some-domain> --entity <some-entity> --type=internal --noApp --dry-run`

Adds a feature module and imports the domain module, injects and calls a method on the domain's application facade, ceates sample UI code.

_Example: `nx g @angular-architects/ddd:feature manage --domain users --entity user-role --type=internal --noApp`_

> NB: uses the [DDD plugin schematics](https://github.com/angular-architects/nx-ddd-plugin/blob/master/libs/ddd/README.md). Must be done after a domain has been generated. Advised to remove component files and generate separate feature components within sub directories using the generate component command below.

### Generate an API within a domain (DDD schematics)

`nx g @angular-architects/ddd:api <optional-specific-api-name> --directory <some-domain> --shared --type=internal --dry-run`

Adds an API module top provide the exported modules to other domains to import, if a domain's features are imported into other domains. Using the --shared flag automatically adds it to the shared directory under the sub directory defined through the --directory name. If the domain is not shared, but is only to be imported into specific dependant domains, then --shared should not be used, and the project tagged with a specific name which is used to grant access. See [here for example.](https://www.angulararchitects.io/aktuelles/sustainable-angular-architectures-2/#:~:text=Access%20to%20APIs%20such%20as%20catalog%2Dapi)

_Example: `nx g @angular-architects/ddd:api --directory dynamicform --shared --type=internal`_

> NB: uses the [DDD plugin schematics](https://github.com/angular-architects/nx-ddd-plugin/blob/master/libs/ddd/README.md). Must be done after a domain has been generated. Advised to remove component files and generate separate feature components within sub directories using the generate component command below.

### Adding NgRX

Use the NRWL CLI which is preferable to the DDD plugin NgRX schematics for generating NgRX boilerplate.

`nx g @nrwl/angular:ngrx <some-domain> --module=<some-domain-module-path> --directory +state/<some-state-category> --facade --useDataPersistence --dry-run`

_Example: `nx g @nrwl/angular:ngrx users --directory +state/users --module=libs/users/domain/src/lib/users-domain.module.ts --syntax creators --facade`_

### Generate a feature library without DDD plugin

`nx g lib --name=<some-lib> --directory=<some-domain>feature --tags='type:feature, domain:<some-domain>' --dry-run --routing --lazy --parentModule=<path-to-domain-shell-module>`

_Example: `manage-user-profiles --directory=users/feature --tags='type:feature, domain:users' --routing --lazy --parentModule=libs/users/shell/src/lib/users-shell.module.ts`_

### Generate a basic Angular library (ui / utils / api)

> NB: feature libraries are generated using the DDD schematics

`nx g lib --name=<some-lib> --directory=<some-domain>/<lib-type> --tags='type:<lib-type>, domain:<some-domain>' --dry-run`

Generates an Angular library without autogenerating DDD scaffolding.

> NB: Manually change the values for both the `prefix` property in the library's `project.json` definitions and the ES Lint config rules for `directive-selector` and `component-selector` to match the same value as `<some-domain>`. This is to align with the DDD preferences for feature prefixes which is autogenerated using the DDD schematics.

_Example: `nx g lib --name=feature-filter --directory=users --tags='type:feature, domain:users'`_

### Generate an Angular component within an Angular library (feature / ui)

`nx g component <some-domain>-<some-component-name> --m=<some-module-filename> --dry-run`

> NB: The component name should be defined by prepending the domain name `<some-domain>-<some-component-name>`

_Example: `nx g component users-manage-list --m=users-feature-manage`_

### Managing libraries

> The name `<some-lib-name>` matches the name found in the `workspace.json` projects.

- Remove: `nx g rm <some-lib-name> --dry-run`
- Move: `nx g mv --project <some-lib-name> <some-dir>/<other-lib-name> --dry-run`

## Storybook

Create storybook configs and storybook files for all components within a library.

Run `nx g @nrwl/angular:storybook-configuration <project-name>` where <project-name> is
the name of the library in workspace.json.

Run all stories: `npm run storybook`.

## Development server

Run `npm start` to serve both the frontend `web-app` and mock API backend `mock-api` simultaneously.

Or run each separately using `npm run serve:web` for the frontend and `npm run serve:api` for the mock API backend.

- Navigate to `http://localhost:4200/` for the main frontend.
- Navigate to `http://localhost:3333/api/` for the mock API backend.

> NB: You may need to kill the port previously run by Node if an error persists which claims the port is still in use

- Web app server: `kill $(lsof -t -i:4200)`
- Mock API server: `kill $(lsof -t -i:3333)`

## Build

Run `npm run build` to build the project.
Run `npm run build:prod` to build the production-ready project.

## Serve Build files locally

Run `npm run serve:dist` to serve and test the built application which was generated using
the BUILD command above using the `live-server` library. Navigate to
`http://localhost:6600/`

## Understand your workspace

Run `npm run graph` to see a diagram of the dependencies of your projects.

## Updating Angular, NX, and project dependancies.

Run `nx migrate latest` then `nx migrate --run-migrations`. See [Updating Nx](https://nx.dev/using-nx/updating-nx).

## Recommended VSCode extensions

Find a list in .vscode/extensions.json to ensure the best development experience.

## Further help

Visit the [Nx Documentation](https://nx.dev/angular) to learn more.
