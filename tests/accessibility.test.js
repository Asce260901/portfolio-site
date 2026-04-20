/** @jest-environment jsdom */
const fs = require('fs');
const path = require('path');
const { axe, toHaveNoViolations } = require('jest-axe');

expect.extend(toHaveNoViolations);

let html;

beforeAll(() => {
  html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
});

describe('Accessibility (axe-core WCAG 2.1 AA)', () => {
  test('has no WCAG 2.1 A violations', async () => {
    const results = await axe(html, {
      runOnly: { type: 'tag', values: ['wcag2a'] },
    });
    expect(results).toHaveNoViolations();
  });

  test('has no WCAG 2.1 AA violations', async () => {
    const results = await axe(html, {
      runOnly: { type: 'tag', values: ['wcag2aa'] },
    });
    expect(results).toHaveNoViolations();
  });
});
