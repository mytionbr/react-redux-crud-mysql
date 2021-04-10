import React,{useState,useEffect} from 'react'
import { onChange, set } from 'react-native-reanimated'
import {connect} from "react-redux"
import {updateTutorial,deleteTutorial} from "../actions/tutorials"
import TutorialDataService from "../services/tutorial.service"

const Tutorial = (props) => {
    
    const initialState = {
        currentTutorial:{
            id:null,
            title:"",
            description:"",
            published:false
        },
        message:""
    }

    const [state,setState] = useState(initialState)

    useEffect(()=>{
        getTutorial(props.match.params.id)
    })

    const onChangeTitle = (e)=>{
        const title = e.target.value

        setState(function(prevState){
            return {
                currentTutorial:{
                    ...prevState.currentTutorial,
                    title:title
                }
            }
        })
    }

    const onChangeDescription = (e)=>{
        const description = e.target.value

        setState((prevState)=>({
            currentTutorial:{
                ...prevState.currentTutorial,
                description:description
            },
        }))
    }

    const getTutorial = (id)=>{
        TutorialDataService.get(id)
            .then((response)=>{
                this.setState({
                    currentTutorial:response.data
                })
                console.log(response.data)
            })
            .catch((e)=>{
                console.log(e)
            })
    }
    
    const updateStatus = (status)=>{
        let data = {
            id: state.currentTutorial.id,
            title: state.currentTutorial.title,
            description: state.currentTutorial.description,
            published:status,
        }

        props
            .updateTutorial(state.currentTutorial.id,data)
            .then((response)=>{
                console.log(response)

                setState((prevState)=>({
                    currentTutorial:{
                        ...prevState.currentTutorial,
                        published:status,
                    }
                }))
                setState({
                    message:"O status foi atualizado com sucesso!"
                })
            })
            .catch((e)=>{
                console.log(e)
            })
    }

    const updateContent = ()=>{
        props
            .updateTutorial(state.currentTutorial.id,state.currentTutorial)
            .then((response)=>{
                console.log(response)

                setState({
                    message:"O tutorial foi atualizado com sucesso"
                })
            })
            .catch((e)=>{
                console.log(e)
            })
    }

    const removeTutorial = ()=>{
        props
            .deleteTutorial(state.currentTutorial.id)
            .then(()=>{
                props.history.push("/tutorials")
            })
            .catch((e)=>{
                console.log(e)
            })
    }

    return (
        <div>
            {state.currentTutorial ? (
                <div className="edit-form">
                    <h4>Tutorial</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="title">Titulo</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                value={state.currentTutorial.title}
                                onChange={onChangeTitle}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <input
                                type="text"
                                className="form-control"
                                id="description"
                                value={state.currentTutorial.description}
                                onChange={onChangeDescription}
                            />
                        </div>
                        
                        <div className="form-group">
                            <label>
                                <strong>Status:</strong>
                            </label>
                            {state.currentTutorial.published ? "Publicado":"Pendente"}
                        </div>
                    </form>

                    {state.currentTutorial.published ?(
                        <button
                            className="badge badge-primary mr-2"
                            onClick={()=>state.updateStatus(false)}
                        >
                            Cancelar publicação
                        </button>
                    ) : (
                        <button
                            className="badge badge-primary mr-2"
                            onClick={()=> updateStatus(true)}
                        >
                            Publicar
                        </button>                    
                    )}
                    <button
                        className="badge badge-danger mr-2"
                        onClick={removeTutorial}
                    >
                        Deletar
                    </button>

                    <button
                        type="submit"
                        className="badge badge-success"
                        onClick={updateContent}
                    >
                        Atualizar
                    </button>
                    <p>state.message</p>
                </div>
            ):(
                <div>
                    <br/>
                    <p>Por favor, clique em um tutorial</p>
                </div>
            )}
        </div>
    )
}

export default connect(null,{updateTutorial,deleteTutorial})(Tutorial)
