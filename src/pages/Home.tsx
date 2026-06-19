import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Droplets, UtensilsCrossed, Stethoscope, GraduationCap, Shield, Users, MapPin, Camera, ArrowRight, Heart, ShieldCheck, Send } from "lucide-react";
import heroImg from "@/assets/hero-water.png";
import waterImg from "@/assets/clean-water.png";
import foodImg from "@/assets/food-dist.png";
import medicalImg from "@/assets/medical-suport.png";
import educationImg from "@/assets/education-suport.png";
import villageImg from "@/assets/gujar-khan-story.png";
import trustBg from "@/assets/bg-trust-home.png";
import minicabsLogo from "@/assets/minicabs-logo.png";
import muallimLogo from "@/assets/Muallim-logo.png";
import gmfLogo from "@/assets/GMF-logo.png";
import b2bLogo from "@/assets/b2b-logo.png";

const trustPoints = [
  { icon: Heart, text: "100% donation based" },
  { icon: Shield, text: "UK registered CIC" },
  { icon: Users, text: "Family run organisation" },
  { icon: MapPin, text: "Team in UK & Pakistan" },
  { icon: Camera, text: "Photos, videos & GPS proof" },
  { icon: Shield, text: "Every donation an Amanah" },
];

const projects = [
  { icon: Droplets, title: "Clean Water Projects", text: "Hand pumps installed in water-scarce villages — long-term Sadaqah Jariyah.", img: waterImg },
  { icon: UtensilsCrossed, title: "Food Distribution", text: "Essential food packs delivered to families facing hardship.", img: foodImg },
  { icon: Stethoscope, title: "Medical Support", text: "Wheelchairs, medical supplies and basic healthcare for those in need.", img: medicalImg },
  { icon: GraduationCap, title: "Education Support", text: "Books, shoes and clothing to help children access education.", img: educationImg },
];

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Ayoub Welfare CIC — Serving Communities, Strengthening Lives</title>
        <meta name="description" content="100% donation-based, UK-registered CIC delivering clean water, food, medical and education aid to underserved communities in Pakistan." />
        <link rel="canonical" href="https://ayoub-legacy-aid.lovable.app/" />
      </Helmet>
      <section className="relative isolate overflow-hidden">
        <img src={heroImg} alt="Children gathered around a newly installed water pump in a Pakistani village" width={1080} height={1920} className="absolute inset-0 h-full w-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/65 to-ink/30" />
        <div className="relative mx-auto max-w-7xl px-6 py-28 md:py-40">
          <div className="max-w-2xl text-primary-foreground">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-btn-donate">UK Registered • Est. April 2026</p>
            <h1 className="mt-6 font-display text-3xl font-bold leading-[1.05] md:text-5xl uppercase tracking-tight">Serving communities, strengthening lives.</h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-primary-foreground/85">Ayoub Welfare CIC is a London-based, family-run Community Interest Company delivering humanitarian aid and long-term development to underserved communities — with full transparency.</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/donate" className="inline-flex items-center gap-2 rounded-full bg-btn-donate px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition-transform hover:-translate-y-0.5">DONATE NOW <ArrowRight className="h-4 w-4" /></Link>
              <a href="tel:+447735587787" className="inline-flex items-center gap-2 rounded-full bg-btn-call px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition-transform hover:-translate-y-0.5">CALL US</a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-cream">
        <div className="mx-auto grid max-w-7xl gap-x-10 gap-y-6 px-6 py-10 sm:grid-cols-2 md:grid-cols-3">
          {trustPoints.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-3 text-sm font-medium text-foreground/85">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"><Icon className="h-4 w-4" /></span>
              {text}
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-donate">What we do</p>
            <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold leading-tight md:text-4xl uppercase tracking-tight text-ink">Four programmes, one mission — lasting change for those who need it most.</h2>
          </div>
          <Link to="/what-we-do" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-btn-donate">Read more <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {projects.map(({ icon: Icon, title, text, img }) => (
            <article key={title} className="group overflow-hidden rounded-2xl bg-card shadow-sm ring-1 ring-border transition-all hover:shadow-xl hover:-translate-y-1">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={img} alt={title} loading="lazy" width={1280} height={896} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary"><Icon className="h-5 w-5" /></span>
                <h3 className="mt-4 font-display text-xl font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-24 md:grid-cols-2">
          <div className="overflow-hidden rounded-2xl">
            <img src={villageImg} alt="A village in Eastern Gujar Khan, Pakistan at golden hour" loading="lazy" width={1600} height={1000} className="h-full w-full object-cover" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-btn-donate">Our Story</p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight md:text-4xl uppercase tracking-tight text-ink">Founded in loving memory of a beloved uncle.</h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">From a small village in Eastern Gujar Khan, he witnessed the daily struggles of his community — and answered them with quiet generosity. His legacy of compassion inspires everything we do.</p>
            <Link to="/our-story" className="mt-8 inline-flex items-center gap-2 rounded-full bg-btn-call px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">READ MORE <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>

      <section className="bg-cream/30 border-t border-border/40">
        <div className="mx-auto max-w-4xl px-6 py-24 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-btn-donate">Our Team</p>
          <h2 className="mt-6  text-3xl font-bold leading-[1.1] md:text-4xl uppercase tracking-tight text-ink">
            Two dedicated co-founders.<br />A trusted team on the ground.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground mx-auto max-w-2xl">
            Khurram and Naila lead Ayoub Welfare CIC with strong ties to Pakistan and a shared commitment to serving underserved communities — directly, without middlemen.
          </p>
          <Link to="/our-team" className="mt-10 inline-flex items-center gap-2 rounded-full bg-btn-call px-8 py-4 text-sm font-semibold text-white shadow-lg transition-transform hover:-translate-y-0.5">
            MEET THE TEAM
          </Link>
        </div>
      </section>

      <section className="bg-white border-t border-border/40">
        <div className="mx-auto max-w-7xl px-6 py-20 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-btn-donate">Our Partners</p>
          <h2 className="mt-6 text-3xl font-bold uppercase tracking-tight text-ink">Trusted by our Sponsors</h2>
          
          <div className="mt-16 flex flex-wrap md:flex-nowrap items-center justify-center gap-8 md:gap-16">
            {[
              { name: 'Minicabs', logo: minicabsLogo, height: "h-20", url: "https://minicabs.co.uk/" },
              { name: 'Muallim Academy', logo: muallimLogo, height: "h-24", url: "https://muallimacademy.org/" },
              { name: 'GMF', logo: gmfLogo, height: "h-20", url: "https://globalmarketingfirm.co.uk/" },
              { name: 'B2B', logo: b2bLogo, height: "h-24", url: "https://b2b-solutions.pk/" },
            ].map((sponsor) => (
              <a key={sponsor.name} href={sponsor.url} target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-3 hover:opacity-100">
                <img src={sponsor.logo} alt={sponsor.name} className={`${sponsor.height} w-auto object-contain transition-transform hover:scale-110`} />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="relative">
        <img src={trustBg} alt="Transparency background" className="absolute inset-0 h-full w-full object-cover" />
        <div className="relative mx-auto max-w-7xl px-6 py-24">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-btn-donate">Transparency</p>
            <h2 className="mt-4 font-display text-4xl font-bold leading-tight text-white uppercase tracking-tight">Trust, earned through proof.</h2>
            <p className="mt-6 text-lg leading-relaxed text-white/80">
              Every project is documented with photos, videos and GPS locations. Funds are tracked and used strictly for their intended purpose.
            </p>
          </div>
          
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Camera, title: "Photos", text: "Visual proof from every project site." },
              { icon: MapPin, title: "GPS Locations", text: "Coordinates for installed water pumps." },
              { icon: ShieldCheck, title: "Audited Funds", text: "Every penny tracked end-to-end." },
              { icon: Send, title: "Direct Delivery", text: "No middlemen — our team delivers." },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/32 bg-transparent p-8">
                <item.icon className="h-8 w-8 text-white/90" />
                <h3 className="mt-4 font-display text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-white/60 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-12">
            <Link to="/transparency" className="inline-flex items-center gap-2 rounded-full border border-white/30 px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/10">
              READ MORE
            </Link>
          </div>
        </div>
      </section>

      {/* <section className="bg-white ">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-btn-donate">Our Impact</p>
          <h2 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-tight md:text-5xl">Real change, documented and delivered.</h2>
          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { stat: "120+", label: "Clean water sources installed" },
              { stat: "2,400", label: "Families supported" },
              { stat: "350+", label: "Medical aid packages delivered" },
              { stat: "1,800", label: "Children supported" },
            ].map((s) => (
              <div key={s.label} className="border-l border-primary-foreground/20 pl-6">
                <p className="font-display text-5xl font-semibold text-dark">{s.stat}</p>
                <p className="mt-3 text-sm text-btn-call">{s.label}</p>
              </div>
            ))}
          </div>
          <Link to="/impact" className="mt-12 inline-flex items-center gap-2 rounded-full bg-btn-call px-6 py-3 text-sm font-semibold text-white hover:-translate-y-0.5 transition-transform">See our impact <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section> */}

      <section className=" border-t border-border bg-cream">
        <div className="mx-auto max-w-4xl px-6 py-24 text-center">
          <h2 className="font-display text-3xl font-semibold leading-tight md:text-4xl uppercase tracking-tight text-ink">Be part of the change. <br />Support a life today.</h2>
          <Link to="/donate" className="mt-10 inline-flex items-center gap-2 rounded-full bg-btn-donate px-8 py-4 text-base font-semibold text-white shadow-lg hover:-translate-y-0.5 transition-transform">Donate Now <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>
    </>
  );
}