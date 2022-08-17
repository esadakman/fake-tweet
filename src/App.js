import "./App.scss";

function App() {
  return (
    <div className="tweet">
      <div className="tweet-author">
        <img
          src="https://pbs.twimg.com/profile_images/1558519296938188808/KEV4_vlm_bigger.jpg"
          alt="pp"
        />
        <div>
          <div className="name">esadakman</div>
          <div className="username">@esadakman</div>
        </div>
      </div>
      <div className="tweet-content">
        <p>fake tweet generator first tweet </p>
      </div>
      <div className="tweet-stats">
        <span>
          <b>24</b> Retweet
        </span>
        <span>
          <b>24</b> Alıntı Tweetler
        </span>
        <span>
          <b>24</b> Beğeni
        </span>
      </div>
      <div className="tweet-actions">
        <span>icon</span>
        <span>icon</span>
        <span>icon</span>
        <span>icon</span>
        <span>icon</span>
      </div>
    </div>
  );
}

export default App;
