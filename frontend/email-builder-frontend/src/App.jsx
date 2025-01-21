import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [layout, setLayout] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [footer, setFooter] = useState("");

  useEffect(() => {
    axios.get("/getEmailLayout").then((response) => {
      setLayout(response.data);
    });
  }, []);

  const updatedLayout = layout
    .replace("{{Title}}", title)
    .replace("{{Content}}", content)
    .replace("{{Footer}}", footer);

  return (
    <div>
      <h1>Email Builder</h1>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label>Content:</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      </div>
      <div>
        <label>Footer:</label>
        <input
          type="text"
          value={footer}
          onChange={(e) => setFooter(e.target.value)}
        />
      </div>
      <h2>Preview:</h2>
      <div dangerouslySetInnerHTML={{ __html: updatedLayout }} />
    </div>
  );
};

export default App;
