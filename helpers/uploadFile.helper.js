const { v4: uuidv4 } = require('uuid');
const path = require('path');
const uploadFileWithParams = (files, validExtensions = ['png', 'jpg', 'jpeg'], folder = '') => {

  return new Promise((resolve, reject) => {

  
    const { file } = files;
    const nameCortado = file.name.split(".");
    const extension = nameCortado[nameCortado.length - 1];

    if (!validExtensions.includes(extension)) {
      return reject(`La extension ${extension} no es valida`)
    }
  
    const tempName = uuidv4() + "." + extension;

    const uploadPath = path.join(__dirname,'../uploadedFiles/', folder , tempName);
    file.mv(uploadPath, (err) => {
      if (err) {
        reject(err);
      }
      resolve(tempName);
  });      
    
  
  })



}

module.exports = {
  uploadFileWithParams
}