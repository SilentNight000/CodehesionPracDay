import { useEffect, useState } from "react";
import { getTags } from "./services/getTags";
import { createTag } from "./services/createTag";
import { updateTag } from "./services/updateTag";
import { deleteTag } from "./services/deleteTag";

const Tags = () => {
    const [ tags, setTags ] = useState<{id: number, name: string, color: string}[]>([]);

    const [isCreateFormVisible, setIsCreateFormVisible] = useState(false);
    const [newTagName, setNewTagName] = useState("");
    const [newTagColor, setNewTagColor] = useState("");

    useEffect(() => {
        async function fetchData() {
        try {
            const response = await getTags();
            const data = response;
            // console.log(data);
            setTags(data);
        } catch (error) {
            console.error("Error fetching tags:", error);
        }
    }

        fetchData();
    }, []);

    const handleCreateClick = () => {
        setIsCreateFormVisible(true);
    }

    const handleFormSubmit = async (e: { preventDefault: () => void }) => {
      e.preventDefault();

        try {
            const response = await createTag(newTagName, newTagColor);
            console.log("Submitted data:", response);

            alert("Tag Created");

            setNewTagName("");
            setNewTagColor("");
            setIsCreateFormVisible(false);

            window.location.reload();
        } catch (error) {
            console.log("Creation failed", error);
            alert("Tag Not Created");
        }
    };

    const handleUpdateClick = async (id: number) => {
      const newName = prompt("Enter new name:");
      if (newName !== null) {
        const newColor = prompt("Enter new color:");
        if (newColor !== null) {
          await updateTag(id, newName, newColor)
            .then((response) => {
              console.log("Updated tag:", response);
              alert("Tag Updated");
            })
            .catch((error) => {
              console.error("Update failed:", error);
              alert("Tag Not Updated");
            });
        }
      }

      window.location.reload();
    };

    const handleDeleteClick = async (id: number) => {
        await deleteTag(id);

        alert("Tag Deleted");

        window.location.reload();
    }


    return (
      <div className="tags-container">
        <h1>Tags</h1>
        <ul>
          {tags.map((tag) => (
            <>
              <li key={tag.id}>
                {tag.name}
                <div
                  style={{
                    width: "20px",
                    height: "20px",
                    backgroundColor: tag.color,
                    display: "inline-block",
                    marginLeft: "10px",
                  }}
                ></div>
              </li>
              <button onClick={() => handleUpdateClick(tag.id)}>Update</button>
              <button onClick={() => handleDeleteClick(tag.id)}>Delete</button>
            </>
          ))}
        </ul>

        <h2>Create Tag:</h2>
        {isCreateFormVisible ? (
          <form onSubmit={handleFormSubmit}>
            <div>
              <label htmlFor="newTagName">Name:</label>
              <input
                type="text"
                id="newTagName"
                value={newTagName}
                onChange={(e) => setNewTagName(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="newTagColor">Color:</label>
              <input
                type="text"
                id="newTagColor"
                value={newTagColor}
                onChange={(e) => setNewTagColor(e.target.value)}
                required
              />
            </div>
            <button type="submit">Create New</button>
          </form>
        ) : (
          <button onClick={handleCreateClick}>Create</button>
        )}
      </div>
    );
}

export default Tags;