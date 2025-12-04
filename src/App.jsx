import { useState, useEffect } from 'react';

// Default products - these will be overridden by saved products
const DEFAULT_PRODUCTS = [
  {
    id: 1,
    name: "Back to School Essentials",
    description: "Everything they need to crush the new year. Notebooks, pens, folders, calculator & more.",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop&q=80",
    tag: "BESTSELLER",
    category: "kids"
  },
  {
    id: 2,
    name: "Ultimate Christmas Bundle",
    description: "Festive magic delivered. Decorations, lights, stockings, and holiday surprises.",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=800&auto=format&fit=crop&q=80",
    tag: "SEASONAL",
    category: "holiday"
  },
  {
    id: 3,
    name: "Kids Creative Pack",
    description: "Unleash imagination. Art supplies, craft materials, coloring books & creative tools.",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=800&auto=format&fit=crop&q=80",
    tag: "POPULAR",
    category: "kids"
  },
  {
    id: 4,
    name: "Home Office Starter",
    description: "Work from anywhere. Desk organizers, tech accessories, and productivity essentials.",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=800&auto=format&fit=crop&q=80",
    tag: "NEW",
    category: "office"
  },
  {
    id: 5,
    name: "Birthday Party Pack",
    description: "Instant celebration. Decorations, tableware, balloons, and party favors for 12.",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&auto=format&fit=crop&q=80",
    tag: "FUN",
    category: "party"
  },
  {
    id: 6,
    name: "Premium Gift Box",
    description: "Luxury curated. Hand-picked premium items beautifully packaged for gifting.",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&auto=format&fit=crop&q=80",
    tag: "LUXURY",
    category: "gift"
  }
];

// Theme configurations
const THEMES = {
  midnight: {
    name: "Midnight",
    bg: "#000000",
    bgSecondary: "rgba(255,255,255,0.03)",
    text: "#ffffff",
    textMuted: "rgba(255,255,255,0.5)",
    accent1: "#7c3aed",
    accent2: "#db2777",
    gradient: "linear-gradient(135deg, #7c3aed 0%, #db2777 100%)",
    glow: "rgba(124, 58, 237, 0.3)",
    border: "rgba(255,255,255,0.1)"
  },
  ocean: {
    name: "Ocean",
    bg: "#0a1628",
    bgSecondary: "rgba(255,255,255,0.03)",
    text: "#ffffff",
    textMuted: "rgba(255,255,255,0.5)",
    accent1: "#0ea5e9",
    accent2: "#06b6d4",
    gradient: "linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)",
    glow: "rgba(14, 165, 233, 0.3)",
    border: "rgba(255,255,255,0.1)"
  },
  sunset: {
    name: "Sunset",
    bg: "#1a0a0a",
    bgSecondary: "rgba(255,255,255,0.03)",
    text: "#ffffff",
    textMuted: "rgba(255,255,255,0.5)",
    accent1: "#f97316",
    accent2: "#ef4444",
    gradient: "linear-gradient(135deg, #f97316 0%, #ef4444 100%)",
    glow: "rgba(249, 115, 22, 0.3)",
    border: "rgba(255,255,255,0.1)"
  },
  forest: {
    name: "Forest",
    bg: "#0a1410",
    bgSecondary: "rgba(255,255,255,0.03)",
    text: "#ffffff",
    textMuted: "rgba(255,255,255,0.5)",
    accent1: "#10b981",
    accent2: "#14b8a6",
    gradient: "linear-gradient(135deg, #10b981 0%, #14b8a6 100%)",
    glow: "rgba(16, 185, 129, 0.3)",
    border: "rgba(255,255,255,0.1)"
  },
  royal: {
    name: "Royal",
    bg: "#0f0a1a",
    bgSecondary: "rgba(255,255,255,0.03)",
    text: "#ffffff",
    textMuted: "rgba(255,255,255,0.5)",
    accent1: "#8b5cf6",
    accent2: "#a855f7",
    gradient: "linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)",
    glow: "rgba(139, 92, 246, 0.3)",
    border: "rgba(255,255,255,0.1)"
  },
  light: {
    name: "Light",
    bg: "#f8fafc",
    bgSecondary: "rgba(0,0,0,0.02)",
    text: "#0f172a",
    textMuted: "rgba(15,23,42,0.6)",
    accent1: "#7c3aed",
    accent2: "#db2777",
    gradient: "linear-gradient(135deg, #7c3aed 0%, #db2777 100%)",
    glow: "rgba(124, 58, 237, 0.2)",
    border: "rgba(0,0,0,0.08)"
  }
};

// Admin password - CHANGE THIS!
const ADMIN_PASSWORD = "ark2024";

