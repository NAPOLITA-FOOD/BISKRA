import { MenuItem } from '@/data/menuData';

const API_KEY = import.meta.env.VITE_JSONBIN_API_KEY as string;
const BIN_ID  = import.meta.env.VITE_JSONBIN_BIN_ID  as string;
const BASE    = 'https://api.jsonbin.io/v3/b';

export type BinData = {
  items:      MenuItem[];
  categories: string[];
};

export async function fetchMenu(): Promise<BinData> {
  const res = await fetch(`${BASE}/${BIN_ID}/latest`, {
    headers: { 'X-Master-Key': API_KEY },
  });
  if (!res.ok) throw new Error(`JSONbin fetch failed: ${res.status}`);
  const json = await res.json();
  return json.record as BinData;
}

export async function saveMenu(data: BinData): Promise<void> {
  const res = await fetch(`${BASE}/${BIN_ID}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-Master-Key': API_KEY,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`JSONbin save failed: ${res.status}`);
}
