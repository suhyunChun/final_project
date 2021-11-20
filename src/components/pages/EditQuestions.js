import React,{useState} from "react";
import Nav from './Nav'
import { v4 as uuidv4 } from 'uuid';

function EditQuestions(props) {
    const [questionList, setQuestionList] = useState([...props.questions])

    const onChangeInput = (event) => {
        let newQuestionList = [...questionList]
        const selectedId = event.target.id
        console.log(event.target)
        for (let i = 0; i < newQuestionList.length; i++){
            if(newQuestionList[i]._id === selectedId){
                if(event.target.className === 'edit-text'){
                    newQuestionList[i].text = event.target.value
                }else if(event.target.className == 'edit-type'){
                    newQuestionList[i].type = event.target.value
                }else{
                    const name = event.target.className
                    newQuestionList[i].multiple = {...newQuestionList[i].multiple,[name] : event.target.value}
                    console.log(newQuestionList[i])
                }
            }
        }
        console.log(newQuestionList)
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
                            <br/>
                            <label htmlFor = 'edit-type'/>
                            <select className = 'edit-type' id = {item._id} name = 'edit-type' value = {item.type} onChange={onChangeInput}>
                                <option value = 'number'>number</option>
                                <option value = 'boolean'>boolean</option>
                                <option value = 'text'>text</option>
                                <option value = 'radio'>multiple choice</option>
                            </select>
                            <button onClick = {handleDeletion}>
                                <span id = {item._id} className="material-icons" >delete_outline</span>
                            </button>
                            {item.type === 'radio'?
                                <div>
                                <input name = 'mult-opt' type = 'radio' id ='first-opt' value = 'first' disabled/>
                                    <input id = {item._id} value = {item.multiple? item.multiple.first : ''} className = 'first' onChange={onChangeInput}/>
                                    <br/>
                                <input name = 'mult-opt' type = 'radio' id = 'second-opt' value = 'second' disabled/>
                                    <input id = {item._id} value = {item.multiple? item.multiple.second : ''} className = 'second' onChange={onChangeInput}/>
                                    <br/>
                                <input name = 'mult-opt' type = 'radio' id = 'third-opt' value = 'third' disabled/>
                                    <input id = {item._id} value = {item.multiple? item.multiple.third : ''}className = 'third' onChange={onChangeInput}/>
                                </div>
                            : ''}
                        </div>
                        ))}
                    <button onClick={handleSubmit}> Save </button>
                </div>
        </React.Fragment>
    );
}
export default EditQuestions
