import { useEffect, useRef, useState } from "react";
import {
  FaClock,
  FaMapMarkerAlt,
  FaBriefcase,
  FaWhatsapp,
  FaInstagram,
} from "react-icons/fa";


/* ------------------------------------------------------------------ */
/*  1. YOUR DATA — edit only this block. Hero counts are calculated   */
/*     from these arrays, so they always stay in sync.                */
/* ------------------------------------------------------------------ */
const RESUME_URL = "/Samit_Sankhla_Resume.pdf"; // put your file in /public/resume.pdf

const profile = {
  name: "Samit Sankhla",
  role: "Full Stack Developer",
  location: "India",
  email: "samitsankhla@gmail.com",
  github: "https://github.com/samitsankhla",
  linkedin:
    "https://www.linkedin.com/in/samit-sankhla-5322a8258/?isSelfProfile=true",
  // optional contact details: leave "" to hide that card
  phone: "+91 85294 08256", // e.g. "+91 98765 43210"
  whatsapp: "918529408256", // digits with country code, e.g. "919876543210"
  instagram: "", // e.g. "https://instagram.com/your-name"
  about: [
    "I'm a full stack developer from India. I turn ideas into fast, clear and easy-to-use web apps, working on both the React front end and the Node.js and Express back end.",
    "I'm finishing my MCA, and I learn best by building real things: dashboards, login systems, shopping carts and REST APIs that other people actually use.",
    "I care about clean code, layouts that work on every screen, and the small details that make an app feel good to use.",
  ],
  details: [
    ["Role", "Full Stack Developer"],
    ["Based in", "India"],
    ["Education", "MCA"],
    ["Open to", "Freelance, Full-time, Internship"],
  ],
};

const skills = [
  { name: "React.js", group: "Frontend", featured: true },
  { name: "Next.js", group: "Frontend", featured: true },
  { name: "Tailwind CSS", group: "Frontend", featured: true },
  { name: "JavaScript (ES6+)", group: "Frontend" },
  { name: "TypeScript", group: "Frontend" },
  { name: "HTML5", group: "Frontend" },
  { name: "CSS3", group: "Frontend" },

  // Backend
  { name: "Node.js", group: "Backend", featured: true },
  { name: "PHP", group: "Backend", featured: true }, // 👈 Added PHP
  { name: "Express.js", group: "Backend", featured: true },
  { name: "RESTful APIs", group: "Backend" },
  { name: "JWT Authentication", group: "Backend" },

  // Database
  { name: "MongoDB", group: "Database", featured: true },
  { name: "SQL", group: "Database", featured: true },
  { name: "MySQL", group: "Database" },
  { name: "PostgreSQL (basic)", group: "Database" },

  // Programming Languages
  { name: "Python", group: "Languages" },
  { name: "C/C++", group: "Languages" },
  { name: "Java", group: "Languages" },

  // Tools & Practices
  { name: "Git & GitHub", group: "Tools", featured: true },
  { name: "Postman", group: "Tools" },
  { name: "VS Code", group: "Tools" },

  { name: "CI/CD (Jenkins basics)", group: "Tools" },
];

const experience = [
  {
    role: "Software Development Intern",
    company: "RBSEC TECH PVT. LTD.",
    period: "March 2026 – June 2026",
    location: "Jodhpur, Rajasthan, India (On-site)",
    duration: "3 mos",
    points: [
      "Contributed to software development projects.",
      "Designed REST APIs with Node.js, Express and MongoDB, including secure login.",
      "Collaborated effectively with cross-functional teams.",
      "Demonstrated adaptability, initiative, and a willingness to learn new technologies.",
    ],
  },
  {
    role: "Web Developer Intern",
    company: "Zidio Development",
    period: "July 2025 – September 2025",
    duration: "3 mos",
    location: "Bengaluru, Karnataka, India (Remote)",
    points: [
      "Developed full-stack web applications using React.js, Tailwind CSS, Node.js, Express.js, and MongoDB.",

      "Built and integrated REST APIs, implemented JWT-based authentication, and worked with database operations.",
      "Completed real-world projects, including an Excel Analytics Platform, focusing on data visualization, file uploads, and dashboard functionality.",
    ],
  },
];

// span = how many columns the card takes on desktop (1, 2 or 3)
// isLive = true  → the "Live demo" link works (put the real address in `live`)
// isLive = false → the project is not live, so "Live demo" is shown but can't be clicked
const projects = [
  // {
  //   title: "Portfolio Website",
  //   span: 1,
  //   desc: "A personal portfolio built with React.js and Tailwind CSS showcasing projects, skills, and experience. Features responsive design, reusable components, and a clean modern UI.",
  //   tech: ["React.js", "Tailwind CSS"],
  //   live: "#",
  //   isLive: false,
  //   code: "#",
  // },
  // {
  //   title: "Real Estate Marketplace",
  //   span: 2,
  //   desc: "A secure role-based platform for buyers, sellers, and admins with property search, advanced filtering, wishlist, buyer-seller chat, inquiry management, and Cloudinary-powered image uploads. Includes JWT authentication, OTP verification, and responsive dashboards for each role.",
  //   tech: ["React.js", "Tailwind CSS", "Node.js", "Express.js", "MongoDB"],
  //   live: "#",
  //   isLive: false,
  //   code: "#",
  // },
  // {
  //   title: "Training & Placement Office Portal",
  //   span: 2,
  //   desc: "A role-based portal for students, companies, and TPO admins to manage registrations, placement drives, and job notifications. Integrated 2FA via email OTP and JWT authentication for secure access. Features include drive scheduling, placement tracking, and real-time updates, built in Agile sprints to improve transparency and collaboration.",
  //   tech: ["React.js", "Node.js", "Express.js", "MongoDB"],
  //   live: "#",
  //   isLive: false,
  //   code: "#",
  // },
  // {
  //   title: "Excel Analytics Platform",
  //   span: 1,
  //   desc: "Data visualization app with Excel uploads, dynamic charts, and personalized dashboards using Chart.js and Three.js.",
  //   tech: ["React.js", "Node.js", "Express.js", "MongoDB", "SheetJS"],
  //   live: "#",
  //   isLive: false,
  //   code: "#",
  // },
  // {
  //   title: "Stone & Housing Solutions",
  //   span: 2,
  //   desc: "A responsive e-commerce platform for housing materials with dynamic product catalogs, secure checkout, and an admin panel for inventory and order management. Optimized UX across devices, reducing order processing time by 25% and manual effort by 40%. Applied responsive design principles and streamlined workflows for better customer engagement.",
  //   tech: ["PHP", "MySQL", "HTML", "CSS", "JavaScript"],
  //   live: "#",
  //   isLive: false,
  //   code: "#",
  // },
  // {
  //   title: "Library Management System",
  //   span: 1,
  //   desc: "Web-based system for book borrowing, returning, and tracking with audiobook access and reservation features.",
  //   tech: ["PHP", "MySQL", "HTML", "CSS", "JavaScript"],
  //   live: "#",
  //   isLive: false,
  //   code: "#",
  // },
  
    {
      title: "Portfolio Website",
      span: 1,
      desc: "A personal portfolio built with React.js and Tailwind CSS showcasing projects, skills, and experience. Features responsive design, reusable components, and a clean modern UI.",
      tech: ["React.js", "Tailwind CSS"],
      live: "#",
      isLive: false,
      code: "#",
    },
    {
      title: "Real Estate Marketplace",
      span: 2,
      desc: "A secure role-based platform for buyers, sellers, and admins with property search, advanced filtering, wishlist, buyer-seller chat, inquiry management, and Cloudinary-powered image uploads. Includes JWT authentication, OTP verification, and responsive dashboards for each role.",
      tech: ["React.js", "Tailwind CSS", "Node.js", "Express.js", "MongoDB"],
      live: "#",
      isLive: false,
      code: "https://github.com/samitsankhla/Real_Estate_Marketplace",
    },
    {
      title: "Training & Placement Office Portal",
      span: 2,
      desc: "A role-based portal for students, companies, and TPO admins to manage registrations, placement drives, and job notifications. Integrated 2FA via email OTP and JWT authentication for secure access. Features include drive scheduling, placement tracking, and real-time updates, built in Agile sprints to improve transparency and collaboration.",
      tech: ["React.js", "Node.js", "Express.js", "MongoDB"],
      live: "#",
      isLive: false,
      code: "https://github.com/samitsankhla/Training-And-Placement-Cell-web-application",
    },
    {
      title: "Excel Analytics Platform",
      span: 1,
      desc: "Data visualization app with Excel uploads, dynamic charts, and personalized dashboards using Chart.js and Three.js.",
      tech: ["React.js", "Node.js", "Express.js", "MongoDB", "SheetJS"],
      live: "#",
      isLive: false,
      code: "https://github.com/samitsankhla/Excel_Analytics",
    },
    {
      title: "Stone & Housing Solutions",
      span: 2,
      desc: "A responsive e-commerce platform for housing materials with dynamic product catalogs, secure checkout, and an admin panel for inventory and order management. Optimized UX across devices, reducing order processing time by 25% and manual effort by 40%. Applied responsive design principles and streamlined workflows for better customer engagement.",
      tech: ["PHP", "MySQL", "HTML", "CSS", "JavaScript"],
      live: "#",
      isLive: false,
      code: "https://github.com/samitsankhla/Stone-and-Housing-Solutions",
    },
    {
      title: "Library Management System",
      span: 1,
      desc: "Web-based system for book borrowing, returning, and tracking with audiobook access and reservation features.",
      tech: ["PHP", "MySQL", "HTML", "CSS", "JavaScript"],
      live: "#",
      isLive: false,
      code: "https://github.com/samitsankhla/Library-Management-System-",
    },
];
const SPAN = { 1: "md:col-span-1", 2: "md:col-span-2", 3: "md:col-span-3" };

