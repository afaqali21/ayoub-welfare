import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Droplets, UtensilsCrossed, Stethoscope, GraduationCap, Heart, Loader } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { ApiService } from "@/lib/api-service";

const causes = [
  { id: "water", icon: Droplets, label: "Clean Water" },
  { id: "food", icon: UtensilsCrossed, label: "Food Pack" },
  { id: "medical", icon: Stethoscope, label: "Medical Aid" },
  { id: "education", icon: GraduationCap, label: "Education" },
  { id: "general", icon: Heart, label: "Where Most Needed" },
];

const amounts = [25, 50, 100, 250];

const causeDescriptions: Record<string, string> = {
  water: "Solar-powered water pumps providing clean water to rural communities",
  food: "Food packages for vulnerable families during emergencies",
  medical: "Free medical camps and health awareness programs",
  education: "School supplies and educational resources for children",
  general: "Direct support to communities most in need",
};

export default function Donate() {
  const [cause, setCause] = useState("water");
  const [amount, setAmount] = useState(50);
  const [custom, setCustom] = useState("");
  const [step, setStep] = useState("amount"); // "amount" | "donor-info" | "success"
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successData, setSuccessData] = useState<any>(null);

  const handleProceed = async () => {
    if (!donorName.trim() || !donorEmail.trim()) {
      setError("Please fill in all fields");
      return;
    }
    if (!donorEmail.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Create project in backend
      const causeLabel = causes.find((c) => c.id === cause)?.label || cause;
      const projectData = {
        donorName,
        donorEmail,
        type: causeLabel,
        amount: parseFloat(custom || amount.toString()),
        currency: "GBP",
        description: causeDescriptions[cause],
        location: "To be determined",
      };

      const project = await ApiService.createProject(projectData);
      setSuccessData(project);
      setStep("success");
    } catch (err: any) {
      setError(err.message || "Failed to process donation");
    } finally {
      setIsLoading(false);
    }
  };

  const finalAmount = custom || amount;
  return (
    <>
      <Helmet>
        <title>Donate — Ayoub Welfare CIC</title>
        <meta name="description" content="Support clean water, food, medical and education projects. 100% donation-based, every donation is an Amanah." />
        <link rel="canonical" href="https://ayoub-legacy-aid.lovable.app/donate" />
      </Helmet>
      <PageHero eyebrow="Donate" title="Be part of the change." description="Your gift is an Amanah — a sacred trust. 100% of donations go to programmes; our team in Pakistan delivers directly to communities." />
      <section className="mx-auto max-w-3xl px-6 py-16">
        <div className="rounded-2xl bg-card p-8 shadow-sm ring-1 ring-border md:p-12">
          
          {/* ─── Amount Selection Step ─── */}
          {step === "amount" && (
            <>
              <h2 className="font-display text-2xl font-semibold">Choose a cause</h2>
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-5">
                {causes.map(({ id, icon: Icon, label }) => (
                  <button key={id} onClick={() => setCause(id)} className={`flex flex-col items-center gap-2 rounded-xl border p-4 text-xs font-medium transition-all ${cause === id ? "border-primary bg-primary/5 text-primary" : "border-border text-muted-foreground hover:border-primary/40"}`}>
                    <Icon className="h-5 w-5" />
                    {label}
                  </button>
                ))}
              </div>
              <h2 className="mt-10 font-display text-2xl font-semibold">Choose an amount</h2>
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {amounts.map((a) => (
                  <button key={a} onClick={() => { setAmount(a); setCustom(""); }} className={`rounded-xl border p-4 text-lg font-semibold transition-all ${amount === a && !custom ? "border-accent bg-accent text-accent-foreground" : "border-border hover:border-accent"}`}>£{a}</button>
                ))}
              </div>
              <div className="mt-4">
                <label className="text-sm font-medium text-muted-foreground">Or enter your own amount</label>
                <div className="mt-2 flex items-center rounded-xl border border-border bg-background px-4 focus-within:border-primary">
                  <span className="text-lg font-semibold text-muted-foreground">£</span>
                  <input type="number" value={custom} onChange={(e) => setCustom(e.target.value)} placeholder="0" className="w-full bg-transparent px-3 py-3 text-lg outline-none" />
                </div>
              </div>
              <button onClick={() => setStep("donor-info")} className="mt-10 w-full rounded-full bg-btn-donate px-8 py-4 text-base font-semibold text-white shadow-lg transition-transform hover:-translate-y-0.5">
                Continue: £{finalAmount}
              </button>
            </>
          )}

          {/* ─── Donor Info Step ─── */}
          {step === "donor-info" && (
            <>
              <h2 className="font-display text-2xl font-semibold">Your information</h2>
              <p className="mt-2 text-sm text-muted-foreground">We'll send project updates and tracking link to your email</p>
              
              {error && (
                <div className="mt-4 rounded-lg bg-red-50 p-4 text-sm text-red-700 border border-red-200">
                  {error}
                </div>
              )}

              <div className="mt-6 space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground">Full Name *</label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-base outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Email Address *</label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-base outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="mt-8 rounded-lg bg-blue-50 p-4 border border-blue-200">
                <p className="text-sm text-blue-900">
                  <strong>📧 What happens next:</strong><br/>
                  You'll receive a confirmation email with your project reference ID and a link to track progress.
                </p>
              </div>

              <div className="mt-8 flex gap-3">
                <button onClick={() => setStep("amount")} className="flex-1 rounded-full border-2 border-btn-donate px-8 py-4 text-base font-semibold text-btn-donate hover:bg-btn-donate/5">
                  Back
                </button>
                <button onClick={handleProceed} disabled={isLoading} className="flex-1 rounded-full bg-btn-donate px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:-translate-y-0.5 disabled:opacity-50">
                  {isLoading ? (
                    <span className="inline-flex items-center gap-2">
                      <Loader className="h-4 w-4 animate-spin" />
                      Processing...
                    </span>
                  ) : (
                    `Donate £${finalAmount}`
                  )}
                </button>
              </div>
            </>
          )}

          {/* ─── Success Step ─── */}
          {step === "success" && successData && (
            <>
              <div className="text-center">
                <div className="text-5xl mb-4">✅</div>
                <h2 className="font-display text-2xl font-semibold">Thank you for your donation!</h2>
                <p className="mt-3 text-muted-foreground">Your generosity will make a real difference.</p>
              </div>

              <div className="mt-8 space-y-4 rounded-lg bg-green-50 p-6 border border-green-200">
                <div>
                  <p className="text-xs font-semibold text-green-700 uppercase tracking-wide">Project Reference</p>
                  <p className="mt-1 text-2xl font-bold text-green-900">{successData.id}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-green-700 uppercase tracking-wide">Donation Amount</p>
                  <p className="mt-1 text-lg font-semibold text-green-900">£{successData.amount} {successData.currency}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-green-700 uppercase tracking-wide">Project Type</p>
                  <p className="mt-1 text-lg font-semibold text-green-900">{successData.type}</p>
                </div>
              </div>

              <div className="mt-6 rounded-lg bg-blue-50 p-4 border border-blue-200">
                <p className="text-sm text-blue-900">
                  <strong>📧 Check your email!</strong><br/>
                  We've sent a confirmation to <strong>{successData.donorEmail}</strong> with your project tracking link and reference ID.
                </p>
              </div>

              <div className="mt-8 space-y-3">
                <a href={`/donor-project-tracker?id=${successData.id}`} className="block w-full rounded-full bg-btn-donate px-8 py-4 text-center text-base font-semibold text-white shadow-lg transition-all hover:-translate-y-0.5">
                  Track Your Project
                </a>
                <a href="/" className="block w-full rounded-full border-2 border-btn-donate px-8 py-4 text-center text-base font-semibold text-btn-donate hover:bg-btn-donate/5">
                  Back to Home
                </a>
              </div>
            </>
          )}

          <p className="mt-6 text-center text-xs text-muted-foreground">Your donation is an Amanah — a sacred trust. 100% of donations go directly to programmes.</p>
        </div>
      </section>
    </>
  );
}