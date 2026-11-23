import { Helmet } from "react-helmet-async";
import { PageHero } from "@/components/page-hero";

export default function PrivacyPolicy() {
  return (
    <>
      <Helmet>
        <title>Donation Policy — Ayoub Welfare CIC</title>
        <meta name="description" content="Our 100% donation policy ensures all public donations go directly to humanitarian projects." />
        <link rel="canonical" href="https://ayoubwelfare.org/donation-policy" />
      </Helmet>
      <PageHero
        eyebrow="Policy"
        title="100% Donation Policy"
        description="At 𝗔𝘆𝗼𝘂𝗯 𝗪𝗲𝗹𝗳𝗮𝗿𝗲 𝗖𝗜𝗖, 100% of every public donation goes directly toward our humanitarian and livelihood projects on the ground. Our work spans clean water pumps, wheelchairs and mobility support, winter packs, food distribution, medical aid, education assistance, income-generating vegetable carts, and solar-powered home lighting and fans."
      />
      <section className="mx-auto max-w-3xl px-6 py-16">
        <div className="rounded-2xl bg-card p-8 shadow-sm ring-1 ring-border md:p-12">
          <h2 className="font-display text-2xl font-semibold mb-4">Key Principles</h2>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li><strong>Zero Salaries or Admin Deductions:</strong> Our directors and team operate on a strictly voluntary basis and take £0 in salaries or personal expenses from public appeals. All UK administrative, website, transfer, and statutory filing costs are funded separately by our directors and dedicated operational sponsors.</li>
            <li><strong>Project Surpluses & Re‑allocation:</strong>  When you donate toward a specific campaign (such as a water pump, winter pack, or livelihood cart), your contribution goes directly to that cause. If a project costs less than estimated or an appeal becomes overfunded, any remaining balance is automatically allocated to our general welfare fund to support urgent humanitarian or livelihood projects where the need is greatest.</li>
            <li><strong>Full Transparency:</strong> Every project is documented with local receipts, GPS locations, and photo/video verification so you can see the direct impact of your support.</li>
          </ul>
          <p className="mt-6 text-sm text-muted-foreground">
            All UK administrative, website, transfer, and statutory filing costs are funded separately by our directors and dedicated operational sponsors.
          </p>
        </div>
      </section>
    </>
  );
}
