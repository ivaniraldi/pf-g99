import React, { useState, useMemo } from 'react'
import ProductCard from './ProductCard';
import { Search, SlidersHorizontal, X, ChevronDown, Filter } from 'lucide-react';
import { Modal } from 'react-bootstrap';

const FilterContent = ({ 
  searchTerm, 
  setSearchTerm, 
  maxPrice, 
  setMaxPrice, 
  brands, 
  selectedBrand, 
  setSelectedBrand, 
  categories, 
  selectedCategories, 
  handleCategoryChange, 
  colors, 
  selectedColor, 
  setSelectedColor, 
  clearFilters 
}) => {
  // Helper to map color names to HEX
  const colorMap = {
    "Blanco": "#FFFFFF",
    "Negro": "#000000",
    "Gris": "#9ca3af",
    "Azul marino": "#1e3a8a",
    "Beige": "#f5f5dc",
    "Verde": "#166534",
    "Burdeos": "#7f1d1d",
    "Rosa": "#f472b6",
    "Celeste": "#7dd3fc",
    "Lila": "#d8b4fe",
    "Arena": "#d2b48c",
    "Amarillo": "#facc15",
    "Azul Denim": "#5b7c99",
    "Gris Carbón": "#374151"
  };

  return (
    <div className='d-flex flex-column gap-4'>
      {/* Buscador */}
      <div className='position-relative' style={{ zIndex: 10 }}>
        <input 
          type="text"
          className='premium-input w-100'
          placeholder="Buscar prendas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ paddingLeft: '45px', borderRadius: '15px', height: '50px', backgroundColor: '#fff' }}
        />
        <Search size={20} className='position-absolute top-50 translate-middle-y ms-3' style={{ left: 0, color: 'var(--primary)', pointerEvents: 'none' }} />
        {searchTerm && (
          <X 
            size={18} 
            className='position-absolute top-50 translate-middle-y me-3 text-muted cursor-pointer' 
            style={{ right: 0, zIndex: 11 }}
            onClick={() => setSearchTerm("")}
          />
        )}
      </div>

      <div className='d-flex justify-content-between align-items-center border-bottom pb-2'>
        <div className='d-flex align-items-center gap-2'>
          <SlidersHorizontal size={18} style={{ color: 'var(--primary)' }} />
          <h5 className='font-archivo-black m-0' style={{ fontSize: '0.9rem', letterSpacing: '0.5px' }}>FILTROS</h5>
        </div>
        <button 
          className='btn btn-sm btn-link text-primary text-decoration-none p-0 fw-bold' 
          onClick={clearFilters}
          style={{ fontSize: '0.75rem' }}
        >
          LIMPIAR TODO
        </button>
      </div>
      
      {/* Precio */}
      <div>
        <div className='d-flex justify-content-between mb-2'>
          <p className='fw-bold m-0' style={{ fontSize: '0.85rem' }}>Rango de Precio</p>
          <span className='fw-bold text-primary' style={{ fontSize: '0.9rem' }}>${maxPrice}</span>
        </div>
        <input 
          type="range" 
          className="form-range" 
          min="0"
          max="200"
          step="10"
          value={maxPrice}
          onChange={(e) => setMaxPrice(parseInt(e.target.value))}
          style={{ accentColor: 'var(--primary)' }}
        />
        <div className='d-flex justify-content-between mt-1' style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
          <span>$0</span>
          <span>$200</span>
        </div>
      </div>
      
      {/* Marcas - Visual Chips */}
      <div>
        <p className='fw-bold mb-3' style={{ fontSize: '0.85rem' }}>Marcas</p>
        <div className='d-flex flex-wrap gap-2'>
          <button 
            className={`badge rounded-pill border-0 px-3 py-2 transition-all ${!selectedBrand ? 'bg-primary text-white shadow-sm' : 'bg-light text-muted'}`}
            onClick={() => setSelectedBrand("")}
            style={{ fontSize: '0.75rem', cursor: 'pointer' }}
          >
            Todas
          </button>
          {brands.map(brand => (
            <button 
              key={brand}
              className={`badge rounded-pill border-0 px-3 py-2 transition-all ${selectedBrand === brand ? 'bg-primary text-white shadow-sm' : 'bg-light text-muted'}`}
              onClick={() => setSelectedBrand(brand)}
              style={{ fontSize: '0.75rem', cursor: 'pointer' }}
            >
              {brand}
            </button>
          ))}
        </div>
      </div>

      {/* Categorías */}
      <div>
        <p className='fw-bold mb-3' style={{ fontSize: '0.85rem' }}>Categorías</p>
        <div className='d-flex flex-column gap-2'>
          {categories.map(cat => (
            <label key={cat} className='d-flex align-items-center gap-3 p-2 rounded-3 transition-all' style={{ 
              cursor: 'pointer', 
              fontSize: '0.9rem', 
              backgroundColor: selectedCategories.includes(cat) ? 'rgba(99, 102, 241, 0.08)' : 'transparent',
              border: selectedCategories.includes(cat) ? '1px solid rgba(99, 102, 241, 0.2)' : '1px solid transparent'
            }}>
              <input 
                type="checkbox" 
                checked={selectedCategories.includes(cat)}
                onChange={() => handleCategoryChange(cat)}
                className='form-check-input m-0'
                style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: 'var(--primary)' }} 
              />
              <span className={selectedCategories.includes(cat) ? 'fw-bold text-primary' : 'text-main'}>
                {cat}
              </span>
            </label>
          ))}
        </div>
      </div>
      
      {/* Color - Visual Swatches */}
      <div className='mb-2'>
        <p className='fw-bold mb-3' style={{ fontSize: '0.85rem' }}>Color</p>
        <div className='d-flex flex-wrap gap-2'>
          <button 
            className={`rounded-circle border transition-all ${!selectedColor ? 'border-primary border-2 p-1' : 'border-light p-1'}`}
            onClick={() => setSelectedColor("")}
            title="Todos los colores"
            style={{ width: '32px', height: '32px', background: 'conic-gradient(red, yellow, lime, aqua, blue, magenta, red)', cursor: 'pointer' }}
          ></button>
          {colors.map(color => (
            <button 
              key={color}
              className={`rounded-circle border transition-all ${selectedColor === color ? 'border-primary border-2 p-1 scale-110 shadow-sm' : 'border-light p-1'}`}
              onClick={() => setSelectedColor(color)}
              title={color}
              style={{ 
                width: '32px', 
                height: '32px', 
                backgroundColor: colorMap[color] || '#ccc',
                cursor: 'pointer'
              }}
            >
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function ProductGrid({ products }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [maxPrice, setMaxPrice] = useState(200);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [sortBy, setSortBy] = useState("Recommended");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Extract dynamic filters from products
  const categories = useMemo(() => [...new Set(products.map(p => p.category.name))], [products]);
  const brands = useMemo(() => [...new Set(products.map(p => p.brand))], [products]);
  const colors = useMemo(() => {
    const allColors = products.flatMap(p => p.colors || []);
    return [...new Set(allColors)];
  }, [products]);

  const handleCategoryChange = (cat) => {
    if (selectedCategories.includes(cat)) {
      setSelectedCategories(selectedCategories.filter(c => c !== cat));
    } else {
      setSelectedCategories([...selectedCategories, cat]);
    }
  };

  const filteredProducts = useMemo(() => {
    let result = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPrice = product.price <= maxPrice;
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category.name);
      const matchesColor = !selectedColor || (product.colors && product.colors.some(c => c.toLowerCase() === selectedColor.toLowerCase()));
      const matchesBrand = !selectedBrand || product.brand === selectedBrand;
      
      return matchesSearch && matchesPrice && matchesCategory && matchesColor && matchesBrand;
    });

    // Sorting logic
    if (sortBy === "PriceLowHigh") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "PriceHighLow") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, searchTerm, maxPrice, selectedCategories, selectedColor, selectedBrand, sortBy]);

  const clearFilters = () => {
    setSearchTerm("");
    setMaxPrice(200);
    setSelectedCategories([]);
    setSelectedColor("");
    setSelectedBrand("");
    setSortBy("Recommended");
  };

  const filterProps = {
    searchTerm, setSearchTerm,
    maxPrice, setMaxPrice,
    brands, selectedBrand, setSelectedBrand,
    categories, selectedCategories, handleCategoryChange,
    colors, selectedColor, setSelectedColor,
    clearFilters
  };

  return (
    <div className='container-fluid px-0'>
      {/* Mobile Filter Toggle */}
      <div className='d-lg-none mb-4'>
        <button 
          className='premium-button w-100 d-flex align-items-center justify-content-center gap-2 glass shadow-sm'
          onClick={() => setShowMobileFilters(true)}
          style={{ height: '55px', borderRadius: '15px', color: 'var(--primary)', fontWeight: '700' }}
        >
          <Filter size={20} /> Filtrar y Buscar
        </button>
      </div>

      <div className='row g-4'>
        {/* Desktop Sidebar */}
        <div className='col-lg-3 d-none d-lg-block'>
          <div className='premium-card glass' style={{ 
            padding: '30px', 
            position: 'sticky', 
            top: '100px', 
            borderRadius: '35px', 
            border: '1px solid rgba(255,255,255,0.3)',
            transform: 'none',
            boxShadow: 'var(--shadow-sm)',
            transition: 'none'
          }}>
            <FilterContent {...filterProps} />
          </div>
        </div>
        
        {/* Grilla de Productos */}
        <div className='col-lg-9'>
          <div className='d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3 bg-white p-3 rounded-4 shadow-sm border border-light'>
            <p className='m-0' style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Mostrando <strong className='text-dark'>{filteredProducts.length}</strong> productos
              {searchTerm && <span> para "<strong className='text-primary'>{searchTerm}</strong>"</span>}
            </p>
            <div className='d-flex gap-2 align-items-center'>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '700', letterSpacing: '0.5px' }}>ORDENAR:</span>
              <div className='position-relative'>
                <select 
                  className='btn border-0 p-0 fw-bold appearance-none pe-4' 
                  style={{ fontSize: '0.85rem', color: 'var(--primary)', cursor: 'pointer', outline: 'none' }}
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="Recommended">Recomendados</option>
                  <option value="PriceLowHigh">Precio: Bajo a Alto</option>
                  <option value="PriceHighLow">Precio: Alto a Bajo</option>
                </select>
                <ChevronDown size={14} className='position-absolute top-50 end-0 translate-middle-y pointer-events-none' style={{ color: 'var(--primary)' }} />
              </div>
            </div>
          </div>

          <div className='row g-4'>
            {filteredProducts && filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <div key={product.id} className='col-12 col-md-6 col-xl-4'>
                  <ProductCard product={product} />
                </div>
              ))
            ) : (
              <div className='col-12 text-center py-5 glass shadow-sm' style={{ borderRadius: '40px', marginTop: '20px', border: '2px dashed var(--border-color)', minHeight: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div className='mb-4 d-inline-block p-4 rounded-circle' style={{ backgroundColor: 'rgba(99, 102, 241, 0.05)', color: 'var(--primary)' }}>
                  <Search size={64} strokeWidth={1} />
                </div>
                <h3 className='font-archivo-black mb-2' style={{ color: 'var(--text-main)' }}>SIN RESULTADOS</h3>
                <p style={{ color: 'var(--text-muted)', maxWidth: '300px', margin: '0 auto 30px', fontSize: '1.1rem' }}>
                  No encontramos nada que coincida con tu búsqueda.
                </p>
                <button 
                  className='premium-button premium-button-primary px-5 align-self-center' 
                  onClick={clearFilters}
                  style={{ borderRadius: '50px', height: '50px' }}
                >
                  Ver Todo el Catálogo
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      <Modal show={showMobileFilters} onHide={() => setShowMobileFilters(false)} centered fullscreen='lg-down' className='premium-modal'>
        <Modal.Header closeButton className='border-0 px-4 pt-4'>
          <Modal.Title className='font-archivo-black' style={{ fontSize: '1.2rem' }}>FILTRAR CATÁLOGO</Modal.Title>
        </Modal.Header>
        <Modal.Body className='px-4 pb-4'>
          <FilterContent {...filterProps} />
          <button 
            className='premium-button premium-button-primary w-100 mt-4' 
            style={{ height: '55px', borderRadius: '15px' }}
            onClick={() => setShowMobileFilters(false)}
          >
            Aplicar Filtros
          </button>
        </Modal.Body>
      </Modal>

      <style>{`
        .appearance-none {
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
        }
        .pointer-events-none {
          pointer-events: none;
        }
        .premium-modal .modal-content {
          border-radius: 30px;
          border: none;
        }
      `}</style>
    </div>
  )
}
