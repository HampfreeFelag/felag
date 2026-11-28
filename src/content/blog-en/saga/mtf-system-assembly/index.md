---
title: "ARGUS 5.3: How to Assemble an Multi-Timeframe System from Four Indicators"
description: "ARGUS 5.3 assembly: full entry logic across four timeframes, exit through Keltner and Bollinger channels on m1, risk management with reinvestment and leverage."
pubDate: '2026-11-28'
category: 'forge'
draft: true
---

Each indicator in this series was examined separately: Keltner, Bollinger, RSI, ADX, and Vortex. On their own, they describe different market properties — volatility, statistical deviation, momentum, trend strength, and directional flow. Value emerges when these measurements are arranged into a single hierarchy.

ARGUS 5.3 is an MTF system in which each indicator works on its own timeframe and performs exactly one function. Entry is built on four indicators and four timeframes, while exit relies on a combined channel on the 1-minute chart. Below is the full assembly.

## Full Entry Logic (1h → 30m → 15m → 5m)

Entry logic is sequential. Each next filter is checked only after the previous one is satisfied. This eliminates most false combinations before the trigger.

1. **1h — Keltner Channel.** The closing price is below the lower boundary `KC_LOWER(20, 2)`. This is the oversold context: the move has become anomalous relative to current ATR volatility. Full breakdown in [“Keltner Channel: ATR Volatility vs Statistical Deviation”](/en/saga/keltner-channel/).
2. **30m — RSI(14).** A value below 30 confirms that the downward momentum is strong enough. RSI does not define direction — it confirms context. Breakdown in [“RSI: How to Avoid Buying Into Falling Markets”](/en/saga/rsi-indicator/).
3. **15m — ADX(14).** A value above 20 filters out ranges and leaves only periods of expressed trend. Breakdown in [“ADX: Trend Strength Filter”](/en/saga/adx-trend-strength/).
4. **5m — Vortex(14).** VI+ crossing above VI- serves as the entry trigger. Breakdown in [“Vortex Indicator: Entry Trigger on the 5-Minute Timeframe”](/en/saga/vortex-oscillator/).

The entry point appears only when all four conditions are met simultaneously. If any link is missing, the signal is ignored. This hierarchy turns a set of separate indicators into a system with a clear entry rule.

## Exit Logic (m1 Keltner + Bollinger)

Exit in ARGUS 5.3 is built on a combined channel on the 1-minute chart. Earlier versions used the Ehlers Super Smoother filter. It reduced noise but introduced lag that delayed profit-taking on sharp pump candles.

In version 5.3 the smoothing filter is replaced by a dual channel:

```
exit when close > UPPER_BOLLINGER(20, 2) OR close > UPPER_KELTNER(20, 2) on m1
```

The upper Bollinger and Keltner boundaries form a “fat corridor.” It is wider than either indicator alone, so it captures profit faster while filtering the noise of minor pullbacks within a trend. The Bollinger mechanics are covered in [“Bollinger Bands: Standard Deviation as an Exit Signal”](/en/saga/bollinger-bands/).

The dual channel adapts to volatility automatically: during high-volatility impulses the corridor widens, during consolidation it narrows.

## Risk Management (40% Reinvestment, 5x Leverage)

Risk management parameters in ARGUS 5.3 are explicit. A 40% reinvestment means that 40% of realized profit is returned to trading capital, while 60% is reserved. 5x leverage sets the ratio of position size to own capital.

Both parameters require understanding their consequences:

- **5x leverage** multiplies both the potential result and liquidation risk. If the position moves 20% against the trader, capital is wiped out. Leverage is not a tool for increasing returns — it is a tool for increasing risk.
- **40% reinvestment** accelerates capital growth in a trend but equally accelerates drawdown during a series of losing trades. The reinvestment share must match the acceptable drawdown level.

The system additionally assumes a fixed risk per trade and a mandatory loss limit. Without a stop-loss and position sizing, no entry filter protects capital.

This material is educational and does not constitute investment advice. Crypto investments carry risk, including total loss of capital.

## Summary

ARGUS 5.3 assembles five indicators into a single MTF system: four entry filters on the 1h, 30m, 15m, and 5m timeframes, plus a combined exit channel on m1. The strength of the system lies not in a single indicator but in the sequence of checks and explicit risk rules. Each element of the series is covered in a separate article, allowing the system to be studied piece by piece.

## FAQ

**Why does entry use four timeframes instead of one?**

A single timeframe mixes context, momentum, and trigger into one signal. Splitting across timeframes allows each condition to be checked separately and filters out false combinations before entry.

**Can the system be simplified by removing one filter?**

It is technically possible, but each filter covers its own class of errors: Keltner — context, RSI — momentum, ADX — range, Vortex — entry timing. Removing any link raises the probability of a false signal.

**Does the dual channel on m1 replace a stop-loss?**

No. The exit channel captures profit but does not limit loss. A stop-loss and position sizing remain mandatory elements of risk management.

**Is the system suitable for manual trading?**

Sequentially checking four conditions across four timeframes requires discipline. In manual trading, the risk of skipping a link or breaking the entry rule increases. Automation reduces human error but does not eliminate market risk.
