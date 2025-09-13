import { useState } from "react";
import { theme } from "../theme";
import "../animations.css";

const MAX_DESC_LENGTH = 70;

export default function ProductCard({ product, onDelete, onEdit }) {
    const [showConfirm, setShowConfirm] = useState(false);
    const [showView, setShowView] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [editData, setEditData] = useState({ ...product });

    // Ensure editData.image is always set when opening the edit form
    const handleEditClick = (e) => {
        e.stopPropagation();
        setEditData({ ...product});
        setShowEdit(true);
    };

    const handleDeleteClick = (e) => {
        e.stopPropagation();
        setShowConfirm(true);
    };

    const handleViewClick = () => {
        setShowView(true);
    };

    const handleCloseView = () => {
        setShowView(false);
    };

    const handleConfirmDelete = () => {
        setShowConfirm(false);
        onDelete(product);
    };

    const handleCancelDelete = () => {
        setShowConfirm(false);
    };

    // (moved above, see new version)
    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditData(prev => ({ ...prev, [name]: value }));
        console.log('edit data:',editData);
    };

    const handleEditSave = async (e) => {
    e.preventDefault();
    if (!editData.image || editData.image.trim() === "") {
        alert("Image URL is required.");
        return;
    }
    setShowEdit(false);

    const dataToSend = { ...editData, price: Number(editData.price) };
    console.log('Submitting edit data:', dataToSend);
    try {
        const response = await fetch(`https://shopcart-paisawapas.onrender.com/api/products/${product._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataToSend)
        });

        if (response.ok) {
            const updatedProduct = await response.json();
            console.log('Received updated product from server:', updatedProduct);
            if (onEdit) {
                onEdit({ ...updatedProduct, _id: product._id });
            }
        } else {
            alert("Failed to update product.");
        }
    } catch (err) {
        alert("Error updating product.");
    }
};

    const handleEditCancel = () => setShowEdit(false);

    const truncatedDesc = product.description && product.description.length > MAX_DESC_LENGTH
        ? product.description.slice(0, MAX_DESC_LENGTH) + '... '
        : product.description;
    const showMore = product.description && product.description.length > MAX_DESC_LENGTH;

    // Show product.price as original price, and 70% off as discounted price
    const originalPrice = Math.round(Number(product.price));
    const discountedPrice = Math.round(Number(product.price) * 0.3);

    return (
        <div
            style={styles.card}
            className="popIn"
            onClick={(e) => {
                // Only open details if not clicking on a button or inside a button
                if (!(e.target.closest('button'))) handleViewClick();
            }}
        >
            <div style={styles.glassOverlay}></div>
            <div style={styles.imageSection}>
                <img
                  src={product.image && product.image.trim() !== "" ? product.image : "https://via.placeholder.com/120x120?text=No+Image"}
                  alt={product.name}
                  style={styles.image}/>
            </div>
            <div style={styles.infoSection}>
                <div style={styles.category}>{product.category}</div>
                <div style={styles.name}>{product.name}</div>
                <div style={styles.description}>
                  {truncatedDesc}
                  {showMore && (
                    <span style={styles.more} onClick={handleViewClick}>more</span>
                  )}
                </div>
                                <div style={{display:'flex',alignItems:'center',gap:8,margin:'8px 0'}}>
                                    <span style={{color:theme.primary,fontWeight:800,fontSize:'1.13rem'}}>${discountedPrice}</span>
                                    <span style={{textDecoration:'line-through',color:'#888',fontWeight:600,fontSize:'1.02rem',marginLeft:2}}>${originalPrice}</span>
                                    <span style={{background:'#ffe500',color:'#1a8917',fontWeight:900,fontSize:'0.98rem',borderRadius:6,padding:'2px 8px',marginLeft:2,letterSpacing:0.5}}>70% off</span>
                                </div>
                <div style={styles.actions}>
                    {/* <button style={styles.viewBtn} onClick={handleViewClick}>View</button> */}
                                        <button style={styles.editBtn} onClick={handleEditClick}>
                                                <div style={{display:'flex'}}><span style={{display:'inline-flex',alignItems:'center',marginRight:6}}>
                                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.474 5.425l2.101 2.1a1.2 1.2 0 0 1 0 1.697l-9.05 9.05a1 1 0 0 1-.47.263l-3.13.783a.5.5 0 0 1-.61-.61l.783-3.13a1 1 0 0 1 .263-.47l9.05-9.05a1.2 1.2 0 0 1 1.697 0zm-8.474 9.899l8.485-8.485-1.414-1.414-8.485 8.485-.553 2.21 2.21-.553z" stroke="#fff" strokeWidth="1.5" fill="none"/></svg>
                                                </span>
                                                <div>Edit</div></div>
                                        </button>
                                        <button style={styles.deleteBtn} onClick={handleDeleteClick}>
                                                <div style={{display:'flex'}}><span style={{display:'inline-flex',alignItems:'center',marginRight:6}}>
                                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="7" width="14" height="12" rx="2" stroke="#fff" strokeWidth="2"/><path d="M9 11v4M15 11v4" stroke="#fff" strokeWidth="2" strokeLinecap="round"/><path d="M10 7V5a2 2 0 0 1 2-2v0a2 2 0 0 1 2 2v2" stroke="#fff" strokeWidth="2" strokeLinecap="round"/><path d="M3 7h18" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
                                                </span>
                                                <div>Delete</div></div>
                                        </button>
                </div>
            </div>
            {showConfirm && (
                <div style={styles.overlay} className="fadeInUp">
                    <div style={styles.confirmBox}>
                        <div style={{ marginBottom: 18, fontWeight: 700, fontSize: '1.15rem', textAlign: 'center' }}>
                            Are you sure you want to delete <span style={{color: theme.danger}}>{product.name}</span>?
                        </div>
                        <div style={{ display: 'flex', gap: 16 }}>
                            <button style={styles.confirmBtn} onClick={handleConfirmDelete}>Yes</button>
                            <button style={styles.cancelBtn} onClick={handleCancelDelete}>No</button>
                        </div>
                    </div>
                </div>
            )}
            {showView && (
                <div style={styles.viewOverlay} className="fadeInUp">
                  <div style={styles.viewGlass}>
                    <div style={styles.viewLeftImgWrap}>
                      <img
                        src={product.image && product.image.trim() !== "" ? product.image : "https://via.placeholder.com/200x200?text=No+Image"}
                        alt={product.name}
                        style={styles.viewImage}
                      />
                    </div>
                    <div style={styles.viewDetails}>
                      <h2 style={styles.viewName}>{product.name}</h2>
                      <div style={styles.viewCategory}>{product.category}</div>
                      <div style={styles.viewPrice}>${product.price}</div>
                      <div style={styles.viewDesc}>{product.description}</div>
                      <button style={styles.closeBtn} onClick={handleCloseView}>Close</button>
                    </div>
                  </div>
                </div>
            )}
            {showEdit && (
                                <div style={styles.overlay} className="fadeInUp">
                                    <div style={styles.editBoxWider}>
                                        <h2 style={{marginBottom: 18, color: theme.primary}}>Edit Product</h2>
                                        <form style={styles.editForm} onSubmit={handleEditSave}>
                                                <div style={styles.editRow}><label style={styles.editLabel}>Product Name</label><input name="name" value={editData.name} onChange={handleEditChange} style={styles.editInput} placeholder="Name" required /></div>
                                                <div style={styles.editRow}><label style={styles.editLabel}>Price</label><input name="price" value={editData.price} onChange={handleEditChange} style={styles.editInput} placeholder="Price" type="number" required /></div>
                                                <div style={styles.editRow}><label style={styles.editLabel}>Category</label><input name="category" value={editData.category} onChange={handleEditChange} style={styles.editInput} placeholder="Category" required /></div>
                                                <div style={styles.editRow}><label style={styles.editLabel}>Description</label><textarea name="description" value={editData.description} onChange={handleEditChange} style={{...styles.editInput, minHeight: 90, fontSize: '1.13rem'}} placeholder="Description" required /></div>
                                            <div style={styles.editRow}><label style={styles.editLabel}>Image URL</label><input name="image" value={editData.image} onChange={handleEditChange} style={styles.editInput} placeholder="Image URL" required /></div>
                                                <div style={{display: 'flex', gap: 18, marginTop: 32, justifyContent: 'center'}}>
                                                        <button style={styles.confirmBtn} type="submit">Save</button>
                                                        <button style={styles.cancelBtn} type="button" onClick={handleEditCancel}>Cancel</button>
                                                </div>
                                        </form>
                                    </div>
                                </div>
            )}
        </div>
    );
}

const styles = {
    card: {
        display: "flex",
        flexDirection: "column",
        background: theme.card,
        borderRadius: 22,
        boxShadow: theme.shadow,
        width: 270,
        margin: 12,
        overflow: "hidden",
        transition: "transform 0.18s, box-shadow 0.18s",
        animation: "popIn 0.7s cubic-bezier(.4,0,.2,1)",
        cursor: "pointer",
        position: "relative",
    },
    glassOverlay: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(46,125,50,0.10)",
        backdropFilter: "blur(6px)",
        zIndex: 0,
        pointerEvents: "none",
        borderRadius: 22,
    },
    imageSection: {
    background: theme.muted,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 170,
    borderBottom: `2px solid ${theme.accent}`,
    minHeight: 170,
    maxHeight: 170,
    zIndex: 1,
    width: "100%",
    overflow: "hidden",
    padding: 0,
    },
    image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: 0,
    background: "#fff",
    margin: 0,
    display: "block",
    },
    infoSection: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        padding: 18,
        gap: 8,
        overflow: "visible",
        zIndex: 1,
        paddingBottom: 24,
    },
    category: {
        color: theme.secondary,
        fontWeight: 600,
        fontSize: "1rem",
        marginBottom: 2,
        textTransform: "capitalize",
    },
    name: {
        color: theme.primary,
        fontWeight: 700,
        fontSize: "1.25rem",
        marginBottom: 4,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        width: "100%",
    },
    description: {
        color: theme.text,
        fontSize: "0.98rem",
        marginBottom: 12,
        minHeight: 40,
        maxHeight: "none",
        overflow: "visible",
        textOverflow: "ellipsis",
        width: "100%",
    },
    more: {
        color: theme.primary,
        fontWeight: 700,
        cursor: "pointer",
        marginLeft: 4,
        fontSize: "0.98rem",
        textDecoration: "underline",
    },
    price: {
        color: theme.primary,
        fontWeight: 700,
        fontSize: "1.1rem",
        margin: "8px 0",
    },
    actions: {
        display: "flex",
        gap: 12,
        marginTop: 10,
        width: "100%",
        justifyContent: "center",
        zIndex: 2,
    },
    editBtn: {
        background: 'linear-gradient(90deg, #6bd38eff 0%,  #55b174ff 100%)',
        color: '#fff',
        border: 'none',
        borderRadius: 16,
        padding: '10px 20px',
        fontWeight: 600,
        fontSize: '1.08rem',
        letterSpacing: 1,
        cursor: 'pointer',
        boxShadow: '0 2px 8px rgba(67,160,71,0.13)',
        transition: 'background 0.2s, color 0.2s, transform 0.2s',
        color:'#fff'
    },
    deleteBtn: {
        background: 'linear-gradient(90deg, #f15439ff 0%, #f02b2bff 100%)',
        color: 'whitesmoke',
        border: 'none',
        borderRadius: 16,
        padding: '10px 20px',
        fontWeight: 600,
        fontSize: '1.08rem',
        letterSpacing: 1,
        cursor: 'pointer',
        boxShadow: '0 2px 8px rgba(67,160,71,0.13)',
        transition: 'background 0.2s, color 0.2s, transform 0.2s',
        color:'#fff'
    },
    overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(38,82,53,0.45)",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        animation: "fadeInUp 0.4s cubic-bezier(.4,0,.2,1)",
        backdropFilter: "blur(8px)",
    },
    confirmBox: {
        background: "#fffbe9", // cream theme
        color: theme.text,
        borderRadius: 28,
        padding: "38px 54px",
        boxShadow: theme.shadow,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minWidth: 340,
        maxWidth: 420,
    },
    confirmBtn: {
        background: theme.danger,
        color: "#fff",
        border: "none",
        borderRadius: 14,
        padding: "7px 22px",
        fontWeight: 700,
        cursor: "pointer",
        fontSize: "1rem",
        transition: "background 0.2s",
    },
    cancelBtn: {
        background: theme.accent,
        color: theme.primary,
        border: "none",
        borderRadius: 14,
        padding: "7px 22px",
        fontWeight: 700,
        cursor: "pointer",
        fontSize: "1rem",
        transition: "background 0.2s",
    },
    viewOverlay: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(38,82,53,0.45)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        animation: "fadeInUp 0.5s cubic-bezier(.4,0,.2,1)",
        backdropFilter: "blur(8px)",
    },
    viewGlass: {
        display: "flex",
        flexDirection: "row",
        background: "#fffbe9", // cream theme
        boxShadow: theme.shadow,
        borderRadius: 28,
        backdropFilter: "blur(16px)",
        padding: "36px 48px",
        minWidth: 520,
        maxWidth: 700,
        minHeight: 320,
        alignItems: "center",
        gap: 36,
    },
    viewLeftImgWrap: {
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: 180,
        maxWidth: 220,
    },
    viewImage: {
        width: 180,
        height: 180,
        borderRadius: 20,
        objectFit: "cover",
        boxShadow: theme.shadow,
        background: "#fff",
    },
    viewDetails: {
        flex: 2,
        display: "flex",
        flexDirection: "column",
        gap: 16,
        minWidth: 220,
        color: theme.text,
    },
    viewName: {
        fontSize: "2rem",
        fontWeight: 800,
        color: theme.primary,
        margin: 0,
    },
    viewCategory: {
        color: theme.secondary,
        fontWeight: 600,
        fontSize: "1.1rem",
        marginBottom: 2,
        textTransform: "capitalize",
    },
    viewPrice: {
        color: theme.primary,
        fontWeight: 700,
        fontSize: "1.3rem",
        margin: "8px 0",
    },
    viewDesc: {
        color: theme.text,
        fontSize: "1.1rem",
        marginBottom: 6,
        whiteSpace: "pre-line",
    },
    closeBtn: {
        background: theme.secondary,
        color: "#fff",
        border: "none",
        borderRadius: 14,
        padding: "8px 28px",
        fontWeight: 700,
        cursor: "pointer",
        fontSize: "1.1rem",
        marginTop: 18,
        alignSelf: "flex-end",
        transition: "background 0.2s",
    },
    editBox: {
        background: 'rgba(255,255,255,0.97)',
        color: theme.text,
        borderRadius: 32,
        padding: '48px 64px',
        boxShadow: '0 8px 32px 0 rgba(34,139,34,0.18)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minWidth: 420,
        maxWidth: 600,
        width: 520,
        backdropFilter: 'blur(12px)',
        border: '1.5px solid #b7e4c7',
        animation: 'fadeInUp 0.6s cubic-bezier(.4,0,.2,1)',
    },
    editBoxWider: {
        background: 'rgba(255,255,255,0.97)',
        color: theme.text,
        borderRadius: 32,
        padding: '48px 0 48px 0',
        boxShadow: '0 8px 32px 0 rgba(34,139,34,0.18)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minWidth: 800,
        maxWidth: 1000,
        width: 900,
        backdropFilter: 'blur(12px)',
        border: '1.5px solid #b7e4c7',
        animation: 'fadeInUp 0.6s cubic-bezier(.4,0,.2,1)',
    },
    editForm: {
        width: '100%',
        padding: '0 64px',
        display: 'flex',
        flexDirection: 'column',
        gap: 18,
    },
    editRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 24,
        marginBottom: 0,
        width: '100%',
    },
    editLabel: {
        color: theme.secondary,
        fontWeight: 700,
        fontSize: '1.08rem',
        minWidth: 160,
        marginBottom: 0,
        letterSpacing: 0.5,
        marginTop: 0,
        textAlign: 'right',
        flexShrink: 0,
    },
    editInput: {
        background: '#f5fef7',
        border: '1.5px solid #b7e4c7',
        borderRadius: 16,
        padding: '14px 18px',
        fontSize: '1.13rem',
        color: theme.text,
        fontWeight: 600,
        outline: 'none',
        transition: 'border 0.2s, box-shadow 0.2s',
        boxShadow: '0 1.5px 8px 0 rgba(67,160,71,0.09)',
        width: '100%',
        marginLeft: 0,
    },
};