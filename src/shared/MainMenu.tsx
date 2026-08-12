import { NavLink } from "react-router-dom";
import { MainMenuRootList } from "@/shared/mobile-menu/MobileMenuCloneContext";

const MEGA_ARROW = (
  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none">
    <path
      d="M10.0208 3.41421L1.41421 12.0208L0 10.6066L8.60659 2H1.02082V0H12.0208V11H10.0208V3.41421Z"
      fill="currentColor"
    />
  </svg>
);

type Item = { to: string; label: string };

const HOME_LIGHT: Item[] = [
  { to: "/", label: "01. Creative Agency" },
  { to: "/index-2", label: "02. Digital Agency" },
  { to: "/index-3", label: "03. Marketing Agency" },
  { to: "/index-4", label: "04. AI & Tech Agency" },
  { to: "/index-5", label: "05. Personal Creative" },
  { to: "/index-6", label: "06. Branding Studio" },
  { to: "/index-7", label: "07. Startup Agency" },
  { to: "/index-8", label: "08. UI/UX Agency" },
  { to: "/index-9", label: "09. Modern Agency" },
  { to: "/index-10", label: "10. 3D Studio" },
  { to: "/index-11", label: "11. Motion & Video Studio" },
  { to: "/index-12", label: "12. Minimal Portfolio" },
  { to: "/index-13", label: "13. Architecture Studio" },
  { to: "/index-14", label: "14. Photography Showcase" },
  { to: "/index-15", label: "15. Agency Portfolio" },
];

const HOME_DARK: Item[] = [
  { to: "/index-dark", label: "01. Creative Agency" },
  { to: "/index-2-dark", label: "02. Digital Agency" },
  { to: "/index-3-dark", label: "03. Marketing Agency" },
  { to: "/index-4-dark", label: "04. AI & Tech Agency" },
  { to: "/index-5-dark", label: "05. Personal Creative" },
  { to: "/index-6-dark", label: "06. Branding Studio" },
  { to: "/index-7-dark", label: "07. Startup Agency" },
  { to: "/index-8-dark", label: "08. UI/UX Agency" },
  { to: "/index-9-dark", label: "09. Modern Agency" },
  { to: "/index-10-dark", label: "10. 3D Studio" },
  { to: "/index-11-dark", label: "11. Motion & Video Studio" },
  { to: "/index-12-dark", label: "12. Minimal Portfolio" },
  { to: "/index-13-dark", label: "13. Architecture Studio" },
  { to: "/index-14-dark", label: "14. Photography Studio" },
  { to: "/index-15-dark", label: "15. Agency Portfolio" },
];

const ABOUT_LINKS: Item[] = [
  { to: "/about-1", label: "About 01" },
  { to: "/about-2", label: "About 02" },
  { to: "/about-3", label: "About 03" },
];

const SERVICE_LINKS: Item[] = [
  { to: "/services-1", label: "Service 01" },
  { to: "/services-2", label: "Service 02" },
  { to: "/services-3", label: "Service 03" },
  { to: "/services-details", label: "Service Details" },
];

const OTHER_LINKS: Item[] = [
  { to: "/team", label: "Team" },
  { to: "/team-details", label: "Team Details" },
  { to: "/pricing", label: "Pricing" },
  { to: "/coming-soon", label: "Coming Soon" },
  { to: "/faqs", label: "FAQs" },
  { to: "/404-not-found", label: "404 Page" },
];

const PORTFOLIO_CREATIVE: Item[] = [
  { to: "/portfolio-cinema", label: "Portfolio Cinema" },
  { to: "/portfolio-split", label: "Portfolio Split" },
  { to: "/portfolio-stack", label: "Portfolio Stack" },
  { to: "/portfolio-curtain", label: "Portfolio Curtain" },
  { to: "/portfolio-zstack", label: "Portfolio Z-Stack" },
  { to: "/portfolio-vista", label: "Portfolio Vista" },
  { to: "/portfolio-horizontal", label: "Portfolio Horizontal" },
];

const PORTFOLIO_CLASSIC: Item[] = [
  { to: "/portfolio-1", label: "Portfolio 01" },
  { to: "/portfolio-2", label: "Portfolio 02" },
  { to: "/portfolio-3", label: "Portfolio 03" },
  { to: "/portfolio-4", label: "Portfolio 04" },
  { to: "/portfolio-5", label: "Portfolio 05" },
  { to: "/portfolio-6", label: "Portfolio 06" },
];

const PORTFOLIO_DETAILS: Item[] = [
  { to: "/portfolio-details-1", label: "Portfolio Details 01" },
  { to: "/portfolio-details-2", label: "Portfolio Details 02" },
  { to: "/portfolio-details-3", label: "Portfolio Details 03" },
  { to: "/portfolio-details-4", label: "Portfolio Details 04" },
  { to: "/portfolio-details-5", label: "Portfolio Details 05" },
  { to: "/portfolio-details-6", label: "Portfolio Details 06" },
];

