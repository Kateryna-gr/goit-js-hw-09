function t(){return`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`}const e={start:document.querySelector("[data-start]"),stop:document.querySelector("[data-stop]")};e.stop.disabled=!0;let o=null;e.start.addEventListener("click",(function(){e.start.disabled=!0,e.stop.disabled=!1,document.body.style.backgroundColor=t(),o=setInterval((()=>document.body.style.backgroundColor=t()),1e3)})),e.stop.addEventListener("click",(function(){clearInterval(o),e.start.disabled=!1,e.stop.disabled=!0}));
//# sourceMappingURL=01-color-switcher.4c45e53c.js.map