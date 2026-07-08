import { useState } from 'react';
import { useMenu } from '@/context/MenuContext';
import { MenuItem, menuCategories } from '@/data/menuData';
import { motion, AnimatePresence } from 'framer-motion';
import ImageUploader from '@/components/ImageUploader';

// ─── simple session-based password gate ──────────────────────────────────────
// Password is read from the VITE_ADMIN_PASSWORD env var (set in Replit Secrets).
// Note: all VITE_* values are bundled into client JS — this gate deters casual
// access but is not a cryptographic security boundary. For a true secure admin,
// add a server-side proxy that validates credentials before proxying JSONbin writes.
const ADMIN_PASS  = import.meta.env.VITE_ADMIN_PASSWORD as string ?? 'napolita2024';
const SESSION_KEY = 'napolita_admin_auth';

// ─── blank item template ──────────────────────────────────────────────────────
const blank = (): Omit<MenuItem, 'id'> => ({
  name: '', nameAr: '', category: menuCategories[0], categoryAr: '',
  description: '', price: 0, hasSizes: false,
  image: 'https://res.cloudinary.com/lprhfwpu/image/upload/v1783497303/menu-margherita.jpg',
  popular: false,
});

// ─── helpers ──────────────────────────────────────────────────────────────────
function slugify(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

// ═══════════════════════════════════════════════════════════════════════════════
export default function Admin() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(SESSION_KEY) === '1');
  const [pw, setPw]         = useState('');
  const [pwErr, setPwErr]   = useState(false);

  if (!authed) {
    return (
      <div className="min-h-screen bg-[#0e0e0e] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm bg-[#161616] border border-[#2a2a2a] p-8"
        >
          <div className="text-center mb-8">
            <p className="font-serif text-[var(--red)] text-xs tracking-[0.3em] uppercase mb-2">Napolita Food</p>
            <h1 className="font-serif text-2xl text-white">Admin Dashboard</h1>
          </div>
          <label className="block text-xs text-[#666] uppercase tracking-widest mb-2">Mot de passe</label>
          <input
            type="password"
            value={pw}
            onChange={e => { setPw(e.target.value); setPwErr(false); }}
            onKeyDown={e => e.key === 'Enter' && tryLogin()}
            className={`w-full bg-[#1e1e1e] border ${pwErr ? 'border-red-500' : 'border-[#333]'} text-white px-4 py-3 text-sm outline-none focus:border-[var(--red)] transition-colors mb-1`}
            placeholder="••••••••"
            autoFocus
          />
          {pwErr && <p className="text-red-500 text-xs mb-3">Mot de passe incorrect</p>}
          <button
            onClick={tryLogin}
            className="w-full mt-4 bg-[var(--red)] text-white py-3 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
          >
            Connexion
          </button>
        </motion.div>
      </div>
    );
  }

  function tryLogin() {
    if (pw === ADMIN_PASS) { sessionStorage.setItem(SESSION_KEY, '1'); setAuthed(true); }
    else setPwErr(true);
  }

  return <AdminDashboard onLogout={() => { sessionStorage.removeItem(SESSION_KEY); setAuthed(false); }} />;
}

