// ==========================================================================
// ========================== 전역 변수 선언 ==============================
// ==========================================================================
let selectedFilesArray = []; // 선택된 파일 목록 관리 배열
let currentAnalysisResults = { summary: null, insights: null, isRealData: false }; // 분석 결과 저장

// ==========================================================================
// ========================== 함수 정의 영역 ==============================
// ==========================================================================
// (모든 함수 정의를 이 영역에 배치하여 호출 전에 정의되도록 함)

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


// --- 필터 의존성 초기화 ---
function resetFilterDependents(resetPurpose = true) {
    const purposeSelect = document.getElementById('doc_purpose');
    const subtypeSelect = document.getElementById('doc_subtype');
    const outputFormatSelect = document.getElementById('output_format_select');
    const pageSpecSelect = document.getElementById('page_spec_select');
    const generateButton = document.getElementById('generate-button');

    if (resetPurpose && purposeSelect) purposeSelect.value = "";
    if (subtypeSelect) {
        subtypeSelect.innerHTML = '<option value="">-- 문서 용도를 먼저 선택하세요 --</option>';
        subtypeSelect.disabled = true;
    }
    if (outputFormatSelect) {
        outputFormatSelect.value = "";
        outputFormatSelect.disabled = true;
    }
    if (pageSpecSelect) {
        pageSpecSelect.value = "";
        pageSpecSelect.disabled = true;
    }
    hideDetails();
    if (generateButton) generateButton.disabled = true;
    // 생성 결과 숨기는 것은 resetSubsequentStepsUI에서 처리
}

// --- 하위 단계 UI 전체 초기화 함수 ---
function resetSubsequentStepsUI() {
    console.log("Resetting subsequent UI steps...");
    hideAnalysisResults();
    hideFilterSection();
    hideGeneratedDocSection();

    // Clear analysis data
    currentAnalysisResults = { summary: null, insights: null, isRealData: false };
    const extractedTextarea = document.getElementById('extracted-text');
    const analysisInsightsPre = document.getElementById('analysis-insights');
    if(extractedTextarea) extractedTextarea.value = "";
    if(analysisInsightsPre) analysisInsightsPre.textContent = "";

    resetFilterDependents(); // 필터 상태 초기화 포함
}

// --- 초기 UI 설정 함수 ---
function initializeUI() {
    console.log("Initializing UI...");
    const fileListDiv = document.getElementById('file-list');
    const analyzeButton = document.getElementById('analyze-button');

    if (fileListDiv) fileListDiv.innerHTML = '<span style="color: #888;">선택된 파일 없음</span>';
    if (analyzeButton) analyzeButton.disabled = true;
    selectedFilesArray = [];
    resetSubsequentStepsUI();
    console.log("UI Initialization complete.");
}


// --- **** populatePurposeDropdown 함수 정의 **** ---
function populatePurposeDropdown() {
    const purposeSelect = document.getElementById('doc_purpose');
    console.log("Populating purpose dropdown...");
    if (!purposeSelect) {
        console.error("populatePurposeDropdown: #doc_purpose element not found!");
        return;
    }
    purposeSelect.innerHTML = '<option value="">-- 선택하세요 --</option>';
    // reportWizData가 로드되었는지 확인 (data.js)
    if (typeof reportWizData !== 'undefined') {
         for (const purpose in reportWizData) {
             if (reportWizData.hasOwnProperty(purpose)) {
                 const option = document.createElement('option');
                 option.value = purpose;
                 option.textContent = purpose;
                 purposeSelect.appendChild(option);
             }
         }
         console.log("Purpose dropdown populated.");
    } else {
        console.error("ReportWizData is not loaded. Cannot populate purpose dropdown.");
        purposeSelect.innerHTML = '<option value="">데이터 오류</option>';
    }
    // 주의: 여기서 resetFilterDependents(false)를 호출하면 무한 루프 가능성 있음
    // -> handleAnalysis 완료 후 호출되는 것으로 충분함.
}


// --- 파일 읽기 함수 ---
function readFileAsText(file) {
     return new Promise((resolve, reject) => {
        if (!file) return reject(new Error("파일 객체 null"));
        const reader = new FileReader();
        reader.onload = (event) => resolve(event.target?.result); // Optional chaining
        reader.onerror = (error) => reject(error);
        if (/\.(txt|md)$/i.test(file.name)) { reader.readAsText(file, 'UTF-8'); }
        else { reject(new Error(`읽기 지원 안함: ${file.name}`)); }
    });
}

