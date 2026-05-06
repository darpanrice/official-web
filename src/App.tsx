/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Menu, X, ChevronRight, ChevronLeft, ShoppingCart, MapPin, Phone, Instagram, Send, Star, ShieldCheck, Leaf } from 'lucide-react';

// --- Constants & Types ---

const WHATSAPP_NUMBER = "+91 6362972716"; // Display format
const WHATSAPP_LINK_NUMBER = "916362972716"; // Clean format for API
const COMPANY_NAME = "R.M AGRO MULTI PRODUCT";

interface Product {
  id: string;
  name: string;
  weight: string;
  description: string;
  images: string[];
}

const PRODUCTS: Product[] = [
  {
    id: 'pack-1kg',
    name: "Shahi Darpan Special",
    weight: "1 KG",
    description: "Extra long grain, real aroma, and traditional taste. Aged to perfection and processed with state-of-the-art Sortex quality tech.",
    images: [
      "/assets/1Kg_front.jpeg",
      "/assets/1Kg_back.jpeg"
    ]
  },
  {
    id: 'pack-5kg',
    name: "Shahi Darpan Royal",
    weight: "5 KG",
    description: "Our signature family pack. The same premium quality in a traditional woven-style packaging for heritage preservation.",
    images: [
      "/assets/5kg_front.jpeg"
    ]
  }
];

// --- Components ---

interface ProductCardProps {
  product: Product;
  key?: React.Key;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    if (product.images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % product.images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [product.images.length]);

