/* TL Groups — shared interactions for the separate static pages. */
(function () {
  "use strict";
  document.documentElement.classList.add("has-js");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var motionCanvas = document.getElementById("motion");
  if (motionCanvas && window.MotionView && !reduceMotion) {
    motionCanvas.closest(".hero-drum").classList.add("is-motion-ready");
  }
  var page = document.body.dataset.page || "home";
  var pages = { home: "index.html", about: "about.html", products: "products.html", careers: "careers.html", contact: "contact.html" };
  var islands = [
    {id:"torch",name:"Torch Proxies",category:"Proxy infrastructure",image:"assets/company-cards/figma/torch-art-1.png",imageWidth:1254,imageHeight:1254,orbit:"assets/company-cards/figma/torch-orbit.svg",body:"Reliable proxy infrastructure for teams that need to collect, verify, and move at internet scale without losing control of the work.",href:"https://www.torchproxies.com/"},
    {id:"shield",name:"Shield Proxies",category:"Secure routing",image:"assets/company-cards/figma/shield-art-1.png",imageWidth:1254,imageHeight:1254,orbit:"assets/company-cards/figma/shield-orbit.svg",body:"A dependable proxy layer designed to protect critical workflows, give teams cleaner routing, and keep high-volume operations moving.",href:"https://shieldproxies.com/"},
    {id:"eyonic",name:"Eyonic.ai",category:"Applied intelligence",image:"assets/company-cards/figma/eyonic-art-1.png",imageWidth:1536,imageHeight:1024,orbit:"assets/company-cards/figma/eyonic-orbit.svg",body:"Practical AI tools that turn complex operational signals into clear next steps for the people running the product.",href:"https://eyonic.ai/"},
    {id:"gryffin-studio",name:"Gryffin Studio",category:"Digital experiences",image:"assets/company-cards/figma/studio-art-1.png",imageWidth:1536,imageHeight:1024,orbit:"assets/company-cards/figma/studio-orbit.svg",body:"A hands-on studio for designing and building clear, high-performing websites alongside the people running the product.",href:"https://gryffinstudios.com/"},
    {id:"gryffin-analytics",name:"Gryffin Analytics",category:"Analytics & reporting",image:"assets/company-cards/figma/analytics-art-1.png",imageWidth:1536,imageHeight:1024,orbit:"assets/company-cards/figma/analytics-orbit.svg",body:"Dashboards, reporting, and measurement practices that turn day-to-day product data into decisions teams can act on.",href:"https://www.example.com/"}
  ];

  document.querySelectorAll("[data-route]").forEach(function (el) {
    var route = el.getAttribute("data-route"), current = route === page;
    el.classList.toggle("active",current);
    if (el.tagName === "A") {
      if (current) el.setAttribute("aria-current","page");
      else el.removeAttribute("aria-current");
    }
    el.addEventListener("click",function(event){
      if(route===page){event.preventDefault();window.scrollTo({top:0,behavior:reduceMotion?"auto":"smooth"});}
      else if(el.tagName!=="A")window.location.href=pages[route]||pages.home;
    });
  });
  document.querySelectorAll("[data-scroll]").forEach(function(el){el.addEventListener("click",function(){var target=document.getElementById(el.getAttribute("data-scroll"));if(target)target.scrollIntoView({behavior:reduceMotion?"auto":"smooth",block:"start"});});});
  var nav=document.getElementById("siteNav"); if(nav)window.addEventListener("scroll",function(){nav.classList.toggle("scrolled",window.scrollY>30);},{passive:true});
  var hamburger=document.getElementById("hamburgerBtn"),mobileMenu=document.getElementById("mobileMenu");
  var menuBackground=[document.getElementById("main"),document.querySelector(".site-footer"),document.querySelector(".skip-link"),document.querySelector(".nav .logo"),document.querySelector(".nav-links"),document.querySelector(".nav-cta > a")].filter(Boolean);
  function setMenuBackgroundInert(open){menuBackground.forEach(function(region){region.inert=open;});document.body.classList.toggle("menu-open",open);}
  function trapMenuFocus(event){
    if(event.key!=="Tab"||!mobileMenu||!mobileMenu.classList.contains("open"))return;
    var focusable=Array.prototype.slice.call(mobileMenu.querySelectorAll('a[href],button:not([disabled])')).filter(function(el){return !el.hidden;});
    if(!focusable.length)return;
    var first=focusable[0],last=focusable[focusable.length-1];
    if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
    else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
  }
  function setMobileMenu(open,moveFocus){
    if(!hamburger||!mobileMenu)return;
    mobileMenu.classList.toggle("open",open);
    mobileMenu.setAttribute("aria-hidden",open?"false":"true");
    if(open)mobileMenu.removeAttribute("inert");else mobileMenu.setAttribute("inert","");
    hamburger.classList.toggle("open",open);
    hamburger.setAttribute("aria-expanded",open?"true":"false");
    hamburger.setAttribute("aria-label",open?"Close menu":"Open menu");
    setMenuBackgroundInert(open);
    if(moveFocus){
      window.requestAnimationFrame(function(){
        var first=mobileMenu.querySelector("button,a[href]");
        if(open&&first)first.focus();else hamburger.focus();
      });
    }
  }
  if(hamburger&&mobileMenu){
    mobileMenu.setAttribute("role","dialog");
    mobileMenu.setAttribute("aria-modal","true");
    mobileMenu.setAttribute("aria-label","Site navigation");
    hamburger.addEventListener("click",function(){setMobileMenu(!mobileMenu.classList.contains("open"),true);});
    document.addEventListener("keydown",function(e){if(e.key==="Escape"&&mobileMenu.classList.contains("open")){e.preventDefault();setMobileMenu(false,true);}else trapMenuFocus(e);});
    mobileMenu.querySelectorAll("a").forEach(function(link){link.addEventListener("click",function(){setMobileMenu(false,false);});});
  }
  function addCarousel(){
    var track=document.getElementById("carouselTrack"),dots=document.getElementById("carouselDots"),detail=document.getElementById("isleDetail"),exploreLink=document.getElementById("isleExploreLink"),stage=document.getElementById("carouselStage"),carousel=document.getElementById("company-proof"),pauseButton=document.getElementById("toggleIsleAutoplay");
    if(!track||!dots||!detail||!exploreLink||!stage||!carousel||!pauseButton)return;
    var active=0,timer,paused=false,startX=null;
    var cards=islands.map(function(isle,i){
      var card=document.createElement("button");
      card.type="button";card.className="isle-card isle-card--"+isle.id;card.setAttribute("aria-label","Show "+isle.name);
      card.innerHTML='<span class="isle-orbit" aria-hidden="true"><img src="'+isle.orbit+'" alt="" width="970" height="970"></span><span class="isle-art" aria-hidden="true"><img src="'+isle.image+'" alt="" width="'+isle.imageWidth+'" height="'+isle.imageHeight+'"></span><span class="isle-body"><span class="isle-card-title">'+isle.name+'</span><span class="isle-card-description">'+isle.body+'</span></span>';
      card.addEventListener("click",function(){pause(true);goTo(i,true);});track.appendChild(card);return card;
    });
    islands.forEach(function(_,i){var dot=document.createElement("button");dot.type="button";dot.setAttribute("aria-label","Show company "+(i+1));dot.addEventListener("click",function(){pause(true);goTo(i,true);});dots.appendChild(dot);});
    function draw(){
      var n=islands.length,narrow=stage.offsetWidth<720,spread=narrow?.55:1,positions={"-2":{x:-460*spread,y:130*spread,scale:.6,rot:-14,z:1,op:narrow?0:.55},"-1":{x:-248*spread,y:42*spread,scale:.8,rot:-8,z:2,op:.8},"0":{x:0,y:-8,scale:1,rot:0,z:5,op:1},"1":{x:248*spread,y:42*spread,scale:.8,rot:8,z:2,op:.8},"2":{x:460*spread,y:130*spread,scale:.6,rot:14,z:1,op:narrow?0:.55}};
      cards.forEach(function(card,i){var diff=(i-active+n)%n;if(diff>2)diff-=n;var p=positions[String(diff)];card.style.transform="translate(-50%,-50%) translate("+p.x+"px,"+p.y+"px) scale("+p.scale+") rotate("+p.rot+"deg)";card.style.zIndex=p.z;card.style.opacity=p.op;card.tabIndex=diff===0?0:-1;card.classList.toggle("is-active",diff===0);});
      Array.from(dots.children).forEach(function(dot,i){var selected=i===active;dot.classList.toggle("active",selected);dot.setAttribute("aria-current",selected?"true":"false");});
    }
    function detailView(announce){var isle=islands[active];detail.setAttribute("aria-live",announce?"polite":"off");detail.style.opacity=0;window.setTimeout(function(){detail.innerHTML='<div class="isle-detail-meta"><span class="pill">TL Groups company</span><span class="pill">'+isle.category+'</span></div><h3>'+isle.name+'</h3><p class="lede" style="margin-bottom:0;">'+isle.body+'</p>';exploreLink.href=isle.href;exploreLink.setAttribute("aria-label","Explore more about "+isle.name);detail.style.opacity=1;},reduceMotion?0:180);}
    function play(){clearInterval(timer);if(reduceMotion||paused)return;timer=window.setInterval(function(){goTo(active+1,false);},5000);}
    function pause(value){paused=value;clearInterval(timer);pauseButton.setAttribute("aria-pressed",paused?"true":"false");pauseButton.textContent=paused?"Resume motion":"Pause motion";if(!paused)play();}
    function goTo(i,announce){active=(i+islands.length)%islands.length;draw();detailView(announce);play();}
    document.getElementById("prevIsle").addEventListener("click",function(){pause(true);goTo(active-1,true);});
    document.getElementById("nextIsle").addEventListener("click",function(){pause(true);goTo(active+1,true);});
    pauseButton.addEventListener("click",function(){pause(!paused);});
    stage.addEventListener("pointerdown",function(e){startX=e.clientX;});
    stage.addEventListener("pointerup",function(e){if(startX!==null&&Math.abs(e.clientX-startX)>50){pause(true);goTo(active+(e.clientX-startX<0?1:-1),true);}startX=null;});
    carousel.addEventListener("focusin",function(){pause(true);});
    carousel.addEventListener("mouseenter",function(){clearInterval(timer);});
    carousel.addEventListener("mouseleave",function(){play();});
    window.addEventListener("resize",draw);draw();detailView(false);play();
  }
  addCarousel();
  var marquee=document.getElementById("marqueeTrack");if(marquee){var words=islands.map(function(i){return i.name+" — "+i.category;}).concat(["Compass","Tidewatch","Salvage & Rebuild","Growth Tides"]),html=words.map(function(word){return "<span>"+word+"</span>";}).join("");marquee.innerHTML=html+html;}
  var footer=document.getElementById("footerIslandList");if(footer)islands.forEach(function(isle){var li=document.createElement("li"),button=document.createElement("button");button.textContent=isle.name;button.addEventListener("click",function(){if(page!=="home"){window.location.href="index.html#isle-"+isle.id;return;}var target=document.getElementById("isle-"+isle.id);if(target)target.scrollIntoView({behavior:reduceMotion?"auto":"smooth",block:"center"});});li.appendChild(button);footer.appendChild(li);});
  if(page==="home"&&location.hash.indexOf("#isle-")===0)window.setTimeout(function(){var target=document.querySelector(location.hash);if(target)target.scrollIntoView({behavior:reduceMotion?"auto":"smooth",block:"center"});},80);
  var timeline=document.getElementById("timelineList"),events=[{year:"2015",title:"Two engineers, one accountant, a bookshop loft in Lisbon",body:"TL Groups is founded with savings, not investors — and a bet that unloved software could be worth more than it looked."},{year:"2017",title:"Ledgerly joins the archipelago",body:"Our first acquisition: a stalled invoicing tool. Profitable again within eighteen months."},{year:"2019",title:"Fieldnote joins",body:"A field-service scheduling tool, rebuilt offline-first for job sites with no signal."},{year:"2020",title:"Compass goes live",body:"The shared operating platform launches, so every future island inherits billing, auth, and infrastructure on day one."},{year:"2021",title:"Pixelhouse joins",body:"A design collaboration tool given a real-time multiplayer canvas engine — usage grows fifteenfold in two years."},{year:"2022",title:"Northbeam joins",body:"An operational analytics platform, refocused around the dashboards operators actually open."},{year:"2023",title:"Wayfarer joins — and Tidewatch launches",body:"Our fifth island, and a shared customer-intelligence engine now watching health across every product."},{year:"2026",title:"Eleven years in, still five names on the door",body:"No island has ever been sold. The current keeps running underneath all of them."}];if(timeline&&!timeline.children.length)events.forEach(function(event){var item=document.createElement("div");item.className="tl-item";item.innerHTML='<div class="tl-year">'+event.year+'</div><h4>'+event.title+'</h4><p>'+event.body+'</p>';timeline.appendChild(item);});
  var revealed=Array.prototype.slice.call(document.querySelectorAll("[data-reveal]")),observer=("IntersectionObserver"in window)?new IntersectionObserver(function(entries){entries.forEach(function(entry){if(entry.isIntersecting){entry.target.classList.add("is-visible");observer.unobserve(entry.target);}});},{threshold:.12,rootMargin:"0px 0px -8% 0px"}):null;revealed.forEach(function(el){if(reduceMotion||!observer)el.classList.add("is-visible");else observer.observe(el);});
  var counts=Array.prototype.slice.call(document.querySelectorAll("[data-count]"));function count(el){var target=parseInt(el.dataset.count,10),suffix=el.dataset.suffix||"";if(reduceMotion){el.textContent=target+suffix;return;}var start;function step(time){if(!start)start=time;var p=Math.min((time-start)/1400,1),v=1-Math.pow(1-p,3);el.textContent=Math.round(v*target)+suffix;if(p<1)requestAnimationFrame(step);}requestAnimationFrame(step);}var countObserver=("IntersectionObserver"in window)?new IntersectionObserver(function(entries){entries.forEach(function(entry){if(entry.isIntersecting){count(entry.target);countObserver.unobserve(entry.target);}});},{threshold:.5}):null;counts.forEach(function(el){if(countObserver)countObserver.observe(el);else count(el);});
  if(!reduceMotion&&window.matchMedia("(pointer: fine)").matches){document.querySelectorAll(".magnetic").forEach(function(button){button.addEventListener("mousemove",function(e){var r=button.getBoundingClientRect();button.style.transform="translate("+((e.clientX-r.left-r.width/2)*.22)+"px,"+((e.clientY-r.top-r.height/2)*.32)+"px)";});button.addEventListener("mouseleave",function(){button.style.transform="translate(0,0)";});});var dot=document.getElementById("cursorDot"),mx=0,my=0,cx=0,cy=0;if(dot){window.addEventListener("mousemove",function(e){mx=e.clientX;my=e.clientY;dot.classList.add("show");});document.querySelectorAll("a,button,.isle-card,input,textarea,select").forEach(function(el){el.addEventListener("mouseenter",function(){dot.classList.add("hover");});el.addEventListener("mouseleave",function(){dot.classList.remove("hover");});});(function frame(){cx+=(mx-cx)*.18;cy+=(my-cy)*.18;dot.style.left=cx+"px";dot.style.top=cy+"px";requestAnimationFrame(frame);})();}}
})();

