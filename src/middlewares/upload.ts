import multer from "multer";

export const upload = multer({
    storage: multer.diskStorage({
        destination: function(req, file, cb){
            cb(null, "../uploads") 
        },    
        filename: function(req, file, cb){
            cb(null, Date.now() + "-" + file.originalname)
        },
    }),
    fileFilter: (req, file: Express.Multer.File, cb:any) => {
        console.log(req.file)
        const allowedFileTypes = [
            "image/jpeg",
            "image/png",
            "image/gif",
            "image/jpg",
        ];

        if(allowedFileTypes.includes(file.mimetype)){
            cb(null, true)
        }else{
            cb(null, false)
        }
    }

}).single("image")
