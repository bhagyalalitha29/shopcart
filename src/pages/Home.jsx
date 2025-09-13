import { Link } from "react-router-dom";
import { theme } from "../theme";
import "../animations.css";

export default function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        background: `linear-gradient(135deg, ${theme.background} 0%, ${theme.accent} 100%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <section style={styles.hero}>
        <div style={styles.left} className="fadeInUp">
          <div style={styles.badge} className="popIn">70% OFF</div>
          <h1 style={styles.title}>
            <span style={styles.green}>Shop</span> Smarter<br />
            <span style={styles.subtitle}>with Shopcart</span>
          </h1>
          <p style={styles.desc}>
 Enjoy a seamless shopping experience with exclusive discounts and a beautiful, modern interface.
          </p>
          <Link to="/products" style={styles.cta} className="popIn">Shop Now</Link>
        </div>
        <div style={styles.right} className="fadeInUp">
          <img
            src="https://pngimg.com/d/shopping_cart_PNG38.png"
            alt="Shopping Cart"
            style={styles.image}
            draggable={false}
          />
        </div>
      </section>
    </div>
  );
}

const styles = {
  hero: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "4rem",
    width: "100vw",
    maxWidth: 1400,
    padding: "10px 32px 0 32px",
    flexWrap: "wrap",
    animation: "fadeInUp 1s cubic-bezier(.4,0,.2,1)",
  },
  left: {
    flex: 1,
    minWidth: 340,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    paddingLeft:50,
    justifyContent: "center",
    gap: 24,
    animation: "fadeInUp 1.2s cubic-bezier(.4,0,.2,1)",
  },
  badge: {
    background: theme.primary,
    color: "#fff",
    fontWeight: 700,
    fontSize: "1.3rem",
    borderRadius: 18,
    padding: "8px 28px",
    marginBottom: 10,
    letterSpacing: 2,
    boxShadow: theme.shadow,
    animation: "popIn 0.7s cubic-bezier(.4,0,.2,1)",
  },
  title: {
    fontSize: "3.2rem",
    fontWeight: 800,
    color: theme.text,
    margin: 0,
    lineHeight: 1.1,
  },
  green: {
    color: theme.primary,
  },
  subtitle: {
    color: theme.secondary,
    fontWeight: 600,
    fontSize: "2.1rem",
  },
  desc: {
    color: theme.text,
    fontSize: "1.2rem",
    margin: "1px 0 15px 0",
    maxWidth: 480,
    lineHeight: 1.5,
  },
  cta: {
    background: theme.secondary,
    color: "#fff",
    border: "none",
    borderRadius: 25,
    padding: "16px 48px",
    fontSize: "1.3rem",
    fontWeight: 700,
    textDecoration: "none",
    boxShadow: theme.shadow,
    cursor: "pointer",
    transition: "background 0.2s, transform 0.2s",
    marginTop: 0,
    display: "inline-block",
  },
  right: {
    flex: 1,
    minWidth: 320,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    animation: "fadeInUp 1.4s cubic-bezier(.4,0,.2,1)",
  },
  image: {
    maxWidth: 400,
    width: "100%",
    borderRadius: 32,
    userSelect: "none",
    background: "transparent",
    boxShadow: theme.shadow,
    animation: "popIn 1.2s cubic-bezier(.4,0,.2,1)",
  },
};