"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Globe, 
  Check, 
  X, 
  Loader2, 
  AlertCircle, 
  ExternalLink,
  Copy,
  ArrowLeft
} from "lucide-react";
import Link from "next/link";

export default function DomainSettingsPage() {
  const router = useRouter();
  const [domain, setDomain] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ domain?: string; general?: string }>({});
  const [success, setSuccess] = useState(false);
  const [copied, setCopied] = useState(false);
  const [currentDomain, setCurrentDomain] = useState<string | null>(null);

  // DNS records to display
  const dnsRecords = [
    { type: "A", name: "@", value: "76.76.21.21", ttl: "Auto" },
    { type: "CNAME", name: "www", value: "cname.marketpro.ng", ttl: "Auto" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSuccess(false);

    // Validate domain
    if (!domain.trim()) {
      setErrors({ domain: "Domain name is required" });
      return;
    }

    // Simple domain validation
    const domainRegex = /^(?!-)[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/;
    if (!domainRegex.test(domain.trim())) {
      setErrors({ domain: "Please enter a valid domain (e.g., mystore.com)" });
      return;
    }

    setIsLoading(true);

    try {
      // ─── 🔄 REPLACE WITH BACKEND API ───
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock success
      setCurrentDomain(domain.trim());
      setSuccess(true);
      setDomain("");
      setTimeout(() => setSuccess(false), 5000);
      
    } catch (error) {
      setErrors({ general: "Failed to add domain. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRemoveDomain = () => {
    if (confirm("Are you sure you want to remove your custom domain?")) {
      setCurrentDomain(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-10">
      
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link 
          href="/admin/settings"
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
        >
          <ArrowLeft size={18} className="text-gray-500" />
        </Link>
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100">Custom Domain</h1>
          <p className="text-xs text-gray-400 mt-0.5">Connect your own domain to your store</p>
        </div>
      </div>

      {/* ── Current Domain ── */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800">
          <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-100">Current Domain</h2>
        </div>
        <div className="p-5">
          {currentDomain ? (
            <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
              <div>
                <div className="flex items-center gap-2">
                  <Globe size={16} className="text-green-600 dark:text-green-400" />
                  <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                    {currentDomain}
                  </span>
                  <span className="text-xs bg-green-200 dark:bg-green-800 text-green-700 dark:text-green-300 px-2 py-0.5 rounded-full">
                    Active
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Your store is accessible at {currentDomain}
                </p>
              </div>
              <button
                onClick={handleRemoveDomain}
                className="text-sm text-red-600 hover:text-red-700 font-medium"
              >
                Remove
              </button>
            </div>
          ) : (
            <div className="text-center py-6">
              <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto mb-3">
                <Globe size={20} className="text-gray-400" />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No custom domain connected
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Your store is currently at: <span className="font-mono">yourstore.marketpro.ng</span>
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ── Add Domain ── */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800">
          <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-100">Add Custom Domain</h2>
          <p className="text-xs text-gray-400 mt-0.5">Available on Growth plan and above</p>
        </div>
        <div className="p-5">
          {/* Plan Upgrade Notice */}
          <div className="mb-4 p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertCircle size={16} className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-700 dark:text-amber-300">
                Custom domains are available on the <strong>Growth</strong> plan and above.
                <Link href="/admin/settings/billing" className="ml-1 font-semibold hover:underline">
                  Upgrade now →
                </Link>
              </p>
            </div>
          </div>

          {/* Success Message */}
          {success && (
            <div className="mb-4 p-3 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg flex items-center gap-2">
              <Check size={16} className="text-green-600 dark:text-green-400" />
              <p className="text-xs text-green-700 dark:text-green-300">
                Domain added successfully! DNS propagation may take up to 24 hours.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Enter your domain
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  placeholder="e.g., amakafashion.com"
                  value={domain}
                  onChange={(e) => {
                    setDomain(e.target.value);
                    setErrors({});
                  }}
                  className={`flex-1 px-3.5 py-2.5 text-sm border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#C8F135]/40 transition-all ${
                    errors.domain 
                      ? "border-red-300 focus:ring-red-100 bg-red-50 dark:bg-red-950/30" 
                      : "border-gray-200 dark:border-gray-700 focus:border-[#0A2E1A]"
                  }`}
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-6 py-2.5 bg-[#0A2E1A] hover:bg-[#060F09] disabled:bg-gray-400 text-[#C8F135] text-sm font-medium rounded-lg transition-colors shadow-sm flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      Adding...
                    </>
                  ) : (
                    "Add Domain"
                  )}
                </button>
              </div>
              {errors.domain && (
                <p className="text-xs text-red-500 mt-1">{errors.domain}</p>
              )}
            </div>
            {errors.general && (
              <p className="text-xs text-red-500">{errors.general}</p>
            )}
          </form>
        </div>
      </div>

      {/* ── DNS Instructions ── */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800">
          <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-100">DNS Configuration</h2>
          <p className="text-xs text-gray-400 mt-0.5">Update your domain's DNS records</p>
        </div>
        <div className="p-5">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
            To connect your domain, update the following DNS records with your domain provider:
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b border-gray-100 dark:border-gray-800">
                  <th className="pb-2 text-xs font-semibold text-gray-500 dark:text-gray-400">Type</th>
                  <th className="pb-2 text-xs font-semibold text-gray-500 dark:text-gray-400">Name</th>
                  <th className="pb-2 text-xs font-semibold text-gray-500 dark:text-gray-400">Value</th>
                  <th className="pb-2 text-xs font-semibold text-gray-500 dark:text-gray-400">TTL</th>
                  <th className="pb-2 text-xs font-semibold text-gray-500 dark:text-gray-400">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                {dnsRecords.map((record, i) => (
                  <tr key={i}>
                    <td className="py-2.5 text-xs font-mono text-gray-700 dark:text-gray-300">
                      {record.type}
                    </td>
                    <td className="py-2.5 text-xs font-mono text-gray-700 dark:text-gray-300">
                      {record.name}
                    </td>
                    <td className="py-2.5 text-xs font-mono text-gray-700 dark:text-gray-300 break-all">
                      {record.value}
                    </td>
                    <td className="py-2.5 text-xs text-gray-500 dark:text-gray-400">
                      {record.ttl}
                    </td>
                    <td className="py-2.5">
                      <button
                        onClick={() => handleCopy(record.value)}
                        className="p-1.5 text-gray-400 hover:text-[#0A2E1A] dark:hover:text-[#C8F135] transition-colors"
                        title="Copy to clipboard"
                      >
                        <Copy size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {copied && (
            <p className="text-xs text-green-600 dark:text-green-400 mt-2">Copied to clipboard!</p>
          )}

          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-100 dark:border-blue-800">
            <div className="flex items-start gap-2">
              <AlertCircle size={14} className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
              <p className="text-xs text-blue-700 dark:text-blue-300">
                <strong>DNS propagation</strong> can take up to 24 hours. Your store will remain accessible at <span className="font-mono">yourstore.marketpro.ng</span> during this time.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Help ── */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800">
          <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-100">Need Help?</h2>
        </div>
        <div className="p-5">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
            Having trouble connecting your domain? Here are some resources:
          </p>
          <div className="flex flex-wrap gap-3">
            <Link 
              href="/admin/support" 
              className="inline-flex items-center gap-1.5 text-xs text-[#0A2E1A] dark:text-[#C8F135] font-medium hover:underline"
            >
              Contact Support <ExternalLink size={12} />
            </Link>
            <Link 
              href="#" 
              className="inline-flex items-center gap-1.5 text-xs text-[#0A2E1A] dark:text-[#C8F135] font-medium hover:underline"
            >
              DNS Guide <ExternalLink size={12} />
            </Link>
            <Link 
              href="#" 
              className="inline-flex items-center gap-1.5 text-xs text-[#0A2E1A] dark:text-[#C8F135] font-medium hover:underline"
            >
              Video Tutorial <ExternalLink size={12} />
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}