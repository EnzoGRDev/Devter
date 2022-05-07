import { colors } from "../../styles/theme"

export default function Button({ children, onClick, disabled }) {
  return (
    <>
      <button onClick={onClick} disabled={disabled}>
        {children}
      </button>
      <style jsx>{`
        button {
          align-items: center;
          background: ${colors.black};
          border-radius: 9999px;
          border: 0;
          color: #fff;
          cursor: pointer;
          display: flex;
          font-size: 16px;
          font-weight: 800;
          padding: 8px 24px;
          transition: opacity 0.3s ease;
        }
        button > :global(svg) {
          margin-right: 8px;
          user-select: none;
          pointer-events: none;
        }

        button[disabled] {
          opacity: 0.3;
        }

        button:hover {
          opacity: 0.7;
        }
      `}</style>
    </>
  )
}
