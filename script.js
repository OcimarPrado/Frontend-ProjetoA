(function(){
  'use strict';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------- Header scroll state ---------------- */
  var header = document.getElementById('siteHeader');
  var onScroll = function(){
    if (window.scrollY > 24) header.classList.add('is-scrolled');
    else header.classList.remove('is-scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------------- Mobile nav ---------------- */
  var menuToggle = document.getElementById('menuToggle');
  var mobileNav = document.getElementById('mobileNav');
  menuToggle.addEventListener('click', function(){
    var isOpen = mobileNav.classList.toggle('is-open');
    menuToggle.classList.toggle('is-open', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });
  mobileNav.querySelectorAll('a').forEach(function(link){
    link.addEventListener('click', function(){
      mobileNav.classList.remove('is-open');
      menuToggle.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  /* ---------------- Scroll reveal ---------------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !prefersReducedMotion){
    var revealObserver = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting){
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function(el){ revealObserver.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add('is-visible'); });
  }

  /* ---------------- Animated counters ---------------- */
  var counters = document.querySelectorAll('[data-count]');
  function animateCounter(el){
    var target = parseFloat(el.getAttribute('data-count'));
    var decimals = parseInt(el.getAttribute('data-decimal') || '0', 10);
    var suffix = el.getAttribute('data-suffix') || '';
    var duration = 1400;
    var start = null;

    if (prefersReducedMotion){
      el.textContent = target.toFixed(decimals) + suffix;
      return;
    }

    function step(ts){
      if (start === null) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var value = target * eased;
      el.textContent = value.toFixed(decimals) + suffix;
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target.toFixed(decimals) + suffix;
    }
    requestAnimationFrame(step);
  }

  var dashSection = document.getElementById('dashboard');
  if (dashSection && 'IntersectionObserver' in window){
    var dashObserver = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting){
          counters.forEach(animateCounter);
          document.querySelectorAll('.dash-bar').forEach(function(bar){ bar.classList.add('is-visible'); });
          dashObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    dashObserver.observe(dashSection);
  } else {
    counters.forEach(animateCounter);
  }

  /* ---------------- FAQ accordion ---------------- */
  var faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function(item){
    var btn = item.querySelector('.faq-q');
    var answer = item.querySelector('.faq-a');
    btn.addEventListener('click', function(){
      var isOpen = item.classList.contains('is-open');
      faqItems.forEach(function(other){
        other.classList.remove('is-open');
        other.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
        other.querySelector('.faq-a').style.maxHeight = null;
      });
      if (!isOpen){
        item.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  /* ---------------- Back to top ---------------- */
  var backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', function(){
    backToTop.classList.toggle('is-visible', window.scrollY > 700);
  }, { passive: true });
  backToTop.addEventListener('click', function(){
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  });

  /* ---------------- Contact form validation + submission ---------------- */
  // Configure this to connect the form to an n8n webhook. Leave empty to continue the lead through WhatsApp.
  var FORM_WEBHOOK_URL = "";

  var form = document.getElementById('contactForm');
  var formStatus = document.getElementById('formStatus');
  var submitBtn = document.getElementById('formSubmitBtn');
  var isSubmitting = false;

  function setFormStatus(kind, message){
    formStatus.className = 'form-status is-' + kind;
    formStatus.textContent = message;
  }

  if (form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      if (isSubmitting) return;

      var valid = true;
      var fields = form.querySelectorAll('.form-field');
      fields.forEach(function(field){
        var input = field.querySelector('input, textarea, select');
        var errorEl = field.querySelector('.field-error');
        if (!input) return;
        var value = input.value.trim();
        var fieldValid = true;

        if (!value) fieldValid = false;
        if (input.type === 'email' && value){
          fieldValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        }
        if (input.type === 'tel' && value){
          fieldValid = value.replace(/\D/g,'').length >= 10;
        }

        if (!fieldValid){
          field.classList.add('has-error');
          errorEl.textContent = !value ? 'Campo obrigatório.' : 'Verifique o valor informado.';
          valid = false;
        } else {
          field.classList.remove('has-error');
          errorEl.textContent = '';
        }
      });

      if (!valid){
        formStatus.className = 'form-status';
        return;
      }

      var data = new FormData(form);
      var payload = {
        nome: data.get('nome'),
        empresa: data.get('empresa'),
        whatsapp: data.get('whatsapp'),
        email: data.get('email'),
        segmento: data.get('segmento'),
        cidade: data.get('regiao'),
        o_que_vende: data.get('vende'),
        quem_quer_conquistar: data.get('quem_quer_conquistar')
      };

      isSubmitting = true;
      submitBtn.setAttribute('disabled', 'true');

      if (!FORM_WEBHOOK_URL){
        // Fallback: without a webhook, send the captured request to WhatsApp.
        setFormStatus('loading', 'Enviando...');
        setTimeout(function(){
          setFormStatus('success', 'Solicitação preparada. Vamos continuar pelo WhatsApp para concluir seu atendimento.');
          isSubmitting = false;
          submitBtn.removeAttribute('disabled');
          form.reset();

          var summary = 'Olá! Quero solicitar uma análise da Nayco.%0A' +
            'Nome: ' + encodeURIComponent(payload.nome) + '%0A' +
            'Empresa: ' + encodeURIComponent(payload.empresa) + '%0A' +
            'Segmento: ' + encodeURIComponent(payload.segmento) + '%0A' +
            'Região: ' + encodeURIComponent(payload.cidade) + '%0A' +
            'Quer conquistar: ' + encodeURIComponent(payload.quem_quer_conquistar);
          window.open('https://wa.me/5551980534875?text=' + summary, '_blank');
        }, 700);
        return;
      }

      setFormStatus('loading', 'Enviando...');
      fetch(FORM_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
        .then(function(response){
          if (!response.ok) throw new Error('Falha no envio (' + response.status + ')');
          setFormStatus('success', 'Recebemos sua solicitação. Em breve entraremos em contato pelo WhatsApp informado.');
          form.reset();
        })
        .catch(function(err){
          setFormStatus('error', 'Não foi possível enviar agora. Tente novamente ou fale direto pelo WhatsApp.');
        })
        .finally(function(){
          isSubmitting = false;
          submitBtn.removeAttribute('disabled');
        });
    });
  }

  /* ---------------- Hero network animation (canvas) ---------------- */
  var canvas = document.getElementById('networkCanvas');
  if (canvas && canvas.getContext){
    var ctx = canvas.getContext('2d');
    var nodes = [];
    var NODE_COUNT = 34;
    var MAX_DIST = 120;
    var width, height, dpr;
    var pointer = { x: 0, y: 0, active: false, lastX: 0, lastY: 0, vx: 0, vy: 0 };
    var motionBoost = 0;
    var lastFrameTime = 0;
    var BOOST_DURATION = 3000; // 3 segundos para cair gradualmente
    var keywords = ['PROSPECÇÃO','LEADS','EMPRESAS','CONTATOS','ICP','B2B','WHATSAPP','FOLLOW-UP','OPORTUNIDADES','DECISORES'];
    var keywordNodes = [];

    function resize(){
      dpr = window.devicePixelRatio || 1;
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function makeNode(i){
      var isKeyword = i < keywords.length;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        r: isKeyword ? 2.2 + Math.random() * 1.2 : 1.6 + Math.random() * 1.6,
        phase: Math.random() * Math.PI * 2,
        speed: 0.4 + Math.random() * 0.4,
        keyword: isKeyword ? keywords[i] : null,
        labelPhase: Math.random() * Math.PI * 2,
        labelSpeed: 0.45 + Math.random() * 0.35
      };
    }

    function init(){
      resize();
      nodes = [];
      keywordNodes = [];
      for (var i = 0; i < NODE_COUNT; i++) {
        var node = makeNode(i);
        nodes.push(node);
        if (node.keyword) keywordNodes.push(node);
      }
    }

    var accent = 'rgba(232,184,92,0.85)';
    var lineColor = 'rgba(61,90,115,0.55)';
    var textColor = 'rgba(232,184,92,0.78)';

    function draw(time){
      ctx.clearRect(0, 0, width, height);
      var t = time || 0;
      var dt = lastFrameTime ? Math.min(50, t - lastFrameTime) : 16;
      lastFrameTime = t;

      /* O toque/mouse aumenta o ritmo e o efeito desaparece suavemente em ~3s. */
      if (motionBoost > 0){
        motionBoost *= Math.pow(0.5, dt / BOOST_DURATION);
        if (motionBoost < 0.001) motionBoost = 0;
      }
      var motionMultiplier = 1 + motionBoost * 1.15;

      for (var i = 0; i < nodes.length; i++){
        var a = nodes[i];

        /* Movimento contínuo e suave: o gráfico nunca fica parado. */
        a.x += a.vx * motionMultiplier;
        a.y += a.vy * motionMultiplier;

        /* Pequena oscilação orgânica, sem puxar os nós para o toque. */
        a.x += Math.sin(t * 0.00035 * a.speed + a.phase) * 0.08;
        a.y += Math.cos(t * 0.00030 * a.speed + a.phase) * 0.08;

        /* Mantém todo o gráfico aberto dentro da área visível. */
        if (a.x < 8 || a.x > width - 8) {
          a.vx *= -1;
          a.x = Math.max(8, Math.min(width - 8, a.x));
        }
        if (a.y < 8 || a.y > height - 8) {
          a.vy *= -1;
          a.y = Math.max(8, Math.min(height - 8, a.y));
        }

        /* Limita velocidades para evitar aceleração excessiva. */
        a.vx = Math.max(-0.42, Math.min(0.42, a.vx));
        a.vy = Math.max(-0.42, Math.min(0.42, a.vy));

        for (var j = i + 1; j < nodes.length; j++){
          var b = nodes[j];
          var dx = a.x - b.x, dy = a.y - b.y;
          var dist = Math.sqrt(dx*dx + dy*dy);
          if (dist < MAX_DIST){
            ctx.strokeStyle = lineColor;
            ctx.globalAlpha = 1 - (dist / MAX_DIST);
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1;
      for (var k = 0; k < nodes.length; k++){
        var n = nodes[k];
        var pulse = 0.55 + 0.45 * Math.sin(t * 0.001 * n.speed + n.phase);
        ctx.fillStyle = accent;
        ctx.globalAlpha = 0.35 + pulse * 0.5;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();

        if (n.keyword){
          var labelPulse = 0.62 + 0.38 * Math.sin(t * 0.001 * n.labelSpeed + n.labelPhase);
          var labelAlpha = 0.18 + labelPulse * 0.58;
          var fontSize = Math.max(9, Math.min(12, width * 0.018));
          ctx.font = '600 ' + fontSize + 'px Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
          ctx.textAlign = 'left';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = textColor;
          ctx.globalAlpha = labelAlpha;
          ctx.fillText(n.keyword, n.x + 9, n.y - 8);
        }
      }
      ctx.globalAlpha = 1;

      /* Subtle touch/cursor attraction point */
      if (pointer.active){
        ctx.beginPath();
        ctx.arc(pointer.x, pointer.y, 16, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(232,184,92,0.28)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }

    function pointerPosition(e){
      var rect = canvas.getBoundingClientRect();
      var clientX = e.touches ? e.touches[0].clientX : e.clientX;
      var clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return { x: clientX - rect.left, y: clientY - rect.top };
    }

    function triggerMotionBoost(){
      /* Cada interação injeta energia; a energia restante decai gradualmente. */
      motionBoost = Math.min(1, motionBoost + 0.75);
    }

    function pointerDown(e){
      var p = pointerPosition(e);
      triggerMotionBoost();
      pointer.active = true;
      pointer.x = pointer.lastX = p.x;
      pointer.y = pointer.lastY = p.y;
      pointer.vx = pointer.vy = 0;

      /* Ao tocar, reorganiza levemente os vetores de movimento de forma
         aleatória, sem juntar os nós nem diminuir o gráfico. */
      for (var i = 0; i < nodes.length; i++){
        nodes[i].vx += (Math.random() - 0.5) * 0.10;
        nodes[i].vy += (Math.random() - 0.5) * 0.10;
      }

      if (e.cancelable) e.preventDefault();
    }

    function pointerMove(e){
      if (!pointer.active) return;
      triggerMotionBoost();
      var p = pointerPosition(e);
      pointer.vx = p.x - pointer.lastX;
      pointer.vy = p.y - pointer.lastY;
      pointer.x = p.x;
      pointer.y = p.y;
      pointer.lastX = p.x;
      pointer.lastY = p.y;
      /* Arraste apenas reposiciona suavemente o conjunto; nunca comprime. */
      for (var i = 0; i < nodes.length; i++){
        nodes[i].x += pointer.vx * 0.006;
        nodes[i].y += pointer.vy * 0.006;
      }
      if (e.cancelable) e.preventDefault();
    }

    function pointerUp(){
      pointer.active = false;
      /* Só um toque mínimo de inércia após soltar. */
      for (var i = 0; i < nodes.length; i++){
        nodes[i].vx += Math.max(-0.025, Math.min(0.025, pointer.vx * 0.001));
        nodes[i].vy += Math.max(-0.025, Math.min(0.025, pointer.vy * 0.001));
      }
      pointer.vx = pointer.vy = 0;
    }

    canvas.style.touchAction = 'none';
    canvas.addEventListener('mouseenter', function(){ triggerMotionBoost(); });
    canvas.addEventListener('mousemove', function(e){
      triggerMotionBoost();
      if (!pointer.active) {
        var p = pointerPosition(e);
        pointer.x = p.x;
        pointer.y = p.y;
      }
    });
    canvas.addEventListener('mousedown', pointerDown);
    window.addEventListener('mousemove', pointerMove);
    window.addEventListener('mouseup', pointerUp);
    canvas.addEventListener('touchstart', pointerDown, { passive: false });
    canvas.addEventListener('touchmove', pointerMove, { passive: false });
    canvas.addEventListener('touchend', pointerUp, { passive: true });
    canvas.addEventListener('touchcancel', pointerUp, { passive: true });

    var rafId;
    function loop(time){
      if (!inView){
        rafId = null;
        return;
      }
      draw(time || 0);
      rafId = requestAnimationFrame(loop);
    }

    var inView = true;
    function resetHeroMotion(){
      /* Ao sair do viewport, zera qualquer energia acumulada. Isso evita
         que o gráfico volte correndo depois de rolar a página. */
      motionBoost = 0;
      lastFrameTime = 0;
      pointer.active = false;
      pointer.vx = pointer.vy = 0;

      /* Retorna as velocidades para uma faixa calma e previsível. */
      for (var i = 0; i < nodes.length; i++){
        var speed = 0.14 + Math.random() * 0.16;
        var angle = Math.random() * Math.PI * 2;
        nodes[i].vx = Math.cos(angle) * speed;
        nodes[i].vy = Math.sin(angle) * speed;
      }
    }

    if ('IntersectionObserver' in window){
      var canvasObserver = new IntersectionObserver(function(entries){
        var visible = entries[0].isIntersecting;

        if (!visible){
          inView = false;
          resetHeroMotion();
          if (rafId){
            cancelAnimationFrame(rafId);
            rafId = null;
          }
          return;
        }

        if (!inView){
          /* Entrando novamente no hero: começa calmo, sem herdar energia. */
          resetHeroMotion();
        }
        inView = true;

        if (!rafId){
          rafId = requestAnimationFrame(loop);
        }
      }, { threshold: 0.12 });
      canvasObserver.observe(canvas);
    }

    init();
    if (prefersReducedMotion){
      draw(0);
    } else {
      loop(0);
    }

    var resizeTimer;
    window.addEventListener('resize', function(){
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(init, 200);
    });
  }
})();


/* V6: stagger suave para grupos visuais */
(function(){
  var groups=['.problem-card','.flow-step','.step-row','.pillar','.segment-group','.deliverable-card','.compare-col','.validation-points > div','.plan'];
  groups.forEach(function(sel){document.querySelectorAll(sel).forEach(function(el,i){el.classList.add('motion-item');el.style.setProperty('--motion-delay',Math.min(i*70,420)+'ms');});});
})();

