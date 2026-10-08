import { friends } from "../../data/mypage";

function FriendsTab() {
  return (
    <section className="mypage-tab-content">
      <h1>나의 친구</h1>

      <div className="friends-tab-list">
        {friends.map((friend) => (
          <article key={friend.id} className="friends-tab-card">
            <img src={friend.image} alt={friend.name} />

            <div>
              <h3>{friend.name}</h3>
              <p>나와 함께하는 하찮은 친구</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default FriendsTab;