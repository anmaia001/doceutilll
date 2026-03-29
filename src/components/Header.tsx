import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Menu, X, Home, Package, Tag, HelpCircle, Phone } from 'lucide-react';
import { useCart } from '@/hooks/useCart';

const navItems = [
  { label: 'Início', id: 'inicio', icon: <Home size={16} /> },
  { label: 'Produtos', id: 'produtos', icon: <Package size={16} /> },
  { label: 'Promoções', id: 'promocoes', icon: <Tag size={16} /> },
  { label: 'Como Comprar', id: 'como-comprar', icon: <HelpCircle size={16} /> },
  { label: 'Contato', id: 'contato', icon: <Phone size={16} /> },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { toggleCart, totalItems } = useCart();
  const count = totalItems();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-card/95 shadow-lg border-b border-border/50'
          : 'bg-transparent'
      }`}
      style={{ backdropFilter: scrolled ? 'blur(12px)' : 'none' }}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => scrollToSection('inicio')}
          className="flex items-center gap-2 group"
        >
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
            <span className="text-primary-foreground font-bold text-lg leading-none">C</span>
          </div>
          <div className="flex flex-col leading-none">
            <span
              className="text-xl font-bold text-foreground"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Doce<span className="text-primary"> & </span>Útil
            </span>
            <span className="text-xs text-muted-foreground font-normal hidden sm:block">
              Utilidades & Doces Artesanais
            </span>
          </div>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="px-4 py-2 rounded-lg text-sm font-medium text-foreground/80 hover:text-primary hover:bg-primary/10 transition-all duration-200"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Cart + Mobile Menu */}
        <div className="flex items-center gap-2">
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={toggleCart}
            className="relative p-2.5 rounded-xl bg-primary text-primary-foreground shadow-md hover:opacity-90 transition-all"
          >
            <ShoppingCart size={20} />
            <AnimatePresence>
              {count > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-accent text-accent-foreground text-xs font-bold rounded-full flex items-center justify-center"
                >
                  {count}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2.5 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-card border-b border-border overflow-hidden"
          >
            <div className="container mx-auto px-4 py-3 flex flex-col gap-1">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-foreground hover:bg-primary/10 hover:text-primary transition-all text-left"
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
