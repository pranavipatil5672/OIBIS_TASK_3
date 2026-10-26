/**
 * ThermoCraft Pro - Advanced Temperature Converter
 * Author: Dhanashri Vikas Chandane
 * Oasis Infobyte Web Development Internship - Task 3
 */

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const tempInput = document.getElementById('temp-input');
  const clearInputBtn = document.getElementById('clear-input-btn');
  const fromUnitSelect = document.getElementById('from-unit');
  const toUnitSelect = document.getElementById('to-unit');
  const swapBtn = document.getElementById('swap-btn');
  const precisionSelect = document.getElementById('precision-select');
  const convertBtn = document.getElementById('convert-btn');
  const resetBtn = document.getElementById('reset-btn');
  const unitHint = document.getElementById('unit-hint');
  const validationMsg = document.getElementById('validation-msg');

  // Result Elements
  const resultValue = document.getElementById('result-value');
  const resultUnitSymbol = document.getElementById('result-unit-symbol');
  const inputEcho = document.getElementById('input-echo');
  const formulaText = document.getElementById('formula-text');
  const stateBadge = document.getElementById('thermal-state-badge');
  const stateText = document.getElementById('state-text');
  const copyBtn = document.getElementById('copy-btn');
  const toast = document.getElementById('toast');

  // Gauge Elements
  const mercuryStem = document.getElementById('mercury-stem');
  const readoutTemp = document.getElementById('readout-temp');
  const readoutDesc = document.getElementById('readout-desc');
  const moodIcon = document.getElementById('mood-icon');

  // Presets & History
  const presetButtons = document.querySelectorAll('.preset-btn');
  const historyList = document.getElementById('history-list');
  const clearHistoryBtn = document.getElementById('clear-history-btn');

  // State
  let historyData = [];

  // Unit Symbol Mapping
  const unitSymbols = {
    celsius: '°C',
    fahrenheit: '°F',
    kelvin: 'K',
    rankine: '°R'
  };

  const unitLabels = {
    celsius: 'Celsius (°C)',
    fahrenheit: 'Fahrenheit (°F)',
    kelvin: 'Kelvin (K)',
    rankine: 'Rankine (°R)'
  };

  /* -------------------------------------------------------------------------
     1. Toast Utility
     ------------------------------------------------------------------------- */
  let toastTimer;
  function showToast(message) {
    if (!toast) return;
    const msgEl = toast.querySelector('.toast-message');
    msgEl.textContent = message;
    toast.classList.remove('hidden');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.add('hidden');
    }, 3000);
  }

  /* -------------------------------------------------------------------------
     2. Core Conversion Engine
     ------------------------------------------------------------------------- */
  function toCelsius(val, fromUnit) {
    switch (fromUnit) {
      case 'celsius': return val;
      case 'fahrenheit': return (val - 32) * (5 / 9);
      case 'kelvin': return val - 273.15;
      case 'rankine': return (val - 491.67) * (5 / 9);
      default: return val;
    }
  }

  function fromCelsius(celsiusVal, toUnit) {
    switch (toUnit) {
      case 'celsius': return celsiusVal;
      case 'fahrenheit': return (celsiusVal * (9 / 5)) + 32;
      case 'kelvin': return celsiusVal + 273.15;
      case 'rankine': return (celsiusVal + 273.15) * (9 / 5);
      default: return celsiusVal;
    }
  }

  /* -------------------------------------------------------------------------
     3. Generate Algebraic Formula Representation
     ------------------------------------------------------------------------- */
  function getFormulaExplanation(val, fromUnit, result, toUnit, precision) {
    const formattedVal = Number(val).toFixed(precision);
    const formattedResult = Number(result).toFixed(precision);

    if (fromUnit === toUnit) {
      return `${formattedVal} ${unitSymbols[fromUnit]} = ${formattedResult} ${unitSymbols[toUnit]} (identical units)`;
    }

    if (fromUnit === 'celsius' && toUnit === 'fahrenheit') {
      return `(${formattedVal} °C × 9/5) + 32 = ${formattedResult} °F`;
    }
    if (fromUnit === 'fahrenheit' && toUnit === 'celsius') {
      return `(${formattedVal} °F - 32) × 5/9 = ${formattedResult} °C`;
    }
    if (fromUnit === 'celsius' && toUnit === 'kelvin') {
      return `${formattedVal} °C + 273.15 = ${formattedResult} K`;
    }
    if (fromUnit === 'kelvin' && toUnit === 'celsius') {
      return `${formattedVal} K - 273.15 = ${formattedResult} °C`;
    }
    if (fromUnit === 'fahrenheit' && toUnit === 'kelvin') {
      return `(${formattedVal} °F - 32) × 5/9 + 273.15 = ${formattedResult} K`;
    }
    if (fromUnit === 'kelvin' && toUnit === 'fahrenheit') {
      return `(${formattedVal} K - 273.15) × 9/5 + 32 = ${formattedResult} °F`;
    }
    if (fromUnit === 'celsius' && toUnit === 'rankine') {
      return `(${formattedVal} °C + 273.15) × 9/5 = ${formattedResult} °R`;
    }
    if (fromUnit === 'rankine' && toUnit === 'celsius') {
      return `(${formattedVal} °R - 491.67) × 5/9 = ${formattedResult} °C`;
    }

    return `Standard conversion: ${formattedVal} ${unitSymbols[fromUnit]} ➔ ${formattedResult} ${unitSymbols[toUnit]}`;
  }

  /* -------------------------------------------------------------------------
     4. Update Visual Thermometer & Atmospheric Theme
     ------------------------------------------------------------------------- */
  function updateThermometer(celsiusVal) {
    // Map -20°C to 100°C across 0% to 100% height
    const minC = -20;
    const maxC = 100;
    let percent = ((celsiusVal - minC) / (maxC - minC)) * 100;

    // Constrain height between 4% and 100%
    if (percent < 4) percent = 4;
    if (percent > 100) percent = 100;

    mercuryStem.style.height = `${percent.toFixed(1)}%`;
    readoutTemp.textContent = `${celsiusVal.toFixed(1)} °C`;

    let mood = 'normal';
    let label = 'Comfortable / Normal';
    let iconHtml = '<i class="fa-solid fa-leaf"></i>';
    let desc = 'Pleasant room temperature ambience';

    if (celsiusVal < 0) {
      mood = 'freezing';
      label = 'Sub-Zero Frigid';
      iconHtml = '<i class="fa-solid fa-snowflake"></i>';
      desc = 'Water freezes into ice / winter conditions';
    } else if (celsiusVal >= 0 && celsiusVal < 18) {
      mood = 'cold';
      label = 'Chilly / Cool';
      iconHtml = '<i class="fa-solid fa-cloud"></i>';
      desc = 'Brisk weather; light jacket recommended';
    } else if (celsiusVal >= 18 && celsiusVal <= 27) {
      mood = 'normal';
      label = 'Room Temperature';
      iconHtml = '<i class="fa-solid fa-leaf"></i>';
      desc = 'Comfortable standard room environment';
    } else if (celsiusVal > 27 && celsiusVal < 45) {
      mood = 'warm';
      label = 'Warm / Summer Heat';
      iconHtml = '<i class="fa-solid fa-sun"></i>';
      desc = 'Warm ambient temperature / Body temp range';
    } else {
      mood = 'hot';
      label = 'Extreme Heat / Boiling';
      iconHtml = '<i class="fa-solid fa-fire-flame-curved"></i>';
      desc = 'Dangerous heat / approaching boiling threshold';
    }

    document.body.setAttribute('data-thermal', mood);
    stateText.textContent = label;
    moodIcon.innerHTML = iconHtml;
    readoutDesc.textContent = desc;
  }

  /* -------------------------------------------------------------------------
     5. Conversion Execution & Validation
     ------------------------------------------------------------------------- */
  function performConversion(recordHistory = false) {
    const rawVal = tempInput.value.trim();

    // Input Validation
    if (rawVal === '') {
      validationMsg.textContent = 'Please enter a temperature value.';
      tempInput.classList.add('has-error');
      resultValue.textContent = '--';
      formulaText.textContent = 'Waiting for valid numeric input...';
      return;
    }

    const val = parseFloat(rawVal);
    if (isNaN(val)) {
      validationMsg.textContent = 'Please enter a valid numeric value.';
      tempInput.classList.add('has-error');
      resultValue.textContent = '--';
      return;
    }

    const fromUnit = fromUnitSelect.value;
    const toUnit = toUnitSelect.value;
    const precision = parseInt(precisionSelect.value, 10);

    // Calculate baseline Celsius
    const celsius = toCelsius(val, fromUnit);

    // Validate Absolute Zero
    // Absolute zero is -273.15°C
    if (celsius < -273.15 - 0.001) {
      validationMsg.textContent = 'Warning: Cannot be below Absolute Zero (-273.15°C / 0 K / -459.67°F)';
      tempInput.classList.add('has-error');
      resultValue.textContent = 'ERR';
      formulaText.textContent = 'Physical violation: Absolute Zero limit reached';
      return;
    }

    // Clear validation error if passed
    validationMsg.textContent = '';
    tempInput.classList.remove('has-error');

    // Calculate Target Value
    const converted = fromCelsius(celsius, toUnit);
    const formattedResult = converted.toFixed(precision);

    // Update Result UI
    resultValue.textContent = formattedResult;
    resultUnitSymbol.textContent = unitSymbols[toUnit];
    inputEcho.textContent = `${val} ${unitSymbols[fromUnit]} =`;
    formulaText.textContent = getFormulaExplanation(val, fromUnit, converted, toUnit, precision);

    // Update Thermometer Visual
    updateThermometer(celsius);

    // Record History if explicit action
    if (recordHistory) {
      addHistoryItem({
        fromVal: val,
        fromUnit: unitSymbols[fromUnit],
        fromKey: fromUnit,
        toVal: formattedResult,
        toUnit: unitSymbols[toUnit],
        toKey: toUnit,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      });
    }
  }

  /* -------------------------------------------------------------------------
     6. History Logging
     ------------------------------------------------------------------------- */
  function addHistoryItem(item) {
    // Avoid duplicate immediate re-addition
    if (historyData.length > 0) {
      const last = historyData[0];
      if (last.fromVal === item.fromVal && last.fromKey === item.fromKey && last.toKey === item.toKey) {
        return;
      }
    }

    historyData.unshift(item);
    if (historyData.length > 6) {
      historyData.pop();
    }
    renderHistory();
  }

  function renderHistory() {
    if (historyData.length === 0) {
      historyList.innerHTML = '<li class="history-empty">No recent conversions yet.</li>';
      return;
    }

    historyList.innerHTML = '';
    historyData.forEach((item, index) => {
      const li = document.createElement('li');
      li.className = 'history-item';
      li.innerHTML = `
        <span><strong>${item.fromVal} ${item.fromUnit}</strong> &rarr; <strong>${item.toVal} ${item.toUnit}</strong></span>
        <span class="history-time">${item.timestamp}</span>
      `;

      // Click history item to reload it
      li.addEventListener('click', () => {
        tempInput.value = item.fromVal;
        fromUnitSelect.value = item.fromKey;
        toUnitSelect.value = item.toKey;
        unitHint.textContent = unitLabels[item.fromKey];
        performConversion(false);
        showToast('Restored previous conversion!');
      });

      historyList.appendChild(li);
    });
  }

  if (clearHistoryBtn) {
    clearHistoryBtn.addEventListener('click', () => {
      historyData = [];
      renderHistory();
      showToast('History cleared.');
    });
  }

  /* -------------------------------------------------------------------------
     7. Event Listeners & Interactive Controls
     ------------------------------------------------------------------------- */
  // Real-time calculation as user types
  tempInput.addEventListener('input', () => performConversion(false));

  // Change unit selectors
  fromUnitSelect.addEventListener('change', () => {
    unitHint.textContent = unitLabels[fromUnitSelect.value];
    performConversion(false);
  });

  toUnitSelect.addEventListener('change', () => {
    performConversion(false);
  });

  precisionSelect.addEventListener('change', () => {
    performConversion(false);
  });

  // Swap Units Button
  swapBtn.addEventListener('click', () => {
    const currentFrom = fromUnitSelect.value;
    const currentTo = toUnitSelect.value;

    fromUnitSelect.value = currentTo;
    toUnitSelect.value = currentFrom;
    unitHint.textContent = unitLabels[toUnitSelect.value];

    // If current result was valid, optionally put result into input for smooth reverse conversion
    const currentResult = parseFloat(resultValue.textContent);
    if (!isNaN(currentResult)) {
      tempInput.value = currentResult;
    }

    performConversion(true);
    showToast('Units swapped!');
  });

  // Explicit Convert Button
  convertBtn.addEventListener('click', () => {
    performConversion(true);
  });

  // Reset Button
  resetBtn.addEventListener('click', () => {
    tempInput.value = '25';
    fromUnitSelect.value = 'celsius';
    toUnitSelect.value = 'fahrenheit';
    precisionSelect.value = '2';
    unitHint.textContent = unitLabels['celsius'];
    validationMsg.textContent = '';
    tempInput.classList.remove('has-error');
    performConversion(true);
    showToast('Reset to default values.');
  });

  // Clear Input Button
  clearInputBtn.addEventListener('click', () => {
    tempInput.value = '';
    tempInput.focus();
    performConversion(false);
  });

  // Preset Buttons
  presetButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const val = btn.getAttribute('data-val');
      const unit = btn.getAttribute('data-unit');

      tempInput.value = val;
      fromUnitSelect.value = unit;
      unitHint.textContent = unitLabels[unit];
      performConversion(true);
    });
  });

  // Copy to Clipboard
  copyBtn.addEventListener('click', () => {
    const textToCopy = `${resultValue.textContent} ${resultUnitSymbol.textContent}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      showToast(`Copied "${textToCopy}" to clipboard!`);
    }).catch(() => {
      // Fallback
      showToast(`Result: ${textToCopy}`);
    });
  });

  // Initial calculation on load
  performConversion(true);
});
