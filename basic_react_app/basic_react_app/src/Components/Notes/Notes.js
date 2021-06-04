import React , {useState} from "react"
import "./Notes.css"

const Notes = () => {
    const [text, setText] = useState("");

    const storeText = (event) => {
        setText(event.target.value);
    }

    const clearText = () => {
        setText("");
    }

    return(
        <div className="midblock">
            <h3>My Notes</h3>
            <br/>
            <textarea placeholder="Take Notes" onChange={storeText} value={text}/> 
            <span> 
                <button className="notebutton">Save</button>
                <button className="notebutton" onClick={clearText}>Clear</button>
            </span>
        </div>
    );
}

export default Notes;   
