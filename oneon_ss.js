
function generatevisitorpoll(num1, num2, num3){

    var text = "";
    var rnum2 = parseInt(num2) * 2;
    var rnum3 = parseInt(num3) * 3;
    var total = parseInt(num1) + parseInt(num2) + parseInt(num3);
    var totalnum = parseInt(num1) + rnum2 + rnum3;

    text = text + "한&nbsp;&nbsp;&nbsp;명 : " + num1 + "<br>";
    text = text + "두&nbsp;&nbsp;&nbsp;명 : " + num2 + "<br>";
    text = text + "셋 이상 : " + num3 + "<br><br>";    
    text = text + "총&nbsp;&nbsp;&nbsp;합 : " + totalnum + "<br>";
    text = text + "설문 참가자 수 : " + total + "<br><br>";


    return text;
}


function generateADCheerLine(name, chtext) {
    var chline = "<span class='adcheer_name'>" + name + "</span><span class='adcheer_text'>" + chtext + "</span><br>";
    return chline;
}

function generateADmassentry(oneid, submittime, name, birthdate, email, phone, categories, boothsize, portraitchar, tcardtype, tcardchar, illtype){

    var text = "";

    text = text + "<table class='admin_entry_mass_view'>";
    text = text + "<tr><td>접수번호</td><td>" + oneid + "</td><td>제출 시간</td><td>" + submittime +"</td></tr>";
    text = text + "<tr><td>닉네임</td><td>" + name + "</td><td>생년월일</td><td>" + birthdate + "</td></tr>";
    text = text + "<tr><td>연락처</td><td>" + phone + "</td><td>이메일</td><td>" + email + "</td></tr>";
    text = text + "<tr><td>참가 신청 항목</td><td>" + categories + "</td></tr>";
    text = text + "<tr><td>부스</td><td>" + boothsize + "</td></tr>";
    text = text + "<tr><td>등신대</td><td>" + portraitchar + "</td></tr>";
    text = text + "<tr><td>트레카</td><td>" + tcardtype + "</td><td>" + tcardchar + "</td></tr>";
    text = text + "<tr><td>일러스트 갤러리</td><td>" + illtype + "</td></tr></table>";
    return text;
}


