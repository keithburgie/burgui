#!/bin/bash

# execute `chmod +x src/utils/reactComponentWizard/scripts.sh` to enable

ACTION="$1"
COMPONENT_NAME="$2"

BASE_PATH="./src/components"
COMPONENT_DIR="$BASE_PATH/$COMPONENT_NAME"

error() {
  echo -e "\033[31m$1\033[0m"
}

success() {
  echo -e "\033[32m$1\033[0m"
}

warning() {
  echo -e "\033[33m$1\033[0m"
}

create_component() {
  # Check if the component directory already exists
  if [ -d "$COMPONENT_DIR" ]; then
    # Echo a statement if the directory is found
    error "$COMPONENT_NAME component already exists."

    EXISTING_COMPONENT_MESSAGE=$(warning "Do you want to overwrite it? (y/N): \n")

    # Prompt the user for input
    read -p "$EXISTING_COMPONENT_MESSAGE" confirm

    # Check the user's answer
    case $confirm in
    [yY] | [yY][eE][sS])
      echo "Overwriting existing $COMPONENT_NAME component..."
      ;;
    *)
      echo "Operation canceled. No files were changed."
      exit 1
      ;;
    esac
  fi

  # Convert COMPONENT_NAME to formats used in the code
  COMPONENT_NAME_KEBAB=$(echo "$COMPONENT_NAME" | sed 's/\(.\)\([A-Z]\)/\1-\2/g' | tr '[:upper:]' '[:lower:]')
  COMPONENT_NAME_SNAKE_CASE=$(echo "$COMPONENT_NAME" | sed -r 's/([a-z0-9])([A-Z])/\1_\2/g' | tr '[:lower:]' '[:upper:]')

  EXPORTED_VARIANTS="${COMPONENT_NAME_SNAKE_CASE}_VARIANTS"

  # Create component directory
  mkdir -p $COMPONENT_DIR

  # Create the required files
  touch $COMPONENT_DIR/$COMPONENT_NAME.tsx
  touch $COMPONENT_DIR/$COMPONENT_NAME.stories.tsx
  touch $COMPONENT_DIR/$COMPONENT_NAME.test.tsx
  touch $COMPONENT_DIR/$COMPONENT_NAME.types.tsx
  touch $COMPONENT_DIR/index.ts

  # Populate the files

  # --------------------------------------------
  # Create the component file
  # --------------------------------------------
  echo "import { HTMLAttributes, PropsWithChildren } from 'react';

  // Autogenerated. Modify this as needed.
  interface BaseProps extends PropsWithChildren<HTMLAttributes<HTMLDivElement>> {}

  export interface ${COMPONENT_NAME}Props extends BaseProps {}

  const $COMPONENT_NAME = (props: ${COMPONENT_NAME}Props) => {
    return <div {...props}>$COMPONENT_NAME</div>;
  };

  export default $COMPONENT_NAME;
  " >$COMPONENT_DIR/$COMPONENT_NAME.tsx

  # --------------------------------------------
  # Create the index file
  # --------------------------------------------
  echo "export { default } from './$COMPONENT_NAME';
  " >$COMPONENT_DIR/index.ts

  # --------------------------------------------
  # Create the types file
  # --------------------------------------------
  echo "// Export types or variables that will be used by the component and its stories.
  // Delete this file if not needed for this component.
  /**
  * export const $EXPORTED_VARIANTS = ['foo', 'bar', 'baz'] as const;
  * export type ${COMPONENT_NAME}Variants = (typeof ${EXPORTED_VARIANTS})[number];
  */
  " >$COMPONENT_DIR/$COMPONENT_NAME.types.tsx

  # --------------------------------------------
  # Create the story file
  # --------------------------------------------
  echo "import type { Meta, StoryObj } from '@storybook/react';

  import $COMPONENT_NAME from './$COMPONENT_NAME';

  // Update imports or delete if not exporting types
  // import { $EXPORTED_VARIANTS } from './$COMPONENT_NAME.types';

  const meta = {
    title: 'Components/$COMPONENT_NAME',
    component: $COMPONENT_NAME,
    tags: ['autodocs'],
    argTypes: {
      // variant: {
      //     options: [undefined, ...${EXPORTED_VARIANTS}],
      //     control: { type: 'radio' }
      // }
    }
  } satisfies Meta<typeof $COMPONENT_NAME>;

  export default meta;
  type Story = StoryObj<typeof $COMPONENT_NAME>;

  const baseArgs = {
    children: "$COMPONENT_NAME",
  };

  export const Playground: Story = {
    args: {
      ...baseArgs
    }
  };
  " >$COMPONENT_DIR/$COMPONENT_NAME.stories.tsx

  # --------------------------------------------
  # Create the test file
  # --------------------------------------------
  echo import { describe, expect } from 'vitest'
  echo "import { render, screen } from '@testing-library/react';
  import $COMPONENT_NAME from './$COMPONENT_NAME';

  describe('$COMPONENT_NAME', () => {
    const baseClass = 'bsds-$COMPONENT_NAME_KEBAB';
    const testId = baseClass;

    it('renders without crashing', () => {
      render(<$COMPONENT_NAME data-testid={testId} />);
    });

    /**
    * Replace and add more useful tests
    */
    it('applies className correctly', () => {
      render(<$COMPONENT_NAME data-testid={testId} className={baseClass} />);
      expect(screen.getByTestId(testId)).toHaveClass(baseClass);
    });
  });
  " >$COMPONENT_DIR/$COMPONENT_NAME.test.tsx

  # --------------------------------------------
  # Create the styles file
  # --------------------------------------------
  # echo "// Autogenerated. Delete if not needed.
  # .bsds-$COMPONENT_NAME_KEBAB {
  #   // $COMPONENT_NAME styles here
  # }
  # " > $STYLES_PATH/_$COMPONENT_NAME_KEBAB.scss

  # After creating component files, update the index
  ts-node ./src/utils/reactComponentWizard/refresh.js

  # Reminder for user
  success "$COMPONENT_NAME component created!"
}

delete_component() {
  # Check if the component directory exists
  if [ ! -d "$COMPONENT_DIR" ]; then
    error "Component $COMPONENT_NAME does not exist."
    exit 1
  fi

  # Confirm deletion
  read -p "Are you sure you want to delete the component $COMPONENT_NAME? (y/N): " confirm
  case $confirm in
  [yY] | [yY][eE][sS])
    echo "Deleting $COMPONENT_NAME component..."
    ;;
  *)
    echo "Operation canceled. No files were changed."
    exit 1
    ;;
  esac

  # Delete the component directory
  rm -rf "$COMPONENT_DIR"

  # Run refresh script to update the index
  ts-node ./src/utils/reactComponentWizard/refresh.js

  success "Component $COMPONENT_NAME deleted successfully."
}

# Check if action and component name is provided
if [ -z "$ACTION" ]; then
  error "Please provide an action (create or delete)!"
  exit 1
fi

if [ -z "$COMPONENT_NAME" ]; then
  error "Please provide a component name!"
  exit 1
fi

if [ "$ACTION" = "create" ]; then
  create_component
elif [ "$ACTION" = "delete" ]; then
  delete_component
else
  error "Invalid action: $ACTION. Please use 'create' or 'delete'."
  exit 1
fi
