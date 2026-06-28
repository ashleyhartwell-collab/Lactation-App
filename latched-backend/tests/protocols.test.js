// Latched — Protocol markdown content tests.
// Validates that the source-of-truth protocol docs in content/protocols/ contain
// the clinical content the app surfaces. These docs are the spec the frontend
// reads from — if a required passage is removed or restructured, this catches it.
//
// Usage:
//   npm run test:protocols

import assert from 'node:assert/strict';
import { describe, it, before } from 'node:test';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = resolve(__dirname, '..', '..');

function readProtocol(filename) {
  return readFileSync(resolve(PROJECT_ROOT, 'content', 'protocols', filename), 'utf8');
}

function extractSection(content, headingRegex) {
  // Capture from the matched heading through the next "## " heading or end of file.
  const startMatch = content.match(headingRegex);
  if (!startMatch) return null;
  const start = startMatch.index;
  const rest = content.slice(start + startMatch[0].length);
  const nextHeading = rest.search(/\n## /);
  return nextHeading === -1 ? content.slice(start) : content.slice(start, start + startMatch[0].length + nextHeading);
}

describe('protocol: axillary-breast-tissue.md', () => {
  let content;

  before(() => {
    content = readProtocol('protocol-axillary-breast-tissue.md');
  });

  it('declares applicability to all three feeding paths (A/nursing, B/pumping, C/combination)', () => {
    // The protocol is structured as a single "All paths" module rather than three
    // per-path sections. Verify the all-paths label appears in both the scope line
    // and the module header so the frontend can surface it for paths A, B, and C.
    const allPathsMentions = content.match(/all paths/gi) || [];
    assert.ok(
      allPathsMentions.length >= 2,
      `Expected at least 2 "All paths" labels (scope + module header); found ${allPathsMentions.length}`
    );
  });

  it('mentions cold compresses', () => {
    assert.match(content, /cold compress(es)?/i);
  });

  it('mentions cabbage leaves', () => {
    assert.match(content, /cabbage leaves/i);
  });

  it('mentions armpit', () => {
    assert.match(content, /armpit/i);
  });

  it('mentions axillary breast tissue', () => {
    assert.match(content, /axillary( breast)? tissue/i);
  });

  it('has a "WHAT TO WATCH FOR" escalation section that mentions fever', () => {
    const section = extractSection(content, /\*\*WHAT TO WATCH FOR[^\n]*\*\*/i);
    assert.ok(section, 'Expected a "WHAT TO WATCH FOR" section');
    assert.match(section, /fever/i, '"WHAT TO WATCH FOR" section should mention fever');
  });

  it('has a FAQ section with at least 5 questions', () => {
    const faqSection = extractSection(content, /^## FAQ[^\n]*$/m);
    assert.ok(faqSection, 'Expected a "## FAQ" section');
    const questionCount = (faqSection.match(/^\*\*Q:/gm) || []).length;
    assert.ok(
      questionCount >= 5,
      `Expected at least 5 FAQ questions in axillary protocol; found ${questionCount}`
    );
  });
});

describe('protocol: blisters-nipple.md', () => {
  let content;

  before(() => {
    content = readProtocol('protocol-blisters-nipple.md');
  });

  it('distinguishes blood blisters from milk blisters/blebs with separate modules', () => {
    assert.match(content, /## MODULE: Blood Blister/i, 'Expected a Blood Blister module heading');
    assert.match(content, /## MODULE: Milk Blister/i, 'Expected a Milk Blister module heading');
    assert.match(content, /bleb/i, 'Expected "bleb" terminology to appear');
  });

  it('contains a comparison of blood vs. milk blister characteristics', () => {
    // The doc has a markdown table near the top distinguishing the two.
    assert.match(content, /\bBlood blister\b[\s\S]*?\bMilk blister\b/i);
  });

  it('mentions lubricant or lubrication', () => {
    assert.match(content, /lubricant|lubrication|lubricat/i);
  });

  it('has a FAQ section', () => {
    const faqSection = extractSection(content, /^## FAQ[^\n]*$/m);
    assert.ok(faqSection, 'Expected a "## FAQ" section');
    const questionCount = (faqSection.match(/^\*\*Q:/gm) || []).length;
    assert.ok(questionCount > 0, 'FAQ section should contain at least one question');
  });

  it('FAQ section mentions antibiotics', () => {
    const faqSection = extractSection(content, /^## FAQ[^\n]*$/m);
    assert.ok(faqSection, 'Expected a "## FAQ" section');
    assert.match(faqSection, /antibiotic/i, 'FAQ should address antibiotics');
  });
});
