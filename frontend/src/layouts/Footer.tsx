interface FooterProps {
  footerText?: string;
  onNavigate: (destination: string) => void;
}

export const Footer = ({
  footerText = "Footer Content",
  onNavigate,
}: FooterProps) => {
  return (
    <footer
      style={{
        textAlign: "center",
        padding: "1rem",
        backgroundColor: "#f1f1f1",
        borderTop: "1px solid #ddd",
      }}
    >
      <p>{footerText}</p>
      <button onClick={() => onNavigate("contact")}>Contact Us</button>
    </footer>
  );
};