const education = [
  {
    degree: "Master of Computer Applications (MCA)",
    school: "M.B.M University, Jodhpur",
    period: "2024 – 2026",
  },
  {
    degree: "Bachelor of Computer Applicatons (BCA)",
    school: "Lachoo Memorial College of Science and Technology, Jodhpur",
    period: "2021 – 2024",
  },
];

const certificates = [
  {
      title: "Programming in Java",
    issuer: "NPTEL",
    year: "2023",
    // link: "#"
    
  },
  {
    title:
      "Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate",
    issuer: "Oracle University",
    year: "2025",
    // link: "#",
  },
];

const NAV = [
  ["About", "about"],
  ["Experience", "experience"],
  ["Skills", "skills"],
  ["Projects", "projects"],
  ["Education", "education"],
  ["Certificates", "certificates"],
  ["Contact", "contact"],
];

/* ------------------------------------------------------------------ */
/*  2. Icons + helpers                                                */
/* ------------------------------------------------------------------ */
const Icon = ({ children, className = "w-5 h-5" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {children}
  </svg>
);
const PinIcon = (p) => (
  <Icon {...p}>
    <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </Icon>
);
const DownloadIcon = (p) => (
  <Icon {...p}>
    <path d="M12 4v11m0 0-4-4m4 4 4-4M5 20h14" />
  </Icon>
);
const ExternalIcon = (p) => (
  <Icon {...p}>
    <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
  </Icon>
);
const MailIcon = (p) => (
  <Icon {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </Icon>
);
const GithubIcon = (p) => (
  <Icon {...p}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </Icon>
);
const LinkedinIcon = (p) => (
  <Icon {...p}>
    <rect x="3" y="3" width="18" height="18" rx="3" />
    <path d="M8 11v5M8 8v.01M12 16v-5m0 2.5a2.5 2.5 0 0 1 5 0V16" />
  </Icon>
);
const MenuIcon = (p) => (
  <Icon {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Icon>
);
const CloseIcon = (p) => (
  <Icon {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Icon>
);
const ArrowUpIcon = (p) => (
  <Icon {...p}>
    <path d="M12 19V5m0 0-6 6m6-6 6 6" />
  </Icon>
);
const CopyIcon = (p) => (
  <Icon {...p}>
    <rect x="9" y="9" width="11" height="11" rx="2" />
    <path d="M5 15V6a2 2 0 0 1 2-2h9" />
  </Icon>
);
const CheckIcon = (p) => (
  <Icon {...p}>
    <path d="m5 12 5 5 9-10" />
  </Icon>
);

const scrollToId = (id) =>
  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const canTilt = () =>
  typeof window !== "undefined" &&
  !prefersReduced() &&
  window.matchMedia("(hover: hover)").matches;

/* ------------------------------------------------------------------ */
/*  3. Reusable animation pieces                                      */
/* ------------------------------------------------------------------ */

/* page-load entrance (used in the hero) */
function FadeIn({ delay = 0, className = "", children }) {
  return (
    <div
      className={className}
      style={{
        animation: `fadeUp .9s cubic-bezier(.2,.7,.2,1) ${delay}ms both`,
      }}
    >
      {children}
    </div>
  );
}

/* scroll reveal: slides in from up / left / right / zoom, un-blurs, and lets children react via group-[.is-in]/rev */
const HIDDEN = {
  up: "translate-y-8",
  left: "-translate-x-10",
  right: "translate-x-10",
  zoom: "scale-95",
};
function Reveal({ children, delay = 0, from = "up", className = "" }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (prefersReduced()) return setShown(true);
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`group/rev transition-all duration-700 ease-out ${
        shown
          ? "is-in translate-x-0 translate-y-0 scale-100 opacity-100 blur-0"
          : `${HIDDEN[from]} opacity-0 blur-sm`
      } ${className}`}
    >
      {children}
    </div>
  );
}

/* dark glass card: cursor-following glow + optional 3D tilt */
function Card({
  as: Tag = "div",
  className = "",
  inner = "",
  tilt = false,
  children,
  ...props
}) {
  const onMove = (e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
    if (tilt && canTilt()) {
      const px = x / r.width - 0.5;
      const py = y / r.height - 0.5;
      el.style.transform = `perspective(900px) rotateX(${(-py * 7).toFixed(2)}deg) rotateY(${(px * 7).toFixed(2)}deg) translateY(-4px)`;
    }
  };
  const onLeave = (e) => {
    if (tilt) e.currentTarget.style.transform = "";
  };
  return (
    <Tag
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      {...props}
      className={`group/card relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/70 shadow-lg shadow-black/40 backdrop-blur-md transition duration-300 will-change-transform hover:border-cyan-300/40 hover:shadow-cyan-400/10 ${className}`}
    >
      <div
        className="absolute inset-0 transition-opacity duration-300 opacity-0 pointer-events-none group-hover/card:opacity-100"
        style={{
          background:
            "radial-gradient(340px circle at var(--mx,50%) var(--my,50%), rgba(103,232,249,0.13), transparent 70%)",
        }}
      />
      <div className={`relative h-full ${inner}`}>{children}</div>
    </Tag>
  );
}

function useCountUp(target, duration = 1400) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        if (prefersReduced()) return setValue(target);
        const start = performance.now();
        const tick = (now) => {
          const t = Math.min((now - start) / duration, 1);
          setValue(Math.round(target * (1 - Math.pow(1 - t, 3))));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target, duration]);
  return [ref, value];
}

