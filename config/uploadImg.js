import multer from "multer";
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploaded/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      const fileType = file.mimetype.split('/');
    // console.log('req.fileType', file);
      const extension = fileType[1];
      cb(null, file.fieldname + '-' + uniqueSuffix + '.' + extension)
    },
    })

const upload = multer({ 
        storage: storage, 
        fileFilter: function(req, file, cb) {
            if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || "application/pdf") {
                cb(null, true);
            } else {
                cb(null, false);
                return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
            }
        }, 
    });

export default upload;