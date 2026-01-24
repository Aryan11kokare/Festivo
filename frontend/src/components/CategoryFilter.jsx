const categoryColors = {
  All: "bg-gray-600 hover:bg-gray-700",
  Technology: "bg-blue-600 hover:bg-blue-700",
  Music: "bg-pink-600 hover:bg-pink-700",
  Business: "bg-emerald-600 hover:bg-emerald-700",
  Art: "bg-orange-600 hover:bg-orange-700",
  Food: "bg-red-600 hover:bg-red-700",
  Sports: "bg-cyan-600 hover:bg-cyan-700",
};

export default function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}) {
  return (
    <div className="flex flex-wrap gap-3">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`px-6 py-2 rounded-lg font-semibold text-white transition-all ${
            selectedCategory === category
              ? " bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg scale-105"
              : "bg-gray-300 hover:bg-gray-400"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
