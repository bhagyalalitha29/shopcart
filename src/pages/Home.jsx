import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div
      style={{
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        background: "linear-gradient(135deg, #e9f5e1 0%, #b7e4c7 100%)",
        minHeight: "100vh",
        width: "100vw",
        margin: 0,
        padding: 0,
        boxSizing: "border-box",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <section style={styles.banner}>
        <div style={styles.bannerTextContainer}>
          <h1 style={styles.bannerTitle}>
            Get Upto <span style={styles.highlight}>50% Off</span>
            <br />
            <span style={styles.subTitle}>On Selected Items</span>
          </h1>
          <div style={styles.buttonContainer}>
            <Link style={styles.buyButton} to="/products">Buy Now</Link>
          </div>
        </div>
        <div style={styles.imageContainer}>
          <img
            src="https://pngimg.com/d/shopping_cart_PNG38.png"
            alt="Shopping Cart"
            style={styles.bannerImage}
            draggable={false}
          />
        </div>
      </section>
    </div>
  );
}

const styles = {
  banner: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100vw",
    gap: "3rem",
    flexWrap: "wrap",
    padding: 0,
    margin: 0,
    overflow: "hidden",
  },
  bannerTextContainer: {
    flex: 1,
    minWidth: 320,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  bannerTitle: {
    fontSize: "2.7rem",
    fontWeight: "bold",
    color: "#265235",
    textAlign: "center",
    marginBottom: 0,
    lineHeight: 1.2,
  },
  highlight: {
    color: "#43a047",
    fontSize: "3.2rem",
    fontWeight: "bold",
    letterSpacing: 2,
  },
  subTitle: {
    color: "#265235",
    fontSize: "2rem",
    fontWeight: 500,
    letterSpacing: 1,
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    marginTop: 30,
  },
  buyButton: {
    background: "#265235",
    color: "white",
    border: "none",
    borderRadius: 25,
    padding: "14px 40px",
    cursor: "pointer",
    fontSize: "1.2rem",
    fontWeight: 600,
    transition: "background 0.2s",
    boxShadow: "none", // Removed shine
    textDecoration: "none",
  },
  imageContainer: {
    flex: 1,
    minWidth: 300,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  bannerImage: {
    maxWidth: 340,
    width: "100%",
    borderRadius: 30,
    userSelect: "none",
    background: "transparent",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)", // Subtle shadow
  },
};