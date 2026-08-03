function Hero({ setScreen }) {
  return (
    <section className="min-h-screen flex items-center justify-center bg-[#0B0B0F]">
      <div className="text-center px-6">
        <h1 className="text-6xl md:text-8xl font-extrabold text-white">
          Welcome to{" "}
          <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent">
            WishCraft
          </span>
        </h1>

        <p className="mt-6 text-xl text-gray-400 max-w-2xl mx-auto">
          Create unforgettable birthday experiences filled with memories,
          music, surprises and love.
        </p>

        <button
  onClick={setScreen}
  className="mt-10 px-8 py-4 rounded-xl bg-purple-600 hover:bg-purple-700 transition-all duration-300 text-white font-semibold text-lg shadow-lg shadow-purple-600/30"
>
  Create Surprise ✨
</button>
      </div>
    </section>
  );
}

export default Hero;