// ═══════════════════════════════════════════════════════════════════════════════
function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const { items, categories, loading, saving, error, addItem, updateItem, deleteItem } = useMenu();

  const [activeTab,     setActiveTab]     = useState(categories[0] ?? menuCategories[0]);
  const [showAddForm,   setShowAddForm]   = useState(false);
  const [editingId,     setEditingId]     = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [toast,         setToast]         = useState<{ msg: string; ok: boolean } | null>(null);
  const [newItem,       setNewItem]       = useState<Omit<MenuItem, 'id'>>(blank());
  const [editDraft,     setEditDraft]     = useState<MenuItem | null>(null);
  const [search,        setSearch]        = useState('');

  const showToast = (msg: string, ok = true) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3000);
  };

  // filtered items in active category
  const displayed = items.filter(i =>
    i.category === activeTab &&
    (search === '' ||
      i.name.toLowerCase().includes(search.toLowerCase()) ||
      i.nameAr.includes(search))
  );

  // ── ADD ────────────────────────────────────────────────────────────────────
  const handleAdd = async () => {
    if (!newItem.name.trim()) return showToast('Le nom est obligatoire', false);
    if (newItem.price <= 0)   return showToast('Le prix doit être > 0', false);
    const id = slugify(newItem.category + '-' + newItem.name) + '-' + Date.now().toString(36);
    try {
      await addItem({ ...newItem, id });
      setNewItem(blank());
      setShowAddForm(false);
      showToast('Produit ajouté ✓');
    } catch { showToast('Erreur lors de la sauvegarde', false); }
  };

  // ── SAVE EDIT ──────────────────────────────────────────────────────────────
  const handleSaveEdit = async () => {
    if (!editDraft) return;
    if (!editDraft.name.trim()) return showToast('Le nom est obligatoire', false);
    try {
      await updateItem(editDraft);
      setEditingId(null);
      setEditDraft(null);
      showToast('Modifié ✓');
    } catch { showToast('Erreur lors de la sauvegarde', false); }
  };

  // ── DELETE ─────────────────────────────────────────────────────────────────
  const handleDelete = async (id: string) => {
    try {
      await deleteItem(id);
      setDeleteConfirm(null);
      showToast('Supprimé ✓');
    } catch { showToast('Erreur lors de la suppression', false); }
  };

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white">

      {/* ── top bar ─────────────────────────────────────────────────────────── */}
      <header className="border-b border-[#1e1e1e] px-6 py-4 flex items-center justify-between sticky top-0 bg-[#0e0e0e] z-40">
        <div className="flex items-center gap-4">
          <span className="font-serif text-[var(--red)] text-xs tracking-[0.3em] uppercase">Napolita</span>
          <span className="text-[#333]">|</span>
          <span className="font-serif text-white text-sm">Admin Dashboard</span>
        </div>
        <div className="flex items-center gap-4">
          {saving && <span className="text-xs text-[#888] animate-pulse">Sauvegarde…</span>}
          <button
            onClick={() => { setShowAddForm(true); setNewItem({ ...blank(), category: activeTab }); }}
            className="bg-[var(--red)] text-white px-4 py-2 text-xs font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors"
          >
            + Ajouter
          </button>
          <button onClick={onLogout} className="text-[#555] hover:text-white text-xs uppercase tracking-wider transition-colors">
            Déconnexion
          </button>
        </div>
      </header>

      {/* ── error banner ────────────────────────────────────────────────────── */}
      {error && (
        <div className="bg-red-900/40 border-b border-red-700 px-6 py-2 text-xs text-red-300">{error}</div>
      )}

      <div className="flex h-[calc(100vh-57px)]">

        {/* ── sidebar: categories ─────────────────────────────────────────── */}
        <aside className="w-48 shrink-0 border-r border-[#1e1e1e] overflow-y-auto">
          {categories.map(cat => {
            const count = items.filter(i => i.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => { setActiveTab(cat); setShowAddForm(false); setEditingId(null); setSearch(''); }}
                className={`w-full text-left px-4 py-3 text-[11px] font-bold uppercase tracking-widest flex items-center justify-between transition-colors ${
                  activeTab === cat
                    ? 'bg-[var(--red)] text-white'
                    : 'text-[#555] hover:text-white hover:bg-[#161616]'
                }`}
              >
                <span className="truncate">{cat}</span>
                <span className={`text-[10px] ${activeTab === cat ? 'text-white/70' : 'text-[#444]'}`}>{count}</span>
              </button>
            );
          })}
        </aside>

        {/* ── main content ────────────────────────────────────────────────── */}
        <main className="flex-1 overflow-y-auto">

          {/* search bar */}
          <div className="px-6 pt-5 pb-3 flex items-center gap-3">
            <h2 className="font-serif text-lg text-white shrink-0">{activeTab}</h2>
            <div className="flex-1 max-w-xs">
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Rechercher…"
                className="w-full bg-[#161616] border border-[#2a2a2a] text-white text-xs px-3 py-2 outline-none focus:border-[#444] transition-colors"
              />
            </div>
            <span className="text-xs text-[#555]">{displayed.length} produit{displayed.length !== 1 ? 's' : ''}</span>
          </div>

          {/* loading */}
          {loading && (
            <div className="px-6 py-12 text-center text-[#555] text-sm">Chargement…</div>
          )}

          {/* ── add form ──────────────────────────────────────────────────── */}
          <AnimatePresence>
            {showAddForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="mx-6 mb-4 border border-[var(--red)]/40 bg-[#161616] p-5">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--red)] mb-4">Nouveau produit</h3>
                  <ItemForm
                    value={newItem}
                    onChange={setNewItem}
                    categories={categories}
                    onSave={handleAdd}
                    onCancel={() => setShowAddForm(false)}
                    saving={saving}
                    isNew
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── items table ───────────────────────────────────────────────── */}
          {!loading && (
            <div className="px-6 pb-10">
              {displayed.length === 0 && (
                <p className="text-[#444] text-sm py-8 text-center">Aucun produit dans cette catégorie.</p>
              )}
              <div className="flex flex-col gap-2">
                {displayed.map(item => (
                  <div key={item.id}>
                    {editingId === item.id && editDraft ? (
                      /* ── edit mode ── */
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="border border-[var(--gold)]/30 bg-[#161616] p-5"
                      >
                        <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--gold)] mb-4">Modifier</h3>
                        <ItemForm
                          value={editDraft}
                          onChange={v => setEditDraft(v as MenuItem)}
                          categories={categories}
                          onSave={handleSaveEdit}
                          onCancel={() => { setEditingId(null); setEditDraft(null); }}
                          saving={saving}
                        />
                      </motion.div>
                    ) : (
                      /* ── display row ── */
                      <div className="group flex items-center gap-4 bg-[#111] border border-[#1e1e1e] hover:border-[#2e2e2e] px-4 py-3 transition-colors">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 object-cover shrink-0 opacity-80 group-hover:opacity-100 transition-opacity"
                          onError={e => { (e.target as HTMLImageElement).src = 'https://res.cloudinary.com/lprhfwpu/image/upload/v1783497303/menu-margherita.jpg'; }}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-serif text-white text-sm">{item.name}</span>
                            {item.nameAr && <span className="text-[#555] text-xs">/ {item.nameAr}</span>}
                            {item.popular && (
                              <span className="bg-[var(--red)] text-white text-[9px] font-bold px-1.5 py-0.5 uppercase tracking-wider">Popular</span>
                            )}
                            {item.hasSizes && (
                              <span className="border border-[#333] text-[#666] text-[9px] px-1.5 py-0.5 uppercase">Tailles</span>
                            )}
                          </div>
                          <p className="text-[#555] text-[11px] mt-0.5 line-clamp-1">{item.description}</p>
                        </div>
                        <div className="shrink-0 text-right">
                          <div className="font-serif text-[var(--gold)] text-sm whitespace-nowrap">
                            {item.price.toLocaleString()} DA
                            {item.hasSizes && <span className="text-[#555] text-xs ml-0.5 font-sans"> / {item.priceM?.toLocaleString()} / {item.priceL?.toLocaleString()}</span>}
                          </div>
                          <p className="text-[#444] text-[10px] mt-0.5 font-mono">{item.id}</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => { setEditingId(item.id); setEditDraft({ ...item }); setShowAddForm(false); }}
                            className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider border border-[#333] text-[#888] hover:border-white hover:text-white transition-colors"
                          >
                            Modifier
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(item.id)}
                            className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider border border-[#333] text-[#888] hover:border-red-500 hover:text-red-400 transition-colors"
                          >
                            Supprimer
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ── delete confirmation modal ──────────────────────────────────────── */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center px-4"
            onClick={() => setDeleteConfirm(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#161616] border border-[#2a2a2a] p-8 max-w-sm w-full"
              onClick={e => e.stopPropagation()}
            >
              <h3 className="font-serif text-white text-lg mb-2">Supprimer ce produit ?</h3>
              <p className="text-[#666] text-sm mb-6">
                {items.find(i => i.id === deleteConfirm)?.name} — cette action est irréversible.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => handleDelete(deleteConfirm)}
                  disabled={saving}
                  className="flex-1 bg-red-700 hover:bg-red-600 text-white py-2.5 text-xs font-bold uppercase tracking-wider transition-colors disabled:opacity-50"
                >
                  {saving ? 'Suppression…' : 'Confirmer'}
                </button>
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 border border-[#333] text-[#888] hover:text-white hover:border-white py-2.5 text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  Annuler
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── toast ─────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={`fixed bottom-6 right-6 px-5 py-3 text-sm font-sans z-50 ${
              toast.ok ? 'bg-green-800 text-green-100' : 'bg-red-900 text-red-100'
            }`}
          >
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// Reusable form (add + edit)
// ═══════════════════════════════════════════════════════════════════════════════
type FormValue = Omit<MenuItem, 'id'> | MenuItem;

function ItemForm({
  value, onChange, categories, onSave, onCancel, saving, isNew = false,
}: {
  value: FormValue;
  onChange: (v: FormValue) => void;
  categories: string[];
  onSave: () => void;
  onCancel: () => void;
  saving: boolean;
  isNew?: boolean;
}) {
  const set = (k: keyof FormValue, v: unknown) => onChange({ ...value, [k]: v } as FormValue);

  return (
    <div className="space-y-4">
      {/* row 1 */}
      <div className="grid grid-cols-2 gap-3">
        <Field label="Nom (FR)" required>
          <input value={value.name} onChange={e => set('name', e.target.value)} className={input()} placeholder="ex: Margherita" />
        </Field>
        <Field label="Nom (AR)">
          <input value={value.nameAr} onChange={e => set('nameAr', e.target.value)} className={`${input()} text-right`} dir="rtl" placeholder="مارقوريت" />
        </Field>
      </div>

      {/* row 2 */}
      <div className="grid grid-cols-2 gap-3">
        <Field label="Catégorie" required>
          <select value={value.category} onChange={e => set('category', e.target.value)} className={input()}>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </Field>
        <Field label="Catégorie (AR)">
          <input value={value.categoryAr} onChange={e => set('categoryAr', e.target.value)} className={`${input()} text-right`} dir="rtl" placeholder="بيتزا" />
        </Field>
      </div>

      {/* description */}
      <Field label="Description">
        <input value={value.description} onChange={e => set('description', e.target.value)} className={input()} placeholder="Ingredients…" />
      </Field>

      {/* prices */}
      <div className="grid grid-cols-3 gap-3">
        <Field label={value.hasSizes ? 'Prix S (DA)' : 'Prix (DA)'} required>
          <input type="number" min={0} value={value.price || ''} onChange={e => set('price', Number(e.target.value))} className={input()} />
        </Field>
        {value.hasSizes && (
          <>
            <Field label="Prix M (DA)">
              <input type="number" min={0} value={value.priceM ?? ''} onChange={e => set('priceM', Number(e.target.value))} className={input()} />
            </Field>
            <Field label="Prix L (DA)">
              <input type="number" min={0} value={value.priceL ?? ''} onChange={e => set('priceL', Number(e.target.value))} className={input()} />
            </Field>
          </>
        )}
      </div>

      {/* image */}
      <Field label="Image">
        <ImageUploader value={value.image} onChange={url => set('image', url)} />
      </Field>

      {/* checkboxes */}
      <div className="flex gap-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={value.hasSizes}
            onChange={e => set('hasSizes', e.target.checked)}
            className="accent-[var(--red)]"
          />
          <span className="text-xs text-[#888] uppercase tracking-wider">Tailles (S/M/L)</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={value.popular ?? false}
            onChange={e => set('popular', e.target.checked)}
            className="accent-[var(--red)]"
          />
          <span className="text-xs text-[#888] uppercase tracking-wider">Popular</span>
        </label>
      </div>

      {/* actions */}
      <div className="flex gap-3 pt-1">
        <button
          onClick={onSave}
          disabled={saving}
          className="px-6 py-2.5 bg-[var(--red)] text-white text-xs font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors disabled:opacity-50"
        >
          {saving ? 'Sauvegarde…' : isNew ? 'Ajouter' : 'Enregistrer'}
        </button>
        <button
          onClick={onCancel}
          className="px-6 py-2.5 border border-[#333] text-[#666] text-xs font-bold uppercase tracking-wider hover:text-white hover:border-white transition-colors"
        >
          Annuler
        </button>
      </div>
    </div>
  );
}

// small helpers
const input = () =>
  'w-full bg-[#0e0e0e] border border-[#2a2a2a] text-white text-xs px-3 py-2 outline-none focus:border-[#555] transition-colors';

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[10px] text-[#555] uppercase tracking-widest mb-1">
        {label}{required && <span className="text-[var(--red)] ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}
