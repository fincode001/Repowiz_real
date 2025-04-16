const reportWizData = {
    "보고서": {
        examples: [
            {
                doc_subtype: "데이터 중심 보고서 (팀 내부용)",
                target_audience: "팀원, 팀 리더",
                writing_goal: "신속한 데이터 공유 및 공유된 사실 기반의 논의 촉진",
                output_format: ["Word", "PDF", "Google Docs", "Excel"],
                visual_theme: "Cool Gray & Blue",
                color_palette: ["#D4D8DC", "#495057", "#FFFFFF", "#007bff", "#6c757d"],
                layout_structure: "데이터 테이블 중심: 요약 -> 핵심 지표 테이블 -> 상세 데이터 분석 (섹션별) -> 발견점 및 논의사항",
                insight_focus: ["핵심 지표 변화 추이", "데이터 패턴 분석", "데이터 기반 현황 공유", "개선점 도출"],
                visual_suggestion: ["핵심 지표 변화 시각화 (선/막대 그래프)", "데이터 테이블 (필터/정렬 가능 제안)", "핵심 요약 박스"],
                tone_style: "간결 명확, 데이터 기반, 객관적"
            },
            {
                doc_subtype: "프로젝트 진행 상황 보고서",
                target_audience: "팀원, 프로젝트 매니저, 팀 리더, 관련 부서 담당자",
                writing_goal: "프로젝트 목표 대비 현황 공유, 이슈 식별 및 해결 방안 논의",
                output_format: ["PPT", "Google Slides", "PDF"],
                visual_theme: "Standard Blue & Green",
                color_palette: ["#007bff", "#28a745", "#FFFFFF", "#6c757d", "#e9ecef"],
                layout_structure: "마일스톤 기반: 프로젝트 개요 -> 전체 진행률(시각화) -> 마일스톤별 상세 현황 (완료/진행/지연) -> 주요 이슈 및 리스크 -> 대응 방안 -> 다음 단계 계획",
                insight_focus: ["프로젝트 목표 달성률", "주요 마일스톤 지연/달성 현황", "이슈/블로커 및 해결 방안", "리스크 관리 상태"],
                visual_suggestion: ["간트 차트 또는 타임라인 시각화", "진행률 대시보드 (RAG status)", "이슈 트래커 요약 테이블"],
                tone_style: "목표 지향적, 명료함, 현황 중심, 해결 중심"
            },
            {
                doc_subtype: "주간/월간 업무 보고서",
                target_audience: "팀 리더, 상급 관리자",
                writing_goal: "주요 업무 내용 요약 및 성과 보고",
                output_format: ["Word", "Email", "Markdown"],
                visual_theme: "Simple Green & Gray",
                color_palette: ["#28a745", "#6c757d", "#FFFFFF", "#343a40", "#F8F9FA"],
                layout_structure: "업무 요약: 기간 명시 -> 주요 업무 요약(리스트/표) -> 주요 성과(정량적) -> 발생 이슈 및 해결 노력 -> 차주/차월 계획 -> 건의/협조 요청",
                insight_focus: ["주요 업무 진행률 및 완료도", "KPI 달성 현황", "업무상 특이사항 및 이슈", "차기 계획"],
                visual_suggestion: ["주요 성과 그래프(간단히)", "업무 진행률 시각화(%)"],
                tone_style: "간결함, 정기적 보고 형식, 성과 중심"
            },
            {
                doc_subtype: "회의록 / 회의 결과 보고서",
                target_audience: "회의 참석자, 관련 부서",
                writing_goal: "회의 논의 내용 및 결정 사항 기록 및 공유",
                output_format: ["Word", "Google Docs", "Notion"],
                visual_theme: "Minimalist Neutral",
                color_palette: ["#333333", "#EEEEEE", "#FFFFFF", "#6c757d"],
                layout_structure: "결정사항 중심: 회의 정보(일시, 장소, 참석자) -> 논의 안건 -> 주요 발언 요지 -> 결정 사항(Action Item 포함, 담당자/기한 명시) -> 기타 논의/다음 회의 일정",
                insight_focus: ["핵심 결정사항 및 실행 과제", "담당자 및 완료 기한 명확화", "주요 논의 내용 요약"],
                visual_suggestion: ["Action Item 테이블", "참석자 명단 테이블"],
                tone_style: "객관적 기록, 명료함, 실행 강조"
            },
            {
                doc_subtype: "시장 동향 분석 보고서 (Executive)",
                target_audience: "경영진, 전략 기획팀",
                writing_goal: "시장 변화 및 경쟁 환경 분석 기반 전략적 의사결정 지원",
                output_format: ["PDF", "PPT"],
                visual_theme: "Sophisticated Gray & Teal",
                color_palette: ["#343a40", "#20c997", "#FFFFFF", "#F8F9FA", "#CED4DA"],
                layout_structure: "전략 인사이트: Executive Summary -> 주요 시장 동향(거시/산업) -> 핵심 경쟁사 분석(전략, 강약점) -> 자사 영향 및 기회/위협(SOAR/SWOT) -> 전략적 시사점 및 권고",
                insight_focus: ["시장 핵심 트렌드 변화 및 동인", "경쟁사의 전략적 움직임과 의도", "자사의 전략적 기회/위협 요인", "실행 가능한 전략적 권고"],
                visual_suggestion: ["시장 성장률/규모 예측 그래프", "경쟁사 포지셔닝 맵", "SWOT/SOAR 분석 매트릭스", "시나리오별 예측"],
                tone_style: "분석적, 통찰력 제시, 전략적, 간결함"
            },
             {
                doc_subtype: "고객 분석 보고서",
                target_audience: "마케팅팀, 제품팀, 영업팀",
                writing_goal: "고객 데이터 분석을 통한 행동 패턴 이해 및 전략 수립 지원",
                output_format: ["PPT", "PDF", "대시보드(HTML)"],
                visual_theme: "Customer-Focused Orange",
                color_palette: ["#fd7e14", "#6c757d", "#FFFFFF", "#FFF8E1", "#343a40"],
                layout_structure: "고객 이해 중심: 분석 개요 -> 고객 세그먼테이션 결과 -> 세그먼트별 프로필 및 특징 -> 구매 여정 분석 -> 고객 만족도/NPS 분석 -> 주요 발견점 및 인사이트 -> 마케팅/제품 개선 제언",
                insight_focus: ["핵심 고객 세그먼트 정의", "고객 행동 패턴 및 Pain Point", "고객 만족도 영향 요인", "개인화 전략 기회"],
                visual_suggestion: ["고객 세그먼트 분포 차트", "구매 여정 지도 시각화", "NPS/CSAT 점수 추이 그래프", "고객 피드백 워드 클라우드"],
                tone_style: "데이터 기반, 고객 중심, 분석적, 실행 제언"
            }
        ]
    },
    "제안서": {
        examples: [
            {
                doc_subtype: "솔루션/제품 제안서",
                target_audience: "잠재 고객사 (구매팀, 실무자, 의사결정권자)",
                writing_goal: "고객 문제 해결 위한 솔루션/제품 도입 설득 및 계약 유도",
                output_format: ["PPT", "PDF", "Word (상세 버전)"],
                visual_theme: "Innovative Blue & Orange",
                color_palette: ["#007bff", "#fd7e14", "#FFFFFF", "#F8F9FA", "#495057"],
                layout_structure: "고객 문제 해결: 고객 문제 정의(공감대 형성) -> 제안 솔루션 소개 및 차별점 -> 핵심 기능 및 특장점(Benefit 중심) -> 기대 효과(ROI, 정량/정성) -> 도입 프로세스 및 지원 방안 -> 가격 정책/옵션 -> 회사 소개/성공 사례",
                insight_focus: ["고객 문제 해결 능력 강조", "솔루션의 차별화된 가치 제안", "구체적인 기대 효과(ROI) 제시", "신뢰성 있는 회사/제품 역량 증명"],
                visual_suggestion: ["솔루션 아키텍처/워크플로우 다이어그램", "기대 효과 비교 그래프 (Before/After)", "고객 성공 사례 로고/인용구", "가격 테이블/옵션 비교표", "데모 영상 링크/QR코드"],
                tone_style: "설득적, 고객 중심, 자신감, 전문성, 가치 제안"
            },
            {
                doc_subtype: "협업/파트너십 제안서",
                target_audience: "잠재 파트너사 (담당자, 의사결정권자)",
                writing_goal: "상호 이익 기반의 전략적 협력 관계 구축 제안",
                output_format: ["PDF", "Word", "PPT (발표용)"],
                visual_theme: "Creative Purple & Gray",
                color_palette: ["#6f42c1", "#6c757d", "#FFFFFF", "#F8F9FA", "#e9ecef"],
                layout_structure: "상호 윈-윈 강조: 제안 배경 및 비전 공유 -> 협력 목표 및 구체적 범위 -> 각 사의 핵심 역량 및 역할 분담 -> 기대되는 시너지 효과(시장 확장, 기술 융합 등) -> 협력 실행 로드맵 -> 상호 이익 모델 -> 향후 추진 계획",
                insight_focus: ["협력을 통한 시너지 효과 극대화 방안", "상호 이익의 명확하고 공정한 제시", "실행 가능한 협력 모델 및 로드맵", "파트너사의 강점 존중 및 활용 방안"],
                visual_suggestion: ["협력 구조도/모델 시각화", "시너지 효과 예측 그래프/모델", "양사 강점/역할 비교표", "공동 목표 타임라인"],
                tone_style: "협력적, 신뢰감 형성, 상호 존중, 비전 제시"
            },
            {
                doc_subtype: "마케팅/광고 대행 제안서",
                target_audience: "광고주 (마케팅 책임자, 실무자)",
                writing_goal: "클라이언트의 마케팅 목표 달성을 위한 최적의 대행 전략 및 실행 방안 제안",
                output_format: ["PPT"],
                visual_theme: "Energetic Orange & Teal",
                color_palette: ["#fd7e14", "#20c997", "#FFFFFF", "#343a40", "#F8F9FA"],
                layout_structure: "결과 중심 마케팅: 클라이언트 비즈니스 및 목표 이해 -> 시장/경쟁/소비자 분석 요약 -> 타겟 오디언스 정의 및 인사이트 -> 핵심 전략 및 크리에이티브 컨셉 -> 통합 채널 전략 및 실행 전술 -> 예상 성과(KPI) 및 측정 방안 -> 캠페인 예산 및 일정 -> 우리 팀의 강점/포트폴리오",
                insight_focus: ["클라이언트 비즈니스 및 목표에 대한 깊은 이해", "데이터 기반의 차별화된 마케팅 전략", "측정 가능한 성과(KPI) 예측 및 관리 방안", "대행사의 전문성 및 성공 경험 어필"],
                visual_suggestion: ["타겟 오디언스 페르소나 시각화", "채널 믹스 전략 도식화", "크리에이티브 시안 예시", "예상 KPI 대시보드 목업", "성공 사례 요약"],
                tone_style: "창의적, 결과 지향적, 설득력, 데이터 기반, 전문성"
            },
            {
                doc_subtype: "정부 과제/RFP 제안서",
                target_audience: "정부 기관, 공공기관 평가위원",
                writing_goal: "정부 과제 수주 또는 RFP 요구사항에 대한 최적의 솔루션 및 수행 능력 증명",
                output_format: ["PDF", "HWP", "Word"],
                visual_theme: "Reliable Gray & Blue",
                color_palette: ["#6c757d", "#007bff", "#FFFFFF", "#343a40", "#e9ecef"],
                layout_structure: "RFP 요구사항 충족: 제안 개요(배경, 목표, 범위) -> RFP 요구사항 분석 및 이해도 -> 제안 내용(기술/솔루션 상세, 방법론) -> 사업 수행 능력(인력 구성, 유사 실적, 보유 기술) -> 사업 관리 방안(일정, 품질, 리스크, 보안) -> 기대 효과(정량/정성) -> 별첨(증빙 서류)",
                insight_focus: ["RFP 요구사항 충족도 및 이해도", "제안 기술/솔루션의 우수성, 차별성, 실현 가능성", "사업 수행 능력 및 재무 안정성 증명", "체계적인 사업 관리 능력"],
                visual_suggestion: ["요구사항 대비 제안 내용 매핑표 (Compliance Matrix)", "기술 아키텍처 다이어그램", "사업 수행 조직도 및 참여 인력 프로필 요약", "상세 추진 일정표(WBS 기반)", "품질/리스크 관리 매트릭스"],
                tone_style: "논리적, 체계적, 신뢰성 강조, 공문서 형식 준수, 객관성"
            },
            {
                doc_subtype: "투자 유치 제안서 (IR Deck)",
                target_audience: "벤처캐피탈(VC), 엔젤 투자자, 액셀러레이터",
                writing_goal: "투자 유치를 위한 사업의 매력도, 성장 잠재력, 팀 역량 등을 효과적으로 어필",
                output_format: ["PPT (발표용)", "PDF (전달용)"],
                visual_theme: "Visionary Dark Blue & Accent",
                color_palette: ["#001f3f", "#FFFFFF", "#7FDBFF", "#FFDC00", "#DDDDDD"],
                layout_structure: "투자 설득 스토리: 문제 정의(시장의 Pain Point) -> 우리의 해결책(솔루션/제품) -> 시장 기회(규모, 성장성) -> 제품 상세/데모 -> 비즈니스 모델(수익 창출 방식) -> 경쟁 우위/차별점 -> 현재 성과/지표(Traction) -> 핵심 팀 소개 -> 재무 계획/예측 -> 투자 유치 조건 및 자금 사용 계획 -> Exit 전략(선택)",
                insight_focus: ["해결하려는 문제의 중요성 및 시장 규모", "팀의 전문성 및 실행력", "매력적인 비즈니스 모델 및 수익성", "지속 가능한 경쟁 우위", "명확한 성장 전략 및 재무 계획", "투자금 사용 계획의 타당성"],
                visual_suggestion: ["시장 규모(TAM/SAM/SOM) 시각화 그래프", "제품/서비스 데모 스크린샷 또는 짧은 영상", "Traction 성장 데이터 그래프(사용자, 매출 등)", "핵심 재무 지표 예측 차트(매출, 이익, BEP)", "팀 멤버 사진 및 핵심 역량 요약", "경쟁 환경 분석표"],
                tone_style: "비전 제시, 설득력, 자신감, 간결함, 데이터 기반, 스토리텔링"
            }
        ]
    },
    "기획서": {
        examples: [
            {
                doc_subtype: "신사업 기획서",
                target_audience: "경영진, 내부 의사결정권자, 신사업 TF팀",
                writing_goal: "신규 사업 아이템 발굴, 타당성 검토 및 사업화 추진 전략 제안",
                output_format: ["Word", "PPT", "PDF"],
                visual_theme: "Strategic Blue & Yellow",
                color_palette: ["#005A9C", "#FFC107", "#FFFFFF", "#F8F9FA", "#495057"],
                layout_structure: "사업 구체화 로드맵: 기획 배경 및 목표 -> 거시/미시 환경 분석 -> 시장 기회 및 문제 정의 -> 사업 아이템 컨셉 및 정의 -> 목표 고객 설정 -> 비즈니스 모델 설계 -> 기술/운영/마케팅 전략 -> 실행 로드맵(단계별) -> 필요 자원 및 예산 계획 -> 예상 손익 및 리스크 관리 방안 -> 결론 및 제언",
                insight_focus: ["시장 기회 포착 및 분석의 깊이", "사업 모델의 혁신성, 수익성, 지속가능성", "구체적이고 실현 가능한 실행 전략", "재무적 타당성 및 리스크 관리 능력"],
                visual_suggestion: ["시장 분석 자료 요약(그래프, 표)", "비즈니스 모델 캔버스/린 캔버스", "실행 로드맵 타임라인(간트 차트)", "5개년 추정 손익계산서 요약 그래프(BEP 분석 포함)", "SWOT/TOWS 분석 매트릭스"],
                tone_style: "전략적, 논리적, 분석적, 구체성, 설득력"
            },
            {
                doc_subtype: "마케팅 캠페인 기획서",
                target_audience: "마케팅팀, 영업팀, 유관 부서, 대행사",
                writing_goal: "특정 마케팅 목표(인지도 상승, 매출 증대 등) 달성을 위한 통합 캠페인 설계 및 실행 계획 수립",
                output_format: ["PPT", "Excel (세부 일정/예산)", "Word (상세 설명)"],
                visual_theme: "Creative Orange & Green",
                color_palette: ["#F08C00", "#51A87F", "#FFFFFF", "#FFF8E1", "#333333"],
                layout_structure: "캠페인 설계 A to Z: 캠페인 배경 및 목표(KPI 명확화) -> 시장 및 경쟁 상황 분석 -> 타겟 오디언스 분석 및 페르소나 정의 -> 핵심 메시지 & 크리에이티브 컨셉/전략 -> 통합 채널 전략(Owned/Earned/Paid Media) -> 채널별 실행 상세 계획 (콘텐츠, 프로모션, 일정) -> 캠페인 예산 배분 및 집행 계획 -> 성과 측정 및 분석 방안 -> 리스크 관리",
                insight_focus: ["캠페인 목표의 구체성 및 측정 가능성(SMART)", "타겟 오디언스 인사이트 기반 전략", "채널 믹스 및 실행 계획의 구체성", "예산 대비 기대 효과(ROMI)"],
                visual_suggestion: ["타겟 오디언스 페르소나 시각화", "통합 마케팅 커뮤니케이션(IMC) 전략 맵", "콘텐츠 캘린더 / 미디어 집행 일정표", "예산 분배 파이 차트", "KPI 측정 대시보드 목업"],
                tone_style: "창의적, 실행 중심, 목표 지향적, 데이터 기반, 구체적"
            },
            {
                doc_subtype: "웹사이트/앱 리뉴얼 기획서",
                target_audience: "개발팀, 디자인팀, 기획팀, 운영팀, 경영진",
                writing_goal: "사용자 경험(UX) 개선 및 비즈니스 목표 달성을 위한 디지털 플랫폼 리뉴얼 방향 및 상세 계획 제시",
                output_format: ["PPT", "Word", "Confluence/Jira", "Figma/XD (프로토타입)"],
                visual_theme: "User-Centric Purple & Blue",
                color_palette: ["#7A4D8B", "#4D84B0", "#FFFFFF", "#F4F1F8", "#333333"],
                layout_structure: "UX 개선 중심 설계: 리뉴얼 배경 및 목표 -> 현황 분석(사용자 데이터, VOC, 경쟁사 분석) -> 사용자 요구사항 정의(페르소나, User Story) -> 리뉴얼 컨셉 및 핵심 전략 -> 정보 구조(IA) 설계 -> 주요 화면 와이어프레임/프로토타입 -> 기능 명세서(주요 기능) -> 디자인 시스템/가이드라인 -> 개발 우선순위 및 일정 계획 -> 테스트 계획 -> 오픈 후 운영 계획",
                insight_focus: ["사용자 문제점의 데이터 기반 분석", "명확한 리뉴얼 목표와 범위 설정", "사용자 중심의 정보 구조 및 기능 설계", "개발/디자인팀과의 원활한 협업을 위한 구체성"],
                visual_suggestion: ["현황 분석 데이터 시각화(히트맵, 퍼널 분석 등)", "사용자 여정 지도(As-is/To-be)", "정보 구조도(IA Map)", "핵심 화면 와이어프레임/Lo-Fi 프로토타입", "기능 목록(Feature List) 테이블", "개발 마일스톤"],
                tone_style: "사용자 중심, 논리적, 데이터 기반, 구체적 명세, 협업 지향"
            },
            {
                doc_subtype: "콘텐츠 제작/마케팅 기획서",
                target_audience: "콘텐츠 제작팀, 마케팅팀, SEO 전문가",
                writing_goal: "타겟 고객의 참여 유도 및 비즈니스 목표 달성을 위한 콘텐츠 전략 및 제작 계획 수립",
                output_format: ["Word", "PPT", "Excel(캘린더)", "Notion/Trello"],
                visual_theme: "Engaging Green & Gray",
                color_palette: ["#28a745", "#adb5bd", "#FFFFFF", "#F8F9FA", "#343a40"],
                layout_structure: "콘텐츠 전략 및 실행: 콘텐츠 목표 및 KPI -> 타겟 오디언스 및 콘텐츠 페르소나 -> 콘텐츠 주제(Pillars/Clusters) 및 핵심 메시지 -> 콘텐츠 형식(블로그, 영상, 인포그래픽 등) 및 채널 전략 -> 콘텐츠 제작 프로세스 및 가이드라인(톤앤매너, SEO) -> 콘텐츠 발행 캘린더 -> 콘텐츠 확산 및 홍보 계획 -> 성과 측정 및 분석 지표",
                insight_focus: ["콘텐츠 목표와 비즈니스 목표 연계성", "타겟 오디언스 니즈 기반 주제 선정", "채널별 최적화된 콘텐츠 형식 및 전략", "지속 가능한 콘텐츠 발행 시스템"],
                visual_suggestion: ["콘텐츠 캘린더 (주제, 형식, 채널, 발행일, 담당자)", "콘텐츠 형식별 레퍼런스/예시", "SEO 키워드 리스트", "콘텐츠 성과 측정 대시보드 디자인"],
                tone_style: "창의적, 독자 중심, 실행 가능성, SEO 친화적, 측정 가능성"
            },
            {
                doc_subtype: "행사/이벤트 기획서",
                target_audience: "내부 승인권자, 운영 스태프, 협력사, 스폰서",
                writing_goal: "목표 달성 및 참가자 만족을 위한 성공적인 행사/이벤트 종합 계획 수립",
                output_format: ["PPT", "Word", "Excel (예산/참가자 관리)"],
                visual_theme: "Festive Yellow & Navy",
                color_palette: ["#FFD166", "#003B5C", "#FFFFFF", "#FFF8E7", "#333333"],
                layout_structure: "행사 운영 매뉴얼: 행사 개요(목적, 컨셉, 5W1H) -> 목표 및 핵심 성공 지표(KSF) -> 대상 참가자 분석 -> 행사 프로그램 상세(세션, 연사, 부대행사) -> 실행 계획(Time Table, 장소/물품 준비) -> 홍보 및 등록 계획 -> 예산 상세 계획 및 관리 방안 -> 운영 조직 및 역할 분담(R&R) -> 비상 상황 대응 계획(리스크 관리) -> 기대 효과 및 성과 측정 방법",
                insight_focus: ["행사 목표의 명확성 및 달성 가능성", "참가자 대상 매력적인 프로그램 구성", "세부 실행 계획의 구체성 및 현실성", "철저한 예산 및 리스크 관리"],
                visual_suggestion: ["행사장 레이아웃/동선 계획 도면", "행사 상세 타임테이블", "홍보물 시안 예시", "예산 상세 내역표 (항목별)", "운영 조직도", "리스크 관리 매트릭스"],
                tone_style: "구체적, 실행 중심, 체계적, 꼼꼼함, 안전 고려"
            }
        ]
    },
     "계약서": {
        examples: [
            {
                doc_subtype: "비밀유지 계약서 (NDA - Non-Disclosure Agreement)",
                target_audience: "계약 상대방 (기업, 개인, 직원)",
                writing_goal: "사업 논의, 협력, 고용 관계 등에서 교환되는 특정 정보의 비밀 유지 의무 설정",
                output_format: ["Word", "PDF"],
                visual_theme: "Formal & Confidential",
                color_palette: ["#000000", "#FFFFFF"],
                layout_structure: "법률 조항 중심: 전문 -> 비밀정보의 정의 및 범위 -> 비밀유지 의무 (목적 외 사용 금지, 제3자 공개 금지 등) -> 비밀정보의 예외 -> 의무 존속 기간 -> 정보의 반환 또는 파기 -> 권리 및 소유권 -> 손해배상 및 위약벌 -> 분쟁 해결 방법 -> 완전 합의 조항 -> 준거법 및 관할 -> 서명",
                insight_focus: ["보호 대상 비밀정보의 범위 명확화", "비밀유지 의무의 구체적인 내용", "계약 기간 및 종료 후 의무 존속 기간", "위반 시 책임 및 구제수단"],
                visual_suggestion: ["(텍스트 중심, 서명란 명확히 구분)"],
                tone_style: "법률적, 명확함, 구속력, 엄격함"
            },
            {
                doc_subtype: "용역 제공 계약서 (Service Agreement)",
                target_audience: "클라이언트 (서비스 구매자), 용역 제공자 (프리랜서, 에이전시)",
                writing_goal: "제공될 용역의 내용, 범위, 대가, 기간 및 양 당사자의 권리와 의무를 명확히 규정",
                output_format: ["Word", "PDF"],
                visual_theme: "Clear & Binding",
                color_palette: ["#000000", "#FFFFFF", "#003366 (로고 등 제한적 사용)"],
                layout_structure: "용역 조건 명시: 계약 당사자 정보 -> 계약의 목적 -> 용역의 범위 및 상세 내용 (과업지시서 별첨 가능) -> 계약 기간 (시작일, 종료일) -> 용역 대금 및 지급 방법/시기 -> 결과물의 검수 및 인수 절차 -> 지식재산권 귀속 및 사용 허락 -> 비밀 유지 의무 -> 계약의 변경 및 해지 조건 -> 손해배상 -> 불가항력 -> 양도 금지 -> 분쟁 해결 -> 기타 특약 사항 -> 서명",
                insight_focus: ["용역 범위(Scope of Work)의 구체성", "대가 지급 조건 및 시기", "결과물 검수 기준 및 절차", "지식재산권 귀속 문제", "계약 해지 사유 및 절차"],
                visual_suggestion: ["(텍스트 중심, 필요시 과업 범위 별첨)", "대가 지급 일정표(선택)"],
                tone_style: "법률적, 구체적, 상호 합의 기반, 명확성"
            },
             {
                doc_subtype: "근로 계약서 (Standard Employment Contract)",
                target_audience: "근로자, 회사(고용주)",
                writing_goal: "근로기준법 등 노동관계법령에 따른 근로 조건 명시 및 고용 관계 설정",
                output_format: ["Word", "PDF", "전자계약 시스템"],
                visual_theme: "Standard Legal",
                color_palette: ["#000000", "#FFFFFF"],
                layout_structure: "필수 근로 조건 명시: 근로계약기간(정규직/계약직 명시) -> 근무 장소 -> 담당 업무 내용 -> 소정근로시간 및 휴게시간 -> 근무일 및 주휴일 -> 임금(구성항목, 금액, 계산방법, 지급일, 지급방법) -> 연차유급휴가 -> 사회보험 가입 -> 기타 근로조건(취업규칙 등) -> 계약 당사자 서명/날인",
                insight_focus: ["근로기준법상 필수 명시 사항 포함 여부", "임금 구성 및 지급 방법의 명확성", "근로 시간 및 휴게/휴가 규정", "업무 내용의 범위"],
                visual_suggestion: ["(표준 양식 사용, 텍스트 중심)"],
                tone_style: "법률적, 명확함, 표준 양식 준수, 노사 합의"
            },
            {
                doc_subtype: "물품 공급 계약서 (Supply Agreement)",
                target_audience: "공급업체, 구매업체",
                writing_goal: "물품의 안정적 공급 및 대금 지급 등 매매 조건 명확화",
                output_format: ["Word", "PDF"],
                visual_theme: "Commercial Formal",
                color_palette: ["#000000", "#FFFFFF"],
                layout_structure: "공급 조건 상세화: 계약 당사자 -> 계약 목적 -> 공급 물품 명세(품명, 규격, 단위, 수량) -> 물품 단가 및 총액 -> 납품 조건(장소, 기일, 방법, 운송비 부담) -> 검수 절차 및 기준 -> 대금 지급 조건(시기, 방법) -> 소유권 이전 시기 -> 품질 보증 및 하자 담보 책임 -> 계약 기간 및 갱신 -> 계약 해제/해지 사유 및 절차 -> 지체상금 -> 불가항력 -> 분쟁 해결 -> 기타",
                insight_focus: ["공급 물품 명세의 정확성", "납품 기일 및 검수 기준", "대금 지급 조건 및 지연 시 처리", "하자 발생 시 책임 및 처리 절차", "계약 불이행 시 책임"],
                visual_suggestion: ["물품 명세표(별첨 가능)", "납품 및 대금 지급 일정표"],
                tone_style: "법률적, 상거래 관행 준수, 구체성, 명확성"
            },
             {
                doc_subtype: "업무 제휴 계약서 / 양해각서 (MOU)",
                target_audience: "제휴 파트너사",
                writing_goal: "본격적인 계약 체결 전, 상호 협력의 기본 원칙, 방향성, 역할 등에 대해 합의 (MOU는 보통 법적 구속력 약함)",
                output_format: ["Word", "PDF"],
                visual_theme: "Collaborative Formal",
                color_palette: ["#000000", "#FFFFFF", "#003366 (로고 등 제한적 사용)"],
                layout_structure: "협력 원칙 합의: 전문 -> 제휴의 목적 및 배경 -> 협력 분야 및 주요 내용 -> 상호 역할과 협력 방안 -> 비밀 유지 의무 -> 유효 기간 -> 향후 본계약 추진 논의 -> 법적 구속력 여부 (MOU는 배제 조항 명시) -> 비용 분담(해당 시) -> 기타 상호 합의 사항 -> 서명",
                insight_focus: ["협력의 목표 및 범위 명확화", "상호 역할 분담의 합리성", "법적 구속력 여부 명시 (MOU)", "향후 본계약 전환 조건 (선택적)"],
                visual_suggestion: ["(텍스트 중심, 양사 로고 포함 가능)"],
                tone_style: "협력적, 상호 존중, (MOU의 경우) 비구속적 원칙 확인, 미래 지향적"
            }
        ]
    },
    "안내문/공지문": {
        examples: [
             {
                doc_subtype: "행사/이벤트 안내문",
                target_audience: "참가 신청자, 잠재 참가자, 회원",
                writing_goal: "행사 정보 상세 안내 및 기대감 조성, 원활한 참여 유도",
                output_format: ["Email", "웹페이지(HTML)", "PDF (다운로드용)", "이미지(카드뉴스)"],
                visual_theme: "Friendly & Informative Green/Blue",
                color_palette: ["#5cb85c", "#007bff", "#FFFFFF", "#343a40", "#F8F9FA"],
                layout_structure: "참가자 중심 정보: 제목(행사명) -> 행사 개요(목적, 일시, 장소, 대상) -> 상세 프로그램(타임테이블, 세션 소개, 연사) -> 참가 신청 확인/안내 -> 참가자 준비물/유의사항 -> 오시는 길(약도, 교통편) -> FAQ -> 문의처",
                insight_focus: ["행사 핵심 정보(5W1H) 전달", "참가자의 궁금증 해소 (FAQ)", "원활한 참여를 위한 상세 정보(교통, 준비물)", "참가 독려 및 기대감 고취"],
                visual_suggestion: ["행사 포스터/배너 이미지", "상세 프로그램 타임테이블", "연사 프로필 사진/소개", "행사장 약도 및 주차 안내 이미지", "참가 신청 확인/수정 링크 버튼"],
                tone_style: "친절함, 상세함, 정보 제공, 참여 유도, 명료함"
            },
            {
                doc_subtype: "서비스 점검/업데이트 공지",
                target_audience: "서비스 사용자, 고객",
                writing_goal: "서비스 이용 관련 변경사항(점검, 업데이트) 사전 고지 및 사용자 영향 최소화",
                output_format: ["Email", "앱 내 공지", "웹사이트 공지사항/팝업"],
                visual_theme: "Notice Yellow & Gray",
                color_palette: ["#ffc107", "#6c757d", "#FFFFFF", "#343a40", "#F8F9FA"],
                layout_structure: "사전 고지 및 영향 최소화: 제목(점검/업데이트 안내) -> 목적 및 내용 요약 -> 작업 일시(시작-종료, 시간대 명시) -> 서비스 영향 범위(중단/지연 등) -> 사용자 협조/대비 사항 -> 개선되는 점(업데이트 시) -> 문의처",
                insight_focus: ["점검/업데이트 시간 및 영향 범위의 명확하고 정확한 고지", "사용자 불편 최소화를 위한 노력 안내", "업데이트 시 개선점에 대한 기대감 부여"],
                visual_suggestion: ["점검/업데이트 아이콘", "캘린더 표시 또는 남은 시간 카운트다운(선택)", "주요 개선 내용 요약 이미지"],
                tone_style: "명확함, 간결함, 정중함, 사전 고지"
            },
             {
                doc_subtype: "정책/약관 변경 안내",
                target_audience: "회원, 사용자, 고객",
                writing_goal: "변경된 정책/약관 내용 명확히 고지 및 사용자 동의(필요시) 확보",
                output_format: ["Email", "웹사이트 공지사항", "앱 내 공지"],
                visual_theme: "Formal Informative Blue",
                color_palette: ["#007bff", "#6c757d", "#FFFFFF", "#343a40", "#e9ecef"],
                layout_structure: "변경 사항 명확 고지: 제목(중요: OOO 변경 안내) -> 변경 사유 및 배경 설명 -> 주요 변경 내용 요약 -> 변경 전/후 비교표 또는 상세 조항 안내 -> 변경 내용 효력 발생일 -> 사용자 유의사항 또는 동의 절차 안내 -> 전문 확인 링크 -> 문의처",
                insight_focus: ["법적 고지 의무 준수", "변경 내용의 명확한 비교 설명", "사용자에게 미치는 영향 설명", "시행일 및 동의 절차 안내"],
                visual_suggestion: ["변경 전후 비교표", "주요 변경 내용 하이라이트 박스", "전문 보기 링크 버튼"],
                tone_style: "공식적, 명확함, 법규 준수, 정보 제공"
            },
            {
                doc_subtype: "내부 변동사항 공지 (인사/조직)",
                target_audience: "전체 임직원",
                writing_goal: "회사 내부 중요 변동 사항(인사, 조직 개편 등)을 공식적이고 신속하게 발표",
                output_format: ["Email", "사내 게시판", "그룹웨어 공지"],
                visual_theme: "Internal Neutral Gray",
                color_palette: ["#6c757d", "#000000", "#FFFFFF", "#F8F9FA", "#e9ecef"],
                layout_structure: "간결한 사실 전달: 제목(OO부 인사 발령 안내 / OOO 본부 조직 개편 안내 등) -> 발표 내용 요약 -> 상세 내용(대상자, 발령 내용, 부서 변경 등 / 개편 배경, 내용, 신규 조직도) -> 시행일 -> 후속 조치 및 협조 요청(필요시) -> 발표 주체(대표이사/인사팀 등)",
                insight_focus: ["변동 사항의 정확하고 간결한 전달", "시행일 및 적용 대상 명확화", "조직 내 혼란 최소화"],
                visual_suggestion: ["(조직 개편 시) 신규 조직도 이미지", "인사 발령 대상자 명단 표"],
                tone_style: "공식적, 간결함, 명확함, 신속성"
            },
            {
                doc_subtype: "긴급 공지 (장애/보안)",
                target_audience: "영향받는 사용자, 임직원, 관련 부서",
                writing_goal: "긴급 상황 발생 사실 및 대응 현황 신속 전파, 추가 피해 방지",
                output_format: ["Email (긴급 메일)", "SMS/알림톡", "웹사이트/앱 최상단 배너", "사내 메신저"],
                visual_theme: "Urgent Alert Red",
                color_palette: ["#dc3545", "#000000", "#FFFFFF"],
                layout_structure: "긴급 상황 신속 전파: 제목([긴급] OOO 장애 발생 안내 / [긴급] 보안 이슈 안내) -> 발생 시각 및 현재 상황 요약 -> 사용자/시스템 영향 범위 -> 현재까지 확인된 원인(추정 포함) -> 진행 중인 조치 사항 -> 예상 복구 시간(불확실성 명시) -> 추가 정보 확인 채널 안내",
                insight_focus: ["상황의 긴급성 및 심각성 전달", "사용자/시스템 영향 범위 명확화", "현재 대응 상황 투명하게 공유", "추가 행동 지침 제공(필요시)"],
                visual_suggestion: ["경고 아이콘/배너", "굵은 글씨/색상으로 긴급성 강조"],
                tone_style: "긴급함, 매우 간결함, 명확함, 신속성, 직접적"
            }
        ]
    },
    "이력서/자기소개서": {
        examples: [
            {
                doc_subtype: "경력직 이력서 (연대기순)",
                target_audience: "인사 담당자, 채용 관리자, 헤드헌터",
                writing_goal: "보유 경력 및 핵심 성과를 명확하고 구조적으로 제시하여 직무 적합성 강조",
                output_format: ["PDF", "Word"],
                visual_theme: "Professional Standard",
                color_palette: ["#000000", "#FFFFFF", "#003366 (이름/섹션 제목)", "#F0F0F0 (아주 옅은 배경)"],
                layout_structure: "표준 연대기: 개인정보(연락처, 링크드인/포트폴리오) -> 경력 요약(3-4줄 핵심역량/성과) -> 경력사항(최신순: 회사명, 재직기간, 직책/직무, 주요 책임 및 역할(Bullet Points), 핵심 성과(STAR 기법, 정량적 수치)) -> 학력사항 -> 보유 기술(Skills) -> 기타(수상, 자격증, 어학 등)",
                insight_focus: ["지원 직무와의 관련성 높은 경력 강조", "구체적이고 측정 가능한 성과 제시(수치화 필수)", "최신 경력 위주 상세 기술", "핵심 기술/역량 명확히 제시"],
                visual_suggestion: ["깔끔한 섹션 구분선 및 제목 스타일", "가독성 높은 전문적 폰트(나눔고딕, Noto Sans KR 등)", "성과 중심 Bullet Point 작성", "기술 스택 시각화(아이콘/리스트)"],
                tone_style: "전문적, 간결함, 성과 중심, 가독성 중시, 객관적 사실 기반"
            },
            {
                doc_subtype: "신입/주니어 이력서 (역량 중심)",
                target_audience: "인사 담당자, 실무 면접관",
                writing_goal: "직무 관련 교육, 프로젝트 경험, 보유 역량을 중심으로 잠재력과 성장 가능성 어필",
                output_format: ["PDF", "Word"],
                visual_theme: "Clean & Potential-Focused",
                color_palette: ["#333333", "#FFFFFF", "#28a745 (강조 색상)", "#F8F9FA"],
                layout_structure: "역량/경험 중심: 개인정보 -> 지원 분야/목표 -> 핵심 역량 요약(기술, 지식, 강점 분류) -> 주요 프로젝트/경험(목표, 역할, 과정, 결과/배운 점 상세 기술) -> 교육/학력사항 -> 대외활동/인턴 경험 -> 보유 기술 상세(숙련도 포함 가능) -> 기타",
                insight_focus: ["지원 직무와 관련된 핵심 역량 및 기술", "프로젝트/경험을 통한 학습 및 성장 과정", "적극성 및 성장 잠재력", "직무에 대한 이해도 및 열정"],
                visual_suggestion: ["역량 키워드 목록 또는 시각화", "프로젝트별 역할 및 기여도 명확히 기술", "포트폴리오 링크 강조", "깔끔하고 정돈된 레이아웃"],
                tone_style: "적극적, 잠재력 강조, 명료함, 학습 능력 어필, 구체적 경험 기반"
            },
            {
                doc_subtype: "자기소개서 (성장배경/강점 중심)",
                target_audience: "인사 담당자, 면접관",
                writing_goal: "성장 과정 속 경험을 통해 형성된 가치관, 성격적 강점, 직무 관련 역량을 설득력 있게 전달",
                output_format: ["Word", "PDF", "텍스트"],
                visual_theme: "Sincere Storytelling",
                color_palette: ["#000000", "#FFFFFF", "#6c757d (소제목/구분)"],
                layout_structure: "나의 이야기: 소제목 1 (나를 나타내는 키워드/경험) - 성장 배경/중요 경험 -> 배운 점/가치관 -> 소제목 2 (나의 핵심 강점 1) - 강점을 발휘한 구체적 경험(STAR) -> 결과/기여 -> 소제목 3 (나의 핵심 강점 2) - (위와 동일) -> 소제목 4 (단점 및 극복 노력 - 솔직함과 개선 의지) -> 마무리(회사 기여 약속)",
                insight_focus: ["가치관과 직무/회사 문화의 연결성", "강점을 뒷받침하는 구체적이고 진솔한 경험", "문제 해결 능력 및 성장 과정", "자기 성찰 및 개선 의지"],
                visual_suggestion: ["(텍스트 중심, 가독성 높은 문단 나누기)", "소제목 활용하여 구조화"],
                tone_style: "진솔함, 가독성, 논리적 스토리텔링, 긍정적 태도"
            },
            {
                doc_subtype: "자기소개서 (지원동기/포부 중심)",
                target_audience: "인사 담당자, 면접관, 채용팀",
                writing_goal: "해당 회사 및 직무에 대한 깊은 이해와 열정을 보여주고, 입사 후 기여할 수 있는 구체적인 계획을 제시",
                output_format: ["Word", "PDF", "텍스트"],
                visual_theme: "Passionate & Goal-Oriented",
                color_palette: ["#000000", "#FFFFFF", "#005A9C (강조/포인트)"],
                layout_structure: "회사/직무 Fit 강조: 소제목 1 (내가 이 회사/직무에 지원하는 이유) - 회사 비전/가치/사업에 대한 이해 + 나의 관심사/경험 연결 -> 소제목 2 (내가 이 직무에 적합한 이유) - 직무 요구 역량 분석 + 나의 관련 경험/지식/기술 매칭 -> 소제목 3 (입사 후 이루고 싶은 목표/포부) - 단기적 기여 방안 + 장기적 성장 계획 -> 회사 발전에 기여할 구체적 아이디어 -> 마무리(강한 입사 의지 표명)",
                insight_focus: ["회사 및 직무에 대한 깊이 있는 조사와 이해도", "자신의 강점과 회사가 필요로 하는 역량의 연결", "구체적이고 실현 가능한 입사 후 기여 계획", "회사의 성장과 자신의 성장을 함께 이루려는 의지"],
                visual_suggestion: ["(텍스트 중심, 회사/직무 관련 키워드 자연스럽게 활용)"],
                tone_style: "열정적, 논리적, 회사/직무 중심, 적극성, 목표 지향적"
            },
            {
                doc_subtype: "커버레터 (Cover Letter)",
                target_audience: "채용 담당자, 채용 공고 게시자 (특정인 지정 권장)",
                writing_goal: "이력서와 함께 제출하여, 지원하는 직무에 대한 본인의 핵심 자격과 강한 지원 의사를 간결하게 전달",
                output_format: ["Email 본문", "PDF (별도 파일)", "Word"],
                visual_theme: "Concise & Professional",
                color_palette: ["#000000", "#FFFFFF"],
                layout_structure: "핵심 요약 및 관심 표명: 수신자 정보(이름, 직책, 회사) -> 작성일 -> 서론(본인 소개, 지원 직무 및 공고 출처 명시) -> 본론 1(직무에 대한 관심과 이해도, 본인이 기여할 수 있는 핵심 역량 1~2가지 강조) -> 본론 2(해당 역량을 보여주는 대표 경험/성과 간략 언급) -> 결론(첨부 서류 안내, 면접 희망 의사 표현, 감사 인사) -> 발신자 정보(이름, 연락처)",
                insight_focus: ["지원 직무와 핵심 역량의 명확한 연결", "간결하고 강력한 자기 어필", "프로페셔널하고 정중한 태도", "맞춤법 및 문법 오류 없음"],
                visual_suggestion: ["(비즈니스 서신 형식 준수, 텍스트 중심)", "명확한 단락 구분"],
                tone_style: "정중함, 간결함, 전문적, 적극적, 명료함"
            }
        ]
    },
    "블로그 게시물": {
        examples: [
            {
                doc_subtype: "정보성/튜토리얼 게시물",
                target_audience: "특정 기술/주제 초보자, 학습자, 문제 해결 필요자",
                writing_goal: "복잡한 정보나 기술 사용법을 단계별로 명확하고 쉽게 설명하여 독자의 문제 해결 및 학습 지원",
                output_format: ["HTML (블로그)", "Markdown"],
                visual_theme: "Informative & Step-by-Step",
                color_palette: ["#333333", "#FFFFFF", "#007bff (링크/코드 강조)", "#F8F9FA (코드 블록 배경)"],
                layout_structure: "단계별 가이드: 제목(핵심 키워드, 해결 과제 명시) -> 서론(무엇을, 왜, 누구를 위한 글인지) -> 준비물/사전 지식 -> 본론(명확한 단계 구분, 각 단계별 상세 설명 + 코드 예제/스크린샷) -> 실행 결과 확인 -> 추가 팁/주의사항/FAQ -> 결론(핵심 요약, 다음 학습 제안) -> 참고 자료",
                insight_focus: ["정보의 정확성, 최신성, 재현 가능성", "초보자 눈높이에 맞는 쉬운 설명", "단계별 명확성 및 논리적 흐름", "SEO 최적화 (키워드, 가독성)"],
                visual_suggestion: ["단계별 코드 블록(복사 가능)", "명확한 설명용 스크린샷/GIF", "결과 화면 캡처", "핵심 요약 인포그래픽/체크리스트", "관련 개념 설명 링크"],
                tone_style: "친절함, 명확함, 따라하기 쉬움, 정보 제공 중심, 교육적"
            },
            {
                doc_subtype: "경험/후기 게시물 (리뷰)",
                target_audience: "제품/서비스/장소 등 잠재 사용자, 경험 공유 관심자",
                writing_goal: "개인적인 경험이나 사용 후기를 생생하고 솔직하게 전달하여 독자의 의사결정에 도움 또는 공감대 형성",
                output_format: ["HTML (블로그)", "Markdown", "브런치"],
                visual_theme: "Personal & Authentic",
                color_palette: ["#333333", "#FFFFFF", "#fd7e14 (별점/강조)", "#FFF8E1 (인용/느낀점 배경)"],
                layout_structure: "생생한 경험 공유: 제목(흥미 유발, 핵심 경험 키워드) -> 서론(경험/리뷰 대상 소개 및 계기) -> 본론(시간/과정 순서 또는 특징별 상세 경험 묘사, 장점/단점 분석) -> 가장 인상 깊었던 점/아쉬웠던 점 -> 총평(별점/추천 점수) -> 추천 대상/비추천 대상 -> 관련 팁/정보 -> 마무리(독자 질문/의견 요청)",
                insight_focus: ["경험의 구체성 및 진솔함", "장단점의 객관적이고 균형 잡힌 제시", "독자가 공감할 수 있는 포인트", "실질적인 구매/선택 도움 정보"],
                visual_suggestion: ["직접 찍은 고품질 사진/영상", "장단점 요약 테이블/리스트", "평점 시각화(별점 등)", "비교 대상과의 차이점 표"],
                tone_style: "솔직함, 개인적 경험 기반, 공감 유도, 생생함, 주관적 평가 포함"
            },
             {
                doc_subtype: "의견/칼럼 게시물",
                target_audience: "특정 주제/이슈 관심 독자, 토론 참여 희망자",
                writing_goal: "특정 사안에 대한 자신의 명확한 입장, 분석, 주장을 논리적 근거와 함께 제시하여 독자 설득 또는 공론화",
                output_format: ["HTML (블로그)", "Markdown", "브런치", "미디엄"],
                visual_theme: "Thoughtful & Persuasive",
                color_palette: ["#000000", "#FFFFFF", "#6f42c1 (강조/인용)", "#F8F9FA (배경)"],
                layout_structure: "논리적 주장 전개: 제목(핵심 주장/질문 제시) -> 서론(주제/이슈 소개 및 문제 제기) -> 본론 1(자신의 핵심 주장) -> 본론 2(주장을 뒷받침하는 근거: 통계, 사례, 전문가 의견 등) -> 본론 3(예상되는 반론 및 재반박) -> 대안/제언 -> 결론(주장 요약 및 메시지 강조) -> 독자 토론 유도",
                insight_focus: ["주장의 명확성 및 논리적 일관성", "근거의 타당성 및 신뢰성", "균형 잡힌 시각(반론 고려)", "설득력 있는 문장 구성"],
                visual_suggestion: ["주장 뒷받침하는 통계/데이터 시각화(차트 인용)", "전문가/관련 인물 인용구 강조 블록", "핵심 주장 요약 그래픽", "관련 기사/논문 링크"],
                tone_style: "논리적, 분석적, 설득적, 주장 명확, 비판적 사고"
            },
             {
                doc_subtype: "뉴스/트렌드 분석 게시물",
                target_audience: "최신 정보/업계 동향 관심 독자, 전문가",
                writing_goal: "복잡한 최신 뉴스나 트렌드를 쉽게 해설하고, 그 의미와 영향력에 대한 깊이 있는 분석과 전망(인사이트) 제공",
                output_format: ["HTML (블로그)", "Markdown"],
                visual_theme: "Timely & Insightful Blue",
                color_palette: ["#17a2b8", "#343a40", "#FFFFFF", "#F1FAFD"],
                layout_structure: "심층 해설: 제목(핵심 뉴스/트렌드 키워드 포함) -> 서론(사건/트렌드 요약 및 중요성 부각) -> 본론(상세 내용 설명, 발생 배경 및 맥락 분석, 주요 관련자/기업 동향) -> 핵심 의미 및 영향 분석(단기/장기, 산업/사회) -> 향후 전망 및 시사점 -> 전문가/관련 자료 인용 -> 독자 의견 질문",
                insight_focus: ["사건/트렌드에 대한 정확하고 깊이 있는 이해", "단순 사실 전달을 넘어선 '왜'와 '그래서 뭐'에 대한 답변(인사이트)", "미래 전망의 논리적 근거", "다각적인 관점 제시"],
                visual_suggestion: ["관련 뉴스/보도 이미지 또는 영상 임베드", "사건/트렌드 전개 타임라인", "주요 플레이어 관계도/영향력 맵", "핵심 데이터/통계 시각화", "전문가 코멘트 인용 박스"],
                tone_style: "객관적, 분석적, 정보 전달, 통찰력 제공, 시의성"
            },
            {
                doc_subtype: "목록형/큐레이션 게시물 (Listicle)",
                target_audience: "정보 탐색 사용자, 특정 분야 입문자",
                writing_goal: "특정 주제에 대한 유용한 정보, 팁, 도구, 사례 등을 간결하고 이해하기 쉬운 목록 형태로 큐레이션하여 제공",
                output_format: ["HTML (블로그)", "Markdown", "카드뉴스"],
                visual_theme: "Easy-to-Digest & Actionable",
                color_palette: ["#6610f2", "#343a40", "#FFFFFF", "#F8F0FF"],
                layout_structure: "스캔하기 좋은 목록: 제목(숫자 강조, 매력적 키워드 사용. 예: '개발자 생산성 200% 올리는 VSCode 확장 플러그인 10가지') -> 서론(주제 소개, 이 글을 읽어야 하는 이유) -> 본론(번호/순위 매겨진 목록 + 각 항목별 핵심 설명, 장점, 사용법/팁, 관련 링크/이미지) -> 추가 보너스 팁/정보 -> 결론(요약, 독자 추천 요청/참여 유도)",
                insight_focus: ["정보의 실용성 및 가치", "목록 구성의 명확성 및 논리적 순서", "가독성 및 스캔 용이성(모바일 고려)", "독자의 행동 유도(클릭, 설치, 적용 등)"],
                visual_suggestion: ["각 항목별 명확한 소제목 및 대표 이미지/아이콘", "핵심 내용 강조(볼드, 하이라이트)", "관련 링크 버튼/임베드", "체크리스트/요약표 제공", "인포그래픽 활용"],
                tone_style: "간결함, 유용성 강조, 읽기 쉬움, 친근함, 정보 큐레이션"
            }
        ]
    },
    "편지/이메일": { // 이전에 추가된 내용 유지 및 보강
        examples: [
            {
                doc_subtype: "업무 협조 요청 메일",
                target_audience: "동료, 타 부서 담당자, 상사",
                writing_goal: "특정 업무 수행을 위한 도움이나 정보 제공을 정중하고 명확하게 요청",
                output_format: ["Email"],
                visual_theme: "Default Formal",
                color_palette: ["#000000", "#FFFFFF"],
                layout_structure: "명확한 요청: 제목( [협조 요청] OOO 관련 자료 요청 등 목적 명시) -> 수신자 호칭(OOO님께) -> 본인 소속/이름 및 용건 요약 -> 요청 배경 및 사유 설명 -> 구체적인 요청 사항(필요한 자료/행동 명확히) -> 요청 기한(마감일 명시) -> (선택) 협조 시 예상되는 긍정적 효과 -> 감사 인사 및 마무리 -> 발신자 서명(연락처 포함)",
                insight_focus: ["요청 사항의 명확성 및 구체성", "협조 필요성에 대한 충분한 설명", "정중하고 배려하는 태도", "기한 명시로 책임감 있는 요청"],
                visual_suggestion: ["(텍스트 중심, 필요시 관련 문서나 예시 첨부)"],
                tone_style: "정중함, 명료함, 협조적, 간결함, 구체적"
            },
            {
                doc_subtype: "문의/질의 메일",
                target_audience: "고객센터, 담당 부서, 외부 전문가, 교수",
                writing_goal: "궁금하거나 불분명한 점에 대해 명확하게 질문하고 정확한 답변을 얻기 위함",
                output_format: ["Email"],
                visual_theme: "Default Formal",
                color_palette: ["#000000", "#FFFFFF"],
                layout_structure: "구체적 질문: 제목( OOO 관련 문의 드립니다 등 내용 명시) -> 수신자 호칭 -> 본인 소개(소속/이름, 필요시 연락처) -> 문의하게 된 배경/상황 설명 -> 구체적인 질문 목록(명확하게 번호 매기기 권장) -> (선택) 본인이 이해하고 있는 부분 또는 시도해 본 내용 -> 답변 요청 및 회신 기한(필요시) -> 감사 인사 및 마무리 -> 발신자 서명",
                insight_focus: ["질문 내용의 구체성과 명확성", "상황 설명의 간결함", "핵심 질문을 쉽게 파악하도록 구성", "답변자가 답변하기 용이하도록 배려"],
                visual_suggestion: ["(텍스트 중심, 질문 목록화, 관련 정보 스크린샷/파일 첨부 가능)"],
                tone_style: "정중함, 명확함, 질문 중심, 논리적"
            },
            {
                doc_subtype: "감사 편지/메일",
                target_audience: "도움을 준 사람, 고객, 파트너, 멘토, 추천인 등",
                writing_goal: "받은 도움이나 호의에 대한 진심 어린 감사를 표현하고 긍정적인 관계를 강화",
                output_format: ["Email", "Word (격식)", "손편지 (진정성)"],
                visual_theme: "Warm & Sincere Gold",
                color_palette: ["#333333", "#FFFFFF", "#DAA520 (포인트)"],
                layout_structure: "진심 담은 감사: 제목( OOO님께 감사드립니다 등) -> 수신자 호칭 -> 감사하는 이유(구체적인 상황, 도움 내용 언급) -> 그 도움이 본인에게 어떤 의미였는지/어떻게 도움이 되었는지 -> (선택) 본인이 느낀 점이나 배운 점 -> 향후 관계에 대한 긍정적 언급 -> 다시 한번 감사 인사 및 마무리 -> 발신자 서명",
                insight_focus: ["감사의 구체적인 이유 명시", "진솔하고 따뜻한 감정 표현", "상대방의 노력과 시간에 대한 인정", "긍정적 관계 유지 및 발전 의지"],
                visual_suggestion: ["(텍스트 중심, 진심이 느껴지는 문장)", "손편지의 경우 정성스러운 글씨"],
                tone_style: "진솔함, 감사 표현, 긍정적, 따뜻함, 개인적"
            },
            {
                doc_subtype: "사과 편지/메일",
                target_audience: "피해를 입은 사람, 고객, 동료, 상사",
                writing_goal: "자신의 잘못이나 실수에 대해 인정하고 진심으로 사과하며 관계 회복 노력",
                output_format: ["Email", "Word"],
                visual_theme: "Regretful & Respectful Gray",
                color_palette: ["#000000", "#FFFFFF", "#6c757d"],
                layout_structure: "진정성 있는 사과: 제목( OOO 건 관련 사과드립니다) -> 수신자 호칭 -> 사과하는 내용 명확히 언급(변명 X) -> 자신의 잘못 인정 -> 상대방이 느꼈을 감정에 대한 공감 표현 -> 재발 방지 노력 및 개선 계획 -> 관계 회복에 대한 의지 표현 -> 정중한 마무리 -> 발신자 서명",
                insight_focus: ["잘못에 대한 명확한 인정", "진심 어린 사과 표현", "재발 방지 약속 및 구체적 노력", "관계 회복 의지"],
                visual_suggestion: ["(텍스트 중심, 진정성 있는 어조 유지)"],
                tone_style: "진솔함, 정중함, 책임감 있는 태도, 반성"
            },
             {
                doc_subtype: "안부/연락 편지/메일",
                target_audience: "오랫동안 연락하지 못한 지인, 동료, 은사",
                writing_goal: "관계를 다시 연결하고 안부를 묻고 소식을 전함",
                output_format: ["Email", "SNS 메시지", "손편지"],
                visual_theme: "Friendly & Casual",
                color_palette: ["#333333", "#FFFFFF", "#17a2b8 (포인트)"],
                layout_structure: "오랜만의 연락: 제목(OOO입니다, 잘 지내시는지 궁금합니다 등) -> 수신자 호칭 -> 본인 소개(기억 상기) -> 연락하게 된 계기 -> 상대방 안부 묻기 -> 자신의 근황 간략히 공유 -> 과거 추억 언급(선택) -> 앞으로의 연락/만남 제안(선택) -> 마무리 인사 -> 발신자 서명",
                insight_focus: ["반가움과 궁금함 표현", "긍정적이고 가벼운 근황 공유", "관계를 이어가고 싶은 마음 전달"],
                visual_suggestion: ["(텍스트 중심, 편안하고 친근한 어조)"],
                tone_style: "친근함, 반가움, 안부 중심, 부담스럽지 않게"
            }
        ]
    }
};
