// let dropZoneBoxes = document.querySelectorAll('[data-drop-zone]');
// if(dropZoneBoxes.length) {
//     dropZoneBoxes.forEach(dropZoneBox => {
//         if (dropZoneBox) {
//             let inputFile = dropZoneBox.querySelector('.drop-zone__input');
//             let fraction = dropZoneBox.querySelector('.drop-zone__fraction');
//             let submitBtn = dropZoneBox.closest('form').querySelector('[type="submit"], .form__submit');
            
//             let dropZone = new Dropzone(dropZoneBox, {
//                 url: '/',
//                 previewsContainer: dropZoneBox.querySelector('.drop-zone__preview'),
//                 uploadMultiple: true,
//                 maxFiles: 10,
//                 addRemoveLinks: true,
//                 thumbnail: function (file, dataUrl) {
//                     if (file.previewElement) {
//                         file.previewElement.classList.remove("dz-file-preview");
//                         let images = file.previewElement.querySelectorAll("[data-dz-thumbnail]");
//                         for (let i = 0; i < images.length; i++) {
//                             let thumbnailElement = images[i];
//                             thumbnailElement.alt = file.name;
//                             thumbnailElement.src = dataUrl;
//                         }
//                         setTimeout(function () { file.previewElement.classList.add("dz-image-preview"); }, 1);
//                     }
//                 },
//                 accept: function (file, done) {
//                     if (file.type === "image/jpeg" || file.type === "image/jpg" || file.type === "image/png" || file.type === "application/pdf") {
//                         done();
//                     }
//                     else {
//                         done("Error! Files of this type are not accepted");
//                     }
//                 }
//             });
        
//             let minSteps = 6,
//                 maxSteps = 60,
//                 timeBetweenSteps = 100,
//                 bytesPerStep = 100000;
        
//             dropZone.uploadFiles = function (files) {
//                 let self = this;
        
//                 for (let i = 0; i < files.length; i++) {
        
//                     let file = files[i];
//                     let totalSteps = Math.round(Math.min(maxSteps, Math.max(minSteps, file.size / bytesPerStep)));
        
//                     for (let step = 0; step < totalSteps; step++) {
//                         let duration = timeBetweenSteps * (step + 1);
//                         setTimeout(function (file, totalSteps, step) {
//                             return function () {
//                                 file.upload = {
//                                     progress: 100 * (step + 1) / totalSteps,
//                                     total: file.size,
//                                     bytesSent: (step + 1) * file.size / totalSteps
//                                 };
        
//                                 self.emit('uploadprogress', file, file.upload.progress, file.upload.bytesSent);
//                                 if (file.upload.progress == 100) {
//                                     file.status = Dropzone.SUCCESS;
//                                     self.emit("success", file, 'success', null);
//                                     self.emit("complete", file);
//                                     self.processQueue();
//                                     //document.getElementsByClassName("dz-success-mark").style.opacity = "1";
//                                 }
//                             };
//                         }(file, totalSteps, step), duration);
//                     }
//                 }
//             }
        
//             let dt = new DataTransfer();
//             const numberOfFilesHandler = () => {
//                 fraction.innerText = dt.files.length + '/10';
//                 dropZoneBox.classList.toggle('drop-zone--has-files', dt.files.length > 0)
        
//                 if(dt.files.length > 10) {
//                     submitBtn.setAttribute('disabled', true);
//                 } else {
//                     submitBtn.removeAttribute('disabled');
//                 }
//             }
        
//             dropZone.on("complete", function (file) {
//                 // console.log(file);
//             });
        
//             dropZone.on("addedfile", file => {
//                 dt.items.add(file)
//                 inputFile.files = dt.files;
        
//                 numberOfFilesHandler();
//             })
        
//             dropZone.on("removedfile", file => {
//                 dt.items.remove(file)
//                 inputFile.files = dt.files;
//                 numberOfFilesHandler();
//                 console.log(dt.files)
//             })
//         }
//     })
// }