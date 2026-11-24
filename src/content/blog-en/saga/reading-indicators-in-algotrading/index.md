---
title: 'Reading indicators in algo trading: mechanics, not magic'
description: 'Why RSI, MACD, and Bollinger Bands do not predict price — and how to correctly use technical indicators in trading bots.'
pubDate: '2026-11-24'
category: 'helm'
draft: true
---

## Introduction

Technical indicators — RSI, MACD, Bollinger Bands, SMA — have become the language traders use to describe the market. But in algo trading, indicators do not work as oracles. They do not predict price. They describe the past.

This article is about how to read indicators correctly, without falling into overfitting traps and false signals.

## What an indicator actually is

An indicator is a function of price data. It takes price history and volumes, outputs a number at the current moment. Nothing more.

**Key understanding:** an indicator contains no forecast. It contains aggregated history. All it can say is «over N periods, price behaved this way».

### Indicator types by mechanics

- **Trend-following (SMA, EMA, MACD)** — smooth noise, but lag. Work in directional markets, lose in consolidation.
- **Oscillators (RSI, Stochastic)** — show relative price position within a range. Do not show direction.
- **Volatility (Bollinger Bands, ATR)** — measure range, not direction. Wide bands ≠ reversal.

## How indicators break trading bots

The most common mistake — using an indicator as a direct trading trigger.

**Classic trap:** RSI < 30 → buy. RSI > 70 → sell.

The problem is that RSI can stay overbought or oversold for weeks in a strong trend. A bot trading by this rule will «catch falling knives» in a bull trend and «sell at highs» in a bear trend.

### Overfitting to history

Each added indicator increases the parameter space. More parameters = higher chance the strategy perfectly describes past data but is useless on new data.

**Rule:** if a strategy uses more than two indicators simultaneously — it is most likely overfitted.

## Correct use of indicators

Indicators work not as signals, but as context filters.

**Example architecture:**
1. Primary signal — from price action or volume.
2. Indicator — for context assessment: «is the market trending or ranging?»
3. Risk management — determines position size based on volatility (ATR).

### Indicator as filter, not trigger

Instead of «RSI < 30 → buy» use «RSI < 30 + price above SMA(200) → reinforce position». Two conditions from different indicator families reduce false signal probability.

### Aggregating indicators into one score

Advanced approach — combining multiple indicators into a single composite score. This does not automatically make the strategy better, but simplifies validation and reduces overfitting.

## Practical recommendations

- Test your indicator on ranging markets. If it «generates signals» in sideways — that is noise, not signal.
- Compare the indicator with pure price action. If the indicator adds no information already present in price — remove it.
- Test with walk-forward: train on one period, validate on the next. Not the same data.

## Summary

Indicators are description tools, not prediction tools. They are useful as context, useless as triggers. Algo trading requires understanding the mechanics of each indicator, not blindly copying rules from textbooks.

## FAQ

**Can you build a profitable strategy using only indicators?**

Theoretically — yes. Practically — almost impossible without overfitting. Indicators describe the past, while the market reacts to expectations. Strategies that work consistently always include non-indicator components: capital management, behavioral filters, price action.

**Why do indicators work in backtests but not in real time?**

Because history is an already realized scenario. In real time, you do not know if a candle will close as a «bullish hammer» or turn into a «hanging star». Indicators recalculate with each new candle, and the signal can disappear before the candle closes.

**Which indicator is the most reliable?**

None. The most reliable approach — use minimal indicators and understand what data they aggregate. SMA(200) simply shows the average price over 200 periods. No magic — just math.