function Stat({ target, suffix = "+", label }) {
  const [ref, value] = useCountUp(target);
  return (
    <Card tilt inner="p-5">
      <div
        ref={ref}
        className="font-['Bricolage_Grotesque'] text-4xl font-bold tabular-nums text-white sm:text-5xl"
      >
        {value}
        {suffix}
      </div>
      <div className="mt-1 text-sm font-medium text-slate-300">{label}</div>
    </Card>
  );
}

function useTypewriter(text, speed = 70, startDelay = 700) {
  const [out, setOut] = useState(prefersReduced() ? text : "");
  useEffect(() => {
    if (prefersReduced()) return;
    let i = 0,
      timer;
    const type = () => {
      i += 1;
      setOut(text.slice(0, i));
      if (i < text.length) timer = setTimeout(type, speed);
    };
    timer = setTimeout(type, startDelay);
    return () => clearTimeout(timer);
  }, [text, speed, startDelay]);
  return out;
}

function Section({ id, index, title, children }) {
  return (
    <section id={id} className="px-5 py-20 scroll-mt-24 sm:px-8">
      <div className="max-w-5xl mx-auto">
        <Reveal from="left">
          <h2 className="mb-10 flex items-center gap-4 font-['Bricolage_Grotesque'] text-3xl font-bold text-white sm:text-4xl">
            <span className="rounded-md bg-cyan-300 px-2 py-0.5 font-mono text-sm font-semibold text-slate-950">
              0{index}
            </span>
            {title}
            <span className="h-px flex-1 origin-left scale-x-0 bg-gradient-to-r from-cyan-300/70 via-violet-300/40 to-transparent transition-transform delay-300 duration-1000 group-[.is-in]/rev:scale-x-100" />
          </h2>
        </Reveal>
        {children}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  4. Night sky: twinkling stars, falling stars, nebula, cursor glow */
/* ------------------------------------------------------------------ */
function Starfield() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current;
    const ctx = c.getContext("2d");
    const reduce = prefersReduced();
    let w = 0,
      h = 0,
      stars = [],
      meteors = [],
      raf = 0;
    let last = performance.now(),
      nextMeteor = 1200;

    const init = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      c.width = w * dpr;
      c.height = h * dpr;
      c.style.width = `${w}px`;
      c.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.min(Math.floor((w * h) / 6500), 280);
      stars = Array.from({ length: n }, () => {
        const d = Math.random();
        const roll = Math.random();
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          d,
          r: 0.4 + d * 1.1,
          a: 0.35 + Math.random() * 0.55,
          tw: 0.6 + Math.random() * 1.8,
          ph: Math.random() * 6.28,
          color:
            roll < 0.14
              ? "186,230,253"
              : roll < 0.24
                ? "221,214,254"
                : "255,255,255",
        };
      });
    };

    const spawn = () => {
      const fromTop = Math.random() < 0.7;
      const ang = ((145 + Math.random() * 20) * Math.PI) / 180; // heads down and to the left
      const sp = 7 + Math.random() * 7;
      meteors.push({
        x: fromTop ? Math.random() * w * 1.15 : w + 20,
        y: fromTop ? -20 : Math.random() * h * 0.4,
        vx: Math.cos(ang) * sp,
        vy: Math.sin(ang) * sp,
        sp,
        len: 90 + Math.random() * 140,
        life: 0,
        max: 80 + Math.random() * 50,
      });
    };

    const drawStars = (t) => {
      const sy = window.scrollY;
      for (const s of stars) {
        const y =
          (((s.y + t * 0.004 * (0.3 + s.d) - sy * s.d * 0.12) % h) + h) % h;
        const a =
          s.a * (reduce ? 1 : 0.55 + 0.45 * Math.sin(t * 0.001 * s.tw + s.ph));
        ctx.fillStyle = `rgba(${s.color},${a})`;
        ctx.beginPath();
        ctx.arc(s.x, y, s.r, 0, 6.2832);
        ctx.fill();
        if (s.r > 1.1) {
          ctx.fillStyle = `rgba(${s.color},${a * 0.14})`;
          ctx.beginPath();
          ctx.arc(s.x, y, s.r * 3.2, 0, 6.2832);
          ctx.fill();
        }
      }
    };

    const drawMeteors = (dt) => {
      for (const m of meteors) {
        m.x += m.vx * dt;
        m.y += m.vy * dt;
        m.life += dt;
        const fade = Math.min(1, m.life / 8) * Math.max(0, 1 - m.life / m.max);
        const tx = m.x - (m.vx / m.sp) * m.len;
        const ty = m.y - (m.vy / m.sp) * m.len;
        const g = ctx.createLinearGradient(m.x, m.y, tx, ty);
        g.addColorStop(0, `rgba(255,255,255,${fade})`);
        g.addColorStop(0.35, `rgba(125,211,252,${fade * 0.5})`);
        g.addColorStop(1, "rgba(125,211,252,0)");
        ctx.strokeStyle = g;
        ctx.lineWidth = 1.7;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(tx, ty);
        ctx.stroke();
        ctx.fillStyle = `rgba(255,255,255,${fade})`;
        ctx.beginPath();
        ctx.arc(m.x, m.y, 1.8, 0, 6.2832);
        ctx.fill();
      }
      meteors = meteors.filter(
        (m) => m.life < m.max && m.x > -250 && m.y < h + 250,
      );
    };

    const frame = (now) => {
      const dt = Math.min((now - last) / 16.67, 3);
      last = now;
      ctx.clearRect(0, 0, w, h);
      drawStars(now);
      nextMeteor -= dt * 16.67;
      if (nextMeteor <= 0 && meteors.length < 4) {
        spawn();
        nextMeteor = 1800 + Math.random() * 3200;
      }
      drawMeteors(dt);
      raf = requestAnimationFrame(frame);
    };

    const onResize = () => {
      init();
      if (reduce) {
        ctx.clearRect(0, 0, w, h);
        drawStars(0);
      }
    };

    init();
    if (reduce) drawStars(0);
    else raf = requestAnimationFrame(frame);
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);
  return <canvas ref={ref} className="absolute inset-0" />;
}

