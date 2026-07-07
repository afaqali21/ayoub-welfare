import { Helmet } from "react-helmet-async";
import { PageHero } from "@/components/page-hero";

const directors = [
  { name: "Khurram", role: "Co-Founder & Director", initials: "KH", bio: "Born and raised in the United Kingdom with strong ties to Pakistan, Khurram was inspired to establish Ayoub Welfare CIC following the experiences of a late uncle from a small village in Eastern Gujar Khan. Witnessing the challenges faced by communities — particularly the lack of access to clean water — created a deep sense of responsibility to make a difference. This personal connection continues to shape the organisation's mission, with a focus on delivering meaningful, transparent, and impactful support to those in need." },
  { name: "Naila", role: "Co-Founder & Director", initials: "NA", bio: "Born in Pakistan and having spent many years living there, Naila has first-hand experience of the hardships faced by local communities. Having witnessed the realities of poverty, limited access to basic necessities, and the wider impact on families, she developed a strong commitment to helping those in need. Her lived experience brings valuable insight to the organisation, ensuring that projects are delivered with understanding, care, and a genuine focus on making a lasting difference." },
];

export default function OurTeam() {
  return (
    <>
      <Helmet>
        <title>Our Team — Ayoub Welfare CIC</title>
        <meta name="description" content="Meet Khurram and Naila — the co-founders and directors of Ayoub Welfare CIC." />
        <link rel="canonical" href="https://ayoubwelfare.org/our-team" />
      </Helmet>
      <PageHero eyebrow="Our Team" title="Family-led. Community-driven." description="Ayoub Welfare CIC is a family-run organisation led by two dedicated Co-Founders & Directors who share a strong commitment to serving underserved communities." />
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-10 md:grid-cols-2">
          {directors.map((d) => (
            <article key={d.name} className="rounded-2xl bg-card p-8 ring-1 ring-border">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <span className="font-display text-2xl font-semibold">{d.initials}</span>
              </div>
              <h2 className="mt-6 font-display text-3xl font-semibold">{d.name}</h2>
              <p className="mt-1 text-sm font-medium uppercase tracking-wider text-accent">{d.role}</p>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">{d.bio}</p>
            </article>
          ))}
        </div>
        <div className="mt-16 rounded-2xl bg-cream p-10 ring-1 ring-border">
          <h3 className="font-display text-2xl font-semibold">Hands-on leadership</h3>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">Both directors are actively involved in the day-to-day running of the organisation, overseeing planning, coordination, and delivery of all projects to ensure full transparency and accountability.</p>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">Supported by a trusted team on the ground in Pakistan, Ayoub Welfare CIC delivers aid directly to communities — ensuring that support reaches those who need it most efficiently and effectively.</p>
        </div>
      </section>
    </>
  );
}