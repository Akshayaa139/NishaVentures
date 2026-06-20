import React from 'react';
import Link from 'next/link';
import { FlaskConical, ShieldCheck, Activity, Truck, ChevronRight, Award, Beaker } from 'lucide-react';
import { Button } from '@/components/ui/core';
import { db } from '@/lib/db';

export const revalidate = 0; // Disable caching to fetch fresh site content updates

export default async function HomePage() {
  const content = await db.getSiteContent('home');

  const heroTitle = content?.heroTitle || 'Premium Research-Grade Galleria mellonella Larvae';
  const heroSubtitle = content?.heroSubtitle || 'Trusted by researchers, universities, biotech companies, and pharmaceutical laboratories.';
  const stat1 = content?.stats?.stat1 || '100% Disease-Free Stock';
  const stat2 = content?.stats?.stat2 || 'Standardized Rearing (250-320 mg)';
  const stat3 = content?.stats?.stat3 || '6th-Instar Development';
  const stat4 = content?.stats?.stat4 || 'Quality Assured Shipping';

  const statsList = [
    { icon: ShieldCheck, title: stat1, desc: 'Reared on a sterile artificial diet to eliminate pathogens and ensure baseline uniformity.' },
    { icon: Award, title: stat2, desc: 'Weight-matched larvae harvested at precise development windows for high data reproducibility.' },
    { icon: Activity, title: stat3, desc: 'Harvested at the peak immunological phase when cellular and humoral defences are fully active.' },
    { icon: Truck, title: stat4, desc: 'Insulated packing with cooling elements keeps larvae dormant (~15°C) to prevent pupation.' }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center bg-slate-950 text-white overflow-hidden">
        {/* Background Image with Dark Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-luminosity scale-105" 
          style={{ backgroundImage: `url('/images/hero_lab_bg.png')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-transparent" />
        
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 z-10">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs px-3.5 py-1.5 rounded-full font-semibold tracking-wide uppercase">
              <FlaskConical className="h-4.5 w-4.5" />
              <span>Bio-Research Support Excellence</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
              {heroTitle}
            </h1>
            
            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl">
              {heroSubtitle}
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="/products">
                <Button size="lg" className="shadow-lg shadow-emerald-500/10 flex items-center space-x-2">
                  <span>View Products</span>
                  <ChevronRight className="h-4.5 w-4.5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="bg-white/5 border-white/20 text-white hover:bg-white/10 hover:text-white">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Hero bottom curve divider */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-50 to-transparent pointer-events-none" />
      </section>

      {/* Statistics Section */}
      <section className="bg-slate-50 py-16 -mt-8 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statsList.map((stat, idx) => {
              const IconComp = stat.icon;
              return (
                <div key={idx} className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 duration-200">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                    <IconComp className="h-6 w-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-800 mb-2 leading-snug">
                    {stat.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {stat.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Rationale & Biotech Application Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Visual Column */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-3xl blur opacity-15 group-hover:opacity-20 transition duration-300" />
              <div className="relative h-[450px] w-full rounded-2xl overflow-hidden shadow-xl border border-slate-100">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url('/images/larvae_research.png')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/10 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                  <span className="bg-blue-500/80 text-white text-[10px] font-bold tracking-wider uppercase px-2 py-1 rounded">Standardized Model</span>
                  <h4 className="text-lg font-bold">Standardized weight and health criteria</h4>
                  <p className="text-xs text-slate-200">Ensuring zero variability and high reproducibility in screening pathogens.</p>
                </div>
              </div>
            </div>

            {/* Information Column */}
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full font-semibold">
                <Beaker className="h-4 w-4" />
                <span>Ethical & Economical Alternative</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 leading-tight">
                Why Galleria mellonella Larvae?
              </h2>
              
              <p className="text-slate-600 leading-relaxed text-sm">
                Medical researchers and pharmaceutical labs face rising regulatory and cost barriers when testing on mice or other vertebrate models. 
                <strong> Galleria mellonella (wax moth)</strong> larvae offer a highly efficient, ethically clean, and low-cost alternative. 
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-xs mt-0.5">✓</div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">No Ethical Approvals Required</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">Conduct high-throughput screening without the lengthy IACUC/ethical review processes required for mammalian testing.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-xs mt-0.5">✓</div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">Human Incubation (37°C) Tolerant</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">Unlike other insect models (like Drosophila), wax moth larvae can survive at 37°C, letting researchers study active mammalian pathogens at optimal temperature.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-xs mt-0.5">✓</div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">Mammalian-like Immune Analogy</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">Larval hemocytes and immune proteins respond to bacterial and chemical toxins similarly to mammalian neutrophils and innate immunity cascades.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex space-x-4">
                <Link href="/about">
                  <Button variant="outline" className="text-slate-700">Learn More About the Model</Button>
                </Link>
                <Link href="/products">
                  <Button className="flex items-center space-x-1">
                    <span>Order Larvae</span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Target Applications Section */}
      <section className="bg-slate-50 py-20 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl font-extrabold text-slate-800">Biomedical and R&D Applications</h2>
            <p className="text-slate-600 text-sm">
              Our standardized disease-free Galleria mellonella cohorts are specifically reared for scientific investigation across primary biotech research fields.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl border border-slate-100 p-8 hover:shadow-md transition-shadow">
              <span className="text-emerald-600 font-extrabold text-sm uppercase tracking-wider block mb-2">Application 01</span>
              <h3 className="text-lg font-bold text-slate-800 mb-3">Drug Toxicity Screening</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Quickly screen novel chemical entities for in vivo toxicity and determine LD50 dosages. High sample sizes allow for high statistical significance.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 p-8 hover:shadow-md transition-shadow">
              <span className="text-emerald-600 font-extrabold text-sm uppercase tracking-wider block mb-2">Application 02</span>
              <h3 className="text-lg font-bold text-slate-800 mb-3">Bacterial Virulence Assays</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Evaluate pathogen infectivity profiles. Inject human pathogens (e.g. Pseudomonas, Staph) to evaluate post-injection survival rates.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 p-8 hover:shadow-md transition-shadow">
              <span className="text-emerald-600 font-extrabold text-sm uppercase tracking-wider block mb-2">Application 03</span>
              <h3 className="text-lg font-bold text-slate-800 mb-3">Antimicrobial Research</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Test the efficacy of antibiotic candidates, custom bacteriophages, or novel drug compounds in vivo in a quick, robust screening model.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
