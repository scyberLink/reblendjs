# Contributing to reblendjs

Thank you for your interest in contributing to reblendjs! This guide will help you set up your development environment and get started, with a focus on working with the `reblend-template-test` package.

## Prerequisites

- **Node.js** (v16 or higher recommended)
- **npm** (v7 or higher recommended)
- **Git**

## Repository Structure

This is a monorepo managed with [Lerna](https://lerna.js.org/) and contains multiple packages under the `packages/` directory. Each package has its own `README.md` and `package.json`.

## Getting Started

1. **Clone the repository:**

   ```sh
git clone https://github.com/bigdevsircole/reblendjs.git
cd reblendjs
   ```

2. **Install dependencies for all packages:**

   ```sh
npm install
   ```
   This will install dependencies for the root and all packages using workspaces.

3. **Bootstrap the monorepo (if using Lerna):**

   ```sh
npx lerna bootstrap
   ```
   This links local packages together and ensures all dependencies are installed.

## Working with `reblend-template-test`

The `reblend-template-test` package is located at `packages/reblend-template-test`.

### Setup and Start

1. **Navigate to the package directory:**

   ```sh
cd packages/reblend-template-test
   ```

2. **Install package dependencies:**

   ```sh
npm install
   ```


3. **Start the development server:**

   ```sh
npm start
   ```
   This runs:
   ```sh
   reblend-scripts start
   ```
   as defined in the `scripts` section of `package.json`.

4. **Run tests (if available):**

   ```sh
npm test
   ```

## Additional Tips

- Make sure to read the `README.md` files in both the root and the package you are working on for more details.
- Use `npm run <script>` to see available scripts in each package.
- If you encounter issues, check for a `lerna.json` or workspace configuration in `package.json` at the root.

## Code Style & Linting

- Run linters and formatters before submitting a PR:
  ```sh
  npm run lint
  npm run format
  ```
  (Check the root and package scripts for available commands.)

## Submitting Changes

1. Fork the repository and create your branch from `main` or the relevant feature branch.
2. Make your changes and commit them with clear messages.
3. Push your branch and open a Pull Request.

Thank you for contributing!