// --- 파일 읽고 분석 시뮬레이션 (비동기) ---
async function readFileAndSimulateAnalysis(files, selectedSummaryLevel) {
    // (이전과 동일)
    let processedText = "";
    let fileReadSuccess = false;
    const fileNames = files.map(f => f.name);
    const readableFiles = files.filter(file => /\.(txt|md)$/i.test(file.name));
    if (readableFiles.length > 0) {
        const fileToRead = readableFiles[0];
        try { processedText = await readFileAsText(fileToRead); fileReadSuccess = true; }
        catch (error) { console.error(`File read error (${fileToRead.name}):`, error); processedText = `[Error reading file: ${fileToRead.name}]`; }
    } else if (files.length > 0) {
        const firstFileName = files[0]?.name || '선택된 파일';
        processedText = `[Notice: Cannot read content of ${firstFileName} directly. Simulating analysis based on basic info.]`;
    } else { processedText = "[Analysis Error: No file info]"; }
    let simulatedSummary = `[Files: ${fileNames.join(', ')}] Analysis Result (Simulation)\n\nSummary Level (${selectedSummaryLevel}):\n`;
    const previewText = fileReadSuccess ? processedText.substring(0, 300) + (processedText.length > 300 ? '...' : '') : '(Basic Info)';
    if (selectedSummaryLevel === 'High') simulatedSummary += `Core Summary: ${previewText.substring(0, 100)}... (Simulated extraction)`;
    else if (selectedSummaryLevel === 'Medium') simulatedSummary += `Medium Summary: ${previewText.substring(0, 200)}... (Simulated summarization)`;
    else simulatedSummary += `Detailed Summary:\n${previewText}\n(Simulated detail summary)`;
    let simulatedInsights = `Key Issues:\n- ${fileReadSuccess ? 'Issue based on text 1' : 'General issue 1'}\n\nPotential Contradictions:\n- ${fileReadSuccess ? 'Contradiction found (simulated)' : 'Contradiction check needed'}\n\nSolution Proposals:\n- ${fileReadSuccess ? 'Solution based on text' : 'Consider general solutions'}`;
    return { summary: simulatedSummary, insights: simulatedInsights, isRealData: fileReadSuccess };
}

// --- 파일 목록 UI 업데이트 함수 ---
function updateFileListUI() {
    // (이전과 동일)
    const fileListDiv = document.getElementById('file-list');
    const analyzeButton = document.getElementById('analyze-button');
    if (!fileListDiv) return;
    console.log("Updating file list UI...");
    fileListDiv.innerHTML = ""; // Clear previous content

    if (selectedFilesArray.length === 0) {
        fileListDiv.innerHTML = '<span style="color: #888;">선택된 파일 없음</span>';
         if(analyzeButton) analyzeButton.disabled = true;
        // 파일이 없을 때 하위 단계 숨김 추가
        resetSubsequentStepsUI();
        return;
    }

    // 파일 개수 표시 추가
    const countSpan = document.createElement('span');
    countSpan.textContent = `선택된 파일 (${selectedFilesArray.length}개):`;
    countSpan.style.fontWeight = 'bold';
    countSpan.style.display = 'block';
    countSpan.style.marginBottom = '10px';
    fileListDiv.appendChild(countSpan);

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
            deleteButton.dataset.index = index;
            deleteButton.addEventListener('click', handleDeleteFile);
            li.appendChild(deleteButton);
            ul.appendChild(li);
        }
    });
    fileListDiv.appendChild(ul);
    if (selectedFilesArray.some(file => file?.name?.toLowerCase().endsWith('.hwp'))) {
         const hwpNotice = document.createElement('small');
         hwpNotice.style.cssText = 'color: orange; display: block; margin-top: 5px;';
         hwpNotice.textContent = '참고: HWP 파일 분석은 향후 지원될 예정입니다.';
         fileListDiv.appendChild(hwpNotice);
    }
    console.log("File list UI updated.");
    if(analyzeButton) analyzeButton.disabled = false; // 파일 목록 업데이트 후 버튼 활성화

    // 파일 선택 시, 분석 단계 이후 단계가 보이지 않도록 초기화 (선택 변경 시 재분석 필요)
    hideAnalysisResults();
    hideFilterSection();
    hideGeneratedDocSection();
    resetFilterDependents(); // 필터 선택 초기화
}

