# FRONT LIVRARIA

## Introdução

Conforme o habito de realizar compras online se torna o comum em todo o mundo, o desenvolvimento de sistemas de vendas online, sejam em sites próprios ou em marketplaces, se torna uma necessidade cada vez maior. Além disso, um sistema robusto de vendas pode trazer comodidade tanto para o cliente quanto para o vendedor. Pensando nisso o seguinte projeto trata do desenvolvimento de um protótipo de um sistema de vendas de uma livraria.

Este projeto final sintetiza o aprendizado ao longo da disciplina de Programação Web. O projeto utiliza uma API back-end previamente desenvolvida por um dos membros da equipe, disponível [aqui](https://github.com/tomlavez/mango-hq-shop). Porém, para a permissão da comunicação entre diferente domínios, foi realizada uma configuração do `CORS` , estando a versão adaptada hospedada no fork do projeto [aqui](https://github.com/mathLazaro/mango-hq-shop).

## Descrição do projeto

Para inicialização do projeto foi utilizada a ferramenta `vite` utilizando `React` na renderização das páginas e componentes criadas. Para a conexão com o servidor back-end, subido utilizando `express` , foi utilizado o `axios` . Além disso o projeto utiliza-se de banco de dados `MySql`

Foram definidos dois tipos de login (usuário comum e usuário administrador), sendo que a aplicação é acessível apenas com o login de um dos dois tipos de usuário, caso contrário, uma página de erro 401 é retornada ao usuário.

```jsx
return (
    <div className="errorPage">
        <h2>
            A página que você está tentando acessar requer <Link to={"/"}>login</Link>
        </h2>
    </div>
);
```

Além disso, o usuário administrador possui acesso à rota "/app/admin", para que possa realizar modificações no estoque de livros, caso um usuário comum tente acessá-la, uma página de erro 403 (forbidden).

```jsx
return (
    <div className="errorPage">
        <h2>
            A página que você está tentando acessar requer conta com nível administrador. <Link to={"/app/"}>Voltar</Link>
        </h2>
    </div>
);
```

Foram definidas as seguintes rotas através da função createBrowserRouter(), pacote `react-router-dom` , e do `react-dom` para a criação dos elementos na árvore de elementos:

```jsx
    {
        path: "/",
        errorElement: <Error404 />,
        element: <LoginPage />,
    },
    {
        path: "/app",
        children: [
            {
                path: "/app/admin",
                element: <PrivateRoute adminLevel={true} />,
            },
            {
                path: "/app/",
                element: <PrivateRoute adminLevel={false} />,
            },
        ],
    }
```

Foi tratado também caso de digitação de rota não existente e o erro 404 é retornado ao usuário:

```jsx
return (
        <div className="errorPage">
            <h2>
                A página que você está tentando acessar requer <Link to={"/"}>login</Link>
            </h2>
        </div>
);
```

Dessa maneira, foram implementadas as seguintes funções:

* adicionar livros no banco de dados, utilizando `API de livros do google` (tratado no back-end)*; 
* buscar livros no banco de dados; 
* remover livros do banco de dados*;  
* fazer login;
* criar usuário; 
* deletar usuário*;
* atualizar informações do usuário;

(*) funções realizadas por usuários com nível administrador.

Por fim, para tratamento de inserção de informações pelo usuário, foram utilizados os pacotes `yup` e `react-input-mask` . Além disso, para utilização de observers foi utilizado o pacote `react-hook-form` .


## Pré-requisitos

- node - versão utilizada: v22.2.0.
- npm - será necessário ter o gerenciador de pacotes do node.
- API back-end e todos seus requisitos (disponível em https://github.com/mathLazaro/mango-hq-shop).

## Inicialização

1. Subir o servidor da API back-end citada;

2. Instalar as dependências rodando o seguinte comando dentro da pasta do projeto:

~~~cmd
    npm install
~~~

3. Subir o servidor front-end através do comando:

~~~cmd
    npm run dev
~~~

4. Acessar a porta local `5173` através do navegador.
