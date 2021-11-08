// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

struct Tweet {
    uint id;
    address author;
    string content;
}

struct InputTweet {
    string content;
}

contract TweetContract {
    uint private tweetId;

    mapping(uint => Tweet) tweets;
    mapping(address => uint[]) accountTweets;
    mapping(address => address[]) follows;

    function getAccountTweets(address account)
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

    function getTweets() public view returns (Tweet[] memory) {
        return getAccountTweets(msg.sender);
    }

    function sendTweet(InputTweet memory tweet) public {
        ++tweetId;

        Tweet memory newTweet = Tweet(tweetId, msg.sender, tweet.content);

        tweets[tweetId] = newTweet;
        accountTweets[msg.sender].push(tweetId);
    }

    function followingAccounts() public view returns (address[] memory) {
        return follows[msg.sender];
    }

    function followAccount(address account) public {
        require(account != msg.sender, "You cannot follow yourself");

        follows[msg.sender].push(account);
    }

    function unfollowAccount(address account) public {
        address[] memory accounts = followingAccounts();

        for (uint256 i = 0; i < accounts.length; i++) {
            if (accounts[i] == account) {
                delete follows[msg.sender][i];
            }
        }
    }

    function getTimelineLength() private view returns (uint256) {
        address[] memory following = follows[msg.sender];
        uint256 tweetsCount = 0;

        for (uint256 i = 0; i < following.length; i++) {
            Tweet[] memory tweetsToDisplay = getAccountTweets(following[i]);

            tweetsCount += tweetsToDisplay.length;
        }

        return tweetsCount;
    }

    function getTimeline() public view returns (Tweet[] memory) {
        address[] memory following = follows[msg.sender];
        Tweet[] memory timeline = new Tweet[](getTimelineLength());

        for (uint256 i = 0; i < following.length; i++) {
            Tweet[] memory tweetsToDisplay = getAccountTweets(following[i]);

            for (uint256 j = 0; j < tweetsToDisplay.length; j++) {
                timeline[i + j] = tweetsToDisplay[j];
            }
        }

        return timeline;
    }
}