function Sky() {
  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-[radial-gradient(ellipse_at_top,#1a1f4d_0%,#0a0d24_42%,#03040b_100%)]"
      aria-hidden="true"
    >
      <div className="absolute -left-40 top-10 h-[32rem] w-[32rem] rounded-full bg-violet-600/20 blur-[130px] [animation:float_20s_ease-in-out_infinite]" />
      <div className="absolute -right-40 top-1/2 h-[30rem] w-[30rem] rounded-full bg-cyan-500/15 blur-[130px] [animation:float_24s_ease-in-out_infinite_reverse]" />
      <div className="absolute -bottom-40 left-1/4 h-[26rem] w-[26rem] rounded-full bg-fuchsia-600/10 blur-[130px] [animation:float_28s_ease-in-out_infinite]" />
      <Starfield />
    </div>
  );
}

/* soft light that follows the mouse (desktop only) */
function CursorGlow() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const move = (e) => {
      el.style.transform = `translate(${e.clientX - 220}px, ${e.clientY - 220}px)`;
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 -z-10 hidden h-[440px] w-[440px] rounded-full bg-[radial-gradient(circle,rgba(103,232,249,0.10),transparent_65%)] transition-transform duration-300 ease-out [@media(hover:hover)]:block"
    />
  );
}

function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const on = () => {
      const h = document.documentElement;
      setP(h.scrollTop / Math.max(h.scrollHeight - h.clientHeight, 1));
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-1">
      <div
        className="h-full origin-left bg-gradient-to-r from-cyan-300 via-violet-400 to-pink-400"
        style={{ transform: `scaleX(${p})` }}
      />
    </div>
  );
}

