/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, FormEvent } from "react";
import { 
  BookOpen, 
  Sparkles, 
  Printer, 
  Layers, 
  Users, 
  Shuffle, 
  Download, 
  Check, 
  MapPin, 
  LogOut, 
  Fingerprint, 
  BrainCircuit, 
  Plus, 
  Trash2, 
  Edit3, 
  RotateCcw, 
  BookMarked, 
  Award, 
  Save, 
  Lock,
  ChevronRight,
  Info
} from "lucide-react";
import { RPSData, CplProdi, Cpmk, SubCpmk, Pertemuan, SSOUser } from "./types";
import { ACADEMIC_STUDY_PROGRAMS, PRESETS_RPS_SAMPLES } from "./defaultData";

const PRODI_THEMES: Record<string, string[]> = {
  "Hukum Keluarga Islam / Ahwal al-Syakhshiyyah (S1)": [
    "Mata Kuliah Umum & Keilmuan Dasar",
    "Hukum Keluarga & Perdata Islam",
    "Ilmu Fikih dan Ushul Fikih",
    "Hukum Positif & Peradilan (Nasional)",
    "Rumpun Hukum Komparatif & Internasional",
    "Rumpun Metodologi Penelitian & Ilmu Penunjang",
    "Praktik Profesi"
  ],
  "Pendidikan Agama Islam (S1)": [
    "Mata Kuliah Umum & Keilmuan Dasar",
    "Ilmu Keislaman (Studi Islam)",
    "Ilmu Pendidikan & Keguruan (Tarbiyah)",
    "Metodologi & Riset Keagamaan",
    "Praktik Profesi"
  ],
  "Manajemen Pendidikan Islam (S1)": [
    "Mata Kuliah Umum & Keilmuan Dasar",
    "Ilmu Keislaman (Studi Islam)",
    "Ilmu Pendidikan & Keguruan (Tarbiyah)",
    "Ilmu Manajemen & Administrasi Pendidikan",
    "Metodologi & Riset Keagamaan",
    "Praktik Profesi"
  ],
  "Ekonomi Syari'ah (S1)": [
    "Mata Kuliah Umum & Keilmuan Dasar",
    "Ilmu Keislaman (Studi Islam)",
    "Ilmu Ekonomi & Bisnis",
    "Keuangan & Perbankan Syariah",
    "Filantropi & Ekonomi Sosial",
    "Metodologi & Riset Keagamaan",
    "Praktik Profesi"
  ],
  "Magister Hukum Keluarga Islam / Ahwal al-Syakhshiyyah (S2)": [
    "Umum",
    "Hukum Islam dan Fikih",
    "Ilmu Hukum dan Nasional",
    "Kajian Sumber Hukum Islam",
    "Isu Kontemporer dan Sosial",
    "Metodologi dan Penulisan Akademik"
  ],
  "Magister Pendidikan Agama Islam (S2)": [
    "Umum",
    "Studi Keislaman dan Pemikiran Islam",
    "Ilmu dan Manajemen Pendidikan Islam",
    "Metodologi Penelitian",
    "Praktik Pembelajaran dan Tesis"
  ]
};

