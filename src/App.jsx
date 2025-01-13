import { useState, useRef } from "react";
import Header from "./header";
import { MarkdownText, Preview } from "./MarkDown";
import { DocumentIconSvg } from "./Svg.jsx";
import { LightModeSvg, DarkModeSvg } from "./Svg.jsx";

function App() {
  const savedDocuments = JSON.parse(localStorage.getItem("documents")) || [];
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true" ? true : false
  );
  const [documents, setDocuments] = useState(savedDocuments);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [previewContent, setPreviewContent] = useState("");
  const [textAreaContent, setTextAreaContent] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const dialogRef = useRef(null);

  function toggleMenu() {
    setIsMenuOpen((x) => !x);
  }

  function handleDocumentClick(doc) {
    setPreviewContent(doc.content);
    setTextAreaContent(doc.content);
    setSelectedDocument(doc);
  }

  function handleTrashBtn(doc) {
    dialogRef.current.showModal();
    setPreviewContent(doc.content);
  }

  function handleDelete() {
    const updatedDocuments = documents.filter((doc) => doc.content !== previewContent); // Belgeyi içerik üzerinden filtreliyoruz
    setDocuments(updatedDocuments);
    setSelectedDocument(null);
    localStorage.setItem("documents", JSON.stringify(updatedDocuments));
  
  
    if (previewContent) {
      setTextAreaContent("");
      setPreviewContent("");
    }
  
    dialogRef.current.close(); 
  }
  
  function handleNewDocBtn() {
    setTextAreaContent("");
    setPreviewContent("");
  }

  function togglePreviewVisibility() {
    setIsPreviewVisible(!isPreviewVisible);
  }

  const screenWidth = window.innerWidth;
  const isSmallScreen = screenWidth < 768;

  const savedDarkMode = JSON.parse(localStorage.getItem("darkMode"));
  if (savedDarkMode) {
    document.body.classList.add("dark-mode");
  }

  function changeDarkMode() {
    const currentDarkMode = !darkMode;
    setDarkMode(currentDarkMode);
    localStorage.setItem("darkMode", currentDarkMode);

    if (currentDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }

  return (
    <div className={`App ${isMenuOpen ? "menuOpen" : ""}`}>
      <Header
        content={previewContent}
        documents={documents}
        setDocuments={setDocuments}
        toggleMenu={toggleMenu}
        handleTrashBtn={handleTrashBtn}
        selectedDocument={selectedDocument}
      />
      <div className="textContent">
        {isSmallScreen ? (
          <>
            <div className="markdownPreviewWrapper">
              {!isPreviewVisible && (
                <MarkdownText
                  setPreviewContent={setPreviewContent}
                  togglePreviewVisibility={togglePreviewVisibility}
                  isPreviewVisible={isPreviewVisible}
                  content={textAreaContent}
                  setTextAreaContent={setTextAreaContent}
                />
              )}

              {isPreviewVisible && (
                <Preview
                  message={previewContent}
                  togglePreviewVisibility={togglePreviewVisibility}
                  isPreviewVisible={isPreviewVisible}
                />
              )}
            </div>
          </>
        ) : (
          <>
            {!isPreviewVisible && (
              <Preview
                message={previewContent}
                togglePreviewVisibility={togglePreviewVisibility}
                isPreviewVisible={isPreviewVisible}
              />
            )}

            {isPreviewVisible && (
              <>
                <MarkdownText
                  setPreviewContent={setPreviewContent}
                  isPreviewVisible={isPreviewVisible}
                  togglePreviewVisibility={togglePreviewVisibility}
                  setTextAreaContent={setTextAreaContent}
                  content={textAreaContent}
                  key={textAreaContent}
                />
                <Preview
                  message={previewContent}
                  togglePreviewVisibility={togglePreviewVisibility}
                  isPreviewVisible={isPreviewVisible}
                />
              </>
            )}
          </>
        )}
      </div>

      <div className={`overlay ${isMenuOpen ? "open" : ""}`}>
        <div className="documentList">
          <h2>MARKDOWN</h2>
          <h4>MY DOCUMENTS</h4>
          <button onClick={handleNewDocBtn} className="newDocBtn">
            + New Document
          </button>
          <ul className="documentsList">
            {documents.map((doc, index) => (
              <li key={doc.id || index}>
                <button
                  className="docBtn"
                  onClick={() => handleDocumentClick(doc)}
                >
                  <DocumentIconSvg className="documentIconSvg" />
                  <div className="docNameText">
                    <h6>{doc.createdAt}</h6>
                    <span>{doc.name}</span>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <label className="theme-switch">
            <LightModeSvg className={!darkMode ? "icon-light" : "icon-dark"} />
            <input
              className="switch"
              type="checkbox"
              checked={darkMode}
              onChange={changeDarkMode}
            />
            <DarkModeSvg className={darkMode ? "icon-light" : "icon-dark"} />
          </label>
      </div>
      <DeleteDialog dialogRef={dialogRef} handleDelete={handleDelete} />
    </div>
  );
}

function DeleteDialog({ dialogRef, handleDelete }) {
  const handleDialogClick = (e) => {
    if (e.target === dialogRef.current) {
      dialogRef.current.close();
    }
  };
  return (
    <>
    <dialog ref={dialogRef} className="delete-dialog" onClick={(e) => handleDialogClick(e)}>
      <div className="dialog-container">
        <h3>Delete this document?</h3>
        <p>Are you sure you want to delete the document and its contents? This action cannot be reversed.</p>
        <button className="delete-dialog-btn" onClick={handleDelete}>
          Confirm & Delete
        </button>
      </div>
    </dialog>
    </>
  );
}



export default App;


