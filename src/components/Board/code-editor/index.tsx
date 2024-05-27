"use client";

import * as Y from "yjs";
import { yCollab } from "y-codemirror.next";
import { EditorView, basicSetup } from "codemirror";
import { EditorState } from "@codemirror/state";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { useCallback, useEffect, useState } from "react";
import LiveblocksProvider from "@liveblocks/yjs";
import { TypedLiveblocksProvider, useRoom, useSelf } from "@/liveblocks.config";
import { coolGlow, rosePineDawn } from "thememirror";
import { Room } from "../Room";
import { useTheme } from "next-themes";
import { SiJavascript, SiPython } from "react-icons/si";
import { DownloadButton } from "./download-button";
import { RunButton } from "./run-button";

interface CodeEditorProps {
  roomId: string;
}

export default function CodeEditor({ roomId }: CodeEditorProps) {
  return (
    <Room roomId={roomId} fallback="Loading...">
      <Editor />
    </Room>
  );
}

function Editor() {
  const room = useRoom();
  const [element, setElement] = useState<HTMLElement>();
  const { resolvedTheme } = useTheme();

  // Get user info from Liveblocks authentication endpoint
  const userInfo = useSelf((me) => me.info);

  const ref = useCallback((node: HTMLElement | null) => {
    if (!node) return;
    setElement(node);
  }, []);

  useEffect(() => {
    let provider: TypedLiveblocksProvider;
    let ydoc: Y.Doc;
    let view: EditorView;

    if (!element || !room || !userInfo) {
      return;
    }

    // Create Yjs provider and document
    ydoc = new Y.Doc();
    provider = new LiveblocksProvider(room as any, ydoc);
    const ytext = ydoc.getText("codemirror");

    // Attach user info to Yjs
    provider.awareness.setLocalStateField("user", {
      name: userInfo.name,
      color: userInfo.color,
      colorLight: userInfo.color + "80", // 6-digit hex code at 50% opacity
    });

    // Set up CodeMirror and extensions
    const state = EditorState.create({
      doc: ytext.toString(),

      extensions: [
        basicSetup,
        resolvedTheme == "dark" ? coolGlow : rosePineDawn,
        javascript(),
        yCollab(ytext, provider.awareness),
      ],
    });

    // Attach CodeMirror to element
    view = new EditorView({
      state,
      parent: element,
    });

    return () => {
      ydoc?.destroy();
      provider?.destroy();
      view?.destroy();
    };
  }, [element, room, userInfo, resolvedTheme]);

  return (
    <>
      <div className="w-full h-8 flex items-center justify-between px-6">
        <span className="flex items-center h-full gap-2">
          <SiJavascript className="text-slate-600" />
          <span className="text-slate-600 text-sm select-none">index.js</span>
        </span>
        <span className="flex items-center h-full gap-2">
          <RunButton />
          <DownloadButton />
        </span>
      </div>
      <div className="flex flex-col relative w-full h-full overflow-hidden text-base bg-[#faf4ed] dark:bg-[#060521]">
        <div className="overflow-auto relative flex-grow" ref={ref}></div>
      </div>
    </>
  );
}
