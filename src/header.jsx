import { useState } from "react";
import Hamburger from "hamburger-react";
import { TrashBtnIconSvg, DocumentIconSvg, SaveBtnIconSvg } from "./Svg.jsx";

export const HamburgerReact = ({ toggleMenu }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    toggleMenu();
    if (!isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };

  return (
    <div className="hamburger-wrapper">
      <Hamburger
        size={23}
        className="hamburgerIcon"
        toggled={isOpen}
        toggle={handleToggle}
      />
    </div>
  );
};

export default function Header({
  content,
  documents,
  setDocuments,
  toggleMenu,
  handleTrashBtn,
  selectedDocument,
}) {
  const [fileName, setFileName] = useState("");

  function handleSave() {
    const newDocument = {
      id: Date.now(),
      name: fileName.endsWith(".md") ? fileName : `${fileName}.md`,
      content: content,
      createdAt: new Date().toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    };

    const updatedDocuments = [...documents, newDocument];
    setDocuments(updatedDocuments);

    localStorage.setItem("documents", JSON.stringify(updatedDocuments));
    alert("Belge başarıyla kaydedildi!");
  }

  function handleFileNameChange(e) {
    setFileName(e.target.value);
  }

  return (
    <div className="header">
      <div className="documents">
        <div className="documentInfo">
          <HamburgerReact toggleMenu={toggleMenu} />
          <div className="documentName">
            <h2>MARKDOWN</h2>
            <DocumentIconSvg className="documentIconSvg" />
            <div className="documentNameInput">
              {selectedDocument ? (
                <>
                  <h6 className="docName">Document Name</h6>
                  <input
                    type="text"
                    placeholder={selectedDocument.name}
                    onChange={(e) => {
                      const updatedDocument = {
                        ...selectedDocument,
                        name: e.target.value,
                      };
                      setFileName(e.target.value);
                      setDocuments(
                        documents.map((doc) =>
                          doc.id === selectedDocument.id ? updatedDocument : doc
                        )
                      );
                    }}
                  />
                </>
              ) : (
                <>
                  <h6 className="docName">Document Name</h6>
                  <input
                    type="text"
                    placeholder="Document Title"
                    value={fileName}
                    onChange={handleFileNameChange}
                  />
                </>
              )}
            </div>
          </div>
        </div>
        <div className="deleteAndSave">
          <div
            className="deleteBtn"
            onClick={() => handleTrashBtn(selectedDocument)}
          >
            <TrashBtnIconSvg className="trashBtnIconSvg" />
          </div>
          <div className="saveBtn">
            <button onClick={handleSave}>
              <SaveBtnIconSvg className="saveBtnIconSvg" />
              <span className="bigScreen">Save Changes</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
