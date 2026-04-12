import { create } from 'zustand';
import { supabase } from '@/lib/supabase';
import { Product, products as defaultProducts } from '@/data/products';

interface ProductsStore {
  products: Product[];
  initialized: boolean;
  loading: boolean;
  init: () => Promise<void>;
  addProduct: (product: Omit<Product, 'id'>) => Promise<void>;
  updateProduct: (id: string, product: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  resetToDefault: () => void;
}

// Mapeia produto do Supabase para o formato local
const mapSupabaseProduct = (p: Record<string, unknown>): Product => ({
  id: String(p.id),
  name: String(p.name),
  description: String(p.description ?? ''),
  price: Number(p.price),
  image: String(p.image ?? ''),
  category: (p.category as 'utilidades' | 'doces') ?? 'doces',
  badge: p.badge ? String(p.badge) : undefined,
  featured: Boolean(p.featured),
});

export const useProducts = create<ProductsStore>()((set, get) => ({
  products: defaultProducts,
  initialized: false,
  loading: false,

  init: async () => {
    if (get().initialized) return;
    set({ loading: true });
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: true });

      if (error || !data || data.length === 0) {
        // Fallback para produtos locais se Supabase falhar
        set({ products: defaultProducts, initialized: true, loading: false });
        return;
      }
      set({ products: data.map(mapSupabaseProduct), initialized: true, loading: false });
    } catch {
      set({ products: defaultProducts, initialized: true, loading: false });
    }
  },

  addProduct: async (productData) => {
    const { data, error } = await supabase
      .from('products')
      .insert([{
        name: productData.name,
        description: productData.description,
        price: productData.price,
        image: productData.image,
        category: productData.category,
        badge: productData.badge ?? null,
        featured: productData.featured ?? false,
      }])
      .select()
      .single();

    if (!error && data) {
      set(state => ({ products: [...state.products, mapSupabaseProduct(data)] }));
    }
  },

  updateProduct: async (id, productData) => {
    const { error } = await supabase
      .from('products')
      .update({
        ...(productData.name && { name: productData.name }),
        ...(productData.description && { description: productData.description }),
        ...(productData.price !== undefined && { price: productData.price }),
        ...(productData.image && { image: productData.image }),
        ...(productData.category && { category: productData.category }),
        ...(productData.badge !== undefined && { badge: productData.badge ?? null }),
        ...(productData.featured !== undefined && { featured: productData.featured }),
      })
      .eq('id', id);

    if (!error) {
      set(state => ({
        products: state.products.map(p => p.id === id ? { ...p, ...productData } : p),
      }));
    }
  },

  deleteProduct: async (id) => {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (!error) {
      set(state => ({ products: state.products.filter(p => p.id !== id) }));
    }
  },

  resetToDefault: () => {
    set({ products: defaultProducts });
  },
}));
