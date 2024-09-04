import { useState } from "react";
import axios from "axios";
import Dropzone from "react-dropzone";
import "../index.css";
// import logo from "../assets/react.svg";
import { SparklesCore } from "../components/ui/sparkles.jsx";
import { Spotlight } from "./ui/Spotlight.jsx";
import logo from "../assets/ats 1.svg";

const App = () => {
  const [jobDescription, setJobDescription] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [response, setResponse] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleJobDescriptionChange = (e) => {
    setJobDescription(e.target.value);
  };

  const handleFileUpload = (files) => {
    setResumeFile(files[0]);
    setUploadSuccess(true);
  };

  const handleSubmit = async (promptType) => {
    if (!jobDescription || !resumeFile) {
      alert("Please provide both job description and resume file.");
      return;
    }

    const formData = new FormData();
    formData.append("jobDescription", jobDescription);
    formData.append("resume", resumeFile);
    formData.append("promptType", promptType);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/analyze",
        formData
      );
      setResponse(res.data.result);
    } catch (error) {
      console.error("Error:", error);
      setResponse("An error occurred while processing your request.");
    }
  };

  return (
    <div className="relative bg-black min-h-screen flex flex-col text-white overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid-white/[0.2] z-0"></div>

      {/* Spotlight effect in the background */}
      <Spotlight className="absolute inset-0" fill="white" />

      <div className="relative z-10 flex flex-col items-center justify-center overflow-hidden">
        <h1 className="md:text-5xl mt-20 text-3xl lg:text-6xl font-bold text-center relative z-20">
          ATS Resume System
        </h1>
        <div className="w-[40rem] h-40 relative">
          {/* Gradients */}
          <div className="absolute inset-x-0 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

          {/* Core component */}
          <SparklesCore
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={1200}
            className="w-full h-full"
            particleColor="#FFFFFF"
          />
        </div>
      </div>

      <div className="relative -mt-32 z-10 flex justify-between items-center p-8">
        <header className="flex-1 flex flex-col items-center">
          <div className="text-2xl font-bold mb-4">
            {/* Placeholder for TextGenerateEffect */}
          </div>
          <textarea
            className="w-full max-w-4xl h-40 p-4 rounded-lg mb-4 text-black text-lg shadow-lg resize-none"
            placeholder="Job Description"
            value={jobDescription}
            onChange={handleJobDescriptionChange}
          />

          <Dropzone onDrop={handleFileUpload}>
            {({ getRootProps, getInputProps }) => (
              <div
                {...getRootProps()}
                className="border-2 border-dashed border-gray-400 rounded-lg p-8 text-center cursor-pointer mb-4 transition-all duration-300 ease-in-out hover:bg-gray-800 hover:border-gray-300 hover:scale-105 hover:font-bold text-xl flex items-center justify-center animate-pulse"
              >
                <input {...getInputProps()} />
                {uploadSuccess ? (
                  <p className="transition-opacity duration-300 ease-in-out opacity-100">
                    PDF Uploaded Successfully ✅
                  </p>
                ) : (
                  <p className="transition-opacity duration-300 ease-in-out opacity-100">
                    Drag & drop a resume file, or click to select one
                  </p>
                )}
              </div>
            )}
          </Dropzone>

          {/* Buttons arranged in two rows */}
          <div className="flex flex-col gap-4 mt-10">
            <div className="flex gap-4">
              <button
                className="relative flex-1 border-2 border-gray-400 bg-transparent text-white px-6 py-3 rounded-full overflow-hidden group transition-all duration-300 ease-in-out"
                onClick={() => handleSubmit("tell_me_about_resume")}
              >
                <span className="relative z-10 font-semibold">
                  Tell Me About the Resume
                </span>
                <span className="absolute inset-0 border-2 border-gray-400 rounded-full animate-border"></span>
              </button>
              <button
                className="relative flex-1 border-2 border-gray-400 bg-transparent text-white px-6 py-3 rounded-full overflow-hidden group transition-all duration-300 ease-in-out"
                onClick={() => handleSubmit("suggest_missing_keywords")}
              >
                <span className="relative z-10 font-semibold">
                  Suggest Missing Keywords
                </span>
                <span className="absolute inset-0 border-2 border-gray-400 rounded-full animate-border"></span>
              </button>
              <button
                className="relative flex-1 border-2 border-gray-400 bg-transparent text-white px-6 py-3 rounded-full overflow-hidden group transition-all duration-300 ease-in-out"
                onClick={() => handleSubmit("percentage_match")}
              >
                <span className="relative z-10 font-semibold">
                  Percentage Match
                </span>
                <span className="absolute inset-0 border-2 border-gray-400 rounded-full animate-border"></span>
              </button>
            </div>
            <div className="flex gap-4">
              <button
                className="relative flex-1 border-2 border-gray-400 bg-transparent text-white px-6 py-3 rounded-full overflow-hidden group transition-all duration-300 ease-in-out"
                onClick={() => handleSubmit("improve_skills")}
              >
                <span className="relative z-10 font-semibold">
                  Suggestions to Improve Skills
                </span>
                <span className="absolute inset-0 border-2 border-gray-400 rounded-full animate-border"></span>
              </button>
              <button
                className="relative flex-1 border-2 border-gray-400 bg-transparent text-white px-6 py-3 rounded-full overflow-hidden group transition-all duration-300 ease-in-out"
                onClick={() => handleSubmit("overall_feedback")}
              >
                <span className="relative z-10 font-semibold">
                  Overall Resume Feedback
                </span>
                <span className="absolute inset-0 border-2 border-gray-400 rounded-full animate-border"></span>
              </button>
            </div>
          </div>

          {response && (
            <div className="mt-4">
              <h3>Response:</h3>
              <p>{response}</p>
            </div>
          )}
        </header>
        <img
          src={logo}
          alt="Logo"
          className="w-80 h-80 rounded-full object-cover ml-8 mb-64 mr-8"
        />
      </div>
    </div>
  );
};

export default App;
