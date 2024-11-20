import { useState } from 'react';

const useWordle = (solution) => {
    const [turn, setTurn] = useState(0)
    const [currentGuess, setCurrentGuess] = useState('')
    const [guesses, setGuesses] = useState([...Array(6)]) //each guess is an array
    const [history, setHistory] = useState([]) //each guess is a string 
    const [isCorrect, setIsCorrect] = useState(false)
    const [usedKeys, setUsedKeys] = useState({}) //{a: 'green', b: 'yellow', c: 'grey'}

 
    //format a guess into an array of letter objects
    const formatGuess = () => {
        let solutionArray = [...solution]
        let formattedGuess = [...currentGuess].map((l) => {
            return {key: l, color: 'grey'}
        })
        //for green letters
        formattedGuess.forEach((l,i) => {
            if (solutionArray[i] === l.key) {
                formattedGuess[i].color = 'green'
                solutionArray[i] = null
            }
        })
        //for yellow letters
        formattedGuess.forEach((l,i) => {
            if(solutionArray.includes(l.key) && l.color !== 'green') {
                formattedGuess[i].color = 'yellow'
                solutionArray[solutionArray.indexOf(l.key)] = null
            }
        })
        return formattedGuess
    }

    // add a new guess to the guesses state
    //update the isCorrect state if the guess is correct
    //add one to the turn state
    const addNewGuess = (formattedGuess) => {
        if(currentGuess === solution) {
            setIsCorrect(true)
        }
        setGuesses((prevGuesses) => {
            let newGuesses = [...prevGuesses]
            newGuesses[turn] = formattedGuess
            return newGuesses
        })
        setHistory((prevHistory) => {
            return [...prevHistory, currentGuess]
        })
        setTurn((prevTurn) => {
            return prevTurn + 1
        })
        setUsedKeys((prevUsedKeys) => {
            let newKeys = {...prevUsedKeys}

            formattedGuess.forEach((l) => {
                const currentColor = newKeys[l.key]

                if (l.color === 'green') {
                    newKeys[l.key] = 'green'
                    return
                }
                if(l.color === 'yellow' && currentColor !== 'green') {
                    newKeys[l.key] = 'yellow'
                }
                if(l.color === 'grey' && currentColor !== 'green' && currentColor !== 'yellow') {
                    newKeys[l.key] = 'grey'
                    return
                }
            })
            return newKeys
        })
        setCurrentGuess('')
    }

    //handle Keyup event and track current guess
    //if user presses enter, add the new guess
    const handleKeyup = ({ key }) => {
        if (key === 'Enter') {
            //only add guess if turn less than 5
            if (turn > 5) {
                console.log('you used all your guesses')
                return
            }
            //do not allow duplicate words
            if (history.includes(currentGuess)) {
                console.log('that word is already used')
                return
            }
            //word must be 5 characters
            if (currentGuess.length !== 5) {
                console.log('word must be 5 characters long')
                return
            }
            const formatted = formatGuess()
            addNewGuess(formatted)
        }

        if (key === 'Backspace') {
            setCurrentGuess((prev) => {
                return prev.slice(0, -1)
            })
            return
        }

        if(/^[A-Za-z]$/.test(key)) {
            if(currentGuess.length < 5) {
                setCurrentGuess(prev => prev + key)
            }
        }

    }

    return {turn, currentGuess, guesses, isCorrect, handleKeyup, usedKeys}
}

export default useWordle;