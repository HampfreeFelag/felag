---
title: "RSI: How to Avoid Buying Into Falling Markets"
description: "Breakdown of the RSI indicator: how Wells Wilder's formula measures momentum strength and why RSI < 30 is a confirmation signal, not a standalone entry trigger."
pubDate: '2026-11-28'
category: 'compass'
draft: true
---

The Relative Strength Index (RSI) is one of the most widely used indicators in a trader's toolkit. Its simplicity and visual clarity have made it a de facto standard for measuring momentum. Yet this popularity creates the primary trap: traders interpret values below 30 as buy signals, ignoring the trend context.

In the system, RSI is used not as a standalone signal but as a momentum filter on the 30-minute timeframe. A value below 30 confirms that the downward movement has sufficient strength for opening a position, but does not determine direction — that role belongs to the Keltner Channel on the 1-hour chart.

## History and Mathematics

RSI was developed by Welles Wilder Jr. and published in his book *New Concepts in Technical Trading Systems* (1978). Wilder created a series of indicators, including the Average Directional Index (ADX) and Parabolic SAR, each designed to measure objective market characteristics without requiring price prediction.

The RSI formula is calculated over a 14-period lookback:

1. Price changes are identified for each period.
2. Changes are separated into positive (up) and negative (down).
3. Over the selected period, the average positive change (`AvgGain`) and average negative change (`AvgLoss`) are computed.
4. RS = AvgGain / AvgLoss.
5. RSI = 100 − (100 / (1 + RS)).

RSI values range from 0 to 100. Values above 70 indicate overbought conditions, below 30 indicate oversold. These levels were chosen by Wilder empirically: he observed that on trending markets, RSI rarely crosses these boundaries without a subsequent reversal.

It is important to understand that RSI measures the speed and magnitude of price changes, not the absolute price level. This means RSI can remain in oversold or overbought territory for extended periods — especially in strong trends.

## Why RSI < 30 Is Not Always a Buy Signal

An RSI value below 30 means that average negative price changes have exceeded average positive changes over the last 14 periods. This is a statement of fact: sellers have outweighed buyers. But it does not mean selling has ended.

In a downtrend, RSI can remain in oversold territory for hours, and in some cases, days. Each bounce from the lower boundary creates the illusion of a reversal, but without confirmation from other indicators, entering on such a bounce carries high risk.

The classic mistake is entering on the first touch of RSI at level 30. In a strong downtrend, RSI can enter oversold territory, bounce, return, and continue falling. Each such cycle creates a false buying opportunity.

In the system, this trap is eliminated through the checking multiple timeframes. RSI on 30m does not work alone — it checks the context set by KC on 1h. If price is already below the Keltner lower boundary on 1h, then RSI < 30 on 30m confirms that momentum is strong enough for position entry. If price is not in KC zone, RSI < 30 is ignored.

## How It Works in the System

In the system, RSI(14) on the 30-minute timeframe serves as a momentum confirmation filter. The condition:

```
RSI(14) < 30 on 30m timeframe
```

This condition is only checked after KC on 1h has established the oversold context. Thus, RSI does not determine direction — it confirms that the current downward movement has sufficient strength.

Why 30 minutes? This timeframe sits between 1h (context) and 15m (range filter). It is sensitive enough to detect momentum, yet smoothed enough to ignore single candles.

The checking order in the system:

1. **1h KC:** price below lower boundary — context established.
2. **30m RSI:** value below 30 — momentum confirmed.
3. **15m ADX:** value above 20 — trend expressed, range filtered.
4. **5m Vortex:** VI+ crosses VI- — entry trigger fires.

Each subsequent step is contingent on the previous one. If KC does not trigger, RSI is ignored. If RSI does not trigger, ADX is not checked. If ADX does not trigger, Vortex is not considered.

## Summary

RSI in the system is a momentum filter, not an action signal. A value below 30 on 30m confirms the strength of the downward movement set by KC context on 1h. Without checking multiple timeframes, RSI creates more false entries than it prevents.

## FAQ

**Can RSI be used for entry points without KC?**

RSI alone can be used for screening assets in oversold zones. However, for position entry in the system, KC on 1h is mandatory — it determines whether price is in an anomalous volatility zone where momentum has statistically significant reversal potential.
