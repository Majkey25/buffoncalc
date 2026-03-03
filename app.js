(() => {
  'use strict';

  const defaults = {
    t: 10,
    l: 7,
    N: 500000,
    seed: 12345,
    showSinglePreview: true,
    useExtendedFormula: false,
    lang: 'cs'
  };

  const translations = {
    cs: {
      appTitle: 'Buffonuv simulator jehly',
      appSubtitle: 'Interaktivni kalkulacka a Monte Carlo simulace',
      languageLabel: 'Jazyk',
      inputsTitle: 'Vstupy',
      lineDistanceLabel: 'Vzdalenost primek t',
      needleLengthLabel: 'Delka jehly l',
      throwsLabel: 'Pocet hodu N',
      seedLabel: 'RNG seed (volitelne)',
      seedPlaceholder: 'prazdne = Math.random',
      previewToggleLabel: 'Zobrazit nahled jednoho hodu',
      extendedToggleLabel: 'Pouzit rozsireny vzorec pro l > t',
      extendedNote: 'Rozsireny vzorec se pouziva jen pro l > t.',
      startBtn: 'Start',
      pauseBtn: 'Pauza',
      resumeBtn: 'Pokracovat',
      resetBtn: 'Reset',
      outputsTitle: 'Vystupy',
      intersectionsLabel: 'Pruseciky K',
      absErrorLabel: 'Absolutni chyba',
      relErrorLabel: 'Relativni chyba',
      ciLowLabel: 'CI dolni (95%)',
      ciHighLabel: 'CI horni (95%)',
      ciNeedN: 'Pro normalni aproximaci CI je potreba N_done >= 30.',
      ciShown: '95% interval spolehlivosti (normalni aproximace).',
      progressLabel: 'Postup',
      piChartTitle: 'pi_hat podle poctu hodu',
      errorChartTitle: '|pi_hat - pi| podle poctu hodu',
      piChartTitleProb: 'P_hat podle poctu hodu (l > t)',
      errorChartTitleProb: '|P_hat - P_theory| podle poctu hodu (l > t)',
      vizTitle: 'Vizualizace hodu',
      theoryTitle: 'Teorie',
      theoryCond: 'Podminka pruseciku: <code>x <= (l/2) * sin(theta)</code>',
      theoryVars: 'Promenne: <code>x in [0, t/2]</code>, <code>theta in [0, pi/2]</code>',
      theoryProcess: 'Prubeh simulace: v kazdem hodu se nahodne vylosuje <code>theta</code> a <code>x</code>, overi se podminka pruseciku a aktualizuje se pocitadlo <code>K</code>.',
      theoryCounts: '<code>N_done</code> je pocet uz provedenych hodu, <code>K</code> je pocet pruseciku.',
      theoryPhat: '<code>P_hat = K / N_done</code> je empiricky odhad pravdepodobnosti pruseciku ze simulace.',
      theoryShort: 'Pro <code>l <= t</code>: <code>P = (2l)/(pi t)</code>',
      theoryLong: 'Pro <code>l > t</code>: <code>P = (2/pi) * ((l/t) - sqrt((l/t)^2 - 1) + arccos(t/l))</code>',
      theoryPi: 'Pro <code>l <= t</code> odhad: <code>pi_hat = (2l * N_done) / (t * K)</code> pri <code>K > 0</code>',
      theoryPiUse: '<code>pi_hat</code> je odhad cisla <code>pi</code> ze simulace a ma smysl pouze pro <code>l <= t</code>.',
      theoryErrors: 'Chyby: <code>abs error = |pi_hat - pi|</code>, <code>rel error = |pi_hat - pi| / pi</code>. S rostoucim <code>N_done</code> se odhad obvykle stabilizuje.',
      footerText: 'BuffonCalc - staticka aplikace pro vyuku pravdepodobnosti',
      repoLinkText: 'Repozitar',
      ready: 'Pripraveno.',
      clamped: 'Nektere neplatne hodnoty byly upraveny do povoleneho rozsahu.',
      extendedDisabled: 'Rozsireny vzorec je vypnuty: P_theory neni dostupne pro l > t.',
      piOnlyForShort: 'pi_hat plati jen pro l <= t',
      notEnoughIntersections: 'zatim malo pruseciku',
      runAnimated: 'Bezi animovana simulace...',
      doneAnimated: 'Animovana simulace dokoncena.',
      paused: 'Animace pozastavena.',
      resumed: 'Animace obnovena.',
      resetDone: 'Stav resetovan.',
      previewHint: 'Zapnete nahled nebo spustte animovanou simulaci.',
      lastThrowHit: 'Posledni hod: prusecik',
      lastThrowMiss: 'Posledni hod: bez pruseciku',
      xAxisLabel: 'N_done',
      keepNeedlesLabel: 'Uchovat vsechny jehly',
      stepModeOff: 'tezim step by step: OFF',
      stepModeOn: 'tezim step by step: ON',
      stepIdle: 'Step mode: zapni tlacitko a klikni Start.',
      stepThrow: 'Step hod',
      slopeText: 'Odhad sklonu log-log: ',
      zReject: 'zamita H0 (p<0.05)',
      zKeep: 'nezamita H0 (p>=0.05)'
    },
    en: {
      appTitle: "Buffon's Needle Simulator",
      appSubtitle: 'Interactive calculator and Monte Carlo simulation',
      languageLabel: 'Language',
      inputsTitle: 'Inputs',
      lineDistanceLabel: 'Line distance t',
      needleLengthLabel: 'Needle length l',
      throwsLabel: 'Throws N',
      seedLabel: 'RNG seed (optional)',
      seedPlaceholder: 'empty = Math.random',
      previewToggleLabel: 'Show single throw preview',
      extendedToggleLabel: 'Use extended formula when l > t',
      extendedNote: 'Extended formula is used only for l > t.',
      startBtn: 'Start',
      pauseBtn: 'Pause',
      resumeBtn: 'Resume',
      resetBtn: 'Reset',
      outputsTitle: 'Outputs',
      intersectionsLabel: 'Intersections K',
      absErrorLabel: 'Absolute error',
      relErrorLabel: 'Relative error',
      ciLowLabel: 'CI low (95%)',
      ciHighLabel: 'CI high (95%)',
      ciNeedN: 'Needs N_done >= 30 for normal approximation CI.',
      ciShown: '95% confidence interval (normal approximation).',
      progressLabel: 'Progress',
      piChartTitle: 'pi_hat over throws',
      errorChartTitle: '|pi_hat - pi| over throws',
      piChartTitleProb: 'P_hat over throws (l > t)',
      errorChartTitleProb: '|P_hat - P_theory| over throws (l > t)',
      vizTitle: 'Throw visualization',
      theoryTitle: 'Theory',
      theoryCond: 'Intersection condition: <code>x <= (l/2) * sin(theta)</code>',
      theoryVars: 'Variables: <code>x in [0, t/2]</code>, <code>theta in [0, pi/2]</code>',
      theoryProcess: 'Simulation flow: each throw samples random <code>theta</code> and <code>x</code>, checks the intersection condition, and updates the counter <code>K</code>.',
      theoryCounts: '<code>N_done</code> is the number of completed throws, <code>K</code> is the number of intersections.',
      theoryPhat: '<code>P_hat = K / N_done</code> is the empirical estimate of intersection probability from simulation.',
      theoryShort: 'For <code>l <= t</code>: <code>P = (2l)/(pi t)</code>',
      theoryLong: 'For <code>l > t</code>: <code>P = (2/pi) * ((l/t) - sqrt((l/t)^2 - 1) + arccos(t/l))</code>',
      theoryPi: 'For <code>l <= t</code>, estimator: <code>pi_hat = (2l * N_done) / (t * K)</code> when <code>K > 0</code>',
      theoryPiUse: '<code>pi_hat</code> is the simulation estimate of <code>pi</code> and is meaningful only for <code>l <= t</code>.',
      theoryErrors: 'Errors: <code>abs error = |pi_hat - pi|</code>, <code>rel error = |pi_hat - pi| / pi</code>. As <code>N_done</code> grows, the estimate usually stabilizes.',
      footerText: 'BuffonCalc - static app for probability education',
      repoLinkText: 'Repository',
      ready: 'Ready.',
      clamped: 'Some invalid values were clamped to allowed ranges.',
      extendedDisabled: 'Extended formula disabled: P_theory unavailable for l > t.',
      piOnlyForShort: 'pi_hat only valid for l <= t',
      notEnoughIntersections: 'not enough intersections yet',
      runAnimated: 'Running animated simulation...',
      doneAnimated: 'Animated simulation complete.',
      paused: 'Animation paused.',
      resumed: 'Animation resumed.',
      resetDone: 'State reset.',
      previewHint: 'Enable preview or run animated mode to show a throw.',
      lastThrowHit: 'Last throw: intersection',
      lastThrowMiss: 'Last throw: no intersection',
      xAxisLabel: 'N_done',
      keepNeedlesLabel: 'Keep all needles',
      stepModeOff: 'tezim step by step: OFF',
      stepModeOn: 'tezim step by step: ON',
      stepIdle: 'Step mode: enable button and click Start.',
      stepThrow: 'Step throw',
      slopeText: 'Estimated log-log slope: ',
      zReject: 'reject H0 (p<0.05)',
      zKeep: 'do not reject H0 (p>=0.05)'
    }
  };

  const state = {
    params: { ...defaults },
    running: false,
    paused: false,
    N_done: 0,
    K: 0,
    lastThrow: null,
    rng: Math.random,
    rafId: null,
    charts: { piChart: null, errorChart: null, ciWidthChart: null, pDiffChart: null, convChart: null },
    series: { pi: [], absErr: [], piCiWidth: [], pDiff: [], conv: [] },
    chartStep: 50,
    lang: defaults.lang,
    keepAllNeedles: false,
    stepMode: false,
    stepDelayMs: 550,
    lastStepTs: 0,
    needleHistory: []
  };

  const dom = {
    tInput: document.getElementById('tInput'),
    lInput: document.getElementById('lInput'),
    nInput: document.getElementById('nInput'),
    seedInput: document.getElementById('seedInput'),
    langSwitch: document.getElementById('langSwitch'),
    previewToggle: document.getElementById('previewToggle'),
    extendedToggle: document.getElementById('extendedToggle'),
    startBtn: document.getElementById('startBtn'),
    pauseBtn: document.getElementById('pauseBtn'),
    resetBtn: document.getElementById('resetBtn'),
    keepNeedlesSwitch: document.getElementById('keepNeedlesSwitch'),
    stepModeBtn: document.getElementById('stepModeBtn'),
    stepExplain: document.getElementById('stepExplain'),
    status: document.getElementById('status'),
    progress: document.getElementById('progress'),
    slopeText: document.getElementById('slopeText'),
    outPTheory: document.getElementById('outPTheory'),
    outK: document.getElementById('outK'),
    outPHat: document.getElementById('outPHat'),
    outPiHat: document.getElementById('outPiHat'),
    outAbsErr: document.getElementById('outAbsErr'),
    outRelErr: document.getElementById('outRelErr'),
    outCILow: document.getElementById('outCILow'),
    outCIHigh: document.getElementById('outCIHigh'),
    outPiCILow: document.getElementById('outPiCILow'),
    outPiCIHigh: document.getElementById('outPiCIHigh'),
    outPiCIWidth: document.getElementById('outPiCIWidth'),
    outZTest: document.getElementById('outZTest'),
    devPHat: document.getElementById('devPHat'),
    devPiAbs: document.getElementById('devPiAbs'),
    devPiRel: document.getElementById('devPiRel'),
    throwCanvas: document.getElementById('throwCanvas'),
    piChartTitle: document.getElementById('piChartTitle'),
    errorChartTitle: document.getElementById('errorChartTitle')
  };

  const t = (key) => translations[state.lang][key] || key;
  const fmtNum = (v, digits = 6) => (Number.isFinite(v) ? Number(v).toFixed(digits) : '-');
  const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
  const setStatus = (msg) => { dom.status.textContent = msg; };

  function normalCdf(x) {
    const z = Math.abs(x);
    const tv = 1 / (1 + 0.2316419 * z);
    const d = 0.3989423 * Math.exp((-z * z) / 2);
    let p = d * tv * (0.3193815 + tv * (-0.3565638 + tv * (1.781478 + tv * (-1.821256 + tv * 1.330274))));
    p = 1 - p;
    return x < 0 ? 1 - p : p;
  }

  function applyLanguage() {
    document.documentElement.lang = state.lang;
    dom.langSwitch.setAttribute('aria-pressed', String(state.lang === 'en'));
    dom.langSwitch.querySelectorAll('.lang-chip').forEach((chip) => chip.classList.toggle('active', chip.dataset.lang === state.lang));
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const val = t(el.getAttribute('data-i18n'));
      if (val.includes('<code>')) el.innerHTML = val; else el.textContent = val;
    });
    dom.seedInput.placeholder = t('seedPlaceholder');
    syncKeepNeedlesSwitch();
    updateStepModeButton();
    refreshOutputs();
    drawVisualization();
    updateCharts();
  }

  function parseAndClampInputs() {
    let changed = false;
    let tVal = Number.parseFloat(dom.tInput.value); if (!Number.isFinite(tVal)) tVal = defaults.t;
    let lVal = Number.parseFloat(dom.lInput.value); if (!Number.isFinite(lVal)) lVal = defaults.l;
    let nVal = Number.parseInt(dom.nInput.value, 10); if (!Number.isFinite(nVal)) nVal = defaults.N;
    const tClamped = clamp(tVal, 0.0001, Number.MAX_SAFE_INTEGER);
    const lClamped = clamp(lVal, 0.0001, Number.MAX_SAFE_INTEGER);
    const nClamped = clamp(nVal, 1, 1000000);
    if (tVal !== tClamped || lVal !== lClamped || nVal !== nClamped) changed = true;

    let seed = null;
    if (dom.seedInput.value.trim() !== '') {
      const parsed = Number.parseInt(dom.seedInput.value, 10);
      if (Number.isFinite(parsed)) seed = parsed | 0; else { seed = defaults.seed; changed = true; }
    }

    dom.tInput.value = String(tClamped);
    dom.lInput.value = String(lClamped);
    dom.nInput.value = String(nClamped);
    dom.seedInput.value = seed === null ? '' : String(seed);
    if (changed) setStatus(t('clamped'));

    return {
      t: tClamped,
      l: lClamped,
      N: nClamped,
      seed,
      showSinglePreview: dom.previewToggle.checked,
      useExtendedFormula: dom.extendedToggle.checked,
      lang: state.lang
    };
  }

  function computeTheoryProbability(tVal, lVal, useExtendedFormula) {
    if (lVal <= tVal) return clamp((2 * lVal) / (Math.PI * tVal), 0, 1);
    if (!useExtendedFormula) return null;
    const r = lVal / tVal;
    return clamp((2 / Math.PI) * (r - Math.sqrt(r * r - 1) + Math.acos(tVal / lVal)), 0, 1);
  }

  function mulberry32(seed) {
    let a = seed >>> 0;
    return function rand() {
      a += 0x6D2B79F5;
      let x = a;
      x = Math.imul(x ^ (x >>> 15), x | 1);
      x ^= x + Math.imul(x ^ (x >>> 7), x | 61);
      return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
    };
  }

  const makeRng = (seed) => (seed === null ? Math.random : mulberry32(seed));

  function simulateThrow(tVal, lVal, rand) {
    const theta = rand() * (Math.PI / 2);
    const x = rand() * (tVal / 2);
    return { theta, x, intersect: x <= (lVal / 2) * Math.sin(theta) };
  }

  function computeMetrics() {
    const { N_done, K } = state;
    const { t: tVal, l: lVal, useExtendedFormula } = state.params;
    const pTheory = computeTheoryProbability(tVal, lVal, useExtendedFormula);
    const pHat = N_done > 0 ? K / N_done : null;
    const piHat = (lVal <= tVal && K > 0 && N_done > 0) ? (2 * lVal * N_done) / (tVal * K) : null;
    const absError = piHat === null ? null : Math.abs(piHat - Math.PI);
    const relError = absError === null ? null : absError / Math.PI;
    const pDiff = (pHat !== null && pTheory !== null) ? (pHat - pTheory) : null;
    const probAbsError = pDiff === null ? null : Math.abs(pDiff);

    let ciLow = null; let ciHigh = null; let ciReady = false;
    if (pHat !== null && N_done >= 30) {
      const margin = 1.96 * Math.sqrt((pHat * (1 - pHat)) / N_done);
      ciLow = clamp(pHat - margin, 0, 1); ciHigh = clamp(pHat + margin, 0, 1); ciReady = true;
    }

    let piCiLow = null; let piCiHigh = null; let piCiWidth = null;
    if (lVal <= tVal && pHat !== null && pHat > 0 && pHat < 1 && N_done >= 30 && piHat !== null) {
      const c = (2 * lVal) / tVal;
      const sePi = (c / (pHat * pHat)) * Math.sqrt((pHat * (1 - pHat)) / N_done);
      const m = 1.96 * sePi;
      if (Number.isFinite(m)) { piCiLow = piHat - m; piCiHigh = piHat + m; piCiWidth = 2 * m; }
    }

    let zScore = null; let pValue = null; let zReject = null;
    if (pTheory !== null && pHat !== null && N_done >= 30 && pTheory > 0 && pTheory < 1) {
      const se0 = Math.sqrt((pTheory * (1 - pTheory)) / N_done);
      if (se0 > 0) { zScore = (pHat - pTheory) / se0; pValue = 2 * (1 - normalCdf(Math.abs(zScore))); zReject = pValue < 0.05; }
    }

    return { pTheory, pHat, piHat, absError, relError, pDiff, probAbsError, ciLow, ciHigh, ciReady, piCiLow, piCiHigh, piCiWidth, zScore, pValue, zReject };
  }

  function estimateSlope(points) {
    if (points.length < 2) return null;
    let sx = 0; let sy = 0; let sxy = 0; let sxx = 0;
    for (let i = 0; i < points.length; i += 1) { sx += points[i].x; sy += points[i].y; sxy += points[i].x * points[i].y; sxx += points[i].x * points[i].x; }
    const n = points.length; const den = n * sxx - sx * sx;
    return den === 0 ? null : (n * sxy - sx * sy) / den;
  }

  function updateChartTitles() {
    const longNeedle = state.params.l > state.params.t;
    const noIntersectionsYet = !longNeedle && state.K === 0;
    const probView = longNeedle || noIntersectionsYet;
    dom.piChartTitle.textContent = probView ? t('piChartTitleProb') : t('piChartTitle');
    dom.errorChartTitle.textContent = probView ? t('errorChartTitleProb') : t('errorChartTitle');
    if (state.charts.piChart) {
      state.charts.piChart.data.datasets[0].label = probView ? 'P_hat' : 'pi_hat';
      state.charts.errorChart.data.datasets[0].label = probView ? '|P_hat - P_theory|' : '|pi_hat - pi|';
    }
  }

  function pushSeriesPoint(nVal, m) {
    const longNeedle = state.params.l > state.params.t;
    const yMain = longNeedle ? m.pHat : (m.piHat ?? m.pHat);
    const yErr = longNeedle ? m.probAbsError : (m.absError ?? m.probAbsError);
    if (yMain !== null) state.series.pi.push({ x: nVal, y: yMain });
    if (yErr !== null) state.series.absErr.push({ x: nVal, y: yErr });
    if (m.piCiWidth !== null) state.series.piCiWidth.push({ x: nVal, y: m.piCiWidth });
    if (m.pDiff !== null) state.series.pDiff.push({ x: nVal, y: m.pDiff });
    if (yErr !== null && yErr > 0 && nVal > 1) state.series.conv.push({ x: Math.log10(nVal), y: Math.log10(yErr) });
  }

  function updateCharts() {
    if (!state.charts.piChart) return;
    updateChartTitles();
    state.charts.piChart.data.datasets[0].data = state.series.pi;
    state.charts.errorChart.data.datasets[0].data = state.series.absErr;
    state.charts.ciWidthChart.data.datasets[0].data = state.series.piCiWidth;
    state.charts.pDiffChart.data.datasets[0].data = state.series.pDiff;
    state.charts.convChart.data.datasets[0].data = state.series.conv;
    state.charts.piChart.update('none');
    state.charts.errorChart.update('none');
    state.charts.ciWidthChart.update('none');
    state.charts.pDiffChart.update('none');
    state.charts.convChart.update('none');
    const slope = estimateSlope(state.series.conv);
    dom.slopeText.textContent = `${t('slopeText')}${slope === null ? '-' : slope.toFixed(3)}`;
  }

  function refreshOutputs() {
    const m = computeMetrics();
    dom.outPTheory.textContent = m.pTheory === null ? '-' : fmtNum(m.pTheory, 6);
    dom.outK.textContent = String(state.K);
    dom.outPHat.textContent = m.pHat === null ? '-' : fmtNum(m.pHat, 6);

    if (state.params.l > state.params.t) {
      dom.outPiHat.textContent = t('piOnlyForShort'); dom.outAbsErr.textContent = '-'; dom.outRelErr.textContent = '-';
    } else if (state.K === 0) {
      dom.outPiHat.textContent = t('notEnoughIntersections'); dom.outAbsErr.textContent = '-'; dom.outRelErr.textContent = '-';
    } else {
      dom.outPiHat.textContent = m.piHat === null ? '-' : fmtNum(m.piHat, 6);
      dom.outAbsErr.textContent = m.absError === null ? '-' : fmtNum(m.absError, 6);
      dom.outRelErr.textContent = m.relError === null ? '-' : fmtNum(m.relError, 6);
    }

    dom.outCILow.textContent = m.ciLow === null ? '-' : fmtNum(m.ciLow, 6);
    dom.outCIHigh.textContent = m.ciHigh === null ? '-' : fmtNum(m.ciHigh, 6);
    dom.outPiCILow.textContent = m.piCiLow === null ? '-' : fmtNum(m.piCiLow, 6);
    dom.outPiCIHigh.textContent = m.piCiHigh === null ? '-' : fmtNum(m.piCiHigh, 6);
    dom.outPiCIWidth.textContent = m.piCiWidth === null ? '-' : fmtNum(m.piCiWidth, 6);

    if (m.zScore === null || m.pValue === null) dom.outZTest.textContent = '-';
    else dom.outZTest.textContent = `z=${fmtNum(m.zScore, 3)}, p=${fmtNum(m.pValue, 4)}, ${m.zReject ? t('zReject') : t('zKeep')}`;

    dom.devPHat.textContent = m.pDiff === null ? '-' : fmtNum(m.pDiff, 6);
    dom.devPiAbs.textContent = m.absError === null ? '-' : fmtNum(m.absError, 6);
    dom.devPiRel.textContent = m.relError === null ? '-' : fmtNum(m.relError, 6);
    dom.progress.textContent = `${t('progressLabel')}: ${state.N_done} / ${state.params.N}`;
    dom.pauseBtn.textContent = state.paused ? t('resumeBtn') : t('pauseBtn');
  }

  function resizeCanvasForDpr(canvas) {
    const dpr = Math.max(1, window.devicePixelRatio || 1);
    const rect = canvas.getBoundingClientRect();
    const w = Math.max(1, Math.floor(rect.width * dpr));
    const h = Math.max(1, Math.floor(rect.height * dpr));
    if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }
  }

  function buildNeedleRecord(throwData, rand) { return { ...throwData, sideRand: rand(), cxRand: rand() }; }

  function buildNeedleEndpoints(throwData, params, w, h) {
    const spacing = Math.max(38, h / 4.4);
    const scale = spacing / params.t;
    const sign = throwData.sideRand < 0.5 ? -1 : 1;
    const cy = h / 2 + sign * throwData.x * scale;
    const cx = 28 + throwData.cxRand * Math.max(1, w - 56);
    const dx = (params.l / 2) * Math.cos(throwData.theta) * scale;
    const dy = (params.l / 2) * Math.sin(throwData.theta) * scale;
    return { x1: cx - dx, y1: cy - dy, x2: cx + dx, y2: cy + dy };
  }

  function drawVisualization() {
    const canvas = dom.throwCanvas;
    resizeCanvasForDpr(canvas);
    const ctx = canvas.getContext('2d');
    const w = canvas.width; const h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    const styles = getComputedStyle(document.documentElement);
    const border = styles.getPropertyValue('--border').trim() || '#d9e2f0';
    const text = styles.getPropertyValue('--text').trim() || '#152238';
    const surface = styles.getPropertyValue('--surface-alt').trim() || '#f0f4fa';
    ctx.fillStyle = surface; ctx.fillRect(0, 0, w, h);
    const spacing = Math.max(38, h / 4.4);
    ctx.strokeStyle = border; ctx.lineWidth = 1.2;
    for (let i = -2; i <= 2; i += 1) {
      const y = h / 2 + i * spacing;
      if (y < 0 || y > h) continue;
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
    }

    let throwData = null;
    if (state.running && state.lastThrow) throwData = state.lastThrow;
    else if (state.params.showSinglePreview && !state.running) {
      const previewRng = makeRng(state.params.seed === null ? null : state.params.seed + 777);
      throwData = buildNeedleRecord(simulateThrow(state.params.t, state.params.l, previewRng), previewRng);
    }

    if (!throwData) {
      ctx.fillStyle = text; ctx.font = `${Math.max(14, Math.floor(h * 0.06))}px -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif`;
      ctx.fillText(t('previewHint'), 16, 28); return;
    }

    if (state.keepAllNeedles && state.needleHistory.length > 0) {
      ctx.lineWidth = 1.15;
      for (let i = 0; i < state.needleHistory.length; i += 1) {
        const n = state.needleHistory[i]; const ep0 = buildNeedleEndpoints(n, state.params, w, h);
        ctx.strokeStyle = n.intersect ? 'rgba(230,80,80,0.32)' : 'rgba(42,109,244,0.32)';
        ctx.beginPath(); ctx.moveTo(ep0.x1, ep0.y1); ctx.lineTo(ep0.x2, ep0.y2); ctx.stroke();
      }
    }

    const ep = buildNeedleEndpoints(throwData, state.params, w, h);
    ctx.strokeStyle = throwData.intersect ? '#e65050' : '#2a6df4';
    ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(ep.x1, ep.y1); ctx.lineTo(ep.x2, ep.y2); ctx.stroke();
    ctx.fillStyle = text; ctx.font = `${Math.max(13, Math.floor(h * 0.05))}px -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif`;
    ctx.fillText(throwData.intersect ? t('lastThrowHit') : t('lastThrowMiss'), 16, h - 14);
  }

  function setRunButtons() { dom.startBtn.disabled = state.running; dom.pauseBtn.disabled = !state.running; dom.pauseBtn.textContent = state.paused ? t('resumeBtn') : t('pauseBtn'); }
  function syncKeepNeedlesSwitch() { dom.keepNeedlesSwitch.checked = state.keepAllNeedles; }
  function updateStepModeButton() { dom.stepModeBtn.textContent = state.stepMode ? t('stepModeOn') : t('stepModeOff'); if (!state.running) dom.stepExplain.textContent = state.stepMode ? t('stepIdle') : ''; }

  function sampleChartsIfNeeded(force = false) {
    if (force || state.N_done % state.chartStep === 0 || state.N_done === state.params.N) {
      pushSeriesPoint(state.N_done, computeMetrics());
      updateCharts();
    }
  }

  function configureChartDensity() {
    const n = state.params.N;
    if (n <= 1000) state.chartStep = 1;
    else if (n <= 10000) state.chartStep = 5;
    else if (n <= 100000) state.chartStep = 20;
    else state.chartStep = 50;
  }

  function stopSimulation() {
    if (state.rafId !== null) { cancelAnimationFrame(state.rafId); state.rafId = null; }
    state.running = false; state.paused = false; setRunButtons();
  }

  function runAnimated() {
    state.running = true; state.paused = false; state.lastStepTs = 0;
    setRunButtons(); setStatus(t('runAnimated'));
    const tick = (ts) => {
      if (!state.running || state.paused) return;
      const remaining = state.params.N - state.N_done;
      if (remaining <= 0) {
        sampleChartsIfNeeded(true); refreshOutputs(); stopSimulation(); drawVisualization(); setStatus(t('doneAnimated')); dom.stepExplain.textContent = ''; return;
      }

      let chunk = 130;
      if (state.params.N <= 300) chunk = 1; else if (state.params.N <= 2000) chunk = 5;
      if (state.stepMode) {
        if (state.lastStepTs && ts - state.lastStepTs < state.stepDelayMs) { state.rafId = requestAnimationFrame(tick); return; }
        state.lastStepTs = ts; chunk = 1;
      }

      chunk = Math.min(remaining, chunk);
      for (let i = 0; i < chunk; i += 1) {
        const th = buildNeedleRecord(simulateThrow(state.params.t, state.params.l, state.rng), state.rng);
        state.N_done += 1; if (th.intersect) state.K += 1; state.lastThrow = th; state.needleHistory.push(th);
        if (state.stepMode) dom.stepExplain.textContent = `${t('stepThrow')} ${state.N_done}: theta=${th.theta.toFixed(3)}, x=${th.x.toFixed(3)}, intersect=${th.intersect}`;
      }
      sampleChartsIfNeeded(false); refreshOutputs(); drawVisualization(); state.rafId = requestAnimationFrame(tick);
    };
    state.rafId = requestAnimationFrame(tick);
  }

  function resetForNewRun() {
    stopSimulation();
    state.N_done = 0; state.K = 0; state.lastThrow = null; state.lastStepTs = 0; state.needleHistory = [];
    state.series.pi = []; state.series.absErr = []; state.series.piCiWidth = []; state.series.pDiff = []; state.series.conv = [];
    updateCharts(); refreshOutputs();
  }

  function makeLineChart(canvasId, color, label) {
    return new Chart(document.getElementById(canvasId), {
      type: 'line',
      data: { datasets: [{ label, data: [], borderColor: color, backgroundColor: color, borderWidth: 2, pointRadius: (ctx) => (state.params.N <= 1000 ? 2 : 0), pointHoverRadius: 4 }] },
      options: {
        responsive: true, maintainAspectRatio: false, animation: false, parsing: false,
        scales: { x: { type: 'linear', title: { display: true, text: t('xAxisLabel') } } },
        plugins: { legend: { display: false } }
      }
    });
  }

  function initCharts() {
    state.charts.piChart = makeLineChart('piChart', '#2a6df4', 'pi_hat');
    state.charts.errorChart = makeLineChart('errorChart', '#e65050', 'abs_error');
    state.charts.ciWidthChart = makeLineChart('ciWidthChart', '#0f9d58', 'pi_hat_CI_width');
    state.charts.pDiffChart = makeLineChart('pDiffChart', '#f39c12', 'P_hat_minus_P_theory');
    state.charts.convChart = new Chart(document.getElementById('convChart'), {
      type: 'line',
      data: { datasets: [{ label: 'log-log error', data: [], borderColor: '#6c5ce7', backgroundColor: '#6c5ce7', borderWidth: 2, pointRadius: (ctx) => (state.params.N <= 1000 ? 2 : 0), pointHoverRadius: 4 }] },
      options: {
        responsive: true, maintainAspectRatio: false, animation: false, parsing: false,
        scales: { x: { type: 'linear', title: { display: true, text: 'log10(N_done)' } }, y: { type: 'linear', title: { display: true, text: 'log10(error)' } } },
        plugins: { legend: { display: false } }
      }
    });
  }

  function prefillFromQuery() {
    const q = new URLSearchParams(window.location.search);
    if (q.has('t')) dom.tInput.value = q.get('t');
    if (q.has('l')) dom.lInput.value = q.get('l');
    if (q.has('N')) dom.nInput.value = q.get('N');
    if (q.has('seed')) dom.seedInput.value = q.get('seed');
  }

  function onStart() { resetForNewRun(); state.params = parseAndClampInputs(); configureChartDensity(); state.rng = makeRng(state.params.seed); setRunButtons(); refreshOutputs(); drawVisualization(); runAnimated(); }
  function onPauseResume() {
    if (!state.running) return;
    state.paused = !state.paused; setRunButtons();
    if (state.paused) { if (state.rafId !== null) cancelAnimationFrame(state.rafId); state.rafId = null; setStatus(t('paused')); }
    else { setStatus(t('resumed')); runAnimated(); }
  }
  function onReset() { resetForNewRun(); state.params = parseAndClampInputs(); configureChartDensity(); state.rng = makeRng(state.params.seed); drawVisualization(); setStatus(t('resetDone')); }
  function onToggleNeedleHistory() {
    state.keepAllNeedles = dom.keepNeedlesSwitch.checked;
    drawVisualization();
  }
  function onToggleStepMode() { state.stepMode = !state.stepMode; updateStepModeButton(); }

  function bindEvents() {
    dom.startBtn.addEventListener('click', onStart);
    dom.pauseBtn.addEventListener('click', onPauseResume);
    dom.resetBtn.addEventListener('click', onReset);
    dom.keepNeedlesSwitch.addEventListener('change', onToggleNeedleHistory);
    dom.stepModeBtn.addEventListener('click', onToggleStepMode);
    dom.langSwitch.addEventListener('click', () => { state.lang = state.lang === 'cs' ? 'en' : 'cs'; localStorage.setItem('lang', state.lang); applyLanguage(); setStatus(t('ready')); });
    [dom.tInput, dom.lInput, dom.nInput, dom.seedInput, dom.previewToggle, dom.extendedToggle].forEach((el) => {
      el.addEventListener('change', () => { state.params = parseAndClampInputs(); configureChartDensity(); refreshOutputs(); drawVisualization(); });
    });
    window.addEventListener('resize', drawVisualization);
  }

  function initLanguage() { const saved = localStorage.getItem('lang'); state.lang = saved === 'en' ? 'en' : 'cs'; applyLanguage(); }

  function init() {
    prefillFromQuery();
    state.params = parseAndClampInputs();
    configureChartDensity();
    state.rng = makeRng(state.params.seed);
    initCharts();
    initLanguage();
    bindEvents();
    setRunButtons();
    refreshOutputs();
    drawVisualization();
    updateStepModeButton();
    setStatus(t('ready'));
  }

  init();
})();
