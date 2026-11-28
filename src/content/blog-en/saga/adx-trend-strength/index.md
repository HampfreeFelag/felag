---
title: "ADX: Trend Strength Filter for Ranging Markets"
description: "Breakdown of ADX: how the indicator measures trend strength through +DI and -DI, why the 20 threshold often works better than classic levels, and where ADX doesn't work."
pubDate: '2026-11-28'
category: 'compass'
draft: false
---

Traders using oscillators to determine trend direction often face one problem: indicators work well in trends but generate false signals in sideways movement. RSI shows overbought conditions on both falling and rising markets. MACD crosses the zero line in both trends and ranges. You need a tool that measures not direction, but strength.

The Average Directional Index (ADX) was created for this purpose. It does not tell you where price will go — it tells you how strongly price is moving in the current direction. In trading practice, ADX performs a critical function: filtering out periods without an expressed trend and leaving only moments when the move is strong enough for position entry.

## History and Mathematics

ADX, like RSI, was developed by Welles Wilder Jr. and published in 1978. Wilder realized that trend direction and trend strength are two different measurements. Direction is determined by the ratio of buying to selling pressure, strength by how consistently that pressure pushes price.

ADX is calculated based on two auxiliary indicators:

- **+DI (Positive Directional Indicator)** — measures the strength of upward movement.
- **-DI (Negative Directional Indicator)** — measures the strength of downward movement.

The calculation of +DI and -DI is based on comparing changes in candle maximum and minimum values. If the current maximum exceeds the previous maximum more than the current minimum falls below the previous minimum — +DI receives weight. And vice versa.

ADX is a smoothed ratio of +DI to -DI, expressed as a percentage from 0 to 100. A value of 0 means no trend, 100 means an extremely strong trend.

Unlike RSI, which shows impulse direction, ADX shows its intensity. RSI can be in oversold territory, but if ADX is low — the movement is chaotic, without a clear direction. In this case, entering against the impulse is risky: price may not reverse, but continue oscillating in a narrow corridor.

## Why the 20 Threshold Is a Compromise for Crypto

Wilder's classic rule states: ADX above 25 means a strong trend. However, crypto markets have different volatility than stock markets. Crypto trades 24/7, volatility clusters replace each other without weekends, and average moves are often shorter but more frequent.

The value 20 proved to be a compromise:

- **Below 20** — the market is in a range, the trend is too weak for position entry. Signals from other indicators are unreliable.
- **20–40** — an expressed trend, entry conditions are met.
- **Above 40** — an extremely strong trend. At this level, the risk of reversal increases, as the move may have been overheated.

The 20 threshold is not universal — it should be tested against historical data of a specific asset. But as a starting point, it works better than the classic 25 because it accounts for the higher volatility of crypto markets.

## Practical Application

ADX is not used in isolation. It works as a filter that is checked before entering a position:

```
ADX(14) > 20
```

This condition says: "the trend is strong enough, I can look for an entry point." If ADX is below 20 — it's better to wait until the market exits the range.

Why 14 periods? This is a standard period inherited from Wilder. It provides a balance between sensitivity and smoothing. Smaller periods give more signals, but also more noise.

ADX can be combined with other indicators:

- **KC or Bollinger** — for context (oversold/overbought zone).
- **RSI** — for momentum confirmation.
- **Vortex** — for entry timing.

Each combination requires backtesting on historical data. ADX does not determine direction — it confirms that the current move is strong enough.

## Summary

ADX is a trend strength filter, not a direction indicator. A value above 20 confirms that the trend is strong enough for position entry. Without this filter, trading during range periods generates more false signals.

## FAQ

**Can ADX be used to determine trend direction?**

No. ADX measures only trend strength, not direction. Direction is determined by +DI and -DI: if +DI is above -DI — the trend is upward, if below — downward.

**Why the 20 threshold, not 25?**

Wilder's classic rule of 25 was designed for stock markets with daily sessions and weekends. Crypto markets trade 24/7, and trends are often shorter and less pronounced. The 20 threshold accounts for this, but it should be tested against specific asset data.

**What to do if ADX rises above 50?**

A high ADX means a strong trend, but also increases reversal risk. The move may have been overheated. In such a situation, it's better not to enter a new position, but to watch the current one.

**Is ADX suitable for scalping?**

ADX on short timeframes (1-5 minutes) generates a lot of noise. It works better on timeframes from 15 minutes and above, where trends are more stable.
