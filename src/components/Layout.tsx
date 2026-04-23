import { Link, useLocation } from 'react-router-dom';
import { Menu, Search, ShoppingCart, User, Phone, MapPin, ChevronDown, Facebook, Youtube, Send, Instagram, MessageCircle, Mail } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/src/lib/constants';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Trang chủ', path: '/' },
    { name: 'Giới thiệu', path: '/about' },
    { name: 'Sản phẩm', path: '/products' },
    { name: 'Tin tức', path: '/news' },
    { name: 'Liên hệ', path: '/contact' },
  ];

  return (
    <header className="w-full flex flex-col z-50 bg-slate-950">
      {/* Top Bar */}
      <div className="bg-slate-900/50 border-b border-white/5 py-2 hidden sm:block">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-400 italic">
          <div>Chào mừng bạn đến với uMobi - Thế giới điện thoại chính hãng</div>
          <div className="flex items-center gap-6">
            <a href="tel:18001234" className="flex items-center gap-1.5 hover:text-red-500 transition-colors">
              <Phone size={12} className="text-red-600" />
              Hotline: 1800 1234
            </a>
            <Link to="/contact" className="flex items-center gap-1.5 hover:text-red-500 transition-colors">
              <MapPin size={12} className="text-red-600" />
              Hệ thống cửa hàng
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="py-6 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center gap-4 sm:gap-10">
          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0">
            <span className="text-4xl font-black tracking-tighter flex items-center italic">
              <span className="text-red-600">u</span>
              <span className="text-white">Mobi</span>
            </span>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 w-full max-w-2xl relative">
            <div className="flex border-2 border-red-600/30 rounded-2xl overflow-hidden bg-white/5 group focus-within:border-red-600 focus-within:bg-white/10 transition-all">
              <input 
                type="text" 
                placeholder="Tìm kiếm siêu phẩm..." 
                className="flex-1 px-6 py-3 text-sm outline-none bg-transparent text-white placeholder:text-slate-500 italic font-bold"
              />
              <button className="bg-red-600 text-white px-8 flex items-center justify-center hover:bg-red-700 transition-all">
                <Search size={20} />
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-6 sm:gap-8 shrink-0">
            <div className="hidden md:flex items-center gap-4 group cursor-pointer">
              <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center group-hover:border-red-600 group-hover:bg-red-600/10 transition-all">
                <User size={20} className="text-slate-300 group-hover:text-red-500" />
              </div>
              <div className="text-left">
                <div className="text-[9px] text-slate-500 font-black uppercase tracking-widest leading-none mb-1 italic">Account</div>
                <div className="text-[13px] font-black text-white leading-none italic uppercase">Đăng nhập</div>
              </div>
            </div>

            <Link to="/cart" className="flex items-center gap-4 group relative">
              <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center group-hover:border-red-600 group-hover:bg-red-600/10 transition-all">
                <ShoppingCart size={20} className="text-slate-300 group-hover:text-red-500" />
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] w-6 h-6 rounded-full flex items-center justify-center font-black border-4 border-slate-950 shadow-lg shadow-red-600/20">0</span>
              </div>
              <div className="hidden lg:block text-left">
                <div className="text-[9px] text-slate-500 font-black uppercase tracking-widest leading-none mb-1 italic">Giỏ hàng</div>
                <div className="text-[13px] font-black text-white leading-none italic uppercase">Check out</div>
              </div>
            </Link>
            
            <button 
              className="sm:hidden p-2 text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="bg-red-600 shadow-md">
        <div className="max-w-7xl mx-auto px-4 flex">
          {/* Categories Button */}
          <div className="bg-red-700 px-6 py-3 text-white flex items-center gap-3 font-black text-xs uppercase tracking-widest cursor-pointer w-full sm:w-64">
            <Menu size={16} />
            Danh mục sản phẩm
          </div>

          {/* Nav Links */}
          <nav className="hidden sm:flex items-center ml-4">
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path} 
                className={cn(
                  "px-6 py-4 text-xs uppercase tracking-widest font-black transition-all hover:bg-black/20 border-b-2 border-transparent italic",
                  location.pathname === link.path ? "text-white border-white bg-black/20" : "text-white/60 hover:text-white"
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="sm:hidden bg-slate-900 border-b border-white/5 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="px-4 py-6 space-y-2">
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path} 
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  "block px-4 py-3 rounded-xl text-xs uppercase tracking-widest font-black transition-colors italic",
                  location.pathname === link.path ? "bg-red-600 text-white" : "text-slate-400 hover:bg-white/5"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-white/5 pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          {/* Brand Info */}
          <div className="space-y-8">
            <span className="text-4xl font-black tracking-tighter flex items-center italic">
              <span className="text-red-600">u</span>
              <span className="text-white">Mobi</span>
            </span>
            <p className="text-slate-400 text-sm leading-relaxed font-medium italic">
              uMobi là hệ thống bán lẻ điện thoại chính hãng uy tín hàng đầu Việt Nam. Cam kết sản phẩm chính hãng 100%, giá tốt nhất thị trường.
            </p>
            <div className="flex gap-4">
               {[Facebook, Youtube, Instagram, MessageCircle].map((Icon, i) => (
                 <a key={i} href="#" className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all shadow-sm">
                    <Icon size={20} />
                 </a>
               ))}
            </div>
          </div>

          {/* Links */}
          <div className="space-y-8">
            <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em] italic opacity-40">Company</h4>
            <ul className="space-y-4">
              {['Giới thiệu', 'Tuyển dụng', 'Chính sách bảo mật', 'Điều khoản sử dụng'].map(item => (
                <li key={item}><Link to="#" className="text-sm text-slate-400 hover:text-red-500 transition-colors font-black uppercase tracking-widest italic">{item}</Link></li>
              ))}
            </ul>
          </div>

          <div className="space-y-8">
            <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em] italic opacity-40">Support</h4>
            <ul className="space-y-4">
              {['Hướng dẫn mua hàng', 'Thanh toán', 'Vận chuyển', 'Đổi trả', 'Bảo hành'].map(item => (
                <li key={item}><Link to="#" className="text-sm text-slate-400 hover:text-red-500 transition-colors font-black uppercase tracking-widest italic">{item}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-8">
            <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em] italic opacity-40">Contact</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 shrink-0 bg-red-600/10 border border-red-600/20 rounded-xl flex items-center justify-center">
                  <Phone size={16} className="text-red-600" />
                </div>
                <div>
                   <div className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Hotline 24/7</div>
                   <div className="text-white font-black text-sm italic tracking-widest">1800 1234</div>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 shrink-0 bg-red-600/10 border border-red-600/20 rounded-xl flex items-center justify-center">
                  <Mail size={16} className="text-red-600" />
                </div>
                <div>
                   <div className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Email us</div>
                   <div className="text-white font-black text-sm italic tracking-widest">CSKH@UMOBI.VN</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-8 pt-10 border-t border-white/5">
           <div className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] italic">
             &copy; 2024 uMobi. Premium Tech Experience.
           </div>
           <div className="flex items-center gap-6 opacity-30 grayscale hover:opacity-100 hover:grayscale-0 transition-all">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Logo_B%E1%BB%99_C%C3%B4ng_Th%C6%B0%C6%A1ng_%28Vietnam%29.svg/1024px-Logo_B%E1%BB%99_C%C3%B4ng_Th%C6%B0%C6%A1ng_%28Vietnam%29.svg.png" className="h-8" alt="BCT" />
           </div>
        </div>
      </div>
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center shadow-xl hover:bg-red-700 transition-all z-40 active:scale-95"
      >
        <ChevronDown size={24} className="rotate-180" />
      </button>
    </footer>
  );
}
