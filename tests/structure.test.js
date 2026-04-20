const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

let document;

beforeAll(() => {
  const html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
  document = new JSDOM(html).window.document;
});

describe('Page metadata', () => {
  test('has a non-empty title', () => {
    expect(document.title.trim()).toBeTruthy();
  });

  test('has a charset meta tag', () => {
    expect(document.querySelector('meta[charset]')).not.toBeNull();
  });

  test('has a viewport meta tag', () => {
    expect(document.querySelector('meta[name="viewport"]')).not.toBeNull();
  });

  test('html element has a lang attribute', () => {
    expect(document.documentElement.lang).toBeTruthy();
  });
});

describe('Page structure', () => {
  test('has a header element', () => {
    expect(document.querySelector('header')).not.toBeNull();
  });

  test('has a main element', () => {
    expect(document.querySelector('main')).not.toBeNull();
  });

  test('has a footer element', () => {
    expect(document.querySelector('footer')).not.toBeNull();
  });

  test('has exactly one h1', () => {
    expect(document.querySelectorAll('h1').length).toBe(1);
  });

  test('has Contact, Education, and Experience sections', () => {
    const headings = Array.from(document.querySelectorAll('h2')).map(h => h.textContent.trim());
    expect(headings).toContain('Contact');
    expect(headings).toContain('Education');
    expect(headings).toContain('Experience');
  });
});

describe('Images', () => {
  test('all images have non-empty alt text', () => {
    const images = document.querySelectorAll('img');
    expect(images.length).toBeGreaterThan(0);
    images.forEach(img => {
      expect(img.getAttribute('alt').trim()).toBeTruthy();
    });
  });
});

describe('Links', () => {
  test('email link uses mailto: protocol', () => {
    expect(document.querySelector('a[href^="mailto:"]')).not.toBeNull();
  });

  test('phone link uses tel: protocol (not callto:)', () => {
    const telLink = document.querySelector('a[href^="tel:"]');
    const calltoLink = document.querySelector('a[href^="callto:"]');
    expect(telLink).not.toBeNull();
    expect(calltoLink).toBeNull();
  });

  test('external links have rel="noopener noreferrer"', () => {
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    expect(externalLinks.length).toBeGreaterThan(0);
    externalLinks.forEach(link => {
      expect(link.rel).toContain('noopener');
      expect(link.rel).toContain('noreferrer');
    });
  });

  test('GitHub profile link is present', () => {
    expect(document.querySelector('a[href*="github.com/Asce260901"]')).not.toBeNull();
  });

  test('LinkedIn profile link is present', () => {
    expect(document.querySelector('a[href*="linkedin.com"]')).not.toBeNull();
  });
});
