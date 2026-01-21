function Gallery({ items, onSelect }) {
 return (
   <div style={{ marginTop: "30px" }}>
     <h3>Previous Uploads</h3>


     {items.length === 0 && <p>No uploads yet</p>}


     <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
       {items.map((item, index) => (
         <div
           key={index}
           onClick={() => onSelect(item)}
           style={{
             width: "120px",
             cursor: "pointer",
             border: "1px solid #ccc",
             padding: "5px"
           }}
         >
           <img
             src={item.before}
             alt="thumb"
             style={{ width: "100%" }}
           />
           <small>{item.name}</small>
         </div>
       ))}
     </div>
   </div>
 );
}


export default Gallery;
