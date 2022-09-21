import React, {useEffect, useState} from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
// import { ImageResize } from 'quill-image-resize-module';


import './styles.css';
import {useTheme} from "@mui/material/styles";
const TextEditor : React.FC<{
        width?: string,
        height?: string,
        onChange: (content: any) => void,
        placeholder?: string,
        value: any
    }>
    = ({width, height, onChange, placeholder, value}) => {
    // const [editorHtml, setEditorHtml] = useState<string>('');

    const theme = useTheme();

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
            ['clean']
        ],
        clipboard: {
            // toggle to add extra line breaks when pasting HTML:
            matchVisual: false
        },


    });

    const handleChange = (html: any) => {
        onChange(html);

        // console.log(html);
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
        'align'

    ]);


    return (
        <ReactQuill
            style={{ width: width ?? 'auto', height: height ?? 'auto' }}
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