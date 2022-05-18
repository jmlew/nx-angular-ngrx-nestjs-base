# Angular + NestJS Boilerplate Web App

A Base [Angular](https://angular.io) web app and [NestJS](https://docs.nestjs.com/) mock backend API server.

Organised as a [Nx](https://nx.dev) monorepo and composed using Domain Driven Design (DDD) principles to provides a best-practice starting point for developing modular and scaleable Angular apps.

## Architecture

The codebase combines a number of separate 'applications' (apps) and 'libraries' (libs) within the same workspace in a [NX Monorepo](https://nx.dev). There are only two applications:

1. Web-app

   > The main client application (Angular) as a simplified app with all functionality linked to in libs.

2. Mock-api
   > The Mock API server application (NestJS) which mocks interaction with teh real server during offline development.

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

`nx g @nrwl/angular:ngrx <some-domain> --directory +state/<some-state-category> --module=<some-domain-module-path> --syntax creators --facade --no-interactive --dry-run`

> NB: Uses the NRWL CLI (this is preferable to the DDD plugin NgRX schematics).

_Example: `nx g @nrwl/angular:ngrx users --directory +state/users --module=libs/users/domain/src/lib/users-domain.module.ts --syntax creators --facade --no-interactive`_

### Generate a basic Angular library (ui / utils / api)

> NB: feature libraries are generated using the DDD schematics

`nx g lib --name=<lib-type>-<some-lib> --directory=<some-domain> --tags='type:<lib-type>, domain:<some-domain>' --no-interactive --dry-run`

Generates an Angular library without autogenerating DDD scaffolding.

> NB: Manually change the values for both the `prefix` property in the library's `project.json` definitions and the ES Lint config rules for `directive-selector` and `component-selector` to match the same value as `<some-domain>`. This is to align with the DDD preferences for feature prefixes which is autogenerated using the DDD schematics.

_Example: `nx g lib --name=feature-filter --directory=users --tags='type:feature, domain:users' --no-interactive`_

### Generate an Angular component within an Angular library (feature / ui)

`nx g component --name=<some-domain>-<some-component> --selector=<some-domain>-<some-component> --project=<some-module-name> --module=<some-module-name> --path=<path-to-some-module> --changeDetection=OnPush --export --no-interactive --dry-run`

> NB: The component name should be defined by prepending the domain name `<some-domain>-<some-component>`

> This component name should also be included here to generate the selector explicitly. The selector name should prepend the domain name to align with `prefix` property in the library's `project.json` definitions as well as its ES Lint config rules for `directive-selector` and `component-selector`.

_Example: `nx g component --name=users-manage --selector=users-manage --project=users-feature-manage --module=users-feature-manage --path=libs/users/feature-manage/src/lib --changeDetection=OnPush --export --no-interactive`_

### Managing libraries

> The name `<some-lib-name>` matches the name found in the `workspace.json` projects.

- Remove: `nx g rm <some-lib-name> --dry-run`
- Move: `nx g mv --project <some-lib-name> <some-dir>/<other-lib-name> --dry-run`

## Features

### NestJS Mock API app

The 'mock-api' app contains a NestJS application which replicates the APIs requested to ensure development can continue in parallel to that of the Backend. This mock API can be enabled as the source of all HTTP requests within the web-app when serving in dev mode and when the environments property `useMockInDev` is set to `true` (located in `src/environments/environment.ts`).

#### Serving the mock API

The app serves on the port defined in a variable in the .env file (`process.env.NX_MOCK_API_PORT`) and this matches the port number defined in the web-app's proxy file (`proxy.conf.json`), which is used to ensure all API calls within the app are redirected to the mock API.

## Development server

Run `npm start` to serve both the frontend `web-app` and mock API backend `mock-api` simultaneously.

Or run each separately using `npm run serve:web` for the frontend and `npm run serve:api` for the mock API backend.

- Navigate to `http://localhost:4200/` for the main frontend.
- Navigate to `http://localhost:3333/api/` for the mock API backend.

## Build

Run `npm run build` to build the project.
Run `npm run build:prod` to build the production-ready project.

## Serve Build files locally

Run `npm run serve:dist` to serve and test the built application which was generated using the BUILD command above using the `live-server` library. Navigate to `http://localhost:6600/`

## Running unit tests

Run `ng test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

## Running end-to-end tests

Run `ng e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

## Understand your workspace

Run `nx graph` to see a diagram of the dependencies of your projects.

## Further help

Visit the [Nx Documentation](https://nx.dev/angular) to learn more.
