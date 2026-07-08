import { useRef, useState, DragEvent, ChangeEvent } from 'react';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { Upload, X, Loader2 } from 'lucide-react';

type Props = {
  value:    string;
  onChange: (url: string) => void;
};

export default function ImageUploader({ value, onChange }: Props) {
  const inputRef            = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error,     setError]     = useState<string | null>(null);
  const [dragging,  setDragging]  = useState(false);

  const handle = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('الملف ليس صورة');
      return;
    }
    setError(null);
    setUploading(true);
    try {
      const result = await uploadToCloudinary(file);
      onChange(result.secure_url);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setUploading(false);
    }
  };

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handle(file);
    e.target.value = '';
  };

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handle(file);
  };

  return (
    <div className="space-y-2">
      {/* drop zone / trigger */}
      <div
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        onClick={() => !uploading && inputRef.current?.click()}
        className={`relative flex items-center gap-3 px-4 py-3 border cursor-pointer transition-colors ${
          dragging
            ? 'border-white bg-[#1e1e1e]'
            : 'border-[#2a2a2a] bg-[#0e0e0e] hover:border-[#555]'
        } ${uploading ? 'cursor-not-allowed opacity-60' : ''}`}
      >
        {/* thumbnail */}
        {value ? (
          <img
            src={value}
            alt="preview"
            className="w-12 h-12 object-cover shrink-0 border border-[#2a2a2a]"
            onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
        ) : (
          <div className="w-12 h-12 shrink-0 bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center text-[#444]">
            <Upload size={18} />
          </div>
        )}

        <div className="flex-1 min-w-0">
          {uploading ? (
            <div className="flex items-center gap-2 text-[#888] text-xs">
              <Loader2 size={13} className="animate-spin" />
              <span>Téléchargement en cours…</span>
            </div>
          ) : value ? (
            <>
              <p className="text-white text-xs truncate">{value.split('/').pop()}</p>
              <p className="text-[#555] text-[10px] mt-0.5">Cliquer pour changer · Glisser-déposer</p>
            </>
          ) : (
            <>
              <p className="text-[#888] text-xs">Choisir une image depuis l'appareil</p>
              <p className="text-[#555] text-[10px] mt-0.5">JPG, PNG, WEBP · Glisser-déposer accepté</p>
            </>
          )}
        </div>

        {/* clear button */}
        {value && !uploading && (
          <button
            type="button"
            onClick={e => { e.stopPropagation(); onChange(''); }}
            className="shrink-0 text-[#555] hover:text-white transition-colors"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* url fallback input */}
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="أو أدخل رابط الصورة مباشرة…"
        className="w-full bg-[#0e0e0e] border border-[#2a2a2a] text-[#888] text-[11px] px-3 py-2 outline-none focus:border-[#555] transition-colors placeholder:text-[#444]"
      />

      {error && <p className="text-red-400 text-[11px]">{error}</p>}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onFileChange}
      />
    </div>
  );
}
