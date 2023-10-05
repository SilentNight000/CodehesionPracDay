import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getWords } from "./services/getWords";

const Words = () => {
  const { id } = useParams();
  const [words, setWords] = useState<{ id: number; name: string; categories: { id: number ; name: string}[] }[]>([]);
  const [filteredWords, setFilteredWords] = useState<{ id: number; name: string; categories: { id: number ; name: string }[] }[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getWords();
        const data = response.items;
        setWords(data);
      } catch (error) {
        console.error("Error fetching words:", error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    const filtered = words.filter((word) => word.categories.some((category) => category.id === Number(id)));
    setFilteredWords(filtered);
  }, [id, words]);

  const handleWordClick = (wordId: number) => {
    console.log("Word ID: ", wordId);
  };

  return (
    <>
      <div className="words-container">
        <h1>{ id }</h1>
        <h2>Words:</h2>
        <ul>
          {filteredWords.map((word) => (
            <li key={word.id} onClick={() => handleWordClick(word.id)}>
              {word.name}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Words;
