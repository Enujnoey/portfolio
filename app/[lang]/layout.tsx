import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { locales, hasLocale, getDictionary } from './dictionaries'
import Header from './Header'

const inter = Inter({ subsets: ['latin'] })

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  const isKo = lang === 'ko'
  return {
    title: isKo ? '김연준 — UX 리서처' : 'Yeonjune Kim — UX Researcher',
    description: isKo
      ? '김연준 UX 리서치 포트폴리오. 자동차, 디지털 프로덕트 분야 전문.'
      : 'UX Research Portfolio by Yeonjune Kim. Automotive & Digital Product.',
  }
}

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export default async function LangLayout({
  children,
  params,
}: LayoutProps<'/[lang]'>) {
  const { lang } = await params
  const validLang = hasLocale(lang) ? lang : 'ko'
  const d = await getDictionary(validLang)

  return (
    <html lang={validLang} className={`${inter.className} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-[#1f2937]">
        <Header lang={validLang} nav={d.nav} />
        {children}
      </body>
    </html>
  )
}
