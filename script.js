// script.js

const appliancesByCategory = {
  '생활가전': ['조명', '청소기', '공기청정기'],
  '주방가전': ['인덕션', '오븐', '전자레인지', '냉장고', '에어프라이기', '전기밥솥'],
  '미용/위생가전': ['세탁기', '건조기', '스타일러', '드라이기', '고데기'],
  '계절가전': ['제습기', '가습기', '에어컨', '선풍기', '보일러', '온수매트'],
  '정보가전': ['컴퓨터', 'TV', '스마트폰 완충', '무선 이어폰 완충', '태블릿 완충', '노트북 완충', '와이파이 공유기', '프린터']
};

const applianceData = {
  // (기존 applianceData 내용과 동일)
  '조명': { power: 60, dailyHours: 5, tips: ['LED 전구로 교체하기', '사용하지 않는 공간의 조명 끄기', '자연광 최대한 활용하기'], suggestedReductionMinutes: 60, minUsageTimeToSuggestInHours: 2 },
  '청소기': { power: 1200, dailyHours: 0.3, tips: ['필터 자주 청소하기', '강도 조절하여 사용하기', '한 번에 모아서 청소하기'], suggestedReductionMinutes: 10, minUsageTimeToSuggestInHours: 0.2 },
  '공기청정기': { power: 40, dailyHours: 12, tips: ['필터 주기적으로 교체/청소', '창문 환기 후 사용', '적정 용량의 제품 사용'], suggestedReductionMinutes: 120, minUsageTimeToSuggestInHours: 6 },
  '인덕션': { power: 2000, dailyHours: 1, tips: ['적절한 크기의 용기 사용', '조리 중 뚜껑 덮기', '잔열 활용하기'], suggestedReductionMinutes: 15, minUsageTimeToSuggestInHours: 0.5 },
  '오븐': { power: 1500, dailyHours: 0.5, tips: ['예열 시간 최소화', '조리 중 문 자주 열지 않기', '여러 요리 한 번에 하기'], suggestedReductionMinutes: 10, minUsageTimeToSuggestInHours: 0.3 },
  '전자레인지': { power: 1000, dailyHours: 0.2, tips: ['해동은 미리 실온에서', '짧은 시간 조리 시 활용', '내부 깨끗하게 유지'], suggestedReductionMinutes: 5, minUsageTimeToSuggestInHours: 0.1 },
  '냉장고': { power: 50, dailyHours: 24, tips: ['뒷면 방열판 청소', '벽과 간격 유지', '뜨거운 음식 식혀서 넣기', '문 자주 여닫지 않기', '내용물 60-70% 채우기'] },
  '에어프라이기': { power: 1500, dailyHours: 0.5, tips: ['적정량만 조리', '예열 최소화', '종이호일 사용 시 공기 순환 고려'], suggestedReductionMinutes: 10, minUsageTimeToSuggestInHours: 0.3 },
  '전기밥솥': { power: 800, dailyHours: 1, 保温Hours: 6, tips: ['보온 시간 최소화 (7시간 이내 권장)', '먹을 만큼만 밥하기', '압력솥 기능 활용'], suggestedReductionTarget: '보온 시간', suggestedReductionMinutes: 120, minUsageTimeToSuggestInHours: 4 },
  '세탁기': { power: 500, dailyHours: 0.5, tips: ['세탁물 모아서 한 번에', '찬물 세탁 활용', '에너지 효율 높은 제품 사용'] },
  '건조기': { power: 2500, dailyHours: 1, tips: ['탈수 충분히 하기', '필터 자주 청소', '건조 볼 사용', '날씨 좋을 땐 자연 건조'], suggestedReductionMinutes: 30, minUsageTimeToSuggestInHours: 1 },
  '스타일러': { power: 1700, dailyHours: 0.5, tips: ['한 번에 여러 벌 관리', '표준 코스 위주 사용', '필터 청소'], suggestedReductionMinutes: 10, minUsageTimeToSuggestInHours: 0.3 },
  '드라이기': { power: 1200, dailyHours: 0.2, tips: ['타월 드라이 충분히', '찬바람 섞어 사용', '모발 가까이 대지 않기'], suggestedReductionMinutes: 5, minUsageTimeToSuggestInHours: 0.1 },
  '고데기': { power: 50, dailyHours: 0.3, tips: ['사용 직전에 켜고 사용 후 바로 끄기', '적정 온도 사용'], suggestedReductionMinutes: 10, minUsageTimeToSuggestInHours: 0.2 },
  '제습기': { power: 300, dailyHours: 4, tips: ['창문 닫고 사용', '필터 청소', '선풍기와 함께 사용'], suggestedReductionMinutes: 60, minUsageTimeToSuggestInHours: 2 },
  '가습기': { power: 30, dailyHours: 8, tips: ['물통 자주 세척', '적정 습도 유지', '필요한 공간에서만 사용'], suggestedReductionMinutes: 60, minUsageTimeToSuggestInHours: 4 },
  '에어컨': { power: 1800, dailyHours: 4, tips: ['적정 실내 온도 유지 (26℃ 권장)', '선풍기와 함께 사용', '필터 2주마다 청소', '커튼/블라인드로 직사광선 차단'], suggestedReductionMinutes: 60, minUsageTimeToSuggestInHours: 2 },
  '선풍기': { power: 50, dailyHours: 6, tips: ['타이머 기능 활용', '에어컨과 함께 사용 시 공기 순환', '약풍 위주 사용'], suggestedReductionMinutes: 60, minUsageTimeToSuggestInHours: 3 },
  '보일러': { power: 150, dailyHours: 5, tips: ['적정 실내 온도 유지 (18-20℃ 권장)', '단열 상태 점검', '외출 모드 활용', '주기적인 점검'], suggestedReductionMinutes: 60, minUsageTimeToSuggestInHours: 3 },
  '온수매트': { power: 200, dailyHours: 8, tips: ['적정 온도 설정', '담요나 이불 덮어 사용', '타이머 활용'], suggestedReductionMinutes: 60, minUsageTimeToSuggestInHours: 4 },
  '컴퓨터': { power: 150, dailyHours: 5, tips: ['절전 모드 활용', '사용 안 할 때 모니터 끄기', '주변기기 전원 차단'], suggestedReductionMinutes: 60, minUsageTimeToSuggestInHours: 2 },
  'TV': { power: 100, dailyHours: 4, tips: ['시청 안 할 때 끄기', '화면 밝기 조절', '셋톱박스 전원 관리'], suggestedReductionMinutes: 30, minUsageTimeToSuggestInHours: 2 },
  '스마트폰 완충': { power: 10, dailyHours: 3, tips: ['완충 시 플러그 뽑기', '정품 충전기 사용'] },
  '무선 이어폰 완충': { power: 5, dailyHours: 2, tips: ['필요할 때만 충전', '과충전 방지'] },
  '태블릿 완충': { power: 15, dailyHours: 3, tips: ['완충 시 플러그 뽑기', '화면 밝기 조절하며 사용'] },
  '노트북 완충': { power: 60, dailyHours: 6, tips: ['배터리 모드 최적화', '절전 모드 활용', '사용 안 할 때 덮개 닫기 또는 종료'], suggestedReductionMinutes: 60, minUsageTimeToSuggestInHours: 3 },
  '와이파이 공유기': { power: 10, dailyHours: 24, tips: ['장시간 미사용 시 전원 끄기 (취침 시 등)', '최신 펌웨어 유지'] },
  '프린터': { power: 20, dailyHours: 0.2, tips: ['인쇄할 때만 켜기', '절전 모드 활용', '양면 인쇄/모아찍기 활용'] }
};

