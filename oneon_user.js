

$(document).ready(function(){


	$(document.body).on('click', '.ushdtoMyPage' ,function(){
        loaduserinfopage();

        $(".ushd_link").removeClass("sel");
        $(this).addClass("sel");   
        
    });


	$(document.body).on('click', '.ushdtoBooth' ,function(){


        var board = 'booth';
        var jsonObject = {"boardname" : board};


        $.ajax({
            url: "../php/uservalidateboard.php",
            type: "POST",
            data: {json : JSON.stringify(jsonObject)},
            dataType: "json",
            success: function(data) {

                if(data.status == 'success'){
                    $("#box_user").load("page_rb.html #box_user_board_booth", function(){ }); 
                    $(".ushd_link").removeClass("sel");
                    $(this).addClass("sel");       
                                       
                }else{
                    //alert(data.statusC['status']);
                    $("#errorwp").show();
                    $("#errorboxtext").html("접근 권한이 없습니다.");
                }       
            }
        });
          
    });


    $(document.body).on('click', '.ushdtoPortrait' ,function(){

        var board = 'portrait';
        var jsonObject = {"boardname" : board};


        $.ajax({
            url: "../php/uservalidateboard.php",
            type: "POST",
            data: {json : JSON.stringify(jsonObject)},
            dataType: "json",
            success: function(data) {

                if(data.status == 'success'){
                    $("#box_user").load("page_rb.html #box_user_board_portrait", function(){ }); 
                    $(".ushd_link").removeClass("sel");
                    $(this).addClass("sel");       
                                       
                }else{
                    //alert(data.statusC['status']);
                    $("#errorwp").show();
                    $("#errorboxtext").html("접근 권한이 없습니다.");
                }       
            }
        });


    });


    $(document.body).on('click', '.ushdtoTCard' ,function(){

        var board = 'tcard';
        var jsonObject = {"boardname" : board};


        $.ajax({
            url: "../php/uservalidateboard.php",
            type: "POST",
            data: {json : JSON.stringify(jsonObject)},
            dataType: "json",
            success: function(data) {

                if(data.status == 'success'){
                    $("#box_user").load("page_rb.html #box_user_board_tcard", function(){ }); 
                    $(".ushd_link").removeClass("sel");
                    $(this).addClass("sel");       
                                       
                }else{
                    //alert(data.statusC['status']);
                    $("#errorwp").show();
                    $("#errorboxtext").html("접근 권한이 없습니다.");
                }       
            }
        });

    });



    $(document.body).on('click', '.ushdtoIllust' ,function(){

        var board = 'illust';
        var jsonObject = {"boardname" : board};


        $.ajax({
            url: "../php/uservalidateboard.php",
            type: "POST",
            data: {json : JSON.stringify(jsonObject)},
            dataType: "json",
            success: function(data) {

                if(data.status == 'success'){
                    $("#box_user").load("page_rb.html #box_user_board_illust", function(){ }); 
                    $(".ushd_link").removeClass("sel");
                    $(this).addClass("sel");       
                                       
                }else{
                    //alert(data.statusC['status']);
                    $("#errorwp").show();
                    $("#errorboxtext").html("접근 권한이 없습니다.");
                }       
            }
        });

    });





    /* MODIFY FORM LOAD */



    $(document.body).on('click', '#form_dc_m_basic_name' ,function(){


        if($("input[name='basic_name']").val().length < 1){
            //alert("닉네임을 입력해주세요.");
            $("#errorwp").show();
            $("#errorboxtext").html("닉네임을 입력해주세요.");
            $("input[name='basic_name']").addClass("missed");
            goToByScroll("input[name='basic_name']");
            return false;
        }


        var chk = 'duplicatename';
        var nametochk = $("input[name='basic_name']").val();
        var jsonObject = {"chk" : chk, "basic_name" : nametochk };

        $.ajax({
            url: "../php/duplicatecheck.php",
            type: "POST",
            data: {json : JSON.stringify(jsonObject)},
            dataType: "json",
            success: function(data) {

                if(data.statusC['status'] == 'success'){
                    $("#errorwp").show();
                    $("#errorboxtext").html("사용 가능한 이름입니다.");
                    dupchecknamemod = true;
                    return false;                                          
                }else if(data.statusC['status'] == 'successmod'){
                    $("#errorwp").show();
                    $("#errorboxtext").html("사용 가능한 이름입니다.");
                    dupchecknamemod = true;
                    return false;                                          
                }else{
                    $("#errorwp").show();
                    $("#errorboxtext").html("이미 존재하는 이름입니다.");
                    dupchecknamemod = true;
                    return false;
                }       
            }
        });  
        return false;        
              
    });

    $(document.body).on('click', '#userinfo_modify_basic_btn' ,function(){
        /*
        $("#errorwp").show();
        $("#errorboxtext").html("아직 수정 기간이 아닙니다.");
        return false;
        */

        $("#userinfo_basic_view").hide();
        $(".userinfo_modify_btn").hide();
        $("#userinfo_basic_modify_form_box").show();
        $("#userinfo_basic_modify_form_box").load("page_nami2.html #userinfo_basic_modify_form", function(){ 
            // modifiables
            $("input[name='basic_name']").val($("#ui_view_basic_name").html());
            $("input[name='basic_contactphone']").val($("#ui_view_basic_contactphone").html());
            $("input[name='basic_password']").val($("#ui_view_basic_password").html());
            $("input[name='basic_homeaddress']").val($("#ui_view_basic_homeaddress").html());
            $("input[name='basic_webaddr1']").val($("#ui_view_basic_webaddr1").html());
            $("input[name='basic_webaddr2']").val($("#ui_view_basic_webaddr2").html());
            $("input[name='basic_webaddr3']").val($("#ui_view_basic_webaddr3").html());
            $("input[name='basic_contacttwitter']").val($("#ui_view_basic_contacttwitter").html());

            // non modifiable, static
            $("#ui_view_mod_basic_birthdate").html($("#ui_view_basic_birthdate").html());
            $("#ui_view_mod_basic_contactemail").html($("#ui_view_basic_contactemail").html());

        });
        return false;  
              
    });
    $(document.body).on('click', '#userinfo_modify_basic_cancel' ,function(){

        $("#userinfo_basic_view").show();
        $(".userinfo_modify_btn").show();
        $("#userinfo_basic_modify_form_box").hide(); 
        return false;        
    });
    $(document.body).on('click', '#userinfo_modify_basic_confirm' ,function(){


        // check if nickname change + dup check 

        if(!dupchecknamemod ){
            $("#errorwp").show();
            $("#errorboxtext").html("닉네임 중복확인을 해주세요. ");
            goToByScroll("input[name='basic_name']");
            return false;
        }

        var fd = new FormData(document.querySelector("#form_modify_basic")); 
 
        //file appending
        if($("input[name='basic_webbanner1']").val()){
            fd.append( 'basic_webbanner1', $('#basic_webbanner1')[0].files[0] );
        }
        if($("input[name='basic_webbanner2']").val()){
            fd.append( 'basic_webbanner2', $('#basic_webbanner2')[0].files[0] );
        }
        if($("input[name='basic_webbanner3']").val()){
            fd.append( 'basic_webbanner3', $('#basic_webbanner3')[0].files[0] );
        }

        $.ajax({
            url: "./php/userinfomodifybasic.php",
            type: "POST",
            data: fd,
            processData: false,
            contentType: false,
            success: function(data) {
                //result = JSON.parse(data);
                if(data.statusC['status'] == 'success'){

                    $("#errorwp").show();
                    $("#errorboxtext").html("수정 사항이 성공적으로 반영되었습니다.");

                    loaduserinfopage();

                }else{
                    $("#errorwp").show();
                    $("#errorboxtext").html("공통사항 정보를 업데이트 하던 도중<br>오류가 발생했습니다.<br>관리자에게 문의 부탁드립니다.");
                }  
            }
        });

    });





















    $(document.body).on('click', '#userinfo_modify_booth_btn' ,function(){

        $("#userinfo_booth_view").hide();
        $(".userinfo_modify_btn").hide();
        $("#userinfo_booth_modify_form_box").show();
        $("#userinfo_booth_modify_form_box").load("page_nami2.html #userinfo_booth_modify_form", function(){ 
            // modifiables
            $("input[name='circle_name']").val($("#ui_view_circle_name").html());
            $("input[name='circle_nicknames']").val($("#ui_view_circle_nicknames").html());
            $("input[name='circle_contents']").val($("#ui_view_circle_contents").html());
            $("input[name='circle_genre']").val($("#ui_view_circle_genre").html());


            var infotemp = String($("#ui_view_circle_info").html());
            var info = infotemp.replace(/<br>/g, "");

            $(("#form_textarea")).text(info);

            $("input[name='circle_deposit']").val($("#ui_view_circle_deposit").html());

            var strtemp = String($("#ui_view_circle_grade").html());
            if( strtemp.includes("유")){
                $("#circle_grade_yes").prop("checked", true);
            }
            
            // non modifiable, static
            $("#ui_view_mod_circle_size").html($("#ui_view_circle_size").html());

        });
        return false; 
        
    });
    $(document.body).on('click', '#userinfo_modify_booth_cancel' ,function(){

        $("#userinfo_booth_view").show();
        $(".userinfo_modify_btn").show();
        $("#userinfo_booth_modify_form_box").hide(); 
        return false;        
    });
    $(document.body).on('click', '#userinfo_modify_booth_confirm' ,function(){


        var fd = new FormData(document.querySelector("#form_modify_booth")); 
 
        //file appending
        if($("input[name='circle_image']").val()){
            fd.append( 'circle_image', $('#circle_image')[0].files[0] );
        }


        $.ajax({
            url: "./php/userinfomodifycircle.php",
            type: "POST",
            data: fd,
            processData: false,
            contentType: false,
            success: function(data) {
                //result = JSON.parse(data);
                if(data.statusC['status'] == 'success'){
                    $("#errorwp").show();
                    $("#errorboxtext").html("수정 사항이 성공적으로 반영되었습니다.");
                    loaduserinfopage();

                }else{
                    $("#errorwp").show();
                    $("#errorboxtext").html("부스 정보를 업데이트 하던 도중<br>오류가 발생했습니다.<br>관리자에게 문의 부탁드립니다.");
                }  
            }
        });

    });









    $(document.body).on('click', '#userinfo_modify_portrait_btn' ,function(){

        $("#userinfo_portrait_view").hide();
        $(".userinfo_modify_btn").hide();
        $("#userinfo_portrait_modify_form_box").show(); 
        $("#userinfo_portrait_modify_form_box").load("page_nami2.html #userinfo_portrait_modify_form", function(){ 
            // modifiables

            
            // non modifiable, static
            $("#ui_view_mod_portrait_exp").html($("#ui_view_portrait_exp").html());
            $("#ui_view_mod_portrait_desirechar").html($("#ui_view_portrait_desirechar").html());
            $("#ui_view_mod_portrait_avgworktime").html($("#ui_view_portrait_avgworktime").html());
            $("#ui_view_mod_portrait_expworktime").html($("#ui_view_portrait_expworktime").html());

        });
        return false;        
    });
    $(document.body).on('click', '#userinfo_modify_portrait_cancel' ,function(){

        $("#userinfo_portrait_view").show();
        $(".userinfo_modify_btn").show();
        $("#userinfo_portrait_modify_form_box").hide(); 
        return false;        
    });
    $(document.body).on('click', '#userinfo_modify_portrait_confirm' ,function(){


        var fd = new FormData(document.querySelector("#form_modify_portrait")); 
 
        //file appending
        if($("input[name='portrait_sample1']").val()){
            fd.append( 'portrait_sample1', $('#portrait_sample1')[0].files[0] );
        }
        if($("input[name='portrait_sample2']").val()){
            fd.append( 'portrait_sample2', $('#portrait_sample2')[0].files[0] );
        }
        if($("input[name='portrait_sample3']").val()){
            fd.append( 'portrait_sample3', $('#portrait_sample3')[0].files[0] );
        }


        $.ajax({
            url: "./php/userinfomodifyportrait.php",
            type: "POST",
            data: fd,
            processData: false,
            contentType: false,
            success: function(data) {
                //result = JSON.parse(data);
                if(data.statusC['status'] == 'success'){
                    $("#errorwp").show();
                    $("#errorboxtext").html("수정 사항이 성공적으로 반영되었습니다.");
                    loaduserinfopage();

                }else{
                    $("#errorwp").show();
                    $("#errorboxtext").html("등신대 정보를 업데이트 하던 도중<br>오류가 발생했습니다.<br>관리자에게 문의 부탁드립니다.");
                }  
            }
        });

    });










    $(document.body).on('click', '#userinfo_modify_tcard_btn' ,function(){

        $("#userinfo_tcard_view").hide();
        $(".userinfo_modify_btn").hide();
        $("#userinfo_tcard_modify_form_box").show();
        $("#userinfo_tcard_modify_form_box").load("page_nami2.html #userinfo_tcard_modify_form", function(){ 
            
            // modifiables
            var strtemp = String($("#ui_view_tcard_type").html());
            if( strtemp.includes("A")){
                $("#tc_typeA").prop("checked", true);
            }
            if( strtemp.includes("B")){
                $("#tc_typeB").prop("checked", true);
            }            
            $("input[name='tc_desirechar']").val($("#ui_view_tcard_desirechar").html());
            $("input[name='tc_password']").val($("#ui_view_tcard_password").html());
            

            // non modifiable, static
            $("#ui_view_mod_tcard_avgworktime").html($("#ui_view_tcard_avgworktime").html());
            $("#ui_view_mod_tcard_expworktime").html($("#ui_view_tcard_expworktime").html());

        });  
        return false;                
    });
    $(document.body).on('click', '#userinfo_modify_tcard_cancel' ,function(){

        $("#userinfo_tcard_view").show();
        $(".userinfo_modify_btn").show();
        $("#userinfo_tcard_modify_form_box").hide(); 
        return false;        
    });

    $(document.body).on('click', '#userinfo_modify_tcard_confirm' ,function(){


        var fd = new FormData(document.querySelector("#form_modify_tcard")); 
 
        //file appending
        if($("input[name='tc_sample1']").val()){
            fd.append( 'tc_sample1', $('#tc_sample1')[0].files[0] );
        }
        if($("input[name='tc_sample2']").val()){
            fd.append( 'tc_sample2', $('#tc_sample2')[0].files[0] );
        }
        if($("input[name='tc_sample3']").val()){
            fd.append( 'tc_sample3', $('#tc_sample3')[0].files[0] );
        }


        $.ajax({
            url: "./php/userinfomodifytcard.php",
            type: "POST",
            data: fd,
            processData: false,
            contentType: false,
            success: function(data) {
                //result = JSON.parse(data);
                if(data.statusC['status'] == 'success'){
                    $("#errorwp").show();
                    $("#errorboxtext").html("수정 사항이 성공적으로 반영되었습니다.");
                    loaduserinfopage();

                }else{
                    $("#errorwp").show();
                    $("#errorboxtext").html("트레카 정보를 업데이트 하던 도중<br>오류가 발생했습니다.<br>관리자에게 문의 부탁드립니다.");
                }  
            }
        });

    });
























    $(document.body).on('click', '#userinfo_modify_illust_btn' ,function(){

        $("#userinfo_illust_view").hide();
        $(".userinfo_modify_btn").hide();
        $("#userinfo_illust_modify_form_box").show(); 
        $("#userinfo_illust_modify_form_box").load("page_nami2.html #userinfo_illust_modify_form", function(){ 
            // modifiables
            $("input[name='illust_minprice']").val($("#ui_view_illust_minprice").html());
            $("input[name='illust_maxprice']").val($("#ui_view_illust_maxprice").html());
            $("input[name='illust_bankaccount']").val($("#ui_view_illust_bankaccount").html());
            $("input[name='illust_accountnumber']").val($("#ui_view_illust_accountnumber").html());
            $("input[name='illust_accountname']").val($("#ui_view_illust_accountname").html());
            $("input[name='illust_password']").val($("#ui_view_illust_password").html());

            // non modifiable, static
            $("#ui_view_mod_illust_type").html($("#ui_view_illust_type").html());


        }); 
        return false;
        
    });
    $(document.body).on('click', '#userinfo_modify_illust_cancel' ,function(){

        $("#userinfo_illust_view").show();
        $(".userinfo_modify_btn").show();
        $("#userinfo_illust_modify_form_box").hide(); 
        return false;        
    });

    $(document.body).on('click', '#userinfo_modify_illust_confirm' ,function(){


        var fd = new FormData(document.querySelector("#form_modify_illust")); 
 


        $.ajax({
            url: "./php/userinfomodifyillust.php",
            type: "POST",
            data: fd,
            processData: false,
            contentType: false,
            success: function(data) {
                //result = JSON.parse(data);
                if(data.statusC['status'] == 'success'){
                    $("#errorwp").show();
                    $("#errorboxtext").html("수정 사항이 성공적으로 반영되었습니다.");
                    loaduserinfopage();

                }else{
                    $("#errorwp").show();
                    $("#errorboxtext").html("일러 전시회 정보를 업데이트 하던 도중<br>오류가 발생했습니다.<br>관리자에게 문의 부탁드립니다.");
                }  
            }
        });

    });












    // apply for different category

    $(document.body).on('click', '#userinfo_modify_cat_btn' ,function(){

        $("#box_user").load("page_zoro21.html #box_joinus_extra", function(){ 

        });  
        return false;
        
    });


    // submit extra category form
    
    $(document.body).on('click', '#join_form_extra_submit_btn' ,function(){       

        $("#errorwp").show();

        $("#errorboxtext").html("신청 중입니다.");

        // at least one selected
        if( !$("#booth").is(':checked') && !$("#portrait").is(':checked') && !$("#tradecard").is(':checked') && !$("#illust").is(':checked')){
            $("#errorwp").show();
            $("#errorboxtext").html("참가 항목은 한 개 이상 선택해주세요.");
            $("#form_category").addClass("missedbig");
            goToByScroll("input[name='illust_a']");
            return false;
        }




        
        // validation for basic
        if($("input[name='basic_name']").val().length < 1){
            $("#errorwp").show();
            $("#errorboxtext").html("닉네임을 입력해주세요.");
            $("input[name='basic_name']").addClass("missed");
            goToByScroll("input[name='basic_name']");
            return false;
        }

        // validation for booth
        if($("#booth").is(':checked')){

            if($("input[name='circle_name']").val().length < 1){
                $("#errorwp").show();
                $("#errorboxtext").html("서클명을 입력해주세요.");
                $("input[name='circle_name']").addClass("missed");
                goToByScroll("input[name='circle_name']");
                return false;
            }
            if($("input[name='circle_contents']").val().length < 1){
                $("#errorwp").show();
                $("#errorboxtext").html("서클 성격을 입력해주세요.");
                $("input[name='circle_contents']").addClass("missed");
                goToByScroll("input[name='circle_contents']");
                return false;
            }
            if( !$.trim( $("#form_textarea").val() ) ){ 
                $("#errorwp").show();
                $("#errorboxtext").html("서클 소개를 입력해주세요.");
                $("#form_textarea").addClass("missed");
                goToByScroll("input[name='circle_contents']");
                return false;
            }
            
            if($("input[name='circle_image']").val().length < 1){
                $("#errorwp").show();
                $("#errorboxtext").html("서클 컷을 선택해주세요.");
                $("input[name='circle_image']").addClass("missed");
                goToByScroll("input[name='circle_contents']");
                return false;
            }
            if($("input[name='circle_deposit']").val().length < 1){
                $("#errorwp").show();
                $("#errorboxtext").html("부스 참가비 입금자명을 입력해주세요.");
                $("input[name='circle_deposit']").addClass("missed");
                goToByScroll("input[name='circle_deposit']");
                return false;
            }

        }

        // validation for portrait
        /*
        if($("#portrait").is(':checked')){
            if($("input[name='portrait_desirechar']").val().length < 1){
                $("#errorwp").show();
                $("#errorboxtext").html("등신대 희망 캐릭터를 입력해주세요.");
                $("input[name='portrait_desirechar']").addClass("missed");
                goToByScroll("input[name='portrait_desirechar']");
                return false;
            }
            if($("input[name='portrait_sample1']").val().length < 1){
                $("#errorwp").show();
                $("#errorboxtext").html("샘플 이미지는 1개 이상 선택해주세요.");
                $("input[name='portrait_sample1']").addClass("missed");
                goToByScroll("input[name='portrait_desirechar']");
                return false;
            }
        }*/


        // validation for tradecard
        if($("#tradecard").is(':checked')){
            if( !$("#tc_typeA").is(':checked') && !$("#tc_typeB").is(':checked')){
                $("#errorwp").show();
                $("#errorboxtext").html("트레카 타입은 1개 이상 선택해주세요.");
                $("input[name='tc_typeA']").addClass("missed");
                $("input[name='tc_typeB']").addClass("missed");
                goToByScroll("input[name='tc_typeA']");
                return false;
            }
            if($("input[name='tc_desirechar']").val().length < 1){
                $("#errorwp").show();
                $("#errorboxtext").html("트레카 희망 캐릭터를 입력해주세요.");
                $("input[name='tc_desirechar']").addClass("missed");
                goToByScroll("input[name='tc_desirechar']");
                return false;
            }
            if($("input[name='tc_sample1']").val().length < 1){
                $("#errorwp").show();
                $("#errorboxtext").html("트레카 샘플 이미지는 1개 이상 선택해주세요.");
                $("input[name='tc_sample1']").addClass("missed");
                goToByScroll("input[name='tc_sample1']");
                return false;
            }
            if($("input[name='tc_password']").val().length < 4){
                $("#errorwp").show();
                $("#errorboxtext").html("트레카 비밀번호는 4자리 이상 입력해주세요.");
                $("input[name='tc_password']").addClass("missed");
                goToByScroll("input[name='tc_password']");
                return false;
            }
        }


        // validation for illust
        if($("#illust").is(':checked')){
            
            if($("input[name='illust_minprice']").val().length < 1){
                $("#errorwp").show();
                $("#errorboxtext").html("일러스트 판매 최소가를 입력해주세요.");
                $("input[name='illust_minprice']").addClass("missed");
                goToByScroll("input[name='illust_minprice']");
                return false;
            }
            if($("input[name='illust_maxprice']").val().length < 1){
                $("#errorwp").show();
                $("#errorboxtext").html("일러스트 판매 최대가를 입력해주세요.");
                $("input[name='illust_maxprice']").addClass("missed");
                goToByScroll("input[name='illust_maxprice']");
                return false;
            }
            if($("input[name='illust_password']").val().length < 4){
                $("#errorwp").show();
                $("#errorboxtext").html("일러스트 비밀번호는 4자리 이상 입력해주세요.");
                $("input[name='illust_password']").addClass("missed");
                goToByScroll("input[name='illust_password']");
                return false;
            }
        }


        if(!globalfilesizechk){
            $("#errorwp").show();
            $("#errorboxtext").html("1개 이상의 이미지 파일 사이즈가 초과 되었습니다.");
            return false;
        }


        var fd = new FormData(document.querySelector("form")); 

        

        //file appending
        
        if($("#booth").is(':checked')){
            if($("input[name='circle_image']").val()){
                fd.append( 'circle_image', $('#circle_image')[0].files[0] );
            }
        }
         
        /*
        if($("#portrait").is(':checked')){
            if($("input[name='portrait_sample1']").val()){
                fd.append( 'portrait_sample1', $('#portrait_sample1')[0].files[0] );
            }
            if($("input[name='portrait_sample2']").val()){
                fd.append( 'portrait_sample2', $('#portrait_sample2')[0].files[0] );
            }
            if($("input[name='portrait_sample3']").val()){
                fd.append( 'portrait_sample3', $('#portrait_sample3')[0].files[0] );
            }
        }*/

        if($("#tradecard").is(':checked')){
            if($("input[name='tc_sample1']").val()){
                fd.append( 'tc_sample1', $('#tc_sample1')[0].files[0] );
            }
            if($("input[name='tc_sample2']").val()){
                fd.append( 'tc_sample2', $('#tc_sample2')[0].files[0] );
            }
            if($("input[name='tc_sample3']").val()){
                fd.append( 'tc_sample3', $('#tc_sample3')[0].files[0] );
            }
        }

        


        $.ajax({
            url: "./php/registerextra.php",
            type: "POST",
            data: fd,
            processData: false,
            contentType: false,
            success: function(data) {
                //result = JSON.parse(data);
                if(data.statusC['status'] == 'success'){

                    $("#errorwp").show();
                    $("#errorboxtext").html("정상적으로 신청이 완료되었습니다.");

                    $("#box_user").load("pages.html #box_joinus_result", function(){
                        $('#joinus_result_content').html(generateResultContent(data.dat['category'], data.dat['basic_name'], data.dat['basic_contactemail'], data.dat['basic_password']));
                    });

                }else if(data.statusC['status'] == 'namenotmatch'){
                    $("#errorwp").show();
                    $("#errorboxtext").html("처음 신청서를 작성하셨던 닉네임으로 부탁드립니다.");

                }else if(data.statusC['status'] == 'duplicate'){
                    $("#errorwp").show();
                    $("#errorboxtext").html("중복 신청은 불가합니다.<br>정보 수정은 참가자 개인페이지의<br>'수정하기' 를 이용해주세요.");

                }else if(result.statusC['status'] == 'timeyet'){
                    $("#errorwp").show();
                    $("#errorboxtext").html("신청 기간이 지났습니다.");

                }else{
                    $("#errorwp").show();
                    $("#errorboxtext").html("죄송합니다. 오류가 발생했습니다.<br>관리자에게 문의 부탁드립니다.");
                }  
            }
        });

        return false;
        
    });
    







});