import React,{useState} from 'react'
import {connect} from "react-redux"
import {createTutorial} from "../actions/tutorials"

const addTutorial = (props) => {
    
    const state = {
        id: null,
        title:"",
        description:"",
        published: false,

        submitted:false
    }

    const [tutorial,setTutorial] = useState(state)

    const onChangeTitle = (e)=>{
        setTutorial({title:e.target.value})
    }

    const onChangeDescription = (e) =>{
        setTutorial({
            description:e.target.value,
        })
    }
    
    const saveTutorial = (e)=> {
        const {title,description} = tutorial

        props
            .createTutorial(title,description)
            .then((data)=>{
                setTutorial({
                    id:data.id,
                    title: data.title,
                    description: data.description,
                    published: data.published,
                    submitted:true
                })
            })
            .catch((e)=>{
                console.log(e)
            })
    }

    const newTutorial = ()=>{
        setTutorial({
            id:null,
            title:"",
            description:"",
            published: false,
            submitted:false
        })
    }

    return (
        <div className="submit-form">
            {state.submitted ? (
                <div>
                    <h4>O seu cadastro foi um sucesso!</h4>
                    <button className="btn btn-success" onClick={newTutorial}>
                        Adicionar
                    </button>
                </div>
            ) : (
                <div>
                    <div className="form-group">
                        <label htmlFor="title">Titulo</label>
                        <input 
                            type="text"
                            className="form-control"
                            id="title"
                            required
                            value={state.title}
                            onChange={onChangeTitle}
                            name="title"
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="description">Descrição</label>
                        <input 
                            type="text"
                            className="form-control"
                            id="description"
                            required
                            value={state.description}
                            onChange={onChangeDescription}
                            name="description"
                        />
                    </div>

                    <button onClick={saveTutorial} className="btn btn-success"> 
                        Cadastrar
                    </button>
                </div>
            )}
        </div>
    )
}

export default connect(null,{createTutorial})(addTutorial)
