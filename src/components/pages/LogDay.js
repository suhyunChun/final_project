import React,{useState} from "react";
import Nav from './Nav'
function LogDay() {
    const [questions, setQuestions] = useState([['Number of push ups','number'],
                                                        ['Had a long walk today','number'],
                                                        ['One great thing that happened today','text'],
                                                        ['Today was a','radio']])
    return(
        <React.Fragment>
            <Nav/>
            <form>
                <div id="log-day">
                    <div className = 'log-date'>
                        {Date.now()}
                        <span className="material-icons">add_circle_outline</span>
                    </div>
                    <div className = 'log-form'>
                        {(questions).map(item => (
                            <div className='question' id = {item._id} key={item._id} >
                                {item[0]}
                                <input type={item[1]}/>
                                <span className="material-icons">delete_outline</span>
                            </div>

                        ))}
                    </div>
                    <button type = 'submit'>
                        Submit
                    </button>
                </div>
            </form>
        </React.Fragment>
    );
}
export default LogDay