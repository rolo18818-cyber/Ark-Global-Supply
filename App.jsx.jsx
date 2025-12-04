import { useState, useEffect } from 'react';

// Product data - you can easily edit these!
const PRODUCTS = [
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

// Stripe integration helper
const redirectToCheckout = async (cart) => {
  // For demo, show what would be sent to Stripe
  const lineItems = cart.map(item => ({
    name: item.name,
    amount: Math.round(item.price * 100),
    quantity: item.quantity
  }));
  
  // In production, you'd call your backend here to create a Stripe session
  // For now, we'll simulate with a demo checkout
  alert(`Ready for Stripe integration!\n\nItems: ${cart.length}\nTotal: $${cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}\n\nTo enable real payments, add your Stripe keys (see instructions below the site).`);
};

export default function ArkGlobalSupply() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [notification, setNotification] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

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

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const filteredProducts = activeCategory === 'all' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  const categories = ['all', ...new Set(PRODUCTS.map(p => p.category))];

  return (
    <div style={{
      minHeight: '100vh',
      background: '#000',
      color: '#fff',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Google Fonts */}
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
      
      {/* Animated background */}
      <div style={{
        position: 'fixed',
        inset: 0,
        background: `
          radial-gradient(ellipse at 20% 20%, rgba(120, 0, 255, 0.15) 0%, transparent 50%),
          radial-gradient(ellipse at 80% 80%, rgba(255, 0, 100, 0.1) 0%, transparent 50%),
          radial-gradient(ellipse at 50% 50%, rgba(0, 200, 255, 0.05) 0%, transparent 70%)
        `,
        pointerEvents: 'none',
        zIndex: 0
      }} />

      {/* Noise texture overlay */}
      <div style={{
        position: 'fixed',
        inset: 0,
        opacity: 0.03,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        pointerEvents: 'none',
        zIndex: 1
      }} />

      {/* Notification toast */}
      {notification && (
        <div style={{
          position: 'fixed',
          top: 100,
          right: 24,
          background: 'linear-gradient(135deg, #7c3aed 0%, #db2777 100%)',
          color: '#fff',
          padding: '16px 24px',
          borderRadius: 12,
          fontSize: 14,
          fontWeight: 600,
          zIndex: 1000,
          animation: 'slideIn 0.3s ease',
          boxShadow: '0 20px 40px rgba(124, 58, 237, 0.3)'
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
        background: 'rgba(0,0,0,0.8)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.05)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12
        }}>
          <div style={{
            width: 40,
            height: 40,
            background: 'linear-gradient(135deg, #7c3aed 0%, #db2777 100%)',
            borderRadius: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 20,
            fontWeight: 800
          }}>A</div>
          <span style={{
            fontSize: 20,
            fontWeight: 700,
            letterSpacing: '-0.02em',
            fontFamily: "'Space Grotesk', sans-serif"
          }}>ARK GLOBAL SUPPLY</span>
        </div>

        <nav style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
          <a href="#products" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: 14, fontWeight: 500, transition: 'color 0.2s' }}>Shop</a>
          <a href="#about" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: 14, fontWeight: 500 }}>About</a>
          <a href="#contact" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: 14, fontWeight: 500 }}>Contact</a>
          
          <button 
            onClick={() => setIsCartOpen(true)}
            style={{
              position: 'relative',
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 12,
              padding: '12px 20px',
              color: '#fff',
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
                background: 'linear-gradient(135deg, #7c3aed 0%, #db2777 100%)',
                color: '#fff',
                fontSize: 12,
                fontWeight: 700,
                width: 24,
                height: 24,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>{cartCount}</span>
            )}
          </button>
        </nav>
      </header>

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
              background: 'rgba(124, 58, 237, 0.2)',
              border: '1px solid rgba(124, 58, 237, 0.3)',
              borderRadius: 100,
              padding: '8px 16px',
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: '0.1em',
              marginBottom: 24,
              color: '#a78bfa'
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
                background: 'linear-gradient(135deg, #7c3aed 0%, #db2777 50%, #f97316 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>One Box.</span>
            </h1>
            
            <p style={{
              fontSize: 18,
              color: 'rgba(255,255,255,0.6)',
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
                background: 'linear-gradient(135deg, #7c3aed 0%, #db2777 100%)',
                color: '#fff',
                padding: '18px 32px',
                borderRadius: 14,
                fontSize: 16,
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'all 0.3s',
                boxShadow: '0 20px 40px rgba(124, 58, 237, 0.3)'
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
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#fff',
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
              borderTop: '1px solid rgba(255,255,255,0.1)'
            }}>
              {[
                { value: '10K+', label: 'Happy Customers' },
                { value: '500+', label: 'Products Bundled' },
                { value: '4.9', label: 'Average Rating' }
              ].map((stat, i) => (
                <div key={i}>
                  <div style={{ fontSize: 32, fontWeight: 800, fontFamily: "'Space Grotesk', sans-serif" }}>{stat.value}</div>
                  <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>{stat.label}</div>
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
              background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.4) 0%, rgba(219, 39, 119, 0.4) 100%)',
              borderRadius: 40,
              filter: 'blur(60px)',
              zIndex: -1
            }} />
            <div style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 100%)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 32,
              padding: 32,
              backdropFilter: 'blur(20px)'
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
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>FEATURED</div>
                  <div style={{ fontSize: 20, fontWeight: 700 }}>Holiday Collection</div>
                </div>
                <div style={{
                  background: 'linear-gradient(135deg, #7c3aed 0%, #db2777 100%)',
                  padding: '12px 20px',
                  borderRadius: 10,
                  fontSize: 14,
                  fontWeight: 700
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
              color: 'rgba(255,255,255,0.5)',
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
                  background: activeCategory === cat 
                    ? 'linear-gradient(135deg, #7c3aed 0%, #db2777 100%)'
                    : 'rgba(255,255,255,0.05)',
                  color: '#fff',
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
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 24,
                  overflow: 'hidden',
                  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  cursor: 'pointer',
                  animation: `fadeInUp 0.6s ease ${index * 0.1}s both`
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 40px 80px rgba(0,0,0,0.4)';
                  e.currentTarget.style.borderColor = 'rgba(124, 58, 237, 0.3)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                }}
              >
                <div style={{ position: 'relative', overflow: 'hidden' }}>
                  <img 
                    src={product.image} 
                    alt={product.name}
                    style={{
                      width: '100%',
                      height: 280,
                      objectFit: 'cover',
                      transition: 'transform 0.6s'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: 16,
                    left: 16,
                    background: product.tag === 'BESTSELLER' ? 'linear-gradient(135deg, #7c3aed 0%, #db2777 100%)' :
                               product.tag === 'NEW' ? 'linear-gradient(135deg, #059669 0%, #10b981 100%)' :
                               product.tag === 'LUXURY' ? 'linear-gradient(135deg, #d97706 0%, #f59e0b 100%)' :
                               'rgba(0,0,0,0.6)',
                    padding: '8px 14px',
                    borderRadius: 8,
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '0.05em',
                    backdropFilter: 'blur(10px)'
                  }}>{product.tag}</div>
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
                    color: 'rgba(255,255,255,0.5)',
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
                        background: 'linear-gradient(135deg, #7c3aed 0%, #db2777 100%)',
                        border: 'none',
                        borderRadius: 12,
                        padding: '14px 24px',
                        color: '#fff',
                        fontSize: 14,
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.3s',
                        boxShadow: '0 10px 30px rgba(124, 58, 237, 0.3)'
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
              background: 'rgba(124, 58, 237, 0.2)',
              border: '1px solid rgba(124, 58, 237, 0.3)',
              borderRadius: 100,
              padding: '8px 16px',
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: '0.1em',
              marginBottom: 24,
              color: '#a78bfa'
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
              color: 'rgba(255,255,255,0.6)',
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
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.05)',
                  borderRadius: 16,
                  padding: 24
                }}>
                  <div style={{ fontSize: 28, marginBottom: 12 }}>{item.icon}</div>
                  <div style={{ fontWeight: 700, marginBottom: 4 }}>{item.title}</div>
                  <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              inset: -20,
              background: 'linear-gradient(135deg, rgba(219, 39, 119, 0.3) 0%, rgba(124, 58, 237, 0.3) 100%)',
              borderRadius: 32,
              filter: 'blur(40px)',
              zIndex: -1
            }} />
            <img 
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop&q=80"
              alt="About Ark Global Supply"
              style={{
                width: '100%',
                height: 500,
                objectFit: 'cover',
                borderRadius: 24,
                border: '1px solid rgba(255,255,255,0.1)'
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
            color: 'rgba(255,255,255,0.5)',
            marginBottom: 48
          }}>Questions? Ideas? We'd love to hear from you.</p>
          
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 24,
            padding: 40
          }}>
            <input 
              type="email"
              placeholder="Your email"
              style={{
                width: '100%',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 12,
                padding: 18,
                color: '#fff',
                fontSize: 16,
                marginBottom: 16,
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
            <textarea 
              placeholder="Your message"
              rows={4}
              style={{
                width: '100%',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 12,
                padding: 18,
                color: '#fff',
                fontSize: 16,
                marginBottom: 16,
                outline: 'none',
                resize: 'none',
                fontFamily: 'inherit',
                boxSizing: 'border-box'
              }}
            />
            <button style={{
              width: '100%',
              background: 'linear-gradient(135deg, #7c3aed 0%, #db2777 100%)',
              border: 'none',
              borderRadius: 12,
              padding: 18,
              color: '#fff',
              fontSize: 16,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.3s',
              boxShadow: '0 20px 40px rgba(124, 58, 237, 0.3)'
            }}>
              Send Message
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '60px 40px',
        borderTop: '1px solid rgba(255,255,255,0.05)',
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
              background: 'linear-gradient(135deg, #7c3aed 0%, #db2777 100%)',
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 16,
              fontWeight: 800
            }}>A</div>
            <span style={{ fontWeight: 600 }}>ARK GLOBAL SUPPLY</span>
          </div>
          <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14 }}>
            © 2024 Ark Global Supply. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: 24 }}>
            {['Twitter', 'Instagram', 'Facebook'].map(social => (
              <a key={social} href="#" style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, textDecoration: 'none' }}>{social}</a>
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
            background: '#0a0a0a',
            borderLeft: '1px solid rgba(255,255,255,0.1)',
            zIndex: 201,
            display: 'flex',
            flexDirection: 'column',
            animation: 'slideInRight 0.3s ease'
          }}>
            <div style={{
              padding: 24,
              borderBottom: '1px solid rgba(255,255,255,0.1)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <h3 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>Your Cart ({cartCount})</h3>
              <button 
                onClick={() => setIsCartOpen(false)}
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  border: 'none',
                  borderRadius: 10,
                  width: 40,
                  height: 40,
                  color: '#fff',
                  cursor: 'pointer',
                  fontSize: 20
                }}
              >×</button>
            </div>

            <div style={{ flex: 1, overflow: 'auto', padding: 24 }}>
              {cart.length === 0 ? (
                <div style={{ textAlign: 'center', padding: 60, color: 'rgba(255,255,255,0.4)' }}>
                  <div style={{ fontSize: 48, marginBottom: 16 }}>🛒</div>
                  <p>Your cart is empty</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {cart.map(item => (
                    <div key={item.id} style={{
                      display: 'flex',
                      gap: 16,
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.05)',
                      borderRadius: 16,
                      padding: 16
                    }}>
                      <img 
                        src={item.image} 
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
                        <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>${item.price}</div>
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
                              border: '1px solid rgba(255,255,255,0.1)',
                              background: 'transparent',
                              color: '#fff',
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
                              border: '1px solid rgba(255,255,255,0.1)',
                              background: 'transparent',
                              color: '#fff',
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
                              color: 'rgba(255,255,255,0.4)',
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
                borderTop: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(0,0,0,0.5)'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: 8,
                  fontSize: 14,
                  color: 'rgba(255,255,255,0.5)'
                }}>
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: 8,
                  fontSize: 14,
                  color: 'rgba(255,255,255,0.5)'
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
                  borderTop: '1px solid rgba(255,255,255,0.1)'
                }}>
                  <span>Total</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <button
                  onClick={() => redirectToCheckout(cart)}
                  style={{
                    width: '100%',
                    background: 'linear-gradient(135deg, #7c3aed 0%, #db2777 100%)',
                    border: 'none',
                    borderRadius: 14,
                    padding: 18,
                    color: '#fff',
                    fontSize: 16,
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: '0 20px 40px rgba(124, 58, 237, 0.3)'
                  }}
                >
                  Checkout — ${cartTotal.toFixed(2)}
                </button>
                <p style={{
                  textAlign: 'center',
                  fontSize: 12,
                  color: 'rgba(255,255,255,0.4)',
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
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        ::placeholder { color: rgba(255,255,255,0.3); }
        a:hover { color: #fff !important; }
        button:hover { transform: scale(1.02); }
        button:active { transform: scale(0.98); }
      `}</style>
    </div>
  );
}
