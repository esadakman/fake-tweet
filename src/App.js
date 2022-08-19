import { useState, createRef, useEffect } from "react";
import { useScreenshot } from "use-react-screenshot";
import "./App.scss";
import {
  LikeIcon,
  ReplyIcon,
  RetweetIcon,
  ShareIcon,
  VerifiedIcon,
} from "./icons";
import { language } from "./language";
import { AvatarLoader } from "./loader";

function convertImgToBase64(url, callback, outputFormat) {
  var canvas = document.createElement("CANVAS");
  var ctx = canvas.getContext("2d");
  var img = new Image();
  img.crossOrigin = "Anonymous";
  img.onload = function () {
    canvas.height = img.height;
    canvas.width = img.width;
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL(outputFormat || "image/png");
    callback.call(this, dataURL);
    // Clean up
    canvas = null;
  };
  img.src = url;
}

const tweetFormat = (tweet) => {
  tweet = tweet
    .replace(/@([\w]+)/g, "<span>@$1</span>")
    .replace(/#([\wşçöğüıİ]+)/gi, "<span>#$1</span>")
    .replace(/(https?:\/\/[\w./]+)/, "<span>$1</span>");
  return tweet;
};

const formatNumber = (number) => {
  if (number < 1000) {
    return number;
  }
  number /= 1000;
  number = String(number).split(".");
  return (
    number[0] + (number[1] > 100 ? "," + number[1].slice(0, 1) + " B" : " B")
  );
};

function App() {
  const tweetRef = createRef(null);
  const downloadRef = createRef();
  const [name, setName] = useState("");
  const [userName, setUserName] = useState();
  const [isVerified, setIsVerified] = useState(0);
  const [tweet, setTweet] = useState();
  const [avatar, setAvatar] = useState();
  const [retweets, setRetweets] = useState(0);
  const [quoteTweets, setQuoteTweets] = useState(0);
  const [likes, setLikes] = useState(0);
  const [lang, setLang] = useState("tr");
  const [image, takeScreenshot] = useScreenshot();
  const [langText, setLangText] = useState();
  const getImage = () => takeScreenshot(tweetRef.current);

  useEffect(() => {
    setLangText(language[lang]);
  }, [lang]);

  useEffect(() => {
    if (image) {
      downloadRef.current.click();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image]);

  const avatarHandle = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.addEventListener("load", function () {
      setAvatar(this.result);
    });
    reader.readAsDataURL(file);
  };
  // console.log(langText?.verifiedConfirm[1]);
  const fetchTwitterInfo = () => {
    fetch(
      `https://typeahead-js-twitter-api-proxy.herokuapp.com/demo/search?q=${userName}`
    )
      .then((res) => res.json())
      .then((data) => {
        const twitter = data[0];
        console.log(twitter.verified === true);

        convertImgToBase64(
          twitter.profile_image_url_https,
          function (base64Image) {
            setAvatar(base64Image);
          }
        );
        setName(twitter.name);
        setUserName(twitter.screen_name);
        setTweet(twitter.status.text);
        setRetweets(twitter.status.retweet_count);
        setLikes(twitter.status.favorite_count);

        twitter.verified === true ? setIsVerified(1) : setIsVerified(0);
      });
  };
  // console.log(name);
  return (
    <>
      <div className="tweet-settings">
        <h3>{langText?.settings}</h3>
        <ul>
          <li>
            <label>{langText?.name}</label>
            <input
              className="input"
              type="text"
              // placeholder="Name Surname"
              value={name || ""}
              onChange={(e) => setName(e.target.value)}
            />
          </li>
          <li>
            <label>{userName || langText?.username}</label>
            <input
              className="input"
              type="text"
              // placeholder="Username"
              value={userName || ""}
              onChange={(e) => setUserName(e.target.value)}
            />
          </li>
          <li>
            <label>Tweet</label>
            <textarea
              className="textarea"
              type="text"
              maxLength="290"
              // placeholder="Tweet"
              value={tweet || ""}
              onChange={(e) => setTweet(e.target.value)}
            />
          </li>
          <li>
            <label>Avatar</label>
            <input className="input" type="file" onChange={avatarHandle} />
          </li>
          <li>
            <label>Retweet</label>
            <input
              className="input"
              type="number"
              // placeholder="Retweet"
              value={retweets || ""}
              onChange={(e) => setRetweets(e.target.value)}
            />
          </li>
          <li>
            <label>{langText?.quote}</label>
            <input
              className="input"
              type="number"
              // placeholder="Quote Tweets"
              value={quoteTweets || ""}
              onChange={(e) => setQuoteTweets(e.target.value)}
            />
          </li>
          <li>
            <label>{langText?.like}</label>
            <input
              className="input"
              type="number"
              // placeholder="Like"
              value={likes || ""}
              onChange={(e) => setLikes(e.target.value)}
            />
          </li>
          <li>
            <label>{langText?.isVerified}</label>
            <select
              onChange={(e) => setIsVerified(e.target.value)}
              defaultValue={isVerified}
            >
              <option value="1">{langText?.verifiedConfirm[0]}</option>
              <option value="0">{langText?.verifiedConfirm[1]}</option>
            </select>
          </li>
          <button onClick={getImage}>Oluştur</button>
          <div className="download-url">
            {image && (
              <a ref={downloadRef} href={image} download="tweet.png">
                Tweeti İndir
              </a>
            )}
          </div>
        </ul>
      </div>
      <div className="tweet-container">
        <div className="app-language">
          <span
            onClick={() => setLang("tr")}
            className={(lang === "tr" && "active") || ""}
          >
            Türkçe
          </span>
          <span
            onClick={() => setLang("en")}
            className={(lang === "en" && "active") || ""}
          >
            English
          </span>
        </div>
        <div className="fetch-info">
          <input
            className="search"
            type="text"
            value={userName || ""}
            placeholder={langText?.userSearch}
            onChange={(e) => setUserName(e.target.value)}
            // style={{}}
          />
          <button onClick={fetchTwitterInfo}>{langText?.button}</button>
        </div>

        <div className="tweet" ref={tweetRef}>
          <div className="tweet-author">
            {(avatar && <img src={avatar} alt="avatar" />) || <AvatarLoader />}
            <div>
              <div className="name">
                <span>{name || langText?.name || "Ad Soyad"}</span>

                {isVerified == 1 && <VerifiedIcon width="19" height="19" />}
              </div>
              <div className="username">
                @{userName || langText?.username || "username"}
              </div>
            </div>
          </div>
          <div className="tweet-content">
            <p
              dangerouslySetInnerHTML={{
                __html: (tweet && tweetFormat(tweet)) || "example tweet here",
              }}
            ></p>
          </div>
          <div className="tweet-stats">
            <span>
              <b>{formatNumber(retweets)}</b> {langText?.retweet}
            </span>
            <span>
              <b>{formatNumber(quoteTweets)}</b>
              {langText?.quote}
            </span>
            <span>
              <b>{formatNumber(likes)}</b> {langText?.like}
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
