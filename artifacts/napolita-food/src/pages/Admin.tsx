import { useState } from 'react';
import { useMenu } from '@/context/MenuContext';
import { MenuItem, menuCategories } from '@/data/menuData';
import { motion, AnimatePresence } from 'framer-motion';
import ImageUploader from '@/components/ImageUploader';
import { LogOut, Plus, Pencil, Trash2 } from 'lucide-react';

// ─── password gate ────────────────────────────────────────────────────────────
const ADMIN_PASS  = import.meta.env.VITE_ADMIN_PASSWORD as string ?? 'napolita2024';
const SESSION_KEY = 'napolita_admin_auth';

// ─── blank template ───────────────────────────────────────────────────────────
const blank = (): Omit<MenuItem, 'id'> => ({
  name: '', nameAr: '', category: menuCategories[0], categoryAr: '',
  description: '', price: 0, hasSizes: false,
  image: 'https://res.cloudinary.com/lprhfwpu/image/upload/v1783497303/menu-margherita.jpg',
  popular: false,
});

function slugify(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

// ═══════════════════════════════════════════════════════════════════════════════
export default function Admin() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(SESSION_KEY) === '1');
  const [pw, setPw]         = useState('');
  const [pwErr, setPwErr]   = useState(false);

  function tryLogin() {
    if (pw === ADMIN_PASS) { sessionStorage.setItem(SESSION_KEY, '1'); setAuthed(true); }
    else setPwErr(true);
  }

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

  const displayed = items.filter(i =>
    i.category === activeTab &&
    (search === '' ||
      i.name.toLowerCase().includes(search.toLowerCase()) ||
      i.nameAr.includes(search))
  );

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

  const handleDelete = async (id: string) => {
    try {
      await deleteItem(id);
      setDeleteConfirm(null);
      showToast('Supprimé ✓');
    } catch { showToast('Erreur lors de la suppression', false); }
  };

  const selectCat = (cat: string) => {
    setActiveTab(cat);
    setShowAddForm(false);
    setEditingId(null);
    setSearch('');
  };

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white flex flex-col">

      {/* ── TOP BAR ─────────────────────────────────────────────────────────── */}
      <header className="border-b border-[#1e1e1e] px-4 py-3 flex items-center justify-between sticky top-0 bg-[#0e0e0e] z-40 gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <span className="font-serif text-[var(--red)] text-xs tracking-[0.25em] uppercase shrink-0">Napolita</span>
          <span className="text-[#333] hidden sm:inline">|</span>
          <span className="font-serif text-white text-xs sm:text-sm hidden sm:inline truncate">Admin</span>
        </div>
        <div className="flex items-center gap-2">
          {saving && <span className="text-xs text-[#888] animate-pulse hidden sm:inline">Sauvegarde…</span>}
          <button
            onClick={() => { setShowAddForm(true); setNewItem({ ...blank(), category: activeTab }); }}
            className="flex items-center gap-1.5 bg-[var(--red)] text-white px-3 py-2 text-xs font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors"
          >
            <Plus size={13} />
            <span className="hidden sm:inline">Ajouter</span>
            <span className="sm:hidden">New</span>
          </button>
          <button
            onClick={onLogout}
            className="flex items-center gap-1.5 border border-[#333] text-[#666] hover:text-white hover:border-white px-3 py-2 transition-colors"
            title="Déconnexion"
          >
            <LogOut size={13} />
            <span className="hidden sm:inline text-xs uppercase tracking-wider">Sortir</span>
          </button>
        </div>
      </header>

      {/* ── ERROR ───────────────────────────────────────────────────────────── */}
      {error && (
        <div className="bg-red-900/40 border-b border-red-700 px-4 py-2 text-xs text-red-300">{error}</div>
      )}

      {/* ── BODY ────────────────────────────────────────────────────────────── */}
      <div className="flex flex-1 min-h-0 overflow-hidden">

        {/* ── SIDEBAR (desktop only) ──────────────────────────────────────── */}
        <aside className="hidden md:flex md:flex-col w-48 shrink-0 border-r border-[#1e1e1e] overflow-y-auto">
          {categories.map(cat => {
            const count = items.filter(i => i.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => selectCat(cat)}
                className={`w-full text-left px-4 py-3 text-[11px] font-bold uppercase tracking-widest flex items-center justify-between transition-colors ${
                  activeTab === cat
                    ? 'bg-[var(--red)] text-white'
                    : 'text-[#555] hover:text-white hover:bg-[#161616]'
                }`}
              >
                <span className="truncate pr-1">{cat}</span>
                <span className={`text-[10px] shrink-0 ${activeTab === cat ? 'text-white/70' : 'text-[#444]'}`}>{count}</span>
              </button>
            );
          })}
        </aside>

        {/* ── MAIN ────────────────────────────────────────────────────────── */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

          {/* ── MOBILE CATEGORIES (horizontal scroll) ───────────────────── */}
          <div className="md:hidden flex overflow-x-auto border-b border-[#1e1e1e] bg-[#0e0e0e] sticky top-[49px] z-30 no-scrollbar">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => selectCat(cat)}
                className={`shrink-0 px-4 py-2.5 text-[10px] font-bold uppercase tracking-wider whitespace-nowrap transition-colors border-b-2 ${
                  activeTab === cat
                    ? 'border-[var(--red)] text-white'
                    : 'border-transparent text-[#555]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* ── SCROLLABLE CONTENT ──────────────────────────────────────── */}
          <div className="flex-1 overflow-y-auto">

            {/* search + title row */}
            <div className="px-4 pt-4 pb-3 flex flex-wrap items-center gap-2">
              <h2 className="font-serif text-base sm:text-lg text-white shrink-0">{activeTab}</h2>
              <div className="flex-1 min-w-[120px] max-w-xs">
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Rechercher…"
                  className="w-full bg-[#161616] border border-[#2a2a2a] text-white text-xs px-3 py-2 outline-none focus:border-[#444] transition-colors"
                />
              </div>
              <span className="text-xs text-[#555] shrink-0">{displayed.length} item{displayed.length !== 1 ? 's' : ''}</span>
            </div>

            {loading && (
              <div className="px-4 py-12 text-center text-[#555] text-sm">Chargement…</div>
            )}

            {/* ── ADD FORM ────────────────────────────────────────────── */}
            <AnimatePresence>
              {showAddForm && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="mx-4 mb-4 border border-[var(--red)]/40 bg-[#161616] p-4">
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

            {/* ── ITEMS LIST ──────────────────────────────────────────── */}
            {!loading && (
              <div className="px-4 pb-10 flex flex-col gap-2">
                {displayed.length === 0 && (
                  <p className="text-[#444] text-sm py-8 text-center">Aucun produit dans cette catégorie.</p>
                )}

                {displayed.map(item => (
                  <div key={item.id}>
                    {editingId === item.id && editDraft ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="border border-[var(--gold)]/30 bg-[#161616] p-4"
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
                      /* ── ITEM ROW ─────────────────────────────────── */
                      <div className="flex items-start gap-3 bg-[#111] border border-[#1e1e1e] px-3 py-3 transition-colors group hover:border-[#2e2e2e]">

                        {/* thumbnail */}
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-11 h-11 sm:w-12 sm:h-12 object-cover shrink-0 opacity-80"
                          onError={e => { (e.target as HTMLImageElement).src = 'https://res.cloudinary.com/lprhfwpu/image/upload/v1783497303/menu-margherita.jpg'; }}
                        />

                        {/* info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <span className="font-serif text-white text-sm leading-tight">{item.name}</span>
                                {item.nameAr && <span className="text-[#555] text-xs">/ {item.nameAr}</span>}
                              </div>
                              <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                                {item.popular && (
                                  <span className="bg-[var(--red)] text-white text-[9px] font-bold px-1.5 py-0.5 uppercase">Popular</span>
                                )}
                                {item.hasSizes && (
                                  <span className="border border-[#333] text-[#666] text-[9px] px-1.5 py-0.5 uppercase">S/M/L</span>
                                )}
                              </div>
                            </div>
                            {/* price (right aligned) */}
                            <div className="shrink-0 text-right">
                              <div className="font-serif text-[var(--gold)] text-sm whitespace-nowrap">
                                {item.price.toLocaleString()} DA
                              </div>
                              {item.hasSizes && (
                                <div className="text-[#555] text-[10px] font-sans">
                                  {item.priceM?.toLocaleString()} / {item.priceL?.toLocaleString()}
                                </div>
                              )}
                            </div>
                          </div>

                          {/* actions — always visible on mobile, hover on desktop */}
                          <div className="flex items-center gap-2 mt-2 md:mt-1 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => { setEditingId(item.id); setEditDraft({ ...item }); setShowAddForm(false); }}
                              className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider border border-[#333] text-[#888] hover:border-white hover:text-white active:border-white active:text-white transition-colors"
                            >
                              <Pencil size={11} />
                              <span>Modifier</span>
                            </button>
                            <button
                              onClick={() => setDeleteConfirm(item.id)}
                              className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider border border-[#333] text-[#888] hover:border-red-500 hover:text-red-400 active:border-red-500 active:text-red-400 transition-colors"
                            >
                              <Trash2 size={11} />
                              <span>Suppr.</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── DELETE CONFIRM ──────────────────────────────────────────────────── */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-50 flex items-end sm:items-center justify-center"
            onClick={() => setDeleteConfirm(null)}
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              className="bg-[#161616] border border-[#2a2a2a] p-6 sm:p-8 w-full sm:max-w-sm sm:mx-4 rounded-t-xl sm:rounded-none"
              onClick={e => e.stopPropagation()}
            >
              <h3 className="font-serif text-white text-lg mb-2">Supprimer ce produit ?</h3>
              <p className="text-[#666] text-sm mb-6">
                <span className="text-white">{items.find(i => i.id === deleteConfirm)?.name}</span> — cette action est irréversible.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => handleDelete(deleteConfirm)}
                  disabled={saving}
                  className="flex-1 bg-red-700 hover:bg-red-600 text-white py-3 text-xs font-bold uppercase tracking-wider transition-colors disabled:opacity-50"
                >
                  {saving ? 'Suppression…' : 'Confirmer'}
                </button>
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 border border-[#333] text-[#888] hover:text-white hover:border-white py-3 text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  Annuler
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── TOAST ───────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={`fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:w-auto px-5 py-3 text-sm font-sans z-50 text-center sm:text-left ${
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

      {/* Nom FR / AR */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field label="Nom (FR)" required>
          <input value={value.name} onChange={e => set('name', e.target.value)} className={inp()} placeholder="ex: Margherita" />
        </Field>
        <Field label="Nom (AR)">
          <input value={value.nameAr} onChange={e => set('nameAr', e.target.value)} className={`${inp()} text-right`} dir="rtl" placeholder="مارقوريت" />
        </Field>
      </div>

      {/* Catégorie FR / AR */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field label="Catégorie" required>
          <select value={value.category} onChange={e => set('category', e.target.value)} className={inp()}>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </Field>
        <Field label="Catégorie (AR)">
          <input value={value.categoryAr} onChange={e => set('categoryAr', e.target.value)} className={`${inp()} text-right`} dir="rtl" placeholder="بيتزا" />
        </Field>
      </div>

      {/* Description */}
      <Field label="Description">
        <input value={value.description} onChange={e => set('description', e.target.value)} className={inp()} placeholder="Ingrédients…" />
      </Field>

      {/* Checkboxes — AVANT les prix pour voir S/M/L avant de les remplir */}
      <div className="flex gap-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={value.hasSizes} onChange={e => set('hasSizes', e.target.checked)} className="accent-[var(--red)] w-4 h-4" />
          <span className="text-xs text-[#888] uppercase tracking-wider">Tailles S/M/L</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={value.popular ?? false} onChange={e => set('popular', e.target.checked)} className="accent-[var(--red)] w-4 h-4" />
          <span className="text-xs text-[#888] uppercase tracking-wider">Popular</span>
        </label>
      </div>

      {/* Prix */}
      <div className={`grid gap-3 ${value.hasSizes ? 'grid-cols-3' : 'grid-cols-1 sm:grid-cols-2'}`}>
        <Field label={value.hasSizes ? 'Prix S (DA)' : 'Prix (DA)'} required>
          <input type="number" inputMode="numeric" min={0} value={value.price || ''} onChange={e => set('price', Number(e.target.value))} className={inp()} />
        </Field>
        {value.hasSizes && (
          <>
            <Field label="Prix M (DA)">
              <input type="number" inputMode="numeric" min={0} value={value.priceM ?? ''} onChange={e => set('priceM', Number(e.target.value))} className={inp()} />
            </Field>
            <Field label="Prix L (DA)">
              <input type="number" inputMode="numeric" min={0} value={value.priceL ?? ''} onChange={e => set('priceL', Number(e.target.value))} className={inp()} />
            </Field>
          </>
        )}
      </div>

      {/* Image */}
      <Field label="Image">
        <ImageUploader value={value.image} onChange={url => set('image', url)} />
      </Field>

      {/* Actions */}
      <div className="flex gap-3 pt-1">
        <button
          onClick={onSave}
          disabled={saving}
          className="flex-1 sm:flex-none px-6 py-3 bg-[var(--red)] text-white text-xs font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors disabled:opacity-50"
        >
          {saving ? 'Sauvegarde…' : isNew ? 'Ajouter' : 'Enregistrer'}
        </button>
        <button
          onClick={onCancel}
          className="flex-1 sm:flex-none px-6 py-3 border border-[#333] text-[#666] text-xs font-bold uppercase tracking-wider hover:text-white hover:border-white transition-colors"
        >
          Annuler
        </button>
      </div>
    </div>
  );
}

const inp = () =>
  'w-full bg-[#0e0e0e] border border-[#2a2a2a] text-white text-xs px-3 py-2.5 outline-none focus:border-[#555] transition-colors';

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
