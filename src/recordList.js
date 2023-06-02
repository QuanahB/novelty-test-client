import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {motion} from 'framer-motion';
 
const Record = (props) => (
 <tr>
   <td className="listText">{props.record.activity}</td>
   <td className="listText spaceList">{props.record.type}</td>
   <td className="listText centerList">{props.record.participants}</td>
   <td>
     <button className="buttonTest"
       onClick={() => {
         props.deleteRecord(props.record._id);
       }}
     >
       Delete
     </button>
   </td>
 </tr>
);
 
export default function RecordList() {
 const [records, setRecords] = useState([]);
 
 // This method fetches the records from the database.
 useEffect(() => {
   async function getRecords() {
     const response = await fetch(`https://quickstart-image-zxyxla676a-uc.a.run.app/record/`);
 
     if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const records = await response.json();
     setRecords(records);
   }
 
   getRecords();
 
   return;
 }, [records.length]);
 
 // This method will delete a record
 async function deleteRecord(id) {
   await fetch(`https://quickstart-image-zxyxla676a-uc.a.run.app/${id}`, {
     method: "DELETE"
   });
 
   const newRecords = records.filter((el) => el._id !== id);
   setRecords(newRecords);
 }
 
 // This method will map out the records on the table
 function recordList() {
   return records.map((record) => {
     return (
       <Record
         record={record}
         deleteRecord={() => deleteRecord(record._id)}
         key={record._id}
       />
     );
   });
 }
 
 // This following section will display the table with the records of individuals.
 return (
   <motion.div>
     <h3 className="heading">Record List</h3>
     <table className="table table-striped" style={{ marginTop: 20 }}>
       <thead>
         <tr>
           <th className="heading">Activity</th>
           <th className="heading">Type</th>
           <th className="heading">Participants</th>
           <th className="heading">Action</th>
         </tr>
       </thead>
       <tbody>{recordList()}</tbody>
     </table>
   </motion.div>
 );
}