

function generateCheerLine(name, chtext) {
	var chline = "<span class='ch_dis_name'>" + name + "</span><span class='ch_dis_text'>" + chtext + "</span><br>";
	return chline;
}



function updateCheerBox() {

	var chk = 'loadcheer';
	var jsonObject = {"chk" : chk};
	var i = 0;

	$("#main_cheer_contents").html('');
	$("#chname").val('닉네임');
	$("#chtext").val('한줄 응원');

	$.ajax({
        url: "../php/cheerload.php",
        type: "POST",
        data: {json : JSON.stringify(jsonObject)},
        dataType: "json",
        success: function(data) {

	    	if(data.statusC['status'] == 'success'){
	        		for(i=0; i < 4; i++){
	        			$("#main_cheer_contents").append(generateCheerLine(data.list[i].chname, data.list[i].chtext));
	        		}	        		
	        }else{
	        	//alert(data.statusC['status']);
	        }	    
		}
    });   	

}



function randomLoadEventBanner() {
    var min = 3;
    var max = 4;
    var ran = Math.floor(Math.random() * (max - min + 1)) + min;


    var evtid_n = "evtban0" + ran;
    var evtid = "evtban0" + ran + "_banner_box";

    $(".evt_ban_list").removeClass("sel");
        
    $("#evtban0"+ran).addClass("sel");


    $("#evt_banner_box").load("page_events.html #"+evtid);

}






$(document).ready(function(){
	updateCheerBox();
    //randomLoadEventBanner();
});

