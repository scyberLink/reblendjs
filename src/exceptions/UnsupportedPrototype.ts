class UnsupportedPrototype extends Error {
  constructor(clazz: string) {
    super(
      `Prototype ${
        clazz ? `"${clazz}" ` : ""
      }not supported. Please extend Scansio and define html method that returns your JSX/HTMLElementu`
    );
  }
}

export default UnsupportedPrototype;
