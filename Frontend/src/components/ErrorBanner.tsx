interface Props {
  message: string;
}

const ErrorBanner = ({ message }: Props) => (
  <div
    style={{
      padding: "12px",
      backgroundColor: "#ffcccc",
      color: "#a70000",
      marginBottom: "16px",
      borderRadius: "4px",
    }}
  >
    {message}
  </div>
);

export default ErrorBanner;