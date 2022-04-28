# Angular + NestJS Boilerplate Web App

A Base [Angular](https://angular.io) web app and [NestJS](https://docs.nestjs.com/) mock backend API server.

Organised as a [Nx](https://nx.dev) monorepo and composed using Domain Driven Design (DDD) principles to provides a best-practice starting point for developing modular and scaleable Angular apps.

## Architecture

### Structure

The codebase is combined into a number of separate 'applications' (apps) and 'libraries' (libs) in a [NX Monorepo](https://nx.dev).

## Features

### NestJS Mock API app

The 'mock-api' app contains a NestJS application which replicates the APIs requested to ensure development can continue in parallel to that of the Backend. This mock API can be enabled as the source of all HTTP requests within the web-app when serving in dev mode and when the environments property `useMockInDev` is set to `true` (located in `src/environments/environment.ts`).

#### Serving the mock API

The app serves on the port defined in a variable in the .env file (`process.env.NX_MOCK_API_PORT`) and this matches the port number defined in the web-app's proxy file (`proxy.conf.json`), which is used to ensure all API calls within the app are redirected to the mock API.

## Generate an application

Run `ng g @nrwl/angular:app my-app` to generate an application.

> You can use any of the plugins above to generate applications as well.

When using Nx, you can create multiple applications and libraries in the same workspace.

## Generate a library

Run `ng g @nrwl/angular:lib my-lib` to generate a library.

> You can also use any of the plugins above to generate libraries as well.

Libraries are shareable across libraries and applications. They can be imported from `@example-app/mylib`.

## Development server

Run `ng serve my-app` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng g component my-component --project=my-app` to generate a new component.

## Build

Run `ng build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

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
