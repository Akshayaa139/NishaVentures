import React from 'react';
import { ShieldCheck, Snowflake, Activity, Leaf, Beaker, CheckCircle2, FlaskConical } from 'lucide-react';
import { db } from '@/lib/db';

export const revalidate = 0; // Fresh copy always

export default async function AboutPage() {
  const content = await db.getSiteContent('about');

  const whatIs = content?.whatIs || 'Galleria mellonella (the greater wax moth) has emerged as an incredibly valuable in vivo infection model. These larvae possess an innate immune system with cellular and humoral components that share high structural and functional similarities to the mammalian innate immune system.';
  const whyUse = content?.whyUse || 'Using Galleria mellonella larvae provides significant benefits over mammalian models like mice. They do not require complex ethical approvals (IACUC), are cost-effective, can be stored and incubated at human body temperature (37°C) to study mammalian-specific pathogens, and yield results within 24-48 hours.';
  const rearing = content?.rearing || 'At Nisha Ventures, our larvae are produced under strict standardized protocols. We utilize an artificial diet consisting of oatflakes, dried yeast, honey, and glycerol to eliminate pathogens and ensure genetic consistency. The insects are kept in dark, temperature-controlled facilities at 27°C, and harvested at the 6th-instar phase (weight range 250–320 mg) when their immune system is fully developed and responsive.';
  const qa = content?.qa || 'Every batch of larvae undergoes strict quality assurance. We monitor development cycles, inspect for black spots (melanization) or stress indicators, and discard any sub-standard specimens. Shipping is done in insulated cooling boxes at ~15°C to keep the larvae dormant, preventing pupation and safeguarding their immunological integrity.';

  return (
    <div className="pt-28 pb-12 space-y-16">
      {/* Intro Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 bg-emerald-50 text-emerald-700 text-xs px-3.5 py-1.5 rounded-full font-bold uppercase tracking-wider">
            <Beaker className="h-4 w-4" />
            <span>Discover the Model Organism</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 leading-tight">
            About Galleria mellonella Research Models
          </h1>
          <p className="text-slate-600 text-sm leading-relaxed">
            Standardized larval insect models bridging the gap between cell culture in vitro assays and expensive vertebrate mammalian in vivo testing.
          </p>
        </div>
      </section>

      {/* Main Scientific Context */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          {/* Paragraphs */}
          <div className="space-y-6 flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-slate-800">What is Galleria mellonella?</h2>
            <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
              {whatIs}
            </p>
            <h3 className="text-xl font-bold text-slate-800 mt-4">Why Researchers Choose Larval Models</h3>
            <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
              {whyUse}
            </p>
          </div>

          {/* Graphic/Features Grid */}
          <div className="bg-slate-900 rounded-2xl text-white p-8 flex flex-col justify-center relative overflow-hidden shadow-xl">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

            <h3 className="text-lg font-bold text-white mb-6 flex items-center space-x-2 border-b border-slate-800 pb-3">
              <FlaskConical className="h-5 w-5 text-emerald-400" />
              <span>Model Comparison vs. Rodents</span>
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-slate-800 p-2 rounded-lg text-emerald-400">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-100">Zero Ethical Red Tape</h4>
                  <p className="text-xs text-slate-400 mt-1">Vertebrate models require intensive ethics declarations (IACUC), whereas wax moths are invertebrate models requiring no regulatory clearance.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-slate-800 p-2 rounded-lg text-emerald-400">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-100">Accelerated Time-to-Data</h4>
                  <p className="text-xs text-slate-400 mt-1">Pathogen virulence and drug toxicity outputs can be determined within 24-48 hours, enabling rapid iterative screening cycles.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-slate-800 p-2 rounded-lg text-emerald-400">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-100">Drastic Cost Efficiencies</h4>
                  <p className="text-xs text-slate-400 mt-1">Purchase, housing, and operational costs are fractions of rodent facility requirements, lowering barriers to high-throughput trials.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rearing Methodology & Quality Assurance */}
      <section className="bg-white py-16 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800">Our Rearing and Quality Control Standards</h2>
            <p className="text-slate-500 text-xs leading-relaxed">
              Biological consistency is paramount. We control every stage of our rearing environment to deliver standard responses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Rearing */}
            <div className="bg-slate-50 rounded-2xl p-8 space-y-4 border border-slate-100">
              <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">
                <Leaf className="h-4 w-4" />
                <span>1. Standardized Rearing Protocol</span>
              </div>
              <h3 className="text-lg font-bold text-slate-800">Diet & Climate Settings</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                {rearing}
              </p>
              <ul className="text-xs text-slate-500 space-y-2 pt-2 grid grid-cols-2 gap-2">
                <li className="flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  <span>Artificial Diet Base</span>
                </li>
                <li className="flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  <span>27°C Temperature Hold</span>
                </li>
                <li className="flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  <span>60% Target Humidity</span>
                </li>
                <li className="flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  <span>Pathogen-Free Substrate</span>
                </li>
              </ul>
            </div>

            {/* QA & Logistics */}
            <div className="bg-slate-50 rounded-2xl p-8 space-y-4 border border-slate-100">
              <div className="inline-flex items-center space-x-2 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold">
                <ShieldCheck className="h-4 w-4" />
                <span>2. Strict Quality Control & Packaging</span>
              </div>
              <h3 className="text-lg font-bold text-slate-800">Health Inspections & Logistics</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                {qa}
              </p>
              <ul className="text-xs text-slate-500 space-y-2 pt-2 grid grid-cols-2 gap-2">
                <li className="flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>Melanization Screen</span>
                </li>
                <li className="flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>Insulated Shipping Boxes</span>
                </li>
                <li className="flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>Dormancy Cold-Packs</span>
                </li>
                <li className="flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>Wood Shavings Bedding</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Grid View */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="bg-gradient-to-tr from-slate-900 to-blue-950 rounded-2xl text-white p-8 md:p-12 relative overflow-hidden shadow-lg border border-slate-800">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white leading-tight">Committed to Scientific Integrity</h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                We believe that reliable science starts with reliable models. By standardizing rearing feeds, developmental staging (harvesting exclusively at 6th-instar), weight classification, and strict transport conditions, Nisha Ventures guarantees research models that yield reproducible, highly publishable scientific outcomes.
              </p>
              <div className="flex space-x-6 pt-2">
                <div className="flex flex-col">
                  <span className="text-xl font-bold text-emerald-400">250-320 mg</span>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Standard Weight Range</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold text-emerald-400">6th Instar</span>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Target Stage</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold text-emerald-400">~15°C</span>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Logistics Temp</span>
                </div>
              </div>
            </div>
            <div className="h-[250px] w-full rounded-xl overflow-hidden relative border border-slate-800 shadow-md">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('/images/rearing_facility.png')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/50 to-transparent" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
