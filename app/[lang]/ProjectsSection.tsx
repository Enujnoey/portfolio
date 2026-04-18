'use client'

import { useState } from 'react'
import Link from 'next/link'
import { projectMeta } from './projects/data'

type Project = {
  slug: string
  title: string
  client: string
  description: string
  tag: string
}

type Props = {
  projects: Project[]
  lang: string
  sectionTitle: string
  sectionSubtitle: string
  viewMore: string
}

// 카드 태그 배지 색상 (연한 버전)
const tagColors: Record<string, string> = {
  Automotive:              'bg-blue-50 text-[#2563eb]',
  'Digital Product':       'bg-violet-50 text-violet-700',
  'Consumer & Lifestyle':  'bg-orange-50 text-orange-700',
}

// 필터 버튼 활성 색상 (진한 버전)
const tagActiveColors: Record<string, string> = {
  All:                     'bg-[#1f2937] text-white',
  Automotive:              'bg-[#2563eb] text-white',
  'Digital Product':       'bg-violet-600 text-white',
  'Consumer & Lifestyle':  'bg-orange-500 text-white',
}

// 필터 버튼 노출 순서 (앞에 있을수록 왼쪽에 표시)
const tagOrder = ['All', 'Automotive', 'Digital Product', 'Consumer & Lifestyle']

export default function ProjectsSection({ projects, lang, sectionTitle, sectionSubtitle, viewMore }: Props) {
  const [activeTag, setActiveTag] = useState('All')

  // 존재하는 태그만 추출 후 지정 순서로 정렬
  const existingTags = new Set(projects.map((p) => p.tag))
  const tags = tagOrder.filter((t) => t === 'All' || existingTags.has(t))

  // 필터 + 우선순위 정렬
  const filtered = projects
    .filter((p) => activeTag === 'All' || p.tag === activeTag)
    .sort((a, b) => {
      const pa = projectMeta[a.slug]?.priority ?? 99
      const pb = projectMeta[b.slug]?.priority ?? 99
      return pa - pb
    })

  return (
    <section id="projects" className="max-w-5xl mx-auto px-6 py-20">
      {/* 섹션 헤더 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
        {/* 타이틀 + 서브타이틀 */}
        <div>
          <h2 className="text-2xl font-bold text-[#1f2937] whitespace-nowrap">{sectionTitle}</h2>
          <p className="text-base text-gray-400 mt-1">{sectionSubtitle}</p>
        </div>

        {/* 필터 버튼 */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeTag === tag
                  ? (tagActiveColors[tag] ?? 'bg-[#1f2937] text-white')
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* 카드 그리드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {filtered.map((project) => (
          <Link
            key={project.slug}
            href={`/${lang}/projects/${project.slug}`}
            className="group flex flex-col rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md hover:border-gray-200 transition-all duration-200"
          >
            {/* 썸네일 placeholder */}
            <div className="w-full aspect-[4/3] bg-gray-100" />

            <div className="flex flex-col flex-1 p-5 gap-3">
              <div className="flex items-center gap-2">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${tagColors[project.tag] ?? 'bg-gray-100 text-gray-500'}`}>
                  {project.tag}
                </span>
                <span className="text-xs font-medium text-gray-400">{project.year}</span>
              </div>
              <h3 className="font-semibold text-[#1f2937] leading-snug">
                {project.title}
              </h3>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                {project.client}
              </p>
              <p className="text-sm text-gray-500 leading-relaxed flex-1 whitespace-pre-line">
                {project.description}
              </p>
              <span className="text-sm font-medium text-[#2563eb] group-hover:underline mt-1">
                {viewMore}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
