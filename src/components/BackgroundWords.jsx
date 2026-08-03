const words = [
  { text: "HAPPY BIRTHDAY", top: "8%", left: "8%", rotate: -18, size: "22px" },
  { text: "LOVE", top: "18%", left: "72%", rotate: 20, size: "18px" },
  { text: "🎂", top: "30%", left: "15%", rotate: 0, size: "28px" },
  { text: "MEMORIES", top: "42%", left: "78%", rotate: -28, size: "20px" },
  { text: "✨", top: "55%", left: "12%", rotate: 15, size: "24px" },
  { text: "SMILE", top: "68%", left: "60%", rotate: -15, size: "18px" },
  { text: "TOGETHER", top: "82%", left: "20%", rotate: 25, size: "22px" },
  { text: "🎁", top: "12%", left: "45%", rotate: 0, size: "24px" },
  { text: "JOY", top: "28%", left: "55%", rotate: -20, size: "18px" },
  { text: "SPECIAL", top: "74%", left: "82%", rotate: 18, size: "18px" },
  { text: "💜", top: "50%", left: "88%", rotate: 0, size: "22px" },
  { text: "CELEBRATE", top: "88%", left: "48%", rotate: -12, size: "20px" },
  { text: "WISH THEM HBD", top: "6%", left: "60%", rotate: 18, size: "18px" },
  { text: "SURPRISE", top: "36%", left: "35%", rotate: -15, size: "18px" },
  { text: "FOREVER", top: "60%", left: "40%", rotate: 20, size: "18px" },
  { text: "🎉", top: "86%", left: "72%", rotate: 0, size: "24px" },
];

function BackgroundWords() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {words.map((item, index) => (
        <span
          key={index}
          className="absolute font-extrabold text-white/5 select-none"
          style={{
            top: item.top,
            left: item.left,
            transform: `rotate(${item.rotate}deg)`,
            fontSize: item.size,
          }}
        >
          {item.text}
        </span>
      ))}
    </div>
  );
}

export default BackgroundWords;