import { useState } from "react";
import "./App.scss";
import {
  LikeIcon,
  ReplyIcon,
  RetweetIcon,
  ShareIcon,
  VerifiedIcon,
} from "./icons";

// const tweetFormat = tweet => {
//   tweet = tweet.replace(/@([\w]+), 'a' );
//   return tweet;
// }

function App() {
  const [name, setName] = useState();
  const [userName, setUserName] = useState();
  const [isVerified, setIsVerified] = useState(false);
  const [tweet, setTweet] = useState();
  const [avatar, setAvatar] = useState();
  const [retweets, setRetweets] = useState(0);
  const [quoteTweets, setQuoteTweets] = useState(0);
  const [likes, setLikes] = useState(0);

  return (
    <>
      <div className="tweet-settings">
        <h3>Tweet Ayarları</h3>
        <ul>
          <li>
            <input
              className="input"
              type="text"
              placeholder="Name Surname"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </li>
          <li>
            <input
              className="input"
              type="text"
              placeholder="Username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </li>
          <li>
            <textarea
              className="textarea"
              type="text"
              maxLength="290"
              placeholder="Tweet"
              value={tweet}
              onChange={(e) => setTweet(e.target.value)}
            />
          </li>
        </ul>
      </div>
      <div className="tweet-container">
        <div className="tweet">
          <div className="tweet-author">
            <img
              src="https://pbs.twimg.com/profile_images/1558519296938188808/KEV4_vlm_bigger.jpg"
              alt="pp"
            />
            <div>
              <div className="name">
                {name || "name"}
                {isVerified && <VerifiedIcon width="19" height="19" />}
              </div>
              <div className="username">@{userName || "username"}</div>
            </div>
          </div>
          <div className="tweet-content">
            <p>{tweet || "example tweet here"}</p>
          </div>
          <div className="tweet-stats">
            <span>
              <b>{retweets}</b> Retweet
            </span>
            <span>
              <b>{quoteTweets}</b> Alıntı Tweetler
            </span>
            <span>
              <b>{likes}</b> Beğeni
            </span>
          </div>
          <div className="tweet-actions">
            <span>
              <ReplyIcon />
            </span>
            <span>
              <RetweetIcon />
            </span>
            <span>
              <LikeIcon />
            </span>
            <span>
              <ShareIcon />
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
