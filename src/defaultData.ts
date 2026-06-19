/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Default data catalog representing Academic Administrative System integration for Institut KH. Ahmad Sanusi Sukabumi

import { CplProdi } from "./types";

export interface ProgramStudiCatalog {
  prodi: string;
  fakultas: string;
  defaultCPLs: CplProdi[];
  mataKuliahCatalog: { kode: string; nama: string; sks: number; rumpun: string }[];
}

export const ACADEMIC_STUDY_PROGRAMS: ProgramStudiCatalog[] = [
  {
    prodi: "Hukum Keluarga Islam / Ahwal al-Syakhshiyyah (S1)",
    fakultas: "Fakultas Syari'ah",
    defaultCPLs: [
      {
        id: "CPL-HKI-1",
        kode: "S1",
        deskripsi: "Menjunjung tinggi nilai kemanusiaan dalam menjalankan tugas berdasarkan agama, moral, dan etika akademik didasari ketaqwaan kepada Allah SWT.",
        kategori: "Sikap"
      },
      {
        id: "CPL-HKI-2",
        kode: "S2",
        deskripsi: "Menginternalisasi nilai, norma, dan etika akademik serta berkontribusi dalam peningkatan mutu kehidupan bermasyarakat bernegara berdasarkan Pancasila.",
        kategori: "Sikap"
      },
      {
        id: "CPL-HKI-3",
        kode: "PP1",
        deskripsi: "Menguasai teori dan konsep hukum keluarga Islam (ahwal syakhsiyyah) secara komprehensif, kritis, sistematis, dan selaras dengan fikih kontemporer.",
        kategori: "Penggetahuan"
      },
      {
        id: "CPL-HKI-4",
        kode: "KU1",
        deskripsi: "Menerapkan pemikiran logis, kritis, sistematis, dan inovatif dalam konteks pengembangan atau implementasi ilmu pengetahuan dan teknologi di bidang hukum.",
        kategori: "Keterampilan Umum"
      },
      {
        id: "CPL-HKI-5",
        kode: "KK1",
        deskripsi: "Merancang dan melaksanakan riset di bidang hukum keluarga Islam (ahwal syakhsiyyah) melalui pendekatan transdisipliner integratif (wahdatul ulum).",
        kategori: "Keterampilan Khusus"
      },
      {
        id: "CPL-HKI-6",
        kode: "KK2",
        deskripsi: "Mampu memecahkan masalah hukum keluarga Islam (pernikahan, waris, wakaf, nafkah) dan merumuskan legal opini yang tepat dan kontekstual.",
        kategori: "Keterampilan Khusus"
      }
    ],
    mataKuliahCatalog: [
      { kode: "HKI-101", nama: "Ilmu Falak & Hisab Praktis", sks: 3, rumpun: "Studi Fikih & Astronomi Islam" },
      { kode: "HKI-204", nama: "Hukum Perdata Islam di Indonesia", sks: 3, rumpun: "Hukum Positif Indonesia" },
      { kode: "HKI-305", nama: "Fikih Munakahat dan Kontemporer", sks: 4, rumpun: "Studi Hukum Syariah" },
      { kode: "HKI-402", nama: "Metodologi Penelitian Hukum Islam", sks: 2, rumpun: "Metodologi Riset" },
      { kode: "HKI-501", nama: "Ushul Fikih Aplikasi", sks: 3, rumpun: "Teori Hukum Islam" }
    ]
  },
  {
    prodi: "Pendidikan Agama Islam (S1)",
    fakultas: "Fakultas Tarbiyah",
    defaultCPLs: [
      {
        id: "CPL-PAI-1",
        kode: "S1",
        deskripsi: "Menunjukkan sikap religius, ketulusan profesi pendidik, disiplin, toleran, dan tanggung jawab sosial tinggi.",
        kategori: "Sikap"
      },
      {
        id: "CPL-PAI-2",
        kode: "PP1",
        deskripsi: "Menguasai dasar-dasar ilmu kependidikan Islam, kurikulum PAI sekolah/madrasah, serta psikologi perkembangan peserta didik.",
        kategori: "Penggetahuan"
      },
      {
        id: "CPL-PAI-3",
        kode: "PP2",
        deskripsi: "Menguasai materi esensi bidang Al-Qur'an Hadis, Akidah Akhlak, Fikih, Sejarah Kebudayaan Islam secara komprehensif.",
        kategori: "Penggetahuan"
      },
      {
        id: "CPL-PAI-4",
        kode: "KU1",
        deskripsi: "Mampu menyusun administrasi pembelajaran, instrumen penilaian, dan mengelola kelas dengan inovatif menggunakan teknologi pendidikan.",
        kategori: "Keterampilan Umum"
      },
      {
        id: "CPL-PAI-5",
        kode: "KK1",
        deskripsi: "Mendesain, menerapkan, dan mengevaluasi strategi pembelajaran PAI berbasis OBE (Outcome-Based Education) dan student-centered learning.",
        kategori: "Keterampilan Khusus"
      },
      {
        id: "CPL-PAI-6",
        kode: "KK2",
        deskripsi: "Melakukan penelitian tindakan kelas (classroom action research) untuk solusi permasalahan akademis pembelajaran agama Islam.",
        kategori: "Keterampilan Khusus"
      }
    ],
    mataKuliahCatalog: [
      { kode: "PAI-102", nama: "Metodologi Pembelajaran PAI", sks: 3, rumpun: "Ilmu Keguruan & Pedagogik" },
      { kode: "PAI-203", nama: "Desain Evaluasi Pembelajaran PAI berbasis OBE", sks: 3, rumpun: "Ilmu Evaluasi Pendidikan" },
      { kode: "PAI-304", nama: "Tafsir Ayat-ayat Pendidikan", sks: 2, rumpun: "Studi Al-Qur'an Tarbawi" },
      { kode: "PAI-411", nama: "Sejarah Peradaban Islam & Pendidikan Nusantara", sks: 2, rumpun: "Studi Sejarah Islam" },
      { kode: "PAI-503", nama: "Pengembangan Kurikulum PAI", sks: 3, rumpun: "Ilmu Kurikulum" }
    ]
  },
  {
    prodi: "Manajemen Pendidikan Islam (S1)",
    fakultas: "Fakultas Tarbiyah",
    defaultCPLs: [
      {
        id: "CPL-MPI-1",
        kode: "S1",
        deskripsi: "Menunjukkan integritas personal, tanggung jawab sosial, disiplin, kepedulian dwi-fungsi managerial di lembaga pendidikan Islam.",
        kategori: "Sikap"
      },
      {
        id: "CPL-MPI-2",
        kode: "PP1",
        deskripsi: "Menguasai teori kepemimpinan, sosiologi organisasi, perencanaan taktis-strategis, evaluasi progresi lembaga tarbiyah kontemporer.",
        kategori: "Penggetahuan"
      },
      {
        id: "CPL-MPI-3",
        kode: "KU1",
        deskripsi: "Mengambil keputusan manajerial yang tepat berdasarkan analisis data kuantitatif maupun kualitatif sesuai standar nasional penjaminan mutu.",
        kategori: "Keterampilan Umum"
      },
      {
        id: "CPL-MPI-4",
        kode: "KK1",
        deskripsi: "Mampu menyusun master-plan akreditasi, rencana anggaran pendapatan belanja sekolah (RAPBS), serta mengelola sistem informasi manajemen pendidikan.",
        kategori: "Keterampilan Khusus"
      }
    ],
    mataKuliahCatalog: [
      { kode: "MPI-201", nama: "Manajemen Strategis Lembaga Pendidikan", sks: 3, rumpun: "Sains Manajemen Tarbiyah" },
      { kode: "MPI-212", nama: "Sistem Informasi Manajemen Akdemik (SIM)", sks: 3, rumpun: "Teknologi & Informasi" },
      { kode: "MPI-309", nama: "Kepemimpinan & Supervisi Mutu Sekolah/Madrasah", sks: 3, rumpun: "Teori Kepemimpinan" },
      { kode: "MPI-402", nama: "Manajemen Keuangan dan Pembiayaan Pendidikan", sks: 2, rumpun: "Administrasi Finansial" },
      { kode: "MPI-405", nama: "Perencanaan dan Implementasi Penjaminan Mutu Internal", sks: 3, rumpun: "Studi Mutu Pendidikan" }
    ]
  },
  {
    prodi: "Ekonomi Syari'ah (S1)",
    fakultas: "Fakultas Syari'ah",
    defaultCPLs: [
      {
        id: "CPL-EKS-1",
        kode: "S1",
        deskripsi: "Menjunjung tinggi kejujuran (shiddiq), amanah, fathonah, tabaligh, dan etika bisnis syariah.",
        kategori: "Sikap"
      },
      {
        id: "CPL-EKS-2",
        kode: "PP1",
        deskripsi: "Menguasai konsep dasar maqasid syariah, prinsip akuntansi syariah, dan regulasi keuangan syariah lokal serta global.",
        kategori: "Penggetahuan"
      },
      {
        id: "CPL-EKS-3",
        kode: "KU1",
        deskripsi: "Mengambil keputusan finansial yang rasional dan etis sesuai konsep keadilan distribusi ekonomi Islam.",
        kategori: "Keterampilan Umum"
      },
      {
        id: "CPL-EKS-4",
        kode: "KK1",
        deskripsi: "Mampu melakukan audit syariah mikro, analisis kelayakan bisnis, serta menyusun skema akad keuangan yang halal.",
        kategori: "Keterampilan Khusus"
      },
      {
        id: "CPL-EKS-5",
        kode: "KK2",
        deskripsi: "Mengevaluasi risiko investasi keuangan syariah dan merancang solusi kewirausahaan sosial kreatif berbasis zakat dan wakaf.",
        kategori: "Keterampilan Khusus"
      }
    ],
    mataKuliahCatalog: [
      { kode: "EKS-105", nama: "Pengantar Ekonomi Islam Kontemporer", sks: 3, rumpun: "Ekonomi Makro & Mikro Islam" },
      { kode: "EKS-202", nama: "Fikih Muamalah Maaliyah", sks: 3, rumpun: "Teori Akad Syariah" },
      { kode: "EKS-304", nama: "Manajemen Lembaga Keuangan Mikro Syariah", sks: 3, rumpun: "Keuangan Islam Praktis" },
      { kode: "EKS-412", nama: "Akuntansi Syariah & Auditing", sks: 3, rumpun: "Akuntansi Bisnis" },
      { kode: "EKS-502", nama: "Analisis Kelayakan Bisnis dan Investasi Syariah", sks: 2, rumpun: "Studi Kewirausahaan" }
    ]
  },
  {
    prodi: "Magister Pendidikan Agama Islam (S2)",
    fakultas: "Pascasarjana Program Magister",
    defaultCPLs: [
      {
        id: "CPL-MPAI-1",
        kode: "S1",
        deskripsi: "Memiliki integritas ilmiah, akhlakul karimah tingkat tinggi, serta tanggung jawab profesional sebagai calon pakar pendidikan tinggi Islam.",
        kategori: "Sikap"
      },
      {
        id: "CPL-MPAI-2",
        kode: "PP1",
        deskripsi: "Menguasai filsafat ilmu, epistemologi pendidikan agama Islam, teori kurikulum transformatif, serta pedagogi kritis lanjutan.",
        kategori: "Penggetahuan"
      },
      {
        id: "CPL-MPAI-3",
        kode: "KU1",
        deskripsi: "Mampu mengembangkan peta jalan riset orisinal berbasis interdisipliner atau transdisipliner di lingkup pendidikan Islam kontemporer.",
        kategori: "Keterampilan Umum"
      },
      {
        id: "CPL-MPAI-4",
        kode: "KK1",
        deskripsi: "Mampu menghasilkan draf kurikulum PAI tingkat perguruan tinggi terintegrasi sains-teknologi serta mempublikasikannya di forum bereputasi.",
        kategori: "Keterampilan Khusus"
      }
    ],
    mataKuliahCatalog: [
      { kode: "MPAI-801", nama: "Epistemologi & Teori Belajar Pendidikan Islam Lanjut", sks: 3, rumpun: "Filsafat & Teori Pendidikan" },
      { kode: "MPAI-802", nama: "Metodologi Penelitian Manajemen Pendidikan Kualitatif & Kuantitatif", sks: 3, rumpun: "Metodologi Riset S2" },
      { kode: "MPAI-803", nama: "Rekonstruksi & Pengembangan Kurikulum PAI Transformatif", sks: 3, rumpun: "Ilmu Desain Kurikulum" },
      { kode: "MPAI-804", nama: "Studi Komparatif & Globalisasi Pendidikan Islam Dunia", sks: 2, rumpun: "Pendidikan Global" }
    ]
  },
  {
    prodi: "Magister Hukum Keluarga Islam / Ahwal al-Syakhshiyyah (S2)",
    fakultas: "Pascasarjana Program Magister",
    defaultCPLs: [
      {
        id: "CPL-MHKI-1",
        kode: "S1",
        deskripsi: "Bertanggung jawab secara ilmiah sebagai praktisi tinggi syariah dengan berpijak pada nilai-nilai keadilan sosial dan keadaban publik.",
        kategori: "Sikap"
      },
      {
        id: "CPL-MHKI-2",
        kode: "PP1",
        deskripsi: "Menguasai diskursus ushul fikih lanjutan, sosiologisasi norma peradilan kontemporer, rekonstruksi hukum keluarga Islam, dan perbandingan hukum keluarga muslim dunia.",
        kategori: "Penggetahuan"
      },
      {
        id: "CPL-MHKI-3",
        kode: "KU1",
        deskripsi: "Mengevaluasi, menganalisis, dan memformulasikan solusi komprehensif atas perselisihan hukum hak perdata dan hukum keluarga kontemporer secara holistik.",
        kategori: "Keterampilan Umum"
      },
      {
        id: "CPL-MHKI-4",
        kode: "KK1",
        deskripsi: "Dapat memberikan fatwa hukum keluarga Islam berbasis kajian fikih muqaranah terpadu dan melahirkan publikasi ilmiah bertaraf nasional dan internasional.",
        kategori: "Keterampilan Khusus"
      }
    ],
    mataKuliahCatalog: [
      { kode: "MHKI-801", nama: "Filsafat Hukum Islam & Rekonstruksi Ushul Fikih Lanjut", sks: 3, rumpun: "Filsafat Syariah S2" },
      { kode: "MHKI-802", nama: "Studi Komparatif Kodifikasi Hukum Keluarga Muslim Global", sks: 3, rumpun: "Kajian Perbandingan Hukum" },
      { kode: "MHKI-803", nama: "Sosiologi Hukum Keluarga & Dinamika Gender", sks: 2, rumpun: "Sosiologi Syariah" },
      { kode: "MHKI-804", nama: "Kapita Selekta Penyelesaian Sengketa di Peradilan Agama", sks: 3, rumpun: "Litigasi Hukum Praktis S2" }
    ]
  }
];

