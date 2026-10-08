import { useRef } from "react";
import { friends } from "../../data/mypage";

function FriendsSection() {
  const friendsListRef = useRef(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  const isMobile = () => window.innerWidth <= 767;

  const handleMouseDown = (e) => {
    if (!isMobile()) return;

    const list = friendsListRef.current;
    if (!list) return;

    isDraggingRef.current = true;
    startXRef.current = e.pageX;
    scrollLeftRef.current = list.scrollLeft;

    list.classList.add("is-dragging");
  };

  const handleMouseMove = (e) => {
    if (!isMobile() || !isDraggingRef.current) return;

    const list = friendsListRef.current;
    if (!list) return;

    e.preventDefault();

    const moveX = e.pageX - startXRef.current;
    list.scrollLeft = scrollLeftRef.current - moveX;
  };

  const stopDragging = () => {
    const list = friendsListRef.current;

    isDraggingRef.current = false;

    if (list) {
      list.classList.remove("is-dragging");
    }
  };

  return (
    <section className="mypage-section">
      <div className="mypage-section__header">
        <h2>나의 친구</h2>
      </div>

      <div
        ref={friendsListRef}
        className="friends-list"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={stopDragging}
        onMouseLeave={stopDragging}
      >
        {friends.map((friend) => (
          <article key={friend.id} className="friend-item">
            <img
              src={friend.image}
              alt={friend.name}
              draggable="false"
            />
            <strong>{friend.name}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}

export default FriendsSection;