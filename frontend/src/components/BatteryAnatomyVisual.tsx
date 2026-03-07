import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './BatteryAnatomyVisual.css';

interface BatteryAnatomyVisualProps {
    accent: string;
    progress?: number; // 0 to 1 for disassembly
    showHud?: boolean;
}

// Math Utilities
const eio = (t: number) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
const eout5 = (t: number) => 1 - Math.pow(1 - t, 5);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

const BatteryAnatomyVisual: React.FC<BatteryAnatomyVisualProps> = ({ accent, progress = 0, showHud = false }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const logoImgRef = useRef<HTMLImageElement | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const img = new Image();
        img.src = '/assets/powerfrill-alternate-logo.jpg';
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.drawImage(img, 0, 0);
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const data = imageData.data;
                for (let i = 0; i < data.length; i += 4) {
                    if (data[i] > 240 && data[i + 1] > 240 && data[i + 2] > 240) {
                        data[i + 3] = 0;
                    }
                }
                ctx.putImageData(imageData, 0, 0);
                // Create a temporary image to store the transparent version
                const transparentImg = new Image();
                transparentImg.src = canvas.toDataURL();
                transparentImg.onload = () => {
                    logoImgRef.current = transparentImg;
                };
            } else {
                logoImgRef.current = img;
            }
        };
    }, []);

    useEffect(() => {
        const cv = canvasRef.current;
        if (!cv) return;
        const ctx = cv.getContext('2d');
        if (!ctx) return;

        let W: number, H: number, CX: number, CY: number;

        const resize = () => {
            W = cv.width = cv.clientWidth;
            H = cv.height = cv.clientHeight;
            CX = W / 2;
            CY = H / 2 + 10;
        };
        resize();
        window.addEventListener('resize', resize);

        const rr = (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) => {
            r = Math.min(r, w / 2, h / 2);
            ctx.beginPath();
            ctx.moveTo(x + r, y); ctx.lineTo(x + w - r, y); ctx.quadraticCurveTo(x + w, y, x + w, y + r);
            ctx.lineTo(x + w, y + h - r); ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
            ctx.lineTo(x + r, y + h); ctx.quadraticCurveTo(x, y + h, x, y + h - r);
            ctx.lineTo(x, y + r); ctx.quadraticCurveTo(x, y, x + r, y); ctx.closePath();
        };

        const LAYERS = [
            // OUTER CASING TOP
            {
                ax: 0, ay: -225, az: 0, ex: 0, ey: -350, ez: 60, erx: -20, erz: 4,
                s: 0.05, e: 0.18, lbl: 'l-casing',
                draw: (c: CanvasRenderingContext2D, cx: number, cy: number, sc: number, al: number) => {
                    c.save(); c.globalAlpha = al;
                    c.fillStyle = '#8a9eb2'; c.strokeStyle = '#c0d4e4'; c.lineWidth = 1.5;
                    const hw = 110 * sc, hh = 14 * sc;
                    rr(c, cx - hw, cy - hh, hw * 2, hh * 2, 5 * sc); c.fill(); c.stroke();
                    c.fillStyle = '#aabece';
                    c.beginPath(); c.moveTo(cx - hw, cy - hh); c.lineTo(cx + hw, cy - hh);
                    c.lineTo(cx + hw - 8 * sc, cy - hh - 8 * sc); c.lineTo(cx - hw + 8 * sc, cy - hh - 8 * sc); c.closePath(); c.fill();
                    c.fillStyle = '#9aaebb'; c.strokeStyle = '#c8dcea'; c.lineWidth = 1;
                    rr(c, cx - 55 * sc, cy - hh - 12 * sc, 110 * sc, 12 * sc, 4 * sc); c.fill(); c.stroke();

                    // Branding
                    if (logoImgRef.current) {
                        try {
                            const logoW = 38 * sc, logoH = 10 * sc;
                            c.globalAlpha = al * 0.5;
                            c.drawImage(logoImgRef.current, cx - logoW / 2, cy - hh + 4 * sc, logoW, logoH);
                            c.globalAlpha = al;
                        } catch (e) { /* silent fail */ }
                    }

                    c.fillStyle = accent; c.strokeStyle = accent; c.lineWidth = 2.5 * sc; c.lineCap = 'round';
                    c.beginPath(); c.moveTo(cx, cy - hh - 8 * sc); c.lineTo(cx, cy - hh - 2 * sc); c.stroke();
                    c.beginPath(); c.moveTo(cx - 4 * sc, cy - hh - 5 * sc); c.lineTo(cx + 4 * sc, cy - hh - 5 * sc); c.stroke();
                    for (let i = 0; i < 4; i++) {
                        const rx = cx - 80 * sc + i * 55 * sc;
                        c.strokeStyle = 'rgba(255,255,255,0.12)'; c.lineWidth = 0.8;
                        c.beginPath(); c.moveTo(rx, cy - hh); c.lineTo(rx, cy + hh); c.stroke();
                    }
                    c.restore();
                }
            },
            // OUTER CASING BOTTOM
            {
                ax: 0, ay: 222, az: 0, ex: 0, ey: 360, ez: 60, erx: 20, erz: -4,
                s: 0.05, e: 0.18, lbl: null,
                draw: (c: CanvasRenderingContext2D, cx: number, cy: number, sc: number, al: number) => {
                    c.save(); c.globalAlpha = al;
                    c.fillStyle = '#8a9eb2'; c.strokeStyle = '#c0d4e4'; c.lineWidth = 1.5;
                    rr(c, cx - 110 * sc, cy - 14 * sc, 220 * sc, 28 * sc, 6 * sc); c.fill(); c.stroke();
                    c.fillStyle = '#5a6e80';
                    c.beginPath(); c.moveTo(cx - 110 * sc, cy + 14 * sc); c.lineTo(cx + 110 * sc, cy + 14 * sc);
                    c.lineTo(cx + 104 * sc, cy + 20 * sc); c.lineTo(cx - 104 * sc, cy + 20 * sc); c.closePath(); c.fill();
                    [[cx - 90 * sc, cy], [cx, cy], [cx + 90 * sc, cy]].forEach(([hx, hy]) => {
                        c.fillStyle = '#02050a'; c.strokeStyle = 'rgba(154,171,191,0.4)'; c.lineWidth = 1;
                        c.beginPath(); c.arc(hx, hy, 5 * sc, 0, Math.PI * 2); c.fill(); c.stroke();
                        c.fillStyle = '#040810'; c.beginPath(); c.arc(hx, hy, 2.5 * sc, 0, Math.PI * 2); c.fill();
                    });
                    c.restore();
                }
            },
            // LEFT SIDE WALL
            {
                ax: -108, ay: 0, az: 0, ex: -310, ey: 0, ez: 40, erx: 0, erz: 0,
                s: 0.08, e: 0.22, lbl: null,
                draw: (c: CanvasRenderingContext2D, cx: number, cy: number, sc: number, al: number) => {
                    c.save(); c.globalAlpha = al;
                    const hw = 9 * sc, hh = 200 * sc;
                    const g = c.createLinearGradient(cx - hw, 0, cx + hw, 0);
                    g.addColorStop(0, '#3a4a5a'); g.addColorStop(0.3, '#7a8ea0'); g.addColorStop(0.7, '#9aaebb'); g.addColorStop(1, '#4a5a6a');
                    c.fillStyle = g; c.strokeStyle = 'rgba(180,200,220,0.3)'; c.lineWidth = 1;
                    rr(c, cx - hw, cy - hh, hw * 2, hh * 2, 4 * sc); c.fill(); c.stroke();

                    // Side Vertical Branding
                    if (logoImgRef.current) {
                        c.save(); c.translate(cx, cy); c.rotate(-Math.PI / 2); c.globalAlpha = al * 0.3;
                        c.drawImage(logoImgRef.current, -50 * sc, -7 * sc, 100 * sc, 14 * sc);
                        c.restore();
                    }

                    [cy - 100 * sc, cy, cy + 100 * sc].forEach(ny => {
                        c.fillStyle = 'rgba(0,0,0,0.6)'; rr(c, cx - hw, ny - 4 * sc, hw * 2, 8 * sc, 2 * sc); c.fill();
                        c.strokeStyle = 'rgba(154,171,191,0.25)'; c.lineWidth = 0.8; rr(c, cx - hw, ny - 4 * sc, hw * 2, 8 * sc, 2 * sc); c.stroke();
                    });
                    c.restore();
                }
            },
            // RIGHT SIDE WALL
            {
                ax: 108, ay: 0, az: 0, ex: 310, ey: 0, ez: 40, erx: 0, erz: 0,
                s: 0.08, e: 0.22, lbl: null,
                draw: (c: CanvasRenderingContext2D, cx: number, cy: number, sc: number, al: number) => {
                    c.save(); c.globalAlpha = al;
                    const hw = 9 * sc, hh = 200 * sc;
                    const g = c.createLinearGradient(cx - hw, 0, cx + hw, 0);
                    g.addColorStop(0, '#3a4a5a'); g.addColorStop(0.3, '#7a8ea0'); g.addColorStop(0.7, '#9aaebb'); g.addColorStop(1, '#4a5a6a');
                    c.fillStyle = g; c.strokeStyle = 'rgba(180,200,220,0.3)'; c.lineWidth = 1;
                    rr(c, cx - hw, cy - hh, hw * 2, hh * 2, 4 * sc); c.fill(); c.stroke();

                    // Side Vertical Branding
                    if (logoImgRef.current) {
                        c.save(); c.translate(cx, cy); c.rotate(Math.PI / 2); c.globalAlpha = al * 0.3;
                        c.drawImage(logoImgRef.current, -50 * sc, -7 * sc, 100 * sc, 14 * sc);
                        c.restore();
                    }

                    [cy - 100 * sc, cy, cy + 100 * sc].forEach(ny => {
                        c.fillStyle = 'rgba(0,0,0,0.6)'; rr(c, cx - hw, ny - 4 * sc, hw * 2, 8 * sc, 2 * sc); c.fill();
                        c.strokeStyle = 'rgba(154,171,191,0.25)'; c.lineWidth = 0.8; rr(c, cx - hw, ny - 4 * sc, hw * 2, 8 * sc, 2 * sc); c.stroke();
                    });
                    c.restore();
                }
            },
            // BMS PCB
            {
                ax: 0, ay: -175, az: 8, ex: 0, ey: -310, ez: 120, erx: -28, erz: -5,
                s: 0.16, e: 0.3, lbl: 'l-bms',
                draw: (c: CanvasRenderingContext2D, cx: number, cy: number, sc: number, al: number) => {
                    c.save(); c.globalAlpha = al;
                    const hw = 96 * sc, hh = 22 * sc;
                    c.fillStyle = '#071a10'; c.strokeStyle = 'rgba(0,229,255,0.5)'; c.lineWidth = 1.5;
                    rr(c, cx - hw, cy - hh, hw * 2, hh * 2, 4 * sc); c.fill(); c.stroke();
                    c.strokeStyle = 'rgba(0,229,255,0.13)'; c.lineWidth = sc;
                    for (let i = 0; i < 7; i++) { c.beginPath(); c.moveTo(cx - hw + 8 * sc, cy - hh + (5 + i * 5) * sc); c.lineTo(cx + hw - 8 * sc, cy - hh + (5 + i * 5) * sc); c.stroke(); }
                    for (let i = 0; i < 5; i++) { const vx = cx - hw + 20 * sc + i * 36 * sc; c.beginPath(); c.moveTo(vx, cy - hh); c.lineTo(vx, cy + hh); c.stroke(); }
                    [[-0.38, 'MCU', 'rgba(255,140,0,0.9)'], [-0.12, 'BMS', 'rgba(0,229,255,0.85)'], [0.13, 'FET', 'rgba(0,229,255,0.85)'], [0.38, 'IC', 'rgba(0,255,136,0.85)']].forEach(([rx, lbl, col]) => {
                        const cx2 = cx + (rx as number) * hw * 2, cy2 = cy - 4 * sc, cw = 24 * sc, ch = 20 * sc;
                        c.fillStyle = '#040e08'; c.strokeStyle = col as string; c.lineWidth = sc;
                        rr(c, cx2 - cw / 2, cy2 - ch / 2, cw, ch, 2 * sc); c.fill(); c.stroke();
                        c.fillStyle = col as string; c.font = `${6 * sc}px Orbitron,monospace`; c.textAlign = 'center'; c.fillText(lbl as string, cx2, cy2 + 3 * sc);
                    });
                    ['#00ff88', '#00ff88', '#ff8c00', '#00e5ff', '#00ff88'].forEach((col, i) => {
                        const lx = cx - 40 * sc + i * 20 * sc, ly = cy + 16 * sc;
                        c.fillStyle = col; c.shadowColor = col; c.shadowBlur = 7 * sc;
                        c.beginPath(); c.arc(lx, ly, 3.5 * sc, 0, Math.PI * 2); c.fill(); c.shadowBlur = 0;
                    });
                    c.restore();
                }
            },
            // COPPER BUSBARS
            {
                ax: 0, ay: -132, az: 5, ex: 60, ey: -260, ez: 160, erx: -18, erz: 8,
                s: 0.22, e: 0.36, lbl: 'l-bus',
                draw: (c: CanvasRenderingContext2D, cx: number, cy: number, sc: number, al: number) => {
                    c.save(); c.globalAlpha = al;
                    const hw = 96 * sc, hh = 10 * sc; const n = 8;
                    for (let i = 0; i < n; i++) {
                        const bx = cx - hw + i * (hw * 2 / n); const isU = i % 2 === 0;
                        c.fillStyle = isU ? 'rgba(210,170,70,0.92)' : 'rgba(185,145,55,0.9)';
                        c.strokeStyle = 'rgba(255,210,100,0.45)'; c.lineWidth = 0.6;
                        rr(c, bx + 1 * sc, cy - hh, hw * 2 / n - 2 * sc, hh * 2, 2 * sc); c.fill(); c.stroke();
                        c.fillStyle = 'rgba(255,245,180,0.2)'; rr(c, bx + 2 * sc, cy - hh + 1 * sc, (hw * 2 / n) / 3, hh * 2 - 2 * sc, 1 * sc); c.fill();
                    }
                    c.restore();
                }
            },
            // CELL GROUP 1
            {
                ax: 0, ay: -82, az: 3, ex: -50, ey: -195, ez: 200, erx: -14, erz: 5,
                s: 0.28, e: 0.42, lbl: 'l-cell1',
                draw: (c: CanvasRenderingContext2D, cx: number, cy: number, sc: number, al: number, _t: number, charge: number) => {
                    c.save(); c.globalAlpha = al;
                    const n = 4, hw = 96 * sc, hh = 30 * sc, ch = hh * 2 / n;
                    for (let i = 0; i < n; i++) {
                        const cy2 = cy - hh + i * ch + 1 * sc;
                        c.fillStyle = '#0e2038'; c.strokeStyle = 'rgba(154,171,191,0.28)'; c.lineWidth = 0.8;
                        rr(c, cx - hw, cy2, hw * 2, ch - 2 * sc, 3 * sc); c.fill(); c.stroke();
                        const fw = (hw * 2 - 8 * sc) * charge;
                        if (fw > 0) {
                            const g = c.createLinearGradient(cx - hw + 4 * sc, 0, cx - hw + 4 * sc + fw, 0);
                            g.addColorStop(0, '#ff4400'); g.addColorStop(0.5, '#ff8c00'); g.addColorStop(1, '#ffdd00');
                            c.fillStyle = g; c.globalAlpha = al * 0.82;
                            rr(c, cx - hw + 4 * sc, cy2 + 3 * sc, fw, ch - 8 * sc, 2 * sc); c.fill(); c.globalAlpha = al;
                        }
                        [cx - 32 * sc, cx, cx + 32 * sc].forEach(vx => { c.strokeStyle = 'rgba(154,171,191,0.15)'; c.lineWidth = 0.5; c.beginPath(); c.moveTo(vx, cy2 + 2 * sc); c.lineTo(vx, cy2 + ch - 4 * sc); c.stroke(); });
                        c.fillStyle = '#00e5ff'; c.shadowColor = '#00e5ff'; c.shadowBlur = 5 * sc;
                        c.beginPath(); c.arc(cx - hw + 8 * sc, cy2 + ch / 2 - 1 * sc, 3.5 * sc, 0, Math.PI * 2); c.fill();
                        c.beginPath(); c.arc(cx + hw - 8 * sc, cy2 + ch / 2 - 1 * sc, 3.5 * sc, 0, Math.PI * 2); c.fill(); c.shadowBlur = 0;
                        c.fillStyle = 'rgba(0,229,255,0.3)'; c.font = `${5 * sc}px Orbitron,monospace`; c.textAlign = 'center';
                        c.fillText(`LFP-C${i + 1} · 3.2V`, cx, cy2 + ch / 2 + 2 * sc);
                    }
                    c.restore();
                }
            },
            // PE SEPARATOR
            {
                ax: 0, ay: -24, az: 1, ex: 70, ey: -115, ez: 240, erx: -7, erz: -6,
                s: 0.34, e: 0.48, lbl: 'l-sep',
                draw: (c: CanvasRenderingContext2D, cx: number, cy: number, sc: number, al: number) => {
                    c.save(); c.globalAlpha = al;
                    const hw = 96 * sc, hh = 7 * sc;
                    c.fillStyle = 'rgba(190,235,255,0.22)'; c.strokeStyle = 'rgba(160,220,255,0.45)'; c.lineWidth = 1;
                    rr(c, cx - hw, cy - hh, hw * 2, hh * 2, 2 * sc); c.fill(); c.stroke();
                    c.strokeStyle = 'rgba(200,240,255,0.18)'; c.lineWidth = 0.5; c.setLineDash([3 * sc, 3 * sc]);
                    for (let i = 0; i < 12; i++) { const lx = cx - hw + (i / 11) * hw * 2; c.beginPath(); c.moveTo(lx, cy - hh); c.lineTo(lx, cy + hh); c.stroke(); }
                    c.setLineDash([]); c.fillStyle = 'rgba(180,230,255,0.5)'; c.font = `${4.5 * sc}px Orbitron,monospace`; c.textAlign = 'center';
                    c.fillText('PE MICROPOROUS MEMBRANE · 25μm', cx, cy + 1.5 * sc);
                    c.restore();
                }
            },
            // GRAPHITE ANODE FOIL
            {
                ax: 0, ay: -10, az: 0, ex: -65, ey: -75, ez: 265, erx: -4, erz: 5,
                s: 0.38, e: 0.52, lbl: 'l-anode',
                draw: (c: CanvasRenderingContext2D, cx: number, cy: number, sc: number, al: number) => {
                    c.save(); c.globalAlpha = al;
                    const hw = 96 * sc, hh = 8 * sc;
                    c.fillStyle = '#1c2830'; c.strokeStyle = 'rgba(120,160,180,0.55)'; c.lineWidth = 1;
                    rr(c, cx - hw, cy - hh, hw * 2, hh * 2, 1.5 * sc); c.fill(); c.stroke();
                    const g = c.createLinearGradient(cx - hw, 0, cx + hw, 0);
                    g.addColorStop(0, 'transparent'); g.addColorStop(0.35, 'rgba(110,150,175,0.45)');
                    g.addColorStop(0.65, 'transparent'); g.addColorStop(1, 'rgba(90,130,155,0.2)');
                    c.fillStyle = g; c.globalAlpha = al * 0.7;
                    rr(c, cx - hw, cy - hh, hw * 2, hh * 2, 1.5 * sc); c.fill(); c.globalAlpha = al;
                    c.fillStyle = 'rgba(100,140,160,0.2)';
                    for (let i = 0; i < 30; i++) { const dx = (i / 29) * hw * 1.9 - hw * 0.95; c.beginPath(); c.arc(cx + dx, cy, 0.8 * sc, 0, Math.PI * 2); c.fill(); }
                    c.fillStyle = 'rgba(130,180,200,0.55)'; c.font = `${4.5 * sc}px Orbitron,monospace`; c.textAlign = 'center';
                    c.fillText('GRAPHITE ANODE · Cu CURRENT COLLECTOR', cx, cy + 1.5 * sc);
                    c.restore();
                }
            },
            // CELL GROUP 2
            {
                ax: 0, ay: 8, az: 0, ex: 0, ey: 0, ez: 280, erx: 0, erz: -3,
                s: 0.4, e: 0.55, lbl: null,
                draw: (c: CanvasRenderingContext2D, cx: number, cy: number, sc: number, al: number, _t: number, charge: number) => {
                    c.save(); c.globalAlpha = al;
                    const n = 4, hw = 96 * sc, hh = 30 * sc, ch = hh * 2 / n;
                    for (let i = 0; i < n; i++) {
                        const cy2 = cy - hh + i * ch + 1 * sc;
                        c.fillStyle = '#102030'; c.strokeStyle = 'rgba(154,171,191,0.25)'; c.lineWidth = 0.8;
                        rr(c, cx - hw, cy2, hw * 2, ch - 2 * sc, 3 * sc); c.fill(); c.stroke();
                        const fw = (hw * 2 - 8 * sc) * charge;
                        if (fw > 0) {
                            const g = c.createLinearGradient(cx - hw + 4 * sc, 0, cx - hw + 4 * sc + fw, 0);
                            g.addColorStop(0, '#ff4400'); g.addColorStop(0.6, '#ff8c00'); g.addColorStop(1, '#ffd000');
                            c.fillStyle = g; c.globalAlpha = al * 0.8;
                            rr(c, cx - hw + 4 * sc, cy2 + 3 * sc, fw, ch - 8 * sc, 2 * sc); c.fill(); c.globalAlpha = al;
                        }
                        c.fillStyle = '#ff8c00'; c.shadowColor = '#ff8c00'; c.shadowBlur = 5 * sc;
                        c.beginPath(); c.arc(cx - hw + 8 * sc, cy2 + ch / 2 - 1 * sc, 3.5 * sc, 0, Math.PI * 2); c.fill();
                        c.beginPath(); c.arc(cx + hw - 8 * sc, cy2 + ch / 2 - 1 * sc, 3.5 * sc, 0, Math.PI * 2); c.fill(); c.shadowBlur = 0;
                        c.fillStyle = 'rgba(255,140,0,0.25)'; c.font = `${5 * sc}px Orbitron,monospace`; c.textAlign = 'center';
                        c.fillText(`LFP-C${i + 5} · 3.2V`, cx, cy2 + ch / 2 + 2 * sc);
                    }
                    c.restore();
                }
            },
            // LFP CATHODE FOIL
            {
                ax: 0, ay: 44, az: 0, ex: 65, ey: 110, ez: 255, erx: 5, erz: -5,
                s: 0.44, e: 0.58, lbl: 'l-cath',
                draw: (c: CanvasRenderingContext2D, cx: number, cy: number, sc: number, al: number) => {
                    c.save(); c.globalAlpha = al;
                    const hw = 96 * sc, hh = 8 * sc;
                    c.fillStyle = '#2e1508'; c.strokeStyle = 'rgba(255,140,50,0.55)'; c.lineWidth = 1;
                    rr(c, cx - hw, cy - hh, hw * 2, hh * 2, 1.5 * sc); c.fill(); c.stroke();
                    const g = c.createLinearGradient(cx - hw, 0, cx + hw, 0);
                    g.addColorStop(0, 'transparent'); g.addColorStop(0.4, 'rgba(255,140,40,0.38)');
                    g.addColorStop(0.7, 'transparent'); g.addColorStop(1, 'rgba(200,100,20,0.18)');
                    c.fillStyle = g; c.globalAlpha = al * 0.7;
                    rr(c, cx - hw, cy - hh, hw * 2, hh * 2, 1.5 * sc); c.fill(); c.globalAlpha = al;
                    for (let i = 0; i < 30; i++) { const dx = (i / 29) * hw * 1.9 - hw * 0.95; c.fillStyle = 'rgba(255,140,40,0.25)'; c.beginPath(); c.arc(cx + dx, cy, 0.9 * sc, 0, Math.PI * 2); c.fill(); }
                    c.fillStyle = 'rgba(255,160,50,0.6)'; c.font = `${4.5 * sc}px Orbitron,monospace`; c.textAlign = 'center';
                    c.fillText('LiFePO₄ CATHODE · Al CURRENT COLLECTOR', cx, cy + 1.5 * sc);
                    c.restore();
                }
            },
            // ELECTROLYTE
            {
                ax: 0, ay: 75, az: 0, ex: 55, ey: 190, ez: 215, erx: 13, erz: -4,
                s: 0.5, e: 0.64, lbl: 'l-elec',
                draw: (c: CanvasRenderingContext2D, cx: number, cy: number, sc: number, al: number, _et: number, _charge: number, anim: number) => {
                    c.save(); c.globalAlpha = al;
                    const hw = 96 * sc, hh = 10 * sc;
                    const g = c.createLinearGradient(cx - hw, cy - hh, cx + hw, cy + hh);
                    g.addColorStop(0, 'rgba(0,60,150,0.5)'); g.addColorStop(0.5, 'rgba(0,120,230,0.42)'); g.addColorStop(1, 'rgba(0,50,120,0.5)');
                    c.fillStyle = g; c.strokeStyle = 'rgba(0,200,255,0.55)'; c.lineWidth = 1.5;
                    rr(c, cx - hw, cy - hh, hw * 2, hh * 2, 3 * sc); c.fill(); c.stroke();
                    const wv = (anim * 0.6) % 1;
                    for (let i = 0; i < 6; i++) {
                        const fx = cx - hw + ((i * 0.18 + wv) % 1) * hw * 2;
                        c.strokeStyle = 'rgba(0,229,255,0.25)'; c.lineWidth = 0.8;
                        c.beginPath(); c.moveTo(fx, cy - hh + 2 * sc); c.lineTo(fx, cy + hh - 2 * sc); c.stroke();
                        c.fillStyle = 'rgba(0,229,255,0.8)'; c.shadowColor = 'rgba(0,229,255,1)'; c.shadowBlur = 5 * sc;
                        c.beginPath(); c.arc(fx, cy, 1.5 * sc, 0, Math.PI * 2); c.fill(); c.shadowBlur = 0;
                    }
                    c.fillStyle = 'rgba(0,229,255,0.65)'; c.font = `${5 * sc}px Orbitron,monospace`; c.textAlign = 'center';
                    c.fillText('LiPF₆  ·  EC:DMC  ·  ELECTROLYTE SOLUTION', cx, cy + 1.8 * sc);
                    c.restore();
                }
            },
            // CELL GROUP 3
            {
                ax: 0, ay: 98, az: 0, ex: -45, ey: 230, ez: 185, erx: 18, erz: 5,
                s: 0.54, e: 0.68, lbl: 'l-cell2',
                draw: (c: CanvasRenderingContext2D, cx: number, cy: number, sc: number, al: number, _et: number, charge: number) => {
                    c.save(); c.globalAlpha = al;
                    const n = 4, hw = 96 * sc, hh = 30 * sc, ch = hh * 2 / n;
                    for (let i = 0; i < n; i++) {
                        const cy2 = cy - hh + i * ch + 1 * sc;
                        c.fillStyle = '#0a1f35'; c.strokeStyle = 'rgba(154,171,191,0.25)'; c.lineWidth = 0.8;
                        rr(c, cx - hw, cy2, hw * 2, ch - 2 * sc, 3 * sc); c.fill(); c.stroke();
                        const fw = (hw * 2 - 8 * sc) * charge;
                        if (fw > 0) {
                            const g = c.createLinearGradient(cx - hw + 4 * sc, 0, cx - hw + 4 * sc + fw, 0);
                            g.addColorStop(0, '#ff4400'); g.addColorStop(0.5, '#ff8c00'); g.addColorStop(1, '#ffdd00');
                            c.fillStyle = g; c.globalAlpha = al * 0.8;
                            rr(c, cx - hw + 4 * sc, cy2 + 3 * sc, fw, ch - 8 * sc, 2 * sc); c.fill(); c.globalAlpha = al;
                        }
                        c.fillStyle = '#00ff88'; c.shadowColor = '#00ff88'; c.shadowBlur = 5 * sc;
                        c.beginPath(); c.arc(cx - hw + 8 * sc, cy2 + ch / 2 - 1 * sc, 3.5 * sc, 0, Math.PI * 2); c.fill();
                        c.beginPath(); c.arc(cx + hw - 8 * sc, cy2 + ch / 2 - 1 * sc, 3.5 * sc, 0, Math.PI * 2); c.fill(); c.shadowBlur = 0;
                        c.fillStyle = 'rgba(0,255,136,0.25)'; c.font = `${5 * sc}px Orbitron,monospace`; c.textAlign = 'center';
                        c.fillText(`LFP-C${i + 9} · 3.2V`, cx, cy2 + ch / 2 + 2 * sc);
                    }
                    c.restore();
                }
            },
            // COOLING PLATE
            {
                ax: 0, ay: 180, az: 4, ex: 0, ey: 350, ez: 90, erx: 28, erz: 3,
                s: 0.65, e: 0.78, lbl: 'l-cool',
                draw: (c: CanvasRenderingContext2D, cx: number, cy: number, sc: number, al: number, _et: number, _charge: number, anim: number) => {
                    c.save(); c.globalAlpha = al;
                    const hw = 108 * sc, hh = 13 * sc;
                    c.fillStyle = '#060f1a'; c.strokeStyle = 'rgba(154,171,191,0.4)'; c.lineWidth = 1.5;
                    rr(c, cx - hw, cy - hh, hw * 2, hh * 2, 4 * sc); c.fill(); c.stroke();
                    const nc = 6, cw = (hw * 2 - 16 * sc) / nc;
                    for (let i = 0; i < nc; i++) {
                        const bx = cx - hw + 8 * sc + i * cw;
                        c.fillStyle = 'rgba(0,40,80,0.7)'; c.strokeStyle = 'rgba(0,229,255,0.3)'; c.lineWidth = 0.8;
                        rr(c, bx, cy - hh + 3 * sc, cw - 3 * sc, hh * 2 - 6 * sc, 3 * sc); c.fill(); c.stroke();
                        const fp = ((anim * 0.4) + (i * 0.18)) % 1; const fx = bx + fp * (cw - 3 * sc);
                        c.fillStyle = 'rgba(0,200,255,0.7)'; c.shadowColor = 'rgba(0,200,255,1)'; c.shadowBlur = 5 * sc;
                        c.beginPath(); c.arc(fx, cy, 2 * sc, 0, Math.PI * 2); c.fill(); c.shadowBlur = 0;
                    }
                    c.restore();
                }
            },
            // BASE
            {
                ax: 0, ay: 210, az: 0, ex: 0, ey: 375, ez: 60, erx: 32, erz: -3,
                s: 0.7, e: 0.82, lbl: 'l-base',
                draw: (c: CanvasRenderingContext2D, cx: number, cy: number, sc: number, al: number) => {
                    c.save(); c.globalAlpha = al;
                    const hw = 108 * sc, hh = 15 * sc;
                    const g = c.createLinearGradient(cx - hw, 0, cx + hw, 0);
                    g.addColorStop(0, '#3a4a5a'); g.addColorStop(0.3, '#8090a0'); g.addColorStop(0.5, '#aabece'); g.addColorStop(0.8, '#7a8e9e'); g.addColorStop(1, '#3a4a5a');
                    c.fillStyle = g; c.strokeStyle = 'rgba(180,200,220,0.35)'; c.lineWidth = 1.5;
                    rr(c, cx - hw, cy - hh, hw * 2, hh * 2, 6 * sc); c.fill(); c.stroke();
                    c.fillStyle = '#2a3848'; rr(c, cx - hw + 4 * sc, cy + hh, hw * 2 - 8 * sc, 6 * sc, 2 * sc); c.fill();
                    [cx - 88 * sc, cx - 30 * sc, cx + 30 * sc, cx + 88 * sc].forEach(hx => {
                        c.fillStyle = '#02050a'; c.strokeStyle = 'rgba(154,171,191,0.35)'; c.lineWidth = 1;
                        c.beginPath(); c.arc(hx, cy, 6 * sc, 0, Math.PI * 2); c.fill(); c.stroke();
                        c.fillStyle = '#010308'; c.beginPath(); c.arc(hx, cy, 3 * sc, 0, Math.PI * 2); c.fill();
                    });
                    c.restore();
                }
            }
        ];

        const render = (time: number) => {
            const sp = clamp(progress, 0, 1);
            const charge = clamp(1 - sp / 0.72, 0, 1);
            const animT = time * 0.001;

            ctx.clearRect(0, 0, W, H);

            // Scanning Lines (Emo Energy Style)
            if (showHud) {
                // Subtle Grid
                ctx.save(); ctx.globalAlpha = 0.035; ctx.strokeStyle = '#ff8c00';
                for (let x = 0; x < W; x += 60) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
                for (let y = 0; y < H; y += 60) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }

                // Horizontal Scanning Beam
                const scanY = (animT * 120) % H;
                const g = ctx.createLinearGradient(0, scanY - 2, 0, scanY + 2);
                g.addColorStop(0, 'transparent');
                g.addColorStop(0.5, 'rgba(0, 229, 255, 0.4)');
                g.addColorStop(1, 'transparent');
                ctx.fillStyle = g;
                ctx.fillRect(0, scanY - 2, W, 4);

                ctx.restore();
            }

            // 3D Setup
            const wRY = lerp(0, 18, eio(clamp(sp * 2, 0, 1)));
            const wRX = lerp(0, -10, eio(clamp(sp * 2, 0, 1)));
            const cosY = Math.cos(wRY * Math.PI / 180), sinY = Math.sin(wRY * Math.PI / 180);
            const cosX = Math.cos(wRX * Math.PI / 180), sinX = Math.sin(wRX * Math.PI / 180);
            const FOV = 880;
            const proj = (x: number, y: number, z: number) => { const s = FOV / (FOV + z); return { x: CX + x * s, y: CY + y * s, s }; };

            const sortedLayers = LAYERS.map((layer) => {
                const t = clamp((sp - layer.s) / (layer.e - layer.s), 0, 1);
                const et = eout5(t);
                const bx = layer.ax || 0, by = layer.ay || 0;
                const lx3 = lerp(bx, bx + (layer.ex || 0), et);
                const ly3 = lerp(by, by + (layer.ey || 0), et);
                const lz3 = lerp(0, layer.ez || 0, et);
                const wx = lx3 * cosY - lz3 * sinY;
                const wz0 = lx3 * sinY + lz3 * cosY;
                const wy = ly3 * cosX - wz0 * sinX;
                const wz = ly3 * sinX + wz0 * cosX;
                const p = proj(wx, wy, wz);
                return { layer, t, p, wz };
            }).sort((a, b) => b.wz - a.wz);

            sortedLayers.forEach(({ layer, p }) => {
                const alpha = lerp(1, 0.65, sp > layer.s ? (sp - layer.s) / (layer.e - layer.s) : 0);
                const rotZ = lerp(0, layer.erz || 0, sp > layer.s ? eout5((sp - layer.s) / (layer.e - layer.s)) : 0);
                const et = sp > layer.s ? eout5((sp - layer.s) / (layer.e - layer.s)) : 0;
                ctx.save();
                ctx.translate(p.x, p.y);
                if (rotZ) ctx.rotate(rotZ * Math.PI / 180);
                layer.draw(ctx, 0, 0, p.s, alpha, et, charge, animT);
                ctx.restore();
            });


            requestAnimationFrame(render);
        };

        const animId = requestAnimationFrame(render);
        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animId);
        };
    }, [accent, progress]);

    const [smoothProgress, setSmoothProgress] = useState(progress);
    const hudContainerRef = useRef<HTMLDivElement>(null);

    // Sync smooth progress
    useEffect(() => {
        gsap.to({ val: smoothProgress }, {
            val: progress,
            duration: 0.6,
            ease: "power2.out",
            onUpdate: function () {
                setSmoothProgress(this.targets()[0].val);
            }
        });
    }, [progress]);

    // Animate HUD Readouts on mount/show
    useEffect(() => {
        if (showHud && hudContainerRef.current) {
            const readouts = hudContainerRef.current.querySelectorAll('.hud-readout');
            const corners = hudContainerRef.current.querySelectorAll('.hud-part');

            gsap.set([readouts, corners], { opacity: 0, scale: 0.95 });

            const tl = gsap.timeline();
            tl.to(corners, { opacity: 0.45, scale: 1, duration: 0.8, stagger: 0.1, ease: "power4.out" })
                .to(readouts, { opacity: 1, scale: 1, duration: 1, stagger: 0.2, ease: "power2.out" }, "-=0.4");
        }
    }, [showHud]);

    const pct = Math.round(clamp(1 - smoothProgress / 0.72, 0, 1) * 100);
    const statusText = smoothProgress < 0.05 ? 'ASSEMBLED' : smoothProgress > 0.88 ? 'DISASSEMBLED' : 'ANATOMY VIEW';

    return (
        <div className="battery-anatomy-visual-container" ref={containerRef}>
            <canvas ref={canvasRef} className="battery-anatomy-canvas" />

            {showHud && (
                <div className="anatomy-hud-overlay" ref={hudContainerRef}>
                    <div className="hud-part tl"></div><div className="hud-part tr"></div>
                    <div className="hud-part bl"></div><div className="hud-part br"></div>
                    <div className="hud-readout h-tl">POWERFRILL · BESS<br /><b>LFP-2400</b><span className="accent-sub">ANATOMY VIEW</span></div>
                    <div className="hud-readout h-tr">VOLTAGE<br /><b>768 V</b><span className="accent-sub cyan">NOMINAL</span></div>
                    <div className="hud-readout h-bl">CHEMISTRY<br /><b className="orange">LiFePO₄</b>CYCLE LIFE · 6000+</div>
                    <div className="hud-readout h-br">CHARGE LEVEL<br /><b>{pct}%</b><span className="accent-sub cyan">{statusText}</span></div>
                </div>
            )}

            {/* Part Labels (Only if HUD is on) */}
            {showHud && (
                <>
                    <div className={`anatomy-label l-casing ${smoothProgress > 0.1 && smoothProgress < 0.9 ? 'on' : ''}`} style={{ top: 'calc(50% - 240px)', left: 'calc(50% + 155px)' }}><div className="line" />AL-6061 OUTER CASING</div>
                    <div className={`anatomy-label l-bms ${smoothProgress > 0.16 && smoothProgress < 0.9 ? 'on' : ''}`} style={{ top: 'calc(50% - 175px)', right: 'calc(50% + 148px)' }}>BMS PCB · 16S MANAGEMENT<div className="line right" /></div>
                    <div className={`anatomy-label l-bus ${smoothProgress > 0.22 && smoothProgress < 0.9 ? 'on' : ''}`} style={{ top: 'calc(50% - 115px)', left: 'calc(50% + 155px)' }}><div className="line" />COPPER BUSBARS · INTERCONNECT</div>
                    <div className={`anatomy-label l-cell1 ${smoothProgress > 0.28 && smoothProgress < 0.9 ? 'on' : ''}`} style={{ top: 'calc(50% - 60px)', right: 'calc(50% + 148px)' }}>PRISMATIC CELL MODULE × 4<div className="line right" /></div>
                    <div className={`anatomy-label l-sep ${smoothProgress > 0.34 && smoothProgress < 0.9 ? 'on' : ''}`} style={{ top: 'calc(50% + 0px)', left: 'calc(50% + 155px)' }}><div className="line" />PE SEPARATOR MEMBRANE</div>
                    <div className={`anatomy-label l-anode ${smoothProgress > 0.38 && smoothProgress < 0.9 ? 'on' : ''}`} style={{ top: 'calc(50% + 48px)', right: 'calc(50% + 148px)' }}>GRAPHITE ANODE LAYER<div className="line right" /></div>
                    <div className={`anatomy-label l-cath ${smoothProgress > 0.44 && smoothProgress < 0.9 ? 'on' : ''}`} style={{ top: 'calc(50% + 90px)', left: 'calc(50% + 155px)' }}><div className="line" />LFP CATHODE FOIL</div>
                    <div className={`anatomy-label l-elec ${smoothProgress > 0.5 && smoothProgress < 0.9 ? 'on' : ''}`} style={{ top: 'calc(50% + 135px)', right: 'calc(50% + 148px)' }}>LiPF₆ LIQUID ELECTROLYTE<div className="line right" /></div>
                    <div className={`anatomy-label l-cell2 ${smoothProgress > 0.54 && smoothProgress < 0.9 ? 'on' : ''}`} style={{ top: 'calc(50% + 175px)', left: 'calc(50% + 155px)' }}><div className="line" />CELL MODULE STACK × 4</div>
                    <div className={`anatomy-label l-cool ${smoothProgress > 0.65 && smoothProgress < 0.9 ? 'on' : ''}`} style={{ top: 'calc(50% + 218px)', right: 'calc(50% + 148px)' }}>LIQUID COOLING PLATE<div className="line right" /></div>
                    <div className={`anatomy-label l-base ${smoothProgress > 0.7 && smoothProgress < 0.9 ? 'on' : ''}`} style={{ top: 'calc(50% + 252px)', left: 'calc(50% + 155px)' }}><div className="line" />STRUCTURAL BASE · AL-6061</div>
                </>
            )}
        </div>
    );
};

export default BatteryAnatomyVisual;
