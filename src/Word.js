import React, {useEffect,useState,useRef} from 'react'
import './App.css';
import RecordListW from './RecordListW';
import ParticleBackground from './particleBackground';

export default function Activity() {
  
  const [form, setForm] = useState({
    word: "",
    definition: "",
    partofspeech: "",
  });

  const [definitions,setDefinitions] = useState([])
  const [slide,updateSlide] = useState(0)

  const userWord = useRef()
  const displayDef = useRef()
  const displayPOS = useRef()
  var defClone = [];

  function getData(){

    var word = userWord.current.value;
    var url = `https://wordsapiv1.p.rapidapi.com/words/${word}/definitions`;

    const options = {
      method: 'GET',
      headers: {
      'X-RapidAPI-Key': '9f1b379acfmsh1ab5f16ce0a06f2p11b07cjsn06380b607435',
      'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
      }
    };

    fetch(url,options)
    .then(res => res.json())
    .then(json => {
      let i = 0;
      defClone = []
      for( i = 0; i< json.definitions.length; i++){
        var object = {
          definition: json.definitions[i].definition,
          partOfSpeech: json.definitions[i].partOfSpeech,
        }; // object to push into array 
        defClone.push(object) //Push an object with POS and definition instead
      }
      displayDef.current.value = json.definitions[0].definition;
      displayPOS.current.value = json.definitions[0].partOfSpeech;
      setDefinitions(defClone)
      setForm({
        word: userWord.current.value,
        definition: json.definitions[0].definition,
        partOfSpeech: json.definitions[0].partOfSpeech,
      });
    })
    .catch(err => console.error('error:' + err));

  }

  useEffect(() =>{
    if((definitions.length !== 0)){
      displayDef.current.value = definitions[slide].definition
      displayPOS.current.value = definitions[slide].partOfSpeech
      setForm({
        word: userWord.current.value,
        definition: definitions[slide].definition,
        partOfSpeech: definitions[slide].partOfSpeech,
      });
      //console.log(form)
    }
  },[slide])

  function prevSlide(){
    if(slide <= 0){
      updateSlide(0)
    }
    else{
      updateSlide(slide-1)
    }
  }

  function nextSlide(){
    if(slide === definitions.length-1){
      updateSlide(slide)
    }
    else{
      updateSlide(slide+1)
    }
  }

  function testPrint(){
    console.log(definitions)
  }

  async function onSubmit(){

    //Replace fields with the use of the useState form for ease
    const newWord = form;

    await fetch("https://quickstart-image-zxyxla676a-uc.a.run.app/record/addWord", {
      method: "POST",
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newWord),
    })
    .catch(error => {
      window.alert(error);
      return;
    })
    setForm({ word: "", definition: "", partofspeech: ""});
    console.log("Succesfully added")
  }

  return (
    <>
    <div>
        <input id='word' ref={userWord}/>
        <button onClick={() => getData()} className='buttonTest'>Fetch Word</button>
        <br></br>
        <form name="Hello" onSubmit={onSubmit}>
          <input id='definition' ref={displayDef} style={{width: "370px"}}/>
          <input id='partOfSpeech' ref={displayPOS}/>
          <input type="submit" value="Add" className='buttonTest'/>
        </form>
        <br></br>
        <button onClick={() => prevSlide()} className='buttonTest'>Previous Slide</button>
        <button onClick={() => nextSlide()} className='buttonTest'>Next Slide</button>
        <button onClick={() => testPrint()} className='buttonTest'>Test</button>
        <RecordListW />
        <br></br>
        <ParticleBackground />
    </div>
    </>
  );
}