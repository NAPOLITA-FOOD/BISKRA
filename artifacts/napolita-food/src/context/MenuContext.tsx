import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from 'react';
import { MenuItem, menuCategories, menuItems as hardcodedItems } from '@/data/menuData';
import { fetchMenu, saveMenu } from '@/lib/jsonbin';

type MenuContextValue = {
  items:       MenuItem[];
  categories:  string[];
  loading:     boolean;
  saving:      boolean;
  error:       string | null;
  addItem:     (item: MenuItem) => Promise<void>;
  updateItem:  (item: MenuItem) => Promise<void>;
  deleteItem:  (id: string)     => Promise<void>;
  reorder:     (items: MenuItem[]) => Promise<void>;
};

const MenuContext = createContext<MenuContextValue | null>(null);

export function MenuProvider({ children }: { children: ReactNode }) {
  const [items,      setItems]      = useState<MenuItem[]>(hardcodedItems);
  const [categories, setCategories] = useState<string[]>(menuCategories);
  const [loading,    setLoading]    = useState(true);
  const [saving,     setSaving]     = useState(false);
  const [error,      setError]      = useState<string | null>(null);

  useEffect(() => {
    fetchMenu()
      .then(data => {
        setItems(data.items);
        setCategories(data.categories);
      })
      .catch(() => {
        // silently fall back to hardcoded data
      })
      .finally(() => setLoading(false));
  }, []);

  const persist = useCallback(
    async (nextItems: MenuItem[], nextCats?: string[]) => {
      setSaving(true);
      setError(null);
      try {
        await saveMenu({ items: nextItems, categories: nextCats ?? categories });
        setItems(nextItems);
        if (nextCats) setCategories(nextCats);
      } catch (e) {
        setError((e as Error).message);
        throw e;
      } finally {
        setSaving(false);
      }
    },
    [categories],
  );

  const addItem = useCallback(
    async (item: MenuItem) => {
      await persist([...items, item]);
    },
    [items, persist],
  );

  const updateItem = useCallback(
    async (updated: MenuItem) => {
      await persist(items.map(i => (i.id === updated.id ? updated : i)));
    },
    [items, persist],
  );

  const deleteItem = useCallback(
    async (id: string) => {
      await persist(items.filter(i => i.id !== id));
    },
    [items, persist],
  );

  const reorder = useCallback(
    async (next: MenuItem[]) => {
      await persist(next);
    },
    [persist],
  );

  return (
    <MenuContext.Provider
      value={{ items, categories, loading, saving, error, addItem, updateItem, deleteItem, reorder }}
    >
      {children}
    </MenuContext.Provider>
  );
}

export function useMenu() {
  const ctx = useContext(MenuContext);
  if (!ctx) throw new Error('useMenu must be used inside <MenuProvider>');
  return ctx;
}
