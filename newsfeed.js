const feedRoot = document.querySelector('[data-newsfeed]');

if (feedRoot) {
  const feedItems = [
    { type: 'Realer Use Case', date: 'Schule & Studium', category: 'Lernen', title: 'KI unterstützt beim Lernen – aber nicht beim Abschreiben.', text: 'Chatbots können Lernfragen erklären, Übungen vorbereiten und beim Strukturieren helfen. Die eigene Leistung und ein kritischer Faktencheck bleiben dabei wichtig.', relevance: 'Viele Schülerinnen, Schüler und Studierende nutzen solche Werkzeuge bereits beim Vorbereiten und Wiederholen.', source: 'KMK: Umgang mit KI in schulischen Bildungsprozessen', url: 'https://www.kmk.org/aktuelles/pressearchiv/mitteilung/bildungsministerkonferenz-verabschiedet-handlungsempfehlung-zum-umgang-mit-kuenstlicher-intelligenz-1.html' },
    { type: 'Realer Use Case', date: 'Unterwegs', category: 'Navigation', title: 'Eine Karten-App plant die Route rund um den Verkehr.', text: 'Navigation kann aktuelle Verkehrslagen berücksichtigen und Alternativen vorschlagen. So lässt sich eine Fahrt zur Schule, zum Arzt oder zum Treffen besser planen.', relevance: 'Die KI ist nicht sichtbar, aber ihre Routenvorschläge beeinflussen alltägliche Wege und Zeitpläne.', source: 'Google Maps: Verkehrsdaten und Routenplanung', url: 'https://maps.google.com/' },
    { type: 'Realer Use Case', date: 'Zu Hause', category: 'Sprachassistenz', title: 'Ein Sprachbefehl ersetzt kleine Handgriffe im Alltag.', text: 'Timer beim Kochen, Erinnerungen, Musik oder Smart-Home-Steuerung helfen, wenn Hände oder Aufmerksamkeit gerade gebunden sind.', relevance: 'Besonders praktisch kann das für barriereärmere Bedienung und wiederkehrende Routinen sein.', source: 'Google Home: Routinen und Smart Home', url: 'https://support.google.com/googlenest/answer/7029585?hl=de' },
    { type: 'News', date: 'April 2025', category: 'Kreativität', title: 'Bildideen für Präsentationen entstehen schneller.', text: 'Adobe Firefly zeigt, wie sich aus Textvorgaben Entwürfe für Bilder, Video oder Audio entwickeln lassen.', relevance: 'Ein erster Entwurf kann Zeit sparen – Auswahl, Gestaltung und Kennzeichnung bleiben menschliche Aufgaben.', source: 'Adobe: Firefly für kreative Arbeitsabläufe', url: 'https://blog.adobe.com/en/publish/2025/04/24/adobe-firefly-next-evolution-creative-ai-is-here' },
    { type: 'Realer Use Case', date: 'Gesundheit', category: 'Medizin', title: 'KI markiert mögliche Auffälligkeiten auf medizinischen Bildern.', text: 'In Kliniken können KI-Systeme Ärztinnen und Ärzte beim Auswerten von Aufnahmen unterstützen. Die Entscheidung trifft Fachpersonal.', relevance: 'KI kann Hinweise liefern und Zeit sparen, darf aber keine menschliche Diagnose ersetzen.', source: 'FDA: KI-gestützte Medizinprodukte', url: 'https://www.fda.gov/medical-devices/software-medical-device-samd/artificial-intelligence-enabled-medical-devices' },
    { type: 'Realer Use Case', date: 'Mobilität', category: 'Autonomes Fahren', title: 'Robotaxis fahren in einigen Städten bereits Fahrgäste.', text: 'Bei Waymo können Menschen in bestimmten US-Städten autonome Fahrten buchen. Das zeigt Chancen und Sicherheitsfragen im Alltag.', relevance: 'Autonome Fahrten sind nicht überall Alltag, machen die Zukunft der Mobilität aber greifbar.', source: 'Waymo: Autonome Mobilität', url: 'https://waymo.com/' },
    { type: 'News', date: 'Juli 2025', category: 'Lernen', title: 'Study Mode stellt Rückfragen statt nur Lösungen auszugeben.', text: 'OpenAI beschreibt einen Lernmodus, der Schritt für Schritt durch Themen führen und eigenes Nachdenken anregen soll.', relevance: 'KI kann Lernen begleiten, sollte die eigene Denk- und Übungsarbeit aber nicht ersetzen.', source: 'OpenAI: Study Mode', url: 'https://openai.com/index/introducing-study-mode/' },
    { type: 'Realer Use Case', date: 'Barrierefreiheit', category: 'Unterstützung', title: 'KI kann Sprache, Text und Bilder zugänglicher machen.', text: 'Vorlesefunktionen, Übersetzungen und automatische Untertitel helfen, Informationen in einer passenden Form zu nutzen.', relevance: 'Diese Funktionen machen digitale Angebote für mehr Menschen verständlich und bedienbar.', source: 'Google: Funktionen für Barrierefreiheit', url: 'https://www.google.com/accessibility/' },
    { type: 'News', date: 'April 2025', category: 'Studium', title: 'KI-Nutzung im Studium ist bereits weit verbreitet.', text: 'Das Hochschulforum Digitalisierung beschreibt, dass viele Studierende KI-Werkzeuge nutzen und Hochschulen ihre Regeln anpassen müssen.', relevance: 'Auch Recherche, Lernplanung und die Bewertung eigener Leistungen verändern sich.', source: 'Hochschulforum Digitalisierung: KI im Studium', url: 'https://hochschulforumdigitalisierung.de/ki-im-studium-etabliert-hochschulen-hinken-hinterher/' },
    { type: 'Realer Use Case', date: 'Sicher entscheiden', category: 'Gesundheit', title: 'Bei Gesundheitsfragen bleibt professionelle Hilfe entscheidend.', text: 'Ein Chatbot kann allgemeine Informationen verständlich erklären. Bei Beschwerden, Diagnosen oder Krisen braucht es Fachpersonen.', relevance: 'Schnelle Antworten dürfen keine sensible Entscheidung allein bestimmen.', source: 'WHO: KI im Gesundheitswesen', url: 'https://www.who.int/publications/i/item/9789240029200' },
    { type: 'Realer Use Case', date: 'Sprachen', category: 'Übersetzen', title: 'Eine Übersetzung hilft bei einer Nachricht oder auf Reisen.', text: 'Übersetzungsdienste liefern rasch Vorschläge für Texte, Gespräche und Schilder. Besonders bei wichtigen Aussagen lohnt sich eine Gegenprüfung.', relevance: 'Viele Menschen nutzen KI-Übersetzungen unterwegs, in der Schule oder bei internationalen Kontakten.', source: 'DeepL: Übersetzen mit KI', url: 'https://www.deepl.com/translator' },
    { type: 'Realer Use Case', date: 'Fotos', category: 'Kreativität', title: 'Ein Foto lässt sich mit KI schneller überarbeiten.', text: 'Werkzeuge wie Magic Editor helfen beim Verschieben, Entfernen oder Anpassen von Bildbereichen direkt auf dem Smartphone.', relevance: 'Bildbearbeitung wird einfacher – dadurch wird auch die Frage nach echten und veränderten Bildern wichtiger.', source: 'Google Fotos: Magic Editor', url: 'https://blog.google/products/photos/google-photos-magic-editor-available/' },
    { type: 'Realer Use Case', date: 'Freizeit', category: 'Musik', title: 'Eine Playlist passt sich an Stimmung und Hörverhalten an.', text: 'Musikdienste analysieren Hörgewohnheiten und stellen daraus Vorschläge oder persönliche Mixe zusammen.', relevance: 'Empfehlungssysteme entscheiden mit, welche Inhalte wir im Alltag entdecken.', source: 'Spotify: AI DJ', url: 'https://newsroom.spotify.com/2023-02-22/spotify-dj-ai-guide-personalized-music/' },
    { type: 'Realer Use Case', date: 'Zugänglichkeit', category: 'Assistenz', title: 'Ein Assistent hilft beim Formulieren und Zusammenfassen.', text: 'KI-Werkzeuge können Texte vereinfachen, Ideen strukturieren oder beim Schreiben unterstützen. Ergebnisse sollten nachvollziehbar bleiben.', relevance: 'Solche Hilfe kann Barrieren senken, sollte aber nicht die eigene Stimme oder Verantwortung ersetzen.', source: 'Microsoft: Copilot und Barrierefreiheit', url: 'https://www.microsoft.com/en-us/accessibility/copilot' },
    { type: 'Realer Use Case', date: 'Sprachlernen', category: 'Üben', title: 'Ein Gesprächspartner übt eine Sprache ohne festen Termin.', text: 'KI-basierte Übungen können Aussprache, Wortschatz oder kleine Dialoge trainieren und direkt Rückmeldung geben.', relevance: 'Das ergänzt Unterricht und Lernpartner, ersetzt sie aber nicht vollständig.', source: 'Duolingo: KI-gestützte Lernfunktionen', url: 'https://blog.duolingo.com/duolingo-max/' },
    { type: 'Realer Use Case', date: 'E-Mail', category: 'Organisation', title: 'Schreibvorschläge sparen Zeit bei kurzen Nachrichten.', text: 'E-Mail-Dienste schlagen Formulierungen vor und helfen beim Vervollständigen von Sätzen. Vertrauliche Inhalte gehören trotzdem nicht ungeprüft in ein KI-Werkzeug.', relevance: 'Schon kleine Vorschläge verändern, wie viele Menschen täglich schreiben.', source: 'Google Workspace: Gmail', url: 'https://workspace.google.com/products/gmail/' },
    { type: 'Realer Use Case', date: 'Smart Home', category: 'Wohnen', title: 'Automatisierte Routinen regeln Licht, Musik oder Erinnerungen.', text: 'Ein Smart Home kann auf Uhrzeit, Spracheingaben oder einfache Gewohnheiten reagieren und wiederkehrende Aufgaben bündeln.', relevance: 'KI und Automatisierung machen den Alltag bequemer, benötigen aber gut geschützte Konten und Geräte.', source: 'Amazon Alexa: Routinen', url: 'https://www.amazon.com/alexa-routines/b?node=21442983011' },
    { type: 'Realer Use Case', date: 'Handy', category: 'Erkennen', title: 'Die Kamera erkennt Text und macht ihn kopierbar.', text: 'Funktionen wie Live Text können Text in Bildern erkennen, übersetzen oder direkt weiterverwenden.', relevance: 'So wird aus einem Foto schnell eine Notiz, Telefonnummer oder Übersetzung.', source: 'Apple: Live Text', url: 'https://www.apple.com/ios/ios-17/' },
    { type: 'Realer Use Case', date: 'Unterwegs', category: 'Verkehr', title: 'Staudaten helfen bei der Wahl einer weniger vollen Strecke.', text: 'Waze kombiniert Verkehrsmeldungen und Routenvorschläge, um Änderungen auf dem Weg sichtbar zu machen.', relevance: 'Routenempfehlungen können Fahrzeiten verkürzen und Entscheidungen unterwegs erleichtern.', source: 'Waze: Live-Karte', url: 'https://www.waze.com/live-map' },
    { type: 'Realer Use Case', date: 'Lernen', category: 'Recherche', title: 'Bildsuche erkennt Pflanzen, Produkte oder Orte.', text: 'Mit Google Lens lassen sich Objekte in der Kamera suchen und zusätzliche Informationen finden.', relevance: 'Die Suche beginnt nicht mehr nur mit Text, sondern oft direkt mit einem Gegenstand aus dem Alltag.', source: 'Google Lens', url: 'https://lens.google/' },
    { type: 'Realer Use Case', date: 'Sicherheit', category: 'Fahren', title: 'Fahrerassistenz kann vor Risiken warnen.', text: 'Moderne Fahrzeuge unterstützen mit Warnungen und Assistenzfunktionen. Fahrerinnen und Fahrer bleiben verantwortlich und aufmerksam.', relevance: 'Assistenzsysteme begegnen vielen Menschen schon heute im eigenen Auto oder in Familienfahrzeugen.', source: 'NHTSA: Fahrerassistenzsysteme', url: 'https://www.nhtsa.gov/vehicle-safety/driver-assistance-technologies' },
    { type: 'Realer Use Case', date: 'Medien', category: 'Kennzeichnung', title: 'KI-Bilder können mit Herkunftsinformationen versehen werden.', text: 'Content Credentials können Hinweise darauf geben, wie digitale Inhalte entstanden oder bearbeitet wurden.', relevance: 'Solche Angaben helfen, Bilder und Videos im Alltag kritischer einzuordnen.', source: 'Adobe: Content Credentials', url: 'https://helpx.adobe.com/creative-cloud/help/content-credentials.html' },
    { type: 'Realer Use Case', date: 'Arbeit', category: 'Besprechungen', title: 'Eine KI kann Gesprächsnotizen strukturieren.', text: 'Werkzeuge für Meetings können Stichpunkte, Aufgaben und Zusammenfassungen vorbereiten. Vor dem Teilen sollten Inhalte geprüft werden.', relevance: 'Das spart Zeit, wenn Datenschutz und Zustimmung aller Beteiligten beachtet werden.', source: 'Microsoft: KI für Arbeit und Zusammenarbeit', url: 'https://www.microsoft.com/microsoft-365/copilot' },
    { type: 'Realer Use Case', date: 'Kundenservice', category: 'Hilfe', title: 'Ein Chatfenster beantwortet Standardfragen rund um die Uhr.', text: 'Unternehmen setzen Chatbots für einfache Fragen ein, etwa zu Öffnungszeiten, Bestellungen oder Rückgaben.', relevance: 'Das kann Wartezeiten verkürzen – bei komplexen Problemen bleibt menschlicher Support wichtig.', source: 'IBM: Chatbots im Kundenservice', url: 'https://www.ibm.com/think/topics/chatbots' },
    { type: 'Realer Use Case', date: 'Umwelt', category: 'Energie', title: 'Stromnetze können Angebot und Bedarf besser ausgleichen.', text: 'KI kann Daten aus Energieerzeugung und Verbrauch auswerten, damit Netze stabiler und effizienter geplant werden.', relevance: 'Solche Anwendungen sind unsichtbar, können aber den Alltag mit Energie und Mobilität beeinflussen.', source: 'IEA: Künstliche Intelligenz und Energie', url: 'https://www.iea.org/reports/energy-and-ai' }
  ];

  for (let index = feedItems.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [feedItems[index], feedItems[randomIndex]] = [feedItems[randomIndex], feedItems[index]];
  }

  const elements = {
    type: feedRoot.querySelector('[data-feed-type]'),
    date: feedRoot.querySelector('[data-feed-date]'),
    category: feedRoot.querySelector('[data-feed-category]'),
    title: feedRoot.querySelector('[data-feed-title]'),
    text: feedRoot.querySelector('[data-feed-text]'),
    relevance: feedRoot.querySelector('[data-feed-relevance]'),
    source: feedRoot.querySelector('[data-feed-source]'),
    progress: feedRoot.querySelector('[data-feed-progress]'),
    status: feedRoot.querySelector('[data-feed-status]'),
    previous: feedRoot.querySelector('[data-feed-previous]'),
    next: feedRoot.querySelector('[data-feed-next]')
  };
  const duration = 8000;
  const hoverSpeed = 0.38;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let currentIndex = 0;
  let elapsed = 0;
  let animationFrame;
  let lastFrame;
  let isHovering = false;
  let isPaused = false;

  function stopTimer() {
    window.cancelAnimationFrame(animationFrame);
    animationFrame = undefined;
    lastFrame = undefined;
  }

  function updateProgress() {
    elements.progress.style.width = `${Math.min((elapsed / duration) * 100, 100)}%`;
  }

  function tick(timestamp) {
    if (isPaused) return;
    if (lastFrame === undefined) lastFrame = timestamp;
    const speed = isHovering ? hoverSpeed : 1;
    elapsed += (timestamp - lastFrame) * speed;
    lastFrame = timestamp;
    updateProgress();

    if (elapsed >= duration) {
      showItem(currentIndex + 1, false);
      return;
    }
    animationFrame = window.requestAnimationFrame(tick);
  }

  function startTimer(reset = true) {
    stopTimer();
    if (reset) elapsed = 0;
    if (reduceMotion) {
      elements.progress.style.width = '100%';
      return;
    }
    updateProgress();
    if (!isPaused) animationFrame = window.requestAnimationFrame(tick);
  }

  function showItem(index, announce) {
    currentIndex = (index + feedItems.length) % feedItems.length;
    const item = feedItems[currentIndex];
    elements.type.textContent = item.type;
    elements.date.textContent = item.date;
    elements.category.textContent = item.category;
    elements.title.textContent = item.title;
    elements.text.textContent = item.text;
    elements.relevance.textContent = item.relevance;
    elements.source.href = item.url;
    elements.source.firstChild.textContent = `${item.source} öffnen `;
    elements.status.textContent = announce ? `${item.category}: ${item.title}` : '';
    startTimer();
  }

  function pauseForFocus() {
    isPaused = true;
    stopTimer();
  }

  function resumeAfterFocus() {
    isPaused = false;
    if (!reduceMotion) startTimer(false);
  }

  elements.previous.addEventListener('click', () => showItem(currentIndex - 1, true));
  elements.next.addEventListener('click', () => showItem(currentIndex + 1, true));
  feedRoot.addEventListener('mouseenter', () => { isHovering = true; });
  feedRoot.addEventListener('mouseleave', () => { isHovering = false; });
  feedRoot.addEventListener('focusin', pauseForFocus);
  feedRoot.addEventListener('focusout', event => {
    if (!feedRoot.contains(event.relatedTarget)) resumeAfterFocus();
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) pauseForFocus();
    else resumeAfterFocus();
  });

  showItem(0, false);
}
