class NullException extends Error {
  constructor(message) {
    super(message ?? 'Null object not accepted');
  }
}
export default NullException;
