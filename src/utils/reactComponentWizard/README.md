# React Component Wizard

The `reactComponentWizard` is a Bash script that simplifies the process of creating and deleting React components in a project. It automates the boilerplate creation of component files and ensures the components are properly registered or removed from the project index.

## Features

- **Create Components:** Automatically generates all the necessary files for a new React component, including the component file, story, test, type definitions, and an index file.
- **Delete Components:** Safely removes a component and its associated files from the project.
- **Update Index:** Automatically updates the project's component index file after creating or deleting a component.

## Prerequisites

- Bash
- Node.js and npm
- `ts-node` installed globally or in the project

## Installation

1. Before using the script, ensure it is executable:

```bash
cd src/utils/reactComponentWizard
chmod +x scripts.sh
```

2. Update the `BASE_PATH` in `reactComponentWizard/scripts.sh` to match your directory structure.

3. Add commands to package.json. Make sure the path aligns with where you've put the file.

```json
"scripts": {
  "create-react-component": "bash ./src/utils/reactComponentWizard/scripts.sh create",
  "delete-react-component": "bash ./src/utils/reactComponentWizard/scripts.sh delete"
}
```

4. Optionally namespace the commands:

```json
"scripts": {
  "crc": "npm run create-react-component",
  "drc": "npm run delete-react-component"
}
```

6. Run commands in terminal as:

- `npm run crc ComponentName`
- `npm run drc ComponentName`

## Usage

### Creating a Component

To create a new component, run:

```bash
npm run create-react-component ComponentName
# npm run crc ComponentName, if namespaced
```

Replace `ComponentName` with the name of the component you wish to create. The script will generate the necessary files and update the component index.

#### Default Output

By default, a command like `npm run create-react-component Button` will create the following:

```bash
components/Button
  - Button.tsx
  - Button.stories.tsx
  - Button.test.tsx
  - Button.types.tsx
  - index.ts
```

And will add the following to `src/components/index.ts`

```typescript
export * from "./Button";
```

#### Custom Output

In the future this script will have a config file for customizing the output. For now, you'll have to edit `utils/reactComponetWizard/scripts.sh`.

If you don't need one of the default files, like `Button.stories.tsx`, for example, simply comment out that block inside `scripts.sh`, as the section under "Create the styles file" is commented out by default.

### Deleting a Component

To delete an existing component, run:

```bash
npm run delete-react-component ComponentName
# npm run drc ComponentName, if namespaced
```

Replace Replace `ComponentName` with the name of the component you wish to delete. The script will remove the component files and update the component index.

## Notes

- The script prompts for confirmation before overwriting or deleting any files.
- Ensure the paths used in the script match your project's directory structure.
- The script assumes a standard React project setup. Adjustments may be necessary for different setups.