// --- 파일 삭제 처리 함수 ---
function handleDeleteFile(event) {
    // (이전과 동일)
     const indexToRemove = parseInt(event.target.dataset.index, 10);
    console.log(`Delete button clicked for index: ${indexToRemove}`);
    if (!isNaN(indexToRemove) && indexToRemove >= 0 && indexToRemove < selectedFilesArray.length) {
        const removedFileName = selectedFilesArray[indexToRemove].name;
        selectedFilesArray.splice(indexToRemove, 1);
        console.log(`Removed file: ${removedFileName}. Remaining files: ${selectedFilesArray.length}`);
        updateFileListUI(); // Refresh UI
        const analyzeButton = document.getElementById('analyze-button');
        if (analyzeButton && selectedFilesArray.length === 0) {
            analyzeButton.disabled = true;
            console.log("All files removed, analyze button disabled.");
        }
        resetSubsequentStepsUI();
    } else {
        console.error("Invalid index for file deletion:", indexToRemove);
    }
}

// --- 필터 변경 핸들러 함수들 ---
function handlePurposeChange() {
    // (이전과 동일)
     const selectedPurpose = this.value;
    const subtypeSelect = document.getElementById('doc_subtype');
    if (!subtypeSelect) return;
    subtypeSelect.innerHTML = '<option value="">-- 선택하세요 --</option>';
    resetFilterDependents(false);
    if (selectedPurpose && typeof reportWizData !== 'undefined' && reportWizData[selectedPurpose]) {
        const subtypes = reportWizData[selectedPurpose].examples;
        if (subtypes && subtypes.length > 0) {
            subtypes.forEach(example => {
                const option = document.createElement('option');
                option.value = example.doc_subtype;
                option.textContent = example.doc_subtype;
                subtypeSelect.appendChild(option);
            });
            subtypeSelect.disabled = false;
        } else {
             subtypeSelect.innerHTML = '<option value="">-- 해당 용도 하위 종류 없음 --</option>';
             subtypeSelect.disabled = true;
        }
    } else {
         subtypeSelect.disabled = true;
    }
}

function handleSubtypeChange() {
    // (이전과 동일)
    const purposeSelect = document.getElementById('doc_purpose');
    const selectedPurpose = purposeSelect?.value;
    const selectedSubtype = this.value;
    const outputFormatSelect = document.getElementById('output_format_select');
    const pageSpecSelect = document.getElementById('page_spec_select');
    const generateButton = document.getElementById('generate-button');

    if(outputFormatSelect) { outputFormatSelect.value = ""; outputFormatSelect.disabled = true; }
    if(pageSpecSelect) { pageSpecSelect.value = ""; pageSpecSelect.disabled = true; }
    hideDetails();
    if(generateButton) generateButton.disabled = true;
    hideGeneratedDocSection();

    if (selectedPurpose && selectedSubtype && typeof reportWizData !== 'undefined' && reportWizData[selectedPurpose]) {
        const exampleData = reportWizData[selectedPurpose].examples.find(ex => ex.doc_subtype === selectedSubtype);
        if (exampleData) {
            displayDetails(exampleData);
            if(outputFormatSelect) outputFormatSelect.disabled = false;
            if(pageSpecSelect) pageSpecSelect.disabled = false;
            const recommendedFormat = exampleData.output_format?.[0];
            const formatOption = (recommendedFormat && outputFormatSelect) ? outputFormatSelect.querySelector(`option[value="${recommendedFormat}"]`) : null;
            if(formatOption) outputFormatSelect.value = recommendedFormat;
            checkGenerateButtonState();
        }
    }
}

function checkGenerateButtonState() {
    // (이전과 동일)
     const generateButton = document.getElementById('generate-button');
     if(!generateButton) return;
     const purposeSelect = document.getElementById('doc_purpose');
     const subtypeSelect = document.getElementById('doc_subtype');
     const outputFormatSelect = document.getElementById('output_format_select');
     const pageSpecSelect = document.getElementById('page_spec_select');
     const purposeSelected = purposeSelect?.value !== "";
     const subtypeSelected = subtypeSelect?.value !== "" && !subtypeSelect?.disabled;
     const formatSelected = outputFormatSelect?.value !== "" && !outputFormatSelect?.disabled;
     const specSelected = pageSpecSelect?.value !== "" && !pageSpecSelect?.disabled;
     generateButton.disabled = !(purposeSelected && subtypeSelected && formatSelected && specSelected);
}

