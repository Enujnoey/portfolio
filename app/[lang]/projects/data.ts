// 프로젝트 우선순위 및 썸네일 관리 파일
// 숫자가 낮을수록 상단에 노출됩니다 (1 = 최우선)
// 언어와 무관하게 적용됩니다

export const projectMeta: Record<string, { priority: number; thumbnail?: string }> = {
  'pbv-digital-ux':           { priority: 1,  thumbnail: '/projects/pbv-digital-ux/thumb.png' },
  'us-concept':               { priority: 2,  thumbnail: '/projects/us-concept/thumb.png' },
  'europe-spec-value':        { priority: 3,  thumbnail: '/projects/europe-spec-value/thumb.png' },
  'd-seg-ethno':              { priority: 4,  thumbnail: '/projects/d-seg-ethno/thumb.png' },
  'smarthings-next-ux':       { priority: 5,  thumbnail: '/projects/smarthings-next-ux/thumb.png' },
  'wow-midnight-positioning': { priority: 6,  thumbnail: '/projects/wow-midnight-positioning/thumb.png' },
  'apartment-interior-trend': { priority: 7,  thumbnail: '/projects/apartment-interior-trend/thumb.png' },
  'bixby-va-heuristic':       { priority: 8 },
  'mi-insights-forum':        { priority: 9 },
  'commercial-truck':         { priority: 10 },
  'c-suv-positioning':        { priority: 11 },
  'brazil-c-suv':             { priority: 12 },
  'henkel-anti-mosquito':     { priority: 13 },
}
