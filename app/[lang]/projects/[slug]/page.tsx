import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getDictionary, hasLocale } from '../../dictionaries'

const tagColors: Record<string, string> = {
  Automotive: 'bg-blue-50 text-[#2563eb]',
  'Smart Home': 'bg-emerald-50 text-emerald-700',
  'Voice AI': 'bg-violet-50 text-violet-700',
  'Home Appliances': 'bg-orange-50 text-orange-700',
  'Digital Product': 'bg-pink-50 text-pink-700',
  'Consumer & Lifestyle': 'bg-orange-50 text-orange-700',
}

export default async function ProjectDetail({
  params,
}: PageProps<'/[lang]/projects/[slug]'>) {
  const { lang, slug } = await params

  if (!hasLocale(lang)) notFound()

  const d = await getDictionary(lang)
  const project = d.projects.find((p) => p.slug === slug)
  if (!project) notFound()

  const { detail } = project

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-3xl mx-auto px-6 py-16 space-y-24">

        {/* Hero */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${tagColors[project.tag]}`}>
              {project.tag}
            </span>
            <span className="text-xs font-medium text-gray-400">{project.year}</span>
          </div>
          <h1 className="text-4xl font-bold text-[#1f2937] leading-tight mb-4">
            {project.title}
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed max-w-2xl whitespace-pre-line">
            {('hero' in detail ? detail.hero : null) ?? project.description}
          </p>
        </section>

        {/* Overview */}
        <section id="overview">
          <SectionLabel id="overview">Overview</SectionLabel>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
            <div className="sm:col-span-2">
              <OverviewCard label="Background" value={detail.overview.background} />
            </div>
            <div className="sm:col-span-2">
              <OverviewCard label="Purpose" value={detail.overview.goal} />
            </div>
            <OverviewCard label="My Role" value={detail.overview.role} />
            <OverviewCard label="Duration" value={detail.overview.duration} />
          </div>
        </section>

        {/* Research */}
        <section id="research">
          <SectionLabel id="research">Research</SectionLabel>
          <p className="mt-6 text-gray-500 leading-relaxed whitespace-pre-line">{detail.research.intro}</p>

          <div className="mt-10 space-y-6">
            {detail.research.methods.map((method) => (
              <div
                key={method.name}
                className="flex gap-6 p-6 rounded-2xl border border-gray-100"
              >
                <div className="shrink-0 w-1 rounded-full bg-[#2563eb]" />
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="font-semibold text-[#1f2937]">{method.name}</h3>
                    <span className="shrink-0 text-xs font-medium text-[#2563eb] bg-blue-50 px-2.5 py-1 rounded-full">
                      {method.count}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed whitespace-pre-line">
                    {method.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {'photos' in detail.research && detail.research.photos && (
            <div className="mt-10">
              <p className="text-xs font-medium text-gray-300 uppercase tracking-widest mb-4">
                Field Photos
              </p>
              <div className="grid grid-cols-2 gap-3">
                {(detail.research.photos as { src: string; caption: string }[]).map((photo) => (
                  <img
                    key={photo.src}
                    src={photo.src}
                    alt={photo.caption}
                    className="w-full aspect-[4/3] rounded-xl object-cover"
                  />
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-2">
                {(detail.research.photos as { src: string; caption: string }[])[0]?.caption}
              </p>
            </div>
          )}
        </section>

        {/* Findings */}
        <section id="findings">
          <SectionLabel id="findings">{('findingsTitle' in detail && detail.findingsTitle) ? detail.findingsTitle : 'Key Findings'}</SectionLabel>
          <div className="mt-8 space-y-5">
            {detail.findings.map((finding) => (
              <div
                key={finding.number}
                className="flex gap-5 p-6 rounded-2xl bg-gray-50"
              >
                <span className="shrink-0 text-2xl font-bold text-gray-200">
                  {finding.number}
                </span>
                <div>
                  <h3 className="font-semibold text-[#1f2937] mb-2 whitespace-pre-line">
                    {finding.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed whitespace-pre-line">
                    {finding.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Outcome */}
        <section id="outcome">
          <SectionLabel id="outcome">Outcome</SectionLabel>
          <p className="mt-6 text-gray-500 leading-relaxed whitespace-pre-line">{detail.outcome.summary}</p>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {detail.outcome.items.map((item) => (
              <div
                key={item.label}
                className="p-5 rounded-2xl border border-gray-100 text-center"
              >
                <p className="text-xl font-bold text-[#1f2937] mb-1 whitespace-pre-line">{item.value}</p>
                <p className="text-xs text-gray-400">{item.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer nav */}
        <div className="pt-8 border-t border-gray-100 print:hidden">
          <Link
            href={`/${lang}#projects`}
            className="text-sm font-medium text-[#2563eb] hover:underline"
          >
            {d.nav.all_projects}
          </Link>
        </div>
      </main>
    </div>
  )
}

function SectionLabel({ children, id }: { children: React.ReactNode; id: string }) {
  return (
    <div className="flex items-center gap-4">
      <a
        href={`#${id}`}
        className="text-xs font-semibold text-[#2563eb] uppercase tracking-widest hover:opacity-70 transition-opacity"
      >
        {children}
      </a>
      <div className="flex-1 h-px bg-gray-100" />
    </div>
  )
}

function OverviewCard({ label, value }: { label: string; value: string | string[] }) {
  return (
    <div className="p-5 rounded-2xl bg-gray-50">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
        {label}
      </p>
      {Array.isArray(value) ? (
        <ul className="list-disc list-outside ml-4 space-y-1.5 marker:text-gray-400">
          {value.map((line, i) => (
            <li key={i} className="text-sm text-[#1f2937] leading-relaxed pl-0.5">{line}</li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-[#1f2937] leading-relaxed whitespace-pre-line">{value}</p>
      )}
    </div>
  )
}
