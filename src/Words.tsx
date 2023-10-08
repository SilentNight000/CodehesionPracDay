import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getWords } from "./services/getWords";
import { getCategories } from "./services/getCategories";
import { addWord } from "./services/addWord";

const Words = () => {
  const { id } = useParams();
  const [words, setWords] = useState<{ id: number; name: string; categories: { id: number ; name: string}[] }[]>([]);
  const [categories, setCategories] = useState<{id:number,name:string}[]>([]);
  const [filteredWords, setFilteredWords] = useState<{ id: number; name: string; categories: { id: number ; name: string }[] }[]>([]);
  const [filteredCategory, setFilteredCategory ] = useState<{id:number,name:string}[]>([]);

  const [isCreateFormVisible, setIsCreateFormVisible] = useState(false);
  const [newWordID, setNewWordID] = useState("");

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

  const handleCreateClick = () => {
    setIsCreateFormVisible(true);
  }

  const handleFormSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const wordId = parseInt(newWordID, 10);
    // console.log(wordId);

    try {
      const response = await addWord(Number(id), wordId);
      console.log("Submitted data:", response);

      alert("Word Added");

      setNewWordID("");
      setIsCreateFormVisible(false);

      window.location.reload();
    } catch (error) {
      console.log("Adding failed", error);
      alert("Word Not Added");
    }
  };

  return (
    <>
      <div className="words-container">
        <h1>{categoryName}</h1>
        <h2>Words:</h2>
        <ul>
          {filteredWords.map((word) => (
            <li key={word.id} onClick={() => handleWordClick(word.id)}>
              {word.name}
            </li>
          ))}
        </ul>

        {isCreateFormVisible ? (
          <form onSubmit={handleFormSubmit}>
            <div>
              <label htmlFor="newWordID">Choose Word ID:</label>
              <input
                type="number"
                id="newWordID"
                value={newWordID}
                onChange={(e) => setNewWordID(e.target.value)}
                required
              />
            </div>
            <button type="submit">Create New</button>
          </form>
        ) : (
          <button onClick={handleCreateClick}>Create</button>
        )}
      </div>
    </>
  );
};

export default Words;
