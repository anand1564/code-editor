import { Editor } from "@monaco-editor/react";
import { useState } from "react";
import handleCompile from "../controllers/handleCompile";

const CodeEditor = () => {
  const [value, setValue] = useState("");
  const [output, setOutput] = useState("");  

  const handleEditorChange = (value) => {
    setValue(value);
  };

  const runCode = async () => {
    const result = await handleCompile(value);
    setOutput(result);
  };

  return (
    <div className="w-full min-h-screen overflow-hidden rounded-lg flex flex-row">
      <div className="w-1/2 h-full flex flex-col">
        <Editor
          height={"100vh"}
          width={"100%"}
          defaultLanguage="javascript"  
          defaultValue="//This is a comment"
          onChange={handleEditorChange}
        />
        <button onClick={runCode} className="bg-blue-500 text-white p-2 rounded-lg">
          Run
        </button>
      </div>
      <div className="w-1/2 h-full bg-gray-500">
        <h1 className="text-black text-center">Output</h1>
        <pre className="text-white p-4">{output}</pre> 
      </div>
    </div>
  );
};

export default CodeEditor;
