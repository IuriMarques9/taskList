import "./css/lista.css"
import { useState, useEffect } from "react";
import imagem from "./assets/listaTarefas.png"

function Lista(){
    const storageList = localStorage.getItem("Lista");

    const [lista, setLista] = useState(storageList ? JSON.parse(storageList) : []);
    const [item, setItem] = useState ("");

    
    useEffect(() =>{
        window.localStorage.setItem("Lista", JSON.stringify(lista))
    },[lista])

    function adicionaItem(form){
        form.preventDefault();
        if(!item){
            return;
        }
        setLista([...lista, {text: item, isCompleted: false}]);
        setItem("");
        document.querySelector('input').focus();
    }

    function apagar(indice){
        const listaAux = [...lista];
        listaAux.splice(indice, 1);
        setLista(listaAux)
    }
    function clicou(indice) {
        const listaAux = [...lista];
        listaAux[indice].isCompleted = !listaAux[indice].isCompleted;
        setLista(listaAux);
    }
    function apagarTudo(){
        setLista([]);
    }

    return (
        <div className="corpo">
            <h1>Lista de Tarefas</h1>
            <div id="container">
                <form  className="form" onSubmit={adicionaItem}>
                    <input 
                        onChange={(e) => {setItem(e.target.value)}} 
                        placeholder="Insira a tarefa" type="text" 
                        value={item}
                    />
                    <button type="submit">Adicionar</button>
                </form>

                <div id="tarefas">
                    {
                        lista.length < 1 
                        ? 
                        <img style={{width:'300px'}} src={imagem} alt="Lista de tarefas" />
                        :
                        lista.map((item, indice) => (
                            <div key={indice} className={item.isCompleted ? "tarefa check" : "tarefa notCheck"}>
                                <span onClick={() => {clicou(indice)}}>{item.text}</span>
                                <button className="apagar" onClick={ () => {apagar(indice)}}>Apagar</button>
                            </div>
                        ))
                    }
                </div>
                {
                    lista.length > 0 &&
                    <button id="apagarTudo" onClick={ () => {apagarTudo()}}>Apagar tudo</button>
                }
            </div>
        </div>
    )
}

export default Lista