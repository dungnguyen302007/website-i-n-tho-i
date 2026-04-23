import { Link, useLocation } from 'react-router-dom';
import { Menu, Search, ShoppingCart, User, Phone, Mail, MapPin } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/src/lib/constants';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Trang Chủ', path: '/' },
    { name: 'Sản Phẩm', path: '/products' },
    { name: 'Tin Tức', path: '/news' },
    { name: 'Giới Thiệu', path: '/about' },
    { name: 'Liên Hệ', path: '/contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-white rounded-full"></div>
            </div>
            <span className="text-xl font-bold tracking-tight">SHOP<span className="text-blue-600">MOBILE</span></span>
          </Link>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path} 
                className={cn(
                  "transition-colors",
                  location.pathname === link.path ? "text-blue-600 font-bold" : "text-slate-600 hover:text-blue-600"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none opacity-40">
                <Search size={14} className="text-slate-500" />
              </div>
              <input 
                type="text" 
                placeholder="Tìm sản phẩm..." 
                className="bg-slate-100 rounded-full py-1.5 pl-9 pr-4 text-xs w-48 focus:outline-none focus:ring-2 focus:ring-blue-500 border-none"
              />
            </div>
            <div className="flex items-center gap-3 text-slate-500">
               <button className="hover:text-blue-600 transition-colors">
                  <User size={20} />
               </button>
               <Link to="/cart" className="hover:text-blue-600 relative transition-colors">
                  <ShoppingCart size={20} />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">2</span>
               </Link>
               <button 
                className="md:hidden p-1 hover:text-blue-600 transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Menu size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path} 
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  "block px-3 py-2.5 rounded-xl text-base font-medium transition-colors",
                  location.pathname === link.path ? "bg-blue-50 text-blue-600" : "text-slate-600 hover:bg-slate-50"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 py-6 sm:py-8 mt-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] sm:text-xs text-slate-400 font-medium uppercase tracking-wider">
        <div className="text-center sm:text-left">
          &copy; 2024 SHOPMOBILE - MUA ĐIỆN THOẠI CHÍNH HÃNG, GIÁ TỐT NHẤT VIỆT NAM
        </div>
        <div className="flex gap-6">
          <Link to="#" className="hover:text-blue-600 transition-colors">Chính sách bảo mật</Link>
          <Link to="#" className="hover:text-blue-600 transition-colors">Điều khoản</Link>
          <Link to="#" className="hover:text-blue-600 transition-colors">Sitemap (SEO)</Link>
        </div>
      </div>
    </footer>
  );
}
