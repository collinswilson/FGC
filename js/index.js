$(document).ready(function() {

    let premium = false;



    function setModal(params){

        params.headerSelector === null ? null : params.headerSelector.html(params.headerContent);

        params.bodySelector === null ? null : params.bodySelector.html(params.bodyContent);

        params.footerSelector === null ? null : params.footerSelector.html(params.footerContent);

        params.modalSelector.modal(params.modalState === "show" ? "show" : "hide");

    }



    function gotoLocation(location){

        window.location.href = location;

    }



    function fetchDashboard(){

        let fetchDashboard = "fd";

        $.post("../classes/controller.php", { fetchDashboard }, function(data){

            //alert(data);

            let returnObj = JSON.parse(data);



            $("#rrr").html("N"+returnObj.rrr);

            $("#rrf").html("N"+returnObj.rrf);

            $("#rpr").html("N"+returnObj.rpr);

            $("#trr").html("N"+returnObj.trr);

            $("#tregr").html(returnObj.tregr);

            $("#tregp").html(returnObj.tregp);

        });

    }

    fetchDashboard();



    function fetchCampDetails(){

        let fetchDetails = "fd";

        let campId = $("#campId").text();

        $.post("../classes/controller.php", { fetchDetails, campId }, function(data){

            //alert(data);

            let returnObj = JSON.parse(data);



            $("#rrrDetail").html("N"+returnObj.rrr);

            $("#rrfDetail").html("N"+returnObj.rrf);

            $("#rprDetail").html("N"+returnObj.rpr);

            $("#trrDetail").html("N"+returnObj.trr);

            $("#tregrDetail").html(returnObj.tregr);

            $("#tregpDetail").html(returnObj.tregp);

        });

    }

    fetchCampDetails();



    $("#backToCampList").click(function(){

        gotoLocation("camp-list.php");

    });



    function fetchAdmins(){

        let fetchAdmins = "fa";

        $.post("../classes/controller.php", { fetchAdmins }, function(data){

            //alert(data);

            let adminArray = JSON.parse(data);



            var options = {

                dataSource: adminArray,

                callback: function (response, pagination) {

                    //window.console && console.log(response, pagination);

            

                    var dataHtml = '<tr>';



                    $.each(response, function (index, item) {

                        let normalButton = '<tr>'+

                              '<td>'+item.firstname+'</td>'+

                              '<td>'+item.lastname+'</td>'+

                              '<td>'+item.email+'</td>'+

                              '<td>'+item.dc+'</td>'+

                              '<td><a class="btn btn-danger btn-user deleteAdmin" userId="'+item.id+'">Delete User</a></td>'+

                            '</tr>';

                        

                        let disabledButton = '<tr>'+

                              '<td>'+item.firstname+'</td>'+

                              '<td>'+item.lastname+'</td>'+

                              '<td>'+item.email+'</td>'+

                              '<td>'+item.dc+'</td>'+

                              '<td><button class="btn btn-danger btn-user deleteAdmin" userId="'+item.id+'" disabled>Delete User</button></td>'+

                            '</tr>'

                        dataHtml += item.id == 1 ? disabledButton : normalButton;

                    });



                    dataHtml += '</tr>';



                    // let dataHtml = '';



                    // adminArray.map(function(admin){

                    //     dataHtml +='<tr>'+

                    //           '<td>'+admin.firstname+'</td>'+

                    //           '<td>'+admin.lastname+'</td>'+

                    //           '<td>'+admin.email+'</td>'+

                    //           '<td>'+admin.dc+'</td>'+

                    //         '</tr>';

                    // });

                    

                    $("#adminList").prev().html(dataHtml);

                }

            };



            $("#pagination-demo1").pagination(options);

        });

    }

    fetchAdmins();

    

    $(document).on('click', '.deleteAdmin', function(){

        let userId = $(this).attr("userId");

        let deleteAdmin = 'da';

        console.log(userId);

        

        $.post("../../classes/controller.php", { deleteAdmin, userId }, function(data){

                console.log(data);

                if(data == "Successful"){

                    setModal({

                        headerSelector: $("#modalHeader"), 

                        headerContent: "<i class='fas fa-check-circle text-success'></i> Success",

                        bodySelector: $("#modalBody"),

                        bodyContent:  "User deleted successfully!",

                        footerSelector: null,

                        footerContent: null,

                        modalSelector: $("#regModal"),

                        modalState: "show"

                    });

                    fetchAdmins();

                }else{

                    setModal({

                        headerSelector: $("#modalHeader"), 

                        headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",

                        bodySelector: $("#modalBody"),

                        bodyContent:  "User delete failed unexpectedly!",

                        footerSelector: null,

                        footerContent: null,

                        modalSelector: $("#regModal"),

                        modalState: "show"

                    });

                }    

            });

    });



    function fetchUsers(){

        let fetchUsers = "fu";

        $.post("../classes/controller.php", { fetchUsers }, function(data){

            //alert(data);

            let userArray = JSON.parse(data);



            var options = {

                dataSource: userArray,

                callback: function (response, pagination) {

                    //window.console && console.log(response, pagination);

            

                    var dataHtml = '';



                    $.each(response, function (index, user) {

                        dataHtml +='<tr>'+

                        '<td>'+user.firstname+'</td>'+

                        '<td>'+user.lastname+'</td>'+

                        '<td>'+user.email+'</td>'+

                        '<td>'+user.dc+'</td>'+

                        '<td><button class="btn btn-sm btn-rounded btn-outline-danger viewUserHistory" userId="'+user.id+'">View History</button></td>'+

                      '</tr>'



                    });



                    $("#userList").prev().html(dataHtml);

                }

            };



            $("#pagination-demo1").pagination(options);



        });

    }

    fetchUsers();



    $("#backToUserList").click(function(){

        gotoLocation("user-list.php");

    });



    $(document).on('click', '.viewUserHistory', function(){

        let userId = $(this).attr("userId");

        gotoLocation("user-profile.php?id="+userId);

    });



    function fetchCamps(){

        let fetchCamps = "fc";

        $.post("../classes/controller.php", { fetchCamps }, function(data){

            //alert(data);

            let campArray = JSON.parse(data);

            //alert(campArray);

            campArray.map(function(camp){

                $(".campList").append('<p class="p-3 border text-primary camps" style="margin: 0; cursor: pointer" campId="'+camp.id+'">'+camp.name+'</p>');

            });



            var options = {

                dataSource: campArray,

                callback: function (response, pagination) {

                    //window.console && console.log(response, pagination);

            

                    var dataHtml = '';



                    $.each(response, function (index, item) {

                        dataHtml +='<tr>'+

                        '<td>'+item.name+'</td>'+

                        '<td>'+item.theme+'</td>'+

                        '<td>'+item.start+'</td>'+

                        '<td>'+item.end+'</td>'+

                        '<td>'+item.created+'</td>'+

                        '<td>'+item.status+'</td>'+

                        '<td>'+

                        '<button class="btn btn-sm btn-warning campDetails" campId="'+item.id+'">Details</button>'+

                        '<button class="btn btn-sm btn-success campStat ml-2" campId="'+item.id+'">Statistics</button>'+

                        '</td>'+

                      '</tr>';



                        $(".campList").append('<p class="p-3 border text-primary camps" style="margin: 0; cursor: pointer" campId="'+item.id+'">'+item.name+'</p>');

                    });



                    $("#listOfCamps").prev().html(dataHtml);

                }

            };



            $("#pagination-demo1").pagination(options);



        });

    }

    fetchCamps();



    $(document).on('click', '.campDetails', function(){

        let campId = $(this).attr("campId");

        gotoLocation("camp-details.php?id="+campId);

    });



    $(document).on('click', '.campStat', function(){

        let campId = $(this).attr("campId");

        gotoLocation("camp-statistics.php?id="+campId);

    });



    $(document).on('click', '.camps', function(){

        //alert("bg");

         $(".camps").removeClass("bg-info");

         $(this).addClass("bg-info");



         let campId = $(this).attr("campId");

         let userId = $("#userIdHolder").text();

         //alert(userId+campId);

         let fetchHistoryAdmin = "fh";



        $.post("../classes/controller.php", { fetchHistoryAdmin, campId, userId }, function(data){

            //alert(data);

            let historyArray = JSON.parse(data);

            let htmlHolder = "";



            $("#historyListAdmin").html("");

            historyArray.map(function(history, index){



                htmlHolder +='<tr>'+

                                '<td>'+history.campName+'</td>'+

                                '<td>'+history.firstname+' '+history.lastname+'</td>'+

                                '<td>'+history.gender+'</td>'+

                                '<td>'+history.hmk+'</td>'+

                                '<td>'+history.ageGroup+'</td>'+

                                '<td>'+history.district+'</td>'+

                                '<td>'+history.arrival+'</td>'+

                                '<td>'+history.amount+'</td>'+

                            '</tr>';

            });



            $("#historyListAdmin").html(htmlHolder);

            

        });

         //alert(campId);

     });

    

    $('#registerUserButton').click(function(e){

        let firstname = $("#firstname").val();

        let lastname = $("#lastname").val();

        let email = $("#emailAddress").val();

        let password = $("#password").val();

        let rPassword = $("#rPassword").val();

        let registerUser = "registerUser";



        //alert(email + password + rPassword);

        if(firstname === ""){

            setModal({

                headerSelector: $("#modalHeader"), 

                headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",

                bodySelector: $("#modalBody"),

                bodyContent:  "First name field is required",

                footerSelector: null,

                footerContent: null,

                modalSelector: $("#regModal"),

                modalState: "show"

            });

        }else if(lastname === ""){

            setModal({

                headerSelector: $("#modalHeader"), 

                headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",

                bodySelector: $("#modalBody"),

                bodyContent:  "Last name field is required",

                footerSelector: null,

                footerContent: null,

                modalSelector: $("#regModal"),

                modalState: "show"

            });

        }else if(email === ""){

            setModal({

                headerSelector: $("#modalHeader"), 

                headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",

                bodySelector: $("#modalBody"),

                bodyContent:  "Email field is required",

                footerSelector: null,

                footerContent: null,

                modalSelector: $("#regModal"),

                modalState: "show"

            });

        }else if(password === ""){

            setModal({

                headerSelector: $("#modalHeader"), 

                headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",

                bodySelector: $("#modalBody"),

                bodyContent:  "Password field is required",

                footerSelector: null,

                footerContent: null,

                modalSelector: $("#regModal"),

                modalState: "show"

            });

        }else if(rPassword === ""){

            setModal({

                headerSelector: $("#modalHeader"), 

                headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",

                bodySelector: $("#modalBody"),

                bodyContent:  "Repeat password field is required",

                footerSelector: null,

                footerContent: null,

                modalSelector: $("#regModal"),

                modalState: "show"

            });

        }else if(password !== rPassword){

            setModal({

                headerSelector: $("#modalHeader"), 

                headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",

                bodySelector: $("#modalBody"),

                bodyContent:  "Password not match",

                footerSelector: null,

                footerContent: null,

                modalSelector: $("#regModal"),

                modalState: "show"

            });

        }else{

            $("#registerUserButton").hide('slow');

            $("#registerUserLoader").show('slow');



            e.preventDefault();

            $.post("../../classes/controller.php", { registerUser, firstname, lastname, email, password, rPassword }, function(data){

                //alert(data);

                if(data === "Registration Successful"){

                   setModal({

                        headerSelector: $("#modalHeader"), 

                        headerContent: "<i class='fas fa-check-circle text-success'></i> Success",

                        bodySelector: $("#modalBody"),

                        bodyContent:  "Registration Successful!",

                        footerSelector: null,

                        footerContent: null,

                        modalSelector: $("#regModal"),

                        modalState: "show"

                    });

                    setTimeout(function(){

                        gotoLocation("../../");

                    }, 3000);



                    $("#registerUserButton").show('slow');

                    $("#registerUserLoader").hide('slow');

                }else if(data === "Email already existing"){

                    setModal({

                        headerSelector: $("#modalHeader"), 

                        headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",

                        bodySelector: $("#modalBody"),

                        bodyContent:  "Email is already existing!",

                        footerSelector: null,

                        footerContent: null,

                        modalSelector: $("#regModal"),

                        modalState: "show"

                    }); 



                    $("#registerUserButton").show('slow');

                    $("#registerUserLoader").hide('slow');

                }else{

                    setModal({

                        headerSelector: $("#modalHeader"), 

                        headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",

                        bodySelector: $("#modalBody"),

                        bodyContent:  "Registration failed for some unknown reasons, try again!",

                        footerSelector: null,

                        footerContent: null,

                        modalSelector: $("#regModal"),

                        modalState: "show"

                    }); 



                    $("#registerUserButton").show('slow');

                    $("#registerUserLoader").hide('slow');

                }

            });

        }

    });



    $('#registerAdminButton').click(function(e){

        let firstname = $("#firstname").val();

        let lastname = $("#lastname").val();

        let email = $("#emailAddress").val();

        let password = $("#password").val();

        let rPassword = $("#rPassword").val();

        let registerAdmin = "registerAdmin";



        //alert(email + password + rPassword);

        if(firstname === ""){

            setModal({

                headerSelector: $("#modalHeader"), 

                headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",

                bodySelector: $("#modalBody"),

                bodyContent:  "First name field is required",

                footerSelector: null,

                footerContent: null,

                modalSelector: $("#regModal"),

                modalState: "show"

            });

        }else if(lastname === ""){

            setModal({

                headerSelector: $("#modalHeader"), 

                headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",

                bodySelector: $("#modalBody"),

                bodyContent:  "Last name field is required",

                footerSelector: null,

                footerContent: null,

                modalSelector: $("#regModal"),

                modalState: "show"

            });

        }else if(email === ""){

            setModal({

                headerSelector: $("#modalHeader"), 

                headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",

                bodySelector: $("#modalBody"),

                bodyContent:  "Email field is required",

                footerSelector: null,

                footerContent: null,

                modalSelector: $("#regModal"),

                modalState: "show"

            });

        }else if(password === ""){

            setModal({

                headerSelector: $("#modalHeader"), 

                headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",

                bodySelector: $("#modalBody"),

                bodyContent:  "Password field is required",

                footerSelector: null,

                footerContent: null,

                modalSelector: $("#regModal"),

                modalState: "show"

            });

        }else if(rPassword === ""){

            setModal({

                headerSelector: $("#modalHeader"), 

                headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",

                bodySelector: $("#modalBody"),

                bodyContent:  "Repeat password field is required",

                footerSelector: null,

                footerContent: null,

                modalSelector: $("#regModal"),

                modalState: "show"

            });

        }else if(password !== rPassword){

            setModal({

                headerSelector: $("#modalHeader"), 

                headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",

                bodySelector: $("#modalBody"),

                bodyContent:  "Password not match",

                footerSelector: null,

                footerContent: null,

                modalSelector: $("#regModal"),

                modalState: "show"

            });

        }else{

            $("#registerAdminButton").hide('slow');

            $("#loaderButton").show('slow');

            e.preventDefault();

            $.post("../classes/controller.php", { registerAdmin, firstname, lastname, email, password, rPassword }, function(data){

                //alert(data);

                if(data === "Registration Successful"){

                   setModal({

                        headerSelector: $("#modalHeader"), 

                        headerContent: "<i class='fas fa-check-circle text-success'></i> Success",

                        bodySelector: $("#modalBody"),

                        bodyContent:  "Registration Successful!",

                        footerSelector: null,

                        footerContent: null,

                        modalSelector: $("#regModal"),

                        modalState: "show"

                    });

                    setTimeout(function(){

                        gotoLocation("../admin/create-admin.php");

                    }, 4000);



                    $("#registerAdminButton").show('slow');

                    $("#loaderButton").hide('slow');

                }else{

                    setModal({

                        headerSelector: $("#modalHeader"), 

                        headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",

                        bodySelector: $("#modalBody"),

                        bodyContent:  "Registration failed for some unknown reasons, try again!",

                        footerSelector: null,

                        footerContent: null,

                        modalSelector: $("#regModal"),

                        modalState: "show"

                    }); 



                    $("#registerAdminButton").show('slow');

                    $("#loaderButton").hide('slow');

                }

            });

        }

    });

    

    $('#changePword').click(function(){

        let changePword = 'cp';

        let pword = $('#password').val();

        let rpword = $('#rpassword').val();

        

        console.log(pword + ' ' + rpword);

        

        if(pword == '' || rpword == ''){

            setModal({

                headerSelector: $("#modalHeader"), 

                headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",

                bodySelector: $("#modalBody"),

                bodyContent:  "All fields are compulsory and passwords must match",

                footerSelector: null,

                footerContent: null,

                modalSelector: $("#regModal"),

                modalState: "show"

            });

        }else if(pword != rpword){

            setModal({

                headerSelector: $("#modalHeader"), 

                headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",

                bodySelector: $("#modalBody"),

                bodyContent:  "All fields are compulsory and passwords must match",

                footerSelector: null,

                footerContent: null,

                modalSelector: $("#regModal"),

                modalState: "show"

            });

        }else{

            $("#scanLoader").show("slow");

            $('#changePword').hide("slow");

            $.post("../../classes/controller.php", { changePword, pword, rpword}, function(data){

                console.log(data);

                if(data == "Successful"){

                    setModal({

                        headerSelector: $("#modalHeader"), 

                        headerContent: "<i class='fas fa-check-circle text-success'></i> Success",

                        bodySelector: $("#modalBody"),

                        bodyContent:  "Password changed successfully!",

                        footerSelector: null,

                        footerContent: null,

                        modalSelector: $("#regModal"),

                        modalState: "show"

                    });

                    $("#scanLoader").hide("slow");

                    $('#changePword').show("slow");

                }else{

                    setModal({

                        headerSelector: $("#modalHeader"), 

                        headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",

                        bodySelector: $("#modalBody"),

                        bodyContent:  "Password change failed unexpectedly!",

                        footerSelector: null,

                        footerContent: null,

                        modalSelector: $("#regModal"),

                        modalState: "show"

                    });

                    $("#scanLoader").hide("slow");

                    $('#changePword').show("slow");

                }    

            });

        }

    });



    $('#createCampButton').click(function(e){

        let campName = $("#campName").val();

        let campTheme = $("#campTheme").val();

        let startDate = $("#startDate").val();

        let endDate = $("#endDate").val();

        let rrFee = $("#rrFee").val();

        let createCamp = "cc";

        

        //alert(email + password + rPassword);

        if(campName === ""){

            setModal({

                headerSelector: $("#modalHeader"), 

                headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",

                bodySelector: $("#modalBody"),

                bodyContent:  "Camp name field is required",

                footerSelector: null,

                footerContent: null,

                modalSelector: $("#regModal"),

                modalState: "show"

            });

        }else if(campTheme === ""){

            setModal({

                headerSelector: $("#modalHeader"), 

                headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",

                bodySelector: $("#modalBody"),

                bodyContent:  "Camp theme field is required",

                footerSelector: null,

                footerContent: null,

                modalSelector: $("#regModal"),

                modalState: "show"

            });

        }else if(startDate === ""){

            setModal({

                headerSelector: $("#modalHeader"), 

                headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",

                bodySelector: $("#modalBody"),

                bodyContent:  "Start date field is required",

                footerSelector: null,

                footerContent: null,

                modalSelector: $("#regModal"),

                modalState: "show"

            });

        }else if(endDate === ""){

            setModal({

                headerSelector: $("#modalHeader"), 

                headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",

                bodySelector: $("#modalBody"),

                bodyContent:  "End date field is required",

                footerSelector: null,

                footerContent: null,

                modalSelector: $("#regModal"),

                modalState: "show"

            });

        }else if(rrFee === ""){

            setModal({

                headerSelector: $("#modalHeader"), 

                headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",

                bodySelector: $("#modalBody"),

                bodyContent:  "Regular registration fee is required",

                footerSelector: null,

                footerContent: null,

                modalSelector: $("#regModal"),

                modalState: "show"

            });

        }else{

            $("#createCampButton").hide('slow');

            $("#loaderButton").show('slow');



            e.preventDefault();

            $.post("../classes/controller.php", { createCamp, campName, campTheme, startDate, endDate, rrFee }, function(data){

                //alert(data);

                if(data === "Successfully Created"){

                   setModal({

                        headerSelector: $("#modalHeader"), 

                        headerContent: "<i class='fas fa-check-circle text-success'></i> Success",

                        bodySelector: $("#modalBody"),

                        bodyContent:  "Camp Created Successfully!",

                        footerSelector: null,

                        footerContent: null,

                        modalSelector: $("#regModal"),

                        modalState: "show"

                    });

                    setTimeout(function(){

                        gotoLocation("../admin/create-camp.php");

                    }, 4000);



                    $("#createCampButton").show('slow');

                    $("#loaderButton").hide('slow');

                }else{

                    setModal({

                        headerSelector: $("#modalHeader"), 

                        headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",

                        bodySelector: $("#modalBody"),

                        bodyContent:  "Camp creation failed for some unknown reasons, make sure you have no active camps and try again!",

                        footerSelector: null,

                        footerContent: null,

                        modalSelector: $("#regModal"),

                        modalState: "show"

                    }); 



                    $("#createCampButton").show('slow');

                    $("#loaderButton").hide('slow');

                }

            });

        }

    });



    $('#userLoginButton').click(function(){

        let email = $("#emailAddress").val();

        let password = $("#password").val();

        let logUserIn = "Login";



        $.post("../../classes/controller.php", { logUserIn, email, password }, function(data){

            $("#userLoginButton").hide('slow');

            $("#userLoginLoader").show('slow');



            console.log(data);

            if(data === "1"){

               setModal({

                    headerSelector: $("#modalHeader"), 

                    headerContent: "<i class='fas fa-check-circle text-success'></i> Success",

                    bodySelector: $("#modalBody"),

                    bodyContent:  "Login Successful!",

                    footerSelector: null,

                    footerContent: null,

                    modalSelector: $("#regModal"),

                    modalState: "show"

                });

                setTimeout(function(){

                    gotoLocation("../main-page");

                }, 2000);



                $("#userLoginButton").show('slow');

                $("#userLoginLoader").hide('slow');

            }else{

                setModal({

                    headerSelector: $("#modalHeader"), 

                    headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",

                    bodySelector: $("#modalBody"),

                    bodyContent:  "Incorrect login credentials",

                    footerSelector: null,

                    footerContent: null,

                    modalSelector: $("#regModal"),

                    modalState: "show"

                }); 



                $("#userLoginButton").show('slow');

                $("#userLoginLoader").hide('slow');

            }

        });

        //window.location.href = "user/main-page";

    });


    // let participants = [];

    // $("#rregisterCamp").click(function(e){

    //     let firstname = $("#rfirstname").val();

    //     let lastname = $("#rlastname").val();

    //     let phone = $("#rphone").val();

    //     let email = $("#remail").val();

    //     let ageGroup = $("#rageGroup").val();

    //     let gender = $("#rgender").val();

    //     let kidsComing = '';

    //     let kidsNumber = '';

    //     let member = $("#rmember").val();

    //     let district = $("#rdistrict").val();

    //     let arrivalDate = '';

    //     let houseAccess = '';

    //     let anyAmount = $("#anyAmount").val()=='' ? 0 : $("#anyAmount").val();

    //     let regularFee = $("#regularFee").text();

    //     let paymentSum = parseInt(anyAmount) + parseInt(regularFee)

    //     let participantPayment  = paymentSum;

    //     let regularReg = "rr";

    //     let regType = 'regular';



    //     let qrData = $("#qrData").text();

    //     let userId = qrData.split(":")[0];

    //     let campId = qrData.split(":")[1];



    //     //alert(userId+":"+campId);

        

    //     console.log({ firstname, lastname, phone, email, ageGroup, gender, kidsComing, kidsNumber, member, district, arrivalDate, houseAccess, anyAmount, userId, campId, anyAmount, regularFee, participantPayment, regType });



    //     if(firstname === ""){

    //         setModal({

    //             headerSelector: $("#modalHeader"), 

    //             headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",

    //             bodySelector: $("#modalBody"),

    //             bodyContent:  "First name is required!",

    //             footerSelector: null,

    //             footerContent: null,

    //             modalSelector: $("#regModal"),

    //             modalState: "show"

    //         });

    //     }else if(lastname === ""){

    //         setModal({

    //             headerSelector: $("#modalHeader"), 

    //             headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",

    //             bodySelector: $("#modalBody"),

    //             bodyContent:  "Last name is required!",

    //             footerSelector: null,

    //             footerContent: null,

    //             modalSelector: $("#regModal"),

    //             modalState: "show"

    //         });

    //     }else if(phone === ""){

    //         setModal({

    //             headerSelector: $("#modalHeader"), 

    //             headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",

    //             bodySelector: $("#modalBody"),

    //             bodyContent:  "Phone numner is required!",

    //             footerSelector: null,

    //             footerContent: null,

    //             modalSelector: $("#regModal"),

    //             modalState: "show"

    //         });

    //     }else if(ageGroup === ""){

    //         setModal({

    //             headerSelector: $("#modalHeader"), 

    //             headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",

    //             bodySelector: $("#modalBody"),

    //             bodyContent:  "Age group is required!",

    //             footerSelector: null,

    //             footerContent: null,

    //             modalSelector: $("#regModal"),

    //             modalState: "show"

    //         });

    //     }else if(gender == ""){

    //         setModal({

    //             headerSelector: $("#modalHeader"), 

    //             headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",

    //             bodySelector: $("#modalBody"),

    //             bodyContent: "Gender is required!",

    //             footerSelector: null,

    //             footerContent: null,

    //             modalSelector: $("#regModal"),

    //             modalState: "show"

    //         });

    //     }else if(member == ""){

    //         setModal({

    //             headerSelector: $("#modalHeader"), 

    //             headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",

    //             bodySelector: $("#modalBody"),

    //             bodyContent: "Are you a foursquare member?!",

    //             footerSelector: null,

    //             footerContent: null,

    //             modalSelector: $("#regModal"),

    //             modalState: "show"

    //         });

    //     }else{

    //         $("#rregisterLoader").show('slow');

    //         $("#rregisterCamp").hide('slow');

    //         let participant = { firstname, lastname, phone, email, ageGroup, gender, kidsComing, kidsNumber, member, district, arrivalDate, houseAccess, anyAmount,  participantPayment, regType };
    //         participants.push(participant);
    //         let totalVal = $("#total").text();
    //         totalVal = parseInt(totalVal) + participantPayment;
    //         $("#total").text(totalVal);
    //         console.log(participants);

    //         $("#rfirstname").val("");
    //         $("#rlastname").val("");
    //         $("#rphone").val("");
    //         $("#remail").val("");
    //         $("#rageGroup").val("");
    //         $("#rgender").val("");
    //         $("#rmember").val("");
    //         $("#rdistrict").val("");
    //         $("#anyAmount").val("");


    //         let tableRow = 
    //         '<tr>' +
    //             '<th scope="row">1</th>' +
    //             '<td>'+participant.firstname+'</td>' +
    //             '<td>'+participant.lastname+'</td>' +
    //             '<td>'+participant.phone+'</td>' +
    //             '<td>'+participant.email+'</td>' +
    //             '<td>'+participant.ageGroup+'</td>' +
    //             '<td>'+participant.gender+'</td>' +
    //             '<td>'+participant.member+'</td>' +
    //             '<td>'+participant.district+'</td>' +
    //             '<td>'+participant.regType+'</td>' +
    //             '<td>'+participant.participantPayment+'</td>' +
    //         '</tr>'
    //         $("#participantTable").append(tableRow);


    //         $("#rregisterLoader").hide('slow');
    //         $("#rregisterCamp").show('slow');


    //         /*e.preventDefault();

    //         let handler = PaystackPop.setup({

    //         // key: 'pk_live_b3e5d1863418258bc93d723b28364de61e043bc1',

    //         key: 'pk_test_4697a3a0abdf2c4173337a341a907588df55a51e',

    //         email: email == "" ? 'subscribers@foursquareyouthcamp.com' : email,

    //         amount: anyAmount == "" ? regularFee * 100 : (parseInt(anyAmount) + parseInt(regularFee)) * 100,

    //         ref: ''+Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you

    //         // label: "Optional string that replaces customer email"

    //         onClose: function(){

    //             setModal({

    //                 headerSelector: $("#modalHeader"), 

    //                 headerContent: "<i class='fas fa-exclamation-triangle text-warning'></i> Alert",

    //                 bodySelector: $("#modalBody"),

    //                 bodyContent: "You just cancelled the ongoing payment!",

    //                 footerSelector: null,

    //                 footerContent: null,

    //                 modalSelector: $("#regModal"),

    //                 modalState: "show"

    //             });



    //             $("#rregisterLoader").hide('slow');

    //             $("#rregisterCamp").show('slow');

    //         },

    //         callback: function(response){

    //             console.log(response);

    //             //let message = 'Payment complete! Reference: ' + response.reference;

    //             //alert(message);

    //             let ref = response.reference;

    //             $.post("../../classes/controller.php", { regularReg, firstname, lastname, phone, email, ageGroup, gender, kidsComing, kidsNumber, member, district, arrivalDate, houseAccess, anyAmount, ref, userId, campId }, function(data){

    //                 console.log(data);

    //                 if(data === "Registration Successful"){

    //                     let qrcode = new QRCode('qrCode');

    //                     qrcode.makeCode(userId + ':' + campId + ':' + ref + ':bulk');



    //                     setModal({

    //                         headerSelector: $("#modalHeader"), 

    //                         headerContent: "<i class='fas fa-check-circle text-success'></i> Success",

    //                         bodySelector: $("#modalBody"),

    //                         bodyContent:  "",

    //                         footerSelector: null,

    //                         footerContent: null,

    //                         modalSelector: $("#qrModal"),

    //                         modalState: "show"

    //                     });

                    

    //                 }else{

    //                     setModal({

    //                         headerSelector: $("#modalHeader"), 

    //                         headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",

    //                         bodySelector: $("#modalBody"),

    //                         bodyContent:  "Server error, try again!",

    //                         footerSelector: null,

    //                         footerContent: null,

    //                         modalSelector: $("#regModal"),

    //                         modalState: "show"

    //                     });

                        

    //                     $("#rregisterLoader").hide('slow');

    //                     $("#rregisterCamp").show('slow');

    //                 }

    //             });

    //         }

    //         });

    //         handler.openIframe();*/



    //     }



    // });



    $("#rregisterCampAnonymous").click(function(e){

        let firstname = $("#rfirstname").val();

        let lastname = $("#rlastname").val();

        let phone = $("#rphone").val();

        let email = $("#remail").val();

        let ageGroup = $("#rageGroup").val();

        let gender = $("#rgender").val();

        let kidsComing = '';

        let kidsNumber = '';

        let member = $("#rmember").val();

        let district = $("#rdistrict").val();

        let arrivalDate = '';

        let houseAccess = '';

        let anyAmount = $("#anyAmount").val();

        let regularFee = $("#regularFee").text();

        let regularRegAnonymous = "rr";



        let qrData = $("#qrData").text();

        let campId = qrData;

        let userId = ''+Math.floor((Math.random() * 1000000000) + 1);



        //alert(userId+":"+campId);

        

        console.log({ firstname, lastname, phone, email, ageGroup, gender, kidsComing, kidsNumber, member, district, arrivalDate, houseAccess, anyAmount });



        if(firstname === ""){

            setModal({

                headerSelector: $("#modalHeader"), 

                headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",

                bodySelector: $("#modalBody"),

                bodyContent:  "First name is required!",

                footerSelector: null,

                footerContent: null,

                modalSelector: $("#regModal"),

                modalState: "show"

            });

        }else if(lastname === ""){

            setModal({

                headerSelector: $("#modalHeader"), 

                headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",

                bodySelector: $("#modalBody"),

                bodyContent:  "Last name is required!",

                footerSelector: null,

                footerContent: null,

                modalSelector: $("#regModal"),

                modalState: "show"

            });

        }else if(phone === ""){

            setModal({

                headerSelector: $("#modalHeader"), 

                headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",

                bodySelector: $("#modalBody"),

                bodyContent:  "Phone numner is required!",

                footerSelector: null,

                footerContent: null,

                modalSelector: $("#regModal"),

                modalState: "show"

            });

        }else if(ageGroup === ""){

            setModal({

                headerSelector: $("#modalHeader"), 

                headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",

                bodySelector: $("#modalBody"),

                bodyContent:  "Age group is required!",

                footerSelector: null,

                footerContent: null,

                modalSelector: $("#regModal"),

                modalState: "show"

            });

        }else if(gender == ""){

            setModal({

                headerSelector: $("#modalHeader"), 

                headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",

                bodySelector: $("#modalBody"),

                bodyContent: "Gender is required!",

                footerSelector: null,

                footerContent: null,

                modalSelector: $("#regModal"),

                modalState: "show"

            });

        }else if(member == ""){

            setModal({

                headerSelector: $("#modalHeader"), 

                headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",

                bodySelector: $("#modalBody"),

                bodyContent: "Are you a foursquare member?!",

                footerSelector: null,

                footerContent: null,

                modalSelector: $("#regModal"),

                modalState: "show"

            });

        }else{

            $("#rregisterLoader").show('slow');

            $("#rregisterCampAnonymous").hide('slow');



            e.preventDefault();

            let handler = PaystackPop.setup({

            key: 'pk_live_b3e5d1863418258bc93d723b28364de61e043bc1',

            // key: 'pk_test_4697a3a0abdf2c4173337a341a907588df55a51e',

            email: email == "" ? 'subscribers@foursquareyouthcamp.com' : email,

            amount: anyAmount == "" ? regularFee * 100 : (parseInt(anyAmount) + parseInt(regularFee)) * 100,

            ref: ''+Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you

            // label: "Optional string that replaces customer email"

            onClose: function(){

                setModal({

                    headerSelector: $("#modalHeader"), 

                    headerContent: "<i class='fas fa-exclamation-triangle text-warning'></i> Alert",

                    bodySelector: $("#modalBody"),

                    bodyContent: "You just cancelled the ongoing payment!",

                    footerSelector: null,

                    footerContent: null,

                    modalSelector: $("#regModal"),

                    modalState: "show"

                });



                $("#rregisterLoader").hide('slow');

                $("#rregisterCampAnonymous").show('slow');

            },

            callback: function(response){

                console.log(response);

                //let message = 'Payment complete! Reference: ' + response.reference;

                //alert(message);

                let ref = response.reference;

                $.post("classes/controller.php", { regularRegAnonymous, firstname, lastname, phone, email, ageGroup, gender, kidsComing, kidsNumber, member, district, arrivalDate, houseAccess, anyAmount, ref, userId, campId }, function(data){

                    console.log(data);

                    if(data === "Registration Successful"){

                        let qrcode = new QRCode('qrCode');

                        qrcode.makeCode(userId + ':' + campId + ':' + ref);



                        setModal({

                            headerSelector: $("#modalHeader"), 

                            headerContent: "<i class='fas fa-check-circle text-success'></i> Success",

                            bodySelector: $("#modalBody"),

                            bodyContent:  "",

                            footerSelector: null,

                            footerContent: null,

                            modalSelector: $("#qrModal"),

                            modalState: "show"

                        });

                    

                    }else{

                        setModal({

                            headerSelector: $("#modalHeader"), 

                            headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",

                            bodySelector: $("#modalBody"),

                            bodyContent:  "Server error, try again!",

                            footerSelector: null,

                            footerContent: null,

                            modalSelector: $("#regModal"),

                            modalState: "show"

                        });

                        

                        $("#rregisterLoader").hide('slow');

                        $("#rregisterCampAnonymous").show('slow');

                    }

                });

            }

            });

            handler.openIframe();



        }



    });



    $("#okReg").click(function(){

        setModal({

            headerSelector: $("#modalHeader"), 

            headerContent: "<i class='fas fa-check-circle text-success'></i> Success",

            bodySelector: $("#modalBody"),

            bodyContent:  "",

            footerSelector: null,

            footerContent: null,

            modalSelector: $("#qrModal"),

            modalState: "hide"

        });



        setModal({

            headerSelector: $("#modalHeader"), 

            headerContent: "<i class='fas fa-check-circle text-success'></i> Success",

            bodySelector: $("#modalBody"),

            bodyContent:  "Registration Successful!",

            footerSelector: null,

            footerContent: null,

            modalSelector: $("#regModal"),

            modalState: "show"

        });

        setTimeout(function(){

            gotoLocation("../main-page");

        }, 2000);



        $("#rregisterLoader").hide('slow');

        $("#rregisterCamp").show('slow');



        $("#pregisterLoader").hide('slow');

        $("#pregisterCamp").show('slow');



    });



    $("#okRegAnonymous").click(function(){

        setModal({

            headerSelector: $("#modalHeader"), 

            headerContent: "<i class='fas fa-check-circle text-success'></i> Success",

            bodySelector: $("#modalBody"),

            bodyContent:  "",

            footerSelector: null,

            footerContent: null,

            modalSelector: $("#qrModal"),

            modalState: "hide"

        });



        setModal({

            headerSelector: $("#modalHeader"), 

            headerContent: "<i class='fas fa-check-circle text-success'></i> Success",

            bodySelector: $("#modalBody"),

            bodyContent:  "Registration Successful!",

            footerSelector: null,

            footerContent: null,

            modalSelector: $("#regModal"),

            modalState: "show"

        });

        setTimeout(function(){

            gotoLocation("../");

        }, 2000);



        $("#rregisterLoader").hide('slow');

        $("#rregisterCamp").show('slow');



        $("#pregisterLoader").hide('slow');

        $("#pregisterCamp").show('slow');



    });



    $("#pregisterCamp").click(function(e){

        let firstname = $("#pfirstname").val();

        let lastname = $("#plastname").val();

        let phone = $("#pphone").val();

        let email = $("#pemail").val();

        let ageGroup = $("#pageGroup").val();

        let gender = $("#pgender").val();

        let kidsComing = '';

        let kidsNumber = '';

        let member = $("#pmember").val();

        let district = $("#pdistrict").val();

        let arrivalDate = '';

        let houseAccess = '';

        let premiumAmount = $("#premiumAmount").val() === "more" ? $("#otherAmount").val() : $("#premiumAmount").val();

        let participantPayment = parseInt(premiumAmount);

        let premiumReg = "pr";

        let regType = 'premium';

        let anyAmount = premiumAmount;



        let qrData = $("#qrData").text();

        let userId = qrData.split(":")[0];

        let campId = qrData.split(":")[1];



        console.log({ firstname, lastname, phone, email, ageGroup, gender, kidsComing, kidsNumber, member, district, arrivalDate, houseAccess, userId, campId, anyAmount, participantPayment, regType});

        if(firstname === ""){

            setModal({

                headerSelector: $("#modalHeader"), 

                headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",

                bodySelector: $("#modalBody"),

                bodyContent:  "First name is required!",

                footerSelector: null,

                footerContent: null,

                modalSelector: $("#regModal"),

                modalState: "show"

            });

        }else if(lastname === ""){

            setModal({

                headerSelector: $("#modalHeader"), 

                headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",

                bodySelector: $("#modalBody"),

                bodyContent:  "Last name is required!",

                footerSelector: null,

                footerContent: null,

                modalSelector: $("#regModal"),

                modalState: "show"

            });

        }else if(phone === ""){

            setModal({

                headerSelector: $("#modalHeader"), 

                headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",

                bodySelector: $("#modalBody"),

                bodyContent:  "Phone numner is required!",

                footerSelector: null,

                footerContent: null,

                modalSelector: $("#regModal"),

                modalState: "show"

            });

        }else if(ageGroup === ""){

            setModal({

                headerSelector: $("#modalHeader"), 

                headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",

                bodySelector: $("#modalBody"),

                bodyContent:  "Age group is required!",

                footerSelector: null,

                footerContent: null,

                modalSelector: $("#regModal"),

                modalState: "show"

            });

        }else if(gender == ""){

            setModal({

                headerSelector: $("#modalHeader"), 

                headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",

                bodySelector: $("#modalBody"),

                bodyContent: "Gender is required!",

                footerSelector: null,

                footerContent: null,

                modalSelector: $("#regModal"),

                modalState: "show"

            });

        }else if(member == ""){

            setModal({

                headerSelector: $("#modalHeader"), 

                headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",

                bodySelector: $("#modalBody"),

                bodyContent: "Are you a foursquare member?!",

                footerSelector: null,

                footerContent: null,

                modalSelector: $("#regModal"),

                modalState: "show"

            });

        }else if(premiumAmount == "" || premiumAmount < 30000){

            setModal({

                headerSelector: $("#modalHeader"), 

                headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",

                bodySelector: $("#modalBody"),

                bodyContent: "Registration category is required, make sure amount is not lower than N30,000!",

                footerSelector: null,

                footerContent: null,

                modalSelector: $("#regModal"),

                modalState: "show"

            });

        }else{

            $("#pregisterLoader").show('slow');

            $("#pregisterCamp").hide('slow');

            let participant = { firstname, lastname, phone, email, ageGroup, gender, kidsComing, kidsNumber, member, district, arrivalDate, houseAccess, anyAmount, participantPayment, regType};
            participants.push(participant);
            let totalVal = $("#total").text();
            totalVal = parseInt(totalVal) + participantPayment;
            $("#total").text(totalVal);
            console.log(participants);

            $("#rregisterLoader").hide('slow');
            $("#rregisterCamp").show('slow');

            $("#pfirstname").val("");
            $("#plastname").val("");
            $("#pphone").val("");
            $("#pemail").val("");
            $("#pageGroup").val("");
            $("#pgender").val("");
            $("#pmember").val("");
            $("#pdistrict").val("");
            $("#premiumAmount").val("");
            $("#otherAmount").val(""); 
            $("#premiumAmount").val("");

            let tableRow = 
            '<tr>' +
                '<th scope="row">1</th>' +
                '<td>'+participant.firstname+'</td>' +
                '<td>'+participant.lastname+'</td>' +
                '<td>'+participant.phone+'</td>' +
                '<td>'+participant.email+'</td>' +
                '<td>'+participant.ageGroup+'</td>' +
                '<td>'+participant.gender+'</td>' +
                '<td>'+participant.member+'</td>' +
                '<td>'+participant.district+'</td>' +
                '<td>'+participant.regType+'</td>' +
                '<td>'+participant.participantPayment+'</td>' +
            '</tr>'
            $("#participantTable").append(tableRow);

            $("#pregisterLoader").hide('slow');
            $("#pregisterCamp").show('slow');



            /*e.preventDefault();

            let handler = PaystackPop.setup({

            key: 'pk_live_b3e5d1863418258bc93d723b28364de61e043bc1',

            // key: 'pk_test_4697a3a0abdf2c4173337a341a907588df55a51e', // Replace with your public key

            email: email == "" ? 'subscribers@foursquareyouthcamp.com' : email,

            amount: premiumAmount * 100,

            ref: ''+Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you

            // label: "Optional string that replaces customer email"

            onClose: function(){

                setModal({

                    headerSelector: $("#modalHeader"), 

                    headerContent: "<i class='fas fa-exclamation-triangle text-warning'></i> Alert",

                    bodySelector: $("#modalBody"),

                    bodyContent: "You just cancelled the ongoing payment!",

                    footerSelector: null,

                    footerContent: null,

                    modalSelector: $("#regModal"),

                    modalState: "show"

                });



                $("#pregisterLoader").hide('slow');

                $("#pregisterCamp").show('slow');

            },

            callback: function(response){

                console.log(response);

                //let message = 'Payment complete! Reference: ' + response.reference;

                //alert(message);

                let ref = response.reference;

                

                $.post("../../classes/controller.php", { premiumReg, firstname, lastname, phone, email, ageGroup, gender, kidsComing, kidsNumber, member, district, arrivalDate, houseAccess, premiumAmount, ref, userId, campId }, function(data){

                    if(data === "Registration Successful"){

                        let qrcode = new QRCode('qrCode');

                        qrcode.makeCode(userId + ':' + campId + ':' + ref + ':bulk');



                        setModal({

                            headerSelector: $("#modalHeader"), 

                            headerContent: "<i class='fas fa-check-circle text-success'></i> Success",

                            bodySelector: $("#modalBody"),

                            bodyContent:  "",

                            footerSelector: null,

                            footerContent: null,

                            modalSelector: $("#qrModal"),

                            modalState: "show"

                        });

                     }else{

                         setModal({

                             headerSelector: $("#modalHeader"), 

                             headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",

                             bodySelector: $("#modalBody"),

                             bodyContent:  "Server error, try again!",

                             footerSelector: null,

                             footerContent: null,

                             modalSelector: $("#regModal"),

                             modalState: "show"

                         }); 



                         $("#pregisterLoader").hide('slow');

                        $("#pregisterCamp").show('slow');

                     }

                });

            }

            });

            handler.openIframe();*/

        }

    });

    $("#bulkRegisterCamp").click(function(e) {
        let qrData = $("#qrData").text();
        let userId = qrData.split(":")[0];
        let campId = qrData.split(":")[1];

        if(participants == ""){
            setModal({
                headerSelector: $("#modalHeader"), 
                headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",
                bodySelector: $("#modalBody"),
                bodyContent: "Make sure amount of participant is registered before you can process!!!",
                footerSelector: null,
                footerContent: null,
                modalSelector: $("#regModal"),
                modalState: "show"
            });
        }else{
            let totalAmount = parseInt($("#total").text());
            let bulkReg = 'br';
            let email = $("#userEmail").text();
            //console.log(totalAmount);
            // $("#bulkRegisterLoader").show('slow');
            // $("#bulkRegisterCamp").hide('slow');

            // e.preventDefault();
            let handler = PaystackPop.setup({
            key: 'pk_live_b3e5d1863418258bc93d723b28364de61e043bc1',
            // key: 'pk_test_4697a3a0abdf2c4173337a341a907588df55a51e',
            email: email == "" ? 'subscribers@foursquareyouthcamp.com' : email,
            amount: totalAmount * 100,
            ref: ''+Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
            // label: "Optional string that replaces customer email"

            onClose: function(){
                setModal({
                    headerSelector: $("#modalHeader"), 
                    headerContent: "<i class='fas fa-exclamation-triangle text-warning'></i> Alert",
                    bodySelector: $("#modalBody"),
                    bodyContent: "You just cancelled the ongoing payment!",
                    footerSelector: null,
                    footerContent: null,
                    modalSelector: $("#regModal"),
                    modalState: "show"
                });

                // $("#bulkRegisterLoader").hide('slow');
                // $("#bulkRegisterCamp").show('slow'); 
            },

            callback: function(response){
                console.log(response);
                //let message = 'Payment complete! Reference: ' + response.reference;
                //alert(message);
                let ref = response.reference;
                let arrayParticipant = JSON.stringify(participants);
                console.log(arrayParticipant);

                $.post("../../classes/controller.php", { bulkReg, arrayParticipant, ref, userId, campId }, function(data){
                    console.log(data);
                    let qrcode = new QRCode('qrCode');
                    qrcode.makeCode(userId + ':' + campId + ':' + ref + ':bulk');

                    setModal({
                        headerSelector: $("#modalHeader"), 
                        headerContent: "<i class='fas fa-check-circle text-success'></i> Success",
                        bodySelector: $("#modalBody"),
                        bodyContent:  "Registration Successful!!!",
                        footerSelector: null,
                        footerContent: null,
                        modalSelector: $("#qrModal"),
                        modalState: "show"
                    });
                    //$("#participantTable").empty();
                });
            }
            });
            handler.openIframe();
        }
    });

    $("#pregisterCampAnonymous").click(function(e){

        let firstname = $("#pfirstname").val();

        let lastname = $("#plastname").val();

        let phone = $("#pphone").val();

        let email = $("#pemail").val();

        let ageGroup = $("#pageGroup").val();

        let gender = $("#pgender").val();

        let kidsComing = '';

        let kidsNumber = '';

        let member = $("#pmember").val();

        let district = $("#pdistrict").val();

        let arrivalDate = '';

        let houseAccess = '';

        let premiumAmount = $("#premiumAmount").val() === "more" ? $("#otherAmount").val() : $("#premiumAmount").val();

        let premiumRegAnonymous = "pr";



        let qrData = $("#qrData").text();

        let campId = qrData;

        let userId = ''+Math.floor((Math.random() * 1000000000) + 1);



        console.log({ firstname, lastname, phone, email, ageGroup, gender, kidsComing, kidsNumber, member, district, arrivalDate, houseAccess, premiumAmount });



        if(firstname === ""){

            setModal({

                headerSelector: $("#modalHeader"), 

                headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",

                bodySelector: $("#modalBody"),

                bodyContent:  "First name is required!",

                footerSelector: null,

                footerContent: null,

                modalSelector: $("#regModal"),

                modalState: "show"

            });

        }else if(lastname === ""){

            setModal({

                headerSelector: $("#modalHeader"), 

                headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",

                bodySelector: $("#modalBody"),

                bodyContent:  "Last name is required!",

                footerSelector: null,

                footerContent: null,

                modalSelector: $("#regModal"),

                modalState: "show"

            });

        }else if(phone === ""){

            setModal({

                headerSelector: $("#modalHeader"), 

                headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",

                bodySelector: $("#modalBody"),

                bodyContent:  "Phone numner is required!",

                footerSelector: null,

                footerContent: null,

                modalSelector: $("#regModal"),

                modalState: "show"

            });

        }else if(ageGroup === ""){

            setModal({

                headerSelector: $("#modalHeader"), 

                headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",

                bodySelector: $("#modalBody"),

                bodyContent:  "Age group is required!",

                footerSelector: null,

                footerContent: null,

                modalSelector: $("#regModal"),

                modalState: "show"

            });

        }else if(gender == ""){

            setModal({

                headerSelector: $("#modalHeader"), 

                headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",

                bodySelector: $("#modalBody"),

                bodyContent: "Gender is required!",

                footerSelector: null,

                footerContent: null,

                modalSelector: $("#regModal"),

                modalState: "show"

            });

        }else if(member == ""){

            setModal({

                headerSelector: $("#modalHeader"), 

                headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",

                bodySelector: $("#modalBody"),

                bodyContent: "Are you a foursquare member?!",

                footerSelector: null,

                footerContent: null,

                modalSelector: $("#regModal"),

                modalState: "show"

            });

        }else if(premiumAmount == "" || premiumAmount < 30000){

            setModal({

                headerSelector: $("#modalHeader"), 

                headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",

                bodySelector: $("#modalBody"),

                bodyContent: "Registration category is required, make sure amount is not lower than N30,000!",

                footerSelector: null,

                footerContent: null,

                modalSelector: $("#regModal"),

                modalState: "show"

            });

        }else{

            $("#pregisterLoader").show('slow');

            $("#pregisterCampAnonymous").hide('slow');



            e.preventDefault();

            let handler = PaystackPop.setup({

            key: 'pk_live_b3e5d1863418258bc93d723b28364de61e043bc1',

            // key: 'pk_test_4697a3a0abdf2c4173337a341a907588df55a51e',

            email: email == "" ? 'subscribers@foursquareyouthcamp.com' : email,

            amount: premiumAmount * 100,

            ref: ''+Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you

            // label: "Optional string that replaces customer email"

            onClose: function(){

                setModal({

                    headerSelector: $("#modalHeader"), 

                    headerContent: "<i class='fas fa-exclamation-triangle text-warning'></i> Alert",

                    bodySelector: $("#modalBody"),

                    bodyContent: "You just cancelled the ongoing payment!",

                    footerSelector: null,

                    footerContent: null,

                    modalSelector: $("#regModal"),

                    modalState: "show"

                });



                $("#pregisterLoader").hide('slow');

                $("#pregisterCampAnonymous").show('slow');

            },

            callback: function(response){

                console.log(response);

                //let message = 'Payment complete! Reference: ' + response.reference;

                //alert(message);

                let ref = response.reference;

                

                $.post("classes/controller.php", { premiumRegAnonymous, firstname, lastname, phone, email, ageGroup, gender, kidsComing, kidsNumber, member, district, arrivalDate, houseAccess, premiumAmount, ref, userId, campId }, function(data){

                    if(data === "Registration Successful"){

                        let qrcode = new QRCode('qrCode');

                        qrcode.makeCode(userId + ':' + campId + ':' + ref);



                        setModal({

                            headerSelector: $("#modalHeader"), 

                            headerContent: "<i class='fas fa-check-circle text-success'></i> Success",

                            bodySelector: $("#modalBody"),

                            bodyContent:  "",

                            footerSelector: null,

                            footerContent: null,

                            modalSelector: $("#qrModal"),

                            modalState: "show"

                        });

                     }else{

                         setModal({

                             headerSelector: $("#modalHeader"), 

                             headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",

                             bodySelector: $("#modalBody"),

                             bodyContent:  "Server error, try again!",

                             footerSelector: null,

                             footerContent: null,

                             modalSelector: $("#regModal"),

                             modalState: "show"

                         }); 



                         $("#pregisterLoader").hide('slow');

                        $("#pregisterCampAnonymous").show('slow');

                     }

                });

            }

            });

            handler.openIframe();

        }



    });



    $("#rkidsComing").change(function(){

        if($("#rkidsComing").val() === "Yes"){

            $("#rkidsNum").show("slow");

        }else{

            $("#rkidsNum").hide("slow");

        }

    });



    $("#pkidsComing").change(function(){

        if($("#pkidsComing").val() === "Yes"){

            $("#pkidsNum").show("slow");

        }else{

            $("#pkidsNum").hide("slow");

        }

    });



    $("#rmember").change(function(){

        if($("#rmember").val() === "Yes"){

            $("#rdistrictDiv").show("slow");

        }else{

            $("#rdistrictDiv").hide("slow");

        }

    });



    $("#pmember").change(function(){

        if($("#pmember").val() === "Yes"){

            $("#pdistrictDiv").show("slow");

        }else{

            $("#pdistrictDiv").hide("slow");

        }

    });



    $('#customSwitches').change(function(){

        premium = !premium;

        if(premium){

            $('#premiumDiv').show('slow');

            $('#regularDiv').hide('slow');

        }else{

            $('#premiumDiv').hide('slow');

            $('#regularDiv').show('slow');

        }

    });



    $('#premiumAmount').change(function(){

        let premAmount = $('#premiumAmount').val();

        if(premAmount == 'more'){

            $('#amountDiv').show('slow');

        }else{

            $('#amountDiv').hide('slow');

        }

    });



    $('#adminLoginButton').click(function(){

        let email = $('#adminEmail').val();

        let password = $('#adminPassword').val();

        let adminLogin = "al";



        $.post("../classes/controller.php", { adminLogin, email, password }, function(data){

           //alert(data);

            if(data === "1"){

               setModal({

                    headerSelector: $("#modalHeader"), 

                    headerContent: "<i class='fas fa-check-circle text-success'></i> Success",

                    bodySelector: $("#modalBody"),

                    bodyContent:  "Login Successful!",

                    footerSelector: null,

                    footerContent: null,

                    modalSelector: $("#regModal"),

                    modalState: "show"

                });

                setTimeout(function(){

                    gotoLocation("dashboard.php");

                }, 2000);

            }else{

                setModal({

                    headerSelector: $("#modalHeader"), 

                    headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",

                    bodySelector: $("#modalBody"),

                    bodyContent:  "Incorrect login credentials",

                    footerSelector: null,

                    footerContent: null,

                    modalSelector: $("#regModal"),

                    modalState: "show"

                }); 

            }

        });

    });



    $('.tabHeader').click(function(){

        let header = $(this).attr('id');

        let fetchCamps = "fc";

        let fetchTHistory = "fth";

        if(header === "3"){

            $('#loader').attr('hidden', false);

            $.post("../../classes/controller.php", { fetchCamps }, function(data){

                $('#loader').attr('hidden', true);

                let campArray = JSON.parse(data);



                $("#campList").html("");

                campArray.map(function(camp){

                    $("#campList").append(

                        '<tr>'+

                          '<td>'+camp.name+'</td>'+

                          '<td>'+camp.theme+'</td>'+

                          '<td>'+camp.start+'</td>'+

                          '<td>'+camp.end+'</td>'+

                          '<td>'+camp.status+'</td>'+

                          '<td><button class="btn btn-sm btn-rounded btn-outline-danger viewHistory" campId="'+camp.id+'">View History</button></td>'+

                        '</tr>'

                    );

                });

                

            });

        }else if(header === "2"){

            $.post("../../classes/controller.php", { fetchTHistory }, function(data){

                //alert(data);

                let transactionArray = JSON.parse(data);

                let htmlHolder = "";



                $("#transactionList").html("");

                transactionArray.map(function(transaction, index){



                    htmlHolder +='<div class="card z-depth-0 bordered mt-3 p-5">'+

                                    '<h5 class="text-secondary">Transaction '+ transaction.paymentRef + ' - ' + transaction.date +'</h5>'+

                                    '<p>Description: ' + transaction.regType + ' registration</p>'+

                                    '<p>For: ' + transaction.firstname + ' ' + transaction.lastname + '</p>'+

                                    '<p class="text-warning">Amount paid: N' + transaction.amount + '</p>'+

                                    '<p>Payment ref: ' + transaction.paymentRef + '</p>'+

                                    '<p>Camp: ' + transaction.campName + '</p>'+

                                    '<p>Date: ' + transaction.date + '</p>'+ 

                                '</div>';

                });



                $("#transactionList").html(htmlHolder);

                

            }); 

        }

    });



    $(document).on('click', '.viewHistory', function(){

        let campId = $(this).attr("campId");

        let fetchHistory = "fh";

        let mHeader = "";



        $.post("../../classes/controller.php", { fetchHistory, campId }, function(data){

            //alert(data);

            let historyArray = JSON.parse(data);

            let htmlHolder = "";



            $("#historyList").html("");

            historyArray.map(function(history, index){

                mHeader = "Registration history for " + history.campName;



                htmlHolder +='<tr>'+

                                '<td>'+history.campName+'</td>'+

                                '<td>'+history.firstname+' '+history.lastname+'</td>'+

                                '<td>'+history.gender+'</td>'+

                                '<td>'+history.hmk+'</td>'+

                                '<td>'+history.ageGroup+'</td>'+

                                '<td>'+history.district+'</td>'+

                                '<td>'+history.arrival+'</td>'+

                                '<td>'+history.amount+'</td>'+

                            '</tr>';

            });



            //$("#modalBodyHistory").html(htmlHolder);



            setModal({

                headerSelector: $("#modalHeaderHistory"), 

                headerContent: "<i class='fas fa-history text-danger'></i> " + mHeader,

                bodySelector: $("#modalBodyHistory"),

                bodyContent:  htmlHolder,

                footerSelector: null,

                footerContent: null,

                modalSelector: $("#historyModal"),

                modalState: "show"

            });

            

        });

        

    });



    $("#logoutButton").click(function(){

        let logout = "lg";

        $.post("../../classes/controller.php", { logout }, function(data){

           if(data === "Logout Successfully"){

            setModal({

                headerSelector: $("#modalHeader"), 

                headerContent: "<i class='fas fa-check-circle text-success'></i> Success",

                bodySelector: $("#modalBody"),

                bodyContent:  data,

                footerSelector: null,

                footerContent: null,

                modalSelector: $("#regModal"),

                modalState: "show"

            });

            setTimeout(function(){

                gotoLocation("../../");

            }, 2000);

           }

        });

    });



    $("#logoutButtonAdmin").click(function(){

        let logout = "lg";

        $.post("../classes/controller.php", { logout }, function(data){

           if(data === "Logout Successfully"){

            setModal({

                headerSelector: $("#modalHeader"), 

                headerContent: "<i class='fas fa-check-circle text-success'></i> Success",

                bodySelector: $("#modalBody"),

                bodyContent:  data,

                footerSelector: null,

                footerContent: null,

                modalSelector: $("#regModal"),

                modalState: "show"

            });

            setTimeout(function(){

                gotoLocation("index.html");

            }, 2000);

           }

        });

    });



    $("#closeCamp").click(function(){

        //alert("close camp");

        let closeCamp = "cc";



        $.post("../classes/controller.php", { closeCamp }, function(data){

            //alert(data);

            if(data === "Camp closed"){

             setModal({

                 headerSelector: $("#modalHeader"), 

                 headerContent: "<i class='fas fa-check-circle text-success'></i> Success",

                 bodySelector: $("#modalBody"),

                 bodyContent:  "All camp closed successfully",

                 footerSelector: null,

                 footerContent: null,

                 modalSelector: $("#regModal"),

                 modalState: "show"

             });

             

            }else{

                setModal({

                    headerSelector: $("#modalHeader"), 

                    headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Success",

                    bodySelector: $("#modalBody"),

                    bodyContent:  "Camp failed to close, try again",

                    footerSelector: null,

                    footerContent: null,

                    modalSelector: $("#regModal"),

                    modalState: "show"

                });

            }

         });

    });



    $("#fetchStats").click(function(){

        let campId = $("#campIdHolder").text();

        let district = $("#district").val();

        let regType = $("#regType").val();

        let rName = $("#rName").val();

        let pNumber = $("#pNumber").val();

        let hic = $("#hic").val();

        let fetchStats = "fs";

        //alert(campId + ' - ' + district + ' - ' + regType + ' - ' + rName + ' - ' + hic);



        $.post("../classes/controller.php", { fetchStats, campId, district, regType, rName,  pNumber, hic }, function(data){

            //alert(data);

            let statsArray = JSON.parse(data);



            $(".totalStats").text(statsArray.length);



            var options = {

                dataSource: statsArray,

                pageSize: 200,

                callback: function (response, pagination) {

                    //window.console && console.log(response, pagination);

                    let dataHtml = '';

                    $.each(response, function (index, stat) {

                        dataHtml +='<tr>'+

                                    '<td>'+stat.firstname+' '+stat.lastname+'</td>'+

                                    '<td>'+stat.phone+'</td>'+

                                    '<td>'+stat.ageGroup+'</td>'+

                                    '<td>'+stat.gender+'</td>'+

                                    '<td>'+stat.member+'</td>'+

                                    '<td>'+stat.district+'</td>'+

                                    '<td>'+stat.house+'</td>'+

                                    '<td>'+stat.amount+'</td>'+

                                    '<td>'+stat.regType+'</td>'+

                                    '<td>'+stat.date+'</td>'+

                                '</tr>';

                    });



                    $("#statsList").html(dataHtml);

                }

            };



            $("#pagination-demo1").pagination(options);

        });

    });



    $("#exportToExcel").click(function(){

        //alert('export');

        $("#dataTable").table2excel({

            // exclude CSS class

            exclude:".noExl",

            name:"Worksheet Name",

            filename:"Report",//do not include extension

            fileext:".xls" // file extension

        });

            

    });



    $(".reloadButton").click(function(){

        gotoLocation("scan-code.php");

    });



    $("#startScan").click(function(){

        //alert('dende');

        if($("#startScan").text() == "Scan now"){

            $("#scanLoader").show();



            var scanner = new Instascan.Scanner({video: document.getElementById('preview'), scanPeriod: 5, mirror: false});

            scanner.addListener('scan', function(content){

                let contentArray = content.split(':');

                let userId = contentArray[0];

                let campId = contentArray[1];

                let refId = contentArray[2];

                let verifyUser = "vu";

                let verifyUser2 = "vu2";



                if(contentArray.length == 3){

                    $.post("../classes/controller.php", { verifyUser, userId, campId, refId }, function(data){

                        //alert(data);

                        $("#vLoader").show(500);

                        if(data == "Failed"){

                            $("#vLoader").hide(500);

                            $("#verifiedBox").hide(500);

                            $("#failedBox").show(500);

                        }else{

                            let dataArray = data.split(':');

                            if(dataArray[0] == "Verified"){

                                $("#userDetail").html(

                                    '<tr>'+

                                        '<td>'+dataArray[1]+'</td>'+

                                        '<td>'+dataArray[2]+'</td>'+

                                        '<td>'+dataArray[3]+'</td>'+

                                        '<td>'+dataArray[4]+'</td>'+

                                        '<td>'+dataArray[5]+'</td>'+

                                        '<td>'+dataArray[6]+'</td>'+

                                        '<td>'+dataArray[7]+'</td>'+

                                    '</tr>'

                                );

                                $("#vLoader").hide(500);

                                $("#verifiedBox").show(500);

                                $("#failedBox").hide(500);

                            }

                        }

                     });

                }else{

                    $.post("../classes/controller.php", { verifyUser2, userId, campId, refId }, function(data){

                        //alert(data);

                        $("#vLoader").show(500);

                        if(data == "Failed"){

                            $("#vLoader").hide(500);

                            $("#verifiedBox").hide(500);

                            $("#failedBox").show(500);

                        }else{

                            let dataArray = JSON.parse(data);

                            let htmlHolder = '';

                            console.log(dataArray);

                            dataArray.map((data) => {

                                htmlHolder += '<tr>'+

                                    '<td>'+data.firstname+'</td>'+

                                    '<td>'+data.lastname+'</td>'+

                                    '<td>'+data.email+'</td>'+

                                    '<td>'+data.phone+'</td>'+

                                    '<td>'+data.gender+'</td>'+

                                    '<td>'+data.member+'</td>'+

                                    '<td>'+data.regType+'</td>'+

                                '</tr>'

                            });

                            

                            $("#userDetail").html(htmlHolder);

                            $("#vLoader").hide(500);

                            $("#verifiedBox").show(500);

                            $("#failedBox").hide(500);

                        }

                    });

                }

                // $("#scanResult").text(content);

            });

            Instascan.Camera.getCameras().then(function(cameras){

                if(cameras.length > 0){

                    scanner.start(cameras[0]);

                    $('[name="options"]').on('change', function(){

                        if($(this).val() == 1){

                            if(cameras[0] != ""){

                                scanner.start(cameras[0]);

                            }else{

                                alert('No front camera found');

                            }

                        }else if($(this).val() == 2){

                            if(cameras[1] != ""){

                                scanner.start(cameras[1]);

                            }else{

                                alert('No back camera found');

                            }

                        }

                    });

                    $("#scanLoader").hide();

                    $("#scannerDiv").show();

                }else{

                    alert('No camera found');

                    $("#scanLoader").hide();

                    $("#scannerDiv").hide();

                }

            }).catch(function(e){

                alert(e);

            });



            $("#startScan").text("Stop scan");

        }else{

            var videoEl = document.getElementById('preview');

            stream = videoEl.srcObject;

            tracks = stream.getTracks();

            tracks.forEach(function(track){

                track.stop();

            });

            videoEl.srcObject = null;

            $("#startScan").text("Scan now");



            $("#scanLoader").hide();

            $("#scannerDiv").hide();

        }

        

    });



    $("#verifyEmail").click(function(){

        let verifyEmail = 've';

        let email = $("#emailAddress").val();

        if(email == ""){

            setModal({

                headerSelector: $("#modalHeader"), 

                headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",

                bodySelector: $("#modalBody"),

                bodyContent:  "Email field is compulsory!",

                footerSelector: null,

                footerContent: null,

                modalSelector: $("#regModal"),

                modalState: "show"

            });

        }else{

            $("#verifyLoader").show("slow");

            $("#verifyEmail").hide("slow");



            $.post("../../classes/controller.php", { verifyEmail, email }, function(data){

                $("#verifyLoader").hide("slow");

                $("#verifyEmail").show("slow");

                if(data == "Message sent"){

                    setModal({

                        headerSelector: $("#modalHeader"), 

                        headerContent: "<i class='fas fa-check-circle text-success'></i> Success",

                        bodySelector: $("#modalBody"),

                        bodyContent:  "A password reset code had been sent to your email.",

                        footerSelector: null,

                        footerContent: null,

                        modalSelector: $("#regModal"),

                        modalState: "show"

                    });

                    

                    $("#emailCard").hide("slow");

                    $("#codeCard").show("slow");

                }else{

                   if(data == "404"){

                    setModal({

                        headerSelector: $("#modalHeader"), 

                        headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",

                        bodySelector: $("#modalBody"),

                        bodyContent:  "Email not found on this server",

                        footerSelector: null,

                        footerContent: null,

                        modalSelector: $("#regModal"),

                        modalState: "show"

                    });

                   }else{

                    setModal({

                        headerSelector: $("#modalHeader"), 

                        headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i>Error",

                        bodySelector: $("#modalBody"),

                        bodyContent:  "Email sending failed, try again!",

                        footerSelector: null,

                        footerContent: null,

                        modalSelector: $("#regModal"),

                        modalState: "show"

                    });

                   }

                }    

            });

        }

    });



    $("#verifyCode").click(function(){

        let verifyCode = 'vc';

        let email = $("#emailAddress").val();

        let code = $("#vCode").val();

        if(code == ""){

            setModal({

                headerSelector: $("#modalHeader"), 

                headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",

                bodySelector: $("#modalBody"),

                bodyContent:  "Verificaiton code field is compulsory!",

                footerSelector: null,

                footerContent: null,

                modalSelector: $("#regModal"),

                modalState: "show"

            });

        }else{

            $("#codeLoader").show("slow");

            $("#verifyCode").hide("slow");



            $.post("../../classes/controller.php", { verifyCode, email, code }, function(data){

                $("#codeLoader").hide("slow");

                $("#verifyCode").show("slow");

                if(data == "Valid"){

                    setModal({

                        headerSelector: $("#modalHeader"), 

                        headerContent: "<i class='fas fa-check-circle text-success'></i> Success",

                        bodySelector: $("#modalBody"),

                        bodyContent:  "Verification code confirmed!",

                        footerSelector: null,

                        footerContent: null,

                        modalSelector: $("#regModal"),

                        modalState: "show"

                    });

                    

                    $("#codeCard").hide("slow");

                    $("#passwordCard").show("slow");

                }else{

                    setModal({

                        headerSelector: $("#modalHeader"), 

                        headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",

                        bodySelector: $("#modalBody"),

                        bodyContent:  "Invalid verification code!",

                        footerSelector: null,

                        footerContent: null,

                        modalSelector: $("#regModal"),

                        modalState: "show"

                    });

                }    

            });

        }

    });



    $("#changePassword").click(function(){

        let changePassword = 'cp';

        let np = $("#newPassword").val();

        let rp = $("#repeatPassword").val();

        let email = $("#emailAddress").val();

        if(np == "" || rp == "" || np != rp){

            setModal({

                headerSelector: $("#modalHeader"), 

                headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",

                bodySelector: $("#modalBody"),

                bodyContent:  "All fields are compulsory and passwords must match",

                footerSelector: null,

                footerContent: null,

                modalSelector: $("#regModal"),

                modalState: "show"

            });

        }else{

            $("#passwordLoader").show("slow");

            $("#changePassword").hide("slow");



            $.post("../../classes/controller.php", { changePassword, np, rp, email}, function(data){

                $("#passwordLoader").hide("slow");

                $("#changePassword").show("slow");

                if(data == "Successful"){

                    setModal({

                        headerSelector: $("#modalHeader"), 

                        headerContent: "<i class='fas fa-check-circle text-success'></i> Success",

                        bodySelector: $("#modalBody"),

                        bodyContent:  "Password changed successfully!",

                        footerSelector: null,

                        footerContent: null,

                        modalSelector: $("#regModal"),

                        modalState: "show"

                    });

                    

                    setTimeout(function(){

                        gotoLocation("../../");

                    }, 3000);

                }else{

                    setModal({

                        headerSelector: $("#modalHeader"), 

                        headerContent: "<i class='fas fa-exclamation-triangle text-danger'></i> Error",

                        bodySelector: $("#modalBody"),

                        bodyContent:  "Password change failed unexpectedly!",

                        footerSelector: null,

                        footerContent: null,

                        modalSelector: $("#regModal"),

                        modalState: "show"

                    });

                }    

            });

        }

    });



});