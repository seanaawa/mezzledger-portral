(function(){
  const $ = (s)=>document.querySelector(s);
  const $$ = (s)=>Array.from(document.querySelectorAll(s));

  const supported = ["es","en"];
  function getLang(){
    const url = new URL(window.location.href);
    const qp = url.searchParams.get("lang");
    const stored = localStorage.getItem("ml_lang");
    const nav = (navigator.language||"").slice(0,2);
    const pick = qp || stored || (supported.includes(nav)?nav:"es");
    return supported.includes(pick)?pick:"es";
  }
  function setLang(lang){
    localStorage.setItem("ml_lang", lang);
    applyLang(lang);
  }
  function applyLang(lang){
    $$(".i18n").forEach(el=>{
      const val = el.getAttribute("data-"+lang);
      if(val!==null) el.innerHTML = val;
    });
    const sel = $("#langSelect");
    if(sel) sel.value = lang;
    document.documentElement.setAttribute("lang", lang);
  }

  document.addEventListener("DOMContentLoaded", ()=>{
    const sel = $("#langSelect");
    if(sel){
      sel.addEventListener("change", (e)=>setLang(e.target.value));
    }
    applyLang(getLang());

    $$(".card, .feature, .kpi").forEach(el=>{
      el.style.opacity = 0;
      el.style.transform = "translateY(6px)";
      setTimeout(()=>{
        el.style.transition = "opacity .45s ease, transform .45s ease";
        el.style.opacity = 1;
        el.style.transform = "translateY(0)";
      }, 60);
    });
  });
})();
