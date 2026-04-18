import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getDictionary, hasLocale } from '../dictionaries'

export default async function About({ params }: PageProps<'/[lang]/about'>) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()

  const d = await getDictionary(lang)
  const a = d.about

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-3xl mx-auto px-6 py-16 space-y-20">

        {/* Bio */}
        <section className="flex flex-col sm:flex-row gap-10 items-start">
          <div className="shrink-0">
            <div className="relative w-28 h-28 rounded-full overflow-hidden">
              <Image
                src="/profile2.jpg"
                alt="Yeonjune Kim"
                fill
                className="object-cover object-top"
                sizes="112px"
                priority
              />
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-[#2563eb] uppercase tracking-widest mb-3">
              {d.hero.label}
            </p>
            <h1 className="text-2xl font-bold text-[#1f2937] mb-1">{d.hero.name}</h1>
            <p className="text-base text-gray-400 mb-5">{d.hero.name_sub}</p>
            <p className="text-base text-gray-500 leading-relaxed">{a.bio}</p>
          </div>
        </section>

        {/* Experience */}
        <section>
          <SectionLabel>Experience</SectionLabel>
          <div className="mt-8 space-y-10">
            {a.experience.map((exp) => (
              <div key={exp.org} className="flex gap-6">
                {/* 타임라인 점 */}
                <div className="flex flex-col items-center pt-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#2563eb] shrink-0" />
                  <div className="w-px flex-1 bg-gray-100 mt-2" />
                </div>
                <div className="flex-1 pb-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-3">
                    <div>
                      <p className="font-semibold text-[#1f2937]">{exp.role}</p>
                      <p className="text-sm text-gray-400">{exp.org} · {exp.location}</p>
                    </div>
                    <span className="text-xs font-medium text-gray-400 shrink-0">{exp.period}</span>
                  </div>
                  <ul className="space-y-1.5">
                    {exp.bullets.map((b, i) => (
                      <li key={i} className="text-sm text-gray-500 leading-relaxed flex gap-2">
                        <span className="text-gray-300 mt-0.5">—</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section>
          <SectionLabel>Education</SectionLabel>
          <div className="mt-8 space-y-5">
            {a.education.map((edu) => (
              <div key={edu.school} className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
                <div>
                  <p className="font-semibold text-[#1f2937]">{edu.degree}</p>
                  <p className="text-sm text-gray-400">{edu.school} · {edu.location}</p>
                  {edu.note && (
                    <p className="text-xs text-gray-400 mt-1 italic">{edu.note}</p>
                  )}
                </div>
                <span className="text-xs font-medium text-gray-400 shrink-0">{edu.period}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Research Methods */}
        <section>
          <SectionLabel>{a.methods.title}</SectionLabel>
          <div className="mt-8 flex flex-wrap gap-2">
            {a.methods.items.map((m) => (
              <span
                key={m}
                className="px-3.5 py-1.5 rounded-full border border-gray-200 text-sm text-gray-600"
              >
                {m}
              </span>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section>
          <SectionLabel>{a.skills.title}</SectionLabel>
          <div className="mt-8 flex flex-wrap gap-2">
            {a.skills.items.map((s) => (
              <span
                key={s}
                className="px-3.5 py-1.5 rounded-full bg-gray-50 text-sm text-gray-600"
              >
                {s}
              </span>
            ))}
          </div>
        </section>

        {/* Footer nav */}
        <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
          <Link href={`/${lang}`} className="text-sm font-medium text-[#2563eb] hover:underline">
            ← {d.nav.projects}
          </Link>
          <a
            href="https://www.linkedin.com/in/yeonjune-kim-611167212/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-400 hover:text-[#2563eb] transition-colors"
          >
            LinkedIn →
          </a>
        </div>
      </main>
    </div>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4">
      <span className="text-xs font-semibold text-[#2563eb] uppercase tracking-widest whitespace-nowrap">
        {children}
      </span>
      <div className="flex-1 h-px bg-gray-100" />
    </div>
  )
}
