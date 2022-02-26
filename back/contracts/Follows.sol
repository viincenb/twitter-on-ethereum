// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

struct Follow {
    uint id;
    address follower;
    address followed;
    uint followDate;
}

interface IFollows {
    event Followed(Follow follow);
    event Unfollowed(Follow follow);

    function followingAccounts() external view returns (Follow[] memory);
    function followingAccounts(address origin) external view returns (Follow[] memory);
    function followAccount(address account) external;
    function unfollowAccount(address account) external;
    function isFollowing(address account) external view returns (bool);
}

contract Follows is IFollows {
    uint private followId;

    mapping(uint => Follow) follows;
    mapping(address => uint[]) followsByAccount;
    
    modifier following(address account) {
        require(isFollowing(account), "You don't follow this account");
        _;
    }
    
    modifier notFollowing(address account) {
        require(!isFollowing(account), "You're following this account");
        _;
    }

    function followingAccounts() override public view returns (Follow[] memory) {
        return followingAccounts(msg.sender);
    }
    
    function followingAccounts(address origin) override public view returns (Follow[] memory) {
        uint[] memory ids = followsByAccount[origin];
        Follow[] memory senderFollows = new Follow[](ids.length);

        for (uint i = 0; i < ids.length; i++) {
            senderFollows[i] = follows[ids[i]];
        }

        return senderFollows;
    }

    function followAccount(address account) override public notFollowing(account) {
        require(account != msg.sender, "You cannot follow yourself");

        Follow memory newFollow = Follow(followId++, msg.sender, account, block.timestamp);

        follows[newFollow.id] = newFollow;
        followsByAccount[msg.sender].push(newFollow.id);

        emit Followed(newFollow);
    }

    function unfollowAccount(address account) override public following(account) {
        uint[] memory ids = followsByAccount[msg.sender];
        uint[] memory newFollowIds = new uint[](ids.length - 1);
        uint newFollowId = 0;

        for (uint i = 0; i < ids.length; i++) {
            Follow memory follow = follows[ids[i]];
            
            if (follow.followed == account) {
                emit Unfollowed(follow);

                continue;
            }

            newFollowIds[newFollowId++] = follow.id;
        }

        followsByAccount[msg.sender] = newFollowIds;
    }

    function isFollowing(address account) override public view returns (bool) {
        uint[] memory ids = followsByAccount[msg.sender];

        for (uint i = 0; i < ids.length; i++) {
            Follow memory follow = follows[ids[i]];

            if (follow.followed == account) {
                return true;
            }
        }
        
        return false;
    }
}
