import React from 'react';
import ReactDOM from 'react-dom';
import { useState } from 'react';

import axios from 'axios';

const testData = [
    {name: "Brayan Andrade", avatar_url:  "https://avatars.githubusercontent.com/u/61259722?v=4", company: "GitHub"},        
    {name: "Kevin Quemag", avatar_url: "https://avatars.githubusercontent.com/u/61263822?v=4", company: "GitHub"},
    {name: "Francisco Jumbo", avatar_url: "https://avatars.githubusercontent.com/u/61259614?v=4", company: "GitHub"},
    {name: "Fernando Rivera", avatar_url: "https://avatars.githubusercontent.com/u/47802477?v=4", company: "GitHub"},
    {name: "Michael Pastrana", avatar_url: "https://avatars.githubusercontent.com/u/61259955?v=4", company: "GitHub"},
    {name: "Anthony Santillan", avatar_url: "https://avatars.githubusercontent.com/u/58825544?v=4", company: "GitHub"},
    {name: "Paola Acosta", avatar_url: "https://avatars.githubusercontent.com/u/52224646?v=4", company: "GitHub"},
];

const TarjetaList = (props) => (
	<div>
  	{props.profiles.map(profile => <Tarjeta key={profile.id} {...profile}/>)}

    {props.profiles2.map(profile2 => <Tarjeta key={profile2.id} {...profile2}/>)}
	</div>
);


const Tarjeta = (props) => {


  return (
    <div className="github-profile">
      <img src={props.avatar_url} alt="" />
      <div className="info">
      <div className="name">{props.name}</div>
      <div className="company">{props.company}</div>
      </div>
      
    </div>
  )
}

export const Form = (props) => {

  const [userName, setUserName] = useState("")

  const handleSubmit = async(e) =>{
    e.preventDefault()
    const resp = await axios.get(`https://api.github.com/users/${userName}`)

    props.onSubmit(resp.data)
    setUserName("")

  }

  return (
    <div>
      	<form onSubmit={handleSubmit}>
    	  <input type="text" placeholder="GitHub username" value={userName} onChange={e => setUserName(e.target.value)}/>
        <button>Add card</button>
    	</form>
    </div>
  )
}

export const App = (props) => {

  const [profiles, setProfiles] = useState(testData)

  const [profiles2, setProfiles2] = useState([])

  const addNewProfile = (profileData) =>{
    setProfiles2([...profiles2,profileData])
  }


  return (
    <div>

      <div className="header"> <h1>Aplicación de tarjetas de GitHub</h1></div>
      
      <Form onSubmit= {addNewProfile}/>

      <TarjetaList profiles = {profiles}
      
      profiles2 = {profiles2}
      ></TarjetaList>

    </div>
    
  )
}

if (document.getElementById('contenedor')) {
    ReactDOM.render(<App title="The GitHub Cards App" />, document.getElementById('contenedor'));
}