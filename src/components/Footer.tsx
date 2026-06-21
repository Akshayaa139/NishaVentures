import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, FlaskConical, Award } from 'lucide-react';

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export default function Footer() {
  const currentYear = 2026;

  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <FlaskConical className="h-4 w-4 text-white" />
              </div>
              <span className="text-base font-bold text-white tracking-tight">
                Nisha Ventures
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              Research-Grade *Galleria mellonella* supplier dedicated to serving medical, pharmaceutical, and biotechnology R&D.
            </p>
            <div className="flex items-center space-x-2 text-xs text-emerald-400 font-semibold bg-emerald-950/40 p-2 rounded-lg border border-emerald-900/30 w-fit">
              <Award className="h-4 w-4" />
              <span>Standardized 6th Instar Supply</span>
            </div>
          </div>

          {/* Business Focus / Applications */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Research Sectors</h4>
            <ul className="text-xs space-y-2">
              <li>• Drug Toxicity & Safety Assays</li>
              <li>• Microbial Virulence Studies</li>
              <li>• Antibiotic/Antimicrobial Screening</li>
              <li>• Host-Pathogen Interaction Trials</li>
              <li>• Academic Biology Laboratories</li>
              <li>• Biotechnology Research Hubs</li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Quick Links</h4>
            <ul className="text-xs space-y-2 flex flex-col">
              <Link href="/" className="hover:text-emerald-400 transition-colors">Home</Link>
              <Link href="/about" className="hover:text-emerald-400 transition-colors">About Larvae</Link>
              <Link href="/products" className="hover:text-emerald-400 transition-colors">Products</Link>
              <Link href="/research" className="hover:text-emerald-400 transition-colors">Research Infection Model</Link>
              <Link href="/gallery" className="hover:text-emerald-400 transition-colors">Gallery</Link>
              <Link href="/contact" className="hover:text-emerald-400 transition-colors">Contact & Inquiries</Link>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Contact Supplier</h4>
            <ul className="text-xs space-y-3">
              <li className="flex items-start space-x-2">
                <Phone className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <a href="tel:8248612679" className="hover:text-white transition-colors">8248612679</a>
                  <a href="tel:8489437274" className="hover:text-white transition-colors">8489437274</a>
                </div>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                <a href="mailto:nishaventures007@gmail.com" className="hover:text-white transition-colors">nishaventures007@gmail.com</a>
              </li>
              <li className="flex items-center space-x-2">
                <InstagramIcon className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                <a 
                  href="https://www.instagram.com/nisha_ventures07" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-white transition-colors"
                >
                  nisha_ventures07
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Tamil Nadu, India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs">
          <p>© {currentYear} Nisha Ventures. All Rights Reserved.</p>
          <p className="mt-2 sm:mt-0">
            Standardized in vivo models for biotech innovation.
          </p>
        </div>
      </div>
    </footer>
  );
}
