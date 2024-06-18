# ReblendJs
## A library built using react way of handling dom but with web components
This project is a frontend library that provides a robust and modular approach to state management and component rendering, inspired by React's architecture but built using web components. The library aims to combine the benefits of React's efficient state handling with the native browser support and interoperability of web components.

At its core, the library introduces a custom element base class that encapsulates the state management logic and lifecycle methods, similar to React's class components. Developers can extend this base class to create their own custom elements, defining their state, props, and event handlers.

The library employs a reactive rendering system that automatically updates the component's DOM whenever the component's state changes, ensuring optimal performance and minimizing unnecessary re-renders. This reactive rendering approach is achieved through the use of Shadow DOM, allowing components to maintain their own isolated DOM tree and styles.

By leveraging web components, the library ensures seamless integration with existing web applications, regardless of the underlying framework or technology stack. Components created with this library can be easily imported and used in any web project, fostering reusability and maintainability.

Key features of the library include:

1. **State Management**: Efficient state handling inspired by React's state management approach, allowing components to maintain their own internal state and triggering updates when necessary.

2. **Reactive Rendering**: Automatic DOM updates in response to state changes, optimized for performance through efficient diffing algorithms and batched updates.

3. **Component Lifecycle**: Customizable lifecycle methods for components, enabling developers to hook into various stages of the component's lifecycle, such as component creation, update, and destruction.

4. **Prop Passing**: Seamless prop passing between parent and child components, facilitating communication and data sharing across the component tree.

5. **Web Component Integration**: Seamless integration with existing web applications, leveraging the native browser support for web components and ensuring interoperability across different frameworks and libraries.

The library aims to provide developers with a familiar and intuitive API for building reusable and maintainable web components while taking advantage of the performance and interoperability benefits of web components.
