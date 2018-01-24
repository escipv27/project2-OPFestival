
function loaduserinfopage(){
    $.ajax({
            url: "./php/userinfoload.php",
            type: "POST",
            dataType: "json",
            success: function(data) {
                if(data.statusC['status'] == 'success'){
                    $("#page").load("page_nm.html #page_nm", function(){



                        // load basic info

                        $("#userinfo_title_name").html(data.userdata.basic['name']);


                        $("#ui_view_basic_name").html(data.userdata.basic['name']);
                        $("#ui_view_basic_birthdate").html(data.userdata.basic['birthdate']);
                        $("#ui_view_basic_contactphone").html(data.userdata.basic['contactphone']);
                        $("#ui_view_basic_contactemail").html(data.userdata.basic['contactemail']);

                        $("#ui_view_basic_password").html(data.userdata.pass['password']);

                        $("#ui_view_basic_homeaddress").html(data.userdata.basic['homeaddress']);
                        $("#ui_view_basic_contacttwitter").html(data.userdata.basic['contacttwitter']);

                        $("#ui_view_basic_webaddr1").html(data.userdata.basic['webaddr1']);
                        $("#ui_view_basic_webaddr2").html(data.userdata.basic['webaddr2']);
                        $("#ui_view_basic_webaddr3").html(data.userdata.basic['webaddr3']);

                        // images $("#entryCirclePicUrl").attr("src", data.userA['entrycirclepicurl']);
                        $("#ui_view_basic_webbanner1").attr("src", data.userdata.basic['webbanner1']);
                        $("#ui_view_basic_webbanner2").attr("src", data.userdata.basic['webbanner2']);
                        $("#ui_view_basic_webbanner3").attr("src", data.userdata.basic['webbanner3']);



                        if(data.userdata.basic['boothstatus'] != ""){

                            $("#ui_view_cat_booth").html(data.userdata.booth['boothstatus']);

                            $("#ui_view_circle_name").html(data.userdata.booth['circlename']);
                            $("#ui_view_circle_nicknames").html(data.userdata.booth['circlenicknames']);
                            $("#ui_view_circle_size").html(data.userdata.booth['circlesize']);
                            $("#ui_view_circle_contents").html(data.userdata.booth['circletype']);
                            $("#ui_view_circle_genre").html(data.userdata.booth['circlegenre']);
                            $("#ui_view_circle_info").html(data.userdata.booth['circleinfo']);
                            $("#ui_view_circle_grade").html(data.userdata.booth['circlegrade']);
                            $("#ui_view_circle_deposit").html(data.userdata.booth['circledeposit']);

                            $("#ui_view_circle_image").attr("src", data.userdata.booth['circleimage']);

                        }else{
                            $("#userinfo_booth").hide();
                            $("#ushd_booth").hide();
                        }



                        if(data.userdata.basic['portraitstatus'] != ""){
                            $("#ui_view_cat_portrait").html(data.userdata.portrait['portraitstatus']);

                            $("#ui_view_portrait_exp").html(data.userdata.portrait['portraitexp']);
                            $("#ui_view_portrait_desirechar").html(data.userdata.portrait['portraitdesirechar']);
                            $("#ui_view_portrait_avgworktime").html(data.userdata.portrait['portraitavgworktime']);
                            $("#ui_view_portrait_expworktime").html(data.userdata.portrait['portraitexpworktime']);
                        }else{
                            $("#userinfo_portrait").hide();
                            $("#ushd_portrait").hide();
                        }



                        if(data.userdata.basic['tradecardstatus'] != ""){
                            $("#ui_view_cat_tcard").html(data.userdata.tcard['tradecardstatus']);

                            $("#ui_view_tcard_type").html(data.userdata.tcard['tctypeA']);
                            $("#ui_view_tcard_type").append(" ");
                            $("#ui_view_tcard_type").append(data.userdata.tcard['tctypeB']);

                            $("#ui_view_tcard_desirechar").html(data.userdata.tcard['tcdesirechar']);
                            $("#ui_view_tcard_avgworktime").html(data.userdata.tcard['tcavgworktime']);
                            $("#ui_view_tcard_expworktime").html(data.userdata.tcard['tcexpworktime']);
                            $("#ui_view_tcard_password").html(data.userdata.tcard['tcpassword']);

                        }else{
                            $("#userinfo_tcard").hide();
                            $("#ushd_tcard").hide();
                        }





                        if(data.userdata.basic['illuststatus'] != ""){
                            $("#ui_view_cat_illust").html(data.userdata.illust['illuststatus']);

                            $("#ui_view_illust_type").html(data.userdata.illust['illusttype']);
                            $("#ui_view_illust_minprice").html(data.userdata.illust['illustminprice']);
                            $("#ui_view_illust_maxprice").html(data.userdata.illust['illustmaxprice']);
                            $("#ui_view_illust_bankaccount").html(data.userdata.illust['illustbankaccount']);
                            $("#ui_view_illust_acountnumber").html(data.userdata.illust['illustaccountnumber']);
                            $("#ui_view_illust_accountname").html(data.userdata.illust['illustaccountname']);
                            $("#ui_view_illust_password").html(data.userdata.illust['illustpassword']);


                        }else{
                            $("#userinfo_illust").hide();
                            $("#ushd_illust").hide();
                        }

                    });

                }else if(data.statusC['status'] == 'timeout'){ // logged in
                    $("#errorwp").show();
                    $("#errorboxtext").html("로그인 후 일정시간이 지나 자동으로 로그아웃 되었습니다.");
                    $("#page").load("index.html #mainbox", function(){
                        updateCheerBox();
                        randomLoadEventBanner();
                        checkloginstatus();
                    }); 
                }else{
                    $("#errorwp").show();
                    $("#errorboxtext").html("참가자 정보를 로딩하던 중 알 수 없는 오류가 발생했습니다.<br>번거로우시겠지만 관리자 문의 부탁드려요.");
                }  
            }
        });
}














