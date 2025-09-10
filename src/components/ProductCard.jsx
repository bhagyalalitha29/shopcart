export default function ProductCard({ product, onDelete, onEdit }) {
    const handleDeleteClick = () => {
        onDelete(product);
    };

    const handleEditClick = () => {
        if (onEdit) onEdit(product);
    };

    return (
        <div style={styles.card}>
            <div style={styles.imageSection}>
                <img
                  src={product.image && product.image.trim() !== "" ? product.image : "https://via.placeholder.com/120x120?text=No+Image"}
                  alt={product.name}
                  style={styles.image}/>
            </div>
            <div style={styles.infoSection}>
                <div style={styles.category}>{product.category}</div>
                <div style={styles.name}>{product.name}</div>
                <div style={styles.description}>{product.description}</div>
                <div style={styles.price}>${product.price}</div>
                <div style={styles.actions}>
                    <button style={styles.editBtn} onClick={handleEditClick}>Edit</button>
                    <button style={styles.deleteBtn} onClick={handleDeleteClick}>Delete</button>
                </div>
            </div>
        </div>
    );
}

const styles = {
    card: {
        display: "flex",
        flexDirection: "column",
        background: "rgba(255,255,255,0.85)",
        borderRadius: 18,
        boxShadow: "0 4px 16px rgba(38,82,53,0.10)",
        width: 260,
        minHeight: 380,
        margin: 16,
        overflow: "hidden",
        transition: "box-shadow 0.2s",
        border: "1px solid #e0e0e0",
        position: "relative",
    },
    imageSection: {
        width: "100%",
        height: 160,
        background: "#f6fff6",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderBottom: "1px solid #e0e0e0",
    },
    image: {
        maxWidth: "90%",
        maxHeight: 140,
        objectFit: "contain",
        borderRadius: 12,
        background: "#fff",
    },
    infoSection: {
        padding: "18px 16px 12px 16px",
        display: "flex",
        flexDirection: "column",
        flex: 1,
        justifyContent: "space-between",
    },
    category: {
        color: "#43a047",
        fontSize: 13,
        fontWeight: 600,
        marginBottom: 4,
        textTransform: "uppercase",
        letterSpacing: 1,
    },
    name: {
        fontSize: 18,
        fontWeight: 700,
        color: "#265235",
        marginBottom: 8,
        minHeight: 24,
        lineHeight: 1.2,
    },
    description: {
        fontSize: 14,
        color: "#444",
        marginBottom: 12,
        minHeight: 40,
        overflow: "hidden",
        textOverflow: "ellipsis",
        display: "-webkit-box",
        WebkitLineClamp: 2,
        WebkitBoxOrient: "vertical",
    },
    price: {
        fontSize: 18,
        fontWeight: 700,
        color: "#388e3c",
        marginBottom: 16,
    },
    actions: {
        display: "flex",
        justifyContent: "space-between",
        gap: 10,
    },
    editBtn: {
        background: "#b7e4c7",
        color: "#265235",
        border: "none",
        borderRadius: 16,
        padding: "7px 18px",
        fontWeight: 600,
        fontSize: 14,
        cursor: "pointer",
        letterSpacing: 1,
        transition: "background 0.2s",
    },
    deleteBtn: {
        background: "#265235",
        color: "#fff",
        border: "none",
        borderRadius: 16,
        padding: "7px 18px",
        fontWeight: 600,
        fontSize: 14,
        cursor: "pointer",
        letterSpacing: 1,
        transition: "background 0.2s",
    },
};