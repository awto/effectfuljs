const realError = console.error;

console.error = (...args) => {
  const msg = args[0];
  if (
    typeof msg === "string" &&
    msg.includes("react-test-renderer is deprecated")
  ) {
    return;
  }
  realError.apply(console, args);
};
