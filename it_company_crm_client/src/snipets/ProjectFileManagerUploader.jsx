{
    /*

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
*/
}