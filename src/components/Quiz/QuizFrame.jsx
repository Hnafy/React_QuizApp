import "./quizFrame.css"
import Questions from "./Questions"
import { useState } from "react"

export default function QuizFrame(){
    let [next,setNext] = useState(1)
    let [able,setAble] = useState(false)
    return(
        <>
            <div className="QuizFrame">
                <h2>Quiz</h2>
                <Questions />
            </div>
        </>
    )
}