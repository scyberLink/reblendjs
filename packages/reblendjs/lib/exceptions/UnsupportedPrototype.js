class UnsupportedPrototype extends Error {
  constructor(clazz) {
    super(
      `Prototype ${
        clazz ? `"${clazz}" ` : ''
      } not supported. Please extend Reblend and define html method that returns your JSX/HTMLElement`
    );
  }
}
export default UnsupportedPrototype;
