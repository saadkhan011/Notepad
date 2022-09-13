import React, { useEffect, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import Note from "./Note";
import { useSelector, useDispatch} from "react-redux"
import { setuserId, setflag } from "../state/action/index";
function CreateArea() {
    const dispatch = useDispatch();
    const number = useSelector(state => state.userid);
    const flag = useSelector(state => state.flag);
    const [state, setstate] = useState({
        title: "",
        post: ""
    });
    const [note, addNote] = useState([]);
    
    useEffect(() => {
        fetchData()
    })
    function clearvalue() {
        setstate({
            title: "",
            post: ""
        })
    }
    function setNote(event) {
        const value = event.target.value;
        const name = event.target.name;
        setstate((prevValue) => {
            return {
                ...prevValue,
                [name]: value
            };
        });
    }
    async function addingNote(event) {
        event.preventDefault();
        const { title, post } = state;
        fetch('https://nootepad.herokuapp.com/notes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                { title, post }
            )
        })
            .then(response => response.json());
        clearvalue()
    }
    async function fetchData() {
        const res = await fetch("https://nootepad.herokuapp.com/notes");
        const data = await res.json()
        if (res.status === 200) {
            addNote(data);
            // console.log(data)
        }
    }
    async function deletePost(id) {
        const res = await fetch(`https://nootepad.herokuapp.com/notes/${id}`, { method: 'DELETE' })
        const data = await res.json()
        console.log(data)
    }
    function fillnotes(index, id) {
        dispatch(setflag(false))
        setstate({
            title: note[index].title,
            post: note[index].post
        })
        dispatch(setuserId(id))
    }
    async function updatePost(event) {
        const { title, post } = state;
        event.preventDefault()
        dispatch(setflag(true))
        fetch(`https://nootepad.herokuapp.com/notes/${number}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: title, post: post })
        }).then(response => response.json());
        clearvalue();

    }
    return (
        <div>
            <form method="post">
                <input
                    onChange={setNote}
                    value={state.title}
                    name="title"
                    placeholder="Title"
                />
                <textarea
                    onChange={setNote}
                    value={state.post}
                    name="post"
                    placeholder="Take a note..."
                    rows="3"
                />
                {flag === true ? <button onClick={addingNote}><AddIcon /></button> : <button onClick={updatePost}><AddIcon /></button>}
            </form>
            {note.map((element, index) => {
                return (
                    <Note
                        key={index}
                        index={index}
                        id={element._id}
                        fillnotes={fillnotes}
                        deletePost={deletePost}
                        title={element.title}
                        content={element.post}
                    />
                );
            })}
        </div>
    );
}

export default CreateArea;
