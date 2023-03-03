async function buscaEndereco(cep){

    const mensagemErro = document.getElementById("erro");
    mensagemErro.innerHTML = "";

    try{
        const consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const consultaCEPConvertida = await consultaCEP.json();
        if(consultaCEPConvertida.erro){
            throw Error("CEP inexistente");
        }

        // verificando valores de cada input 
        const endereco = document.getElementById("endereco");
        const bairro = document.getElementById("bairro");
        const cidade = document.getElementById("cidade");
        const estado = document.getElementById("estado");

        endereco.value = consultaCEPConvertida.logradouro;
        bairro.value = consultaCEPConvertida.bairro;
        cidade.value = consultaCEPConvertida.localidade;
        estado.value = consultaCEPConvertida.uf;

        console.log(consultaCEPConvertida);
        return consultaCEPConvertida;
    }
    catch (erro){
    mensagemErro.innerHTML = "<p>CEP inválido, tente novamente</p>";
    console.log(erro);
    }
}; 

const cep = document.getElementById("cep");
cep.addEventListener("focusout", () => buscaEndereco(cep.value));

