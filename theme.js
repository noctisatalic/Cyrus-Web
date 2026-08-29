/* =========================================================
   CYRUSWEB — GLOBAL THEME ENGINE
   ========================================================= */

(function(){

  const STORAGE_KEY = "cyrus-theme";
  const root = document.documentElement;

  function getTheme(){

    const saved = localStorage.getItem(STORAGE_KEY);

    if(saved === "dark" || saved === "light"){
      return saved;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function getToggles(){

    return [
      ...document.querySelectorAll(
        ".cyrus-theme-toggle, .theme-toggle, #theme-toggle, [data-theme-toggle]"
      )
    ];

  }

  function syncToggles(theme){

    getToggles().forEach(function(toggle){

      toggle.setAttribute(
        "aria-checked",
        theme === "dark" ? "true" : "false"
      );

    });

  }

  function applyTheme(theme){

    root.dataset.theme = theme;
    localStorage.setItem(STORAGE_KEY, theme);
    syncToggles(theme);

  }

  function createToggleContent(toggle){

    if(toggle.dataset.cyrusThemeReady === "true"){
      return;
    }

    toggle.innerHTML = `
      <span class="theme-switch-sun" aria-hidden="true">☀</span>
      <span class="theme-switch-moon" aria-hidden="true">☾</span>
      <span class="theme-switch-knob" aria-hidden="true"></span>
    `;

    toggle.dataset.cyrusThemeReady = "true";

    toggle.setAttribute("role","switch");
    toggle.setAttribute("aria-label","Ganti tema");
    toggle.setAttribute("tabindex","0");

    toggle.addEventListener("click", toggleTheme);

    toggle.addEventListener("keydown", function(e){

      if(e.key === "Enter" || e.key === " "){
        e.preventDefault();
        toggleTheme();
      }

    });

  }

  function animateThemeChange(){

    let overlay =
      document.querySelector(".cyrus-theme-transition");

    if(!overlay){

      overlay = document.createElement("div");
      overlay.className = "cyrus-theme-transition";

      document.body.appendChild(overlay);

    }

    overlay.classList.remove("active");

    void overlay.offsetWidth;

    overlay.classList.add("active");

    window.setTimeout(function(){
      overlay.classList.remove("active");
    },450);

  }

  function toggleTheme(){

    const current =
      root.dataset.theme === "dark"
        ? "dark"
        : "light";

    const next =
      current === "dark"
        ? "light"
        : "dark";

    if(
      document.startViewTransition &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ){

      document.startViewTransition(function(){

        animateThemeChange();
        applyTheme(next);

      });

    }else{

      animateThemeChange();
      applyTheme(next);

    }

  }

  function init(){

    const theme = getTheme();

    applyTheme(theme);

    getToggles().forEach(function(toggle){
      createToggleContent(toggle);
    });

    syncToggles(theme);

  }

  if(document.readyState === "loading"){

    document.addEventListener(
      "DOMContentLoaded",
      init,
      {once:true}
    );

  }else{

    init();

  }

})();
