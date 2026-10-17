import React from 'react'

const certificates = [
  {
    title:
      "Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate",
    issuer: "Oracle University",
    year: "2025",
    // link: "#",
  },
];

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

export default Certificates
