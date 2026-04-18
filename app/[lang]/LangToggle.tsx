'use client'

import { usePathname, useRouter } from 'next/navigation'
import type { Locale } from './dictionaries'

export default function LangToggle({ lang }: { lang: Locale }) {
  const pathname = usePathname()
  const router = useRouter()

  function switchLang(next: Locale) {
    const newPath = pathname.replace(/^\/(ko|en)/, `/${next}`)
    const hash = window.location.hash
    router.push(newPath + hash, { scroll: false })
  }

  return (
    <div className="flex items-center gap-1 text-sm border border-gray-200 rounded-full px-1 py-0.5">
      <button
        onClick={() => switchLang('ko')}
        className={`px-2.5 py-1 rounded-full transition-colors ${
          lang === 'ko'
            ? 'bg-[#1f2937] text-white'
            : 'text-gray-400 hover:text-[#1f2937]'
        }`}
      >
        Ko
      </button>
      <button
        onClick={() => switchLang('en')}
        className={`px-2.5 py-1 rounded-full transition-colors ${
          lang === 'en'
            ? 'bg-[#1f2937] text-white'
            : 'text-gray-400 hover:text-[#1f2937]'
        }`}
      >
        En
      </button>
    </div>
  )
}
