'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import React, { useEffect, useState } from 'react';
import MenuBarTiptap from './MenuBarTiptap';
import FormItem from 'antd/es/form/FormItem';
import { FormInstance, Input } from 'antd';

export default function Tiptap({
  id,
  form,
  fValue,
  placeholder,
  disabled = false,
  className = 'w-full',
  nameList,
  formItemProps,
  uploadImage = false,
  withoutHeader = false,
}: {
  form: FormInstance;
  id?: string | number;
  fValue?: any;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  nameList?: any[];
  formItemProps?: React.ComponentProps<typeof FormItem>;
  uploadImage?: boolean;
  withoutHeader?: boolean;
}) {
  const [touched, setTouched] = useState(false);

  const editor = useEditor(
    {
      extensions: [
        StarterKit,
        Image,
        Link,
        Placeholder.configure({
          placeholder: placeholder ?? '',
        }),
      ],
      editorProps: {
        attributes: {
          spellcheck: 'false',
        },
      },
      onUpdate({ editor }) {
        if (editor.getHTML() !== fValue && !touched) {
          setTouched(true);
        }
        if (nameList) {
          form.setFieldValue(nameList, editor.getHTML());
        }
        if (formItemProps && formItemProps.name) {
          form.setFieldValue(formItemProps.name, editor.getHTML());
        }
      },
    },
    []
  );

  useEffect(() => {
    if (!touched && fValue) {
      editor?.commands.setContent(fValue, {
        parseOptions: {
          preserveWhitespace: 'full'
        },
      });
    } else if (touched && !fValue) {
      setTouched(false);
    } else if (!fValue) {
      editor?.commands.clearContent();
    }
  }, [touched, fValue, editor]);

  return (
    <>
      <FormItem key={id} label={formItemProps?.label} rules={formItemProps?.rules} className={className}>
        {!withoutHeader && <MenuBarTiptap isImage={uploadImage} editor={editor} />}
        <EditorContent editor={editor} />
        <FormItem hidden {...formItemProps}>
          <Input placeholder={placeholder} disabled={disabled} className="w-full" />
        </FormItem>
      </FormItem>
    </>
  );
}