// --- 생성 버튼 클릭 핸들러 ---
function handleGenerateClick() {
    // (이전과 동일)
     const purposeSelect = document.getElementById('doc_purpose');
     const subtypeSelect = document.getElementById('doc_subtype');
     const outputFormatSelect = document.getElementById('output_format_select');
     const pageSpecSelect = document.getElementById('page_spec_select');
     const generateButton = document.getElementById('generate-button');
     const generationLoading = document.getElementById('generation-loading');
     const generatedDocSection = document.getElementById('generated-doc-section');
     const generatedDocTitle = document.getElementById('generated-doc-title');
     const generatedContentTextarea = document.getElementById('generated-content');
     const simulationNotice = document.getElementById('simulation-notice');

    const selectedPurpose = purposeSelect?.value;
    const selectedSubtype = subtypeSelect?.value;
    const selectedOutputFormat = outputFormatSelect?.value;
    const selectedPageSpec = pageSpecSelect?.value;

    if (!selectedPurpose || !selectedSubtype || !selectedOutputFormat || !selectedPageSpec) { alert('모든 필터 조건을 선택해주세요.'); return; }
    const styleData = reportWizData[selectedPurpose]?.examples.find(ex => ex.doc_subtype === selectedSubtype);
    if (!styleData) { alert("스타일 정보를 찾을 수 없습니다."); return; }
    if (!currentAnalysisResults.summary || !currentAnalysisResults.insights) { alert("파일 분석 결과가 없습니다."); return; }

    const finalPrompt = constructMasterPrompt(styleData, currentAnalysisResults, selectedPurpose, selectedSubtype, selectedOutputFormat, selectedPageSpec, currentAnalysisResults.isRealData);
    console.log("--- Generated Master Prompt ---"); console.log(finalPrompt);
    const promptSnippet = finalPrompt.substring(0, 200) + "...";

    showElement(generationLoading);
    if(generateButton) generateButton.disabled = true;
    hideElement(generatedDocSection);

    setTimeout(() => {
        if(generatedDocTitle) generatedDocTitle.textContent = `생성된 문서: ${selectedSubtype} (AI 응답 시뮬레이션 - ${selectedOutputFormat}, ${selectedPageSpec})`;
        let generatedContent = "";
        let notice = `참고: AI 응답 시뮬레이션 결과 (형식: ${selectedOutputFormat})`;
        let downloadButtonHTML = '';
         try {
             generatedContent = generateRealContent(selectedPurpose, selectedSubtype, styleData, currentAnalysisResults, selectedOutputFormat, selectedPageSpec);
             notice += currentAnalysisResults.isRealData ? " (업로드 파일 기반)" : " (기본 정보 기반)";
         } catch (e) {
             console.error("Content simulation error:", e);
             generatedContent = generateDummyContent(selectedSubtype, styleData, selectedOutputFormat);
             notice = `참고: 내용 생성 오류. 더미 표시. (형식: ${selectedOutputFormat})`;
         }
        generatedContent = `/* --- 프롬프트 요약 ---\n${promptSnippet}\n--- */\n\n` + generatedContent;
        if(generatedContentTextarea) generatedContentTextarea.value = generatedContent;
        const downloadableFormats = ['Markdown', 'TXT', 'HTML'];
        const fileExtensionMap = { 'Markdown': 'md', 'TXT': 'txt', 'HTML': 'html' };
        if (downloadableFormats.includes(selectedOutputFormat)) {
            const extension = fileExtensionMap[selectedOutputFormat];
            const filename = `ReportWiz_${selectedPurpose}_${selectedSubtype.replace(/[^a-zA-Z0-9]/g, '_')}_${Date.now()}.${extension}`;
            downloadButtonHTML = `<br><button class="button download-button" data-filename="${filename}" data-format="${selectedOutputFormat}" style="margin-top: 15px;">${selectedOutputFormat} 파일 다운로드</button>`;
            notice += ` ${selectedOutputFormat} 파일 다운로드 가능.`;
        } else {
             downloadButtonHTML = `<br><button class="button" disabled style="margin-top: 15px; background-color: #6c757d;">${selectedOutputFormat}로 다운로드 (준비 중)</button>`;
             notice += ` ${selectedOutputFormat} 다운로드 미지원.`;
        }
        if(simulationNotice) simulationNotice.innerHTML = notice + downloadButtonHTML;
        const downloadButton = simulationNotice?.querySelector('.download-button');
        if (downloadButton) {
            downloadButton.replaceWith(downloadButton.cloneNode(true));
            simulationNotice.querySelector('.download-button')?.addEventListener('click', handleDownload);
        }
        hideElement(generationLoading);
        showElement(generatedDocSection);
        if(generateButton) generateButton.disabled = false;
    }, 1500);
}

