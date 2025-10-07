'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import MenuBar from './menu-bar'

export default function RichTextEditor() {
const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Hello World! 🌎️</p>',
    immediatelyRender: false,
    editorProps: {
        attributes: { 
            class: 'min-h-[256px] border rounded-md bg-slate-50 py-2 px-3'
        }
    },
  })

  if (!editor) {
    return <div>Loading editor...</div>
  }

  return (
    <div>
        <MenuBar editor={editor} />
        <EditorContent editor={editor} />
    </div>
)
}
