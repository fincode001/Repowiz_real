﻿// 새로운 데이터 구조: 템플릿 객체 배열
const reportWizTemplates = [
  {
    "template_id": "report-feasibility_analysis",
    "doc_purpose": "보고서",
    "doc_subtype": "사업타당성 분석",
    "target_audience": "경영진, 투자자",
    "writing_goal": "신규 사업의 성공 가능성을 객관적으로 평가하고 설득력 있게 전달",
    "visual_theme": "전문적, 신뢰성",
    "color_palette": ["#003366", "#4a90e2", "#f5a623", "#7ed321", "#cccccc"],
    "layout_structure": "표준 보고서 구조 (요약-본론-결론)",
    "insight_focus": ["시장성", "기술성", "재무성", "위험 요인"],
    "visual_suggestion": ["시장 규모 그래프", "SWOT 분석", "재무 예측 차트"],
    "tone_style": "객관적, 논리적, 설득적",
    "supportedOutputFormats": ["PPT", "Markdown", "HTML", "TXT", "PDF"],
    "template_source": "Internal", // 프롬프트 출처 (기본값)
    "last_updated": "2024-07-28", // 최종 수정일 (기본값)
    "sample_image_url": ""
  },
  {
    "template_id": "report-weekly_monthly",
    "doc_purpose": "보고서",
    "doc_subtype": "주간/월간 보고",
    "target_audience": "팀장, 부서장",
    "writing_goal": "주요 업무 진행 상황, 성과, 이슈 사항을 간결하게 보고",
    "visual_theme": "간결, 명확",
    "color_palette": ["#4a4a4a", "#9b9b9b", "#007aff", "#50e3c2", "#f8f8f8"],
    "layout_structure": "요약 - 상세 항목 (리스트 형식)",
    "insight_focus": ["핵심 성과(KPI)", "진행률", "이슈 및 해결 방안", "차주 계획"],
    "visual_suggestion": ["진행률 바", "핵심 지표 테이블"],
    "tone_style": "간결, 명료, 사실 기반",
    "supportedOutputFormats": ["PPT"], // 기존 데이터 유지 (없으면 기본값 사용됨)
    "template_source": "Internal",
    "last_updated": "2024-07-28",
    "sample_image_url": ""
  },
  {
    "template_id": "report-result",
    "doc_purpose": "보고서",
    "doc_subtype": "결과 보고서",
    "target_audience": "프로젝트 책임자, 관련 부서",
    // "output_format": ["Word", "PDF"], // supportedOutputFormats 사용
    "visual_theme": "상세, 체계적",
    "color_palette": ["#d0021b", "#417505", "#f8e71c", "#bd10e0", "#777777"],
    "layout_structure": "서론 - 과정 - 결과 - 평가 및 제언",
    "insight_focus": ["목표 달성도", "데이터 분석 결과", "성공/실패 요인", "개선점"],
    "visual_suggestion": ["결과 비교표", "데이터 시각화 자료"],
    "tone_style": "상세, 분석적, 객관적",
    "supportedOutputFormats": ["PPT"],
    "template_source": "Internal",
    "last_updated": "2024-07-28",
    "sample_image_url": ""
  },
  {
    "template_id": "report-market_research",
    "doc_purpose": "보고서",
    "doc_subtype": "시장 조사 보고서",
    "target_audience": "마케팅팀, 전략기획팀",
    "writing_goal": "특정 시장의 동향, 경쟁 환경, 소비자 분석 결과를 제공",
    // "output_format": ["PPT", "Word"],
    "visual_theme": "데이터 중심, 시각적",
    "color_palette": ["#4a90e2", "#7ed321", "#f5a623", "#bd10e0", "#4a4a4a"],
    "layout_structure": "요약 - 시장 개요 - 경쟁 분석 - 소비자 분석 - 결론",
    "insight_focus": ["시장 규모/성장률", "경쟁사 전략", "소비자 트렌드", "기회/위협 요인"],
    "visual_suggestion": ["시장 점유율 파이 차트", "경쟁사 포지셔닝 맵", "설문 결과 그래프"],
    "tone_style": "정보 전달 중심, 분석적, 통찰력 제시",
    "supportedOutputFormats": ["PPT"],
    "template_source": "Internal",
    "last_updated": "2024-07-28",
    "sample_image_url": ""
  },
  {
    "template_id": "proposal-solution_product",
    "doc_purpose": "제안서",
    "doc_subtype": "솔루션/제품 제안서",
    "target_audience": "잠재 고객사 (구매팀, 실무자, 의사결정권자)",
    "writing_goal": "고객 문제 해결 위한 솔루션/제품 도입 설득 및 계약 유도",
    "visual_theme": "Innovative Blue & Orange",
    "color_palette": ["#007bff", "#fd7e14", "#FFFFFF", "#F8F9FA", "#495057"],
    "layout_structure": "고객 문제 해결: 고객 문제 정의(공감대 형성) -> 제안 솔루션 소개 및 차별점 -> 핵심 기능 및 특장점(Benefit 중심) -> 기대 효과(ROI, 정량/정성) -> 도입 프로세스 및 지원 방안 -> 가격 정책/옵션 -> 회사 소개/성공 사례",
    "insight_focus": ["고객 문제 해결 능력 강조", "솔루션의 차별화된 가치 제안", "구체적인 기대 효과(ROI) 제시", "신뢰성 있는 회사/제품 역량 증명"],
    "visual_suggestion": ["솔루션 아키텍처/워크플로우 다이어그램", "기대 효과 비교 그래프 (Before/After)", "고객 성공 사례 로고/인용구", "가격 테이블/옵션 비교표", "데모 영상 링크/QR코드"],
    "tone_style": "설득적, 고객 중심, 자신감, 전문성, 가치 제안",
    "supportedOutputFormats": ["PPT", "PDF", "Word"],
    "template_source": "Internal",
    "last_updated": "2024-07-28",
    "sample_image_url": ""
  },
  {
    "template_id": "proposal-collaboration_partnership",
    "doc_purpose": "제안서",
    "doc_subtype": "협업/파트너십 제안서",
    "target_audience": "잠재 파트너사 (담당자, 의사결정권자)",
    "writing_goal": "상호 이익 기반의 전략적 협력 관계 구축 제안",
    "visual_theme": "Creative Purple & Gray",
    "color_palette": ["#6f42c1", "#6c757d", "#FFFFFF", "#F8F9FA", "#e9ecef"],
    "layout_structure": "상호 윈-윈 강조: 제안 배경 및 비전 공유 -> 협력 목표 및 구체적 범위 -> 각 사의 핵심 역량 및 역할 분담 -> 기대되는 시너지 효과(시장 확장, 기술 융합 등) -> 협력 실행 로드맵 -> 상호 이익 모델 -> 향후 추진 계획",
    "insight_focus": ["협력을 통한 시너지 효과 극대화 방안", "상호 이익의 명확하고 공정한 제시", "실행 가능한 협력 모델 및 로드맵", "파트너사의 강점 존중 및 활용 방안"],
    "visual_suggestion": ["협력 구조도/모델 시각화", "시너지 효과 예측 그래프/모델", "양사 강점/역할 비교표", "공동 목표 타임라인"],
    "tone_style": "협력적, 신뢰감 형성, 상호 존중, 비전 제시",
    "supportedOutputFormats": ["PDF", "Word", "PPT"],
    "template_source": "Internal",
    "last_updated": "2024-07-28",
    "sample_image_url": ""
  },
  {
    "template_id": "proposal-marketing_ad_agency",
    "doc_purpose": "제안서",
    "doc_subtype": "마케팅/광고 대행 제안서",
    "target_audience": "광고주 (마케팅 책임자, 실무자)",
    "writing_goal": "클라이언트의 마케팅 목표 달성을 위한 최적의 대행 전략 및 실행 방안 제안",
    "visual_theme": "Energetic Orange & Teal",
    "color_palette": ["#fd7e14", "#20c997", "#FFFFFF", "#343a40", "#F8F9FA"],
    "layout_structure": "결과 중심 마케팅: 클라이언트 비즈니스 및 목표 이해 -> 시장/경쟁/소비자 분석 요약 -> 타겟 오디언스 정의 및 인사이트 -> 핵심 전략 및 크리에이티브 컨셉 -> 통합 채널 전략 및 실행 전술 -> 예상 성과(KPI) 및 측정 방안 -> 캠페인 예산 및 일정 -> 우리 팀의 강점/포트폴리오",
    "insight_focus": ["클라이언트 비즈니스 및 목표에 대한 깊은 이해", "데이터 기반의 차별화된 마케팅 전략", "측정 가능한 성과(KPI) 예측 및 관리 방안", "대행사의 전문성 및 성공 경험 어필"],
    "visual_suggestion": ["타겟 오디언스 페르소나 시각화", "채널 믹스 전략 도식화", "크리에이티브 시안 예시", "예상 KPI 대시보드 목업", "성공 사례 요약"],
    "tone_style": "창의적, 결과 지향적, 설득력, 데이터 기반, 전문성",
    "supportedOutputFormats": ["PPT"],
    "template_source": "Internal",
    "last_updated": "2024-07-28",
    "sample_image_url": ""
  },
  {
    "template_id": "proposal-government_rfp",
    "doc_purpose": "제안서",
    "doc_subtype": "정부 과제/RFP 제안서",
    "target_audience": "정부 기관, 공공기관 평가위원",
    "writing_goal": "정부 과제 수주 또는 RFP 요구사항에 대한 최적의 솔루션 및 수행 능력 증명",
    "visual_theme": "Reliable Gray & Blue",
    "color_palette": ["#6c757d", "#007bff", "#FFFFFF", "#343a40", "#e9ecef"],
    "layout_structure": "RFP 요구사항 충족: 제안 개요(배경, 목표, 범위) -> RFP 요구사항 분석 및 이해도 -> 제안 내용(기술/솔루션 상세, 방법론) -> 사업 수행 능력(인력 구성, 유사 실적, 보유 기술) -> 사업 관리 방안(일정, 품질, 리스크, 보안) -> 기대 효과(정량/정성) -> 별첨(증빙 서류)",
    "insight_focus": ["RFP 요구사항 충족도 및 이해도", "제안 기술/솔루션의 우수성, 차별성, 실현 가능성", "사업 수행 능력 및 재무 안정성 증명", "체계적인 사업 관리 능력"],
    "visual_suggestion": ["요구사항 대비 제안 내용 매핑표 (Compliance Matrix)", "기술 아키텍처 다이어그램", "사업 수행 조직도 및 참여 인력 프로필 요약", "상세 추진 일정표(WBS 기반)", "품질/리스크 관리 매트릭스"],
    "tone_style": "논리적, 체계적, 신뢰성 강조, 공문서 형식 준수, 객관성",
    "supportedOutputFormats": ["PDF", "HWP", "Word"],
    "template_source": "Internal",
    "last_updated": "2024-07-28",
    "sample_image_url": ""
  },
  {
    "template_id": "proposal-investment_ir_deck",
    "doc_purpose": "제안서",
    "doc_subtype": "투자 유치 제안서 (IR Deck)",
    "target_audience": "벤처캐피탈(VC), 엔젤 투자자, 액셀러레이터",
    "writing_goal": "투자 유치를 위한 사업의 매력도, 성장 잠재력, 팀 역량 등을 효과적으로 어필",
    "visual_theme": "Visionary Dark Blue & Accent",
    "color_palette": ["#001f3f", "#FFFFFF", "#7FDBFF", "#FFDC00", "#DDDDDD"],
    "layout_structure": "투자 설득 스토리: 문제 정의(시장의 Pain Point) -> 우리의 해결책(솔루션/제품) -> 시장 기회(규모, 성장성) -> 제품 상세/데모 -> 비즈니스 모델(수익 창출 방식) -> 경쟁 우위/차별점 -> 현재 성과/지표(Traction) -> 핵심 팀 소개 -> 재무 계획/예측 -> 투자 유치 조건 및 자금 사용 계획 -> Exit 전략(선택)",
    "insight_focus": ["해결하려는 문제의 중요성 및 시장 규모", "팀의 전문성 및 실행력", "매력적인 비즈니스 모델 및 수익성", "지속 가능한 경쟁 우위", "명확한 성장 전략 및 재무 계획", "투자금 사용 계획의 타당성"],
    "visual_suggestion": ["시장 규모(TAM/SAM/SOM) 시각화 그래프", "제품/서비스 데모 스크린샷 또는 짧은 영상", "Traction 성장 데이터 그래프(사용자, 매출 등)", "핵심 재무 지표 예측 차트(매출, 이익, BEP)", "팀 멤버 사진 및 핵심 역량 요약", "경쟁 환경 분석표"],
    "tone_style": "비전 제시, 설득력, 자신감, 간결함, 데이터 기반, 스토리텔링",
    "supportedOutputFormats": ["PPT", "PDF"],
    "template_source": "Internal",
    "last_updated": "2024-07-28",
    "sample_image_url": ""
  },
  {
    "template_id": "plan-new_business",
    "doc_purpose": "기획서",
    "doc_subtype": "신규 사업 기획서",
    "target_audience": "투자자, 경영진",
    "writing_goal": "사업 아이템의 매력도와 성공 가능성을 어필하여 투자 또는 승인 확보",
    "visual_theme": "혁신적, 비전 제시",
    "color_palette": ["#7ed321", "#4a90e2", "#f8e71c", "#003366", "#50e3c2"],
    "layout_structure": "문제 정의 - 해결 방안(제품/서비스) - 시장 분석 - 사업 모델 - 팀 소개 - 재무 계획",
    "insight_focus": ["시장 기회", "차별화된 가치 제안", "수익 모델", "성장 전략"],
    "visual_suggestion": ["서비스 플로우 다이어그램", "시장 예측 그래프", "경쟁 우위 매트릭스"],
    "tone_style": "설득적, 열정적, 논리적 근거 제시",
    "supportedOutputFormats": ["PPT"],
    "template_source": "Internal",
    "last_updated": "2024-07-28",
    "sample_image_url": ""
  },
  {
    "template_id": "plan-service_improvement",
    "doc_purpose": "기획서",
    "doc_subtype": "서비스 개선 기획서",
    "target_audience": "내부 의사결정권자, 개발팀",
    "writing_goal": "기존 서비스의 문제점을 분석하고 개선 방안을 제안하여 실행 승인 획득",
    "visual_theme": "문제 해결 중심, 구체적",
    "color_palette": ["#f5a623", "#d0021b", "#417505", "#4a4a4a", "#9b9b9b"],
    "layout_structure": "현황 및 문제점 - 개선 목표 - 개선 방안 상세 - 기대 효과 - 실행 계획",
    "insight_focus": ["사용자 피드백", "데이터 기반 문제 진단", "개선 방안의 타당성", "측정 가능한 기대 효과"],
    "visual_suggestion": ["문제점 분석 차트", "개선 후 화면 프로토타입", "기대 효과 예측 데이터"],
    "tone_style": "분석적, 논리적, 구체적 실행 방안 제시",
    "supportedOutputFormats": ["PPT"],
    "template_source": "Internal",
    "last_updated": "2024-07-28",
    "sample_image_url": ""
  },
  {
    "template_id": "plan-marketing_strategy",
    "doc_purpose": "기획서",
    "doc_subtype": "마케팅 전략 기획서",
    "target_audience": "마케팅팀, 영업팀, 경영진",
    "writing_goal": "특정 제품/서비스의 성공적인 시장 출시 및 성장을 위한 마케팅 전략 수립",
    "visual_theme": "전략적, 목표 지향적",
    "color_palette": ["#bd10e0", "#4a90e2", "#7ed321", "#f5a623", "#003366"],
    "layout_structure": "상황 분석(3C/SWOT) - 목표 설정(KPI) - 타겟 고객 - 핵심 메시지 - 마케팅 믹스(4P/7P) - 예산 및 일정",
    "insight_focus": ["시장 트렌드 및 경쟁 환경", "타겟 고객 특성", "차별화된 마케팅 메시지", "채널별 효율성", "ROI"],
    "visual_suggestion": ["시장 분석 매트릭스", "고객 퍼소나", "캠페인 타임라인", "예산 분배 차트"],
    "tone_style": "전략적, 설득력, 데이터 기반",
    "supportedOutputFormats": ["PPT"],
    "template_source": "Internal",
    "last_updated": "2024-07-28",
    "sample_image_url": ""
  },
  {
    "template_id": "presentation-company_introduction",
    "doc_purpose": "발표자료",
    "doc_subtype": "회사 소개 자료",
    "target_audience": "잠재 고객, 투자자, 신규 입사자",
    "writing_goal": "회사의 비전, 주요 사업, 강점을 효과적으로 전달하여 긍정적 이미지 구축",
    "visual_theme": "신뢰성, 전문성, 비전 제시",
    "color_palette": ["#003366", "#4a90e2", "#ffffff", "#f5f5f5", "#4a4a4a"],
    "layout_structure": "표지 - 회사 개요 - 비전/미션 - 주요 서비스/제품 - 핵심 역량 - 주요 성과/연혁 - 파트너/고객사 - 문의처",
    "insight_focus": ["회사의 차별화된 가치", "주요 성과 지표", "미래 성장 가능성"],
    "visual_suggestion": ["회사 연혁 인포그래픽", "핵심 서비스 소개 이미지/아이콘", "주요 지표 그래프"],
    "tone_style": "전문적, 신뢰감, 간결 명료",
    "supportedOutputFormats": ["PPT"],
    "template_source": "Internal",
    "last_updated": "2024-07-28",
    "sample_image_url": ""
  },
  {
    "template_id": "presentation-project_proposal",
    "doc_purpose": "발표자료",
    "doc_subtype": "프로젝트 제안 발표",
    "target_audience": "내부 의사결정권자, 고객사",
    "writing_goal": "제안하는 프로젝트의 필요성, 목표, 계획을 설득력 있게 전달하여 승인 또는 수주 확보",
    "visual_theme": "논리적 흐름, 설득력 강조",
    "color_palette": ["#417505", "#7ed321", "#f5a623", "#003366", "#4a4a4a"],
    "layout_structure": "배경 및 문제 제기 - 제안 목표 및 범위 - 핵심 내용(솔루션/방법론) - 기대 효과 - 실행 계획 및 일정 - Q&A",
    "insight_focus": ["문제 해결 능력", "제안의 타당성 및 실현 가능성", "측정 가능한 기대 효과", "일정 및 리소스 관리 능력"],
    "visual_suggestion": ["문제점/기대효과 비교 시각화", "프로세스 플로우 차트", "간트 차트"],
    "tone_style": "논리적, 설득적, 자신감",
    "supportedOutputFormats": ["PPT"],
    "template_source": "Internal",
    "last_updated": "2024-07-28",
    "sample_image_url": ""
  },
  {
    "template_id": "presentation-conference_seminar",
    "doc_purpose": "발표자료",
    "doc_subtype": "컨퍼런스/세미나 발표",
    "target_audience": "관련 분야 전문가, 일반 청중",
    "writing_goal": "특정 주제에 대한 지식, 연구 결과, 인사이트를 효과적으로 공유하고 청중의 이해와 관심 유도",
    "visual_theme": "주제 특성 반영, 시각적 흥미 유발",
    "color_palette": ["#4a90e2", "#bd10e0", "#f8e71c", "#50e3c2", "#333333"],
    "layout_structure": "인트로(흥미 유발) - 주제 소개 - 핵심 내용(섹션별 구성) - 사례/데이터 - 결론/제언 - Q&A",
    "insight_focus": ["핵심 메시지", "새로운 관점 또는 정보", "청중의 공감대 형성", "연구/분석 결과의 신뢰성"],
    "visual_suggestion": ["주제 관련 고품질 이미지/동영상", "핵심 키워드 강조", "데이터 시각화(이해 용이성)"],
    "tone_style": "전달력, 흥미 유발, 명확성",
    "supportedOutputFormats": ["PPT"],
    "template_source": "Internal",
    "last_updated": "2024-07-28",
    "sample_image_url": ""
  },
  {
    "template_id": "other-meeting_minutes",
    "doc_purpose": "기타 문서",
    "doc_subtype": "회의록",
    "target_audience": "회의 참석자, 관련 부서",
    "writing_goal": "회의 논의 내용, 결정 사항, 실행 항목을 정확하게 기록하고 공유",
    "visual_theme": "간결, 구조적",
    "color_palette": ["#4a4a4a", "#9b9b9b", "#f0f0f0", "#ffffff"],
    "layout_structure": "회의 정보(일시, 장소, 참석자) - 논의 안건 - 주요 내용 요약 - 결정 사항 - 실행 항목(Action Item) - 다음 회의 일정",
    "insight_focus": ["핵심 논의 결과", "명확한 결정 사항", "담당자/기한이 명시된 실행 항목"],
    "visual_suggestion": ["테이블 형식 활용(실행 항목 등)"],
    "tone_style": "객관적, 명료, 요점 중심",
    "supportedOutputFormats": ["PPT"],
    "template_source": "Internal",
    "last_updated": "2024-07-28",
    "sample_image_url": ""
  },
  {
    "template_id": "other-press_release",
    "doc_purpose": "기타 문서",
    "doc_subtype": "보도자료",
    "target_audience": "기자, 언론 매체",
    "writing_goal": "회사의 뉴스 가치가 있는 소식(신제품 출시, 주요 성과 등)을 언론에 효과적으로 전달하여 기사화 유도",
    "visual_theme": "언론 친화적, 정보 중심",
    "color_palette": ["#000000", "#333333", "#666666", "#ffffff"],
    "layout_structure": "헤드라인 - 리드 문장(핵심 요약) - 본문(상세 내용, 인용) - 회사 소개(About Us) - 연락처 정보",
    "insight_focus": ["뉴스 가치(시기성, 중요성, 흥미성)", "핵심 메시지 명확성", "인용 가능한 코멘트", "사실 기반 정보"],
    "visual_suggestion": ["고해상도 회사 로고", "관련 이미지(제공 시)"],
    "tone_style": "객관적, 정보 전달, 간결",
    "supportedOutputFormats": ["PPT"],
    "template_source": "Internal",
    "last_updated": "2024-07-28",
    "sample_image_url": ""
  },
  {
    "template_id": "notice-event_info",
    "doc_purpose": "안내문/공지문",
    "doc_subtype": "행사/이벤트 안내문",
    "target_audience": "참가 신청자, 잠재 참가자, 회원",
    "writing_goal": "행사 정보 상세 안내 및 기대감 조성, 원활한 참여 유도",
    "visual_theme": "Friendly & Informative Green/Blue",
    "color_palette": ["#5cb85c", "#007bff", "#FFFFFF", "#343a40", "#F8F9FA"],
    "layout_structure": "제목(행사명) -> 일시 및 장소 -> 주요 내용/프로그램 -> 참가 대상 및 방법 -> 문의처 -> 기타 참고사항(주차, 준비물 등)",
    "insight_focus": ["행사의 매력적인 포인트 강조", "참여 방법 및 필수 정보의 명확한 전달", "문의 사항에 대한 사전 답변"],
    "visual_suggestion": ["행사 포스터/핵심 이미지", "지도/약도", "타임테이블/프로그램 순서도", "참가 신청 버튼/링크"],
    "tone_style": "친절함, 정보 제공, 명확성, 독려적",
    "supportedOutputFormats": ["Email", "HTML", "PDF", "Image"],
    "template_source": "Internal",
    "last_updated": "2024-07-28",
    "sample_image_url": ""
  }
  // ... (기존 데이터에 더 많은 항목이 있다면 여기에 계속 추가)
]; // 배열 정의를 여기서 올바르게 닫음

// --- 사용자 요청 로그 데이터 구조 (예시, 실제 저장은 별도 구현) ---
const userRequestsLog = [
  {
    "request_id": "req-dummy-123",
    "user_id": "guest-user",
    "timestamp": "2024-07-28T12:00:00Z",
    "selected_template_id": "report-feasibility_analysis",
    "filters": {
      "doc_purpose": "보고서",
      "doc_subtype": "사업타당성 분석",
      "target_audience": "경영진, 투자자",
      "output_format": "PPT",
      "page_spec": "16:9"
    },
    "input_files": ["example_file.txt"],
    "status": "completed",
    "generated_file_url": null // 실제 파일 URL은 없음
  }
];