/* Team links use the shared profile destination until individual URLs are supplied. */
(function () {
  "use strict";

  Array.prototype.forEach.call(document.querySelectorAll("#view-about .team-member"), function (profile) {
    var detail = profile.querySelector("div");
    var name = detail && detail.querySelector("h3");
    if (!detail || !name || detail.querySelector(".team-link")) return;

    var link = document.createElement("a");
    var arrow = document.createElement("span");
    link.className = "team-link";
    link.href = "https://www.linkedin.com/";
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.setAttribute("aria-label", name.textContent.trim() + " on LinkedIn");
    link.appendChild(document.createTextNode("LinkedIn"));
    arrow.setAttribute("aria-hidden", "true");
    arrow.textContent = "→";
    link.appendChild(arrow);
    detail.appendChild(link);
  });
})();

/* The home CTA has one contained, pointer-led moment; touch and reduced-motion visitors keep the static surface. */
(function () {
  "use strict";
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !window.matchMedia("(pointer: fine)").matches) return;

  var ctaSurface = document.querySelector("#view-home .home-careers .band-surface");
  if (!ctaSurface) return;

  function setCursorPosition(event) {
    var bounds = ctaSurface.getBoundingClientRect();
    ctaSurface.style.setProperty("--cursor-x", (event.clientX - bounds.left) + "px");
    ctaSurface.style.setProperty("--cursor-y", (event.clientY - bounds.top) + "px");
  }

  ctaSurface.addEventListener("pointerenter", function (event) {
    setCursorPosition(event);
    ctaSurface.classList.add("is-cursor-active");
  });
  ctaSurface.addEventListener("pointermove", setCursorPosition);
  ctaSurface.addEventListener("pointerleave", function () {
    ctaSurface.classList.remove("is-cursor-active");
  });
})();

