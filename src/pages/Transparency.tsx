import { Helmet } from "react-helmet-async";
import { Camera, MapPin, Shield, Users } from "lucide-react";
import { PageHero } from "@/components/page-hero";

const pillars = [
  { icon: Camera, title: "Visual proof", text: "Detailed photos and videos from every project, shared with our donors." },
  { icon: MapPin, title: "GPS locations", text: "Coordinates for every installed water pump and distribution site." },
  { icon: Shield, title: "Tracked funds", text: "All donations carefully recorded and used strictly for their intended purpose." },
  { icon: Users, title: "Direct delivery", text: "Our own team on the ground means no unnecessary middlemen." },
];

export default function Transparency() {
  return (
    <>
      <Helmet>
        <title>Transparency & Accountability — Ayoub Welfare CIC</title>
        <meta name="description" content="Photos, videos, GPS locations, and audited funds — every donation is documented and accounted for." />
        <link rel="canonical" href="https://ayoub-legacy-aid.lovable.app/transparency" />
      </Helmet>
      <PageHero eyebrow="Transparency" title="Trust, earned through proof." description="We believe trust is earned through transparency. Every project we deliver is fully documented to provide clear evidence of distribution and impact." />
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-2xl bg-card p-8 ring-1 ring-border">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary"><Icon className="h-6 w-6" /></span>
              <h3 className="mt-5 font-display text-xl font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
        <div className="mt-16 max-w-3xl space-y-6 text-lg leading-relaxed text-muted-foreground">
          <p>All funds are carefully tracked and recorded to ensure they are used strictly for their intended purpose. We operate with full accountability at every stage of delivery.</p>
          <p>With our dedicated team on the ground in Pakistan, we are able to deliver aid directly to communities without unnecessary middlemen — ensuring maximum impact from every donation.</p>
          <p className="font-display text-2xl italic text-foreground">Every donation is an Amanah — a sacred trust we honour with every project.</p>
        </div>
      </section>
    </>
  );
}