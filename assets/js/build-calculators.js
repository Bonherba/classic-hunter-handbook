/* The handbook does not fetch or copy the calculator: the browser embeds its original page. */
(() => {
  document.querySelectorAll('[data-calculator-url]').forEach((button) => {
    const panel = document.getElementById(button.getAttribute('aria-controls'));
    if (!panel) return;
    const url = new URL(button.dataset.calculatorUrl);
    if (url.protocol !== 'https:' || url.hostname !== 'www.warcrafttavern.com') return;
    button.hidden = false;
    button.addEventListener('click', () => {
      const opening = button.getAttribute('aria-expanded') !== 'true';
      if (opening && !panel.querySelector('iframe')) {
        const note = document.createElement('p');
        note.textContent = 'Warcraft Tavern’s full calculator page appears below. If it does not load or is difficult to use on your screen, use the external link above.';
        const frame = document.createElement('iframe');
        const heading = button.closest('.hunter-build').querySelector('h2, h3');
        frame.title = 'Warcraft Tavern talent calculator — ' + heading.textContent;
        frame.className = 'hunter-calculator-frame';
        frame.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-forms allow-popups');
        frame.referrerPolicy = 'strict-origin-when-cross-origin';
        frame.src = url.href;
        panel.append(note, frame);
      }
      panel.hidden = !opening;
      button.setAttribute('aria-expanded', String(opening));
      button.textContent = opening ? 'Hide calculator' : 'Open calculator here';
    });
  });
})();
