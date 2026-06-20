/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json({ limit: "15mb" })); // support large requests for full RPS configurations

const PORT = 3000;

// Initialize GoogleGenAI client lazily to avoid crash on startup if key is missing
let aiClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY is not defined. Please add a valid Google Gemini API Key as 'GEMINI_API_KEY' in your Vercel Project Environment Variables (Settings > Environment Variables) or in your AI Studio Settings/Secrets panel.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Helper function to call generateContent with retry and fallback models to mitigate "503 Unavailable / High Demand" issues
async function generateContentWithRetryAndFallback(
  ai: GoogleGenAI,
  initialModel: string,
  fallbackModels: string[],
  contents: any,
  config: any
): Promise<any> {
  const models = [initialModel, ...fallbackModels];
  let lastError: any = null;

  for (const model of models) {
    let attempt = 0;
    const maxRetries = 2; // Run up to 2 retries per model
    
    while (attempt < maxRetries) {
      try {
        console.log(`[AI Gen] Trying model "${model}" (Attempt ${attempt + 1}/${maxRetries})...`);
        const response = await ai.models.generateContent({
          model,
          contents,
          config,
        });
        
        if (response && response.text) {
          console.log(`[AI Gen] Success with model "${model}" on attempt ${attempt + 1}!`);
          return response;
        }
        
        throw new Error("Empty response output");
      } catch (err: any) {
        attempt++;
        lastError = err;
        const errStr = err?.message || String(err);
        console.error(`[AI Gen] Error with model "${model}" (Attempt ${attempt}): ${errStr}`);
        
        // Check if it is a transient/overload issue
        const isTransient = errStr.includes("503") || 
                            errStr.toLowerCase().includes("unavailable") || 
                            errStr.toLowerCase().includes("overloaded") ||
                            errStr.toLowerCase().includes("high demand") ||
                            errStr.toLowerCase().includes("quota");
        
        if (isTransient && attempt < maxRetries) {
          const backoffTime = attempt * 1500 + Math.random() * 500;
          console.log(`[AI Gen] Transient error detected. Backing off for ${backoffTime.toFixed(0)}ms before retrying "${model}"...`);
          await new Promise(resolve => setTimeout(resolve, backoffTime));
        } else {
          break; // Fall through or try next model
        }
      }
    }
  }

  throw lastError || new Error("All AI models are currently experiencing high demand. Please try again in a few moments.");
}

// Diagnostic Health Check Route
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Express backend is healthy and running on port 3000!",
    timestamp: new Date().toISOString()
  });
});

