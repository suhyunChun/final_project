import React,{useState} from "react";
import Nav from './Nav'
function EditQuestions(props) {
    const [questionList, setQuestionList] = useState([...props.questions])
    console.log(questionList)

    const onChangeInput = (event) => {
    /*    const target = event.target;
        const value = target.value;
        const name = target.name;
        console.log(target)
        let updatedQ = [...questionList]
        updatedQ[name] = value

        //const updatedQ= {...questionList, [name]: value};
        setQuestionList(updatedQ);*/
    }
    const handleSubmit=()=>{
        props.setQuestions(questionList)
    }
    const handleAddition=()=>{
        let updatedQ = [...questionList]
        updatedQ = updatedQ.concat({text:'', type:'number'})
        setQuestionList(updatedQ)
    }
    const handleDeletion=(event)=>{

    }

    return(
        <React.Fragment>
            <Nav/>
            <form>
                <div id="edit">
                    <h2> Edit Questions</h2>
                    <span className="material-icons" onClick={handleAddition}>add_circle_outline</span>
                    {questionList.map(item => (
                        <div className='edit-question' id = {item._id} key={item._id}>
                            <label htmlFor = 'edit-text'/>
                            <input id = 'edit-text' value ={item.text} onChange = {onChangeInput}/>
                            <label htmlFor = 'edit-type'/>
                            <select id = 'edit-type' name = 'edit-type' value = {item.type} onChange = {onChangeInput}>
                                <option value = 'number'>number</option>
                                <option value = 'boolean'>boolean</option>
                                <option value = 'text'>text</option>
                                <option value = 'multiple'>multiple choice</option>
                            </select>
                            <span className="material-icons">delete_outline</span>
                        </div>
                        ))}
                    <button type = 'submit' onSubmit={handleSubmit}> Save </button>
                </div>
            </form>
        </React.Fragment>
    );
}
export default EditQuestions