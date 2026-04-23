import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface Product {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  category: string;
  image: string;
  description: string;
  specs: Record<string, string>;
  featured?: boolean;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  image: string;
  date: string;
}

export const CATEGORIES = ['Tất cả', 'iPhone', 'Samsung', 'Oppo', 'Xiaomi', 'Phụ kiện'];

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro Max 256GB',
    price: 34990000,
    oldPrice: 36990000,
    category: 'iPhone',
    image: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=800&auto=format&fit=crop',
    description: 'iPhone 15 Pro Max là chiếc iPhone mạnh mẽ nhất từ trước đến nay với khung viền Titanium, chip A17 Pro siêu mạnh và hệ thống camera zoom quang học 5x.',
    specs: {
      'Màn hình': '6.7 inch, Super Retina XDR OLED',
      'Chip': 'Apple A17 Pro (3nm)',
      'RAM': '8GB',
      'Bộ nhớ': '256GB',
      'Camera': 'Chính 48MP & Phụ 12MP, 12MP',
      'Pin': '4,422 mAh',
    },
    featured: true,
  },
  {
    id: '2',
    name: 'Samsung Galaxy S24 Ultra',
    price: 31990000,
    oldPrice: 33990000,
    category: 'Samsung',
    image: 'https://images.unsplash.com/photo-1707166164295-e23fdfed7a5f?q=80&w=800&auto=format&fit=crop',
    description: 'Mở ra kỷ nguyên AI mới với Samsung Galaxy S24 Ultra. Bút S Pen tích hợp, camera 200MP và hiệu năng đỉnh cao.',
    specs: {
      'Màn hình': '6.8 inch, Dynamic AMOLED 2X',
      'Chip': 'Snapdragon 8 Gen 3 for Galaxy',
      'RAM': '12GB',
      'Bộ nhớ': '256GB',
      'Camera': 'Chính 200MP & Phụ 50MP, 12MP, 10MP',
      'Pin': '5,000 mAh',
    },
    featured: true,
  },
  {
    id: '3',
    name: 'Xiaomi 14 Ultra',
    price: 29990000,
    category: 'Xiaomi',
    image: 'https://images.unsplash.com/photo-1710313885172-e16279f0616b?q=80&w=800&auto=format&fit=crop',
    description: 'Hợp tác cùng Leica mang đến trải nghiệm nhiếp ảnh di động chuyên nghiệp trên Xiaomi 14 Ultra.',
    specs: {
      'Màn hình': '6.73 inch, LTPO AMOLED',
      'Chip': 'Snapdragon 8 Gen 3',
      'RAM': '16GB',
      'Bộ nhớ': '512GB',
      'Camera': '4 camera 50MP Leica',
      'Pin': '5,000 mAh',
    },
  },
  {
    id: '4',
    name: 'Oppo Find X7 Ultra',
    price: 25990000,
    category: 'Oppo',
    image: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?q=80&w=800&auto=format&fit=crop',
    description: 'Thiết kế sang trọng, camera Hasselblad cùng sạc siêu nhanh SuperVOOC.',
    specs: {
      'Màn hình': '6.82 inch, AMOLED',
      'Chip': 'Snapdragon 8 Gen 3',
      'RAM': '12GB',
      'Bộ nhớ': '256GB',
      'Camera': 'Chính 50MP & Phụ 50MP, 50MP, 50MP',
      'Pin': '5,000 mAh',
    },
  },
  {
    id: '5',
    name: 'AirPods Pro Gen 2',
    price: 5490000,
    oldPrice: 6190000,
    category: 'Phụ kiện',
    image: 'https://images.unsplash.com/photo-1588423770574-f199baae60ec?q=80&w=800&auto=format&fit=crop',
    description: 'Chống ồn chủ động vượt trội, âm thanh không gian cá nhân hóa.',
    specs: {
      'Kết nối': 'Bluetooth 5.3',
      'Kháng nước': 'IP54',
      'Pin': 'Lên đến 30h (kèm hộp)',
      'Sạc': 'USB-C / MagSafe',
    },
  },
  {
    id: '6',
    name: 'Samsung Galaxy Watch 6 Classic',
    price: 8490000,
    category: 'Phụ kiện',
    image: 'https://images.unsplash.com/photo-1508685096489-7abaf3415170?q=80&w=800&auto=format&fit=crop',
    description: 'Thiết kế cổ điển với vòng xoay bezel vật lý, theo dõi sức khỏe toàn diện.',
    specs: {
      'Màn hình': 'Sapphire Crystal AMOLED',
      'Chất liệu': 'Thép không gỉ',
      'Kích thước': '47mm',
      'Tính năng': 'Đo ECG, HA, BIA',
    },
  },
];

export const NEWS: NewsItem[] = [
  {
    id: '1',
    title: 'Đánh giá chi tiết iPhone 15 Pro Max sau 6 tháng sử dụng',
    summary: 'Liệu khung viền Titanium có thực sự bền bỉ như quảng cáo? Hãy cùng MobiStore tìm hiểu.',
    content: '...',
    image: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=800&auto=format&fit=crop',
    date: '2024-03-15',
  },
  {
    id: '2',
    title: 'Samsung Galaxy S24 Ultra vs iPhone 15 Pro Max: Cuộc đua AI',
    summary: 'So sánh chi tiết camera và tính năng AI trên hai siêu phẩm hàng đầu hiện nay.',
    content: '...',
    image: 'https://images.unsplash.com/photo-1707166164295-e23fdfed7a5f?q=80&w=800&auto=format&fit=crop',
    date: '2024-03-20',
  },
  {
    id: '3',
    title: 'Xu hướng smartphone 2024: Màn hình gập và AI lên ngôi',
    summary: 'Điểm qua những công nghệ đáng mong chờ sẽ xuất hiện trên điện thoại trong năm nay.',
    content: '...',
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=800&auto=format&fit=crop',
    date: '2024-03-25',
  },
];
