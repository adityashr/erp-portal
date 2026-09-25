import { FiChevronRight } from "react-icons/fi";
function DashboardCard({ title, items = [] }) {
  return (
    <section className="overflow-hidden rounded-xl border border-[#dce8e4] bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-[#e4ece9] px-5 py-3">
        <h3 className="font-bold text-[#234941]">{title}</h3>
        <span className="text-xs font-medium text-[#bd8128]">View all</span>
      </div>
      <div className="p-2">
        {items.length ? (
          items.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-[#5a706a] hover:bg-[#f4f8f6]"
            >
              <FiChevronRight className="shrink-0 text-[#c58c32]" />
              {item}
            </div>
          ))
        ) : (
          <p className="p-3 text-sm text-[#879792]">No data available.</p>
        )}
      </div>
    </section>
  );
}
export default DashboardCard;
