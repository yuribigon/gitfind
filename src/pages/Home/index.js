import { useState } from "react";
import "./styles.css";
import { Header } from "../../components/Header";
import ItemList from "../../components/ItemList";
import background from "../../assets/background.png";

function App() {
  const [user, setUser] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [repos, setRepos] = useState(null);
  
  const handleGetData = async () => {
    const userData = await fetch(`https://api.github.com/users/${user}`);
    const newUser = await userData.json();
    
    if(newUser.name){
      const {avatar_url, name, bio, login} = newUser;
      setCurrentUser({avatar_url, name, bio, login});

      const reposData = await fetch(`https://api.github.com/users/${user}/repos`);
      const newRepos = await reposData.json();

      if(newRepos.length){
        setRepos(newRepos);
      }
    }
  }

  return (
    <div className="App">
      <Header />
      <div className="conteudo">
        <img src={background} className="background" alt="background app" />
        <div className="info">
          <div>
            <input 
              name="usuario" 
              value={user} 
              onChange={event => 
              setUser(event.target.value)} 
              placeholder="@usuario"
            />
            <button onClick={handleGetData}>Buscar</button>
          </div>
          {!currentUser?.name ? null :
            <>
              <div className="perfil">
                <img src={currentUser?.avatar_url} className="profile" alt={currentUser?.name}/>
                <div>
                  <h3>{currentUser?.name}</h3>
                  <span>@{currentUser?.login}</span>
                  <p>{currentUser?.bio}</p>
                </div>
              </div>
              <hr />
            </>
          }
          {!repos?.length ? null :
            <div>
              <h4>Repositórios</h4>
              {repos?.map (item =>
                  <ItemList title={item.name} description={item.description} />
                )}
              {/* <ItemList title='Teste1' description="teste de descrição" />
              <ItemList title='Teste1' description="teste de descrição" /> */}
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
