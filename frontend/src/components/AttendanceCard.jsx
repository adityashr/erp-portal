function Attendance(){

 const attendance = {
   overall:82,
   total:120,
   present:98,
   absent:22
 }


return(
<div>

<h1>Attendance Dashboard</h1>


<div className="cards">

<AttendanceCard
title="Overall"
value="82%"
/>

<AttendanceCard
title="Present"
value="98"
/>

<AttendanceCard
title="Absent"
value="22"
/>


</div>


<SubjectTable/>


<AttendanceChart/>


</div>
)

}

export default Attendance;