const GLYPH_INTERVAL = 1000;
const glyphLineElement = document.querySelector('.glyphs__line');
const titleButton = document.getElementById('cycle-background');
const videoElements = Array.from(document.querySelectorAll('.bg-video'));
const glyphButtons = Array.from(document.querySelectorAll('.glyph-button'));
const logoImage = document.getElementById('site-logo');

let glyphData = [];
let glyphIndex = 0;
let videoIndex = 0;
let videoPaths = [];

async function loadGlyphs() {
  try {
    const response = await fetch('assets/glyphs.json');
    if (!response.ok) {
      throw new Error('Glyph JSON introuvable');
    }
    glyphData = await response.json();
  } catch (error) {
    console.error(error);
    glyphData = [
      { glyph: '⟡⟡⟡', text: 'NARCISSISM' },
      { glyph: '✶✶✶', text: 'PSYCHOPATHY' },
      { glyph: '◇◇◇', text: 'MACHIAVELLIANISM' }
    ];
  }
  updateGlyphLine();
  setInterval(updateGlyphLine, GLYPH_INTERVAL);
}

function updateGlyphLine() {
  if (!glyphData.length) return;
  const current = glyphData[glyphIndex % glyphData.length];
  glyphLineElement.textContent = current.glyph;
  glyphLineElement.setAttribute('data-text', current.text);
  glyphLineElement.setAttribute('aria-label', current.text);
  glyphIndex += 1;
}

function enhanceGlyphButtons() {
  glyphButtons.forEach((button) => {
    const text = button.dataset.text;
    button.setAttribute('aria-description', text);
    button.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        button.click();
      }
    });
  });
}

async function loadVideoPaths() {
  const txtFiles = ['assets/video/video1.txt', 'assets/video/video2.txt', 'assets/video/video3.txt'];
  const paths = await Promise.all(
    txtFiles.map(async (file) => {
      try {
        const response = await fetch(file);
        if (!response.ok) {
          throw new Error(`Impossible de charger ${file}`);
        }
        const text = await response.text();
        return text.trim();
      } catch (error) {
        console.warn(error.message);
        return '';
      }
    })
  );
  videoPaths = paths.filter(Boolean);
  if (videoPaths.length) {
    primeVideos();
  }
}

async function loadLogoPath() {
  if (!logoImage) return;
  try {
    const response = await fetch('assets/img/logo.txt');
    if (!response.ok) {
      throw new Error('Logo placeholder introuvable');
    }
    const path = (await response.text()).trim();
    if (path) {
      logoImage.src = path;
    }
  } catch (error) {
    console.warn(error.message);
  }
}

function primeVideos() {
  const firstVideo = videoElements[0];
  firstVideo.src = videoPaths[0];
  firstVideo.load();
  firstVideo.play().catch(() => {});
  videoIndex = 0;
}

function cycleVideo() {
  if (!videoPaths.length) return;
  const nextIndex = (videoIndex + 1) % videoPaths.length;
  const currentVideo = videoElements.find((video) => video.classList.contains('active')) || videoElements[0];
  const nextVideo = videoElements.find((video) => video !== currentVideo);
  if (!nextVideo) return;

  nextVideo.src = videoPaths[nextIndex];
  nextVideo.currentTime = 0;
  nextVideo.load();
  const playPromise = nextVideo.play();
  if (playPromise && typeof playPromise.then === 'function') {
    playPromise.catch(() => {});
  }

  nextVideo.classList.add('active');
  currentVideo.classList.remove('active');
  currentVideo.pause();

  videoIndex = nextIndex;
}

function init() {
  loadGlyphs();
  enhanceGlyphButtons();
  loadVideoPaths();
  loadLogoPath();
  titleButton.addEventListener('click', cycleVideo);
}

window.addEventListener('DOMContentLoaded', init);
