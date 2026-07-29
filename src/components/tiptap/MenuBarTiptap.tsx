'use client';

import {
  Bold,
  Image,
  Italic,
  Link,
  Minus,
  ListOrdered,
  Strikethrough,
  List,
} from 'lucide-react';
import { Button, Space } from 'antd';
import { useCallback } from 'react';

export default function MenuBarTiptap({ editor, isImage }: { editor: any; isImage?: boolean }) {
  const addImage = useCallback(() => {
    let url = window.prompt('URL');

    if (url) {
      // check if url image is from drive or not
      // if the url is from drive
      // example https://drive.google.com/file/d/1lP_QYwvfsakDBWqfqa5Q-dg9GF_SNTZr/view?usp=sharing
      // change to
      // https://drive.google.com/thumbnail?id=1lP_QYwvfsakDBWqfqa5Q-dg9GF_SNTZr&sz=w120-h200
      const driveFileId = url.match(/\/d\/(.+?)\//)?.[1];
      if (driveFileId) {
        url = `https://drive.google.com/thumbnail?id=${driveFileId}&sz=w140-h220`;
      } else {
        // check if url is a valid image url
        const isValidImageUrl = /\.(jpeg|jpg|gif|png|webp|bmp|svg)(\?.*)?$/i.test(url);
        if (!isValidImageUrl) {
          alert('Please enter a valid image URL');
          return;
        }
      }

      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href;
    let url = window.prompt('URL', previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();

      return;
    }

    url = url.startsWith('http://') || url.startsWith('https://') ? url : `https://${url}`;
    // update link
    editor.chain().focus().extendMarkRange('link').setLink({ href: url, target: '_blank' }).run();
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="control-group">
      <Space className="w-full button-group" wrap size="small">
        <Button
          onClick={() => editor.chain().focus().toggleBold().run()}
          type={editor.isActive('bold') ? 'primary' : 'default'}
          icon={<Bold />}
        />
        <Button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          type={editor.isActive('italic') ? 'primary' : 'default'}
          icon={<Italic />}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
        />
        <Button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          icon={<List />}
          type={editor.isActive('bulletList') ? 'primary' : 'default'}
        />
        <Button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          icon={<ListOrdered />}
          type={editor.isActive('orderedList') ? 'primary' : 'default'}
        />
        <Button onClick={() => editor.chain().focus().setHorizontalRule().run()} icon={<Minus />} />
        <Button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          type={editor.isActive('heading', { level: 1 }) ? 'primary' : 'default'}
        >
          H1
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          type={editor.isActive('heading', { level: 2 }) ? 'primary' : 'default'}
        >
          H2
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          type={editor.isActive('heading', { level: 3 }) ? 'primary' : 'default'}
        >
          H3
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          type={editor.isActive('strike') ? 'primary' : 'default'}
          icon={<Strikethrough />}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
        />
        <Button
          type={editor.isActive('link') ? 'primary' : 'default'}
          onClick={setLink}
          className={editor.isActive('link') ? 'is-active' : ''}
          icon={<Link />}
        />
        {isImage && (
          <Button
            icon={<Image />}
            onClick={addImage}
            disabled={!editor.can().chain().focus().setImage().run()}
          />
        )}
      </Space>
    </div>
  );
}
