---
draft: true
title: "Behind the Scenes of FÉLAG: Architecture, Automation, and Collaboration"
description: "A look at building an analytics blog: CI/CD setup, automated checks, responsive layout. Open to professional collaborations."
pubDate: '2026-11-02'
category: 'crew'
---

## Introduction: purpose and architecture

FÉLAG is both a personal knowledge base for building trading systems and an open platform for documenting the engineering process. The resource captures real-world experience: from CI/CD setup to responsive layout and analytics integration.

Constructive feedback on code, layout, or content is welcome. Contact details are on the ["About"](/en/about/) page.

## Behind the scenes: engineering improvements

The project architecture went through several optimization iterations. Key changes:

- **Continuous integration:** `npm run verify` script blocks commits with JSON-LD errors, NUL bytes, or broken links.
- **UX:** View Transitions API for smooth language switching, scroll position preservation, CSS theme toggle animation.
- **Responsive layout:** Articles catalog on CSS Grid with sticky sidebar on desktop and drawer menu on mobile.
- **Localization:** RU/EN audit, meta tag alignment, translation key parity.

Detailed content distribution architecture is covered in a separate article: ["Information Harbor Architecture"](/en/saga/information-harbor-architecture/).

## Development direction

Upcoming posts will shift from general architecture topics to specifics: trading bot configuration, analysis of real trading systems, and post-mortems of mistakes made.

All external resources and tools are listed in the footer of each article.

## Summary

The project infrastructure is built on transparency and continuous improvement. It is open to suggestions and professional connections.

## FAQ

**Why publish technical development details in a blog?**
Transparency builds trust. Real engineering solutions are valued higher than abstract discussions.

**How to propose a collaboration or report an issue?**
Contact details are on the ["About"](/en/about/) page. Constructive criticism is treated as a resource for improvement.

**Do you publish ready-made trading strategies for copying?**
Trading signals and individual investment advice are not published. However, materials regularly break down the mechanics, architecture, and logic of trading systems: how rules are formalized, hypotheses tested, and risk management structured on specific platforms.
