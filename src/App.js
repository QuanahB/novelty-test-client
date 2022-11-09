import React, {useEffect,useState} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Activity from './Activity'
import Word from './Word'
import {motion} from 'framer-motion';
import ParticleBackground from './particleBackground';

function App(){


  return(
    <>
    <Router>
    <Switch>
    <Route exact path="/">
    <div className='logo'>
    <img src="/images/thelogo.png" width="auto" height="auto"></img> {/*  width="400" height="100" */}
    </div>
    <div className='test'>
    <motion.div
    className='one card'
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3 }}
    whileHover={{ scale: 1.1 }}
    >
    <img src="/images/activities.jpeg" width="200" height="300"></img>
    <span className="caption">Activities</span>
    </motion.div>
    <motion.div
    className='two card'
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3 }}
    whileHover={{ scale: 1.1 }}
    >
    <img src="/images/dictionary.jpeg" width="200" height="300"></img>
    <span className="caption">Words</span>
    </motion.div>
    </div>
    </Route>
      <Route path="/activity">
        <Activity />
      </Route>
      <Route path="/word">
        <Word />
      </Route>
    </Switch>
    </Router>
    <ParticleBackground/>
    </>
  )
}

export default App

//https://novelty-test.herokuapp.com/