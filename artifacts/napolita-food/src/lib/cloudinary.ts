const CLOUD_NAME    = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME    as string;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET as string;

export type UploadResult = {
  secure_url: string;
  public_id:  string;
  width:      number;
  height:     number;
};

export async function uploadToCloudinary(file: File): Promise<UploadResult> {
  const form = new FormData();
  form.append('file',           file);
  form.append('upload_preset',  UPLOAD_PRESET);
  form.append('folder',         'napolita-food');

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    { method: 'POST', body: form },
  );

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { error?: { message?: string } }).error?.message ?? `Upload failed (${res.status})`);
  }

  return res.json() as Promise<UploadResult>;
}
