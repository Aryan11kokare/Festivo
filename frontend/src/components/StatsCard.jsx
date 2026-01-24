export default function StatsCard({
  title,
  value,
  icon: Icon,
  colorClass,
  bgColorClass,
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
        </div>
        <div className={`bg-gray-100 text-black p-4 rounded-lg`}>
          <Icon className="w-8 h-8" />
        </div>
      </div>
    </div>
  );
}