$(document).ready(function(){



    /** ADMIN MAIN MENU **/

    $(document.body).on('click', '#admenu_board' ,function(){
        $("#box_admin").load("page_ace.html #box_admin_board", function(){
        });    
    });

    $(document.body).on('click', '#admenu_cheer' ,function(){
        $("#box_admin").load("page_ace.html #box_admin_cheer", function(){
        });     
    });


    $(document.body).on('click', '#admenu_poll' ,function(){
        $("#box_admin").load("page_ace.html #box_admin_poll", function(){
        });    
    });


    $(document.body).on('click', '#admenu_entry' ,function(){

        $("#box_admin").load("page_ace.html #box_admin_entry", function(){
            $.ajax({
                url: "./php/adcheckconnection.php",
                type: "POST",
                processData: false,
                contentType: false,
                success: function(data) {
                    //result = JSON.parse(data);
                    if(data.status == 'success'){
                        $("#admin_entry_load_frame").load("page_ace.html #frame_ad_bd_in");
                    }else{
                         $("#admin_entry_load_frame").load("page_ace.html #frame_ad_bd_login");
                    }  
                }
            });
        });  

        return false;  

           
    });




    $(document.body).on('submit', '#form_admin_bd_login' ,function(){

        var fd = new FormData(document.querySelector("#form_admin_bd_login")); 

        $.ajax({
            url: "./php/adbdconnect.php",
            type: "POST",
            data: fd,
            processData: false,
            contentType: false,
            success: function(data) {
                //result = JSON.parse(data);
                if(data.status == 'success'){
                    $("#admin_entry_load_frame").load("page_ace.html #frame_ad_bd_in");
                }else{
                    $("#errorwp").show();
                    $("#errorboxtext").html("관리자 인증에 실패했습니다."); 
                }  
            }
        });
        return false;



    });








    // visitor number poll refresh
    $(document.body).on('click', '#adpoll_visitor_load' ,function(){

        var chk = 'adloadpollvisitor';
        var jsonObject = {"chk" : chk};
        var i = 0;

        $.ajax({
            url: "../php/adloadpollvisitor.php",
            type: "POST",
            data: {json : JSON.stringify(jsonObject)},
            dataType: "json",
            success: function(data) {

                if(data.statusC['status'] == 'success'){
                        $("#adpoll_visitor_result").html(generatevisitorpoll(data.num['one'], data.num['two'], data.num['three']));
                                         
                }else if(data.statusC['status'] == 'notin'){
                    $("#errorwp").show();
                    $("#errorboxtext").html("참가 현황 메뉴에서 관리자 인증을 해주세요."); 
                }else{
                    $("#errorwp").show();
                    $("#errorboxtext").html("에러"); 
                }       
            }
        });   
    });




    // cheer load
    $(document.body).on('click', '#adcheer_load' ,function(){

        var chk = 'adloadcheer';
        var jsonObject = {"chk" : chk};
        var i = 0;

        $.ajax({
            url: "../php/adloadcheer.php",
            type: "POST",
            data: {json : JSON.stringify(jsonObject)},
            dataType: "json",
            success: function(data) {

                if(data.statusC['status'] == 'success'){
                    $("#adcheer_load_box").html('');
                    for(i=0; i < data.list.length; i++){
                        $("#adcheer_load_box").append(generateADCheerLine(data.list[i].chname, data.list[i].chtext));
                    }                   
                }else if(data.statusC['status'] == 'notin'){
                    $("#errorwp").show();
                    $("#errorboxtext").html("참가 현황 메뉴에서 관리자 인증을 해주세요."); 
                }else{
                    $("#errorwp").show();
                    $("#errorboxtext").html("에러"); 
                }       
            }
        });   
    });












    // application mass load
    $(document.body).on('click', '#adentry_all' ,function(){

        var i = 0;

        $.ajax({
            url: "../php/adloadmassentry.php",
            type: "POST",
            dataType: "json",
            success: function(data) {

                if(data.statusC['status'] == 'success'){
                    $("#admin_entry_load_frame").html('');
                    $("#admin_entry_load_frame").load("page_ace.html #box_admin_massload", function(){
                        $("#adnum_boothnum").html(data.numbers['boothnum']);
                        $("#adnum_circleone").html(data.numbers['circleone']);
                        $("#adnum_portnum").html(data.numbers['portnum']);
                        $("#adnum_tcardnum").html(data.numbers['tcardnum']);
                        $("#adnum_illustnum").html(data.numbers['illustnum']);


                        for(i=0; i < data.list.length; i++){
                            $("#admin_entry_load_frame").append(generateADmassentry(data.list[i]['oneid'], data.list[i]['submittime'], data.list[i]['name'], data.list[i]['birthdate'], data.list[i]['email'], data.list[i]['phone'], data.list[i]['categories'], data.list[i]['boothsize'], data.list[i]['portraitchar'], data.list[i]['tcardtype'], data.list[i]['tcardchar'], data.list[i]['illtype']));
                        } 
                    }); 
                                      
                }else if(data.statusC['status'] == 'notin'){
                    $("#errorwp").show();
                    $("#errorboxtext").html("참가 현황 메뉴에서 관리자 인증을 해주세요."); 
                }else{
                    $("#errorwp").show();
                    $("#errorboxtext").html("에러"); 
                }       
            }
        });   
    });




    /** BOARD MENU **/

	$(document.body).on('click', '#adboard_login' ,function(){
        $("#adminframe").load("page_ace.html #box_admin_board_login", function(){
        });    
    });

    $(document.body).on('click', '#adboard_notice' ,function(){
        $("#adminframe").load("page_ace.html #box_admin_board_notice", function(){
        });    
    });

    $(document.body).on('click', '#adboard_qna' ,function(){
        $("#adminframe").load("page_ace.html #box_admin_board_faqna", function(){
        });    
    });

    $(document.body).on('click', '#adboard_booth' ,function(){
        $("#adminframe").load("page_ace.html #box_admin_board_booth", function(){
        });    
    });

    $(document.body).on('click', '#adboard_portrait' ,function(){
        $("#adminframe").load("page_ace.html #box_admin_board_portrait", function(){
        });    
    });

    $(document.body).on('click', '#adboard_tcard' ,function(){
        $("#adminframe").load("page_ace.html #box_admin_board_tcard", function(){
        });    
    });

    $(document.body).on('click', '#adboard_illust' ,function(){
        $("#adminframe").load("page_ace.html #box_admin_board_illust", function(){
        });    
    });













});