// --- 다운로드 핸들러 ---
function handleDownload(event) {
    // (이전과 동일)
    const button = event.target;
    const filename = button.dataset.filename;
    const format = button.dataset.format;
    const contentEl = document.getElementById('generated-content');
    const content = contentEl?.value;
    if (!content || !filename || !format) { alert("다운로드 정보 부족"); return; }
    let mimeType = 'text/plain';
    if (format === 'Markdown') mimeType = 'text/markdown';
    else if (format === 'HTML') mimeType = 'text/html';
    try {
        const blob = new Blob([content], { type: `${mimeType};charset=utf-8` });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.href = url; link.download = filename;
        document.body.appendChild(link); link.click(); document.body.removeChild(link);
        URL.revokeObjectURL(url);
    } catch (error) { console.error("Download failed:", error); alert("다운로드 오류 발생."); }
}

// --- 나머지 Helper Functions ---
function constructMasterPrompt(styleData, analysisResults, purpose, subtype, outputFormat, pageSpec, isRealData) { /* ... 이전과 동일 ... */ }
function generateRealContent(purpose, subtype, styleData, analysisResults, format, spec) { /* ... 이전과 동일 ... */ }
function generateDummyContent(subtype, styleData, format) { /* ... 이전과 동일 ... */ }
function displayDetails(data) { /* ... 이전과 동일 ... */ }
function resetFilterDependents(resetPurpose = true) { /* ... 이전과 동일 ... */ }
function hideGeneratedDocSection() { /* ... 이전과 동일 ... */ }
function hideAnalysisResults() { /* ... 이전과 동일 ... */ }
function isValidColor(strColor) { /* ... 이전과 동일 ... */ }


// --- *** 여기에 이전 답변의 Helper 함수 정의들을 붙여넣으세요 *** ---
// constructMasterPrompt, generateRealContent, generateDummyContent,
// displayDetails, resetFilterDependents, isValidColor 등...

