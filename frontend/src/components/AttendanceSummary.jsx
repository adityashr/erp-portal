function AttendanceSummary({ data }) {
  const present = data.subjects.reduce((a, b) => a + b.present, 0),
    absent = data.subjects.reduce((a, b) => a + b.absent, 0);
  const cards = [
    ["Overall attendance", `${data.overall}%`],
    ["Classes present", present],
    ["Classes absent", absent],
    ["Current semester", data.semester],
  ];
  return (
    <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map(([label, value], i) => (
        <div
          key={label}
          className={`rounded-xl border p-5 shadow-sm ${i === 0 ? "border-[#136b5d] bg-[#136b5d] text-white" : "border-[#dce8e4] bg-white text-[#183e37]"}`}
        >
          <p
            className={`text-sm ${i === 0 ? "text-emerald-50/80" : "text-[#70837e]"}`}
          >
            {label}
          </p>
          <p className="mt-2 text-3xl font-bold">{value}</p>
        </div>
      ))}
    </div>
  );
}
export default AttendanceSummary;