export default function ArkGlobalSupply() {
  const [products, setProducts] = useState(DEFAULT_PRODUCTS);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [notification, setNotification] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('midnight');
  const [showThemePicker, setShowThemePicker] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [adminAuth, setAdminAuth] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: '', description: '', price: '', image: '', tag: '', category: ''
  });

  const theme = THEMES[currentTheme];

  // Load saved data on mount
  useEffect(() => {
    setIsLoaded(true);
    const savedTheme = localStorage.getItem('ark-theme');
    const savedProducts = localStorage.getItem('ark-products');
    if (savedTheme && THEMES[savedTheme]) setCurrentTheme(savedTheme);
    if (savedProducts) {
      try {
        setProducts(JSON.parse(savedProducts));
      } catch (e) {}
    }
  }, []);

  // Save theme when changed
  useEffect(() => {
    localStorage.setItem('ark-theme', currentTheme);
  }, [currentTheme]);

  // Save products when changed
  useEffect(() => {
    localStorage.setItem('ark-products', JSON.stringify(products));
  }, [products]);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setNotification(`${product.name} added to cart`);
    setTimeout(() => setNotification(null), 2000);
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === productId) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const handleAdminLogin = () => {
    if (adminPassword === ADMIN_PASSWORD) {
      setAdminAuth(true);
      setAdminPassword('');
    } else {
      alert('Incorrect password');
    }
  };

  const addProduct = () => {
    if (!newProduct.name || !newProduct.price) {
      alert('Please fill in name and price');
      return;
    }
    const product = {
      ...newProduct,
      id: Date.now(),
      price: parseFloat(newProduct.price)
    };
    setProducts(prev => [...prev, product]);
    setNewProduct({ name: '', description: '', price: '', image: '', tag: '', category: '' });
    setNotification('Product added!');
    setTimeout(() => setNotification(null), 2000);
  };

  const deleteProduct = (id) => {
    if (confirm('Delete this product?')) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  const updateProduct = () => {
    if (!editingProduct) return;
    setProducts(prev => prev.map(p => 
      p.id === editingProduct.id ? { ...editingProduct, price: parseFloat(editingProduct.price) } : p
    ));
    setEditingProduct(null);
    setNotification('Product updated!');
    setTimeout(() => setNotification(null), 2000);
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const categories = ['all', ...new Set(products.map(p => p.category).filter(Boolean))];

  const redirectToCheckout = async () => {
    alert(`Ready for Stripe!\n\nTotal: $${cartTotal.toFixed(2)}\nItems: ${cartCount}\n\nTo enable payments, set up Stripe integration.`);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: theme.bg,
      color: theme.text,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      position: 'relative',
      overflow: 'hidden',
      transition: 'background 0.5s ease, color 0.5s ease'
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
      
      {/* Animated background */}
      <div style={{
        position: 'fixed',
        inset: 0,
        background: `
          radial-gradient(ellipse at 20% 20%, ${theme.accent1}22 0%, transparent 50%),
          radial-gradient(ellipse at 80% 80%, ${theme.accent2}18 0%, transparent 50%),
          radial-gradient(ellipse at 50% 50%, ${theme.accent1}08 0%, transparent 70%)
        `,
        pointerEvents: 'none',
        zIndex: 0,
        transition: 'all 0.5s ease'
      }} />

      {/* Floating particles */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
        {[...Array(20)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: Math.random() * 4 + 2,
            height: Math.random() * 4 + 2,
            background: theme.accent1,
            borderRadius: '50%',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: 0.3,
            animation: `float ${10 + Math.random() * 20}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 5}s`
          }} />
        ))}
      </div>

      {/* Notification */}
      {notification && (
        <div style={{
          position: 'fixed',
          top: 100,
          right: 24,
          background: theme.gradient,
          color: '#fff',
          padding: '16px 24px',
          borderRadius: 12,
          fontSize: 14,
          fontWeight: 600,
          zIndex: 1000,
          animation: 'slideIn 0.3s ease, pulse 2s ease infinite',
          boxShadow: `0 20px 40px ${theme.glow}`
        }}>
          ✓ {notification}
        </div>
      )}

      {/* Header */}
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '20px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: `${theme.bg}cc`,
        backdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${theme.border}`,
        transition: 'all 0.3s ease'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 40,
            height: 40,
            background: theme.gradient,
            borderRadius: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 20,
            fontWeight: 800,
            color: '#fff',
            animation: 'glow 3s ease-in-out infinite'
          }}>A</div>
          <span style={{
            fontSize: 20,
            fontWeight: 700,
            letterSpacing: '-0.02em',
            fontFamily: "'Space Grotesk', sans-serif"
          }}>ARK GLOBAL SUPPLY</span>
        </div>

        <nav style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          <a href="#products" style={{ color: theme.textMuted, textDecoration: 'none', fontSize: 14, fontWeight: 500, transition: 'color 0.2s' }}>Shop</a>
          <a href="#about" style={{ color: theme.textMuted, textDecoration: 'none', fontSize: 14, fontWeight: 500 }}>About</a>
          <a href="#contact" style={{ color: theme.textMuted, textDecoration: 'none', fontSize: 14, fontWeight: 500 }}>Contact</a>
          
          {/* Theme button */}
          <button
            onClick={() => setShowThemePicker(!showThemePicker)}
            style={{
              background: theme.bgSecondary,
              border: `1px solid ${theme.border}`,
              borderRadius: 10,
              padding: '10px 14px',
              color: theme.text,
              cursor: 'pointer',
              fontSize: 16,
              transition: 'all 0.2s'
            }}
            title="Change Theme"
          >
            🎨
          </button>

          {/* Admin button */}
          <button
            onClick={() => setShowAdmin(true)}
            style={{
              background: theme.bgSecondary,
              border: `1px solid ${theme.border}`,
              borderRadius: 10,
              padding: '10px 14px',
              color: theme.text,
              cursor: 'pointer',
              fontSize: 16,
              transition: 'all 0.2s'
            }}
            title="Admin Panel"
          >
            ⚙️
          </button>
          
          {/* Cart button */}
          <button 
            onClick={() => setIsCartOpen(true)}
            style={{
              position: 'relative',
              background: theme.bgSecondary,
              border: `1px solid ${theme.border}`,
              borderRadius: 12,
              padding: '12px 20px',
              color: theme.text,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontSize: 14,
              fontWeight: 600,
              transition: 'all 0.2s'
            }}
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M6 6h15l-1.5 9h-12L6 6zm0 0L5 3H2m4 3l1.5 9M9 20a1 1 0 100-2 1 1 0 000 2zm9 0a1 1 0 100-2 1 1 0 000 2z" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Cart
            {cartCount > 0 && (
              <span style={{
                position: 'absolute',
                top: -8,
                right: -8,
                background: theme.gradient,
                color: '#fff',
                fontSize: 12,
                fontWeight: 700,
                width: 24,
                height: 24,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                animation: 'bounce 0.3s ease'
              }}>{cartCount}</span>
            )}
          </button>
        </nav>
      </header>

      {/* Theme Picker Dropdown */}
      {showThemePicker && (
        <div style={{
          position: 'fixed',
          top: 80,
          right: 200,
          background: theme.bg,
          border: `1px solid ${theme.border}`,
          borderRadius: 16,
          padding: 16,
          zIndex: 150,
          boxShadow: `0 20px 40px rgba(0,0,0,0.3)`,
          animation: 'fadeIn 0.2s ease'
        }}>
          <div style={{ fontSize: 12, color: theme.textMuted, marginBottom: 12, fontWeight: 600 }}>SELECT THEME</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
            {Object.entries(THEMES).map(([key, t]) => (
              <button
                key={key}
                onClick={() => { setCurrentTheme(key); setShowThemePicker(false); }}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 12,
                  border: currentTheme === key ? `2px solid ${t.accent1}` : `1px solid ${theme.border}`,
                  background: t.bg,
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '50%',
                  background: t.gradient
                }} />
                <span style={{
                  position: 'absolute',
                  bottom: 4,
                  left: 0,
                  right: 0,
                  fontSize: 8,
                  color: '#fff',
                  fontWeight: 600
                }}>{t.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Admin Panel Modal */}
      {showAdmin && (
        <>
          <div onClick={() => { setShowAdmin(false); setAdminAuth(false); }} style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 200
          }} />
          <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: theme.bg,
            border: `1px solid ${theme.border}`,
            borderRadius: 24,
            padding: 32,
            zIndex: 201,
            width: '90%',
            maxWidth: 800,
            maxHeight: '80vh',
            overflow: 'auto',
            animation: 'scaleIn 0.3s ease'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h2 style={{ margin: 0, fontSize: 24, fontWeight: 700 }}>⚙️ Admin Panel</h2>
              <button onClick={() => { setShowAdmin(false); setAdminAuth(false); }} style={{
                background: 'transparent', border: 'none', color: theme.text, fontSize: 24, cursor: 'pointer'
              }}>×</button>
            </div>

            {!adminAuth ? (
              <div style={{ textAlign: 'center', padding: 40 }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>🔐</div>
                <p style={{ color: theme.textMuted, marginBottom: 24 }}>Enter admin password</p>
                <input
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAdminLogin()}
                  placeholder="Password"
                  style={{
                    width: '100%',
                    maxWidth: 300,
                    padding: 16,
                    borderRadius: 12,
                    border: `1px solid ${theme.border}`,
                    background: theme.bgSecondary,
                    color: theme.text,
                    fontSize: 16,
                    marginBottom: 16,
                    outline: 'none'
                  }}
                />
                <br />
                <button onClick={handleAdminLogin} style={{
                  background: theme.gradient,
                  border: 'none',
                  borderRadius: 12,
                  padding: '14px 32px',
                  color: '#fff',
                  fontSize: 16,
                  fontWeight: 600,
                  cursor: 'pointer'
                }}>
                  Login
                </button>
                <p style={{ fontSize: 12, color: theme.textMuted, marginTop: 16 }}>Default: ark2024</p>
              </div>
            ) : (
              <div>
                {/* Add new product */}
                <div style={{
                  background: theme.bgSecondary,
                  border: `1px solid ${theme.border}`,
                  borderRadius: 16,
                  padding: 24,
                  marginBottom: 24
                }}>
                  <h3 style={{ margin: '0 0 16px', fontSize: 18 }}>➕ Add New Product</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <input
                      placeholder="Product Name *"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      style={{
                        padding: 12,
                        borderRadius: 8,
                        border: `1px solid ${theme.border}`,
                        background: theme.bg,
                        color: theme.text,
                        outline: 'none'
                      }}
                    />
                    <input
                      placeholder="Price *"
                      type="number"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                      style={{
                        padding: 12,
                        borderRadius: 8,
                        border: `1px solid ${theme.border}`,
                        background: theme.bg,
                        color: theme.text,
                        outline: 'none'
                      }}
                    />
                    <input
                      placeholder="Image URL"
                      value={newProduct.image}
                      onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                      style={{
                        padding: 12,
                        borderRadius: 8,
                        border: `1px solid ${theme.border}`,
                        background: theme.bg,
                        color: theme.text,
                        outline: 'none'
                      }}
                    />
                    <input
                      placeholder="Category (e.g., kids, holiday)"
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                      style={{
                        padding: 12,
                        borderRadius: 8,
                        border: `1px solid ${theme.border}`,
                        background: theme.bg,
                        color: theme.text,
                        outline: 'none'
                      }}
                    />
                    <input
                      placeholder="Tag (e.g., NEW, BESTSELLER)"
                      value={newProduct.tag}
                      onChange={(e) => setNewProduct({ ...newProduct, tag: e.target.value })}
                      style={{
                        padding: 12,
                        borderRadius: 8,
                        border: `1px solid ${theme.border}`,
                        background: theme.bg,
                        color: theme.text,
                        outline: 'none'
                      }}
                    />
                    <button onClick={addProduct} style={{
                      background: theme.gradient,
                      border: 'none',
                      borderRadius: 8,
                      padding: 12,
                      color: '#fff',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}>
                      Add Product
                    </button>
                  </div>
                  <textarea
                    placeholder="Description"
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    style={{
                      width: '100%',
                      marginTop: 12,
                      padding: 12,
                      borderRadius: 8,
                      border: `1px solid ${theme.border}`,
                      background: theme.bg,
                      color: theme.text,
                      outline: 'none',
                      resize: 'none',
                      height: 80,
                      fontFamily: 'inherit',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                {/* Product list */}
                <h3 style={{ margin: '0 0 16px', fontSize: 18 }}>📦 Manage Products ({products.length})</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {products.map(product => (
                    <div key={product.id} style={{
                      display: 'flex',
                      gap: 16,
                      background: theme.bgSecondary,
                      border: `1px solid ${theme.border}`,
                      borderRadius: 12,
                      padding: 16,
                      alignItems: 'center'
                    }}>
                      {product.image && (
                        <img src={product.image} alt="" style={{
                          width: 60, height: 60, objectFit: 'cover', borderRadius: 8
                        }} />
                      )}
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600 }}>{product.name}</div>
                        <div style={{ fontSize: 14, color: theme.textMuted }}>${product.price} • {product.category || 'No category'}</div>
                      </div>
                      <button
                        onClick={() => setEditingProduct({ ...product })}
                        style={{
                          background: theme.bgSecondary,
                          border: `1px solid ${theme.border}`,
                          borderRadius: 8,
                          padding: '8px 16px',
                          color: theme.text,
                          cursor: 'pointer',
                          fontSize: 14
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteProduct(product.id)}
                        style={{
                          background: '#ef4444',
                          border: 'none',
                          borderRadius: 8,
                          padding: '8px 16px',
                          color: '#fff',
                          cursor: 'pointer',
                          fontSize: 14
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {/* Edit Product Modal */}
      {editingProduct && (
        <>
          <div onClick={() => setEditingProduct(null)} style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 250
          }} />
          <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: theme.bg,
            border: `1px solid ${theme.border}`,
            borderRadius: 24,
            padding: 32,
            zIndex: 251,
            width: '90%',
            maxWidth: 500,
            animation: 'scaleIn 0.3s ease'
          }}>
            <h3 style={{ margin: '0 0 24px' }}>✏️ Edit Product</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <input
                placeholder="Name"
                value={editingProduct.name}
                onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                style={{
                  padding: 12,
                  borderRadius: 8,
                  border: `1px solid ${theme.border}`,
                  background: theme.bgSecondary,
                  color: theme.text,
                  outline: 'none'
                }}
              />
              <input
                placeholder="Price"
                type="number"
                value={editingProduct.price}
                onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                style={{
                  padding: 12,
                  borderRadius: 8,
                  border: `1px solid ${theme.border}`,
                  background: theme.bgSecondary,
                  color: theme.text,
                  outline: 'none'
                }}
              />
              <input
                placeholder="Image URL"
                value={editingProduct.image}
                onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                style={{
                  padding: 12,
                  borderRadius: 8,
                  border: `1px solid ${theme.border}`,
                  background: theme.bgSecondary,
                  color: theme.text,
                  outline: 'none'
                }}
              />
              <input
                placeholder="Category"
                value={editingProduct.category}
                onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                style={{
                  padding: 12,
                  borderRadius: 8,
                  border: `1px solid ${theme.border}`,
                  background: theme.bgSecondary,
                  color: theme.text,
                  outline: 'none'
                }}
              />
              <input
                placeholder="Tag"
                value={editingProduct.tag}
                onChange={(e) => setEditingProduct({ ...editingProduct, tag: e.target.value })}
                style={{
                  padding: 12,
                  borderRadius: 8,
                  border: `1px solid ${theme.border}`,
                  background: theme.bgSecondary,
                  color: theme.text,
                  outline: 'none'
                }}
              />
              <textarea
                placeholder="Description"
                value={editingProduct.description}
                onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                style={{
                  padding: 12,
                  borderRadius: 8,
                  border: `1px solid ${theme.border}`,
                  background: theme.bgSecondary,
                  color: theme.text,
                  outline: 'none',
                  resize: 'none',
                  height: 80,
                  fontFamily: 'inherit'
                }}
              />
              <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                <button onClick={() => setEditingProduct(null)} style={{
                  flex: 1,
                  background: theme.bgSecondary,
                  border: `1px solid ${theme.border}`,
                  borderRadius: 8,
                  padding: 14,
                  color: theme.text,
                  cursor: 'pointer'
                }}>
                  Cancel
                </button>
                <button onClick={updateProduct} style={{
                  flex: 1,
                  background: theme.gradient,
                  border: 'none',
                  borderRadius: 8,
                  padding: 14,
                  color: '#fff',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Hero Section */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '120px 40px 80px',
        position: 'relative',
        zIndex: 2
      }}>
        <div style={{
          maxWidth: 1400,
          width: '100%',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 80,
          alignItems: 'center'
        }}>
          <div style={{
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)'
          }}>
            <div style={{
              display: 'inline-block',
              background: `${theme.accent1}33`,
              border: `1px solid ${theme.accent1}55`,
              borderRadius: 100,
              padding: '8px 16px',
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: '0.1em',
              marginBottom: 24,
              color: theme.accent1
            }}>
              ✦ PREMIUM BUNDLES DELIVERED
            </div>
            
            <h1 style={{
              fontSize: 'clamp(48px, 8vw, 80px)',
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: '-0.03em',
              margin: 0,
              fontFamily: "'Space Grotesk', sans-serif"
            }}>
              <span style={{ display: 'block' }}>Everything</span>
              <span style={{ display: 'block' }}>You Need.</span>
              <span style={{
                display: 'block',
                background: theme.gradient,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'shimmer 3s ease-in-out infinite'
              }}>One Box.</span>
            </h1>
            
            <p style={{
              fontSize: 18,
              color: theme.textMuted,
              lineHeight: 1.7,
              margin: '32px 0',
              maxWidth: 480
            }}>
              Curated bundles for every moment. From back-to-school essentials to holiday magic — we pack it all so you don't have to think twice.
            </p>

            <div style={{ display: 'flex', gap: 16 }}>
              <a href="#products" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: theme.gradient,
                color: '#fff',
                padding: '18px 32px',
                borderRadius: 14,
                fontSize: 16,
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'all 0.3s',
                boxShadow: `0 20px 40px ${theme.glow}`,
                animation: 'glow 3s ease-in-out infinite'
              }}>
                Shop Now
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M5 12h14m-6-6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a href="#about" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: theme.bgSecondary,
                border: `1px solid ${theme.border}`,
                color: theme.text,
                padding: '18px 32px',
                borderRadius: 14,
                fontSize: 16,
                fontWeight: 500,
                textDecoration: 'none',
                transition: 'all 0.3s'
              }}>
                Learn More
              </a>
            </div>

            <div style={{
              display: 'flex',
              gap: 48,
              marginTop: 64,
              paddingTop: 32,
              borderTop: `1px solid ${theme.border}`
            }}>
              {[
                { value: '10K+', label: 'Happy Customers' },
                { value: '500+', label: 'Products Bundled' },
                { value: '4.9', label: 'Average Rating' }
              ].map((stat, i) => (
                <div key={i} style={{
                  opacity: isLoaded ? 1 : 0,
                  transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
                  transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${0.5 + i * 0.1}s`
                }}>
                  <div style={{ fontSize: 32, fontWeight: 800, fontFamily: "'Space Grotesk', sans-serif" }}>{stat.value}</div>
                  <div style={{ fontSize: 14, color: theme.textMuted, marginTop: 4 }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{
            position: 'relative',
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateY(0) rotate(0deg)' : 'translateY(60px) rotate(5deg)',
            transition: 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.2s'
          }}>
            <div style={{
              position: 'absolute',
              inset: -40,
              background: theme.gradient,
              opacity: 0.4,
              borderRadius: 40,
              filter: 'blur(60px)',
              zIndex: -1,
              animation: 'pulse 4s ease-in-out infinite'
            }} />
            <div style={{
              background: `linear-gradient(135deg, ${theme.border} 0%, transparent 100%)`,
              border: `1px solid ${theme.border}`,
              borderRadius: 32,
              padding: 32,
              backdropFilter: 'blur(20px)',
              animation: 'float 6s ease-in-out infinite'
            }}>
              <img 
                src="https://images.unsplash.com/photo-1607082349566-187342175e2f?w=800&auto=format&fit=crop&q=80" 
                alt="Premium Bundle"
                style={{
                  width: '100%',
                  height: 400,
                  objectFit: 'cover',
                  borderRadius: 20
                }}
              />
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 24
              }}>
                <div>
                  <div style={{ fontSize: 12, color: theme.textMuted, marginBottom: 4 }}>FEATURED</div>
                  <div style={{ fontSize: 20, fontWeight: 700 }}>Holiday Collection</div>
                </div>
                <div style={{
                  background: theme.gradient,
                  padding: '12px 20px',
                  borderRadius: 10,
                  fontSize: 14,
                  fontWeight: 700,
                  color: '#fff'
                }}>Shop Now</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" style={{
        padding: '120px 40px',
        position: 'relative',
        zIndex: 2
      }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <h2 style={{
              fontSize: 'clamp(36px, 5vw, 56px)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              margin: 0,
              fontFamily: "'Space Grotesk', sans-serif"
            }}>Our Bundles</h2>
            <p style={{
              fontSize: 18,
              color: theme.textMuted,
              marginTop: 16
            }}>Curated with care. Delivered with speed.</p>
          </div>

          {/* Category filters */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 12,
            marginBottom: 48,
            flexWrap: 'wrap'
          }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '12px 24px',
                  borderRadius: 100,
                  border: 'none',
                  background: activeCategory === cat ? theme.gradient : theme.bgSecondary,
                  color: activeCategory === cat ? '#fff' : theme.text,
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                  transition: 'all 0.3s'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Products grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
            gap: 32
          }}>
            {filteredProducts.map((product, index) => (
              <div
                key={product.id}
                style={{
                  background: `linear-gradient(135deg, ${theme.bgSecondary} 0%, transparent 100%)`,
                  border: `1px solid ${theme.border}`,
                  borderRadius: 24,
                  overflow: 'hidden',
                  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  cursor: 'pointer',
                  animation: `fadeInUp 0.6s ease ${index * 0.1}s both`
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                  e.currentTarget.style.boxShadow = `0 40px 80px rgba(0,0,0,0.4)`;
                  e.currentTarget.style.borderColor = theme.accent1;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = theme.border;
                }}
              >
                <div style={{ position: 'relative', overflow: 'hidden' }}>
                  <img 
                    src={product.image || 'https://images.unsplash.com/photo-1607082349566-187342175e2f?w=800'} 
                    alt={product.name}
                    style={{
                      width: '100%',
                      height: 280,
                      objectFit: 'cover',
                      transition: 'transform 0.6s'
                    }}
                  />
                  {product.tag && (
                    <div style={{
                      position: 'absolute',
                      top: 16,
                      left: 16,
                      background: product.tag === 'BESTSELLER' ? theme.gradient :
                                 product.tag === 'NEW' ? 'linear-gradient(135deg, #059669 0%, #10b981 100%)' :
                                 product.tag === 'LUXURY' ? 'linear-gradient(135deg, #d97706 0%, #f59e0b 100%)' :
                                 `${theme.bg}99`,
                      padding: '8px 14px',
                      borderRadius: 8,
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: '0.05em',
                      backdropFilter: 'blur(10px)',
                      color: '#fff'
                    }}>{product.tag}</div>
                  )}
                </div>
                
                <div style={{ padding: 28 }}>
                  <h3 style={{
                    fontSize: 22,
                    fontWeight: 700,
                    margin: 0,
                    letterSpacing: '-0.01em'
                  }}>{product.name}</h3>
                  <p style={{
                    fontSize: 14,
                    color: theme.textMuted,
                    margin: '12px 0 20px',
                    lineHeight: 1.6
                  }}>{product.description}</p>
                  
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div style={{
                      fontSize: 28,
                      fontWeight: 800,
                      fontFamily: "'Space Grotesk', sans-serif"
                    }}>${product.price}</div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        background: theme.gradient,
                        border: 'none',
                        borderRadius: 12,
                        padding: '14px 24px',
                        color: '#fff',
                        fontSize: 14,
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.3s',
                        boxShadow: `0 10px 30px ${theme.glow}`
                      }}
                    >
                      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path d="M12 5v14m-7-7h14" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" style={{
        padding: '120px 40px',
        position: 'relative',
        zIndex: 2
      }}>
        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 80,
          alignItems: 'center'
        }}>
          <div>
            <div style={{
              display: 'inline-block',
              background: `${theme.accent1}33`,
              border: `1px solid ${theme.accent1}55`,
              borderRadius: 100,
              padding: '8px 16px',
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: '0.1em',
              marginBottom: 24,
              color: theme.accent1
            }}>ABOUT US</div>
            <h2 style={{
              fontSize: 'clamp(32px, 4vw, 48px)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              margin: '0 0 24px',
              fontFamily: "'Space Grotesk', sans-serif"
            }}>We Bundle.<br/>You Unbox Joy.</h2>
            <p style={{
              fontSize: 18,
              color: theme.textMuted,
              lineHeight: 1.8
            }}>
              Ark Global Supply was born from a simple idea: shopping for multiple items shouldn't feel like a chore. 
              We curate premium bundles for life's biggest moments — from your kid's first day of school to holiday celebrations that bring everyone together.
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 24,
              marginTop: 48
            }}>
              {[
                { icon: '📦', title: 'Fast Shipping', desc: '2-3 day delivery' },
                { icon: '✨', title: 'Premium Quality', desc: 'Hand-picked items' },
                { icon: '🔄', title: 'Easy Returns', desc: '30-day guarantee' },
                { icon: '💬', title: '24/7 Support', desc: 'Always here to help' }
              ].map((item, i) => (
                <div key={i} style={{
                  background: theme.bgSecondary,
                  border: `1px solid ${theme.border}`,
                  borderRadius: 16,
                  padding: 24,
                  transition: 'all 0.3s',
                  cursor: 'default'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = theme.accent1;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = theme.border;
                }}
                >
                  <div style={{ fontSize: 28, marginBottom: 12 }}>{item.icon}</div>
                  <div style={{ fontWeight: 700, marginBottom: 4 }}>{item.title}</div>
                  <div style={{ fontSize: 14, color: theme.textMuted }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ position: 'relative' }}>
            <div style={{
              position: 'absolute',
              inset: -20,
              background: theme.gradient,
              opacity: 0.3,
              borderRadius: 32,
              filter: 'blur(40px)',
              zIndex: -1,
              animation: 'pulse 4s ease-in-out infinite'
            }} />
            <img 
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop&q=80"
              alt="About Ark Global Supply"
              style={{
                width: '100%',
                height: 500,
                objectFit: 'cover',
                borderRadius: 24,
                border: `1px solid ${theme.border}`
              }}
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" style={{
        padding: '120px 40px',
        position: 'relative',
        zIndex: 2
      }}>
        <div style={{
          maxWidth: 600,
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: 'clamp(32px, 4vw, 48px)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            margin: '0 0 16px',
            fontFamily: "'Space Grotesk', sans-serif"
          }}>Get in Touch</h2>
          <p style={{
            fontSize: 18,
            color: theme.textMuted,
            marginBottom: 48
          }}>Questions? Ideas? We'd love to hear from you.</p>
          
          <div style={{
            background: theme.bgSecondary,
            border: `1px solid ${theme.border}`,
            borderRadius: 24,
            padding: 40
          }}>
            <input 
              type="email"
              placeholder="Your email"
              style={{
                width: '100%',
                background: theme.bg,
                border: `1px solid ${theme.border}`,
                borderRadius: 12,
                padding: 18,
                color: theme.text,
                fontSize: 16,
                marginBottom: 16,
                outline: 'none',
                boxSizing: 'border-box',
                transition: 'border-color 0.3s'
              }}
              onFocus={e => e.target.style.borderColor = theme.accent1}
              onBlur={e => e.target.style.borderColor = theme.border}
            />
            <textarea 
              placeholder="Your message"
              rows={4}
              style={{
                width: '100%',
                background: theme.bg,
                border: `1px solid ${theme.border}`,
                borderRadius: 12,
                padding: 18,
                color: theme.text,
                fontSize: 16,
                marginBottom: 16,
                outline: 'none',
                resize: 'none',
                fontFamily: 'inherit',
                boxSizing: 'border-box',
                transition: 'border-color 0.3s'
              }}
              onFocus={e => e.target.style.borderColor = theme.accent1}
              onBlur={e => e.target.style.borderColor = theme.border}
            />
            <button style={{
              width: '100%',
              background: theme.gradient,
              border: 'none',
              borderRadius: 12,
              padding: 18,
              color: '#fff',
              fontSize: 16,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.3s',
              boxShadow: `0 20px 40px ${theme.glow}`
            }}>
              Send Message
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '60px 40px',
        borderTop: `1px solid ${theme.border}`,
        position: 'relative',
        zIndex: 2
      }}>
        <div style={{
          maxWidth: 1400,
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 24
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 36,
              height: 36,
              background: theme.gradient,
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 16,
              fontWeight: 800,
              color: '#fff'
            }}>A</div>
            <span style={{ fontWeight: 600 }}>ARK GLOBAL SUPPLY</span>
          </div>
          <div style={{ color: theme.textMuted, fontSize: 14 }}>
            © 2024 Ark Global Supply. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: 24 }}>
            {['Twitter', 'Instagram', 'Facebook'].map(social => (
              <a key={social} href="#" style={{ color: theme.textMuted, fontSize: 14, textDecoration: 'none', transition: 'color 0.2s' }}>{social}</a>
            ))}
          </div>
        </div>
      </footer>

      {/* Shopping Cart Drawer */}
      {isCartOpen && (
        <>
          <div 
            onClick={() => setIsCartOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.7)',
              backdropFilter: 'blur(4px)',
              zIndex: 200
            }} 
          />
          <div style={{
            position: 'fixed',
            top: 0,
            right: 0,
            bottom: 0,
            width: '100%',
            maxWidth: 480,
            background: theme.bg,
            borderLeft: `1px solid ${theme.border}`,
            zIndex: 201,
            display: 'flex',
            flexDirection: 'column',
            animation: 'slideInRight 0.3s ease'
          }}>
            <div style={{
              padding: 24,
              borderBottom: `1px solid ${theme.border}`,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <h3 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>Your Cart ({cartCount})</h3>
              <button 
                onClick={() => setIsCartOpen(false)}
                style={{
                  background: theme.bgSecondary,
                  border: 'none',
                  borderRadius: 10,
                  width: 40,
                  height: 40,
                  color: theme.text,
                  cursor: 'pointer',
                  fontSize: 20
                }}
              >×</button>
            </div>

            <div style={{ flex: 1, overflow: 'auto', padding: 24 }}>
              {cart.length === 0 ? (
                <div style={{ textAlign: 'center', padding: 60, color: theme.textMuted }}>
                  <div style={{ fontSize: 48, marginBottom: 16 }}>🛒</div>
                  <p>Your cart is empty</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {cart.map(item => (
                    <div key={item.id} style={{
                      display: 'flex',
                      gap: 16,
                      background: theme.bgSecondary,
                      border: `1px solid ${theme.border}`,
                      borderRadius: 16,
                      padding: 16,
                      animation: 'fadeIn 0.3s ease'
                    }}>
                      <img 
                        src={item.image || 'https://images.unsplash.com/photo-1607082349566-187342175e2f?w=800'} 
                        alt={item.name}
                        style={{
                          width: 80,
                          height: 80,
                          objectFit: 'cover',
                          borderRadius: 12
                        }}
                      />
                      <div style={{ flex: 1 }}>
                        <h4 style={{ margin: '0 0 4px', fontSize: 15, fontWeight: 600 }}>{item.name}</h4>
                        <div style={{ color: theme.textMuted, fontSize: 14 }}>${item.price}</div>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 12,
                          marginTop: 12
                        }}>
                          <button 
                            onClick={() => updateQuantity(item.id, -1)}
                            style={{
                              width: 32,
                              height: 32,
                              borderRadius: 8,
                              border: `1px solid ${theme.border}`,
                              background: 'transparent',
                              color: theme.text,
                              cursor: 'pointer',
                              fontSize: 16
                            }}
                          >−</button>
                          <span style={{ fontWeight: 600 }}>{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, 1)}
                            style={{
                              width: 32,
                              height: 32,
                              borderRadius: 8,
                              border: `1px solid ${theme.border}`,
                              background: 'transparent',
                              color: theme.text,
                              cursor: 'pointer',
                              fontSize: 16
                            }}
                          >+</button>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            style={{
                              marginLeft: 'auto',
                              background: 'transparent',
                              border: 'none',
                              color: theme.textMuted,
                              cursor: 'pointer',
                              fontSize: 12
                            }}
                          >Remove</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div style={{
                padding: 24,
                borderTop: `1px solid ${theme.border}`,
                background: `${theme.bg}cc`
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: 8,
                  fontSize: 14,
                  color: theme.textMuted
                }}>
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: 8,
                  fontSize: 14,
                  color: theme.textMuted
                }}>
                  <span>Shipping</span>
                  <span>FREE</span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: 24,
                  fontSize: 20,
                  fontWeight: 700,
                  paddingTop: 16,
                  borderTop: `1px solid ${theme.border}`
                }}>
                  <span>Total</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <button
                  onClick={redirectToCheckout}
                  style={{
                    width: '100%',
                    background: theme.gradient,
                    border: 'none',
                    borderRadius: 14,
                    padding: 18,
                    color: '#fff',
                    fontSize: 16,
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: `0 20px 40px ${theme.glow}`,
                    transition: 'all 0.3s'
                  }}
                >
                  Checkout — ${cartTotal.toFixed(2)}
                </button>
                <p style={{
                  textAlign: 'center',
                  fontSize: 12,
                  color: theme.textMuted,
                  marginTop: 16
                }}>Secure checkout powered by Stripe</p>
              </div>
            )}
          </div>
        </>
      )}

      {/* CSS Animations */}
      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(100px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: translate(-50%, -50%) scale(0.9); }
          to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px ${theme.glow}; }
          50% { box-shadow: 0 0 40px ${theme.glow}, 0 0 60px ${theme.glow}; }
        }
        @keyframes shimmer {
          0%, 100% { filter: brightness(1); }
          50% { filter: brightness(1.2); }
        }
        @keyframes bounce {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        ::placeholder { color: ${theme.textMuted}; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: ${theme.bg}; }
        ::-webkit-scrollbar-thumb { background: ${theme.border}; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: ${theme.textMuted}; }
      `}</style>
    </div>
  );
}
