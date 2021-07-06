# emacrosscandle
Exponential Moving Average Candle Close Trading Strategy

This application fetches price data for assets, calculates Candles and EMAs for
specified timeframes, and generates buy/sell signals based on EMA crossings.

The development process is described in more detail here:

https://code.morelater.com

This project is based on Crypto Savy's short trading tutorial on YouTube here:

https://youtu.be/FYQGz340F2U

Here's a short summary of the strategy:

1. On the hourly or daily chart for BitCoin, add EMAs for 8, 13, 21, and 55

2. Buy when the following occurs:

	A. The 8, 13, and 21 EMA all cross above the 55 EMA
	B. A candle opens and closes above the 55 EMA after the crossings just described

3. Sell when the following occurs:

	A. The 8, 13, and 21 EMA all cross BELOW the 55 EMA
	B. A candle opens and closes BELOW the 55 EMA after the crossings just described

Here's a link to the live implementation (try it out):

https://someone-else-codes.github.io/emacrosscandle/web-ui/form.html

And here's a link to the source on github:

https://github.com/someone-else-codes/emacrosscandle
