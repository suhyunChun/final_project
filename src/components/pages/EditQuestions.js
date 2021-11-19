import React from "react";
import Nav from './Nav'
function EditQuestions(props) {
    return(
        <React.Fragment>
            <Nav/>
            <form>
                <div id="edit">
                    <h2> Edit Questions</h2>
                    {(props.questions).map(item => (
                        <div className='question' id = {item._id} key={item._id} >
                            {item[0]}
                            <input type={item[1]}/>
                            <span className="material-icons">delete_outline</span>
                        </div>
                        ))}
                </div>
            </form>
        </React.Fragment>
    );
}
export default EditQuestions