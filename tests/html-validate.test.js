const { HtmlValidate } = require('html-validate');
const path = require('path');

const htmlvalidate = new HtmlValidate();

describe('HTML Validation', () => {
  test('index.html passes html-validate rules', async () => {
    const report = await htmlvalidate.validateFile(
      path.join(__dirname, '../index.html')
    );
    if (!report.valid) {
      const errors = report.results
        .flatMap(r => r.messages)
        .map(m => `  [${m.severity === 2 ? 'error' : 'warn'}] line ${m.line}: ${m.message} (${m.ruleId})`)
        .join('\n');
      throw new Error(`HTML validation failed:\n${errors}`);
    }
    expect(report.valid).toBe(true);
  });
});
