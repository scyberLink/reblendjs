class UnsupportedPrototype extends Error {
  constructor(clazz: string) {
    super(
      `Prototype ${
        clazz ? `"${clazz}" ` : ''
      }not supported. Please extend Reblend and define html method that returns your JSX/HTMLElementu`
    );
  }
}

export default UnsupportedPrototype;