/* Careers reviews: a compact, keyboard-friendly carousel that keeps one voice in focus. */
(function () {
  "use strict";

  var carousel = document.getElementById("reviewCarousel");
  var track = document.getElementById("reviewCarouselTrack");
  var previous = document.getElementById("prevReview");
  var next = document.getElementById("nextReview");
  var dots = document.getElementById("reviewCarouselDots");

  if (!carousel || !track || !previous || !next || !dots) return;

  var slides = Array.prototype.slice.call(track.querySelectorAll(".review-slide"));
  if (!slides.length) return;

  var current = 0;
  carousel.tabIndex = 0;

  slides.forEach(function (_, index) {
    var dot = document.createElement("button");
    dot.type = "button";
    dot.className = "review-dot";
    dot.setAttribute("aria-label", "Show review " + (index + 1));
    dot.addEventListener("click", function () {
      current = index;
      render();
    });
    dots.appendChild(dot);
  });

  function render() {
    track.style.transform = "translateX(-" + (current * 100) + "%)";
    slides.forEach(function (slide, index) {
      var active = index === current;
      slide.setAttribute("aria-hidden", active ? "false" : "true");
      if (dots.children[index]) dots.children[index].classList.toggle("is-active", active);
      if (dots.children[index]) dots.children[index].setAttribute("aria-current", active ? "true" : "false");
    });
  }

  function move(direction) {
    current = (current + direction + slides.length) % slides.length;
    render();
  }

  previous.addEventListener("click", function () { move(-1); });
  next.addEventListener("click", function () { move(1); });
  carousel.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      move(-1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      move(1);
    }
  });

  render();
})();

