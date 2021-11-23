import React,{useState} from "react";

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
                }else if(event.target.className === 'edit-type'){
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
                    <div className = 'edit-title'>
                        <h2> Edit Questions</h2>
                        <span className="material-icons" onClick={handleAddition}>add_circle_outline</span>
                    </div>
                    {questionList.map(item => (
                        <div className='edit-question' id = {item._id} key={item._id}>
                            <label htmlFor = 'edit-text'/>
                            <input className = 'edit-text' id = {item._id} value ={item.text} onChange={onChangeInput}/>

                            <div className = 'edit-type'>

                                <select className = 'edit-type' id = {item._id} name = 'edit-type' value = {item.type} onChange={onChangeInput}>
                                    <option value = 'number'>number</option>
                                    <option value = 'boolean'>boolean</option>
                                    <option value = 'text'>text</option>
                                    <option value = 'radio'>multiple choice</option>
                                </select>
                                <span id = {item._id} className="material-icons" onClick = {handleDeletion} >delete_outline</span>
                            </div>
                            {item.type === 'radio'?
                                <div className ='mult-opt'>
                                    <div className = 'opt'>
                                        <input name = 'mult-opt' type = 'radio' id ='first-opt' value = 'first' disabled/>
                                        <input id = {item._id} value = {item.multiple? item.multiple.first : ''} className = 'first' onChange={onChangeInput}/>
                                    </div>
                                    <div className = 'opt'>
                                        <input name = 'mult-opt' type = 'radio' id = 'second-opt' value = 'second' disabled/>
                                        <input id = {item._id} value = {item.multiple? item.multiple.second : ''} className = 'second' onChange={onChangeInput}/>
                                    </div>
                                    <div className = 'opt'>
                                        <input name = 'mult-opt' type = 'radio' id = 'third-opt' value = 'third' disabled/>
                                        <input id = {item._id} value = {item.multiple? item.multiple.third : ''}className = 'third' onChange={onChangeInput}/>
                                    </div>
                                </div>
                            : ''}
                        </div>
                        ))}
                    <div className='save-div'>
                        <button onClick={handleSubmit} className='save'> Save </button>
                    </div>
                </div>
        </React.Fragment>
    );
}
export default EditQuestions
