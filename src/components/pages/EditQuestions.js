import React, {useEffect, useState} from "react";
import { v4 as uuidv4 } from 'uuid';
import {createFormAPIMethod, deleteFormByIdAPIMethod, getFormAPIMethod, updateFormAPIMethod} from "../../API/formApi";

function EditQuestions(props) {
    const [questionList, setQuestionList] = useState([...props.questions])
    const [added, setAdded] = useState([])
    const [deleted, setDeleted] = useState([])
    const [edited, setEdited] = useState([])

    const onChangeInput = (event) => {
        let updatedQ = [...questionList]
        let tmp={}
        const selectedId = event.target.id
        for (let i = 0; i < updatedQ.length; i++){
            if(updatedQ[i]._id === selectedId){
                tmp = {...updatedQ[i]}
                if(event.target === null || event.target === undefined){
                    continue;
                }else if(event.target.className === 'edit-text'){
                    tmp.text = event.target.value
                }else if(event.target.className === 'edit-type'){
                    if(event.target.value === 'radio'){
                        tmp.multiple={first:'', second:'', third:''}
                    }
                    tmp.type = event.target.value
                }else{
                    const name = event.target.className
                    tmp.multiple= {...tmp.multiple,[name] : event.target.value}
                }
                updatedQ[i] = tmp
            }
        }
        if(!edited.includes(selectedId)){
            setEdited(edited.concat([selectedId]))
        }
        setQuestionList(updatedQ)
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
        /*
        post -> updated only changed one (using id)
         */
        for(let i = 0; i < added.length;i++){
            createFormAPIMethod(questionList.filter((item)=>item._id === added[i]))
                .then((res)=> console.dir(res))
                .catch((err)=> console.log(err))
        }
        for(let i = 0; i <deleted.length;i++){
            deleteFormByIdAPIMethod(deleted[i])
                .then((res)=>console.dir(res))
                .catch((err)=>console.dir(err))
        }
        for(let i = 0; i < edited.length;i++){
            console.log(questionList.filter((item)=>item._id === edited[i]),edited)
            updateFormAPIMethod(questionList.filter((item)=>item._id === edited[i]))
                .then((res)=>console.dir(res))
                .catch((err)=>console.dir(err))
                //edit api funciton with id
        }
        setDeleted([])
        setAdded([])
        setEdited([])
        props.setQuestions(questionList)
    }
    const handleAddition=()=>{
        let updatedQ = [...questionList]
        const newId = uuidv4();
        updatedQ = updatedQ.concat({_id: newId, text:'', type:'number',answer:[]})
        setAdded(added.concat([newId]))
        setQuestionList(updatedQ)

    }
    const handleDeletion=(e)=>{
        let updatedQ = [...questionList]
        updatedQ = updatedQ.filter((item)=> item._id !== e.target.id)
        setDeleted(deleted.concat([e.target.id]))
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

