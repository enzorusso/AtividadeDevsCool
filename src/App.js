import './App.css';
import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';



function App() {
  const [pessoas, setPessoas] = useState([]);
  const [novoNome, setNovoNome] = useState('');
  const [novaIdade, setNovaIdade] = useState('');

  useEffect(() => {
    fetch('./pessoas.json', {
      headers: {
        Accept: "application/json"
      }
    }).then(res => res.json())
      .then(res => setPessoas(res.dadosPessoas))
    },[]);


  function setNovoNomeFunction({target}) {
    setNovoNome({value: target.value});
  }

  function setNovaIdadeFunction({target}) {
    setNovaIdade({value: target.value});
  }

  function addPessoa() {
    const listaPessoasCopia = Array.from(pessoas);
    listaPessoasCopia.push({nome: novoNome, idade: novaIdade});
    setPessoas(listaPessoasCopia);
    console.log(listaPessoasCopia);
  
    /* Salva o item */
    // localStorage.setItem("pessoaskey", JSON.stringify(listaPessoasCopia));
  }

  function atualizaListaPessoas({target}, index) {
    const listaPessoasCopia = Array.from(pessoas);
    listaPessoasCopia.splice(index, 1, { id: index, value: target.value });
    setPessoas(listaPessoasCopia);
  }

  // FUNÇÕES DE ORDENAÇÃO
  function ordenarCrescenteNome() {
    pessoas.sort(function(a,b) {
      return a.nome < b.nome ? -1 : a.nome > b.nome ? 1 : 0;
    });
    console.log(pessoas);
  }

  function ordenarCrescenteIdade() {
    pessoas.sort((a, b) => a.idade - b.idade)
    console.log(pessoas);
  }

  function ordenarDecrescenteNome() {
    pessoas.sort((a, b) => {
      if (a.nome > b.nome) return -1;
      if (a.nome < b.nome) return 1;
      return 0;
    });
    console.log(pessoas);
  }

  function ordenarDecrescenteIdade() {
    pessoas.sort((a, b) => {
      if (a.idade > b.idade) return -1;
      if (a.idade < b.idade) return 1;
      return 0;
    });
    console.log(pessoas);
  }

  function classificaIdade(idade) {
    if (idade > 0 && idade <= 12) {
      return 'Criança';
    } else if (idade > 12 && idade <= 19) {
      return 'Adolescente';
    } else if (idade > 19 && idade <= 65) {
      return 'Adulto';
    } else if (idade > 65) {
      return 'Idoso';
    }
  }


  return (
    <Grid className="grid">
      <Grid>
        <h1 style={{margin:"10px"}}>
          Adicionar pessoa  
        </h1>
        <form style={{margin:"10px"}}>
          <TextField
            label="Nome"
            id="nome"
            size="small"
            type="text" 
            name="nome" 
            onChange={setNovoNomeFunction}
            style={{margin:"10px"}}
          />
          <br/>
          <TextField
            label="Idade"
            id="idade"
            size="small"
            type="text" name="idade"
            onChange={setNovaIdadeFunction}
            style={{margin:"10px"}}
          />
          <br/>
          <Button variant="contained" onClick={addPessoa} style={{margin:"10px"}}>
            Adicionar
          </Button>
        </form>
      </Grid>

      <Grid style={{marginLeft:"50px"}}>
        <h1 style={{margin:"10px"}}>
          Lista de pessoas
        </h1>
        <Button variant="contained" onClick={ordenarCrescenteNome} style={{margin:"10px"}}>
          Ordenar A-Z
        </Button>
        <Button variant="contained" onClick={ordenarDecrescenteNome} style={{margin:"10px"}}>
          Ordenar Z-A
        </Button>
        <Button variant="contained" onClick={ordenarCrescenteIdade} style={{margin:"10px"}}>
          Ordenar 0-99
        </Button>
        <Button variant="contained" onClick={ordenarDecrescenteIdade} style={{margin:"10px"}}>
          Ordenar 99-0
        </Button>

        {pessoas.map(p => (
          <h2 style={{margin:"10px"}}>
            <strong>Nome: </strong>
            {p.nome}
            <br/>
            <strong>Idade: </strong>
            {p.idade}
            <br/>
            <strong>Classificação: </strong>
            {classificaIdade(p.idade)}
          </h2>
        ))}
      </Grid>
    </Grid>
  );
}

export default App;
