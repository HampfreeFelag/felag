---
title: "ADX: Trend Strength Filter That Saves You From Ranging Markets"
description: "Breakdown of ADX: how the indicator measures trend strength through +DI and -DI, and why the 20 threshold is the golden mean for crypto in the system."
pubDate: '2026-11-28'
category: 'compass'
draft: true
---

Traders using oscillators to determine trend direction often face one problem: indicators work well in trends but generate false signals in sideways movement. RSI shows overbought conditions on both falling and rising markets. MACD crosses the zero line in both trends and ranges. You need a tool that measures not direction, but strength.

The Average Directional Index (ADX) was created for this purpose. It does not tell you where price will go — it tells you how strongly price is moving in the current direction. In the system, ADX on the 15-minute timeframe performs a critical function: filtering out ranges and leaving only periods when the trend is strong enough for position entry.

## History and Mathematics

ADX, like RSI, was developed by Welles Wilder Jr. and published in 1978. Wilder realized that trend direction and trend strength are two different measurements. Direction is determined by the ratio of buying to selling pressure, strength by how consistently that pressure pushes price.

ADX is calculated based on two auxiliary indicators:

- **+DI (Positive Directional Indicator)** — measures the strength of upward movement.
- **-DI (Negative Directional Indicator)** — measures the strength of downward movement.

The calculation of +DI and -DI is based on comparing changes in candle maximum and minimum values. If the current maximum exceeds the previous maximum more than the current minimum falls below the previous minimum — +DI receives weight. And vice versa.

ADX is a smoothed ratio of +DI to -DI, expressed as a percentage from 0 to 100. A value of 0 means no trend, 100 means an extremely strong trend.

Unlike RSI, which shows impulse direction, ADX shows its intensity. RSI can be in oversold territory, but if ADX is low — the movement is chaotic, without a clear direction. In this case, entering against the impulse is risky: price may not reverse, but continue oscillating in a narrow corridor.

## Why the 20 Threshold Is the Golden Mean for Crypto

Wilder's classic rule states: ADX above 25 means a strong trend. However, crypto markets have different volatility than stock markets. Crypto trades 24/7, volatility clusters replace each other without weekends, and average moves are often shorter but more frequent.

The value 20 proved to be a compromise:

- **Below 20** — the market is in a range, the trend is too weak for position entry. Signals from other indicators are unreliable.
- **20–40** — an expressed trend, entry conditions are met.
- **Above 40** — an extremely strong trend. At this level, the risk of reversal increases, as the move may have been overheated.

For the system, the 20 threshold on 15m is a mandatory filter. It ensures that positions are opened only when the trend, set by KC on 1h and confirmed by RSI on 30m, has sufficient strength to continue.

## How It Works in the System

In the system, ADX(14) on the 15-minute timeframe serves as a range filter. The condition:

```
ADX(14) > 20 on 15m timeframe
```

This condition is only checked after KC on 1h has established context and RSI on 30m has confirmed momentum. ADX does not determine direction — it confirms that the current trend is strong enough.

Why 15 minutes? This timeframe sits between 30m (momentum) and 5m (trigger). It is smoothed enough to ignore short-term fluctuations, yet sensitive enough to detect the beginning of an expressed trend.

The checking order in the system:

1. **1h KC:** price below lower boundary — context established.
2. **30m RSI:** value below 30 — momentum confirmed.
3. **15m ADX:** value above 20 — trend expressed, range filtered.
4. **5m Vortex:** VI+ crosses VI- — entry trigger fires.

Each subsequent step is contingent on the previous one. If ADX does not trigger, Vortex is not considered — even if the 5m trigger fires, entering without trend strength confirmation carries a high risk of catching a false breakout.

## Summary

ADX in the system is a trend strength filter, not a direction indicator. A value above 20 on 15m confirms that the trend, set by KC on 1h and confirmed by RSI on 30m, is strong enough for position entry. Without this filter, the system opens positions in ranges where other indicators' signals are unreliable.

## FAQ

**Can ADX be used to determine trend direction?**

No. ADX measures only trend strength, not direction. Direction is determined by +DI and -DI: if +DI is above -DI — the trend is upward, if below — downward. In the system, direction is determined by KC on 1h, ADX only confirms its strength.
