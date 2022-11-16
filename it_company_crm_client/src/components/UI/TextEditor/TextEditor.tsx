import React, {useEffect, useState} from 'react';
import ReactQuill, { Quill } from 'react-quill';
import {useTheme} from "@mui/material/styles";
//@ts-ignore
import hljs from 'highlight.js'

hljs.configure({
    languages: ['javascript', 'ruby', 'python', 'rust'],
})

const TextEditor : React.FC<{
        width?: string,
        height?: string,
        onChange: (content: any) => void,
        placeholder?: string,
        value: any
    }>
    = ({width, height, onChange, placeholder, value}) => {

    const [modules, setModules] = useState<any>({
        toolbar: [
            [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],
            [{ header: '1' }, { header: '2' }, { font: [] }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [
                { list: 'ordered' },
                { list: 'bullet' },
                { indent: '-1' },
                { indent: '+1' }
            ],
            ['link', 'image', 'video'],
            ['clean'],
            ['code-block'],
        ],
        clipboard: {
            // toggle to add extra line breaks when pasting HTML:
            matchVisual: false
        },
        syntax: {
            highlight: (text: any) => hljs.highlightAuto(text).value,
        }
    });

    const handleChange = (html: any) => {
        onChange(html);
    }

    /*
     * Quill editor formats
     * See https://quilljs.com/docs/formats/
     */
    const [formats, setFormats] = useState<string[]>( ['header',
        'font',
        'size',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'indent',
        'link',
        'image',
        'video',
        'code',
        'script',
        'header',
        'align',
        'code-block',

    ]);

    return (
        <ReactQuill
            style={{maxWidth: '100%', overflowY: 'hidden', width: width ?? 'auto', height: height ?? 'auto', border: '2px dashed gray' }}
            // theme={theme}
            theme='snow'
            onChange={handleChange}
            value={value}
            modules={modules}
            formats={formats}
            bounds={'#root'}
            placeholder={placeholder ?? ''}
        />
    )
};


export default TextEditor;