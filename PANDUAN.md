# Portofolio Andre Saputra — CV & Foto

## Perubahan
- Foto asli tampil sebagai avatar pada hero dan foto profil pada bagian About.
- Tombol Download CV pada hero, kartu CV di About, dan footer.
- Kartu Curriculum vitae membuka PDF di tab baru; tombol Download CV mengunduh file.
- Modal View Details berada di tengah pada desktop; di ponsel hampir memenuhi layar dengan margin 12 piksel.
- Isi modal dapat digulir, sementara header, tombol tutup, dan footer tetap terlihat.
- Warna, tipografi, panel transparan, dan kode animasi jaringan 3D dipertahankan.
- CV dan foto disertakan sebagai aset lokal, tanpa tautan penyimpanan eksternal.

## Langsung unggah ke hosting
Ekstrak ZIP, lalu unggah ISI folder out/ ke direktori utama hosting. Pastikan index.html berada di direktori utama, bersama folder _next/, images/, dan documents/. Folder out/ sudah berisi website hasil build.

## Menjalankan dan menyunting kode
Gunakan Node.js 22.18 atau lebih baru, buka terminal pada folder andresptr, kemudian jalankan:

```bash
npm ci
npm run dev
```

Buka http://localhost:3000. Untuk membangun ulang, jalankan npm run build. Hasil terbaru akan berada di out/.

## Menerapkan perbaikan modal ke proyek yang sudah dijalankan
Jika proyek versi sebelumnya sudah ada di komputer, Anda cukup menyalin dua file terbaru ini dari arsip ke folder proyek yang sama:
- src/app/globals.css
- src/components/ui/ProjectDialog.tsx

Kemudian jalankan kembali npm run dev untuk pengembangan, atau npm run build untuk menghasilkan folder out/ terbaru. Foto dan CV dari revisi sebelumnya tetap disertakan.

## Ikon tab browser (favicon)
Logo globe dan panah yang dikirim telah digunakan untuk ikon tab browser. Transparansi dan proporsi logo asli dipertahankan.

Untuk menerapkan perubahan ini ke folder proyek versi sebelumnya, salin file terbaru berikut:
- src/lib/metadata.ts
- public/favicon.ico
- public/favicon-32.png
- public/favicon.png
- public/apple-icon.png

Jalankan kembali npm run dev. Jika ikon lama masih terlihat, muat ulang halaman atau tutup lalu buka kembali tab website. Folder out/ pada arsip ini juga sudah memuat favicon terbaru.

## Mengganti file nanti
- Foto: public/images/andre-saputra.jpg
- CV: public/documents/CV_Andre_Saputra.pdf
- Jalur aset, dimensi foto, dan keterangan PDF: src/data/profile.ts

Set NEXT_PUBLIC_SITE_URL pada .env.local ke alamat domain Anda sebelum build produksi agar metadata dan sitemap memakai alamat yang benar.

## Pemeriksaan
Build produksi, TypeScript, tiga pengujian fisika yang sudah tersedia, serta pemeriksaan tautan dan kesamaan berkas berhasil. Tampilan hero dan About serta pratinjau PDF telah diperiksa di browser desktop. Modal kelima proyek telah diuji pada desktop. Posisi, batas layar, dan area gulir modal juga telah diperiksa pada viewport 320×640, 390×844, 768×700, dan 1024×400. Pengujian dilakukan melalui viewport browser; perangkat seluler fisik dan penyelesaian unduhan CV belum terverifikasi. Browser pemeriksaan tidak mendukung WebGL, sehingga yang terlihat adalah ilustrasi fallback bawaan. Kode animasi 3D tetap dipertahankan.

Revisi ini belum dipublikasikan ke hosting atau didorong ke GitHub. Identitas proyek hosting sebelumnya tetap disimpan pada kode sumber, tetapi proyek tersebut tidak ditemukan pada akun yang tersedia saat pengerjaan.