$(document).ready(function(){




    /** USER LOGIN **/


    $(document.body).on('focus', '.lgn_input_box' ,function(){

        $(this).val("");
        return false;
        
    });


    $(document.body).on('click', '#login_tomypage', function(){
        loaduserinfopage();
    });



    $(document.body).on('submit', '#loginform' ,function(){


        /*
        var test = $("input[name='login_email']").val(); 
        var emReg = new RegExp("test.com");

        if (!emReg.test(test)){
            $("#errorwp").show();
            $("#errorboxtext").html("영차영차! 조금만 기다려주세요!");
            return false;
        }*/        

               
        
        

        if($("input[name='login_email']").length < 1){
            $("#errorwp").show();
            $("#errorboxtext").html("이메일 주소를 알려주세요.");
            return false;           
        }
        if($("input[name='login_pword']").length < 1){
            $("#errorwp").show();
            $("#errorboxtext").html("비밀번호는 중요해요!");
            return false;           
        }



        var jsonObject = {"loginemail" : $("input[name='login_email']").val(), "loginword" : $("input[name='login_pword']").val()};


        $.ajax({
            url: "./php/userloginvalidate.php",
            type: "POST",
            data: {json : JSON.stringify(jsonObject)},
            dataType: "json",
            success: function(data) {
                if(data.status == 'success'){
                    $("#errorwp").show();
                    $("#errorboxtext").html("로그인 성공적");
                    //$("#page").load("page_nm.html #page_nm", function(){});
                    loaduserinfopage();


                }else if(data.status == 'email'){
                    $("#errorwp").show();
                    $("#errorboxtext").html("이메일을 다시 확인해주세요.");


                }else if(data.status == 'password'){
                    $("#errorwp").show();
                    $("#errorboxtext").html("비밀 번호를 다시 확인해주세요.");
                }else{
                    $("#errorwp").show();
                    $("#errorboxtext").html("저로서는 알 수 없는 오류가 발생했습니다.<br>번거로우시겠지만 관리자 문의 부탁드려요.");

                }  
            }
        });

        return false;


    });



});