export const PRESETS_RPS_SAMPLES: Record<string, any> = {
  "Ilmu Falak II": {
    "meta": {
      "namaMataKuliah": "Ilmu Falak II",
      "kodeMK": "010201106",
      "rumpunMK": "Studi Islam & Astronomi Astronomik",
      "sksteori": 2,
      "skspraktik": 0,
      "semester": 5,
      "programStudi": "Hukum Keluarga Islam / Ahwal al-Syakhshiyyah (S1)",
      "tanggalPenyusunan": "18 September 2026",
      "dosenPengembang": "Dr. H. Aksara Al-Maqashid",
      "koordinatorRMK": "Dr. H. Encep Taufiq Rahman, M.Ag.",
      "koordinatorProdi": "Asep Indra Gunawan, Lc., M.Ag.",
      "deskripsiSingkat": "Mata kuliah Ilmu Falak II mempelajari tentang astronomi dan teknik pengukuran yang digunakan untuk menentukan arah kiblat, waktu shalat, serta penentuan kalender qamariyah dan hisab urfi praktis.",
      "bahanKajian": ["Arah Kiblat", "Hisab Waktu Shalat", "Awal Bulan Qamariyah", "Konversi Kalender Hijriyah-Masehi-Jawa"],
      "pustakaUtama": [
        "A Jamil, Ilmu Falak: Teori dan Aplikasi, Jakarta: Amzah, 2009.",
        "Abd. Salam Nawawi, Ilmu Falak Cara Menghitung Waktu Shalat dan Awal Bulan, Sidoarjo : Aqabah, 2010"
      ],
      "pustakaPendukung": [
        "Ahmad Izzuddin, Ilmu Falak Praktis, Semarang: Pustaka Rizki Putra, 2012.",
        "Muhyidin Khazin, Ilmu Falak Dalam Teori dan Praktek, Yogyakarta: Buana Pustaka, 2004."
      ],
      "dosenPengampu": ["Dr. H. Aksara Al-Maqashid"],
      "mataKuliahSyarat": "Ilmu Falak I",
      "institusi": "Institut KH. Ahmad Sanusi Sukabumi",
      "fakultas": "Fakultas Syariah"
    },
    "cpl": [
      { "id": "CPL-1", "kode": "S1", "deskripsi": "Menjunjung tinggi nilai kemanusiaan dalam menjalankan tugas berdasarkan agama, moral, dan etika.", "kategori": "Sikap" },
      { "id": "CPL-2", "kode": "S2", "deskripsi": "Berkontribusi dalam peningkatan mutu kehidupan bermasyarakat, berbangsa, bernegara, dan kemajuan peradaban berdasarkan pancasila.", "kategori": "Sikap" },
      { "id": "CPL-3", "kode": "PP1", "deskripsi": "Menguasai mekanisme beracara dalam sidang peradilan maupun di luar sidang pengadilan.", "kategori": "Penggetahuan" },
      { "id": "CPL-4", "kode": "KU1", "deskripsi": "Menerapkan pemikiran logis, kritis, sistematis, dan inovatif dalam konteks pengembangan atau implementasi ilmu pengetahuan.", "kategori": "Keterampilan Umum" },
      { "id": "CPL-5", "kode": "KK1", "deskripsi": "Merancang dan melaksanakan penelitian dalam bidang Hukum Keluarga Islam dengan pendekatan transdisipliner.", "kategori": "Keterampilan Khusus" }
    ],
    "cpmk": [
      { "id": "CPMK-1", "deskripsi": "Menguasai pengertian dan ruang lingkup hisab awal bulan.", "cplIds": ["CPL-1", "CPL-4"] },
      { "id": "CPMK-2", "deskripsi": "Menguasai Astronomi Bola berkenaan dengan Istilah-istilah penentuan awal bulan.", "cplIds": ["CPL-2", "CPL-4", "CPL-5"] },
      { "id": "CPMK-3", "deskripsi": "Menguasai Metode hisab awal bulan Kalender Hijriyah dan Masehi.", "cplIds": ["CPL-3", "CPL-4", "CPL-5"] }
    ],
    "subCpmk": [
      { "id": "SUB-CPMK-1", "deskripsi": "Mahasiswa Mampu Menganalisa Pengertian hisab awal bulan.", "cpmkId": "CPMK-1" },
      { "id": "SUB-CPMK-2", "deskripsi": "Mahasiswa Mampu Menganalisa Ruang lingkup hisab awal bulan.", "cpmkId": "CPMK-1" },
      { "id": "SUB-CPMK-3", "deskripsi": "Mahasiswa Mampu Memahami Metode hisab awal bulan.", "cpmkId": "CPMK-1" },
      { "id": "SUB-CPMK-4", "deskripsi": "Mahasiswa Mampu Memahami Astronomi Bola berkenaan dengan penentuan awal bulan.", "cpmkId": "CPMK-2" },
      { "id": "SUB-CPMK-5", "deskripsi": "Mahasiswa mampu Mengaplikasikan Hisab urfi awal bulan Kalender Hijriyah.", "cpmkId": "CPMK-3" }
    ],
    "pertemuan": [
      {
        "mingguKe": 1,
        "subCpmk": "Sub-CPMK-1: Mahasiswa Mampu Menganalisa Pengertian hisab awal bulan secara historis dan teoretis.",
        "indikator": "Ketepatan dalam menjelaskan urgensi, pengertian dasar, dan hukum mempelajari hisab rukyat awal bulan qamariyah.",
        "kriteriaDanTeknik": "Kriteria: Portofolio & Keaktifan. Teknik: Tanya jawab interaktif.",
        "metodeLuring": "Kuliah teori [TM: 2x50 mnt]. Diskusi interaktif kelas.",
        "metodeDaring": "Review materi di LMS [Estimasi: 60 mnt]. Portal SSO.",
        "materiPembelajaran": "Definisi Fikih Falak, dasar hukum Al-Qur'an dan Hadis tentang hisab; rujukan: A Jamil Bab I.",
        "bobotPenilaian": 10
      },
      {
        "mingguKe": 2,
        "subCpmk": "Sub-CPMK-2: Mahasiswa Mampu Menganalisa Ruang lingkup dan struktur hisab awal bulan.",
        "indikator": "Mengidentifikasi faktor pendukung astronomik seperti revolusi bulan dan rotasi bumi.",
        "kriteriaDanTeknik": "Kriteria: Makalah tugas kelompok. Teknik: Presentasi lisan.",
        "metodeLuring": "Diskusi kelompok terbimbing [TM: 2x50 mnt].",
        "metodeDaring": "Diskusi forum di LMS [Estimasi: 60 mnt].",
        "materiPembelajaran": "Aspek kosmologi terapan, kedudukan matahari dan bulan; rujukan: Abd. Salam Nawawi Bab III.",
        "bobotPenilaian": 10
      },
      {
        "mingguKe": 3,
        "subCpmk": "Sub-CPMK-3: Mahasiswa Mampu Memahami Metode-metode hisab awal bulan qamariyah.",
        "indikator": "Membedakan metode hisab hakiki takribi, hisab hakiki tahkiki, dan hisab kontemporer.",
        "kriteriaDanTeknik": "Kriteria: Rubrik evaluasi teori. Teknik: Kuis tertulis.",
        "metodeLuring": "Metode ceramah interaktif & latihan soal [TM: 2x50 mnt].",
        "metodeDaring": "Kuis online di LMS [Estimasi: 60 mnt].",
        "materiPembelajaran": "Perbedaan aliran hisab kontemporer di Indonesia (Nu, Muhammadiyah, Persis); rujukan: Muhyidin Khazin.",
        "bobotPenilaian": 10
      },
      {
        "mingguKe": 4,
        "subCpmk": "Sub-CPMK-4: Mahasiswa Mampu Memahami Astronomi Bola berkenaan dengan Istilah-istilah penentuan awal bulan.",
        "indikator": "Ketepatan mendefinisikan istilah seperti ijtima' (konjungsi), deklinasi, semi-diameter, dan elongasi.",
        "kriteriaDanTeknik": "Kriteria: Lembar kerja praktikum. Teknik: Penugasan mandiri.",
        "metodeLuring": "Kuliah penjelasan rumus astronomis dan navigasi bola langit [TM: 2x50 mnt].",
        "metodeDaring": "Video pembelajaran navigasi bola di website [Estimasi: 65 mnt].",
        "materiPembelajaran": "Sistem koordinat horison dan ekuator, gerak semu matahari; rujukan: Mohammad Wardan.",
        "bobotPenilaian": 10
      },
      {
        "mingguKe": 5,
        "subCpmk": "Sub-CPMK-5: Mahasiswa mampu Mengaplikasikan Hisab urfi awal bulan Kalender Hijriyah.",
        "indikator": "Kemampuan menghitung hari dan tanggal awal bulan kalender Hijriyah secara hitungan manual matematik.",
        "kriteriaDanTeknik": "Kriteria: Portofolio hitungan. Teknik: Penilaian hasil lembar kerja.",
        "metodeLuring": "Praktikum hitungan kalendar secara manual berkelompok [TM: 2x50 mnt].",
        "metodeDaring": "Unggah hasil perhitungan ke sistem akademik [Estimasi: 50 mnt].",
        "materiPembelajaran": "Siklus daur 30 tahun kalender Hijriyah, penentuan tahun kabisat; rujukan: Ahmad Izzuddin Bab 4.",
        "bobotPenilaian": 10
      },
      {
        "mingguKe": 6,
        "subCpmk": "Sub-CPMK-6: Mahasiswa mampu Mengaplikasikan Hisab urfi awal bulan Kalender Masehi.",
        "indikator": "Analisis siklus kalender Julius dan Gregorius serta hubungannya dengan pergantian matahari.",
        "kriteriaDanTeknik": "Kriteria: Lembar evaluasi. Teknik: Ujian tulis mini.",
        "metodeLuring": "Presentasi problem solving dan studi kasus kalender masehi [TM: 2x50 mnt].",
        "metodeDaring": "Studi mandiri perbandingan tahun masehi dan syamsiyah [Estimasi: 60 mnt].",
        "materiPembelajaran": "Sejarah reformasi kalender gregorian dan sistem koreksi kabisat; references: Jamil Bab V.",
        "bobotPenilaian": 5
      },
      {
        "mingguKe": 7,
        "subCpmk": "Sub-CPMK-7: Mahasiswa mampu Mengaplikasikan Hisab urfi awal bulan Kalender Jawa-Islam.",
        "indikator": "Konstruksi penanggalan Sultan Agungan (Siklus windu, kurup, asapon, dll).",
        "kriteriaDanTeknik": "Kriteria: Penilaian unjuk kerja. Teknik: Diskusi kelompok.",
        "metodeLuring": "Kerja projek merangkum siklus kalender jawa-islam [TM: 2x50 mnt].",
        "metodeDaring": "Diskusi virtual di media integrasi [Estimasi: 60 mnt].",
        "materiPembelajaran": "Sejarah akulturasi penanggalan saka, jawa pranata mangata, dan hijriah; references: Maskufa Bab 6.",
        "bobotPenilaian": 5
      },
      {
        "mingguKe": 8,
        "subCpmk": "Ujian Tengah Semester (UTS): Melakukan review kompetensi teoritis dan praktis pertemuan 1 hingga 7.",
        "indikator": "Menilai tingkat penguasaan konsep dasar hisab astronomi bola dan hisab urfi.",
        "kriteriaDanTeknik": "Kriteria: Kelulusan kriteria rubrik kognitif. Teknik: Tes tertulis komprehensif & Praktikum hisab.",
        "metodeLuring": "Ujian tertulis tertutup (Closed book exam) [TM: 100 mnt].",
        "metodeDaring": "Pengawasan terpadu via SSO akademik.",
        "materiPembelajaran": "Semua bahan kajian dari Pertemuan 1-7.",
        "bobotPenilaian": 15
      },
      {
        "mingguKe": 9,
        "subCpmk": "Sub-CPMK-8: Mahasiswa mampu Menganalisa Perbandingan tarikh/Konversi kalender Masehi ke Hijriyah dan sebaliknya.",
        "indikator": "Melakukan konversi tanggal masehi ke hijriyah dengan rumus selisih hari (epoch) secara akurat.",
        "kriteriaDanTeknik": "Kriteria: Lembar kerja konversi. Teknik: Latihan kasus mandiri.",
        "metodeLuring": "Workshop kalkulasi manual selisih hari (selisih masehi-hijriyah) [TM: 2x50 mnt].",
        "metodeDaring": "Tugas latihan interaktif di portal LMS [Estimasi: 80 mnt].",
        "materiPembelajaran": "Penetapan epoch masehi, epoch hijriah, sisa pembagian interpolasi; rujukan: A Jamil Bab VI.",
        "bobotPenilaian": 5
      },
      {
        "mingguKe": 10,
        "subCpmk": "Sub-CPMK-9: Mahasiswa mampu Menganalisa Perbandingan tarikh/Konversi kalender Masehi ke Jawa-Islam dan sebaliknya.",
        "indikator": "Menentukan nama hari, pasaran (Legi, Pahing, Pon, Wage, Kliwon) dan neptu tahun dari tarikh tertentu.",
        "kriteriaDanTeknik": "Kriteria: Rubrik presentasi. Teknik: Demonstrasi unjuk kerja.",
        "metodeLuring": "Latihan interaktif mencari kecocokan hari lahir jawa beserta maknanya [TM: 2x50 mnt].",
        "metodeDaring": "Materi asinkronus video kalender jawa mataram [Estimasi: 60 mnt].",
        "materiPembelajaran": "Siklus pancawara (pasaran) dan saptawara (mingguan) jawa; rujukan: Maskufa Bab VII.",
        "bobotPenilaian": 5
      },
      {
        "mingguKe": 11,
        "subCpmk": "Sub-CPMK-10: Mahasiswa mampu Menganalisa Perbandingan tarikh/Konversi kalender Hijriyah ke Jawa-Islam dan sebaliknya.",
        "indikator": "Ketepatan dalam memodifikasi konversi struktural antara dua kalender lunar yang memiliki siklus berbeda.",
        "kriteriaDanTeknik": "Kriteria: Portofolio kelompok. Teknik: Diskusi kasus rumit.",
        "metodeLuring": "Metode Kolaboratif: Memecahkan kasus penulisan manuskrip kuno [TM: 2x50 mnt].",
        "metodeDaring": "Chatting interaktif kelompok di LMS [Estimasi: 60 mnt].",
        "materiPembelajaran": "Korelasi kurup jawa dengan sengkala tahun hijriah; references: Mohammad Wardan.",
        "bobotPenilaian": 5
      },
      {
        "mingguKe": 12,
        "subCpmk": "Sub-CPMK-11: Mahasiswa mampu Menganalisa Pengertian bulan Qamariyah.",
        "indikator": "Menggambar dan menerangkan fase-fase bulan (new moon, crescent, gibbous, full moon).",
        "kriteriaDanTeknik": "Kriteria: Laporan pengamatan. Teknik: Observasi langsung.",
        "metodeLuring": "Kuliah penjelasan fisis peredaran sinodis dan sideris bulan [TM: 2x50 mnt].",
        "metodeDaring": "Mengamati simulator fase bulan online [Estimasi: 70 mnt].",
        "materiPembelajaran": "Durasi revolusi sinodis (29,53 hari), sideris (27,3 hari) dan implikasinya; rujukan: Ahmad Izzuddin Bab 5.",
        "bobotPenilaian": 5
      },
      {
        "mingguKe": 13,
        "subCpmk": "Sub-CPMK-12: Memahami mampu Menganalisa Nas-nas syar'i tentang hisab awal bulan Qamariyah.",
        "indikator": "Analisis interdisipliner teologis-astronomis tentang teks rukyah (shumu li rukyatihi).",
        "kriteriaDanTeknik": "Kriteria: Makalah konseptual. Teknik: Debat terstruktur fikih.",
        "metodeLuring": "Debat kelompok akademis pro hisab vs pro rukyat [TM: 2x50 mnt].",
        "metodeDaring": "Membaca kompilasi tafsir kontemporer [Estimasi: 90 mnt].",
        "materiPembelajaran": "Ijtihat hukum Yusuf Qardhawi dan ulama lainnya tentang sains falak; rujukan: Syar'iyah Fi Itsbat as-Syuhur.",
        "bobotPenilaian": 5
      },
      {
        "mingguKe": 14,
        "subCpmk": "Sub-CPMK-13: Mahasiswa mampu Menganalisa Ijtima' dan hubungannya dengan hisab awal bulan Qamariyah.",
        "indikator": "Menghitung selisih bujur (longitude) matahari dan bulan untuk mencari detik-detik konjungsi.",
        "kriteriaDanTeknik": "Kriteria: Perhitungan astronomis. Teknik: Evaluasi rubrik numeris.",
        "metodeLuring": "Kuliah aplikasi software hisab kontemporer (Ephemeris, raddul kibri) [TM: 2x50 mnt].",
        "metodeDaring": "Tutorial instalasi dan entri data koordinat lintang/bujur [Estimasi: 80 mnt].",
        "materiPembelajaran": "Konsep geosentris dan heliosentris, perhitungan asinkronus; references: Moh. Murtadho.",
        "bobotPenilaian": 5
      },
      {
        "mingguKe": 15,
        "subCpmk": "Sub-CPMK-14: Mahasiswa mampu Menganalisa Sistem dan aliran hisab awal bulan Qamariyah di Indonesia.",
        "indikator": "Memformulasikan kriteria visibilitas hilal (Imkanur Rukyat MABIMS, Wujudul Hilal) secara matematis.",
        "kriteriaDanTeknik": "Kriteria: Pembuatan esai kritis. Teknik: Review makalah.",
        "metodeLuring": "Simulasi penentuan posisi hilal di atas ufuk saat matahari terbenam [TM: 2x50 mnt].",
        "metodeDaring": "Review hasil sidang isbat kementerian agama [Estimasi: 60 mnt].",
        "materiPembelajaran": "Kriteria MABIMS tinggi hilal 3 derajat dan elongasi 6,4 derajat; rujukan: Oman Fathurohman SW.",
        "bobotPenilaian": 10
      },
      {
        "mingguKe": 16,
        "subCpmk": "Ujian Akhir Semester (UAS): Menguji secara menyeluruh pemahaman teoritik dan praktik perhitungan seluruh tarikh dan hilal.",
        "indikator": "Kemampuan mendesain laporan utuh hisab rukyat setahun penuh di Sukabumi.",
        "kriteriaDanTeknik": "Kriteria: Kelulusan rubrik penilaian standar institusi. Teknik: Ujian tulis esai komprehensif & Portofolio projek mandiri.",
        "metodeLuring": "Ujian tulis akhir tertutup & penyerahan bundel draf hisab [TM: 120 mnt].",
        "metodeDaring": "Validasi portofolio kelulusan via SSO terpadu.",
        "materiPembelajaran": "Seluruh cakupan bahan kajian dari Pertemuan 1-15.",
        "bobotPenilaian": 15
      }
    ],
    "rencanaTugas": {
      "judul": "Penyusunan Kalender Hisab Mini & Analisis Awal Bulan Qamariyah",
      "bentukTugas": "Projek Mandiri Portofolio Rumusan Kalender",
      "deskripsiTugas": "Tugas ini bertujuan agar mahasiswa memiliki keahlian praktis mengkonversi tanggal-tanggal penting, mendefinisikan fase-fase hilal untuk wilayah Sukabumi, dan menetapkan awal bulan qamariyah di tahun berjalan secara mandiri dan dapat dipertanggungjawabkan.",
      "metodePengerjaan": [
        "Langkah 1: Tentukan titik koordinat lintang tempat & bujur tempat Institut KH. Ahmad Sanusi Sukabumi.",
        "Langkah 2: Lakukan perhitungan konversi kalender kelahiran masing-masing anggota kelompok ke 3 kalender (Masehi, Hijriyah, Jawa-Islam).",
        "Langkah 3: Rumuskan prediksi waktu ijtima' dan tinggi hilal untuk 3 bulan qamariyah krusial (Ramadhan, Syawal, Dzulhijjah) menggunakan kriteria Imkanurrukyat MABIMS.",
        "Langkah 4: Sajikan perhitungan dalam tabel rapi disertai diagram fase astronomis.",
        "Langkah 5: Presentasikan dan uji silang hasil perhitungan antar-kelompok."
      ],
      "bentukLuaran": "Makalah Laporan Projek terkompilasi rapi (Format PDF, Font Times New Roman 12, Minimal 8 Halaman lengkap cover, daftar isi, pembahasan, kesimpulan).",
      "indikatorPenilaian": [
        "Kejelasan latar belakang dan landasan hukum falak (20%)",
        "Presisi dan akurasi matematis perhitungan konversi tarikh (30%)",
        "Kebenaran astronomis penentuan awal bulan menggunakan kriteria MABIMS (30%)",
        "Kualitas visual diagram, struktur EYD, keaktifan saat diskusi presentasi (20%)"
      ],
      "bobotNilai": 15,
      "jadwal": "Dikumpulkan pada pertemuan ke-14 dan dipresentasikan di pertemuan ke-15"
    },
    "rencanaTugasMandiri": {
      "judul": "Observasi Arah Kiblat Masjid Sekitar & Analisis Rumus Trigonometri Bola",
      "bentukTugas": "Laporan Observasi Individu Lapangan (Maks 5 Halaman)",
      "deskripsiTugas": "Tugas ini bertujuan agar mahasiswa secara mandiri dapat mempraktikkan pengukuran arah kiblat di lapangan menggunakan tongkat istiwa, kompas, dan bayang-bayang harian matahari, lalu membandingkannya dengan perhitungan rumus Trigonometri Bola (Azimut Kiblat).",
      "metodePengerjaan": [
        "Langkah 1: Pilih salah satu masjid atau mushalla di sekitar tempat tinggal mahasiswa.",
        "Langkah 2: Ambil koordinat lintang dan bujur lokasi menggunakan GPS ponsel pintar.",
        "Langkah 3: Hitung azimut arah kiblat secara manual menggunakan rumus astronomi bola.",
        "Langkah 4: Lakukan verifikasi fisik di lokasi menggunakan bayangan matahari (Rashdul Kiblat lokal).",
        "Langkah 5: Buat laporan analisis perbedaan derajat bangunan masjid riil dengan hasil perhitungan."
      ],
      "bentukLuaran": "Laporan PDF berisi dokumentasi foto pengukuran lapangan, coretan tabel perhitungan rumus bola, dan kesimpulan kesesuaian arah kiblat.",
      "indikatorPenilaian": [
        "Metodologi penentuan koordinat dan ketepatan survei lapangan (20%)",
        "Akurasi perhitungan matematis azimut kiblat (30%)",
        "Kedalaman analisis kritis (30%)",
        "Kelengkapan foto instrumen penggaris/bayangan kompas di masjid (20%)"
      ],
      "bobotNilai": 15,
      "jadwal": "Dikumpulkan pada pertemuan ke-10 via portal akademik secara daring"
    },
    "kontrakPerkuliahan": {
      "hakKewajiban": [
        "Hak Dosen: Mendapatkan partisipasi aktif, suasana akademis kondusif, dan tugas diselesaikan tepat waktu.",
        "Hak Mahasiswa: Memperoleh pengajaran terstruktur, umpan balik tugas yang transparan.",
        "Kewajiban Dosen: Masuk tepat waktu, memberikan materi yang valid, objektif dalam memberi nilai pembelajaran.",
        "Kewajiban Mahasiswa: Hadir minimal 75% tatap muka, mematuhi kode etik perkuliahan, bersikap jujur secara akademis."
      ],
      "tataTertib": [
        "Hadir tepat waktu maks toleransi terlambat adalah 15 menit.",
        "Berpakaian sopan dan rapi, dilarang memakai kaos oblong dan sandal di lingkungan kelas.",
        "HP wajib diset ke mode getar atau silent, dilarang berkomunikasi atau membuka aplikasi non-akademis saat kelas berlangsung.",
        "Ujian susulan hanya diberikan bagi mahasiswa dengan izin tertulis resmi rumah sakit atau kedinasan.",
        "Pelanggaran plagiarisme pada tugas RTM berakibat pembatalan nilai otomatis menjadi nilai E."
      ],
      "kriteriaKelulusan": {
        "hadir": 10,
        "tugasTerstruktur": 15,
        "tugasMandiri": 15,
        "uts": 20,
        "uas": 40
      }
    }
  }
};
