//nCage 
(function($) {
	
    var self = {
        nCageImgs : [

	"https://fbcdn-sphotos-h-a.akamaihd.net/hphotos-ak-xap1/v/t1.0-9/10494690_786853048004256_5595912009542894842_n.jpg?oh=759abe5c510a8eb7f5eb40d520e59e00&oe=54DC4DDD&__gda__=1424417537_4afaddfff662a5c6f0da9db7b5b0ea3d",
"https://scontent-a-mia.xx.fbcdn.net/hphotos-xap1/v/t1.0-9/10450850_750051898351038_8645501440088124754_n.jpg?oh=0354a4171fbd5169350a89335fc9d8a4&oe=54E5B19B",
"https://fbcdn-sphotos-a-a.akamaihd.net/hphotos-ak-xpf1/v/t1.0-9/10256245_734992956523599_1234409644646802716_n.jpg?oh=78c2ec57badf3f739e80812700261d57&oe=54E9D3DC&__gda__=1420591798_f8d24fe2a1bd9aabdf7de77da18742a5",
"https://scontent-b-mia.xx.fbcdn.net/hphotos-xfp1/v/t1.0-9/12187_696661413690087_734568705_n.jpg?oh=4f38d5d95367ac7c35de24a96c2811d7&oe=54EB1916",
"https://scontent-a-mia.xx.fbcdn.net/hphotos-frc3/v/t1.0-9/1463971_653500541339508_941606387_n.jpg?oh=24f675c3d67ddc264c04005928963de1&oe=54E13F38",
"https://scontent-a-mia.xx.fbcdn.net/hphotos-ash2/t31.0-8/1077799_600599623296267_2079199616_o.jpg",
"https://fbcdn-sphotos-d-a.akamaihd.net/hphotos-ak-ash2/v/t1.0-9/12959_524328610923369_1357394170_n.jpg?oh=a8afadcef3697db37b957a3c39b55983&oe=54AC61F1&__gda__=1420921360_058c0fc71510760f128ff0e963ab9b44",
"https://fbcdn-sphotos-c-a.akamaihd.net/hphotos-ak-xfp1/v/t1.0-9/207532_484321938257370_1466809640_n.jpg?oh=bc042d7c03dc0ff282d7fb99bdeb1773&oe=54DCFC0C&__gda__=1421057261_268fd47ec6d97a7ba662d74fd15af42f",
"https://scontent-a-mia.xx.fbcdn.net/hphotos-xfp1/t31.0-8/s960x960/133752_462440283778869_643538298_o.jpg"
        ],
        handleImages : function (lstImgs, time)
        {
            $.each($('img'), function(i,item) { 
                //Skip if image is already replaced
                if($.inArray($(item).attr('src'), lstImgs) == -1)
                {
					var h = $(item).height();
					var w = $(item).width();
					
					//If image loaded
					if (h > 0 && w > 0) {

					    self.handleImg(item, lstImgs);
					}
					else
					{
						//Replace when loaded
						$(item).load(function(){
							//Prevent 'infinite' loop
							if($.inArray($(item).attr('src'), lstImgs) == -1)
							{
							    self.handleImg(item, lstImgs);
							}
						});
					}
				}
            });
			
            //Keep replacing
            if (time > 0) {
                setTimeout(function () { self.handleImages(lstImgs, time); }, time);
            }
        },
        handleImg: function (item, lstImgs)
        {
            $(item).error(function () {
                //Handle broken imgs
                self.handleBrokenImg(item, lstImgs);
            });

            self.setRandomImg(item, lstImgs);
        },
		setRandomImg: function(item, lstImgs){
			var h = $(item).height();
			var w = $(item).width();
			$(item).css('width', w + 'px').css('height', h + 'px');
			$(item).attr('src', lstImgs[Math.floor(Math.random() * lstImgs.length)]); 
		},
		handleBrokenImg: function(item, lstImgs){
		    
		    var brokenImg = $(item).attr('src');
		    var index = lstImgs.indexOf(brokenImg);
            if (index > -1) {
                lstImgs.splice(index, 1);
            }
            self.setRandomImg(item, lstImgs);
		},
    };
	
	//Run on jQuery ready
    $(function(){
        self.handleImages(self.nCageImgs, 3000);
    });
	
	//Set global variable
	$.nCage = self;
	
})(jQuery);

 