let userSelectedAppliances = {};
let currentCategory = null;

const KOREAN_AVG_DAILY_ENERGY_KWH = 11.7; // 한국인 1인당 하루 평균 전기 사용량 (예시값, kWh)

// DOM 요소 선택
const categoryButtonsContainer = document.getElementById('category-buttons');
const applianceListDiv = document.getElementById('appliance-list');
const selectedListUl = document.getElementById('selected-list');
const energyResultsDiv = document.getElementById('energy-results');
const energyRecommendationsDiv = document.getElementById('energy-main-recommendations');
const tipsModalElement = document.getElementById('tipsModal');
const modalApplianceNameH3 = document.getElementById('modal-appliance-name');
const modalApplianceTipsDiv = document.getElementById('modal-appliance-tips');

window.addEventListener('DOMContentLoaded', () => {
  // ... (기존 DOMContentLoaded 내용과 동일) ...
  Object.keys(appliancesByCategory).forEach(category => {
    const button = document.createElement('button');
    button.classList.add('category-button');
    button.textContent = category;
    button.onclick = () => {
      document.querySelectorAll('#category-buttons .category-button.active').forEach(activeBtn => activeBtn.classList.remove('active'));
      button.classList.add('active');
      currentCategory = category;
      showAppliances(category);
    };
    categoryButtonsContainer.appendChild(button);
  });

  if (Object.keys(appliancesByCategory).length > 0) {
    const firstCategory = Object.keys(appliancesByCategory)[0];
    const firstButton = categoryButtonsContainer.querySelector('.category-button');
    if (firstButton) {
      firstButton.click();
    }
  } else {
    applianceListDiv.innerHTML = '<p class="no-items-message">등록된 카테고리가 없습니다.</p>';
  }
});