// constructMasterPrompt 함수 (재확인)
function constructMasterPrompt(styleData, analysisResults, purpose, subtype, outputFormat, pageSpec, isRealData) {
    let prompt = `# SYSTEM: 지능형 문서 생성 어시스턴트 역할 수행.\n\n`;
    prompt += `# == 입력 데이터 및 분석 컨텍스트 ==\n`;
    prompt += `# 1. 원문 분석 결과 (Provided by Report Wizard)\n`;
    prompt += `    * 분석 기반: ${isRealData ? '업로드된 TXT/MD 파일' : '기본 정보 (파일 읽기 불가)'}\n`;
    prompt += `    * 전체 원문 요약 (Summary Level: ${document.querySelector('input[name="summary_level"]:checked')?.value || 'Medium'}):\n      ${analysisResults.summary || '[요약 정보 없음]'}\n`;
    prompt += `    * 주요 분석 인사이트:\n${analysisResults.insights || '[분석 인사이트 없음]'}\n\n`;
    prompt += `# == 문서 생성 요구 명세 ==\n`;
    prompt += `# 1. 문서 기본 정보\n`;
    prompt += `    * 생성 문서 유형: ${purpose}\n`;
    prompt += `    * 구체적 용도/세부 유형: ${subtype}\n`;
    prompt += `    * 대상 독자: ${styleData.target_audience || '지정 안됨'}\n`;
    prompt += `    * 문서의 핵심 주제/제목: ${subtype} (자동 제안)\n`;
    prompt += `    * 문서의 핵심 목표/메시지: ${styleData.writing_goal || '지정 안됨'}\n\n`;
    prompt += `# 2. 내용 구성 및 구조\n`;
    prompt += `    * 분석 인사이트 활용 방향: 주요 분석 인사이트를 논리적으로 통합하고 활용. 특히 [${styleData.insight_focus ? styleData.insight_focus.join(', ') : '핵심 내용'}] 강조.\n`;
    prompt += `    * 필수 포함 섹션/요구 개요: ${styleData.layout_structure || '표준 구조 사용'}\n`;
    prompt += `    * 데이터 및 정보 표현: 명확하게 제시하고, 필요시 표/목록 활용. 다음 시각 자료 제안: [${styleData.visual_suggestion ? styleData.visual_suggestion.join(', ') : '적절한 시각화'}]\n\n`;
    prompt += `# 3. 출력 형식 및 시각 스타일\n`;
    prompt += `    * 최종 출력 형식: ${outputFormat}\n`;
    prompt += `    * 시각 디자인 테마: ${styleData.visual_theme || '기본 테마'} (${styleData.color_palette ? styleData.color_palette.join(', ') : '기본 색상'})\n`;
    prompt += `    * 레이아웃 기본 구조: ${styleData.layout_structure || '기본 레이아웃'}\n`;
    prompt += `    * 자료 형식/비율: ${pageSpec}\n\n`;
    prompt += `# 4. 언어 및 어조\n`;
    prompt += `    * 주 사용 언어: 한국어\n`;
    prompt += `    * 어조 및 문체: ${styleData.tone_style || '기본'}\n\n`;
    prompt += `# == 최종 지시 및 제약 사항 ==\n`;
    prompt += `1. 핵심 임무: 분석 결과와 요구 명세를 통합하여 논리적이고 완결성 있는 문서 초안 생성.\n`;
    prompt += `2. 가치 창출: 단순 요약을 넘어 인사이트 재가공, 해결 방안 구체화.\n`;
    prompt += `3. 형식 준수: ${outputFormat} 형식에 최적화된 구조와 스타일로 제시.\n`;
    prompt += `4. 명료성/가독성: 쉽게 이해하도록 작성, 적절한 구조화.\n`;
    prompt += `5. 제약 조건: 표절 금지, 사실 확인 필요, 개인정보 보호.\n\n`;
    prompt += `# == ${outputFormat} 형식으로 문서 생성 시작 ==`;
    return prompt;
}

