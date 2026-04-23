import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  Package, 
  MessageSquare, 
  Plus, 
  Trash2, 
  Edit3, 
  LogOut, 
  Loader2, 
  Search,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Mail,
  User,
  Calendar,
  Image as ImageIcon
} from 'lucide-react';
import { auth, loginWithGoogle } from '../lib/firebase';
import { onAuthStateChanged, User as FirebaseUser, signOut } from 'firebase/auth';
import { getProducts, addProduct, updateProduct, deleteProduct, getContactMessages } from '../services/dbService';
import { Product, CATEGORIES, cn } from '../lib/constants';

const ADMIN_EMAIL = 'nguyenvandung63664@gmail.com';

export function Admin() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'messages'>('dashboard');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setIsAdmin(u?.email === ADMIN_EMAIL);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      setLoading(true);
      await loginWithGoogle();
    } catch (error) {
      console.error("Login failed", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f4f4f4]">
        <Loader2 className="animate-spin text-red-600" size={48} />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f4f4f4] p-4 italic">
        <div className="bg-white rounded-[3rem] p-12 max-w-md w-full text-center space-y-10 shadow-2xl shadow-slate-200">
          <div className="w-24 h-24 bg-red-50 text-red-600 rounded-[2.5rem] flex items-center justify-center mx-auto shadow-inner">
            <User size={40} />
          </div>
          <div className="space-y-3">
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">uMobi <span className="text-red-600 not-italic">Admin</span></h1>
            <p className="text-slate-400 font-medium italic text-sm">Vui lòng đăng nhập quyền quản trị.</p>
          </div>
          <button 
            onClick={handleLogin}
            className="w-full py-5 bg-red-600 text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-slate-900 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-red-100 italic"
          >
            Đăng nhập với uMobi Account
          </button>
          {!isAdmin && user && (
            <p className="text-red-600 text-[10px] font-black uppercase tracking-widest bg-red-50 py-3 rounded-xl border border-red-100">
              {user.email} KHÔNG CÓ QUYỀN TRUY CẬP
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f4f4] flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-80 bg-slate-900 p-8 flex flex-col gap-12 sticky top-0 h-screen">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center shadow-lg shadow-red-600/20">
             <span className="text-white font-black text-2xl italic leading-none">u</span>
          </div>
          <div className="flex flex-col">
             <span className="text-xl font-black text-white tracking-tighter uppercase italic leading-none">uMobi</span>
             <span className="text-[10px] font-black text-red-600 uppercase tracking-widest">Store Manager</span>
          </div>
        </div>

        <nav className="flex flex-col gap-3 flex-grow">
          <SidebarLink 
            icon={<LayoutDashboard size={20} />} 
            label="Tổng quan" 
            active={activeTab === 'dashboard'} 
            onClick={() => setActiveTab('dashboard')} 
          />
          <SidebarLink 
            icon={<Package size={20} />} 
            label="Kho hàng" 
            active={activeTab === 'products'} 
            onClick={() => setActiveTab('products')} 
          />
          <SidebarLink 
            icon={<MessageSquare size={20} />} 
            label="Phản hồi" 
            active={activeTab === 'messages'} 
            onClick={() => setActiveTab('messages')} 
          />
        </nav>

        <div className="pt-8 border-t border-white/10 space-y-6">
          <div className="flex items-center gap-4 px-4 overflow-hidden">
             <img src={user.photoURL || ''} alt="avatar" className="w-12 h-12 rounded-2xl border-2 border-red-600/20" />
             <div className="overflow-hidden">
                <div className="text-xs font-black text-white truncate italic uppercase">{user.displayName}</div>
                <div className="text-[10px] text-white/40 font-bold truncate tracking-widest uppercase italic">{user.email}</div>
             </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full p-4 bg-white/5 hover:bg-red-600 text-white/60 hover:text-white rounded-2xl transition-all flex items-center gap-4 text-[10px] font-black uppercase tracking-widest italic"
          >
            <LogOut size={18} /> Đăng xuất quản trị
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-6 sm:p-12 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' && <AdminDashboard key="dashboard" />}
            {activeTab === 'products' && <AdminProducts key="products" />}
            {activeTab === 'messages' && <AdminMessages key="messages" />}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

function SidebarLink({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex items-center gap-5 px-6 py-4 rounded-2xl transition-all duration-300 text-[11px] font-black uppercase tracking-widest italic group",
        active 
          ? "bg-red-600 text-white shadow-2xl shadow-red-600/20" 
          : "text-white/40 hover:text-white hover:bg-white/5"
      )}
    >
      <span className={cn("transition-transform group-hover:scale-110", active ? "text-white" : "text-white/20 group-hover:text-red-600")}>{icon}</span>
      {label}
    </button>
  );
}

