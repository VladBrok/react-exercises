export default function Form({ children, onSubmit, ...props }) {
  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(e);
  }

  return (
    <form onSubmit={handleSubmit} {...props}>
      {children}
    </form>
  );
}
