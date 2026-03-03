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
      xAxisLabel: 'N_done'
      ,
      keepNeedlesOff: 'Uchovat vsechny jehly: Vypnuto',
      keepNeedlesOn: 'Uchovat vsechny jehly: Zapnuto'
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
      keepNeedlesOff: 'Keep all needles: Off',
      keepNeedlesOn: 'Keep all needles: On'
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
    charts: {
      piChart: null,
      errorChart: null
    },
    series: {
      pi: [],
      absErr: []
    },
    chartStep: 50,
    lang: defaults.lang,
    keepAllNeedles: false,
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
    keepNeedlesBtn: document.getElementById('keepNeedlesBtn'),
    status: document.getElementById('status'),
    progress: document.getElementById('progress'),
    ciNote: document.getElementById('ciNote'),
    outPTheory: document.getElementById('outPTheory'),
    outK: document.getElementById('outK'),
    outPHat: document.getElementById('outPHat'),
    outPiHat: document.getElementById('outPiHat'),
    outAbsErr: document.getElementById('outAbsErr'),
    outRelErr: document.getElementById('outRelErr'),
    outCILow: document.getElementById('outCILow'),
    outCIHigh: document.getElementById('outCIHigh'),
    throwCanvas: document.getElementById('throwCanvas'),
    piChartTitle: document.getElementById('piChartTitle'),
    errorChartTitle: document.getElementById('errorChartTitle')
  };

  function t(key) {
    return translations[state.lang][key] || key;
  }

  function fmtNum(v, digits = 6) {
    if (!Number.isFinite(v)) return '-';
    return Number(v).toFixed(digits);
  }

  function clamp(v, min, max) {
    return Math.min(max, Math.max(min, v));
  }

  function setStatus(message) {
    dom.status.textContent = message;
  }

  function applyLanguage() {
    document.documentElement.lang = state.lang;
    dom.langSwitch.setAttribute('aria-pressed', String(state.lang === 'en'));
    dom.langSwitch.querySelectorAll('.lang-chip').forEach((chip) => {
      chip.classList.toggle('active', chip.dataset.lang === state.lang);
    });

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      const value = t(key);
      if (value.includes('<code>')) {
        el.innerHTML = value;
      } else {
        el.textContent = value;
      }
    });

    dom.seedInput.placeholder = t('seedPlaceholder');
    updateKeepNeedlesButton();
    updateChartTitles();
    refreshOutputs();
    drawVisualization();
    if (state.charts.piChart && state.charts.errorChart) {
      state.charts.piChart.options.scales.x.title.text = t('xAxisLabel');
      state.charts.errorChart.options.scales.x.title.text = t('xAxisLabel');
      state.charts.piChart.update('none');
      state.charts.errorChart.update('none');
    }
  }

  function parseAndClampInputs() {
    let changed = false;

    let tVal = Number.parseFloat(dom.tInput.value);
    if (!Number.isFinite(tVal)) tVal = defaults.t;
    const tClamped = clamp(tVal, 0.0001, Number.MAX_SAFE_INTEGER);
    if (tVal !== tClamped) changed = true;

    let lVal = Number.parseFloat(dom.lInput.value);
    if (!Number.isFinite(lVal)) lVal = defaults.l;
    const lClamped = clamp(lVal, 0.0001, Number.MAX_SAFE_INTEGER);
    if (lVal !== lClamped) changed = true;

    let nVal = Number.parseInt(dom.nInput.value, 10);
    if (!Number.isFinite(nVal)) nVal = defaults.N;
    const nClamped = clamp(nVal, 1, 1000000);
    if (nVal !== nClamped) changed = true;

    let seed = null;
    if (dom.seedInput.value.trim() !== '') {
      const parsedSeed = Number.parseInt(dom.seedInput.value, 10);
      if (Number.isFinite(parsedSeed)) {
        seed = parsedSeed | 0;
      } else {
        seed = defaults.seed;
        changed = true;
      }
    }

    const params = {
      t: tClamped,
      l: lClamped,
      N: nClamped,
      seed,
      showSinglePreview: dom.previewToggle.checked,
      useExtendedFormula: dom.extendedToggle.checked,
      lang: state.lang
    };

    dom.tInput.value = String(params.t);
    dom.lInput.value = String(params.l);
    dom.nInput.value = String(params.N);
    dom.seedInput.value = params.seed === null ? '' : String(params.seed);

    if (changed) {
      setStatus(t('clamped'));
    }

    return params;
  }

  function computeTheoryProbability(tVal, lVal, useExtendedFormula) {
    if (lVal <= tVal) {
      return clamp((2 * lVal) / (Math.PI * tVal), 0, 1);
    }
    if (!useExtendedFormula) {
      return null;
    }
    const r = lVal / tVal;
    const p = (2 / Math.PI) * (r - Math.sqrt(r * r - 1) + Math.acos(tVal / lVal));
    return clamp(p, 0, 1);
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

  function makeRng(seed) {
    return seed === null ? Math.random : mulberry32(seed);
  }

  function simulateThrow(tVal, lVal, rand) {
    const theta = rand() * (Math.PI / 2);
    const x = rand() * (tVal / 2);
    const intersect = x <= (lVal / 2) * Math.sin(theta);
    return { theta, x, intersect };
  }

  function computeMetrics() {
    const { N_done, K } = state;
    const { t: tVal, l: lVal, useExtendedFormula } = state.params;

    const pTheory = computeTheoryProbability(tVal, lVal, useExtendedFormula);
    const pHat = N_done > 0 ? K / N_done : null;

    let piHat = null;
    if (lVal <= tVal && K > 0 && N_done > 0) {
      piHat = (2 * lVal * N_done) / (tVal * K);
    }

    const absError = piHat === null ? null : Math.abs(piHat - Math.PI);
    const relError = absError === null ? null : absError / Math.PI;
    const probAbsError = pHat !== null && pTheory !== null ? Math.abs(pHat - pTheory) : null;

    let ciLow = null;
    let ciHigh = null;
    let ciReady = false;
    if (pHat !== null && N_done >= 30) {
      const margin = 1.96 * Math.sqrt((pHat * (1 - pHat)) / N_done);
      ciLow = clamp(pHat - margin, 0, 1);
      ciHigh = clamp(pHat + margin, 0, 1);
      ciReady = true;
    }

    return { pTheory, pHat, piHat, absError, relError, probAbsError, ciLow, ciHigh, ciReady };
  }

  function pushChartPoint(nVal, yMain, yError) {
    if (yMain !== null) {
      state.series.pi.push({ x: nVal, y: yMain });
    }
    if (yError !== null) {
      state.series.absErr.push({ x: nVal, y: yError });
    }
  }

  function updateChartTitles() {
    const longNeedle = state.params.l > state.params.t;
    const noIntersectionsYet = !longNeedle && state.K === 0;
    const useProbView = longNeedle || noIntersectionsYet;
    dom.piChartTitle.textContent = useProbView ? t('piChartTitleProb') : t('piChartTitle');
    dom.errorChartTitle.textContent = useProbView ? t('errorChartTitleProb') : t('errorChartTitle');
    if (state.charts.piChart && state.charts.errorChart) {
      state.charts.piChart.data.datasets[0].label = useProbView ? 'P_hat' : 'pi_hat';
      state.charts.errorChart.data.datasets[0].label = useProbView ? '|P_hat - P_theory|' : '|pi_hat - pi|';
      state.charts.piChart.update('none');
      state.charts.errorChart.update('none');
    }
  }

  function updateCharts() {
    state.charts.piChart.data.datasets[0].data = state.series.pi;
    state.charts.errorChart.data.datasets[0].data = state.series.absErr;
    state.charts.piChart.update('none');
    state.charts.errorChart.update('none');
  }

  function refreshOutputs() {
    const metrics = computeMetrics();
    updateChartTitles();

    dom.outPTheory.textContent = metrics.pTheory === null ? '-' : fmtNum(metrics.pTheory, 6);
    dom.outK.textContent = String(state.K);
    dom.outPHat.textContent = metrics.pHat === null ? '-' : fmtNum(metrics.pHat, 6);

    if (state.params.l > state.params.t) {
      dom.outPiHat.textContent = t('piOnlyForShort');
      dom.outAbsErr.textContent = '-';
      dom.outRelErr.textContent = '-';
    } else if (state.K === 0) {
      dom.outPiHat.textContent = t('notEnoughIntersections');
      dom.outAbsErr.textContent = '-';
      dom.outRelErr.textContent = '-';
    } else {
      dom.outPiHat.textContent = metrics.piHat === null ? '-' : fmtNum(metrics.piHat, 6);
      dom.outAbsErr.textContent = metrics.absError === null ? '-' : fmtNum(metrics.absError, 6);
      dom.outRelErr.textContent = metrics.relError === null ? '-' : fmtNum(metrics.relError, 6);
    }

    dom.outCILow.textContent = metrics.ciLow === null ? '-' : fmtNum(metrics.ciLow, 6);
    dom.outCIHigh.textContent = metrics.ciHigh === null ? '-' : fmtNum(metrics.ciHigh, 6);
    dom.ciNote.textContent = metrics.ciReady ? t('ciShown') : t('ciNeedN');
    dom.progress.textContent = `${t('progressLabel')}: ${state.N_done} / ${state.params.N || 0}`;

    if (metrics.pTheory === null && state.params.l > state.params.t && !state.params.useExtendedFormula) {
      setStatus(t('extendedDisabled'));
    }

    dom.pauseBtn.textContent = state.paused ? t('resumeBtn') : t('pauseBtn');
  }

  function resizeCanvasForDpr(canvas) {
    const dpr = Math.max(1, window.devicePixelRatio || 1);
    const rect = canvas.getBoundingClientRect();
    const width = Math.max(1, Math.floor(rect.width * dpr));
    const height = Math.max(1, Math.floor(rect.height * dpr));
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }
  }

  function buildNeedleRecord(throwData, rand) {
    return {
      ...throwData,
      sideRand: rand(),
      cxRand: rand()
    };
  }

  function buildNeedleEndpoints(throwData, params, width, height) {
    const centerYLine = height / 2;
    const spacingPx = Math.max(38, height / 4.4);
    const scale = spacingPx / params.t;
    const sign = throwData.sideRand < 0.5 ? -1 : 1;
    const xDistPx = throwData.x * scale;
    const cy = centerYLine + sign * xDistPx;
    const margin = 28;
    const cx = margin + throwData.cxRand * Math.max(1, width - 2 * margin);
    const dx = (params.l / 2) * Math.cos(throwData.theta) * scale;
    const dy = (params.l / 2) * Math.sin(throwData.theta) * scale;

    return { x1: cx - dx, y1: cy - dy, x2: cx + dx, y2: cy + dy };
  }

  function drawVisualization() {
    const canvas = dom.throwCanvas;
    resizeCanvasForDpr(canvas);
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    const styles = getComputedStyle(document.documentElement);
    const border = styles.getPropertyValue('--border').trim() || '#d9e2f0';
    const text = styles.getPropertyValue('--text').trim() || '#152238';

    ctx.fillStyle = styles.getPropertyValue('--surface-alt').trim() || '#f0f4fa';
    ctx.fillRect(0, 0, width, height);

    const centerY = height / 2;
    const spacingPx = Math.max(38, height / 4.4);
    ctx.strokeStyle = border;
    ctx.lineWidth = 1.25;

    for (let i = -2; i <= 2; i += 1) {
      const y = centerY + i * spacingPx;
      if (y < 0 || y > height) continue;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    let throwData = null;
    if (state.running && state.lastThrow) {
      throwData = state.lastThrow;
    } else if (state.params.showSinglePreview && !state.running) {
      const previewRng = makeRng(state.params.seed === null ? null : state.params.seed + 777);
      throwData = buildNeedleRecord(simulateThrow(state.params.t, state.params.l, previewRng), previewRng);
    }

    if (!throwData) {
      ctx.fillStyle = text;
      ctx.font = `${Math.max(14, Math.floor(height * 0.06))}px -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif`;
      ctx.fillText(t('previewHint'), 16, 28);
      return;
    }

    if (state.keepAllNeedles && state.needleHistory.length > 0) {
      ctx.lineWidth = 1.2;
      for (let i = 0; i < state.needleHistory.length; i += 1) {
        const needle = state.needleHistory[i];
        const nEp = buildNeedleEndpoints(needle, state.params, width, height);
        ctx.strokeStyle = needle.intersect ? 'rgba(230,80,80,0.45)' : 'rgba(42,109,244,0.45)';
        ctx.beginPath();
        ctx.moveTo(nEp.x1, nEp.y1);
        ctx.lineTo(nEp.x2, nEp.y2);
        ctx.stroke();
      }
    }

    const ep = buildNeedleEndpoints(throwData, state.params, width, height);
    ctx.strokeStyle = throwData.intersect ? '#e65050' : '#2a6df4';
    ctx.lineWidth = 2.6;
    ctx.beginPath();
    ctx.moveTo(ep.x1, ep.y1);
    ctx.lineTo(ep.x2, ep.y2);
    ctx.stroke();

    ctx.fillStyle = text;
    ctx.font = `${Math.max(13, Math.floor(height * 0.05))}px -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif`;
    ctx.fillText(throwData.intersect ? t('lastThrowHit') : t('lastThrowMiss'), 16, height - 14);
  }

  function setRunButtons() {
    dom.startBtn.disabled = state.running;
    dom.pauseBtn.disabled = !state.running;
    dom.pauseBtn.textContent = state.paused ? t('resumeBtn') : t('pauseBtn');
  }

  function updateKeepNeedlesButton() {
    dom.keepNeedlesBtn.textContent = state.keepAllNeedles ? t('keepNeedlesOn') : t('keepNeedlesOff');
  }

  function sampleChartsIfNeeded(force = false) {
    const metrics = computeMetrics();
    const longNeedle = state.params.l > state.params.t;
    let yMain = longNeedle ? metrics.pHat : (metrics.piHat ?? metrics.pHat);
    const yErr = longNeedle
      ? metrics.probAbsError
      : (metrics.absError ?? metrics.probAbsError);
    if (!longNeedle && metrics.piHat === null && yMain === 0) {
      // Keep a visible line even before first intersection.
      yMain = 1e-6;
    }
    if (yMain === null) return;

    if (force || state.N_done % state.chartStep === 0 || state.N_done === state.params.N) {
      pushChartPoint(state.N_done, yMain, yErr);
      updateCharts();
    }
  }

  function configureChartDensity() {
    const n = state.params.N;
    if (n <= 1000) {
      state.chartStep = 1;
    } else if (n <= 10000) {
      state.chartStep = 5;
    } else if (n <= 100000) {
      state.chartStep = 20;
    } else {
      state.chartStep = 50;
    }
  }

  function stopSimulation() {
    if (state.rafId !== null) {
      cancelAnimationFrame(state.rafId);
      state.rafId = null;
    }
    state.running = false;
    state.paused = false;
    setRunButtons();
  }

  function runAnimated() {
    state.running = true;
    state.paused = false;
    setRunButtons();
    setStatus(t('runAnimated'));

    const tick = () => {
      if (!state.running || state.paused) return;

      const remaining = state.params.N - state.N_done;
      if (remaining <= 0) {
        sampleChartsIfNeeded(true);
        refreshOutputs();
        stopSimulation();
        drawVisualization();
        setStatus(t('doneAnimated'));
        return;
      }

      let targetChunk = 130;
      if (state.params.N <= 300) targetChunk = 1;
      else if (state.params.N <= 2000) targetChunk = 5;
      const chunk = Math.min(remaining, targetChunk);
      for (let i = 0; i < chunk; i += 1) {
        const throwData = buildNeedleRecord(simulateThrow(state.params.t, state.params.l, state.rng), state.rng);
        state.N_done += 1;
        if (throwData.intersect) state.K += 1;
        state.lastThrow = throwData;
        state.needleHistory.push(throwData);
      }

      sampleChartsIfNeeded(false);
      refreshOutputs();
      drawVisualization();
      state.rafId = requestAnimationFrame(tick);
    };

    state.rafId = requestAnimationFrame(tick);
  }

  function resetForNewRun() {
    stopSimulation();
    state.N_done = 0;
    state.K = 0;
    state.lastThrow = null;
    state.needleHistory = [];
    state.series.pi = [];
    state.series.absErr = [];
    updateCharts();
    refreshOutputs();
  }

  function initCharts() {
    const common = {
      type: 'line',
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        parsing: false,
        scales: {
          x: {
            type: 'linear',
            title: { display: true, text: t('xAxisLabel') }
          }
        },
        plugins: {
          legend: { display: false }
        },
        elements: {
          point: {
            radius: (ctx) => (state.params.N <= 1000 ? 2 : 0),
            hoverRadius: 4
          },
          line: { borderWidth: 2 }
        }
      }
    };

    state.charts.piChart = new Chart(document.getElementById('piChart'), {
      ...common,
      data: {
        datasets: [{
          label: 'pi_hat',
          data: [],
          borderColor: '#2a6df4',
          backgroundColor: '#2a6df4'
        }]
      }
    });

    state.charts.errorChart = new Chart(document.getElementById('errorChart'), {
      ...common,
      data: {
        datasets: [{
          label: 'abs_error',
          data: [],
          borderColor: '#e65050',
          backgroundColor: '#e65050'
        }]
      }
    });
  }

  function getExportPayload() {
    const m = computeMetrics();
    return {
      timestamp: new Date().toISOString(),
      t: state.params.t,
      l: state.params.l,
      N: state.params.N,
      seed: state.params.seed,
      N_done: state.N_done,
      K: state.K,
      P_theory: m.pTheory,
      P_hat: m.pHat,
      pi_hat: m.piHat,
      abs_error: m.absError,
      rel_error: m.relError
    };
  }

  function prefillFromQuery() {
    const q = new URLSearchParams(window.location.search);

    if (q.has('t')) dom.tInput.value = q.get('t');
    if (q.has('l')) dom.lInput.value = q.get('l');
    if (q.has('N')) dom.nInput.value = q.get('N');
    if (q.has('seed')) dom.seedInput.value = q.get('seed');
  }

  function onStart() {
    resetForNewRun();
    state.params = parseAndClampInputs();
    configureChartDensity();
    state.rng = makeRng(state.params.seed);
    setRunButtons();
    refreshOutputs();
    drawVisualization();

    runAnimated();
  }

  function onPauseResume() {
    if (!state.running) return;

    state.paused = !state.paused;
    setRunButtons();

    if (state.paused) {
      if (state.rafId !== null) cancelAnimationFrame(state.rafId);
      state.rafId = null;
      setStatus(t('paused'));
    } else {
      setStatus(t('resumed'));
      runAnimated();
    }
  }

  function onReset() {
    resetForNewRun();
    state.params = parseAndClampInputs();
    configureChartDensity();
    state.rng = makeRng(state.params.seed);
    drawVisualization();
    setStatus(t('resetDone'));
  }

  function onToggleNeedleHistory() {
    state.keepAllNeedles = !state.keepAllNeedles;
    updateKeepNeedlesButton();
    drawVisualization();
  }

  function bindEvents() {
    dom.startBtn.addEventListener('click', onStart);
    dom.pauseBtn.addEventListener('click', onPauseResume);
    dom.resetBtn.addEventListener('click', onReset);
    dom.keepNeedlesBtn.addEventListener('click', onToggleNeedleHistory);

    dom.langSwitch.addEventListener('click', () => {
      state.lang = state.lang === 'cs' ? 'en' : 'cs';
      localStorage.setItem('lang', state.lang);
      applyLanguage();
      setStatus(t('ready'));
    });

    [dom.tInput, dom.lInput, dom.nInput, dom.seedInput, dom.previewToggle, dom.extendedToggle].forEach((el) => {
      el.addEventListener('change', () => {
        state.params = parseAndClampInputs();
        refreshOutputs();
        drawVisualization();
      });
    });

    window.addEventListener('resize', drawVisualization);
  }

  function initLanguage() {
    const saved = localStorage.getItem('lang');
    state.lang = saved === 'en' ? 'en' : 'cs';
    applyLanguage();
  }

  function init() {
    prefillFromQuery();
    initLanguage();
    state.params = parseAndClampInputs();
    configureChartDensity();
    state.rng = makeRng(state.params.seed);
    initCharts();
    bindEvents();
    setRunButtons();
    refreshOutputs();
    drawVisualization();
    setStatus(t('ready'));
  }

  init();
})();
