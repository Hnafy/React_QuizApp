import "./questions.css"
import { list } from "./data"
import { useRef, useState } from "react";

let corrects = 0
let incorrect = 0
export default function Questions(){
    let [next,setNext] = useState(1)
    let [able,setAble] = useState(false)
    let [final,setFinal] = useState(true)

    let quesNum = next;
    let thisQues = []
    list.filter((e)=>{(e.id===quesNum)?thisQues.push(e):null})

    let [lock,setLock] = useState(false)
    let option1 = useRef(null)
    let option2 = useRef(null)
    let option3 = useRef(null)
    let option4 = useRef(null)
    let arrOpt = [option1,option2,option3,option4]
    let arrAnswers = []
    
    thisQues.map((e)=>{(e.answers).find((d)=>{arrAnswers.push(<button ref={arrOpt[d.id -1]} key={d.id} onClick={()=>handleAnswer(d.id,d.correct)}>{d.answer}</button>)})})
    function handleAnswer(id,correct){
        if(lock === false){
            if(correct){
                arrOpt[id-1].current.classList.add("success")
                corrects +=1
                setLock(true)
            }else{
                arrOpt[id-1].current.classList.add("fail")
                thisQues.map((e)=>{(e.answers).find((d)=>{d.correct!==correct?arrOpt[d.id-1].current.classList.add("success"):null})})
                incorrect +=1
                setLock(true)
            }
        }
    }
    function reset(){
        for(let i=0;i<arrOpt.length;i++){
            arrOpt[i].current.classList.remove("success")
            arrOpt[i].current.classList.remove("fail")
        }
        setLock(false)
    }
    function resetGame(){
        corrects = 0
        incorrect = 0
        setNext(1)
        setLock(false)
        setAble(false)
    }
    return(
        <div>
        {final?(
            <div className="questions">
                <p><span>{thisQues[0].id}</span>.{thisQues[0].question}</p>
                <div className="answers">
                    {arrAnswers}
                </div>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <span>{next} of {list.length}</span>
                    <button className="nextQuestion" disabled={able?true:false} onClick={()=>{if(list.length > next){setNext(next+1);reset()}else{setAble(true);setFinal(false)}}}>Next</button>
                </div>
            </div>
                ):(
                    <div className="final">
                        <h3>Correct : {corrects}</h3>
                        <h3>Incorrect : {incorrect}</h3>
                        <button className={"nextQuestion"} onClick={()=>{setFinal(true);resetGame()}}>return</button>
                    </div>
                )}
        </div>
    )
}