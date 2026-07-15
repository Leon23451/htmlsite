const mediaStatus = document.querySelector('.media-status');
const mediaCards = document.querySelectorAll('.media-card[data-provider][data-embed-url]');

const takeaways = {
  'Project Astra sieht und hört mit': 'Kernaussage: Künftige Assistenten könnten nicht nur antworten, sondern eine reale Situation mitsehen und einordnen.',
  'Eine Fahrt ohne Fahrer buchen': 'Kernaussage: Autonome Fahrten sind keine Theorie mehr, aber bislang regional begrenzte Angebote mit hohen Sicherheitsanforderungen.',
  'Study Mode statt fertiger Lösung': 'Kernaussage: Beim Lernen kann KI sinnvoller sein, wenn sie Rückfragen stellt, statt nur eine fertige Antwort auszugeben.',
  'Text wird zu Bild, Video und Audio': 'Kernaussage: KI kann Entwürfe beschleunigen, ersetzt aber weder kreative Entscheidungen noch die Prüfung von Herkunft und Rechten.',
  'ChatGPT Study Mode': 'Kernaussage: Ein Chatbot kann beim Üben helfen, sollte aber keine ungeprüfte Lösung oder Quelle ersetzen.',
  'Stimme im vernetzten Zuhause': 'Kernaussage: Sprachsteuerung spart kleine Handgriffe, funktioniert aber nur mit passenden Einstellungen und bewusstem Datenschutz.',
  'Verkehr vorhersagen, Route anpassen': 'Kernaussage: Eine Route ist eine hilfreiche Prognose – Verkehrszeichen und die Situation vor Ort gelten immer zuerst.',
  'Von der Idee zur Gestaltung': 'Kernaussage: Generative KI hilft beim ersten Entwurf, die Auswahl und Kennzeichnung bleiben menschliche Aufgaben.',
  'KI-gestützte Medizinprodukte': 'Kernaussage: Medizinische KI kann Hinweise geben; Diagnose und Verantwortung bleiben beim Fachpersonal.',
  'Noland Arbaugh steuert Computer mit Gedanken': 'Kernaussage: Neuralink beschreibt einen experimentellen Einsatz, bei dem ein Studienteilnehmer digitale Geräte über neuronale Signale bedient.'
};

const everydayBalances = {
  'KI-Chatbots': ['Beim Lernen und Schreiben hilft KI beim Strukturieren, Erklären und Formulieren.', 'Fakten, Quellen und persönliche Daten müssen vor der Nutzung kritisch geprüft werden.'],
  'Sprachassistenten': ['Timer, Erinnerungen und Smart-Home-Befehle sind praktisch, wenn Hände oder Blick frei bleiben sollen.', 'Mikrofonrechte, gespeicherte Aufnahmen und verknüpfte Konten sollten bewusst eingestellt werden.'],
  'Navigation': ['Routenvergleich und Verkehrshinweise helfen beim Planen von Schulweg, Termin oder Ausflug.', 'Standortdaten sind sensibel; Verkehrsschilder und die Lage vor Ort sind wichtiger als jede App-Empfehlung.'],
  'Bildgeneratoren': ['Für Präsentationen, Plakate und Moodboards werden Ideen und Varianten schnell sichtbar.', 'Künstlich erzeugte Bilder müssen gekennzeichnet werden; Urheberrecht und Täuschung bleiben wichtige Fragen.'],
  'KI in der Medizin': ['KI kann Fachpersonal beim Sichten von Bildern und Daten unterstützen.', 'Gesundheitsdaten brauchen besonderen Schutz, und medizinische Entscheidungen dürfen nicht automatisch fallen.'],
  'Autonomes Fahren': ['Fahrerassistenz und Robotaxis können Mobilität erleichtern und einzelne Fahraufgaben übernehmen.', 'Autonome Dienste sind regional begrenzt und müssen in ungewöhnlichen Situationen nachweisbar sicher handeln.']
};

function addEverydayBalance() {
  const title = document.title.split('|')[0].trim();
  const text = everydayBalances[title];
  const target = document.querySelector('.practice-section');
  if (!text || !target || document.querySelector('.everyday-balance')) return;
  target.insertAdjacentHTML('beforebegin', `<section class="everyday-balance"><div class="container"><article><p class="balance-tag">Das hilft im Alltag</p><h3>Chance</h3><p>${text[0]}</p></article><article><p class="balance-tag">Darauf achten</p><h3>Risiko & Verantwortung</h3><p>${text[1]}</p></article></div></section>`);
}

addEverydayBalance();

function announce(message) {
  if (mediaStatus) mediaStatus.textContent = message;
}

