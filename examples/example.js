var beyazperde = require('beyazperde')

beyazperde.search("terminator 2", function(searchError, list){
  if(!searchError){
      beyazperde.movieInfo(list.id, function(infoError, info){
         if(!infoError){
            console.log('--error--')
            console.log(info)
         }else{
            console.log('--info--')
            console.log(infoError)
         }
         
      })
  }else{
      console.log('--error--')
      console.log(searchError)
  }
})