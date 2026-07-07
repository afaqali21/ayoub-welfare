import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import villageImg from "@/assets/gujar-khan-story.png";

export default function OurStory() {
  return (
    <>
      <Helmet>
        <title>Our Story — Ayoub Welfare CIC</title>
        <meta name="description" content="Founded in loving memory of a beloved uncle from Eastern Gujar Khan, Pakistan." />
        <link rel="canonical" href="https://ayoubwelfare.org/our-story" />
      </Helmet>
      <PageHero eyebrow="Our Story" title="A legacy of compassion." description="Ayoub Welfare CIC was founded in loving memory of a beloved uncle, who came from a small village in Eastern Gujar Khan, Pakistan." />
      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="overflow-hidden rounded-2xl">
          <img src={villageImg} alt="Eastern Gujar Khan village landscape" loading="lazy" width={1600} height={1000} className="h-full w-full object-cover" />
        </div>
        <div className="prose prose-lg mt-12 max-w-none text-foreground/85">
          <p className="text-lg leading-relaxed">He experienced firsthand the daily struggles faced by his community, particularly the lack of access to clean water. Despite these challenges, he was known for his strong character, generous nature, and unwavering commitment to helping others. He was a man who cared deeply for the people around him and always did what he could to support his village.</p>
          <p className="mt-6 text-lg leading-relaxed">His legacy of compassion and selflessness became the inspiration behind <strong>Ayoub Welfare CIC</strong>.</p>
          <p className="mt-6 text-lg leading-relaxed">What began as a personal desire to honour his memory has grown into a wider mission — to support underserved communities facing similar hardships. Today, we continue that legacy by delivering clean water projects, food support, medical aid, and educational assistance to those in need.</p>
          <blockquote className="my-12 border-l-4 border-accent pl-6 font-display text-2xl italic leading-relaxed text-foreground">Through every project we carry out, we aim to reflect the values he lived by: kindness, generosity, and service to others.</blockquote>
        </div>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link to="/our-team" className="inline-flex items-center gap-2 rounded-full bg-btn-call px-6 py-3 text-sm font-semibold text-white hover:bg-primary/90">Meet our team <ArrowRight className="h-4 w-4" /></Link>
          <Link to="/donate" className="inline-flex items-center gap-2 rounded-full bg-btn-donate px-6 py-3 text-sm font-semibold text-white hover:bg-primary/90">Donate now</Link>
        </div>
      </section>
    </>
  );
}