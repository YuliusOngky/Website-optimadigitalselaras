import { useEffect, useState } from "react";
import "./optima-home.css";

const NAV_LINKS = [
  { label: "What We Do", href: "#what-we-do" },
  { label: "Products", href: "#products" },
  { label: "Industries", href: "#industries" },
  { label: "Client Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const SERVICES = [
  {
    title: "Web Development",
    desc: "Company profile, e-commerce, and custom web platforms built around how your business actually operates.",
    tags: ["React", "Next.js", "Laravel", "Node.js"],
  },
  {
    title: "Mobile Development",
    desc: "Native Android & iOS applications engineered by our in-house product and engineering team.",
    tags: ["Kotlin", "Swift", "Flutter", "React Native"],
  },
  {
    title: "APIs & Integration",
    desc: "Reliable connections to payment gateways, e-wallets, e-KYC, and the other systems your operations demand.",
    tags: ["REST", "GraphQL", "Webhooks", "OAuth 2.0"],
  },
];

const PRODUCTS = [
  {
    category: "Bank & Financial Sector",
    items: ["CreditRiskDynamics", "Loan Origination System", "Collection Management System"],
  },
  {
    category: "Government & Community",
    items: ["Smart City", "HRIS", "Koperasi Digital", "Warga Digital"],
  },
  {
    category: "Finance & Operations",
    items: ["Supply Chain Financing", "PPOB"],
  },
  {
    category: "Commerce & Transactions",
    items: ["POS", "Mobile Collection", "Online Shop", "Yoga Class App", "GoRide"],
  },
];

const INDUSTRIES = [
  { title: "Financial Services", desc: "Modernize operations, ensure compliance, and elevate customer experience." },
  { title: "Retail & Commerce", desc: "Omnichannel solutions that unify inventory, transactions, and customer data." },
  { title: "Government", desc: "Digital services that improve public access, transparency, and operational efficiency." },
  { title: "Cooperatives", desc: "Empower members with digital tools for savings, loans, and community services." },
  { title: "SMEs", desc: "Affordable, scalable solutions to help small businesses grow and compete." },
  { title: "Enterprise Operations", desc: "Integrate systems and data to drive productivity and business resilience." },
];

const CASE_STUDIES = [
  {
    title: "Integrated finance workflow",
    desc: "Streamlined end-to-end financing process with system integration and real-time data synchronization.",
  },
  {
    title: "Citizen service platform",
    desc: "Unified digital services platform that improves accessibility, transparency, and public service delivery.",
  },
  {
    title: "Retail transaction ecosystem",
    desc: "Connected POS, inventory, and payment ecosystem that drives efficiency and better customer experience.",
  },
];

export default function OptimaHomePage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="optima-site">
      {/* ---------- HEADER ---------- */}
      <header className={`optima-header ${scrolled ? "is-scrolled" : ""}`}>
        <div className="container d-flex align-items-center justify-content-between py-3">
          <a href="#" className="optima-logo text-decoration-none">
            <div className="fw-bold" style={{ fontSize: "1.1rem", letterSpacing: "0.5px" }}>
              OPTIMA DIGITAL
            </div>
            <div className="text-muted" style={{ fontSize: "0.72rem" }}>
              PT Optima Digital Selaras
            </div>
          </a>

          <nav className="d-none d-lg-flex align-items-center gap-4">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="optima-nav-link text-decoration-none">
                {l.label}
              </a>
            ))}
          </nav>

          <button
            className="d-lg-none btn btn-sm btn-outline-dark"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <i className="fa-solid fa-bars" />
          </button>
        </div>

        {menuOpen && (
          <div className="d-lg-none border-top">
            <div className="container py-2 d-flex flex-column gap-2">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="text-decoration-none py-1"
                  onClick={() => setMenuOpen(false)}
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* ---------- HERO ---------- */}
      <section className="optima-hero">
        <div className="container text-center py-5">
          <span className="badge rounded-pill optima-badge mb-4">Digital Ecosystem Enabler</span>
          <h1 className="display-4 fw-bold mb-3">Build. Transform. Scale.</h1>
          <h2 className="h4 fw-normal text-muted mb-4">
            Technology solutions designed around how your business operates.
          </h2>
          <p className="mx-auto mb-4" style={{ maxWidth: 720 }}>
            We design and build digital products, platforms, and integrations that help organizations modernize
            operations, connect systems, and grow with confidence.
          </p>
          <div className="d-flex flex-wrap justify-content-center gap-3">
            <a href="#what-we-do" className="btn btn-dark btn-lg px-4">
              Explore What We Do
            </a>
            <a href="#contact" className="btn btn-outline-dark btn-lg px-4">
              Talk to Our Team
            </a>
          </div>
        </div>
      </section>

      {/* ---------- INTRO ---------- */}
      <section className="py-5 border-top">
        <div className="container text-center">
          <h3 className="fw-bold mb-3" style={{ maxWidth: 760, margin: "0 auto" }}>
            Technology partner for connected business ecosystems
          </h3>
          <p className="text-muted mx-auto" style={{ maxWidth: 720 }}>
            We combine strategy, engineering, and integration expertise to help organizations across government,
            finance, retail, and enterprise sectors build resilient, connected digital ecosystems.
          </p>
        </div>
      </section>

      {/* ---------- WHAT WE DO ---------- */}
      <section id="what-we-do" className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">What We Do</h2>
            <p className="text-muted">Core capabilities we bring to every engagement.</p>
          </div>
          <div className="row g-4">
            {SERVICES.map((s) => (
              <div className="col-md-4" key={s.title}>
                <div className="optima-card h-100 p-4 bg-white rounded-4">
                  <h4 className="fw-bold mb-2">{s.title}</h4>
                  <p className="text-muted mb-3">{s.desc}</p>
                  <div className="d-flex flex-wrap gap-2">
                    {s.tags.map((t) => (
                      <span key={t} className="badge bg-light text-dark border">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- PRODUCTS ---------- */}
      <section id="products" className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Product Portfolio</h2>
            <p className="text-muted">Ready-to-deploy applications built and proven across real sectors in Indonesia.</p>
          </div>
          <div className="row g-4">
            {PRODUCTS.map((p) => (
              <div className="col-md-6 col-lg-3" key={p.category}>
                <div className="optima-card h-100 p-4 rounded-4 border">
                  <h5 className="fw-bold mb-3">{p.category}</h5>
                  <ul className="list-unstyled d-flex flex-column gap-2 mb-0">
                    {p.items.map((item) => (
                      <li key={item} className="text-muted">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- INDUSTRIES ---------- */}
      <section id="industries" className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Solutions Across Industries</h2>
            <p className="text-muted">Applications proven across real sectors, adapted to how each one works.</p>
          </div>
          <div className="row g-4">
            {INDUSTRIES.map((ind) => (
              <div className="col-md-6 col-lg-4" key={ind.title}>
                <div className="optima-card h-100 p-4 bg-white rounded-4">
                  <h5 className="fw-bold mb-2">{ind.title}</h5>
                  <p className="text-muted mb-0">{ind.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- CLIENT WORK ---------- */}
      <section id="work" className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Selected Work & Delivery Strength</h2>
            <p className="text-muted">A look at how our products come together to solve real operational problems.</p>
          </div>
          <div className="row g-4">
            {CASE_STUDIES.map((c) => (
              <div className="col-md-4" key={c.title}>
                <div className="optima-card h-100 p-4 rounded-4 border">
                  <h5 className="fw-bold mb-2">{c.title}</h5>
                  <p className="text-muted mb-0">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- ABOUT / CTA ---------- */}
      <section id="about" className="optima-cta py-5 text-center text-white">
        <div className="container">
          <h2 className="fw-bold mb-3">Ready to build your next digital platform?</h2>
          <p className="mb-4">Let's create connected solutions that accelerate your business.</p>
          <a href="mailto:marketing@optimadigital.co.id" className="btn btn-light btn-lg px-4">
            Contact Optima
          </a>
        </div>
      </section>

      {/* ---------- FOOTER ---------- */}
      <footer id="contact" className="bg-dark text-white py-5">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-4">
              <div className="fw-bold mb-1">OPTIMA DIGITAL</div>
              <div className="text-secondary mb-3" style={{ fontSize: "0.85rem" }}>
                PT Optima Digital Selaras
              </div>
              <p className="text-secondary" style={{ fontSize: "0.9rem" }}>
                We enable organizations to build, transform, and scale through technology — creating connected
                ecosystems across industries.
              </p>
            </div>
            <div className="col-6 col-lg-2">
              <h6 className="fw-bold mb-3">What We Do</h6>
              <ul className="list-unstyled text-secondary" style={{ fontSize: "0.9rem" }}>
                <li className="mb-2">Web Development</li>
                <li className="mb-2">Mobile Development</li>
                <li className="mb-2">APIs & Integration</li>
              </ul>
            </div>
            <div className="col-6 col-lg-2">
              <h6 className="fw-bold mb-3">Products</h6>
              <ul className="list-unstyled text-secondary" style={{ fontSize: "0.9rem" }}>
                <li className="mb-2">Government & Community</li>
                <li className="mb-2">Finance & Operations</li>
                <li className="mb-2">Commerce & Transactions</li>
              </ul>
            </div>
            <div className="col-lg-4">
              <h6 className="fw-bold mb-3">Get in Touch</h6>
              <ul className="list-unstyled text-secondary" style={{ fontSize: "0.9rem" }}>
                <li className="mb-2">marketing@optimadigital.co.id</li>
                <li className="mb-2">+62 812 988 5679</li>
                <li className="mb-2">
                  Ruko Golden Madrid Blok D No. 26, Jl. Letnan Sutopo, BSD City, Serpong, Tangerang Selatan, Banten
                </li>
              </ul>
            </div>
          </div>
          <hr className="border-secondary my-4" />
          <div className="d-flex flex-column flex-md-row justify-content-between text-secondary" style={{ fontSize: "0.8rem" }}>
            <span>© 2026 PT Optima Digital Selaras. All rights reserved.</span>
            <span>www.optimadigitalselaras.com</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
