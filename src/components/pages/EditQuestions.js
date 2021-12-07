import React, { useState} from "react";
import { v4 as uuidv4 } from 'uuid';
import {createFormAPIMethod, deleteFormByIdAPIMethod, updateFormAPIMethod} from "../../API/formApi";

function EditQuestions(props) {
    const [questionList, setQuestionList] = useState([...props.questions])
    const [added, setAdded] = useState([])
    const [deleted, setDeleted] = useState([])
    const [edited, setEdited] = useState([])

    const onChangeInput = (event) => {
        let updatedQ = [...questionList]
        let tmp={}
        const selectedId = event.target.name
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
        if(!edited.includes(selectedId) && !added.includes(selectedId)){
            setEdited(edited.concat([selectedId]))
        }
        setQuestionList(updatedQ)
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
        let chk = true;
        let chkQ = true;
        for(let i = 0; i < questionList.length;i++){
            let chkArray = questionList.filter((item)=> item.text === questionList[i].text)
            if(questionList[i].text === '' || chkArray.length !==1){
                chk = false
            }
            if( chkArray.length !==1){
                chkQ = false
            }
        }
        if(chk && chkQ) {
            for (let i = 0; i < added.length; i++) {
                let tmp = questionList.filter((item) => item._id === added[i])[0]
                createFormAPIMethod(tmp)
                    .then((res) =>{
                        let tmpIdx = questionList.indexOf(tmp)
                        questionList[tmpIdx]._id = res._id
                        //props.setQuestions(questionList)
                    })
                    .catch((err) => console.log(err))
            }
            for (let i = 0; i < deleted.length; i++) {
               // console.log(deleted)
                deleteFormByIdAPIMethod(deleted[i])
                    .then((res) => {
                        setQuestionList(props.questions.filter((item)=>item._id !== deleted[i]))
                        //props.setQuestions(questionList)
                    })
                    .catch((err) => console.dir(err))
            }
            for (let i = 0; i < edited.length; i++) {
                //console.log(questionList)
                let tmp = questionList.filter((item) => item._id === edited[i])[0]
                //console.log(questionList.filter((item) => item._id === edited[i]),edited[i])
                updateFormAPIMethod(tmp)
                    .then((res) => {
                        //console.dir(res)
                        //props.setQuestions(questionList)
                    })
                    .catch((err) => console.dir(err))
            }
            setDeleted([])
            setAdded([])
            setEdited([])
            props.setQuestions(questionList)
        }else {
            if(!chkQ){
                alert('Not allow having 2 same questions')
            } else if(!chk) {
                alert('Error ValidationError: text: `text` is required')
            }
        }
    }
    const handleAddition=()=>{
        let updatedQ = [...questionList]
        const newId = uuidv4();
        updatedQ = updatedQ.concat({_id: newId, text:'', type:'number',answer:[]})
        setAdded(added.concat([newId]))
        setQuestionList(updatedQ)
    }

    const handleDeletion=(id)=>{
        let updatedQ = [...questionList]
        updatedQ = updatedQ.filter((item)=> item._id !== id)
        if(!added.includes(id)) {
            setDeleted(deleted.concat([id]))
        }else{
            setAdded(added.filter((o)=>o !== id))
        }
        setQuestionList(updatedQ)
    }

    console.log(questionList)
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
                        <input className = 'edit-text' name = {item._id} value ={item.text} onChange={onChangeInput}/>
                        <div className = 'edit-type'>
                            <select className = 'edit-type' name = {item._id} value = {item.type} onChange={onChangeInput}>
                                <option value = 'number'>number</option>
                                <option value = 'boolean'>boolean</option>
                                <option value = 'text'>text</option>
                                <option value = 'radio'>multiple choice</option>
                            </select>
                            <span  className="material-icons" onClick = {()=>handleDeletion(item._id)} >delete_outline</span>
                        </div>
                        {item.type === 'radio'?
                            <div className ='mult-opt'>
                                <div className = 'opt'>
                                    <input name = 'mult-opt' type = 'radio' id ='first-opt' value = 'first' disabled/>
                                    <input name = {item._id} value = {item.multiple? item.multiple.first : ''} className = 'first' onChange={onChangeInput}/>
                                </div>
                                <div className = 'opt'>
                                    <input name = 'mult-opt' type = 'radio' id = 'second-opt' value = 'second' disabled/>
                                    <input name = {item._id} value = {item.multiple? item.multiple.second : ''} className = 'second' onChange={onChangeInput}/>
                                </div>
                                <div className = 'opt'>
                                    <input name = 'mult-opt' type = 'radio' id = 'third-opt' value = 'third' disabled/>
                                    <input name = {item._id} value = {item.multiple? item.multiple.third : ''} className = 'third' onChange={onChangeInput}/>
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
