import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import React, {useEffect, useState} from 'react';
import FileManager, { Permissions, ItemView, Upload } from 'devextreme-react/file-manager';
import RemoteFileSystemProvider from 'devextreme/file_management/remote_provider';
import FileUploader from 'devextreme-react/file-uploader';

import folderSvg from '../../assets/images/folder.svg';
import docRtfSvg from '../../assets/images/doc-rtf.svg';
import docXmlSvg from '../../assets/images/doc-xml.svg';
import docTxtSvg from '../../assets/images/doc-txt.svg';
import {API_URL} from "../../http";


const ProjectFileManager : React.FC<{projectId: number | string}> = ({projectId}) => {

    const [chunks, setChunks] = useState([]);
    const [state, setState] = useState<any>({ chunks });

    const [itemViewMode, setItemViewMode] = useState();

    const onUploadProgress = (e: any) => {
        const chunk = {
            segmentSize: e.segmentSize,
            bytesLoaded: e.bytesLoaded,
            bytesTotal: e.bytesTotal,
        };
        // @ts-ignore
        setState({ chunks: [...state.chunks, chunk], ...state});
    }

    const onUploadStarted = () => {
        // @ts-ignore
        setState({ chunks: [], ...state });
    }

    const getValueInKb = (value: any) => {
        return `${(value / 1024).toFixed(0)}kb`;
    }

    const remoteFileProvider = new RemoteFileSystemProvider({
        endpointUrl: `${API_URL}/projects/${projectId}/file-manager`

    });

    const onOptionChanged = (e: any) => {
        console.log('onOptionChanged');
        // console.log('path =============== ', path);
        if (e.fullName === 'itemView.mode') {
            setItemViewMode(e.value);
        }
        console.log(e);
        console.log(state);
    }

    const onDirectoryCreated = (e: any) => {
        console.log("on directory created");
        console.log(e);
    }

    const onFileUploaded = (e: any) => {
        console.log("on file uploaded");
        console.log(e);
    }

    const onFileUploading = (e: any) => {
        console.log("on file uploading");
        console.log(e);

    }

    const customizeIcon = (fileSystemItem: any) => {
        if (fileSystemItem.isDirectory) {
            return folderSvg;
        }

        const fileExtension = fileSystemItem.getFileExtension();
        switch (fileExtension) {
            case '.txt':
                return '';
            case '.rtf':
                return docRtfSvg;
            case '.xml':
                return docXmlSvg;
            default:
                return docTxtSvg;
        }
    }

    return (
        <div>

            File manager
            {/*

                <FileUploader
                    name="file"
                    accept="*"
                    uploadUrl="http://127.0.0.1:8000/api/projects/1/file-manager?command=UploadChunk"
                    chunkSize={200000}
                    onUploadStarted={onUploadStarted}
                    onProgress={onUploadProgress} />
                <span className="note">Allowed file extensions: <span>.jpg, .jpeg, .gif, .png</span>.</span>
                <span className="note">Maximum file size: <span>4 MB.</span></span>
                <div className="chunk-panel">
                    {
                        state ? state.chunks.map((c: any, i: any) => <div key={i}>
                            <span>Chunk size:</span>
                            <span className="segment-size dx-theme-accent-as-text-color">{getValueInKb(c.segmentSize)}</span>
                            <span>, Uploaded:</span>
                            <span className="loaded-size dx-theme-accent-as-text-color">{getValueInKb(c.bytesLoaded)}</span>
                            <span>/</span>
                            <span className="total-size dx-theme-accent-as-text-color">{getValueInKb(c.bytesTotal)}</span>
                        </div>) : ''
                    }
                </div>

                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
            */}

            <FileManager
                fileSystemProvider={remoteFileProvider}
                customizeThumbnail={customizeIcon}
                height={450}
                onOptionChanged={onOptionChanged}
                onDirectoryCreated={onDirectoryCreated}
                onFileUploaded={onFileUploaded}
                onFileUploading={onFileUploading}
            >
                <Upload
                    chunkSize={1000000}
                    maxFileSize={10000000}
                />

                <ItemView
                    mode={itemViewMode}>
                </ItemView>

                <Permissions
                    create={true}
                    copy={true}
                    move={true}
                    delete={true}
                    rename={true}
                    upload={true}
                    download={true}>
                </Permissions>
            </FileManager>

        </div>
    );
};

export default ProjectFileManager;