function AdminDashboard() {
  const [stats, setStats] = useState({ products: 0, messages: 0 });

  useEffect(() => {
    async function loadStats() {
      const ps = await getProducts();
      const ms = await getContactMessages();
      setStats({ products: ps.length, messages: ms.length });
    }
    loadStats();
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-12 italic"
    >
      <div className="flex flex-col gap-3">
        <h2 className="text-5xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">TRẠM <span className="text-red-600">ĐIỀU KHIỂN</span></h2>
        <p className="text-slate-400 font-medium italic text-lg capitalize">Chào mừng bạn trở lại, thống kê uMobi hôm nay.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard title="Tổng Sản Phẩm" value={stats.products} icon={<Package size={24} />} color="bg-red-600" />
        <StatCard title="Tin Nhắn Mới" value={stats.messages} icon={<MessageSquare size={24} />} color="bg-black" />
        <StatCard title="Quản Trị Viên" value="03" icon={<User size={24} />} color="bg-slate-900" />
        <StatCard title="Hệ Thống" value="ONLINE" icon={<TrendingUp size={24} />} color="bg-green-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
         <div className="lg:col-span-8 bg-white rounded-[3rem] p-12 border border-slate-100 shadow-xl shadow-slate-100">
            <h3 className="text-xl font-black text-slate-900 mb-10 uppercase tracking-widest italic leading-none underline decoration-red-600 decoration-4 underline-offset-8">Tăng trưởng uMobi</h3>
            <div className="h-64 flex items-end gap-5 justify-between pt-10">
               {[40, 70, 45, 90, 65, 80, 50, 85, 30, 95].map((h, i) => (
                 <div key={i} className="flex-1 bg-slate-50 rounded-2xl relative group">
                    <motion.div 
                       initial={{ height: 0 }}
                       animate={{ height: `${h}%` }}
                       transition={{ delay: i * 0.1, duration: 1 }}
                       className="absolute bottom-0 left-0 right-0 bg-red-600/10 group-hover:bg-red-600 transition-all rounded-2xl"
                    />
                 </div>
               ))}
            </div>
         </div>
         <div className="lg:col-span-4 bg-slate-900 rounded-[3rem] p-12 relative overflow-hidden group">
            <h3 className="text-xl font-black mb-8 uppercase italic text-white z-10 relative leading-none underline decoration-red-600 decoration-4 underline-offset-8">Ưu tiên</h3>
            <ul className="space-y-6 text-sm font-bold italic text-white/60 z-10 relative">
               <li className="flex items-start gap-4"><span className="text-red-600">01</span> Cập nhật banner Tết uMobi</li>
               <li className="flex items-start gap-4"><span className="text-red-600">02</span> Kiểm duyệt báo cáo tin nhắn</li>
               <li className="flex items-start gap-4"><span className="text-red-600">03</span> Nhập kho iPhone 15 Pro</li>
            </ul>
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-red-600/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
         </div>
      </div>
    </motion.div>
  );
}

function StatCard({ title, value, icon, color }: { title: string, value: string | number, icon: React.ReactNode, color: string }) {
  return (
    <div className="bg-white rounded-[2.5rem] p-10 flex flex-col justify-between hover:shadow-2xl transition-all duration-500 border border-slate-100 group">
      <div className={cn("w-14 h-14 rounded-2xl text-white flex items-center justify-center shadow-xl transition-transform group-hover:-translate-y-2", color)}>
        {icon}
      </div>
      <div className="mt-10 space-y-2">
        <div className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] leading-none italic">{title}</div>
        <div className="text-4xl font-black text-slate-900 italic tracking-tighter uppercase">{value}</div>
      </div>
    </div>
  );
}