function showAppliances(category) {
  applianceListDiv.innerHTML = '';

  const categoryTitle = document.createElement('div');
  categoryTitle.classList.add('category-title');
  categoryTitle.textContent = `${category} 가전 목록 (하루 사용 시간 입력)`;
  applianceListDiv.appendChild(categoryTitle);

  appliancesByCategory[category].forEach(itemName => {
    const data = applianceData[itemName] || {};
    const idBase = itemName.replace(/ /g, "_").replace(/\//g, "_");

    let userSelection = userSelectedAppliances[itemName] || {
        hours: Math.floor(data.dailyHours || 0),
        minutes: Math.round(((data.dailyHours || 0) % 1) * 60),
        isChecked: false
    };
    if (itemName === '전기밥솥') {
        userSelection.isRiceCookerWarm = userSelectedAppliances[itemName] ? userSelectedAppliances[itemName].isRiceCookerWarm : false;
        userSelection.warmHours = userSelectedAppliances[itemName] ? userSelectedAppliances[itemName].warmHours : Math.floor(data.保温Hours || 0);
        userSelection.warmMinutes = userSelectedAppliances[itemName] ? userSelectedAppliances[itemName].warmMinutes : Math.round(((data.保温Hours || 0) % 1) * 60);
    }

    const itemDiv = document.createElement('div');
    itemDiv.classList.add('appliance-item');

    // 기본 사용 시간 안내 문구 추가
    let defaultTimeNote = '';
    if (itemName !== '냉장고' && itemName !== '와이파이 공유기' && data.dailyHours !== undefined) {
        defaultTimeNote = `<span class="default-time-note">(가구당 하루 평균 ${data.dailyHours.toFixed(1)}시간 사용)</span>`;
    }


    let timeInputHTML = `
      <div class="time-input-container">
        <label for="${idBase}_hours" class="sr-only">${itemName} 사용 시간</label>
        <input type="number" id="${idBase}_hours" min="0" max="24" value="${userSelection.hours}" ${!userSelection.isChecked ? 'disabled' : ''} oninput="updateUserTime('${itemName}', 'hours', this.value)">
        <span>시간</span>
        <label for="${idBase}_minutes" class="sr-only">${itemName} 사용 분</label>
        <input type="number" id="${idBase}_minutes" min="0" max="59" step="5" value="${userSelection.minutes}" ${!userSelection.isChecked ? 'disabled' : ''} oninput="updateUserTime('${itemName}', 'minutes', this.value)">
        <span>분</span>
        ${defaultTimeNote}
      </div>
    `;

    if (itemName === '냉장고' || itemName === '와이파이 공유기') {
        timeInputHTML = `<div class="time-input-container"><small>항시 사용으로 계산됩니다.</small></div>`;
    }

    let riceCookerWarmDefaultTimeNote = '';
    if (itemName === '전기밥솥' && data.保温Hours !== undefined) {
        riceCookerWarmDefaultTimeNote = `<span class="default-time-note">(평균 ${data.保温Hours.toFixed(1)}시간)</span>`;
    }

    let riceCookerWarmInputHTML = '';
    if (itemName === '전기밥솥') {
        riceCookerWarmInputHTML = `
        <div class="appliance-item" style="margin-top: 5px; padding-left: 25px; border: none; background: #f9f9f9; width:100%;">
            <input type="checkbox" id="${idBase}_warm_check" ${userSelection.isRiceCookerWarm ? 'checked' : ''} ${!userSelection.isChecked ? 'disabled' : ''} onchange="toggleRiceCookerWarm('${itemName}', this.checked)">
            <label for="${idBase}_warm_check" class="appliance-name" style="font-size:0.95em;">보온 사용</label>
            <div class="time-input-container">
                <label for="${idBase}_warm_hours" class="sr-only">보온 시간</label>
                <input type="number" id="${idBase}_warm_hours" min="0" max="23" value="${userSelection.warmHours}" ${!(userSelection.isChecked && userSelection.isRiceCookerWarm) ? 'disabled' : ''} oninput="updateUserTime('${itemName}', 'warmHours', this.value)">
                <span>시간</span>
                <label for="${idBase}_warm_minutes" class="sr-only">보온 분</label>
                <input type="number" id="${idBase}_warm_minutes" min="0" max="59" step="5" value="${userSelection.warmMinutes}" ${!(userSelection.isChecked && userSelection.isRiceCookerWarm) ? 'disabled' : ''} oninput="updateUserTime('${itemName}', 'warmMinutes', this.value)">
                <span>분</span>
                ${riceCookerWarmDefaultTimeNote} {/* 보온 평균 사용 시간 안내 */}
            </div>
        </div>`;
    }

    itemDiv.innerHTML = `
      <input type="checkbox" id="${idBase}_check" value="${itemName}" ${userSelection.isChecked ? 'checked' : ''} onchange="toggleApplianceSelection('${itemName}', this.checked)">
      <label for="${idBase}_check" class="appliance-name">${itemName}</label>
      ${timeInputHTML}
    `;
    applianceListDiv.appendChild(itemDiv);
    if (riceCookerWarmInputHTML) {
        const warmDiv = document.createElement('div');
        warmDiv.innerHTML = riceCookerWarmInputHTML;
        applianceListDiv.appendChild(warmDiv.firstChild);
    }
  });
}

// toggleApplianceSelection, toggleRiceCookerWarm, updateUserTime, updateSelectedList, removeAppliance 함수는 이전과 동일

function toggleApplianceSelection(itemName, isChecked) {
  const idBase = itemName.replace(/ /g, "_").replace(/\//g, "_");
  const hoursInput = document.getElementById(`${idBase}_hours`);
  const minutesInput = document.getElementById(`${idBase}_minutes`);

  if (!userSelectedAppliances[itemName]) {
    const data = applianceData[itemName] || {};
    userSelectedAppliances[itemName] = {
        hours: Math.floor(data.dailyHours || 0),
        minutes: Math.round(((data.dailyHours || 0) % 1) * 60),
        isChecked: false
    };
     if (itemName === '전기밥솥') {
        userSelectedAppliances[itemName].isRiceCookerWarm = false;
        userSelectedAppliances[itemName].warmHours = Math.floor(data.保温Hours || 0);
        userSelectedAppliances[itemName].warmMinutes = Math.round(((data.保温Hours || 0) % 1) * 60);
    }
  }
  userSelectedAppliances[itemName].isChecked = isChecked;

  if (hoursInput) hoursInput.disabled = !isChecked;
  if (minutesInput) minutesInput.disabled = !isChecked;

  if (itemName === '전기밥솥') {
      const warmCheck = document.getElementById(`${idBase}_warm_check`);
      const warmHoursInput = document.getElementById(`${idBase}_warm_hours`);
      const warmMinutesInput = document.getElementById(`${idBase}_warm_minutes`);

      if (warmCheck) warmCheck.disabled = !isChecked; // 주 가전 선택 여부에 따라 보온 체크박스 활성화/비활성화
      if (isChecked) { // 주 가전이 선택된 경우
          // 보온 체크박스의 현재 상태에 따라 보온 시간 입력 필드 활성화/비활성화
          if (warmHoursInput) warmHoursInput.disabled = !userSelectedAppliances[itemName].isRiceCookerWarm;
          if (warmMinutesInput) warmMinutesInput.disabled = !userSelectedAppliances[itemName].isRiceCookerWarm;
      } else { // 주 가전이 해제된 경우
          if (warmCheck) warmCheck.checked = false; // 보온 체크도 해제
          userSelectedAppliances[itemName].isRiceCookerWarm = false; // 데이터도 false로
          if (warmHoursInput) warmHoursInput.disabled = true; // 보온 시간 입력 필드 비활성화
          if (warmMinutesInput) warmMinutesInput.disabled = true; // 보온 시간 입력 필드 비활성화
      }
  }
  updateSelectedList();
}

function toggleRiceCookerWarm(itemName, isWarmChecked) {
    // 주 가전이 선택된 상태에서만 이 함수가 의미 있음 (UI에서 이미 제어하지만, 안전장치)
    if (!userSelectedAppliances[itemName] || !userSelectedAppliances[itemName].isChecked) return;
    userSelectedAppliances[itemName].isRiceCookerWarm = isWarmChecked;

    const idBase = itemName.replace(/ /g, "_").replace(/\//g, "_");
    const warmHoursInput = document.getElementById(`${idBase}_warm_hours`);
    const warmMinutesInput = document.getElementById(`${idBase}_warm_minutes`);

    if (warmHoursInput) warmHoursInput.disabled = !isWarmChecked;
    if (warmMinutesInput) warmMinutesInput.disabled = !isWarmChecked;
    updateSelectedList(); // 선택 목록 업데이트 (보온 상태 표시용)
}


function updateUserTime(itemName, type, value) {
  if (!userSelectedAppliances[itemName]) return;
  let numValue = parseInt(value);

  if (isNaN(numValue)) { // 숫자가 아닌 값 입력 시 0으로 처리 또는 이전 값 유지 (여기선 0으로)
      numValue = 0;
  }

  if (type === 'hours' || type === 'warmHours') {
      if (numValue < 0) numValue = 0;
      if (numValue > 24 && type === 'hours') numValue = 24;
      if (numValue > 23 && type === 'warmHours') numValue = 23; // 24시 보온은 0시로
  } else if (type === 'minutes' || type === 'warmMinutes') {
      if (numValue < 0) numValue = 0;
      if (numValue > 59) numValue = 59;
  }
  userSelectedAppliances[itemName][type] = numValue;

  const idSuffix = type.startsWith('warm') ? `_warm_${type.replace('warm', '').toLowerCase()}` : `_${type}`;
  const inputFieldId = `${itemName.replace(/ /g, "_").replace(/\//g, "_")}${idSuffix}`;
  const inputField = document.getElementById(inputFieldId);

  if (inputField && inputField.value != numValue) {
      inputField.value = numValue;
  }
  updateSelectedList();
}

function updateSelectedList() {
  selectedListUl.innerHTML = "";
  let hasSelection = false;

  Object.keys(userSelectedAppliances).forEach(itemName => {
    const selection = userSelectedAppliances[itemName];
    if (selection.isChecked) {
      hasSelection = true;
      const listItem = document.createElement('li');
      let displayTime = `${selection.hours || 0}시간 ${selection.minutes || 0}분`;
      if (itemName === '냉장고' || itemName === '와이파이 공유기') displayTime = "항시 사용";

      let warmInfo = '';
      if (itemName === '전기밥솥' && selection.isRiceCookerWarm) {
          warmInfo = ` (보온: ${selection.warmHours || 0}시간 ${selection.warmMinutes || 0}분)`;
      }

      listItem.innerHTML = `
        <span class="highlight-text">${itemName}</span>
        <span class="selected-time-info">사용: ${displayTime}${warmInfo}</span>
        <div class="button-group">
            <button class="details-btn" onclick="showTipsModal('${itemName}')">상세팁</button>
            <button class="remove-btn" onclick="removeAppliance('${itemName}')" title="${itemName} 선택 해제">❌</button>
        </div>
      `;
      selectedListUl.appendChild(listItem);
    }
  });

  if (!hasSelection) {
    selectedListUl.innerHTML = "<li class='empty-message'>선택된 가전이 없습니다.</li>";
  }
  energyResultsDiv.innerHTML = "";
  energyRecommendationsDiv.innerHTML = "";
}

function removeAppliance(itemName) {
  if (userSelectedAppliances[itemName]) {
    userSelectedAppliances[itemName].isChecked = false; // 객체에서 체크 해제
  }
  // 현재 카테고리 목록의 UI 업데이트
  if (currentCategory && appliancesByCategory[currentCategory].includes(itemName)) {
    const idBase = itemName.replace(/ /g, "_").replace(/\//g, "_");
    const checkbox = document.getElementById(`${idBase}_check`);
    if (checkbox) checkbox.checked = false;

    const hoursInput = document.getElementById(`${idBase}_hours`);
    const minutesInput = document.getElementById(`${idBase}_minutes`);
    if (hoursInput) hoursInput.disabled = true;
    if (minutesInput) minutesInput.disabled = true;

    if(itemName === '전기밥솥'){
        const warmCheck = document.getElementById(`${idBase}_warm_check`);
        const warmHoursInput = document.getElementById(`${idBase}_warm_hours`);
        const warmMinutesInput = document.getElementById(`${idBase}_warm_minutes`);
        if(warmCheck) { warmCheck.checked = false; warmCheck.disabled = true; }
        if(warmHoursInput) warmHoursInput.disabled = true;
        if(warmMinutesInput) warmMinutesInput.disabled = true;
        if (userSelectedAppliances[itemName]) userSelectedAppliances[itemName].isRiceCookerWarm = false; // 데이터도 false
    }
  }
  updateSelectedList();
}


function calculateAndShowEnergy() {
  energyResultsDiv.innerHTML = ""; // 기존 결과 초기화
  energyRecommendationsDiv.innerHTML = ""; // 기존 제안 초기화

  let totalEnergyWh = 0;
  let recommendationsHtml = "<h4>주요 절약 제안</h4><ul>";
  let hasRecommendation = false;
  let activeSelections = false;

  Object.keys(userSelectedAppliances).forEach(itemName => {
    const selection = userSelectedAppliances[itemName];
    const data = applianceData[itemName];

    if (selection.isChecked && data) {
      activeSelections = true;
      let userDailyHours;
      if (itemName === '냉장고' || itemName === '와이파이 공유기') {
        userDailyHours = 24;
      } else {
        userDailyHours = (selection.hours || 0) + ((selection.minutes || 0) / 60);
      }

      let dailyEnergyWh = (data.power || 0) * userDailyHours;

      if (itemName === '전기밥솥' && selection.isRiceCookerWarm) {
        const warmTotalHours = (selection.warmHours || 0) + ((selection.warmMinutes || 0) / 60);
        dailyEnergyWh += (50 * warmTotalHours); // 보온 전력 50W 가정
      }
      totalEnergyWh += dailyEnergyWh;

      if (data.suggestedReductionMinutes) {
        let currentUsageForSuggestion, powerForReduction, targetDescription;
        const minUsage = data.minUsageTimeToSuggestInHours || 0;

        if (itemName === '전기밥솥' && data.suggestedReductionTarget === '보온 시간') {
            if (!selection.isRiceCookerWarm) { /* continue to next item - ECMAScript 5 forEach does not support continue */ return; }
            currentUsageForSuggestion = (selection.warmHours || 0) + ((selection.warmMinutes || 0) / 60);
            powerForReduction = 50;
            targetDescription = "보온 시간";
        } else {
            currentUsageForSuggestion = userDailyHours;
            powerForReduction = data.power || 0;
            targetDescription = "사용 시간";
        }

        if (currentUsageForSuggestion >= minUsage && currentUsageForSuggestion * 60 > data.suggestedReductionMinutes) {
          const reductionHours = data.suggestedReductionMinutes / 60;
          const savedKWh = (powerForReduction * reductionHours) / 1000;
          if (savedKWh > 0.001) {
            recommendationsHtml += `<li><strong>${itemName}:</strong> ${targetDescription}을 하루 ${data.suggestedReductionMinutes}분 줄이면 약 <span class="highlight">${savedKWh.toFixed(3)} kWh</span> 절약!</li>`;
            hasRecommendation = true;
          }
        }
      }
    }
  });

  if (!activeSelections) {
    energyResultsDiv.innerHTML = "<p class='no-items-message'>분석할 가전제품을 먼저 선택하고 사용 시간을 설정해주세요.</p>";
    return;
  }

  const totalEnergyKWh = totalEnergyWh / 1000;
  let resultsHtml = `
    <h4>하루 총 예상 전기 사용량</h4>
    <div class="total-kwh-container">
        <span class="total-kwh-label">총 사용량</span>
        <span class="total-kwh-value">${totalEnergyKWh.toFixed(2)} kWh</span>
    </div>`;

  // 평균 사용량 비교 메시지 추가
  const difference = totalEnergyKWh - KOREAN_AVG_DAILY_ENERGY_KWH;
  let comparisonMessageHtml = '<div class="comparison-message ';
  if (difference > 0) {
    comparisonMessageHtml += 'high-usage">';
    comparisonMessageHtml += `이런! 가구당 하루 평균 사용 전력인 (${KOREAN_AVG_DAILY_ENERGY_KWH.toFixed(1)} kWh)보다 <span class="highlight">${difference.toFixed(2)} kWh</span> 더 사용하고 있어요. 😟`;
    comparisonMessageHtml += `<span class="target-reduction">목표: 하루 ${difference.toFixed(2)} kWh 절약하기!</span>`;
  } else if (difference < -0.01) { // 아주 약간 적은 경우도 칭찬
    comparisonMessageHtml += 'low-usage">';
    comparisonMessageHtml += `훌륭해요! 가구당 하루 평균 사용 전력인 (${KOREAN_AVG_DAILY_ENERGY_KWH.toFixed(1)} kWh)보다 <span class="highlight">${Math.abs(difference).toFixed(2)} kWh</span> 적게 사용하고 있네요! 🎉`;
  } else { // 거의 평균인 경우
    comparisonMessageHtml += 'low-usage" style="background-color: #e6f7ff; color: #007acc; border-color: #91d5ff;">'; // 중립적인 색상
    comparisonMessageHtml += `평균적인 에너지 사용량을 유지하고 계시네요! 👍 (한국 가구 당 하루 평균: ${KOREAN_AVG_DAILY_ENERGY_KWH.toFixed(1)} kWh)`;
  }
  comparisonMessageHtml += '</div>';
  resultsHtml += comparisonMessageHtml;
  resultsHtml += `<p class="result-note">(실제 제품 및 사용 환경에 따라 다를 수 있습니다.)</p>`;
  energyResultsDiv.innerHTML = resultsHtml;


  if (hasRecommendation) {
    recommendationsHtml += "</ul>";
  } else {
    recommendationsHtml = "<h4>주요 절약 제안</h4><p class='no-tips-message'>선택하신 가전들의 현재 사용 시간에서는 주요 시간 단축 제안이 없습니다. 각 가전의 '상세팁'을 확인해보세요.</p>";
  }
  energyRecommendationsDiv.innerHTML = recommendationsHtml;
}

// showTipsModal, closeModal, window.onclick 함수는 이전과 동일
function showTipsModal(itemName) {
  const data = applianceData[itemName];
  const userSelection = userSelectedAppliances[itemName];

  if (!data || !userSelection || !userSelection.isChecked) return;

  modalApplianceNameH3.textContent = `${itemName} 상세 절약팁`;
  let tipsHtml = "<h4>일반 절약팁:</h4><ul>";
  if (data.tips && data.tips.length > 0) {
    data.tips.forEach(tip => tipsHtml += `<li>${tip}</li>`);
  } else {
    tipsHtml += "<li>일반적인 팁 정보가 아직 없습니다.</li>";
  }
  tipsHtml += "</ul>";

  if (data.suggestedReductionMinutes && itemName !== '냉장고' && itemName !== '와이파이 공유기') {
    tipsHtml += "<h4>사용 시간 조절팁:</h4>";
    let currentUsageHours, powerForCalc, targetDesc;

    if (itemName === '전기밥솥' && data.suggestedReductionTarget === '보온 시간') {
        if (userSelection.isRiceCookerWarm) {
            currentUsageHours = (userSelection.warmHours || 0) + ((userSelection.warmMinutes || 0) / 60);
            powerForCalc = 50;
            targetDesc = "보온 시간";
        } else {
            currentUsageHours = -1; // 팁 표시 안함
        }
    } else {
        currentUsageHours = (userSelection.hours || 0) + ((userSelection.minutes || 0) / 60);
        powerForCalc = data.power || 0;
        targetDesc = "사용 시간";
    }

    if (currentUsageHours >= 0) { // currentUsageHours가 -1이 아니면 (즉, 팁을 표시해야 하면)
        const suggestedReductionHours = data.suggestedReductionMinutes / 60;
        const savedKWhPerReduction = (powerForCalc * suggestedReductionHours) / 1000;

        if (currentUsageHours * 60 > data.suggestedReductionMinutes) { // 현재 사용 시간이 제안 단축 시간보다 길 때
             tipsHtml += `<p class="specific-tip">현재 ${targetDesc}은 약 ${currentUsageHours.toFixed(1)}시간입니다. 하루 ${data.suggestedReductionMinutes}분(${suggestedReductionHours.toFixed(1)}시간) 줄이면 약 <span class="highlight">${savedKWhPerReduction.toFixed(3)} kWh</span>를 절약할 수 있습니다.</p>`;
        } else if (currentUsageHours > 0) { // 현재 사용 시간이 제안 단축 시간보다 짧지만 0은 아닐 때
             const maxSavedKWh = (powerForCalc * currentUsageHours) / 1000;
             tipsHtml += `<p class="specific-tip">현재 ${targetDesc}은 약 ${currentUsageHours.toFixed(1)}시간입니다. 제안된 단축 시간(${data.suggestedReductionMinutes}분)보다 사용 시간이 짧습니다. 현재 사용 시간을 모두 줄이면 최대 <span class="highlight">${maxSavedKWh.toFixed(3)} kWh</span>까지 절약 가능합니다.</p>`;
        } else { // 현재 사용 시간이 0일 때
             tipsHtml += `<p class="specific-tip">현재 ${targetDesc}이 0이거나 매우 짧습니다. ${targetDesc} 10분 사용 시 약 <span class="highlight">${((powerForCalc * (10/60)) / 1000).toFixed(4)} kWh</span>의 전력이 소모됩니다.</p>`;
        }
         // 최소 사용 시간 관련 조언 (사용 시간이 0보다 크고, 최소 권장 시간보다 적을 때)
         if (data.minUsageTimeToSuggestInHours && currentUsageHours > 0 && currentUsageHours < data.minUsageTimeToSuggestInHours) {
            tipsHtml += `<p style="font-size:0.9em; color:#555;">(팁: 하루 ${data.minUsageTimeToSuggestInHours}시간 이상 사용 시 시간 단축 효과가 더 큽니다.)</p>`;
        }
    }
  }
  modalApplianceTipsDiv.innerHTML = tipsHtml;
  tipsModalElement.style.display = "flex";
}

function closeModal() {
  tipsModalElement.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == tipsModalElement) {
    closeModal();
  }
}