const getThemesForProdi = (prodiName: string): string[] => {
  if (!prodiName) return [];
  const normalized = prodiName.toLowerCase().replace(/[\u2019’']/g, "").trim();
  if (normalized.includes("hukum keluarga") && normalized.includes("s2")) {
    return PRODI_THEMES["Magister Hukum Keluarga Islam / Ahwal al-Syakhshiyyah (S2)"] || [];
  }
  if (normalized.includes("hukum keluarga") || normalized.includes("hki")) {
    return PRODI_THEMES["Hukum Keluarga Islam / Ahwal al-Syakhshiyyah (S1)"] || [];
  }
  if (normalized.includes("pendidikan agama") && normalized.includes("s2")) {
    return PRODI_THEMES["Magister Pendidikan Agama Islam (S2)"] || [];
  }
  if (normalized.includes("pendidikan agama") || normalized.includes("pai")) {
    return PRODI_THEMES["Pendidikan Agama Islam (S1)"] || [];
  }
  if (normalized.includes("manajemen pendidikan") || normalized.includes("mpi")) {
    return PRODI_THEMES["Manajemen Pendidikan Islam (S1)"] || [];
  }
  if (normalized.includes("ekonomi")) {
    return PRODI_THEMES["Ekonomi Syari'ah (S1)"] || [];
  }
  return PRODI_THEMES[prodiName] || (PRODI_THEMES["Pendidikan Agama Islam (S1)"] || []);
};

const getExamQuestions = (courseName: string) => {
  const name = courseName ? courseName.toLowerCase() : "";
  if (name.includes("falak")) {
    return {
      uts: [
        "Jelaskan pengertian sistem koordinat horizon dan ekuator, serta gambarkan skemanya lengkap dengan titik Zenit, Nadir, Utara, Timur, Selatan, dan Barat!",
        "Bagaimana sejarah perkembangan metode penentuan arah kiblat di Indonesia? Analisis relevansi penggunaan kompas magnetik vs. tongkat Istiwa'!",
        "Hitunglah arah kiblat untuk kota Sukabumi jika diketahui koordinat lintang tempat (φ) = -6° 55' LS dan bujur tempat (λ) = 106° 56' BT. Serta bujur Kakbah (λk) = 39° 49' BT dan lintang Kakbah (φk) = 21° 25' LU!",
        "Mengapa penentuan waktu shalat Dzuhur dihitung saat matahari melintasi garis meridian (istiwa) ditambah waktu pengaman (ihtiyath)? Berikan landasan syar'i-nya!",
        "Sebutkan 3 instrumen klasik astronomi Islam yang digunakan untuk observasi matahari dan jelaskan cara kerjanya secara singkat!"
      ],
      uas: [
        "Jelaskan definisi konjungsi (ijtima') dalam astronomi Islam dan mengapa ijtima' menjadi syarat mutlak terjadinya awal bulan baru Hijriah!",
        "Bandingkan metode imkanur rukyat MABIMS baru (ketinggian hilal 3 derajat & elongasi 6.4 derajat) dengan kriteria wujudul hilal klasik dari segi keilmuan dan kepastian hukum!",
        "Gambarkan kedudukan bulan, bumi, dan matahari saat terjadi gerhana matahari total, gerhana matahari sebagian, dan gerhana matahari cincin!",
        "Hitunglah konversi kalender untuk tanggal 1 Syawal 1445 Hijriah ke dalam kalender Masehi menggunakan algoritma hisab kontemporer!",
        "Mengapa perbedaan kriteria hilal masih sering terjadi di Indonesia? Berikan analisis solutif dengan pendekatan integrasi Wahdatul Ulum (Sains dan Fikih)!"
      ]
    };
  } else if (name.includes("hukum") || name.includes("syariah") || name.includes("fikih")) {
    return {
      uts: [
        "Jelaskan urgensi kodifikasi Hukum Keluarga Islam di Indonesia dan bagaimana kedudukannya dalam tata hukum nasional!",
        "Bandingkan konsep perkawinan menurut UU No. 1 Tahun 1974 tentang Perkawinan dengan konsep perkawinan menurut fikih klasik empat madzhab!",
        "Analisis kasus pernikahan di bawah umur yang diajukan ke Pengadilan Agama. Apa saja pertimbangan Hakim dalam memberikan dispensasi kawin?",
        "Jelaskan rukun dan syarat sahnya perkawinan menurut Kompilasi Hukum Islam (KHI). Bagaimanakah status perkawinan sirri di mata hukum negara?",
        "Bagaimana perlindungan hukum terhadap hak-hak istri dan anak yang ditimbulkan akibat terjadinya perceraian?"
      ],
      uas: [
        "Analisis secara mendalam pembagian harta bersama (gono-gini) setelah perceraian dalam prespektif hukum adat, KHI, dan fikih muamalah kontemporer!",
        "Jelaskan sistem kewarisan Islam di Indonesia berdasarkan KHI. Bagaimana kedudukan anak angkat dan ahli waris pengganti dalam menerima wasiat wajibah?",
        "Uraikan konsep pemeliharaan anak (hadhanah) pasca perceraian. Kriteria apa yang digunakan hakim untuk menetapkan hak asuh anak?",
        "Tinjau fenomena pendaftaran perkawinan poligami. Apa syarat-syarat kumulatif dan alternatif yang harus dipenuhi suami menurut UU Perkawinan?",
        "Bagaimanakah implikasi yuridis sertifikasi perkawinan bimbingan pra-nikah dari Kementerian Agama terhadap ketahanan keluarga sakinah?"
      ]
    };
  } else {
    // General high quality fallback
    return {
      uts: [
        `Jelaskan konsep dasar dan ruang lingkup utama dari mata kuliah ${courseName || "ini"} serta signifikansinya dalam profil lulusan Program Studi!`,
        "Bagaimana keterkaitan antara CPMK-1 dengan CPL Sikap dan Pengetahuan yang dibebankan pada mata kuliah ini? Berikan contoh konkritnya!",
        "Analisis sejarah, teori, dan perkembangan mutakhir dari konsep utama yang dipelajari pada paruh pertama semester ini!",
        "Selesaikan studi kasus yang diberikan dosen mengenai penerapan metode pemecahan masalah (Problem-Based Learning) sesuai materi pekan ke-5!",
        "Jelaskan bagaimana kriteria objektif penilaian tugas dapat menjamin keadilan evaluasi bagi seluruh mahasiswa!"
      ],
      uas: [
        "Lakukan tinjauan kritis (critical review) terhadap modul pembelajaran paruh kedua semester ini. Apa saja kelemahan teoritis dan kepraktisannya?",
        "Bagaimana rancangan proyek akhir kelompok Anda memecahkan problem sosial riil di masyarakat dengan memanfaatkan keilmuan mata kuliah ini?",
        "Uraikan analisis komparatif antara teori konvensional dengan gagasan kontemporer terkait objek sasar materi pembelajaran pekan ke-12 s.d. 14!",
        "Jelaskan implikasi praktis dan etis dari implementasi keilmuan ini di dunia kerja nyata masa depan Anda!",
        "Berikan rekomendasi strategis bagi pengembangan kurikulum mata kuliah ini agar lebih adaptif terhadap perkembangan teknologi global!"
      ]
    };
  }
};

export default function App() {
  // SSO State
  const [ssoUser, setSsoUser] = useState<SSOUser>({
    loggedIn: true,
    username: "aksara.almaqashid",
    fullName: "Dr. H. Aksara Almaqashid, M.Ag.",
    email: "aksara.almaqashid@gmail.com",
    role: "Dosen",
    fakultas: "Fakultas Tarbiyah",
    prodi: "Pendidikan Agama Islam (S1)",
    nidn: "197805122005011003"
  });

  const [showSsoModal, setShowSsoModal] = useState<boolean>(false);
  const [tempSso, setTempSso] = useState<Partial<SSOUser>>({
    fullName: "Asep Indra Gunawan, Lc., M.Ag.",
    nidn: "2110108304",
    role: "Kapordi",
  });

  // Current RPS Draft
  const [rpsData, setRpsData] = useState<RPSData | null>(null);
  
  // Selection Forms
  const [selectedProdiIndex, setSelectedProdiIndex] = useState<number>(0);
  const [customCourseName, setCustomCourseName] = useState<string>("");
  const [customCourseCode, setCustomCourseCode] = useState<string>("");
  const [selectedTheme, setSelectedTheme] = useState<string>("Mata Kuliah Umum & Keilmuan Dasar");
  const [sksTeori, setSksTeori] = useState<number>(2);
  const [sksPraktik, setSksPraktik] = useState<number>(0);
  const [semester, setSemester] = useState<number>(5);
  const [customNotes, setCustomNotes] = useState<string>("");

  // Administrative States
  const [dosenPengembang, setDosenPengembang] = useState<string>("");
  const [nidnDosenPengembang, setNidnDosenPengembang] = useState<string>("");
  const [koordinatorRMK, setKoordinatorRMK] = useState<string>("");
  const [nidnKoordinatorRMK, setNidnKoordinatorRMK] = useState<string>("");
  const [koordinatorProdi, setKoordinatorProdi] = useState<string>("");
  const [nidnKoordinatorProdi, setNidnKoordinatorProdi] = useState<string>("");

  // Edit states
  const [editingMetadata, setEditingMetadata] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"visualizer" | "meetings" | "tm" | "contract" | "preview">("visualizer");
  const [generationLoading, setGenerationLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Selected CPLs checklist state
  const [checkedCplIds, setCheckedCplIds] = useState<Record<string, boolean>>(() => {
    const initialMap: Record<string, boolean> = {};
    if (typeof window !== "undefined" && ACADEMIC_STUDY_PROGRAMS && ACADEMIC_STUDY_PROGRAMS[0]) {
      ACADEMIC_STUDY_PROGRAMS[0].defaultCPLs.forEach(c => {
        initialMap[c.id] = true;
      });
    }
    return initialMap;
  });

  const toggleCpl = (id: string) => {
    const isChecked = checkedCplIds[id] || false;
    const nextMap = { ...checkedCplIds, [id]: !isChecked };
    setCheckedCplIds(nextMap);
    
    // Also sync to drafted CPLs in real time so the document updates immediately
    if (rpsData) {
      const parentProdi = ACADEMIC_STUDY_PROGRAMS[selectedProdiIndex];
      const nextActiveCpls = parentProdi.defaultCPLs.filter(c => nextMap[c.id]);
      setRpsData({
        ...rpsData,
        cpl: nextActiveCpls
      });
    }
  };

  // Bloom's taxonomy visualizer level
  const [selectedBloomLevel, setSelectedBloomLevel] = useState<string>("C4");

  // Student grades state for dynamic 16-week evaluations
  const [studentGrades, setStudentGrades] = useState<Record<number, number>>({
    1: 85, 2: 82, 3: 88, 4: 90, 5: 84, 6: 86, 7: 85, 8: 88,
    9: 82, 10: 85, 11: 87, 12: 89, 13: 85, 14: 88, 15: 86, 16: 91
  });

  // Dynamic weekly mappings to power OBE assessment tables
  const getWeekMappings = (mingguKe: number) => {
    if (!rpsData || rpsData.cpl.length === 0 || rpsData.cpmk.length === 0) {
      return { cpl: null, cpmk: null };
    }
    const cpmks = rpsData.cpmk;
    const cpls = rpsData.cpl;
    const cpmkObj = cpmks[(mingguKe - 1) % cpmks.length];
    const cplObj = cpls[(mingguKe - 1) % cpls.length];
    return { cpl: cplObj, cpmk: cpmkObj };
  };

  const computeCplAchievement = (cplId: string) => {
    if (!rpsData) return 85;
    let totalWeightedGrade = 0;
    let totalWeight = 0;
    rpsData.pertemuan.forEach(p => {
      const { cpl } = getWeekMappings(p.mingguKe);
      if (cpl && cpl.id === cplId) {
        totalWeightedGrade += (studentGrades[p.mingguKe] || 85) * p.bobotPenilaian;
        totalWeight += p.bobotPenilaian;
      }
    });
    if (totalWeight === 0) return 85; 
    return Math.round(totalWeightedGrade / totalWeight);
  };

  // Load standard template on startup or preset click
  useEffect(() => {
    // Default load "Ilmu Falak II"
    handleLoadPreset("Ilmu Falak II");
  }, []);

  // Update check states when prodi changes or preset changes
  const handleLoadPreset = (presetName: string) => {
    const preset = PRESETS_RPS_SAMPLES[presetName];
    if (preset) {
      setRpsData(JSON.parse(JSON.stringify(preset)));
      setCustomCourseName(preset.meta.namaMataKuliah);
      setCustomCourseCode(preset.meta.kodeMK);
      setSksTeori(preset.meta.sksteori);
      setSksPraktik(preset.meta.skspraktik);
      setSemester(preset.meta.semester);
      
      // Update our new administrative states from preset!
      setDosenPengembang(preset.meta.dosenPengembang || "");
      setNidnDosenPengembang(preset.meta.nidnDosenPengembang || "");
      setKoordinatorRMK(preset.meta.koordinatorRMK || "");
      setNidnKoordinatorRMK(preset.meta.nidnKoordinatorRMK || "");
      setKoordinatorProdi(preset.meta.koordinatorProdi || "");
      setNidnKoordinatorProdi(preset.meta.nidnKoordinatorProdi || "");
      
      const matchedProdiIndex = ACADEMIC_STUDY_PROGRAMS.findIndex(
        p => p.prodi.toLowerCase().includes(preset.meta.programStudi.toLowerCase()) || 
             preset.meta.programStudi.toLowerCase().includes(p.prodi.toLowerCase())
      );
      if (matchedProdiIndex !== -1) {
        setSelectedProdiIndex(matchedProdiIndex);
        const themes = getThemesForProdi(ACADEMIC_STUDY_PROGRAMS[matchedProdiIndex].prodi);
        if (themes.length > 0) {
          const presetTheme = preset.meta.theme || preset.meta.rumpunMK || "";
          const foundMatch = themes.find(t => t.toLowerCase().includes(presetTheme.toLowerCase()) || presetTheme.toLowerCase().includes(t.toLowerCase()));
          setSelectedTheme(foundMatch || themes[0]);
        }
      }
      
      // select and check the CPLs loaded from preset
      const checkMap: Record<string, boolean> = {};
      preset.cpl.forEach((c: CplProdi) => {
        checkMap[c.id] = true;
      });
      setCheckedCplIds(checkMap);
      setErrorMessage(null);
    }
  };

  // Sync state when Study Program changes
  const handleProdiChange = (index: number) => {
    setSelectedProdiIndex(index);
    const selectedProdi = ACADEMIC_STUDY_PROGRAMS[index];
    
    // Auto populate theme based on first available theme for that prodi
    const themes = getThemesForProdi(selectedProdi.prodi);
    if (themes.length > 0) {
      setSelectedTheme(themes[0]);
    }
    
    // Auto populate course suggestions based on selection
    let targetMKName = "";
    let targetMKKode = "";
    let targetMKSks = 2;
    if (selectedProdi.mataKuliahCatalog.length > 0) {
      const firstMK = selectedProdi.mataKuliahCatalog[0];
      targetMKName = firstMK.nama;
      targetMKKode = firstMK.kode;
      targetMKSks = firstMK.sks;
      setCustomCourseName(firstMK.nama);
      setCustomCourseCode(firstMK.kode);
      setSksTeori(firstMK.sks);
      setSksPraktik(0);
    }

    // Check all default CPLs
    const checkMap: Record<string, boolean> = {};
    selectedProdi.defaultCPLs.forEach(c => {
      checkMap[c.id] = true;
    });
    setCheckedCplIds(checkMap);

    // Also update rpsData draft in real-time to prevent desynchronization of the preview!
    if (rpsData) {
      setRpsData({
        ...rpsData,
        meta: {
          ...rpsData.meta,
          programStudi: selectedProdi.prodi,
          fakultas: selectedProdi.fakultas,
          namaMataKuliah: targetMKName || rpsData.meta.namaMataKuliah,
          kodeMK: targetMKKode || rpsData.meta.kodeMK,
          sksteori: targetMKSks,
        },
        cpl: selectedProdi.defaultCPLs
      });
    }
  };



  // AI Generator invoker
  const handleGenerateRPS = async () => {
    setGenerationLoading(true);
    setErrorMessage(null);
    
    const selectedProdi = ACADEMIC_STUDY_PROGRAMS[selectedProdiIndex];
    
    // gather only checked CPLs to feed into AI
    const activeCpls = selectedProdi.defaultCPLs.filter(c => checkedCplIds[c.id]);

    try {
      const response = await fetch("/api/generate-rps", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseName: customCourseName || "Mata Kuliah Baru",
          courseCode: customCourseCode,
          prodi: selectedProdi.prodi,
          fakultas: selectedProdi.fakultas,
          sksTeori,
          sksPraktik,
          semester,
          theme: selectedTheme,
          academicCpls: activeCpls,
          dosenPengembang,
          nidnDosenPengembang,
          koordinatorRMK,
          nidnKoordinatorRMK,
          koordinatorProdi,
          nidnKoordinatorProdi,
          customNotes: customNotes + ` [Dosen Pengembang diinstruksikan oleh: ${ssoUser.fullName}, NIDN ${ssoUser.nidn}]`
        })
      });

      if (!response.ok) {
        let errMsg = `Gagal membangun RPS. Server merespon dengan status ${response.status}.`;
        try {
          const errData = await response.json();
          errMsg = errData.details || errData.error || errMsg;
        } catch {
          try {
            const txt = await response.text();
            if (txt) {
              const cleanTxt = txt.length > 500 ? txt.substring(0, 500) + "..." : txt;
              errMsg += ` Detail: "${cleanTxt}"`;
            }
          } catch {}
        }
        throw new Error(errMsg);
      }

      const generatedRps = await response.json();
      setRpsData(generatedRps);
      
      // Update our new administrative states from generated RPS!
      if (generatedRps?.meta) {
        setDosenPengembang(generatedRps.meta.dosenPengembang || "");
        setNidnDosenPengembang(generatedRps.meta.nidnDosenPengembang || "");
        setKoordinatorRMK(generatedRps.meta.koordinatorRMK || "");
        setNidnKoordinatorRMK(generatedRps.meta.nidnKoordinatorRMK || "");
        setKoordinatorProdi(generatedRps.meta.koordinatorProdi || "");
        setNidnKoordinatorProdi(generatedRps.meta.nidnKoordinatorProdi || "");
      }

      // switch to interactive meetings tab
      setActiveTab("visualizer");
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || "Koneksi ke backend bermasalah. Anda tetap bisa menggunakan data default yang sangat lengkap untuk disunting.");
    } finally {
      setGenerationLoading(false);
    }
  };

  // State mutators for manual tuning / custom curation of generated RPS elements:
  const updateMetaField = (field: string, value: any) => {
    if (!rpsData) return;
    setRpsData({
      ...rpsData,
      meta: {
        ...rpsData.meta,
        [field]: value
      }
    });
  };

  const updatePertemuanCell = (index: number, field: keyof Pertemuan, value: any) => {
    if (!rpsData) return;
    const copiedPertemuan = [...rpsData.pertemuan];
    copiedPertemuan[index] = {
      ...copiedPertemuan[index],
      [field]: value
    };
    setRpsData({
      ...rpsData,
      pertemuan: copiedPertemuan
    });
  };

  const addCpmkRow = () => {
    if (!rpsData) return;
    const nextId = `CPMK-${rpsData.cpmk.length + 1}`;
    const newCpmk: Cpmk = {
      id: nextId,
      deskripsi: "Tulis pencapaian lulusan mata kuliah disini...",
      cplIds: rpsData.cpl.length > 0 ? [rpsData.cpl[0].id] : []
    };
    setRpsData({
      ...rpsData,
      cpmk: [...rpsData.cpmk, newCpmk]
    });
  };

  const deleteCpmkRow = (id: string) => {
    if (!rpsData) return;
    setRpsData({
      ...rpsData,
      cpmk: rpsData.cpmk.filter(c => c.id !== id),
      subCpmk: rpsData.subCpmk.filter(s => s.cpmkId !== id)
    });
  };

  const addSubCpmkRow = (parentCpmkId: string) => {
    if (!rpsData) return;
    const nextId = `SUB-CPMK-${rpsData.subCpmk.length + 1}`;
    const newSub: SubCpmk = {
      id: nextId,
      deskripsi: "Kemampuan akhir tiap tahapan belajar...",
      cpmkId: parentCpmkId
    };
    setRpsData({
      ...rpsData,
      subCpmk: [...rpsData.subCpmk, newSub]
    });
  };

  const deleteSubCpmkRow = (id: string) => {
    if (!rpsData) return;
    setRpsData({
      ...rpsData,
      subCpmk: rpsData.subCpmk.filter(s => s.id !== id)
    });
  };

  // Helper calculation
  const totalMeetingWeight = rpsData?.pertemuan.reduce((sum, p) => sum + (p.bobotPenilaian || 0), 0) || 0;

  // Render a visual tag for taxonomy level
  const formatBloomTag = (text: string) => {
    const verbs = ["menganalisa", "menyusun", "merumuskan", "mengaplikasikan", "mengevaluasi", "mendesain", "memahami", "menjelaskan"];
    const matched = verbs.find(v => text.toLowerCase().includes(v));
    if (matched) {
      if (["menyusun", "merumuskan", "mendesain"].includes(matched)) return "C6 (Kreasi)";
      if (["mengevaluasi", "menguji"].includes(matched)) return "C5 (Evaluasi)";
      if (["menganalisa", "membandingkan"].includes(matched)) return "C4 (Analisis)";
      if (["mengaplikasikan", "menghitung", "mengkonversi"].includes(matched)) return "C3 (Aplikasi)";
      return "C2 (Pemahaman)";
    }
    return "C3 (Aplikasi)";
  };

  // Trigger HTML download with perfect offline A4 Landscape auto-configuration
  const handleDownloadHTML = () => {
    if (!rpsData) return;
    const element = document.getElementById("complete-rps-document");
    if (!element) return;
    
    // Wrap with an outstanding, highly responsive offline-viewing container 
    // and print-friendly engine configured specifically for A4 Landscape.
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="id">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>RPS OBE - ${rpsData.meta.namaMataKuliah} (${rpsData.meta.kodeMataKuliah})</title>
        <!-- Tailwind CSS CDN for exact 1-to-1 visual replication of the interactive applet style -->
        <script src="https://cdn.tailwindcss.com"></script>
        <script>
          tailwind.config = {
            theme: {
              extend: {
                fontFamily: {
                  serif: ['"Times New Roman"', 'Times', 'serif'],
                }
              }
            }
          }
        </script>
        <style>
          /* Global reset and design aesthetics */
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
          
          body {
            font-family: 'Times New Roman', Times, serif;
            background-color: #f8fafc;
            color: #0f172a;
            margin: 0;
            padding: 2.5rem 1.5rem;
            min-height: 100vh;
          }

          /* Elegant A4 Landscape presentation wrapper on screen */
          .document-wrapper {
            background-color: #ffffff;
            width: 100%;
            max-width: 297mm; /* Standard A4 Landscape Width */
            margin: 0 auto;
            padding: 30mm 20mm;
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
            border-radius: 0.75rem;
            border: 1px solid #e2e8f0;
          }

          /* Force black borders and high-contrast tables matching BAN-PT standards */
          table {
            border-collapse: collapse !important;
            width: 100% !important;
            margin-bottom: 5mm !important;
          }
          
          th, td {
            border: 1.2px solid black !important;
            padding: 6px 10px !important;
            vertical-align: top !important;
            word-break: break-word !important;
          }

          tr {
            page-break-inside: avoid !important;
          }

          /* Custom Print Optimization Layer */
          @media print {
            @page {
              size: A4 landscape;
              margin: 10mm 15mm 10mm 15mm;
            }

            body {
              background-color: #ffffff !important;
              background: none !important;
              color: #000000 !important;
              padding: 0 !important;
              margin: 0 !important;
            }

            .document-wrapper {
              box-shadow: none !important;
              border: none !important;
              padding: 0 !important;
              margin: 0 !important;
              max-width: 100% !important;
              width: 100% !important;
            }

            * {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
              color-adjust: exact !important;
            }

            .page-break {
              page-break-before: always !important;
              break-before: page !important;
            }

            .no-print {
              display: none !important;
            }
          }

          /* Floating utility bar for quick actions */
          .utility-bar {
            max-width: 297mm;
            margin: 0 auto 1.5rem auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: #ffffff;
            padding: 0.75rem 1.5rem;
            border-radius: 0.5rem;
            border: 1px solid #e2e8f0;
            box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
          }
        </style>
      </head>
      <body>
        
        <!-- Offline interactive action bar inside exported html document -->
        <div class="utility-bar no-print font-sans text-xs">
          <div class="flex items-center gap-2">
            <span class="flex h-2.5 w-2.5 relative">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span class="font-medium text-slate-700">Draf Ekspor Offline RPS (Siap Print / PDF)</span>
          </div>
          <button 
            onclick="window.print()" 
            class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2 rounded shadow transition-all uppercase tracking-wider cursor-pointer"
          >
            Cetak Sekarang (A4 Landscape)
          </button>
        </div>

        <!-- Render Target Canvas -->
        <div class="document-wrapper filter drop-shadow-sm font-serif">
          ${element.innerHTML}
        </div>

      </body>
      </html>
    `;

    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `RPS_OBE_Landscape_${rpsData.meta.namaMataKuliah.replace(/\s+/g, "_")}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const triggerNativePrint = () => {
    window.print();
  };

  const handleSsoSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSsoUser({
      loggedIn: true,
      username: tempSso.fullName?.toLowerCase().replace(/\s+/g, ".") || "user",
      fullName: tempSso.fullName || "User Akademik",
      email: `${tempSso.fullName?.replace(/\s+/g, "").toLowerCase()}@sanusi.ac.id`,
      role: (tempSso.role as any) || "Dosen",
      fakultas: tempSso.role === "Dosen" ? "Fakultas Syari'ah" : "Fakultas Tarbiyah",
      prodi: tempSso.role === "Dosen" ? "Hukum Keluarga Islam / Ahwal al-Syakhshiyyah (S1)" : "Pendidikan Agama Islam (S1)",
      nidn: tempSso.nidn || "2110108304"
    });
    
    // Automatically match study program with the SSO user's designated prodi
    const matchedIdx = ACADEMIC_STUDY_PROGRAMS.findIndex(p => p.prodi.toLowerCase().includes(tempSso.role === "Dosen" ? "hukum" : "pendidikan"));
    if (matchedIdx !== -1) {
      handleProdiChange(matchedIdx);
    }

    setShowSsoModal(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans transition-all selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* 1. Header & Simulated Integrated secure SSO portal */}
      <header className="no-print bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between py-3">
          <div className="flex items-center gap-4">
            <img 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZ6gfmGc3dV1Us3RI5p8wC67v474a4ZdAZqA&s" 
              alt="Logo" 
              className="h-10 w-10 object-contain" 
            />
            <div>
              <h1 className="text-sm font-bold text-slate-900 leading-tight uppercase">Institut KH. Ahmad Sanusi Sukabumi</h1>
              <p className="text-[10px] text-slate-500 font-medium tracking-wider">SISTEM INFORMASI AKADEMIK • SSO INTEGRATED</p>
            </div>
          </div>

          {/* Secure Single Sign-On simulation widget + Intelligent badge */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-[11px] font-semibold text-blue-700">AI ENGINE ACTIVE</span>
            </div>

            {ssoUser.loggedIn ? (
              <div className="flex items-center gap-2.5 bg-slate-50 p-1.5 pr-3 rounded-full border border-slate-200 text-xs">
                <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-display font-bold shadow-xs">
                  {ssoUser.fullName.charAt(0)}
                </div>
                <div className="hidden sm:block">
                  <div className="font-bold text-slate-900 flex items-center gap-1">
                    {ssoUser.fullName}
                    <Lock className="w-3 h-3 text-indigo-600" title="Koneksi SSO Terenkripsi" />
                  </div>
                  <div className="text-[10px] text-slate-500">NIDN. {ssoUser.nidn} | {ssoUser.role} {ssoUser.prodi.split(" ")[0]}</div>
                </div>
                <button 
                  onClick={() => setShowSsoModal(true)} 
                  className="p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200 transition-colors"
                  title="Ganti Pengguna Akademik SSO"
                  id="btn-switch-sso"
                >
                  <Shuffle className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setShowSsoModal(true)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 shadow-md transition-all cursor-pointer"
                id="btn-login-sso"
              >
                <Fingerprint className="w-4 h-4" /> Sign In via SSO
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6">
        
        {/* Banner Alert for API or Pre-Populated Info */}
        {errorMessage && (
          <div className="no-print bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl shadow-xs">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-amber-900">Pemberitahuan Sistem</p>
                <p className="text-xs text-amber-700 mt-1">{errorMessage}</p>
                <div className="mt-3 flex gap-4">
                  <button 
                    onClick={() => handleLoadPreset("Ilmu Falak II")}
                    className="text-xs bg-amber-100 hover:bg-amber-200 text-amber-900 px-3 py-1.5 rounded-lg border border-amber-300 font-medium transition-all"
                  >
                    Muat Ulang Sampel Fikih & Falak II (Lengkap)
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="no-print grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Input Panel Sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* 1. Academic System Sync Hub */}
            <section className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col gap-4 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-indigo-600" />
                  <h2 className="font-display font-bold text-slate-900">Sistem Adm. Akademik</h2>
                </div>
                <span className="text-[10px] uppercase font-bold text-indigo-600 tracking-wider flex items-center gap-1 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100/50">
                  <Check className="w-3 h-3 text-indigo-600" /> Linked
                </span>
              </div>

              {/* Study Program Selector */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-slate-700">Program Studi / Fakultas</label>
                <select 
                  value={selectedProdiIndex}
                  onChange={(e) => handleProdiChange(parseInt(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-lg p-2.5 text-xs font-medium focus:ring-1 focus:ring-indigo-500 transition-all text-slate-800"
                  id="select-prodi"
                >
                  {ACADEMIC_STUDY_PROGRAMS.map((p, idx) => (
                    <option key={p.prodi} value={idx}>{p.prodi} ({p.fakultas})</option>
                  ))}
                </select>
              </div>



              {/* Custom Overrides Input */}
              <div className="flex flex-col gap-3 pt-2">
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-semibold text-slate-600">Kode Mata Kuliah</label>
                    <input 
                      type="text"
                      placeholder="e.g., MKU-102"
                      value={customCourseCode}
                      onChange={(e) => setCustomCourseCode(e.target.value)}
                      className="bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-lg p-2 text-xs focus:ring-1 focus:ring-indigo-500 text-slate-800"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-slate-700">Nama Mata Kuliah</label>
                  <input 
                    type="text"
                    placeholder="e.g., Ilmu Fikih Syariah"
                    value={customCourseName}
                    onChange={(e) => setCustomCourseName(e.target.value)}
                    className="bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-lg p-2.5 text-xs text-slate-800"
                  />
                </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-semibold text-slate-600">Semester</label>
                    <select
                      value={semester}
                      onChange={(e) => setSemester(parseInt(e.target.value))}
                      className="bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-lg p-2 text-xs text-slate-800"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map(s => (
                        <option key={s} value={s}>Semester {s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-semibold text-slate-600">SKS Teori</label>
                    <input 
                      type="number"
                      min={0}
                      max={6}
                      value={sksTeori}
                      onChange={(e) => setSksTeori(parseInt(e.target.value) || 0)}
                      className="bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-lg p-2 text-xs text-slate-800"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-semibold text-slate-600">SKS Praktik</label>
                    <input 
                      type="number"
                      min={0}
                      max={6}
                      value={sksPraktik}
                      onChange={(e) => setSksPraktik(parseInt(e.target.value) || 0)}
                      className="bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-lg p-2 text-xs text-slate-800"
                    />
                  </div>
                </div>

                {/* Tim Pengampu & Pengesahan */}
                <div className="border-t border-slate-100 pt-3.5 mt-2 flex flex-col gap-3">
                  <div className="flex items-center gap-1.5 pb-1">
                    <Users className="w-3.5 h-3.5 text-indigo-600" />
                    <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Tim Pengampu & Pengesahan</span>
                  </div>

                  <div className="flex flex-col gap-3.5 bg-slate-50/50 p-3 rounded-xl border border-slate-200/60 font-sans">
                    {/* Dosen Pengampu */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wide">01. Dosen Pengampu MK</label>
                      <input 
                        type="text"
                        placeholder="e.g., Dr. H. Aksara Al-Maqashid"
                        value={dosenPengembang}
                        onChange={(e) => {
                          const val = e.target.value;
                          setDosenPengembang(val);
                          if (rpsData) updateMetaField("dosenPengembang", val);
                        }}
                        className="bg-white border border-slate-200 focus:border-indigo-500 rounded-lg p-2 text-xs focus:ring-1 focus:ring-indigo-500 text-slate-800"
                      />
                      <input 
                        type="text"
                        placeholder="NIDN Dosen (e.g. 2115088201)"
                        value={nidnDosenPengembang}
                        onChange={(e) => {
                          const val = e.target.value;
                          setNidnDosenPengembang(val);
                          if (rpsData) updateMetaField("nidnDosenPengembang", val);
                        }}
                        className="bg-white border border-slate-200 focus:border-indigo-500 rounded-lg p-2 font-mono text-[10px] focus:ring-1 focus:ring-indigo-500 text-slate-800"
                      />
                    </div>

                    {/* Koordinator RMK */}
                    <div className="flex flex-col gap-1.5 border-t border-slate-200/50 pt-2.5">
                      <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wide">02. Koordinator RMK</label>
                      <input 
                        type="text"
                        placeholder="e.g., Dr. H. Encep Taufiq Rahman, M.Ag."
                        value={koordinatorRMK}
                        onChange={(e) => {
                          const val = e.target.value;
                          setKoordinatorRMK(val);
                          if (rpsData) updateMetaField("koordinatorRMK", val);
                        }}
                        className="bg-white border border-slate-200 focus:border-indigo-500 rounded-lg p-2 text-xs focus:ring-1 focus:ring-indigo-500 text-slate-800"
                      />
                      <input 
                        type="text"
                        placeholder="NIDN Koordinator (e.g. 2001077901)"
                        value={nidnKoordinatorRMK}
                        onChange={(e) => {
                          const val = e.target.value;
                          setNidnKoordinatorRMK(val);
                          if (rpsData) updateMetaField("nidnKoordinatorRMK", val);
                        }}
                        className="bg-white border border-slate-200 focus:border-indigo-500 rounded-lg p-2 font-mono text-[10px] focus:ring-1 focus:ring-indigo-500 text-slate-800"
                      />
                    </div>

                    {/* Ketua Prodi */}
                    <div className="flex flex-col gap-1.5 border-t border-slate-200/50 pt-2.5">
                      <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wide">03. Ketua Program Studi</label>
                      <input 
                        type="text"
                        placeholder="e.g., Asep Indra Gunawan, Lc., M.Ag."
                        value={koordinatorProdi}
                        onChange={(e) => {
                          const val = e.target.value;
                          setKoordinatorProdi(val);
                          if (rpsData) updateMetaField("koordinatorProdi", val);
                        }}
                        className="bg-white border border-slate-200 focus:border-indigo-500 rounded-lg p-2 text-xs focus:ring-1 focus:ring-indigo-500 text-slate-800"
                      />
                      <input 
                        type="text"
                        placeholder="NIDN Ketua Prodi (e.g. 2110108304)"
                        value={nidnKoordinatorProdi}
                        onChange={(e) => {
                          const val = e.target.value;
                          setNidnKoordinatorProdi(val);
                          if (rpsData) updateMetaField("nidnKoordinatorProdi", val);
                        }}
                        className="bg-white border border-slate-200 focus:border-indigo-500 rounded-lg p-2 font-mono text-[10px] focus:ring-1 focus:ring-indigo-500 text-slate-800"
                      />
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* 2. Outcome-Based Education (OBE) AI Mapping Panel */}
            <section className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col gap-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <Layers className="w-5 h-5 text-indigo-600" />
                <h2 className="font-display font-bold text-slate-900">OBE & CPL Program Studi</h2>
              </div>

              <div className="text-xs text-slate-500">
                Pilih rentetan Capaian Pembelajaran Lulusan (CPL) yang dibebankan pada mata kuliah ini:
              </div>

              {/* Checklist CPLs */}
              <div className="flex flex-col gap-2 max-h-56 overflow-y-auto border border-slate-100 rounded-lg p-2 bg-slate-50">
                {ACADEMIC_STUDY_PROGRAMS[selectedProdiIndex].defaultCPLs.map(c => {
                  const isChecked = checkedCplIds[c.id] || false;
                  return (
                    <label 
                      key={c.id} 
                      className={`p-2 rounded-lg flex items-start gap-2.5 cursor-pointer transition-all border text-xs ${
                        isChecked 
                          ? "bg-indigo-50/40 border-indigo-300 ring-1 ring-indigo-300" 
                          : "bg-white border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      <input 
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleCpl(c.id)}
                        className="mt-0.5 rounded text-indigo-600 focus:ring-indigo-500 w-3.5 h-3.5"
                      />
                      <div>
                        <div className="font-semibold text-slate-900 flex items-center gap-1">
                          <span className="text-[10px] bg-slate-200 text-slate-700 px-1 py-0.2 rounded font-mono font-bold">{c.kode}</span>
                          {c.kategori}
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{c.deskripsi}</p>
                      </div>
                    </label>
                  );
                })}
              </div>

              {/* Rumpun Preset & Focus Instructions */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700">Rumpun Materi / Karakter Pembelajaran</label>
                <select 
                  value={selectedTheme}
                  onChange={(e) => setSelectedTheme(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-lg p-2.5 text-xs text-slate-800 font-medium"
                >
                  {getThemesForProdi(ACADEMIC_STUDY_PROGRAMS[selectedProdiIndex]?.prodi).map((theme) => (
                    <option key={theme} value={theme}>{theme}</option>
                  ))}
                </select>
              </div>

              {/* Custom focus prompt instructions */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-slate-700 flex items-center justify-between">
                  Petunjuk Tambahan AI <span className="text-[10px] text-slate-400 font-normal">Opsional</span>
                </label>
                <textarea
                  placeholder="e.g. Fokus pada teologi kearifan lokal Sukabumi, gunakan metode Case-Based Learning di pekan terakhir..."
                  rows={2}
                  value={customNotes}
                  onChange={(e) => setCustomNotes(e.target.value)}
                  className="bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-lg p-2.5 text-xs text-slate-800"
                />
              </div>

              {/* GENERATE ACTION BUTTON */}
              <button
                onClick={handleGenerateRPS}
                disabled={generationLoading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white font-semibold rounded-xl text-xs p-3.5 flex items-center justify-center gap-2 transition-all mt-2 cursor-pointer shadow-md uppercase tracking-wider"
                id="btn-generate-rps"
              >
                {generationLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Mendesain RPS berbasis OBE...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-gradient-amber-blue animate-bounce" />
                    Simulasikan Draft OBE via AI
                  </>
                )}
              </button>
            </section>

          </div>

          {/* Interactive Draft Curation & Visualizer Panel */}
          <div className="lg:col-span-8 flex flex-col gap-6">

            {/* Visualizer and Curation Header */}
            {rpsData ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col gap-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest font-display bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100/50">AKTIF: {rpsData.meta.kodeMK}</span>
                    <h2 className="text-2xl font-display font-extrabold text-slate-900 mt-2">{rpsData.meta.namaMataKuliah}</h2>
                    <p className="text-xs text-slate-500 mt-1 flex items-center gap-2">
                      <span>{rpsData.meta.programStudi}</span>
                      <ChevronRight className="w-3 h-3 text-slate-300" />
                      <span>{rpsData.meta.fakultas}</span>
                      <ChevronRight className="w-3 h-3 text-slate-300" />
                      <span className="font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-100">{rpsData.meta.sksteori + rpsData.meta.skspraktik} SKS</span>
                    </p>
                  </div>

                  {/* Actions Bar */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={triggerNativePrint}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-lg text-xs font-bold flex items-center gap-2 cursor-pointer shadow-md transition-all uppercase tracking-wider"
                      title="Cetak & Unduh format PDF Resmi BAN-PT"
                      id="btn-print-pdf"
                    >
                      <Printer className="w-4 h-4" /> <span>Unduh PDF Resmi</span>
                    </button>
                    <button
                      onClick={handleDownloadHTML}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2.5 rounded-lg text-xs font-bold flex items-center gap-2 cursor-pointer transition-all border border-slate-200 uppercase tracking-wider"
                      title="Download format HTML / Import MS Word"
                      id="btn-download-html"
                    >
                      <Download className="w-4 h-4" /> <span>Export HTML</span>
                    </button>
                  </div>
                </div>

                {/* Sub-Tab Navigation for granular tuning */}
                <div className="flex items-center gap-1 bg-slate-100 p-1.5 rounded-xl overflow-x-auto border border-slate-200">
                  <button
                    onClick={() => setActiveTab("visualizer")}
                    className={`shrink-0 px-4 py-2.5 rounded-lg text-xs font-bold transition-all ${
                      activeTab === "visualizer"
                        ? "bg-indigo-600 text-white shadow-sm"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
                    }`}
                  >
                    01. Identitas & CPL
                  </button>
                  <button
                    onClick={() => setActiveTab("meetings")}
                    className={`shrink-0 px-4 py-2.5 rounded-lg text-xs font-bold transition-all ${
                      activeTab === "meetings"
                        ? "bg-indigo-600 text-white shadow-sm"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
                    }`}
                  >
                    02. CPMK & Sub-CPMK
                  </button>
                  <button
                    onClick={() => setActiveTab("tm")}
                    className={`shrink-0 px-4 py-2.5 rounded-lg text-xs font-bold transition-all ${
                      activeTab === "tm"
                        ? "bg-indigo-600 text-white shadow-sm"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
                    }`}
                  >
                    03. Mapping Bloom & RTM
                  </button>
                  <button
                    onClick={() => setActiveTab("contract")}
                    className={`shrink-0 px-4 py-2.5 rounded-lg text-xs font-bold transition-all ${
                      activeTab === "contract"
                        ? "bg-indigo-600 text-white shadow-sm"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
                    }`}
                  >
                    04. Kontrak & Aturan
                  </button>
                  <button
                    onClick={() => setActiveTab("preview")}
                    className={`shrink-0 px-4 py-2.5 rounded-lg text-xs font-bold transition-all ${
                      activeTab === "preview"
                        ? "bg-indigo-600 text-white shadow-sm"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
                    }`}
                  >
                    05. Live Dokumen BAN-PT
                  </button>
                </div>

                {/* Tab Content Display */}

                {/* TAB 1: VISUALIZER (CPL - CPMK Mappings & Bloom's Taxonomy Visualizer) */}
                {activeTab === "visualizer" && (
                  <div className="flex flex-col gap-6 animate-fadeIn">
                                        {/* Course Summary & Description editor */}
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                      <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-3">
                        <label className="text-xs font-bold uppercase text-slate-700 tracking-wider">Deskripsi Singkat Mata Kuliah</label>
                        <button 
                          onClick={() => setEditingMetadata(!editingMetadata)} 
                          className="text-[11px] text-indigo-600 hover:text-indigo-800 hover:underline font-bold"
                        >
                          {editingMetadata ? "Tutup Editor" : "Sunting Detail"}
                        </button>
                      </div>
                      {editingMetadata ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-800">
                          <div className="flex flex-col gap-1 md:col-span-2">
                            <span className="font-semibold text-slate-700">Deskripsi Singkat:</span>
                            <textarea 
                              value={rpsData.meta.deskripsiSingkat}
                              onChange={(e) => updateMetaField("deskripsiSingkat", e.target.value)}
                              rows={3}
                              className="w-full bg-white border border-slate-200 rounded-lg p-2 focus:ring-1 focus:ring-indigo-500"
                            />
                          </div>

                          <div className="flex flex-col gap-1">
                            <span className="font-semibold text-slate-700">Nama Institusi / Universitas:</span>
                            <input 
                              type="text"
                              value={rpsData.meta.institusi || ""}
                              onChange={(e) => updateMetaField("institusi", e.target.value)}
                              placeholder="e.g. Universitas Islam Negeri Sumatera Utara"
                              className="bg-white border border-slate-200 rounded-lg p-2 focus:ring-1 focus:ring-indigo-500"
                            />
                          </div>
                          <div className="flex flex-col gap-1">
                            <span className="font-semibold text-slate-700">Nama Fakultas:</span>
                            <input 
                              type="text"
                              value={rpsData.meta.fakultas || ""}
                              onChange={(e) => updateMetaField("fakultas", e.target.value)}
                              placeholder="e.g. Fakultas Syariah"
                              className="bg-white border border-slate-200 rounded-lg p-2 focus:ring-1 focus:ring-indigo-500"
                            />
                          </div>

                          <div className="flex flex-col gap-1 col-span-1">
                            <span className="font-semibold text-slate-700">Nama Program Studi:</span>
                            <input 
                              type="text"
                              value={rpsData.meta.programStudi || ""}
                              onChange={(e) => updateMetaField("programStudi", e.target.value)}
                              placeholder="e.g. Hukum Keluarga Islam (Ahwal Syakhsiyyah)"
                              className="bg-white border border-slate-200 rounded-lg p-2 focus:ring-1 focus:ring-indigo-500"
                            />
                          </div>
                          <div className="flex flex-col gap-1">
                            <span className="font-semibold text-slate-700">Nama Mata Kuliah:</span>
                            <input 
                              type="text"
                              value={rpsData.meta.namaMataKuliah}
                              onChange={(e) => updateMetaField("namaMataKuliah", e.target.value)}
                              className="bg-white border border-slate-200 rounded-lg p-2 focus:ring-1 focus:ring-indigo-500"
                            />
                          </div>

                          <div className="flex flex-col gap-1">
                            <span className="font-semibold text-slate-700">Kode Mata Kuliah (MK):</span>
                            <input 
                              type="text"
                              value={rpsData.meta.kodeMK}
                              onChange={(e) => updateMetaField("kodeMK", e.target.value)}
                              className="bg-white border border-slate-200 rounded-lg p-2 focus:ring-1 focus:ring-indigo-500"
                            />
                          </div>
                          <div className="flex flex-col gap-1">
                            <span className="font-semibold text-slate-700">Rumpun Mata Kuliah (RMK):</span>
                            <input 
                              type="text"
                              value={rpsData.meta.rumpunMK}
                              onChange={(e) => updateMetaField("rumpunMK", e.target.value)}
                              className="bg-white border border-slate-200 rounded-lg p-2 focus:ring-1 focus:ring-indigo-500"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <div className="flex flex-col gap-1">
                              <span className="font-semibold text-slate-700">SKS Teori:</span>
                              <input 
                                type="number"
                                value={rpsData.meta.sksteori}
                                onChange={(e) => updateMetaField("sksteori", parseInt(e.target.value) || 0)}
                                className="bg-white border border-slate-200 rounded-lg p-2 focus:ring-1 focus:ring-indigo-500"
                              />
                            </div>
                            <div className="flex flex-col gap-1">
                              <span className="font-semibold text-slate-700">SKS Praktik:</span>
                              <input 
                                type="number"
                                value={rpsData.meta.skspraktik}
                                onChange={(e) => updateMetaField("skspraktik", parseInt(e.target.value) || 0)}
                                className="bg-white border border-slate-200 rounded-lg p-2 focus:ring-1 focus:ring-indigo-500"
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="flex flex-col gap-1">
                              <span className="font-semibold text-slate-700">Semester:</span>
                              <input 
                                type="text"
                                value={rpsData.meta.semester}
                                onChange={(e) => updateMetaField("semester", e.target.value)}
                                className="bg-white border border-slate-200 rounded-lg p-2 focus:ring-1 focus:ring-indigo-500"
                              />
                            </div>
                            <div className="flex flex-col gap-1">
                              <span className="font-semibold text-slate-700">Tgl Penyusunan:</span>
                              <input 
                                type="text"
                                value={rpsData.meta.tanggalPenyusunan}
                                onChange={(e) => updateMetaField("tanggalPenyusunan", e.target.value)}
                                className="bg-white border border-slate-200 rounded-lg p-2 focus:ring-1 focus:ring-indigo-500"
                              />
                            </div>
                          </div>

                          <div className="flex flex-col gap-1">
                            <span className="font-semibold text-slate-700">Prasyarat Mata Kuliah:</span>
                            <input 
                              type="text"
                              value={rpsData.meta.mataKuliahSyarat || ""}
                              onChange={(e) => updateMetaField("mataKuliahSyarat", e.target.value)}
                              className="bg-white border border-slate-200 rounded-lg p-2 focus:ring-1 focus:ring-indigo-500 text-xs"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col gap-3">
                          <p className="text-xs text-slate-650 leading-relaxed italic bg-indigo-50/40 p-3 rounded-lg border border-indigo-100/30">
                            "{rpsData.meta.deskripsiSingkat}"
                          </p>
                          
                          {/* Elegant Read-only Overview Grid for these administrative roles */}
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-white p-3 rounded-xl border border-slate-200 mt-1">
                            <div className="flex flex-col text-xs">
                              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">01. Dosen Pengampu MK</span>
                              <span className="font-semibold text-slate-800 mt-1">{rpsData.meta.dosenPengembang || "-"}</span>
                              <span className="text-[10px] text-indigo-600 font-mono mt-0.5">NIDN. {rpsData.meta.nidnDosenPengembang || "2115088201"}</span>
                            </div>
                            <div className="flex flex-col text-xs">
                              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">02. Koordinator RMK</span>
                              <span className="font-semibold text-slate-800 mt-1">{rpsData.meta.koordinatorRMK || "Belum ditentukan"}</span>
                              <span className="text-[10px] text-indigo-600 font-mono mt-0.5">NIDN. {rpsData.meta.nidnKoordinatorRMK || "2001077901"}</span>
                            </div>
                            <div className="flex flex-col text-xs">
                              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">03. Ketua Program Studi</span>
                              <span className="font-semibold text-slate-800 mt-1">{rpsData.meta.koordinatorProdi || "-"}</span>
                              <span className="text-[10px] text-indigo-600 font-mono mt-0.5">NIDN. {rpsData.meta.nidnKoordinatorProdi || "2110108304"}</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Mapped CPL Matrix */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-xs font-bold uppercase text-slate-700 tracking-wider">1. CPMK (Capaian Pembelajaran Mata Kuliah)</label>
                        <button 
                          onClick={addCpmkRow}
                          className="bg-indigo-50 text-indigo-700 border border-indigo-100 text-[11px] px-2.5 py-1.5 rounded-lg hover:bg-indigo-100 font-semibold transition-all flex items-center gap-1 cursor-pointer"
                        >
                          <Plus className="w-3 h-3" /> Tambah CPMK
                        </button>
                      </div>
                      
                      <div className="flex flex-col gap-3">
                        {rpsData.cpmk.map((c, idx) => (
                          <div key={c.id} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm relative">
                            <button
                              onClick={() => deleteCpmkRow(c.id)}
                              className="absolute top-4 right-4 text-red-400 hover:text-red-600 p-1 cursor-pointer"
                              title="Hapus CPMK ini"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-xs font-bold shrink-0">
                                {idx + 1}
                              </div>
                              <div className="flex-1">
                                <span className="text-[10px] bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded font-mono font-bold border border-indigo-100/50">
                                  {c.id}
                                </span>
                                <input
                                  type="text"
                                  value={c.deskripsi}
                                  onChange={(e) => {
                                    const copy = [...rpsData.cpmk];
                                    copy[idx].deskripsi = e.target.value;
                                    setRpsData({ ...rpsData, cpmk: copy });
                                  }}
                                  className="w-full text-xs font-semibold text-slate-800 bg-transparent border-b border-transparent focus:border-slate-300 py-1"
                                />

                                {/* Mapped CPLs list */}
                                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-1.5 flex-wrap">
                                  <span className="text-[10px] text-slate-400 font-medium">Mapped to CPL:</span>
                                  {rpsData.cpl.map(cpl => {
                                    const isMapped = c.cplIds.includes(cpl.id);
                                    return (
                                      <button
                                        key={cpl.id}
                                        onClick={() => {
                                          const copy = [...rpsData.cpmk];
                                          const mappedCpls = isMapped 
                                            ? c.cplIds.filter(id => id !== cpl.id)
                                            : [...c.cplIds, cpl.id];
                                          copy[idx].cplIds = mappedCpls;
                                          setRpsData({ ...rpsData, cpmk: copy });
                                        }}
                                        className={`text-[9px] font-mono px-2 py-0.5 rounded-full border transition-all cursor-pointer ${
                                          isMapped 
                                            ? "bg-indigo-600 text-white border-transparent" 
                                            : "bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200"
                                        }`}
                                      >
                                        {cpl.kode}
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Sub-CPMK Mapping Matrix */}
                    <div className="mt-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <label className="text-xs font-bold uppercase text-slate-700 tracking-wider">2. SUB-CPMK (Kemampuan Akhir Tiap Tahapan Belajar)</label>
                          <p className="text-[10px] text-slate-400">Sub-CPMK merinci kompetensi dari parent CPMK ke tingkat kognitif yang terukur.</p>
                        </div>
                      </div>

                      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col gap-3">
                        {rpsData.cpmk.map(parentCpmk => {
                          const childSubs = rpsData.subCpmk.filter(s => s.cpmkId === parentCpmk.id);
                          return (
                            <div key={parentCpmk.id} className="border-b border-slate-200 pb-3 last:border-b-0 last:pb-0">
                              <span className="text-[10px] font-bold text-slate-400">{parentCpmk.id} Children:</span>
                              <div className="flex flex-col gap-2 mt-2 pl-3">
                                {childSubs.map((sub, sIdx) => (
                                  <div key={sub.id} className="bg-white border border-slate-100 rounded-lg p-2.5 flex items-center justify-between gap-3 text-xs">
                                    <div className="flex-1 flex items-center gap-2">
                                      <span className="text-[9px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-mono font-bold">{sub.id}</span>
                                      <input
                                        type="text"
                                        value={sub.deskripsi}
                                        onChange={(e) => {
                                          const index = rpsData.subCpmk.findIndex(s => s.id === sub.id);
                                          if (index !== -1) {
                                            const copy = [...rpsData.subCpmk];
                                            copy[index].deskripsi = e.target.value;
                                            setRpsData({ ...rpsData, subCpmk: copy });
                                          }
                                        }}
                                        className="flex-1 bg-transparent text-slate-700 font-medium py-0.5 px-1 border-b border-transparent focus:border-slate-200"
                                      />
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded italic">
                                        {formatBloomTag(sub.deskripsi)}
                                      </span>
                                      <button 
                                        onClick={() => deleteSubCpmkRow(sub.id)}
                                        className="text-red-400 hover:text-red-600 p-1"
                                      >
                                        <Trash2 className="w-3 h-3" />
                                      </button>
                                    </div>
                                  </div>
                                ))}
                                <button
                                  onClick={() => addSubCpmkRow(parentCpmk.id)}
                                  className="self-start text-[10px] text-indigo-600 hover:text-indigo-800 hover:underline flex items-center gap-1 font-bold mt-1 cursor-pointer"
                                >
                                  <Plus className="w-3 h-3" /> Tambah Sub-CPMK ke {parentCpmk.id}
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                  </div>
                )}

                {/* TAB 2: 16 MEETINGS SCHEDULE CO-ORDINATION */}
                {activeTab === "meetings" && (
                  <div className="flex flex-col gap-4 animate-fadeIn">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-xs font-bold uppercase text-slate-700 tracking-wider">Matriks Seluruh 16 Pertemuan Akademik</label>
                        <p className="text-[10px] text-slate-400">Sunting detil sub-CPMK, metode luring/daring, bobot nilai, rujukan di tabel per-minggu untuk penyesuaian otomatis.</p>
                      </div>
                      
                      {/* Weight tracker indicator */}
                      <div className="flex items-center gap-2 text-right">
                        <div>
                          <p className="text-xs text-slate-400 font-medium">Beban Bobot</p>
                          <p className={`text-sm font-bold ${totalMeetingWeight === 100 ? "text-indigo-600" : "text-amber-600 animate-pulse"}`}>
                            {totalMeetingWeight} % / 100%
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="overflow-x-auto border border-slate-200 rounded-xl bg-white">
                      <table className="w-full text-xs text-left text-slate-700">
                        <thead className="bg-slate-50 text-[10px] uppercase text-slate-500 border-b border-slate-200">
                          <tr>
                            <th className="p-3 w-16">Pekan</th>
                            <th className="p-3 w-56">Sub-CPMK</th>
                            <th className="p-3 w-48">Indikator Penilaian</th>
                            <th className="p-3 w-44">Metode Luring / Daring</th>
                            <th className="p-3 w-52">Bahan Pembelajaran</th>
                            <th className="p-3 w-20">Bobot %</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {rpsData.pertemuan.map((p, idx) => {
                            const isMidOrFinal = p.mingguKe === 8 || p.mingguKe === 16;
                            return (
                              <tr 
                                key={p.mingguKe} 
                                className={`transition-all ${
                                  isMidOrFinal 
                                    ? "bg-amber-50/50 hover:bg-amber-50" 
                                    : "hover:bg-slate-50"
                                }`}
                              >
                                <td className="p-3 font-mono font-bold text-slate-900 border-r border-slate-100">
                                  {p.mingguKe}
                                </td>
                                
                                <td className="p-3">
                                  <textarea
                                    value={p.subCpmk}
                                    onChange={(e) => updatePertemuanCell(idx, "subCpmk", e.target.value)}
                                    rows={3}
                                    className="w-full bg-transparent border-0 focus:bg-white focus:ring-1 focus:ring-indigo-500 rounded p-1 font-medium text-slate-800 leading-normal resize-y"
                                  />
                                </td>

                                <td className="p-3">
                                  <textarea
                                    value={p.indikator}
                                    onChange={(e) => updatePertemuanCell(idx, "indikator", e.target.value)}
                                    rows={3}
                                    className="w-full bg-transparent border-0 focus:bg-white focus:ring-1 focus:ring-indigo-500 rounded p-1 text-slate-600 leading-normal"
                                  />
                                </td>

                                <td className="p-3">
                                  <div className="flex flex-col gap-1.5">
                                    <input 
                                      type="text"
                                      value={p.metodeLuring}
                                      placeholder="Luring"
                                      onChange={(e) => updatePertemuanCell(idx, "metodeLuring", e.target.value)}
                                      className="w-full bg-transparent border-b border-transparent focus:bg-white focus:border-slate-200 text-[11px] p-0.5 rounded font-mono"
                                    />
                                    <input 
                                      type="text"
                                      value={p.metodeDaring}
                                      placeholder="Daring"
                                      onChange={(e) => updatePertemuanCell(idx, "metodeDaring", e.target.value)}
                                      className="w-full bg-transparent border-b border-transparent focus:bg-white focus:border-slate-200 text-[11px] p-0.5 rounded font-mono text-slate-500"
                                    />
                                  </div>
                                </td>

                                <td className="p-3">
                                  <textarea
                                    value={p.materiPembelajaran}
                                    onChange={(e) => updatePertemuanCell(idx, "materiPembelajaran", e.target.value)}
                                    rows={3}
                                    className="w-full bg-transparent border-0 focus:bg-white focus:ring-1 focus:ring-indigo-500 rounded p-1 text-slate-600 leading-normal"
                                  />
                                </td>

                                <td className="p-3">
                                  <input 
                                    type="number"
                                    min={0}
                                    max={100}
                                    value={p.bobotPenilaian}
                                    onChange={(e) => updatePertemuanCell(idx, "bobotPenilaian", parseInt(e.target.value) || 0)}
                                    className="w-14 bg-slate-100 focus:bg-white border focus:border-indigo-500 rounded p-1.5 font-bold text-center"
                                  />
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                 {/* TAB 3: STUDENT ASSIGNMENTS / RTM */}
                 {activeTab === "tm" && (
                   <div className="flex flex-col gap-6 animate-fadeIn">
                     <div className="border-b border-slate-100 pb-2">
                       <label className="text-xs font-bold uppercase text-slate-700 tracking-wider">Rencana Tugas Mahasiswa (RTM) OBE</label>
                       <p className="text-[10px] text-slate-400">Merangkum penugasan Tugas Terstruktur (Kelompok) dan Tugas Mandiri (Individual).</p>
                     </div>

                     {/* SECTION 1: TUGAS TERSTRUKTUR */}
                     <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 flex flex-col gap-4">
                       <div className="border-b border-slate-200 pb-1.5 flex justify-between items-center">
                         <span className="text-xs font-bold uppercase text-indigo-700">IV.A. Tugas Terstruktur (Rencana Tugas I)</span>
                       </div>

                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <div className="flex flex-col gap-1.5">
                           <label className="text-xs font-bold text-slate-700">Judul Tugas</label>
                           <input 
                             type="text" 
                             value={rpsData.rencanaTugas.judul}
                             onChange={(e) => {
                               setRpsData({
                                 ...rpsData,
                                 rencanaTugas: { ...rpsData.rencanaTugas, judul: e.target.value }
                               });
                             }}
                             className="bg-white border border-slate-200 rounded-lg p-2 text-xs font-medium text-slate-800"
                           />
                         </div>

                         <div className="flex flex-col gap-1.5">
                           <label className="text-xs font-bold text-slate-700">Bentuk Tugas</label>
                           <input 
                             type="text" 
                             value={rpsData.rencanaTugas.bentukTugas}
                             onChange={(e) => {
                               setRpsData({
                                 ...rpsData,
                                 rencanaTugas: { ...rpsData.rencanaTugas, bentukTugas: e.target.value }
                               });
                             }}
                             className="bg-white border border-slate-200 rounded-lg p-2 text-xs font-medium text-slate-800"
                           />
                         </div>
                       </div>

                       <div className="flex flex-col gap-1.5">
                         <label className="text-xs font-bold text-slate-700">Deskripsi Singkat Tugas</label>
                         <textarea 
                           rows={2}
                           value={rpsData.rencanaTugas.deskripsiTugas}
                           onChange={(e) => {
                             setRpsData({
                               ...rpsData,
                               rencanaTugas: { ...rpsData.rencanaTugas, deskripsiTugas: e.target.value }
                             });
                           }}
                           className="bg-white border border-slate-200 rounded-lg p-2 text-xs font-medium text-slate-800"
                         />
                       </div>

                       {/* Steps / Metode Pengerjaan */}
                       <div>
                         <span className="text-xs font-bold text-slate-700 block mb-2">Metode / Tahapan Pengerjaan (Kelompok)</span>
                         <div className="flex flex-col gap-2">
                           {rpsData.rencanaTugas.metodePengerjaan.map((m, mIdx) => (
                             <div key={mIdx} className="flex gap-2 items-center">
                               <span className="text-[9px] bg-indigo-100 text-indigo-700 rounded px-1.5 py-0.5 font-bold font-mono">Langkah {mIdx+1}</span>
                               <input 
                                 type="text"
                                 value={m}
                                 onChange={(e) => {
                                   const copyMetode = [...rpsData.rencanaTugas.metodePengerjaan];
                                   copyMetode[mIdx] = e.target.value;
                                   setRpsData({
                                     ...rpsData,
                                     rencanaTugas: { ...rpsData.rencanaTugas, metodePengerjaan: copyMetode }
                                   });
                                 }}
                                 className="flex-1 bg-white border border-slate-200 rounded-lg p-1.5 text-xs text-slate-800"
                               />
                               <button
                                 onClick={() => {
                                   const copyMetode = rpsData.rencanaTugas.metodePengerjaan.filter((_, idx) => idx !== mIdx);
                                   setRpsData({
                                     ...rpsData,
                                     rencanaTugas: { ...rpsData.rencanaTugas, metodePengerjaan: copyMetode }
                                   });
                                 }}
                                 className="text-red-400 hover:text-red-600 p-1 shrink-0"
                               >
                                 <Trash2 className="w-3.5 h-3.5" />
                               </button>
                             </div>
                           ))}
                           <button
                             onClick={() => {
                               setRpsData({
                                 ...rpsData,
                                 rencanaTugas: {
                                   ...rpsData.rencanaTugas,
                                   metodePengerjaan: [...rpsData.rencanaTugas.metodePengerjaan, "Langkah lanjutan terstruktur..."]
                                 }
                               });
                             }}
                             className="self-start text-[11px] text-indigo-600 hover:text-indigo-800 hover:underline flex items-center gap-1 font-bold cursor-pointer"
                           >
                             <Plus className="w-3 h-3" /> Tambah Langkah Terstruktur
                           </button>
                         </div>
                       </div>
                     </div>

                     {/* SECTION 2: TUGAS MANDIRI */}
                     {(() => {
                       const mData = rpsData.rencanaTugasMandiri || {
                         judul: "Observasi Arah Kiblat Masjid Seketar & Analisis Rumus Trigonometri Bola",
                         bentukTugas: "Laporan Observasi Individu Lapangan (Maks 5 Halaman)",
                         deskripsiTugas: "Tugas mandiri ini bertujuan agar mahasiswa secara individual mempraktikkan verifikasi arah kiblat tempat ibadah di dekat tempat tinggalnya menggunakan prinsip bayangan matahari serta perhitungan trigonometri bola.",
                         metodePengerjaan: [
                           "Langkah 1: Pilih masjid/mushalla di lingkungan tempat tinggal.",
                           "Langkah 2: Ambil koordinat GPS (Lintang, Bujur) menggunakan smartphone.",
                           "Langkah 3: Hitung Azimut Kiblat teoretis menggunakan kalkulasi Trigonometri Bola Ilmu Falak.",
                           "Langkah 4: Cari bayangan garis matahari harian, tandai selisih azimut bangunan fisik masjid.",
                           "Langkah 5: Buat kesimpulan analitis dan saran perbaikan shaf jika terdapat pergerseran."
                         ],
                         bentukLuaran: "Laporan tertulis format PDF disertai dokumentasi lapangan dan coretan rumus perhitungan.",
                         indikatorPenilaian: [
                           "Ketepatan pengambilan koordinat koordinat astronomis (25%)",
                           "Akurasi perhitungan hitungan azimut kiblat secara teorik (35%)",
                           "Format pelaporan, diagram bayang-bayang, dan kejelasan foto (40%)"
                         ],
                         bobotNilai: 15,
                         jadwal: "Dikumpulkan mandiri pada pertemuan ke-10 di portal akademik"
                       };

                       const saveMandiri = (updated: typeof mData) => {
                         setRpsData({
                           ...rpsData,
                           rencanaTugasMandiri: updated
                         });
                       };

                       return (
                         <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 flex flex-col gap-4">
                           <div className="border-b border-slate-200 pb-1.5 flex justify-between items-center">
                             <span className="text-xs font-bold uppercase text-indigo-700">IV.B. Tugas Mandiri (Rencana Tugas II)</span>
                           </div>

                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <div className="flex flex-col gap-1.5">
                               <label className="text-xs font-bold text-slate-700">Judul Tugas Mandiri</label>
                               <input 
                                 type="text" 
                                 value={mData.judul}
                                 onChange={(e) => {
                                   saveMandiri({ ...mData, judul: e.target.value });
                                 }}
                                 className="bg-white border border-slate-200 rounded-lg p-2 text-xs font-medium text-slate-800"
                               />
                             </div>

                             <div className="flex flex-col gap-1.5">
                               <label className="text-xs font-bold text-slate-700">Bentuk Tugas Mandiri</label>
                               <input 
                                 type="text" 
                                 value={mData.bentukTugas}
                                 onChange={(e) => {
                                   saveMandiri({ ...mData, bentukTugas: e.target.value });
                                 }}
                                 className="bg-white border border-slate-200 rounded-lg p-2 text-xs font-medium text-slate-800"
                               />
                             </div>
                           </div>

                           <div className="flex flex-col gap-1.5">
                             <label className="text-xs font-bold text-slate-700">Deskripsi Singkat Tugas Mandiri</label>
                             <textarea 
                               rows={2}
                               value={mData.deskripsiTugas}
                               onChange={(e) => {
                                 saveMandiri({ ...mData, deskripsiTugas: e.target.value });
                               }}
                               className="bg-white border border-slate-200 rounded-lg p-2 text-xs font-medium text-slate-800"
                             />
                           </div>

                           {/* Steps / Metode Pengerjaan */}
                           <div>
                             <span className="text-xs font-bold text-slate-700 block mb-2">Metode / Tahapan Pengerjaan (Mandiri)</span>
                             <div className="flex flex-col gap-2">
                               {mData.metodePengerjaan.map((m, mIdx) => (
                                 <div key={mIdx} className="flex gap-2 items-center">
                                   <span className="text-[9px] bg-teal-100 text-teal-700 rounded px-1.5 py-0.5 font-bold font-mono">Langkah {mIdx+1}</span>
                                   <input 
                                     type="text"
                                     value={m}
                                     onChange={(e) => {
                                       const copyMetode = [...mData.metodePengerjaan];
                                       copyMetode[mIdx] = e.target.value;
                                       saveMandiri({ ...mData, metodePengerjaan: copyMetode });
                                     }}
                                     className="flex-1 bg-white border border-slate-200 rounded-lg p-1.5 text-xs text-slate-800"
                                   />
                                   <button
                                     onClick={() => {
                                       const copyMetode = mData.metodePengerjaan.filter((_, idx) => idx !== mIdx);
                                       saveMandiri({ ...mData, metodePengerjaan: copyMetode });
                                     }}
                                     className="text-red-400 hover:text-red-600 p-1 shrink-0"
                                   >
                                     <Trash2 className="w-3.5 h-3.5" />
                                   </button>
                                 </div>
                               ))}
                               <button
                                 onClick={() => {
                                   saveMandiri({
                                     ...mData,
                                     metodePengerjaan: [...mData.metodePengerjaan, "Langkah lanjutan mandiri..."]
                                   });
                                 }}
                                 className="self-start text-[11px] text-teal-600 hover:text-teal-800 hover:underline flex items-center gap-1 font-bold cursor-pointer"
                               >
                                 <Plus className="w-3 h-3" /> Tambah Langkah Mandiri
                               </button>
                             </div>
                           </div>
                         </div>
                       );
                     })()}

                   </div>
                 )}

                {/* TAB 4: CONTRACTS AND REGULATIONS */}
                {activeTab === "contract" && (
                  <div className="flex flex-col gap-6 animate-fadeIn">
                    <div className="border-b border-slate-100 pb-2">
                      <label className="text-xs font-bold uppercase text-slate-700 tracking-wider">Kontrak Perkuliahan & Aturan Kelas</label>
                      <p className="text-[10px] text-slate-400">Menyepakati tata tertib, hak, kewajiban, dan kriteria kelulusan mahasiswa.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      {/* Class rules check */}
                      <div className="flex flex-col gap-3">
                        <span className="text-xs font-bold text-slate-700 flex items-center justify-between">
                          Tata Tertib Kelas
                        </span>
                        <div className="flex flex-col gap-2">
                          {rpsData.kontrakPerkuliahan.tataTertib.map((t, idx) => (
                            <div key={idx} className="flex gap-2 items-center">
                              <input 
                                type="text"
                                value={t}
                                onChange={(e) => {
                                  const copyRules = [...rpsData.kontrakPerkuliahan.tataTertib];
                                  copyRules[idx] = e.target.value;
                                  setRpsData({
                                    ...rpsData,
                                    kontrakPerkuliahan: { ...rpsData.kontrakPerkuliahan, tataTertib: copyRules }
                                  });
                                }}
                                className="flex-1 bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-800"
                              />
                              <button
                                onClick={() => {
                                  const copyRules = rpsData.kontrakPerkuliahan.tataTertib.filter((_, i) => i !== idx);
                                  setRpsData({
                                    ...rpsData,
                                    kontrakPerkuliahan: { ...rpsData.kontrakPerkuliahan, tataTertib: copyRules }
                                  });
                                }}
                                className="text-slate-400 hover:text-red-500 shrink-0"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Kelulusan weightings editor */}
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col gap-4">
                        <span className="text-xs font-semibold text-slate-800 uppercase tracking-wider block">Kriteria & Persentase Kelulusan</span>
                        
                        <div className="grid grid-cols-2 gap-3 text-xs">
                          <div className="flex flex-col gap-1">
                            <span className="text-slate-600">Presensi / Kehadiran (%)</span>
                            <input 
                              type="number"
                              value={rpsData.kontrakPerkuliahan.kriteriaKelulusan.hadir}
                              onChange={(e) => {
                                setRpsData({
                                  ...rpsData,
                                  kontrakPerkuliahan: {
                                    ...rpsData.kontrakPerkuliahan,
                                    kriteriaKelulusan: { ...rpsData.kontrakPerkuliahan.kriteriaKelulusan, hadir: parseInt(e.target.value) || 0 }
                                  }
                                });
                              }}
                              className="bg-white border rounded-lg p-2 font-bold"
                            />
                          </div>

                          <div className="flex flex-col gap-1">
                            <span className="text-slate-600">Tugas Terstruktur (%)</span>
                            <input 
                              type="number"
                              value={rpsData.kontrakPerkuliahan.kriteriaKelulusan.tugasTerstruktur ?? 15}
                              onChange={(e) => {
                                const newTT = parseInt(e.target.value) || 0;
                                const currentTM = rpsData.kontrakPerkuliahan.kriteriaKelulusan.tugasMandiri ?? 15;
                                setRpsData({
                                  ...rpsData,
                                  kontrakPerkuliahan: {
                                    ...rpsData.kontrakPerkuliahan,
                                    kriteriaKelulusan: { 
                                      ...rpsData.kontrakPerkuliahan.kriteriaKelulusan, 
                                      tugasTerstruktur: newTT,
                                      tugas: newTT + currentTM
                                    }
                                  }
                                });
                              }}
                              className="bg-white border rounded-lg p-2 font-bold"
                            />
                          </div>

                          <div className="flex flex-col gap-1">
                            <span className="text-slate-600">Tugas Mandiri (%)</span>
                            <input 
                              type="number"
                              value={rpsData.kontrakPerkuliahan.kriteriaKelulusan.tugasMandiri ?? 15}
                              onChange={(e) => {
                                const newTM = parseInt(e.target.value) || 0;
                                const currentTT = rpsData.kontrakPerkuliahan.kriteriaKelulusan.tugasTerstruktur ?? 15;
                                setRpsData({
                                  ...rpsData,
                                  kontrakPerkuliahan: {
                                    ...rpsData.kontrakPerkuliahan,
                                    kriteriaKelulusan: { 
                                      ...rpsData.kontrakPerkuliahan.kriteriaKelulusan, 
                                      tugasMandiri: newTM,
                                      tugas: currentTT + newTM
                                    }
                                  }
                                });
                              }}
                              className="bg-white border rounded-lg p-2 font-bold"
                            />
                          </div>

                          <div className="flex flex-col gap-1">
                            <span className="text-slate-600">Ujian Tengah (UTS) (%)</span>
                            <input 
                              type="number"
                              value={rpsData.kontrakPerkuliahan.kriteriaKelulusan.uts}
                              onChange={(e) => {
                                setRpsData({
                                  ...rpsData,
                                  kontrakPerkuliahan: {
                                    ...rpsData.kontrakPerkuliahan,
                                    kriteriaKelulusan: { ...rpsData.kontrakPerkuliahan.kriteriaKelulusan, uts: parseInt(e.target.value) || 0 }
                                  }
                                });
                              }}
                              className="bg-white border rounded-lg p-2 font-bold"
                            />
                          </div>

                          <div className="flex flex-col gap-1">
                            <span className="text-slate-600">Ujian Akhir (UAS) (%)</span>
                            <input 
                              type="number"
                              value={rpsData.kontrakPerkuliahan.kriteriaKelulusan.uas}
                              onChange={(e) => {
                                setRpsData({
                                  ...rpsData,
                                  kontrakPerkuliahan: {
                                    ...rpsData.kontrakPerkuliahan,
                                    kriteriaKelulusan: { ...rpsData.kontrakPerkuliahan.kriteriaKelulusan, uas: parseInt(e.target.value) || 0 }
                                  }
                                });
                              }}
                              className="bg-white border rounded-lg p-2 font-bold"
                            />
                          </div>
                        </div>

                        {/* Sum tracker */}
                        <div className="text-xs border-t border-slate-200 mt-2 pt-3 flex items-center justify-between">
                          <span className="font-semibold text-slate-600">Total Kuantitas Kelulusan:</span>
                          <span className="font-mono font-black text-slate-900 bg-amber-100 px-2.5 py-1 rounded">
                            {rpsData.kontrakPerkuliahan.kriteriaKelulusan.hadir + 
                             (rpsData.kontrakPerkuliahan.kriteriaKelulusan.tugasTerstruktur ?? 15) + 
                             (rpsData.kontrakPerkuliahan.kriteriaKelulusan.tugasMandiri ?? 15) + 
                             rpsData.kontrakPerkuliahan.kriteriaKelulusan.uts + 
                             rpsData.kontrakPerkuliahan.kriteriaKelulusan.uas} % / 100%
                          </span>
                        </div>
                      </div>

                    </div>
                  </div>
                )}

                {/* TAB 5: ACTIVE LIVE BAN-PT DOCUMENT AND PDF ENGINE PREVIEW */}
                {activeTab === "preview" && (
                  <div className="flex flex-col gap-4 animate-fadeIn">
                    
                    <div className="bg-indigo-50/50 text-indigo-950 p-4 rounded-xl border border-indigo-100 flex items-start gap-3">
                      <Info className="w-5 h-5 shrink-0 text-indigo-600" />
                      <div className="text-xs">
                        <p className="font-semibold">Format Dokumen Cetak Terstandar BAN-PT</p>
                        <p className="mt-1 leading-relaxed">Tampilan di bawah adalah draf visual asli yang akan diretas langsung ke print engine browser. Gunakan tombol "Unduh PDF Resmi" di atas untuk menyimpan sebagai dokumen cetak A4 vector yang amat presisi.</p>
                      </div>
                    </div>

                    {/* PDF Document Render Container (the printable part) */}
                    <div className="border border-slate-300 rounded-xl overflow-hidden shadow-md bg-white">
                      
                      {/* RPS Document Canvas styled natively like standard academic reports */}
                      <div 
                        id="complete-rps-document" 
                        className="print-area p-8 sm:p-12 overflow-x-auto text-[11pt] tracking-normal leading-relaxed text-black"
                        style={{ fontFamily: 'Times New Roman, serif' }}
                      >
                        
                        {/* HEADER BAN-PT SECTION WITH OFFICIAL CAMPUS BRANDING */}
                        <table className="w-full border-collapse mb-6" style={{ border: '2px solid black' }}>
                          <tbody>
                            <tr className="align-middle">
                              {/* Campus Logo Column */}
                              <td className="p-2 text-center border-r-2 border-black w-[15%] align-middle bg-white" style={{ borderRight: '2px solid black' }}>
                                <img 
                                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZ6gfmGc3dV1Us3RI5p8wC67v474a4ZdAZqA&s" 
                                  alt="Logo" 
                                  referrerPolicy="no-referrer"
                                  className="w-14 h-12 object-contain mx-auto"
                                />

                              </td>
                              {/* Institution Metadata */}
                              <td className="p-4 text-center border-black w-[85%] bg-white">
                                <h1 className="text-sm font-bold uppercase tracking-wide m-0" style={{ fontSize: '13pt' }}>
                                  {rpsData.meta.institusi || "UNIVERSITAS ISLAM NEGERI SUMATERA UTARA"}
                                </h1>
                                <h2 className="text-xs font-bold uppercase m-0 mt-1" style={{ fontSize: '11pt' }}>
                                  {rpsData.meta.fakultas || "FAKULTAS SYARIAH DAN HUKUM"}
                                </h2>
                                <h3 className="text-xs font-bold uppercase m-0 mt-0.5" style={{ fontSize: '10pt', color: '#312e81' }}>
                                  PROGRAM STUDI {rpsData.meta.programStudi.toUpperCase()}
                                </h3>
                              </td>
                            </tr>
                            <tr className="border-t-2 border-black">
                              <td colSpan={2} className="p-2.5 text-center font-bold uppercase bg-slate-50 text-[11pt]" style={{ borderTop: '2px solid black' }}>
                                RENCANA PEMBELAJARAN SEMESTER (RPS)
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        {/* METADATA INDIVIDUAL COURSE TABLE */}
                        <table className="w-full border-collapse mb-6 text-[10pt]" style={{ border: '1px solid black' }}>
                          <thead>
                            <tr className="bg-slate-100 font-bold border-b border-black">
                              <td className="p-2 border-r border-black w-24">MATA KULIAH (MK)</td>
                              <td className="p-2 border-r border-black w-32">KODE</td>
                              <td className="p-2 border-r border-black">Rumpun MK</td>
                              <td className="p-2 border-r border-black w-28">BOBOT (sks)</td>
                              <td className="p-2 border-r border-black w-24">SEMESTER</td>
                              <td className="p-2">Tgl Penyusunan</td>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="align-top border-b border-black">
                              <td className="p-2 border-r border-black font-bold">{rpsData.meta.namaMataKuliah}</td>
                              <td className="p-2 border-r border-black font-mono">{rpsData.meta.kodeMK}</td>
                              <td className="p-2 border-r border-black">{rpsData.meta.rumpunMK}</td>
                              <td className="p-2 border-r border-black font-medium">
                                T={rpsData.meta.sksteori} P={rpsData.meta.skspraktik}
                              </td>
                              <td className="p-2 border-r border-black">{rpsData.meta.semester}</td>
                              <td className="p-2 font-mono">{rpsData.meta.tanggalPenyusunan}</td>
                            </tr>
                            
                            {/* Signature Sign-Offs rows */}
                            <tr className="bg-slate-50 font-bold border-b border-black">
                              <td colSpan={2} rowSpan={2} className="p-3 border-r border-black text-center align-middle font-bold text-[10pt]" style={{ borderRight: '1px solid black', borderBottom: '1px solid black' }}>OTORISASI / PENGESAHAN</td>
                              <td className="p-1.5 border-r border-black font-semibold text-[9.5pt]" style={{ borderRight: 'none', borderBottom: 'none' }}>Dosen Pengembang RPS</td>
                              <td className="p-1.5 border-r border-black font-semibold text-[9.5pt]" style={{ borderRight: '1px solid black', borderBottom: '1px solid black' }}>Koordinator RMK</td>
                              <td colSpan={2} className="p-1.5 font-semibold text-[9.5pt]" style={{ borderBottom: '1px solid black' }}>Ketua Prodi</td>
                            </tr>
                            <tr className="align-top text-[9.5pt] bg-white h-12">
                              <td className="p-2.5 border-r border-black font-semibold text-slate-800" style={{ borderRight: '1px solid black', borderBottom: '1px solid black' }}>
                                <div>{rpsData.meta.dosenPengembang || "Dr. H. Aksara Al-Maqashid"}</div>
                                <div className="text-[8pt] text-slate-500 font-mono mt-1 font-normal">NIDN. {rpsData.meta.nidnDosenPengembang || "2115088201"}</div>
                              </td>
                              <td className="p-2.5 border-r border-black font-semibold text-slate-800" style={{ borderRight: '1px solid black', borderBottom: '1px solid black' }}>
                                <div>{rpsData.meta.koordinatorRMK || ""}</div>
                                <div className="text-[8pt] text-slate-500 font-mono mt-1 font-normal">NIDN. {rpsData.meta.nidnKoordinatorRMK || "2001077901"}</div>
                              </td>
                              <td colSpan={2} className="p-2.5 font-semibold text-slate-800" style={{ borderBottom: '1px solid black' }}>
                                <div>{rpsData.meta.koordinatorProdi || "Asep Indra Gunawan, Lc., M.Ag."}</div>
                                <div className="text-[8pt] text-slate-500 font-mono mt-1 font-normal">NIDN. {rpsData.meta.nidnKoordinatorProdi || "2110108304"}</div>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        {/* CAPAIAN PEMBELAJARAN (CPL & CPMK) */}
                        <div className="section-title text-[11pt] font-bold uppercase mb-2">I. CAPAIAN PEMBELAJARAN (CP)</div>
                        <table className="w-full border-collapse mb-6 text-[10pt]" style={{ border: '1px solid black' }}>
                          <tbody>
                            {/* Capaian Pembelajaran Left Header Column */}
                            <tr>
                              <td rowSpan={1 + rpsData.cpl.length + 1 + rpsData.cpmk.length + 1 + rpsData.subCpmk.length} className="p-3 font-bold w-[12%] text-center border-r border-black align-middle bg-white max-w-[12%] leading-tight text-[11pt]" style={{ borderRight: '1px solid black', borderBottom: '1px solid black' }}>
                                Capaian<br/>Pembelajaran
                              </td>
                              <td colSpan={2} className="p-2 font-bold bg-slate-100 border-b border-black text-[10pt]">
                                CPL-PRODI yang dibebankan pada MK
                              </td>
                            </tr>
                            {rpsData.cpl.map((c) => (
                              <tr key={c.id} className="border-b border-black bg-white">
                                <td className="p-2 font-bold w-[13%] border-r border-black font-mono bg-white text-[9.5pt]" style={{ borderRight: '1px solid black' }}>{c.kode}</td>
                                <td className="p-2 bg-white text-[9.5pt]">{c.deskripsi}</td>
                              </tr>
                            ))}

                            <tr className="border-b border-black">
                              <td colSpan={2} className="p-2 font-bold bg-slate-100 border-b border-black text-[10pt]" style={{ borderBottom: '1px solid black' }}>
                                Capaian Pembelajaran Mata Kuliah (CPMK)
                              </td>
                            </tr>
                            {rpsData.cpmk.map((c) => (
                              <tr key={c.id} className="border-b border-black bg-white">
                                <td className="p-2 font-bold w-[13%] border-r border-black font-mono bg-white text-[9.5pt]" style={{ borderRight: '1px solid black' }}>{c.id}</td>
                                <td className="p-2 bg-white text-[9.5pt]">
                                  {c.deskripsi} <span className="font-semibold text-slate-700">({c.cplIds.join(", ")})</span>
                                </td>
                              </tr>
                            ))}

                            <tr className="border-b border-black">
                              <td colSpan={2} className="p-2 font-bold bg-slate-100 border-b border-black text-[10pt]" style={{ borderBottom: '1px solid black' }}>
                                Kemampuan akhir tiap tahapan belajar (Sub-CPMK)
                              </td>
                            </tr>
                            {rpsData.subCpmk.map((s, idx) => (
                              <tr key={s.id} className={`${idx === rpsData.subCpmk.length - 1 ? "" : "border-b border-black"} bg-white`}>
                                <td className="p-2 font-bold w-[13%] border-r border-black font-mono bg-white text-[9.5pt]" style={{ borderRight: '1px solid black' }}>{s.id}</td>
                                <td className="p-2 bg-white text-[9.5pt]">{s.deskripsi}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>

                        <div className="page-break"></div>
                        {/* CP - CPMK MATRIX SECTION (PETA PERKULIAHAN) */}
                        <table className="w-full border-collapse mb-6 text-[10pt]" style={{ border: '1px solid black' }}>
                          <tbody>
                            <tr>
                              <td rowSpan={2 + rpsData.cpmk.length} className="p-3 font-bold w-[12%] text-center border-r border-black align-middle bg-white max-w-[12%] leading-tight text-[11pt]" style={{ borderRight: '1px solid black' }}>
                                Peta CPL – CP<br/>MK
                              </td>
                              <td colSpan={rpsData.subCpmk.length + 1} className="p-2 font-bold bg-slate-100 border-b border-black text-[10pt]" style={{ borderBottom: '1px solid black' }}>
                                Peta matriks antara CPL dengan CPMK (Sub CP MK)
                              </td>
                            </tr>
                            <tr className="border-b border-black bg-slate-50 text-center font-bold text-[8.5pt]" style={{ borderBottom: '1px solid black' }}>
                              <td className="p-2 border-r border-black w-[15%]" style={{ borderRight: '1px solid black' }}></td>
                              {rpsData.subCpmk.map((s) => (
                                <td key={s.id} className="p-1 border-r border-black text-center text-[7.5pt] leading-tight font-mono whitespace-normal max-w-[45px]" style={{ borderRight: '1px solid black' }}>
                                  {s.id.replace("SUB CPMK-", "Sub-CPMK ").replace("Sub-CPMK-", "Sub-CPMK ")}
                                </td>
                              ))}
                            </tr>
                            {rpsData.cpmk.map((c, cIdx) => (
                              <tr key={c.id} className={`${cIdx === rpsData.cpmk.length - 1 ? "" : "border-b border-black"} text-center text-[9pt] bg-white`}>
                                <td className="p-2 border-r border-black text-left font-bold font-mono bg-slate-50 w-[15%] style-black-r" style={{ borderRight: '1px solid black' }}>{c.id}</td>
                                {rpsData.subCpmk.map((s) => {
                                  const isMapped = s.cpmkId === c.id;
                                  return (
                                    <td key={s.id} className="p-2 border-r border-black font-black text-center text-[10pt]" style={{ borderRight: '1px solid black' }}>
                                      {isMapped ? "V" : ""}
                                    </td>
                                  );
                                })}
                              </tr>
                            ))}
                          </tbody>
                        </table>

                        {/* DESKRIPSI SINGKAT & REFERENSI */}
                        <div className="section-title text-[11pt] font-bold uppercase mb-2">II. DESKRIPSI UTAMA & RUJUKAN</div>
                        <table className="w-full border-collapse mb-6 text-[10pt]" style={{ border: '1px solid black' }}>
                          <tbody>
                            <tr>
                              <td className="p-2 font-bold w-[25%] border-r border-black bg-slate-50">Deskripsi Singkat Mata Kuliah</td>
                              <td className="p-2">{rpsData.meta.deskripsiSingkat}</td>
                            </tr>
                            <tr>
                              <td className="p-2 font-bold border-r border-black bg-slate-50">Bahan Kajian (Materi Pembelajaran)</td>
                              <td className="p-2">
                                <ol className="list-decimal pl-4 m-0">
                                  {rpsData.meta.bahanKajian.map((bk, i) => (
                                    <li key={i}>{bk}</li>
                                  ))}
                                </ol>
                              </td>
                            </tr>
                            <tr>
                              <td className="p-2 font-bold border-r border-black bg-slate-50">Daftar Pustaka Utama (References)</td>
                              <td className="p-2">
                                <ul className="list-disc pl-4 m-0">
                                  {rpsData.meta.pustakaUtama.map((p, i) => (
                                    <li key={i} className="italic">{p}</li>
                                  ))}
                                </ul>
                              </td>
                            </tr>
                            <tr>
                              <td className="p-2 font-bold border-r border-black bg-slate-50">Daftar Pustaka Pendukung</td>
                              <td className="p-2">
                                <ul className="list-disc pl-4 m-0">
                                  {rpsData.meta.pustakaPendukung.map((p, i) => (
                                    <li key={i} className="text-slate-700 italic">{p}</li>
                                  ))}
                                </ul>
                              </td>
                            </tr>
                            <tr>
                              <td className="p-2 font-bold border-r border-black bg-slate-50">Mata Kuliah Prasyarat (Prerequisites)</td>
                              <td className="p-2 font-mono font-medium">{rpsData.meta.mataKuliahSyarat || "Tidak ada"}</td>
                            </tr>
                          </tbody>
                        </table>

                        {/* THE 16 WEEK MEETINGS TABLE */}
                        <div className="page-break"></div>
                        <div className="section-title text-[11pt] font-bold uppercase mb-2">III. RINCIAN PERTEMUAN (16 PERTEMUAN PENUH)</div>
                        <table className="w-full border-collapse mb-6 text-[9.5pt]" style={{ border: '1px solid black' }}>
                          <thead>
                            <tr className="bg-slate-100 uppercase font-bold text-center border-b border-black text-[8.5pt]">
                              <th rowSpan={2} className="p-2 border-r border-black w-10 text-center align-middle bg-white" style={{ borderRight: '1px solid black', borderBottom: '1px solid black' }}>Mg Ke-</th>
                              <th rowSpan={2} className="p-2 border-r border-black w-48 text-center align-middle bg-white" style={{ borderRight: '1px solid black', borderBottom: '1px solid black' }}>SUB-CPMK (Kemampuan Akhir Yang Diharapkan)</th>
                              <th colSpan={3} className="p-1 border-r border-black text-center bg-slate-50" style={{ borderRight: '1px solid black', borderBottom: '1px solid black' }}>PENILAIAN</th>
                              <th colSpan={2} className="p-1 border-r border-black text-center bg-slate-50" style={{ borderRight: '1px solid black', borderBottom: '1px solid black' }}>Bentuk Pembelajaran, Metode Pembelajaran, Penugasan [Estimasi Waktu]</th>
                              <th rowSpan={2} className="p-2 border-r border-black w-44 text-center align-middle bg-white" style={{ borderRight: '1px solid black', borderBottom: '1px solid black' }}>Materi Pembelajaran [Rujukan]</th>
                              <th rowSpan={2} className="p-2 w-14 text-center align-middle bg-white" style={{ borderBottom: '1px solid black' }}>Bobot (%)</th>
                            </tr>
                            <tr className="bg-slate-100 uppercase font-bold text-center border-b border-black text-[8pt]">
                              <th className="p-1.5 border-r border-black text-center align-middle w-32 bg-white" style={{ borderRight: '1px solid black', borderBottom: '1px solid black' }}>INDIKATOR</th>
                              <th className="p-1.5 border-r border-black text-center align-middle w-32 bg-white" style={{ borderRight: '1px solid black', borderBottom: '1px solid black' }}>KRITERIA & TEHNIK</th>
                              <th rowSpan={1} className="p-1.5 border-r border-black text-center align-middle bg-white" style={{ borderRight: '1px solid black', borderBottom: '1px solid black' }}>METODE</th>
                              <th className="p-1.5 border-r border-black text-center align-middle w-24 bg-white" style={{ borderRight: '1px solid black', borderBottom: '1px solid black' }}>LURING</th>
                              <th className="p-1.5 border-r border-black text-center align-middle w-24 bg-white" style={{ borderRight: '1px solid black', borderBottom: '1px solid black' }}>DARING</th>
                            </tr>
                            <tr className="bg-slate-50 font-mono text-[7.5pt] text-center border-b border-black">
                              <td className="p-1 border-r border-black" style={{ borderRight: '1px solid black', borderBottom: '1px solid black' }}>(1)</td>
                              <td className="p-1 border-r border-black" style={{ borderRight: '1px solid black', borderBottom: '1px solid black' }}>(2)</td>
                              <td className="p-1 border-r border-black" style={{ borderRight: '1px solid black', borderBottom: '1px solid black' }}>(3)</td>
                              <td className="p-1 border-r border-black" style={{ borderRight: '1px solid black', borderBottom: '1px solid black' }}>(4)</td>
                              <td className="p-1 border-r border-black" style={{ borderRight: '1px solid black', borderBottom: '1px solid black' }}>-</td>
                              <td className="p-1 border-r border-black" style={{ borderRight: '1px solid black', borderBottom: '1px solid black' }}>(5)</td>
                              <td className="p-1 border-r border-black" style={{ borderRight: '1px solid black', borderBottom: '1px solid black' }}>(6)</td>
                              <td className="p-1 border-r border-black" style={{ borderRight: '1px solid black', borderBottom: '1px solid black' }}>(7)</td>
                              <td className="p-1" style={{ borderBottom: '1px solid black' }}>(8)</td>
                            </tr>
                          </thead>
                          <tbody>
                            {rpsData.pertemuan.map((p) => {
                              const isEval = p.mingguKe === 8 || p.mingguKe === 16;
                              return (
                                <tr key={p.mingguKe} className={`align-top border-b border-black bg-white ${isEval ? "bg-slate-100 font-bold" : ""}`}>
                                  <td className="p-2 border-r border-black text-center font-mono font-black" style={{ borderRight: '1px solid black', borderBottom: '1px solid black' }}>{p.mingguKe}</td>
                                  <td className="p-2 border-r border-black leading-normal text-[8.5pt]" style={{ borderRight: '1px solid black', borderBottom: '1px solid black' }}>{p.subCpmk}</td>
                                  <td className="p-2 border-r border-black leading-snug text-[8.5pt]" style={{ borderRight: '1px solid black', borderBottom: '1px solid black' }}>{p.indikator}</td>
                                  <td className="p-2 border-r border-black leading-snug text-[8.5pt]" style={{ borderRight: '1px solid black', borderBottom: '1px solid black' }}>{p.kriteriaDanTeknik}</td>
                                  <td className="p-2 border-r border-black text-[8.5pt] leading-snug text-center align-middle font-semibold" style={{ borderRight: '1px solid black', borderBottom: '1px solid black' }}>
                                    {isEval ? "Evaluasi" : "Bentuk non-Tes"}
                                  </td>
                                  <td className="p-2 border-r border-black text-[8.5pt] leading-snug whitespace-normal" style={{ borderRight: '1px solid black', borderBottom: '1px solid black' }}>{p.metodeLuring}</td>
                                  <td className="p-2 border-r border-black text-[8.5pt] leading-snug whitespace-normal" style={{ borderRight: '1px solid black', borderBottom: '1px solid black' }}>{p.metodeDaring}</td>
                                  <td className="p-2 border-r border-black leading-snug text-[8.5pt]" style={{ borderRight: '1px solid black', borderBottom: '1px solid black' }}>{p.materiPembelajaran}</td>
                                  <td className="p-2 text-center font-bold font-mono text-[9.5pt]" style={{ borderBottom: '1px solid black' }}>{p.bobotPenilaian}%</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>

                        <div className="page-break"></div>
                        {/* RENCANA TUGAS MAHASISWA DETAILS */}
                        {(() => {
                          const rtmMandiri = rpsData.rencanaTugasMandiri || {
                            judul: "Observasi Arah Kiblat Masjid Seketar & Analisis Rumus Trigonometri Bola",
                            bentukTugas: "Laporan Observasi Individu Lapangan (Maks 5 Halaman)",
                            deskripsiTugas: "Tugas mandiri ini bertujuan agar mahasiswa secara individual mempraktikkan verifikasi arah kiblat tempat ibadah di dekat tempat tinggalnya menggunakan prinsip bayangan matahari serta perhitungan trigonometri bola.",
                            metodePengerjaan: [
                              "Langkah 1: Pilih masjid/mushalla di lingkungan tempat tinggal.",
                              "Langkah 2: Ambil koordinat GPS (Lintang, Bujur) menggunakan smartphone.",
                              "Langkah 3: Hitung Azimut Kiblat teoretis menggunakan kalkulasi Trigonometri Bola Ilmu Falak.",
                              "Langkah 4: Cari bayangan garis matahari harian, tandai selisih azimut bangunan fisik masjid.",
                              "Langkah 5: Buat kesimpulan analitis dan saran perbaikan shaf jika terdapat pergerseran."
                            ],
                            bentukLuaran: "Laporan tertulis format PDF disertai dokumentasi lapangan dan coretan rumus perhitungan.",
                            indikatorPenilaian: [
                              "Ketepatan pengambilan koordinat koordinat astronomis (25%)",
                              "Akurasi perhitungan hitungan azimut kiblat secara teorik (35%)",
                              "Format pelaporan, diagram bayang-bayang, dan kejelasan foto (40%)"
                            ],
                            bobotNilai: 15,
                            jadwal: "Dikumpulkan mandiri pada pertemuan ke-10 di portal akademik"
                          };
                          
                          return (
                            <>
                              <div className="section-title text-[11pt] font-bold uppercase mb-2">IV. RENCANA TUGAS MAHASISWA (RTM)</div>
                              
                              {/* A. TUGAS TERSTRUKTUR */}
                              <div className="text-[10pt] font-bold uppercase mb-2 px-2 py-1 bg-slate-100 border border-black flex justify-between items-center" style={{ border: '1px solid black' }}>
                                <span>IV.A. Tugas Terstruktur (Rencana Tugas I)</span>
                                <span className="text-[8.5pt] normal-case font-medium text-slate-600 italic">Dikerjakan Berkelompok / Terjadwal</span>
                              </div>
                              <table className="w-full border-collapse mb-6 text-[10pt]" style={{ border: '1px solid black' }}>
                                <tbody>
                                  <tr className="border-b border-black">
                                    <td className="p-2 font-bold w-[25%] border-r border-black bg-slate-50" style={{ borderRight: '1px solid black', borderBottom: '1px solid black' }}>Judul Penugasan</td>
                                    <td className="p-2 font-bold text-indigo-950" style={{ borderBottom: '1px solid black' }}>{rpsData.rencanaTugas.judul}</td>
                                  </tr>
                                  <tr className="border-b border-black">
                                    <td className="p-2 font-bold border-r border-black bg-slate-50" style={{ borderRight: '1px solid black', borderBottom: '1px solid black' }}>Bentuk Tugas</td>
                                    <td className="p-2" style={{ borderBottom: '1px solid black' }}>{rpsData.rencanaTugas.bentukTugas}</td>
                                  </tr>
                                  <tr className="border-b border-black">
                                    <td className="p-2 font-bold border-r border-black bg-slate-50" style={{ borderRight: '1px solid black', borderBottom: '1px solid black' }}>Deskripsi Sasaran Tugas</td>
                                    <td className="p-2 leading-relaxed text-[9.5pt]" style={{ borderBottom: '1px solid black' }}>{rpsData.rencanaTugas.deskripsiTugas}</td>
                                  </tr>
                                  <tr className="border-b border-black">
                                    <td className="p-2 font-bold border-r border-black bg-slate-50" style={{ borderRight: '1px solid black', borderBottom: '1px solid black' }}>Metode & Tahapan Pengerjaan</td>
                                    <td className="p-2" style={{ borderBottom: '1px solid black' }}>
                                      <ul className="list-decimal pl-4 m-0 flex flex-col gap-1 text-[9.5pt]">
                                        {rpsData.rencanaTugas.metodePengerjaan.map((m, idx) => (
                                          <li key={idx} className="leading-snug">{m}</li>
                                        ))}
                                      </ul>
                                    </td>
                                  </tr>
                                  <tr className="border-b border-black">
                                    <td className="p-2 font-bold border-r border-black bg-slate-50" style={{ borderRight: '1px solid black', borderBottom: '1px solid black' }}>Bentuk & Format Luaran</td>
                                    <td className="p-2 italic text-[9.5pt]" style={{ borderBottom: '1px solid black' }}>{rpsData.rencanaTugas.bentukLuaran}</td>
                                  </tr>
                                  <tr className="border-b border-black">
                                    <td className="p-2 font-bold border-r border-black bg-slate-50" style={{ borderRight: '1px solid black', borderBottom: '1px solid black' }}>Rubrik Indikator Penilaian</td>
                                    <td className="p-2" style={{ borderBottom: '1px solid black' }}>
                                      <ul className="list-disc pl-4 m-0 text-[9.5pt]">
                                        {rpsData.rencanaTugas.indikatorPenilaian.map((ind, idx) => (
                                          <li key={idx} className="leading-snug">{ind}</li>
                                        ))}
                                      </ul>
                                    </td>
                                  </tr>
                                  <tr className="border-b border-black">
                                    <td className="p-2 font-bold border-r border-black bg-slate-50" style={{ borderRight: '1px solid black', borderBottom: '1px solid black' }}>Jadwal Pelaksanaan & Bobot</td>
                                    <td className="p-2 text-[9.5pt]" style={{ borderBottom: '1px solid black' }}>
                                      <strong>Jadwal:</strong> {rpsData.rencanaTugas.jadwal} <br />
                                      <strong>Bobot Nilai:</strong> {rpsData.rencanaTugas.bobotNilai}% dari Evaluasi Akhir
                                    </td>
                                  </tr>
                                </tbody>
                              </table>

                              <div className="page-break"></div>

                              {/* B. TUGAS MANDIRI */}
                              <div className="text-[10pt] font-bold uppercase mb-2 px-2 py-1 bg-slate-100 border border-black flex justify-between items-center" style={{ border: '1px solid black' }}>
                                <span>IV.B. Tugas Mandiri (Rencana Tugas II)</span>
                                <span className="text-[8.5pt] normal-case font-medium text-slate-600 italic">Dikerjakan Mandiri / Individual</span>
                              </div>
                              <table className="w-full border-collapse mb-6 text-[10pt]" style={{ border: '1px solid black' }}>
                                <tbody>
                                  <tr className="border-b border-black">
                                    <td className="p-2 font-bold w-[25%] border-r border-black bg-slate-50" style={{ borderRight: '1px solid black', borderBottom: '1px solid black' }}>Judul Penugasan</td>
                                    <td className="p-2 font-bold text-indigo-950" style={{ borderBottom: '1px solid black' }}>{rtmMandiri.judul}</td>
                                  </tr>
                                  <tr className="border-b border-black">
                                    <td className="p-2 font-bold border-r border-black bg-slate-50" style={{ borderRight: '1px solid black', borderBottom: '1px solid black' }}>Bentuk Tugas</td>
                                    <td className="p-2" style={{ borderBottom: '1px solid black' }}>{rtmMandiri.bentukTugas}</td>
                                  </tr>
                                  <tr className="border-b border-black">
                                    <td className="p-2 font-bold border-r border-black bg-slate-50" style={{ borderRight: '1px solid black', borderBottom: '1px solid black' }}>Deskripsi Sasaran Tugas</td>
                                    <td className="p-2 leading-relaxed text-[9.5pt]" style={{ borderBottom: '1px solid black' }}>{rtmMandiri.deskripsiTugas}</td>
                                  </tr>
                                  <tr className="border-b border-black">
                                    <td className="p-2 font-bold border-r border-black bg-slate-50" style={{ borderRight: '1px solid black', borderBottom: '1px solid black' }}>Metode & Tahapan Pengerjaan</td>
                                    <td className="p-2" style={{ borderBottom: '1px solid black' }}>
                                      <ul className="list-decimal pl-4 m-0 flex flex-col gap-1 text-[9.5pt]">
                                        {rtmMandiri.metodePengerjaan.map((m, idx) => (
                                          <li key={idx} className="leading-snug">{m}</li>
                                        ))}
                                      </ul>
                                    </td>
                                  </tr>
                                  <tr className="border-b border-black">
                                    <td className="p-2 font-bold border-r border-black bg-slate-50" style={{ borderRight: '1px solid black', borderBottom: '1px solid black' }}>Bentuk & Format Luaran</td>
                                    <td className="p-2 italic text-[9.5pt]" style={{ borderBottom: '1px solid black' }}>{rtmMandiri.bentukLuaran}</td>
                                  </tr>
                                  <tr className="border-b border-black">
                                    <td className="p-2 font-bold border-r border-black bg-slate-50" style={{ borderRight: '1px solid black', borderBottom: '1px solid black' }}>Rubrik Indikator Penilaian</td>
                                    <td className="p-2" style={{ borderBottom: '1px solid black' }}>
                                      <ul className="list-disc pl-4 m-0 text-[9.5pt]">
                                        {rtmMandiri.indikatorPenilaian.map((ind, idx) => (
                                          <li key={idx} className="leading-snug">{ind}</li>
                                        ))}
                                      </ul>
                                    </td>
                                  </tr>
                                  <tr className="border-b border-black">
                                    <td className="p-2 font-bold border-r border-black bg-slate-50" style={{ borderRight: '1px solid black', borderBottom: '1px solid black' }}>Jadwal Pelaksanaan & Bobot</td>
                                    <td className="p-2 text-[9.5pt]" style={{ borderBottom: '1px solid black' }}>
                                      <strong>Jadwal:</strong> {rtmMandiri.jadwal} <br />
                                      <strong>Bobot Nilai:</strong> {rtmMandiri.bobotNilai}% dari Evaluasi Akhir
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </>
                          );
                        })()}

                        {/* KONTRAK PERKULIAHAN & REGULASI KAMPUS */}
                        <div className="section-title text-[11pt] font-bold uppercase mb-2">V. KONTRAK PELAKSANAAN KELAS & KESEPAKATAN AKADEMIK</div>
                        <table className="w-full border-collapse text-[10pt]" style={{ border: '1px solid black' }}>
                          <tbody>
                            <tr className="bg-slate-50 border-b border-black">
                              <td className="p-2 font-bold w-[25%] border-r border-black bg-slate-100">Hak dan Kewajiban Akademik</td>
                              <td className="p-2">
                                <ul className="list-disc pl-4 m-0 flex flex-col gap-1 text-[9.5pt]">
                                  {rpsData.kontrakPerkuliahan.hakKewajiban.map((hk, i) => (
                                    <li key={i}>{hk}</li>
                                  ))}
                                </ul>
                              </td>
                            </tr>
                            <tr className="border-b border-black">
                              <td className="p-2 font-bold border-r border-black bg-slate-100">Tata Tertib & Kode Etik Perkuliahan</td>
                              <td className="p-2">
                                <ul className="list-disc pl-4 m-0 flex flex-col gap-1 text-[9.5pt]">
                                  {rpsData.kontrakPerkuliahan.tataTertib.map((tt, i) => (
                                    <li key={i}>{tt}</li>
                                  ))}
                                </ul>
                              </td>
                            </tr>
                            <tr className="bg-slate-50">
                              <td className="p-2 font-bold border-r border-black bg-slate-100">Komposisi Bobot Angka Kelulusan</td>
                              <td className="p-2">
                                {(() => {
                                  const totalWeight = rpsData.kontrakPerkuliahan.kriteriaKelulusan.hadir + 
                                    (rpsData.kontrakPerkuliahan.kriteriaKelulusan.tugasTerstruktur ?? 15) + 
                                    (rpsData.kontrakPerkuliahan.kriteriaKelulusan.tugasMandiri ?? 15) + 
                                    rpsData.kontrakPerkuliahan.kriteriaKelulusan.uts + 
                                    rpsData.kontrakPerkuliahan.kriteriaKelulusan.uas;
                                  return (
                                    <table className="w-full border-collapse text-left text-[9pt]" style={{ border: '1px solid black' }}>
                                      <thead>
                                        <tr className="bg-slate-100 font-bold" style={{ borderBottom: '1px solid black' }}>
                                          <th className="p-1 border-r border-black text-center w-[10%]" style={{ borderRight: '1px solid black' }}>No</th>
                                          <th className="p-1 border-r border-black w-[60%]" style={{ borderRight: '1px solid black' }}>Komponen Evaluasi Kelulusan</th>
                                          <th className="p-1 text-center w-[30%]">Bobot Persentase (%)</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr style={{ borderBottom: '1px solid black' }}>
                                          <td className="p-1.5 border-r border-black text-center" style={{ borderRight: '1px solid black' }}>1</td>
                                          <td className="p-1.5 border-r border-black" style={{ borderRight: '1px solid black' }}>Kehadiran / Presensi Tatap Muka</td>
                                          <td className="p-1.5 text-center font-semibold text-slate-800">{rpsData.kontrakPerkuliahan.kriteriaKelulusan.hadir}%</td>
                                        </tr>
                                        <tr style={{ borderBottom: '1px solid black' }}>
                                          <td className="p-1.5 border-r border-black text-center" style={{ borderRight: '1px solid black' }}>2</td>
                                          <td className="p-1.5 border-r border-black" style={{ borderRight: '1px solid black' }}>Tugas Terstruktur (RTM & Umpan Balik)</td>
                                          <td className="p-1.5 text-center font-semibold text-slate-800">{rpsData.kontrakPerkuliahan.kriteriaKelulusan.tugasTerstruktur ?? 15}%</td>
                                        </tr>
                                        <tr style={{ borderBottom: '1px solid black' }}>
                                          <td className="p-1.5 border-r border-black text-center" style={{ borderRight: '1px solid black' }}>3</td>
                                          <td className="p-1.5 border-r border-black" style={{ borderRight: '1px solid black' }}>Tugas Mandiri (Kajian Pustaka & Analisis)</td>
                                          <td className="p-1.5 text-center font-semibold text-slate-800">{rpsData.kontrakPerkuliahan.kriteriaKelulusan.tugasMandiri ?? 15}%</td>
                                        </tr>
                                        <tr style={{ borderBottom: '1px solid black' }}>
                                          <td className="p-1.5 border-r border-black text-center" style={{ borderRight: '1px solid black' }}>4</td>
                                          <td className="p-1.5 border-r border-black" style={{ borderRight: '1px solid black' }}>Ujian Tengah Semester (UTS)</td>
                                          <td className="p-1.5 text-center font-semibold text-slate-800">{rpsData.kontrakPerkuliahan.kriteriaKelulusan.uts}%</td>
                                        </tr>
                                        <tr style={{ borderBottom: '1px solid black' }}>
                                          <td className="p-1.5 border-r border-black text-center" style={{ borderRight: '1px solid black' }}>5</td>
                                          <td className="p-1.5 border-r border-black" style={{ borderRight: '1px solid black' }}>Ujian Akhir Semester (UAS)</td>
                                          <td className="p-1.5 text-center font-semibold text-slate-800">{rpsData.kontrakPerkuliahan.kriteriaKelulusan.uas}%</td>
                                        </tr>
                                        <tr className="font-bold bg-slate-50">
                                          <td colSpan={2} className="p-1.5 border-r border-black text-right pr-4 font-bold" style={{ borderRight: '1px solid black' }}>Total Komposisi Nilai Akhir</td>
                                          <td className="p-1.5 text-center font-bold text-indigo-700">{totalWeight}%</td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  );
                                })()}
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <div className="page-break"></div>
                        {/* VI. METODE & TABEL EVALUASI PENILAIAN */}
                        <div className="mt-8" style={{ pageBreakInside: 'avoid' }}>
                          <div className="section-title text-[11pt] font-bold uppercase mb-2">VI. METODE & TABEL EVALUASI PENILAIAN</div>
                          <table className="w-full border-collapse text-[10pt]" style={{ border: '1px solid black' }}>
                            <thead>
                              <tr className="bg-slate-100 font-bold border-b border-black text-center text-[9pt]">
                                <th className="p-2 border-r border-black w-[20%]">BENTUK TES</th>
                                <th className="p-2 border-r border-black w-[20%]">JENIS TES</th>
                                <th className="p-2 border-r border-black w-[20%]">KISI-KISI INSTRUMEN</th>
                                <th className="p-2 border-r border-black w-[20%] font-bold">INSTRUMEN PENILAIAN</th>
                                <th className="p-2 font-bold w-[20%]">RUBRIK PENILAIAN</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b border-black leading-snug">
                                <td className="p-2 border-r border-black font-semibold text-center bg-slate-50/50">Tes Tertulis / Studi Kasus</td>
                                <td className="p-2 border-r border-black text-center">Esai, Uraian Objektif & Analisis Komprehensif</td>
                                <td className="p-2 border-r border-black text-center text-slate-600">Lampiran VII - Kisi-Kisi Terintegrasi</td>
                                <td className="p-2 border-r border-black text-center text-slate-600">Terlampir dalam Lembar Soal Ujian (Appendix)</td>
                                <td className="p-2 text-center text-slate-600">Deskriptif Analitis, Kriteria & Skala Kuantitatif</td>
                              </tr>
                              <tr className="border-b border-black leading-snug">
                                <td className="p-2 border-r border-black font-semibold text-center bg-slate-50/50">Lembar Observasi Kinerja</td>
                                <td className="p-2 border-r border-black text-center">Praktik Lapangan, Diskusi Kelompok, Simulasi</td>
                                <td className="p-2 border-r border-black text-center text-slate-600">Rubrik Partisipasi Aktif & Keterampilan Praktis</td>
                                <td className="p-2 border-r border-black text-center text-slate-600">Lembar Ceklis Kinerja & Catatan Anekdot</td>
                                <td className="p-2 text-center text-slate-600">Skor Rubrik Holistik Partisipatori</td>
                              </tr>
                              <tr className="leading-snug">
                                <td className="p-2 border-r border-black font-semibold text-center bg-slate-50/50">Penilaian Produk / Portofolio</td>
                                <td className="p-2 border-r border-black text-center">Laporan Proyek Akhir, Desain, Makalah</td>
                                <td className="p-2 border-r border-black text-center text-slate-600">Standar Luaran Dokumen Rencana Tugas Mahasiswa</td>
                                <td className="p-2 border-r border-black text-center text-slate-600">Dokumen Hasil Karya Individu & Kelompok</td>
                                <td className="p-2 text-center text-slate-600">Rubrik Skala Likert 1-5 dengan Rentang Deskripsi</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        {/* VII. TABEL KISI-KISI INSTRUMEN PENILAIAN */}
                        <div className="mt-8">
                          <div className="section-title text-[11pt] font-bold uppercase mb-2">VII. TABEL KISI-KISI INSTRUMEN PENILAIAN (AUDIT KINERJA MAHASISWA)</div>
                          <p className="text-[9pt] text-slate-600 mb-2 italic no-print">
                            💡 <strong>Audit Nilai Interaktif:</strong> Ubah nilai mahasiswa (0-100) di kolom abu-abu di bawah untuk mensimulasikan pencapaian CPL secara dinamis dan instan sebelum mencetak dokumen RPS.
                          </p>
                          <table className="w-full border-collapse text-[9pt]" style={{ border: '1px solid black' }}>
                            <thead>
                              <tr className="bg-slate-100 font-bold border-b border-black text-center text-[8pt]">
                                <th className="p-1 border-r border-black w-[6%]">Mg Ke-</th>
                                <th className="p-1 border-r border-black w-[8%]">CPL</th>
                                <th className="p-1 border-r border-black w-[8%]">CPMK</th>
                                <th className="p-1 border-r border-black w-[36%]">KEMAMPUAN AKHIR YANG DIHARAPKAN (SUB-CPMK)</th>
                                <th className="p-1 border-r border-black w-[15%]">Bentuk Evaluasi / Soal</th>
                                <th className="p-1 border-r border-black w-[7%]">Bobot %</th>
                                <th className="p-1 border-r border-black w-[9%]">Nilai Mhs (0-100)</th>
                                <th className="p-1 border-r border-black w-[10%]">∑ (N) X (B)</th>
                                <th className="p-1 w-[10%]">Ketercapaian CPL (%)</th>
                              </tr>
                            </thead>
                            <tbody>
                              {rpsData.pertemuan.map((p, idx) => {
                                const { cpl, cpmk } = getWeekMappings(p.mingguKe);
                                const currentGrade = studentGrades[p.mingguKe] ?? 85;
                                const totalWeighted = (currentGrade * p.bobotPenilaian) / 100;
                                const isMidOrFinalExam = p.mingguKe === 8 || p.mingguKe === 16;
                                
                                return (
                                  <tr key={idx} className="border-b border-black leading-tight hover:bg-slate-50/50">
                                    <td className="p-1.5 border-r border-black text-center font-bold bg-slate-50">{p.mingguKe}</td>
                                    <td className="p-1.5 border-r border-black text-center font-semibold text-indigo-700">{cpl?.kode || "CPL-3"}</td>
                                    <td className="p-1.5 border-r border-black text-center font-mono text-[8pt] text-indigo-950">{cpmk?.id || "CPMK-1"}</td>
                                    <td className="p-1.5 border-r border-black text-left align-top font-sans text-[8.5pt]">
                                      {p.subCpmk}
                                    </td>
                                    <td className="p-1.5 border-r border-black text-center italic text-slate-700">
                                      {isMidOrFinalExam ? "Ujian Utama Esai" : "Kuis / Problem Case"}
                                    </td>
                                    <td className="p-1.5 border-r border-black text-center font-semibold">{p.bobotPenilaian}%</td>
                                    <td className="p-1 border-r border-black text-center bg-slate-50">
                                      <input 
                                        type="number" 
                                        min="0"
                                        max="100"
                                        value={currentGrade}
                                        onChange={(e) => {
                                          const val = Math.min(100, Math.max(0, parseInt(e.target.value) || 0));
                                          setStudentGrades({
                                            ...studentGrades,
                                            [p.mingguKe]: val
                                          });
                                        }}
                                        className="w-11 text-center bg-white border border-slate-300 rounded p-0.5 text-xs font-bold text-indigo-600 focus:ring-1 focus:ring-indigo-500 no-print"
                                      />
                                      <span className="only-print font-bold text-slate-800">{currentGrade}</span>
                                    </td>
                                    <td className="p-1.5 border-r border-black text-center font-mono font-semibold text-slate-800">{totalWeighted.toFixed(1)}</td>
                                    <td className="p-1.5 text-center font-bold text-emerald-700">{currentGrade}%</td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>

                        <div className="page-break"></div>
                        {/* VIII. TABEL PENILAIAN KETERCAPAIAN CPL PADA MATA KULIAH */}
                        <div className="mt-8" style={{ pageBreakInside: 'avoid' }}>
                          <div className="section-title text-[11pt] font-bold uppercase mb-2">VIII. TABEL PENILAIAN KETERCAPAIAN CPL PADA MATA KULIAH</div>
                          <p className="text-[9.5pt] text-slate-700 mb-3 leading-relaxed">
                            Tabel berikut menyertakan rekapitulasi capaian pembelajaran lulusan (CPL) Program Studi yang dibebankan pada mata kuliah <strong>{rpsData.meta.namaMataKuliah}</strong> berdasarkan kalkulasi rata-rata tertimbang nilai uji/kinerja mahasiswa di atas:
                          </p>
                          <table className="w-full border-collapse text-[10pt]" style={{ border: '1px solid black' }}>
                            <thead>
                              <tr className="bg-slate-100 font-bold border-b border-black text-[9pt]">
                                <th className="p-2 border-r border-black w-[8%] text-center">NO</th>
                                <th className="p-2 border-r border-black w-[52%] text-left">CPL PADA MATA KULIAH ({rpsData.meta.namaMataKuliah})</th>
                                <th className="p-2 border-r border-black w-[20%] text-center">NILAI CAPAIAN (0-100)</th>
                                <th className="p-2 w-[20%] text-center">KETERCAPAIAN CPL (%)</th>
                              </tr>
                            </thead>
                            <tbody>
                              {rpsData.cpl.map((c, idx) => {
                                const achievement = computeCplAchievement(c.id);
                                let statusColor = "text-emerald-700";
                                let bgClass = "bg-emerald-50/10";
                                if (achievement < 80) {
                                  statusColor = "text-amber-700";
                                  bgClass = "bg-amber-50/10";
                                }
                                return (
                                  <tr key={idx} className={`border-b border-black hover:bg-slate-50/40 ${bgClass}`}>
                                    <td className="p-2 border-r border-black text-center font-bold bg-slate-50">{idx + 1}</td>
                                    <td className="p-2 border-r border-black text-left">
                                      <div className="font-bold text-indigo-950">{c.kode} - {c.kategori}</div>
                                      <div className="text-[8.5pt] text-slate-600 leading-snug mt-0.5">{c.deskripsi}</div>
                                    </td>
                                    <td className="p-2 border-r border-black text-center font-mono font-bold text-[11pt] text-slate-800">
                                      {achievement}
                                    </td>
                                    <td className={`p-2 text-center font-bold text-[11pt] ${statusColor}`}>
                                      {achievement}%
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                          <div className="mt-2 text-[8pt] text-slate-500 italic">
                            * Ketercapaian CPL otomatis dihitung menggunakan formula kurikulum berbasis OBE (Outcome-Based Education) dengan bobot dari setiap sub-penilaian sub-CPMK mingguan.
                          </div>
                        </div>

                        {/* IX. CONTOH SOAL UTS DAN UAS */}
                        {(() => {
                          const exams = getExamQuestions(rpsData.meta.namaMataKuliah);
                          return (
                            <div className="mt-8">
                              <div className="section-title text-[11pt] font-bold uppercase mb-2">IX. CONTOH SOAL EVALUASI UTS DAN UAS (KONSEPTUAL & ANALITIS)</div>
                              
                              {/* BOX UTS */}
                              <div className="border border-black p-4 rounded-xl bg-slate-50/30 mb-4" style={{ pageBreakInside: 'avoid' }}>
                                <div className="flex items-center justify-between border-b pb-1.5 mb-3" style={{ borderBottom: '1.5px solid black' }}>
                                  <div>
                                    <h4 className="text-[10pt] font-bold uppercase m-0 tracking-wider">INSTITUT KH. AHMAD SANUSI SUKABUMI</h4>
                                    <p className="text-[8.5pt] text-slate-500 font-semibold m-0">{rpsData.meta.fakultas} / {rpsData.meta.programStudi}</p>
                                  </div>
                                  <div className="text-right">
                                    <span className="px-2 py-0.5 bg-indigo-600 text-white rounded font-mono text-[8pt] font-bold tracking-widest">UTS</span>
                                    <p className="text-[8pt] text-slate-500 m-0 mt-0.5">Waktu: 90 Menit</p>
                                  </div>
                                </div>
                                
                                <div className="text-[9pt] font-bold text-center underline uppercase mb-3 text-indigo-950">UJIAN TENGAH SEMESTER (UTS)</div>
                                
                                <div className="grid grid-cols-2 gap-x-6 text-[8.5pt] mb-3 bg-slate-100/50 p-2 border border-slate-300 rounded-lg">
                                  <div><strong>Mata Kuliah:</strong> {rpsData.meta.namaMataKuliah}</div>
                                  <div><strong>Dosen Pengampu:</strong> {rpsData.meta.dosenPengembang}</div>
                                  <div><strong>SKS / Semester:</strong> {rpsData.meta.sksteori + rpsData.meta.skspraktik} SKS / Semester {rpsData.meta.semester}</div>
                                  <div><strong>Sifat Kelulusan:</strong> Closed Book & Analytical Case</div>
                                </div>
                                
                                <p className="text-[8.5pt] italic text-slate-500 border-b border-dashed pb-1 mb-2 font-semibold">Petunjuk: Selesaikan soal uraian berikut secara komperehensif dan berikan argumentasi teologis/sains yang memadai!</p>
                                
                                <ol className="list-decimal pl-5 text-[9pt] flex flex-col gap-2 leading-relaxed">
                                  {exams.uts.map((question, i) => (
                                    <li key={i} className="font-medium text-slate-800">
                                      {question} <span className="text-[8pt] font-mono text-indigo-600 font-bold ml-1 no-print">[CPMK-{(i % rpsData.cpmk.length) + 1} - Bobot {(15 + (i * 2))}%]</span>
                                    </li>
                                  ))}
                                </ol>
                              </div>

                              {/* BOX UAS */}
                              <div className="border border-black p-4 rounded-xl bg-slate-50/30 font-sans" style={{ pageBreakInside: 'avoid' }}>
                                <div className="flex items-center justify-between border-b pb-1.5 mb-3" style={{ borderBottom: '1.5px solid black' }}>
                                  <div>
                                    <h4 className="text-[10pt] font-bold uppercase m-0 tracking-wider">INSTITUT KH. AHMAD SANUSI SUKABUMI</h4>
                                    <p className="text-[8.5pt] text-slate-500 font-semibold m-0">{rpsData.meta.fakultas} / {rpsData.meta.programStudi}</p>
                                  </div>
                                  <div className="text-right">
                                    <span className="px-2 py-0.5 bg-emerald-600 text-white rounded font-mono text-[8pt] font-bold tracking-widest">UAS</span>
                                    <p className="text-[8pt] text-slate-500 m-0 mt-0.5">Waktu: 120 Menit</p>
                                  </div>
                                </div>
                                
                                <div className="text-[9pt] font-bold text-center underline uppercase mb-3 text-emerald-950">UJIAN AKHIR SEMESTER (UAS)</div>
                                
                                <div className="grid grid-cols-2 gap-x-6 text-[8.5pt] mb-3 bg-slate-100/50 p-2 border border-slate-300 rounded-lg">
                                  <div><strong>Mata Kuliah:</strong> {rpsData.meta.namaMataKuliah}</div>
                                  <div><strong>Dosen Pengampu:</strong> {rpsData.meta.dosenPengembang}</div>
                                  <div><strong>SKS / Semester:</strong> {rpsData.meta.sksteori + rpsData.meta.skspraktik} SKS / Semester {rpsData.meta.semester}</div>
                                  <div><strong>Sifat Kelulusan:</strong> Comprehensive Case-Solving</div>
                                </div>
                                
                                <p className="text-[8.5pt] italic text-slate-500 border-b border-dashed pb-1 mb-2 font-semibold">Petunjuk: Jawablah pertanyaan kritis berikut dengan menyertakan analisis perundang-undangan, ushul fikih, atau dasar metodologi ilmiah yang relevan!</p>
                                
                                <ol className="list-decimal pl-5 text-[9pt] flex flex-col gap-2 leading-relaxed">
                                  {exams.uas.map((question, i) => (
                                    <li key={i} className="font-medium text-slate-800">
                                      {question} <span className="text-[8pt] font-mono text-emerald-600 font-bold ml-1 no-print">[CPMK-{(i % rpsData.cpmk.length) + 1} - Bobot {(15 + (i * 2))}%]</span>
                                    </li>
                                  ))}
                                </ol>
                              </div>
                            </div>
                          );
                        })()}

                        {/* SIGNATURE STAMP BLOCK IN TABLE FORMAT */}
                        <table className="w-full border-collapse text-center text-[9.5pt] mt-12 bg-white" style={{ border: '1.2px solid black', pageBreakInside: 'avoid' }}>
                          <thead>
                            <tr className="bg-slate-100 font-bold border-b border-black text-[10pt]" style={{ borderBottom: '1px solid black' }}>
                              <th colSpan={3} className="p-2 uppercase tracking-wide">Lembar Pengesahan & Tanda Tangan Administrasi Akademik</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-black leading-snug font-semibold text-slate-700 bg-slate-50/50" style={{ borderBottom: '1px solid black' }}>
                              <td className="p-3 w-[33%] border-r border-black" style={{ borderRight: '1px solid black' }}>
                                Disiapkan Oleh:<br/>
                                <span className="font-bold text-slate-900">Dosen Pengembang RPS</span>
                              </td>
                              <td className="p-3 w-[33%] border-r border-black" style={{ borderRight: '1px solid black' }}>
                                Diperiksa Oleh:<br/>
                                <span className="font-bold text-slate-900">Koordinator RMK</span>
                              </td>
                              <td className="p-3 w-[34%]">
                                Sukabumi, {rpsData.meta.tanggalPenyusunan}<br/>
                                Disetujui Oleh: <br/>
                                <span className="font-bold text-slate-900">Ketua Program Studi</span>
                              </td>
                            </tr>
                            <tr className="border-b border-black h-24" style={{ height: '96px', borderBottom: '1px solid black' }}>
                              <td className="p-2 border-r border-black align-middle relative text-center" style={{ borderRight: '1px solid black' }}>

                              </td>
                              <td className="p-2 border-r border-black align-middle relative text-center" style={{ borderRight: '1px solid black' }}>

                              </td>
                              <td className="p-2 align-middle relative text-center">

                              </td>
                            </tr>
                            <tr className="font-semibold text-slate-900">
                              <td className="p-2.5 border-r border-black text-center" style={{ borderRight: '1px solid black' }}>
                                <div className="font-bold underline">{rpsData.meta.dosenPengembang || "-"}</div>
                                <div className="text-[8pt] text-slate-500 font-mono font-normal mt-0.5">NIDN. {rpsData.meta.nidnDosenPengembang || ssoUser.nidn || "2115088201"}</div>
                              </td>
                              <td className="p-2.5 border-r border-black text-center" style={{ borderRight: '1px solid black' }}>
                                <div className="font-bold underline">{rpsData.meta.koordinatorRMK || "H. Encep Taufiq Rahman, M.Ag."}</div>
                                <div className="text-[8pt] text-slate-500 font-mono font-normal mt-0.5">NIDN. {rpsData.meta.nidnKoordinatorRMK || "2001077901"}</div>
                              </td>
                              <td className="p-2.5 text-center">
                                <div className="font-bold underline">{rpsData.meta.koordinatorProdi || "Asep Indra Gunawan, Lc., M.Ag."}</div>
                                <div className="text-[8pt] text-slate-500 font-mono font-normal mt-0.5">NIDN. {rpsData.meta.nidnKoordinatorProdi || "2110108304"}</div>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                      </div>

                    </div>

                  </div>
                )}

              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs text-center flex flex-col items-center justify-center min-h-[300px]">
                <BookMarked className="w-12 h-12 text-slate-300 mb-3" />
                <h3 className="text-lg font-bold text-slate-800 font-display">Belum ada RPS yang dimuat</h3>
                <p className="text-xs text-slate-500 max-w-sm mt-1 leading-relaxed">Pilih salah satu prodi di samping, lalu tekan tombol "Simulasikan Draft OBE via AI" untuk memuat database preset cepat.</p>
                <button 
                  onClick={() => handleLoadPreset("Ilmu Falak II")}
                  className="bg-indigo-600 text-white font-bold rounded-lg text-xs px-4 py-2.5 mt-4 hover:bg-indigo-700 transition-all flex items-center gap-2 cursor-pointer shadow-md uppercase tracking-wider"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Muat Sampel Ilmu Falak II
                </button>
              </div>
            )}

          </div>

        </div>

      </main>      {/* Simulated SSO Management Modal */}
      {showSsoModal && (
        <div className="no-print fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 w-full max-w-md shadow-2xl animate-scaleUp">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3 mb-4">
              <Fingerprint className="w-6 h-6 text-indigo-600" />
              <div>
                <h3 className="text-base font-display font-bold text-slate-900">Portal Smart SSO - Instansi Terpadu</h3>
                <p className="text-[11px] text-slate-500">Institut KH. Ahmad Sanusi Sukabumi</p>
              </div>
            </div>

            <form onSubmit={handleSsoSubmit} className="flex flex-col gap-4 text-xs select-none">
              <p className="text-slate-500 text-[11px] leading-relaxed">
                Simulasikan otentikasi login single sign-on (SSO) guna melakukan integrasi draf RPS dengan basis data dosen dan sistem administrasi kurikulum.
              </p>

              <div className="flex flex-col gap-1">
                <label className="font-bold text-slate-700">Nama Lengkap Akademis (Beserta Gelar)</label>
                <input
                  type="text"
                  required
                  value={tempSso.fullName || ""}
                  onChange={(e) => setTempSso({ ...tempSso, fullName: e.target.value })}
                  placeholder="e.g. Dr. H. Aksara Al-Maqashid"
                  className="bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-medium focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-bold text-slate-700">Nomor Induk Dosen Nasional (NIDN)</label>
                <input
                  type="text"
                  required
                  value={tempSso.nidn || ""}
                  onChange={(e) => setTempSso({ ...tempSso, nidn: e.target.value })}
                  placeholder="e.g. 2110108304"
                  className="bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-mono focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-bold text-slate-700">Peran Institusi</label>
                <select
                  value={tempSso.role || "Dosen"}
                  onChange={(e) => setTempSso({ ...tempSso, role: e.target.value as any })}
                  className="bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-medium text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="Dosen">Dosen Pengajar</option>
                  <option value="Kapordi">Kepala Program Studi (Kaprodi)</option>
                  <option value="Admin">Administrator Kurikulum</option>
                </select>
              </div>

              <div className="flex gap-2 justify-end pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowSsoModal(false)}
                  className="bg-slate-100 text-slate-600 px-4 py-2.5 rounded-lg font-bold hover:bg-slate-200 transition-colors uppercase tracking-wider text-[10px] cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg font-bold shadow-md transition-all uppercase tracking-wider text-[10px] cursor-pointer"
                >
                  Autentikasi & Terapkan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Styled Footer for about the system */}
      <footer className="no-print bg-slate-900 text-slate-400 text-xs py-8 mt-12 border-t border-slate-800 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <BookMarked className="w-5 h-5 text-indigo-400" />
            <div>
              <p className="font-bold text-slate-200">OBE Rencana Pembelajaran Semester (RPS) Generator</p>
              <p className="text-[11px] text-slate-500">Format Resmi SN-Dikti & Asesor BAN-PT Terintegrasi</p>
            </div>
          </div>
          <div className="text-center md:text-right">
            <p className="text-slate-500 text-[11px]">Sistem Informasi & Kurikulum Pintar</p>
            <p className="text-slate-300 font-semibold mt-0.5">Institut KH. Ahmad Sanusi Sukabumi &copy; 2026</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
