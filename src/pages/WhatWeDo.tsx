import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import waterImg from "@/assets/clean-water.png";
import foodImg from "@/assets/food-dist.png";
import medicalImg from "@/assets/medical-suport.png";
import educationImg from "@/assets/education-suport.png";

const projects = [
  {  title: "Clean Water Projects", text: "We install water pumps in areas with limited access to clean water, providing a long-term solution and ongoing Sadaqah Jariyah.", img: waterImg },
  {  title: "Food Distribution", text: "We deliver essential food packs to families facing hardship, ensuring access to basic nutrition.", img: foodImg },
  {  title: "Medical Support", text: "We provide wheelchairs, essential medical supplies, and basic healthcare support to those in need.", img: medicalImg },
  {  title: "Education Support", text: "We distribute books, shoes, and clothing to children, helping them access education and improve their daily lives.", img: educationImg },
];

export default function WhatWeDo() {
  return (
    <>
      <Helmet>
        <title>What We Do — Ayoub Welfare CIC</title>
        <meta name="description" content="Clean water, food, medical and education programmes delivered directly to underserved communities in Pakistan." />
        <link rel="canonical" href="https://ayoub-legacy-aid.lovable.app/what-we-do" />
      </Helmet>
      <PageHero eyebrow="Our Programmes" title="What we do." description="From clean water and food to medical and education support, every programme is designed to deliver lasting change — directly, transparently, and with dignity." />
      <section className="mx-auto max-w-7xl space-y-24 px-6 py-24">
        {projects.map((p, i) => (
          <div key={p.title} className="grid items-center gap-12 md:grid-cols-2">
            <div className={i % 2 === 1 ? "md:order-2" : ""}>
              <div className="overflow-hidden rounded-2xl">
                <img src={p.img} alt={p.title} loading="lazy" width={1280} height={896} className="h-full w-full object-cover" />
              </div>
            </div>
            <div>
              <h2 className="mt-3 font-display text-3xl font-semibold md:text-4xl">{p.title}</h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{p.text}</p>
              <Link to="/donate" className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Support this project <ArrowRight className="h-4 w-4" /></Link>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}