var request = require('request')
var cheerio = require('cheerio')
var Iconv  = require('iconv').Iconv;

String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g, '').replace('\n','').replace('...','');};

module.exports =  {
    search: function(name, success){
        var url = 'http://www.beyazperde.com/ara/?q=' + encodeURIComponent(name);
        var success = success || function(){};


        request({url:url, 
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1700.102 Safari/537.36',
                'Host':'www.beyazperde.com',
                'Referrer':'www.beyazperde.com',
                'Referer':'www.beyazperde.com'
            }}, function(err, response,body) {
          
              
          var $ = cheerio.load(body);

          var title_component = $('.totalwidth.noborder.purehtml tr').first().find('td').last().find('a').first()
              title = title_component.text();

          if(title && title !='' && !err){
              var url = title_component.attr('href')
              var id = /film-(\d+)/gi.exec(url)[1]

              var result = {
                title: title.trim(),
                url: url.trim()
                ,
                id: id.trim()
              }
              success.call(this, null, result);
          }else{
              success.call(this, 'nothing found on Beyaz perde for '+ name);
          }

        });    
    },
    movieInfo: function(id, callback){
        var url = 'http://www.beyazperde.com/filmler/film-'+ id +'/'
        var callback = callback || function(){};

        request({url:url, 
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1700.102 Safari/537.36',
                'Host':'www.beyazperde.com',
                'Referrer':'www.beyazperde.com',
                'Referer':'www.beyazperde.com'
            }}, function(err, response, body) {
            
            if(err) {
                callback.call(this, 'error on request to beyazperde for id '+id);
                return
            }

            var $ = cheerio.load(body),
                title = $('.titlebar_01.margin_10b span').first().text().trim();

            if(!title){
                callback.call(this, 'error on request to beyazperde for id '+id);
                return;
            }
            var result = {
                turkish_title: title,
                director: $('th:contains(Yönetmen) ~ td span[itemprop="name"]').first().text(),
                actors: $('th:contains(Oyuncular) ~ td').first().text().replace('devamı...', '').trim(),
                country: $('th:contains(Ülke) ~ td').text().trim(),
                rating: $('.stareval.stars_medium').last().find('.note').first().text(),
                description: $('div:contains(Özet) ~ div').first().text().trim()
            }

            callback.call(this, null, result);
        });    
    }
}