function makeFrame(url, title, className = '') {
  const frame = document.createElement('iframe');
  frame.src = url;
  frame.title = title;
  frame.className = className;
  frame.loading = 'lazy';
  frame.referrerPolicy = 'strict-origin-when-cross-origin';
  frame.allowFullscreen = true;
  frame.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
  return frame;
}

function loadXPost(shell, url, card) {
  const quote = document.createElement('blockquote');
  quote.className = 'twitter-tweet';
  const link = document.createElement('a');
  link.href = url;
  link.textContent = 'Beitrag auf X öffnen';
  quote.appendChild(link);
  shell.appendChild(quote);

  const finish = () => {
    if (window.twttr?.widgets) {
      window.twttr.widgets.load(shell).then(() => {
        card.classList.remove('is-loading');
        card.classList.add('is-loaded');
        card.removeAttribute('aria-busy');
        announce('Der Social-Media-Beitrag wurde geladen.');
      }).catch(() => showError(card, 'Der Beitrag konnte nicht eingebettet werden. Nutze bitte den Direktlink.'));
    }
  };

  const existing = document.querySelector('script[data-x-widgets]');
  if (existing) {
    if (window.twttr?.widgets) finish();
    else existing.addEventListener('load', finish, { once: true });
    return;
  }

  const script = document.createElement('script');
  script.src = 'https://platform.twitter.com/widgets.js';
  script.async = true;
  script.dataset.xWidgets = 'true';
  script.addEventListener('load', finish, { once: true });
  script.addEventListener('error', () => showError(card, 'X hat die Einbettung blockiert. Der Direktlink bleibt verfügbar.'), { once: true });
  document.head.appendChild(script);
}

function showError(card, message) {
  card.classList.remove('is-loading');
  card.classList.add('is-error');
  card.removeAttribute('aria-busy');
  const shell = card.querySelector('.embed-shell');
  if (shell) shell.innerHTML = `<p class="embed-error">${message}</p>`;
  announce(message);
}

mediaCards.forEach(card => {
  const button = card.querySelector('.load-embed');
  const preview = card.querySelector('.media-preview');
  if (!button || !preview) return;

  const title = card.querySelector('h3')?.textContent.trim();
  const copy = card.querySelector('.media-copy');
  if (title && takeaways[title] && copy && !copy.querySelector('.media-takeaway')) {
    const takeaway = document.createElement('p');
    takeaway.className = 'media-takeaway';
    takeaway.innerHTML = `<strong>Kernaussage:</strong> ${takeaways[title].replace('Kernaussage: ', '')}`;
    const privacy = copy.querySelector('.privacy-note');
    privacy ? privacy.before(takeaway) : copy.appendChild(takeaway);
  }

  button.addEventListener('click', () => {
    if (card.classList.contains('is-loading') || card.classList.contains('is-loaded')) return;

    const provider = card.dataset.provider;
    const url = card.dataset.embedUrl;
    const title = card.querySelector('h3')?.textContent || 'Externer Medieninhalt';
    const shell = document.createElement('div');
    shell.className = `embed-shell embed-${provider}`;
    shell.setAttribute('role', 'group');
    shell.setAttribute('aria-label', title);
    preview.replaceWith(shell);
    card.classList.add('is-loading');
    card.setAttribute('aria-busy', 'true');
    button.disabled = true;
    button.textContent = 'Wird geladen …';
    announce(`${title} wird geladen.`);

    if (provider === 'youtube') {
      const frame = makeFrame(url, title);
      frame.addEventListener('load', () => {
        card.classList.remove('is-loading');
        card.classList.add('is-loaded');
        card.removeAttribute('aria-busy');
        announce(`${title} wurde geladen.`);
      }, { once: true });
      frame.addEventListener('error', () => showError(card, 'Das Video konnte nicht geladen werden. Nutze bitte den Direktlink.'), { once: true });
      shell.appendChild(frame);
    } else if (provider === 'x') {
      loadXPost(shell, url, card);
    } else if (provider === 'article') {
      const frame = makeFrame(url, title, 'article-frame');
      frame.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-popups');
      frame.addEventListener('load', () => {
        card.classList.remove('is-loading');
        card.classList.add('is-loaded');
        card.removeAttribute('aria-busy');
        announce(`${title} wurde geladen. Falls die Seite leer bleibt, nutze den Direktlink.`);
      }, { once: true });
      frame.addEventListener('error', () => showError(card, 'Der Beitrag erlaubt keine Einbettung. Nutze bitte den Direktlink.'), { once: true });
      shell.appendChild(frame);
    } else {
      showError(card, 'Dieser Inhaltstyp wird nicht unterstützt.');
    }
  });
});