const SHOP_LINKS: Item[] = [
  { to: "/product-archive", label: "Products Listing" },
  { to: "/product-details", label: "Product Details" },
  { to: "/product-cart", label: "Cart" },
  { to: "/product-checkout", label: "Checkout" },
];

const NEWS_LINKS: Item[] = [
  { to: "/archive-1", label: "Blog 01" },
  { to: "/archive-2", label: "Blog 02" },
  { to: "/archive-3", label: "Blog 03" },
  { to: "/archive-4", label: "Blog 04" },
  { to: "/blog-details", label: "Post Details" },
];

const CONTACT_LINKS: Item[] = [
  { to: "/contact-1", label: "Contact 01" },
  { to: "/contact-2", label: "Contact 02" },
];

function MenuLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <NavLink to={to} className={({ isActive }) => (isActive ? "active" : undefined)}>
      {children}
    </NavLink>
  );
}

function MegaColumn({ title, items }: { title: string; items: Item[] }) {
  return (
    <div className="at-megamenu-box">
      <div className="at-megamenu-title-wrap">
        <span className="at-megamenu-title">{title}</span>
        {MEGA_ARROW}
      </div>
      <ul>
        {items.map((it) => (
          <li key={it.label}>
            <MenuLink to={it.to}>{it.label}</MenuLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

function LinkSwap({ label }: { label: string }) {
  return (
    <span className="at-link-swap">
      <span className="text-1">{label}</span>
      <span className="text-2">{label}</span>
    </span>
  );
}

export default function MainMenu() {
  return (
    <MainMenuRootList>
      <li className="has-dropdown">
        <a href="#" onClick={(e) => e.preventDefault()}>
          <LinkSwap label="Home" />
        </a>
        <div className="at-submenu submenu at-megamenu">
          <div className="row">
            <div className="col-xl-6">
              <MegaColumn title="Light Version" items={HOME_LIGHT} />
            </div>
            <div className="col-xl-6">
              <MegaColumn title="Dark Version" items={HOME_DARK} />
            </div>
          </div>
        </div>
      </li>

      <li className="has-dropdown">
        <a href="#" onClick={(e) => e.preventDefault()}>
          <LinkSwap label="Page" />
        </a>
        <div className="at-submenu submenu at-megamenu">
          <div className="row">
            <div className="col-xl-4">
              <MegaColumn title="About Us" items={ABOUT_LINKS} />
            </div>
            <div className="col-xl-4">
              <MegaColumn title="Services" items={SERVICE_LINKS} />
            </div>
            <div className="col-xl-4">
              <MegaColumn title="Other" items={OTHER_LINKS} />
            </div>
          </div>
        </div>
      </li>

      <li className="has-dropdown">
        <a href="#" onClick={(e) => e.preventDefault()}>
          <LinkSwap label="Portfolio" />
        </a>
        <div className="at-submenu submenu at-megamenu">
          <div className="row">
            <div className="col-xl-4">
              <MegaColumn title="Creative" items={PORTFOLIO_CREATIVE} />
            </div>
            <div className="col-xl-4">
              <MegaColumn title="Classic" items={PORTFOLIO_CLASSIC} />
            </div>
            <div className="col-xl-4">
              <MegaColumn title="Details" items={PORTFOLIO_DETAILS} />
            </div>
          </div>
        </div>
      </li>

      <li className="has-dropdown">
        <a href="#" onClick={(e) => e.preventDefault()}>
          <LinkSwap label="Shop" />
        </a>
        <ul className="at-submenu submenu">
          {SHOP_LINKS.map((l) => (
            <li key={l.label}>
              <MenuLink to={l.to}>{l.label}</MenuLink>
            </li>
          ))}
        </ul>
      </li>

      <li className="has-dropdown">
        <a href="#" onClick={(e) => e.preventDefault()}>
          <LinkSwap label="News" />
        </a>
        <ul className="at-submenu submenu">
          {NEWS_LINKS.map((l) => (
            <li key={l.label}>
              <MenuLink to={l.to}>{l.label}</MenuLink>
            </li>
          ))}
        </ul>
      </li>

      <li className="has-dropdown">
        <a href="#" onClick={(e) => e.preventDefault()}>
          <LinkSwap label="Contact" />
        </a>
        <ul className="at-submenu submenu">
          {CONTACT_LINKS.map((l) => (
            <li key={l.label}>
              <MenuLink to={l.to}>{l.label}</MenuLink>
            </li>
          ))}
        </ul>
      </li>
    </MainMenuRootList>
  );
}
