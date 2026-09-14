interface ButtonProps {
  direction: "left" | "right";
  onClick: () => void;
}

export default function Button({ direction, onClick }: ButtonProps) {
  return (
    <button className="sideButton" onClick={onClick}>
      {direction === "left" ? "←" : "→"}
    </button>
  );
}