import { expect } from "chai";
import { ethers } from "hardhat";

describe("Tweet", function () {
  it("Should send the tweet", async function () {
    const Tweet = await ethers.getContractFactory("Tweets");
    const tweet = await Tweet.deploy();
    await tweet.deployed();

    expect(await tweet.getTweets()).to.deep.eq([]);

    const sendTweetTx = await tweet.sendTweet({
      content: "Hello",
    });

    // wait until the transaction is mined
    await sendTweetTx.wait();

    const tweets = await tweet.getTweets();

    expect(tweets.length).to.eq(1);
    expect(tweets[0].author).to.be.an("string");
    expect(tweets[0].content).to.eql("Hello");
  });
});
