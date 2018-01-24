var formcheckmissed = "";
var dupcheckname = false;
var dupchecknamemod = false;
var dupcheckemail = false;
var globalfilesizechk = true;



function goToByScroll(id){
    // Scroll
    $('html,body').animate({
        scrollTop: $(id).parent().offset().top},
        'slow');
}




function generateResultContent(categor, name, email, pw) {
    var text = "";

    text = "<span class='result_content_bold'>참가 항목<br></span>";
    text = text + categor + "<br><br>";
    text = text + "닉네임 : " + name + "<br>";
    text = text + "이메일 : " + email + "<br><br><br>";
    text = text + "신청해주셔서 감사합니다.<br><br>";
    text = text + "홈페이지 내 참가자 전용 페이지를 통해 작성하신 정보 및 상태를 확인, 수정 할 수 있습니다. <br>";

    return text;
}



$(document).ready(function(){








    /** JOIN INFO **/

    $(document.body).on('click', '#ji_title_booth' ,function(){
        $("#joininfo_block_booth").slideToggle();
        return false;        
    });
    $(document.body).on('click', '#ji_title_portrait' ,function(){
        $("#joininfo_block_portrait").slideToggle();
        return false;        
    });
    $(document.body).on('click', '#ji_title_tcard' ,function(){
        $("#joininfo_block_tradecard").slideToggle();
        return false;        
    });
    $(document.body).on('click', '#ji_title_illust' ,function(){
        $("#joininfo_block_illust").slideToggle();
        return false;        
    });

    $(document).on('change' , '#joininforead' , function(){
        
        return false;

    });

    $(document.body).on('click', '#tojoinform' ,function(){
        if($("#joininforead").is(':checked')){
            $("#page").load("page_zr.html #page", function(){
                dupcheckname = false;
                dupcheckemail = false;
            });
        }else{
            $("#errorwp").show();
            $("#errorboxtext").html("어라? 혹시 안내글을 읽지 않으셨나요?<br>천천히 읽어보시고 체크표시 부탁드려요!");
            return false;  
        }      
              
    });









    /** JOIN FORM **/

    /** JOIN CHECKBOX DYNAMIC **/
    $(document).on('change' , '.form_chbox_large' , function(){
        //alert($(this).attr("id"));
        var tmp = $(this).attr("id");

        if(this.checked) {         
            $("#form_" + tmp).removeClass('hidden');
            $("#form_category").removeClass("missedbig");
        }
        else{            
            $("#form_" + tmp).addClass('hidden');
        }

    });


    // if dup check item changes, make it require for check again
    $(document).on('change' , '.form_doublecheck' , function(){
        //alert($(this).attr("id"));
        var tmp = $(this).attr("name");

        if(tmp == 'basic_name'){
            dupcheckname = false;
            dupchecknamemod = false;
        }
        if(tmp == 'basic_contactemail'){
            dupcheckemail = false;
        }

    });









    /** JOIN DOUBLE CHECK (duplicate) **/

    $(document.body).on('click', '#form_dc_basic_name' ,function(){


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
                    dupcheckname = true;
                    return false;                                          
                }else{
                    $("#errorwp").show();
                    $("#errorboxtext").html("이미 존재하는 이름입니다.");
                    dupcheckname = false;
                    return false;
                }       
            }
        });  
        return false;        
              
    });





    $(document.body).on('click', '#form_dc_basic_contactemail' ,function(){


        if($("input[name='basic_contactemail']").val().length < 1){
            //alert("닉네임을 입력해주세요.");
            $("#errorwp").show();
            $("#errorboxtext").html("이메일을 입력해주세요.");
            $("input[name='basic_contactemail']").addClass("missed");
            goToByScroll("input[name='basic_contactemail']");
            return false;
        }


        var chk = 'duplicateemail';
        var nametochk = $("input[name='basic_contactemail']").val();
        var jsonObject = {"chk" : chk, "basic_contactemail" : nametochk };

        $.ajax({
            url: "../php/duplicatecheck.php",
            type: "POST",
            data: {json : JSON.stringify(jsonObject)},
            dataType: "json",
            success: function(data) {

                if(data.statusC['status'] == 'success'){
                    $("#errorwp").show();
                    $("#errorboxtext").html("사용 가능한 이메일입니다.");
                    dupcheckemail = true;
                    return false;                                          
                }else{
                    $("#errorwp").show();
                    $("#errorboxtext").html("이미 존재하는 이메일입니다.");
                    dupcheckemail = false;
                    return false;
                }       
            }
        }); 

        return false;         
              
    });













    /** INPUT PREVENT **/
    /** NUMBER ONLY **/
    $(document).on("keyup", ".input_number_only", function(e) {
        var patt = /[^0-9\-]/gi;
        if( patt.test($(this).val() )){
            $(this).addClass("missed");
            alert("숫자로 부탁드려요.");
        }        
        $(this).val( $(this).val().replace(/[^0-9\-]/gi,"") );        
    });

    /** AlphaNumeric ONLY **/
    $(document).on("keyup", ".input_alphanum_only", function(e) {
        var patt = /[^a-zA-Z0-9]/gi;
        if( patt.test($(this).val() )){
            $(this).addClass("missed");
            alert("숫자와 영문으로 부탁드려요.");
        }        
        $(this).val( $(this).val().replace(/[^a-zA-Z0-9]/gi,"") );        
    });

    /** no korean whatsoever **/
    $(document).on("keyup", ".input_nonkorean_only", function(e) {
        var patt = /[가-힣ㄱ-ㅎㅏ-ㅣ]/gi;
        if( patt.test($(this).val() )){
            $(this).addClass("missed");
            alert("숫자, 영문, 특수기호로 부탁드려요.");
        }        
        $(this).val( $(this).val().replace(/[가-힣ㄱ-ㅎㅏ-ㅣ]/gi,"") );        
    });


    /** HANGUL ONLY **/
    $(document).on("keyup", ".input_korean_only", function(e) {
        var patt = /[^가-힣ㄱ-ㅎㅏ-ㅣ]/gi;
        if( patt.test($(this).val() )){
            $(this).addClass("missed");
            alert("한글로 부탁드려요.");
        }        
        $(this).val( $(this).val().replace(/[^가-힣ㄱ-ㅎㅏ-ㅣ]/gi,"") );        
    });

    /** Remove Red around box **/
    $(document).on("keyup", ".missed", function(e) {
        $(".missed").removeClass("missed");
    });

    /** Remove Red around box **/
    $(document).on("change", ".missed", function(e) {
        $(".missed").removeClass("missed");
    });


    // hide error message on 'press confirm'
    $(document.body).on('click', '#errorboxconfirm' ,function(){
        $("#errorwp").hide();
        return false;        
    });


    // check selected file size
    $(document.body).on('change', '.form_filebox' ,function(){
        //this.files[0].size gets the size of your file.
        if(this.files[0].size > 5000000){
            $("#errorwp").show();
            $("#errorboxtext").html("이미지 파일은 5MB 아래로 해주세요.");
            $(this).val('');
            return false;
        }

    });



    /** LETS SUBMIT FORM!! **/
    $(document.body).on('click', '#join_form_submit_btn' ,function(){       

        $("#errorwp").show();
        //$("#errorboxconfirm").hide();
        $("#errorboxtext").html("신청 중입니다.");

        // at least one selected !$("#portrait").is(':checked')
        if( !$("#booth").is(':checked') && !$("#tradecard").is(':checked') && !$("#illust").is(':checked')){
            $("#errorwp").show();
            $("#errorboxtext").html("참가 항목은 한 개 이상 선택해주세요.");
            $("#form_category").addClass("missedbig");
            goToByScroll("input[name='illust_a']");
            return false;
        }


        if(!(dupcheckname && dupcheckemail) ){
            $("#errorwp").show();
            $("#errorboxtext").html("닉네임과, 이메일은 겹쳐서는 안돼요. ");
            goToByScroll("input[name='basic_name']");
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
        if($("input[name='basic_birthdate']").val().length != 6){
            $("#errorwp").show();
            $("#errorboxtext").html("생년월일을 입력해주세요");
            $("input[name='basic_birthdate']").addClass("missed");
            goToByScroll("input[name='basic_name']");
            return false;
        }
        if($("input[name='basic_contactphone']").val().length < 11){
            $("#errorwp").show();
            $("#errorboxtext").html("연락처를 입력해주세요.");
            $("input[name='basic_contactphone']").addClass("missed");
            goToByScroll("input[name='basic_name']");
            return false;
        }

        var emReg = new RegExp("[\w\d]*@[\w\d]*\.[\w\d]*");

        if (!emReg.test($("input[name='basic_contactemail']").val())){
            $("#errorwp").show();
            $("#errorboxtext").html("이메일을 적어주세요.");
            $("input[name='basic_contactemail']").addClass("missed");
            goToByScroll("input[name='basic_name']");
            return false;
        }

        if($("input[name='basic_password']").val().length < 6){
            $("#errorwp").show();
            $("#errorboxtext").html("비밀번호는 6자 이상 입력해주세요.");
            $("input[name='basic_password']").addClass("missed");
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
            /*
            if($("input[name='circle_image']").val().length < 1){
                $("#errorwp").show();
                $("#errorboxtext").html("서클 컷을 선택해주세요.");
                $("input[name='circle_image']").addClass("missed");
                goToByScroll("input[name='circle_contents']");
                return false;
            }*/
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
            /*
            if($("input[name='tc_sample1']").val().length < 1){
                $("#errorwp").show();
                $("#errorboxtext").html("트레카 샘플 이미지는 1개 이상 선택해주세요.");
                $("input[name='tc_sample1']").addClass("missed");
                goToByScroll("input[name='tc_sample1']");
                return false;
            }*/
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
        if($("input[name='basic_webbanner1']").val()){
            fd.append( 'basic_webbanner1', $('#basic_webbanner1')[0].files[0] );
        }
        if($("input[name='basic_webbanner2']").val()){
            fd.append( 'basic_webbanner2', $('#basic_webbanner2')[0].files[0] );
        }
        if($("input[name='basic_webbanner3']").val()){
            fd.append( 'basic_webbanner3', $('#basic_webbanner3')[0].files[0] );
        }

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
            url: "./php/register.php",
            type: "POST",
            data: fd,
            processData: false,
            contentType: false,
            success: function(data) {
                result = JSON.parse(data);
                if(result.statusC['status'] == 'success'){

                    $("#errorwp").show();
                    $("#errorboxtext").html("정상적으로 신청이 완료되었습니다.");

                    $("#box_joinus").load("pages.html #box_joinus_result", function(){
                        $('#joinus_result_content').html(generateResultContent(result.dat['category'], result.dat['basic_name'], result.dat['basic_contactemail'], result.dat['basic_password']));
                    });
                    

                }else if(result.statusC['status'] == 'timeyet'){
                    $("#errorwp").show();
                    $("#errorboxtext").html("신청 기간이 지났습니다.");

                }else{
                    $("#errorwp").show();
                    $("#errorboxtext").html("죄송합니다. 오류가 발생했어요.<br>관리자에게 문의 부탁드립니다.");
                }  
            }
        });

        return false;
        
    });




});