function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  async function loadData() {
    setLoading(true);
    const data = await getProducts();
    setProducts(data);
    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      await deleteProduct(id);
      loadData();
    }
  };

  if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-red-600" size={48} /></div>;

  return (
    <motion.div 
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-12 italic"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8">
         <div className="space-y-3">
            <h2 className="text-5xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">QUẢN LÝ <span className="text-red-600">KHO HÀNG</span></h2>
            <p className="text-slate-400 font-medium italic text-lg leading-none capitalize">Danh sách sản phẩm uMobi đang kinh doanh.</p>
         </div>
         <button 
           onClick={() => setIsAdding(true)}
           className="px-10 py-5 bg-red-600 text-white font-black uppercase tracking-[0.2em] text-[10px] rounded-2xl hover:bg-slate-900 transition-all flex items-center gap-4 shadow-2xl shadow-red-100 italic"
         >
           <Plus size={20} /> THÊM SẢN PHẨM MỚI
         </button>
      </div>

      <div className="bg-white rounded-[3rem] overflow-hidden border border-slate-100 shadow-xl shadow-slate-100">
         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead className="bg-[#f4f4f4] border-b border-slate-100 font-black text-[10px] uppercase tracking-[0.2em] text-slate-400 italic">
                  <tr>
                    <th className="px-10 py-8">Sản phẩm</th>
                    <th className="px-10 py-8">Danh mục</th>
                    <th className="px-10 py-8">Giá uMobi</th>
                    <th className="px-10 py-8 text-right">Hành động</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50">
                  {products.map(p => (
                    <tr key={p.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-10 py-8">
                        <div className="flex items-center gap-6">
                           <div className="w-16 h-16 bg-white rounded-2xl p-3 shrink-0 border border-slate-100 group-hover:scale-110 transition-transform">
                              <img src={p.image} alt={p.name} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                           </div>
                           <div className="font-black text-slate-800 italic uppercase underline decoration-transparent group-hover:decoration-red-600 transition-all transition-all underline-offset-4 decoration-2">{p.name}</div>
                        </div>
                      </td>
                      <td className="px-10 py-8">
                         <span className="px-4 py-2 bg-slate-900 text-white text-[9px] font-black rounded-xl uppercase tracking-widest italic">{p.category}</span>
                      </td>
                      <td className="px-10 py-8 font-black text-red-600 text-xl italic tracking-tighter">
                        {new Intl.NumberFormat('vi-VN').format(p.price)}đ
                      </td>
                      <td className="px-10 py-8 text-right">
                         <div className="flex justify-end gap-3 opacity-40 group-hover:opacity-100 transition-opacity">
                            <button 
                              onClick={() => setEditingProduct(p)}
                              className="w-12 h-12 bg-slate-100 hover:bg-black text-slate-600 hover:text-white rounded-2xl transition-all flex items-center justify-center"
                            >
                               <Edit3 size={20} />
                            </button>
                            <button 
                              onClick={() => handleDelete(p.id)}
                              className="w-12 h-12 bg-slate-100 hover:bg-red-600 text-slate-600 hover:text-white rounded-2xl transition-all flex items-center justify-center"
                            >
                               <Trash2 size={20} />
                            </button>
                         </div>
                      </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>

      <AnimatePresence>
        {(isAdding || editingProduct) && (
          <ProductForm 
            product={editingProduct || undefined} 
            onClose={() => {setIsAdding(false); setEditingProduct(null);}} 
            onRefresh={loadData}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function ProductForm({ product, onClose, onRefresh }: { product?: Product, onClose: () => void, onRefresh: () => void }) {
  const [formData, setFormData] = useState<Partial<Product>>(
    product || { 
      name: '', 
      price: 0, 
      oldPrice: 0, 
      category: 'iPhone', 
      image: '', 
      description: '', 
      featured: false,
      specs: { screen: '', cpu: '', ram: '', storage: '' }
    }
  );
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (product) {
        await updateProduct(product.id, formData);
      } else {
        await addProduct(formData as Omit<Product, 'id'>);
      }
      onRefresh();
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-md p-4 sm:p-20 flex items-center justify-center font-bold italic"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 50 }}
        className="bg-white rounded-[3.5rem] w-full max-w-5xl overflow-hidden flex flex-col max-h-full shadow-2xl"
      >
        <div className="flex justify-between items-center bg-white border-b border-slate-100 px-12 py-10">
           <div className="space-y-1">
              <h3 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">
                {product ? 'Chỉnh sửa' : 'Thêm mới'} <span className="text-red-600 not-italic">Sản phẩm</span>
              </h3>
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest italic">Cập nhật cơ sở dữ liệu uMobi Store</p>
           </div>
           <button onClick={onClose} className="w-14 h-14 bg-[#f4f4f4] hover:bg-red-600 text-slate-900 hover:text-white rounded-2xl transition-all flex items-center justify-center shadow-sm">
             <Plus size={32} className="rotate-45" />
           </button>
        </div>

        <form onSubmit={handleSubmit} className="p-12 overflow-y-auto space-y-10 custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
               <div className="space-y-3">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Tên model uMobi</label>
                 <input 
                   required
                   value={formData.name}
                   onChange={e => setFormData({...formData, name: e.target.value})}
                   className="w-full px-8 py-5 bg-[#f4f4f4] border-2 border-transparent rounded-[1.5rem] text-sm font-black focus:bg-white focus:border-red-600 transition-all outline-none italic placeholder:text-slate-300" 
                   placeholder="VD: IPHONE 15 PRO MAX LUXURY"
                 />
               </div>
               <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Giá bán (VND)</label>
                    <input 
                      required
                      type="number"
                      value={formData.price}
                      onChange={e => setFormData({...formData, price: Number(e.target.value)})}
                      className="w-full px-8 py-5 bg-[#f4f4f4] border-2 border-transparent rounded-[1.5rem] text-sm font-black focus:bg-white focus:border-red-600 transition-all outline-none italic" 
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Giá gạch (VND)</label>
                    <input 
                      type="number"
                      value={formData.oldPrice}
                      onChange={e => setFormData({...formData, oldPrice: Number(e.target.value)})}
                      className="w-full px-8 py-5 bg-[#f4f4f4] border-2 border-transparent rounded-[1.5rem] text-sm font-black focus:bg-white focus:border-red-600 transition-all outline-none italic" 
                    />
                  </div>
               </div>
               <div className="space-y-3">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Khu vực trưng bày</label>
                 <select 
                   value={formData.category}
                   onChange={e => setFormData({...formData, category: e.target.value})}
                   className="w-full px-8 py-5 bg-[#f4f4f4] border-2 border-transparent rounded-[1.5rem] text-sm font-black focus:bg-white focus:border-red-600 transition-all outline-none italic appearance-none cursor-pointer"
                 >
                   {CATEGORIES.filter(c => c !== 'Tất cả').map(c => <option key={c} value={c}>{c.toUpperCase()}</option>)}
                 </select>
               </div>
               <div className="space-y-3">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Định danh hình ảnh</label>
                 <div className="flex gap-6">
                    <input 
                      required
                      value={formData.image}
                      onChange={e => setFormData({...formData, image: e.target.value})}
                      className="flex-grow px-8 py-5 bg-[#f4f4f4] border-2 border-transparent rounded-[1.5rem] text-sm font-black focus:bg-white focus:border-red-600 transition-all outline-none italic placeholder:text-slate-300" 
                      placeholder="HTTPS://..."
                    />
                    <div className="w-20 h-20 bg-[#f4f4f4] rounded-[1.5rem] flex items-center justify-center text-slate-200 border-2 border-dashed shadow-inner shrink-0 overflow-hidden">
                      {formData.image ? <img src={formData.image} className="w-full h-full object-contain p-3 group-hover:scale-110 transition-transform" referrerPolicy="no-referrer" /> : <ImageIcon size={24} />}
                    </div>
                 </div>
               </div>
            </div>

            <div className="space-y-8">
               <div className="space-y-3">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Lời giới thiệu uMobi</label>
                 <textarea 
                   rows={3}
                   value={formData.description}
                   onChange={e => setFormData({...formData, description: e.target.value})}
                   className="w-full px-8 py-5 bg-[#f4f4f4] border-2 border-transparent rounded-[1.5rem] text-sm font-black focus:bg-white focus:border-red-600 transition-all outline-none resize-none italic" 
                   placeholder="Mời bạn viết vài dòng về siêu phẩm này..."
                 />
               </div>
               <div className="bg-[#f4f4f4] p-10 rounded-[2rem] space-y-6">
                  <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic ml-2">Phiếu thông số</h4>
                  <div className="grid grid-cols-2 gap-4">
                     {['screen', 'cpu', 'ram', 'storage'].map(key => (
                       <input 
                        key={key}
                        placeholder={key.toUpperCase()}
                        value={formData.specs?.[key as keyof typeof formData.specs] || ''}
                        onChange={e => setFormData({...formData, specs: {...formData.specs, [key]: e.target.value}})}
                        className="w-full px-6 py-4 bg-white rounded-xl text-[10px] font-black focus:ring-2 focus:ring-red-600 transition-all outline-none italic shadow-sm"
                       />
                     ))}
                  </div>
               </div>
               <label className="flex items-center gap-6 cursor-pointer group p-6 bg-red-50 rounded-[1.5rem] border-2 border-transparent hover:border-red-200 transition-all">
                 <input 
                  type="checkbox" 
                  checked={formData.featured} 
                  onChange={e => setFormData({...formData, featured: e.target.checked})}
                  className="w-8 h-8 rounded-xl text-red-600 focus:ring-red-600 border-red-200" 
                 />
                 <div className="flex flex-col">
                    <span className="text-[11px] font-black text-red-600 uppercase tracking-widest italic leading-none">HOT ITEM</span>
                    <span className="text-[10px] font-bold text-red-300 italic uppercase">Đưa lên trang chủ uMobi</span>
                 </div>
               </label>
            </div>
          </div>
          
          <button 
           disabled={saving}
           type="submit"
           className="w-full py-6 bg-slate-900 text-white font-black uppercase tracking-[0.3em] text-[10px] rounded-[2rem] hover:bg-red-600 transition-all flex items-center justify-center gap-4 shadow-2xl disabled:opacity-50 active:scale-95 duration-500 italic"
          >
            {saving ? <Loader2 className="animate-spin" size={24} /> : <><Plus size={24} /> CẬP NHẬT KHO DỮ LIỆU</>}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}

function AdminMessages() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const data = await getContactMessages();
      setMessages(data);
      setLoading(false);
    }
    loadData();
  }, []);

  if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-red-600" size={48} /></div>;

  return (
    <motion.div 
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-12 italic"
    >
      <div className="flex flex-col gap-3">
        <h2 className="text-5xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">THƯ PHẢN <span className="text-red-600">HỒI</span></h2>
        <p className="text-slate-400 font-medium italic text-lg leading-none capitalize">Yêu cầu hỗ trợ từ khách hàng uMobi.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {messages.map(m => (
          <div key={m.id} className="bg-white rounded-[3rem] p-12 space-y-10 flex flex-col justify-between group hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-700 border border-slate-100 shadow-sm relative overflow-hidden">
             <div className="space-y-8 relative z-10">
                <div className="flex justify-between items-center">
                   <div className="w-16 h-16 bg-[#f4f4f4] text-red-600 rounded-2xl group-hover:bg-red-600 group-hover:text-white transition-all flex items-center justify-center shadow-sm"><Mail size={28} /></div>
                   <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest italic bg-[#f4f4f4] px-4 py-2 rounded-full">{m.createdAt?.toDate().toLocaleDateString('vi-VN')}</div>
                </div>
                <div className="space-y-2">
                   <h4 className="text-2xl font-black text-slate-900 italic uppercase underline decoration-red-100 group-hover:decoration-red-600 transition-all decoration-8 underline-offset-[-2px] tracking-tighter leading-none">{m.name}</h4>
                   <div className="text-[10px] font-black text-slate-400 flex items-center gap-3 uppercase tracking-widest italic">
                      <User size={14} className="text-red-600" /> {m.email}
                   </div>
                </div>
                <p className="text-slate-500 text-lg font-bold italic leading-relaxed pt-2">"{m.message}"</p>
             </div>
             <button className="text-[11px] font-black text-red-600 uppercase tracking-widest group-hover:translate-x-3 transition-all flex items-center gap-4 italic z-10 relative">
                CẤP PHẢN HỒI <ChevronRight size={16} />
             </button>
             <div className="absolute -right-20 -top-20 w-64 h-64 bg-red-50/20 rounded-full blur-[80px] group-hover:bg-red-50/50 transition-all"></div>
          </div>
        ))}
      </div>

      {messages.length === 0 && (
        <div className="bg-white rounded-[3rem] p-32 text-center border-4 border-dashed border-[#f4f4f4]">
           <div className="w-24 h-24 bg-[#f4f4f4] rounded-full flex items-center justify-center mx-auto mb-10 text-slate-200">
              <MessageSquare size={48} />
           </div>
           <p className="text-slate-300 font-black uppercase tracking-[0.3em] italic text-2xl">HỘP THƯ TRỐNG</p>
        </div>
      )}
    </motion.div>
  );
}