function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 700);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <button
      onClick={() => scrollToId("hero")}
      aria-label="Back to top"
      className={`fixed bottom-6 right-6 z-40 rounded-full border border-white/15 bg-slate-950/80 p-3 text-white shadow-lg shadow-black/40 backdrop-blur transition duration-300 hover:bg-cyan-300 hover:text-slate-950 ${show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"}`}
    >
      <ArrowUpIcon />
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  5. Navbar — floating dark pill with scroll-spy                    */
/* ------------------------------------------------------------------ */
function Navbar() {
  const [active, setActive] = useState("hero");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ["hero", ...NAV.map(([, id]) => id)].forEach((id) => {
      const el = document.getElementById(id);
      el && io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  const go = (id) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <header
      className="fixed inset-x-0 z-50 px-3 top-4 sm:px-6"
      style={{ animation: "fadeDown .8s cubic-bezier(.2,.7,.2,1) both" }}
    >
      <nav className="flex items-center justify-between max-w-5xl pl-5 pr-2 mx-auto border rounded-full shadow-lg h-14 border-white/10 bg-slate-950/70 shadow-black/40 backdrop-blur-xl">
        <button
          onClick={() => go("hero")}
          className="font-mono text-lg font-bold text-white rounded group focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
        >
          <span className="inline-block text-cyan-300 transition-transform group-hover:-translate-x-0.5">
            &lt;
          </span>
          Samit
          <span className="inline-block text-cyan-300 transition-transform group-hover:translate-x-0.5">
            /&gt;
          </span>
        </button>

        <ul className="items-center hidden gap-0.5 lg:flex">
          {NAV.map(([label, id]) => (
            <li key={id}>
              <button
                onClick={() => go(id)}
                className={`rounded-full px-3.5 py-2 text-sm font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 ${active === id ? "bg-cyan-300 text-slate-950" : "text-slate-200 hover:bg-white/10 hover:text-white"}`}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="rounded-full p-2.5 text-white hover:bg-white/10 lg:hidden"
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </nav>

      {open && (
        <ul
          className="max-w-5xl p-2 mx-auto mt-2 border shadow-lg rounded-3xl border-white/10 bg-slate-950/95 backdrop-blur-xl lg:hidden"
          style={{ animation: "fadeDown .3s ease-out both" }}
        >
          {NAV.map(([label, id]) => (
            <li key={id}>
              <button
                onClick={() => go(id)}
                className={`w-full rounded-2xl px-4 py-3 text-left font-medium ${active === id ? "bg-cyan-300 text-slate-950" : "text-slate-100"}`}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}

/* ------------------------------------------------------------------ */
/*  6. Hero                                                           */
/* ------------------------------------------------------------------ */
function CodeCard() {
  const featured = skills.filter((s) => s.featured).map((s) => s.name);
  const k = "font-semibold text-cyan-300";
  const s = "text-amber-200";
  return (
    <div className="relative hidden w-full max-w-sm lg:block [animation:floaty_7s_ease-in-out_infinite]">
      <div className="relative p-px overflow-hidden rounded-2xl">
        {/* slowly rotating light along the border */}
        <span className="absolute -inset-[100%] [animation:orbit_8s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_70%,#67e8f9_85%,#c4b5fd_95%,transparent_100%)]" />
        <Card className="relative border-transparent bg-[#080a1a]!" inner="p-0">
          <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/5 px-4 py-3">
            <span className="w-3 h-3 rounded-full bg-rose-400" />
            <span className="w-3 h-3 rounded-full bg-amber-300" />
            <span className="w-3 h-3 rounded-full bg-emerald-400" />
            <span className="ml-3 font-mono text-xs text-slate-300">
              samit.js
            </span>
          </div>
          <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-6 text-slate-100">
            {`const `}
            <span className={k}>samit</span>
            {` = {\n  `}
            <span className={k}>role</span>
            {`: `}
            <span className={s}>{`"${profile.role}"`}</span>
            {`,\n  `}
            <span className={k}>location</span>
            {`: `}
            <span className={s}>{`"${profile.location}"`}</span>
            {`,\n  `}
            <span className={k}>stack</span>
            {`: [\n`}
            {featured.map((f) => (
              <span key={f}>
                {"    "}
                <span className={s}>{`"${f}"`}</span>
                {",\n"}
              </span>
            ))}
            {`  ],\n  `}
            <span className={k}>openToWork</span>
            {`: `}
            <span className="text-pink-300">true</span>
            {`,\n};`}
          </pre>
        </Card>
      </div>
    </div>
  );
}

function Hero() {
  const typed = useTypewriter(profile.role);
  const featured = skills.filter((s) => s.featured);
  const glowText = "[text-shadow:0_2px_16px_rgba(3,4,11,0.9)]";

  return (
    <section
      id="hero"
      className="relative flex items-center min-h-screen px-5 pt-32 pb-16 sm:px-8"
    >
      {/* glowing moon */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[5%] top-28 hidden h-32 w-32 rounded-full opacity-90 shadow-[0_0_90px_20px_rgba(186,230,253,0.22)] md:block [animation:floaty_12s_ease-in-out_infinite] bg-[radial-gradient(circle_at_30%_30%,#f8fafc,#cbd5e1_45%,#64748b_100%)]"
      >
        <span className="absolute left-[55%] top-[22%] h-6 w-6 rounded-full bg-slate-500/30" />
        <span className="absolute left-[24%] top-[58%] h-9 w-9 rounded-full bg-slate-500/25" />
        <span className="absolute left-[62%] top-[64%] h-4 w-4 rounded-full bg-slate-500/30" />
      </div>

      <div className="relative mx-auto grid w-full max-w-5xl items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <FadeIn delay={100}>
            <p className="inline-flex items-center gap-2 px-3 py-1 mb-5 text-sm font-medium border rounded-full border-cyan-300/30 bg-cyan-300/10 text-cyan-50">
              <span className="relative flex w-2 h-2">
                <span className="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-cyan-300" />
                <span className="relative inline-flex w-2 h-2 rounded-full bg-cyan-300" />
              </span>
              Open to freelance, full-time and internships
            </p>
          </FadeIn>

          <FadeIn delay={250}>
            <p
              className={`text-xl font-medium text-slate-100 sm:text-2xl ${glowText}`}
            >
              Hi, I'm
            </p>
          </FadeIn>
          <FadeIn delay={400}>
            <h1
              className={`mt-2 font-['Bricolage_Grotesque'] text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-7xl ${glowText}`}
            >
              {profile.name}
            </h1>
          </FadeIn>
          <FadeIn delay={600}>
            <p className="mt-5 min-h-[3rem] font-['Bricolage_Grotesque'] text-2xl font-bold sm:text-3xl">
              <span className="bg-[linear-gradient(90deg,#67e8f9,#c4b5fd,#f9a8d4,#67e8f9)] bg-[length:200%_100%] bg-clip-text text-transparent [animation:shimmer_6s_linear_infinite]">
                {typed}
              </span>
              <span className="ml-1 inline-block h-7 w-[3px] animate-pulse bg-cyan-300 align-middle" />
            </p>
          </FadeIn>

          <FadeIn delay={780}>
            <p
              className={`max-w-xl mt-6 text-lg leading-8 text-slate-200 ${glowText}`}
            >
              I build fast, responsive web apps with React, Next.js and Node.js,
              from the interface to the API.
            </p>
          </FadeIn>

          <FadeIn delay={920}>
            <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/60 px-3 py-1.5 text-sm font-medium text-slate-100 backdrop-blur">
              <PinIcon className="w-4 h-4 text-cyan-300" />
              {profile.location}
            </p>
          </FadeIn>

          <FadeIn delay={1060}>
            <div className="flex flex-wrap gap-3 mt-8">
              <button
                onClick={() => scrollToId("projects")}
                className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-cyan-300 to-violet-300 px-6 py-3 font-semibold text-slate-950 transition hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white [animation:glow_3s_ease-in-out_infinite]"
              >
                <span className="relative z-10">View Projects</span>
                <span className="absolute inset-0 transition-transform duration-700 -translate-x-full bg-gradient-to-r from-transparent via-white/70 to-transparent group-hover:translate-x-full" />
              </button>
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-white transition border rounded-xl border-white/25 bg-white/5 backdrop-blur hover:-translate-y-0.5 hover:border-cyan-300/70 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
              >
                Resume <ExternalIcon className="w-4 h-4" />
              </a>
            </div>
          </FadeIn>

          <FadeIn delay={1200}>
            <ul className="flex flex-wrap gap-2 mt-8">
              {featured.map((s, i) => (
                <li
                  key={s.name}
                  style={{
                    animation: `floaty ${5 + (i % 4)}s ease-in-out ${i * 0.3}s infinite`,
                  }}
                  className="rounded-lg border border-white/10 bg-slate-950/60 px-3 py-1.5 font-mono text-sm font-medium text-slate-100 backdrop-blur transition hover:border-cyan-300/60 hover:text-white"
                >
                  {s.name}
                </li>
              ))}
            </ul>
          </FadeIn>

          <FadeIn delay={1350}>
            <div className="grid max-w-md grid-cols-3 gap-3 mt-12">
              <Stat target={projects.length} label="Projects" />
              <Stat target={experience.length} label="Experience" />
              <Stat target={skills.length} label="Skills" />
            </div>
          </FadeIn>
        </div>

        <div className="flex justify-center lg:justify-end">
          <CodeCard />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  7. About                                                          */
/* ------------------------------------------------------------------ */
function About() {
  return (
    <Section id="about" index={1} title="About me">
      <div className="grid gap-8 md:grid-cols-5">
        <Reveal from="left" className="md:col-span-3">
          <div className="space-y-5 rounded-2xl border border-white/10 bg-slate-950/55 p-6 text-[17px] leading-8 text-slate-200 backdrop-blur-sm">
            {profile.about.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Reveal>

        <Reveal from="right" delay={150} className="self-start md:col-span-2">
          <Card>
            <dl className="divide-y divide-white/10">
              {profile.details.map(([k, v]) => (
                <div
                  key={k}
                  className="flex items-baseline justify-between gap-4 px-5 py-4"
                >
                  <dt className="text-sm text-slate-300">{k}</dt>
                  <dd className="font-semibold text-right text-white">{v}</dd>
                </div>
              ))}
            </dl>
          </Card>
        </Reveal>
      </div>

      <Reveal className="mt-12">
        <a
          href={RESUME_URL}
          download="Samit_Sankhla_Resume.pdf"
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-300 to-violet-300 px-6 py-3 font-semibold text-slate-950 transition hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white [animation:glow_3s_ease-in-out_infinite]"
        >
          <DownloadIcon className="w-5 h-5" /> Download Resume
        </a>
      </Reveal>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/*  8. Experience                                                     */
/* ------------------------------------------------------------------ */
/* total months from the "3 mos" style durations, and "(Remote)" style work mode */
const parseMonths = (d) => {
  const m = String(d || "").match(/(\d+)\s*mo/i);
  return m ? Number(m[1]) : 0;
};
const splitLocation = (loc = "") => {
  const m = loc.match(/\(([^)]+)\)\s*$/);
  return { place: loc.replace(/\s*\([^)]*\)\s*$/, ""), mode: m ? m[1] : "" };
};

/* 0 → 1 as the timeline scrolls through the screen */
function useScrollFill(ref) {
  const [p, setP] = useState(0);
  useEffect(() => {
    const on = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      setP(
        Math.min(
          1,
          Math.max(0, (window.innerHeight * 0.65 - r.top) / r.height),
        ),
      );
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
    };
  }, [ref]);
  return p;
}

function Experience() {
  const listRef = useRef(null);
  const fill = useScrollFill(listRef);
  const months = experience.reduce((n, e) => n + parseMonths(e.duration), 0);

  return (
    <Section id="experience" index={2} title="Experience">
      <Reveal>
        <div className="flex flex-wrap gap-3 mb-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/60 px-4 py-1.5 text-sm font-medium text-slate-100 backdrop-blur">
            <FaBriefcase className="text-cyan-300" /> {experience.length} roles
          </span>
          {months > 0 && (
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/60 px-4 py-1.5 text-sm font-medium text-slate-100 backdrop-blur">
              <FaClock className="text-cyan-300" /> {months}+ months of hands-on
              experience
            </span>
          )}
        </div>
      </Reveal>

      <ol ref={listRef} className="relative ml-3">
        {/* timeline track + glowing fill that grows as you scroll */}
        <span
          aria-hidden="true"
          className="absolute top-0 bottom-0 left-0 w-0.5 rounded bg-white/10"
        />
        <span
          aria-hidden="true"
          className="absolute left-0 top-0 h-full w-0.5 origin-top rounded bg-gradient-to-b from-cyan-300 via-violet-400 to-pink-400 shadow-[0_0_12px_rgba(103,232,249,0.7)]"
          style={{ transform: `scaleY(${fill})` }}
        />

        {experience.map((e, i) => {
          const { place, mode } = splitLocation(e.location);
          return (
            <li
              key={e.role + e.period}
              className="relative pb-10 pl-8 last:pb-0"
            >
              <span className="absolute -left-[7px] top-8 flex h-4 w-4">
                <span className="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-cyan-300" />
                <span className="relative inline-flex w-4 h-4 border-2 rounded-full border-slate-950 bg-cyan-300" />
              </span>

              <Reveal from={i % 2 ? "right" : "left"} delay={i * 100}>
                <Card inner="p-6 sm:p-7">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-xl font-bold text-white sm:text-2xl">
                          {e.role}
                        </h3>
                        {i === 0 && (
                          <span className="rounded-full bg-cyan-300 px-2.5 py-0.5 text-xs font-semibold text-slate-950">
                            Latest
                          </span>
                        )}
                      </div>
                      <p className="flex items-center mt-1 font-medium text-cyan-100">
                        <FaBriefcase className="mr-2 text-cyan-300" />{" "}
                        {e.company}
                      </p>
                    </div>
                    <div className="flex flex-col items-start gap-1.5 sm:items-end">
                      <span className="rounded-md bg-white/10 px-2.5 py-1 font-mono text-sm text-slate-100">
                        {e.period}
                      </span>
                      <span className="flex items-center text-sm text-slate-300">
                        <FaClock className="mr-1.5 text-cyan-300" />{" "}
                        {e.duration}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 mt-3 text-sm text-slate-300">
                    <span className="flex items-center">
                      <FaMapMarkerAlt className="mr-1.5 text-cyan-300" />{" "}
                      {place}
                    </span>
                    {mode && (
                      <span className="rounded-full border border-white/15 bg-white/5 px-2 py-0.5 text-xs font-medium text-slate-100">
                        {mode}
                      </span>
                    )}
                  </div>

                  <div className="h-px my-5 bg-gradient-to-r from-white/20 to-transparent" />

                  <ul className="space-y-3">
                    {e.points.map((p, j) => (
                      <li
                        key={p}
                        style={{ transitionDelay: `${350 + j * 130}ms` }}
                        className="flex gap-3 leading-7 transition-all duration-500 translate-x-4 opacity-0 text-slate-200 group-[.is-in]/rev:translate-x-0 group-[.is-in]/rev:opacity-100"
                      >
                        <span className="mt-1.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-300/15 text-cyan-300">
                          <CheckIcon className="w-3 h-3" />
                        </span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </Reveal>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/*  9. Skills — two opposite marquees + grouped cards                 */
/* ------------------------------------------------------------------ */
function Skills() {
  const groups = [...new Set(skills.map((s) => s.group))];
  const row1 = [...skills, ...skills];
  const row2 = [...skills].reverse();
  const row2loop = [...row2, ...row2];
  const chip =
    "whitespace-nowrap rounded-full border border-white/15 bg-slate-950/70 px-4 py-2 font-mono text-sm font-medium text-slate-100 backdrop-blur";
  const mask =
    "[mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]";
  return (
    <Section id="skills" index={3} title="Skills">
      <Reveal>
        <div className={`mb-8 space-y-3 overflow-hidden group/marquee ${mask}`}>
          <ul className="flex gap-3 w-max [animation:marquee_45s_linear_infinite] group-hover/marquee:[animation-play-state:paused]">
            {row1.map((s, i) => (
              <li key={i} aria-hidden={i >= skills.length} className={chip}>
                {s.name}
              </li>
            ))}
          </ul>
          <ul
            aria-hidden="true"
            className="flex gap-3 w-max [animation:marquee_55s_linear_infinite_reverse] group-hover/marquee:[animation-play-state:paused]"
          >
            {row2loop.map((s, i) => (
              <li key={i} className={chip}>
                {s.name}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <div className="grid gap-5 sm:grid-cols-2">
        {groups.map((g, i) => (
          <Reveal key={g} delay={i * 80} from="zoom">
            <Card inner="p-6">
              <h3 className="flex items-center justify-between mb-4 font-bold text-white">
                {g}
                <span className="rounded-md bg-cyan-300 px-2 py-0.5 font-mono text-xs text-slate-950">
                  {skills.filter((s) => s.group === g).length}
                </span>
              </h3>
              <ul className="flex flex-wrap gap-2">
                {skills
                  .filter((s) => s.group === g)
                  .map((s) => (
                    <li
                      key={s.name}
                      className="cursor-default rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm font-medium text-slate-100 transition hover:-translate-y-0.5 hover:border-cyan-300/70 hover:bg-cyan-300/10 hover:text-white"
                    >
                      {s.name}
                    </li>
                  ))}
              </ul>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/*  10. Projects — bento grid with 3D tilt                            */
/* ------------------------------------------------------------------ */
/* A link only works if it has a real address. "#" or empty shows a clear "Soon" label instead of a dead click,
   and an address typed without https:// is fixed so it really opens the other site. */
const isRealUrl = (u) =>
  typeof u === "string" && u.trim() !== "" && u.trim() !== "#";
const fixUrl = (u) => {
  const t = u.trim();
  return /^(https?:\/\/|mailto:|tel:|\/)/i.test(t) ? t : `https://${t}`;
};
function ProjectLink({ href, enabled = true, badge = "Soon", children }) {
  if (!enabled || !isRealUrl(href)) {
    return (
      <span
        title={enabled ? "Link coming soon" : "This project is not live"}
        aria-disabled="true"
        className="inline-flex cursor-not-allowed items-center gap-1.5 text-slate-400"
      >
        {children}
        <span className="rounded-full border border-white/15 bg-white/5 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-slate-300">
          {badge}
        </span>
      </span>
    );
  }
  return (
    <a
      href={fixUrl(href)}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 underline-offset-4 hover:text-cyan-300 hover:underline"
    >
      {children}
    </a>
  );
}

function Projects() {
  return (
    <Section id="projects" index={4} title="Projects">
      <div className="grid gap-5 md:grid-cols-3">
        {projects.map((p, i) => (
          <Reveal
            key={p.title}
            delay={(i % 3) * 100}
            from="zoom"
            className={SPAN[p.span]}
          >
            <Card tilt className="h-full" inner="flex flex-col p-6">
              <div className="flex items-start justify-between">
                <h3 className="text-xl font-bold text-white">{p.title}</h3>
                <span className="font-mono text-xs text-cyan-300">
                  0{i + 1}
                </span>
              </div>
              <p className="flex-1 mt-2 leading-7 text-slate-200">{p.desc}</p>
              <ul className="flex flex-wrap gap-2 mt-4">
                {p.tech.map((t) => (
                  <li
                    key={t}
                    className="px-2 py-1 font-mono text-xs font-medium border rounded-md border-cyan-300/20 bg-cyan-300/10 text-cyan-50"
                  >
                    {t}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-5 mt-5 text-sm font-semibold text-white">
                <ProjectLink
                  href={p.live}
                  enabled={p.isLive === true}
                  badge="Not live"
                >
                  Live demo <ExternalIcon className="w-4 h-4" />
                </ProjectLink>
                <ProjectLink href={p.code}>
                  <GithubIcon className="w-4 h-4" /> Source
                </ProjectLink>
              </div>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/*  11. Education, Certificates, Contact                              */
/* ------------------------------------------------------------------ */
function Education() {
  return (
    <Section id="education" index={5} title="Education">
      <div className="space-y-4">
        {education.map((e, i) => (
          <Reveal
            key={e.degree}
            delay={i * 100}
            from={i % 2 ? "right" : "left"}
          >
            <Card inner="flex flex-wrap items-baseline justify-between gap-2 p-6">
              <div>
                <h3 className="text-lg font-bold text-white">{e.degree}</h3>
                <p className="text-slate-300">{e.school}</p>
              </div>
              <span className="rounded-md bg-white/10 px-2 py-0.5 font-mono text-sm text-slate-100">
                {e.period}
              </span>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function Certificates() {
  return (
    <Section id="certificates" index={6} title="Certificates">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {certificates.map((c, i) => (
          <Reveal key={c.title} delay={i * 100} from="zoom">
            <Card
              tilt
              as={c.link ? "a" : "div"}
              {...(c.link
                ? { href: c.link, target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="block h-full"
              inner="p-6"
            >
              <h3 className="font-bold text-white">{c.title}</h3>
              <p className="mt-1 text-sm text-slate-300">
                {c.issuer} · {c.year}
              </p>
              {c.link && (
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-300 underline decoration-2 underline-offset-4">
                  View certificate <ExternalIcon className="w-4 h-4" />
                </span>
              )}
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

const PhoneIcon = (p) => (
  <Icon {...p}>
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
  </Icon>
);
const SendIcon = (p) => (
  <Icon {...p}>
    <path d="M21 3 10 14M21 3l-7 18-4-7-7-4 18-7Z" />
  </Icon>
);
const ChevronIcon = (p) => (
  <Icon {...p}>
    <path d="m6 9 6 6 6-6" />
  </Icon>
);

/* HOW TO RECEIVE MESSAGES IN YOUR INBOX (free, no server needed):
   1. Go to https://web3forms.com and enter your email (samitsankhla@gmail.com) to get an "Access Key".
   2. Paste that key between the quotes below. Messages will then arrive directly in your email. */
const WEB3FORMS_KEY = "25de1c8c-b829-4988-8d42-7892873e7e9e";
const RESET_SECONDS = 6; // how long the "Message sent" timer runs before the form comes back
const REASONS = [
  "Project Build",
  "Freelance Work",
  "Full-time Role",
  "Internship",
  "Just saying hi",
];

const inputCls =
  "w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white placeholder:text-slate-400 outline-none transition focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/30";

function InfoRow({ icon, label, value, href }) {
  const body = (
    <>
      <span className="flex items-center justify-center w-11 h-11 shrink-0 rounded-xl bg-cyan-300/10 text-cyan-300">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block font-mono text-[11px] uppercase tracking-widest text-slate-400">
          {label}
        </span>
        <span className="block font-medium text-white break-words">
          {value}
        </span>
      </span>
    </>
  );
  const inner = "flex items-center gap-4 p-4";
  return href ? (
    <Card as="a" href={href} className="block" inner={inner}>
      {body}
    </Card>
  ) : (
    <Card inner={inner}>{body}</Card>
  );
}

function Field({ label, htmlFor, children }) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="block mb-2 text-sm font-semibold text-white"
      >
        {label}
      </label>
      {children}
    </div>
  );
}

/* shown after a message is sent: a countdown ring, then the form comes back */
function SentPanel({ name, left, total }) {
  const C = 2 * Math.PI * 42;
  const first = name.trim().split(" ")[0];
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-[26rem] flex-col items-center justify-center text-center [animation:fadeUp_.6s_cubic-bezier(.2,.7,.2,1)_both]"
    >
      <div className="relative w-28 h-28">
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="6"
          />
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke="#67e8f9"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={C}
            strokeDashoffset={C * (1 - Math.max(left, 0) / total)}
            style={{ transition: "stroke-dashoffset 1s linear" }}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center font-['Bricolage_Grotesque'] text-4xl font-bold tabular-nums text-white">
          {Math.max(left, 0)}
        </span>
      </div>
      <h3 className="mt-6 text-2xl font-bold text-white">Message sent!</h3>
      <p className="max-w-xs mt-2 text-slate-300">
        Thanks{first ? `, ${first}` : ""}. I received your message and will get
        back to you soon.
      </p>
      <p className="mt-4 text-sm text-slate-400">
        Back to the form in {Math.max(left, 0)}s…
      </p>
    </div>
  );
}

function Contact() {
  const EMPTY = { name: "", email: "", reason: REASONS[0], message: "" };
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error | setup
  const [left, setLeft] = useState(RESET_SECONDS);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  /* after a successful send: count down, then show the form again, empty */
  useEffect(() => {
    if (status !== "sent") return;
    const id = setInterval(() => setLeft((n) => n - 1), 1000);
    return () => clearInterval(id);
  }, [status]);
  useEffect(() => {
    if (status === "sent" && left <= 0) {
      setForm(EMPTY);
      setStatus("idle");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [left, status]);

  const waDigits = String(profile.whatsapp || profile.phone || "").replace(
    /\D/g,
    "",
  );
  const socials = [
    { label: "GitHub", href: profile.github, Ico: GithubIcon },
    { label: "LinkedIn", href: profile.linkedin, Ico: LinkedinIcon },
    profile.instagram && {
      label: "Instagram",
      href: profile.instagram,
      Ico: FaInstagram,
    },
  ].filter(Boolean);

  /* sends the message straight to your inbox through Web3Forms, without opening any email app */
  const submit = async (e) => {
    e.preventDefault();
    if (status === "sending") return;
    if (!WEB3FORMS_KEY) {
      setStatus("setup");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `${form.reason} – new message from ${form.name}`,
          from_name: "Portfolio Contact Form",
          name: form.name,
          email: form.email,
          reason: form.reason,
          message: form.message,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "failed");
      setLeft(RESET_SECONDS);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="px-5 py-20 scroll-mt-24 sm:px-8">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <p className="font-mono text-sm tracking-widest uppercase text-cyan-300">
            07 · Contact
          </p>
          <h2 className="mt-3 font-['Bricolage_Grotesque'] text-4xl font-extrabold text-white sm:text-5xl">
            Let's build{" "}
            <span className="bg-[linear-gradient(90deg,#67e8f9,#c4b5fd,#f9a8d4,#67e8f9)] bg-[length:200%_100%] bg-clip-text text-transparent [animation:shimmer_6s_linear_infinite]">
              something
            </span>
          </h2>
          <p className="max-w-xl mt-4 text-[17px] leading-8 text-slate-200">
            I'm available for freelance projects, full-time roles and
            internships. Message me anywhere and I'll get back to you as soon as
            I can.
          </p>
        </Reveal>

        <div className="grid gap-6 mt-10 lg:grid-cols-[1fr_1.15fr]">
          {/* left: quick ways to reach me */}
          <Reveal from="left">
            <div className="space-y-3">
              {waDigits && (
                <Card
                  as="a"
                  href={`https://wa.me/${waDigits}?text=${encodeURIComponent("Hi Samit, I saw your portfolio and would like to talk.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block border-emerald-400/30! bg-emerald-500/10!"
                  inner="flex items-center gap-4 p-4"
                >
                  <span className="flex items-center justify-center w-12 h-12 text-white shrink-0 rounded-xl bg-emerald-500">
                    <FaWhatsapp className="text-2xl" />
                  </span>
                  <span>
                    <span className="block font-semibold text-white">
                      Chat on WhatsApp
                    </span>
                    <span className="block text-sm text-slate-300">
                      The fastest way to reach me
                    </span>
                  </span>
                </Card>
              )}

              <InfoRow
                icon={<MailIcon />}
                label="Email"
                value={profile.email}
                href={`mailto:${profile.email}`}
              />
              {profile.phone && (
                <InfoRow
                  icon={<PhoneIcon />}
                  label="Phone"
                  value={profile.phone}
                  href={`tel:${profile.phone.replace(/[^\d+]/g, "")}`}
                />
              )}
              <InfoRow
                icon={<PinIcon />}
                label="Location"
                value={profile.location}
              />

              <div className="flex flex-wrap items-center gap-3 pt-2">
                {socials.map(({ label, href, Ico }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex items-center justify-center text-slate-100 transition border rounded-full h-11 w-11 border-white/15 bg-slate-950/60 backdrop-blur hover:-translate-y-0.5 hover:border-cyan-300 hover:text-cyan-300"
                  >
                    <Ico className="w-5 h-5" />
                  </a>
                ))}
                <a
                  href={RESUME_URL}
                  download="Samit_Sankhla_Resume.pdf"
                  className="inline-flex items-center gap-2 px-5 font-medium text-white transition border rounded-full h-11 border-white/15 bg-slate-950/60 backdrop-blur hover:-translate-y-0.5 hover:border-cyan-300 hover:text-cyan-300"
                >
                  <DownloadIcon className="w-4 h-4" /> Resume
                </a>
              </div>
            </div>
          </Reveal>

          {/* right: message form */}
          <Reveal from="right" delay={120}>
            <Card inner="p-6 sm:p-8">
              {status === "sent" ? (
                <SentPanel name={form.name} left={left} total={RESET_SECONDS} />
              ) : (
                <>
                  <h3 className="text-xl font-bold text-white">
                    Send me a message
                  </h3>
                  <p className="mt-1 text-sm text-slate-300">
                    Fill in the form and your message comes straight to me.
                  </p>

                  <form onSubmit={submit} className="mt-6 space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field label="Name" htmlFor="c-name">
                        <input
                          id="c-name"
                          name="name"
                          type="text"
                          required
                          autoComplete="name"
                          value={form.name}
                          onChange={set("name")}
                          placeholder="Your full name"
                          className={inputCls}
                        />
                      </Field>
                      <Field label="Email" htmlFor="c-email">
                        <input
                          id="c-email"
                          name="email"
                          type="email"
                          required
                          autoComplete="email"
                          value={form.email}
                          onChange={set("email")}
                          placeholder="you@example.com"
                          className={inputCls}
                        />
                      </Field>
                    </div>

                    <Field label="Reason" htmlFor="c-reason">
                      <div className="relative">
                        <select
                          id="c-reason"
                          name="reason"
                          value={form.reason}
                          onChange={set("reason")}
                          className={`${inputCls} appearance-none pr-10 [&>option]:bg-slate-900`}
                        >
                          {REASONS.map((r) => (
                            <option key={r} value={r}>
                              {r}
                            </option>
                          ))}
                        </select>
                        <ChevronIcon className="absolute w-5 h-5 -translate-y-1/2 pointer-events-none right-4 top-1/2 text-slate-300" />
                      </div>
                    </Field>

                    <Field label="Message" htmlFor="c-message">
                      <textarea
                        id="c-message"
                        name="message"
                        required
                        rows={5}
                        value={form.message}
                        onChange={set("message")}
                        placeholder="Tell me about your project or opportunity..."
                        className={`${inputCls} resize-none`}
                      />
                    </Field>

                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-300 to-violet-300 px-6 py-3.5 font-semibold text-slate-950 transition hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white disabled:cursor-wait disabled:opacity-60 [animation:glow_3s_ease-in-out_infinite]"
                    >
                      <SendIcon
                        className={`w-5 h-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-1 ${status === "sending" ? "animate-pulse" : ""}`}
                      />
                      {status === "sending" ? "Sending…" : "Send message"}
                    </button>

                    <p aria-live="polite" className="min-h-[1.5rem] text-sm">
                      {status === "error" && (
                        <span className="text-rose-300">
                          Sorry, your message could not be sent. Please try
                          again in a moment.
                        </span>
                      )}
                      {status === "setup" && (
                        <span className="text-amber-200">
                          The message service is not connected yet. For now,
                          please email me at{" "}
                          <a
                            href={`mailto:${profile.email}`}
                            className="underline underline-offset-4"
                          >
                            {profile.email}
                          </a>
                          .
                        </span>
                      )}
                    </p>
                  </form>
                </>
              )}
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  12. App                                                           */
/* ------------------------------------------------------------------ */
export default function App() {
  return (
    <div className="relative isolate min-h-screen bg-[#03040b] font-['Inter',system-ui,sans-serif] text-slate-100 antialiased selection:bg-cyan-300/40">
      {/* keyframes for all the animations; motion is switched off for users who prefer reduced motion */}
      <style>{`
        html { scroll-behavior: smooth; color-scheme: dark; background: #03040b; }
        @keyframes float { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(40px,-30px) scale(1.08); } }
        @keyframes floaty { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        @keyframes marquee { to { transform: translateX(-50%); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(26px); } to { opacity: 1; transform: none; } }
        @keyframes fadeDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: none; } }
        @keyframes shimmer { to { background-position: 200% center; } }
        @keyframes orbit { to { transform: rotate(360deg); } }
        @keyframes glow { 0%,100% { box-shadow: 0 0 22px -6px rgba(103,232,249,.55); } 50% { box-shadow: 0 0 38px -2px rgba(196,181,253,.7); } }
        @media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation: none !important; transition: none !important; scroll-behavior: auto !important; } }
      `}</style>
      <Sky />
      <CursorGlow />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Education />
        <Certificates />
        <Contact />
      </main>
      <footer className="px-5 py-8 text-sm font-medium text-center border-t border-white/10 text-slate-300">
        © {new Date().getFullYear()} {profile.name}. All rights reserved.
      </footer>
      <BackToTop />
    </div>
  );
}

