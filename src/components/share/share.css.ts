// Self-contained premium styling for the public post/reel viewers and the
// "unavailable" state. Injected once via a <style> tag (RSC-safe), matching
// the dark/gold Qamr aesthetic used across the marketing site.

export const SHARE_CSS = `
.qv {
  --bg:#06030c; --bg-2:#0a0518;
  --fg:#ede8df; --fg-dim:#c9c2b6;
  --muted:#6a6278; --muted-lt:#8a8298;
  --accent:#d4bf8a; --acc-lt:#e8d5a8;
  --purple:#7a3aa0;
  --card:rgba(20,13,32,.72);
  --border:rgba(212,191,138,.08); --bord-lt:rgba(212,191,138,.16);
  --ease:cubic-bezier(.16,1,.3,1);
  background:var(--bg); color:var(--fg);
  font-family:var(--font-bd,'DM Sans',system-ui,sans-serif);
  min-height:100vh; position:relative; overflow-x:hidden;
  -webkit-font-smoothing:antialiased; -moz-osx-font-smoothing:grayscale;
  display:flex; flex-direction:column;
}
.qv *,.qv *::before,.qv *::after{box-sizing:border-box;margin:0;padding:0;}
.qv::before{
  content:'';position:fixed;inset:0;pointer-events:none;z-index:0;
  background:
    radial-gradient(ellipse 80% 50% at 50% 0%, rgba(45,10,62,.35) 0%, transparent 60%),
    radial-gradient(ellipse 60% 40% at 100% 20%, rgba(20,30,80,.16) 0%, transparent 60%),
    radial-gradient(ellipse 60% 40% at 0% 55%, rgba(60,20,90,.14) 0%, transparent 60%),
    linear-gradient(180deg, var(--bg) 0%, var(--bg-2) 50%, var(--bg) 100%);
}

/* Nav */
.qv-nav{
  position:relative;z-index:10;display:flex;align-items:center;justify-content:space-between;
  padding:20px 24px;max-width:820px;width:100%;margin:0 auto;
}
.qv-brand{display:inline-flex;align-items:center;gap:10px;text-decoration:none;color:var(--fg);transition:opacity .25s var(--ease);}
.qv-brand:hover{opacity:.85;}
.qv-brand img{width:26px;height:26px;border-radius:8px;}
.qv-brand span{font-family:'Inter',system-ui,sans-serif;font-size:18px;font-weight:600;letter-spacing:-.02em;}
.qv-getlink{
  display:inline-flex;align-items:center;gap:7px;padding:8px 15px;border-radius:100px;
  border:1px solid var(--bord-lt);color:var(--acc-lt);text-decoration:none;font-size:12.5px;font-weight:500;
  background:rgba(212,191,138,.04);transition:border-color .25s var(--ease),background .25s var(--ease);
}
.qv-getlink:hover{border-color:rgba(212,191,138,.32);background:rgba(212,191,138,.08);}

/* Stage */
.qv-stage{position:relative;z-index:1;flex:1;display:flex;justify-content:center;padding:8px 20px 72px;}
.qv-card{
  position:relative;width:100%;max-width:520px;
  background:var(--card);
  border:1px solid var(--border);border-radius:24px;
  box-shadow:0 24px 60px rgba(0,0,0,.5),inset 0 1px 0 rgba(255,255,255,.04);
  backdrop-filter:blur(14px) saturate(1.1);-webkit-backdrop-filter:blur(14px) saturate(1.1);
  overflow:hidden;
}

/* Creator row */
.qv-creator{display:flex;align-items:center;gap:12px;padding:16px 18px;}
.qv-avatar{
  width:44px;height:44px;border-radius:50%;flex:none;overflow:hidden;
  background:linear-gradient(135deg,rgba(122,58,160,.5),rgba(212,191,138,.28));
  display:flex;align-items:center;justify-content:center;
  color:var(--fg);font-weight:600;font-size:17px;
  border:1px solid rgba(212,191,138,.2);
}
.qv-avatar img{width:100%;height:100%;object-fit:cover;}
.qv-names{min-width:0;flex:1;}
.qv-nameline{display:flex;align-items:center;gap:6px;}
.qv-display{font-size:15px;font-weight:600;letter-spacing:-.01em;color:var(--fg);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.qv-username{font-size:13px;color:var(--muted-lt);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.qv-badge{flex:none;display:inline-flex;}
.qv-badge svg{display:block;}
.qv-kind{
  flex:none;font-size:10.5px;letter-spacing:.12em;text-transform:uppercase;font-weight:600;
  color:var(--accent);border:1px solid var(--bord-lt);border-radius:100px;padding:4px 10px;
}

/* Media */
.qv-media{position:relative;background:#000;width:100%;}
.qv-media-video{display:block;width:100%;max-height:78vh;background:#000;}
.qv-media-img{display:block;width:100%;height:auto;object-fit:contain;background:#050308;}
.qv-carousel{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none;}
.qv-carousel::-webkit-scrollbar{display:none;}
.qv-carousel .qv-slide{flex:0 0 100%;scroll-snap-align:center;}
.qv-carousel .qv-media-img{width:100%;}
.qv-count{
  position:absolute;top:12px;right:12px;z-index:2;
  background:rgba(6,3,12,.7);color:var(--fg);font-size:12px;font-weight:600;
  padding:4px 10px;border-radius:100px;backdrop-filter:blur(6px);
}

/* Caption + stats */
.qv-body{padding:16px 18px 18px;}
.qv-caption{font-size:15px;line-height:1.55;color:var(--fg-dim);white-space:pre-wrap;word-break:break-word;}
.qv-meta{display:flex;align-items:center;gap:16px;margin-top:14px;flex-wrap:wrap;}
.qv-stat{display:inline-flex;align-items:center;gap:6px;font-size:13px;color:var(--muted-lt);}
.qv-stat svg{display:block;opacity:.8;}
.qv-time{font-size:12.5px;color:var(--muted);}

/* CTAs */
.qs-ctas{display:flex;gap:12px;padding:0 18px 18px;flex-wrap:wrap;}
.qv-btn{
  flex:1 1 0;min-width:150px;display:inline-flex;align-items:center;justify-content:center;gap:9px;
  padding:14px 20px;border-radius:15px;font-size:14.5px;font-weight:600;letter-spacing:-.01em;
  text-decoration:none;cursor:pointer;border:1px solid transparent;
  transition:transform .3s var(--ease),box-shadow .35s var(--ease),border-color .3s var(--ease),background .3s var(--ease);
}
.qv-btn:active{transform:scale(.985);}
.qv-btn-primary{
  color:#0b0713;
  background:linear-gradient(180deg,var(--acc-lt) 0%,var(--accent) 100%);
  box-shadow:0 10px 26px rgba(212,191,138,.16);
}
.qv-btn-primary:hover{transform:translateY(-1px);box-shadow:0 14px 32px rgba(212,191,138,.24);}
.qv-btn-secondary{
  color:var(--fg);
  background:linear-gradient(180deg,rgba(22,14,34,.7),rgba(12,8,22,.85));
  border-color:var(--bord-lt);
}
.qv-btn-secondary:hover{transform:translateY(-1px);border-color:rgba(212,191,138,.3);background:rgba(24,16,38,.85);}

.qv-appnote{padding:0 18px 6px;font-size:12px;color:var(--muted);text-align:center;}

/* Footer */
.qv-footer{
  position:relative;z-index:1;text-align:center;padding:20px;font-size:11.5px;letter-spacing:.06em;color:var(--muted);
}
.qv-footer a{color:var(--muted-lt);text-decoration:none;}
.qv-footer a:hover{color:var(--fg);}

/* Unavailable */
.qv-empty{
  position:relative;z-index:1;flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;
  text-align:center;padding:48px 24px 96px;
}
.qv-empty-icon{
  width:64px;height:64px;border-radius:20px;display:flex;align-items:center;justify-content:center;margin-bottom:24px;
  color:var(--accent);border:1px solid var(--bord-lt);background:rgba(212,191,138,.05);
}
.qv-empty h1{
  font-family:var(--font-hd,'Playfair Display',Georgia,serif);
  font-size:clamp(30px,6vw,44px);font-weight:700;letter-spacing:-.03em;margin-bottom:14px;color:var(--fg);
}
.qv-empty p{font-size:15.5px;line-height:1.6;color:var(--fg-dim);max-width:440px;margin:0 auto 32px;font-weight:300;}

@media (max-width:560px){
  .qv-nav{padding:16px;}
  .qv-stage{padding:4px 14px 56px;}
  .qs-ctas{flex-direction:column;}
  .qv-btn{min-width:0;}
}
`;
