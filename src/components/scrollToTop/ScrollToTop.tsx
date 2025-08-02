import { FaArrowUp } from "react-icons/fa6";

export default function ScrollToTop() {
  return (
    <button
      className={`fixed bottom-6 right-6 bg-[var(--primary)] text-[var(--primary-text)] p-3 rounded-full shadow-sm shadow-gray-500 cursor-pointer`}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <FaArrowUp />
    </button>
  );
}
