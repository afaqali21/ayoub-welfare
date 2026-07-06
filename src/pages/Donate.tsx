import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Droplets, UtensilsCrossed, Stethoscope, Accessibility, Loader, House } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { ApiService } from "@/lib/api-service";

const causes = [
  { id: "water", icon: Droplets, label: "Clean Water" },
  { id: "food", icon: UtensilsCrossed, label: "Food Parcel" },
  { id: "medical", icon: Stethoscope, label: "aqeeqa bakra" },
  { id: "brighter-homes", icon: House, label: "Ayoub Brighter Homes" },
  { id: "general", icon: Accessibility, label: "Wheel Chair" },
];

// const amounts = [25, 50, 100, 250]; // Amount selection removed

const causeDescriptions: Record<string, string> = {
  water: "Solar-powered water pumps providing clean water to rural communities",
  food: "Food parcels for families in need",
  medical: "Aqeeqa Bakra (livestock) support for communities",
  "brighter-homes": "Ayoub Brighter Homes project provides 2 solar panels, 4 light bulbs, and one stand fan to families",
  general: "Direct support to communities most in need",
};

export default function Donate() {
  const [cause, setCause] = useState("water");
  const [selectedOption, setSelectedOption] = useState(""); // e.g., 'small-hand-pump'
  const [selectedPrice, setSelectedPrice] = useState(0);
  // Amount state kept for compatibility but not displayed
  const [amount, setAmount] = useState(0);
  const [custom, setCustom] = useState("");
  const [step, setStep] = useState("amount"); // "amount" | "donor-info" | "success"
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successData, setSuccessData] = useState<any>(null);

  const handleProceed = async () => {
    // Validate input fields
    if (!donorName.trim() || !donorEmail.trim()) {
      setError('Please fill in all fields');
      return;
    }
    if (!donorEmail.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    // Calculate donation amount
    const amountValue = selectedPrice || parseFloat(custom || amount.toString());

    // Build SumUp payment URL with query parameters
    const sumupUrl = `https://pay.sumup.com/b2c/QR0QLE0Y?amount=${amountValue}&email=${encodeURIComponent(donorEmail)}&name=${encodeURIComponent(donorName)}`;

    // Open SumUp payment page in a new tab
    window.open(sumupUrl, '_blank');

    // Optimistically set success data with a tracking ID placeholder
    const causeLabel = causes.find((c) => c.id === cause)?.label || cause;
    setSuccessData({
      id: 'TRACKING-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
      donorName,
      donorEmail,
      type: causeLabel,
      amount: amountValue,
      currency: 'GBP',
      description: causeDescriptions[cause],
      location: 'To be determined',
    });
    setStep('success');
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
              {/* Water project specific options */}
              {cause === "water" && (
                <div className="mt-8">
                  <h2 className="font-display text-2xl font-semibold mb-4">Select a Pump</h2>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <button
                      className={`rounded-xl border p-4 text-center transition-all ${selectedOption === "small-hand-pump" ? "border-primary bg-primary/5 text-primary" : "border-border hover:border-primary"}`}
                      onClick={() => { setSelectedOption("small-hand-pump"); setSelectedPrice(85); setAmount(85); }}
                    >
                      Small Hand Pump – £85
                    </button>
                    <button
                      className={`rounded-xl border p-4 text-center transition-all ${selectedOption === "large-hand-pump" ? "border-primary bg-primary/5 text-primary" : "border-border hover:border-primary"}`}
                      onClick={() => { setSelectedOption("large-hand-pump"); setSelectedPrice(195); setAmount(195); }}
                    >
                      Large Hand Pump – £195
                    </button>
                    <button
                      className={`rounded-xl border p-4 text-center transition-all ${selectedOption === "small-solar-pump" ? "border-primary bg-primary/5 text-primary" : "border-border hover:border-primary"}`}
                      onClick={() => { setSelectedOption("small-solar-pump"); setSelectedPrice(525); setAmount(525); }}
                    >
                      Small Solar Pump – £525
                    </button>
                  </div>
                  <button
                    onClick={() => setStep("donor-info")}
                    disabled={!selectedOption}
                    className="mt-6 w-full rounded-full bg-btn-donate px-8 py-4 text-base font-semibold text-white shadow-lg transition-transform hover:-translate-y-0.5 disabled:opacity-50"
                  >
                    Continue: £{selectedPrice}
                  </button>
                </div>
              )}
              {/* For other causes, skip amount selection */}
              {cause !== "water" && (
                <div className="mt-4">
                  {/* Show price for selected cause */}
                  <p className="mb-2 text-lg font-medium">
                    {cause === "general" && "Wheel Chair – £60"}
                    {cause === "food" && "Food Parcel – £15"}
                    {cause === "medical" && "Aqeeqa Bakra – £90"}
                    {cause === "brighter-homes" && "Ayoub Brighter Homes – £150"}
                  </p>
                  <button
                    onClick={() => {
                      let price = 0;
                      if (cause === "general") price = 60;
                      else if (cause === "food") price = 15;
                       else if (cause === "medical") price = 90;
                       else if (cause === "brighter-homes") price = 150;
                      else if (cause === "medical") price = 90;
                      setSelectedOption(cause);
                      setSelectedPrice(price);
                      setAmount(price);
                      setStep("donor-info");
                    }}
                    className="w-full rounded-full bg-btn-donate px-8 py-4 text-base font-semibold text-white shadow-lg transition-transform hover:-translate-y-0.5"
                  >
                    Continue: £{cause === "general" ? 60 : cause === "food" ? 15 : cause === "medical" ? 90 : cause === "brighter-homes" ? 150 : ''}
                  </button>
                </div>
              )}
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