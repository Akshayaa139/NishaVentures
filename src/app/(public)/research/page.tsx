import React from 'react';
import Link from 'next/link';
import { Beaker, ShieldCheck, Truck, Users, ClipboardList, ArrowRight, Microscope } from 'lucide-react';
import { Button } from '@/components/ui/core';

export default function ResearchPage() {
  const steps = [
    {
      num: '01',
      title: 'Implement Standardized Rearing',
      subtitle: 'Medical researchers require consistent data, so your larvae must be uniform in size and weight (minimum 0.200g each).',
      icon: Microscope,
      color: 'from-emerald-500 to-teal-600',
      bgColor: 'bg-emerald-50 text-emerald-700 border-emerald-100',
      details: [
        { label: 'Diet', desc: 'Use a high-quality artificial diet (e.g., a mix of oatflakes, dried yeast, glycerol, and honey). Avoid feeding them natural honeycomb, which can introduce pathogens and cause variability.' },
        { label: 'Environment', desc: 'Keep them in dark, temperature-controlled environments (around 27°C).' },
        { label: 'Lifecycle', desc: 'Harvest and supply the 6th-instar larval stage, as their immune systems are fully developed at this phase.' }
      ]
    },
    {
      num: '02',
      title: 'Ensure Quality Control and Health',
      subtitle: 'Labs will reject shipments of stressed, darkened (melanized), or diseased larvae.',
      icon: ShieldCheck,
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'bg-blue-50 text-blue-700 border-blue-100',
      details: [
        { label: 'Inspection', desc: 'Regularly check larvae for movement and coloration.' },
        { label: 'Action', desc: 'Discard and safely dispose of any larvae showing signs of black spots or sluggishness.' }
      ]
    },
    {
      num: '03',
      title: 'Establish Packaging and Logistics',
      subtitle: 'Live larvae are fragile and highly sensitive to temperature fluctuations and stress during shipping, which can alter their immunity.',
      icon: Truck,
      color: 'from-cyan-500 to-blue-600',
      bgColor: 'bg-cyan-50 text-cyan-700 border-cyan-100',
      details: [
        { label: 'Temperature Control', desc: 'Pack the larvae in insulated boxes with cooling packs to keep them dormant at roughly 15°C. This prevents them from pupating (turning into moths) during transit.' },
        { label: 'Bedding', desc: 'Provide adequate medical-grade tissues or wood shavings to prevent the larvae from injuring each other and to absorb moisture.' }
      ]
    },
    {
      num: '04',
      title: 'Connect with Buyers',
      subtitle: 'To tap into the medical and pharmaceutical market, your larvae must be marketed specifically as "research models" rather than fishing bait.',
      icon: Users,
      color: 'from-purple-500 to-indigo-600',
      bgColor: 'bg-purple-50 text-purple-700 border-purple-100',
      details: [
        { label: 'Direct Outreach', desc: 'Contact principal investigators, microbiologists, and entomologists at local universities, hospitals, and pharmaceutical R&D facilities.' },
        { label: 'Compliance', desc: 'Provide documentation on your rearing diet and conditions to assure researchers of your larvae\'s genetic consistency and disease-free status.' }
      ]
    }
  ];

  return (
    <div className="pt-28 pb-16 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Intro Header */}
      <section className="text-center max-w-3xl mx-auto space-y-6">
        <div className="inline-flex items-center space-x-2 bg-emerald-50 text-emerald-700 text-xs px-3.5 py-1.5 rounded-full font-bold uppercase tracking-wider">
          <Beaker className="h-4.5 w-4.5" />
          <span>Scientific Supply Standards</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-800 leading-tight">
          Galleria mellonella Infection Model
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium pt-2">
          "To supply Galleria mellonella (wax moth) larvae to the medical and biotech fields, you must produce disease-free, genetically uniform, and standardized insects. Researchers use them as ethical, low-cost alternatives to mice for testing drug toxicity, bacterial virulence, and novel antimicrobial therapies."
        </p>
      </section>

      {/* Steps Section */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
            Steps to Successfully Supply Research Labs & Medical Institutions
          </h2>
          <div className="w-16 h-1 bg-emerald-500 mx-auto mt-3 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
          {steps.map((step, idx) => {
            const IconComp = step.icon;
            return (
              <div 
                key={idx} 
                className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-8 flex flex-col justify-between hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-slate-50 pb-4 mb-5">
                    <div className="flex items-center space-x-3.5">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${step.color} text-white flex items-center justify-center shadow-md`}>
                        <IconComp className="h-6 w-6" />
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-800">{step.title}</h3>
                    </div>
                    <span className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight select-none">
                      {step.num}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-6 font-medium">
                    {step.subtitle}
                  </p>

                  <div className="space-y-4">
                    {step.details.map((detail, dIdx) => (
                      <div key={dIdx} className="bg-slate-50/50 hover:bg-slate-50 border border-slate-100/60 rounded-xl p-4 transition-colors">
                        <span className="text-xs font-bold text-slate-700 uppercase tracking-wide block mb-1">
                          {detail.label}
                        </span>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {detail.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Business Plan Inquiry Section */}
      <section className="pt-4">
        <div className="bg-gradient-to-tr from-slate-900 to-blue-950 rounded-3xl text-white p-8 md:p-12 relative overflow-hidden shadow-xl border border-slate-800">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center space-x-2 bg-white/10 text-emerald-400 text-xs px-3.5 py-1.5 rounded-full font-bold uppercase tracking-wider">
              <ClipboardList className="h-4.5 w-4.5" />
              <span>Bio-Supply Logistics</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Preparing your Bio-Model Supply Business?
            </h2>
            
            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
              If you are organizing your facility, drafting quality control parameters, or targeting research hubs, we can assist. Submit your logistics criteria to our specialists:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto text-left pt-2 text-xs">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors">
                <span className="text-emerald-400 font-bold block mb-1">Supply Region/Country</span>
                <p className="text-slate-300">Let us help map major university, hospital, and pharma research labs in your targeted territory.</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors">
                <span className="text-emerald-400 font-bold block mb-1">Climate Facilities Check</span>
                <p className="text-slate-300">We assist in defining parameters for 27°C rearing holding and 15°C cold dormancy logistics.</p>
              </div>
            </div>

            <div className="pt-6">
              <Link href="/contact">
                <Button size="lg" className="bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg shadow-emerald-500/20 flex items-center space-x-2 mx-auto">
                  <span>Contact Our Specialists</span>
                  <ArrowRight className="h-4.5 w-4.5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
