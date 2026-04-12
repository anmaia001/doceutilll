import { create } from 'zustand';
import { supabase } from '@/lib/supabase';

export type InteractionType =
  | 'oferta'
  | 'pos_venda'
  | 'pedido'
  | 'reclamacao'
  | 'sugestao'
  | 'outro';

export const INTERACTION_LABELS: Record<InteractionType, string> = {
  oferta: '🎯 Oferta de Produto',
  pos_venda: '✅ Pós Venda',
  pedido: '🛒 Pedido Realizado',
  reclamacao: '⚠️ Reclamação',
  sugestao: '💡 Sugestão',
  outro: '💬 Outro',
};

export interface Interaction {
  id: string;
  type: InteractionType;
  date: string;
  note: string;
  products?: string;
  value?: number;
  followUp?: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  address?: string;
  city?: string;
  email?: string;
  note?: string;
  createdAt: string;
  interactions: Interaction[];
}

// Mapeia order do Supabase para Customer local
const mapOrderToCustomer = (order: Record<string, unknown>): Customer => ({
  id: String(order.id),
  name: String(order.customer_name ?? ''),
  phone: String(order.customer_phone ?? ''),
  address: order.customer_address ? `${order.customer_address}, ${order.customer_neighborhood ?? ''}, ${order.customer_city ?? ''}` : '',
  city: String(order.customer_city ?? ''),
  email: '',
  note: order.customer_observations ? String(order.customer_observations) : '',
  createdAt: String(order.created_at ?? new Date().toISOString()),
  interactions: [{
    id: `i_${order.id}`,
    type: 'pedido' as InteractionType,
    date: String(order.created_at ?? new Date().toISOString()),
    note: `Pedido via site. Status: ${order.status}. Pagamento: ${order.payment_method}`,
    value: Number(order.total ?? 0),
  }],
});

interface CustomersStore {
  customers: Customer[];
  loading: boolean;
  initialized: boolean;
  loadCustomers: () => Promise<void>;
  addCustomer: (data: Omit<Customer, 'id' | 'createdAt' | 'interactions'>) => string;
  updateCustomer: (id: string, data: Partial<Omit<Customer, 'id' | 'interactions'>>) => void;
  deleteCustomer: (id: string) => void;
  addInteraction: (customerId: string, data: Omit<Interaction, 'id'>) => void;
  updateInteraction: (customerId: string, interactionId: string, data: Partial<Omit<Interaction, 'id'>>) => void;
  deleteInteraction: (customerId: string, interactionId: string) => void;
}

export const useCustomers = create<CustomersStore>()((set, get) => ({
  customers: [],
  loading: false,
  initialized: false,

  loadCustomers: async () => {
    if (get().initialized) return;
    set({ loading: true });
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        set({ customers: data.map(mapOrderToCustomer), initialized: true, loading: false });
      } else {
        set({ initialized: true, loading: false });
      }
    } catch {
      set({ initialized: true, loading: false });
    }
  },

  addCustomer: (data) => {
    const id = `c_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    const newCustomer: Customer = {
      id,
      ...data,
      createdAt: new Date().toISOString(),
      interactions: [],
    };
    set(state => ({ customers: [...state.customers, newCustomer] }));
    return id;
  },

  updateCustomer: (id, data) => {
    set(state => ({
      customers: state.customers.map(c => c.id === id ? { ...c, ...data } : c),
    }));
  },

  deleteCustomer: (id) => {
    set(state => ({ customers: state.customers.filter(c => c.id !== id) }));
  },

  addInteraction: (customerId, data) => {
    const id = `i_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    set(state => ({
      customers: state.customers.map(c =>
        c.id === customerId
          ? { ...c, interactions: [{ id, ...data }, ...c.interactions] }
          : c
      ),
    }));
  },

  updateInteraction: (customerId, interactionId, data) => {
    set(state => ({
      customers: state.customers.map(c =>
        c.id === customerId
          ? { ...c, interactions: c.interactions.map(i => i.id === interactionId ? { ...i, ...data } : i) }
          : c
      ),
    }));
  },

  deleteInteraction: (customerId, interactionId) => {
    set(state => ({
      customers: state.customers.map(c =>
        c.id === customerId
          ? { ...c, interactions: c.interactions.filter(i => i.id !== interactionId) }
          : c
      ),
    }));
  },
}));
