import { useState, useEffect } from "react";
import { Characters } from "./components/characters";
import { api } from "./services/api";
import { GlobalStyle } from "./styles/global/global";


function App() {
  const [characterList, setCharacterList] = useState([])
  const [count, setCount] = useState(1)
  const [isNextDisabled, setIsNextDisabled] = useState(false)
  const [isPreviousDisabled, setIsPreviousDisabled] = useState(true)
  const [lastPage, setLastPage] = useState(0)

  const next = () => {

    setCount(count + 1)

  }

  const previous = () => {

    setCount(count -1)

  }

  const theLastPage = () => {

    setCount(lastPage)

  }

  const theFirstPage = () => {

    setCount(1)

  }
  
  useEffect(() => {

    api
    .get(`/character/?page=${count}`)
    .then((response) => {
      const { results } = response.data;
      const { next,previous,pages } = response.data.info;
      setLastPage(pages)
      setIsNextDisabled(next)
      setIsPreviousDisabled(previous)
      setCharacterList(results)
    })
    .catch((err) => console.error(err))
  }, [count])
  
  return (
    <>
      <GlobalStyle />
      <Characters
        firstPage={count > 2 && theFirstPage}
        lastPage={isNextDisabled && theLastPage}
        nextPage={isNextDisabled && next}
        previousPage={isPreviousDisabled && previous}
        characterList={characterList}
      />
    </>
  );
}

export default App;
