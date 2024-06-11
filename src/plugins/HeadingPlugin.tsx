import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $createHeadingNode,
  HeadingTagType,
  $createQuoteNode,
} from "@lexical/rich-text";
import { $setBlocksType } from "@lexical/selection";
import {
  $isListNode,
  INSERT_CHECK_LIST_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  ListNode,
} from "@lexical/list";
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  SELECTION_CHANGE_COMMAND,
} from "lexical";
import PopupMenu from "../components/PopupMenu";
import { useHeadingContext } from "../context/HeadingContext";
interface HeadingProps {
  headings: boolean;
  showHeading: (headings: boolean) => void;
}
export default function HeadingPlugin({ showHeading }: HeadingProps) {
  const [editor] = useLexicalComposerContext();
  const { setHeading } = useHeadingContext();
  function headingFormat(headingSize: HeadingTagType, heading: string) {
    editor.update(() => {
      setHeading(heading);
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createHeadingNode(headingSize));
      }
    });
  }
  const formatParagraph = () => {
    setHeading("normal");
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createParagraphNode());
      }
    });
  };
  return (
    <div className="headings">
      <PopupMenu className="align-heading">
        <button
          onClick={() => {
            formatParagraph();
            showHeading(false);
          }}
          className="toolbar-item spaced"
        >
          {" "}
          <i className={`format normal`} />
          <span className="text toolbar-item spaced">Normal</span>
        </button>
        <button
          onClick={() => {
            headingFormat("h1", "heading1");
            showHeading(false);
          }}
          className="toolbar-item spaced"
        >
          <i className={`format heading1`} />
          <span className="text toolbar-item spaced dropdown-button-text ">
            Heading 1
          </span>
        </button>
        <button
          onClick={() => {
            headingFormat("h2", "heading2");
            showHeading(false);
          }}
          className="toolbar-item spaced"
        >
          {" "}
          <i className={`format heading2`} />
          <span className="text toolbar-item spaced">Heading 2</span>
        </button>
        <button
          onClick={() => {
            headingFormat("h3", "heading3");
            showHeading(false);
          }}
          className="toolbar-item spaced"
          aria-label="Right Align"
        >
          <i className={`format heading3`} />
          <span className="text toolbar-item spaced">Heading 3</span>
        </button>
        <button
          onClick={() => {
            editor.update(() => {
              const selection = $getSelection();
              $setBlocksType(selection, () => $createQuoteNode());
            });
            showHeading(false);
            setHeading("quote");
          }}
          className="toolbar-item spaced"
          aria-label="Right Align"
        >
          <i className={`format quote`} />
          <span className="text toolbar-item spaced">Quote</span>
        </button>
        <button
          onClick={() => {
            editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
            showHeading(false);
            setHeading("bullet");
          }}
          className="toolbar-item spaced"
          aria-label="Right Align"
        >
          <i className={`format bullet`} />
          <span className="text toolbar-item spaced">Bullet</span>
        </button>
        <button
          onClick={() => {
            editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
            showHeading(false);
            setHeading("numberdlist");
          }}
          className="toolbar-item spaced"
          aria-label="Right Align"
        >
          <i className={`format bullet`} />
          <span className="text toolbar-item spaced">Numbered List</span>
        </button>
      </PopupMenu>
    </div>
  );
}
