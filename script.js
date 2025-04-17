// ==========================================================================
// ========================== 전역 변수 선언 ==============================
// ==========================================================================
let selectedFilesArray = []; // 선택된 파일 목록 관리 배열
let currentAnalysisResults = { summary: null, insights: null, isRealData: false }; // 분석 결과 저장

// ==========================================================================
// ========================== 함수 정의 영역 ==============================
// ==========================================================================

// --- 파일 크기 포맷 함수 ---
function formatFileSize(bytes, decimals = 2) {
    if (!+bytes || bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = bytes > 0 ? Math.floor(Math.log(bytes) / Math.log(k)) : 0;
    const index = Math.min(i, sizes.length - 1);
    try {
        return `${parseFloat((bytes / Math.pow(k, index)).toFixed(dm))} ${sizes[index]}`;
    } catch (e) { return "크기 오류"; }
}

// --- UI 요소 숨기기/표시 헬퍼 함수 ---
function hideElement(element) { if (element) element.style.display = 'none'; }
function showElement(element, displayType = 'block') { if (element) element.style.display = displayType; }
function hideDetails() { hideElement(document.getElementById('details-section')); }
function hideAnalysisResults() { hideElement(document.getElementById('analysis-results-section')); }
function hideFilterSection() { hideElement(document.getElementById('filter-section')); }
function hideGeneratedDocSection() { hideElement(document.getElementById('generated-doc-section')); }
function hidePreviewSection() { hideElement(document.getElementById('preview-section')); } // Step 4
function hideTemplateStructureView() { hideElement(document.getElementById('template-structure-view')); }

// --- 필터 의존성 초기화 ---
function resetFilterDependents(resetPurpose = true) {
    const purposeSelect = document.getElementById('doc_purpose');
    const subtypeSelect = document.getElementById('doc_subtype');
    const outputFormatSelect = document.getElementById('output_format_select');
    const pageSpecSelect = document.getElementById('page_spec_select');
    const generateButton = document.getElementById('generate-button'); // Step 3 버튼

    if (resetPurpose && purposeSelect) purposeSelect.value = "";
    if (subtypeSelect) {
        subtypeSelect.innerHTML = '<option value="">-- 문서 용도를 먼저 선택하세요 --</option>';
        subtypeSelect.disabled = true;
    }
    if (outputFormatSelect) {
        // 옵션 초기화 (첫번째 '-- 선택하세요 --' 제외)
        for (let i = outputFormatSelect.options.length - 1; i > 0; i--) {
            outputFormatSelect.remove(i);
        }
        outputFormatSelect.value = "";
        outputFormatSelect.disabled = true;
    }
    if (pageSpecSelect) {
        pageSpecSelect.value = "";
        pageSpecSelect.disabled = true;
    }
    hideDetails();
    if (generateButton) generateButton.disabled = true;
}

// --- 하위 단계 UI 전체 초기화 함수 ---
function resetSubsequentStepsUI() {
    console.log("Resetting subsequent UI steps...");
    hideAnalysisResults(); // Step 2
    hideFilterSection();   // Step 3
    hidePreviewSection();  // Step 4
    hideGeneratedDocSection(); // Step 5
    hideTemplateStructureView(); // 템플릿 보기

    // 분석 데이터 초기화
    currentAnalysisResults = { summary: null, insights: null, isRealData: false };
    const extractedTextarea = document.getElementById('extracted-text');
    const analysisInsightsPre = document.getElementById('analysis-insights');
    if(extractedTextarea) extractedTextarea.value = "";
    if(analysisInsightsPre) analysisInsightsPre.textContent = "";

    resetFilterDependents(); // Step 3 필터 초기화
}

// --- 초기 UI 설정 함수 ---
function initializeUI() {
    console.log("Initializing UI...");
    const fileListDiv = document.getElementById('file-list');
    const analyzeButton = document.getElementById('analyze-button');

    if (fileListDiv) fileListDiv.innerHTML = '<span style="color: #888;">선택된 파일 없음</span>';
    if (analyzeButton) analyzeButton.disabled = true;
    selectedFilesArray = [];
    resetSubsequentStepsUI(); // 모든 후속 단계 숨김 및 초기화
    console.log("UI Initialization complete.");
}

// --- populatePurposeDropdown 함수 정의 (reportWizTemplates 사용) ---
function populatePurposeDropdown() {
    const purposeSelect = document.getElementById('doc_purpose');
    if (!purposeSelect) { console.error("#doc_purpose not found!"); return; }
    purposeSelect.innerHTML = '<option value="">-- 선택하세요 --</option>'; // 기본 옵션

    // reportWizTemplates 배열이 정의되어 있고 비어있지 않은지 확인
    if (typeof reportWizTemplates !== 'undefined' && reportWizTemplates.length > 0) {
        // 고유한 doc_purpose 값 추출
        const uniquePurposes = [...new Set(reportWizTemplates.map(template => template.doc_purpose))];

        uniquePurposes.forEach(purpose => {
            if (purpose) { // purpose 값이 유효한 경우에만 추가
                const option = document.createElement('option');
                option.value = purpose;
                option.textContent = purpose;
                purposeSelect.appendChild(option);
            }
        });
    } else {
        console.error("reportWizTemplates is not defined or empty.");
        purposeSelect.innerHTML = '<option value="">템플릿 데이터 오류</option>'; // 오류 메시지 표시
    }
}

// --- 파일 읽기 함수 ---
function readFileAsText(file) {
     return new Promise((resolve, reject) => {
        if (!file) return reject(new Error("파일 객체 null"));
        const reader = new FileReader();
        reader.onload = (event) => resolve(event.target?.result);
        reader.onerror = (error) => reject(error);
        if (/\.(txt|md)$/i.test(file.name)) { reader.readAsText(file, 'UTF-8'); }
        else { reject(new Error(`읽기 지원 안함: ${file.name}`)); }
    });
}

// --- 파일 읽고 분석 시뮬레이션 (개선 버전) ---
async function readFileAndSimulateAnalysis(files, selectedSummaryLevel) {
    console.log("Simulating analysis for files:", files.map(f=>f.name), "Level:", selectedSummaryLevel);
    let processedText = "";
    let fileReadSuccess = false;
    let baseTitle = "문서";

    const readableFiles = files.filter(file => /\.(txt|md)$/i.test(file.name));
    if (readableFiles.length > 0) {
        baseTitle = readableFiles[0].name.replace(/\.[^/.]+$/, "");
        try {
            processedText = await readFileAsText(readableFiles[0]);
            fileReadSuccess = true;
        } catch (error) { processedText = `[오류: ${readableFiles[0].name} 읽기 실패]`; }
    } else if (files.length > 0) {
        baseTitle = files[0].name.replace(/\.[^/.]+$/, "");
        processedText = `[알림: ${files[0].name} 형식 읽기 불가]`;
    } else { processedText = "[분석 오류: 파일 정보 없음]"; }

    let simulatedSummary = `[${baseTitle}] 분석 결과 (${selectedSummaryLevel} 수준 요약):\n\n`;
    const previewText = fileReadSuccess ? processedText.substring(0, 300) + (processedText.length > 300 ? '...' : '') : '(내용 미리보기 불가)';

    if (selectedSummaryLevel === 'High') simulatedSummary += `핵심 요약: ${baseTitle} 관련 주요 사항은... (생략)`;
    else if (selectedSummaryLevel === 'Medium') simulatedSummary += `중간 요약: ${baseTitle} 문서의 주요 내용은 ${previewText.substring(0,100)}... 등이며... (중략)`;
    else simulatedSummary += `상세 요약:\n${previewText}\n(파일 시작 부분 일부)`;

    let simulatedInsights = `주요 분석 인사이트 (${baseTitle}):\n`;
    simulatedInsights += `- 핵심 이슈: 관련 쟁점 파악 필요.\n`;
    simulatedInsights += `- 잠재적 모순점: ${fileReadSuccess ? '상반 내용 검토 필요.' : '데이터 부족.'}\n`;
    simulatedInsights += `- 제안 사항: 목적 기반 추가 분석/활용 모색.`;

    console.log("Analysis simulation finished.");
    return { summary: simulatedSummary, insights: simulatedInsights, isRealData: fileReadSuccess };
}

// --- *** 파일 목록 UI 업데이트 함수 (중요!) *** ---
function updateFileListUI() {
    const fileListDiv = document.getElementById('file-list');
    const analyzeButton = document.getElementById('analyze-button'); // 버튼 참조 확인!
    if (!fileListDiv || !analyzeButton) { // 버튼 참조 실패 시 오류 로그
        console.error("Cannot update file list UI: #file-list or #analyze-button not found!");
        return;
    }
    console.log("Updating file list UI...");
    fileListDiv.innerHTML = ""; // 이전 목록 지우기

    if (selectedFilesArray.length === 0) {
        fileListDiv.innerHTML = '<span style="color: #888;">선택된 파일 없음</span>';
        analyzeButton.disabled = true; // 파일 없으면 버튼 비활성화
        // resetSubsequentStepsUI(); // 파일 없을 때 후속 단계 초기화 (handleFileSelect에서도 호출되므로 중복 제거 가능)
        return;
    }

    // 파일 개수 표시
    const countSpan = document.createElement('span');
    countSpan.textContent = `선택된 파일 (${selectedFilesArray.length}개):`;
    countSpan.style.fontWeight = 'bold';
    countSpan.style.display = 'block';
    countSpan.style.marginBottom = '10px';
    fileListDiv.appendChild(countSpan);

    // 파일 목록 생성
    const ul = document.createElement("ul");
    ul.style.cssText = 'list-style: none; padding: 0; margin: 0;';

    selectedFilesArray.forEach((file, index) => {
        if (file && file.name && typeof file.size === 'number') {
            const li = document.createElement("li");
            li.style.cssText = 'margin-bottom: 5px; display: flex; align-items: center;';
            const extension = file.name.split('.').pop()?.toLowerCase() || '';
            let readableSpan = '';
            if (['txt', 'md'].includes(extension)) readableSpan = ' <span style="color: green; font-size: 0.8em;">(읽기 가능)</span>';
            else if (['hwp', 'doc', 'docx', 'ppt', 'pptx', 'pdf', 'xls', 'xlsx', 'jpg', 'png', 'gif'].includes(extension)) readableSpan = ' <span style="color: orange; font-size: 0.8em;">(읽기 준비 중)</span>';
            else readableSpan = ' <span style="color: red; font-size: 0.8em;">(지원 예정)</span>';

            const infoSpan = document.createElement('span');
            infoSpan.style.flexGrow = '1';
            infoSpan.innerHTML = `<span class="filename">${file.name}</span> <span class="filesize">(${formatFileSize(file.size)})</span>${readableSpan}`;
            li.appendChild(infoSpan);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'X';
            deleteButton.style.cssText = 'margin-left: 10px; color: red; border: none; background: none; cursor: pointer; font-size: 1em; padding: 0 5px; flex-shrink: 0; line-height: 1;';
            deleteButton.title = `${file.name} 삭제`;
            deleteButton.dataset.index = index; // 삭제할 인덱스 저장
            deleteButton.addEventListener('click', handleDeleteFile); // 삭제 핸들러 연결
            li.appendChild(deleteButton);
            ul.appendChild(li);
        }
    });
    fileListDiv.appendChild(ul);

    // HWP 알림 (필요시)
    if (selectedFilesArray.some(file => file?.name?.toLowerCase().endsWith('.hwp'))) {
         const hwpNotice = document.createElement('small');
         hwpNotice.style.cssText = 'color: orange; display: block; margin-top: 5px;';
         hwpNotice.textContent = '참고: HWP 파일 분석은 향후 지원될 예정입니다.';
         fileListDiv.appendChild(hwpNotice);
    }

    console.log("File list UI updated. Enabling analyze button.");
    analyzeButton.disabled = false; // *** 파일 있으면 버튼 활성화 ***

    // 파일 목록 변경 시 후속 단계 초기화는 handleFileSelect에서 호출하므로 여기서는 생략
}

// --- *** 파일 선택 처리 함수 (중요!) *** ---
function handleFileSelect(event) {
    console.log("File selection changed.");
    // 개발자 콘솔에서 이 로그가 먼저 찍히는지 확인
    try {
        if (event?.target?.files) { // event와 target, files 존재 여부 확인
            selectedFilesArray = Array.from(event.target.files);
            console.log(`Selected files count: ${selectedFilesArray.length}`);
        } else {
            console.log("No files selected or file input error.");
            selectedFilesArray = [];
        }
        // 파일 목록 UI 업데이트 및 버튼 상태 변경 시도
        updateFileListUI();
        // 파일 선택 변경 시 후속 단계 초기화 (여기서 호출)
        resetSubsequentStepsUI();
    } catch (error) {
        console.error("Error in handleFileSelect:", error);
        // 오류 발생 시 UI 초기화 시도
        selectedFilesArray = [];
        try { updateFileListUI(); } catch (uiError) { console.error("Error updating UI after file select error:", uiError); }
        try { resetSubsequentStepsUI(); } catch (resetError) { console.error("Error resetting UI after file select error:", resetError); }
    }
}


// --- 파일 삭제 처리 함수 ---
function handleDeleteFile(event) {
     const indexToRemove = parseInt(event?.target?.dataset?.index, 10); // Optional chaining 추가
    console.log(`Delete button clicked for index: ${indexToRemove}`);
    if (!isNaN(indexToRemove) && indexToRemove >= 0 && indexToRemove < selectedFilesArray.length) {
        const removedFileName = selectedFilesArray[indexToRemove]?.name || 'unknown file';
        selectedFilesArray.splice(indexToRemove, 1);
        console.log(`Removed file: ${removedFileName}. Remaining files: ${selectedFilesArray.length}`);
        updateFileListUI(); // UI 새로고침 (이 안에서 버튼 상태 조절 및 후속 단계 초기화 필요시 호출됨)
    } else {
        console.error("Invalid index for file deletion:", indexToRemove);
    }
}

// --- 분석 시작 버튼 핸들러 ---
async function handleAnalysis() {
    console.log("Analyze button clicked.");
    const analyzeButton = document.getElementById('analyze-button');
    const analysisLoading = document.getElementById('analysis-loading');
    const analysisResultsSection = document.getElementById('analysis-results-section'); // Step 2
    const filterSection = document.getElementById('filter-section'); // Step 3
    const extractedTextarea = document.getElementById('extracted-text');
    const analysisInsightsPre = document.getElementById('analysis-insights');
    const summaryLevelRadio = document.querySelector('input[name="summary_level"]:checked');

    if (!summaryLevelRadio) { alert("요약 수준을 선택해주세요."); return; }
    const selectedSummaryLevel = summaryLevelRadio.value;
    if (selectedFilesArray.length === 0) { alert("분석할 파일을 먼저 선택해주세요."); return; }

    if(analyzeButton) analyzeButton.disabled = true; // 분석 시작 시 버튼 비활성화
    showElement(analysisLoading);
    hideAnalysisResults(); // 이전 결과 숨김
    hideFilterSection();   // 이하 후속 단계 숨김
    hidePreviewSection();
    hideGeneratedDocSection();
    hideTemplateStructureView();

    try {
        currentAnalysisResults = await readFileAndSimulateAnalysis(selectedFilesArray, selectedSummaryLevel);
        console.log("Analysis simulation complete:", currentAnalysisResults);

        if(extractedTextarea) extractedTextarea.value = currentAnalysisResults.summary || "[요약 정보 없음]";
        if(analysisInsightsPre) analysisInsightsPre.textContent = currentAnalysisResults.insights || "[분석 인사이트 없음]";

        showElement(analysisResultsSection); // Step 2 표시
        showElement(filterSection);          // Step 3 표시
        populatePurposeDropdown();          // 용도 드롭다운 채우기
        resetFilterDependents();            // 하위 필터 초기화
    } catch (error) {
        console.error("Error during analysis simulation:", error);
        alert(`분석 중 오류 발생: ${error.message}`);
        if(analysisResultsSection) analysisResultsSection.innerHTML = '<p style="color: red;">분석 처리 중 오류가 발생했습니다.</p>';
        showElement(analysisResultsSection); // 오류 메시지 표시
    } finally {
        hideElement(analysisLoading);
        // 분석 버튼은 파일이 있을 때만 다시 활성화
        if(analyzeButton && selectedFilesArray.length > 0) analyzeButton.disabled = false;
    }
}

// --- 필터 변경 핸들러 (reportWizTemplates 사용) ---
function handlePurposeChange() {
    const selectedPurpose = this.value;
    const subtypeSelect = document.getElementById('doc_subtype');
    if (!subtypeSelect) return;

    subtypeSelect.innerHTML = '<option value="">-- 선택하세요 --</option>'; // 하위 드롭다운 초기화
    resetFilterDependents(false); // 관련 UI 요소 초기화 (용도 제외)

    if (selectedPurpose && typeof reportWizTemplates !== 'undefined') {
        // 선택된 purpose에 해당하는 템플릿들 필터링
        const relevantTemplates = reportWizTemplates.filter(template => template.doc_purpose === selectedPurpose);
        // 해당 템플릿들에서 고유한 subtype 추출
        const uniqueSubtypes = [...new Set(relevantTemplates.map(template => template.doc_subtype))];

        if (uniqueSubtypes.length > 0) {
            uniqueSubtypes.forEach(subtype => {
                if (subtype) { // subtype 값이 유효한 경우에만 추가
                    const option = document.createElement('option');
                    option.value = subtype;
                    option.textContent = subtype;
                    subtypeSelect.appendChild(option);
                }
            });
            subtypeSelect.disabled = false; // subtype 드롭다운 활성화
        } else {
            subtypeSelect.disabled = true; // 해당하는 subtype 없으면 비활성화
        }
    } else {
        subtypeSelect.disabled = true; // purpose 선택 안 됐으면 비활성화
    }
    checkGenerateButtonState(); // 생성 버튼 상태 업데이트
}

// --- 문서 세부 종류 변경 핸들러 (reportWizTemplates 사용) ---
function handleSubtypeChange() {
    const purposeSelect = document.getElementById('doc_purpose');
    const selectedPurpose = purposeSelect?.value;
    const selectedSubtype = this.value;
    const outputFormatSelect = document.getElementById('output_format_select');
    const pageSpecSelect = document.getElementById('page_spec_select');

    // 출력 형식 및 페이지 규격 초기화
    if (outputFormatSelect) {
        for (let i = outputFormatSelect.options.length - 1; i > 0; i--) outputFormatSelect.remove(i);
        outputFormatSelect.value = ""; outputFormatSelect.disabled = true;
    }
    if (pageSpecSelect) { pageSpecSelect.value = ""; pageSpecSelect.disabled = true; }
    hideDetails(); hideGeneratedDocSection(); hidePreviewSection(); // 관련 섹션 숨기기

    // 선택된 purpose와 subtype에 맞는 템플릿 찾기
    if (selectedPurpose && selectedSubtype && typeof reportWizTemplates !== 'undefined') {
        const templateData = reportWizTemplates.find(template =>
            template.doc_purpose === selectedPurpose && template.doc_subtype === selectedSubtype
        );

        if (templateData) {
            displayDetails(templateData); // 상세 정보 표시 함수 호출

            // *** 오류 수정: supportedFormats 변수 선언 및 할당 ***
            const supportedFormats = templateData.supportedOutputFormats || ['PPT']; // 지원 형식 가져오기 (없으면 PPT 기본)

            // 출력 형식 드롭다운 채우기
            if (outputFormatSelect) {
                // const supportedFormats = templateData.supportedOutputFormats || ['PPT']; // 여기서 선언하면 아래에서 사용 불가
                const allFormatOptions = { // 모든 가능한 형식과 표시 이름 매핑
                    'PPT': 'PPT (프레젠테이션)', 'Word': 'Word (문서)', 'PDF': 'PDF (문서)',
                    'HTML': 'HTML (웹페이지)', 'Markdown': 'Markdown (텍스트)', 'TXT': 'TXT (일반 텍스트)',
                    'Mindmap': 'Mindmap (마인드맵 구조)', 'HWP': 'HWP (아래아한글 - 시뮬레이션)', 'Excel': 'Excel (데이터 요약)'
                };
                // *** 오류 수정: 여기서 supportedFormats 사용 ***
                supportedFormats.forEach(formatKey => {
                    if (allFormatOptions[formatKey]) { // 매핑에 있는 유효한 형식이면 옵션 추가
                        const option = document.createElement('option');
                        option.value = formatKey;
                        option.textContent = allFormatOptions[formatKey];
                        outputFormatSelect.appendChild(option);
                    }
                });
                outputFormatSelect.disabled = outputFormatSelect.options.length <= 1; // 옵션이 1개 이하면 비활성화
            }

            // 페이지 규격 드롭다운 활성화
            if (pageSpecSelect) pageSpecSelect.disabled = false;

            // 추천 출력 형식 자동 선택
            if (outputFormatSelect && supportedFormats.length > 0 && outputFormatSelect.options.length > 1) {
                 const firstSupportedFormat = supportedFormats[0];
                 if (Array.from(outputFormatSelect.options).some(opt => opt.value === firstSupportedFormat)) {
                     outputFormatSelect.value = firstSupportedFormat;
                 }
            }

        } else {
            if (outputFormatSelect) outputFormatSelect.disabled = true;
            if (pageSpecSelect) pageSpecSelect.disabled = true;
            console.warn(`Template not found for: ${selectedPurpose} - ${selectedSubtype}`);
        }
    } else {
        if (outputFormatSelect) outputFormatSelect.disabled = true;
        if (pageSpecSelect) pageSpecSelect.disabled = true;
    }
    checkGenerateButtonState(); // 생성 버튼 상태 업데이트
}

// --- Step 3 생성 버튼 상태 체크 ---
function checkGenerateButtonState() {
    // (이전과 동일)
     const generateButton = document.getElementById('generate-button');
     if(!generateButton) { console.error("#generate-button missing!"); return; }
     const purposeSelect = document.getElementById('doc_purpose');
     const subtypeSelect = document.getElementById('doc_subtype');
     const outputFormatSelect = document.getElementById('output_format_select');
     const pageSpecSelect = document.getElementById('page_spec_select');
     if (!purposeSelect || !subtypeSelect || !outputFormatSelect || !pageSpecSelect) {
         generateButton.disabled = true; return;
     }
     generateButton.disabled = !(purposeSelect.value && subtypeSelect.value && !subtypeSelect.disabled &&
                                outputFormatSelect.value && !outputFormatSelect.disabled &&
                                pageSpecSelect.value && !pageSpecSelect.disabled);
}

// --- 상세 정보 표시 함수 (인자를 templateData로 받음) ---
function displayDetails(templateData) { // 인자 이름을 exampleData -> templateData 로 변경 (명확성 위해)
    const detailsSection = document.getElementById('details-section');
    if (!detailsSection || !templateData) return;

    // setText 헬퍼 함수는 그대로 사용
    const setText = (id, text) => { const el = document.getElementById(id); if (el) el.textContent = text || 'N/A'; };

    // templateData 객체의 필드 직접 사용
    setText('target_audience', templateData.target_audience);
    setText('writing_goal', templateData.writing_goal);
    // output_format_recommend 은 supportedOutputFormats 로 대체 또는 제거 고려
    // setText('output_format_recommend', templateData.output_format?.join(', ')); // 이 필드는 새 구조에 없음
    setText('output_format_recommend', templateData.supportedOutputFormats?.join(', ') || 'N/A'); // supportedOutputFormats 사용
    setText('visual_theme', templateData.visual_theme);
    setText('layout_structure', templateData.layout_structure);
    setText('insight_focus', templateData.insight_focus?.join(', '));
    setText('visual_suggestion', templateData.visual_suggestion?.join(', '));
    setText('tone_style', templateData.tone_style);

    // 컬러 팔레트 처리 (기존 로직 유지)
    const colorPreviewBox = document.getElementById('color-preview');
    const colorPaletteSpan = document.getElementById('color_palette'); // 실제 값 표시용 span (현재 HTML에는 없음)
    if (colorPreviewBox) { // colorPaletteSpan은 없으므로 colorPreviewBox만 확인
        colorPreviewBox.innerHTML = ''; // 미리보기 초기화
        const colors = templateData.color_palette || [];
        // if (colorPaletteSpan) colorPaletteSpan.textContent = colors.join(', ') || 'N/A'; // 값이 표시될 곳이 있다면
        if (colors.length > 0) {
            colors.forEach(color => {
                const swatch = document.createElement('span');
                swatch.className = 'color-swatch';
                swatch.style.backgroundColor = color;
                swatch.title = color;
                colorPreviewBox.appendChild(swatch);
            });
        } else {
             // if (colorPaletteSpan) colorPaletteSpan.textContent = 'N/A';
             colorPreviewBox.innerHTML = '<span style="font-size: 0.9em; color: #888;">N/A</span>'; // 색상 없을 때 표시
        }
    }
    showElement(detailsSection); // 상세 정보 섹션 표시
}

// --- Step 4 -> Step 3 (옵션 수정) 핸들러 --- 
function handleEditOptionsClick() {
    console.log("handleEditOptionsClick function called."); // 로그 추가
    const filterSection = document.getElementById('filter-section');
    const previewSection = document.getElementById('preview-section');
    if (filterSection && previewSection) {
        hidePreviewSection();
        showElement(filterSection);
        console.log("Returned to Step 3.");
    } else {
        console.error("Cannot go back to Step 3: Filter or Preview section not found.");
    }
}

// --- 실제 콘텐츠 생성 함수 (인자 templateData 사용) ---
function generateRealContent(purpose, subtype, templateData, analysisResults, format, spec) {
    let title = `[${subtype}] 문서 제목`;
    const execSummary = analysisResults?.summary || "[요약 정보 없음]";
    const insightsText = analysisResults?.insights || "";
    // 키 이슈 등은 analysisResults 에서 파싱 (템플릿 데이터와 무관)
    const keyIssues = insightsText.match(/핵심 이슈: ([^\\n]+)/)?.[1]?.trim() || "N/A";
    const checkPoints = insightsText.match(/체크포인트: ([^\\n]+)/)?.[1]?.trim() || "N/A";
    const trends = insightsText.match(/최신 트렌드: ([^\\n]+)/)?.[1]?.trim() || "N/A";

    // 제목은 templateData 에서 가져옴
    if (templateData?.writing_goal) { title = templateData.writing_goal; }

    let content = "";

    if (format === 'Markdown') {
        // Markdown 생성 시 templateData 활용
        content = `# ${title}\n\n## Executive Summary\n${execSummary}\n\n## 주요 내용\n\n(Markdown 내용 생성 로직 - 필요시 templateData의 layout_structure 등 활용)\n\n## 분석 강조점\n${templateData?.insight_focus?.map(item => `- ${item}`).join('\\n') || '- N/A'}\n\n## 결론\n\n(결론 내용)\n`;

    } else if (format === 'HTML') {
        // HTML 생성 시 templateData 활용
        const colors = templateData?.color_palette || ["#000", "#333", "#007bff", "#ddd", "#f8f9fa"];
        const primaryColor = colors[0]; const secondaryColor = colors[1]; const accentColor = colors[2];
        const borderColor = colors[3]; const lightBgColor = colors[4];
        // 스타일 정의 (기존과 유사)
        const containerStyle = `font-family: sans-serif; line-height: 1.6; padding: 25px; background-color: ${lightBgColor}; border: 1px solid ${borderColor}; color: ${secondaryColor};`;
        const h1Style = `color: ${primaryColor}; border-bottom: 2px solid ${primaryColor}; padding-bottom: 10px; margin-bottom: 25px;`;
        const h2Style = `color: ${primaryColor}; margin-top: 35px; margin-bottom: 15px;`;
        const h3Style = `color: ${secondaryColor}; margin-top: 20px; margin-bottom: 10px; border-left: 3px solid ${accentColor}; padding-left: 8px;`;
        const pStyle = `margin-bottom: 10px;`;
        const ulStyle = `list-style-position: outside; padding-left: 20px; margin-bottom: 15px;`;
        const summaryBoxStyle = `background-color: #fff; padding: 15px; border: 1px solid ${borderColor}; border-left: 5px solid ${accentColor}; margin: 15px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.05);`;

        content += `<div style="${containerStyle}">`;
        content += `<h1 style="${h1Style}">${title}</h1>`;
        content += `<h2 style="${h2Style}">Executive Summary</h2><div style="${summaryBoxStyle}">${execSummary.replace(/\\n/g, '<br>')}</div>`;

        // layout_structure 활용하여 동적 섹션 생성 (예시)
        content += `<h2 style="${h2Style}">주요 내용</h2>`;
        if (templateData?.layout_structure) {
            const sections = templateData.layout_structure.split(/\\s*-\\s*|\\s*:\\s*|\\s*->\s*|\\s*→\s*|\n/);
            sections.forEach((section, index) => {
                const sectionTitle = section.trim();
                if (sectionTitle && sectionTitle.length > 1) { // 유효한 섹션 제목이면
                    // 간단히 h3와 p 태그로 구성 (더 복잡한 구조도 가능)
                    content += `<h3 style="${h3Style}">${index + 1}. ${sectionTitle}</h3>`;
                    content += `<p style="${pStyle}">(상세 내용)</p>`;
                }
            });
        } else {
             content += `<p style="${pStyle}">(주요 내용 상세)</p>`;
        }

        // 분석 강조점 추가
        if (templateData?.insight_focus && templateData.insight_focus.length > 0) {
            content += `<h2 style="${h2Style}">분석 강조점</h2><ul style="${ulStyle}">`;
            templateData.insight_focus.forEach(item => { content += `<li>${item}</li>`; });
            content += `</ul>`;
        }

        content += `<h2 style="${h2Style}">결론</h2><p style="${pStyle}">(결론 및 제언)</p>`;
        content += `</div>`;

    } else if (format === 'TXT') {
        // TXT 생성 시에도 Markdown 기반 변환 로직 사용 가능
        content = generateRealContent(purpose, subtype, templateData, analysisResults, 'Markdown', spec);
        // Markdown -> TXT 변환 로직 (괄호 수정)
        content = content.replace(/^#+\s+/gm, '').replace(/^-+\s*/gm, '').replace(/`/g, '')
                         .replace(/(\*|_){1,2}([^*_]+)(\*|_){1,2}/g, '$2').replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1') // 수정된 정규식
                         .replace(/^\s*-\s+/gm, '  * ').replace(/\n{3,}/g, '\n\n');
        content += '\n\n(TXT 형식)';
    } else {
        content = generateDummyContent(subtype, templateData, format); // 더미 생성 시 templateData 전달
    }
    return content;
}

// --- 더미 콘텐츠 생성 (인자 templateData 받도록 수정) ---
function generateDummyContent(subtype, templateData, format) {
    console.log(`Generating dummy content for ${subtype} - ${format}`);
    let content = `[${subtype} - ${format} 더미 콘텐츠]\n`;
    content += `Purpose: ${templateData?.doc_purpose || 'N/A'}\n`;
    content += `Audience: ${templateData?.target_audience || 'N/A'}\n`;
    content += `Writing Goal: ${templateData?.writing_goal || 'N/A'}\n`;
    // ... 기타 templateData 정보 활용 가능 ...
    return content;
}

// --- 템플릿 구조 보기/숨기기 (reportWizTemplates 사용) --- 
function displayTemplateStructure() {
    console.log("displayTemplateStructure function called."); // 로그 추가
    const viewDiv = document.getElementById('template-structure-view');
    if (!viewDiv) { console.error("#template-structure-view missing!"); return; }

    const isVisible = viewDiv.style.display !== 'none';
    if (isVisible) {
        hideElement(viewDiv);
        console.log("Template structure view hidden.");
        return;
    }

    console.log("Generating template structure HTML using reportWizTemplates...");
    viewDiv.innerHTML = '<h3>지원되는 템플릿 구조</h3>'; 

    // reportWizTemplates 배열 확인 및 로그 추가
    if (typeof reportWizTemplates === 'undefined' || reportWizTemplates.length === 0) {
        console.error("reportWizTemplates data is missing or empty!"); // 오류 로그 추가
        viewDiv.innerHTML += '<p style="color: red;">템플릿 데이터를 불러올 수 없습니다.</p>';
        showElement(viewDiv);
        return;
    }
    console.log(`Found ${reportWizTemplates.length} templates.`); // 템플릿 개수 로그

    try {
        const templatesByPurpose = reportWizTemplates.reduce((acc, template) => {
            const purpose = template.doc_purpose || '기타';
            if (!acc[purpose]) acc[purpose] = [];
            acc[purpose].push(template);
            return acc;
        }, {});
        for (const purpose in templatesByPurpose) {
             if (templatesByPurpose.hasOwnProperty(purpose)) {
                const purposeContainer = document.createElement('div');
                purposeContainer.style.marginBottom = '20px';
                purposeContainer.style.paddingBottom = '15px';
                purposeContainer.style.borderBottom = '1px solid #eee';
                const purposeTitle = document.createElement('h4');
                purposeTitle.textContent = `📁 ${purpose}`;
                purposeTitle.style.cssText = 'color:#1565c0; margin-top:0; margin-bottom:10px;';
                purposeContainer.appendChild(purposeTitle);
                const templatesInPurpose = templatesByPurpose[purpose];
                if (templatesInPurpose.length > 0) {
                    templatesInPurpose.forEach(template => {
                        const templateDiv = document.createElement('div');
                        templateDiv.style.cssText = 'margin-left:15px; margin-bottom:15px;';
                        const subtypeTitle = document.createElement('h5');
                        subtypeTitle.textContent = `📄 ${template.doc_subtype || '(이름 없음)'}`;
                        subtypeTitle.style.cssText = 'color:#1e88e5; margin-top:5px; margin-bottom:8px;';
                        templateDiv.appendChild(subtypeTitle);
                        const detailGrid = document.createElement('div');
                        detailGrid.style.cssText = 'display:grid; grid-template-columns:auto 1fr; gap:5px 15px; font-size:0.9em; margin-left:10px;';
                        const createDetailRow = (label, value) => {
                            if (!value || (Array.isArray(value) && value.length === 0)) value = 'N/A';
                            if (Array.isArray(value)) value = value.join(', ');
                            const labelSpan = document.createElement('span');
                            labelSpan.textContent = `${label}:`;
                            labelSpan.style.cssText = 'font-weight:500; color:#555;';
                            const valueSpan = document.createElement('span');
                            valueSpan.textContent = value;
                            detailGrid.appendChild(labelSpan);
                            detailGrid.appendChild(valueSpan);
                        };
                        createDetailRow('작성 목표', template.writing_goal);
                        createDetailRow('지원 형식', template.supportedOutputFormats);
                        createDetailRow('타겟 독자', template.target_audience);
                        createDetailRow('수정일', template.last_updated);
                        createDetailRow('출처', template.template_source);
                        templateDiv.appendChild(detailGrid);
                        purposeContainer.appendChild(templateDiv);
                    });
                }
                viewDiv.appendChild(purposeContainer);
            }
        }
    } catch (error) {
        console.error("Error during HTML generation in displayTemplateStructure:", error); // 상세 오류 로그
        viewDiv.innerHTML += '<p style="color: red;">템플릿 구조 표시에 오류 발생.</p>';
    }
    showElement(viewDiv);
    console.log("Template structure HTML generated and shown successfully."); // 성공 로그
}

// --- PPT 코드 생성 시뮬레이션 함수 (누락된 함수 추가) ---
function generatePptxCodeSimulation(purpose, subtype, analysisData) {
    console.log(`Simulating PPTX code generation for: ${purpose} - ${subtype}`);
    // 실제로는 분석 결과(analysisData)와 템플릿 정보(필요시)를 바탕으로 
    // python-pptx 라이브러리를 사용하는 Python 코드를 생성해야 함.
    let code = `
# Python code using python-pptx library (Simulation)
from pptx import Presentation
from pptx.util import Inches

# Create presentation object
prs = Presentation()

# Add Title Slide
title_slide_layout = prs.slide_layouts[0]
slide = prs.slides.add_slide(title_slide_layout)
title = slide.shapes.title
subtitle = slide.placeholders[1]

title.text = "${subtype} - ${purpose}"
subtitle.text = "Generated based on analysis data: ${analysisData?.summary?.split('\n')[0] || 'N/A'}"

# Add Content Slide (Example)
content_slide_layout = prs.slide_layouts[1]
slide = prs.slides.add_slide(content_slide_layout)
title = slide.shapes.title
content = slide.placeholders[1]

title.text = "Key Insights"
content.text = "${analysisData?.insights?.replace(/\n/g, '\n') || 'No insights available.'}"

# ... (Add more slides based on analysisData and template style) ...

# Save the presentation
# prs.save("${subtype.replace(/[^a-zA-Z0-9]/g, '_')}_presentation.pptx") 

print("PPTX Code Simulation Complete")
`;
    return code;
}

// --- Step 3 -> Step 4(미리보기) 생성 핸들러 ---
function handleGenerateClick() {
    console.log("handleGenerateClick function called.");
    const purposeSelect = document.getElementById('doc_purpose');
    const subtypeSelect = document.getElementById('doc_subtype');
    const outputFormatSelect = document.getElementById('output_format_select');
    const pageSpecSelect = document.getElementById('page_spec_select');
    const generationLoading = document.getElementById('generation-loading');
    const previewSection = document.getElementById('preview-section');
    const previewTitle = document.getElementById('preview-title');
    const previewStructure = document.getElementById('preview-structure');
    const previewSummary = document.getElementById('preview-summary');

    const selectedPurpose = purposeSelect?.value;
    const selectedSubtype = subtypeSelect?.value;
    const selectedOutputFormat = outputFormatSelect?.value;
    const selectedPageSpec = pageSpecSelect?.value;
    console.log(`Selected filters - Purpose: ${selectedPurpose}, Subtype: ${selectedSubtype}, Format: ${selectedOutputFormat}, Spec: ${selectedPageSpec}`);

    if (!selectedPurpose || !selectedSubtype || !selectedOutputFormat || !selectedPageSpec) {
        console.warn("Preview generation stopped: Not all filters selected.");
        alert('모든 필터 조건을 선택해주세요.'); return;
    }

    if (typeof reportWizTemplates === 'undefined' || reportWizTemplates.length === 0) {
         console.error("Cannot generate preview: reportWizTemplates data is missing or empty!");
         alert("템플릿 데이터를 불러올 수 없습니다.");
         return;
    }
    const templateData = reportWizTemplates.find(template =>
        template.doc_purpose === selectedPurpose && template.doc_subtype === selectedSubtype
    );
    console.log("Found template data for preview:", templateData);
    if (!templateData) {
        console.error(`Template not found for ${selectedPurpose} - ${selectedSubtype}`);
        alert("선택된 조건에 맞는 템플릿 정보를 찾을 수 없습니다."); return;
    }

    const analysisData = currentAnalysisResults || { summary: "(분석 결과 없음)", insights: "", isRealData: false };
    console.log("Using analysis data:", analysisData);

    showElement(generationLoading);
    hidePreviewSection();
    console.log("Generating preview content...");

    setTimeout(() => {
        try {
            const previewData = generatePreviewContent(selectedPurpose, selectedSubtype, templateData, analysisData);
            console.log("Generated preview data:", previewData);
            if(previewTitle) previewTitle.textContent = previewData.title;
            if(previewStructure) previewStructure.textContent = previewData.structure;
            if(previewSummary) previewSummary.textContent = previewData.summary;
            hideElement(generationLoading); showElement(previewSection);
            console.log("Preview generated and shown successfully.");
        } catch (error) {
            console.error("Error generating or displaying preview content:", error);
            hideElement(generationLoading);
            alert("미리보기 생성 중 오류가 발생했습니다.");
             if(filterSection) showElement(filterSection);
        }
    }, 500);
}

// --- 미리보기 내용 생성 (제목 로직 수정 + 하드코딩 제거) ---
function generatePreviewContent(purpose, subtype, templateData, analysisResults, format, spec) {
    console.log(`Generating preview for: ${purpose} - ${subtype}`);
    
    // 제목: doc_subtype 사용
    let title = templateData?.doc_subtype || subtype || "(제목 없음)"; 
    
    let structure = "(목차 정보 없음)";
    let summary = "(요약 정보 없음)";

    if (templateData) {
        // 구조 생성 로직 (기존과 동일)
        if (templateData.layout_structure) {
            structure = templateData.layout_structure.split(/\s*-\s*|\s*:\s*|\s*->\s*|\s*→\s*|\n/)
                                       .map(item => `- ${item.trim()}`)
                                       .filter(item => item.length > 3)
                                       .join('\n');
            if (!structure || structure.trim() === '-') structure = "- 주요 내용 1\n- 주요 내용 2\n- 결론";
        } else {
            structure = "- 주요 내용 1\n- 주요 내용 2\n- 결론";
        }

        // 요약 생성 로직 (하드코딩 제거 및 동적 내용 생성)
        let insightPreview = templateData.insight_focus ? `주요 고려사항: ${templateData.insight_focus.slice(0, 2).join(', ')} 등` : '';
        
        // isRealData를 사용하여 실제 분석 결과가 있는지 확인
        if (analysisResults?.summary && analysisResults.isRealData) {
            // 실제 분석 요약의 첫 줄 사용 (하드코딩된 샘플 텍스트 제거)
            summary = analysisResults.summary.split('\n')[0]; 
            // 만약 분석 결과 요약이 '[파일이름] 분석 결과 (수준 요약):' 형식이라면, 해당 부분 제거 시도
            summary = summary.replace(/^\s*\[.*\]\s*분석 결과\s*\(.*\):\s*/, '').trim(); 
            summary = summary.substring(0, 150) + (summary.length > 150 ? "..." : ""); // 길이 제한
            summary += "\n"; // 줄바꿈 추가
        } else {
            // 분석 결과 없거나 실제 데이터 아니면, 템플릿 정보 기반 일반 문구 생성
            summary = `[${templateData.doc_subtype || '문서'}]는 ${templateData.target_audience || '대상'}을 위해 '${templateData.writing_goal || subtype}' 목적으로 생성될 예정입니다.\n`;
        }
        summary += insightPreview; // 분석 강조점 추가
    } else {
        console.warn("generatePreviewContent: templateData is missing!");
        summary = "템플릿 정보를 불러올 수 없어 요약 미리보기를 생성할 수 없습니다."; // 오류 메시지 명확화
    }

    // 길이 제한 (기존과 동일)
    if (structure.length > 500) structure = structure.substring(0, 500) + "\n...";
    if (summary.length > 500) summary = summary.substring(0, 500) + "...";

    return { title, structure, summary };
}

// --- Step 4 -> Step 5 (최종 문서 생성) 핸들러 --- 
function handleFinalGenerateClick() {
    console.log("handleFinalGenerateClick function called.");
    const previewSection = document.getElementById('preview-section');
    const generatedDocSection = document.getElementById('generated-doc-section');
    const generatedContentTextarea = document.getElementById('generated-content');
    const generationLoading = document.getElementById('generation-loading'); // 로딩 요소 추가
    const downloadButton = document.getElementById('download-button'); // 다운로드 버튼
    const copyButton = document.getElementById('copy-button'); // 복사 버튼

    // Step 3에서 선택된 값들을 다시 가져옵니다. (상태 유지를 위해 전역 변수 사용 또는 다시 읽기)
    const purposeSelect = document.getElementById('doc_purpose');
    const subtypeSelect = document.getElementById('doc_subtype');
    const outputFormatSelect = document.getElementById('output_format_select');
    const pageSpecSelect = document.getElementById('page_spec_select');

    const selectedPurpose = purposeSelect?.value;
    const selectedSubtype = subtypeSelect?.value;
    const selectedOutputFormat = outputFormatSelect?.value;
    const selectedPageSpec = pageSpecSelect?.value;

    if (!selectedPurpose || !selectedSubtype || !selectedOutputFormat || !selectedPageSpec) {
        alert("문서 생성을 위한 필터 정보가 부족합니다. 이전 단계로 돌아가 다시 선택해주세요.");
        return;
    }

    // 해당 템플릿 데이터 찾기
    const templateData = reportWizTemplates.find(template =>
        template.doc_purpose === selectedPurpose && template.doc_subtype === selectedSubtype
    );

    if (!templateData) {
        alert("템플릿 정보를 찾을 수 없습니다. 이전 단계로 돌아가 다시 선택해주세요.");
        return;
    }

    // 분석 결과 사용
    const analysisData = currentAnalysisResults || { summary: "(분석 결과 없음)", insights: "", isRealData: false };

    showElement(generationLoading);
    hidePreviewSection(); // Step 4 숨김
    hideGeneratedDocSection(); // 이전 생성 결과 숨김

    console.log(`Generating final document - Format: ${selectedOutputFormat}, Spec: ${selectedPageSpec}`);

    // 비동기 처리 (시뮬레이션)
    setTimeout(() => {
        try {
            let generatedContent = "";
            // 출력 형식에 따라 다른 생성 함수 호출
            if (selectedOutputFormat === 'PPT' || selectedOutputFormat === 'HWP' || selectedOutputFormat === 'Excel') {
                // 코드 생성 시뮬레이션 (Python 코드 등)
                generatedContent = generatePptxCodeSimulation(selectedPurpose, selectedSubtype, analysisData);
                if(generatedContentTextarea) generatedContentTextarea.value = generatedContent;
                if(downloadButton) downloadButton.style.display = 'none'; // 코드 생성 시 다운로드 버튼 숨김
                if(copyButton) copyButton.style.display = 'inline-block'; // 복사 버튼 표시
                 // 안내 메시지 추가
                const formatInfo = document.createElement('p');
                formatInfo.style.cssText = 'font-size: 0.9em; color: #666; margin-top: 10px; padding: 10px; background-color: #f8f9fa; border: 1px solid #dee2e6; border-radius: 4px;';
                if (selectedOutputFormat === 'PPT') {
                    formatInfo.textContent = 'Info: PPT 생성을 위한 Python 코드입니다. 실제 PPT 파일은 이 코드를 실행하여 생성해야 합니다.';
                } else if (selectedOutputFormat === 'HWP') {
                    formatInfo.textContent = 'Info: HWP 생성을 위한 코드 시뮬레이션입니다. 실제 HWP 파일 생성 기능은 준비 중입니다.';
                } else if (selectedOutputFormat === 'Excel') {
                    formatInfo.textContent = 'Info: Excel 데이터 요약 생성을 위한 코드 시뮬레이션입니다. 실제 Excel 파일 생성 기능은 준비 중입니다.';
                }
                // 기존 안내 메시지가 있다면 제거 후 추가
                const existingInfo = generatedDocSection?.querySelector('p');
                if(existingInfo && existingInfo.textContent.startsWith('Info:')) existingInfo.remove();
                generatedDocSection?.insertBefore(formatInfo, generatedContentTextarea?.nextSibling);

            } else {
                // 실제 콘텐츠 생성 (HTML, Markdown, TXT 등)
                generatedContent = generateRealContent(selectedPurpose, selectedSubtype, templateData, analysisData, selectedOutputFormat, selectedPageSpec);
                if(generatedContentTextarea) generatedContentTextarea.value = generatedContent;
                if(downloadButton) downloadButton.style.display = 'inline-block'; // 콘텐츠 생성 시 다운로드 버튼 표시
                if(copyButton) copyButton.style.display = 'inline-block'; // 복사 버튼도 표시
                // 이전 안내 메시지 제거
                const existingInfo = generatedDocSection?.querySelector('p');
                if(existingInfo && existingInfo.textContent.startsWith('Info:')) existingInfo.remove();
            }

            hideElement(generationLoading);
            showElement(generatedDocSection); // Step 5 표시
            console.log("Final document generated successfully.");

        } catch (error) {
            console.error("Error during final document generation:", error);
            hideElement(generationLoading);
            alert(`최종 문서 생성 중 오류 발생: ${error.message}`);
            // 오류 발생 시 이전 단계(미리보기)로 돌아가기 (선택적)
            // showElement(previewSection);
        }
    }, 500); // 실제로는 더 오래 걸릴 수 있음
}

// ==========================================================================
// ======================= DOM 로드 후 실행 (리스너 재확인) =================
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded. Setting up listeners...");

    // --- 요소 참조 (기존과 동일) ---
    const fileInput = document.getElementById('file-input');
    const analyzeButton = document.getElementById('analyze-button');
    const purposeSelect = document.getElementById('doc_purpose');
    const subtypeSelect = document.getElementById('doc_subtype');
    const outputFormatSelect = document.getElementById('output_format_select');
    const pageSpecSelect = document.getElementById('page_spec_select');
    const generateButton = document.getElementById('generate-button'); // Step 3 -> 4 버튼
    const finalGenerateButton = document.getElementById('final-generate-button'); // Step 4 -> 5 버튼
    const editOptionsButton = document.getElementById('edit-options-button'); // Step 4 -> 3 버튼
    const toggleTemplateButton = document.getElementById('toggle-template-view-button'); // 템플릿 보기 버튼

    // --- 이벤트 리스너 설정 (모든 버튼 연결 확인) ---
    if (fileInput) fileInput.addEventListener('change', handleFileSelect);
    else console.error("#file-input missing!");

    if (analyzeButton) analyzeButton.addEventListener('click', handleAnalysis);
    else console.error("#analyze-button missing!");

    if (purposeSelect) purposeSelect.addEventListener('change', handlePurposeChange);
    else console.error("#doc_purpose missing!");

    if (subtypeSelect) subtypeSelect.addEventListener('change', handleSubtypeChange);
    else console.error("#doc_subtype missing!");

    if (outputFormatSelect) outputFormatSelect.addEventListener('change', checkGenerateButtonState);
    else console.error("#output_format_select missing!");

    if (pageSpecSelect) pageSpecSelect.addEventListener('change', checkGenerateButtonState);
    else console.error("#page_spec_select missing!");

    // Step 3 -> 4 (미리보기 생성) 버튼
    if (generateButton) {
         console.log("Attaching listener to #generate-button (Preview)");
         generateButton.addEventListener('click', handleGenerateClick);
    } else { 
         console.error("#generate-button missing!"); 
    }

    // Step 4 -> 5 (최종 생성) 버튼
    if (finalGenerateButton) {
        console.log("Attaching listener to #final-generate-button");
        finalGenerateButton.addEventListener('click', handleFinalGenerateClick);
    } else { 
        console.error("#final-generate-button missing!"); 
    }

    // Step 4 -> 3 (옵션 수정) 버튼
    if (editOptionsButton) {
        console.log("Attaching listener to #edit-options-button");
        editOptionsButton.addEventListener('click', handleEditOptionsClick);
    } else { 
        console.error("#edit-options-button missing!"); 
    }

    // 템플릿 보기/숨기기 버튼
    if (toggleTemplateButton) {
        console.log("Attaching listener to #toggle-template-view-button");
        toggleTemplateButton.addEventListener('click', displayTemplateStructure);
    } else { 
        console.error("#toggle-template-view-button missing!"); 
    }

    // 초기 UI 설정
    initializeUI();
    console.log("Initialization and listeners setup complete.");
});