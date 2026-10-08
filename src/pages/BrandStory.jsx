import { Link } from 'react-router-dom'
import '../styles/brand-story.css'

const characters = [
  {
    id: 'popo',
    name: '포포',
    line: '가만히 있어도 존재감은 충분해.',
  },
  {
    id: 'mungchi',
    name: '뭉치',
    line: '오늘도 난 구석에 숨어있어.',
  },
  {
    id: 'jjaki',
    name: '짝이',
    line: '언제든 다시 나타날게.',
  },
  {
    id: 'bbangi',
    name: '빵이',
    line: '가끔은 늘어져도 괜찮아.',
  },
  {
    id: 'bandi',
    name: '반디',
    line: '괜찮아, 오늘도 충분했어.',
  },
  {
    id: 'giuni',
    name: '기운이',
    line: '조금만 더 버텨볼게.',
  },
]

function BrandStory() {
  const baseUrl = import.meta.env.BASE_URL

  return (
    <main className="brand-story">

      {/* HERO */}
      <section className="brand-section brand-hero">
        <div className="brand-inner brand-hero__inner">

          <div className="brand-hero__text">
            <p className="brand-section__label">
              HAJJAN BRAND STORY
            </p>

            <h1 className="brand-hero__title">
              작은 것들이
              <br />
              자꾸 눈에 밟혀.
            </h1>

            <p className="brand-hero__slogan">
              별것 아닌 하루도 충분해.
            </p>

            <p className="brand-hero__description">
              아주 사소한 순간에도
              <br />
              괜히 마음이 가는 친구들이 있어요.
              <br />
              하찮지만, 그래서 더 특별한
              <br />
              우리의 작은 친구들 이야기예요.
            </p>

            <div className="brand-hero__signature">
              SMALL THINGS,
              <br />
              BIG FRIENDS
            </div>
          </div>

          <div className="brand-hero__visual">
            <img
              src={`${baseUrl}images/brand/brand-hero.png`}
              alt="하찮의 여섯 캐릭터"
            />
          </div>

        </div>
      </section>


      {/* OUR STORY */}
      <section className="brand-section brand-story-section">
        <div className="brand-inner brand-story-section__inner">

          <div className="brand-story-section__visual">
            <img
              src={`${baseUrl}images/brand/brand-story.png`}
              alt="평범한 일상 속 하찮 캐릭터"
            />
          </div>

          <div className="brand-story-section__text">
            <p className="brand-section__label">
              OUR STORY
            </p>

            <h2 className="brand-section__title">
              평범한 하루에
              <br />
              슬쩍 끼어드는 친구들.
            </h2>

            <div className="brand-story-section__copy">
              <p>
                알람은 세 번 미뤘고,
                <br />
                점심은 대충 먹었고,
                <br />
                퇴근길엔 조금 멍했습니다.
              </p>

              <p>
                뭐, 특별한 일은 없었어요.
              </p>

              <p>
                하찮은 그런 평범한 하루에
                <br />
                슬쩍 끼어드는 작은 친구들입니다.
              </p>
            </div>
          </div>

        </div>
      </section>


      {/* CHARACTERS */}
      <section className="brand-section brand-characters">
        <div className="brand-inner">

          <div className="brand-characters__heading">
            <p className="brand-section__label">
              CHARACTERS
            </p>

            <h2 className="brand-section__title">
              이런 친구들이에요.
            </h2>

            <p className="brand-characters__intro">
              별일 없는 하루를 같이 보내는 여섯 친구들.
            </p>

            <p className="brand-characters__guide">
              캐릭터에 마우스를 올려보세요.
            </p>
          </div>

          <div className="brand-characters__scene">
            <img
              src={`${baseUrl}images/brand/characters-room.png`}
              alt="원룸에서 각자의 시간을 보내고 있는 하찮 캐릭터들"
              className="brand-characters__image"
            />

            {characters.map((character) => (
              <button
                key={character.id}
                type="button"
                className={`character-hotspot character-hotspot--${character.id}`}
                aria-label={`${character.name}: ${character.line}`}
              >
                <span className="character-hotspot__text">
                  <strong>{character.name}</strong>
                  <span>{character.line}</span>
                </span>
              </button>
            ))}
          </div>

        </div>
      </section>


      {/* FOR YOUR EVERYDAY */}
      <section className="brand-section brand-everyday">
        <div className="brand-inner brand-everyday__inner">

          <div className="brand-everyday__text">
            <p className="brand-section__label">
              FOR YOUR EVERYDAY
            </p>

            <h2 className="brand-section__title">
              별일 없어도,
              <br />
              우리는 잘 지내.
            </h2>

            <p className="brand-everyday__description">
              책상 한쪽, 가방 한켠에 두고
              <br />
              가끔 바라보다 보면
              <br />
              오늘도 별일 없이 잘 지나갑니다.
            </p>

            <Link
              to="/shop"
              className="brand-everyday__button"
            >
              굿즈 보러가기
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="brand-everyday__visual">
            <img
              src={`${baseUrl}images/brand/brand-everyday.png`}
              alt="일상 속 하찮 캐릭터 굿즈"
            />
          </div>

        </div>
      </section>

    </main>
  )
}

export default BrandStory