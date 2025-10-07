import type { Editor } from '@tiptap/react'
import { useEditorState } from '@tiptap/react'
import React from 'react'
import { Button } from '@/components/ui/button'

export default function MenuBar({ editor }: { editor: Editor }) {
  const editorState = useEditorState({
    editor,
    selector: ctx => {
      if (!ctx.editor) {
        return {
          isBold: false,
          canBold: false,
          isItalic: false,
          canItalic: false,
          isStrike: false,
          canStrike: false,
          isCode: false,
          canCode: false,
          canClearMarks: false,
          isParagraph: false,
          isHeading1: false,
          isHeading2: false,
          isHeading3: false,
          isHeading4: false,
          isHeading5: false,
          isHeading6: false,
          isBulletList: false,
          isOrderedList: false,
          isCodeBlock: false,
          isBlockquote: false,
          canUndo: false,
          canRedo: false,
        }
      }

      return {
        isBold: ctx.editor.isActive('bold') ?? false,
        canBold: ctx.editor.can().chain().toggleBold().run() ?? false,
        isItalic: ctx.editor.isActive('italic') ?? false,
        canItalic: ctx.editor.can().chain().toggleItalic().run() ?? false,
        isStrike: ctx.editor.isActive('strike') ?? false,
        canStrike: ctx.editor.can().chain().toggleStrike().run() ?? false,
        isCode: ctx.editor.isActive('code') ?? false,
        canCode: ctx.editor.can().chain().toggleCode().run() ?? false,
        canClearMarks: ctx.editor.can().chain().unsetAllMarks().run() ?? false,
        isParagraph: ctx.editor.isActive('paragraph') ?? false,
        isHeading1: ctx.editor.isActive('heading', { level: 1 }) ?? false,
        isHeading2: ctx.editor.isActive('heading', { level: 2 }) ?? false,
        isHeading3: ctx.editor.isActive('heading', { level: 3 }) ?? false,
        isHeading4: ctx.editor.isActive('heading', { level: 4 }) ?? false,
        isHeading5: ctx.editor.isActive('heading', { level: 5 }) ?? false,
        isHeading6: ctx.editor.isActive('heading', { level: 6 }) ?? false,
        isBulletList: ctx.editor.isActive('bulletList') ?? false,
        isOrderedList: ctx.editor.isActive('orderedList') ?? false,
        isCodeBlock: ctx.editor.isActive('codeBlock') ?? false,
        isBlockquote: ctx.editor.isActive('blockquote') ?? false,
        canUndo: ctx.editor.can().chain().undo().run() ?? false,
        canRedo: ctx.editor.can().chain().redo().run() ?? false,
      }
    },
  })

  return (
    <div className="flex flex-wrap items-center gap-1 p-3 border-b bg-muted/50 rounded-t-lg">
        <Button
          variant={editorState.isBold ? "default" : "outline"}
          size="sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editorState.canBold}
          className="font-bold min-w-9 h-9"
        >
          B
        </Button>
        <Button
          variant={editorState.isItalic ? "default" : "outline"}
          size="sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editorState.canItalic}
          className="italic min-w-9 h-9"
        >
          I
        </Button>
        <Button
          variant={editorState.isStrike ? "default" : "outline"}
          size="sm"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editorState.canStrike}
          className="line-through min-w-9 h-9"
        >
          S
        </Button>
        <Button
          variant={editorState.isCode ? "default" : "outline"}
          size="sm"
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editorState.canCode}
          className="font-mono text-xs min-w-9 h-9"
        >
          {'</>'}
        </Button>

        <Button
          variant={editorState.isParagraph ? "default" : "outline"}
          size="sm"
          onClick={() => editor.chain().focus().setParagraph().run()}
          className="min-w-9 h-9"
        >
          P
        </Button>
        {[1, 2, 3, 4, 5, 6].map(level => (
          <Button
            key={level}
            variant={editorState[`isHeading${level}` as keyof typeof editorState] ? "default" : "outline"}
            size="sm"
            onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
            className="min-w-9 h-9 font-semibold"
          >
            H{level}
          </Button>
        ))}

        <Button
          variant={editorState.isBulletList ? "default" : "outline"}
          size="sm"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className="min-w-9 h-9"
        >
          • List
        </Button>
        <Button
          variant={editorState.isOrderedList ? "default" : "outline"}
          size="sm"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className="min-w-9 h-9"
        >
          1. List
        </Button>

        <Button
          variant={editorState.isCodeBlock ? "default" : "outline"}
          size="sm"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        >
          Code Block
        </Button>
        <Button
          variant={editorState.isBlockquote ? "default" : "outline"}
          size="sm"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          Quote
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          HR
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => editor.chain().focus().setHardBreak().run()}
        >
          Break
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => editor.chain().focus().unsetAllMarks().run()}
          disabled={!editorState.canClearMarks}
        >
          Clear Marks
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => editor.chain().focus().clearNodes().run()}
        >
          Clear Nodes
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editorState.canUndo}
        >
          Undo
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editorState.canRedo}
        >
          Redo
        </Button>
      </div>
  )
}