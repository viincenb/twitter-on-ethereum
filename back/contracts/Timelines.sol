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

struct Follow {
    uint id;
    address follower;
    address followed;
    uint followDate;
}

interface IFollows {
    function followingAccounts() external view returns (Follow[] memory);
    function followingAccounts(address origin) external view returns (Follow[] memory);
    function followAccount(address account) external;
    function unfollowAccount(address account) external;
    function isFollowing(address account) external view returns (bool);
}

interface ITweets {
    function getAccountTweets(address account) external view returns (Tweet[] memory);
    function getTweets() external view returns (Tweet[] memory);
    function sendTweet(InputTweet memory tweet) external;
}

contract Timelines {
    function concat(Tweet[] memory a, Tweet[] memory b) internal pure returns (Tweet[] memory) {
        Tweet[] memory newTweets = new Tweet[](a.length + b.length);
        uint newTweetsIndex;

        for (uint i = 0; i < a.length; i++) {
            newTweets[newTweetsIndex++] = a[i];
        }
        for (uint i = 0; i < b.length; i++) {
            newTweets[newTweetsIndex++] = b[i];
        }

        return newTweets;
    }

    function getTimeline(address tweetsAddress, address followsAddress) public view returns (Tweet[] memory) {
        Tweet[] memory timeline;
        IFollows follows = IFollows(followsAddress);
        ITweets tweets = ITweets(tweetsAddress);
        Follow[] memory following = follows.followingAccounts(msg.sender);

        for (uint i = 0; i < following.length; i++) {
            Follow memory follow = following[i];
            Tweet[] memory followedTweets = tweets.getAccountTweets(follow.followed);

            timeline = concat(timeline, followedTweets);
        }

        return timeline;
    }
}
