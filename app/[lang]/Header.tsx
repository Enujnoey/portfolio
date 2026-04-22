'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import LangToggle from './LangToggle'
import type { Locale } from './dictionaries'

type Props = {
  lang: Locale
  nav: { projects: string; about: string; contact: string; all_projects: string }
}

export default function Header({ lang, nav }: Props) {
  const pathname = usePathname()
  const isHome = pathname === `/${lang}`
  const isProject = pathname.startsWith(`/${lang}/projects/`)

  return (
    <header className="sticky top-0 z-10 bg-white border-b border-gray-100 print:hidden">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* 좌측: 프로젝트 상세면 All Projects 링크, 나머지는 YK 로고 */}
        {isProject ? (
          <Link
            href={`/${lang}#projects`}
            className="text-sm text-gray-400 hover:text-[#1f2937] transition-colors"
          >
            {nav.all_projects}
          </Link>
        ) : (
          <Link href={`/${lang}`} className="font-semibold tracking-tight text-[#1f2937]">
            YK
          </Link>
        )}

        {/* 우측: 홈이면 nav 링크 + 토글, 서브페이지면 토글만 */}
        <nav className="flex items-center gap-6">
          {!isProject && (
            <div className="flex gap-6 text-sm text-gray-500">
              <Link href={`/${lang}#projects`} className="hover:text-[#1f2937] transition-colors">
                {nav.projects}
              </Link>
              <Link href={`/${lang}/about`} className="hover:text-[#1f2937] transition-colors">
                {nav.about}
              </Link>
              <Link href={`/${lang}#contact`} className="hover:text-[#1f2937] transition-colors">
                {nav.contact}
              </Link>
            </div>
          )}
          <LangToggle lang={lang} />
        </nav>

      </div>
    </header>
  )
}
