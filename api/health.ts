export default function handler(req: any, res: any) {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(
    JSON.stringify({
      status: "ok",
      message: "OBE RPS Vercel Serverless Function is healthy!",
      timestamp: new Date().toISOString(),
      hasGeminiKey: !!process.env.GEMINI_API_KEY,
    })
  );
}
