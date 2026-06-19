/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Types sharing for OBE RPS Generator

export interface CplProdi {
  id: string; // e.g., "CPL-1" or "CPL1 (S1)"
  kode: string; // e.g., "S1", "KU1", "KK1", "PP1"
  deskripsi: string;
  kategori: "Sikap" | "Penggetahuan" | "Keterampilan Umum" | "Keterampilan Khusus";
}

export interface Cpmk {
  id: string; // e.g., "CPMK-1"
  deskripsi: string;
  cplIds: string[]; // mapped CplProdi IDs, e.g. ["CPL-1", "CPL-2"]
}

export interface SubCpmk {
  id: string; // e.g., "SUB-CPMK-1"
  deskripsi: string;
  cpmkId: string; // parent CPMK ID
}

export interface Pertemuan {
  mingguKe: number; // 1 to 16
  subCpmk: string; // Target Sub-CPMK, or UTS/UAS statement
  indikator: string; // Indikator penilaian
  kriteriaDanTeknik: string; // Kriteria dan Teknik penilaian
  metodeLuring: string; // Estimasi waktu & metode Luring
  metodeDaring: string; // Estimasi waktu & metode Daring
  materiPembelajaran: string; // Bahan kajian & rujukan
  bobotPenilaian: number; // % e.g., 10
}

export interface RencanaTugas {
  judul: string;
  bentukTugas: string;
  deskripsiTugas: string;
  metodePengerjaan: string[];
  bentukLuaran: string;
  indikatorPenilaian: string[];
  bobotNilai: number;
  jadwal: string;
}

export interface KontrakPerkuliahan {
  hakKewajiban: string[];
  tataTertib: string[];
  kriteriaKelulusan: {
    hadir: number; // %
    tugasTerstruktur?: number; // %
    tugasMandiri?: number; // %
    tugas: number; // %
    uts: number; // %
    uas: number; // %
  };
}

export interface RPSData {
  meta: {
    namaMataKuliah: string;
    kodeMK: string;
    rumpunMK: string;
    sksteori: number;
    skspraktik: number;
    semester: number;
    programStudi: string;
    tanggalPenyusunan: string;
    dosenPengembang: string;
    nidnDosenPengembang?: string;
    koordinatorRMK: string;
    nidnKoordinatorRMK?: string;
    koordinatorProdi: string;
    nidnKoordinatorProdi?: string;
    deskripsiSingkat: string;
    bahanKajian: string[];
    pustakaUtama: string[];
    pustakaPendukung: string[];
    dosenPengampu: string[];
    mataKuliahSyarat: string;
    institusi: string;
    fakultas: string;
  };
  cpl: CplProdi[];
  cpmk: Cpmk[];
  subCpmk: SubCpmk[];
  pertemuan: Pertemuan[];
  rencanaTugas: RencanaTugas;
  rencanaTugasMandiri?: RencanaTugas;
  kontrakPerkuliahan: KontrakPerkuliahan;
}

export interface SSOUser {
  loggedIn: boolean;
  username: string;
  fullName: string;
  email: string;
  role: "Dosen" | "Kapordi" | "Admin";
  fakultas: string;
  prodi: string;
  nidn: string;
}
