That is a little module for getting movie information from beyazperde.com. 


Example: usage

``` javascript

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
});

```

Example info structure:

```
{ turkish_title: 'Terminatör 2',
  director: 'James Cameron',
  actors: 'Arnold Schwarzenegger, Linda Hamilton, Edward Furlong',
  country: 'ABD, \nFransa',
  rating: '3,8',
  description: 'Yıl 2009 Sarah Connor’ı öldürme görevinde başarısızlığa uğrayan Synet robotları, T-1000 adında yeni bir robot üretirler. Bu yeni “Terminatör” geçmişe dönerek insan direnişinin gelecekteki lideri olacak Sarah’ın oğlu John Connar’ı öldürmeye programlanır. Fakat bir diğer robot T-800 de John’u korumaya programlanarak geçmişe gönderilmiştir. İnsanoğlunun kaderini belirleyen tek bir soru vardır: İki robottan hangisi John’u daha önce bulacaktır? Terminatör serisinin bu ikinci filmi altı dalda Oscar’a aday gösterilmiş, dördünü kazanmıştır. Yönetmen koltuğunda ‘Alien’, ‘Titanic’ ve ‘Avatar’ gibi kült filmlerin usta yönetmeni James Cameron; başrollerinde ise ilk filmdeki gibi Arnold Schwarzenegger ve Linda Hamilton var.' }
  
```