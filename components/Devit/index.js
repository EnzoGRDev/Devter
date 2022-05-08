import useTimeAgo from "../../hooks/useTimeAgo"
import Avatar from "../Avatar"

export default function Devit({
  content,
  userName,
  userId,
  avatar,
  createdAt,
  key,
  id,
  img,
}) {
  const timeago = useTimeAgo(createdAt)

  return (
    <>
      <article key={id}>
        <div>
          <Avatar src={avatar} alt={userName} />
        </div>
        <section>
          <header>
            <strong>{userName}</strong>
            <span>.</span>
            <date>{timeago}</date>
          </header>
          <p>{content}</p>
          {img && <img src={img} />}
        </section>
      </article>
      <style jsx>{`
        article {
          border-bottom: 2px solid #eaf7ff;
          display: flex;
          padding: 10px 15px;
        }
        img {
          border-radius: 10px;
          height: auto;
          margin-top: 10px;
          width: 100%;
        }
        div {
          padding-right: 10px;
        }
        p {
          line-height: 1.3125;
          margin: 0;
        }
        span {
          margin: 0px 5px;
        }
        date {
          color: #555;
          font-size: 14px;
        }
      `}</style>
    </>
  )
}