// Service / API Endpoint for AI Generation of standard BAN-PT OBE RPS
app.post("/api/generate-rps", async (req, res) => {
  try {
    const {
      courseName,
      courseCode,
      prodi,
      fakultas,
      sksTeori,
      sksPraktik,
      semester,
      theme,
      academicCpls = [],
      dosenPengembang = "",
      nidnDosenPengembang = "",
      koordinatorRMK = "",
      nidnKoordinatorRMK = "",
      koordinatorProdi = "",
      nidnKoordinatorProdi = "",
      customNotes = "",
    } = req.body;

    if (!courseName) {
      return res.status(400).json({ error: "Nama mata kuliah wajib diisi" });
    }

    const ai = getGenAI();

    // Prepare lists of CPL descriptions to guide the AI
    const cplGuidance = academicCpls.length > 0
      ? academicCpls.map((c: any) => `- ID: "${c.id}", Kode: "${c.kode}", Kategori: "${c.kategori}", Deskripsi: "${c.deskripsi}"`).join("\n")
      : "CPL Program Studi standar BAN-PT.";

    // Construct the prompt carefully with Outcome-Based Education (OBE) design guidelines and BAN-PT structures
    const systemInstruction = `Anda adalah Asesor BAN-PT dan ahli kurikulum akademik perguruan tinggi di Indonesia, yang menguasai konsep Outcome-Based Education (OBE). 
Tugas Anda adalah merumuskan draf Rencana Pembelajaran Semester (RPS) yang lengkap, rinci, terukur, dan sangat akademis untuk mata kuliah "${courseName}" di "${prodi}", Institut KH. Ahmad Sanusi Sukabumi.

Mata kuliah ini harus mengacu pada kerangka CPL (Capaian Pembelajaran Lulusan), CPMK (Capaian Pembelajaran Mata Kuliah) yang disusun berbasis taksonomi Bloom, Sub-CPMK, serta rincian lengkap 16 Pertemuan.

Instruksi Teknis Mutlak:
1. CAPAIAN PEMBELAJARAN LULUSAN (CPL):
   Anda WAJIB dan hanya boleh menggunakan referensi CPL resmi dari Program Studi yang dipilih berikut ini. JANGAN membuat, memodifikasi, atau memalsukan kode/ID/deskripsi CPL baru yang tidak ada di daftar ini. Masukkan CPL yang relevan untuk mata kuliah ini ke dalam array "cpl" dengan data JSON (id, kode, deskripsi, kategori) yang PERSIS SAMA dengan daftar di bawah ini:
   ${cplGuidance}

2. CPMK & SUB-CPMK:
   - CPMK: Rumuskan 3 hingga 5 CPMK yang berorientasi hasil yang bisa didemonstrasikan. Setiap CPMK harus terhubung dengan minimal 1 CPL yang telah dipilih di atas dengan mencantumkan "id" CPL yang bersangkutan dalam array "cplIds" (misalnya: "CPL-HKI-3", "CPL-PAI-2", dll).
   - Sub-CPMK: Pecah menjadi 10-14 Sub-CPMK spesifik yang mengarah pada CPMK pencapaian tertentu, lengkap dengan verbs taksonomi Bloom yang tepat (C3-C6: Menganalisa, Mengevaluasi, Merancang, Mengaplikasikan). Setiap Sub-CPMK harus terhubung dengan cpmkId yang sesuai.

3. 16 PERTEMUAN (STRUTUR WAJIB):
   Tabel 16 Pertemuan harus diisi dengan sangat detail. Tidak boleh ada baris kosong, singkatan malas, atau tiruan "Sda" (sama dengan atas).
   - Pertemuan 1-7: Kegiatan pembelajaran bertahap yang mengacu pada Sub-CPMK-1 s.d Sub-CPMK-7.
   - Pertemuan 8: HARUS diisi sebagai "Ujian Tengah Semester (UTS)". Rumuskan indikator kelulusannya, kriteria pengujian (tertulis, kasus), bobot (%) adalah 15-20%.
   - Pertemuan 9-15: Kegiatan pembelajaran lanjutan mengacu pada Sub-CPMK-8 s.d Sub-CPMK-14.
   - Pertemuan 16: HARUS diisi sebagai "Ujian Akhir Semester (UAS)". Penilaian menyeluruh, bobot (%) adalah 20-30%.
   - Total bobot dari Pertemuan 1 s/d 16 harus persis berjumlah 100%.

4. BENTUK PEMBELAJARAN & METODE (LURING & DARING):
   Metode harus relevan dengan OBE (seperti: "Kuliah teori, diskusi kelompok, case method, project-based learning"). Jelaskan estimasi waktunya (misal: "TM: 2x50 mnt", "Tugas mandiri: 60 mnt").
   Karena kampus terintegrasi dengan Portal SSO Pintar, wajib sebutkan integrasi LMS (seperti: "Membaca draf di LMS kampus via SSO", "Latihan kuis mandiri di portal").

5. RENCANA TUGAS MAHASISWA & KONTRAK PERKULIAHAN:
   Susun 1 Tugas utama RTM (Rencana Tugas Mahasiswa) berskala kelompok/mandiri dengan langkah rincian pengerjaan, format luaran, rubrik indikator penilaian, bobot kriteria.
   Lengkapi Kontrak perkuliahan: hak dan kewajiban dosen & mahasiswa, serta tata tertib perkuliahan di Institut KH. Ahmad Sanusi Sukabumi.

Penting: Gunakan bahasa Indonesia yang baku, profesional, bernuansa akademis Islam terhormat terpadu dengan sains modern! Gunakan "Institut KH. Ahmad Sanusi Sukabumi" di seluruh nama instansi.`;

    const userPrompt = `Buatkan draf lengkap RPS berbasis OBE untuk:
Mata Kuliah: ${courseName}
Kode MK: ${courseCode || "AUTO-" + Math.floor(1000 + Math.random() * 9000)}
Program Studi: ${prodi}
Fakultas: ${fakultas || "Fakultas Syariah"}
SKS: Teori = ${sksTeori || 2}, Praktik = ${sksPraktik || 0}
Semester: ${semester || 1}
Rumpun MK / Bidang Kajian: ${theme}

Ketentuan Khusus OBE & CPL:
Pilih dan generates draf Capaian Pembelajaran Lulusan (CPL) eksklusif dari list CPL resmi Program Studi yang dikirimkan di atas. JANGAN mengarang CPL atau ID CPL baru di luar list tersebut. Pastikan CPMK memetakan 'cplIds' yang merujuk pada id CPL asal yang benar dari list tersebut.

Kredensial Pengesahan Wajib (Isi persis seperti ini di field meta masing-masing):
- dosenPengembang: "${dosenPengembang || "Dr. H. Aksara Al-Maqashid"}"
- nidnDosenPengembang: "${nidnDosenPengembang || "2115088201"}"
- koordinatorRMK: "${koordinatorRMK || "Dr. H. Encep Taufiq Rahman, M.Ag."}"
- nidnKoordinatorRMK: "${nidnKoordinatorRMK || "2001077901"}"
- koordinatorProdi: "${koordinatorProdi || "Asep Indra Gunawan, Lc., M.Ag."}"
- nidnKoordinatorProdi: "${nidnKoordinatorProdi || "2110108304"}"

Catatan Tambahan untuk AI: ${customNotes || "Kembangkan materi secara komprehensif mengacu pada kurikulum BAN-PT dan integrasikan kearifan lokal."}`;

    // Invoke Gemini Content Generation using our resilient retry-and-fallback helper
    const response = await generateContentWithRetryAndFallback(
      ai,
      "gemini-3.5-flash",
      ["gemini-3.1-flash-lite", "gemini-flash-latest"],
      userPrompt,
      {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          required: ["meta", "cpl", "cpmk", "subCpmk", "pertemuan", "rencanaTugas", "kontrakPerkuliahan"],
          properties: {
            meta: {
              type: "OBJECT",
              required: [
                "namaMataKuliah",
                "kodeMK",
                "rumpunMK",
                "sksteori",
                "skspraktik",
                "semester",
                "programStudi",
                "tanggalPenyusunan",
                "dosenPengembang",
                "koordinatorRMK",
                "koordinatorProdi",
                "deskripsiSingkat",
                "bahanKajian",
                "pustakaUtama",
                "pustakaPendukung",
                "dosenPengampu",
                "mataKuliahSyarat",
                "institusi",
                "fakultas"
              ],
              properties: {
                namaMataKuliah: { type: "STRING" },
                kodeMK: { type: "STRING" },
                rumpunMK: { type: "STRING" },
                sksteori: { type: "INTEGER" },
                skspraktik: { type: "INTEGER" },
                semester: { type: "INTEGER" },
                programStudi: { type: "STRING" },
                tanggalPenyusunan: { type: "STRING" },
                dosenPengembang: { type: "STRING" },
                nidnDosenPengembang: { type: "STRING" },
                koordinatorRMK: { type: "STRING" },
                nidnKoordinatorRMK: { type: "STRING" },
                koordinatorProdi: { type: "STRING" },
                nidnKoordinatorProdi: { type: "STRING" },
                deskripsiSingkat: { type: "STRING" },
                bahanKajian: { type: "ARRAY", items: { type: "STRING" } },
                pustakaUtama: { type: "ARRAY", items: { type: "STRING" } },
                pustakaPendukung: { type: "ARRAY", items: { type: "STRING" } },
                dosenPengampu: { type: "ARRAY", items: { type: "STRING" } },
                mataKuliahSyarat: { type: "STRING" },
                institusi: { type: "STRING" },
                fakultas: { type: "STRING" }
              }
            },
            cpl: {
              type: "ARRAY",
              items: {
                type: "OBJECT",
                required: ["id", "kode", "deskripsi", "kategori"],
                properties: {
                  id: { type: "STRING" },
                  kode: { type: "STRING" },
                  deskripsi: { type: "STRING" },
                  kategori: { type: "STRING" }
                }
              }
            },
            cpmk: {
              type: "ARRAY",
              items: {
                type: "OBJECT",
                required: ["id", "deskripsi", "cplIds"],
                properties: {
                  id: { type: "STRING" },
                  deskripsi: { type: "STRING" },
                  cplIds: { type: "ARRAY", items: { type: "STRING" } }
                }
              }
            },
            subCpmk: {
              type: "ARRAY",
              items: {
                type: "OBJECT",
                required: ["id", "deskripsi", "cpmkId"],
                properties: {
                  id: { type: "STRING" },
                  deskripsi: { type: "STRING" },
                  cpmkId: { type: "STRING" }
                }
              }
            },
            pertemuan: {
              type: "ARRAY",
              description: "Must contain exactly 16 objects representing each week in chronological order.",
              items: {
                type: "OBJECT",
                required: [
                  "mingguKe",
                  "subCpmk",
                  "indikator",
                  "kriteriaDanTeknik",
                  "metodeLuring",
                  "metodeDaring",
                  "materiPembelajaran",
                  "bobotPenilaian"
                ],
                properties: {
                  mingguKe: { type: "INTEGER" },
                  subCpmk: { type: "STRING" },
                  indikator: { type: "STRING" },
                  kriteriaDanTeknik: { type: "STRING" },
                  metodeLuring: { type: "STRING" },
                  metodeDaring: { type: "STRING" },
                  materiPembelajaran: { type: "STRING" },
                  bobotPenilaian: { type: "INTEGER" }
                }
              }
            },
            rencanaTugas: {
              type: "OBJECT",
              required: [
                "judul",
                "bentukTugas",
                "deskripsiTugas",
                "metodePengerjaan",
                "bentukLuaran",
                "indikatorPenilaian",
                "bobotNilai",
                "jadwal"
              ],
              properties: {
                judul: { type: "STRING" },
                bentukTugas: { type: "STRING" },
                deskripsiTugas: { type: "STRING" },
                metodePengerjaan: { type: "ARRAY", items: { type: "STRING" } },
                bentukLuaran: { type: "STRING" },
                indikatorPenilaian: { type: "ARRAY", items: { type: "STRING" } },
                bobotNilai: { type: "INTEGER" },
                jadwal: { type: "STRING" }
              }
            },
            rencanaTugasMandiri: {
              type: "OBJECT",
              required: [
                "judul",
                "bentukTugas",
                "deskripsiTugas",
                "metodePengerjaan",
                "bentukLuaran",
                "indikatorPenilaian",
                "bobotNilai",
                "jadwal"
              ],
              properties: {
                judul: { type: "STRING" },
                bentukTugas: { type: "STRING" },
                deskripsiTugas: { type: "STRING" },
                metodePengerjaan: { type: "ARRAY", items: { type: "STRING" } },
                bentukLuaran: { type: "STRING" },
                indikatorPenilaian: { type: "ARRAY", items: { type: "STRING" } },
                bobotNilai: { type: "INTEGER" },
                jadwal: { type: "STRING" }
              }
            },
            kontrakPerkuliahan: {
              type: "OBJECT",
              required: ["hakKewajiban", "tataTertib", "kriteriaKelulusan"],
              properties: {
                hakKewajiban: { type: "ARRAY", items: { type: "STRING" } },
                tataTertib: { type: "ARRAY", items: { type: "STRING" } },
                kriteriaKelulusan: {
                  type: "OBJECT",
                  required: ["hadir", "tugasTerstruktur", "tugasMandiri", "tugas", "uts", "uas"],
                  properties: {
                    hadir: { type: "INTEGER" },
                    tugasTerstruktur: { type: "INTEGER" },
                    tugasMandiri: { type: "INTEGER" },
                    tugas: { type: "INTEGER" },
                    uts: { type: "INTEGER" },
                    uas: { type: "INTEGER" }
                  }
                }
              }
            }
          }
        }
      }
    );

    const textOutput = response.text;
    if (!textOutput) {
      throw new Error("No response content generated by the AI model");
    }

    const cleanedJson = JSON.parse(textOutput.trim());
    return res.json(cleanedJson);

  } catch (error: any) {
    console.error("RPS Generation failed:", error);
    
    // Safely extract a string message to avoid circular structure serialization errors in JSON.stringify
    const errorMessage = error instanceof Error 
      ? error.message 
      : (error?.message || (typeof error === 'object' ? JSON.stringify(error, Object.getOwnPropertyNames(error)) : String(error)));

    return res.status(500).json({
      error: "AI RPS Generation failed",
      details: errorMessage
    });
  }
});

// Setup development or production environment
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    // Development mode with Vite middleware
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production mode
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  if (!process.env.VERCEL) {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });
  }
}

if (!process.env.VERCEL) {
  startServer();
}

export default app;
