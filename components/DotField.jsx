import { useEffect, useRef, memo } from 'react';

const TWO_PI = Math.PI * 2;

const DotField = memo(({
  dotRadius = 1.5,
  dotSpacing = 22,
  cursorRadius = 250,
  cursorForce = 0.1,
  bulgeOnly = true,
  bulgeStrength = 35,
  glowRadius = 120,
  sparkle = false,
  waveAmplitude = 0,
  gradientFrom = 'rgba(168, 85, 247, 0.35)',
  gradientTo = 'rgba(180, 151, 207, 0.25)',
  glowColor = '#120F17',
  ...rest
}) => {
  const canvasRef = useRef(null);
  const svgRef = useRef(null);
  const glowRef = useRef(null);
  const dotsRef = useRef([]);
  const mouseRef = useRef({ x: -9999, y: -9999, prevX: -9999, prevY: -9999, speed: 0 });
  const rafRef = useRef(null);
  const sizeRef = useRef({ w: 0, h: 0, offsetX: 0, offsetY: 0 });
  const glowOpacity = useRef(0);
  const engagement = useRef(0);
  const propsRef = useRef({});
  propsRef.current = { dotRadius, dotSpacing, cursorRadius, cursorForce, bulgeOnly, bulgeStrength, sparkle, waveAmplitude, gradientFrom, gradientTo };
  const rebuildRef = useRef(null);
  // Cached background gradient. ctx.createLinearGradient() allocates a
  // new gradient object — recreating it every animation frame (as the
  // previous version did) is a real per-frame allocation cost for
  // something that only actually changes on resize or when the
  // gradient colors themselves change. Built once in doResize() and
  // whenever gradientFrom/gradientTo change, then just referenced in
  // tick().
  const gradientRef = useRef(null);
  const rebuildGradientRef = useRef(null);
  const glowIdRef = useRef(`dot-field-glow-${Math.random().toString(36).slice(2, 9)}`);

  useEffect(() => {
    const canvas = canvasRef.current;
    const glowEl = glowRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    // Clamped lower than a typical 2x/3x device pixel ratio: canvas
    // fill cost scales with dpr^2, so going from 2 -> 1.5 cuts pixel
    // count (and per-frame fill work) by ~44% on high-DPI screens
    // with a difference that's not perceptible for a soft dot field.
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let resizeTimer;
    // Tracks on-screen state so the rAF loop and the speed-sampling
    // interval can both fully stop when this instance scrolls out of
    // view, instead of redrawing ~1000 dots with per-dot trig every
    // frame forever regardless of visibility. With 3 DotField instances
    // on the page, at most one is ever likely to be on-screen at once.
    let isVisible = true;

    function resize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(doResize, 100);
    }

    function doResize() {
      const rect = canvas.parentElement.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      sizeRef.current = {
        w,
        h,
        offsetX: rect.left + window.scrollX,
        offsetY: rect.top + window.scrollY,
      };

      buildDots(w, h);
      rebuildGradient();
    }

    function rebuildGradient() {
      const { w: gw, h: gh } = sizeRef.current;
      if (gw <= 0 || gh <= 0) return;
      const p = propsRef.current;
      const grad = ctx.createLinearGradient(0, 0, gw, gh);
      grad.addColorStop(0, p.gradientFrom);
      grad.addColorStop(1, p.gradientTo);
      gradientRef.current = grad;
    }

    function buildDots(w, h) {
      const p = propsRef.current;
      const step = p.dotRadius + p.dotSpacing;
      const cols = Math.floor(w / step);
      const rows = Math.floor(h / step);
      const padX = (w % step) / 2;
      const padY = (h % step) / 2;
      const dots = new Array(rows * cols);
      let idx = 0;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const ax = padX + col * step + step / 2;
          const ay = padY + row * step + step / 2;
          dots[idx++] = { ax, ay, sx: ax, sy: ay, vx: 0, vy: 0, x: ax, y: ay };
        }
      }
      dotsRef.current = dots;
    }

    function onMouseMove(e) {
      const s = sizeRef.current;
      mouseRef.current.x = e.pageX - s.offsetX;
      mouseRef.current.y = e.pageY - s.offsetY;
      // tick() may have stopped scheduling itself after a sustained
      // idle period (see IDLE_PAUSE_FRAMES) — a fresh pointer move is
      // exactly the signal that should bring it back.
      if (isVisible && !rafRef.current) {
        rafRef.current = requestAnimationFrame(tick);
      }
    }

    function updateMouseSpeed() {
      if (!isVisible) return;
      const m = mouseRef.current;
      const dx = m.prevX - m.x;
      const dy = m.prevY - m.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      m.speed += (dist - m.speed) * 0.5;
      if (m.speed < 0.001) m.speed = 0;
      m.prevX = m.x;
      m.prevY = m.y;
    }

    const speedInterval = setInterval(updateMouseSpeed, 20);

    let frameCount = 0;

    // Consecutive frames the field has been fully at rest (no pointer
    // motion, no residual bulge/repel energy). Once this passes the
    // threshold we stop scheduling rAF entirely — see the idle check
    // at the top of tick() — instead of redrawing an unchanged canvas
    // 60x/sec while nothing on screen is actually moving. Only safe
    // when there's no ambient animation (wave/sparkle) that needs to
    // keep running regardless of pointer activity.
    let idleFrames = 0;
    const IDLE_PAUSE_FRAMES = 45; // ~0.75s at 60fps — enough for the ease-back to fully settle first

    function tick() {
      if (!isVisible) {
        rafRef.current = null; // stop scheduling — IO callback restarts us on re-entry
        return;
      }

      const m = mouseRef.current;
      const p = propsRef.current;

      // Loop-invariant reads, hoisted out of the per-dot loop below.
      const isBulge = p.bulgeOnly;
      const hasWave = p.waveAmplitude > 0;
      const hasSparkle = p.sparkle;
      const eng = engagement.current;

      const hasAmbientMotion = hasWave || hasSparkle;
      const atRest = eng < 0.0005 && m.speed < 0.02;

      if (!hasAmbientMotion && atRest) {
        idleFrames++;
        if (idleFrames > IDLE_PAUSE_FRAMES) {
          rafRef.current = null; // paused — onMouseMove wakes it back up
          return;
        }
      } else {
        idleFrames = 0;
      }

      frameCount++;
      const dots = dotsRef.current;
      const { w, h } = sizeRef.current;
      const len = dots.length;
      const t = frameCount * 0.02;

      const targetEngagement = Math.min(m.speed / 5, 1);
      engagement.current += (targetEngagement - eng) * 0.06;
      if (engagement.current < 0.001) engagement.current = 0;
      const engNow = engagement.current;

      glowOpacity.current += (engNow - glowOpacity.current) * 0.08;

      if (glowEl) {
        glowEl.setAttribute('cx', m.x);
        glowEl.setAttribute('cy', m.y);
        glowEl.style.opacity = glowOpacity.current;
      }

      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = gradientRef.current || p.gradientFrom;

      const cr = p.cursorRadius;
      const crSq = cr * cr;
      const invCr = 1 / cr;
      const rad = p.dotRadius / 2;
      const rad18 = rad * 1.8;
      const waveAmp = p.waveAmplitude;
      const engagedEnough = engNow > 0.01;
      // Loop-invariant products that were previously recomputed for
      // every single dot despite never changing within a frame.
      const bulgeFactor = p.bulgeStrength * engNow;
      const speedForce = m.speed * p.cursorForce * 500;
      const frameShift = frameCount >> 3;

      ctx.beginPath();

      for (let i = 0; i < len; i++) {
        const d = dots[i];
        const dx = m.x - d.ax;
        const dy = m.y - d.ay;
        const distSq = dx * dx + dy * dy;

        // Math.sqrt/atan2/cos/sin are all skipped entirely for any dot
        // outside the interaction radius or while nothing is engaged —
        // by far the majority of dots on any given frame.
        if (distSq < crSq && engagedEnough) {
          const dist = Math.sqrt(distSq);
          const invDist = dist > 0.0001 ? 1 / dist : 0;
          // atan2 followed by cos/sin is just normalizing (dx, dy) —
          // dividing by the distance we already have gives the same
          // unit vector for a fraction of the cost and no transcendental
          // function calls at all.
          const ux = dx * invDist;
          const uy = dy * invDist;
          if (isBulge) {
            const tt = 1 - dist * invCr;
            const push = tt * tt * bulgeFactor;
            d.sx += (d.ax - ux * push - d.sx) * 0.15;
            d.sy += (d.ay - uy * push - d.sy) * 0.15;
          } else {
            const move = speedForce * invDist;
            d.vx += -ux * move;
            d.vy += -uy * move;
          }
        } else if (isBulge) {
          d.sx += (d.ax - d.sx) * 0.1;
          d.sy += (d.ay - d.sy) * 0.1;
        }

        if (!isBulge) {
          d.vx *= 0.9;
          d.vy *= 0.9;
          d.x = d.ax + d.vx;
          d.y = d.ay + d.vy;
          d.sx += (d.x - d.sx) * 0.1;
          d.sy += (d.y - d.sy) * 0.1;
        }

        let drawX = d.sx;
        let drawY = d.sy;
        if (hasWave) {
          drawY += Math.sin(d.ax * 0.03 + t) * waveAmp;
          drawX += Math.cos(d.ay * 0.03 + t * 0.7) * waveAmp * 0.5;
        }

        if (hasSparkle) {
          const hash = ((i * 2654435761) ^ frameShift) >>> 0;
          if ((hash % 100) < 3) {
            ctx.moveTo(drawX + rad18, drawY);
            ctx.arc(drawX, drawY, rad18, 0, TWO_PI);
          } else {
            ctx.moveTo(drawX + rad, drawY);
            ctx.arc(drawX, drawY, rad, 0, TWO_PI);
          }
        } else {
          ctx.moveTo(drawX + rad, drawY);
          ctx.arc(drawX, drawY, rad, 0, TWO_PI);
        }
      }

      ctx.fill();

      rafRef.current = requestAnimationFrame(tick);
    }

    doResize();
    window.addEventListener('resize', resize);
    // Capture phase (not bubble) is deliberate: this listener must see every
    // pointermove over the page, including moves over interactive cards that
    // sit above the canvas (e.g. SpotlightCard's own mousemove-driven glow).
    // Those cards' handlers run in the bubble phase, and some call
    // stopPropagation() on the native event once they've used it, which would
    // otherwise stop it from ever reaching a bubble-phase window listener.
    // A capture-phase listener runs on the way down, before bubbling starts,
    // so it can't be blocked by anything a descendant does afterward.
    window.addEventListener('mousemove', onMouseMove, { passive: true, capture: true });
    rafRef.current = requestAnimationFrame(tick);

    const io = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = isVisible;
        isVisible = entry.isIntersecting;
        if (isVisible && !wasVisible && !rafRef.current) {
          rafRef.current = requestAnimationFrame(tick);
        }
      },
      { rootMargin: '100% 0px' }
    );
    io.observe(canvas.parentElement);

    rebuildRef.current = () => {
      const { w, h } = sizeRef.current;
      if (w > 0 && h > 0) buildDots(w, h);
    };
    rebuildGradientRef.current = rebuildGradient;

    return () => {
      io.disconnect();
      cancelAnimationFrame(rafRef.current);
      clearInterval(speedInterval);
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove, { capture: true });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    rebuildRef.current?.();
  }, [dotRadius, dotSpacing]);

  useEffect(() => {
    rebuildGradientRef.current?.();
  }, [gradientFrom, gradientTo]);

  return (
    <div className="w-full h-full relative" {...rest}>
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
        }}
      />
      <svg
        ref={svgRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      >
        <defs>
          <radialGradient id={glowIdRef.current}>
            <stop offset="0%" stopColor={glowColor} />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <circle
          ref={glowRef}
          cx="-9999"
          cy="-9999"
          r={glowRadius}
          fill={`url(#${glowIdRef.current})`}
          style={{ opacity: 0, willChange: 'opacity' }}
        />
      </svg>
    </div>
  );
});

DotField.displayName = 'DotField';

export default DotField;