/* Indigo motion system: one hero arrival, line-based chapter reveals, and grouped evidence. */
(function () {
  "use strict";
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var motionContext;

  function loadScript(src, isReady) {
    return new Promise(function (resolve, reject) {
      if (isReady()) { resolve(); return; }
      var script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  function stageMotion(hasSplitText, scope) {
    var hero = scope.querySelector(".hero"),
      drum = scope.querySelector(".hero-drum"),
      nav = document.getElementById("siteNav");

    if (nav) gsap.from(nav, { y: -14, autoAlpha: 0, duration: 0.62, ease: "power3.out", clearProps: "all" });
    if (hero) {
      var heroParts = hero.querySelectorAll(hasSplitText ? ".eyebrow, .lede, .hero-actions, .hero-scroll" : ".eyebrow, h1, .lede, .hero-actions, .hero-scroll");
      gsap.from(heroParts, {
        y: 22,
        autoAlpha: 0,
        filter: "blur(5px)",
        duration: 0.82,
        stagger: 0.075,
        delay: 0.08,
        ease: "power4.out",
        clearProps: "filter"
      });
    }
    if (drum) {
      gsap.from(drum, { y: 30, scale: .985, autoAlpha: 0, filter: "blur(8px)", duration: 1.05, delay: 0.18, ease: "power4.out", clearProps: "filter" });
      var drift = gsap.to(drum, { y: -8, duration: 4.8, repeat: -1, yoyo: true, ease: "sine.inOut" });
      if (window.ScrollTrigger) {
        ScrollTrigger.create({
          trigger: drum,
          start: "top bottom",
          end: "bottom top",
          onToggle: function (self) { drift.paused(!self.isActive); }
        });
      }
    }
  }

  function splitScrollMotion(scope) {
    if (!window.gsap || !window.ScrollTrigger || !window.SplitText) return false;
    gsap.registerPlugin(ScrollTrigger, SplitText);

    var targets = Array.prototype.slice.call(scope.querySelectorAll(
      ".hero h1, .band > h2, .carousel-head h2, .feature h3, .band-surface h2, .products-offerings-heading h2, .careers-voices-heading h2, .careers-how-work h2"
    ));
    var seen = [];

    targets.forEach(function (target) {
      if (seen.indexOf(target) > -1 || !target.textContent.trim()) return;
      seen.push(target);
      target.classList.add("split-scroll");
      var isHero = Boolean(target.closest(".hero"));

      SplitText.create(target, {
        type: "lines",
        autoSplit: true,
        onSplit: function (self) {
          var reveal = {
            yPercent: isHero ? 18 : 22,
            autoAlpha: 0,
            filter: "blur(6px)",
            duration: isHero ? 1.02 : 0.82,
            stagger: isHero ? 0.09 : 0.065,
            ease: "power4.out",
            clearProps: "filter",
            overwrite: "auto"
          };

          if (isHero) {
            reveal.delay = 0.14;
          } else {
            reveal.scrollTrigger = {
              trigger: target,
              start: "top 82%",
              toggleActions: "play none none none",
              invalidateOnRefresh: true
            };
          }
          return gsap.from(self.lines, reveal);
        }
      });
    });
    ScrollTrigger.refresh();
    return true;
  }

  function groupedRevealMotion(scope) {
    if (!window.ScrollTrigger) return;
    [
      ".home-proof .stat-tile",
      ".product-showcase .product-feature",
      ".service-grid .service-card",
      ".careers-workflow li"
    ].forEach(function (selector) {
      var items = Array.prototype.slice.call(scope.querySelectorAll(selector));
      if (!items.length) return;
      ScrollTrigger.batch(items, {
        interval: 0.12,
        batchMax: 4,
        start: "top 88%",
        once: true,
        onEnter: function (batch) {
          gsap.from(batch, {
            y: 24,
            autoAlpha: 0,
            filter: "blur(5px)",
            duration: 0.7,
            stagger: 0.08,
            ease: "power3.out",
            clearProps: "filter"
          });
        }
      });
    });
  }

  function bootMotion() {
    if (!window.gsap) return;
    if (window.ScrollTrigger) gsap.registerPlugin(window.ScrollTrigger);
    var scope = document.querySelector("main") || document.body;
    motionContext = gsap.context(function () {
      var hasSplitText = splitScrollMotion(scope);
      stageMotion(hasSplitText, scope);
      groupedRevealMotion(scope);
    }, document.body);
    window.addEventListener("pagehide", function () { if (motionContext) motionContext.revert(); }, { once: true });
  }

  loadScript("https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js", function () { return Boolean(window.gsap); })
    .then(function () {
      return Promise.all([
        loadScript("https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js", function () { return Boolean(window.ScrollTrigger); }),
        loadScript("https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/SplitText.min.js", function () { return Boolean(window.SplitText); })
      ]);
    })
    .then(bootMotion)
    .catch(bootMotion);
})();
