import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getWords } from "./services/getWords";
import { getCategories } from "./services/getCategories";

const Words = () => {
  const { id } = useParams();
  const [words, setWords] = useState<{ id: number; name: string; categories: { id: number ; name: string}[] }[]>([]);
  const [categories, setCategories] = useState<{id:number,name:string}[]>([]);
  const [filteredWords, setFilteredWords] = useState<{ id: number; name: string; categories: { id: number ; name: string }[] }[]>([]);
  const [filteredCategory, setFilteredCategory ] = useState<{id:number,name:string}[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getWords();
        const data = response.items;

        const cResponse = await getCategories();
        const cData = cResponse.data;

        setCategories(cData);
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

    const cFiltered = categories.filter((category) => category.id === Number(id));
    setFilteredCategory(cFiltered);
  }, [categories, id, words]);

  const handleWordClick = (wordId: number) => {
    console.log("Word ID: ", wordId);
  };

  const categoryName = filteredCategory.length > 0 ? filteredCategory[0].name : "";

  return (
    <>
      <div className="words-container">
        <h1>Category: { categoryName }</h1>
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
