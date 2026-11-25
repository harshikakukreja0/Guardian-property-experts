"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Users,
  Building,
  CreditCard,
  Briefcase,
  TrendingUp,
  ShieldCheck,
  Check,
  X,
  AlertCircle,
  Clock,
  History,
  Calculator,
  Coins,
  FileText,
  Layers,
  Edit,
  Save,
  Plus,
  ArrowRight,
} from "lucide-react";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { DataTable } from "@/components/dashboard/DataTable";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MOCK_USERS } from "@/services/mock/users.data";
import { MOCK_PROPERTIES } from "@/services/mock/properties.data";
import { MOCK_REVENUE_DATA } from "@/services/mock/analytics.data";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function SuperAdminDashboardContent() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab") || "overview";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(tabParam);
  const [propertiesList, setPropertiesList] = useState(MOCK_PROPERTIES);

  useEffect(() => {
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  // Stamp Duty Rates State
  const [stampDutyRates, setStampDutyRates] = useState([
    { state: "Maharashtra", male: 6.0, female: 5.0, joint: 5.5, metroCess: 1.0, regRate: "1% (Max ₹30k)", effectiveDate: "Apr 2024" },
    { state: "Delhi", male: 6.0, female: 4.0, joint: 5.0, metroCess: 0.0, regRate: "1%", effectiveDate: "Jan 2024" },
    { state: "Karnataka", male: 5.0, female: 5.0, joint: 5.0, metroCess: 2.0, regRate: "1%", effectiveDate: "Feb 2024" },
    { state: "Haryana", male: 7.0, female: 5.0, joint: 6.0, metroCess: 0.0, regRate: "1% (Max ₹50k)", effectiveDate: "Mar 2024" },
    { state: "Uttar Pradesh", male: 7.0, female: 6.0, joint: 6.5, metroCess: 0.0, regRate: "1% (Max ₹20k)", effectiveDate: "Apr 2024" },
    { state: "Telangana", male: 5.5, female: 5.5, joint: 5.5, metroCess: 0.5, regRate: "0.5%", effectiveDate: "Jan 2024" },
  ]);

  // Home Loan Leads State
  const [homeLoanLeads, setHomeLoanLeads] = useState([
    { id: "HL-1092", name: "Ananya Deshmukh", phone: "+91 98201 44556", amount: "₹1.80 Cr", city: "Mumbai", bank: "HDFC Bank", status: "Underwriting", officer: "Rohan V." },
    { id: "HL-1091", name: "Kunal Mehra", phone: "+91 98112 33445", amount: "₹95 Lacs", city: "Gurugram", bank: "SBI", status: "Callback Scheduled", officer: "Priya S." },
    { id: "HL-1090", name: "Dr. Arvind Swaminathan", phone: "+91 94440 12345", amount: "₹3.20 Cr", city: "Bangalore", bank: "ICICI Bank", status: "Pre-Approved", officer: "Siddharth N." },
    { id: "HL-1089", name: "Sunita Chawla", phone: "+91 98990 77889", amount: "₹1.40 Cr", city: "Pune", bank: "Axis Bank", status: "Documents Pending", officer: "Kavita M." },
  ]);

  // Agreement Templates State
  const [agreementTemplates, setAgreementTemplates] = useState([
    { id: "TPL-01", name: "Standard 11-Month Residential Rent Deed", type: "Rent", version: "v2.4", status: "Active", placeholders: 18 },
    { id: "TPL-02", name: "Corporate Office Commercial Lease Agreement", type: "Commercial Lease", version: "v1.8", status: "Active", placeholders: 24 },
    { id: "TPL-03", name: "Freehold Agreement to Sell (Sale Deed)", type: "Sale", version: "v3.1", status: "Active", placeholders: 32 },
    { id: "TPL-04", name: "RERA Standardized Builder-Buyer Contract", type: "Allotment", version: "v2.0", status: "Draft", placeholders: 40 },
  ]);

  // Homepage CMS State
  const [cmsHeadline, setCmsHeadline] = useState("Find, Buy, Rent & Invest in Verified Properties");
  const [cmsSubtitle, setCmsSubtitle] = useState("Homes • Commercial Spaces • Investment Opportunities");
  const [cmsSaved, setCmsSaved] = useState(false);

  const handleApprove = (id: string) => {
    setPropertiesList((prev) =>
      prev.map((p) => (p.id === id ? { ...p, verificationStatus: "verified" } : p))
    );
  };

  const handleReject = (id: string) => {
    setPropertiesList((prev) =>
      prev.map((p) => (p.id === id ? { ...p, verificationStatus: "rejected" } : p))
    );
  };

  const userColumns = [
    {
      header: "User",
      cell: (row: any) => (
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#064B25] text-white flex items-center justify-center font-bold text-xs">
            {row.name.charAt(0)}
          </div>
          <div>
            <div className="font-bold text-stone-900">{row.name}</div>
            <div className="text-[10px] text-stone-400">{row.email}</div>
          </div>
        </div>
      ),
    },
    {
      header: "Role",
      cell: (row: any) => (
        <span className="inline-block px-2 py-0.5 rounded-md bg-stone-100 text-stone-800 text-[10px] font-bold uppercase tracking-wider">
          {row.role}
        </span>
      ),
    },
    {
      header: "Location",
      cell: (row: any) => <span>{row.city}, {row.state}</span>,
    },
    {
      header: "Status",
      cell: (row: any) => (
        <Badge variant={row.isVerified ? "verified" : "secondary"}>
          {row.isVerified ? "Verified" : "Pending"}
        </Badge>
      ),
    },
  ];

  const propertyColumns = [
    {
      header: "Property Title",
      cell: (row: any) => (
        <div>
          <div className="font-bold text-stone-900">{row.title}</div>
          <div className="text-[10px] text-stone-400">{row.location.locality}, {row.location.city}</div>
        </div>
      ),
    },
    {
      header: "Purpose / Type",
      cell: (row: any) => (
        <div className="flex items-center gap-1.5">
          <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-emerald-50 text-emerald-800">
            {row.purpose}
          </span>
          <span className="text-stone-500 text-xs font-medium">{row.category}</span>
        </div>
      ),
    },
    {
      header: "Price",
      cell: (row: any) => (
        <span className="font-extrabold text-stone-900">
          ₹{(row.price / 10000000).toFixed(2)} Cr
        </span>
      ),
    },
    {
      header: "Status",
      cell: (row: any) => (
        <Badge
          variant={
            row.verificationStatus === "verified"
              ? "verified"
              : row.verificationStatus === "rejected"
              ? "destructive"
              : "secondary"
          }
        >
          {row.verificationStatus.toUpperCase()}
        </Badge>
      ),
    },
    {
      header: "Moderation Action",
      cell: (row: any) => (
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => handleApprove(row.id)}
            disabled={row.verificationStatus === "verified"}
            className="p-1 rounded-md bg-emerald-50 text-emerald-700 hover:bg-emerald-100 disabled:opacity-30 disabled:cursor-not-allowed"
            title="Approve Listing"
          >
            <Check className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleReject(row.id)}
            disabled={row.verificationStatus === "rejected"}
            className="p-1 rounded-md bg-rose-50 text-rose-700 hover:bg-rose-100 disabled:opacity-30 disabled:cursor-not-allowed"
            title="Reject Listing"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen flex bg-stone-100/60">
      <DashboardSidebar
        role="super-admin"
        currentTab={activeTab}
        onSelectTab={setActiveTab}
        isOpenMobile={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader
          title="Super Admin Control Center"
          subtitle="System governance, financial tools, agreement templates, and homepage CMS"
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
        />

        <main className="flex-1 p-4 sm:p-8 space-y-8 overflow-y-auto max-w-7xl">
          {/* TAB 1: OVERVIEW (Default) */}
          {(activeTab === "overview" || activeTab === "executive overview") && (
            <>
              {/* Key Metric Statistics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <StatsCard
                  title="Total Users"
                  value="14,850"
                  change="+18.4%"
                  isPositive={true}
                  subtitle="740 added this month"
                  icon={Users}
                />
                <StatsCard
                  title="Listed Properties"
                  value="2,450"
                  change="+12.2%"
                  isPositive={true}
                  subtitle="28 pending approval"
                  icon={Building}
                />
                <StatsCard
                  title="Monthly Revenue"
                  value="₹86.2 Lac"
                  change="+22.8%"
                  isPositive={true}
                  subtitle="Broker & Builder plans"
                  icon={CreditCard}
                />
                <StatsCard
                  title="Total Leads"
                  value="8,920"
                  change="+14.5%"
                  isPositive={true}
                  subtitle="82% response rate"
                  icon={TrendingUp}
                />
              </div>

              {/* Revenue Analytics Chart */}
              <div className="bg-white rounded-3xl border border-stone-200/90 p-6 sm:p-8 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-stone-900">Platform Financial Velocity</h3>
                    <p className="text-xs text-stone-500">Monthly subscription and promotion revenue (in ₹ Lakhs)</p>
                  </div>
                  <span className="text-xs bg-emerald-50 text-emerald-800 font-bold px-3 py-1 rounded-full">
                    FY 2026-27 Active
                  </span>
                </div>

                <div className="h-64 w-full pt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={MOCK_REVENUE_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#16852C" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#16852C" stopOpacity={0.0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f4f1" />
                      <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                      <YAxis stroke="#94a3b8" fontSize={11} />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="revenue"
                        stroke="#013F1A"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#revenueGrad)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Property Approvals Queue */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-stone-900">Property Approvals & Moderation</h3>
                    <p className="text-xs text-stone-500">Review submissions before public marketplace release</p>
                  </div>
                </div>
                <DataTable columns={propertyColumns} data={propertiesList} searchKey="title" />
              </div>

              {/* User Management Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-stone-900">System Users & Roles</h3>
                    <p className="text-xs text-stone-500">Manage permissions across all 8 user types</p>
                  </div>
                </div>
                <DataTable columns={userColumns} data={MOCK_USERS} searchKey="name" />
              </div>
            </>
          )}

          {/* TAB 2: STAMP DUTY MANAGEMENT */}
          {activeTab === "stamp-duty" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-black text-[#202820]">State-Wise Stamp Duty Configuration</h2>
                  <p className="text-xs text-stone-500">Manage statutory stamp duty slabs, municipal cess, and sub-registrar registration fee caps.</p>
                </div>
                <Button className="bg-[#064B25] hover:bg-[#003D1C] text-white font-bold text-xs rounded-xl h-10 flex items-center gap-1.5">
                  <Plus className="w-4 h-4" />
                  <span>Add State Jurisdiction</span>
                </Button>
              </div>

              <div className="bg-white rounded-3xl border border-[#E5EAE5] shadow-xs overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F0F7F0] border-b border-[#E5EAE5] text-[#064B25] font-black uppercase tracking-wider text-[11px]">
                    <tr>
                      <th className="p-4">State Jurisdiction</th>
                      <th className="p-4">Male Rate</th>
                      <th className="p-4">Female Concession</th>
                      <th className="p-4">Joint Ownership</th>
                      <th className="p-4">Metro Cess</th>
                      <th className="p-4">Registration Fee</th>
                      <th className="p-4">Effective As Of</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 font-semibold text-stone-700">
                    {stampDutyRates.map((r, i) => (
                      <tr key={r.state} className="hover:bg-stone-50/60 transition">
                        <td className="p-4 font-black text-[#202820] flex items-center gap-2">
                          <Calculator className="w-4 h-4 text-[#064B25]" />
                          <span>{r.state}</span>
                        </td>
                        <td className="p-4">{r.male}%</td>
                        <td className="p-4 text-[#064B25] font-bold">{r.female}%</td>
                        <td className="p-4">{r.joint}%</td>
                        <td className="p-4">{r.metroCess}%</td>
                        <td className="p-4">{r.regRate}</td>
                        <td className="p-4 text-stone-400 text-[11px]">{r.effectiveDate}</td>
                        <td className="p-4 text-right">
                          <button className="px-2.5 py-1 rounded-lg border border-stone-200 hover:border-[#064B25] text-[#064B25] font-bold text-[11px]">
                            Edit Slabs
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: HOME LOAN MANAGEMENT */}
          {activeTab === "home-loans" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-black text-[#202820]">Home Loan Underwriting Leads</h2>
                  <p className="text-xs text-stone-500">Live lead submissions from the Home Loan Assistant calculator awaiting banking review.</p>
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-[#E5EAE5] shadow-xs overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F0F7F0] border-b border-[#E5EAE5] text-[#064B25] font-black uppercase tracking-wider text-[11px]">
                    <tr>
                      <th className="p-4">Lead ID</th>
                      <th className="p-4">Applicant Name</th>
                      <th className="p-4">Phone Contact</th>
                      <th className="p-4">Loan Requirement</th>
                      <th className="p-4">Location</th>
                      <th className="p-4">Preferred Bank</th>
                      <th className="p-4">Assigned Officer</th>
                      <th className="p-4">Underwriting Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 font-semibold text-stone-700">
                    {homeLoanLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-stone-50/60 transition">
                        <td className="p-4 font-mono font-bold text-stone-500">{lead.id}</td>
                        <td className="p-4 font-black text-[#202820]">{lead.name}</td>
                        <td className="p-4">{lead.phone}</td>
                        <td className="p-4 font-black text-[#064B25]">{lead.amount}</td>
                        <td className="p-4">{lead.city}</td>
                        <td className="p-4 font-bold text-stone-800">{lead.bank}</td>
                        <td className="p-4 text-stone-600">{lead.officer}</td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                            lead.status === "Pre-Approved"
                              ? "bg-emerald-100 text-[#064B25]"
                              : lead.status === "Underwriting"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-amber-100 text-amber-800"
                          }`}>
                            {lead.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: AGREEMENT MANAGEMENT */}
          {activeTab === "agreements" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-black text-[#202820]">Legal Agreement Templates & Placeholders</h2>
                  <p className="text-xs text-stone-500">Configure standardized contracts, statutory clauses, and tokenized placeholders.</p>
                </div>
                <Button className="bg-[#064B25] hover:bg-[#003D1C] text-white font-bold text-xs rounded-xl h-10 flex items-center gap-1.5">
                  <Plus className="w-4 h-4" />
                  <span>Upload Template (DOCX)</span>
                </Button>
              </div>

              <div className="bg-white rounded-3xl border border-[#E5EAE5] shadow-xs overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F0F7F0] border-b border-[#E5EAE5] text-[#064B25] font-black uppercase tracking-wider text-[11px]">
                    <tr>
                      <th className="p-4">Template ID</th>
                      <th className="p-4">Template Name</th>
                      <th className="p-4">Deed Type</th>
                      <th className="p-4">Version</th>
                      <th className="p-4">Tokens / Placeholders</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 font-semibold text-stone-700">
                    {agreementTemplates.map((t) => (
                      <tr key={t.id} className="hover:bg-stone-50/60 transition">
                        <td className="p-4 font-mono font-bold text-stone-500">{t.id}</td>
                        <td className="p-4 font-black text-[#202820] flex items-center gap-2">
                          <FileText className="w-4 h-4 text-[#064B25]" />
                          <span>{t.name}</span>
                        </td>
                        <td className="p-4">{t.type}</td>
                        <td className="p-4 font-mono">{t.version}</td>
                        <td className="p-4 text-stone-500">{t.placeholders} Tokens Configured</td>
                        <td className="p-4">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-100 text-[#064B25]">
                            {t.status}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <button className="px-2.5 py-1 rounded-lg border border-stone-200 hover:border-[#064B25] text-[#064B25] font-bold text-[11px]">
                            Edit Clauses
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: HOMEPAGE CMS */}
          {activeTab === "cms" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-black text-[#202820]">Homepage CMS Content Management</h2>
                <p className="text-xs text-stone-500">Live configuration of public website hero messaging, services links, and featured showcases.</p>
              </div>

              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E5EAE5] shadow-xs space-y-6">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5">Hero Headline</label>
                  <input
                    type="text"
                    value={cmsHeadline}
                    onChange={(e) => setCmsHeadline(e.target.value)}
                    className="w-full h-12 px-4 rounded-xl border border-stone-200 text-sm font-bold text-[#202820]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5">Hero Subtitle</label>
                  <input
                    type="text"
                    value={cmsSubtitle}
                    onChange={(e) => setCmsSubtitle(e.target.value)}
                    className="w-full h-12 px-4 rounded-xl border border-stone-200 text-sm font-semibold text-stone-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5">Active Hero Background Image</label>
                  <input
                    type="text"
                    disabled
                    value="/images/guardian-hero-estate.jpg"
                    className="w-full h-12 px-4 rounded-xl border border-stone-200 bg-stone-50 text-sm font-mono text-stone-500"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-xs text-stone-500">
                    {cmsSaved ? "✓ CMS changes committed to production build" : "Unsaved changes will apply on publish"}
                  </span>
                  <Button
                    onClick={() => {
                      setCmsSaved(true);
                      setTimeout(() => setCmsSaved(false), 3000);
                    }}
                    className="bg-[#064B25] hover:bg-[#003D1C] text-white font-bold px-6 h-11 rounded-xl flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Publish CMS Updates</span>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default function SuperAdminDashboard() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-stone-100 flex items-center justify-center font-bold text-stone-600">
          Loading Control Center...
        </div>
      }
    >
      <SuperAdminDashboardContent />
    </Suspense>
  );
}
