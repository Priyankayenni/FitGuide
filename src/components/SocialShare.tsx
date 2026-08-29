import { Share2, Download, FileText, Twitter, Facebook, Link2, Check } from 'lucide-react';
import type { Translation } from '@/lib/i18n';
import type { BMIResult, BMIEntry } from '@/types';

interface SocialShareProps {
  t: Translation;
  result: BMIResult | null;
  entries: BMIEntry[];
}

export function SocialShare({ t, result, entries }: SocialShareProps) {
  const handleShare = (platform: 'twitter' | 'facebook' | 'copy') => {
    const text = result
      ? `My BMI is ${result.value.toFixed(1)} (${t.calculator[result.category]}). Tracking my health with FitGuide!`
      : `I'm tracking my health journey with FitGuide! Join me!`;
    const url = window.location.href;

    if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`, '_blank');
    } else {
      navigator.clipboard.writeText(`${text} ${url}`);
    }
  };

  const handlePdfExport = () => {
    const printContent = generateReportHTML(t, result, entries);
    const win = window.open('', '_blank');
    if (!win) return;
    win.document.write(printContent);
    win.document.close();
    setTimeout(() => win.print(), 500);
  };

  return (
    <section id="share" className="section-padding py-16 md:py-20">
      <div className="max-w-4xl mx-auto">
        <div className="card-surface p-8 md:p-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-2 mb-3">
                <Share2 className="w-5 h-5 text-primary-500" />
                <h3 className="font-display font-700 text-xl">{t.share.title}</h3>
              </div>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">{t.share.subtitle}</p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => handleShare('twitter')}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-100 dark:bg-ink-700 text-sm font-600 hover:bg-neutral-200 dark:hover:bg-ink-600 transition-all active:scale-95"
                aria-label="Share on Twitter"
              >
                <Twitter className="w-4 h-4" />
                <span className="hidden sm:inline">Twitter</span>
              </button>
              <button
                onClick={() => handleShare('facebook')}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-100 dark:bg-ink-700 text-sm font-600 hover:bg-neutral-200 dark:hover:bg-ink-600 transition-all active:scale-95"
                aria-label="Share on Facebook"
              >
                <Facebook className="w-4 h-4" />
                <span className="hidden sm:inline">Facebook</span>
              </button>
              <button
                onClick={() => handleShare('copy')}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-100 dark:bg-ink-700 text-sm font-600 hover:bg-neutral-200 dark:hover:bg-ink-600 transition-all active:scale-95"
                aria-label="Copy link"
              >
                <Link2 className="w-4 h-4" />
                <span className="hidden sm:inline">{t.share.copy}</span>
              </button>
              <button
                onClick={handlePdfExport}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary-500 text-white text-sm font-600 hover:bg-primary-600 transition-all active:scale-95 shadow-glow"
              >
                <FileText className="w-4 h-4" />
                <span>{t.share.exportPdf}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function generateReportHTML(t: Translation, result: BMIResult | null, entries: BMIEntry[]): string {
  const date = new Date().toLocaleDateString();
  const sorted = [...entries].sort((a, b) => new Date(b.recorded_date).getTime() - new Date(a.recorded_date).getTime());

  return `
<!DOCTYPE html>
<html>
<head>
<title>FitGuide Health Report</title>
<style>
  body { font-family: 'Inter', sans-serif; max-width: 800px; margin: 0 auto; padding: 40px; color: #0f172a; }
  .header { text-align: center; margin-bottom: 40px; border-bottom: 2px solid #10b981; padding-bottom: 20px; }
  .header h1 { font-size: 28px; margin: 0; }
  .header p { color: #64748b; margin: 5px 0 0; }
  .summary { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 40px; }
  .stat { padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; text-align: center; }
  .stat .label { font-size: 12px; color: #64748b; text-transform: uppercase; }
  .stat .value { font-size: 24px; font-weight: 700; color: #10b981; margin-top: 5px; }
  table { width: 100%; border-collapse: collapse; margin-top: 20px; }
  th { text-align: left; padding: 12px; border-bottom: 2px solid #e2e8f0; font-size: 12px; color: #64748b; text-transform: uppercase; }
  td { padding: 12px; border-bottom: 1px solid #e2e8f0; font-size: 14px; }
  .category { padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; display: inline-block; }
  .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #e2e8f0; text-align: center; color: #94a3b8; font-size: 12px; }
</style>
</head>
<body>
  <div class="header">
    <h1>FitGuide Health Report</h1>
    <p>Generated on ${date}</p>
  </div>
  ${result ? `
  <div class="summary">
    <div class="stat">
      <div class="label">Current BMI</div>
      <div class="value">${result.value.toFixed(1)}</div>
    </div>
    <div class="stat">
      <div class="label">Category</div>
      <div class="value" style="color: ${result.color}">${t.calculator[result.category]}</div>
    </div>
    <div class="stat">
      <div class="label">Total Entries</div>
      <div class="value">${entries.length}</div>
    </div>
  </div>
  ` : ''}
  <h2>BMI History</h2>
  <table>
    <thead>
      <tr><th>Date</th><th>Height (cm)</th><th>Weight (kg)</th><th>BMI</th><th>Category</th><th>Note</th></tr>
    </thead>
    <tbody>
      ${sorted.map(e => `
      <tr>
        <td>${e.recorded_date}</td>
        <td>${e.height_cm}</td>
        <td>${e.weight_kg}</td>
        <td><strong>${e.bmi_value.toFixed(1)}</strong></td>
        <td><span class="category" style="background: ${getCatColor(e.category)}20; color: ${getCatColor(e.category)}">${t.calculator[e.category]}</span></td>
        <td>${e.note ?? ''}</td>
      </tr>
      `).join('')}
    </tbody>
  </table>
  <div class="footer">
    FitGuide — Your Personal Health Tracker. This report is for informational purposes only.
  </div>
</body>
</html>
  `;
}

function getCatColor(cat: string): string {
  const colors: Record<string, string> = { underweight: '#f59e0b', normal: '#10b981', overweight: '#f97316', obese: '#ef4444' };
  return colors[cat] ?? '#10b981';
}