// generateRealContent 함수 (재확인)
 function generateRealContent(purpose, subtype, styleData, analysisResults, format, spec) {
    const summaryText = analysisResults.summary || "[분석 요약 정보 없음]";
    const insightsText = analysisResults.insights || "[분석 인사이트 정보 없음]";
    const getInsight = (regex) => {
        const match = insightsText.match(regex);
        return match ? match[1].split('\n')[0].trim() : null;
    };
    let content = "";
    if (format === 'PPT') {
        content += `---\nslide_title: ${subtype} (Title Slide)\n---\n# ${subtype}\n\n* 기반 분석: ${currentAnalysisResults.isRealData ? '업로드 파일 내용' : '기본 정보'}\n\n`;
         if (purpose === "보고서" && subtype === "프로젝트 진행 상황 보고서") {
              content += `---\nslide_title: 개요\n---\n## 프로젝트 개요\n* 목표: ${styleData.writing_goal || '-'}\n* 현황: ${getInsight(/핵심 과제:\s*-\s*(.*)/) || '주요 과제 해결'} 단계\n\n`;
              content += `---\nslide_title: 진행 상황\n---\n## 주요 진행 상황\n* 마일스톤 1: 완료\n* 마일스톤 2: 진행 중 (80%)\n\n`;
         } else if (purpose === "제안서" && subtype === "솔루션/제품 제안서") {
             content += `---\nslide_title: 문제 정의\n---\n## 고객 문제 정의\n* 문제점...\n\n`;
             content += `---\nslide_title: 제안 솔루션\n---\n## 제안 솔루션\n* ReportWiz...\n\n`;
         } else { content += `---\nslide_title: 주요 내용\n---\n[PPT 내용 시뮬레이션]\n`; }
    } else if (format === 'Markdown' || format === 'TXT') {
         content += `## ${subtype}\n\n**기반 데이터:** ${currentAnalysisResults.isRealData ? '업로드된 TXT/MD 파일' : '기본 정보'}\n\n**분석 요약:**\n${summaryText.substring(0, 200)}...\n\n**주요 내용:**\n[${subtype} 상세 내용 시뮬레이션]\n`;
         if(format === 'TXT') content = content.replace(/##? /g, '').replace(/\*\*/g, '').replace(/\* /g, '  - ');
    } else if (format === 'HTML') {
        content += `<h1>${subtype}</h1><p><strong>기반 데이터:</strong> ${currentAnalysisResults.isRealData ? '업로드 파일' : '기본 정보'}</p>`;
        content += `<h2>분석 요약</h2><p>${summaryText.substring(0, 200).replace(/\n/g, '<br>')}</p>`;
        content += `<h2>주요 내용</h2><p>[HTML 내용 시뮬레이션]</p>`;
    } else if (format === 'Mindmap') {
         content = `- ${subtype}\n  - 기반 데이터: ${currentAnalysisResults.isRealData ? '업로드 파일' : '기본 정보'}\n  - 주요 내용\n    - 분석 요약...\n    - 핵심 인사이트...\n`;
    } else {
         content += `## ${subtype} (${format} 형식)\n\n**기반 데이터:** ${currentAnalysisResults.isRealData ? '업로드 파일' : '기본 정보'}\n\n**주요 내용:**\n[구조화된 텍스트 내용]\n`;
         if (format === 'Excel') content += "\n항목\t값1\t값2\n데이터A\t100\t200\n";
    }
    return content;
}

// generateDummyContent 함수 (재확인)
function generateDummyContent(subtype, styleData, format) {
    let content = `## ${subtype} (Dummy Content - Format: ${format})\n\n`;
    content += `이 문서는 "${subtype}"의 예시 내용을 보여주는 더미 텍스트입니다.\n\n`;
    content += `[ 여기에 ${format} 형식에 맞춰 구조화된 더미 내용이 들어갑니다. ]\n`;
    return content;
}

// displayDetails 함수 (재확인)
 function displayDetails(data) {
    const detailsSection = document.getElementById('details-section');
    if (!data || !detailsSection) { hideDetails(); return; }
    showElement(detailsSection);
    const updateText = (id, text) => {
        const el = document.getElementById(id);
        if (el) el.textContent = text || '-';
    };
    updateText('target_audience', data.target_audience);
    updateText('writing_goal', data.writing_goal);
    updateText('output_format_recommend', data.output_format?.join(', '));
    updateText('visual_theme', data.visual_theme);
    updateText('layout_structure', data.layout_structure);
    updateText('insight_focus', data.insight_focus?.join(' | '));
    updateText('visual_suggestion', data.visual_suggestion?.join(' | '));
    updateText('tone_style', data.tone_style);
    const colorPaletteSpan = document.getElementById('color_palette');
    const colorPreviewBox = document.getElementById('color-preview');
    if (colorPaletteSpan) colorPaletteSpan.textContent = data.color_palette?.join(', ') || '-';
    if (colorPreviewBox) {
        colorPreviewBox.innerHTML = '';
        if (data.color_palette && Array.isArray(data.color_palette)) {
            data.color_palette.forEach(color => {
                if (isValidColor(color)) {
                    const swatch = document.createElement('span');
                    swatch.classList.add('color-swatch');
                    try { swatch.style.backgroundColor = color; } catch (e) { console.warn("Invalid color:", color); return; }
                    swatch.title = color;
                    colorPreviewBox.appendChild(swatch);
                }
            });
        }
    }
 }

// resetFilterDependents 함수 (재확인)
function resetFilterDependents(resetPurpose = true) {
     const purposeSelect = document.getElementById('doc_purpose');
     const subtypeSelect = document.getElementById('doc_subtype');
     const outputFormatSelect = document.getElementById('output_format_select');
     const pageSpecSelect = document.getElementById('page_spec_select');
     const generateButton = document.getElementById('generate-button');
     const generatedDocSection = document.getElementById('generated-doc-section');

    if (resetPurpose && purposeSelect) purposeSelect.value = "";
    if (subtypeSelect) {
        subtypeSelect.innerHTML = '<option value="">-- 문서 용도를 먼저 선택하세요 --</option>';
        subtypeSelect.disabled = true;
    }
    if (outputFormatSelect) {
        outputFormatSelect.value = "";
        outputFormatSelect.disabled = true;
    }
    if (pageSpecSelect) {
        pageSpecSelect.value = "";
        pageSpecSelect.disabled = true;
    }
    hideDetails();
    if (generateButton) generateButton.disabled = true;
    hideGeneratedDocSection();
}

// isValidColor 함수 (재확인)
function isValidColor(strColor) {
    if (!strColor || typeof strColor !== 'string') return false;
    const s = document.createElement('div').style;
    s.color = strColor;
    return s.color !== '';
 }

// ==========================================================================
// ======================= DOM 로드 후 실행 ===========================
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded and parsed");

    // UI 요소 참조 얻기
    const fileInput = document.getElementById('file-input');
    const analyzeButton = document.getElementById('analyze-button');
    const purposeSelect = document.getElementById('doc_purpose');
    const subtypeSelect = document.getElementById('doc_subtype');
    const outputFormatSelect = document.getElementById('output_format_select');
    const pageSpecSelect = document.getElementById('page_spec_select');
    const generateButton = document.getElementById('generate-button');

    // 이벤트 리스너 연결
    if (fileInput) {
        fileInput.addEventListener('change', (event) => {
            console.log("File input changed.");
            // 기존 선택된 파일 배열 초기화 또는 관리 방식 선택 (여기서는 새로 선택된 파일로 대체)
            selectedFilesArray = Array.from(event.target.files);
            console.log(`Files selected: ${selectedFilesArray.length}`);
            updateFileListUI(); // 파일 목록 UI 업데이트 호출

            // 파일 선택 변경 시 입력 필드 값 초기화 (선택 안 함 이슈 방지)
            // event.target.value = null; // 주석 처리: 이 줄은 파일을 다시 선택할 수 없게 만들 수 있음
        });
    } else { console.error("#file-input element not found!"); }

    if (analyzeButton) {
        analyzeButton.addEventListener('click', async () => {
            console.log("Analyze button clicked.");
            const analysisLoading = document.getElementById('analysis-loading');
            const analysisResultsSection = document.getElementById('analysis-results-section');
            const extractedTextarea = document.getElementById('extracted-text');
            const analysisInsightsPre = document.getElementById('analysis-insights');
            const selectedSummaryLevel = document.querySelector('input[name="summary_level"]:checked')?.value || 'Medium';

            if (!analysisLoading || !analysisResultsSection || !extractedTextarea || !analysisInsightsPre) {
                 console.error("Analysis UI elements missing!"); return;
            }
            if (selectedFilesArray.length === 0) { alert("분석할 파일을 먼저 선택해주세요."); return; }

            showElement(analysisLoading);
            analyzeButton.disabled = true;
            hideAnalysisResults(); // 이전 결과 숨김
            hideFilterSection();   // 필터 섹션 숨김
            hideGeneratedDocSection(); // 생성 결과 숨김

            try {
                currentAnalysisResults = await readFileAndSimulateAnalysis(selectedFilesArray, selectedSummaryLevel);
                extractedTextarea.value = currentAnalysisResults.summary;
                analysisInsightsPre.textContent = currentAnalysisResults.insights;
                showElement(analysisResultsSection);
                populatePurposeDropdown(); // 분석 후 문서 용도 드롭다운 채우기
                showElement(document.getElementById('filter-section')); // 필터 섹션 표시
                resetFilterDependents(true); // 분석 후 필터 의존성 초기화 (용도 선택부터)
            } catch (error) {
                console.error("Analysis simulation error:", error);
                alert("파일 분석 중 오류 발생: " + error.message);
                extractedTextarea.value = ""; analysisInsightsPre.textContent = "";
                hideAnalysisResults();
            } finally {
                hideElement(analysisLoading);
                analyzeButton.disabled = false;
            }
        });
    } else { console.error("#analyze-button element not found!"); }

    if (purposeSelect) purposeSelect.addEventListener('change', handlePurposeChange);
    else { console.error("#doc_purpose element not found!"); }

    if (subtypeSelect) subtypeSelect.addEventListener('change', handleSubtypeChange);
    else { console.error("#doc_subtype element not found!"); }

    if(outputFormatSelect) outputFormatSelect.addEventListener('change', checkGenerateButtonState);
    else { console.error("#output_format_select element not found!"); }

    if(pageSpecSelect) pageSpecSelect.addEventListener('change', checkGenerateButtonState);
    else { console.error("#page_spec_select element not found!"); }

    if (generateButton) generateButton.addEventListener('click', handleGenerateClick);
    else { console.error("#generate-button element not found!"); }

    // 초기 UI 설정
    initializeUI();
});