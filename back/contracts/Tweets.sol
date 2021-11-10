// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

struct Tweet {
    uint id;
    address author;
    string content;
    uint dateCreated;
}

struct InputTweet {
    string content;
}

interface ITweets {
    function getAccountTweets(address account) external view returns (Tweet[] memory);
    function getTweets() external view returns (Tweet[] memory);
    function sendTweet(InputTweet memory tweet) external;
}

contract Tweets is ITweets {
    uint private tweetId;

    mapping(uint => Tweet) tweets;
    mapping(address => uint[]) accountTweets;

    function getAccountTweets(address account)
        override
        public
        view
        returns (Tweet[] memory)
    {
        uint[] memory ids = accountTweets[account];
        Tweet[] memory givenAccountTweets = new Tweet[](ids.length);
        
        for (uint i = 0; i < ids.length; i++) {
            givenAccountTweets[i] = tweets[ids[i]];
        }
        
        return givenAccountTweets;
    }

    function getTweets() override public view returns (Tweet[] memory) {
        return getAccountTweets(msg.sender);
    }

    function sendTweet(InputTweet memory tweet) override public {
        ++tweetId;

        Tweet memory newTweet = Tweet(tweetId, msg.sender, tweet.content, block.timestamp);

        tweets[tweetId] = newTweet;
        accountTweets[msg.sender].push(tweetId);
    }
}
