'use client';

export default function ProductModal({ product, categoryName, whatsappNumber, onClose }) {
  if (!product) return null;

  const specHTML = product.specs 
    ? product.specs.split('\n').map((line, index) => <li key={index}>{line}</li>) 
    : <li>Spesifikasi belum ditambahkan</li>;

  // Format pesan WA pre-filled
  const waMessage = `Halo BOS SMART, saya tertarik dengan produk *${product.name}* dari kategori *${categoryName}*. Mohon informasi ketersediaan stok dan harga penawarannya. Terima kasih!`;
  const encodedWaMessage = encodeURIComponent(waMessage);

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        backgroundColor: 'rgba(3, 12, 22, 0.85)',
        backdropFilter: 'blur(10px)',
        zIndex: 10000,
        display: 'flex',
        alignItems: 'center',
        justifycontent: 'center',
        justifyContent: 'center',
        padding: '20px',
        animation: 'fadeIn 0.3s ease'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        style={{
          backgroundColor: 'var(--pure-white)',
          borderRadius: '18px',
          width: '100%',
          maxWidth: '850px',
          overflow: 'hidden',
          boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
          display: 'grid',
          gridTemplateColumns: '1.1fr 1.3fr',
          position: 'relative',
          animation: 'slideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: 'var(--off-white)',
            border: 'none',
            fontSize: '1.2rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            color: 'var(--primary-navy)',
            transition: 'var(--transition-fast)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--primary-navy)';
            e.currentTarget.style.color = '#FFFFFF';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--off-white)';
            e.currentTarget.style.color = 'var(--primary-navy)';
          }}
        >
          <i className="ri-close-line"></i>
        </button>

        {/* Kiri: Foto Gambar */}
        <div style={{ height: '100%', minHeight: '400px', backgroundColor: 'var(--primary-navy)', position: 'relative' }}>
          <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>

        {/* Kanan: Konten Spesifikasi */}
        <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', overflowY: 'auto', maxHeight: '90vh' }}>
          <span 
            style={{
              fontSize: '0.75rem',
              backgroundColor: 'rgba(0, 82, 204, 0.08)',
              color: 'var(--electric-blue)',
              fontWeight: 700,
              padding: '6px 14px',
              borderRadius: '20px',
              alignSelf: 'flex-start',
              marginBottom: '16px',
              fontFamily: 'var(--font-headings)',
              textTransform: 'uppercase'
            }}
          >
            {categoryName}
          </span>
          <h2 style={{ fontSize: '1.6rem', color: 'var(--primary-navy)', marginBottom: '16px', fontWeight: 800, lineHeight: 1.3 }}>
            {product.name}
          </h2>
          
          <h4 style={{ fontSize: '0.9rem', color: 'var(--primary-navy)', marginBottom: '8px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Deskripsi
          </h4>
          <p style={{ fontSize: '0.88rem', color: 'var(--medium-gray)', marginBottom: '24px', lineHeight: 1.6 }}>
            {product.description}
          </p>
          
          <h4 style={{ fontSize: '0.9rem', color: 'var(--primary-navy)', marginBottom: '8px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Spesifikasi Teknis
          </h4>
          <ul style={{ fontSize: '0.85rem', color: 'var(--dark-gray)', marginBottom: '32px', paddingLeft: '20px', lineHeight: 1.7 }}>
            {specHTML}
          </ul>

          <div style={{ marginTop: 'auto', display: 'flex', gap: '12px', borderTop: '1px solid var(--light-gray)', paddingTop: '24px' }}>
            <a 
              href={`https://wa.me/${whatsappNumber}?text=${encodedWaMessage}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-whatsapp" 
              style={{ flexGrow: 1, textAlign: 'center' }}
            >
              <i className="ri-whatsapp-line"></i> Pesan via WhatsApp
            </a>
          </div>
        </div>
      </div>
      
      {/* Dynamic Keyframes injected locally */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
