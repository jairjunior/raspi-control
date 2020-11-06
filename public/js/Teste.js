names = ['tiago', 'ronan', 'marcos', 'patrícia', 'maria'];


class Pessoa{
    constructor(name){
        this.name = name;
    }
    changeName(){
        this.name = 'Ruberval';
    }
}


class Grupo{
    pessoas = [];
     constructor(){
          names.forEach( name => {
               this.pessoas.push( new Pessoa(name) );
          });
     }
}

const grupo = new Grupo();