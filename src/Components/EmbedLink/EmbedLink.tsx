import { useCallback, useState } from "react";
import { sanitizeUrl } from "../../utils/url";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $isLinkNode, TOGGLE_LINK_COMMAND } from "@lexical/link";
import PopupMenu from "../PopupMenu";
import "../TextInput/Input.css";
import { $getSelection } from "lexical";
export default function EmbedLink() {
  const [isLink, setIsLink] = useState(false);
  const [editor] = useLexicalComposerContext();
  const [urlInput, setUrlInput] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleInputChange = (e: any) => {
    setUrlInput(e?.target?.value);
  };
  const insertLink = useCallback(() => {
    if (!isLink && urlInput.trim() !== "") {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, sanitizeUrl(urlInput));
      setShowPopup(false);
    } else {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
    }
  }, [editor, isLink, urlInput]);

  return (
    <>
      <button
        onClick={() => setShowPopup(!showPopup)}
        className={"toolbar-item spaced "}
        aria-label="Format Link"
      >
        <i className="format link" />
      </button>
      {showPopup && (
        <PopupMenu className="align-link">
          <div className="link-popup ">
            <input
              className="Input__input"
              type="text"
              value={urlInput}
              onChange={handleInputChange}
              placeholder="Enter the URL"
            />
            <button
              onClick={insertLink}
              className="toolbar-item icon block-type "
            >
              <i className={`format plus`} />
            </button>
            <button
              onClick={() => setShowPopup(false)}
              className="toolbar-item icon block-type "
            >
              <i className={`format close`} />
            </button>
          </div>
        </PopupMenu>
      )}
    </>
  );
}
