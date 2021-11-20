import React,{useState} from "react";
import Nav from './Nav'
import { v4 as uuidv4 } from 'uuid';

function EditQuestions(props) {
    const [questionList, setQuestionList] = useState([...props.questions])

    const onChangeInput = (event) => {
        let newQuestionList = [...questionList]
        const selectedId = event.target.id
        for (let i = 0; i < newQuestionList.length; i++){
            if(newQuestionList[i]._id === selectedId){
                if(event.target.className === 'edit-text'){
                    newQuestionList[i].text = event.target.value
                }else{
                    newQuestionList[i].type = event.target.value
                }
            }
        }
        setQuestionList(newQuestionList)
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
        props.setQuestions(questionList)
    }
    const handleAddition=()=>{
        let updatedQ = [...questionList]
        updatedQ = updatedQ.concat({_id: uuidv4(), text:'', type:'number'})
        setQuestionList(updatedQ)
    }
    const handleDeletion=(e)=>{
        let updatedQ = [...questionList]
        updatedQ = updatedQ.filter((item)=> item._id !== e.target.id)
        setQuestionList(updatedQ)
    }
    return(
        <React.Fragment>
                <div id="edit">
                    <h2> Edit Questions</h2>
                    <span className="material-icons" onClick={handleAddition}>add_circle_outline</span>
                    {questionList.map(item => (
                        <div className='edit-question' id = {item._id} key={item._id}>
                            <label htmlFor = 'edit-text'/>
                            <input className = 'edit-text' id = {item._id} value ={item.text} onChange={onChangeInput}/>
                            <label htmlFor = 'edit-type'/>
                            <select className = 'edit-type' id = {item._id} name = 'edit-type' value = {item.type} onChange={onChangeInput}>
                                <option value = 'number'>number</option>
                                <option value = 'boolean'>boolean</option>
                                <option value = 'text'>text</option>
                                <option value = 'multiple'>multiple choice</option>
                            </select>
                            <button onClick = {handleDeletion}>
                                <span id = {item._id} className="material-icons" >delete_outline</span>
                            </button>
                        </div>
                        ))}
                    <button onClick={handleSubmit}> Save </button>
                </div>
        </React.Fragment>
    );
}
export default EditQuestions