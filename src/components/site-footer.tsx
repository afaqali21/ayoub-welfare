import { Link } from "react-router-dom";
import { Mail, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import logo from "@/assets/logo-footer.png";
import whatsappIcon from "@/assets/whatsapp-icon.png";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-btn-call text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-4">
        <div className="md:col-span-2"> 
          <div className="flex items-center gap-3">
            <img src={logo} alt="Ayoub Welfare CIC Logo" className="h-30 w-auto" />
          </div>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-primary-foreground/75">
            A London-based, family-run Community Interest Company delivering
            humanitarian aid and long-term development projects to underserved
            communities — with full transparency, every step of the way.
          </p>
          <div className="mt-6 space-y-2 text-sm text-primary-foreground/70">
            <p className="flex items-center gap-2">
              <a href="https://wa.me/447735587787" className="flex items-center gap-2 hover:text-primary-foreground " target="_blank" rel="noopener noreferrer">
                <img src={whatsappIcon} alt="WhatsApp" className="h-4 w-4" />
                WhatsApp: +44 7735 587787
              </a>
            </p>
            <p className="flex items-center gap-2">
              <a href="mailto:info@ayoubwelfare.org" className="flex items-center gap-2 hover:text-primary-foreground transition-colors">
                <Mail className="h-4 w-4" /> info@ayoubwelfare.org
              </a>
            </p>
          </div>
          <div className="mt-8 flex items-center gap-5">
            <a href="https://www.facebook.com/share/1CkysGAduC/" className="text-primary-foreground/60 hover:text-white transition-colors" aria-label="Facebook"><Facebook className="h-5 w-5" /></a>
            <a href="#" className="text-primary-foreground/60 hover:text-white transition-colors" aria-label="Instagram"><Instagram className="h-5 w-5" /></a>
            <a href="#" className="text-primary-foreground/60 hover:text-white transition-colors" aria-label="LinkedIn"><Linkedin className="h-5 w-5" /></a>
            <a href="#" className="text-primary-foreground/60 hover:text-white transition-colors" aria-label="X (Twitter)"><Twitter className="h-5 w-5" /></a>
            <a href="https://www.tiktok.com/@ayoub.welafre?_r=1&_t=ZN-96JqnGyUENe" className="text-primary-foreground/60 hover:text-white transition-colors" aria-label="TikTok">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12.525.02c1.31-.036 2.612.012 3.914.01 0 1.63.766 2.85 2.132 3.51a8.397 8.397 0 0 0 2.457.734v3.834c-1.393-.117-2.673-.55-3.8-1.423a.138.138 0 0 0-.214.053c-.027 3.535.013 7.07-.013 10.606-.062 2.664-1.282 4.606-3.712 5.674-3.13 1.378-6.526.495-8.522-2.148-2.115-2.805-1.31-7.14 1.777-8.916 1.487-.855 3.09-1.077 4.767-.78v3.87c-1.012-.243-2.02-.218-2.955.334-1.127.665-1.636 1.83-1.458 3.125.2 1.453 1.258 2.378 2.68 2.483 1.714.127 3.208-1.026 3.33-2.735.034-4.832.01-9.664.012-14.496.002-.132.14-.265.21-.397Z"/></svg>
            </a>
          </div>
        </div>
        <div>
          <h4 className="font-display text-base font-semibold text-primary-foreground">Explore</h4>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/75">
            <li><Link to="/what-we-do" className="hover:text-accent">What We Do</Link></li>
            <li><Link to="/our-story" className="hover:text-accent">Our Story</Link></li>
            <li><Link to="/our-team" className="hover:text-accent">Our Team</Link></li>
            <li><Link to="/impact" className="hover:text-accent">Our Impact</Link></li>
            <li><Link to="/transparency" className="hover:text-accent">Transparency</Link></li>
                        <li><Link to="/PrivacyPolicy" className="hover:text-accent">Privacy Policy</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-base font-semibold text-primary-foreground">Support</h4>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/75">
            <li><Link to="/donate" className="hover:text-accent">Donate</Link></li>
            <li>Sadaqah Jariyah</li>
            <li>Zakat</li>
            <li>General Fund</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/15">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-2 px-6 py-6 text-xs text-primary-foreground/60 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Ayoub Welfare CIC. UK Registered Community Interest Company.</p>
          <p>Designed by <a href="https://b2b-solutions.pk/" className="hover:text-accent">B2B It Solutions</a><br/> Managed by <a href="https://globalmarketingfirm.co.uk/" className="hover:text-accent">Global Marketing Firm</a></p>
        </div>
      </div>
    </footer>
  );
}