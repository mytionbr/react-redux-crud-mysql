import React,{useState,useEffect} from 'react'
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {retrieveTutorials,findTutorialsByTitle,deleAllTutorials} from "../actions/tutorials"

const TutorialList = (props) => {
    
    const initialState = {
        currentTutorial: null,
        currentIndex: -1,
        searchTitle: "",
    }

    const [state,setState] = useState(initialState)
    const {tutorials} = props

    useEffect(()=>{
        props.retrieveTutorials()
    })

    const onChangeSeachTitle = (e)=>{
        const searchTitle = e.target.value

        setState({
            searchTitle: searchTitle
        })
    }

    const refreshData = ()=>{
        setState({
            currentTutorial: null,
            currentIndex: -1
        })
    }

    const setActiveTutorial = (tutorial,index)=>{
        setState({
            currentTutorial:tutorial,
            currentIndex:index
        })
    }

    const removeAllTutorials = ()=>{
        props
            .deleteAllTutorials()
            .then((response)=>{
                console.log(response)
                refreshData()
            })
            .catch((e)=>{
                console.log(e)
            })
    } 

    const findByTitle = ()=>{
        refreshData()
        props.findTutorialsByTitle(state.searchTitle)
    }

    const mapStateToProps = (state) =>{
        return {
            tutorials: state.tutorials
        }
    }

    return (
        <div className="list row">   
            <div className="col-md-8">
               <div className="input-group mb-3">
                    <input 
                        type="text"
                        className="form-control"
                        placeholder="Pesquise pelo titulo"
                        value={state.searchTitle}
                        onChange={onChangeSeachTitle}
                    />
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={findByTitle}
                        >  
                        Pesquisar
                        </button>
                    </div>
                </div>     
            </div>
            <div className="col-md-6">
                <h4>Lista de tutoriais</h4>
                <ul className="list-group">
                    {tutorials && 
                        tutorials.map((tutorial,index)=>{
                            <li
                                className={
                                    "list-group-item" +
                                    (index === state.currentIndex ? "active":"")
                                }
                                onClick={()=> setActiveTutorial(tutorial,index)}
                                key={index}
                                >
                                    {tutorial.title}
                                </li>
                        })}
                </ul>
                <button
                    className="m-3 btn btn-sm btn-danger"
                    onClick={removeAllTutorials}
                >
                    Remover todos
                </button>
            </div>
            <div className="col-md-6">
                {state.currentTutorial ?(
                    <div>
                        <h4>Tutorial</h4>
                        <div>
                            <label>
                                <strong>Titulo:</strong>
                            </label>{" "}
                            {state.currentTutorial.title}
                        </div>
                        <div>
                            <label><strong>Descrição:</strong></label>
                      {" "}
                        {state.currentTutorial.description}
                        </div>
                        <div>
                            <label>
                                <strong>Status</strong>
                            </label>{" "}
                            {state.currentTutorial.published ? "Published" : "Pending"}
                        </div>
                        <Link 
                        to={"/tutorials/"+state.currentTutorial.id}
                        className="badge badge-warning"
                    >
                        Editar
                    </Link>
                    </div>                   
                ):(
                    <div>
                        <br/>
                        <p>Por favor click em um tutorial</p>
                    </div>
                )}
            </div>
        </div>
        
    )

    
}

export default connect(mapStateToProps,{retrieveTutorials,findTutorialsByTitle,deleAllTutorials})(TutorialList)