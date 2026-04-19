import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getDictionary, hasLocale } from './dictionaries'
import ProjectsSection from './ProjectsSection'

export default async function Home({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params

  if (!hasLocale(lang)) notFound()

  const d = await getDictionary(lang)

  return (
    <>
      <main className="flex-1">
        {/* Hero */}
        <section className="max-w-5xl mx-auto px-6 pt-24 pb-20">
          <div className="flex flex-col-reverse md:flex-row md:items-center md:justify-between gap-12">
            {/* Text */}
            <div className="flex-1">
              <p className="text-sm font-medium text-[#2563eb] tracking-widest uppercase mb-4">
                {d.hero.label}
              </p>
              <h1 className="text-5xl font-bold tracking-tight text-[#1f2937] leading-tight mb-6">
                {d.hero.name}
                <br />
                <span className="text-gray-400 font-light">{d.hero.name_sub}</span>
              </h1>
              <p className="text-xl text-gray-500 max-w-lg leading-relaxed">
                {d.hero.tagline}
              </p>
              <p className="mt-5 text-base text-gray-400 max-w-lg leading-relaxed">
                {d.hero.summary}
              </p>
              <div className="mt-10 flex gap-4">
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#2563eb] text-white text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  {d.hero.cta_projects}
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-gray-200 text-sm font-medium text-[#1f2937] hover:bg-gray-50 transition-colors"
                >
                  {d.hero.cta_contact}
                </a>
              </div>
            </div>

            {/* Photo */}
            <div className="shrink-0 mx-auto md:mx-0">
              <div className="relative w-56 md:w-64 aspect-[3/4] rounded-2xl overflow-hidden">
                <Image
                  src="/profile2.jpg"
                  alt="Yeonjune Kim"
                  fill
                  className="object-cover object-center"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        <div className="border-t border-gray-100" />

        <ProjectsSection
          projects={d.projects}
          lang={lang}
          sectionTitle={d.projects_section.title}
          sectionSubtitle={d.projects_section.subtitle}
          viewMore={d.projects_section.view_more}
        />
      </main>

      {/* Footer */}
      <footer id="contact" className="border-t border-gray-100 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6 py-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="font-semibold text-[#1f2937] mb-1">Yeonjune Kim · 김연준</p>
            <p className="text-sm text-gray-400">{d.footer.role}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 text-sm">
            <a
              href="mailto:enujnoey@gmail.com"
              className="text-gray-500 hover:text-[#2563eb] transition-colors"
            >
              enujnoey@gmail.com
            </a>
            <a
              href="https://linkedin.com/in/yeonjune-kim"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-[#2563eb] transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://read.cv/yeonjune"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-[#2563eb] transition-colors"
            >
              Read.cv
            </a>
          </div>
        </div>
        <div className="border-t border-gray-100">
          <p className="max-w-5xl mx-auto px-6 py-4 text-xs text-gray-300">
            {d.footer.copyright}
          </p>
        </div>
      </footer>
    </>
  )
}
