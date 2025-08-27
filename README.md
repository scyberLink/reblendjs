- # ReblendJS

ReblendJS is a modern frontend library that combines the best of React and Web Components. It provides a simple, high-performance API for building reusable UI components, with native support for async rendering, hooks, and seamless integration with both React and standard HTML.

---

## 📁 Project Directory Structure

Here’s an overview of the main project structure. Each package is explained below:

```
reblendjs/
├── packages/
│   ├── reblend-bootstrap/         # Bootstrap component wrappers for ReblendJS
│   ├── reblend-deep-equal-iterative/ # Deep equality checking utilities
│   ├── reblend-hooks/             # Built-in hooks (state, effect, etc.)
│   ├── reblend-router/            # Client-side routing for ReblendJS apps
│   ├── reblend-routing/           # Routing utilities and helpers
│   ├── reblend-template-test/     # Template and test utilities
│   ├── reblend-typing/            # TypeScript type definitions
│   └── reblend-ui/                # Core UI components and primitives
├── tasks/                         # Project scripts and automation
├── README.md                      # Project documentation (this file)
├── package.json                   # Project metadata and dependencies
└── ...                            # Other configuration and support files
```

**What Each Package Does:**

- **reblend-bootstrap/**: Provides Bootstrap-styled components for use with ReblendJS.
- **reblend-deep-equal-iterative/**: Utilities for deep equality checks, useful for state comparison and memoization.
- **reblend-hooks/**: Collection of built-in hooks (like `useState`, `useEffect`) for state and lifecycle management.
- **reblend-router/**: Implements client-side routing for single-page applications.
- **reblend-routing/**: Additional routing helpers and utilities, inspired by Express.js.
- **reblend-template-test/**: Templates and utilities for testing ReblendJS components and bootstrapping new projects.
- **reblend-typing/**: TypeScript type definitions for strong typing and IDE support.
- **reblend-ui/**: Core UI primitives and reusable, headless components.

---
- **Standard HTML & React Attributes** – Write components using familiar syntax.
- **JSX Support** – Use `for`, `style` (as a string), `class` (as `classNames`), and standard attributes.
- **React Component Compatibility** – Use React components within ReblendJS.
- **Uses React's Build Tools** – No need to change your existing setup.
- **Functional Components Compile to Classes** – Optimized for performance.
- **Single Execution for Functional Components** – No unnecessary re-renders.
- **Web Component Native Support** – Directly renders existing `HTMLElement` instances without wrappers.
- **Simple API & Easy to Learn** – Minimal boilerplate, quick to get started.
- **Built-in Hooks Support** – Manage state and side effects seamlessly.
- **Component-Level State Management** – Each element holds its own state.
- **No Mixed or Async State Rendering** – Eliminates issues with pre/post rendering.
- **Faster Rendering** – State is localized within each element, reducing unnecessary updates.
- **Async Components & Rendering** – Out-of-the-box support for async components and lazy loading.

---

## ⚡ Async Components & Rendering

ReblendJS supports **async components and async rendering** natively. You can return a `Promise` from your component, enabling features like code-splitting and conditional lazy loading without extra libraries.

**Example:**

```js
import Reblend from "reblendjs";
import { useIsAdmin } from "../../lib/hooks";

export async function AdvertPage() {
  const isAdmin = useIsAdmin();

  return (
    <>
      {isAdmin
        ? import("../admin/advert/admin-advert").then((m) => m.default)
        : import("./advert").then((m) => m.default)}
    </>
  );
}
```

Just use `async` components and return Promises or dynamic imports—ReblendJS will handle the rendering automatically.

---

## 📦 Installation

To quickly set up a new ReblendJS project with TypeScript, use:

```sh
npx create-reblend-app --template typescript ./my-app
```

Alternatively, install ReblendJS manually:

```sh
npm install reblendjs
```
or
```sh
yarn add reblendjs
```

---

## 🛠️ Usage

### Mounting Components to the DOM

ReblendJS uses `mountOn` to attach components to the DOM:

```js
import Reblend from 'reblendjs';
import App from './App';

Reblend.mountOn('root', App);
```

### Functional Component Example

ReblendJS **recommends using functional components** for better performance, as they are efficiently compiled into class components:

```js
import Reblend, { useState } from 'reblendjs';

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

Reblend.mountOn('root', Counter);
```

### JSX Support (`for`, `style`, `class`, and Attributes)

ReblendJS **fully supports JSX attributes**, including:

- `for` (instead of `htmlFor` in React)
- `style` (as a **string**, unlike React's object-based approach)
- `class` (as `classNames`)
- Standard attributes (`id`, `name`, `placeholder`, etc.)

**Example:**

```js
const FormExample = () => {
  return (
    <form>
      <label for="name">Name:</label>
      <input id="name" type="text" placeholder="Enter your name" />

      <button
        class="btn btn-primary"
        style="background-color: blue; padding: 10px;"
      >
        Submit
      </button>
    </form>
  );
};

Reblend.mountOn('root', FormExample);
```

---

## 🎯 Use Cases

ReblendJS is ideal for:

- **Building Web Components** – Create reusable elements without React wrappers.
- **Optimizing Performance** – When React’s Virtual DOM is too heavy.
- **Progressive Enhancement** – Use ReblendJS alongside native HTML.
- **Embedding in Non-React Projects** – Works well in vanilla JS applications.

---

## ⚖️ ReblendJS vs React

| Feature                     | ReblendJS                              | ReactJS                                         |
| --------------------------- | -------------------------------------- | ----------------------------------------------- |
| Standard HTML Attributes    | ✅ Supports all                        | ✅ Supports all                                 |
| JSX `for`, `style`, `class` | ✅ Fully supported                     | ❌ `htmlFor`, `style` as an object, `className` |
| React Component Support     | ✅ Fully Compatible                    | ✅ Native                                       |
| Functional Components       | ✅ Compiled to Classes                 | ✅ Functional with Hooks                        |
| Hooks                      | ✅ Supported                           | ✅ Supported                                    |
| Web Component Support       | ✅ Native (renders without wrapper)    | ❌ Requires wrappers like `Reblend.createElement` |
| State Management           | ✅ Localized in elements               | ✅ Centralized (React Context, Redux)           |
| Rendering Performance      | ✅ Faster (isolated state per element) | ⚠️ Slower when dealing with large states        |
| Build Tool                 | ✅ Uses React's toolchain              | ✅ Uses its own build tools                     |
| Learning Curve             | ✅ Simpler syntax, minimal setup       | ⚠️ More concepts (Virtual DOM, Reconciliation)  |

---

## 🎨 Example: Modal with Button Interaction Using Bootstrap Components with ReblendJS

Here’s an example of creating a button that toggles a modal:

```js
import { Button } from 'react-bootstrap';
import Reblend, { useState } from 'reblendjs';
import Modal from 'react-bootstrap/Modal';

export function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      closeButton
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Centered Modal</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

const App = () => {
  const [modalShow, setModalShow] = useState(false);

  const toggleModal = () => {
    setModalShow(!modalShow);
  };

  return (
    <div>
      <Button variant="primary" onClick={toggleModal}>
        Toggle Modal
      </Button>
      <MyVerticallyCenteredModal show={modalShow} onHide={toggleModal} />
    </div>
  );
};

Reblend.mountOn('root', App);
```

---

## 🏗️ Contributing

We welcome contributions! Feel free to submit issues or pull requests.

### Steps to Contribute:

1. Fork the repository.
2. Create a new branch.
3. Commit your changes.
4. Open a pull request.

---

## 📜 License

[MIT License.](LICENSE)