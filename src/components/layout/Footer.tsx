import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { NavLink } from '@/components/ui/NavLink';
import { FOOTER_LINKS, SOCIAL_LINKS, CONTACT_INFO, SITE_CONFIG } from '@/lib/constants';
import { Facebook, Twitter, Linkedin, Github, Mail, Phone, MapPin } from 'lucide-react';

const socialIcons = {
  twitter: Twitter,
  linkedin: Linkedin,
  facebook: Facebook,
  github: Github,
} as const;

export interface FooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const Footer = React.forwardRef<HTMLDivElement, FooterProps>(
  ({ className, ...props }, ref) => {
    const currentYear = new Date().getFullYear();

    return (
      <footer
        ref={ref}
        className={cn('bg-neutral-900 text-neutral-300', className)}
        {...props}
      >
        <div className="container-section">
          {/* Main Footer Content */}
          <div className="py-16 lg:py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
              {/* Company Info */}
              <div className="lg:col-span-2">
                <Link 
                  href="/" 
                  className="flex items-center space-x-2 mb-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded-md"
                >
                  <div className="h-10 w-10 rounded-lg bg-primary-600 flex items-center justify-center">
                    <span className="text-white font-bold text-xl">A</span>
                  </div>
                  <span className="font-bold text-2xl text-white">
                    AmazePMS
                  </span>
                </Link>
                
                <p className="text-neutral-400 mb-6 leading-relaxed max-w-md">
                  {SITE_CONFIG.description}
                </p>

                {/* Contact Info */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-4 w-4 text-neutral-500" />
                    <a 
                      href={`mailto:${CONTACT_INFO.email}`}
                      className="text-neutral-400 hover:text-white transition-colors duration-200"
                    >
                      {CONTACT_INFO.email}
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-4 w-4 text-neutral-500" />
                    <a 
                      href={`tel:${CONTACT_INFO.phone}`}
                      className="text-neutral-400 hover:text-white transition-colors duration-200"
                    >
                      {CONTACT_INFO.phone}
                    </a>
                  </div>
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-4 w-4 text-neutral-500 mt-0.5" />
                    <address className="text-neutral-400 not-italic leading-relaxed">
                      {CONTACT_INFO.address.street}<br />
                      {CONTACT_INFO.address.city}, {CONTACT_INFO.address.state} {CONTACT_INFO.address.zip}<br />
                      {CONTACT_INFO.address.country}
                    </address>
                  </div>
                </div>
              </div>

              {/* Product Links */}
              <div>
                <h3 className="font-semibold text-white mb-6">Product</h3>
                <ul className="space-y-4">
                  {FOOTER_LINKS.product.map((link) => (
                    <li key={link.href}>
                      <NavLink
                        href={link.href}
                        variant="ghost"
                        className="text-neutral-400 hover:text-white p-0 h-auto font-normal"
                      >
                        {link.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company Links */}
              <div>
                <h3 className="font-semibold text-white mb-6">Company</h3>
                <ul className="space-y-4">
                  {FOOTER_LINKS.company.map((link) => (
                    <li key={link.href}>
                      <NavLink
                        href={link.href}
                        variant="ghost"
                        className="text-neutral-400 hover:text-white p-0 h-auto font-normal"
                      >
                        {link.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Resources Links */}
              <div>
                <h3 className="font-semibold text-white mb-6">Resources</h3>
                <ul className="space-y-4">
                  {FOOTER_LINKS.resources.map((link) => (
                    <li key={link.href}>
                      <NavLink
                        href={link.href}
                        variant="ghost"
                        className="text-neutral-400 hover:text-white p-0 h-auto font-normal"
                      >
                        {link.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Legal Links */}
              <div>
                <h3 className="font-semibold text-white mb-6">Legal</h3>
                <ul className="space-y-4">
                  {FOOTER_LINKS.legal.map((link) => (
                    <li key={link.href}>
                      <NavLink
                        href={link.href}
                        variant="ghost"
                        className="text-neutral-400 hover:text-white p-0 h-auto font-normal"
                      >
                        {link.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="py-8 border-t border-neutral-800">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-6 lg:space-y-0">
              <div className="max-w-md">
                <h3 className="font-semibold text-white mb-2">Stay Updated</h3>
                <p className="text-neutral-400 text-sm">
                  Get the latest updates on new features and industry insights.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 max-w-md w-full lg:w-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <button className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-neutral-900 transition-colors duration-200">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="py-8 border-t border-neutral-800">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-6 lg:space-y-0">
              {/* Copyright */}
              <div className="text-neutral-400 text-sm">
                © {currentYear} {SITE_CONFIG.name}. All rights reserved.
              </div>

              {/* Social Links */}
              <div className="flex items-center space-x-4">
                {Object.entries(SOCIAL_LINKS).map(([platform, url]) => {
                  const IconComponent = socialIcons[platform as keyof typeof socialIcons];
                  
                  if (!IconComponent) return null;

                  return (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-neutral-500 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-neutral-900 rounded-md"
                      aria-label={`Follow us on ${platform}`}
                    >
                      <IconComponent className="h-5 w-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
);

Footer.displayName = 'Footer';

export { Footer };