$(document).ready(function(){




	/*** PAGE LOADING ZONE ***/

	/** TO MAIN ***/
	$(document.body).on('click', '.toMAIN' ,function(){
        $("#page").load("index.html #mainbox", function(){
        	updateCheerBox();
            $("#sitemapwp").hide();
        }); 
    });

	
	/** WE ARE ***/
	$(document.body).on('click', '.toWEARE' ,function(){
        $("#page").load("pages.html #subpage_weare", function(){
            $("#sitemapwp").hide();
        });     
    });

    /** EVENT ***/
    /** Separate **/

    /** NEWS NOTICE ***/
	$(document.body).on('click', '.toNEWS' ,function(){
        $("#page").load("pages.html #subpage_notice", function(){
            $("#sitemapwp").hide();
        });      
    });


	


    /** FAQNA ***/
	$(document.body).on('click', '.toFAQNA' ,function(){
        $("#page").load("pages.html #subpage_qna", function(){
            $("#sitemapwp").hide();
        });      
    });








	/** MAIN STUFF ***/


	/** SURVEY SUBMIT **/
	$(document.body).on('click', '#survey_submit' ,function(){

        var surveyansw = $("input[name=survey]:checked").val();
        var surveyid = $("#survey_ip").html();
        

        var jsonObject = {"surveyansw" : surveyansw, "surveyid" : surveyid};


        $.ajax({
            url: "./php/surveyregister.php",
            type: "POST",
            data: {json : JSON.stringify(jsonObject)},
            dataType: "json",
            success: function(data) {
                if(data.status == 'success'){
                    //alert("");
                    $("#errorwp").show();
                    $("#errorboxtext").html("참여해주셔서 고맙습니다!");
                }else if(data.status == 'duplicate'){
                    //alert("참여해주셔서 고맙습니다! 그런데 이미 참여하셨네요.");
                    $("#errorwp").show();
                    $("#errorboxtext").html("참여해주셔서 고맙습니다!<br>그런데 이미 참여하셨네요.");
                }else{
                	//alert("어, 이게 왜 이러지? 죄송합니다. 한번만 다시 해주시겠어요?");
                    $("#errorwp").show();
                    $("#errorboxtext").html("어, 이게 왜 이러지? 죄송합니다.<br>한번만 다시 해주시겠어요?");
                }  
            }
        });

        return false;
        
    });


	/** CHEER STUFF **/

	$(document.body).on('click', '#chname' ,function(){
        $("#chname").val("");
        return false;        
    });
    $(document.body).on('click', '#chtext' ,function(){
        $("#chtext").val("");
        return false;        
    });

    /** CHEER SUBMIT **/    
    $(document.body).on('click', '#cheer_submit' ,function(){

        var cheername = $("#chname").val();
        var cheertext = $("#chtext").val();

        

        if(cheername.length < 1){
        	//alert("성함이 어떻게 되시나요?");
            $("#errorwp").show();
            $("#errorboxtext").html("성함이 어떻게 되시나요?");
        	return false;        	
        }
        if(cheername.localeCompare("닉네임") == 0){
        	$("#errorwp").show();
            $("#errorboxtext").html("성함이 어떻게 되시나요?");
        	return false;
        }
        if(cheertext.length < 1){
        	//alert("마음이 급하신가봐요! 메시지를 적어주세요.");
            $("#errorwp").show();
            $("#errorboxtext").html("마음이 급하신가봐요! 메시지를 적어주세요.");
        	return false;        	
        }



        var jsonObject = {"cheername" : cheername, "cheertext" : cheertext};


        $.ajax({
            url: "./php/cheerregister.php",
            type: "POST",
            data: {json : JSON.stringify(jsonObject)},
            dataType: "json",
            success: function(data) {
                if(data.status == 'success'){
                    //alert("응원 메시지가 전달되었습니다. 힘낼게요!");
                    $("#errorwp").show();
                    $("#errorboxtext").html("응원 메시지가 전달되었습니다. 힘낼게요!");
                    updateCheerBox();
                }else{
                	//alert("어라? 전달이 되지 않아요. 죄송합니다. 마음만 받을게요. 한번 더 입력해주실래요?");
                    $("#errorwp").show();
                    $("#errorboxtext").html("어라? 전달이 되지 않아요. 죄송합니다. 마음만 받을게요.<br>한번 더 입력해주실래요?");

                }  
            }
        });

        return false;
        
    });




    /** TO EVENT **/

    $(document.body).on('click', '.toEVENT' ,function(){
        $("#page").load("pages.html #subpage_event", function(){
            
            $(".evt_list_td").removeClass("sel");
            $(".evt_item").removeClass("sel");
            
            $("#event03").parent().addClass("sel");
            $("#event03").addClass("sel");


            $("#evt_detail").load("page_events.html #event03_img");
            $("#sitemapwp").hide();
            return false;
        });
        return false;        
    });

    /* MAIN PAGE EVENT BANNER */



    /** TO EVENT PAGE **/
    $(document.body).on('click', '.evt_ban_main' ,function(){
        /**
        $("#page").load("pages.html #subpage_event", function(){
            
            $(".evt_list_td").removeClass("sel");
            $(".evt_item").removeClass("sel");
            
            $("#event03").parent().addClass("sel");
            $("#event03").addClass("sel");


            $("#evt_detail").load("page_events.html #event03_img");
            $("#sitemapwp").hide();
            return false;
        });
        return false;  **/ 
        
        var evtid_n = $(this).attr("id");
        var evtid = $(this).attr("id") + "_img";

        $("#page").load("pages.html #subpage_event", function(){
            

            $(".evt_list_td").removeClass("sel");
            $(".evt_item").removeClass("sel");
            
            $("#"+evtid_n).parent().addClass("sel");
            $("#"+evtid_n).addClass("sel");


            $("#evt_detail").load("page_events.html #"+evtid);
            return false;
        });
        return false;    
           
    });


    /** EVENT BANNER ROTATE **/

    $(document.body).on('click', '.evt_ban_list' ,function(){

        var evtid_n = $(this).attr("id");
        var evtid = $(this).attr("id") + "_banner_box";

        $(".evt_ban_list").removeClass("sel");
        
        $(this).addClass("sel");


        $("#evt_banner_box").load("page_events.html #"+evtid);
        return false;
        
    });


    /* EVENT PAGE*/
    $(document.body).on('click', '.evt_item' ,function(){

        var evtid_n = $(this).attr("id");
        var evtid = $(this).attr("id") + "_img";

        $(".evt_list_td").removeClass("sel");
        $(".evt_item").removeClass("sel");
        
        $("#"+evtid_n).parent().addClass("sel");
        $("#"+evtid_n).addClass("sel");


        $("#evt_detail").load("page_events.html #"+evtid);
        return false;
        
    });




    /** MOBILE STUFF **/

    $(document.body).on('click', '.mobile_subhd_link ' ,function(){
        $("#mobile_menu_list").hide();
        return false;        
    });


    $(document.body).on('click', '#mobile_subheader_btn' ,function(){
        $("#mobile_menu_list").toggle();
        return false;       
        
    });


    /** SITEMAP STUFF **/
    $(document.body).on('click', '#sitemapbtn' ,function(){
        $("#sitemapwp").show();
        return false;        
    });

    $(document.body).on('click', '#sitemapconfirm' ,function(){
        $("#sitemapwp").hide();
        return false;        
    });





});