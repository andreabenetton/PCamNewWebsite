# ADR 0011 — Performance, accessibility and responsive behavior are baseline requirements

- **Status:** Accepted
- **Date:** 2026-08-08

## Context

The website must work reliably for prospects and customers on desktops, tablets and phones, across variable network conditions. A modern visual design that performs poorly, requires excessive JavaScript or becomes difficult to use on touch/keyboard devices would undermine both sales and customer satisfaction.

## Decision

Performance, accessibility and responsive behavior are acceptance criteria, not later optimization phases.

Baseline principles:

- semantic HTML and logical heading hierarchy;
- keyboard-operable navigation and interactive controls;
- meaningful focus states;
- sufficient contrast;
- reduced-motion respect where animation is used;
- responsive layouts designed for content, not fixed desktop breakpoints only;
- images sized/encoded appropriately and lazy-loaded where suitable;
- minimal client JavaScript by default;
- no essential public content hidden behind client-side rendering;
- forms and future authenticated tools must provide clear validation and error states.

Animations or visual effects must not interfere with reading technical content or operating the interface.

## Consequences

Design decisions are judged on clarity and robustness as well as visual appeal. React islands and media must justify their performance cost.
