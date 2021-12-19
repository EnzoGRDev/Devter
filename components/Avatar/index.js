import styles from "./styles.module.css"

export default function Avatar({ src, username }) {
  return (
    <div className={styles.container}>
      <img
        src={src}
        alt={`foto de ${username}`}
        title={username}
        className={styles.avatar}
      />
      {username && <strong>{username}</strong>}
    </div>
  )
}
