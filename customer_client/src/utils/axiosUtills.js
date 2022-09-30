
export const downloadResponseFile = (file, name, ext) => {
    console.log(file)
    const url = window.URL.createObjectURL(new Blob([file]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${name}.${ext}`); //or any other extension
    document.body.appendChild(link);
    link.click();

}
