const AuthorController = {
   
    signin: (req, res) => {
      
        res.json({result: 'co router signin'})
        
    },
    welcome: (req, res) => {
      
        res.json({result: 'co router welcome'})
        
    },
   
}

export default AuthorController;