function CompareView({ before, after }) {
 return (
   <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
     <div style={{ flex: 1 }}>
       <h4>Before</h4>
       {before ? (
         <img
           src={before}
           alt="before"
           style={{ width: "100%", border: "1px solid #ccc" }}
         />
       ) : (
         <p>No file selected</p>
       )}
     </div>


     <div style={{ flex: 1 }}>
       <h4>After</h4>
       {after ? (
         <img
           src={after}
           alt="after"
           style={{ width: "100%", border: "1px solid #ccc" }}
         />
       ) : (
         <p>Processed result will appear here</p>
       )}
     </div>
   </div>
 );
}


export default CompareView;