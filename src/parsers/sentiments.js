Insights.prototype.sentiments = function() {

	var data = this.textForTotals(), fullText = data.fullText, tweets = data.wordLevel, lib = this
			.sentimentLib(), results, negativeWords = [], positiveWords = [], balance = 0, negativeTweets = [], positiveTweets = [], neutralTweetCount = 0, totalWords = 0;

	if (this.st) {
		return this.st;
	}

	for (var i = 0, max = tweets.length; i < max; i++) {
		var tweet = tweets[i], currentBalance = 0, currentPositive = [], currentNegative = [];

		for (var j = 0; j < tweet.length; j++) {
			var word = tweet[j];
			totalWords++;

			for ( var key in lib) {
				var sent = key, score = lib[key];

				if (word === sent) {
					if (score > 0) {
						positiveWords.push(sent);
						currentPositive.push(sent);

						balance += score;
						currentBalance += score;

					} else {
						negativeWords.push(sent);
						currentNegative.push(sent);

						balance += score;
						currentBalance += score;
					}

				}
			}

		}

		if (currentBalance > 0) {
			positiveTweets.push({
				text : fullText[i],
				negativeWords : currentNegative,
				positiveWords : currentPositive,
				balance : currentBalance
			});
		} else if (currentBalance < 0) {
			negativeTweets.push({
				text : fullText[i],
				negativeWords : currentNegative,
				positiveWords : currentPositive,
				balance : currentBalance
			});
		} else {

			neutralTweetCount++;

		}

	}

	negativeTweets = _.sortBy(negativeTweets, function(tweet) {
		return tweet.balance;
	});

	positiveTweets = _.sortBy(positiveTweets, function(tweet) {
		return tweet.balance;
	}).reverse();

	this.st = {
		negativeWords : negativeWords,
		positiveWords : positiveWords,
		negPosWords : negativeWords.concat(positiveWords),
		balance : balance,
		negativeTweets : negativeTweets,
		positiveTweets : positiveTweets,
		neutralTweetCount : neutralTweetCount,
		totalWords : totalWords
	};

	results = this.st;

	return results;

};
