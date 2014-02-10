beyazperde.search("terminator 2", function(searchError, list){
  if(!err){
      beyazperde.movieInfo(list.id, function(infoError, info){
         success.call(self, err, info)
      })
  }else{
      console.log('--error--')
      console.log(searchError)
  }
})