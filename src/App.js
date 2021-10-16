import './App.css';
import React, { useEffect, useState, useCallback } from 'react';
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';

function App() {
  const [pessoas, setPessoas] = useState([]);
  const [filtroPessoas, setFiltroPessoas] = useState([]);
  const [novoNome, setNovoNome] = useState('');
  const [novaIdade, setNovaIdade] = useState('');
  const [selectedOption, setSelectedOption] = useState('Todos');
  const [, updateState] = useState(0);
  const forceUpdate = useCallback(() => updateState((tick) => tick + 1), []);

  useEffect(() => {
    fetch('./pessoas.json', {
      headers: {
        Accept: "application/json"
      }
    }).then(res => res.json())
      .then(res => setPessoas(res.dadosPessoas))
    },[]);

    useEffect(() => {
      fetch('./pessoas.json', {
        headers: {
          Accept: "application/json"
        }
      }).then(res => res.json())
        .then(res => setFiltroPessoas(res.dadosPessoas))
      },[]);

  function setNovoNomeFunction({target}) {
    setNovoNome(target.value);
  }

  function setNovaIdadeFunction({target}) {
    setNovaIdade(parseInt(target.value));
  }

  function addPessoa() {
    const listaPessoasCopia = Array.from(pessoas);
    listaPessoasCopia.push({nome: novoNome, idade: novaIdade});
    setFiltroPessoas(listaPessoasCopia);
    setPessoas(listaPessoasCopia);
    setSelectedOption('Todos');
    setNovoNome('');
    setNovaIdade('');
    localStorage.setItem("pessoas", JSON.stringify(listaPessoasCopia))
    forceUpdate();
  }

  // FUNÇÕES DE ORDENAÇÃO
  function ordenarCrescenteNome() {
    filtroPessoas.sort(function(a,b) {
      return a.nome < b.nome ? -1 : a.nome > b.nome ? 1 : 0;
    });
    forceUpdate();
  }

  function ordenarCrescenteIdade() {
    filtroPessoas.sort((a, b) => a.idade - b.idade)
    forceUpdate();
  }

  function ordenarDecrescenteNome() {
    filtroPessoas.sort((a, b) => {
      if (a.nome > b.nome) return -1;
      if (a.nome < b.nome) return 1;
      return 0;
    });
    forceUpdate();
  }

  function ordenarDecrescenteIdade() {
    filtroPessoas.sort((a, b) => {
      if (a.idade > b.idade) return -1;
      if (a.idade < b.idade) return 1;
      return 0;
    });
    forceUpdate();
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

  function trocaTodos() {
    setSelectedOption("Todos");
    setFiltroPessoas(pessoas);
    forceUpdate();
  }

  function classificaCrianca(pessoa) {
    const { idade } = pessoa;
    console.log(idade);
    if (idade > 0 && idade <= 12) 
      return true;
    return false;
  }
  
  function trocaCrianca() {
    console.log(filtroPessoas);
    const filtroCriancas = pessoas.filter(pessoa => 
      classificaCrianca(pessoa)
    );
    setSelectedOption("Criança");
    setFiltroPessoas(filtroCriancas);

    forceUpdate();
  }

  function classificaAdolescente(pessoa) {
    const { idade } = pessoa;
    console.log(idade);
    if (idade > 12 && idade <= 19) 
      return true;
    return false;
  }
  
  function trocaAdolescente() {
    const filtroAdolescente = pessoas.filter(pessoa => 
      classificaAdolescente(pessoa)
    );
    setSelectedOption("Adolescente");
    setFiltroPessoas(filtroAdolescente);

    forceUpdate();
  }

  function classificaAdulto(pessoa) {
    const { idade } = pessoa;
    console.log(idade);
    if (idade > 19 && idade <= 65) 
      return true;
    return false;
  }
  
  function trocaAdulto() {
    const filtroAdulto = pessoas.filter(pessoa => 
      classificaAdulto(pessoa)
    );
    setSelectedOption("Adulto");
    setFiltroPessoas(filtroAdulto);

    forceUpdate();
  }

  function classificaIdoso(pessoa) {
    const { idade } = pessoa;
    console.log(idade);
    if (idade > 65) 
      return true;
    return false;
  }
  
  function trocaIdoso() {
    const filtroIdoso = pessoas.filter(pessoa => 
      classificaIdoso(pessoa)
    );
    setSelectedOption("Idoos");
    setFiltroPessoas(filtroIdoso);

    forceUpdate();
  }

  return (
    <Grid className="grid">
      <Grid>
        <h1 style={{ margin: "10px" }}>
          Adicionar pessoa
        </h1>
        <form style={{ margin: "10px" }}>
          <TextField
            label="Nome"
            id="nome"
            size="small"
            type="text"
            name="nome"
            value={novoNome}
            onChange={setNovoNomeFunction}
            style={{ margin: "10px" }} />
          <br />
          <TextField
            label="Idade"
            id="idade"
            size="small"
            type="text" 
            name="idade"
            value={novaIdade}
            onChange={setNovaIdadeFunction}
            style={{ margin: "10px" }} />
          <br />
          <Button variant="contained" onClick={addPessoa} style={{ margin: "10px" }}>
            Adicionar
          </Button>
        </form>
        <br/>
        <FormLabel style={{ marginLeft: "10px" }} component="legend">Classificação</FormLabel>
        <RadioGroup
          aria-label="classificacao"
          defaultValue="Todos"
          name="radio-buttons-group"
        >
        <FormControlLabel style={{ marginLeft: "10px" }} value="Todos" control={<Radio />} label="Todos" checked={selectedOption === 'Todos'} onClick={trocaTodos} />
        <FormControlLabel style={{ marginLeft: "10px" }} value="crianca" control={<Radio />} label="Criança" checked={selectedOption === 'Criança'} onClick={trocaCrianca} />
        <FormControlLabel style={{ marginLeft: "10px" }} value="adolescente" control={<Radio />} label="Adolescente" checked={selectedOption === 'Adolescente'} onClick={trocaAdolescente}/>
        <FormControlLabel style={{ marginLeft: "10px" }} value="adulto" control={<Radio />} label="Adulto" checked={selectedOption === 'Adulto'} onClick={trocaAdulto}/>
        <FormControlLabel style={{ marginLeft: "10px" }} value="idoso" control={<Radio />} label="Idoso" checked={selectedOption === 'Idoso'} onClick={trocaIdoso}/>
        </RadioGroup>
      </Grid>

      <Grid style={{ marginLeft: "50px" }}>
        <h1 style={{ margin: "10px" }}>
          Lista de pessoas
        </h1>
        <Button variant="contained" onClick={ordenarCrescenteNome} style={{ margin: "10px" }}>
          Ordenar A-Z
        </Button>
        <Button variant="contained" onClick={ordenarDecrescenteNome} style={{ margin: "10px" }}>
          Ordenar Z-A
        </Button>
        <Button variant="contained" onClick={ordenarCrescenteIdade} style={{ margin: "10px" }}>
          Ordenar Idade Menor-Maior
        </Button>
        <Button variant="contained" onClick={ordenarDecrescenteIdade} style={{ margin: "10px" }}>
          Ordenar Idade Maior-Menor
        </Button>

        {filtroPessoas.map(p => (
          <h2 style={{ margin: "10px" }}>
            <strong>Nome: </strong>
            {p.nome}
            <br />
            <strong>Idade: </strong>
            {p.idade}
            <br />
            <strong>Classificação: </strong>
            {classificaIdade(p.idade)}
          </h2>
        ))}
      </Grid>
      <br/>
      <br/>
      <br/>

      {localStorage.getItem("pessoas")}
    </Grid>
  );
}

export default App;
