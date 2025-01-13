import { useState } from "react";
import Markdown from "marked-react";
import { EyeOffIconSvg, EyeIconSvg } from "./Svg.jsx";

export function MarkdownText({
  setPreviewContent,
  content,
  isPreviewVisible,
  togglePreviewVisibility,
  setTextAreaContent,
}) {
  const [textAreaValue, setTextAreaValue] = useState(content);

  function handleClick(e) {
    setTextAreaContent(e.target.value);
    setPreviewContent(e.target.value);
  }

  function handleSubmitForm(e) {
    e.preventDefault();
  }

  return (
    <>
      <div className={`textArea ${isPreviewVisible ? "visible" : "hidden"}`}>
        <div className="markdownTitle">
          <h3>MARKDOWN</h3>
          <div className="markdownDesktop" onClick={togglePreviewVisibility}>
            {isPreviewVisible ? (
              <EyeIconSvg className="eyeIconSvg" />
            ) : (
              <EyeIconSvg className="eyeIconSvg" />
            )}
          </div>
        </div>
        <form onSubmit={handleSubmitForm}>
          <textarea
            name="message"
            className="markdownTextArea"
            value={content}
            onChange={handleClick}
          ></textarea>
        </form>
      </div>
    </>
  );
}

export function Preview({
  message,
  togglePreviewVisibility,
  isPreviewVisible,
}) {
  const screenWidth = window.innerWidth;
  const isSmallScreen = screenWidth < 768;
  return (
    <div
      className={`'previewArea' ${
        isPreviewVisible ? "isPreviewVisible" : "notPreviewVisible"
      }`}
    >
      <div className="previewTitle">
        <h3>PREVIEW</h3>
        <div className="icon-container" onClick={togglePreviewVisibility}>
          {isSmallScreen ? (
            isPreviewVisible ? (
              <EyeOffIconSvg className="eyeOffIconSvg" />
            ) : (
              <EyeIconSvg className="eyeIconSvg" />
            )
          ) : !isPreviewVisible ? (
            <EyeOffIconSvg className="eyeOffIconSvg" />
          ) : (
            <EyeIconSvg className="eyeIconSvg" />
          )}
        </div>
      </div>
      <div className="previewText">
        <Markdown>{message}</Markdown>
      </div>
    </div>
  );
}