  const nextImage = () => {
    setCurrentIdx((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentIdx((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const whatsappLink = `https://wa.me/${WHATSAPP_LINK_NUMBER}?text=Hi, I would like to order the ${product.name} (${product.weight} pack).`;

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-card group overflow-hidden rounded-3xl"
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIdx}
            src={product.images[currentIdx]}
            alt={product.name}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="h-full w-full object-cover"
            referrerPolicy="no-referrer"
          />
        </AnimatePresence>
        
        {/* Navigation Overlays */}
        <div className="absolute inset-x-0 bottom-6 flex justify-center gap-2 z-10">
          {product.images.map((_, i) => (
            <div 
              key={i} 
              className={`h-1 rounded-full transition-all duration-300 ${i === currentIdx ? 'w-8 bg-brand-gold' : 'w-2 bg-white/30'}`}
            />
          ))}
        </div>

        <button 
          onClick={prevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronLeft size={20} />
        </button>
        <button 
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="p-8">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-2xl font-serif font-semibold mb-1 text-white">{product.name}</h3>
            <span className="text-brand-gold font-mono text-sm tracking-widest uppercase">{product.weight} PACK</span>
          </div>
          <div className="flex text-brand-gold gap-0.5">
            {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
          </div>
        </div>
        <p className="text-gray-400 text-sm leading-relaxed mb-8 h-12 line-clamp-2">
          {product.description}
        </p>
        <a 
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-full gap-3 py-4 bg-brand-gold hover:bg-brand-saffron text-black font-semibold rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <ShoppingCart size={20} />
          ORDER ON WHATSAPP
        </a>
      </div>
    </motion.div>
  );
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);

  const mainWhatsAppLink = `https://wa.me/${WHATSAPP_LINK_NUMBER}?text=Hi, I want to inquire about Shahi Darpan Premium Rice.`;

  return (
    <div ref={containerRef} className="relative min-h-screen selection:bg-brand-gold selection:text-black">
      {/* Navbar */}
      <nav className="fixed top-0 inset-x-0 z-50 px-6 md:px-12 py-8 transition-all border-b border-white/10 bg-brand-black/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-2xl font-bold tracking-tighter text-brand-gold">SHAHI DARPAN</span>
            <span className="text-[10px] uppercase tracking-[0.2em] opacity-60">Premium Rajasthan Basmati</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-[11px] uppercase tracking-widest font-bold">
            <a href="#home" className="text-brand-gold">HOME</a>
            <a href="#catalogue" className="hover:text-brand-gold transition-colors">ORDER RICE</a>
            <a href="#heritage" className="hover:text-brand-gold transition-colors">HERITAGE</a>
            <a href="#contact" className="hover:text-brand-gold transition-colors">CONTACT</a>
            <div className="h-6 w-px bg-white/20 mx-2"></div>
            <a 
              href={mainWhatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-whatsapp text-black px-6 py-2.5 rounded-full flex items-center gap-2 hover:scale-105 transition-transform"
            >
              ORDER VIA WHATSAPP
            </a>
          </div>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="text-white" /> : <Menu className="text-white" />}
          </button>
        </div>
      </nav>

      {/* Hero Section - Split Layout */}
      <section id="home" className="relative min-h-screen flex flex-col pt-32 overflow-hidden">
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 max-w-7xl mx-auto w-full">
          {/* Left Narrative Column */}
          <div className="lg:col-span-5 p-6 md:p-12 flex flex-col justify-center bg-brand-dark lg:border-r border-white/10">
            <div className="mb-8">
              <span className="badge-outline">Authentic Hadoti Belt</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-light leading-tight mb-8 text-white">
              Grown in <br/> <span className="italic font-serif text-brand-gold">Rajasthan's Hadoti Belt</span>,
              <br/>Served with <br/> Honor.
            </h1>
            <p className="text-lg text-white/60 mb-12 max-w-md font-light leading-relaxed">
              Directly sourced from the farmers of Kota. Meticulously processed and aged to bring the longest grain and finest aroma to your kitchen.
            </p>
            
            <div className="grid grid-cols-2 gap-8">
              <div className="flex flex-col">
                <span className="text-4xl font-bold text-brand-gold">100%</span>
                <span className="text-[10px] opacity-50 uppercase tracking-widest">Organic Trace</span>
              </div>
              <div className="flex flex-col">
                <span className="text-4xl font-bold text-brand-gold italic font-serif">Aged</span>
                <span className="text-[10px] opacity-50 uppercase tracking-widest">For 2 Years</span>
              </div>
            </div>
          </div>

          {/* Right Visual/Interaction Column */}
          <div className="lg:col-span-7 relative min-h-[500px]">
            <motion.div style={{ y: heroY }} className="absolute inset-0">
               <img 
                src="https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=2070&auto=format&fit=crop"
                className="h-full w-full object-cover brightness-[0.6]"
                alt="Rajasthan Fields"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent lg:hidden" />
            </motion.div>
            
            {/* Overlay features */}
            <div className="absolute bottom-12 right-12 flex flex-col gap-6 items-end">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass-card p-6 rounded-2xl flex items-center gap-4 max-w-[200px]"
              >
                <div className="w-10 h-10 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-gold">
                  <Leaf size={18} />
                </div>
                <span className="text-xs font-bold leading-tight uppercase opacity-80">Farmer <br/> Owned</span>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Catalogue Section */}
      <section id="catalogue" className="py-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <div className="max-w-xl">
              <span className="text-brand-gold font-mono text-sm tracking-[0.2em] uppercase mb-4 block">Product Catalog</span>
              <h2 className="text-5xl md:text-6xl font-serif font-medium">Signature Harvest</h2>
            </div>
            <div className="flex gap-2">
              <div className="w-12 h-[2px] bg-brand-gold" />
              <div className="w-12 h-[2px] bg-white/10" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            {PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Feature Highlight / Heritage */}
      <section id="heritage" className="py-24 px-6 md:px-12 border-y border-white/5 bg-brand-dark">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 justify-between">
          <div className="max-w-md">
            <span className="text-brand-gold font-mono text-[10px] tracking-[0.3em] uppercase mb-4 block">The Heritage</span>
            <h2 className="text-4xl md:text-5xl font-serif font-medium mb-6 italic">Ancestral Wisdom Meets Modern Precision</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1">
            <div className="p-8 border border-white/10 rounded-2xl">
              <ShieldCheck size={28} className="text-brand-gold mb-6" />
              <h3 className="text-xl font-serif font-bold mb-3 tracking-wide">Premium Polishing</h3>
              <p className="text-sm text-white/50 leading-relaxed">Multiple stages of cleaning and de-husking ensure only the purest grains reach your kitchen.</p>
            </div>
            <div className="p-8 border border-white/10 rounded-2xl">
              <MapPin size={28} className="text-brand-gold mb-6" />
              <h3 className="text-xl font-serif font-bold mb-3 tracking-wide">Hadoti Selection</h3>
              <p className="text-sm text-white/50 leading-relaxed">Grown in the mineral-rich soil of Bundi and Kota, famed for historic aromatic rice production.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Details */}
      <footer id="contact" className="px-6 md:px-12 py-12 bg-[#050505] border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-start lg:items-center gap-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 w-full lg:w-auto">
            <div className="flex flex-col">
              <span className="text-[9px] uppercase tracking-widest opacity-40 mb-2">Processed & Packed by</span>
              <span className="text-xs font-bold mb-1">R.M AGRO MULTI PRODUCT</span>
              <span className="text-xs leading-relaxed max-w-[200px]">Khasra No. 107, Hatipura Chittor Road, Bundi- 323001 (Raj.)</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] uppercase tracking-widest opacity-40 mb-2">Customer Care</span>
              <span className="text-xs text-brand-gold font-bold">+91 6362972716</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] uppercase tracking-widest opacity-40 mb-2">Fssai Lic. No.</span>
              <span className="text-xs opacity-80">12215018000193</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] uppercase tracking-widest opacity-40 mb-2">Socials</span>
              <div className="flex gap-4">
                <Instagram size={14} className="hover:text-brand-gold cursor-pointer transition-colors" />
                <span className="text-[10px] font-bold text-brand-whatsapp cursor-pointer">WA</span>
              </div>
            </div>
          </div>
          <div className="text-[9px] uppercase tracking-[0.3em] opacity-30 font-bold whitespace-nowrap">
            &copy; 2026 SHAHI DARPAN GRAINS.
          </div>
        </div>
      </footer>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-50 bg-brand-black flex flex-col items-center justify-center gap-8 text-2xl font-serif"
          >
            <button className="absolute top-8 right-8" onClick={() => setIsMenuOpen(false)}>
              <X size={32} />
            </button>
            <a href="#home" onClick={() => setIsMenuOpen(false)}>HOME</a>
            <a href="#catalogue" onClick={() => setIsMenuOpen(false)}>ORDER RICE</a>
            <a href="#heritage" onClick={() => setIsMenuOpen(false)}>HERITAGE</a>
            <a href="#contact" onClick={() => setIsMenuOpen(false)}>CONTACT</a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
